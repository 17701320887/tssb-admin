package com.tssb.common.util;

/**
 * Created by admin on 2016/3/30.
 */
public class YxUtils {

    // 每个帐号可建群数量
    public static Integer teamsNum = 95;
    // 每个群可添加学员数量
    public static Integer teamPersonsNum = 950;

    // 设置云信帐号前缀
    public static String prefix = "d_a_";
    // 设置云信昵称前缀
    public static String nickPrefix = "d_n_";
    // 设置学员云信帐号前缀
    public static String userPrifix = "d_u_";

    /**
     * 创建随机的云信帐号id
     * @return
     */
    public static String getRandomAccount(){
        return prefix + System.currentTimeMillis();
    }

    /**
     * 获取云信学员帐号
     * @param userId
     * @return
     */
    public static String getUserYxAccount(Integer userId) {
        return userPrifix + userId;
    }

    /**
     * 创建随机的云信昵称
     * @return
     */
    public static String getRandomNick(){
        return nickPrefix + System.currentTimeMillis();
    }

    public static void main(String[] args){
        System.out.println(YxUtils.getRandomAccount());
    }
}
