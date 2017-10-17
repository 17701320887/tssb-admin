/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

/*CKEDITOR.on('instanceReady', function(e) {
    e.editor.on('contentDom', function() {
        e.editor.document.on('key', function(event) {
            // keyup event in ckeditor
            console.log('xxxx');
        });
    });
});*/
//会被转义的字符 将这部分字符转换为全角模式，避免转义带来的问题
var arr = ['<','>','\'','"','&','\\'];

CKEDITOR.on('instanceReady', function(e) {
    e.editor.on('key', function (event) {
        var str = event.data.domEvent.$.key;
        if ($.inArray(str, arr) >= 0){
            e.editor.insertText(ban2quan(str));
            return false;
        }
    });
    /*e.editor.on('paste', function (event) {
        // var str = $(event.data.dataValue).text();
        // console.log(event.data.dataValue);
        // $.each(arr, function (index, s) {
        //     str = str.replace(/'+s+'/g, ban2quan(s));
        //     console.log(str);
        // });
        // e.editor.insertText(event.data.dataValue);
        // return false;
    });*/
});
CKEDITOR.editorConfig = function( config ) {

    config.extraPlugins += config.extraPlugins ? ',tableresize,wpc,wpc2' : 'tableresize,wpc,wpc2';

	config.skin = 'ozone';
	config.image_previewText = ' '; //清空预览区域显示内容
	config.filebrowserImageUploadUrl = "/title/ajaxuploadimage";//设置提交上传图片按钮处
    config.removeDialogTabs = 'image:advanced;image:Link';

    // 设置快捷键
    // 用于实现Ctrl + V进行粘贴
    // 无此配置，无法进行快捷键粘贴
    config.keystrokes = [
    	[CKEDITOR.CTRL + 86 /* V */, 'paste']
    ];
    // 用于实现Ctrl + V进行粘贴
    // 此配置将会启动粘贴之前进行过滤，若无此配置，将会出现粘贴之后才弹出过滤框
    config.blockedKeystrokes = [
    	CKEDITOR.CTRL + 86
    ];
    // config.forcePasteAsPlainText = true;
	config.toolbar = [[ 'Bold', 'Italic', 'Underline','Image', /*'Table',*/ 'wpc', 'wpc2' ]];

	config.enterMode = CKEDITOR.ENTER_P;
	config.shiftEnterMode = CKEDITOR.ENTER_P;
    config.title = false;

    config.coreStyles_bold = {
        element: 'span',
        styles: {'font-weight': 'bold'}
    };
    CKEDITOR.config.coreStyles_italic = {
        element: 'span',
        styles: {'font-style': 'italic'}
    };
    CKEDITOR.config.coreStyles_underline = {
        element: 'span',
        styles: {'text-decoration': 'underline'}
    };

 };

function ban2quan(str){
    var tmp = "";
    var charCode;
    for(var i=0;i<str.length;i++) {
        charCode = str.charCodeAt(i);
        if(charCode == 32) {
            tmp= tmp+  String.fromCharCode(12288);
        }

        if(charCode > 33 && charCode < 127) {
            tmp=tmp+String.fromCharCode(charCode + 65248);
        } else {
            tmp=tmp+String.fromCharCode(charCode);
        }
    }

    return tmp;
}
