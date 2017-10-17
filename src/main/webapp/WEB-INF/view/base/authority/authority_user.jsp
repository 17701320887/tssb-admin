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
                            <shiro:hasPermission name="user:find:0">
                            <button type="button" class="btn btn-sm btn-info m-r-5" id="find">查询</button>
                            </shiro:hasPermission>
                            <shiro:hasPermission name="user:save:0">
                            <button type="button" data-toggle="modal" href="#user-create-alert"  class="btn btn-sm btn-primary m-r-5" id="createUser">新增</button>
                            </shiro:hasPermission>
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
                <shiro:hasPermission name="user:find:0">
                userTable = $('#user-table').DataTable({
                    select: true, //是否选中
                    autoWidth: false,
                    deferRender: true,
                    responsive: true,
                    searching: false, //是否开启搜索
                    pagingType: "full_numbers",//分页类型 full_numbers显示所有分页信息
                    processing: false, //是否显示处理状态
                    serverSide: true, //是否开启服务器模式
                    ordering: false, //排序
                    aLengthMenu: [10, 20, 50, 100], //下拉框每页显示数量
                    scrollX: true,
                    ajax: {
                        "url": "/user/serach",
                        "type": "POST",
                        "dataType": "json",
                        "data": function (d) {
                            d.mobile = $("#userMobile").val();
                            d.email = $("#userEmail").val();
                            d.num = $("#userNum").val();
                            d.createDatetime = $("#createDate").val();
                            d.userStatus = $("#userStatus").val();
                        }
                    },
                    columns: [
                        {"data": null},
                        {"data": "id", "visible": false},//visible 隐藏或显示
                        {"data": "username"},
                        {"data": "email"},
                        {"data": "mobile"},
                        {"data": "num"},
                        {"data": "sex"},
                        {
                            "data": "userStatus", "render":function(data,type,row,meta) {
                            return data == 1 ? "在职" : "离职";
                            }
                        },
                        {"data": "lastModifyUserEmail"},
                        {"data": "createDatetime"},
                        {"data": "lastModifyDatetime"},
                        {"data": "lastLoginDatetime"},
                        {
                            "data": null, "render": function (data, type, row, meta) {
                            if (null != data) {
                                var btn = "";
                                <shiro:hasPermission name="user:update:0">
                                btn += '<button class="btn btn-info m-r-5 m-b-5" onclick="updateUserDialog(' + row.id + ');"  data-toggle="modal"   href="#user-update-alert"    type="button">修改</button>';
                                </shiro:hasPermission>
                                <shiro:hasPermission name="user:lock:0">
                                if (data.userLock == 1) {
                                    //当前没有被锁定
                                    btn += '<button onclick="lockUser(this);" class="btn btn-danger m-r-5 m-b-5"  type="button" value="' + row.id + '" status = "' + row.userLock + '"/>锁定</button>';
                                } else {
                                    //当前已被锁定
                                    btn += '<button onclick="lockUser(this);" class="btn btn-danger m-r-5 m-b-5" type="button" value="' + row.id + '" status = "' + row.userLock + '" checked>解锁</button>';
                                }
                                </shiro:hasPermission>
                                return btn;
                            }
                        }
                        },
                    ],
                    columnDefs: [
                        {className: "dt-body-center", "targets": "_all"},
                        {
                            "targets": [9,10, 11],
                            "render": function (data, type, row, meta) {
                                if (data == null) {
                                    return "无登录";
                                }
                                return TimeObjectUtil.formatterDateTime(new Date(data))
                            }
                        }
                    ],
                    language: {
                        lengthMenu: "每页 _MENU_ 条记录",//下拉框文字
                        info: "第 _PAGE_ 页 ( 总共 _PAGES_ 页 ,共 _TOTAL_ 项)",//左下角显示文字
                        infoEmpty: "",//当查询没有数据时左下角显示文字
                        sEmptyTable: "没有数据..",//当查询没有数据时表格中间显示文字
                        paginate: {                          //分页
                            first: "首页",
                            last: "尾页",
                            next: "下一页",
                            previous: "上一页"
                        }
                    },
                    //设置第一列为自增列
                    drawCallback: function (settings) {
                        n = this.api().page.info().start;
                        this.api().column(0).nodes().each(function (cell, i) {
                            cell.innerHTML = ++n;
                        })
                    }
                });
                </shiro:hasPermission>
                $("#find").click(function () {
                    userTable.ajax.reload();
                });
            });


    </script>

    </body>
</html>