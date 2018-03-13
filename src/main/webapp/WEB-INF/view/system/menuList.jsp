<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>天山时报管理系统-类目管理</title>
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
                    <h4 class="panel-title">类目列表</h4>
                </div>
                <div class="panel-body">
                    <form class="form-inline">
                        <button type="button" data-toggle="modal" href="#menu-create-alert"  class="btn btn-sm btn-primary m-r-5" id="createUser">新增</button>
                    </form>
                </div>
                <div class="panel-body">
                    <table id="user-table" class="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>类目ID</th>
                            <th>类目CODE</th>
                            <th>类目名称</th>
                        </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="menu" items="${newsMenuList}" varStatus="status">
                                <tr>
                                    <th>${status.index}</th>
                                    <th>${menu.id}</th>
                                    <th>${menu.code}</th>
                                    <th>${menu.codeName}</th>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/view/base/authority/news_menu_dialog.jsp" %>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap-daterangepicker/moment.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="${pageContext.request.contextPath}/resources/common/switch/js/bootstrap-switch.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/common/utils/js/tool.date.js"></script>
<script src="${pageContext.request.contextPath}/resources/base/auth/js/new_menu.js"></script>
<script>
    var menuTable;
</script>

</body>
</html>