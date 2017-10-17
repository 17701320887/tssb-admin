/**
 * Created by admin on 2016/12/30.
 */
$(function(){

    /**
     * 添加题组
     */

    $("body").on("click",".add_newTitleGroup",function(){
        $("#orderTime4").attr("checked",false);
        $("#orderTime3").attr("checked",true);
        $(".show-orderTime").hide();
    });

    $("body").on("click",".forbid-word-add",function(){
        $("#add-forbidden-word").removeClass("hide");
        $("#add-forbidden-word").dialog({
            height:150,
            width: 360,
            title:"添加题组",
            show: {
                effect: "blind",
                duration: 1000
            }
        });
    });


    /**
     * 修改题组
     */
    $("body").on("click",".edit_orderTime",function(){
        var name_dialog = $(this).parents("tr").find(".upd-param").text();
        var orderTime_dialog = $(this).parents("tr").find(".upd-orderTime").text();
        var id_dialog = $(this).parents("tr").data("id");
        $("#update-forbidden-word").find(".add-name").val(name_dialog);
        if($.trim(orderTime_dialog) != "无"){
            $("#orderTime2").attr("checked",true);
            $("#orderTime1").attr("checked",false);
            $(".show-orderTime").show();
            $("#update-forbidden-word").find(".add-orderTime").val(orderTime_dialog);
        }else {
            $("#orderTime2").attr("checked",false);
            $("#orderTime1").attr("checked",true);
            $(".show-orderTime").hide();
            $("#update-forbidden-word").find(".add-orderTime").val("");
        }
        $("#update-forbidden-word").find(".add-id").val(id_dialog);
    });

    $("body").on("click",".edit_orderTime1",function(){
        $("#update-forbidden-word").removeClass("hide");
        $("#update-forbidden-word").dialog({
            height:150,
            width: 360,
            title:"修改题组",
            show: {
                effect: "blind",
                duration: 1000
            }
        });
    });

    $(".add-orderTime").datetimepicker({
        language:  'zh-CN',
        minuteStep: 1,
        startDate: new Date()
    });


    /**
     * 复制题组
     */
    $("body").on("click",".copyTitle",function(){
        var params = new Object();
        var sku = $(".sku").val();
        var classTypeId = $(".classTypeId").val();
        var classId = $(".classId").val();
        var titleGroupsIds = "" ;
        $('input[name="titleGroupId"]:checked').each(function(){
            titleGroupsIds+=$(this).val()+","
        });
        params["sku"] = sku;
        params["classTypeId"] = classTypeId;
        params["classId"] = classId;
        params["titleGroupsIds"] = titleGroupsIds;

        $.ajax({url:basePath +"/msbTitleGroup/showCopy",data:params,type:"POST",success:function(data){
            $("#copy_title_dialog").html(data);
        }});
    });


    $("body").on("click",".copyTitle1",function(){

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
     * 修改题目
     */
    //$("body").on("click",".edit",function(){
    //    var self = $(this).parents("tr").find(".upd-param");
    //
    //    var val = self.text();
    //    self.attr("data-bak",val);
    //    var input = $("<input type='text' class='form-control' maxlength='50' value='"+val+"'/>");
    //    self.html(input);
    //    $(input).focus();
    //    //将光标移动到文本框末尾
    //    input[0].selectionStart = val.length;
    //    input[0].selectionEnd = val.length;
    //});
    //
    //$("body").on("keydown",".upd-param input[type='text']",function(e){
    //    var self = $(this);
    //    if(e.keyCode == 13){
    //        self.blur();
    //    }
    //});
    //
    //$("body").on("blur",".upd-param input[type='text']",function(){
    //    var td = $(this).parents("td");
    //    var val = $(this).val();
    //    var key = $(this).parents("td").data("name");
    //    var params = new Object();
    //    params[key] = val;
    //    params["id"] = $(this).parents("tr").data("id");
    //    var bak = td.data("bak");
    //    if(bak == val){
    //        td.html(bak)
    //        return;
    //    }
    //    if(!val){
    //        var idx = td.index();
    //        var msg = "请输入" + $(this).parents("table").find("tr:eq(0)").find("td:eq("+idx+")").text();
    //        BootstrapDialog.alert({
    //            title:"消息提示",
    //            message:msg,
    //            type:BootstrapDialog.TYPE_WARNING
    //        });
    //        return;
    //    }
    //    if(!/^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(val)){
    //        BootstrapDialog.alert({
    //            title:"消息提示",
    //            message:"内容中包含特殊字符",
    //            type:BootstrapDialog.TYPE_WARNING
    //        });
    //        return;
    //    }
    //    $.ajax({url:basePath +"/msbTitleGroup/update",data:params,type:"POST",success:function(data){
    //        if(data && data.ret == 1){
    //            td.html(val);
    //        }else{
    //            BootstrapDialog.alert({
    //                title:"消息提示",
    //                message:data.msg,
    //                type:BootstrapDialog.TYPE_WARNING
    //            });
    //        }
    //    }});
    //});

    /**
     * 添加题目
     */
    $("body").on("click",".forbid-word-save-btn",function(){
        var params = new Object();
        var name = $(this).parents("#add-forbidden-word").find(".add-name").val();
        var sku = $(".sku").val();
        var classTypeId = $(".classTypeId").val();
        var classId = $(".classId").val();
        if($("input:radio[name='orderTime']:checked").val() ==2){
            var orderTime = $(this).parents("#add-forbidden-word").find(".add-orderTime").val();
            params["orderTime"] = orderTime;
            if(!orderTime){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:"请添加预约时间",
                    type:BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        params["name"] = name;
        params["sku"] = sku;
        params["classTypeId"] = classTypeId;
        params["classId"] = classId;
        if(!sku ||!classTypeId ||!classId){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请选择班级",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if(!name){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请输入内容",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        } else if(!/^[|a-zA-Z0-9\u4E00-\u9FA5]+$/.test(name)){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"内容中包含特殊字符",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        $.ajax({url:basePath + "/msbTitleGroup/save",data:params,type:"POST",success:function(data){
            if(data && data.ret == 1){
                $(".add-name").val("");
                $(".add-orderTime").val("");
                $(".cancel-btn").click();
                $(".search").click();
                // $("#add-forbidden-word").dialog( "close" );
            }else if(data){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:data.msg,
                    type:BootstrapDialog.TYPE_WARNING
                });
            }
        }});
    });

    /**
     *修改题组
     */
    $("body").on("click",".forbid-word-update-btn",function(){
        var params = new Object();
        var id = $(this).parents("#update-forbidden-word").find(".add-id").val();
        var name = $(this).parents("#update-forbidden-word").find(".add-name").val();

        if($(this).parents("#update-forbidden-word").find("input:radio[name='change_orderTime']:checked").val() ==2){
            var orderTime = $(this).parents("#update-forbidden-word").find(".add-orderTime").val();
            params["orderTime"] = orderTime;
            if(!orderTime){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:"请添加预约时间",
                    type:BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        params["id"] = id;
        params["name"] = name;
        if(!name){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请输入内容",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        } else if(!/^[|a-zA-Z0-9\u4E00-\u9FA5]+$/.test(name)){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"内容中包含特殊字符",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        $.ajax({url:basePath + "/msbTitleGroup/update",data:params,type:"POST",success:function(data){
            if(data && data.ret == 1){
                $(".cancel-btn").click();
                $(".search").click();
                // $("#add-forbidden-word").dialog( "close" );
            }else if(data){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:data.msg,
                    type:BootstrapDialog.TYPE_WARNING
                });
            }
        }});
    });


    /**
     * 复制题目
     */
    $("body").on("click",".title-copy-btn", function () {
        var params = new Object();
        var copyClassTypeId = $(this).parents("#dialog-module").find(".classTypeId_dialog").val();
        var copy_classId ="";
        $(this).parents("#dialog-module").find($('input[name="classId_copy"]:checked')).each(function(){
            copy_classId += $(this).val();
            copy_classId += ",";

        });
        var sku = $(".sku").val();
        var classTypeId = $(".classTypeId").val();
        var classId = $(".classId").val();
        var title_groups_ids =  $(".titleGroupsIds_dialog").val();
        if(!title_groups_ids){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请选择要复制的题组",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        params["copyClassTypeId"] = copyClassTypeId;
        params["copyClassId"] = copy_classId;
        params["titleGroupsIds"] = title_groups_ids;
        params["sku"] = sku;
        params["classTypeId"] = classTypeId;
        params["classId"] = classId;
        if(!copyClassTypeId){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请选择班型",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if(!copy_classId){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请选择班级",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }

        $.ajax({url:basePath + "/msbTitleGroup/copy",data:params,type:"POST",success:function(data){
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

    /**
     * 查询
     */
    $("body").on("click",".search",function(){
        var sku = $(".sku").val();
        $(".sku").parent().find("input[type='hidden']").val(sku);
        var classTypeId = $(".classTypeId").val();
        $(".classTypeId").parent().find("input[type='hidden']").val(classTypeId);
        var classId = $(".classId").val();
        $(".classId").parent().find("input[type='hidden']").val(classId);
        var params = new Object();
        params["sku"] = sku;
        params["classTypeId"] = classTypeId;
        params["classId"] = classId;
        if(!sku ||!classTypeId ||!classId){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请选择班级",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        $.ajax({url:basePath + "/msbTitleGroup/page",data:params,type:"POST",success:function(data){
            $("#course-data-list").html(data);
            renderSwitcher();
        }});
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
        //params["status"] = 0;
        //if(status){
        params["status"] = 1;
        //}
        $.ajax({url:basePath + "/msbTitleGroup/updateStatus",data:params,type:"POST",success:function(data){
            if(data && data.ret == 1){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:data.msg,
                    type:BootstrapDialog.TYPE_WARNING
                });
                var pagination = $(".pagination .active a");
                $(".pagination .active").removeClass("active").addClass("paginate_button");
                pagination.click();
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
                    message:data.msg,
                    type:BootstrapDialog.TYPE_WARNING
                });
            }
        }});
    });
    /**
     * 删除
     */
    $("body").on("click",".delete-group",function(){
        var id = $(this).data("id");
        var obj = $(this);
        BootstrapDialog.confirm({
            title: '消息提示',
            message: "确认要删除此题组吗?",
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    obj.parents("tr").remove();
                    $.ajax({url:basePath + "/msbTitleGroup/delete",data:{id:id},type:"POST",success:function(){
                        $(".search").click();
                    }});
                }
            }
        })
    });

    /**
     * 列表页下拉框事件   获取班型,获取班级
     */
    $("body").on("change",".sel-change",function(){
        //$(".sel-change").on("change", function () {
        var name = $(this).data("name");
        var val = $(this).val();
        if(val&&val>0){
            var params = new Object();
            params[name]=val;
            switch (name) {
                case "sku":
                    callBack(basePath + "/msbTitleGroup/changeSku", params, name, $("select[data-name='classTypeId']"),$("select[data-name='classId']"));
                    return;
                case "classTypeId":
                    callBack(basePath + "/msbTitleGroup/changeClassType", params, name, $("select[data-name='classId']"),null);
                    return;
                case "classTypeId_dialog":
                    name = "classTypeId";
                    params[name] = val;
                    callBack(basePath + "/msbTitleGroup/changeClassType", params, "classTypeId_dialog", $("div[data-name='classId_dialog']"),null);
                    return;
            }
        }else {
            if(name=="sku"){
                $("select[data-name='classTypeId']").find("option:gt(0)").remove();
                $("select[data-name='classId']").find("option:gt(0)").remove();
            }else if(name=="classTypeId"){
                $("select[data-name='classId']").find("option:gt(0)").remove();
            }else if(name=="classTypeId_dialog"){
                $("div[data-name='classId_dialog']").remove();
            }
        }

    });

});

function callBack(url, params, type, obj,obj1) {
    $.ajax({
        url: basePath + url, data: params, type: "POST", success: function (ret) {
            if(type == "classTypeId_dialog"){
                obj.remove();
            }else if(type == "sku"){
                obj.find("option:gt(0)").remove();
                obj1.find("option:gt(0)").remove();
            }else{
                obj.find("option:gt(0)").remove();
            }
            if (ret.length > 0) {
                $.each(ret, function (i, o) {
                    if(type=="sku"){
                        obj.append("<option value='" + o.id + "'>"+o.title+"</option>");
                    }else if(type == "classTypeId"){
                        obj.append("<option value='" + o.id + "'>"+o.classNo+"</option>");
                    }else if(type == "classTypeId_dialog"){
                        var video = "<div data-name='classId_dialog'><input name='classId_copy' type='checkbox' value='" + o.id + "'/>"+o.classNo+"</div>";
                        $("#class_dialog").show();
                        $("#classId_dialog").append(video);
                    }

                });

            }

        }
    });
}

//function changeOrder(i,id){
//    var secondId;
//    if(i==1){
//        secondId = $("tr[data-id = "+id+"]").next().attr("data-id");
//    }else {
//        secondId = $("tr[data-id = "+id+"]").prev().attr("data-id");
//    }
//
//    $.ajax({url:basePath + "/msbTitleGroup/changeOrder",data:{"attr":i,"id":id,"secondId":secondId},type:"POST",success:function(){
//        $(".search").click();
//    }});
//}

function changeRadio(obj) {
    if ($(obj).val() == 2) {
        $(".show-orderTime").show();
    } else {
        $(".show-orderTime").hide();
    }
}

