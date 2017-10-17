<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<!DOCTYPE html>
<head>
    <title>对啊网管理系统-个人</title>
</head>
<body>

<div>
    <div class="row">
        <%--密码修改--%>
        <div class="col-md-6">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                   <%-- <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default"
                           data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning"
                           data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                    </div>--%>
                    <h4 class="panel-title">修改密码</h4>
                </div>
                <div class="panel-body">
                    <form id="passwordForm" class="form-horizontal form-bordered" data-parsley-validate="true">
                        <div class="form-group">
                            <label class="col-md-3 control-label">原密码*</label>

                            <div class="col-md-9">
                                <input id="oldPassWord" type="password" class="form-control"/>
                                <ul class="parsley-errors-list filled">
                                    <li name="ErrorTip" class="parsley-required"></li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">新密码*</label>

                            <div class="col-md-9">
                                <input id="newPassWord" type="password" class="form-control" minlength="6" maxlength="20"/>
                                <ul class="parsley-errors-list filled">
                                    <li name="ErrorTip" class="parsley-required"></li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">确认密码*</label>

                            <div class="col-md-9">
                                <input id="againPassWord" type="password" class="form-control" minlength="6" maxlength="20"/>
                                <ul class="parsley-errors-list filled">
                                    <li name="ErrorTip" class="parsley-required"></li>
                                </ul>
                                <span id="error" class="parsley-required"></span>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button id="clearBtn" type="button" class="btn btn-sm btn-info">清除</button>
                    <button id="savePassWord" type="button" class="btn btn-sm btn-success">保存</button>
                </div>
            </div>
        </div>


        <div class="col-md-6">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <%--<div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default"
                           data-click="panel-expand"><i class="fa fa-expand"></i></a>
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning"
                           data-click="panel-collapse"><i class="fa fa-minus"></i></a>
                    </div>--%>
                    <h4 class="panel-title">个人信息</h4>
                </div>
                <div class="panel-body">
                    <form id="userInfoForm" class="form-horizontal form-bordered" data-parsley-validate="true">
                        <div class="col-xs-2 col-sm-2 col-md-2">
                            <div class="form-group">
                                <img src="${imageServicePath}/${user.bigImg}"  style="width: 80px;height: 80px;"/>
                            </div>

                        </div>
                        <div class="col-xs-10 col-sm-10 col-md-10">
                            <div class="form-group">
                                <label class="col-md-3 control-label">用户名</label>

                                <div class="col-md-9">
                                    <input type="text" class="form-control" readonly="readonly"
                                           value="${user.username}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">工号</label>

                                <div class="col-md-9">
                                    <input type="text" class="form-control" readonly="readonly" value="${user.num}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">职位</label>

                                <div class="col-md-9">
                                    <input type="text" class="form-control" readonly="readonly" value="${user.job}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">手机号</label>

                                <div class="col-md-9">
                                    <input type="text" class="form-control" readonly="readonly" value="${user.mobile}"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label">电子邮箱</label>

                                <div class="col-md-9">
                                    <input type="text" class="form-control" readonly="readonly" value="${user.email}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">性别</label>

                                <div class="col-md-9">
                                    <input type="text" class="form-control" readonly="readonly" value="${user.sex}"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>

<script>
    //dom对象外提 定义一次减少重复查询
    var passwordFormObj = $("#passwordForm");
    var oldPassWordObj = passwordFormObj.find("#oldPassWord");
    var newPassWordObj = passwordFormObj.find("#newPassWord");
    var againPassWordObj = passwordFormObj.find("#againPassWord");
    var oldPassWordGrandpaObj = oldPassWordObj.parent().parent();
    var newPassWordGrandpaObj = newPassWordObj.parent().parent();
    var againPassWordGrandpaObj = againPassWordObj.parent().parent();
    var path = $("#path").val();

    $(document).ready(function () {
        //值置空
        oldPassWordObj.val("");
        newPassWordObj.val("");
        againPassWordObj.val("");
        initUpdatePassWordForm();
    });

    $("#clearBtn").unbind().bind("click", function () {
        //值置空
        oldPassWordObj.val("");
        newPassWordObj.val("");
        againPassWordObj.val("");
        initUpdatePassWordForm();
    });

    $("#savePassWord").unbind().bind("click", function () {
        var data = {
            "oldPassWord": oldPassWordObj.val(),
            "newPassWord": newPassWordObj.val()
        }
        if (passWordFormCheck()) {
            initUpdatePassWordForm();
            $.ajax({
                url: path + "/user/updatePassWord",
                type: "post",
                dataType: "json",
                cache: false,
                async: false,
                data: data,
                success: function (datas) {
                    if (datas.msg =="success") {
                        $().toastmessage('showSuccessToast',"修改成功，请重新登录!");
                        location.href= path + "/auth/signOut";
                    } else {
                        $("#error").html(datas.msg);
                    }
                }
            })
        }
    });

    //初始化表单
    function initUpdatePassWordForm() {
        oldPassWordGrandpaObj.removeClass("has-error has-feedback");
        newPassWordGrandpaObj.removeClass("has-error has-feedback");
        againPassWordGrandpaObj.removeClass("has-error has-feedback");
        $("li[name=ErrorTip]").each(function (i, d) {
            $(d).html("");
        });
        $("#error").html();
    }

    //参数校验
    function passWordFormCheck() {
        initUpdatePassWordForm();
        if ($.trim(oldPassWordObj.val()) == "") {
            oldPassWordGrandpaObj.addClass("has-error has-feedback");
            oldPassWordObj.parent().find("li").html("原密码不能为空!");
            return false;
        }
        if ($.trim(newPassWordObj.val()) == "") {
            newPassWordGrandpaObj.addClass("has-error has-feedback");
            newPassWordObj.parent().find("li").html("新密码不能为空!");
            return false;
        }

        var reg = /^[0-9A-Za-z]{6,20}$/;
        if (!reg.test(newPassWordObj.val())) {
            newPassWordGrandpaObj.addClass("has-error has-feedback");
            newPassWordObj.parent().find("li").html("密码格式只能是字母或数字组合,至少6位至多20位!");
            return false;
        }

        if ($.trim(againPassWordObj.val()) == "") {
            againPassWordGrandpaObj.addClass("has-error has-feedback");
            againPassWordObj.parent().find("li").html("确认密码不能为空!");
            return false;
        }

        if (newPassWordObj.val() != againPassWordObj.val()) {
            againPassWordGrandpaObj.addClass("has-error has-feedback");
            againPassWordObj.parent().find("li").html("两次输入密码不一致!");
            return false;
        }
        return true;
    }

</script>
</body>

</html>
