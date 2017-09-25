(function (window) {

    // 学习包对象
    var studyPack = {
        id: $("#id").val(), // 学习包id
        categoryId: $(".category-id").val(), // sku id
        imageServerPath: $("#imageServerPath").val(), // 图片服务器地址
        counter: 1, // 计数器
        submit: true // 提交标识
    }, P_IMG = {
        loading: 'i_loading_',
        fileS: 'i_file_',
        preview: 'i_preview_url_',
        coverURL: 'i_cover_url_'
    }, P_PDF = {
        loading: 'p_loading_',
        fileS: 'p_file_',
        fileURL: 'p_file_url_',
        swfURL: 'p_swf_url_',
        fileLength: 'p_file_length_',
        swfStatus: 'p_swf_status_'
    };

    // 修改时教材内容在页面初始化
    if (studyPack.id != null && studyPack.id != '') {
        initStudyTBooks(studyPack);
    }

    // 保存操作触发操作
    $(".save-btn").on("click", function () {
        //保存时获取添加教材的数量,如果数量为0.不通过校验
        var size = $("#studyData").find("div.panel-body").size();
        if (size == 0) {
            BootstrapDialog.warning("请添加教材!");
            return;
        }
        // 绑定事件
        initBindEvents();
        // 通过框架校验能否通过
        var pass = $('#studyPackForm').data('bootstrapValidator').validate().isValid();//表单验证是否通过
        // 校验通过
        if (pass) {
            var id = studyPack.id || null;
            var url = "/studyPack/" + (id != null ? 'update' : 'save');
            var books = formToJson();
            var categoryId = $("#categoryId").val();
            var title = $("#packTitle").val();
            var data = {
                id: id,
                categoryId: categoryId,
                title: title,
                books: JSON.stringify(books)
            };

            // 提交表单
            $.post(url, data, function (data) {
                if (data.code == HttpUtil.success_code) {
                    window.location.href = "/studyPack/manager";
                } else {
                    BootstrapDialog.alert(data.message);
                }
            });
        }
        // 重置提交标识位
        studyPack.submit = true;
    });

    /**
     * 表单序列化
     * @param id
     * @returns {Array}
     */
    function formToJson() {
        var id, myArray = [];
        var $divs = $("#studyData").find("div.panel-body");
        $divs.each(function (i, n) {
            var book = {};
            id = $(n).find('input[name=id]').val();
            book.id = (id == '') ? null : id;
            book.title = $(n).find("input[name=title]").val();
            book.chiefEditor = $(n).find("input[name=chiefEditor]").val();
            book.fileUrl = $(n).find("input[name=fileUrl]").val();
            book.coverUrl = $(n).find("input[name=coverUrl]").val();
            book.fileLength = $(n).find("input[name=fileLength]").val();
            book.seque = i + 1;
            myArray.push(book);
        });
        return myArray;
    };

    /**
     * 初始化学习包教材
     * @param s
     */
    function initStudyTBooks(s) {

        // 获取学习包id
        var id = s.id || $("#id").val();

        // 学习包id不存在，返回
        if (id == null || id == '') {
            return;
        }

        // 查询学习包下包含的教材信息
        $.ajax({
            url: "/studyTbook/findStudyPackBooks",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            type: "post",
            dataType: "json",
            cache: false,
            async: false,
            data: {packId: id},
            success: function (data) {
                if (data.code == HttpUtil.success_code) {
                    // 为了保证事件的注入，采用每个教材独次添加到页面
                    $.each(data.result, function (i, book) {

                        // 外层包裹元素[div]
                        var html = '<div class="panel-body" id="book' + studyPack.counter + '"><div class="form-horizontal">';

                        // 第一行元素：教材标题和删除按钮
                        html += '<div class="col-md-1">&nbsp;</div><div class="col-md-1" style="color: #707478;font-weight:bolder;padding-left: 0;">电子教材<span id="Book_NO">' + studyPack.counter + '</span></div><label class="col-md-10 control-label title"><a style="float: right;color:#707478;font-weight:bolder;" onclick="page.deleteBook(' + studyPack.counter + ')">&nbsp;&nbsp;X&nbsp;&nbsp;</a></label>';

                        // 第二行元素：教材名称和主编
                        html += '<div class="form-group">';
                        html += '<div class="col-md-1">&nbsp;<input type="hidden" name="id" value="' + book.id + '" /></div>';
                        html += '<div class="col-md-4"><input type="text" name="title" value="' + book.title + '" placeholder="教材名称" class="form-control" maxlength="36" style="width:400px;margin-right: 15px;display: inline;"></div></div>';
                        html += '<div class="form-group"><div class="col-md-1">&nbsp;</div><div class="col-md-4"><input type="text" name="chiefEditor" value="' + book.chiefEditor + '" placeholder="主编" class="form-control" maxlength="10" style="width: 240px;display: inline;" /></div>';
                        html += '</div>';

                        // 第三行元素：教材pdf文件和封面图上传
                        html += '<div class="col-md-12" style="margin-top: -15px;">';
                        html += '<label class="col-md-1">&nbsp;</label>';
                        html += '<ul class="attached-document clearfix">';

                        // 教材pdf文件上传
                        html += '<li style="margin-left: -10px;">';
                        html += '<div class="form-group" style="margin: 0;">';
                        if(book.fileConverswfStatus == 2){
                            html += '<div class="document-name">教材<span style="float:right;">[&nbsp;<b class="green" id="' + P_PDF.loading + studyPack.counter + '">已上传</b>&nbsp;]&nbsp;</span>';
                        }else if(book.fileConverswfStatus == 1){
                            html += '<div class="document-name">教材<span style="float:right;">[&nbsp;<b class="red" id="' + P_PDF.loading + studyPack.counter + '">转失败</b>&nbsp;]&nbsp;</span>';
                        }else{
                            html += '<div class="document-name">教材<span style="float:right;">[&nbsp;<b class="green" id="' + P_PDF.loading + studyPack.counter + '">转码中</b>&nbsp;]&nbsp;</span>';
                        }
                        html += '<input type="file" name="pdfFile" id="' + P_PDF.fileS + studyPack.counter + '" style="position: absolute;opacity: 0;width: 180px;height: 97px;left: 0;top: 0;" />';
                        html += '<div class="col-md-4"><input type="hidden" name="fileLength" id="' + P_PDF.fileLength + studyPack.counter + '" value="' + book.fileLength + '"/></div>'
                        html += '<input type="hidden" name="fileUrl" id="' + P_PDF.fileURL + studyPack.counter + '" value="' + book.fileUrl + '" />';
                        html += '<input type="hidden" name="fileConverswfUrl" id="' + P_PDF.swfURL + studyPack.counter + '" value="' + book.fileConverswfUrl + '" />';
                        html += '<input type="hidden" name="fileConverswfStatus" id="' + P_PDF.swfStatus + studyPack.counter + '" value="' + book.fileConverswfStatus + '" />';
                        html += '</div>';
                        html += '<div class="document-file">';
                        // html += '<a href="#">';
                        html += '<i class="fa fa-file-pdf-o"></i>';
                        // html += '</a>';
                        html += '</div>';
                        html += '</div>';
                        html += '</li>';

                        // 封面图上传
                        html += '<li>';
                        html += '<div class="form-group" style="margin: 0;">';
                        html += '<div class="document-name">封面图<span style="float:right;">[&nbsp;<b class="green" id="' + P_IMG.loading + studyPack.counter + '">已上传</b>&nbsp;]&nbsp;</span>';
                        html += '<input type="file" name="imgFile" id="' + P_IMG.fileS + studyPack.counter + '" style="position: absolute;opacity: 0;width: 180px;height: 97px;left: 0;top: 0;">';
                        html += '</div>';
                        html += '<input type="hidden" name="coverUrl" id="' + P_IMG.coverURL + studyPack.counter + '" value="' + book.coverUrl + '" />';
                        html += '<div class="document-file">';
                        // html += '<a href="#">';
                        html += '<img id="' + P_IMG.preview + studyPack.counter + '" src="' + studyPack.imageServerPath + book.coverUrl + '" alt="" />';
                        // html += '</a>';
                        html += '<i style="font-size: 14px;">尺寸:(257*343)px</i></div>';
                        html += '</div>';
                        html += '</li>';
                        html += '</ul>';
                        html += '</div>';

                        // 第四行元素：预览和提示信息
                        html += '<div class="form-group">';
                        html += '<label class="col-md-1">&nbsp;</label>';
                        html += '<div class="col-md-5"><button type="button" class="btn btn-lg btn-success" onclick="page.previewPdf(' + studyPack.counter + ')" style="padding: 5px;font-size:12px; ">预览</button><span style="color:red;margin-left: 15px;">注意：移动端教材仅支持PDF格式，上传其他格式文件移动端学员无法查看</span></div>';
                        html += '</div>';
                        html += '</div></div></div>';

                        $("#studyData").append(html);

                        // 初始化PDF文件上传控件
                        initPDFFileupload(studyPack.counter);
                        // 初始化封面图上传控件
                        initFileupload(studyPack.counter);
                        // 计数器加一
                        studyPack.counter = studyPack.counter + 1;

                        //初始化绑定
                        initBindEvents();
                    });
                }
            }
        });
    }

    /**
     * 添加新的学习资料
     */
    function addNewTBook() {

        // 当前教材数量
        var size = $("#studyData").find("div.panel-body").size();

        // 外层包裹元素[div]
        var html = '<div class="panel-body" id="book' + studyPack.counter + '"><div class="form-horizontal">';

        // 第一行元素：教材标题和删除按钮
        html += '<div class="col-md-1">&nbsp;</div><div class="col-md-1" style="color: #707478;font-weight:bolder;padding-left: 0;">电子教材<span id="Book_NO">' + (size + 1) + '</span></div><label class="col-md-10 control-label title"><a style="float: right;color:#707478;font-weight:bolder;" onclick="page.deleteBook(' + studyPack.counter + ')">&nbsp;&nbsp;X&nbsp;&nbsp;</a></label>';

        // 第二行元素：教材名称和主编
        html += '<div class="form-group">';
        html += '<div class="col-md-1">&nbsp;<input type="hidden" name="id" value="" />&nbsp;</div>';
        html += '<div class="col-md-4"><input type="text" name="title" value="" placeholder="教材名称" class="form-control" maxlength="36" style="width:400px;margin-right: 15px;display: inline;" /></div></div>';
        html += '<div class="form-group"><div class="col-md-1">&nbsp;</div><div class="col-md-4"><input type="text" name="chiefEditor" value="" placeholder="主编" class="form-control" maxlength="10" style="width: 240px;display: inline;" /></div>';
        html += '</div>';

        // 第三行元素：教材pdf文件和封面图上传
        html += '<div class="col-md-12" style="margin-top: -15px;">';
        html += '<label class="col-md-1">&nbsp;</label>';
        html += '<ul class="attached-document clearfix">';

        // 教材pdf文件上传
        html += '<li style="margin-left: -10px;">';
        html += '<div class="form-group" style="margin: 0;">';
        html += '<div class="document-name">教材<span style="float:right;">[&nbsp;<b class="red" id="' + P_PDF.loading + studyPack.counter + '">未上传</b>&nbsp;]&nbsp;</span>';
        html += '<input type="file" name="pdfFile" id="' + P_PDF.fileS + studyPack.counter + '" style="position: absolute;opacity: 0;width: 180px;height: 97px;left: 0;top: 0;" />';
        html += '<input type="hidden" name="fileLength" id="' + P_PDF.fileLength + studyPack.counter + '" />'
        html += '<input type="hidden" name="fileUrl" id="' + P_PDF.fileURL + studyPack.counter + '" />';
        html += '<input type="hidden" name="fileConverswfUrl" id="' + P_PDF.swfURL + studyPack.counter + '" />';
        html += '<input type="hidden" name="fileConverswfStatus" id="' + P_PDF.swfStatus + studyPack.counter + '" value="0" />';
        html += '</div>';
        html += '<div class="document-file">';
        // html += '<a href="#">';
        html += '<i class="fa fa-file-pdf-o"></i>';
        // html += '</a>';
        html += '</div>';
        html += '</div>';
        html += '</li>';

        // 封面图上传
        html += '<li>';
        html += '<div class="form-group" style="margin: 0;">';
        html += '<div class="document-name">封面图<span style="float:right;">[&nbsp;<b class="red" id="' + P_IMG.loading + studyPack.counter + '">未上传</b>&nbsp;]&nbsp;</span>';
        html += '<input type="file" name="imgFile" id="' + P_IMG.fileS + studyPack.counter + '" style="position: absolute;opacity: 0;width: 180px;height: 97px;left: 0;top: 0;">';
        html += '</div>';
        html += '<input type="hidden" name="coverUrl" id="' + P_IMG.coverURL + studyPack.counter + '" />';
        html += '<div class="document-file">';
        // html += '<a href="#">';
        html += '<img id="' + P_IMG.preview + studyPack.counter + '" src="" alt="" />';
        // html += '</a>';
        html += '<i style="font-size: 14px;">尺寸:(257*343)px</i></div>';
        html += '</div>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';

        // 第四行元素：预览和提示信息
        html += '<div class="form-group">';
        html += '<div class="col-md-1">&nbsp;</div>';
        html += '<div class="col-md-5"><button type="button" class="btn btn-lg btn-success" onclick="page.previewPdf(' + studyPack.counter + ')" style="padding: 5px;font-size:12px; ">预览</button><span style="color:red;margin-left: 15px;">注意：移动端教材仅支持PDF格式，上传其他格式文件移动端学员无法查看</span></div>';
        html += '</div>';
        html += '</div></div></div>';

        // 添加教材模块
        $("#studyData").append(html);

        // 初始化PDF文件上传控件
        initPDFFileupload(studyPack.counter);
        // 初始化封面图上传控件
        initFileupload(studyPack.counter);
        //绑定校验事件,如果不绑定,则在上传文件的控件中无法使用表单通过效验事件,这里的绑定是先取消绑定在绑定
        initBindEvents();
        // 计数器加一
        studyPack.counter = studyPack.counter + 1;
    }

    /**
     * 删除教材
     * @param counter 计数器
     */
    function deleteBook(counter) {
        BootstrapDialog.confirm({
            title: '删除电子教材',
            message: '确定删除？',
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (yes) {
                if (yes) {

                    // 删除电子教材
                    $("#book" + counter).remove();

                    // 更改电子教材序号
                    var $divs = $("#studyData").find("div.panel-body");
                    $divs.each(function (i, n) {
                        $(n).find("span[id=Book_NO]").text(i + 1);
                    });

                }
            }
        });
    }

    /**
     * 预览
     * @param counter
     */
    function previewPdf(counter) {
        var url = $('#' + P_PDF.swfURL + counter).val();
        var status = $("#" + P_PDF.swfStatus + counter).val();
        var pdfUrl = $('#' + P_PDF.fileURL + counter).val();
        //新增:没有传教材
        if (pdfUrl == null || pdfUrl == '') {
            BootstrapDialog.warning("请先上传教材!");
            return;
        }
        //新增:如果传了教材或者未转换成功
        if (url == null || url == '' || status == 0 || status == '') {
            BootstrapDialog.warning("新上传教材在保存后需要时间较长转换，请稍待!");
            return;
            //修改
        } else if (status == 1) {
            BootstrapDialog.warning("教材转换失败,请重新上传教材!");
            return;
        }
        layer.open({
            title: '教材预览',
            type: 2,
            shadeClose: true,
            area: ['893px', '600px'],
            fix: false, //不固定
            maxmin: true,
            content: '/studyPack/preview?swfUrl=' + studyPack.imageServerPath + $('#' + P_PDF.swfURL + counter).val() + '&pdfUrl=' + studyPack.imageServerPath + $('#' + P_PDF.fileURL + counter).val()
        });
    }


    /**
     * 初始化 jQuery File Upload 上传文件插件
     * @param counter 计数器
     */
    function initFileupload(counter) {
        //上传提示,未上传,上传中,已上传
        var load = $("#" + P_IMG.loading + counter);
        $('#' + P_IMG.fileS + counter).fileupload({
            url: '/studyPack/imageFileUpload',
            add: function (e, data) {
                var uploadErrors = [];
                var acceptFileTypes = /^image\/(\w*)$/i;
                //文件类型判断
                if (!acceptFileTypes.test(data.originalFiles[0]['type'])) {
                    BootstrapDialog.warning("请上传图像");
                    return;
                }
                //文件大小判断
                if (data.originalFiles[0]['size'] > 50 * 1024) {
                    BootstrapDialog.warning("上传文件大小请小于50k");
                    return;
                }
                if (uploadErrors.length > 0) {
                    BootstrapDialog.warning("上传出错,请稍后再试");
                    return;
                } else {
                    load.text("上传中").removeClass("red").addClass("green");
                    data.submit();
                }
            },
            done: function (e, data) {
                if (data._response.result.result.length == 0) {
                    var alert = BootstrapDialog.alert || window.alert;
                    alert("请上传分辨率为257*343的图片!")
                    load.text("未上传").removeClass("green").addClass("red");
                    return;
                }
                else if (data._response.result.code == HttpUtil.success_code) {
                    var path = data._response.result.result[0].path;
                    $('#' + P_IMG.coverURL + counter).val(path);
                    // 图片回显
                    $('#' + P_IMG.preview + counter).attr('src', studyPack.imageServerPath + path);
                    load.text("已上传").removeClass("red").addClass("green");
                    $('#studyPackForm')//上传成功表单验证设置为通过
                        .data('bootstrapValidator')
                        .updateStatus('coverUrl', 'NOT_VALIDATED', null)
                        .validateField('coverUrl');
                } else {
                    var alert = BootstrapDialog.alert || window.alert;
                    alert("上传失败,请稍后再试!")
                }
            }
        });
    }

    /**
     * 初始化 jQuery File Upload 上传文件插件(pdf上传)
     * @param counter 计数器
     */
    function initPDFFileupload(counter) {
        //清空
        var nullVal = '';
        var PF = $('#' + P_PDF.fileURL + counter);
        var loading = $("#" + P_PDF.loading + counter);
        var status = $("#" + P_PDF.swfStatus + counter);
        var fileLength = $("#" + P_PDF.fileLength + counter);
        var url = '/studyPack/pdfUpload';
        $('#' + P_PDF.fileS + counter).fileupload({
            url: url,
            add: function (e, data) {
                var acceptFileTypes = /^application\/pdf$/i;
                //文件类型判断
                if (!acceptFileTypes.test(data.originalFiles[0]['type'])) {
                    BootstrapDialog.warning("请上传pdf格式文件!");
                    return;
                }
                loading.text("上传中").removeClass("red").addClass("green");
                data.submit();
            },
            done: function (e, data) {
                PF.val(nullVal);
                if (data.result.code == HttpUtil.success_code) {
                    loading.text("转码中").removeClass("red").addClass("green");
                    PF.val(data.result.result.path);
                    fileLength.val(data.result.result.fileLength);
                    status.val(0); // 赋初值
                    $('#studyPackForm')//上传成功表单验证设置为通过
                        .data('bootstrapValidator')
                        .updateStatus('fileUrl', 'NOT_VALIDATED', null)
                        .validateField('fileUrl');
                    BootstrapDialog.success('上传资料成功!');
                } else {
                    loading.text("未上传").removeClass("green").addClass("red");
                    var alert = BootstrapDialog.warning || window.alert;
                    alert(data.result.msg);
                }
            }
        });
    }

    function initBindEvents() {
        //重新加载校验事件
        $('#studyPackForm').data('bootstrapValidator', null);
        //绑定表单验证器
        $('#studyPackForm').bootstrapValidator({
            message: 'This value is not valid',
            excluded: [':disabled'],//不加它重新打开模态框时提示不会清除
            fields: {
                categoryId: {
                    validators: {
                        notEmpty: {
                            message: '请选择sku'
                        }
                    }
                },
                packTitle: {
                    validators: {
                        notEmpty: {
                            message: '请输入学习包名称'
                        },
                        stringLength: {
                            max: 50,
                            message: '不能超过50个字符'
                        }
                    }
                },
                title: {
                    validators: {
                        notEmpty: {
                            message: '请输入教材名称'
                        },
                        stringLength: {
                            max: 36,
                            message: '不能超过36个字符'
                        }
                    }
                },
                chiefEditor: {
                    validators: {
                        notEmpty: {
                            message: '请输入主编名称'
                        },
                        stringLength: {
                            max: 10,
                            message: '不能超过10个字符'
                        }
                    }
                },
                coverUrl: {
                    validators: {
                        notEmpty: {
                            message: '请上传封面图'
                        }
                    }
                },
                fileUrl: {
                    validators: {
                        notEmpty: {
                            message: '请上传pdf'
                        }
                    }
                },
                recordingId: {
                    validators: {}
                }
            }
        });

        //绑定模态框打开前时间(用于打开前重置表单)
        $('#studyPackForm').on('show.bs.modal', function () {
        });
    }

    //需要暴露到global域的API
    window.page = {
        init: function () {
        }, addNewTBook: addNewTBook, deleteBook: deleteBook, previewPdf: previewPdf
    }
})(window);