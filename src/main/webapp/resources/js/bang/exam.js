$(function () {
    var submit,msg;
    var path = $("#path").val();
    var type = $("#type").val();
    var id = $("#examId").val();
    var groupId = $("#group-list").val();
    var params = new Object();
    $("input[data-name='groupId']").val($("#group-list").val());

    initExams();

    /**
     * 初始化分类列表
     */
    function initExams(){
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        if(!params["groupId"]){
            params["groupId"] = groupId;
        }
        if(params["groupId"]){
            $.ajax({
                url: path+"/duibaGroupExam/page", data: params, type: "POST", success: function (data) {
                    $("#data-list").html(data);
                    renderSwitcher();
                }
            });
        }
    }

    $("#group-list").on("change",function(){
        params["groupId"] = $(this).val();
    });

    /**
     * 切换省份得到city
     */
    $("select[data-name = 'provinceId']").on("change",function(){
        if($(this).val()>0){
            getCityByProvinceId($(this).val(),2);
        }
    });

    function getCityByProvinceId(provinceId,add){
        var city;
        $.ajax({
            "type":"post",
            "url":path+"/duibaGroupExam/getCityByParenId",
            "data":{"parentId":provinceId},
            success:function(ret){
                if(add==1){
                    city =  $("select[name='cityId']");
                }else {
                    city =  $("select[data-name='cityId']");
                }
                city.find("option:gt(0)").remove();
                $.each(ret,function(i,obj){
                    city.append("<option value='"+obj.id+"'>"+obj.name+"</option>")
                })
            }
        })

    }

    /**
     * 添加与查询事件
     */
    $("input[type='button']").on("click",function(){
        var optType = $(this).attr("operate");
        if(optType=="add"){
            location.href = path+"/duibaGroupExam/add?type="+$(this).attr("optype");
        }else if(optType=="find"){
            $.each($("select"),function(i,obj){
                var name = $(this).attr("data-name");
                var val = $(this).val();
                if(val){
                    params[name] = val;
                    $("input[data-name="+name+"]").val(val);
                }else {
                    params[name] = "";
                }
            })
            initExams();
        }
    });

    /**
     * 初始化标题
     * @type {number}
     */
    var year = new Date().getFullYear();
    if(!id) {
        type==1?$("#title").val(year+"年XXX地区报考时间及须知"):$("#title").val(year+"年XXX地区报考流程及须知");
    }
    $("#save-btn").on("click", function () {
        var data =  new FormData();
        verify(data);
        data.append("type",type);
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
        if(id){
            data.append("id",id);
        }
        var url  = path+"/duibaGroupExam/save";
        if(submit){
            submitParams(data,url);
        }

    });
    /**
     * 数据校验
     * @param data
     */
    function verify(data) {
        msg = "";
        if($("#title").val()){
            data.append($("#title").attr("name"),$("#title").val());
        }else {
            msg = "请输入名称";
            return ;
        }

        $("select").each(function(i,obj){
            var name  = $(this).attr("name");
            var val  = $(this).val();
            if(!val){
                if(name=="provinceId"){
                    msg = "请选择省份";
                    return ;
                }else if(name=="cityId"){
                    msg = "请选择城市";
                    return ;
                }else if(name=="groupId"){
                    msg = "请选择吧组";
                    return ;
                }else if(name=="status"||name=="aStatus"){
                    msg = "请选择状态";
                    return ;
                }

            }else {
                data.append(name,val);
            }
        });


        if(!(ue.getContent())){
            msg = "请输入正文";
            return ;
        }else {
            if(type==2) {
                data.append("aContent", ue.getContent());
            }else {
                data.append("content", ue.getContent());
            }
        }

    }

    /**
     * 添加页面
     */
    $("select[name='provinceId']").on("change",function(){
        if($(this).val()>0){
            getCityByProvinceId($(this).val(),1);
        }
    });

    /**
     * 表单提交
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
                if(ExceptionDialog(ret)){
                    if(ret.msg =="add" && ret.result>0){
                        location.href=path+"/duibaGroupExam/list?groupId="+ret.result;
                    }else {
                        var message;
                        data.append("cover",1);
                        if(type == 1){
                            if(ret.result.lastUpdateUserId>0){
                                message = "确认要覆盖报考时间吗?";
                                conver(message,data);
                            }else {
                                updateExam(data);
                            }

                        }else if (type == 2){
                            if(ret.result.alastUpdateUserId>0){
                                message = "确认要覆盖报考流程吗?";
                                conver(message,data);
                            }else {
                                updateExam(data);
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * 内容覆盖
     * @param data
     */
    function updateExam(data){
        $.ajax({
            url: path+"/duibaGroupExam/save",
            type: "POST",
            data: data,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false, success: function (ret) {
                if(ExceptionDialog(ret)){
                    if(ret.msg =="update" && ret.result>0){
                        location.href=path+"/duibaGroupExam/list?groupId="+ret.result;
                    }
                }
            }
        });
    }

    /**
     * 弹出层
     * @param message
     */
    function conver(message,data){
        BootstrapDialog.confirm({
            title: '内容覆盖',
            message: message,
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    updateExam(data);
                }
            }
        })
    }
});