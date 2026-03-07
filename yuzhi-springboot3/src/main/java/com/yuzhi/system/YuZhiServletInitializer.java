package com.yuzhi.system;

import com.yuzhi.YuZhiEasyApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * web容器中进行部署
 *
 * @author yuzhi
 */
public class YuZhiServletInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(YuZhiEasyApplication.class);
    }
}
