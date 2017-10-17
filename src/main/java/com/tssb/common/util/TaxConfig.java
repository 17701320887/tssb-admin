package com.tssb.common.util;

/**
 * Created by zhangbb on 2016/10/19.
 * 报税实账常量参数
 */
public class TaxConfig {
    public static String corpId = JProperties.getProperties(JProperties.loadProperties("taxConfig"), "corp_id");
    public static String key = JProperties.getProperties(JProperties.loadProperties("taxConfig"), "key");
}
