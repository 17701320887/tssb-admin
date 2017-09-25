<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/resources/common/include/targlib.inc" %>
<!doctype html>
<html>
<head>
    <title>FlexPaper</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width" />
    <style type="text/css" media="screen">
        html, body	{ height:100%; }
        body { margin:0; padding:0; overflow:auto; }
        #flashContent { display:none; }
    </style>

    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/FlexPaper/css/flexpaper.css" />
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/FlexPaper/js/jquery.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/FlexPaper/js/jquery.extensions.min.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/FlexPaper/js/flexpaper.js"></script>
    <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/FlexPaper/js/flexpaper_handlers.js"></script>
</head>
<body>
<div style="position:absolute;left:10px;top:10px;">
<div id="documentViewer" class="flexpaper_viewer" style="width:770px;height:500px"></div>
</div>
<script type="text/javascript">
            $('#documentViewer').FlexPaperViewer(
                    { config: {
//                        PDFFile: 'http://image.duia.com/bookstore/PdfTemp/%E5%85%A8%E5%9B%BD%E8%B4%A2%E7%BB%8F%E6%B3%95%E8%A7%84%E9%87%8D%E7%82%B9%E8%80%83%E7%82%B9%E8%AE%B2%E4%B9%89.pdf',
                        PDFFile: 'http://localhost/static-mars/1.pdf',
                        key : "$cf3747da9a2ab59b665",

                        Scale : 0.6,
                        ZoomTransition : 'easeOut',
                        ZoomTime : 0.5,
                        ZoomInterval : 0.7,
                        FitPageOnLoad : true,
                        FitWidthOnLoad : false,
                        FullScreenAsMaxWindow : false,
                        ProgressiveLoading : true,
                        MinZoomSize : 0.2,
                        MaxZoomSize : 5,
                        SearchMatchAll : false,
                        InitViewMode : 'Portrait',
                        RenderingOrder : 'html5',
                        StartAtPage : '',

                        ViewModeToolsVisible : true,
                        ZoomToolsVisible : true,
                        NavToolsVisible : true,
                        CursorToolsVisible : true,
                        SearchToolsVisible : true,

                        WMode: 'window',
                        localeChain: 'zh_CN',
                        jsDirectory: '${pageContext.request.contextPath }/resources/common/FlexPaper/js/',
                        cssDirectory: '${pageContext.request.contextPath }/resources/common/FlexPaper/css/',
                        localeDirectory: '${pageContext.request.contextPath }/resources/common/FlexPaper/locale/'
                    }}
            );
</script>

</body>
</html>