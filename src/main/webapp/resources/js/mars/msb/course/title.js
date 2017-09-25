/**
 * Created by admin on 2017/1/13.
 */
$(function(){

    /**
     * 添加小题
     */

    $("body").on("click",".save-title",function(){
        var gruopId = $(".groupId").val();
        var titleTypeId = $(".titleTypeId").val();
        var titleTypeName = $(".titleTypeId").text();
        if(!titleTypeId){
            BootstrapDialog.alert({
                title: "消息提示",
                message: "请先选择题型之后再添加",
                type: BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        location.href = basePath + "/msbTitle/add?titleTypeId="+titleTypeId+"&&gruopId="+gruopId;
    });

    /**
     * 查询
     */
    $("body").on("click",".search",function(){
        var titleTypeId = $(".titleTypeId").val();
        $(".titleTypeId").parent().find("input[type='hidden']").val(titleTypeId);
        var gruopId = $(".groupId").val();
        var params = new Object();
        params["titleTypeId"] = titleTypeId;
        params["gruopId"] = gruopId;
        $.ajax({url:basePath + "/msbTitle/page",data:params,type:"POST",success:function(data){
            $("#title-data-list").html(data);
            renderSwitcher();
            $(".example img").zoomify();
        }});
    });

    /**
     * 删除
     */
    $("body").on("click",".title-delete",function(){
        var id = $(this).data("id");
        var obj = $(this);
        BootstrapDialog.confirm({
            title: '消息提示',
            message: "确认要删除此题吗?",
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    obj.parents("tr").remove();
                    $.ajax({url:basePath + "/msbTitle/delete",data:{id:id},type:"POST",success:function(){
                        $(".search").click();
                    }});
                }
            }
        })
    });

    //分页
    $("#page").remove();
    $("body").on("click","li.paginate_button a",function(){
        var params = new Object();
        params["pageIndex"] = $(this).data("dt-idx");
        params["pageSize"] = $("#pageSize").val();
        $(".param").each(function(){
            var key = $(this).data("name");
            var val = $(this).val();
            params[key] = val;
        });
        var id = $("#data-ct-id").val();
        var url = $("#data-ct-url").val();
        $.ajax({url:url,data:params,type:"POST",
            success:function(data){
                $("#"+id).empty();
                $("#"+id).append(data);
                if(typeof renderSwitcher != "undefined"){
                    renderSwitcher();
                }
                $(".example img").zoomify();
            }
        });
    });


    $(".search").click();

});