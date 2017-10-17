package com.tssb.common.realm;

import org.springframework.data.redis.serializer.RedisSerializer;

import java.util.*;

/**
 * Created by dutianzhao on 2015/11/30.
 */
public abstract class DuiaSerializationUtils {

    static final byte[] EMPTY_ARRAY = new byte[0];

    public DuiaSerializationUtils() {
    }

    static boolean isEmpty(byte[] data) {
        return data == null || data.length == 0;
    }

    static <T extends Collection<?>> T deserializeValues(Collection<byte[]> rawValues, Class<T> type, RedisSerializer<?> redisSerializer) {
        if(rawValues == null) {
            return null;
        } else {
            Collection values = List.class.isAssignableFrom(type)?new ArrayList(rawValues.size()):new LinkedHashSet(rawValues.size());
            Iterator i$ = rawValues.iterator();

            while(i$.hasNext()) {
                byte[] bs = (byte[])i$.next();
                values.add(redisSerializer.deserialize(bs));
            }

            return (T)values;
        }
    }

    public static <T> Set<T> deserialize(Set<byte[]> rawValues, RedisSerializer<T> redisSerializer) {
        return (Set)deserializeValues(rawValues, Set.class, redisSerializer);
    }

    public static <T> List<T> deserialize(List<byte[]> rawValues, RedisSerializer<T> redisSerializer) {
        return (List)deserializeValues(rawValues, List.class, redisSerializer);
    }

    public static <T> Collection<T> deserialize(Collection<byte[]> rawValues, RedisSerializer<T> redisSerializer) {
        return deserializeValues(rawValues, List.class, redisSerializer);
    }

    public static <T> Map<T, T> deserialize(Map<byte[], byte[]> rawValues, RedisSerializer<T> redisSerializer) {
        if(rawValues == null) {
            return null;
        } else {
            LinkedHashMap ret = new LinkedHashMap(rawValues.size());
            Iterator i$ = rawValues.entrySet().iterator();

            while(i$.hasNext()) {
                Map.Entry entry = (Map.Entry)i$.next();
                ret.put(redisSerializer.deserialize((byte[])entry.getKey()), redisSerializer.deserialize((byte[])entry.getValue()));
            }

            return ret;
        }
    }

    public static <HK, HV> Map<HK, HV> deserialize(Map<byte[], byte[]> rawValues, RedisSerializer<HK> hashKeySerializer, RedisSerializer<HV> hashValueSerializer) {
        if(rawValues == null) {
            return null;
        } else {
            LinkedHashMap map = new LinkedHashMap(rawValues.size());
            Iterator i$ = rawValues.entrySet().iterator();

            while(i$.hasNext()) {
                Map.Entry entry = (Map.Entry)i$.next();
                Object key = hashKeySerializer != null?hashKeySerializer.deserialize((byte[])entry.getKey()):entry.getKey();
                Object value = hashValueSerializer != null?hashValueSerializer.deserialize((byte[])entry.getValue()):entry.getValue();
                map.put(key, value);
            }

            return map;
        }
    }
}
