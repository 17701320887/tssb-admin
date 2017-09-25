package com.tssb.common.util;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by dutianzhao on 2015/9/25.
 */
public class DeviceUtil {

    /**
     * 判断是手机还是pc
     * @param request
     * @return
     */
    public static boolean isMobile(HttpServletRequest request) {
        String agent = request.getHeader("User-Agent");
        if (agent.indexOf("Android") > 0 || agent.indexOf("iPad") > 0 || agent.indexOf("iPhone") > 0
                || agent.indexOf("BlackBerry") > 0 || agent.indexOf("BlackBerry") > 0 || agent.indexOf("Nokia") > 0
                || agent.indexOf("Windows Phone") > 0 || agent.indexOf("IEMobile") > 0) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean isIos(HttpServletRequest request) {
        String agent = request.getHeader("User-Agent");
        if (agent.indexOf("iPad") > 0 || agent.indexOf("iPhone") > 0) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean isAndroid(HttpServletRequest request) {
        String agent = request.getHeader("User-Agent");
        if (agent.indexOf("Android") > 0) {
            return true;
        } else {
            return false;
        }
    }
}
