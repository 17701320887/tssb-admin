/**
 * Created by admin on 2016/7/26.
 */
$(function () {
    FormSliderSwitcher.init();

    $("body").on("click", ".card-save", function () {
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
        $("input[type='file']").each(function () {
            var title = $(this).parents(".form-group").find("label").text();
            var file = $(this)[0].files[0];
            var name = $(this).attr("name");
            if (!file) {
                msg = "请完善" + title;
                return;
            }
            var regex = new RegExp($(this).attr("accept"))
            if (!regex.test(file.type)) {
                msg = title + "的文件格式不合法！";
                $(this).val("");
                return;
            }
            if (file) {
                formData.append(name, file);//不能与映射实体类的字段相同
            }
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
        var sort = $("input[name='sort']").val();
        if (!/^\d+$/.test(sort)) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "排序内容不合法",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        $.ajax({
            url: basePath + "/card/save", type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if(ExceptionDialog(data)){
                    if (data) {
                        if (data.ret == 1) {
                            location.href = basePath + "/card/list";
                        } else {
                            BootstrapDialog.alert({
                                title: "消息提示",
                                message: data.msg,
                                type: BootstrapDialog.TYPE_WARNING
                            });
                        }
                    }
                }
            }
        });
    });


    $("body").on("click", ".card-update", function () {
        var formData = new FormData();
        formData.append("skuId",$("#sku-id").val());
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
        $("input[type='file']").each(function () {
            var title = $(this).parents(".form-group").find("label").text();
            var file = $(this)[0].files[0];
            var name = $(this).attr("name");
            if (!file) {
                if (!$(this).data("value")) {
                    msg = "请完善" + title;
                    return;
                } else {
                    return;
                }
            }
            var regex = new RegExp($(this).attr("accept"))
            if (!regex.test(file.type)) {
                msg = title + "的文件格式不合法！";
                $(this).val("");
                return;
            }
            if (file) {
                formData.append(name, file);//不能与映射实体类的字段相同
            }
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
        var sort = $("input[name='sort']").val();
        if (!/^\d+$/.test(sort)) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "排序内容不合法",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        $.ajax({
            url: basePath + "/card/update", type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if(ExceptionDialog(data)){
                    if (data) {
                        if (data.ret == 1) {
                           location.href = basePath + "/card/list";
                        } else {
                            BootstrapDialog.alert({
                                title: "消息提示",
                                message: data.msg,
                                type: BootstrapDialog.TYPE_WARNING
                            });
                        }
                    }
                }
            }
        });
    });
});