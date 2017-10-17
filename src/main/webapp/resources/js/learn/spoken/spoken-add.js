/**
 * Created by admin on 2016/7/26.
 */
$(function () {

    $("body").on("click", ".save-btn", function () {
        var formData = new FormData();
        var msg = null;
        if (!$("#cardId").val()) {
            msg = "请选择所属卡片";
        }
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
        if ($("#cardId").val()) {
            $("select").each(function () {
                var val = $(this).val();
                var name = $(this).attr("name");
                if (!val) {
                    msg = "请完善所属类别";
                }
                formData.append(name, val);
            });
        } else {
            msg = "请完善所属卡片";
        }
        if (msg) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        $.ajax({
            url: basePath + "/spoken/save", type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if(ExceptionDialog(data)){
                    if (data) {
                        if (data.ret == 1) {
                            location.href = basePath + "/spoken/list";
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

    $("body").on("click", ".update-btn", function () {
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
        $("input[type='file']").each(function () {
            var title = $(this).parents(".form-group").find("label").text();
            var file = $(this)[0].files[0];
            var name = $(this).attr("name");
            if (!file) {
                if (!$(this).data("value")) {
                    msg = "请完善" + title;
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
        if ($("#cardId").val()) {
            $("select").each(function () {
                var val = $(this).val();
                var name = $(this).attr("name");
                if (!val) {
                    msg = "请完善所属类别";
                }
                formData.append(name, val);
            });
        } else {
            msg = "请完善所属卡片";
        }

        if (msg) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        var sort = $("input[name='sort']").val();
        if (sort) {
            if (!/^\d+$/.test(sort)) {
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "输入内容不合法",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        $.ajax({
            url: basePath + "/spoken/update", type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if (data) {
                    if (data.ret == 1) {
                        location.href = basePath + "/spoken/list";
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

    $("body").on("change", ".card-id", function () {
        var cardId = $(this).val();
        $.ajax({
            url: basePath + "/category/loadAll",
            data: {cardId: cardId, status: 1},
            type: "POST",
            success: function (data) {
                $(".cate-id option").remove();
                if (data && data.ret == 1) {
                    var array = data.data;
                    for (var i = 0; i < array.length; i++) {
                        var item = array[i];
                        $(".cate-id").append($("<option value=\"" + item.id + "\">" + item.name + "</option>"));
                    }
                }
            }
        });
        $("#cardId").val(cardId);
    });

    $("body").on("change", ".sku-id", function () {
        var skuId = $(this).val();
        var params = new Object();
        params["skuId"] = skuId;
        params["status"] = 1;
        $.ajax({
            url: basePath + "/card/loadCards", data: params, type: "POST", success: function (data) {
                if (data && data.ret == 1) {
                    $(".card-id option:gt(0)").remove();
                    $(".cate-id option:gt(0)").remove();
                    var cards = data.data;
                    for (var i = 0; i < cards.length; i++) {
                        var card = cards[i];
                        $(".card-id").append($("<option value='" + card.id + "'>" + card.name + "</option>"));
                    }
                }
            }
        });
    });

    $(".sku-id").change();
});