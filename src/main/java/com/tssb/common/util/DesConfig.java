package com.tssb.common.util;

/**
 * Created by admin on 2016/7/4.
 */
public class DesConfig {
    public static String desKey = JProperties.getProperties(JProperties.loadProperties("desConfig"), "des_key");
}
