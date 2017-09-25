/**
 * Created by wangsongpeng on 2016/3/1.
 */
var operTitle = $("#operTitle");
var operForm = $("#operForm");
var operDiv = $("#operDiv");
//保存操作
$("#saveOper").click(function(){
    var id = operForm.find("#operId").val();
    var name = operForm.find('#name').val();
    var code = operForm.find('#code').val();
    var desc = operForm.find('#desc').val();
    var node = zTree.getSelectedNodes()[0];
    var treeId = node.id;
    var datas = {"id":id,"name":name,"code":code,"description":desc,"menuId":treeId}
    if(formCheck()){
        if(checkOperAttr(datas)){
            $.ajax({
                url:path+"/menu/su/oper",
                type:"post",
                dataType:"json",
                cache: false,
                async: false,
                data : datas,
                success: function (datas){
                    if(ExceptionDialog(datas)){
                        $("#closeOper").click();
                        nodeOnClick(null,node.id,node);
                    }
                }
            })
        }
    }
})

function updateDialog(obj){
    formInit();
    operTitle.html($(obj).html()+"操作详情");
    operForm.find("#name").val($(obj).html());
    operForm.find("#code").val($(obj).attr("code"));
    operForm.find("#desc").val($(obj).attr("desc"));
    operForm.find("#operId").val($(obj).attr("id"));
    operForm.find("#name").attr({"readOnly":true});
    operForm.find("#code").attr({"readOnly":true});
}

function newDialog(obj){
    formInit();
    operTitle.html("新增操作项");
    operForm.find("#operId").val("-1");
}




function formInit(){
    operForm.find("#name").val("");
    operForm.find("#code").val("");
    operForm.find("#desc").val("");
    operForm.find("#name").attr({"readOnly":false});
    operForm.find("#code").attr({"readOnly":false});
    operForm.find("#name").parent().parent().removeClass("has-error has-feedback");
    operForm.find("#code").parent().parent().removeClass("has-error has-feedback");
    $("li[name=operErrorTip]").each(function(i,d){
        $(d).html("");
    })
}

function formCheck(){
    $(".has-error").each(function(i,d){
        $(d).removeClass("has-error has-feedback");
    })
    $("li[name=operErrorTip]").each(function(i,d){
        $(d).html("");
    })
    if($.trim(operForm.find("#name").val())==""){
        operForm.find("#name").parent().parent().addClass("has-error has-feedback");
        operForm.find("#name").parent().find("li").html("操作名称不能为空!");
        return false;
    }
    if($.trim(operForm.find("#code").val())==""){
        operForm.find("#code").parent().parent().addClass("has-error has-feedback");
        operForm.find("#code").parent().find("li").html("操作代码不能为空!");
        return false;
    }

    if($.trim(operForm.find("#code").val())=="view"){
        operForm.find("#code").parent().parent().addClass("has-error has-feedback");
        operForm.find("#code").parent().find("li").html("操作代码不允许为view!");
        return false;
    }
    return true;
}



function checkOperAttr(data){
    var url = path+"/menu/check/oper"
    var flag = false;
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data : data ,
        success: function (d){
            if(ExceptionDialog(d)){
                if(d.code==200){
                    flag = true;
                }else{
                    var message = d.msg;//异常信息
                    BootstrapDialog.show({
                        title: '提示信息',
                        message: message
                    });
                    flag =  false;
                }
            }
        }
    })
    return flag;
}