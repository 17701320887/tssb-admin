
//用户授权
function saveAuthUser(obj){
     if($("#userMobile").val()!=null&&$("#userMobile").val()!=""){
         $.ajax({
             url:basePath+"/msbWhiteList/userAuth",
             type:"post",
             dataType:"json",
             cache: false,
             data : {"mobile":$("#userMobile").val()},
             success: function (data){
                 if (data) {
                     if (data.ret == 1) {
                         location.href = basePath +"/msbWhiteList/list";
                     } else {
                         BootstrapDialog.alert({
                             title: "消息提示",
                             message: data.msg,
                             type: BootstrapDialog.TYPE_WARNING
                         });
                     }
                 }
             }
         })
     }else{
         $("#userMobile").parent().addClass("has-error has-feedback");
     }
}

//删除角色下用户
function delAutoUser(aId){
    BootstrapDialog.confirm({
        title: '删除白名单用户',
        message: '确定要删除当前用户吗?',
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        btnCancelLabel: '取消',
        btnOKLabel: '确认',
        btnOKClass: 'btn-warning',
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: basePath + "/msbWhiteList/delAutoUser",
                    type: "post",
                    dataType: "json",
                    data: {"id":aId},
                    success: function (data) {
                        if (data) {
                            if (data.ret == 1) {
                                location.href = basePath +"/msbWhiteList/list";
                            } else {
                                BootstrapDialog.alert({
                                    title: "消息提示",
                                    message: data.msg,
                                    type: BootstrapDialog.TYPE_WARNING
                                });
                            }
                        }
                    }
                })
            }
        }
    })
}

