package com.tssb.common.util;

import com.cloopen.rest.sdk.CCPRestSmsSDK;
import org.apache.log4j.Logger;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CCPRestSmsUtil {
	private static CCPRestSmsSDK restAPI =null;
	private static List<Template> templates=new ArrayList<Template>();
	private static Logger log=Logger.getLogger(CCPRestSmsUtil.class);
	static{
        try {

        ResourceBundle bundle=PropertyResourceBundle.getBundle("ccpsms");
		restAPI = new CCPRestSmsSDK();
		if("true".equals(bundle.getString("debug"))){
			restAPI.init("sandboxapp.cloopen.com", "8883");
		}else{
			restAPI.init("app.cloopen.com", "8883");			
		}
		restAPI.setAccount(bundle.getString("sid"), bundle.getString("token"));
		restAPI.setAppId(bundle.getString("appid"));
        } catch (Exception e) {
            log.error("配置参数获取异常" + e);
        }
		templates.add(new Template("7107", "【对啊网】欢迎加入对啊网.*您的验证码是(.*)。视频，做题，直播学习，快来和老师同学一起互动学习！", 1));
		templates.add(new Template("7110", "感谢您(.*)选择对啊网直播课程，您的订单已经生成，请在2小时内支付，支付后将成为对啊网正式学员，享受VIP学员服务！官方客服QQ800055346【对啊网】", 1));
		templates.add(new Template("7111", "恭喜您(.*)已成功购买对啊网直播课程，课程已经自动开通，请进入对啊网个人中心我的班级，按照课表上课，有问题请点击个人中心右侧的管家服务【对啊网】", 1));
	}
	
	private static boolean sendMsg(String phones,String templateId,String[] strs){
		HashMap<String, Object> result =restAPI.sendTemplateSMS(phones, templateId, strs);
        	if("000000".equals(result.get("statusCode"))){
            //正常返回输出data包体信息（map）
            HashMap<String,Object> data = (HashMap<String, Object>) result.get("data");
             Set<String> keySet = data.keySet();
           	for(String key:keySet){
                Object object = data.get(key);
                log.info(key +" = "+object);
            }
            log.info(phones+"短信送达："+strs);
        } else {
            //异常返回输出错误码和错误信息
            log.info("错误码=" + result.get("statusCode") + " 错误信息= " + result.get("statusMsg"));
            return false;
        }
        return true;
    }

    private static Template getTemplateByContent(String content){
		Pattern p;
		Matcher  ma;
		for (Template t : templates) {
			p =Pattern.compile(t.reg);
			ma= p.matcher(content);
			while (ma.find()) {
				Template ret=new Template(t.id, new String[ma.groupCount()]);
				for (int i = 0; i < ma.groupCount(); i++) {
					ret.strs[i]=ma.group(i+1);
				}
				return ret;
			}
		}
		return null;
	}
	
	public static boolean sendMsg(String phones,String content){
		Template template=getTemplateByContent(content);
		if(template!=null){
			return sendMsg(phones, template.id, template.strs);
		}else{
			log.info("无相应模板["+content+"]");
		}
		return false;
	}
	
	
	
	public static void main(String[] args) {
		CCPRestSmsUtil.sendMsg("15811048971", "【对啊网】欢迎加入对啊网，您的验证码是110120。视频，做题，直播学习，快来和老师同学一起互动学习！");
	}
	
	
}

class Template{
	String id;
	String reg;
	int paramNum;
	String[] strs;
	Template(String id, String reg, int paramNum) {
		super();
		this.id = id;
		this.reg = reg;
		this.paramNum = paramNum;
	}
	public Template(String id, String[] strs) {
		super();
		this.id = id;
		this.strs = strs;
	}
}
