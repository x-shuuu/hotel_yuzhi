package com.yuzhi.system.configure.config;

import com.yuzhi.system.general.core.redis.LocalCache;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 本地缓存配置
 *
 * @author yuzhi
 */
@SuppressWarnings("deprecation")
@Configuration
@EnableCaching
public class CachingConfig extends CachingConfigurerSupport
{
    @Bean
    public LocalCache localCache()
    {
        return new LocalCache();
    }
}
