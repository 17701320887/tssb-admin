package com.tssb.common.util;

import java.util.LinkedHashMap;
import java.util.Map;

public class HrUtil {
	
	public static final Map<Integer,String> STATUS_MAP=new LinkedHashMap<Integer,String>();
	static{
		STATUS_MAP.put(1, "启用");
		STATUS_MAP.put(0, "停用");
	}
	
	public static final Map<Integer,String> STATUS_MAP_SEARCH=new LinkedHashMap<Integer,String>();
	static{
		STATUS_MAP_SEARCH.put(-1, "全部");
		STATUS_MAP_SEARCH.put(1, "启用");
		STATUS_MAP_SEARCH.put(0, "停用");
	}
	
	public static final Map<Integer,String> RESUME_MAP=new LinkedHashMap<Integer,String>();
	static{
		RESUME_MAP.put(1, "未约");
		RESUME_MAP.put(2, "已约");
		RESUME_MAP.put(3, "未通过");
		RESUME_MAP.put(4, "放弃");
		RESUME_MAP.put(5, "丢弃");
		RESUME_MAP.put(6, "录用");
	}
	
	public static final Map<Integer,String> RESUME_MAP_SEARCH=new LinkedHashMap<Integer,String>();
	static{
		RESUME_MAP_SEARCH.put(-1, "全部");
		RESUME_MAP_SEARCH.put(1, "未约");
		RESUME_MAP_SEARCH.put(2, "已约");
		RESUME_MAP_SEARCH.put(3, "未通过");
		RESUME_MAP_SEARCH.put(4, "放弃");
		RESUME_MAP_SEARCH.put(5, "丢弃");
		RESUME_MAP_SEARCH.put(6, "录用");
	}
	
	public static final Map<Integer,String> RESUME_TYPE=new LinkedHashMap<Integer,String>();
	static{
		RESUME_TYPE.put(1, "新人简历");
		RESUME_TYPE.put(2, "人才库");
		RESUME_TYPE.put(3, "回收站");
	}
	
	public static final Map<Integer,String> WORK_YEAR_MAP_SEARCH=new LinkedHashMap<Integer,String>();
	static{
		WORK_YEAR_MAP_SEARCH.put(-1, "全部");
		WORK_YEAR_MAP_SEARCH.put(1, "1年以下");
		WORK_YEAR_MAP_SEARCH.put(2, "1~2年");
		WORK_YEAR_MAP_SEARCH.put(3, "2~3年");
		WORK_YEAR_MAP_SEARCH.put(4, "3~5年");
		WORK_YEAR_MAP_SEARCH.put(5, "5~10年");
		WORK_YEAR_MAP_SEARCH.put(6, "10~15年");
		WORK_YEAR_MAP_SEARCH.put(7, "15年以上");
	}
	
	public static final Map<Integer,String> WORK_YEAR_MAP=new LinkedHashMap<Integer,String>();
	static{
		WORK_YEAR_MAP.put(1, "1年以下");
		WORK_YEAR_MAP.put(2, "1~2年");
		WORK_YEAR_MAP.put(3, "2~3年");
		WORK_YEAR_MAP.put(4, "3~5年");
		WORK_YEAR_MAP.put(5, "5~10年");
		WORK_YEAR_MAP.put(6, "10~15年");
		WORK_YEAR_MAP.put(7, "15年以上");
	}
	
	public static final Map<Integer,String> EDUCATION_MAP_SEARCH=new LinkedHashMap<Integer,String>();
	static{
		EDUCATION_MAP_SEARCH.put(-1, "全部");
		EDUCATION_MAP_SEARCH.put(1, "博士");
		EDUCATION_MAP_SEARCH.put(2, "硕士");
		EDUCATION_MAP_SEARCH.put(3, "本科");
		EDUCATION_MAP_SEARCH.put(4, "专科");
		EDUCATION_MAP_SEARCH.put(5, "高中");
		EDUCATION_MAP_SEARCH.put(6, "初中");
		EDUCATION_MAP_SEARCH.put(7, "小学");
	}
	
	public static final Map<Integer,String> EDUCATION_MAP=new LinkedHashMap<Integer,String>();
	static{
		EDUCATION_MAP.put(1, "博士");
		EDUCATION_MAP.put(2, "硕士");
		EDUCATION_MAP.put(3, "本科");
		EDUCATION_MAP.put(4, "专科");
		EDUCATION_MAP.put(5, "高中");
		EDUCATION_MAP.put(6, "初中");
		EDUCATION_MAP.put(7, "小学");
	}
	
	public static final Map<Integer,String> WORK_STATUS_MAP_SEARCH=new LinkedHashMap<Integer,String>();
	static{
		WORK_STATUS_MAP_SEARCH.put(-1, "全部");
		WORK_STATUS_MAP_SEARCH.put(1, "在职");
		WORK_STATUS_MAP_SEARCH.put(2, "离职");
		WORK_STATUS_MAP_SEARCH.put(3, "应届生");
	}
	
	public static final Map<Integer,String> WORK_STATUS_MAP=new LinkedHashMap<Integer,String>();
	static{
		WORK_STATUS_MAP.put(1, "在职");
		WORK_STATUS_MAP.put(2, "离职");
		WORK_STATUS_MAP.put(3, "应届生");
	}

}
