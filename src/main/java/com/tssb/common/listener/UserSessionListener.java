package com.tssb.common.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

public class UserSessionListener implements HttpSessionBindingListener {
    private static Logger logger = LoggerFactory.getLogger(UserSessionListener.class);

    /**
     * 让HttpSessionBindingListener被set到session里时，运行
     *
     * @param httpSessionBindingEvent
     */
    @Override
    public synchronized void valueBound(HttpSessionBindingEvent httpSessionBindingEvent) {

    }

    /**
     * 当session超时销毁或者HttpSessionBindingListener被从session中移除的时候运行
     *
     * @param httpSessionBindingEvent
     */
    @Override
    public synchronized void valueUnbound(HttpSessionBindingEvent httpSessionBindingEvent) {

    }

}
