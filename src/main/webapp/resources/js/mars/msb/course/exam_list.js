/**
 * Created by xiaochao on 2016/12/30.
 */
var original = "";
$(function () {
    initList();
    // initCourse(null);
    //
    // $(".search").on("click", function () {
    //     initCourse(1);
    // });
    //
    $(".add").on("click", function () {
        var id = $(".param").val();
        window.open(basePath + "/msbCourse/showAdd/"+id);
    });
    $("#add-title").on("click",function(){
        var uuid = createUuid(32, 16);
        $("#skuForm").append("<div class=\"msb-title\">" +
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
    //
    /**
     * 双击修改
     */
    $("body").on("dblclick","#course-title",function(){
        // if ($(".pth-word").find("input[type='text']").length>0){
        //     BootstrapDialog.alert({
        //         title: "消息提示",
        //         message: "不能为空",
        //         type: BootstrapDialog.TYPE_WARNING
        //     });
        //     return;
        // }
        var self = $(this);
        original = self.text();
        var val = self.text();
        self.attr("data-bak",val);
        var input = $("<input type='text' style='width: 200px;color: #1a1a1a;' maxlength='50' value='"+val+"'/>");
        self.html(input);
        $(input).focus();
        //将光标移动到文本框末尾
        input[0].selectionStart = val.length;
        input[0].selectionEnd = val.length;
    });

    $("body").on("blur","#course-title",function(){
        var value = $(this).find("input[type='text']").val();
        var courseId = $(".param").val();
        if(value==null||value==""){
            $(this).html(original);
        }else {
            $(this).html(value);
            var param = new Object();
            param["title"] = value;
            param["courseId"] = courseId;
            $.ajax({
                url:basePath + "/msbCourse/updateTitle",
                data:param,
                type:"POST",
                success:function(data){
                    if (data.ret == 1) {
                        BootstrapDialog.alert({
                            title:"消息提示",
                            message:"修改成功",
                            type:BootstrapDialog.TYPE_SUCCESS
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
        }

    });

    // /**
    //  * 展示详情
    //  */
    // $("body").on("click","#saveTitle",function(){
    //     $("#detail").html($(this).data("comment"));
    //     $('#myModal').modal('show');
    // });
    /**
     * 编辑
     */
    $("body").on("click",".edit",function(){
       window.open($(this).data("url"));

    });

    /**
     * 删除
     */
    $("body").on("click",".course-delete",function(){
        var obj = $(this);
        var id = $(this).attr("data-id");
        BootstrapDialog.confirm({
            title: '消息提示',
            message: "确认要删除此数据吗?",
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    // obj.parents("tr").remove();
                    $.ajax({url:basePath + "/msbCourse/deleteTitle",data:{id:id},type:"POST",success:function(){
                        initList();
                    }});
                }
            }
        })
    });

    /**
     * 修改
     */
    $("#updateTitle").on("click",function(){
        var formData = new FormData();
        var massage = "";
        var title = new Object();
        var titleId=$("#title-id").val();
        var msbCourseId = $("#msbCourseId").val();
        var tiTitle=$(".ti-title").val();
        var file = $("input[type='file']")[0].files[0];
        var answer = $(".answer").val();
        if ($(".show-file").find("img").length<1&&!tiTitle){
            massage = "题目的文本和图片不能同时为空";
            warningMsg(massage);
            return;
        }
        formData.append("id",titleId);
        formData.append("tiTitle",tiTitle);
        formData.append("answer",answer);
        formData.append("msbCourseId",msbCourseId);
        formData.append("fileUrl",file);
        $.ajax({
            url:basePath+"/msbCourse/editTitle",
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
                        message: "修改成功",
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'OK',
                            action: function() {
                                window.location.href = basePath+"/msbCourse/examList/"+msbCourseId;
                            }
                        }]
                    });
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
    });

    /**
     * 添加
     */
    $("#saveTitle").on("click",function(){
        var courseId = $("#copyCourseId").val();
        if (courseId==null||courseId == ""){
            massage = "页面失效";
            warningMsg(massage);
            return;
        }
        var formData = new FormData();
        var massage = "";
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
            title['msbCourseId']=courseId;
            titles.push(title);
            formData.append(uuid,file);
        })
        if (boolean){
            return;
        }
        formData.append("titles",JSON.stringify(titles));
        $.ajax({
            url:basePath+"/msbCourse/saveOldTitle",
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
                        message: "修改成功",
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'OK',
                            action: function() {
                                var courseId = $("#msbCourseId").val();
                                window.location.href = basePath+"/msbCourse/examList/"+courseId;
                            }
                        }]
                    });
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
    });
});

function initList(){
    var params = new Object();
    params["id"] = $(".param").val();
    params["pageIndex"] = 1;
    params["pageSize"] = 10;
    $.ajax({
        url:basePath + "/msbCourse/exam-page",
        data:params,
        type:"POST",
        success:function(data){
            $("#exam-data").html(data);
        }
    });
};

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