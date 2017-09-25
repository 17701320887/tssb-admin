package com.tssb.common.util;

public class ParamUtil {
    public static String hostUrl;
    
    /**
     * 图片服务器绝对地址
     */
    public static String imageServiceRealPath;//  D:/ProgramFiles/Tomcat 6.0/webapps/mars/

    /**
     * pdf服务器地址
     */
    public static String pdfServicePath;

    /**
     * 图片服务器绝对地址
     */
    public static String imageServicePath;//  http://localhost:8080/mars/

    /**
     * 图片服务器绝对地址1
     */
    public static String firstImageServicePath;

    /**
     * 图片服务器绝对地址2
     */
    public static String secondImageServicePath;
    
    /**
     * flash 直播路径
     */
    public static String liveSwfPath;
     /**
     * 消息调用题库信息，接口里的url路径
     */
    public static String subjectCommentUrl;//  http://api.cs.duia.com/subjectComment
    /**
     * 接口域名
     * */
    public static String apiDomain;
    /**
     * 官网域名
     */
    public static String duiaDomain;

    /**
     * 旧版官网域名
     */
    public static String oldDuiaDomain;

    /**
     * 题库域名
     */
    public static String tikuDomain;

    /**
     * 对吧域名
     */
    public static String duibaDomain;

    ////nodejs 服务器ip
    public static String nodeIp;

    /**
     * 下载域名
     */
    public static String downloadDomain;

    /**
     * sku首页获取精品题库接口地址
     */
    public static String homeRestTikuUri;
    public static String urlPath;/*域名*/
    public static String officialQQ; /*官方qq*/
  	//推送消息服务器地址
  	public static String mqttUrl;

    //用户图像地址
    public static String userHeadPicturePath;

    //招聘图像地址
    public static String zhaopinPicturePath;

    //转班服务 重修凭证
    public static String zhuanbanImgPath;

    //消息数接口地址k
    public static String messageRedisRestUrl;

    //分批支付订单金额
    public static String batchPayMaxMoney;

    //订单有效期
    public static Integer payOrderUseHours;

    /**
     * 统计接口地址
     */
    public static String tongjiDomain;

    /**
     * 对啊云信服务地址
     */
    public static String duiaYunxinService;

    /**
     * 对啊帮api接口地址
     */
    public static String duibaApiDomain;

    /**
     * 单点登录地址
     */
    public static String ssoUrl;


    /**
     * 重修上线时间
     */
    public static String rebuildOnlineTime;

    //生成积分消息队列及其转换器
    public static String rabbitmqPointQueue;
    public static String rabbitmqPointExchange;
    public static Integer givePointProportion;

    /*获取题库科目地址*/
    public static String homeTikuInfoUri;
    public static String newDuiaCommodityUrl;
    public static String newDuiaPayUrl;


    /*新版题库域名*/
    public static String newTikuDomain;
}
