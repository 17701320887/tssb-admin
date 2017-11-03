<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<%-- 侧边栏 --%>
<%-- begin sidebar scrollbar --%>
<div data-scrollbar="true" data-height="100%">
    <%-- begin sidebar user --%>
    <ul class="nav">
        <li class="nav-profile">
            <div class="image">
                <a href="javascript:;"><img src="${pageContext.request.contextPath}/resources/image/tssb/common/user_head.jpg" alt="" /></a>
            </div>
            <div class="info">
                ${sessionScope.login_user.username}
                <small>${sessionScope.login_user.email}</small>
            </div>
        </li>
    </ul>
    <%-- end sidebar user --%>
    <%-- begin sidebar nav --%>
    <ul class="nav">
        <li class="nav-header">菜单列表</li>
        <li class="has-sub active">
            <a href="javascript:;">
                <i class="fa fa-2x fa-asterisk"></i>
                <b class="caret pull-right"></b>
                <span>系统管理</span>
            </a>
            <ul class="sub-menu">
                <li name="sub" class="active"><a href="/index">用户管理</a></li>
            </ul>
        </li>
        <li class="has-sub">
            <a href="javascript:;">
                <i class="fa fa-2x fa-asterisk"></i>
                <b class="caret pull-right"></b>
                <span>新闻管理</span>
            </a>
            <ul class="sub-menu">
                <li name="sub"><a href="/matic/index">新闻管理</a></li>
            </ul>
        </li>
        <li class="has-sub">
            <a href="javascript:;">
                <i class="fa fa-2x fa-asterisk"></i>
                <b class="caret pull-right"></b>
                <span>提问管理</span>
            </a>
            <ul class="sub-menu">
                <li name="sub"><a href="/system/userList">审核管理</a></li>
            </ul>
        </li>
        <%-- begin sidebar minify button --%>
        <li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>
        <%-- end sidebar minify button --%>
    </ul>
    <%-- end sidebar nav --%>
</div>
<%-- end sidebar scrollbar --%>
<script>
    $("li[name=sub][class=active]").parent().parent().addClass("active");
</script>

