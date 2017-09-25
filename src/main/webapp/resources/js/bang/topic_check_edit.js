/**
 * Created by admin on 2016/7/26.
 */
$(function(){

   /**
    * 点击编辑按钮初始化编辑界面
    */
   $("body").on("click",".edit-btn",function(){
      $("[data-cls=check]").addClass("hide");
      $("[data-cls=topic]").removeClass("hide");
      $(".upd-param").each(function(){
         var val = $(this).html();
         var type = $(this).data("type");
         var name = $(this).data("name");
         if(type == "input"){
            $(this).html($("<input type='text' name='"+name+"' class='form-control' value='"+val+"'>"));
         }else{
            var id = name + "_div";
            $(this).empty();
            $(this).append("<div id='"+id+"'></div>")
            UE.getEditor(id,{
               toolbars:[[ 'bold', 'italic', 'underline', 'simpleupload', 'insertvideo', '|', 'source','attachment','forecolor', 'insertorderedlist',
                'insertunorderedlist','rowspacingtop', 'rowspacingbottom', 'lineheight', 'paragraph', 'fontsize', 'indent','|','fullscreen']],
               autoFloatEnabled:false,//工具条不浮动
               pasteplain:true,
               elementPathEnabled:false,
               wordCount:false,
               initialContent:val
            });
         }
      });
   });

   /**
    * 帖子编辑保存
    */
   $("body").on("click",".edit-save-btn",function(){
      var params = new Object();
      $("input[type=hidden]").each(function(){
         var key = $(this).attr("name");
         var val = $(this).val();
         params[key] = val;
      });
      $("[data-type=input] input").each(function(){
         var key = $(this).attr("name");
         var val = $(this).val();
         params[key] = val;
      });
      $("[data-type=textarea]").each(function(){
         var key = $(this).data("name");
         var editor = UE.getEditor(key + "_div");
         var val = editor.getContent();
         params[key] = val;
      });
      if(!params["topic"] || $.trim(params["topic"]).length < 5){
         BootstrapDialog.alert({
            title:"消息提示",
            message:"帖子标题长度不得少于5",
            type:BootstrapDialog.TYPE_WARNING
         });
         return;
      }
      if(!params["content"]){
         BootstrapDialog.alert({
            title:"消息提示",
            message:"帖子内容不能为空",
            type:BootstrapDialog.TYPE_WARNING
         });
         return;
      }
      $.ajax({url:basePath + "/duibaGroupTopic/update",data:params,type:"POST",success:function(data){
         if(data && data.ret == 1){
            $(".upd-param").each(function(){
               var type = $(this).data("type");
               var name = $(this).data("name");
               if(type == "input"){
                  var val = $(this).find("input[name="+name+"]").val();
                  $(this).html(val);
               }else{
                  UE.delEditor(name + "_div");
                  $(this).html(params[name]);
               }
            });
            $(".forbid-word").html(data.data.content);
            $("[data-cls=check]").removeClass("hide");
            $("[data-cls=topic]").addClass("hide");
         }else if(data){
            BootstrapDialog.alert({
               title:"消息提示",
               message:data.msg,
               type:BootstrapDialog.TYPE_WARNING
            });
         }
      }});
   });

   /**
    * 帖子删除
    */
   $("body").on("click",".delete-btn",function(){
      var id = $(this).data("id");
      $.ajax({url:basePath + "/duibaGroupTopicCheck/delete",data:{id:id},type:"POST",success:function(data){
         if(data && data.ret == 1){
            $(".search").click();
         }else if(data){
            BootstrapDialog.alert({
               title:"消息提示",
               message:data.msg,
               type:BootstrapDialog.TYPE_WARNING
            });
         }
      }})
   });

   $("body").on("click",".check-btn",function(){
      var id = $(this).data("id");
      $.ajax({url:basePath + "/duibaGroupTopicCheck/update",data:{id:id},type:"POST",success:function(data){
         if(data && data.ret == 1){
            $(".search").click();
         }else if(data){
            BootstrapDialog.alert({
               title:"消息提示",
               message:data.msg,
               type:BootstrapDialog.TYPE_WARNING
            });
         }
      }})
   });

});