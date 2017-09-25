package com.tssb.common.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 系统异常管理
 * Created by wangsongpeng on 2015/10/23.
 */
@Component
public class CustomExceptionHandler implements HandlerExceptionResolver {
    private static final Logger logger = LoggerFactory.getLogger(CustomExceptionHandler.class);
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        ModelAndView mv = new ModelAndView();
        HandlerMethod method = null;
        if(null!=o){
             method =(HandlerMethod)o;
        }
        if(e instanceof  BaseException){
            logger.error("控制器" + method.getBean() + "方法" + method.getMethod().getName() + "出现异常,异常信息:" + e);
            logger.error("异常堆栈:",e);
            mv.setViewName("/error/404");
        }else if(e instanceof  RuntimeException){
            logger.error("控制器" + method.getBean() + "方法" + method.getMethod().getName() + "出现异常,异常信息:" + e);
            logger.error("异常堆栈:",e);
            mv.setViewName("/error/500");
        }else{
            logger.error("控制器" + method.getBean() + "方法" + method.getMethod().getName() + "出现异常,异常信息:" + e);
            logger.error("异常堆栈:",e);
            mv.setViewName("/error/500");
        }
        return mv;

    }
}
