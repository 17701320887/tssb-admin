<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%-- 浏览器兼容问题 --%>
<!DOCTYPE html>
<%--[if IE 8]> <html lang="en" class="ie8"> <![endif]--%>
<%--[if !IE]><%--%>
<html lang="en">
<%--<![endif]--%>
    <head>
        <title>对啊网管理系统-首页</title>
    </head>
    <body>
    <script>
        var path = $("#path").val();
        $(document).ready(function() {
            <%-- 登录成功,提示 --%>
            $(window).load(function() {
                $.gritter.add({
                    title: '欢迎您,'+'${sessionScope.login_user.username}',
                    text: '开启一天美好的生活吧.',
                    image: '${imageServicePath}/'+'${sessionScope.login_user.smallImg}',
                    sticky: false,
                    time: 3000,
                    speed:800,
                    class_name: 'my-sticky-class'
                });
            });
        });
    </script>
    </body>
</html>