/**
 * Created by admin on 2016/7/26.
 */
$(function(){
   $("body").on("click",".spoken-add",function(){
      window.open(basePath + "/spoken/add","_blank")
   });

   $("body").on("change",".sku-id",function(){
      var skuId = $(this).val();
      var params = new Object();
      params["skuId"] = skuId;
      $.ajax({url:basePath + "/card/loadCards",data:params,type:"POST",success:function(data){
         if(data && data.ret == 1){
            $(".card-id option:gt(0)").remove();
            $(".cate-id option:gt(0)").remove();
            var cards = data.data;
            for(var i = 0; i < cards.length; i++){
               var card = cards[i];
               $(".card-id").append($("<option value='"+card.id+"'>"+card.name+"</option>"));
            }
         }
      }});
   });

   $("body").on("change",".card-id",function(){
      var cardId = $(this).val();
      $.ajax({url:basePath + "/category/loadAll",data:{cardId:cardId},type:"POST",success:function(data){
         if(data && data.ret == 1){
            $(".cate-id option:gt(0)").remove();
            var array = data.data;
            for(var i = 0; i < array.length; i ++){
               var item = array[i];
               $(".cate-id").append($("<option value=\""+item.id+"\">"+item.name+"</option>"));
            }
         }else{
            $(".cate-id option:gt(0)").remove();
         }
      }});
   });

   $("body").on("click",".switchery",function(){
      var state = $(this).parents("td").find("[data-switchery]");
      var id = state.data("id")
      var status = state.prop("checked");
      var params = new Object();
      params["id"] = id;
      params["status"] = 0;
      params["cardId"] = state.data("card");
       if(status){
         params["status"] = 1;
      }
      $.ajax({url:basePath + "/spoken/updateStatus",data:params,type:"POST",success:function(data){
          warningMsg(data.msg);
         if(data.ret != 1){
             state.parent().find(".switchery").remove();
             if(status){
                 state.removeAttr("checked");
             }else{
                 state.attr("checked","checked");
             }
             renderSwitcherInit(state[0]);
         }
      }});
   });

   $("body").on("click",".search",function(){
      var skuId = $(".sku-id").val();
      $(".sku-id").parent().find("input[type='hidden']").val(skuId);
      var cardId = $(".card-id").val();
      $(".card-id").parent().find("input[type='hidden']").val(cardId);
      var cateId = $(".cate-id").val();
      $(".cate-id").parent().find("input[type='hidden']").val(cateId);
      var params = new Object();
      params["skuId"] = skuId;
      params["cardId"] = cardId;
      params["cateId"] = cateId;
      params["pageIndex"] = 1;
      params["pageSize"] = 10;
      if(!skuId){
         return;
      }
      $.ajax({url:basePath + "/spoken/page",data:params,type:"POST",success:function(data){
         $("#spoken-data-list").html(data);
         renderSwitcher();
      }});
   });

   $("body").on("click",".delete",function(){
      var id = $(this).data("id");
      var obj = $(this);
      BootstrapDialog.confirm({
         title: '消息提示',
         message: "确认要删除此口语吗?",
         type: BootstrapDialog.TYPE_WARNING,
         closable: true,
         btnCancelLabel: '取消',
         btnOKLabel: '确认',
         btnOKClass: 'btn-warning',
         callback: function (result) {
            if (result) {
               obj.parents("tr").remove();
               $.ajax({url:basePath + "/spoken/delete",data:{id:id},type:"POST",success:function(){
                  $(".pagination .active a").click();
               }});
            }
         }
      })

   });

   $(".sku-id").change();

   $(".search").click();
});