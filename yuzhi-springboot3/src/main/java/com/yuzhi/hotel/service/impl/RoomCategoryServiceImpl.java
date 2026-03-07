package com.yuzhi.hotel.service.impl;

import java.util.List;
import com.yuzhi.system.general.utils.DateUtils;
import com.yuzhi.system.general.utils.uuid.IdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.yuzhi.hotel.mapper.RoomCategoryMapper;
import com.yuzhi.hotel.domain.RoomCategory;
import com.yuzhi.hotel.service.IRoomCategoryService;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.util.CollectionUtils;

/**
 * 房间分类Service业务层处理
 *
 * @author yuzhi
 * @date 2026-01-20
 */
@Service
public class RoomCategoryServiceImpl implements IRoomCategoryService
{
    @Autowired
    private RoomCategoryMapper roomCategoryMapper;

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    /**
     * 查询房间分类
     *
     * @param roomCategoryId 房间分类主键
     * @return 房间分类
     */
    @Override
    public RoomCategory selectRoomCategoryByRoomCategoryId(String roomCategoryId)
    {
        return roomCategoryMapper.selectRoomCategoryByRoomCategoryId(roomCategoryId);
    }

    /**
     * 查询房间分类列表
     *
     * @param roomCategory 房间分类
     * @return 房间分类
     */
    @Override
    public List<RoomCategory> selectRoomCategoryList(RoomCategory roomCategory)
    {
        return roomCategoryMapper.selectRoomCategoryList(roomCategory);
    }

    /**
     * 新增房间分类
     *
     * @param roomCategory 房间分类
     * @return 结果
     */
    @Override
    public int insertRoomCategory(RoomCategory roomCategory)
    {
        roomCategory.setCreateTime(DateUtils.getNowDate());
        roomCategory.setCategoryId(IdUtils.fastUUID());
        return roomCategoryMapper.insertRoomCategory(roomCategory);
    }

    /**
     * 批量新增房间分类
     *
     * @param roomCategorys 房间分类List
     * @return 结果
     */
    @Override
    public int batchInsertRoomCategory(List<RoomCategory> roomCategorys)
    {
        SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH, false);
        int count = 0;
        if (!CollectionUtils.isEmpty(roomCategorys)) {
            try {
                for (int i = 0; i < roomCategorys.size(); i++) {
                    for(RoomCategory roomCategory : roomCategorys){
                        roomCategory.setCategoryId(IdUtils.fastSimpleUUID());
                    }
                    int row = roomCategoryMapper.insertRoomCategory(roomCategorys.get(i));
                    // 防止内存溢出，每100次提交一次,并清除缓存
                    boolean bool = (i >0 && i%100 == 0) || i == roomCategorys.size() - 1;
                    if (bool){
                        sqlSession.commit();
                        sqlSession.clearCache();
                    }
                    count = i + 1;
                }
            }catch (Exception e){
                e.printStackTrace();
                // 没有提交的数据可以回滚
                sqlSession.rollback();
            }finally {
                sqlSession.close();
                return count;
            }
        }
        return count;
    }

    /**
     * 修改房间分类
     *
     * @param roomCategory 房间分类
     * @return 结果
     */
    @Override
    public int updateRoomCategory(RoomCategory roomCategory)
    {
        return roomCategoryMapper.updateRoomCategory(roomCategory);
    }

    /**
     * 批量删除房间分类
     *
     * @param roomCategoryIds 需要删除的房间分类主键
     * @return 结果
     */
    @Override
    public int deleteRoomCategoryByRoomCategoryIds(String[] roomCategoryIds)
    {
        return roomCategoryMapper.deleteRoomCategoryByRoomCategoryIds(roomCategoryIds);
    }

    /**
     * 删除房间分类信息
     *
     * @param roomCategoryId 房间分类主键
     * @return 结果
     */
    @Override
    public int deleteRoomCategoryByRoomCategoryId(String roomCategoryId)
    {
        return roomCategoryMapper.deleteRoomCategoryByRoomCategoryId(roomCategoryId);
    }

    /**
     * 不分页查询房间类型列表
     * @return 结果
     */
    @Override
    public List<RoomCategory> selectRoomCategoryAllList() {
        return roomCategoryMapper.selectRoomCategoryAllList();
    }
}
