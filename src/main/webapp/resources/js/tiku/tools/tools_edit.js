/**
 * Created by admin on 2017/5/31.
 */

$(function (){
    var msg;

    /**
     * 单选按钮控制
     */
    $(".dd").on("click",function(){
        var  obj = $(this).prev();
        if(obj.attr("checked")==undefined){
            $(obj.attr("checked",true));
        }else{
            $(obj.attr("checked",false));
        }

    });

    /**
     * 保存按钮
     */
    $(".save-tools").on("click",function(){
        var formData = new FormData();
        verifyParams(formData);
        if(msg){
            warningMsg(msg);
        }else {
            formData.append("type",$("input[type='radio'][name='type']:checked").val());
            $.ajax({
                url: "/tiTools/save", data: formData,
                processData: false,
                dataType: "json",
                async: false,
                cache: false,
                contentType: false,
                type: "POST", success: function (ret) {
                    if(ExceptionDialog(ret) && ret.code==200){
                        location.href="/tiTools/list";
                    }else {
                        warningMsg("操作失败,请联系程序猿");
                    }
                }
            });
        }
    });

    /**
     * 赛选sku
     */
    $("select").on("change",function(){
        var value = $(this).val();
        var find = $(this).parent().find(".param");
        find.val(value>=0?value:"");
    });

    /**
     * 简单参数校验
     * @returns {boolean}
     */
    function verifyParams(formData) {
        msg = "";
        $(".input").each(function () {
            var val = $(this).val();
            if (!val) {
                var show = $(this).parents(".form-group").find("label").text();
                msg =  "请完善" + show;return false;
            } else {
                var name = $(this).attr("name");
                formData.append(name,val);
            }
        });

        $("input[type='file']").each(function () {
            var file = $(this)[0].files[0];
            var name = $(this).attr("name");
            if (file) {
                formData.append(name, file);//不能与映射实体类的字段相同
            }
        });

    }

})