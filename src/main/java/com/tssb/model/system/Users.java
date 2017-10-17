package com.tssb.model.system;

import java.util.Date;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:Users
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("Users")
public class Users extends BaseEntity {
	
	
	private String	name;		
	private String	password;		
	private String	wxNo;		
	private String	mobile;		
	private String	workNo;		
	private Integer	sex;		
	private Integer	status;		
	private Integer	createUser;		
	private Date	createDate;		
	private Integer	modifyUser;		
	private Date	modifyDate;		
	private Integer	deleteFlag;

	// getter && setter

	public String getName() {
		return name;
	}

	public Users setName(String name) {
		this.name = name;
		return this;
	}
	
	
	public String getPassword() {
		return password;
	}

	public Users setPassword(String password) {
		this.password = password;
		return this;
	}
	
	
	public String getWxNo() {
		return wxNo;
	}

	public Users setWxNo(String wxNo) {
		this.wxNo = wxNo;
		return this;
	}
	
	
	public String getMobile() {
		return mobile;
	}

	public Users setMobile(String mobile) {
		this.mobile = mobile;
		return this;
	}
	
	
	public String getWorkNo() {
		return workNo;
	}

	public Users setWorkNo(String workNo) {
		this.workNo = workNo;
		return this;
	}
	
	
	public Integer getSex() {
		return sex;
	}

	public Users setSex(Integer sex) {
		this.sex = sex;
		return this;
	}
	
	
	public Integer getStatus() {
		return status;
	}

	public Users setStatus(Integer status) {
		this.status = status;
		return this;
	}
	
	
	public Integer getCreateUser() {
		return createUser;
	}

	public Users setCreateUser(Integer createUser) {
		this.createUser = createUser;
		return this;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public Users setCreateDate(Date createDate) {
		this.createDate = createDate;
		return this;
	}
	
	
	public Integer getModifyUser() {
		return modifyUser;
	}

	public Users setModifyUser(Integer modifyUser) {
		this.modifyUser = modifyUser;
		return this;
	}
	
	public Date getModifyDate() {
		return modifyDate;
	}

	public Users setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
		return this;
	}
	
	
	public Integer getDeleteFlag() {
		return deleteFlag;
	}

	public Users setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
		return this;
	}
	
	@Override
	public String toString() {
		return "Users [" + "id=" + getId() + ", name=" + name + ", password=" + password + ", wxNo=" + wxNo + ", mobile=" + mobile + ", workNo=" + workNo + ", sex=" + sex + ", status=" + status + ", createUser=" + createUser + ", createDate=" + createDate + ", modifyUser=" + modifyUser + ", modifyDate=" + modifyDate + ", deleteFlag=" + deleteFlag +  "]";
	}
}
