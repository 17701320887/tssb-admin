package com.tssb.common.util;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 消息数缓存工具类
 * Created by dutianzhao on 2015/8/25.
 */
@Component
public class MessageHttpUtil {

    private final static Logger logger = LoggerFactory.getLogger(MessageHttpUtil.class);

    @Resource
    private RestTemplate restTemplate;

    /****************************************************获取消息数*********************************************************************************/

    public MessageModel getMessageRedisData(Long userId){
        MessageModel model=new MessageModel();
        try {
            model = restTemplate.getForObject(ParamUtil.messageRedisRestUrl+"/message?userId="+userId,MessageModel.class);
        } catch (RestClientException e) {
            logger.error("获取message的redis消息数错误",e);
        }
        return model;
    };

    /****************************************************增减消息数*********************************************************************************/

    /**
     * 增加系统消息数
     * @param userId
     * @param increa
     * @return
     */
    public MessageModel increaSysNotice(Long userId, Integer increa){
        return increaMessageRedisData(userId,"sysNotice",0,increa);
    };

    /**
     * 增加获取sys_message消息数，区分type{@link com.duia.bean.system.SysMessage}
     * @param userId
     * @param type
     * @param increa
     * @return
     */
    public MessageModel increaSysMessage(Long userId, Integer type, Integer increa){
        return increaMessageRedisData(userId,"sysMessage",type,increa);
    }

    /**
     * 增加获取duiba_group_topic_reply消息数，区分type
     * @param userId
     * @param type
     * @param increa
     * @return
     */
    public MessageModel increaDuibaMessage(Long userId, Integer type, Integer increa){
        return increaMessageRedisData(userId,"duibaMessage",type,increa);
    }

    /**
     * 增加班级通知数
     * @param userId
     * @param increa
     * @return
     */
    public MessageModel increaClassSysNotice(Long userId, Integer increa){
        return increaMessageRedisData(userId,"classSysNotice",0,increa);
    }

    /**
     * 增加消息数
     * @param userId 用户ID
     * @param tName 消息标识 sysNotice sysMessage classSysNotice
     * @param type 没有就传0
     * @param increa 增加的消息数，可以为负数
     * @return
     */
    private MessageModel increaMessageRedisData(Long userId, String tName, Integer type, Integer increa){
        MessageModel model=new MessageModel();
        try {
            model = restTemplate.getForObject(ParamUtil.messageRedisRestUrl+"/message/changeCount?userId="+userId+"&tName="+tName+"&type="+type+"&increa="+increa,MessageModel.class);
        } catch (RestClientException e) {
            logger.error("增加message的redis消息数错误",e);
        }
        return model;
    };

    /****************************************************setter*********************************************************************************/

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /****************************************************其它*********************************************************************************/


}

@JsonIgnoreProperties(ignoreUnknown = true)
class MessageModel{
    public Integer success;
    public String message;
    public Map<String,List<MsgCountModel>> result;

    public MessageModel() {
    }

    public Integer getSuccess() {
        return success;
    }

    public void setSuccess(Integer success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, List<MsgCountModel>> getResult() {
        return result;
    }

    public void setResult(Map<String, List<MsgCountModel>> result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "MessageModel{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", result=" + result +
                '}';
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
class MsgCountModel{
    public Integer type;
    public Integer count;

    public MsgCountModel() {
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "MsgCountModel{" +
                "type=" + type +
                ", count=" + count +
                '}';
    }
}
