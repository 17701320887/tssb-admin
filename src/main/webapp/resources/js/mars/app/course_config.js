
$(function(){

    /**
     * 批量复制
     */
    $("body").on("click",".config-copy",function(){

        var appType = $(".appType").val();
        var sku = $(".sku-id").val();
        var appTypeName = $(".appType").find("option:selected").text();
        var skuName = $(".sku-id").find("option:selected").text();
        $.ajax({url:basePath +"/appCourseConfig/showCopy",data:{"appType":appType,"sku":sku,"appTypeName":appTypeName,"skuName":skuName},type:"POST",success:function(data){
            $("#copy_title_dialog").html(data);
        }});
    });

    $("body").on("click",".config-copy1",function(){

        $("#dialog-module").removeClass("hide");
        $("#dialog-module").dialog({
            height:150,
            width: 360,
            title:"复制题组",
            show: {
                effect: "blind",
                duration: 1000
            }
        });
    });

    /**
     * 复制题目
     */
    $("body").on("click",".config-copy-btn", function () {
        var appType = $(".appType_dialog").val();
        var sku = $(".sku_dialog").val();
        var copyAppType = $(".copy_appType").val();
        var copySku =$(".copy_sku").val();
        $.ajax({url:basePath + "/appCourseConfig/copy",
            data:{"appType":appType,"sku":sku,"copyAppType":copyAppType,"copySku":copySku},
            type:"POST",
            success:function(data){
            if(data && data.ret == 1){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:data.msg,
                    type:BootstrapDialog.TYPE_WARNING
                });
                $(".cancel-btn").click();
                $(".search").click();
            }else if(data){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:data.msg,
                    type:BootstrapDialog.TYPE_WARNING
                });
            }
        }});

    });

    $("body").on("click",".config-add",function(){
        var appType = $(".appType").val();
        var sku = $(".sku-id").val();
        window.open(basePath + "/appCourseConfig/add?appType="+appType+"&&sku="+sku,"_blank")
    });

    $("body").on("change",".appType",function(){
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
                    //var b =  "<option value=''>--请选择--</option>";
                    $.each(jsonObj, function (i, item) {
                        b = b+"<option value='"+item.skuId+"'>"+item.skuName+"</option>"
                    });
                    $(".sku-id").html(b);
                }else{
                    var a = "<option value='0'><c:out value='暂无数据'></c:out></option>"
                    $(".sku-id").html(a);
                }
            }
        });
    });

    $("body").on("change",".copy_appType",function(){
        var appType = $(this).val();
        $.ajax({
            type: "POST",
            url:basePath+"/appCourseConfig/changeAppType",
            data:{'appType':appType},
            async: false,
            success: function(data) {
                if(data.length>0){
                    var jsonObj=eval(data);
                    var b =  "<option value=''>全部sku</option>";
                    $.each(jsonObj, function (i, item) {
                        b = b+"<option value='"+item.skuId+"'>"+item.skuName+"</option>"
                    });
                    $(".copy_sku").html(b);
                }else{
                    var a = "<option value='0'><c:out value='暂无数据'></c:out></option>"
                    $(".copy_sku").html(a);
                }
            }
        });
    });

    $("body").on("click",".search",function(){
        var appType = $(".appType").val();
        $(".appType").parent().find("input[type='hidden']").val(appType);
        var skuId = $(".sku-id").val();
        $(".sku-id").parent().find("input[type='hidden']").val(skuId);
        var params = new Object();
        params["sku"] = skuId;
        params["appType"] = appType;
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        $.ajax({url:basePath + "/appCourseConfig/page",data:params,type:"POST",success:function(data){
            $("#spoken-data-list").html(data);
            renderSwitcher();
        }});
    });

    $("body").on("click",".delete",function(){
        var id = $(this).data("id");
        var obj = $(this);
        $.ajax({url:basePath + "/appCourseConfig/delete",data:{id:id},type:"POST",success:function(){
            obj.parents("tr").remove();
            $(".pagination .active a").click();
        }});
    });

    $(".search").click();
});
