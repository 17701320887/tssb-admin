/**
 * Created by admin on 2016/7/26.
 */
$(function(){
   var imgPath = $("#imgPath").val();

   $("body").on("click",".search",function(){
      var skuId = $(".sku-id").val();
      if(!skuId){
         return;
      }
      $(".sku-id").parent().find("input[type='hidden']").val(skuId);
      var params = new Object();
      params["skuId"] = skuId;
      params["pageIndex"] = 1;
      params["pageSize"] = 10;
      $.ajax({url:basePath + "/duibaStar/page",data:params,type:"POST",success:function(data){
         $("#star-data-list").html(data);
         renderSwitcher();
      }});
   });

   $(".search").click();

   /**
    * 添加
    */
   $("body").on("click",".star-add",function(){
      window.open(basePath+"/duibaStar/add","_blank");
   });

   /**
    * 选择对啊之星
    */
   $(".star-url").on("click",function(){
      var skuId = $(".sku-id").val();
      $.ajax({
         url: basePath + "/duibaStar/appStar",
         type: "POST",
         async:false,
         data: {"skuId": skuId},
         success: function (ret) {
            var starImg = $("#star-img");
            starImg.find("img").remove();
            $.each(ret,function(i,obj){
               starImg.append("<img data-id='"+obj.id+"' data-img='"+obj.homeImg+"' style='width: 120px;height: 80px;margin: 15px 10px 15px 18px'   src='"+imgPath+obj.homeImg+"'>");
            });
            $("#myModal").modal('show');
         }
      });
   });

   $("body").on("change",".sku-id",function(){
      $("#show-img img").remove();
      $(".param[name='imgUrl']").val("");
      $(".param[name='jumpUrl']").val("");
   });

   $("#star-img").on("click","img",function(){
      $("#myModal").modal('hide');
      $("#jumpUrl").val($("#duiaDomain").val() + "/wap/getDuiaStar/"+$(this).data("id"));
      if($("#show-img").find("img").length > 0){
         $("#show-img").find("img").attr("src",$(this).attr("src"));
      }else{
         $("#show-img").append("<img src='"+$(this).attr("src")+"'>");
      }
      $(".param[name='imgUrl']").val($(this).data("img"));
   });


   /**
    * 编辑与删除
    */
   $("#star-data-list").on("click","button",function(){
      var optType = $(this).attr("opType");
      var val = $(this).attr("data-id");
      var sku = $(this).attr("data-sku");
      if(optType=='edit'){
         window.open(basePath+"/duibaStar/findById/"+val,"_blank")
      }
   });

   $("body").on("click",".del-btn",function(){
      var val = $(this).data("id");
      if(!val){
         return;
      }
      BootstrapDialog.confirm({
         title: '消息提示',
         message: "确认要删除吗?",
         type: BootstrapDialog.TYPE_WARNING,
         closable: true,
         btnCancelLabel: '取消',
         btnOKLabel: '确认',
         btnOKClass: 'btn-warning',
         callback: function (result) {
            if (result) {
               var params = new Object();
               params["id"] = val;
               $.ajax({url:basePath+"/duibaStar/delete",type:"POST",data:params,success:function(data){
                  if(data && data.code != 200){
                     BootstrapDialog.alert({
                        title:"消息提示",
                        message:data.msg,
                        type:BootstrapDialog.TYPE_WARNING
                     });
                  }else{
                     $(".search").click();
                  }
               }});

            }
         }
      })
   });


   /**
    * 保存
    */
   $("body").on("click", ".save-btn", function () {
      var params = new Object();
      var msg = null;
      $(".form-group .param").each(function () {
         if (msg) {
            return;
         }
         var title = $(this).parents(".form-group").find("label").html();
         var name = $(this).attr("name");
         var val = $(this).val();
         if (!val && name != "id") {
            msg = "请完善" + title;
            return;
         }
         params[name] = val;
      });
      if (!msg && !/^\d+$/.test(params["sort"])) {
         var title = $(this).parents(".form-group").find("label").html();
         msg = title+"输入不合法";
      }
      if (msg) {
         BootstrapDialog.alert({
            title: "消息提示",
            message: msg,
            type: BootstrapDialog.TYPE_WARNING
         });
         return;
      }

      var url;
      if(params["id"]){
         url = "/duibaStar/update";
      }else {
         url = "/duibaStar/save";
      }
      submitBack(url,params);
   });
   /**
    * 启用与禁用
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
      $.ajax({url:basePath + "/duibaStar/update",data:params,type:"POST",success:function(data){
         if(data && data.code != 200){
            BootstrapDialog.alert({
               title:"消息提示",
               message:data.msg,
               type:BootstrapDialog.TYPE_WARNING
            });
         }else{
            state.parent().find(".switchery").remove();
            if(status){
               state.attr("checked","checked");
            }else{
               state.removeAttr("checked");
            }
            renderSwitcherInit(state[0]);
         }
      }});
   });

   function submitBack(url,params){
      $.ajax({
         url: basePath + url, type: "POST",
         data: params,
         dataType: "json",
         async: false,
         cache: false,success: function (ret) {
            if (ret && ret.code == 200) {
               $(opener.document).find(".search").click();
               window.close();
            } else {
               BootstrapDialog.alert({
                  title: "消息提示",
                  message: "系统异常",
                  type: BootstrapDialog.TYPE_WARNING
               });
            }
         }
      });
   }


});