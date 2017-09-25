package com.tssb.common.servlet;

import com.tssb.common.util.StringUtil;
import org.springframework.util.CollectionUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * XssRequest对象包装类
 * 该类继承Servlet规范的Request包装类
 * 在获取参数时,对请求参数进行xss验证
 * Created by wangsongpeng on 2015/12/28.
 */
public class XssRequestWrapper extends HttpServletRequestWrapper{

    private Map<String,List<String>> xssTag = new HashMap<String,List<String>>();/*Xss攻击使用的标签*/

    public XssRequestWrapper(HttpServletRequest servletRequest,Map<String,List<String>> xssTag) {
        super(servletRequest);
        this.xssTag = xssTag;
    }
    @Override
    public String[] getParameterValues(String parameter) {
        String[] values = super.getParameterValues(parameter);
        if (values == null) {
            return null;
        }
        int count = values.length;
        String[] encodedValues = new String[count];
        for (int i = 0; i < count; i++) {
            encodedValues[i] = stripXSS(values[i]);
        }
        return encodedValues;
    }
    @Override
    public String getParameter(String parameter) {
        String value = super.getParameter(parameter);
        return stripXSS(value);
    }
    @Override
    public String getHeader(String name) {
        String value = super.getHeader(name);
        return stripXSS(value);
    }

    /**
     * 验证请求参数是否是Xss注入脚本
     * @param value
     * @return
     */
    private String stripXSS(String value) {
        boolean flag = true;
        StringBuilder htmlSb = new StringBuilder();//节约内存空间
        if ((!StringUtil.isEmpty(value))&&(!CollectionUtils.isEmpty(xssTag))) {
            Set<String> set = xssTag.keySet();//获取当前xss的所有可能注入的代码
            for(String key:set){
                 //如果是HTML标签
                 if(key.equalsIgnoreCase("HtmlTag")){
                     List<String> htmlTag = xssTag.get(key);
                     for(String tag:htmlTag){
                         htmlSb.delete(0,htmlSb.length());//每次清空下htmlSb存放的字符串
                         //添加尖括号,组成html标签,并判断当前请求参数是否包含该HTML标签
                         htmlSb.append("<").append(tag);
                         if(value.toLowerCase().indexOf(htmlSb.toString())!=-1){
                             //表示当前请求参数是Xss注入脚本
                             flag = false;
                             break;
                         }
                     }
                 }
                //如果是其他(扩展)
                if(!flag){
                    break;
                }
            }
            if(!flag){
                //如果是Xss脚本注入代码,则转换为NULL
                value = null;
            }
        }
        return value;
    }

}
