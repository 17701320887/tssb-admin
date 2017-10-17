/**
 * Created by admin on 2016/12/5.
 */

$(function () {

    $(".uploadImage").fileupload({
        url: basePath + '/appCourseConfig/ajaxBanReviewPic',
        sequentialUploads: true,
        add: function (e, data) {
            if (!validataEval(data.files[0].name.toLowerCase(), /(.jpg|.png|.gif|.ps|.jpeg|.bmp)$/)) {
                $().toastmessage('showErrorToast', "图片格式不对!");
                return;
            } else {
                data.submit();
            }
        }
    }).bind('fileuploadprogress', function (e, data) {
        obj = $(this);
        //objId = obj.data("id");
        $("#uploaddiv_config").find(".progress_div").css("display", "");
        $("#uploaddiv_config" ).find(".progressbar").css("display", "");
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $("#uploaddiv_config").find(".pic_progress").css('width', progress + '%');
        $("#uploaddiv_config").find(".pic_progress").html(progress + '%');
    }).bind('fileuploaddone', function (e, data) {
        $("#headImg").attr("src", data._response.result[0].src);
        $("#liveConfig_pic").val(data._response.result[0].path);
        $("#uploaddiv_config").find(".progress_div").css("display", "none");
        $("#uploaddiv_config").find(".progressbar").css("display", "none");
    });

    $("body").on("click", ".save-btn", function () {
        var formData = new FormData();
        var msg = null;
        $(".form-group input[type='text']").each(function () {
            if (msg) {
                return;
            }
            var title = $(this).parents(".form-group").find("label").text();
            var name = $(this).attr("name");
            var val = $(this).val();
            if (!val) {
                msg = "请完善" + title;
                return;
            }
            formData.append(name, val);
        });
        $(".form-group input[type='hidden']").each(function () {
            var name = $(this).attr("name");
            var val = $(this).val();
            formData.append(name, val);
        });

        $("select").each(function () {
            var val = $(this).val();
            var name = $(this).attr("name");
            formData.append(name, val);
        });

        if (msg) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        //$("input[type='file']").each(function () {
        //    var file = $(this)[0].files[0];
        //    var title = $(this).parents(".form-group").find("label.title").text();
        //    var name = $(this).attr("name");
        //    if (!file && !$(this).data("value")) {
        //        msg = "请完善" + title;
        //        return;
        //    }
        //    formData.append(name, file);//不能与映射实体类的字段相同
        //});

        var pic = $("#liveConfig_pic").val();
        if(pic == null || pic == ''){
            msg = "请完善图标";
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        formData.append("imageUrl", pic);


        $.ajax({
            url: basePath + "/appCourseConfig/save", type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if (data) {
                    if (data.ret == 1) {
                        location.href = basePath + "/appCourseConfig/list";
                    } else {
                        BootstrapDialog.alert({
                            title: "消息提示",
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING
                        });
                    }
                }
            }
        });
    });

    $("body").on("click", ".update-btn", function () {
        var formData = new FormData();
        var msg = null;
        $(".form-group input[type='text']").each(function () {
            var title = $(this).parents(".form-group").find("label").text();
            var name = $(this).attr("name");
            var val = $(this).val();
            if (!val) {
                msg = "请完善" + title;
                return;
            }
            formData.append(name, val);
        });
        $(".form-group input[type='hidden']").each(function () {
            var name = $(this).attr("name");
            var val = $(this).val();
            formData.append(name, val);
        });

        $("select").each(function () {
            var val = $(this).val();
            var name = $(this).attr("name");
            formData.append(name, val);
        });
        if (msg) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        var pic = $("#liveConfig_pic").val();
        if(pic == null || pic == ''){
            msg = "请完善图标";
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        formData.append("imageUrl", pic);



        $.ajax({
            url: basePath + "/appCourseConfig/update", type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if (data) {
                    if (data.ret == 1) {
                        location.href = basePath + "/appCourseConfig/list";
                    } else {
                        BootstrapDialog.alert({
                            title: "消息提示",
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING
                        });
                    }
                }
            }
        });
    });

    $("body").on("change",".conf-appType",function(){
        var appType = $(this).val();
        $.ajax({
            type: "POST",
            url:basePath+"/appCourseConfig/changeAppType",
            data:{'appType':appType},
            async: false,
            success: function(data) {
                if(data.length>0){
                    var jsonObj=eval(data);
                    var b =  '';
                    $.each(jsonObj, function (i, item) {
                        b = b+"<option value='"+item.skuId+"'>"+item.skuName+"</option>"
                    });
                    $(".conf-sku").html(b);
                }else{
                    var a = "<option value='0'><c:out value='暂无数据'></c:out></option>"
                    $(".conf-sku").html(a);
                }
            }
        });
    });

    $("body").on("change",".classify-type",function(){
        var classifyType = $(".classify-type").val();
        if (classifyType==4){
            var option = "<option value='3'>商品详情</option><option value='4'>商品列表</option>"
            $(".function-type").html(option);
        }else {
            var option = "<option value='1'>原生功能</option><option value='2'>非原生功能</option>"
            $(".function-type").html(option);
        }
    });


    $(".appType").change();
});



// 校验图片格式
function validataEval(obj, reg) {
    var result = obj.match(reg);
    if (result==null) {
        return false;
    } else {
        return true;
    }
}
