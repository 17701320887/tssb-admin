package com.tssb.common.bean;


/**
 * 分页封装类
 * @author hejianming
 * @date 2013-02-26
 * @param <T>
 */
public class PageModel<T> {
	private int pageNo = 1;
	private int pageSize = 15;
	private int totalRecords;
	
	public int getTotalPages() {
		return (this.totalRecords + this.pageSize - 1) / this.pageSize;
	}
	
	public int getFirstPageNo() {
		return 1;
	}
	
	public int getLastPageNo() {
		return this.getTotalPages();
	}
	
	public int getPreviousPageNo() {
		if (this.pageNo <= 1) {
			return 1;
		}
		return this.pageNo - 1;
	}

	public int getNextPageNo() {
		if (this.pageNo >= this.getLastPageNo()) {
			return this.getLastPageNo();
		}
		return this.pageNo + 1;
	}

	public int getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}

	public int getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getFirstIndex() {
		return (pageNo - 1) * pageSize;
	}


    /**
     * 以下是为了序列化新增的
     */
    private int totalPages;
    private int firstPageNo;
    private int lastPageNo;
    private int previousPageNo;
    private int nextPageNo;
    private int firstIndex;

    public void setFirstIndex(int firstIndex) {
        this.firstIndex = firstIndex;
    }

    public void setNextPageNo(int nextPageNo) {
        this.nextPageNo = nextPageNo;
    }

    public void setPreviousPageNo(int previousPageNo) {
        this.previousPageNo = previousPageNo;
    }

    public void setLastPageNo(int lastPageNo) {
        this.lastPageNo = lastPageNo;
    }

    public void setFirstPageNo(int firstPageNo) {
        this.firstPageNo = firstPageNo;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
