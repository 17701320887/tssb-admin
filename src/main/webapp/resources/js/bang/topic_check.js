/**
 * Created by admin on 2016/7/26.
 */
$(function(){

   $("body").on("click",".search",function(){
      var groupId = $(".sku-id").val();
      $(".sku-id").parent().find("input[type='hidden']").val(groupId);
      if(!groupId){
         return;
      }
      var status = $(".status").val();
      $(".status").parent().find("input[type='hidden']").val(status);
      var params = new Object();
      params["groupId"] = groupId;
      params["status"] = status;
      params["pageIndex"] = 1;
      params["pageSize"] = 10;
      $.ajax({url:basePath + "/duibaGroupTopicCheck/page",data:params,type:"POST",success:function(data){
         $("#check-topic-data-list").html(data);
         renderSwitcher();
      }});
   });

   $("body").on("click",".delete",function(){
      var id = $(this).data("id");
      $.ajax({url:basePath + "/duibaGroupTopicCheck/delete",data:{id:id},type:"POST",success:function(){
         $(".pagination .active").click();
      }});
   });

   $(".search").click();
});