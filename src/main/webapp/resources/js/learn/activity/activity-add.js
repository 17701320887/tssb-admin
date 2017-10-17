/**
 * Created by admin on 2016/7/28.
 */
$(function () {

    $("body").on("click", ".goods-id", function (event) {
        if ($("input[name='id']").val() == undefined) {
            var skuId = $(".sku-id").val();
            $.ajax({
                url: basePath + "/commodity/loadCommoditys",
                type: "POST",
                data: {skuId: skuId},
                success: function (data) {
                    $("#content-div").html(data);
                }
            });
        } else {
            event.stopPropagation();
        }
    });

    $("body").on("click", "#content-div ul li", function () {
        $("input[name=goodsId]").val($(this).data("value"));
        $(".close").click();
    });

    $("body").on("click", ".activity-save", function () {
        var formData = new FormData();
        var params = new Object();
        var msg = null;
        formData.append("skuId", $("select[name='skuId']").val());
        $(".form-group input[type='text']").each(function () {
            if (msg) {
                return;
            }
            var title = $(this).parents(".form-group").find("label.title").text();
            var name = $(this).attr("name");
            var val = $(this).val();
            if (!val) {
                msg = "请完善" + title;
                return;
            }
            if ($(this).hasClass("date-piker")) {
                var d = new Date(val);
                formData.append(name, d);
                params[name] = d;
            } else {
                if ($(this).hasClass("s-p")) {
                    params[name] = val;
                }
                formData.append(name, val);
            }
        });
        $(".form-group textarea").each(function () {
            var name = $(this).attr("name");
            var val = $(this).val();
            formData.append(name, val);
        });
        if (msg) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        } else {
            $("input[type='file']").each(function () {
                var file = $(this)[0].files[0];
                var title = $(this).parents(".form-group").find("label.title").text();
                var name = $(this).attr("name");
                if (!file && !$(this).data("value")) {
                    msg = "请完善" + title;
                    return;
                }
                formData.append(name, file);//不能与映射实体类的字段相同
            });
            if (msg) {
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: msg,
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }

        if (params["sellEndDate"] >= params["examDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "考试时间必须大于活动停售时间",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        if (params["sellEndDate"] >= params["uploadBeginDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "成绩上传开始时间必须大于活动停售时间",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        if (params["uploadBeginDate"] > params["uploadEndDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "开始上传成绩时间必须小于结束时间",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (params["checkEndDate"] <= params["uploadEndDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "公布成绩时间必须在成绩上传结束之后",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (params["taxRate"] >= 100) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "税率不能大于100%",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (!/^\d+(.\d{1,2})?$/.test(params["money"]) || params["money"] <= 0) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "活动价格输入有误",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        var needCheck = $(".form-group input[name='needCheck']");
        if (needCheck[0] && needCheck[0].checked) {
            formData.append("needCheck", 1);
        } else {
            formData.append("needCheck", 0);
        }
        $.ajax({
            url: basePath + "/activity/save",
            type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if (data) {
                    if (data.ret == 1) {
                        location.href = basePath + "/activity/list";
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
        var params = new Object();
        var msg = null;
        $(".form-group input[type='text']").each(function () {
            if (msg) {
                return;
            }
            var title = $(this).parents(".form-group").find("label.title").text();
            var name = $(this).attr("name");
            var val = $(this).val();
            if (!val) {
                msg = "请完善" + title;
                return;
            }
            if ($(this).hasClass("date-piker")) {
                var d = new Date(val);
                formData.append(name, d);
                params[name] = d;
            } else {
                formData.append(name, val);
            }
        });
        $("input[type='file']").each(function () {
            var file = $(this)[0].files[0];
            var title = $(this).parents(".form-group").find("label.title").text();
            var name = $(this).attr("name");
            if (!file && !$(this).data("value")) {
                msg = "请完善" + title;
                return;
            }
            formData.append(name, file);//不能与映射实体类的字段相同
        });
        $(".form-group textarea").each(function () {
            var name = $(this).attr("name");
            var val = $(this).val();
            formData.append(name, val);
        });
        $(".form-group input[type='hidden']").each(function () {
            var name = $(this).attr("name");
            var val = $(this).val();
            formData.append(name, val);
        });
        if (params["sellEndDate"] >= params["examDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "考试时间必须大于活动停售时间",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (params["sellEndDate"] >= params["uploadBeginDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "成绩上传开始时间必须大于活动停售时间",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (params["uploadBeginDate"] > params["uploadEndDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "开始上传成绩时间必须小于结束时间",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (params["checkEndDate"] <= params["uploadEndDate"]) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "公布成绩时间必须在成绩上传结束之后",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (!/^\d+(.\d{1,2})?$/.test($("#money").val()) || $("#money").val() <= 0) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "活动价格输入有误",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (msg) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        var needCheck = $(".form-group input[name='needCheck']");
        if (needCheck[0] && needCheck[0].checked) {
            formData.append("needCheck", 1);
        } else {
            formData.append("needCheck", 0);
        }
        $.ajax({
            url: basePath + "/activity/update",
            type: "POST",
            data: formData,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (data) {
                if (data) {
                    if (data.ret == 1) {
                        location.href = basePath + "/activity/list";
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
});