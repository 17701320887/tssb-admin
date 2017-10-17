var path = $("#path").val();
$(document).ready(function(){
    $("body").on("click",".convert-add",function () {
        var appTypeId = $("#appTypeId").val();
        if (appTypeId==0){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请选择APP",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        window.open(path + "/appConvert/showAdd/"+appTypeId,"_blank")
    });

    $("body").on("click",".search",function () {
        var appTypeId = $("#appTypeId").val();
        $("#appTypeId").parent().find("input[type='hidden']").val(appTypeId);
        var params = new Object();
        params["appTypeId"] = appTypeId;
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        $.ajax({
            url:path+"/appConvert/page",
            data:params,
            type:"POST",
            success:function (data) {
                $("#convert-data-list").html(data);
                renderSwitcher();
            }
        });
    })

    $("body").on("change","#skuList",function () {
        var skuId = $("#skuList").val();
        if (skuId == 0){
            $("#comId").html("<option value=\"0\">--请选择--</option>")
            return;
        }
        var params = new Object();
        params["skuId"] = skuId;
        $.ajax({
            url:path+"/appConvert/findCommodity",
            data:params,
            type:"POST",
            success:function (data) {
                if (data.length==0){
                    $("#comId").html("<option value=\"0\">--请选择--</option>")
                    return;
                }else {
                    var comSelect = "<option value='0'>--请选择--</option>";
                    for (var i = 0; i < data.length; i++) {
                        comSelect += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
                    }
                    $("#comId").html(comSelect);
                    return;
                }
            }
        })
    })

    $("body").on("click","#saveBtn",function () {
        var appTypeId = $("#appType").val();
        var sku = $("#skuList").val();
        var liveTitle = $("#liveTitle").val();
        var liveSecondTitle = $("#liveSecondTitle").val();
        var orderNum = $("#orderNum").val();
        var comTitle = $("#comTitle").val();
        var comSecondTitle = $("#comSecondTitle").val();
        var comId = $("#comId").val();
        var xiaoneng = $("#xiaoneng").val();
        var status = $("#status").val();

        if (appTypeId==null||appTypeId==""||appTypeId==0){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请选择APP",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (sku==0){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请选择SKU",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (liveTitle==null||$.trim(liveTitle) ==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写卡片标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (liveSecondTitle==null||$.trim(liveSecondTitle) ==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "填写卡片副标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (orderNum==null||$.trim(orderNum) == ""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写顺序",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (comTitle==null||$.trim(comTitle) == ""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写商品标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (comSecondTitle ==null||$.trim(comSecondTitle)==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写商品副标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (comId==0){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请选择商品",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (xiaoneng==null||$.trim(xiaoneng)==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写小能",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        var params = new Object();
        params["appType"] = appTypeId;
        params["sku"] = sku;
        params["liveTitle"] = liveTitle;
        params["liveSecondTitle"] = liveSecondTitle;
        params["orderNum"] = orderNum;
        params["comTitle"] = comTitle;
        params["comSecondTitle"] = comSecondTitle;
        params["comId"] = comId;
        params["xiaoneng"] = xiaoneng;
        params["status"] = status;
        $.ajax({
            url:path+"/appConvert/add",
            data:params,
            type:"POST",
            success:function (data) {
                if (data == 2){
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "保存失败",
                        type: BootstrapDialog.TYPE_WARNING
                    });
                    return;
                }else {
                    BootstrapDialog.show({
                        title: "消息提示",
                        message: "操作成功",
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'OK',
                            action: function() {
                                window.location.href = path+"/appConvert/showAdd/"+appTypeId;
                            }
                        }]
                    });
                }
            }
        });
    });

    $("body").on("click","#updateBtn",function () {
        var convertId = $("#convertId").val();
        var appTypeId = $("#appType").val();
        var sku = $("#skuList").val();
        var liveTitle = $("#liveTitle").val();
        var liveSecondTitle = $("#liveSecondTitle").val();
        var orderNum = $("#orderNum").val();
        var comTitle = $("#comTitle").val();
        var comSecondTitle = $("#comSecondTitle").val();
        var comId = $("#comId").val();
        var xiaoneng = $("#xiaoneng").val();
        var status = $("#status").val();
        if (convertId==null||$.trim(convertId)==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "修改失败",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (appTypeId==null||appTypeId==""||appTypeId==0){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请选择APP",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (sku==0){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请选择SKU",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (liveTitle==null||$.trim(liveTitle) ==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写卡片标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (liveSecondTitle==null||$.trim(liveSecondTitle) ==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "填写卡片副标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (orderNum==null||$.trim(orderNum) == ""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写顺序",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (comTitle==null||$.trim(comTitle) == ""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写商品标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (comSecondTitle ==null||$.trim(comSecondTitle)==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写商品副标题",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (comId==0){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请选择商品",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if (xiaoneng==null||$.trim(xiaoneng)==""){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请填写小能",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        var params = new Object();
        params["id"] = convertId;
        params["appType"] = appTypeId;
        params["sku"] = sku;
        params["liveTitle"] = liveTitle;
        params["liveSecondTitle"] = liveSecondTitle;
        params["orderNum"] = orderNum;
        params["comTitle"] = comTitle;
        params["comSecondTitle"] = comSecondTitle;
        params["comId"] = comId;
        params["xiaoneng"] = xiaoneng;
        params["status"] = status;
        $.ajax({
            url:path+"/appConvert/update",
            data:params,
            type:"POST",
            success:function (data) {
                if (data == 2){
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "保存失败",
                        type: BootstrapDialog.TYPE_WARNING
                    });
                    return;
                }else {
                    BootstrapDialog.show({
                        title: "消息提示",
                        message: "操作成功",
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'OK',
                            action: function() {
                                window.location.href = path+"/appConvert/showAdd/"+appTypeId;
                            }
                        }]
                    });
                }
            }
        });
    });

    $("body").on("click",".delete",function () {
        var convertId = $(this).data("id");
        var params = new Object();
        params["convertId"] = convertId;
        $.ajax({
            url:path+"/appConvert/delete",
            data:params,
            type:"POST",
            success:function (data) {
                if (data == 2){
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "保存失败",
                        type: BootstrapDialog.TYPE_WARNING
                    });
                    return;
                }else {
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "操作成功",
                        type: BootstrapDialog.TYPE_SUCCESS
                    });
                    $(".search").click();
                }
            }
        });
    });

    /**
     * 是否启用
     */
    $("body").on("click",".switchery",function(){
        var state = $(this).parents("td").find("[data-switchery]");
        var id = state.data("id")
        var status = state.prop("checked");
        var params = new Object();
        params["id"] = id;
        params["status"] = 2;
        if(status){
        params["status"] = 1;
        }
        $.ajax({url:path + "/appConvert/update",data:params,type:"POST",success:function(data){
            if(data == 1){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:"修改成功",
                    type:BootstrapDialog.TYPE_WARNING
                });
                //var pagination = $(".pagination .active a");
                //$(".pagination .active").removeClass("active").addClass("paginate_button");
                //pagination.click();
            }else{
                state.parent().find(".switchery").remove();
                if(status){
                    state.removeAttr("checked");
                }else{
                    state.attr("checked","checked");
                }
                renderSwitcherInit(state[0]);
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:"系统异常",
                    type:BootstrapDialog.TYPE_WARNING
                });
            }
        }});
    });
});