<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<%-- 浏览器兼容问题 --%>
<!DOCTYPE html>
<%--[if IE 8]> <html lang="en" class="ie8"> <![endif]--%>
<%--[if !IE]><%--%>
<html lang="en">
<%--<![endif]--%>
<head>
    <meta charset="utf-8" />
    <title>天山时报+管理系统登录</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link href="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/resources/assets/css/style.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/resources/assets/css/style-responsive.min.css" rel="stylesheet" />
</head>
<body class="pace-top bg-white">
<input id="path" type="hidden" value="${pageContext.request.contextPath}" >
<%-- begin #page-loader --%>
<div id="page-loader" class="fade in"><span class="spinner"></span></div>
<%-- end #page-loader --%>

<%-- begin #page-container --%>
<div id="page-container" class="fade">
    <%-- begin login --%>
    <div class="login login-with-news-feed">
        <%-- begin news-feed --%>
        <div class="news-feed">
            <div class="news-image">
                <img src="${pageContext.request.contextPath}/resources/assets/img/login-bg/bg-7.jpg" data-id="login-cover-image" alt="" />
            </div>
            <div class="news-caption">
                <h4 class="caption-title"><i class="fa fa-diamond text-success"></i> 天山时报+</h4>
                <p>
                    对啊网,中国专业的职业在线教育平台,提供职业教育类免费视频,在线直播课程,在线题库,在线论坛,帮助每一位职场人士重塑职业未来,成就职业梦想!
                </p>
            </div>
        </div>
        <%-- end news-feed --%>
        <%-- begin right-content --%>
        <div class="right-content">
            <%-- begin login-header --%>
            <div class="login-header">
                <div class="brand">
                    <span class="logo"></span> 天山时报+
                    <small>让学习,触手可及</small>
                </div>
                <div class="icon">
                    <i class="fa fa-sign-in"></i>
                </div>
            </div>
            <%-- end login-header --%>
            <%-- begin login-content --%>
            <div class="login-content">
                <form id="loginform" action="${path}/auth/check" class="margin-bottom-0">
                    <div id="user_div" class="form-group m-b-15">
                        <input id="user_input" type="text" class="form-control input-lg" placeholder="用户名"  />
                    </div>
                    <div id="pwd_div" class="form-group m-b-15">
                        <input id="user_pwd" type="password" class="form-control input-lg" placeholder="密码" />
                    </div>
                    <div class="checkbox m-b-30">
                        <label>
                            <input id="remember" type="checkbox" /> 记住我(保持一周)
                        </label>
                    </div>
                    <p id="login_error_tip" style="font-size:15px;display:block;height:15px;;" class="text-danger">

                    </p>
                    <div class="login-buttons">
                        <button id="login_btn" type="button" class="btn btn-success btn-block bt n-lg">登录</button>
                    </div>
                    <div class="m-t-20 m-b-40 p-b-40">
                        <%-- 可以填写文字  --%>
                    </div>
                    <hr />
                    <p class="text-center text-inverse">
                        &copy; 天山时报+管理系统 V1.0
                    </p>
                </form>
            </div>
            <%-- end login-content --%>
        </div>
        <%-- end right-container --%>
    </div>
    <%-- end login --%>
</div>
<%-- end page container --%>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/jquery/jquery-1.9.1.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/jquery-ui/ui/minified/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/plugins/jquery-cookie/jquery.cookie.js"></script>
<script src="${pageContext.request.contextPath}/resources/assets/js/apps.js"></script>
<script src="${pageContext.request.contextPath}/resources/base/login/js/login.js"></script>
<script src="${pageContext.request.contextPath}/resources/common/utils/js/utils.js"></script>
<script>
    $(document).ready(function() {
        App.init();
    });
</script>
</body>
</html>
