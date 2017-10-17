/**
 * Created by admin on 2017/1/3.
 */

var fileArray = new Array();
$(function(){

    //$("#orderTime").datetimepicker({
    //    language:  'zh-CN',
    //    minuteStep: 1,
    //    startDate: new Date()
    //});

    $("body").on("click",".upload-group1 input[type=button]",function(){
       $(this).parent().find("input[type=file]").click();
    });

    /**
     * 文件上传的点击事件
     */
    $("body").on("change",".upload-group1 input[type='file']",function(event){
        var files = $(this)[0].files;
        var self = $(this);
        var file = files[0];
        var regex = new RegExp($(this).attr("accept"))
        if(!regex.test(file.type)){
            $(this).val("");
            return;
        }
        if(file instanceof File){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.self = self;
            reader.async = false;
            reader.file = file;
            var idx = fileArray.length;  //0
            fileArray.push(file);
            if(/image/.test(file.type)){
                reader.onerror = function(){
                    BootstrapDialog.alert({
                        title:"消息提示",
                        message:"图片加载失败...",
                        type:BootstrapDialog.TYPE_WARNING
                    });
                }
                reader.onload = function(){
                    var img = document.createElement("img");
                    img.src = this.result;
                    img.className = idx;
                    var del = document.createElement("a");
                    del.className = "del1";
                    del.innerHTML = "删除";
                    this.self.parents(".form-group").next().find(".show-file")[0].appendChild(img);
                    this.self.parents(".form-group").next().find(".show-file")[0].appendChild(del);
                };
            }else if(/audio/.test(file.type)){
                reader.onerror = function(){
                    BootstrapDialog.alert({
                        title:"消息提示",
                        message:"音频加载失败...",
                        type:BootstrapDialog.TYPE_WARNING
                    });
                }
                reader.onload = function(){
                    this.self.parents(".form-group").next().find(".show-file").empty();
                    var audio  = document.createElement("audio");
                    audio.src = this.result;
                    audio.controls = "controls";
                    audio.self = this.self;
                    audio.oncanplay = function(){
                        var len = parseInt(this.duration);
                        var name = this.self.data("name");
                        this.self.parent().find("input[name='"+name+"']").remove();
                        this.self.parent().append($("<input type='hidden' name='"+name+"' value='"+len+"'/>"))
                    }
                    this.self.parents(".form-group").next().find(".show-file")[0].appendChild(audio);
                }
            }
        }
    });

    /**
     * 删除上传的图片
     */
    $("body").on("click",".form-group .show-file .del1",function(){
        var attr = $(this).prev().attr("class");
        $(this).nextAll("img").each(function () {
            $(this).attr("class",$(this).attr("class")-1);
        });
        fileArray.splice(attr,1);
        $(this).parents(".form-group").prev().find("input[type='file']").attr("value","");
        $(this).parents(".form-group").prev().find("input[type='file']").val("");
        $(this).parents(".form-group").prev().find("input[type='hidden']").val("");
        $(this).prev().remove();
        $(this).remove();
    });

    /**
     * 添加
     */
    $("body").on("click",".save-xiaoTi",function(){
        var audioNum = 0;
        var imageNum = 0;
        var formData = new FormData();
        var gruopId = $("input[name='groupId']").val();
        var titleTypeId = $("input[name='titleTypeId']").val();
        var titleText = $("textarea[name='title-titleText']").val();
        //var orderTime = $("input[name='orderTime']").val();
        var sku = $("input[name='sku']").val();
        var classTypeId = $("input[name='classTypeId']").val();

        if(fileArray.length > 0) {
            for (var i = 0; i < fileArray.length; i++) {
                if (/image/.test(fileArray[i].type)) {
                    imageNum++;
                } else {
                    audioNum++;
                }
            }
        }
        if($("input[name='image']").length>0){
            if(imageNum==0){
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "请上传图片",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        if($("input[name='audio']").length>0){
            if(audioNum==0){
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "请上传音频",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        if($("textarea[name='title-titleText']").length >0){
            if(!titleText){
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "请完善文字描述",
                        type: BootstrapDialog.TYPE_WARNING
                    });
                    return;
            }
        }
        //if($("input[name='orderTime']").length>0){
        //    if(!orderTime){
        //        BootstrapDialog.alert({
        //            title: "消息提示",
        //            message: "请填写预约时间",
        //            type: BootstrapDialog.TYPE_WARNING
        //        });
        //        return;
        //    }
        //}
        formData.append("gruopId",gruopId);
        formData.append("titleTypeId",titleTypeId);
        formData.append("titleText",titleText);
        //formData.append("orderTime",orderTime);
        if(fileArray.length > 0){
            for(var i = 0;i < fileArray.length;i++){
                if(/image/.test(fileArray[i].type)) {
                    formData.append("titleImage" + i, fileArray[i]);
                }else{
                    formData.append("audioImage" + i, fileArray[i]);
                }
            }
        }

        $.ajax({
            url: basePath + "/msbTitle/save",
            type: "POST",
            data: formData,
            dataType: "json",
            processData: false,async: false,
            cache: false,
            contentType: false,
            success: function (data) {
                if (data) {
                    if (data.ret == 1) {
                        location.href = basePath + "/msbTitle?id="+gruopId+"&&sku="+ sku +"&&classTypeId="+classTypeId;
                    } else {
                        BootstrapDialog.alert({
                            title: "消息提示",
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING
                        });
                    }
                }
            }
        });
    });


    /**
     * 编辑
     */
    $("body").on("click",".update-xiaoTi",function(){
        var audioNum = 0;
        var imageNum = 0;
        var formData = new FormData();
        var id = $("input[name='titleId']").val();
        var titleTypeId = $("input[name='titleTypeId']").val();
        var titleText = $("textarea[name='title-titleText']").val();
        //var orderTime = $("input[name='orderTime']").val();
        var gruopId = $("input[name='groupId']").val();
        var sku = $("input[name='sku']").val();
        var classTypeId = $("input[name='classTypeId']").val();

        if(fileArray.length > 0) {
            for (var i = 0; i < fileArray.length; i++) {
                if (/image/.test(fileArray[i].type)) {
                    imageNum++;
                } else {
                    audioNum++;
                }
            }
        }
        imageNum += $("img[name='title_img']").length;
        audioNum += $("audio[name='title-audio']").length;
        if($("input[name='image']").length>0){
            if(imageNum==0){
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "请上传图片",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        if($("input[name='audio']").length>0){
            if(audioNum==0){
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "请上传音频",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        if($("textarea[name='title-titleText']").length >0){
            if(!titleText){
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "请完善文字描述",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        //if($("input[name='orderTime']").length>0){
        //    if(!orderTime){
        //        BootstrapDialog.alert({
        //            title: "消息提示",
        //            message: "请填写预约时间",
        //            type: BootstrapDialog.TYPE_WARNING
        //        });
        //        return;
        //    }
        //}
        formData.append("id",id);
        formData.append("titleTypeId",titleTypeId);
        formData.append("titleText",titleText);
        //formData.append("orderTime",orderTime);
        formData.append("gruopId",gruopId);
        if(fileArray.length > 0){
            for(var i = 0;i < fileArray.length;i++){
                if(/image/.test(fileArray[i].type)) {
                    formData.append("titleImage" + i, fileArray[i]);
                }else{
                    formData.append("audioImage" + i, fileArray[i]);
                }
            }
        }

        $.ajax({
            url: basePath + "/msbTitle/update",
            type: "POST",
            data: formData,
            dataType: "json",
            processData: false,
            async: false,
            cache: false,
            contentType: false,
            success: function (data) {
                if (data) {
                    if (data.ret == 1) {
                        location.href = basePath + "/msbTitle?id="+gruopId+"&&sku="+ sku +"&&classTypeId="+classTypeId;
                    } else {
                        BootstrapDialog.alert({
                            title: "消息提示",
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING
                        });
                    }
                }
            }
        });
    });

    $("body").on("click",".edit-del1",function(){
        var resourseId = $(this).attr("data-id");
        var del = $(this);
        BootstrapDialog.confirm({
            title: '消息提示',
            message: "确认要删除该图片?",
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    $.ajax({
                        url:basePath +"/msbTitle/deleteImage",
                        type:"POST",
                        data:{"id":resourseId},
                        success:function(data){
                            if(data){
                                if (data.ret == 1) {
                                    del.prev().remove();
                                    del.remove();
                                }else {
                                    BootstrapDialog.alert({
                                        title: "消息提示",
                                        message: data.msg,
                                        type: BootstrapDialog.TYPE_WARNING
                                    });
                                }
                            }
                        }
                    });
                }
            }
        })
    });
});

