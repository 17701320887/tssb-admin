package com.tssb.common.util;

/**
 * Created by admin on 2016/6/6.
 */
public class YxConfig {
    public static String appKey = JProperties.getProperties(JProperties.loadProperties("yxConfig"), "app_key");
}
