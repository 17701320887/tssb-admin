package com.tssb.common.constants;
/**
 * Created by wsp on 2015/6/9.
 */
public class Constants {
    public final static Integer STU_TYPE_FORMAL = 1; /*正式学员*/
    public final static Integer STU_TYPE_TEMP = 2; /*临时学员*/
    public final static String  SPACE = " ";
    public final static String[] CLASS_SCHEDULE_COURSE = new String[]{"classOrder","classDate"};/*课表章节排序字段*/
    public final static String CLASS_CLASSDATE = "classDate";/*临时vip按时间排序 */

    public final static String DEFAULT_PWD = "123456";//默认密码
    public final static String USER_LOGIN = "user";//用户session
    public final static String USER_LISTENER = "user_listener";//用户session
    public final static String USER_ONLINE_TIME = "user_online_time";//用户session
    public final static int SWFCONVER_SIZE = 10;//每次任务转换文件的个数
    public final static int SWFCONVER_MAX_FAIL_SIZE = 5; // 最大转换失败次数(超过此次数的任务不再进行转换)
    public final static int SWFCONVER_BATCH_FAIL_SIZE = 10;//失败任务每次转换文件个数
    public final static String XILIE_CODE = "xili";//系列     dic_code
    public final static String CITY_CODE = "city";//区域     dic_code
    public final static String EBK_CODE = "ebk";//书籍类型     dic_code
    public final static String ITEM_CODE = "item";//sku     dic_code
    public final static String DEFINDED_NAME = "还木有昵称";


    public final static Integer USER_TYPE_NORMAL = 1; //用户类型  直接注册用户
    public final static Integer USER_TYPE_IMPORT = 2;   //用户类型 微博，QQ等引入的用户
    public final static Integer USER_TYPE_ADMIN = 3;    //用户类型 管理员
    public final static String  USER_VIP = "userVip";//VIP用户在session中的标识
    public final static String  USER_SKU = "userSku";//用户sku在session中的标识

    //题库常量
    public final static Integer QE_URGENT_DATE = 30;//定义最紧迫时间天数
    public final static Integer QE_SHOWREPORT_NUM = 5;//显示报告要求答题的个数
    public final static long QE_HOT_TIME = 24 * 60 * 60; //定时任务更新时间 24*60*60
    public final static long QE_HOT_COUNT = 1000;//定时任务最热个数 1000
    public final static Integer QE_QUICK_QUESTION_NUM = 15;//快速15题个数
    public final static Integer QE_SHORT_QUESTION_NUM = 5;//简答题5道
    public final static int[] QE_CHOICE_MODE_IDS = {1, 2, 3}; //选择题id类型
    public final static int[] QE_SHORT_MODE_IDS = {4};//简答题id类型
    public final static Integer QE_FOCUX_COUNT = 100;  //关注题个数
    public final static String QE_TIKU_URL = "www.xiyitiku.com"; //题库独立域名
    public final static String QE_TIKU_INDEX = "/queProject";  //题库首页
    public final static String QE_TIKU_SESSIONID = "sessionId"; //蜥蜴题库手机注册短信验证
    public final static String QE_TIKU_SUNLANDS_URL = "xiyi.ooooo.org.cn";
    public final static Integer QE_SERVERY_IS_OPEN = 1; //题库问卷调查是否开启，1为不开始，0为开启
    public final static String QE_LOGIN_FLAG = "loginFlag";
    public final static String QE_NOTCE_NEW = "noticeNew";
    //临时VIP常量
    public final static Integer SHORT_VIP_STOP_DATE = 11;//临时VIP有效时间 11天
    public final static Integer SHORT_VIP_TYPE = 2;//临时VIP类型
    public final static Integer VIP_TYPE = 1;//VIP类型
    public final static Integer TEMP_EXP_COUNT = 2;//临时VIP体验课程数
    //会计随身学
    public final static Integer OPERATE_TYPE_JOIN = 0;//进入
    public final static Integer OPERATE_TYPE_DOWN = 1;//下载
}
