package com.tssb.common.util;

import java.util.Enumeration;
import java.util.Locale;
import java.util.ResourceBundle;

public class JProperties {
	/**
	 * 加载properties资源文件
	 * 
	 * @param path
	 * @return ResourceBundle
	 * @author fengxiaoshuai
	 * @date 2011-11-8-下午01:48:03
	 */
	public static ResourceBundle loadProperties(String path) {
		try {
			return ResourceBundle.getBundle(path, Locale.SIMPLIFIED_CHINESE);
		} catch (Exception ex) {
			return null;
		}
	}

	/**
	 * 根据关键字读取资源文件内容
	 * 
	 * @param cache
	 * @param key
	 * @return String
	 * @author fengxiaoshuai
	 * @date 2011-11-8-下午01:48:12
	 */
	public static String getProperties(ResourceBundle cache, String key) {
		return null != cache ? cache.getString(key).trim() : null;
	}
	
	/**
	 * 根据关键字读取资源文件内容
	 * @param fileName
	 * @param key
	 * @return
	 */
	public static String getProperties(String fileName, String key) {
		return getProperties(loadProperties(fileName),key);
	}
	/**
	 * 返回资源文件所有Key
	 * 
	 * @param cache
	 * @return Enumeration<String>
	 * @author fengxiaoshuai
	 * @date 2011-11-8-下午01:48:21
	 */
	public static Enumeration<String> getKeys(ResourceBundle cache) {
		return null != cache ? cache.getKeys() : null;
	}

	public static void main(String[] args) {
	
		System.out.println(JProperties.getProperties(JProperties
				.loadProperties("pay"), "hostUrl"));
		
	}
//
}
