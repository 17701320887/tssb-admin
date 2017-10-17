package com.tssb.model.system;

import java.util.Date;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:AuditInfo
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("AuditInfo")
public class AuditInfo extends BaseEntity {
	
	
	private Integer	status;		
	private String	reason;		
	private Date	auditDate;		
	private Integer	auditUser;		

	// getter && setter

	public Integer getStatus() {
		return status;
	}

	public AuditInfo setStatus(Integer status) {
		this.status = status;
		return this;
	}
	
	
	public String getReason() {
		return reason;
	}

	public AuditInfo setReason(String reason) {
		this.reason = reason;
		return this;
	}
	
	public Date getAuditDate() {
		return auditDate;
	}

	public AuditInfo setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
		return this;
	}
	
	
	public Integer getAuditUser() {
		return auditUser;
	}

	public AuditInfo setAuditUser(Integer auditUser) {
		this.auditUser = auditUser;
		return this;
	}
	
	@Override
	public String toString() {
		return "AuditInfo [" + "id=" + getId() + ", status=" + status + ", reason=" + reason + ", auditDate=" + auditDate + ", auditUser=" + auditUser +  "]";
	}
}
