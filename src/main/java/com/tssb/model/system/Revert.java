package com.tssb.model.system;

import java.util.Date;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:Revert
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("Revert")
public class Revert extends BaseEntity {
	
	
	private String	content;		
	private Date	revertDate;		
	private Integer	revertUser;		
	private Integer	deleteFlag;		

	// getter && setter

	public String getContent() {
		return content;
	}

	public Revert setContent(String content) {
		this.content = content;
		return this;
	}
	
	public Date getRevertDate() {
		return revertDate;
	}

	public Revert setRevertDate(Date revertDate) {
		this.revertDate = revertDate;
		return this;
	}
	
	
	public Integer getRevertUser() {
		return revertUser;
	}

	public Revert setRevertUser(Integer revertUser) {
		this.revertUser = revertUser;
		return this;
	}
	
	
	public Integer getDeleteFlag() {
		return deleteFlag;
	}

	public Revert setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
		return this;
	}
	
	@Override
	public String toString() {
		return "Revert [" + "id=" + getId() + ", content=" + content + ", revertDate=" + revertDate + ", revertUser=" + revertUser + ", deleteFlag=" + deleteFlag +  "]";
	}
}
