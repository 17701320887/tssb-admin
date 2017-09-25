$(function () {
    var path = $("#path").val();

    $("body").on("click",".search",function(){
        var params = new Object();
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        var groupId = $("#group-list").val();
        params["duibaGroupId"] = groupId;
        $("#group-list").parent().find("input[type='hidden']").val(groupId);
        if(groupId){
            $.ajax({
                url: path+"/duibaCategory/page", data: params, type: "POST", success: function (data) {
                    $("#data-list").html(data);
                    renderSwitcher();
                }
            });
        }
    });

    $(".search").click();

    /**
     * 编辑与删除
     */
    $("#data-list").on("click",".operate",function(){
        obj = $(this);
        var id = obj.attr("data-id");
        var groupId = obj.attr("data-group");
        if(obj.attr("optype")=="del"){
            BootstrapDialog.confirm({
                title: "吧组分类删除",
                message: "确认要删除此分类吗?",
                type: BootstrapDialog.TYPE_WARNING,
                closable: true,
                btnCancelLabel: '取消',
                btnOKLabel: '确认',
                btnOKClass: 'btn-warning',
                callback: function (result) {
                    if (result) {
                        $.ajax({
                            url: path + "/duibaCategory/delete/"+id+"?groupId="+groupId,
                            type: "GET",
                            dataType: "json",
                            cache: false,
                            async: false,
                            success: function (ret) {
                                if(ExceptionDialog(ret) && ret.code==200){
                                    obj.parents("tr").remove();
                                    // location.href=path+"/duibaCategory/list?groupId="+ret.result;
                                }
                            }
                        })
                    }
                }
            })
        }else if($(this).attr("optype")=="edit"){
            window.open(path+"/duibaCategory/findById/"+id+"/"+groupId,"_blank");
            //location.href = path+"/duibaCategory/findById/"+id+"/"+groupId;
        }
    });
    $("#add").on("click",function(){
        window.open(path+"/duibaCategory/add","_blank");
    });
    /*列表页绑定事件结束*/

    var submit,msg;
    var path = $("#path").val();
    var hasChild = $("#hasChild").val();
    $("#save-btn").on("click", function () {
        msg="";
        var data =  new Object();
        //verify(data);
        $(".form-group .param").each(function(){
            if(msg){
                return;
            }
            var val = $(this).val();
            var key = $(this).attr("name");
            if(val){
                data[key] = val;
            }else{
                msg = "请完善" + $(this).parents(".form-group").find("label").text();
            }
        });
        if(msg){
            alert(msg);
            return;
        }
        var id = $("#cateId").val();
        var url;
        if(id){
            data["id"] = id;
            url = path+"/duibaCategory/update";
            if(hasChild==1 && $("select[name='parentId']").val()!=0){
                msg = "已有子类,只允许存在二级分类!";
            }
        }else {
            url = path+"/duibaCategory/save";
        }
        if(msg){
            submit = false;
            BootstrapDialog.alert({
                title:"消息提示",
                message:msg,
                type:BootstrapDialog.TYPE_WARNING
            });
        }else {
            submitParams(data,url);
        }
    });

    function submitParams(data,url){
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            dataType: "json",
            async: false,
            cache: false, success: function (ret) {
                if(ret.code==200){
                    //location.href=path+"/duibaCategory/list?groupId="+ret.result;
                    $(opener.document).find(".search").click();
                    window.close();
                }else{
                    BootstrapDialog.alert({
                        title:"消息提示",
                        message:ret.msg,
                        type:BootstrapDialog.TYPE_WARNING
                    });
                }
            }
        });
    }

    /**
     * 切换吧组 获取分类
     */

    function getParents(){
        var group  = $("select[name='duibaGroupId']");
        var parents = $("select[name='parentId']");
        $("select[name='parentId']").find("option:gt(0)").remove();
        var groupId = group.val();
        $.ajax({type:"post",async:false,"url":path+"/duibaCategory/getCatesByGroupId","data":{"groupId":groupId},
            success:function(ret){
                $.each(ret,function (i, o) {
                    parents.append("<option value="+o.id+">"+o.category+"</option>");
                })
            }
        });
    }
    $("select[name='duibaGroupId']").on("change",function(){
        getParents();
    });

    $("body").on("click",".switchery",function(){
        if($(this).prev().attr("disabled")==undefined){
            var state = $(this).parents("td").find("[data-switchery]");
            var id = state.data("id")
            var status = state.prop("checked");
            var params = new Object();
            params["id"] = id;
            params["validSign"] = 0;
            if(status){
                params["validSign"] = 1;
            }
            $.ajax({url:path + "/duibaCategory/updateStatus",data:params,type:"POST",success:function(data){
                if(ExceptionDialog(data) && data.ret == 1){
                    BootstrapDialog.alert({
                        title:"消息提示",
                        message:data.msg,
                        type:BootstrapDialog.TYPE_WARNING
                    });
                }else{
                    state.parent().find(".switchery").remove();
                    if(status){
                        state.removeAttr("checked");
                    }else{
                        state.attr("checked","checked");
                    }
                    renderSwitcherInit(state[0]);
                }
            }});
        }

    });

    $("body").on("click",".change-btn-ico",function(){
        var params = new Object();
        params["cateType"] = 1;
        params["type"] = 1;
        params["pageSize"] = 20;
        loadIco(params);
    });

    $("body").on("click",".click-more",function(){
        var params = new Object();
        params["cateType"] = 1;
        params["type"] = 1;
        var idx = $("#content-div").data("index");
        if(idx){
            params["pageIndex"] = idx;
            loadIco(params);
        }
    });

    function loadIco(params){
        $.ajax({url:path + "/material/page",data:params,type:"POST",success:function(data){
            if(data && data.ret == 1){
                var res = data.data.data;
                for(var i = 0;i < res.length;i++){
                    var info = res[i];
                    var li = $("<li data-url=\""+info.url+"\"><img src=\""+tuPath + info.url+"\"></li>")
                    $("#content-div ul").append(li);
                    if(data.data.pageIndex < data.data.allPage){
                        $("#content-div").attr("data-index",data.data.next)
                    }else {
                        $("#content-div").removeAttr("data-index");
                        $(".click-more").addClass("hide");
                    }
                }
            }
        }});
    }

    $("body").on("click","#content-div li",function(){
        var url = $(this).data("url");
        $("input[name=categoryImg]").val(url);
        if($(".show-file img").length > 0){
            $(".show-file img").attr("src",tuPath + url);
        }else{
            $(".show-file").append($("<img src=\""+tuPath + url+"\">"));
        }
        $(".close").click();
    });

});

