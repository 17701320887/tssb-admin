/**
 * Created by xiaochao on 2016/12/30.
 */

$(function () {
    initCourse(null);

    $(".search").on("click", function () {
        initCourse(1);
    });

    $(".add").on("click", function () {
        window.open(basePath + "/msbCourse/add");
    });

    /**
     * 展示详情
     */
    $("body").on("click",".show-detail",function(){
        $("#detail").html($(this).data("comment"));
        $('#myModal').modal('show');
    });
    /**
     * 显示复制页面
     */
    $("body").on("click",".copy-exam",function(){
        $("#classId").html("");
        $("#course-id").val($(this).data("comment"));
        $('#copy-exam').modal('show');
        $.ajax({
            url: basePath + "/msbCourse/findMsbSku", async: false, type: "POST", success: function (ret) {
                $(".sku-id-copy").html("");
                var sku = "<option value=\"0\">请选择</option>";
                for (var i = 0;i<ret.length;i++){
                    sku+= "<option value=\""+ret[i].id+"\">"+ret[i].dicName+"</option>";
                }
                $(".sku-id-copy").html(sku);
            }
        });
    });

    /**
     * 根据sku切换
     */
    $(".sku-id-copy").on("change",function(){
        var val = $(this).val();
        if (val==0){
            $("#classId").html("");
        }
        $.ajax({
            url: basePath + "/msbClassTitleType/getBySku", data:{"skuId":val}, async: false, type: "POST", success: function (ret) {
                var classType = "";
                $.each(ret, function (i, o) {
                    classType+="<div class=\"col-md-4\">" +
                                    "<input name=\"classTypeId\" type=\"checkbox\" value=\"" + o.id + "\"/>" + o.title + "" +
                                "</div>";
                });
                $("#classId").html(classType);
            }
        });
    });

    /**
     * 确定复制
     */
    $("body").on("click",".common-save",function(){
        var classType = ""
        $('input[name="classTypeId"]:checked').each(function(){
            classType+=$(this).val()+",";
        });
        var params = new Object();
        params["skuId"] = $(".sku-id-copy").val();
        params["classType"] = classType;
        params["courseId"] = $("#course-id").val();
        $.ajax({
            url: basePath + "/msbCourse/copy", data:params, async: false, type: "POST", success: function (ret) {
                if (ret.ret==1){
                    $(".cancel-btn").click();
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "操作成功",
                        type: BootstrapDialog.TYPE_SUCCESS
                    });
                }else {
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "操作失败",
                        type: BootstrapDialog.TYPE_WARNING
                    });
                }
            }
        });
    });

    /**
     * 编辑
     */
    $("body").on("click",".edit",function(){
       window.open($(this).data("url"));

    });

    /**
     * 删除
     */
    $("body").on("click",".course-delete",function(){
        var id = $(this).data("id");
        var obj = $(this);
        BootstrapDialog.confirm({
            title: '消息提示',
            message: "确认要删除此视频吗?",
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    obj.parents("tr").remove();
                    $.ajax({url:basePath + "/msbCourse/delete",data:{id:id},type:"POST",success:function(){
                        $(".search").click();
                    }});
                }
            }
        })
    });


    $(".sku-id").on("change",function(){
        var val = $(this).val();
        if(val){
            initClassTitleType(val);
        }
    });


    function initClassTitleType(skuId){
        var obj = $(".class-type-id");
        obj.find("option:gt(0)").remove();
        $.ajax({url: basePath + "/msbClassTitleType/getBySku", data: {"skuId": skuId}, type: "POST",
            success: function (ret) {
                $.each(ret, function (i, o) {
                    obj.append("<option value='" + o.id + "'>" + o.title + "</option>");
                });
            }
        });
    }

    function initCourse(p) {
        var params = new Object();
        $(".sel-change").each(function (i, obj) {
            var name = $(this).data("name");
            var val = $(this).val();
            if(val) {
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
                url: basePath + "/msbCourse/page", async: false, data: params, type: "POST", success: function (ret) {
                    $("#course-data").html(ret);
                }
            });
        }else return;
        if(!p){
            initClassTitleType($(".sku-id").val());
        }

    }

});