/**
 * Created by admin on 2016/7/28.
 */
$(function(){
    $("body").on("click",".activity-add",function(){
        location.href = basePath + "/activity/add";
    });

    $("body").on("click",".search",function(){
        var title = $(".title").val();
        $(".title").parent().find("input[type='hidden']").val(title);
        var skuId = $(".sku-id").val();
        $(".sku-id").parent().find("input[type='hidden']").val(skuId);
        var params = new Object();
        params["title"] = title;
        params["skuId"] = skuId;
        params["pageIndex"] = 1;
        params["pageSize"] = 5;
        $.ajax({url:basePath + "/activity/page",data:params,type:"POST",success:function(data){
            $("#activity-data-list").html(data);
            renderSwitcher();
        }});
    });

    $("body").on("click",".switchery",function(){
        var state = $(this).parents("td").find("[data-switchery]");
        var id = state.data("id")
        var status = state.prop("checked");
        var params = new Object();
        params["id"] = id;
        params["status"] = 0;
        if(status){
            params["status"] = 1;
        }
        $.ajax({url:basePath + "/activity/updateStatus",data:params,type:"POST",success:function(data){
            if(data && data.ret == 1){
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:data.msg,
                    type:BootstrapDialog.TYPE_WARNING
                });
            }else if(data && data.ret == -1){
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

    $(".search").click();
});