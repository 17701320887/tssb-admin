package com.tssb.model.system;


import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:ReportRevert
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("ReportRevert")
public class ReportRevert extends BaseEntity {
	
	
	private Integer	reportId;		
	private Integer	revertId;		

	// getter && setter
	public Integer getReportId() {
		return reportId;
	}

	public ReportRevert setReportId(Integer reportId) {
		this.reportId = reportId;
		return this;
	}
	
	
	public Integer getRevertId() {
		return revertId;
	}

	public ReportRevert setRevertId(Integer revertId) {
		this.revertId = revertId;
		return this;
	}
	
	@Override
	public String toString() {
		return "ReportRevert [" + "id=" + getId() + ", reportId=" + reportId + ", revertId=" + revertId +  "]";
	}
}
