var path = $("#path").val();
var depId =0;
var grpId =0;
var authorityUser="";

//查询按钮点击 orderState==0 待提交查询 其余为已提交查询
function clickFind(type){
    getDepAndGrpInfo();
    if(type==0){
        daitijiaoTable.ajax.reload();
    }else{
        daishenhe_tableTable.ajax.reload();
    }
    butongguoCount();
}

//获取部门以及小组下拉选择框
function getDepAndGrpInfo(){
    depId = $("#operDep option:selected").val();
    grpId = $("#operGrp option:selected").val();
}

//不通过数量查询
function butongguoCount(){
    $.ajax({
        url:path+"/payOrder/find_noPass_number",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"depId":depId,"grpId":grpId},
        success: function (datas){
            if(datas.result!=""&&datas.result!=null){
                $("#butongguoNumber").addClass("label label-theme m-l-5");
                $("#butongguoNumber").html(datas.result);
            }

        }
    })
}

//获取付款方式查询
function getPayTypes(typeCode,type){
    var obj;
    if(type==1){
        obj =document.getElementById('update_pay_type_1');
        obj.options.length=0;
    }else if(type==3){
        obj =document.getElementById('update_pay_type_3');
        obj.options.length=0;
    }else if(type==0){
        obj =document.getElementById('payType');
        obj.options.length=0;
        obj.add(new Option("全部",""));
    }
    $.ajax({
        url:path+"/payType/search",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{},
        success: function (datas){
            for(var i=0;i<datas.result.length;i++){
                var entity=datas.result[i];
                if(type==3){
                    if(entity.typeCode!="pay_type_jddp"&&entity.typeCode!="pay_type_byfq"){
                        obj.add(new Option(entity.typeName,entity.typeCode));
                    }
                }else{
                    if( $.trim(typeCode)==$.trim(entity.typeCode)){
                        obj.add(new Option(entity.typeName,entity.typeCode));
                        obj.options[i].selected=true;
                    }else{
                        obj.add(new Option(entity.typeName,entity.typeCode));
                    }
                }
            }
        }
    });
}

//验证手机号格式是否正确
function checkMobile(mobile){
    var flag=false;
    if(mobile==""||mobile==null){
        return flag;
    }else{
        var phone = mobile || 0;
        phone = $.trim(phone);
        var Format = /^1[3,4,5,7,8]\d{9}$/;
        flag = Format.test(phone) ? true : false;
        return flag;
    }
}
//验证qq号是否为3 - 15位数字
function checkQQ(qq){
    var flag=false;
    var Format=/^\d{3,15}$/;
    flag = Format.test(qq) ? true : false;
    return flag;
}

//格式化列表中的付款方式
function formatPayType(data){
    if (data.indexOf("pay_type_zfbhk") >= 0) {
        return "支付宝汇款";
    } else if (data.indexOf("pay_type_wxsm") >= 0) {
        return "微信扫码支付";
    } else if (data.indexOf("pay_type_tbdp") >= 0) {
        return "淘宝店铺";
    } else if (data.indexOf("pay_type_zfb") >= 0) {
        return "支付宝";
    } else if (data.indexOf("pay_type_jddp") >= 0) {
        return "京东店铺";
    } else if (data.indexOf("pay_type_kjzf") >= 0) {
        return "快捷支付";
    } else if (data.indexOf("pay_type_tbhk") >= 0) {
        return "淘宝汇款";
    } else if (data.indexOf("pay_type_tenpay") >= 0) {
        return "财付通";
    } else if (data.indexOf("pay_type_hk") >= 0) {
        return "银行汇款";
    } else if (data.indexOf("pay_type_wxsm") >= 0) {
        return "微信扫码支付";
    } else if (data.indexOf("pay_type_yyzf") >= 0) {
        return "语音支付";
    } else if (data.indexOf("pay_type_wxxd") >= 0) {
        return "微信小店";
    } else if (data.indexOf("pay_type_wxzf") >= 0) {
        return "APP微信支付";
    } else if (data.indexOf("pay_type_ios") >= 0) {
        return "苹果支付";
    } else if (data.indexOf("pay_type_yzf_bank") >= 0) {
        return "网上银行";
    } else if (data.indexOf("pay_type_kq") >= 0) {
        return "快钱";
    } else if (data.indexOf("pay_type_yhfk") >= 0) {
        return "银行付款";
    } else if (data.indexOf("pay_type_cod") >= 0) {
        return "货到付款";
    } else if (data.indexOf("pay_type_byfq") >= 0) {
        return "北银分期";
    }  else if (data.indexOf("pay_type_kfyr") >= 0) {
        return "咖啡易融";
    } else if (data.indexOf("pay_type_ybfq") >= 0) {
        return "有贝分期";
    } else if (data.indexOf("pay_type_jd") >= 0) {
        return "京东支付";
    } else if (data.indexOf("pay_type_wxgzh") >= 0) {
        return "微信公众号";
    }else {
        return "-";
    }
}
