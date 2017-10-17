/**
 * Created by admin on 2017/5/9.
 */
(function() {
    CKEDITOR.plugins.add("wpc", {
        init: function(a) {
            a.addCommand("wpc", {
                exec: function () {
                    a.insertHtml("_____");
                }
            });
            a.ui.addButton("wpc", {
                label: "填空",//调用dialog时显示的名称
                command: "wpc",
                icon: this.path + "images/horizontalrule.png"//在toolbar中的图标

            });
        }

    });

})();