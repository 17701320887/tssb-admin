<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>对啊网管理系统-员工管理</title>
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
                    <h4 class="panel-title">员工列表</h4>
                </div>
                <div class="panel-body">
                    <form class="form-inline">

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



                        <div class="form-group m-r-10">
                            <input type="text" class="form-control"  style="width:220px;" id="userEmail" placeholder="员工邮箱" />
                        </div>
                        <div class="form-group m-r-10">
                            <input type="text" class="form-control" style="width:220px;" id="userMobile" placeholder="员工手机" />
                        </div>
                        <div class="form-group m-r-10">
                            <input type="text" class="form-control"  style="width:220px;"  id="userNum" placeholder="员工工号" />
                        </div>
                        <div class="form-group  m-r-10" >
                            <div class="input-group">
                                <input  readonly="readonly" class="form-control" style="width:220px;" id="createDate" placeholder="创建日期">
                                <span class="input-group-btn">
									   <button disabled id="showCreateBtn" class="btn btn-default"><i class="fa fa-calendar"></i></button>
									</span>
                            </div>
                        </div>
                        <div class="form-group m-r-10">
                            <select id="userStatus" class="form-control">
                                <option value="-1">--员工状态--</option>
                                <option value="1">在职</option>
                                <option value="0">离职</option>
                            </select>
                        </div>
                            <button type="button" class="btn btn-sm btn-info m-r-5" id="find">查询</button>
                            <button type="button" data-toggle="modal" href="#user-create-alert"  class="btn btn-sm btn-primary m-r-5" id="createUser">新增</button>
                    </form>
                </div>
                <div class="panel-body">
                    <table id="user-table" class="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>员工编号</th>
                            <th>姓名</th>
                            <th>邮箱</th>
                            <th>手机</th>
                            <th>工号</th>
                            <th>性别</th>
                            <th>在职状态</th>
                            <th>最后一次修改人</th>
                            <th>创建时间</th>
                            <th>最后一次修改时间</th>
                            <th>最后一次登录时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/view/base/authority/user_dialog.jsp" %>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap-daterangepicker/moment.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="${pageContext.request.contextPath}/resources/common/switch/js/bootstrap-switch.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/common/utils/js/tool.date.js"></script>
<script src="${pageContext.request.contextPath}/resources/base/auth/js/user.js"></script>
<script>
    var userTable;
    $(document).ready(function () {
        $("#find").click(function () {
            userTable.ajax.reload();
        });
    });
</script>

</body>
</html>