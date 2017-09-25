<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ tag pageEncoding="utf-8" %>
<%@ attribute name="pm" required="true" type="com.duia.common.bean.MyPageModel"%>
<%@ attribute name="id" required="true" type="java.lang.String"%>
<%@ attribute name="url" required="true" type="java.lang.String"%>
<c:if test="${pm.totalCount > 0}">
    <div class="dataTables_wrapper">
        <div class="col-sm-5">
            <input type="hidden" id="pageSize" value="${pm.pageSize}">
            <input type="hidden" id="data-ct-id" value="${id}">
            <input type="hidden" id="data-ct-url" value="${url}">
            <div class="dataTables_info" id="card-list-table_info" role="status" aria-live="polite">第 ${pm.pageIndex} 页 ( 总共 ${pm.allPage} 页 ,共 ${pm.totalCount} 项)</div>
        </div>
        <div class="col-sm-7">
            <div class="dataTables_paginate paging_simple_numbers" id="card-list-table_paginate">
                <ul class="pagination">
                    <li class="previous ${pm.pageIndex<=1 ? "disabled" : "paginate_button"}" id="card-list-table_previous">
                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${pm.prev}" tabindex="0">上一页</a>
                    </li>
                    <c:choose>
                        <c:when test="${pm.allPage <= 7}">
                            <c:forEach var="idx" begin="1" end="${pm.allPage}">
                                <li class="${pm.pageIndex == idx ? "active" : "paginate_button"}">
                                    <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                </li>
                            </c:forEach>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="idx" begin="1" end="${pm.allPage}">
                                <c:choose>
                                    <c:when test="${pm.pageIndex < 5}">
                                        <c:if test="${idx <= 5}">
                                            <li class="${pm.pageIndex == idx ? "active" : "paginate_button"}">
                                                <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                            </li>
                                        </c:if>
                                        <c:if test="${idx == 5}">
                                            <li class="disabled">
                                                <a href="javascript:void(0);" aria-controls="card-list-table" tabindex="0">...</a>
                                            </li>
                                        </c:if>
                                        <c:if test="${idx +1  > pm.allPage}">
                                            <li class="paginate_button">
                                                <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                            </li>
                                        </c:if>
                                    </c:when>
                                    <c:when test="${pm.pageIndex >= 5}">
                                        <c:if test="${pm.pageIndex + 4 > pm.allPage}">
                                            <c:choose>
                                                <c:when test="${idx <= 1}">
                                                    <li class="paginate_button">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                                    </li>
                                                    <c:if test="${idx == 1}">
                                                        <li class="disabled">
                                                            <a href="javascript:void(0);" aria-controls="card-list-table" tabindex="0">...</a>
                                                        </li>
                                                    </c:if>
                                                </c:when>
                                                <c:when test="${pm.pageIndex + 5 > pm.allPage && idx + 5 > pm.allPage}">
                                                    <li class="${pm.pageIndex == idx ? "active" : "paginate_button"}">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                                    </li>
                                                </c:when>
                                            </c:choose>
                                        </c:if>
                                        <c:if test="${pm.pageIndex + 4 <= pm.allPage}">
                                            <c:choose>
                                                <c:when test="${idx <= 1}">
                                                    <li class="paginate_button">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                                    </li>
                                                    <c:if test="${idx == 1}">
                                                        <li class="disabled">
                                                            <a href="javascript:void(0);" aria-controls="card-list-table" tabindex="0">...</a>
                                                        </li>
                                                    </c:if>
                                                </c:when>
                                                <c:when test="${((pm.pageIndex - idx) < 2 && pm.pageIndex > idx)}">
                                                    <li class="paginate_button">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                                    </li>
                                                </c:when>
                                                <c:when test="${idx == pm.pageIndex}">
                                                    <li class="paginate_button active">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                                    </li>
                                                </c:when>
                                                <c:when test="${((idx - pm.pageIndex) < 2 && idx > pm.pageIndex)}">
                                                    <li class="paginate_button">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                                    </li>
                                                </c:when>
                                                <c:when test="${idx+1 == pm.allPage}">
                                                    <li class="disabled">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" tabindex="0">...</a>
                                                    </li>
                                                </c:when>
                                                <c:when test="${idx+1 > pm.allPage}">
                                                    <li class="paginate_button">
                                                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${idx}" tabindex="0">${idx}</a>
                                                    </li>
                                                </c:when>
                                            </c:choose>
                                        </c:if>
                                    </c:when>
                                </c:choose>
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                    <li class="next ${pm.pageIndex>=pm.allPage ? "disabled" : "paginate_button"}" id="card-list-table_next">
                        <a href="javascript:void(0);" aria-controls="card-list-table" data-dt-idx="${pm.next}" tabindex="0">下一页</a>
                    </li>
                    <li class="last ${pm.pageIndex>=pm.allPage ? "disabled" : "paginate_button"}" id="adminLog-table_last">
                        <a href="javascript:void(0);" aria-controls="adminLog-table" data-dt-idx="${pm.allPage}" tabindex="0">尾页</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</c:if>