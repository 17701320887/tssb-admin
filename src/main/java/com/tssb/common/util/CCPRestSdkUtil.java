package com.tssb.common.util;

import com.cloopen.rest.sdk.CCPRestSDK;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;
import java.util.Set;

/**
 * 语音验证码发送
 * Created by qiaolu on 2016/9/18.
 */
public class CCPRestSdkUtil {
    private static CCPRestSDK restAPI =null;
    private final static Logger logger = LoggerFactory.getLogger(CCPRestSmsUtil.class);
    static{
        try {
        ResourceBundle bundle= PropertyResourceBundle.getBundle("ccpsms");
        restAPI = new CCPRestSDK();
       if("true".equals(bundle.getString("voice.debug"))){
           restAPI.init("sandboxapp.cloopen.com", "8883");
       }else{
            restAPI.init("app.cloopen.com", "8883");
       }

        restAPI.setAccount(bundle.getString("voice.sid"), bundle.getString("voice.token"));
        restAPI.setAppId(bundle.getString("voice.appid"));
        } catch (Exception e) {
            logger.error("配置参数获取异常" + e);
        }
    }

    public static boolean sendVoice(String phones,String strs){
        HashMap<String, Object> result =restAPI.voiceVerify(strs, phones, "", "3", "", "", "");
        if("000000".equals(result.get("statusCode"))){
            //正常返回输出data包体信息（map）
            HashMap<String,Object> data = (HashMap<String, Object>) result.get("data");
            Set<String> keySet = data.keySet();
            for(String key:keySet){
                Object object = data.get(key);
                System.out.println(key +" = "+object);
            }
            logger.info(phones+"语音送达："+strs);
        }else{
            //异常返回输出错误码和错误信息
            logger.info("错误码=" + result.get("statusCode") +" 错误信息= "+result.get("statusMsg"));
            return false;
        }
        return true;
    }


    public static void main(String[] args) {
        CCPRestSdkUtil.sendVoice("18768897556", "112121");
    }
}
