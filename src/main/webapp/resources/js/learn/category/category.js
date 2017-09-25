/**
 * Created by admin on 2016/7/26.
 */
$(function () {
    $("body").on("click", ".card-category-add", function () {
        var content = $(".module-div").clone();
        content.removeClass("hide");
        content.attr("id", "add-module");
        BootstrapDialog.show({
            title: "新建分类",
            message: content,
            buttons: [{
                label: "保存",
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var params = new Object();
                    var msg = null;
                    $("#add-module .form-group input[type='text']").each(function () {
                        if (msg) {
                            return;
                        }
                        var title = $(this).parents(".form-group").find("label").text();
                        var name = $(this).attr("name");
                        var val = $(this).val();
                        if (!val) {
                            msg = "请完善" + title;
                            return;
                        } else if (name == "name" && val.length > 20) {
                            msg = title + "为20字以内";
                            return;
                        }else if(name == "sort"){
                            if (!/^\d+$/.test(val)) {
                                msg = title + "输入内容不合法";
                            }
                        }
                        params[name] = val;
                    });

                    $("#add-module .form-group input[type='hidden']").each(function () {
                        var name = $(this).attr("name");
                        var val = $(this).val();
                        params[name] = val;
                    });
                    if (msg) {
                        BootstrapDialog.alert({
                            title: "消息提示",
                            message: msg,
                            type: BootstrapDialog.TYPE_WARNING
                        });
                        return;
                    }
                    $.ajax({
                        url: basePath + "/category/save", type: "POST", data: params, success: function (data) {
                            if(ExceptionDialog(data)){
                                if (data) {
                                    if (data.ret == 1) {
                                        dialogRef.close();
                                        $(".search").click();
                                    } else {
                                        BootstrapDialog.alert(data.msg);
                                    }
                                }
                            }
                        }
                    });
                }
            }, {
                label: "取消",
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }]
        });
        //location.href = basePath + "/category/add?cardId="+cardId;
    });

    $("body").on("click", ".switchery", function () {
        var state = $(this).parents("td").find("[data-switchery]");
        var id = state.data("id")
        var status = state.prop("checked");
        var params = new Object();
        params["id"] = id;
        params["status"] = 0;
        if (status) {
            params["status"] = 1;
        }
        $.ajax({
            url: basePath + "/category/updateStatus", data: params, type: "POST", success: function (data) {
                if (data && data.ret == 1) {
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: data.msg,
                        type: BootstrapDialog.TYPE_WARNING
                    });
                } else {
                    state.parent().find(".switchery").remove();
                    if (status) {
                        state.removeAttr("checked");
                    } else {
                        state.attr("checked", "checked");
                    }
                    renderSwitcherInit(state[0]);
                }
            }
        });
    });

    $("body").on("click", ".search", function () {
        var cardId = $("#cardId").val();
        $(".card-id").parent().find("input[type='hidden']").val(cardId);
        var params = new Object();
        params["cardId"] = cardId;
        params["pageIndex"] = 1;
        params["pageSize"] = 5;
        $.ajax({
            url: basePath + "/category/page", data: params, type: "POST", success: function (data) {
                $("#category-data-list").html(data);
                renderSwitcher();
            }
        });
    });

    $("body").on("dblclick", ".upd-param", function () {
        var val = $(this).text();
        $(this).attr("data-bak", val);
        var input = $("<input type='text' class='form-control' maxlength='20' value='" + val + "'/>");
        $(this).html(input);
        $(input).focus();
        //将光标移动到文本框末尾
        input[0].selectionStart = val.length;
        input[0].selectionEnd = val.length;
    });

    $("body").on("keydown", ".upd-param input[type='text']", function (e) {
        var self = $(this);
        if (e.keyCode == 13) {
            self.blur();
        }
    });

    $("body").on("blur", ".upd-param input[type='text']", function () {
        var td = $(this).parents("td");
        var val = $(this).val();
        var key = $(this).parents("td").data("name");
        var params = new Object();
        var cardId = $(this).parents("td").attr("data-card");
        if(cardId!=undefined){
            params["cardId"] = cardId;
        }
        params[key] = val;
        params["id"] = $(this).parents("tr").data("id");
        var bak = td.data("bak");
        if (bak == val) {
            td.html(bak)
            return;
        }
        if (!val) {
            var idx = td.index();
            var msg = "请输入" + $(this).parents("table").find("tr:eq(0)").find("th:eq(" + idx + ")").text();
            BootstrapDialog.alert({
                title: "消息提示",
                message: msg,
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (params["name"] && params["name"].length > 20) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "分类名称为20字以内",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (params["sort"]) {
            if (!/^\d+$/.test(params["sort"]) || params["sort"].length > 3) {
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "输入内容不合法或大于三位数",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        $.ajax({
            url: "/category/update", data: params, type: "POST", success: function (data) {
                if(ExceptionDialog(data)){
                    if (data && data.ret == 1) {
                        location.reload();
                    } else {
                        BootstrapDialog.alert({
                            title: "消息提示",
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING
                        });
                        td.html(bak)
                    }
                }

            }
        });
    });

    $(".search").click();
});