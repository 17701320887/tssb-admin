package com.tssb.common.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author 杜天曌	 <br />
 * 2013-9-1 下午1:01:00	<br />
 * 取出所有html标签
 */
public class StringUtil {
	public static String removeHtml(String str) {
		int sz = str.length();
		StringBuffer buffer = new StringBuffer(sz);
		boolean inTag = false;
		for (int i = 0; i < sz; i++) {
			char ch = str.charAt(i);
			if (ch == '<') {
				inTag = true;
			} else if (ch == '>') {
				inTag = false;
			}else{
				if (!inTag) {
					buffer.append(ch);
				}
			}
		}
		return buffer.toString();
	}
	
	/**
	 * 去除敏感字符
	 * @param str
	 * @return
	 */
	public static String removeSensitiveWord(String str){
		if(str!=null && !str.trim().equals("")){
			String flt = "',and,exec,insert,select,delete,update,count,*,%,chr,mid,master,truncate,char,declare,;,or,-,+";
			String filter[] = flt.split(",");
			for (int i = 0; i < filter.length; i++) {
				if(str.indexOf(filter[i])>-1){
					str = str.replaceAll(filter[i], "");
				}
			}
		}
		return str;
	}
	
	/**
	 * 去除敏感字符,可以包含"-"
	 * @param str
	 * @return
	 */
	public static String removeSensitiveWordSimple(String str){
		if(str!=null && !str.trim().equals("")){
			String flt = "',and,exec,insert,select,delete,update,count,*,%,chr,mid,master,truncate,char,declare,;,or,+";
			String filter[] = flt.split(",");
			for (int i = 0; i < filter.length; i++) {
				if(str.indexOf(filter[i])>-1){
					str = str.replaceAll(filter[i], "");
				}
			}
		}
		return str;
	}
	
	public static boolean isEmpty(String str){
		if(str==null){
			return true;
		}
		if(str.trim().equals("")){
			return true;
		}
		return false;
	}

    public static boolean isNotEmpty(String str){
        return !isEmpty(str);
    }

	/** 
     * 说明：汉字长度2,字符长度1
     *    汉字的处理：start若只取到半个汉字则开始处为start+1;
     *    start+length若只取到半个汉字则算一个字;
     * @param str    待处理字符串   
     * @param start 处理的首位置   
     * @param length 长度   
     * @param more   省略符号
     * @return String
     */ 
	public static String getSubString(String str, int start, int length, String more) {
		length += start;
		int len = 0;
		StringBuffer sb = new StringBuffer();
		String resStr = "";
		int k = 0;
		while (len < length && k < str.length()) {
			char c = str.charAt(k++);
			if (c > 255) {
				len += 2;
				if (len > length)
					break;
			} else {
				len += 1;
			}
			sb.append(c);
			if (len == start || len == start + 1) {
				resStr = sb.toString();
			}
		}
		if (k == str.length()) {
			return sb.toString().replaceFirst(resStr, "");
		}
		return sb.toString().replaceFirst(resStr, "") + more;
	}
	
	/**
	 * 去掉特殊字符，如：换行
	 * @param str
	 * @return
	 */
	public static String removeSpecilChar(String str) {
		String result = "";
		if (null != str) {
			Pattern pat = Pattern.compile("\\s*|\n|\r|\t");
			Matcher mat = pat.matcher(str);
			result = mat.replaceAll("");
		}
		return result;
	}
	
	public static String arrayToString(String[] array){
		String str="";
		if(array!=null){
			for(int i=0;i<array.length;i++){
				if(i!=(array.length-1)){
					str=str+array[i]+",";
				}else{
					str=str+array[i];
				}
			}
		}
		return str;
	}
	
	public static String arrayToString(Integer[] array){
		String str="";
		if(array!=null){
			for(int i=0;i<array.length;i++){
				if(i!=(array.length-1)){
					str=str+String.valueOf(array[i])+",";
				}else{
					str=str+array[i];
				}
			}
		}
		return str;
	}
	
	public static String arrayToString(List<Integer> array){
		String str="";
		if(array!=null && array.size()>0){
			for(int i=0;i<array.size();i++){
				if(i!=(array.size()-1)){
					str=str+String.valueOf(array.get(i))+",";
				}else{
					str=str+array.get(i);
				}
			}
		}
		return str;
	}
	
	public static String stringListToString(List<String> array){
		String str="";
		if(array!=null && array.size()>0){
			for(int i=0;i<array.size();i++){
				if(i!=(array.size()-1)){
					str=str+String.valueOf(array.get(i))+",";
				}else{
					str=str+array.get(i);
				}
			}
		}
		return str;
	}

    /**
     * 尖角号转换，且去除换行
     * @param str
     * @return
     */
    public static String replaceSharpNo(String str){
        if(isEmpty(str)){
            return null;
        }
        str=removeSpecilChar(str);
        str=str.replace("<","&lt;").replace(">","&gt");
        return str;
    }

	/**
	 * 字符串分割转换为list
	 * @param str
	 * @return
	 */
	public static List<String> stringToList(String str,String symbol){
		List<String> list = new ArrayList<String>();
		if(str.indexOf(symbol) == -1){
			list.add(str);
		}else{
			list = Arrays.asList(str.split(symbol));
		}
		return 	list;
	}
}
