/**
 * Created by admin on 2016/7/29.
 */

$(function(){

    $("body").on("keydown","[data-cls=number]",function(e){
        var code = e.keyCode;
        // 96-105  小键盘 0-9 48-57  大键盘  0-9  8 退格键  46  delete键 37-40 上下左右键   36 home键  35 end键
        if((code >=96 && code <= 105) || (code >= 48 && code <= 57) || code == 8 || (code >= 37 && code <= 40) || code == 36 || code == 35 || code == 46){
            return true;
        }else if(e.ctrlKey && code == 67){//判断复制 || code == 86 v
            return true;
        }
        return false;
    });

    $("body").on("click",".upload-btn",function(){
        $(this).parent().find("input[type='file']").click();
    });

    //出始化时间控件"option", "dateFormat", $( this ).val()
    $('.date-piker').datepicker({
        todayHighlight: true,
        minDate:new Date(),
        dateFormat:"yy-mm-dd"
    });

    //出始化时间控件"option", "dateFormat", $( this ).val()
    $('.date-piker-change').datepicker({
        todayHighlight: true,
        //minDate:new Date(),
        dateFormat:"yy-mm-dd"
    });

    /**
     * 删除上传的文件(图片)
     */
    $("body").on("click",".form-group .show-file .del",function(){
        $(this).parents(".form-group").prev().find("input[type='file']").attr("value","");
        $(this).parents(".form-group").prev().find("input[type='file']").val("");
        $(this).parents(".form-group").prev().find("input[type='hidden']").val("");
        $(this).parent().empty();
    });


    /**
     * 删除上传的文件(其他)
     */
    $("body").on("click",".form-group .del-ext",function(){
        $(this).parents(".form-group").find("input[type='file']").attr("value","");
        $(this).parents(".form-group").find("input[type='file']").val("");
        $(".ext").html("");
    });

    /**
     * 文件上传的点击事件
     */
    $("body").on("change",".upload-group input[type='file']",function(event){
        var files = $(this)[0].files;
        var self = $(this);
        var file = files[0];
        var regex = new RegExp($(this).attr("accept"))
        if(!regex.test(file.type)){
            $(this).val("");
            BootstrapDialog.alert({
                title:"消息提示",
                message:"文件格式不正确",
                type:BootstrapDialog.TYPE_WARNING
            });
            return;
        }
        if(file instanceof File){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.self = self;
            reader.async = false;
            reader.file = file;
            if(/image/.test(file.type)){
                $(this).parents(".form-group").next().removeClass("hide");
                $(".ext").html("");
                reader.onerror = function(){
                    BootstrapDialog.alert({
                        title:"消息提示",
                        message:"图片加载失败...",
                        type:BootstrapDialog.TYPE_WARNING
                    });
                }
                reader.onload = function(){
                    this.self.parents(".form-group").next().find(".show-file").empty();
                    var img = document.createElement("img");
                    img.src = this.result;
                    var del = document.createElement("a");
                    del.className = "del";
                    del.innerHTML = "删除";
                    this.self.parents(".form-group").next().find(".show-file")[0].appendChild(img);
                    this.self.parents(".form-group").next().find(".show-file")[0].appendChild(del);
                    $(this).prev(".ext").html("");
                };
            }else if(/audio/.test(file.type)){
                $(this).parents(".form-group").next().removeClass("hide");
                $(".ext").html("");
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
                    var del = document.createElement("a");
                    del.className = "del";
                    del.innerHTML = "删除";
                    del.href = "javascript:void(0);";
                    this.self.parents(".form-group").next().find(".show-file")[0].appendChild(audio);
                    this.self.parents(".form-group").next().find(".show-file")[0].appendChild(del);
                }
            }else {
                $(this).prev(".ext").html(file.name);
                var del = document.createElement("a");
                del.className = "del-ext";
                del.innerHTML = "删除";
                del.href = "javascript:void(0);";
                $(".ext").append(del);
                $(this).parents(".form-group").next().addClass("hide");
            }
        }
    });


});