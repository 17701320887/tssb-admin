/**
 * Created by xiaochao on 2017/1/11.
 */

$(function () {
    initCategory(null);

    $(".search").on("click", function () {
        initCategory(1);
    });

    $(".add").on("click", function () {
        window.open(basePath + "/msbCategory/add");
    });

    function initCategory(p) {
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
                url: basePath + "/msbCategory/page", async: false, data: params, type: "POST", success: function (ret) {
                    $("#category-data").html(ret);
                }
            });
        }else return;

        if(!p){
            initClassTitleType($(".sku-id").val());
        }
    }

    $("body").on("click",".edit",function(){
        window.open($(this).data("url"));
    });


    function initClassTitleType(skuId){
        if(skuId){
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
    }


    $(".sku-id").on("change",function(){
        var val = $(this).val();
        initClassTitleType(val);
    });
});