var path = $("#path").val();
var submit = $("#paperSubmit");
var skuId = $("#dataId").attr("skuId");
var subId = $("#dataId").attr("subId");


$(".paperparam").on({
    focus:function(event){
        $(this).attr("placeholder","");
        event.stopPropagation;
    },
    blur:function(event){
        if($(event.target).attr("id")=="name"){
            $(this).attr("placeholder","请输入试卷名");
        }else{
            $(this).attr("placeholder","最后编辑人");
        }
        event.stopPropagation;
    }
});


//选中参数处理
$(".tigan-bottom").on("click","a", function(){
    $(this).css({"background":"#00ACAC","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#999999"});
    $.each($(this).parent().find("a"),function(i,obj){
        $(this).attr("select-data",0)
    });
    $(this).attr("select-data",1);
});
for(var y = new Date().getFullYear(); y>=2010; y--){
        $("#appendYear").parent().append('<a target="_blank" data-value="'+y+'">'+y+'</a>');
}

//加载各类试题数量
$.ajax({
    type:"post",
    url:path+"/tiPaper/countByType",
    data:{"skuId":skuId,"subId":subId},
    success:function(ret){
        $.each(ret,function(i,obj){
            $("#countByType").append('<div style="text-align: center">'+(i==3?"真题":i==5?"模拟":"其他")+''+obj+'套试卷<div>');
        });
    }
});

//全选
$("#paper-table").on("change","#all",function(){
    if(this.checked){
        $(".paper-id").attr("checked", true);
    }else{
        $("#count").addClass("hide");
        $(".paper-id").attr("checked", false);
    }
    //计算选中的数量
    $("#count").text($("#paper-table .paper-id:checked").length+"套试卷").removeClass("hide");
    if($("#paper-table .paper-id:checked").length>0){
        submit.attr("disabled",false);
    }else{
        $("#count").addClass("hide");
        submit.attr("disabled",true);
    }
});

//勾选试卷 计算选中的数量
$("#paper-table").on("change",".paper-id",function(event){
    $("#count").text($("#paper-table .paper-id:checked").length+"套试卷").removeClass("hide");
    if($("#paper-table .paper-id:checked").length>0){
        submit.attr("disabled",false);
    }else{
        $("#count").addClass("hide");
        submit.attr("disabled",true);
    }
    event.stopPropagation();
});

//操作
$("#paper-table").on("click",".operate",function(event){
    var id = $(this).attr("data-id");
    if($(this).attr("optype")=="log"){
        location.href=path+"/tiOperationLog/index?toOperation=2&toOperationId="+id;
    }else if($(this).attr("optype")=="del"){
        if(confirm(("确定要删除该题嘛?"))){
            paperOperteAjax(path+"/title/operate/2/-1",id);
        }
    }else if($(this).attr("optype")=="check"){//审核
        window.open(path+"/tiPaper/preview/2/"+id);
    }else{
        location.href=path+"/tiPaper/paperAttTi/"+id;
    }
    event.stopPropagation();
});

function paperOperteAjax(url,ids){
    $.ajax({
        url:url,
        data:{"id":ids},
        success:function(ret){
            if(ret.code==200){
                location.reload();
            }else{
                alert("操作失败");
            }
        }
    });
}

//操作提交
submit.on("click",function(event){
    //获取被选中的id
    var ids = "";
    var url = "";
    var optype = $(this).attr("optype");
    $.each($("#paper-table .paper-id:checked"),function(i,obj){
        ids+=$(obj).attr("data-id")+",";
    });
    ids=ids.substr(0,ids.length-1);
    if(optype=="checked"){//审核通过 进入预览
        location.href = path+"/tiPaper/preview/2/"+ids;
    }else if(optype=="disabled"){//禁用
        abled(ids,2,5);
    }else{ //启用
        abled(ids,2,3);
    }
    //paperOperteAjax(url,ids);
    event.stopPropagation();
    event.preventDefault();


    function abled(id,toOperation,optype){
        $.ajax({
            type: "get",
            data: {"id":id,"toOperation":toOperation,"optype":optype},
            url: path+"/title/operate3",
            async: false,
            success:function(ret){
                if(ret.code==200){
                    location.reload();
                }
            }
        });
    }
});
