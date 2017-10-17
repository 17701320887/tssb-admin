package com.tssb.common.util;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Administrator on 2016/4/15.
 */
public class DuiaYunXinUtil {
    private static Logger logger = LoggerFactory.getLogger(DuiaYunXinUtil.class);

    public final static String yxIdCreate = "yxIdCreate";
    public final static String teamCreate = "teamCreate";
    public final static String teacherCreate = "teacherCreate";
    public final static String teamJoin = "teamJoin";
    public final static String teamChange = "teamChange";
    public final static String teamDelChange = "teamDelChange";
    public final static String teamConfig = "teamConfig";
    public final static String userUpdate = "userUpdate";

    /**
     * 创建云信帐号：根据班型
     * @param classTypeId 班型id
     * @param loginUserId 登录用户id
     * @return
     */
    public static String yxIdCreate(Long classTypeId, Long loginUserId){
        String url = ParamUtil.duiaYunxinService + "/yunXin/yxId/create";
        HashMap<String, String> param = new HashMap<>();
        param.put("classTypeId", classTypeId.toString());
        param.put("loginUserId", loginUserId.toString());
        return post(url, param);
    }

    /**
     * 创建云信帐号：讲师
     * @param teacherid
     * @return
     */
    public static String teacherCreate(Long teacherid){
        String url = ParamUtil.duiaYunxinService + "/yunXin/teacher/add";
        HashMap<String, String> param = new HashMap<>();
        param.put("teacherid", teacherid.toString());
        return post(url, param);
    }

    /**
     * 创建云信群
     * @param classId 班级id
     * @param loginUserId 登录用户id
     * @return
     */
    public static String teamCreate(Long classId, Long loginUserId){
        String url = ParamUtil.duiaYunxinService + "/yunXin/team/create";
        HashMap<String, String> param = new HashMap<>();
        param.put("classId", classId.toString());
        param.put("loginUserId", loginUserId.toString());
        return post(url, param);
    }

    /**
     * 添加入群接口
     * @param classId
     * @param userId
     * @param loginUserId
     * @return
     */
    public static String teamJoin(Long classId,Long userId,Long loginUserId){
        String url = ParamUtil.duiaYunxinService + "/yunXin/team/join";
        HashMap<String, String> param = new HashMap<>();
        param.put("classId", classId.toString());
        param.put("userId", userId.toString());
        param.put("loginUserId", loginUserId == null ? userId.toString() : loginUserId.toString());
        return post(url, param);
    }

    /**
     * 学员转班转群接口:适用于在原数据上修改班级信息的方式
     * @param classStudentId
     * @param newClassId
     * @param loginUserId
     * @return
     */
    public static String teamChange(Long classStudentId,Long newClassId,Long loginUserId){
        String url = ParamUtil.duiaYunxinService + "/yunXin/team/change";
        HashMap<String, String> param = new HashMap<>();
        param.put("csid", classStudentId.toString());
        param.put("nclassid", newClassId.toString());
        param.put("loginUserId", loginUserId.toString());
        return post(url, param);
    }

    /**
     * 学员转班转群接口:适用于删除掉原数据，而后新建数据的方式
     * @param classStudentId 新群数据的class_student表id
     * @param yxteamId 原始班级所在的yxteamId(云信Accid)
     * @param loginUserId
     * @return
     */
    public static String teamDelChange(Long classStudentId,String yxteamId,Long loginUserId){
        String url = ParamUtil.duiaYunxinService + "/yunXin/team/delChange";
        HashMap<String, String> param = new HashMap<>();
        param.put("csid", classStudentId.toString());
        param.put("yxteamId", yxteamId.toString());
        param.put("loginUserId", loginUserId.toString());
        return post(url, param);
    }

    /**
     * 群聊配置
     * @param data json数据串
     * @return
     */
    public static String teamConfig(String data, Long loginUserId){
        String url = ParamUtil.duiaYunxinService + "/yunXin/team/config";
        HashMap<String, String> param = new HashMap<>();
        param.put("data", data);
        param.put("loginUserId", loginUserId.toString());
        return post(url, param);
    }

    /**
     * 更新学员云信名片
     * @param userId
     * @return
     */
    public static String userUpdate(Long userId){
        String url = ParamUtil.duiaYunxinService + "/yunXin/user/update";
        HashMap<String, String> param = new HashMap<>();
        param.put("userId", userId.toString());
        return post(url, param);
    }

    /**
     * 发送post请求
     * @param url
     * @param hm
     * @return
     */
    private static String post(String url,HashMap<String,String> hm){
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        // 设置请求的header
        httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        try {
            // 设置请求的参数
            List<NameValuePair> nvps = new ArrayList<>();
            for (String key:hm.keySet()) {
                if( hm.get(key)!=null&& !"".equals( hm.get(key))){
                    nvps.add(new BasicNameValuePair(key, hm.get(key)));
                }
            }
            httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));
            // 执行请求
            CloseableHttpResponse response = httpClient.execute(httpPost);
            // 打印执行结果
            HttpEntity entity=response.getEntity();
            String result=EntityUtils.toString(entity, "utf-8");
            EntityUtils.consume(entity);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
