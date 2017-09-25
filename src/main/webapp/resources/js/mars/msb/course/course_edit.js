/**
 * Created by xiaochao on 2017/1/4.
 */
$(function(){
    var msg = "",
        url = "",
        id= $("#id").val(),
        skuId = $(".sku-id").val(),
        classTypeId = $("#class-type-id").val();

    $(".save-btn").on("click",function(){
        var submit = true;
        var formData = new FormData();
        verify(formData);
        var val = $("input[name='lsCode']").val().trim();
        $.ajax({
            url:'/letv/validate/'+val,
            type:'post',
            async:false,
            success:function(ret){
                ret = JSON.parse(ret);
                if(ret.code==105){
                    msg = "视频资源不存在";
                }
            },
            error:function(){
                msg = "视频输入有误";
            }
        });

        if (msg) {
            warningMsg(msg);
            submit = false;
        }
        if(submit){
            if(id){
                formData.append("id",id);
                url = basePath+"/msbCourse/update";
            }else {
                url = basePath+"/msbCourse/save";
            }
            submitformData(url,formData);
        }
    });


    $(".dd").on("click",function(){
        if(!id){
            if($(this).prev().attr("checked")==undefined){
                $(this).prev().attr("checked",true);
            }else{
                $(this).prev().attr("checked",false);
            }
        }

    });

    $("select[name='sku']").on("click",function(){
        var val = $(this).val();
        var  obj  = $(".class-type-id");
        if(val){
            getClassTypeBySku(val);
            if (val==563||val==664){
                $(".province-div").show();
            }else {
                $(".province-div").hide();
            }
        }else {
            obj.find("option:gt(0)").remove();
        }
    });


    if(id && id>0){
        getClassTypeBySku(skuId);
    }

    /**
     * 参数校验
     * @param formData
     */
    function verify(formData){
        msg = "";
        $(".input").each(function () {
            var val = $(this).val();
            if (!val) {
                var show = $(this).parents(".form-group").find("label").text();
                msg = "请输入" + show;
                return false;
            } else {
                var name = $(this).attr("name");
                formData.append(name,val);
            }
        });

        if(id){
            if(!$(".show-file").find("img").length>0){
                msg = "请完善视频封面";
            }else {
                formData.append("cover_path",$("input[type='file']")[0].files[0]);
            }
        }else {
            $("input[name='cover_path']").each(function () {
                var title = $(this).parents(".form-group").find("label").text();
                var file = $(this)[0].files[0];
                var name = $(this).attr("name");
                if (!file) {
                    msg = "请完善" + title;
                    return;
                }
                var regex = new RegExp($(this).attr("accept"))
                if (!regex.test(file.type)) {
                    msg = title + "的文件格式不合法！";
                    $(this).val("");
                    return;
                }
                if (file) {
                    formData.append("cover_path",file);
                }
            });
        }

        $("select").each(function(){
            var val = $(this).val();
            if(!val){
                var show = $(this).parents(".form-group").find("label").text();
                msg = "请选择" + show;
                return false;
            }else {
                var name = $(this).attr("name");
                formData.append(name,val);
            }
        });

        if($("input[type=radio]:checked").length==0){
            msg = "请选择类型";
        }else {
            formData.append("type",$("input[type=radio]:checked").val());
        }

        $(".digit").each(function () {
            var val = $(this).val().trim();
            if(!/^\d+$/.test(val) || val<=0){
                msg = $(this).parents(".form-group").find("label").text()+":"+$(this).attr("placeholder");
                return false;
            }
        })
    }

    /**
     * 根据sku获取班型
     * @param skuId
     */
    function getClassTypeBySku(skuId){
        var  obj  = $(".class-type-id");
        $.ajax({url: basePath + "/msbClassTitleType/getBySku",
            data: {"skuId":skuId},
            type: "POST",
            success: function (ret) {
            obj.find("option:gt(0)").remove();
            if (ret.length > 0) {
                $.each(ret, function (i, o) {
                    if(classTypeId==o.id){
                        obj.append("<option selected='selected' value='" + o.id + "'>"+o.title+"</option>");
                    }else {
                        obj.append("<option value='" + o.id + "'>"+o.title+"</option>");
                    }
                });
            }
        }});
    }

    function submitformData(url, formData) {
        $.ajax({
            url: basePath + url,
            processData: false,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false,
            data: formData,
            type: "POST",
            success: function (ret) {
                if (ExceptionDialog(ret)&&ret.code==200) {
                    warningMsg(ret.msg);
                    if(!id){
                        $("input[name='title']").val("");
                    }
                }
            }
        });
    }

    function warningMsg(msg){
        BootstrapDialog.alert({
            title: "消息提示",
            message: msg,
            type: BootstrapDialog.TYPE_WARNING
        });
    }

    $("input[name='type']").on("change",function(){
        var type = $(this).val();
        if (type==0){
            $("#add-title").hide();
            $("#msb-old-exam").hide();
            $("#msb-course").show();
        }else {
            $("#add-title").show();
            $("#msb-old-exam").show();
            $("#msb-course").hide();
        }
    });

    $("input[name='type']").on("change",function(){
        var type = $(this).val();
        if (type==0){
            $("#add-title").hide();
            $("#msb-old-exam").hide();
            $("#msb-course").show();
        }else {
            $("#add-title").show();
            $("#msb-old-exam").show();
            $("#msb-course").hide();
        }
    });

    $("#add-title").on("click",function(){
        var uuid = createUuid(32, 16);
        $("#msb-old-exam").append("<div class=\"msb-title\">" +
            "<input type=\"hidden\" class=\"uuid\" value=\""+uuid+"\">" +
            "<div class=\"del-title\" style=\"cursor:pointer;\" onclick='delTitle(this)'>X</div>"+
            "<div class=\"form-group\">" +
                "<label class=\"col-md-2 control-label title\">题目</label>" +
                "<div class=\"col-md-5\">" +
                    "<textarea class=\"form-control ti-title\" name=\"comment\" rows=\"5\" style=\"resize:none;\"></textarea>" +
                "</div>" +
                "<div class=\"col-md-5 upload-group\">" +
                    "<input type=\"button\" class=\"btn btn-success m-r-5 m-b-5 upload-btn\" value=\"上传\"/>" +
                    "<span style='color: red'>（宽度在1200以内）</span>"+
                    "<input type=\"file\"  accept=\"image/*\" class=\"hide\"/>" +
                "</div>" +
            "</div>" +
            "<div class=\"form-group\">" +
                "<label class=\"col-md-2 control-label\"></label>" +
                "<div class=\"col-md-5 show-file\">" +
                "</div>" +
            "</div>" +
            "<div class=\"form-group\">" +
                "<label class=\"col-md-2 control-label\">答案</label>" +
                "<div class=\"col-md-5\">" +
                    "<textarea class=\"form-control answer\" name=\"comment\" rows=\"5\" style=\"resize:none;\"></textarea>" +
                "</div>" +
            "</div><hr></div>");
    });

    $("#save-title").on("click",function(){
        var submit = true;
        var formData = new FormData();
        var type = $("input[type=radio]:checked").val();
        var massage;
        if (type == 1){
            var skuId = $(".sku-id").val();
            if (!skuId){
                massage = "请选择sku";
                warningMsg(massage);
                return;
            }
            var classType = $(".class-type-id").val();
            if (!classType){
                massage = "请选择班型";
                warningMsg(massage);
                return;
            }
            var tiTitle = $(".title-name").val();
            if (!tiTitle){
                massage = "请填写名称";
                warningMsg(massage);
                return;
            }
            var province = $(".province").val();
            if (province==""||province==null){
                province = 0;
            }
            var boolean = false;
            var titles = [];
            $(".msb-title").each(function (i) {
                var title = new Object();
                var uuid = $(this).find(".uuid").val();
                var tiTitle=$(this).find(".ti-title").val();
                var file = $(this).find("input[type='file']")[0].files[0];
                var answer = $(this).find(".answer").val();
                if ($(this).find(".show-file").find("img").length<1&&!tiTitle){
                    massage = "题目的文本和图片不能同时为空";
                    warningMsg(massage);
                    boolean = true;
                    return false;
                }
                title['tiTitle']=tiTitle;
                title['answer']=answer;
                title['uuid']=uuid;
                titles.push(title);
                formData.append(uuid,file);
            })
            if (boolean){
                return;
            }
            formData.append("sku",skuId);
            formData.append("classTypeId",classType);
            formData.append("title",tiTitle);
            formData.append("province",province);
            formData.append("titles",JSON.stringify(titles));
            $.ajax({
                url:basePath+"/msbCourse/saveOldExam",
                data:formData,
                type:"POST",
                processData: false,
                dataType: "json",
                async: false,
                cache: false,
                contentType: false,
                success:function(data){
                    if (data.ret == 1) {
                        BootstrapDialog.show({
                            title: "消息提示",
                            message: "操作成功",
                            type: BootstrapDialog.TYPE_SUCCESS,
                            buttons: [{
                                label: 'OK',
                                action: function() {
                                    window.location.href = basePath+"/msbCourse/examList/"+data.data;
                                }
                            }]
                        });
                        return;
                    }else {
                        BootstrapDialog.alert({
                            title:"消息提示",
                            message:"系统异常",
                            type:BootstrapDialog.TYPE_WARNING
                        });
                        return;
                    }
                }
            });
        }else {
            verify(formData);
            var val = $("input[name='lsCode']").val().trim();
            $.ajax({
                url:'/letv/validate/'+val,
                type:'post',
                async:false,
                success:function(ret){
                    ret = JSON.parse(ret);
                    if(ret.code==105){
                        msg = "视频资源不存在";
                    }
                },
                error:function(){
                    msg = "视频输入有误";
                }
            });

            if (msg) {
                warningMsg(msg);
                submit = false;
            }
            if(submit){
                url = basePath+"/msbCourse/save";
                submitformData(url,formData);
            }
        }
    });

});

function createUuid(len, radix) {
    /*判断当前有浏览器中是否有uuid的cookie*/
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

function delTitle(obj) {
    $(obj).parent(".msb-title").remove();
}