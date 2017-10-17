package com.tssb.common.filter;

import com.tssb.common.util.MenuUtil;
import com.tssb.common.util.ParamUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * model中注入域名信息
 * Created by dutianzhao on 2015/7/7.
 */
public class DomainFilter extends HandlerInterceptorAdapter {

    private final static Logger logger = LoggerFactory.getLogger(DomainFilter.class);
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    /**
     * This implementation is empty.
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if(modelAndView!=null && !modelAndView.getViewName().contains("redirect:") && !modelAndView.getViewName().contains("forward:")){
            //org.cn 域名问题
            String uri = request.getRequestURL().toString();
            modelAndView.addObject("duiaDomain", ParamUtil.duiaDomain.replace("duia.com","duia.org.cn"));
            modelAndView.addObject("tikuDomain", ParamUtil.tikuDomain.replace("duia.com","duia.org.cn"));
            modelAndView.addObject("duibaDomain", ParamUtil.duibaDomain.replace("duia.com","duia.org.cn"));
            modelAndView.addObject("newTikuDomain", ParamUtil.newTikuDomain.replace("duia.com","duia.org.cn"));

            //域名信息
            //modelAndView.addObject("duiaDomain", ParamUtil.duiaDomain);
            //modelAndView.addObject("tikuDomain", ParamUtil.tikuDomain);
            //modelAndView.addObject("duibaDomain", ParamUtil.duibaDomain);
            modelAndView.addObject("oldDuiaDomain", ParamUtil.oldDuiaDomain);
            modelAndView.addObject("imgDomain",ParamUtil.imageServicePath);
            modelAndView.addObject("imgDomain1",ParamUtil.firstImageServicePath);
            modelAndView.addObject("imgDomain2",ParamUtil.secondImageServicePath);
            modelAndView.addObject("downloadDomain",ParamUtil.downloadDomain);
            modelAndView.addObject("messageDomain",ParamUtil.messageRedisRestUrl);
            modelAndView.addObject("tongjiDomain",ParamUtil.tongjiDomain);
            //sku信息
            boolean flag=false;
            HttpSession session=request.getSession();
            Long skuId= (Long) modelAndView.getModelMap().get("sku");
        }
    }
    
}