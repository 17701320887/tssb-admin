//定义一次对象
var mgrKeyObj = $("#mgrKey");
var checkBoxObj = $("input[type=checkbox][name='video']");
var skuObj = $("#skuList");
var path = $("#path").val();
var saveBtnObj = $("#saveBtn");
var dataTemp = {};
$(document).ready(function () {
    //初始化
    //管家key和多选框
    bindValue();
    saveBtnObj.on("click", function () {
        saveBtnObj.attr('disabled',true);
        saveData();
    });
});

skuObj.unbind().bind("change", function(){
    bindValue();
});

function bindValue(){
    //先清除之前的选中
    checkBoxObj.removeAttr("checked");
    dataTemp = {};
    getNewData(skuObj.find("option:selected").attr("value"));
    //获取应该选中的
    if(dataTemp.vipSku!=null) {
        var list = dataTemp.vipSku.split(",");
        for(var i=0;i<list.length;i++) {
            //依次选中应勾上的选项
            checkBoxObj.each(function () {
                if ($(this).val() == list[i]) {
                    $(this).attr("checked",'true');
                }
            });
        }
    }

    mgrKeyObj.val(dataTemp.mgrKey);
}

//获取新数据
function getNewData(id){
    if(id!=undefined || id!=null) {
        $.ajax({
            url: path + "/systemDict/detail?skuId="+id,
            type: "get",
            dataType: "json",
            cache: false,
            async: false,
            data: null,
            success: function (datas) {
                if(ExceptionDialog(datas)){
                    dataTemp=datas.result;
                }
            }
        });
    }
}


//保存
function saveData(){
    var str = '';
    checkBoxObj.each(function(){
        if ($(this).is(":checked")) {
            str += $(this).val() + ",";
        }
    });
    var data = {
        "id": skuObj.val(),
        "vipSku": str.substr(0,str.length-1),
        "mgrKey":mgrKeyObj.val()
    };
    postData(data);
}

//发请求
function postData(data) {
    $.ajax({
        url: path + "/systemDict/update",
        type: "post",
        dataType: "json",
        cache: false,
        async: false,
        data: data,
        success: function (datas) {
            if(ExceptionDialog(datas)){
                $().toastmessage('showSuccessToast',"保存成功!");
            }
            saveBtnObj.attr('disabled',false);
        }
    })
}
