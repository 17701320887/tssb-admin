package com.tssb.common.util;

import java.util.UUID;

/**
 * 消息发布消息的常量字段
 */
public final class WSMQTTServerCommon {
	// 发布broker的ip和端口 tcp://172.16.4.64:1883 tcp://172.16.1.251:1883
	public static final String TCPAddress = System.getProperty("TCPAddress",ParamUtil.mqttUrl);
	// 客户端的Id
	public static String clientId = String.format(
			"%-23.23s",
			System.getProperty("clientId", (UUID.randomUUID().toString()))
					.trim()).replace('-', '_');
	// 超时时间
	public static final int quiesceTimeout = Integer.parseInt(System
			.getProperty("timeout", "10000"));
	public static final int sleepTimeout = Integer.parseInt(System.getProperty(
			"timeout", "10000"));
	public static final boolean cleanSession = Boolean.parseBoolean(System
			.getProperty("cleanSession", "false"));
	//消息类型
	public static final int QoS = Integer.parseInt(System.getProperty("QoS",
			"2"));
	public static final boolean retained = Boolean.parseBoolean(System
			.getProperty("retained", "false"));
}
