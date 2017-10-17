$(function () {
    var  submit,msg;
    var  id = $("#bannerId").val(),
         path = $("#path").val(),
         groupId = $("#groupId").val(),
         type = $("#type").val(),
         appCate = $("#appCate").val(),
         appType = $("#appType").val(),
         bannerId = $("#bannerId").val(),
         link = $("#select-link").val(),
         linkText = $("#select-link :selected").text(),
         selType = $("select[data-name='type']").val(),
         selTypeText = $("select[data-name='type'] option:selected").text(),
         provinceText = $("select[data-name='province'] option:selected").text(),
         topicType = $("select[data-name='app-cate']").val(),
         topicId = $("#topic-id").val();
    /*列表界面*/
    if($("#find").val()){
        initAppBanner();
    }
    function initAppBanner () {
        var params  = new Object();
        $.each($("select"),function(i,obj){
            var val = $(this).val();
            var name = $(this).attr("data-name");
            if(val){
                params[name]=val;
                $("input[data-name="+name+"]").val(val);
            }else{
                $("input[data-name="+name+"]").val("");
            }
        });
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        $.ajax({url: path+"/appBanner/page", type: "POST", data:params, cache: false, success: function (data) {
                if(ExceptionDialog(data)){
                    $("#app-banner-data-list").html(data);
                    renderSwitcher();
                }
            }
        });
    }

    /**
     * 添加与查询
     */
    $("input[type='button']").on("click",function(){
        var optType = $(this).attr("id");
        if(optType=="find"){
            initAppBanner();
        }else if(optType=="add"){
            location.href=path+"/appBanner/add";
        }
    });

    /**
     * 操作
     */
    $("body").on("click",".operate",function(){
        var obj = $(this);
        var type = obj.attr("optype");
        var id = obj.attr("data-id");
        if(type == "del"){
            showMsg("消息提示","确认要删除吗?",null,path+"/appBanner/delete/"+id);
        }
    });

    /**
     * 保存
     */
    $("#save-btn").on("click", function (e) {
        var data =  new FormData();
        verify(data);

        var url;
        if(id){
            data.append("id",id);
            url = path+"/appBanner/update";
        }else {
            url = path+"/appBanner/save";
        }
        if(msg){
            submit = false;
            BootstrapDialog.alert({title:"消息提示", message:msg, type:BootstrapDialog.TYPE_WARNING});
        }else {
            data.append("appType",$("select[data-name='appType']").val());
            data.append("groupId",$("select[data-name='groupId']").val());
            data.append("appCate",$("select[data-name='appCate']").val());
            submitParams(data,url);
        }
        e.stopPropagation();
        e.preventDefault();
    });
    function verify(data) {
        msg="";
        submit = false;
        if(msg)return;
        if(!$("#title").val()){
            msg="名称不能为空!";return;
        }else {
            data.append("name",$("#title").val());
        }

        if(!/^\d+$/.test($(".digit").val())) {
            msg="广告位置输入有误!";return;
        }else {
            data.append("location",$(".digit").val());
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


        if(link==0 ){ //网页链接
            if($("#link").val()){
                data.append("netLink",$("#link").val())
                data.append("nav",linkText+"--"+$("#link").val());
            }else {
                msg="请输入网页链接!";return;
            }
        }else { //本地链接
            if(selType==1 || selType==2){
                data.append("nav",linkText+"--"+selTypeText);
            }else if(selType==3){
                data.append("topicType",$("select[data-name='app-cate']").val());
                data.append("nav",linkText+"--"+selTypeText+"--"+$("select[data-name='app-cate'] option:selected").text());
            }else if(selType==4){
                topicId = $("#topic-id").val();
                data.append("topicId",topicId);
                data.append("nav",linkText+"--"+selTypeText+"--"+topicId);
                if(!/^\d+$/.test(topicId)) {
                    msg="帖子ID输入有误!";
                }
            }else if(selType==8){
                data.append("topicId",$("select[data-name='live']").val());
                data.append("nav",linkText+"--"+selTypeText+"--"+$("select[data-name='live'] option:selected").text());
            }else if(selType==5){
                var p = $("select[data-name='province'] option:selected").text();
                var c = $("select[data-name='city'] option:selected").text();
                data.append("group",$("select[data-name='data-ba']").val());
                data.append("province",$("select[data-name='province']").val()+":"+p);
                data.append("city",$("select[data-name='city']").val()+":"+c);
                data.append("nav",linkText+"--"+selTypeText+"--"+$("select[data-name='data-ba'] option:selected").text()+"--"+provinceText+"--"+c);
                if(!($("select[data-name='city']").val()>0)){
                    msg = "该地区考试时间暂未开通";
                }
            }else if(selType==7){
                var val = $("#topic-ids").val();
                var cate = $("#customCate").val();
                if(!cate){
                    msg = "请输入分类名称";return;
                }
                if(!val){
                    msg = "请输入帖子ID";return;
                }
                data.append("customCate",cate);
                data.append("topicId",val);
                data.append("nav",linkText+"--"+selTypeText+"--"+$("#customCate").val()+"--"+val);
            }

        }
        if(selType!=1&&selType!=2){
            data.append("jump",1);
        }else {
            data.append("jump",0);
        }
        data.append("type",selType);


    }

    function submitParams(data,url){
        $.ajax({url: url, type: "POST", data: data, processData: false, dataType: "json", async: false, cache: false, contentType: false, success: function (ret) {
                if(ExceptionDialog(ret)){
                    if(ret.code==200){
                        alert("success");
                    }
                    // location.href=path+"/appBanner/list";
                }
            }
        });
    }


    /*编辑添加页面*/

    /**
     * 所有 select change事件
     */
    $(".sel-change").on("change",function(){
        var name = $(this).attr("data-name");
        var val  = $(this).val();
        switch (name){
            case "appType":
                getGroupByAppType(val);
                getCates($("select[data-name='groupId']").val());
                initLink();return;
            case "groupId":
                getCates(val);initLink();initSelect();return;
            case "type":
                selType = $(this).val();
                selTypeText = $(this).find("option:selected").text();
                if (val == 5) { //考试时间
                    $("select[data-name='groupId']").children("option").clone(true).appendTo("select[data-name='data-ba']");
                    $("select[data-name='data-ba']").removeClass("hide");
                    $("select[data-name='province']").removeClass("hide");
                    $("select[data-name='city']").removeClass("hide");
                    $("#topic-id").addClass("hide");
                    $("select[data-name='app-cate']").addClass("hide");
                    $("select[data-name='live']").addClass("hide");
                    initInput();
                    return;
                }else if(val==3){ //分类类别
                    findDuibaAppTypeByappType();
                    $("#topic-id").addClass("hide");
                    $("select[data-name='app-cate']").removeClass("hide");
                    $("select[data-name='live']").addClass("hide");
                    initInput();
                    initSelect();
                    return;
                }else if(val==4){ //帖子详情
                    $("#topic-id").removeClass("hide");
                    $("select[data-name='app-cate']").addClass("hide");
                    $("#customCate").addClass("hide");
                    initSelect2();
                    initSelect();return;
                }else if(val==8){//直播页面
                    $("select[data-name='app-cate']").addClass("hide");
                    $("select[data-name='live']").removeClass("hide");
                    initInput();
                    initSelect();
                    return;
                }else if(val==7){
                    $("#topic-id").addClass("hide");
                    $("#topic-ids").removeClass("hide");
                    $("#customCate").removeClass("hide");
                    initSelect2();
                    initSelect();return;
                }else {
                    initSelect();
                    initSelect2();
                    initInput();
                    return;
                }
            case "province":
                provinceText= $(this).find("option:selected").text();
                if (val >0) {
                    initCity($("select[data-name='city']"),$("select[data-name='data-ba']").val(),val);return;
                }
            case "data-ba":
                initCity($("select[data-name='city']"),val,$("select[data-name='province']").val());return;
            case "app-cate":
                topicType = $(this).find("option:selected").text();return;

        }

    });

    /**
     * 编辑页
     */
    if(id&&id>0){
        getGroupByAppType(appType);
        getCates(groupId);
        switch (type){
            case "1"://每日一练
               $("#link").val("").addClass("hide");
               $("#type-div").removeClass("hide");
               return;
            case "2"://聊一聊
                $("#link").val("").addClass("hide");
                $("#type-div").removeClass("hide");
                return;
            case "3"://分类
                $("#link").val("").addClass("hide");
                $("#type-div").removeClass("hide");
                $("#select[data-name='app-cate']").removeClass("hide");
                findDuibaAppTypeByappType();
                return;
            case "4": //帖子详情
                $("#topic-id").removeClass();
                $("#link").val("").addClass("hide");
                $("#type-div").removeClass("hide");
                return;
            case "5": //考试时间
                $("#link").val("").addClass("hide");
                $("#type-div").removeClass("hide");
                $("select[data-name='data-ba']").removeClass("hide");
                $("select[data-name='province']").removeClass("hide");
                $("select[data-name='city']").removeClass("hide");
                return;
            case "7": //自定义分类
                $("#link").val("").addClass("hide");
                $("#type-div").removeClass("hide");
                $("#customCate").removeClass("hide");
                $("#topic-ids").removeClass("hide");
                return;
            case "8": //直播课堂
                $("#link").val("").addClass("hide");
                $("#type-div").removeClass("hide");
                $("select[data-name='live']").removeClass("hide");
                return;
        }
    }

    /**
     * 初始化select 隐藏吧组 省份 城市
     */
    function initSelect(){
        $("select[data-name='data-ba']").addClass("hide");
        $("select[data-name='province']").addClass("hide");
        $("select[data-name='city']").addClass("hide");
    }

    /**
     * 初始化select2 隐藏分类 直播
     */
    function initSelect2(){
        $("select[data-name='app-cate']").addClass("hide");
        $("select[data-name='live']").addClass("hide");
    }

    /**
     * 初始化input 帖子ID 帖子ID以逗号分隔 自定义分类名称
     */
    function initInput(){
        $("#topic-id").addClass("hide");
        $("#topic-ids").addClass("hide");
        $("#customCate").addClass("hide");
    }


    /**
     * 初始化跳转链接
     */
    function initLink(){
        $("#link").removeClass("hide");
        $("#type-div").addClass("hide");
        $("#type-div").attr("style","display: block;")
        $("#select-link option:eq(0)").attr("selected","selected");
        $("select[data-name='province']").addClass("hide");
        $("select[data-name='city']").addClass("hide");
        $("select[data-name='app-cate']").addClass("hide");
        $("#select-link").find("option:eq(0)").attr("selected","selected");
    }

    /**
     * 初始化城市
     * @param cityObj select对象
     * @param groupId    吧组
     * @param groupId    省份
     */
    function initCity(cityObj,groupId,provinceId){
        $.ajax({type:"post",async:false,"url":path+"/appBanner/findExamByProvinceAndGroupId","data":{"groupId":groupId,"provinceId":provinceId},
            success:function(ret){
                cityObj.find("option").remove();
                if(ret.length>0){
                    $.each(ret,function (i, obj) {
                        if(groupId==obj.id){
                            cityObj.append("<option selected='selected' value='"+obj.id+"'>"+obj.name+"</option>");
                        }else {
                            cityObj.append("<option value='"+obj.id+"'>"+obj.name+"</option>");
                        }
                    })
                }else {
                    cityObj.append("<option>考试时间暂未开通</option>");
                }
                cityObj.removeClass("hide");
            }
        });
    }

    /**
     * 启用/停用appBanner
     * @param e
     */
    $("body").on("click", ".switchery", function () {
        if($(this).prev().attr("disabled")==undefined){
            var state = $(this).parents("td").find("[data-switchery]");
            var id = state.data("id");
            var status = state.prop("checked");
            var params = new Object();
            params["id"] = id;
            params["status"] = 0;
            if (status) {
                params["status"] = 1;
            }
            $.ajax({
                url: "/appBanner/setVisible", data: params, type: "POST", success: function (data) {
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

    /**
     * 根据吧组 appType赛选分类
     */
    function findDuibaAppTypeByappType(){
        var appCateObj = $("select[data-name='app-cate']");
        var group = $("select[data-name='groupId']").val();
        var appType = $("select[data-name='appType']").val();
        var appCate = $("#appCate").val();
        $.ajax({type:"post",async:false,"url":path+"/appBanner/findDuibaAppTypeByappType","data":{"groupId":group,"appType":appType},
            success:function(ret){
                appCateObj.find("option").remove();
                if(ret.length>0){
                    $.each(ret,function (i, obj) {
                        if(appCate == obj.id){
                            appCateObj.append("<option value='"+obj.id+"' selected='selected'>"+obj.appCateName+"</option>");
                        }else {
                            appCateObj.append("<option value='"+obj.id+"'>"+obj.appCateName+"</option>");
                        }
                    });
                }else {
                    appCateObj.append("<option value='0'>暂无分类</option>");
                }
                appCateObj.removeClass("hide");
            }
        });
    }



    /**
     * 根据appType获取对啊帮
     */
    function getGroupByAppType(appType){
        var group = $("select[data-name=groupId]");
        var ba = $("select[data-name=data-ba]");
        if(appType&&appType>0){
            $.ajax({type:"post",async:false,"url":path+"/duibaGroup/getByTypeId","data":{"id":appType},
                success:function(ret){
                    if(group.attr("class").indexOf("param")>-1){
                        group.find("option:gt(0)").remove();
                    }else {
                        group.find("option").remove();
                    }
                    $.each(ret,function (i, obj) {
                        if(groupId==obj.id){
                            group.append("<option selected='selected' value='"+obj.id+"'>"+obj.groupName+"</option>");
                        }else {
                            group.append("<option value='"+obj.id+"'>"+obj.groupName+"</option>");
                        }
                        ba.append("<option value='"+obj.id+"'>"+obj.groupName+"</option>");
                    })
                }
            });
            ba.addClass("hide");
        }
        if(group.attr("class").indexOf("param")>-1){
            $("select[data-name='appCate']").find("option:gt(0)").remove();
        }else {
            $("select[data-name='appCate']").find("option").remove();
        }
    }

    /**
     * 根据吧组获取分类
     */
    function getCates(groupId){
        var cates = $("select[data-name='appCate']");
        if(groupId && groupId>0){
            $.ajax({type:"post",async:false,"url":path+"/duibaCategory/getCatesByGroupId","data":{"groupId":groupId},
                success:function(ret){
                    if(cates.attr("class").indexOf("param")>-1){
                        cates.find("option:gt(0)").remove();
                    }else {
                        cates.find("option").remove();
                    }
                    $.each(ret,function (i, obj) {
                        if(appCate == obj.id){
                            cates.append("<option selected='selected' value='"+obj.id+"'>"+obj.category+"</option>");
                        }else {
                            cates.append("<option value='"+obj.id+"'>"+obj.category+"</option>");
                        }
                    })
                }
            });
        }else {
            cates.find("option:gt(0)").remove();
        }
    }

    /**
     * 跳转链接
     */
    $("#select-link").on("change",function(){
        if($(this).val()==0){
            $("#link").removeClass("hide");
            $("#type-div").addClass("hide");
            initSelect();
            $("select[data-name='live']").addClass("hide");
            $("select[data-name='app-cate']").addClass("hide");
            link=0;
            linkText = "网页链接";
        }else {
            link=1;
            linkText = "本地链接";
            $("#link").addClass("hide");
            $("#type-div").removeClass("hide");
        }
    });

    function showMsg(title,msg,data,url) {
        BootstrapDialog.confirm({title: title, message: msg, type: BootstrapDialog.TYPE_WARNING, closable: true, btnCancelLabel: '取消', btnOKLabel: '确认', btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    $.ajax({url: url, type: "POST", dataType: "json", cache: false, async: false, data: data,
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

