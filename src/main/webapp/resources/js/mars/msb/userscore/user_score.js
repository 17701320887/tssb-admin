/**
 * Created by xiaochao on 2016/12/29.
 */
$(function() {
    initUserScore(null);
    /**
     * 查询
     */
    $(".search").on("click",function(){
        initUserScore(1);
    });


    /**
     * 导出excel
     */
    $(".excel").on("click",function(){
        var pageIndex = $("#pageIndex").val();
        var pageSize = $("#pageSize").val();
        var classType = $("select[data-name='classType']").val();
        var clazz = $("select[data-name='clazz']").val();
        var skuId = $("select[data-name='skuId']").val();
        var userId = $("select[data-name='userId']").val();
        if(skuId>0){
            location.href = basePath+"/msbUserScores/d?pageIndex="+pageIndex+"&pageSize="+pageSize+"&classType="+classType+"&clazz="+clazz+"&skuId="+skuId+"&userId="+userId;
        }

    });

    /**
     * 展示详情
     */
    $("body").on("click",".show-detail",function(){
        $("#detail").html($(this).data("comment"));
        $('#myModal').modal('show');

    });

    function initUserScore(p) {
        var params = new Object();
        $(".sel-change").each(function(i,obj){
            params[$(this).data("name")] = $(this).val();
            $(this).parent().find("input[type='hidden']").val($(this).val());
        });
        params["pageIndex"] = 1;
        params["pageSize"] = 10;

        if(params["skuId"]>0){
            $.ajax({
                url: basePath + "/msbUserScores/page", data: params, type: "POST", success: function (ret) {
                    $("#score-data-list").html(ret);
                }
            });
        }
        var params2 = new Object();
        params2["skuId"]=$(".sku-id").val();
        if(!p){
            callBack(basePath + "/msbClassTitleType/getBySku",params2, "skuId", $("select[data-name='classType']"));
        }
    }


    /**
     * 列表页下拉框事件   获取班型,获取班级
     */
    $(".sel-change").on("change", function () {
        var name = $(this).data("name");
        var val = $(this).val();
        if(val&&val>0){
            var params = new Object();
            params[name]=val;
            switch (name) {
                case "skuId":
                    callBack(basePath + "/msbClassTitleType/getBySku", params, name, $("select[data-name='classType']"));
                    return;
                case "classType":
                    callBack(basePath + "/classes/findByClassType", params, name, $("select[data-name='clazz']"));
                    return;
            }
        }else {
            if(name=="skuId"){
                $("select[data-name='classType']").find("option:gt(0)").remove();
                $("select[data-name='clazz']").find("option:gt(0)").remove();
            }else if(name=="classType"){
                $("select[data-name='clazz']").find("option:gt(0)").remove();
            }
        }

    });


    function callBack(url, params, type, obj) {
        $.ajax({
            url: basePath + url, data: params, type: "POST", success: function (ret) {
            obj.find("option:gt(0)").remove();
                if (ret.length > 0) {
                    $.each(ret, function (i, o) {
                        if(type=="skuId"){
                            obj.append("<option value='" + o.id + "'>"+o.title+"</option>");
                            $("select[data-name='clazz']").find("option:gt(0)").remove();
                        }else if(type == "classType"){
                            obj.append("<option value='" + o.id + "'>"+o.classNo+"</option>");
                        }

                    });
                }else {
                    if(type=="skuId"){
                        $("select[data-name='classType']").find("option:gt(0)").remove();
                        $("select[data-name='clazz']").find("option:gt(0)").remove();
                    }else if(name=="classType"){
                        $("select[data-name='clazz']").find("option:gt(0)").remove();
                    }
                }

            }
        });
    }



});