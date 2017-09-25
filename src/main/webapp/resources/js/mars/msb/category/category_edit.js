/**
 * Created by xiaochao on 2017/1/11.
 */

$(function(){
    var id = $("#id").val(),
        sku = $("#sku").val(),
        classTypeId = $("#class-type-id").val(),
        msg = "";

    /**
     * 编辑页加载班型
     */
    if (id && id > 0) {
        findClassTypeBySku(sku);
    }


    /**
     * 保存按钮
     */
    $(".save-btn").on("click", function () {
        var submit = true;
        var params = new Object();
        verify(params);
        if (msg) {
            warningMsg(msg);
            submit = false;
        }
        if(submit){
            var url = "";
            if (id && id > 0) {
                params["id"] = id;
                url = "/msbCategory/update";
            } else {
                url = "/msbCategory/save";
            }
            submitParams(url, params);
        }
    });



    /**
     * 数据校验
     * @param params
     */
    function verify(params) {
        msg = "";
        $(".input").each(function () {
            var val = $(this).val();
            if (!val) {
                var show = $(this).parents(".form-group").find("label").text();
                msg = "请输入" + show;
                return false;
            } else {
                var name = $(this).attr("name");
                params[name] = val;
            }
        });

        params["type"] = $("input[type='radio'][name='type']:checked").val();
        params["active"] = $("input[type='radio'][name='active']:checked").val();

        $("select").each(function () {
            var val = $(this).val();
            var attr = $(this).attr("name");
            if (!val) {
                var name = $(this).parents(".form-group").find("label").text();
                msg = "请完善" + name;
                return false;
            } else if (attr == "sku" || attr == "classTypeId") {
                params[attr] = val;
            }
        });


    }




    /**
     * 根据sku获取班型
     * @param sku
     */
    function findClassTypeBySku(sku) {
        var obj = $(".class-type-id");
        $.ajax({url: basePath + "/msbClassTitleType/getBySku", data: {"skuId": sku}, type: "POST",
            success: function (ret) {
                obj.find("option:gt(0)").remove();
                if (ret.length > 0) {
                    $.each(ret, function (i, o) {
                        if (classTypeId == o.id) {
                            obj.append("<option selected='selected' value='" + o.id + "'>" + o.title + "</option>");
                        } else {
                            obj.append("<option value='" + o.id + "'>" + o.title + "</option>");
                        }
                    });
                }
            }
        });
    }

    $(".sku-id").on("change",function(){
        findClassTypeBySku($(this).val());
    });


    $(".dd").on("click",function(event){
        var  obj = $(this).prev();
        if(obj.attr("name")!="active"){
            if(!id){
                if(obj.attr("checked")==undefined){
                    $(obj.attr("checked",true));
                }else{
                    $(obj.attr("checked",false));
                }
            }
        }else {
            if(obj.attr("checked")==undefined){
                $(obj.attr("checked",true));
            }else{
                $(obj.attr("checked",false));
            }
        }

    });


    function submitParams(url, params) {
        $.ajax({
            url: basePath + url, data: params, type: "POST", success: function (ret) {
                if (ExceptionDialog(ret) && ret.code == 200) {
                    warningMsg(ret.msg)
                    if(!id){
                        $("input[name='name']").val("");
                    }
                }
            }
        });
    }

});
