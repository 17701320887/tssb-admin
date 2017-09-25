/**
 * Created by admin on 2016/7/28.
 */
$(function(){

    $("body").on("change","#change-status",function(){
        var params = new Object();
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        params["activityId"] = $("#activityId").val();
        var val = $(this).val();
        params["status"] = val;
        $(this).parent().find("input[type=hidden]").val(val);
        $.ajax({url:basePath + "/activity/searchUserListByPage",data:params,type:"POST",success:function(data){
            $("#user-list-data").html(data);
        }});
    });

    $("body").on("click",".check-result",function(){
        var id = $(this).data("id");
        $.ajax({url:basePath + "/levelCertificate/check-page",data:{id:id},type:"POST",dataType:"html",success:function(data){
            BootstrapDialog.show({
                title:"成绩详情",
                message: $(data),
                buttons:[{
                    label:"审核通过",
                    cssClass: 'btn-primary',
                    action:function(dialogRef){
                        $.ajax({url:basePath + "/levelCertificate/check-save",data:{id:id,status:1},type:"post",success:function(){
                            $("#change-status").change()
                            dialogRef.close();
                        }});
                    }
                },{
                    label:"审核失败",
                    action:function(dialogRef){
                        $.ajax({url:basePath + "/levelCertificate/check-save",data:{id:id,status:-1},type:"post",success:function(){
                            $("#change-status").change()
                            dialogRef.close();
                        }});
                    }
                }]
            });
        }});
    });

    $("body").on("click",".view-result",function(){
        var id = $(this).data("id");
        $.ajax({url:basePath + "/levelCertificate/check-page",data:{id:id},type:"POST",dataType:"html",success:function(data){
            BootstrapDialog.show({
                title:"成绩详情",
                message: $(data)
            });
        }});
    });

    $("#down-excel").on("click",function(e){
        var actId = $("#activityId").val();
        location.href = basePath +"/prizeBankAccount/d?actId="+actId;
    });
    $("#change-status").change();
});