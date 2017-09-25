//定义一次对象
var skuObj = $("#skuList");
var path = $("#path").val();
var saveBtnObj = $("#saveBtn");

$(document).ready(function () {
    //初始化
    getNewData(skuObj.find("option:selected").attr("value"));
    //保存
    saveBtnObj.on("click", function () {
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
            url: path + "/sysLiveConfig/queryBySku?sku=" + id + "&pos=0&page=0",
            success: function (data) {
                $("#itemDiv").html(data);
            }
        });
    }
}


function saveData(){
    var flag=true;
    var sku = skuObj.find("option:selected").attr("value");
    var liveConfigArr = new Array();
    // 生成数据对象
    $("form[id^='liveConfigForm_']").each(function(n,b){
        if(n<10){
            var json = {};
            var id = $("#liveConfig"+ (n + 1) + "_id").val();
            var position = $("#liveConfig"+ (n + 1) + "_position").val();
            var type = $("#liveConfig"+ (n + 1) + "_type").val();
            var status =  $("input[name='liveConfig"+(n + 1)+"_status']:checked").val();
            var textAlign =  $("input[name='textAlign"+(n+1)+"']:checked").val();
            //启用状态

                if(type == 1){
                    // 图片
                    var pic = $("#liveConfig"+ (n + 1) + "_pic").val();
                    if(pic == null || pic == ''){
                        //$().toastmessage('showErrorToast',$("#liveConfigForm_"+(n+1)).find("h4").html()+ "图片未上传!");
                        flag = false;
                    }
                    json["pic"] = (pic == '' ? null : pic);
                    if(position != 11){ // 说明：sku首页图片只显示使用，其它不作使用
                        // 弹出时间
                        var pt = $("#liveConfig"+ (n + 1) + "_pt").val();
                        if(pt == null || pt == ''){
                            //$().toastmessage('showErrorToast',$("#liveConfigForm_"+(n+1)).find("h4").html()+ "弹出时间不能为空!");
                            flag = false;
                        }
                        // 点击效果
                        var mode =  $("input[name='liveConfig"+(n + 1)+"_mode']:checked").val();
                        var link = $("#liveConfig"+ (n + 1) + "_link").val();
                        if(mode == 2){
                            if(link == null || link == ''){
                                //$().toastmessage('showErrorToast',$("#liveConfigForm_"+(n+1)).find("h4").html()+ "点击效果不能为空!");
                                flag = false;
                            }else if(link.substr(0,7).toUpperCase() != 'HTTP://'){
                                link = "http://" + link;
                            }
                        }

                        json["pt"] = (pt == '' ? null : pt);
                        json["mode"] = (mode == '' ? null : mode);
                        json["link"] = (link == '' ? null : link);
                    }
                }else if(type == 2){
                    var tflag =  $("input[name='liveConfig"+(n + 1)+"_tflag']:checked").val();
                    var tip = $("#liveConfig"+ (n + 1) + "_tip").val();
                    if(tflag == 1){
                        if(tip == null || tip == ''){
                            //$().toastmessage('showErrorToast',$("#liveConfigForm_"+(n+1)).find("h4").html()+ "文本内容不能为空!");
                            flag = false;
                        }
                    }
                    // 点击效果
                    var link = $("#liveConfig"+ (n + 1) + "_link").val();
                    var mode =  $("input[name='liveConfig"+(n + 1)+"_mode']:checked").val();
                    if(mode == 2){
                        if(link == null || link == ''){
                            //$().toastmessage('showErrorToast',$("#liveConfigForm_"+(n+1)).find("h4").html()+ "点击效果不能为空!");
                            flag = false;
                        }else if(link.substr(0,7).toUpperCase() != 'HTTP://'){
                            link = "http://" + link;
                        }
                    }

                    json["tip"] = (tip == '' ? null : tip);
                    json["mode"] = (mode == '' ? null : mode);
                    json["link"] = (link == '' ? null : link);
                    json["tflag"] = (tflag == '' ? null : tflag);
                }
                json["textAlign"] = ((textAlign == '' || textAlign==undefined) ? null : textAlign);
                json["id"] = (id == '' ?  null : id) ;
                json["position"] = (position == '' ? null : position);
                json["type"] = (type == '' ? null : type);
                json["sku"] = (sku == '' ? null : sku);
                json["status"] = (status == '' ? null : status);

                liveConfigArr.push(JSON.stringify(json));
            }
    });
    if(!flag){
        $().toastmessage('showErrorToast',"有未填写的信息，请重新检查!");
        return;
    }
    saveBtnObj.attr('disabled',true);
    var url =  path+"/sysLiveConfig/update?skuId="+sku;
    $.post(url,{data:"[" +liveConfigArr.toString() +"]"},function(data){
        if(data=="success") {
            $().toastmessage('showSuccessToast', "修改成功!");
            saveBtnObj.attr('disabled',false);
            getNewData(sku);
        }else{
            $().toastmessage('showErrorToast', "修改失败!");
            saveBtnObj.attr('disabled',false);
            getNewData(sku);
        }
    });
}
