package com.yuzhi.hotel.WebSocket;


import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.yuzhi.system.domain.SysUser;
import com.yuzhi.system.general.utils.StringUtils;
import com.yuzhi.system.service.ISysUserService;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.*;

@Component
@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
    private static final Logger log = LoggerFactory.getLogger(WebSocketServer.class);

    // 静态变量，用来记录当前在线连接数
    private static AtomicInteger onlineCount = new AtomicInteger(0);

    // concurrent包的线程安全Map，用来存放每个客户端对应的WebSocket对象
    private static ConcurrentHashMap<String, WebSocketServer> webSocketMap = new ConcurrentHashMap<>();

    // 注入用户服务
    private static ISysUserService userService;

    // 与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    // 接收userId
    private String userId = "";

    @Autowired
    public void setUserService(ISysUserService userService) {
        WebSocketServer.userService = userService;
    }

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        this.session = session;
        this.userId = userId;
        if (webSocketMap.containsKey(userId)) {
            webSocketMap.remove(userId);
            webSocketMap.put(userId, this);
        } else {
            webSocketMap.put(userId, this);
            addOnlineCount();
        }
        log.info("用户连接:" + userId + ",当前在线人数为:" + getOnlineCount());

        // 如果是客服连接，发送在线用户列表
        if ("customer_service".equals(userId)) {
            sendOnlineUsersList();
        } else {
            // 如果是普通用户连接，通知客服有新用户上线
            notifyCustomerServiceUserOnline(userId);
        }
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        if (webSocketMap.containsKey(userId)) {
            webSocketMap.remove(userId);
            subOnlineCount();
            log.info("用户退出:" + userId + ",当前在线人数为:" + getOnlineCount());

            // 如果是普通用户下线，通知客服
            if (!"customer_service".equals(userId)) {
                notifyCustomerServiceUserOffline(userId);
            }
        }
    }

    /**
     * 收到客户端消息后调用的方法
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("用户消息:" + userId + ",报文:" + message);
        // 可以群发消息
        // 消息保存到数据库、redis
        if (StringUtils.isNotBlank(message)) {
            try {
                // 解析发送的报文
                JSONObject jsonObject = JSON.parseObject(message);
                // 追加发送人(防止串改)
                jsonObject.put("fromUserId", this.userId);
                String toUserId = jsonObject.getString("toUserId");

                // 特殊处理客服相关消息
                if ("customer_service".equals(toUserId)) {
                    // 发送给客服
                    WebSocketServer customerService = webSocketMap.get("customer_service");
                    if (customerService != null) {
                        customerService.sendMessage(jsonObject.toJSONString());
                    } else {
                        log.error("客服不在线");
                    }
                } else if ("customer_service".equals(this.userId)) {
                    // 客服发送给用户
                    if (StringUtils.isNotBlank(toUserId) && webSocketMap.containsKey(toUserId)) {
                        webSocketMap.get(toUserId).sendMessage(jsonObject.toJSONString());
                    } else {
                        log.error("请求的userId:" + toUserId + "不在该服务器上");
                        // 否则不在这个服务器上，发送到mysql或者redis
                    }
                } else {
                    // 普通用户之间的消息
                    if (StringUtils.isNotBlank(toUserId) && webSocketMap.containsKey(toUserId)) {
                        webSocketMap.get(toUserId).sendMessage(jsonObject.toJSONString());
                    } else {
                        log.error("请求的userId:" + toUserId + "不在该服务器上");
                        // 否则不在这个服务器上，发送到mysql或者redis
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 发生错误时调用
     */
    @OnError
    public void onError(Session session, Throwable error) {
        log.error("用户错误:" + this.userId + ",原因:" + error.getMessage());
        error.printStackTrace();
    }

    /**
     * 实现服务器主动推送
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    /**
     * 发送在线用户列表给客服
     */
    private void sendOnlineUsersList() {
        try {
            WebSocketServer customerService = webSocketMap.get("customer_service");
            if (customerService != null) {
                List<Map<String, String>> users = new ArrayList<>();
                for (String userId : webSocketMap.keySet()) {
                    if (!"customer_service".equals(userId)) {
                        Map<String, String> user = new HashMap<>();
                        user.put("userId", userId);

                        // 获取用户名信息
                        try {
                            long userIdLong = Long.parseLong(userId);
                            SysUser sysUser = userService.selectUserById(userIdLong);
                            if (sysUser != null) {
                                user.put("userName", sysUser.getUserName());
                                user.put("nickName", sysUser.getNickName());
                            }
                        } catch (NumberFormatException e) {
                            log.warn("无法解析用户ID为数字: " + userId);
                        }

                        users.add(user);
                    }
                }

                JSONObject message = new JSONObject();
                message.put("type", "online_users");
                message.put("users", users);
                customerService.sendMessage(message.toJSONString());
            }
        } catch (Exception e) {
            log.error("发送在线用户列表失败", e);
        }
    }

    /**
     * 通知客服有用户上线
     */
    private void notifyCustomerServiceUserOnline(String userId) {
        try {
            WebSocketServer customerService = webSocketMap.get("customer_service");
            if (customerService != null) {
                JSONObject message = new JSONObject();
                message.put("type", "user_online");
                message.put("userId", userId);

                // 添加用户详细信息
                try {
                    long userIdLong = Long.parseLong(userId);
                    SysUser sysUser = userService.selectUserById(userIdLong);
                    if (sysUser != null) {
                        message.put("userName", sysUser.getUserName());
                        message.put("nickName", sysUser.getNickName());
                    }
                } catch (NumberFormatException e) {
                    log.warn("无法解析用户ID为数字: " + userId);
                }

                customerService.sendMessage(message.toJSONString());
                // 重新发送用户列表
                sendOnlineUsersList();
            }
        } catch (Exception e) {
            log.error("通知客服用户上线失败", e);
        }
    }

    /**
     * 通知客服有用户下线
     */
    private void notifyCustomerServiceUserOffline(String userId) {
        try {
            WebSocketServer customerService = webSocketMap.get("customer_service");
            if (customerService != null) {
                JSONObject message = new JSONObject();
                message.put("type", "user_offline");
                message.put("userId", userId);
                customerService.sendMessage(message.toJSONString());
                // 重新发送用户列表
                sendOnlineUsersList();
            }
        } catch (Exception e) {
            log.error("通知客服用户下线失败", e);
        }
    }

    public static int getOnlineCount() {
        return onlineCount.get();
    }

    public static void addOnlineCount() {
        onlineCount.incrementAndGet();
    }

    public static void subOnlineCount() {
        onlineCount.decrementAndGet();
    }

}
