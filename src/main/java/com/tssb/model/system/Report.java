package com.tssb.model.system;

import java.util.Date;

import com.tssb.model.BaseEntity;
import org.apache.ibatis.type.Alias;
import com.tssb.model.BaseEntity;

/**
 * POJO:Report
 * 
 * @author duia_builder
 * @date 2017-9-25
 */
@SuppressWarnings("serial")
@Alias("Report")
public class Report extends BaseEntity {
	
	
	private String	title;		
	private Integer	praise;		
	private Integer	commentCount;		
	private String	imgUrl;		
	private String	desc;		
	private String	content;		
	private Date	publishTime;		
	private Integer	publishUser;		
	private Integer	auditId;		
	private Integer	deleteFlag;		

	// getter && setter

	public String getTitle() {
		return title;
	}

	public Report setTitle(String title) {
		this.title = title;
		return this;
	}
	
	
	public Integer getPraise() {
		return praise;
	}

	public Report setPraise(Integer praise) {
		this.praise = praise;
		return this;
	}
	
	
	public Integer getCommentCount() {
		return commentCount;
	}

	public Report setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
		return this;
	}
	
	
	public String getImgUrl() {
		return imgUrl;
	}

	public Report setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
		return this;
	}
	
	
	public String getDesc() {
		return desc;
	}

	public Report setDesc(String desc) {
		this.desc = desc;
		return this;
	}
	
	
	public String getContent() {
		return content;
	}

	public Report setContent(String content) {
		this.content = content;
		return this;
	}
	
	public Date getPublishTime() {
		return publishTime;
	}

	public Report setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
		return this;
	}
	
	
	public Integer getPublishUser() {
		return publishUser;
	}

	public Report setPublishUser(Integer publishUser) {
		this.publishUser = publishUser;
		return this;
	}
	
	
	public Integer getAuditId() {
		return auditId;
	}

	public Report setAuditId(Integer auditId) {
		this.auditId = auditId;
		return this;
	}
	
	
	public Integer getDeleteFlag() {
		return deleteFlag;
	}

	public Report setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
		return this;
	}
	
	@Override
	public String toString() {
		return "Report [" + "id=" + getId() + ", title=" + title + ", praise=" + praise + ", commentCount=" + commentCount + ", imgUrl=" + imgUrl + ", desc=" + desc + ", content=" + content + ", publishTime=" + publishTime + ", publishUser=" + publishUser + ", auditId=" + auditId + ", deleteFlag=" + deleteFlag +  "]";
	}
}
