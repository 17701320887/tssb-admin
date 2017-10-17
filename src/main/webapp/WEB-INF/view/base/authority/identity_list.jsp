<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2016/10/28
  Time: 11:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<html>
<head>
    <title>对啊网管理系统-身份管理</title>
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css"
          rel="stylesheet"/>
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/extensions/Select/css/select.bootstrap.min.css"
          rel="stylesheet"/>

    <%--jQuery fileupload 依赖样式--%>
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css"
          rel="stylesheet"/>
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/jquery-file-upload/css/jquery.fileupload.css"
          rel="stylesheet"/>
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/jquery-file-upload/css/jquery.fileupload-ui.css"
          rel="stylesheet"/>
</head>
<body>
<div class="row">
    <div class="col-md-10" style="width:100%;">
        <div class="panel panel-inverse">
            <div class="panel-heading">
                <div class="panel-heading-btn">
                    <%--     <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                         <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>--%>
                </div>
                <h4 class="panel-title">身份列表</h4>
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
                        <input type="text" class="form-control" style="width:220px;" id="userNum" placeholder="员工工号"/>
                    </div>
                    <div class="form-group m-r-10">
                        <input type="text" class="form-control" style="width:220px;" id="userEmail" placeholder="员工邮箱"/>
                    </div>

                    <shiro:hasPermission name="identity:find:0">
                        <button type="button" class="btn btn-sm btn-info m-r-5" id="find">查询</button>
                    </shiro:hasPermission>

                </form>
            </div>


            <div class="panel-body">
                <table id="user-table" class="table table-striped table-bordered" width="100%">
                    <thead>
                    <tr>
                        <th width="10%">序号</th>
                        <th width="10%"></th>
                        <th width="10%">工号</th>
                        <th width="10%">姓名</th>
                        <th width="10%">邮箱</th>
                        <th width="10%">手机</th>
                        <th width="10%">身份</th>
                        <th width="10%">在职状态</th>
                        <th width="10%">最后一次修改人</th>
                        <th width="10%">操作</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>

<%@include file="/WEB-INF/view/base/authority/identity_modify.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets/plugins/DataTables/extensions/Select/js/dataTables.select.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/common/utils/js/tool.date.js"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets/plugins/jquery-file-upload/js/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/assets/plugins/jquery-file-upload/js/jquery.fileupload.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/jquery.validate.min.js"></script>

<script type="text/javascript">
    var path = $("#path").val();
    var userTable;
    $(document).ready(function () {
        <shiro:hasPermission name="identity:find:0">
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
                "url": path+"/identity/search",
                "type": "POST",
                "dataType": "json",
                "data": function (d) {
                    d.email = $("#userEmail").val();
                    d.num = $("#userNum").val();
                }
            },
            columns: [
                {"data": null},
                {"data": "id", "visible": false},//visible 隐藏或显示
                {"data": "num"},
                {"data": "username"},
                {"data": "email"},
                {"data": "mobile"},
                {
                    "data": "position", "render": function (data, type, row, meta) {///1:老师，2：教务 3：销售 4：财务 5：技术 6：其他
                    return ChangPositonIdToText(data);

                }
                },
                {
                    "data": "userStatus", "render": function (data, type, row, meta) {
                    return data == 1 ? "在职" : "离职";
                }
                },
                {"data": "lastModifyUserEmail"},
                {
                    "data": null, "render": function (data, type, row, meta) {
                    if (null != data) {
                        var btn = "";
                        <shiro:hasPermission name="identity:update:0">
                        btn += '<button id="btn_'+ row.id +'"  class="btn btn-warning  m-r-5 m-b-5" onclick="updateIdentityDialog(' + row.id + ');"  data-toggle="modal"   href="#identity-update-alert"    type="button">修改</button>';
                        </shiro:hasPermission>
                        return btn;
                    }
                }
                },
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
                var n = this.api().page.info().start;
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


    function updateIdentityDialog(userID) {
        $.ajax({
            url: path+"/identity/entity",
            type: "post",
            dataType: "json",
            cache: false,
            async: true,
            data: {"id": userID},
            success: function (datas) {
                if (ExceptionDialog(datas)) {
                    var result = datas.result;
                    $("#hid_authorityUserId").val(userID);
                    var updateIdentityForm =$("#updateIdentityForm");
                    updateIdentityForm.find("#info_mobile").text(result.mobile);
                    updateIdentityForm.find("#info_name").text(result.username);
                    updateIdentityForm.find("#info_email").text(result.email);
                    updateIdentityForm.find("#info_num").text(result.num);
                    var position = result.position;
                    if(position==null)
                    {
                        $("input[name='update_position'][value='" + 6 + "']").attr("checked", true);
                    }else{
                        $("input[name='update_position'][value='" + position + "']").attr("checked", true);
                    }



                    if (position == 1) {
                        $.ajax({
                            url: path+"/identity/get",
                            type: "get",
                            dataType: "json",
                            cache: false,
                            async: true,
                            data: {"authorityUserId": userID},
                            success: function (datas) {
                                if (ExceptionDialog(datas)) {
                                    if(datas.result==null)
                                    {
                                        $().toastmessage('showErrorToast', "该员工的教师身份不全,请重新选择并保存");
                                        return;

                                    }
                                    var result = datas.result.identityBeanDto;
                                    var path=datas.result.imageServicePath;
                                    $("#live_teacher_part").show();
                                    $("input[name='update_enable'][value='" + result.enable + "']").attr("checked", true);

                                    updateIdentityForm.find("#update_sku").val(result.sku);
                                    updateIdentityForm.find("#update_sort").val(result.sort);
                                    updateIdentityForm.find("#update_teacher_nike").val(result.teacherNike);
                                    updateIdentityForm.find("#update_teacher_feature").val(result.marks);
                                    updateIdentityForm.find("#update_lesson_id").val(result.courseId);
                                    updateIdentityForm.find("#update_lesson_title").val(result.courseTitle);
                                    updateIdentityForm.find("#teacherImgUrl").val(result.teacherImgUrl);
                                    updateIdentityForm.find("#courseImgUrl").val(result.courseImgUrl);
                                    updateIdentityForm.find("#appImgUrl").val(result.appImgUrl);
                                    updateIdentityForm.find("#teacherImgUrl_img").attr("src",path+result.teacherImgUrl);
                                    updateIdentityForm.find("#courseImgUrl_img").attr("src",path+result.courseImgUrl);
                                    updateIdentityForm.find("#appImgUrl_img").attr("src",path+result.appImgUrl);

                                }
                            }
                        })

                    } else {
                        $("#live_teacher_part").hide();
                    }
                }
            }
        });


    }



    $(function () {
        //文件上传前触发事件
        $('.uploadImage').bind('fileuploadsubmit', function (e, data) {
            data.formData = { pic_width: $(this).attr("data_pic_width"),pic_height:$(this).attr("data_pic_height")};  //如果需要额外添加参数可以在这里添加
        });

        $(".uploadImage").fileupload({
            url:path + '/identity/uploadImg/',
            sequentialUploads: true,
            add: function (e, data) {
                if (!validataEval(data.files[0].name.toLowerCase(), /(.jpg|.png|.gif|.ps|.jpeg|.bmp)$/)) {
                    //$("#error_alert").fadeIn(800, cleanAlert());
                    $().toastmessage('showErrorToast', "图片格式不对!");
                    return;
                } else {
                    data.submit();
                }
            }
        }).bind('fileuploaddone', function (e, data) {
            if(data._response.result.result==null)
            {
                $().toastmessage('showErrorToast', "图片尺寸不对!");
            }else{
                obj = $(this);
                objId = obj.data("id");
                $("#" + objId).val(data._response.result.result[0].path);
                $("#" + objId + "_img").attr("src",data._response.result.result[0].src);
            }

        });


        $('input[name="update_position"]').change(function () {
            if ($('input[name="update_position"]').filter(':checked').val() == 1) {
                $("#live_teacher_part").show();
                //显示下部
            } else {
                //隐藏并且清空
                $("#live_teacher_part").hide();
                $("input[name='update_enable']").attr("checked", false);
            }
        });

        $("#update_saveIdentity").click(function () {
            if (passWordFormCheck()) {
                var datas = {
                    "authorityUserId": $("#hid_authorityUserId").val(),
                    "position": $('input[name="update_position"]').filter(':checked').val(),
                    "enable": $('input[name="update_enable"]').filter(':checked').val(),
                    "sort": $("#update_sort").val(),
                    "teacherNike": $("#update_teacher_nike").val(),
                    "marks": $("#update_teacher_feature").val(),
                    "courseId": $("#update_lesson_id").val(),
                    "courseTitle": $("#update_lesson_title").val(),
                    "teacherImgUrl": $("#teacherImgUrl").val(),
                    "courseImgUrl": $("#courseImgUrl").val(),
                    "appImgUrl": $("#appImgUrl").val(),
                    "liveTeacherId": $("").val(),
                    "liveCourseConfigId": $("").val(),
                    "sku": $("#update_sku").val()
                };

                $.ajax({
                    url: path + "/identity/update",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    data: datas,
                    success: function (repData) {
                        if (ExceptionDialog(repData)) {

                            // $().toastmessage('showSuccessToast', "保存成功!");
                            $("#success_alert").fadeIn(800, cleanAlert());
                            $("#update_close").click();
                            userTable.ajax.reload(null, false);

                        }else{
                            $("#error_alert").fadeIn(800, cleanAlert());
                        }
                    }
                });
            }



        });


        $("#identity-update-alert").on("hide.bs.modal", function () {
            $("#hid_authorityUserId").val("");
            $("#info_email").text("");
            $("#info_mobile").text("");
            $("#info_name").text("");
            $("#info_num").text("");
            $("input[name='update_position']").attr("checked", false);
            $("input[name='update_enable']").attr("checked", false);
            $("#update_sku").val(-1);
            $("#update_sort").val(-1);
            $("#update_teacher_nike").val("");
            $("#update_teacher_feature").val("");
            $("#update_lesson_id").val("");
            $("#update_lesson_title").val("");
            $("#teacherImgUrl").val("");
            $("#courseImgUrl").val("");
            $("#appImgUrl").val("");
            $("#teacherImgUrl_img").attr("src","");
            $("#courseImgUrl_img").attr("src","");
            $("#appImgUrl_img").attr("src","");


            initCheck();
        });
    });

    // 校验图片格式
    function validataEval(obj, reg) {
        var result = obj.match(reg);
        if (result == null) {
            return false;
        } else {
            return true;
        }
    }


    function changeRadio(obj) {

        if ($(obj).val() == 1) {
            var $in = $(obj).next().next();
            $in.attr("readonly", "readonly").val("");
        } else {
            $(obj).next("input[type=text]").removeAttr("readonly").val($(obj).next("input[type=text]").data("link"));
        }
    }

    function changeRadio2(obj) {
        var id = $(obj).data("id");
        if ($(obj).val() == 2) {
            $("#divContent" + id).hide();
        } else {
            $("#divContent" + id).show();
        }
    }

    //参数校验
    function passWordFormCheck() {
        initCheck();

        var position =$('input[name="update_position"]').filter(':checked').val();


        if(position!=1)
        {
            if(position == null)
            {
                $('input[name="update_position"]').eq(0).parent().parent().parent().find("li").html("请选择员工职位");
                return false;
            }else
            {
                return true;

            }
        }

        var radio_enable = $("input[name='update_enable']:checked").val();
        if(radio_enable == null)
        {
            $("input[name='update_enable']").eq(0).parent().parent().find("li").html("请选择启用或停用");
            return false;
        }

        if(radio_enable==1)
        {
            var update_sort =$("#update_sort").val();
            if(update_sort==-1)
            {
                $("#update_sort").parent().addClass("has-error has-feedback");
                $("#update_sort").parent().parent().find("li").html("请选择排序");
                return false;
            }
            var update_teacher_nike = $("#update_teacher_nike");
            if ($.trim(update_teacher_nike.val()) == "") {
                $("#update_teacher_nike").parent().addClass("has-error has-feedback");
                $("#update_teacher_nike").parent().find("li").html("老师昵称不能为空");
                return false;
            }
            var nikeLength=$.trim(update_teacher_nike.val()).length;
            if(nikeLength > 10)
            {
                $("#update_teacher_nike").parent().addClass("has-error has-feedback");
                $("#update_teacher_nike").parent().find("li").html("老师昵称不能大于10个字");
                return false;
            }

            var update_teacher_feature = $("#update_teacher_feature");
            if ($.trim(update_teacher_feature.val()) == "") {
                $("#update_teacher_feature").parent().addClass("has-error has-feedback");
                $("#update_teacher_feature").parent().find("li").html("教学特点不能为空");
                return false;
            }

            if(update_teacher_feature.val().length>99)
            {
                $("#update_teacher_feature").parent().addClass("has-error has-feedback");
                $("#update_teacher_feature").parent().find("li").html("教学特点超长");
                return false;
            }

            var update_lesson_id = $("#update_lesson_id");
            if ($.trim(update_lesson_id.val()) == "") {
                $("#update_lesson_id").parent().addClass("has-error has-feedback");
                $("#update_lesson_id").parent().find("li").html("课程ID点不能为空");
                return false;
            }

            var update_lesson_title = $("#update_lesson_title");
            if ($.trim(update_lesson_title.val()) == "") {
                $("#update_lesson_title").parent().addClass("has-error has-feedback");
                $("#update_lesson_title").parent().find("li").html("课程标题不能为空");
                return false;
            }

            var titleLength=$.trim(update_lesson_title.val()).length;
            if(titleLength>30)
            {
                $("#update_lesson_title").parent().addClass("has-error has-feedback");
                $("#update_lesson_title").parent().find("li").html("课程标题不能大于30个字");
                return false;
            }



            var teacherImgUrl = $("#teacherImgUrl");
            if(teacherImgUrl.val()==null||teacherImgUrl.val().trim()=="")
            {
                $("#teacherImgUrl").parent().find("li").html("请上传图片");
                return false;
            }
            var courseImgUrl = $("#courseImgUrl");
            if(courseImgUrl.val()==null||courseImgUrl.val().trim()=="")
            {
                $("#courseImgUrl").parent().find("li").html("请上传图片");
                return false;
            }
            var appImgUrl = $("#appImgUrl");
            if(appImgUrl.val()==null||appImgUrl.val().trim()=="")
            {
                $("#appImgUrl").parent().find("li").html("请上传图片");
                return false;
            }
            return true;
        }else
        {
            return true;
        }






    }



    function initCheck(){

        $('input[name="update_position"]').eq(0).parent().parent().parent().find("li").html("");
        $("input[name='update_enable']").eq(0).parent().parent().find("li").html("");
        $("#update_sort").parent().removeClass("has-error has-feedback");
        $("#update_sort").parent().parent().find("li").html("");


        $("#update_teacher_nike").parent().removeClass("has-error has-feedback");
        $("#update_teacher_nike").parent().find("li").html("");


        $("#update_teacher_feature").parent().removeClass("has-error has-feedback");
        $("#update_teacher_feature").parent().find("li").html("");


        $("#update_lesson_id").parent().removeClass("has-error has-feedback");
        $("#update_lesson_id").parent().find("li").html("");



        $("#update_lesson_title").parent().removeClass("has-error has-feedback");
        $("#update_lesson_title").parent().find("li").html("");
        $("#courseImgUrl").parent().find("li").html("");

        $("#teacherImgUrl").parent().find("li").html("");
        $("#appImgUrl").parent().find("li").html("");}




    function ChangPositonIdToText(positonId)
    {
        if (positonId == 1) {
            return "老师";
        } else if (positonId == 2) {
            return "教务"
        } else if (positonId == 3) {
            return "销售"
        } else if (positonId == 4) {
            return "财务"
        } else if (positonId == 5) {
            return "技术"
        } else if (positonId == 6) {
            return "其他"
        } else {
            return "其他"
        }

    }

    var time=5;   //设置倒计时时间
    function cleanAlert(){   //自定义函数
        setTimeout('cleanAlert()',800);  //设置的时间函数
        if(time>0){
            time--;
        }
        else{
            $(".alert").fadeOut(800);
        }
    }


</script>

</body>
</html>
