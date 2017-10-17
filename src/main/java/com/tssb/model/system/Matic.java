package com.tssb.model.system;

import java.util.Date;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:Matic
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("Matic")
public class Matic extends BaseEntity {
	
	
	private String	title;		
	private String	content;		
	private Integer	topStatus;		
	private Integer	sticeStatus;		
	private Integer	createUser;		
	private Date	createDate;		
	private Integer	modifyUser;		
	private Date	modifyDate;		
	private Integer	deleteFlag;		

	// getter && setter

	public String getTitle() {
		return title;
	}

	public Matic setTitle(String title) {
		this.title = title;
		return this;
	}
	
	
	public String getContent() {
		return content;
	}

	public Matic setContent(String content) {
		this.content = content;
		return this;
	}
	
	
	public Integer getTopStatus() {
		return topStatus;
	}

	public Matic setTopStatus(Integer topStatus) {
		this.topStatus = topStatus;
		return this;
	}
	
	
	public Integer getSticeStatus() {
		return sticeStatus;
	}

	public Matic setSticeStatus(Integer sticeStatus) {
		this.sticeStatus = sticeStatus;
		return this;
	}
	
	
	public Integer getCreateUser() {
		return createUser;
	}

	public Matic setCreateUser(Integer createUser) {
		this.createUser = createUser;
		return this;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public Matic setCreateDate(Date createDate) {
		this.createDate = createDate;
		return this;
	}
	
	
	public Integer getModifyUser() {
		return modifyUser;
	}

	public Matic setModifyUser(Integer modifyUser) {
		this.modifyUser = modifyUser;
		return this;
	}
	
	public Date getModifyDate() {
		return modifyDate;
	}

	public Matic setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
		return this;
	}
	
	
	public Integer getDeleteFlag() {
		return deleteFlag;
	}

	public Matic setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
		return this;
	}
	
	@Override
	public String toString() {
		return "Matic [" + "id=" + getId() + ", title=" + title + ", content=" + content + ", topStatus=" + topStatus + ", sticeStatus=" + sticeStatus + ", createUser=" + createUser + ", createDate=" + createDate + ", modifyUser=" + modifyUser + ", modifyDate=" + modifyDate + ", deleteFlag=" + deleteFlag +  "]";
	}
}
