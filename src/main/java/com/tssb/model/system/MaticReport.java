package com.tssb.model.system;


import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:MaticReport
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("MaticReport")
public class MaticReport extends BaseEntity {
	
	
	private Integer	maticId;		
	private Integer	reportId;		

	// getter && setter

	public Integer getMaticId() {
		return maticId;
	}

	public MaticReport setMaticId(Integer maticId) {
		this.maticId = maticId;
		return this;
	}
	
	
	public Integer getReportId() {
		return reportId;
	}

	public MaticReport setReportId(Integer reportId) {
		this.reportId = reportId;
		return this;
	}
	
	@Override
	public String toString() {
		return "MaticReport [" + "id=" + getId() + ", maticId=" + maticId + ", reportId=" + reportId +  "]";
	}
}
