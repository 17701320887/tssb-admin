$(function () {
    var submit,msg;
    var id = $("#bannerId").val();
    var path = $("#path").val();
    var groupId = $("#group-list").val();
    var categorys = $("#catagorys").val();
    var params = new Object();
    $("input[data-name='groupId']").val($("#group-list").val());

    initBanner();

    /**
     * 初始化banner
     */
    function initBanner() {
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        if(!params['groupId']){
            params["groupId"] = groupId;
        }
        if(params["groupId"]){
            $.ajax({
                url: path+"/duibaGroupBanner/page", data: params, type: "POST", success: function (data) {
                    $("#data-list").html(data);
                    renderSwitcher();
                }
            });
        }
    }

    /**
     * 查询与添加按钮
     */
    $("input[type='button']").on("click", function () {
        var optType = $(this).attr("optype");
        if (optType == "find") {
            $.each($(".param"), function (i, obj) {
                var name = $(this).attr("data-name");
                var val = $(this).val();
                if(val){
                    params[name] = val;
                    $("input[data-name="+name+"]").val(val);
                }else {
                    params[name] = "";
                }
            })
            initBanner();
        }else if(optType =="add"){
            window.open(path+"/duibaGroupBanner/add");
        }
    });


    /**
     * 启用/停用分类
     * @param e
     */

    $("body").on("click", ".switchery", function () {
        if($(this).prev().attr("disabled")==undefined){
            var state = $(this).parents("td").find("[data-switchery]");
            var id = state.data("id");
            var status = state.prop("checked");
            var params = new Object();
            params["id"] = id;
            params["status"] = 2;
            if (status) {
                params["status"] = 1;
            }
            $.ajax({
                url: "/duibaGroupBanner/setVisible", data: params, type: "POST", success: function (data) {
                    if (data && data.ret == 1) {
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



    /**
     * 保存banner
     */
    $("#save-btn").on("click", function () {
        var data =  new FormData();
        verify(data);
        var url;
        if(id){
            data.append("id",id);
            url = path+"/duibaGroupBanner/update";
        }else {
            url = path+"/duibaGroupBanner/save";
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
    /**
     * 校验banner
     * @param data
     */
    function verify(data) {
        msg="";
        submit = false;
        var cates = "";
        if(msg)return;
        if($("input[type='checkbox']:checked").length>0){
            $("input[type='checkbox']:checked").each(function(){
                cates += $(this).val()+",";
            });
            cates = cates.substr(0,cates.length-1);
            data.append("catagorys",cates);
        }else {
            msg = "请选择分类数据";
        }
        $("input[type=file]").each(function () {
           var file = $(this)[0].files[0];
            if(!file){
                if(!$(this).attr("data-value")){
                    msg = "请完善"+ $(this).parents(".form-group").find("label").text();
                    return;
                }
            }else {
                data.append($(this).attr("name"),file);
            }
        });

        $.each($("select"),function(){
            var obj = $(this);
            if(!obj.val()){
                msg = "请完善"+ $(this).parents(".form-group").find("label").text();
                return;
            }else {
                data.append($(this).attr("name"),$(this).val());
            }
        });
        if(!/^\d+$/.test($(".digit").val())) {
            msg="导航序号输入有误!";
        }else {
            data.append("sortOrder",$(".digit").val());
        }

        if(!$("#title").val()){
            msg="名称不能为空!";
        }else {
            data.append("title",$("#title").val());
        }

    }

    /**
     * 提交
     * @param data
     * @param url
     */
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
                    // window.close();
                    location.href = path+"/duibaGroupBanner/list?groupId="+ret.result;
                }
            }
        });
    }
    if(id&&id>0){
        getCates($("#groupId").val(),categorys);
    }
    /**
     * 切换吧组 获取分类
     */
    function getCates(param,categorys){
        var checkbox = $("#list-checkbox");
        if(param && param>0){
            $.ajax({type:"post",async:false,"url":path+"/duibaCategory/getCatesByGroupId","data":{"groupId":param},
                success:function(ret){
                    checkbox.html("");
                    $.each(ret,function (i, obj) {
                        if(categorys&&categorys.indexOf(obj.id)>-1){
                            checkbox.append(obj.category+"<input type='checkbox' checked='checked' style='margin-right: 30px;margin-left: 5px;' value="+obj.id+">");
                        }else {
                            checkbox.append(obj.category+"<input type='checkbox'style='margin-right: 30px;margin-left: 5px;' value="+obj.id+">");
                        }
                        if (i > 1 && i % 5 == 0) {
                            checkbox.append("<br/>");
                        }
                    })
                }
            });
        }
    }

    /**
     * 吧组change事件
     */
    $("select[name='groupId']").on("change",function(){
        if($(this).val()>0){
            getCates($(this).val(),null);
        }else {
            $("#list-checkbox").html("")
        }
    });

    /**
     * 启用/停用导航
     * @param e
     */
    function updateVisible(e){
        var msg,vis;
        var id = $(e).attr("data-id");
        var visible = $(e).attr("data-visible");
        if(visible==1){
            msg = "确认要停用次导航吗?";
            vis = 2;
        }else {
            msg = "确认要启用此导航吗?";
            vis = 1;
        }
        BootstrapDialog.confirm({
            title: '更改导航状态',
            message: msg,
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    data = {"id": id, "status": vis}
                    $.ajax({
                        url: path + "/duibaGroupBanner/setVisible",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        async: false,
                        data: data,
                        success: function (d) {
                            if (ExceptionDialog(d)) {
                                location.reload();
                            }
                        }
                    })
                }
            }
        })

    }
});

