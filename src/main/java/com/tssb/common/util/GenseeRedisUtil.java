package com.tssb.common.util;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by dutianzhao on 2015/11/24.
 */
@Component
public class GenseeRedisUtil {

    @Resource
    private RedisTemplate genseeRedisTemplate;

    /**
     * 设置键值对
     * @param key
     * @param value
     * @param seconds 时效时间，单位：秒
     * @return
     */
    public boolean set(final String key, final String value, final long seconds){
        if(key!=null && key.length()>0 && value!=null && value.length()>0){
            genseeRedisTemplate.opsForValue().set(key, value);
            genseeRedisTemplate.expire(key, seconds, TimeUnit.SECONDS);
        }
        return false;
    }

    /**
     * 获取键值对
     * @param key
     * @return
     */
    public Object get(final String key) throws Exception{
        if(key!=null && key.length()>0){
            Object values = genseeRedisTemplate.opsForValue().get(key);
            return values;
        }
        return null;
    }

    /**
     * 在原有的list上增加
     * @param key
     * @param values
     * @param seconds
     * @return
     */
    public boolean pushToList(final String key, final Collection<String> values, final long seconds){
        if(key!=null && key.length()>0 && !CollectionUtils.isEmpty(values)){
            for(String str:values){
                genseeRedisTemplate.opsForList().rightPush(key,str);
            }
            genseeRedisTemplate.expire(key, seconds, TimeUnit.SECONDS);
            return true;
        }
        return false;
    }

    /**
     * 新增list键值对
     * @param key
     * @param values
     * @param seconds
     * @return
     */
    public boolean setList(final String key, final Collection<String> values, final long seconds){
        if(key!=null && key.length()>0 && !CollectionUtils.isEmpty(values)){
            long size = genseeRedisTemplate.opsForList().size(key);
            if(size>0){
                genseeRedisTemplate.opsForList().remove(key, 0, size);
            }
            for(String str:values){
                genseeRedisTemplate.opsForList().rightPush(key,str);
            }
            if(seconds!=0) {
                genseeRedisTemplate.expire(key, seconds, TimeUnit.SECONDS);
            }
            return true;
        }
        return false;
    }

    /**
     * 获取list键值对
     * @param key
     * @return
     */
    public List<String> getList(final String key){
        if(key!=null && key.length()>0){
            long size = genseeRedisTemplate.opsForList().size(key);
            if(size>0){
                List<String> values = genseeRedisTemplate.opsForList().range(key, 0 , size);
                return values;
            }
        }
        return null;
    }

    /**
     * 删除
     * @param key
     * @return
     */
    public boolean delete(final String key){
        if(key!=null && key.length()>0){
            genseeRedisTemplate.delete(key);
            return true;
        }
        return false;
    }

    public void setGenseeRedisTemplate(RedisTemplate genseeRedisTemplate) {
        this.genseeRedisTemplate = genseeRedisTemplate;
    }
}
