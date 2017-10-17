$(function () {
    var submit,msg;
    var path = $("#path").val();
    var groupId = $("#group-list").val();

    initFloat();

    /**
     * 初始化float列表
     */
    function initFloat(){
        var params = new Object();
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        params["groupId"] = groupId;
        if(groupId){
            $.ajax({
                url: path+"/duibaGroupFloat/page", data: params, type: "POST", success: function (data) {
                    $("#data-list").html(data);
                    renderSwitcher();
                }
            });
        }
    }

    $("#group-list").on("change",function(){
        groupId = $(this).val();
        initFloat();
    });

    /**
     * 保存float
     */
    $("#save-btn").on("click", function () {
        var data =  new FormData();
        verify(data);
        if(msg){
            submit = false;
            BootstrapDialog.alert({
                title:"消息提示",
                message:msg,
                type:BootstrapDialog.TYPE_WARNING
            });
        }else {
            submit = true;
        }
        var id = $("#floatId").val();
        var url;
        if(id){
            data.append("id",id);
            url = path+"/duibaGroupFloat/update";
        }else {
            url = path+"/duibaGroupFloat/save";
        }
        if(submit){
            submitParams(data,url);
        }

    });
    /**
     * 编辑与删除
     */
    $("#data-list").on("click",".operate",function(){
        var obj  = $(this);
        var id = obj.attr("data-id");
        var group = obj.attr("data-group");
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
                            url: path + "/duibaGroupFloat/delete/"+id+"?groupId="+group,
                            type: "GET",
                            dataType: "json",
                            cache: false,
                            async: false,
                            success: function (ret) {
                                if (ExceptionDialog(ret) && ret.code == 200) {
                                    obj.parents("tr").remove();
                                    // location.href = path+"/duibaGroupFloat/list?groupId="+ret.result;
                                }
                            }
                        })
                    }
                }
            })
        }else if($(this).attr("optype")=="edit"){
            location.href = path+"/duibaGroupFloat/findById/"+id;
        }
    });



    $("#add").on("click",function(){
        location.href = path+"/duibaGroupFloat/add";
    });

    /**
     * 校验float
     * @param data
     */
    function verify(data) {
        msg = "";
        if($("#name").val()){
            data.append("name",$("#name").val());
        }else {
            msg = "请输入名称";
            return ;
        }
        if($("#floatContent").val()){
            data.append("content",$("#floatContent").val());
        }else {
            msg = "请输入内容";
            return ;
        }
        if(!/^\d+$/.test($(".digit").val())){
            msg = "序号输入有误";
            return ;
        }else {
            data.append("order",$(".digit").val());
        }
        $.each($("select"),function(){
            var obj = $(this);
            if(!obj.val()){
                msg = "请完善"+ $(this).parents(".form-group").find("label").text();
                return;
            }else {
                data.append($(this).attr("name"),$(this).val());
            }
        });

    }

    function submitParams(data,url){
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (ret) {
                if (ExceptionDialog(ret) && ret.code == 200) {
                    location.href = path+"/duibaGroupFloat/list?groupId="+ret.result;
                }
            }
        });
    }
});