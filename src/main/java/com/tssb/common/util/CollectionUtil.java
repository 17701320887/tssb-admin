package com.tssb.common.util;

import java.util.Collection;

/**
 * Created by dutianzhao on 2015/11/11.
 */
public class CollectionUtil {

    public static boolean isEmpty(Collection<?> collection){
        return (collection == null || collection.isEmpty());
    }

    public static boolean isNotEmpty(Collection<?> collection){
        return !isEmpty(collection);
    }
}