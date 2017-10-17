/**
 * Created by admin on 2016/8/3.
 */
$(function(){
    $("#page").remove();
    $("body").on("click","li.paginate_button a",function(){
        var params = new Object();
        params["pageIndex"] = $(this).data("dt-idx");
        params["pageSize"] = $("#pageSize").val();
        $(".param").each(function(){
            var key = $(this).data("name");
            var val = $(this).val();
            params[key] = val;
        });
        var id = $("#data-ct-id").val();
        var url = $("#data-ct-url").val();
        $.ajax({url:url,data:params,type:"POST",
            success:function(data){
                $("#"+id).html(data);
                //$("#"+id).append(data);
                if(typeof renderSwitcher != "undefined"){
                    renderSwitcher();
                }
                if(url=="/msbTitleType/page"){
                    var tiType = ['图片', '视频', '音频', '文本', '文档'];
                    $("#title-type-data .trans").each(function () {
                        var val = $(this).text();
                        var newVal = "";
                        if (val.indexOf(",") > -1) {
                            var split = val.split(",");
                            for (var i in split) {
                                newVal += tiType[split[i] - 1] + ",";
                            }
                            newVal = newVal.substring(0, newVal.length - 1);
                        } else {
                            newVal = tiType[val - 1];
                        }
                        $(this).text(newVal);

                    });
                }
            }
        });
    });
});