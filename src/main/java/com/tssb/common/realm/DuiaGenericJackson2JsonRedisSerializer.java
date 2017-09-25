package com.tssb.common.realm;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

/**
 * Created by dutianzhao on 2015/11/30.
 */
public class DuiaGenericJackson2JsonRedisSerializer implements RedisSerializer<Object> {

    private final ObjectMapper mapper;

    public DuiaGenericJackson2JsonRedisSerializer() {
        this((String)((String)null));
    }

    public DuiaGenericJackson2JsonRedisSerializer(String classPropertyTypeName) {
        this((ObjectMapper)(new ObjectMapper()));
        if(StringUtils.hasText(classPropertyTypeName)) {
            this.mapper.enableDefaultTypingAsProperty(ObjectMapper.DefaultTyping.NON_FINAL, classPropertyTypeName);
        } else {
            this.mapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        }

    }

    public DuiaGenericJackson2JsonRedisSerializer(ObjectMapper mapper) {
        Assert.notNull(mapper, "ObjectMapper must not be null!");
        this.mapper = mapper;
        this.mapper.configure(MapperFeature.USE_GETTERS_AS_SETTERS, false);
        this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public byte[] serialize(Object source) throws SerializationException {
        if(source == null) {
            return DuiaSerializationUtils.EMPTY_ARRAY;
        } else {
            try {
                return this.mapper.writeValueAsBytes(source);
            } catch (JsonProcessingException var3) {
                throw new SerializationException("Could not write JSON: " + var3.getMessage(), var3);
            }
        }
    }

    public Object deserialize(byte[] source) throws SerializationException {
        return this.deserialize(source, Object.class);
    }

    public <T> T deserialize(byte[] source, Class<T> type) throws SerializationException {
        Assert.notNull(type, "Deserialization type must not be null! Pleaes provide Object.class to make use of Jackson2 default typing.");
        if(DuiaSerializationUtils.isEmpty(source)) {
            return null;
        } else {
            try {
                return this.mapper.readValue(source, type);
            } catch (Exception var4) {
                throw new SerializationException("Could not read JSON: " + var4.getMessage(), var4);
            }
        }
    }
}
