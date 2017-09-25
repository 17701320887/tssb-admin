$(function () {
    var submit;
    var path = $("#path").val();
    /*吧组列表开始*/
    var params = new Object();
    params["pageIndex"] = 1;
    params["pageSize"] = 10;
    $.ajax({
        url: path+"/duibaGroup/page", data: params, type: "POST", success: function (data) {
            $("#data-list").html(data);
            renderSwitcher();
        }
    });
    /**
     * 启用/停用吧组
     * @param e
     */

    $("body").on("click", ".switchery", function () {
        if($(this).prev().attr("disabled")==undefined){
            var state = $(this).parents("td").find("[data-switchery]");
            var id = state.data("id");
            var status = state.prop("checked");
            var params = new Object();
            params["groupId"] = id;
            params["visible"] = 0;
            if (status) {
                params["visible"] = 1;
            }
            $.ajax({
                url: "/duibaGroup/setVisible", data: params, type: "POST", success: function (data) {
                    if (ExceptionDialog(data) && data.code == 200) {
                        BootstrapDialog.alert({
                            title: "消息提示",
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING
                        });
                    } else {
                        state.parent().find(".switchery").remove();
                        if (status) {
                            state.attr("checked", "checked");
                        } else {
                            state.removeAttr("checked");

                        }
                        renderSwitcherInit(state[0]);
                    }
                }
            });
        }
    });


    $("#add_group").on("click",function(){
        location.href = path+"/duibaGroup/add";
    });

    /**
     * 保存吧组
     */
    $("#save-btn").on("click", function () {
        var data =  new FormData();
        verify(data);
        var id = $("#groupId").val();
        var url;
        if(id){
            data.append("id",id);
            url = path+"/duibaGroup/update";
        }else {
            url = path+"/duibaGroup/save";
        }
        if(submit){
            submitParams(data,url);
        }
    });
    /**
     * 校验吧组
     * @param data
     */
    function verify(data) {
        submit = false;
        var msg;
        if(msg)return;
        /*校验input 与 textAre*/
        $.each($(".form-control"), function () {
            if (!$(this).val()) {
                msg = "请完善"+$(this).parents(".form-group").find("label").text();
                submit = false;
                return;
            }else if($(this).hasClass("digit")){
                if(!/^\d+$/.test($(this).val())){
                    msg = $(this).parents(".form-group").find("label").text() +"输入有误";
                    submit = false;
                    return;
                }else data.append($(this).attr("name"),$(this).val());
            }else{
                data.append($(this).attr("name"),$(this).val());

            }
        });
        /*校验文件*/
        $.each($("input[type='file']"), function () {
            var file = $(this)[0].files[0];
            if (!file) {
                if(!$(this).attr("data-value")){
                    msg = "请完善"+ $(this).parents(".form-group").find("label").text();
                    submit = false;
                    return;
                }
            }else {
                data.append($(this).attr("name"),file);
            }
        });
        /*校验select option*/
        $.each($("select"),function(){
            if($(this).find("option:selected").val()==0){
                var name = $(this).parents(".form-group").find("label").text();
                msg = "请选择"+ name;
                submit = false;
                return;
            }else {
                data.append($(this).attr("name"),$(this).find("option:selected").val());
            }
        });
        if(msg){
            BootstrapDialog.alert({
                title:"消息提示",
                message:msg,
                type:BootstrapDialog.TYPE_WARNING
            });
        }else {
            submit = true;
        }

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
            contentType: false, success: function (data) {
                if(ExceptionDialog(data)){
                    location.href=path+"/duibaGroup/list";
                }
            }
        });
    }
});