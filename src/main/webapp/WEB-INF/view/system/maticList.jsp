<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>对啊网管理系统-新闻管理</title>
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/extensions/Select/css/select.bootstrap.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/resources/common/switch/css/bootstrap-switch.min.css" rel="stylesheet" />
</head>
<body>
<div>
    <div class="row">
        <div class="col-md-10" style="width:100%;">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <div class="panel-heading-btn">
                        <%--     <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                             <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>--%>
                    </div>
                    <h4 class="panel-title">新闻列表</h4>
                </div>
                <div class="panel-body">
                    <form action="/system/findUserList" method="get" class="form-inline">
                        <div class="alert alert-danger" id="error_alert" style="display:none;">
                            <button type="button" class="close" data-dismiss="alert">
                                <span aria-hidden="true">×</span>
                            </button>
                            失败
                        </div>

                        <div class="alert alert-success" id="success_alert" style="display:none;">
                            <button type="button" class="close" data-dismiss="alert">
                                <span aria-hidden="true">×</span>
                            </button>
                            成功
                        </div>
                        <button type="button" data-toggle="modal" href="#matic-create-alert"  class="btn btn-sm btn-primary m-r-5" id="createUser">新闻发布</button>
                    </form>
                </div>
                <div class="panel-body">
                    <table id="user-table" class="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <th>编号</th>
                            <th>内容</th>
                            <th>图片</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <%--<c:forEach var="users" items="${usersList}" varStatus="status">
                            <tr>
                                <th>${users.id}</th>
                                <th>${users.wxNo}</th>
                                <th>${users.name}</th>
                                <th>${users.mobile}</th>
                                <th>${users.workNo}</th>
                                <th>${users.sex eq 0?'男':'女'}</th>
                                <th><fmt:formatDate value="${users.createDate}" type="both" /></th>
                                <th>
                                    <button type="button" data-toggle="modal" href="#user-edit-alert"  class="btn btn-sm btn-primary m-r-5" onclick="editClick('${users.id}','${users.wxNo}','${users.name}','${users.mobile}','${users.workNo}')">编辑</button>
                                    <button type="button" data-toggle="modal" class="btn btn-sm btn-primary m-r-5" onclick="delUser('${users.id}')">删除</button>
                                </th>
                            </tr>
                        </c:forEach>--%>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/view/base/authority/matic_dialog.jsp" %>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap-daterangepicker/moment.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="${pageContext.request.contextPath}/resources/common/switch/js/bootstrap-switch.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/common/utils/js/tool.date.js"></script>
<script src="${pageContext.request.contextPath}/resources/base/auth/js/user.js"></script>
</body>
</html>