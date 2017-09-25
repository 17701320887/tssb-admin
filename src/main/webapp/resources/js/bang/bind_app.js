/**
 * Created by admin on 2016/11/28.
 */
$(function(){
    $("body").on("change",".bind-group",function(){
        var val = $(this).val();
        var params = new Object();
        params["groupId"] = val;
        var appType = $(".app-type").val();
        params["appType"] = appType;
        var sku = $(".bind-group").find("option:selected").data("value");
        params["sku"] = sku;
        if(!sku){
            $(".cates-label").html("");
            return;
        }
        $.ajax({url:basePath + "/duibaCategory/getCatesByGroupId",type:"POST",data:params,success:function(data){
            if(data){
                $(".cates-label").html("");
                for(var i = 0; i < data.length;i++){
                    var cate = data[i];
                    $(".cates-label").append("<label class='checkbox-inline'><input type='checkbox' value='"+cate.id+"'/>"+cate.category+"</label>");
                }
                $.ajax({url:basePath + "/duibaAppBindCategory/find-categorys",type:"POST",data:params,success:function(data){
                    if(data && data.ret == 1 && data.data){
                        for(var i =0 ; i < data.data.length;i++){
                            $(".cates-label input[value="+data.data[i]+"]").attr("checked","checked");
                        }
                    }
                }})
            }else{
                BootstrapDialog.alert({
                    title:"消息提示",
                    message:"系统发生异常",
                    type:BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }});
    });

    $("body").on("click",".submit",function(){
        var sb = new StringBuffer();
        var appType = $(".app-type").val();
        var sku = $(".bind-group").find("option:selected").data("value");
        if(!sku){
            BootstrapDialog.alert({
                title:"消息提示",
                message:"请选择吧组",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        var i = 0;
        $(".cates-label input:checked").each(function(){
            var val = $(this).val();
            if(i > 0){
                sb.append(",");
            }
            i++;
            sb.append(val);
        });
        var params = new Object();
        params["sku"] = sku;
        params["categorys"] = sb.toString();
        params["appType"] = appType;
        $.ajax({url:basePath + "/duibaAppBindCategory/save-bind",type:"POST",data:params,success:function(data){
            if(data){
                if(data.ret == 1){
                    BootstrapDialog.alert({
                        title:"消息提示",
                        message:data.msg,
                        type:BootstrapDialog.TYPE_WARNING
                    });
                }
            }
        }});
    });
});