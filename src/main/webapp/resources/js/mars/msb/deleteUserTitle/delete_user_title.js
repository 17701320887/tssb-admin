/**
 * Created by admin on 2016/12/30.
 */
$(function(){

    /**
     * 查询
     */
    $("body").on("click",".search",function(){
        var userId = $(".userId").val();
        $(".userId").parent().find("input[type='hidden']").val(userId);
        var mobile = $(".mobile").val();
        $(".userId").parent().find("input[type='hidden']").val(userId);
        if(!userId && !mobile){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请选择学员或直接填写学员账号",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        $.ajax({url:basePath + "/msbDeleteTitles/page",data:{'userId':userId,'mobile':mobile},type:"POST",success:function(data){
            $("#course-data-list").html(data);
            renderSwitcher();
        }});
    });


    /**
     * 删除
     */
    $("body").on("click",".user-title-delete",function(){
            var id = $(this).data("id");
            var obj = $(this);
            BootstrapDialog.confirm({
                title: '消息提示',
                message: "清空后，该学员该道大题需全部重新上传,是否继续",
                type: BootstrapDialog.TYPE_WARNING,
                closable: true,
                btnCancelLabel: '取消',
                btnOKLabel: '确认',
                btnOKClass: 'btn-warning',
                callback: function (result) {
                    if (result) {
                        obj.parents("tr").remove();
                        $.ajax({url:basePath + "/msbDeleteTitles/delete",data:{'userTitleGroupId':id},type:"POST",success:function(){
                            $(".search").click();
                        }});
                    }
                }
            })
    });

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
                case "sku":
                    callBack(basePath + "/msbTitleGroup/changeSku", params, name, $("select[data-name='classTypeId']"));
                    return;
                case "classTypeId":
                    callBack(basePath + "/msbTitleGroup/changeClassType", params, name, $("select[data-name='classId']"));
                    return;
                case "classId":
                    callBack(basePath + "/msbDeleteTitles/getUserByClassId", params, name, $("select[data-name='userId']"));
                    return;
            }
        }else {
            if(name=="sku"){
                $("select[data-name='classTypeId']").find("option:gt(0)").remove();
                $("select[data-name='classId']").find("option:gt(0)").remove();
                $("select[data-name='userId']").find("option:gt(0)").remove();
            }else if(name=="classTypeId"){
                $("select[data-name='classId']").find("option:gt(0)").remove();
                $("select[data-name='userId']").find("option:gt(0)").remove();
            }else if(name=="classId"){
                $("select[data-name='userId']").find("option:gt(0)").remove();
            }
        }

    });

});

function callBack(url, params, type, obj) {
    $.ajax({
        url: basePath + url, data: params, type: "POST", success: function (ret) {
            obj.find("option:gt(0)").remove();
            if (ret.length > 0) {
                $.each(ret, function (i, o) {
                    if(type=="sku"){
                        obj.append("<option value='" + o.id + "'>"+o.title+"</option>");
                        $("select[data-name='classId']").find("option:gt(0)").remove();
                    }else if(type == "classTypeId"){
                        obj.append("<option value='" + o.id + "'>"+o.classNo+"</option>");
                    }else if(type == "classId"){
                        obj.append("<option value='" + o.id + "'>"+o.username+"</option>");
                    }
                });
            }else {
                if(type=="sku"){
                    $("select[data-name='classTypeId']").find("option:gt(0)").remove();
                    $("select[data-name='classId']").find("option:gt(0)").remove();
                    $("select[data-name='userId']").find("option:gt(0)").remove();
                }else if(name=="classType"){
                    $("select[data-name='classId']").find("option:gt(0)").remove();
                    $("select[data-name='userId']").find("option:gt(0)").remove();
                }else if(name=="classId"){
                    $("select[data-name='userId']").find("option:gt(0)").remove();
                }
            }

        }
    });
}


