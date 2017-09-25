/**
 * Created by admin on 2016/7/26.
 */
$(function () {
    $("body").on("click", ".card-add", function () {
        location.href = "/card/add";
    });

    $("body").on("click", ".search", function () {
        var name = $(".title").val();
        $(".title").parent().find("input[type='hidden']").val(name);
        var skuId = $(".sku-id").val();
        $(".sku-id").parent().find("input[type='hidden']").val(skuId);
        var params = new Object();
        params["name"] = name;
        params["skuId"] = skuId;
        if (!skuId) {
            return;
        }
        params["pageIndex"] = 1;
        params["pageSize"] = 5;
        $.ajax({
            url: "/card/page", data: params, type: "POST", success: function (data) {
                $("#card-data-list").html(data);
                renderSwitcher();
            }
        });
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
            url: "/card/updateStatus", data: params, type: "POST", success: function (data) {
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

    $("body").on("dblclick", ".upd-param", function () {
        var val = $(this).text();
        $(this).attr("data-bak", val);
        var input = $("<input type='text' maxlength='20' class='form-control' value='" + val + "'/>");
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
        var skuId = $(this).parents("td").attr("data-sku");
        var params = new Object();
        if(skuId!=undefined){
            params["skuId"]=skuId;
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
        if (params['name'] && params['name'].length > 20) {
            BootstrapDialog.alert({
                title: "消息提示",
                message: "卡片名称为20字以内",
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
            url: "/card/update", data: params, type: "POST", success: function (data) {
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