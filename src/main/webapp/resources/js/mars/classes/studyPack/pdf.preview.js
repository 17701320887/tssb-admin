/**
 * pdf预览 zhenghui on 2016/6/3.
 */
(function ($) {

    $(document).ready(function () {
        var swfUrl = $('#swf-url').val();
        var pdfUrl = $('#pdf-url').val();
        loadSwf(swfUrl, pdfUrl);
    })

    //加载swf
    function loadSwf(swfUrl,pdfUrl) {
        $('#documentViewer').FlexPaperViewer(
            {config:{
                SWFFile: swfUrl,
                PDFFile: pdfUrl,
                key: "$cf3747da9a2ab59b665",//$98a11cac64dcb843587
                Scale: 0.6,//缩放比例
                ZoomTransition: 'easeOut',
                ZoomTime: 0.5,
                ZoomInterval: 0.2,
                FitPageOnLoad: false,
                FitWidthOnLoad: false,
                FullScreenAsMaxWindow: true,
                ProgressiveLoading: false,
                MinZoomSize: 0.2,//最小的缩放比例
                MaxZoomSize: 5,//设置最大的缩放比例
                SearchMatchAll: false,
                InitViewMode: 'Portrait',
                RenderingOrder: 'html5,flash',
                StartAtPage: '',
                ViewModeToolsVisible: true,
                ZoomToolsVisible: true,
                NavToolsVisible: true,
                CursorToolsVisible: true,
                SearchToolsVisible: true,
                WMode: 'window',
                localeChain: 'zh_CN',
                jsDirectory: '/resources/common/FlexPaper/js/',
                cssDirectory: '/resources/common/FlexPaper/css/',
                localeDirectory: '/resources/common/FlexPaper/locale/'
            }});
    }

})(jQuery)