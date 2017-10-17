package com.tssb.common.filter;

import com.tssb.common.servlet.XssRequestWrapper;
import org.apache.shiro.web.servlet.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 防止Xss攻击的过滤器
 * 该过滤器继承了shiro过滤器,只执行一次,内部转发不拦截
 * 过滤器对每一个请求的request包装,使用XssRequestWrappe包装request对象
 * 后续根据request获取参数时,验证xss攻击
 * Created by wangsongpeng on 2015/12/28.
 */
public class XssFilter extends OncePerRequestFilter {

    private Map<String,List<String>> xssTag = new HashMap<String,List<String>>();/*Xss攻击使用的标签*/

    @Override
    protected void doFilterInternal(ServletRequest req, ServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)res;
        XssRequestWrapper requestWrapper = new XssRequestWrapper(request,xssTag);
        filterChain.doFilter(requestWrapper,response);
    }

    public Map<String, List<String>> getXssTag() {
        return xssTag;
    }

    public void setXssTag(Map<String, List<String>> xssTag) {
        this.xssTag = xssTag;
    }
}
