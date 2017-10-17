/**
 * Created by xiaochao on 2016/12/30.
 */

$(function () {
    initTitleType(null);

    $(".search").on("click", function () {
        initTitleType(1);
    });

    $(".add").on("click", function () {
        window.open(basePath + "/msbTitleType/add");
    });

    $(".config").on("click", function () {
        window.open(basePath + "/msbClassTitleType/config");
    });

    function initTitleType(p) {
        var params = new Object();
        $(".sel-change").each(function (i, obj) {
            var val  = $(this).val();
            var name = $(this).data("name");
            if(val){
                params[name] = val;
                $("input[data-name="+name+"]").val(val);
            }else {
                $("input[data-name="+name+"]").val("");
            }

        });
        params["pageIndex"] = 1;
        params["pageSize"] = 10;

        if(params["sku"]>0){
            $.ajax({
                url: basePath + "/msbTitleType/page", async: false, data: params, type: "POST", success: function (ret) {
                    $("#title-type-data").html(ret);
                }
            });
        }else return;
        var tiType = ['图片', '视频', '音频', '文本', '文档'];
        $("#title-type-data .trans").each(function () {
            var val = $(this).text();
            var newVal = "";
            if (val.indexOf(",") > -1) {
                var split = val.split(",");
                for (var i in split) {
                    newVal += tiType[split[i] - 1] + ",";
                }
                newVal = newVal.substring(0, newVal.length - 1);
            } else {
                newVal = tiType[val - 1];
            }
            $(this).text(newVal);

        });
        if(!p){
            initClassTitleType($(".sku-id").val());
        }
    }

    $("body").on("click",".edit",function(){
        window.open($(this).data("url"));
    });

    $("body").on("click",".delete",function(){
        var url = $(this).data("url");
        BootstrapDialog.confirm({
            title: '消息提示',
            message: "确认要删除此题型吗?",
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: "取消",
            btnOKLabel: "确认",
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    $.ajax({url:basePath + url,type: "POST",
                        success: function (ret) {
                            if(ExceptionDialog(ret)){
                                if(ret.code==200){
                                    $(".search").click();
                                }else {
                                    warningMsg(ret.msg);
                                }
                            }
                        }
                    });
                }
            }
        })
    });


    function initClassTitleType(skuId){
        var obj  = $(".class-type-id");
        obj.find("option:gt(0)").remove()
        $.ajax({url: basePath + "/msbClassTitleType/getBySku", data: {"skuId": skuId}, type: "POST",
            success: function (ret) {
                $.each(ret, function (i, o) {
                    obj.append("<option value='" + o.id + "'>" + o.title + "</option>");
                });
            }
        });
    }


    $(".sku-id").on("change",function(){
        var val = $(this).val();
        if(val){
           initClassTitleType(val);
        }
    });
});