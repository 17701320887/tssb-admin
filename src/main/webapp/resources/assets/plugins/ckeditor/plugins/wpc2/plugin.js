/**
 * Created by admin on 2017/5/9.
 */
(function() {
    CKEDITOR.plugins.add("wpc2", {
        init: function(a) {
            a.addCommand("wpc2", {
                exec: function () {
                    a.insertElement(CKEDITOR.dom.element.createFromHtml('<div>【*】</div>>'));
                }
            });
            a.ui.addButton("wpc2", {
                label: "段落",//调用dialog时显示的名称
                command: "wpc2",
                icon: this.path + "images/numberedlist.png"//在toolbar中的图标

            });
        }

    })

})();