var path = $("#path").val();
//保存用户
$("#saveMenu").click(function(){
    var datas = {"code":$.trim($("#code").val()),"codeName":$.trim($("#codeName").val())};
    console.error(datas);
    $.ajax({
        url:path+"/system/menu/save",
        type:"post",
        dataType:"json",
        data :datas,
        success: function (datas){
            if(datas=="200")
            {
                location.reload();
            }else{
                console.log("保存失败!");
            }
        }
    });
});