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
            // console.log($(this).data("name")+"--------"+$(this).val())
            params[$(this).data("name")] = $(this).val();
        });
        $.ajax({
            url: "/feedBack/page", data: params, type: "POST", success: function (data) {
                $("#feed-back-data-list").html(data);
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
        if($(this).hasClass("sku-id")){ // 切换sku,获取科目
            $(".sub-id").find("option:gt(0)").remove();
            if(value>0){
               $.ajax({url: "/tiSubject/findBysku", data: {"skuId":value}, type: "POST", success: function (ret) {
                   if(ret.length>0){
                       $.each(ret,function(i,obj){
                           $(".sub-id").append("<option value='"+obj.id+"'>"+obj.subName+"</option>");
                       })
                   }
               }});
           }
       }
    });
    /**
     * 详情回显
     */
    $("body").on("click",".show-detail",function(){
        $("#detail").val($(this).parent().data("des"))
            .attr("readonly","readonly");
        $(".modal-title").html("回复详情");
        $("#myModal").modal("show");
        $("#oper").addClass("hide");


    });

    /**
     * 回复操作
     */
    $("body").on("click",".reply",function(){
        $("#myModal").modal("show");
        $(".modal-title").html("请输入回复内容");
        $("#oper").removeClass("hide");
        $("#detail").attr("readonly",false)
                    .val("");
        $(".reply-sub").attr("data-id",$(this).data("id"));

    });
    /**
     * 回复提交
     */
    $(".reply-sub").on("click",function(){
       var val = $("#detail").val();
       if(val){
           var params = new Object();
           params["id"] = $(this).data("id");
           params["replyMessages"] = val;
           $.ajax({
               url: "/feedBack/reply_feed_back", data: params, type: "POST", success: function (data) {
                   if(data.code==200){
                       loadData();
                       $("#myModal").modal("hide");
                   }else {
                       warningMsg("操作失败,请联系管理员");
                   }
               }
           });
       }else {
           warningMsg("您还没填入回复内容呢");
       }
    });
    /**
     * 查看试题
     */
    $("body").on("click",".prev-ti",function(){
        window.open("/title/preview/3/"+$(this).data("title-id"),"查看试题");
    })

})