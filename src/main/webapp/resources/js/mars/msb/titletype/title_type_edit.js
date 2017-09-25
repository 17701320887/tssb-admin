/**
 * Created by xiaochao on 2016/12/30.
 */

$(function () {

    var msg,
        sku = $("#sku").val(),
        id = $("#id").val(),
        classTypeId = $("#class-type-id").val();

    /**
     * 时分秒初始化
     */
    $("#test1,#test2,#test3").on("click",function(){
        var id = $(this).attr("id");
        if(id=="test1"){
            showTimer("time1");
        }else if(id=="test2"){
            showTimer("time2");
        }else if(id="test3"){
            showTimer("time3");
        }
    });

    /**
     * 时分秒回显
     */
    $("#test1,#test2,#test3").on("blur",function(){
        var id = $(this).attr("id");
        if(id=="test1"){
            $("input[name='doTime']").val(returnTimer("time1"));
        }else if(id=="test2"){
            $("input[name='countDownTime']").val(returnTimer("time2"));
        }else if(id="test3"){
            $("input[name='courseLimitTime']").val(returnTimer("time3"));
        }

    });

    /**
     * 题目,答题,启用选择
     */
    $(".dd").on("click",function(event){
        var  obj = $(this).prev();
        if(obj.attr("name")!="status"){
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
    /**
     * 编辑页加载班型
     */
    if (id && id > 0) {
        // findClassTypeBySku(sku);
        var tiShow = $("#ti-show").val();
        $("input[type='checkbox']").each(function () {
            if (tiShow.indexOf($(this).val()) > -1) {
                $(this).attr("checked", true);
            }
        });

    }


    // $(".sku-id").on("change", function () {
    //     if ($(this).val()) {
    //         // findClassTypeBySku($(this).val());
    //     } else {
    //         $(".class-type-id option:gt(0)").remove();
    //     }
    // })

    /**
     * 根据sku获取班型
     * @param sku
     */
    // function findClassTypeBySku(sku) {
    //     var obj = $(".class-type-id");
    //     $.ajax({url: basePath + "/msbClassTitleType/getBySku", data: {"skuId": sku}, type: "POST",
    //         success: function (ret) {
    //             console.log(ret);
    //             obj.find("option:gt(0)").remove();
    //             if (ret.length > 0) {
    //                 $.each(ret, function (i, o) {
    //                     if (classTypeId == o.id) {
    //                         obj.append("<option selected='selected' value='" + o.id + "'>" + o.title + "</option>");
    //                     } else {
    //                         obj.append("<option value='" + o.id + "'>" + o.title + "</option>");
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // }

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
                params["id"]=id;
                url = "/msbTitleType/update";
            } else {
                url = "/msbTitleType/save";
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

        if ($("input[type='checkbox']:checked").length == 0) {
            msg = "请选择题目类型";
            return;
        } else {
            var val = "";
            $("input[type='checkbox']:checked").each(function () {
                val += $(this).val() + ",";
            });
            val = val.substring(0, val.length - 1);
            params["tiShowTab"] = val;
        }

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
        var answer = $("input[type='radio'][name='answerShowTab']:checked");
        if (answer.length == 0) {
            msg = "请选择答题方式";
            return;
        } else {
            params["answerShowTab"] = answer.val();
        }
        params["status"] = $("input[type=radio][name='status']:checked").val();

        $(".time").each(function(){
            var val = $(this).val();
            var name = $(this).parents(".form-group").find("label").text();
            if(!val){
                msg = "请完善" +name;
                return false;
            }else {
                var timeModel = val.split(":");
                if(timeModel[0]==0&&timeModel[1]==0&&timeModel[2]==0){
                    msg = name + "不能为0";
                }else {
                    params[$(this).attr("name")]=val;
                }

            }
        });
    }

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
