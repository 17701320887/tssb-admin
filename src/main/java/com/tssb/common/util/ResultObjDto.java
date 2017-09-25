package com.tssb.common.util;

import java.util.ArrayList;
import java.util.List;


/**
 * 用于ajax返回实体类
 * m 信息 ；s success
 * @author hanrb
 * @date 2013-3-20
 */
public class ResultObjDto {
	private String m;
	private String s;
	private List<String> sArr = new ArrayList<String>();
	private Object obj;
	
	public Object getObj() {
		return obj;
	}
	public void setObj(Object obj) {
		this.obj = obj;
	}
	public List<String> getsArr() {
		return sArr;
	}
	public void setsArr(List<String> sArr) {
		this.sArr = sArr;
	}
	public String getM() {
		return m;
	}
	public void setM(String m) {
		this.m = m;
	}
	public String getS() {
		return s;
	}
	public void setS(String s) {
		this.s = s;
	}
	
}
