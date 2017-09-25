/**
 * Created by xiaochao on 2017/2/7.
 */

$(function () {
    var msg ="";
    var submit = true;
    /**
     * sku change
     */
    $(".sku-id").on("change",function(){
        var val = $(this).val();
        if(val){
            initClassTitleType(val);
            $(".ti").removeClass("hide");
            initTitleType(val);
        }else {
            $(".class-type-id option:gt(0)").remove();
            $(".ti-show").html("");
        }
    });

    $("body").on("click",".dd",function(){
        var  obj = $(this).prev();
        if(obj.attr("disabled")=="disabled")return;
        if(obj.attr("checked")==undefined){
            $(obj.attr("checked",true));
        }else{
            $(obj.attr("checked",false));
        }
    });

    $(".class-type-id").on("change",function(){
        var val = $(this).val();
        $(".ti-show input[type='checkbox']").attr("checked",false).removeAttr("disabled");
        if(val){
            $.ajax({url: basePath + "/msbClassTitleType/getTitleTypeByClassTypeId", data: {"classTypeId": val}, type: "POST",
                success: function (ret) {
                    $.each(ret, function (i, o) {
                        $.each($(".ti-show input[type='checkbox']"),function(i,obj){
                            if($(obj).val()==o){
                                $(obj).attr("checked",true).attr("disabled","disabled");
                            }
                        })
                    });
                }
            });
        }
    });

    /**
     * 保存按钮
     */
    $(".save-btn").on("click", function () {
        submit = true;
        var params = new Object();
        verify(params);
        if(submit){
            var url = basePath+"/msbClassTitleType/save";
            submitParams(url, params);
        }
    });

    function verify(params){
        msg = "";
        var classTypeId="";
        $(".form-control").each(function(){
           var val = $(this).val();
            if(!val){
               var name = $(this).parent().prev().text();
               msg = "请完善" + name;
               return false;
           }else {
               params[$(this).attr("name")] = val;
           }
       });
       $(".ti-show input[type=checkbox]:checked").each(function(){
            if($(this).attr("disabled")==undefined){
                classTypeId += $(this).val()+",";
            }
       });
        classTypeId = classTypeId.substring(0,classTypeId.length-1);
        params["classType"] = classTypeId;
        if (msg) {
            warningMsg(msg);
            submit = false;
        }
    }

    /**
     * 根据sku获取班型
     * @param skuId
     */
    function initClassTitleType(skuId){
        var obj  = $(".class-type-id");
        obj.find("option:gt(0)").remove()
        $.ajax({url: basePath + "/msbClassTitleType/getBySku", data: {"skuId": skuId}, type: "POST",
            success: function (ret) {
                $.each(ret, function (i, o) {
                    obj.append("<option value='" + o.id + "'>" + o.title + "</option>");
                });
            }
        });
    }
    /**
     * 根据sku获取题型
     * @param skuId
     */
    function initTitleType(skuId) {
        var obj  = $(".ti-show");
        obj.html("");
        $.ajax({url: basePath + "/msbTitleType/getTitleTypeBySku", async:false,data: {"sku": skuId}, type: "POST",
            success: function (ret) {
                $.each(ret, function (i, o) {
                    obj.append("<div><input type='checkbox' class='test'  value='"+o.id+"'><span class='dd'>"+o.name+"</span></div>");
                });
            }
        });
    }
    function submitParams(url, params) {
        $.ajax({
            url: basePath + url, data: params, type: "POST", success: function (ret) {
                if (ExceptionDialog(ret) && ret.code == 200) {
                    warningMsg(ret.msg)
                    $(".ti-show input[type=checkbox]:checked").each(function(){
                        $(this).attr("disabled","disabled");
                    });
                }
            }
        });
    }
});
