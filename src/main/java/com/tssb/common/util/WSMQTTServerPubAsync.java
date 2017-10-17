package com.tssb.common.util;

import com.ibm.micro.client.mqttv3.MqttClient;
import com.ibm.micro.client.mqttv3.MqttDeliveryToken;
import com.ibm.micro.client.mqttv3.MqttMessage;
import com.ibm.micro.client.mqttv3.MqttTopic;
import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 使用 Java 为 MQ Telemetry Transport 创建异步发布程序
 * 
 * 
 * 
 * 
 * 消息发布的类的具体的实现
 * 
 * 
 */
public class WSMQTTServerPubAsync {
	private final static Log logger = LogFactory
			.getLog(WSMQTTServerPubAsync.class);// 日志对象

	public static void MqttSend(UserMessageDto userDto, String topicString) {
		try {
			// 创建MqttClient对象
			MqttClient client = new MqttClient(WSMQTTServerCommon.TCPAddress,
					WSMQTTServerCommon.clientId);
			// 创建MQTT相关的主题
			MqttTopic topic = client.getTopic(topicString);

			// 创建MQTT的消息体
			MqttMessage message = new MqttMessage();
			// 设置消息传输的类型
			message.setQos(2);

			// 设置是否在服务器中保存消息体
			message.setRetained(false);
			JSONObject json = new JSONObject();
			/*if(userDto.getTitle().length()>25){
				userDto.setTitle(userDto.getTitle().substring(0, 24));
			}*/
			json.put("title",userDto.getTitle());
			json.put("content", userDto.getContent());
			json.put("url",userDto.getUrl());
			json.put("sendTime", DateUtils.dateToString(userDto.getSendTime(), DateUtils.FORMAT_ONE));
			json.put("id", userDto.getId());
			json.put("userId", userDto.getUserId());
			//json.put("backgroundImg", userDto.getBackgroundImg());
			json.put("backgroundImg", "");
			json.put("msgType", userDto.getMsgType());
			json.put("closeTime", "10");
			json.put("lname", "system");
			json.put("state", "0");
			// 设置消息的内容
			message.setPayload(json.toString().getBytes("UTF-8"));

			// 创建一个MQTT的回调类
			WSMQTTServerCallBack callback = new WSMQTTServerCallBack(
					WSMQTTServerCommon.clientId);

			// MqttClient绑定
			client.setCallback(callback);

			// MqttClient连接
			client.connect();

			logger.info("Publishing \"" + new String(message.getPayload(),"UTF-8")
					+ "\" on topic \"" + topic.getName() + "\" with QoS = "
					+ message.getQos());
			logger.info("For client instance \"" + client.getClientId()
					+ "\" on address " + client.getServerURI() + "\"");

			// 发送消息并获取回执
			MqttDeliveryToken token = topic.publish(message);

			logger.info("With delivery token \"" + token.hashCode()
					+ " delivered: " + token.isComplete());
			//Thread.sleep(100000000000000l);

			// 关闭连接
			if (client.isConnected()) {
				client.disconnect(WSMQTTServerCommon.quiesceTimeout);
			}
			logger.info("Disconnected: delivery token \""
					+ token.hashCode() + "\" received: " + token.isComplete());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
