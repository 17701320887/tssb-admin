/**
 * Created by admin on 2017/5/31.
 */

$(function (){
    loadData();
    /**
     * 数据列表
     */
    $("body").on("click", ".search", function () {
        loadData();
    });
    function loadData(){
        var params = new Object();
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        $(".param[type=hidden]").each(function(){
            params[$(this).data("name")] = $(this).val();
        });
        $.ajax({
            url: "/tiTools/page", data: params, type: "POST", success: function (data) {
                $("#tools-data-list").html(data);
            }
        });
    }
    /**
     * 查询条件
     */
    $("select").on("change",function(){
       var value = $(this).val();
       var find = $(this).parent().find(".param");
       find.val(value>=0?value:"");
    });


    /**
     * 新增按钮
     */
    $(".tools-add").on("click",function(){
        window.open("/tiTools/add","新增工具");
    });

    /**
     * 删除操作
     */
    $("body").on("click",".delete",function(){
        var id  = $(this).data("tools-id");
        BootstrapDialog.confirm({title: "删除工具", message: "确认要删除吗?", type: BootstrapDialog.TYPE_WARNING, closable: true, btnCancelLabel: '取消', btnOKLabel: '确认', btnOKClass: 'btn-warning',
            callback: function (result) {
                if (result) {
                    $.ajax({
                        url: "/tiTools/delete/"+id,type: "POST", success: function (data) {
                            if(ExceptionDialog(data) && data.code==200){
                                loadData();
                            }else {
                                warningMsg("操作失败,请联系程序猿");
                            }
                        }
                    });
                }
            }
        })


    });
})