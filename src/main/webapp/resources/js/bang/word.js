/**
 * Created by admin on 2016/7/26.
 */
$(function(){

   $("body").on("click",".search",function(){
      var word = $(".word").val();
      $(".word").parent().find("input[type='hidden']").val(word);
      var params = new Object();
      params["word"] = word;
      params["pageIndex"] = 1;
      params["pageSize"] = 10;
      $.ajax({url:basePath + "/duibaForbidWord/page",data:params,type:"POST",success:function(data){
         $("#word-data-list").html(data);
         renderSwitcher();
      }});
   });

   /**
    * 更改词汇状态
    */
   $("body").on("click",".switchery",function(){
      var state = $(this).parents("td").find("[data-switchery]");
      var id = state.data("id")
      var status = state.prop("checked");
      var params = new Object();
      params["id"] = id;
      params["status"] = 0;
      if(status){
         params["status"] = 1;
      }
      $.ajax({url:basePath + "/duibaForbidWord/update",data:params,type:"POST",success:function(data){
         if(data && data.ret == 1){
            BootstrapDialog.alert({
               title:"消息提示",
               message:data.msg,
               type:BootstrapDialog.TYPE_WARNING
            });
         }
      }});
   });

   /**
    * 点击编辑词汇按钮
    */
   $("body").on("click",".edit",function(){
      var self = $(this).parents("tr").find(".upd-param");

      var val = self.text();
      self.attr("data-bak",val);
      var input = $("<input type='text' class='form-control' value='"+val+"'/>");
      self.html(input);
      $(input).focus();
      //将光标移动到文本框末尾
      input[0].selectionStart = val.length;
      input[0].selectionEnd = val.length;
   });

   $("body").on("keydown",".upd-param input[type='text']",function(e){
      var self = $(this);
      if(e.keyCode == 13){
         self.blur();
      }
   });

   $("body").on("blur",".upd-param input[type='text']",function(){
      var td = $(this).parents("td");
      var val = $(this).val();
      var key = $(this).parents("td").data("name");
      var params = new Object();
      params[key] = val;
      params["id"] = $(this).parents("tr").data("id");
      var bak = td.data("bak");
      if(bak == val){
         td.html(bak)
         return;
      }
      if(!val){
         var idx = td.index();
         var msg = "请输入" + $(this).parents("table").find("tr:eq(0)").find("td:eq("+idx+")").text();
         BootstrapDialog.alert({
            title:"消息提示",
            message:msg,
            type:BootstrapDialog.TYPE_WARNING
         });
         return;
      }
      if(!/^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(val)){
         BootstrapDialog.alert({
            title:"消息提示",
            message:"内容中包含特殊字符",
            type:BootstrapDialog.TYPE_WARNING
         });
         return;
      }
      $.ajax({url:"/duibaForbidWord/update",data:params,type:"POST",success:function(data){
         if(data && data.ret == 1){
            td.html(val);
         }else{
            BootstrapDialog.alert({
               title:"消息提示",
               message:data.msg,
               type:BootstrapDialog.TYPE_WARNING
            });
         }
      }});
   });

   /**
    * 删除词汇
    */
   $("body").on("click",".delete",function(){
      var id = $(this).data("id");
      $.ajax({url:basePath + "/duibaForbidWord/delete",data:{id:id},type:"POST",success:function(){
         $(".pagination .active").click();
      }});
   });

   $("body").on("click",".forbid-word-add",function(){
      $("#add-forbidden-word").removeClass("hide");
      $("#add-forbidden-word").dialog({
         height: 250,
         width: 360,
         title:"添加敏感词",
         show: {
            effect: "blind",
            duration: 1000
         }
      });
   });

   $("body").on("click",".forbid-word-save-btn",function(){
      var cteara = $(this).parents("#add-forbidden-word").find("textarea");
      var val = cteara.val();
      var name = cteara.data("name");
      var params = new Object();
      params[name] = val;
      if(!val){
         BootstrapDialog.alert({
            title:"消息提示",
            message:"请输入内容",
            type:BootstrapDialog.TYPE_WARNING
         });
         return;
      } else if(!/^[|a-zA-Z0-9\u4E00-\u9FA5]+$/.test(val)){
         BootstrapDialog.alert({
            title:"消息提示",
            message:"内容中包含特殊字符",
            type:BootstrapDialog.TYPE_WARNING
         });
         return;
      }
      $.ajax({url:basePath + "/duibaForbidWord/save",data:params,type:"POST",success:function(data){
         if(data && data.ret == 1){
            cteara.val("");
            $(".cancel-btn").click();
            $(".search").click();
           // $("#add-forbidden-word").dialog( "close" );
         }else if(data){
            BootstrapDialog.alert({
               title:"消息提示",
               message:data.msg,
               type:BootstrapDialog.TYPE_WARNING
            });
         }
      }});
   });
   $(".search").click();
});