package com.tssb.model.system;

import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.tssb.model.BaseEntity;

import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:Audit
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("Audit")
public class Audit extends BaseEntity {
	
	
	private Integer	status;		
	private Date	auditDate;		
	private Date	modifyDate;		

	// getter && setter

	public Integer getStatus() {
		return status;
	}

	public Audit setStatus(Integer status) {
		this.status = status;
		return this;
	}
	
	public Date getAuditDate() {
		return auditDate;
	}

	public Audit setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
		return this;
	}
	
	public Date getModifyDate() {
		return modifyDate;
	}

	public Audit setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
		return this;
	}
	
	@Override
	public String toString() {
		return "Audit [" + "id=" + getId() + ", status=" + status + ", auditDate=" + auditDate + ", modifyDate=" + modifyDate +  "]";
	}
}
