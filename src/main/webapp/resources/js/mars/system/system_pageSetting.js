//定义一次对象
var skuObj = $("#skuList");//sku列表对象
var path = $("#path").val();//系统路径
var obj;
var saveBtnObj = $("#saveBtn");
$(document).ready(function () {
    //初始化
    getNewData(skuObj.find("option:selected").attr("value"));
    //保存
    $("#saveBtn").unbind().bind("click", function () {
        saveData();
    });
});



skuObj.unbind().bind("change", function () {
    getNewData(skuObj.find("option:selected").attr("value"));
});


//获取新数据
function getNewData(id) {
    if(id!=undefined || id!=null) {
        $.ajax({
            url: path + "/pageSetting/queryBySku?sku=" + id+"&pos=11&page=1",
            success: function (data) {
                $("#itemDiv").html(data);
            }
        });
    }
}


function saveData(){
    //弹窗的
    var flag=true;
    var sku = skuObj.find("option:selected").attr("value");
    var liveConfigArr = new Array();
    // 生成数据对象
    var json = {};
    var id = $("#liveConfig"+ 11 + "_id").val();
    var position = $("#liveConfig"+ 11 + "_position").val();
    var type = $("#liveConfig"+ 11 + "_type").val();
    var status =  $("input[name='liveConfig"+11+"_status']:checked").val();
    var textAlign =  $("input[name='textAlign"+11+"']:checked").val();
    // 图片
    var pic = $("#liveConfig"+ 11 + "_pic").val();
    if(pic == null || pic == ''){
        // $().toastmessage('showErrorToast',"图片未上传!");
        flag = false;
    }
    json["pic"] = (pic == '' ? null : pic);
    if(position != 11){ // 说明：sku首页图片只显示使用，其它不作使用
        // 弹出时间
        var pt = $("#liveConfig"+ 11 + "_pt").val();
        if(pt == null || pt == ''){
            // $().toastmessage('showErrorToast',$("#liveConfigForm_11").find("h4").html()+ "弹出时间不能为空!");
            flag = false;
        }
        // 点击效果
        var mode =  $("input[name='liveConfig"+11+"_mode']:checked").val();
        var link = $("#liveConfig"+ 11 + "_link").val();
        if(mode == 2){
            if(link == null || link == ''){
                // $().toastmessage('showErrorToast',$("#liveConfigForm_11").find("h4").html()+ "点击效果不能为空!");
                flag = false;
            }else if(link.substr(0,7).toUpperCase() != 'HTTP://'){
                link = "http://" + link;
            }
        }

        json["pt"] = (pt == '' ? null : pt);
        json["mode"] = (mode == '' ? null : mode);
        json["link"] = (link == '' ? null : link);
    }
    json["textAlign"] = ((textAlign == '' || textAlign==undefined) ? null : textAlign);
    json["id"] = (id == '' ?  null : id) ;
    json["position"] = (position == '' ? null : position);
    json["type"] = (type == '' ? null : type);
    json["sku"] = (sku == '' ? null : sku);
    json["status"] = (status == '' ? null : status);
    liveConfigArr.push(JSON.stringify(json));

    //视频播放页参数配置
    var forumVal = $("#forum").val();
    var questionVal =  $("#question").val();
    var mobilePhoneVal = $("#mobilePhone").val();
    if( forumVal ==""){
        flag=false;
        $().toastmessage('showErrorToast',"论坛交流不能为空")
        return ;
    }
    if(questionVal==""){
        flag=false;
        $().toastmessage('showErrorToast',"在线题库不能为空")
        return ;
    }
    if(mobilePhoneVal==""){
        flag=false;
        $().toastmessage('showErrorToast',"手机听课不能为空")
        return ;
    }
    var data = {
        id: skuObj.find("option:selected").attr("value"),
        forum: forumVal,
        question: questionVal,
        mobilePhone: mobilePhoneVal,
        videoQqKey: $("#videoQqKey").val(),
        liveDesc: $("#liveDesc").val()
    };
    if(!flag){
        $().toastmessage('showErrorToast',"有未填写的信息，请重新检查!");
        return;
    }
    saveBtnObj.attr('disabled',true);
    var url = path+"/pageSetting/update?skuId="+sku;
    $.post(url,{data:'{"list":['+liveConfigArr.toString()+'],"pageSet":'+JSON.stringify(data)+'}'},function(data){
        if(data=="success") {
            $().toastmessage('showSuccessToast', "修改成功!");
            getNewData(sku);
            saveBtnObj.attr('disabled',false);
        }else{
            $().toastmessage('showErrorToast', "修改失败!");
            getNewData(sku);
            saveBtnObj.attr('disabled',false);
        }
    });
}