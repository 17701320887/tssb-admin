<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<%@include file="/WEB-INF/view/common/include/taglib.jsp" %>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <title><sitemesh:write property='title'/></title>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
        <meta name="keywords" content="对啊网管理系统"/>
        <meta name="description" content="对啊网管理系统"/>
        <%-- ================== BEGIN BASE CSS STYLE ================== --%>
        <link href="${pageContext.request.contextPath}/resources/assets/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/assets/css/animate.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/assets/css/style.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/assets/css/theme/default.css" rel="stylesheet" id="theme" />
        <link href="${pageContext.request.contextPath}/resources/assets/plugins/gritter/css/jquery.gritter.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/common/dialog/css/jquery.toastmessage.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/common/dialog/css/bootstrap-dialog.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/assets/plugins/duia-lobibox/css/lobibox.css" rel="stylesheet"/>
    <%--小图标--%>
        <link href="${pageContext.request.contextPath}/resources/assets/plugins/simple-line-icons/simple-line-icons.css" rel="stylesheet" />
        <sitemesh:write property='head' />
        <script src="${pageContext.request.contextPath}/resources/assets/plugins/jquery/jquery-1.9.1.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/assets/plugins/jquery/jquery-migrate-1.1.0.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/assets/plugins/pace/pace.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/assets/plugins/gritter/js/jquery.gritter.js"></script>
        <script src="${pageContext.request.contextPath}/resources/assets/js/apps.js"></script>
        <script src="${pageContext.request.contextPath}/resources/common/utils/js/utils.js"></script>
        <script src="${pageContext.request.contextPath}/resources/common/dialog/js/jquery.toastmessage.js"></script>
        <script src="${pageContext.request.contextPath}/resources/common/dialog/js/bootstrap-dialog.js"></script>
        <script src="${pageContext.request.contextPath}/resources/assets/plugins/duia-lobibox/js/lobibox.js"></script>
    </head>
    <body class="index">
    <%-- 页面隐藏域 --%>
    <input id="path" type="hidden" value="${pageContext.request.contextPath}">
    <%-- begin #page-loader --%>
    <div id="page-loader" class="fade in"><span class="spinner"></span></div>
    <%-- end #page-loader --%>

    <%-- begin #page-container --%>
    <div id="page-container" class="fade page-sidebar-fixed page-header-fixed">
        <%-- begin #header --%>
        <div id="header" class="header navbar navbar-default navbar-fixed-top">
            <%-- 页面头部 --%>
            <jsp:include page="head.jsp"/>
        </div>
        <%-- end #header --%>
        <%-- begin #sidebar --%>
        <div id="sidebar" class="sidebar">
            <%-- 页面左侧边栏 --%>
            <jsp:include page="left.jsp"/>
        </div>
        <div class="sidebar-bg"></div>
        <%-- end #sidebar --%>
        <%-- begin #content --%>
        <div id="content" class="content">
            <%--页面内容使用sitemesh拦截自己的页面body部分,写入这个DIV,最后返回给浏览器--%>
            <sitemesh:write property="body"/>
        </div>
        <%-- end #content --%>
        <%-- 主题 --%>
            <%--  <jsp:include page="theme.jsp"/>--%>
          <%-- begin #footer --%>
        <div id="footer" class="footer">
            <%-- 页面底部 --%>
        </div>
        <%-- end #footer --%>

        <%-- 向上滚动按钮 --%>
        <a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top">
            <i class="fa fa-angle-up"></i>
        </a>
        <%-- end 向上滚动按钮 --%>
    </div>
    <script>
        $(document).ready(function() {
            var path = $("#path").val();

            App.init();

            setInterval(function(){
                getDataByIsLook();
            },30000); // 1请求 间隔时间 毫秒

            function getDataByIsLook(){
                $.ajax({
                    type:"POST",
                    url:path + "/authorityAdvices/getDataByIsLook?isLook=2&dt=" + new Date().getTime(),//why getTime and wont use
                    beforeSend:function(){},
                    success: function(data){
                        var list = data.result;
                        if(list.length>0) {
                            $("#head_msgCount").html(list.length);
                        }
                        for(var i= 0;i<list.length;i++){
                            $.gritter.add({
                                title: list[i].content,
                                image: '${imageServicePath}/'+'${sessionScope.login_user.smallImg}',
                                sticky: false,
                                time: 5000,
                                speed:800,
                                class_name: 'my-sticky-class'
                            });
                        }

                        $("#gritter-notice-wrapper").click(function () {
                            window.location.href = path + "/authorityAdvices/index";
                        })
                    }
                });
            }
        })
    </script>
    </body>
</html>