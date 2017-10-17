package com.tssb.model.system;


import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:AuditAuditInfo
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("AuditAuditInfo")
public class AuditAuditInfo extends BaseEntity {
	
	
	private Integer	auditId;		
	private Integer	auditInfoId;		

	// getter && setter

	public Integer getAuditId() {
		return auditId;
	}

	public AuditAuditInfo setAuditId(Integer auditId) {
		this.auditId = auditId;
		return this;
	}
	
	
	public Integer getAuditInfoId() {
		return auditInfoId;
	}

	public AuditAuditInfo setAuditInfoId(Integer auditInfoId) {
		this.auditInfoId = auditInfoId;
		return this;
	}
	
	@Override
	public String toString() {
		return "AuditAuditInfo [" + "id=" + getId() + ", auditId=" + auditId + ", auditInfoId=" + auditInfoId +  "]";
	}
}
