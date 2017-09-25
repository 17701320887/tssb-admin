/**
 * Created by admin on 2017/5/9.
 */
(function() {
    CKEDITOR.dialog.add("wpc",
        function(a) {
            // return {
                // title: "wpc",
                // minWidth: "500px",
                // minHeight:"500px",
                // contents: [{
                //     id: "tab1",
                //     label: "",
                //     title: "",
                //     expand: true,
                //     width: "500px",
                //     height: "500px",
                //     padding: 0,
                //     elements: [{
                //         type: "html",
                //         style: "width:500px;height:500px",
                //         html: '内容测试'
                //     }]
                // }],
                // onOk: function() {
                    //点击确定按钮后的操作
                    a.insertHtml("编辑器追加内容");
                // }
            // }
        })
})();