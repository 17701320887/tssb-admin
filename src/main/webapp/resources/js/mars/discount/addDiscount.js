/**
 * Created by admin on 2016/11/5.
 */
var path = $("#path").val();
var discountForm = $("#discountForm");
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
//时间选择器
var nowDate = new Date().Format("yyyy-MM-dd");
var operTime = $("#operTime").daterangepicker({
    format: 'YYYY-MM-DD',//格式化日期
    showDropdowns: true,//显示年与月的选择框
    minDate: nowDate,//最小日期
    maxDate: "2020-12-31",//最大日期
    applyClass: 'btn-success',//应用按钮class
    cancelClass: 'btn-warning',//取消按钮class
    separator: "/",
    ranges: {
        '今天': [moment(), moment()]
        /*'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '一周内': [moment().subtract(7, 'days'), moment()],
        '30天内': [moment().subtract(30, 'days'), moment()],
        '本月': [moment().startOf('month'), moment().endOf('month')]
        '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]*/
    },
    locale: {
        applyLabel: '保存',
        cancelLabel: '取消',
        fromLabel: '起始时间',
        toLabel: '结束时间',
        customRangeLabel: '选择日期',
        daysOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
});
//选择取消按钮时
$("#operTime").on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
});
   //初始化sku
   skuChange();
$("#saveBtn").click(function(){
    if(formCheck()){
    }
    alert("游戏撒单位");
    return
})
//消除错误样式和错误信息
function formInit(){
    $(".has-error").each(function(i,d){
        $(d).removeClass("has-error has-feedback");
    })
    $("li[name=ErrorTip]").each(function(i,d){
        $(d).html("");
    })
}

//所有的校验
var type="";//优惠方式
var discount="";//折扣数额
var startDate="";//有效期开始时间
var endDate="";//有效期结束时间
var days="";//优惠券有效天数
var useCondition="";//有效条件0是无条件>0是天数限制
var periodJson="";
function formCheck(){
    formInit();
    //优惠券名称校验
    if($.trim(discountForm.find("#payDiscountName").val())==""){
        discountForm.find("#payDiscountName").parent().parent().addClass("has-error has-feedback");
        discountForm.find("#payDiscountName").parent().find("li").html("优惠券名称不能为空!");
        return false;
    }
    if($.trim(discountForm.find("#payDiscountName").val()).length>10){
        discountForm.find("#payDiscountName").parent().parent().addClass("has-error has-feedback");
        discountForm.find("#payDiscountName").parent().find("li").html("优惠券名称最多10个汉字!");
        return false;
    }
    //优惠方式是面额校验
    if(discountForm.find("#payDiscountTypeRadio1").is(':checked')){
        if($.trim(discountForm.find("#payDiscountType1").val())==""){
            discountForm.find("#payDiscountType1").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#payDiscountType1").parent().parent().parent().find("li").html("请输入面额!");
            return false;
        }
        if(!isdata($.trim(discountForm.find("#payDiscountType1").val()))){
            discountForm.find("#payDiscountType1").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#payDiscountType1").parent().parent().parent().find("li").html("请输入正确的金额数字!");
            return false;
        }
        if($.trim(discountForm.find("#payDiscountType1").val()) < 0 || $.trim(discountForm.find("#payDiscountType1").val()) > 10000){
            discountForm.find("#payDiscountType1").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#payDiscountType1").parent().parent().parent().find("li").html("面额要求是0-10000!");
            return false;
        }
        type=discountForm.find("#payDiscountTypeRadio1").val();
        discount=discountForm.find("#payDiscountType1").val();
    }
    //优惠方式是折扣校验
    if(discountForm.find("#payDiscountTypeRadio2").is(':checked')){
        if($.trim(discountForm.find("#payDiscountType2").val())==""){
            discountForm.find("#payDiscountType2").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#payDiscountType2").parent().parent().parent().find("li").html("请输入折扣!");
            return false;
        }
        if(Number($.trim(discountForm.find("#payDiscountType2").val()))< 5 || Number($.trim(discountForm.find("#payDiscountType2").val()))>10){
            discountForm.find("#payDiscountType2").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#payDiscountType2").parent().parent().parent().find("li").html("请输入5至10之间的数字!");
            return false;
        }

        if(!checkMoneyFormat(Number($.trim(discountForm.find("#payDiscountType2").val())))){
            discountForm.find("#payDiscountType2").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#payDiscountType2").parent().parent().parent().find("li").html("折扣是数字而且要保留一位小数!");
            return false;
        }
        type=discountForm.find("#payDiscountTypeRadio2").val();
        discount=discountForm.find("#payDiscountType2").val();
    }

    //折扣校验保留一位小数
    function checkMoneyFormat(val){
        var reg = /^(\d|10)(\.\d)?$/;
        var isMoneyFormatRight = reg.test(val);
        return isMoneyFormatRight;
    }

    //数量校验
    if($.trim(discountForm.find("#payDiscountNum").val())==""){
        discountForm.find("#payDiscountNum").parent().parent().addClass("has-error has-feedback");
        discountForm.find("#payDiscountNum").parent().find("li").html("请输入数量!");
        return false;
    }
    if(Number($.trim(discountForm.find("#payDiscountNum").val()))<1 || Number($.trim(discountForm.find("#payDiscountNum").val()))>10000){
        discountForm.find("#payDiscountNum").parent().parent().addClass("has-error has-feedback");
        discountForm.find("#payDiscountNum").parent().find("li").html("请输入1至10000之间的整数!");
        return false;
    }

    //有效期校验
    if($("input[name='validityDateType']:checked").val()=="1"){
        if($.trim(discountForm.find("#operTime").val())==""){
            discountForm.find("#operTime").parent().parent().addClass("has-error has-feedback");
            discountForm.find("#validityDateTypeErrorTip").html("请填写有效期!");
            return false;
        }
        var dateArray=new Array();
        dateArray=discountForm.find("#operTime").val().split("/");
        startDate=dateArray[0];
        endDate=dateArray[1];
        var compareValidityTime=(Date.parse(endDate)-Date.parse(startDate))/86400000-365;
        if(compareValidityTime>0){
            discountForm.find("#operTime").parent().parent().addClass("has-error has-feedback");
            discountForm.find("#validityDateTypeErrorTip").html("有效时间在1-365天!");
            return false;
        }
        //discountForm.find("#payDiscountAfterDate").val("0");//是否需要加
    }

    //有效期验证在领取后多少天
    if($("input[name='validityDateType']:checked").val()=="2"){
        if($.trim(discountForm.find("#payDiscountAfterDate").val())==""){
                discountForm.find("#payDiscountAfterDate").parent().parent().addClass("has-error has-feedback");
                discountForm.find("#validityDateTypeErrorTip").html("请输入天数!");
                return false;
        }
        if(!isdata($.trim(discountForm.find("#payDiscountAfterDate").val()))){
            discountForm.find("#payDiscountAfterDate").parent().parent().addClass("has-error has-feedback");
            discountForm.find("#validityDateTypeErrorTip").html("请输入数字!");
            return false;
        }
        if(discountForm.find("#payDiscountAfterDate").val() < 1 || discountForm.find("#payDiscountAfterDate").val()>365){
            discountForm.find("#payDiscountAfterDate").parent().parent().addClass("has-error has-feedback");
            discountForm.find("#validityDateTypeErrorTip").html("有效时间在1-365天!");
            return false;
        }
    }

    //使用条件校验
    if($("input[name='useCondition']:checked").val()=="1"){
        //0是无条件限制
        discountForm.find("#payDiscountUseDay").val("0");
    }
    if($("input[name='useCondition']:checked").val()=="2"){
        if($.trim(discountForm.find("#payDiscountUseDay").val())==""){
            discountForm.find("#payDiscountUseDay").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#useConditionErrorTip").html("请填写单笔订单!");
            return false;
        }
        if(Number($.trim(discountForm.find("#payDiscountUseDay").val()))<1 || Number($.trim(discountForm.find("#payDiscountUseDay").val()))>100000){
            discountForm.find("#payDiscountUseDay").parent().parent().parent().parent().addClass("has-error has-feedback");
            discountForm.find("#useConditionErrorTip").html("单笔订单金额限制1-100000!");
            return false;
        }
        useCondition=discountForm.find("#payDiscountUseDay").val();
    }
    //分期校验
    var classTypeId = $("#classTypeId").val();
    if(classTypeId=='fq'||classTypeId=='sjfq'){
        //分期金额校验
        var money1=$("#erPeriodMoney").val();
        if($.trim(money1)==""){
            $("#fenQiErrorTip").html("金额不能为空!");
            return false;
        }
        if(Number($.trim(money1))<100 || Number($.trim(money1)>100000)){
            $("#fenQiErrorTip").html("金额限制100-100000!");
            return false;
        }
        if($('input[name="fenqiNumber"]:checked').val()==3){
            var money2=$("#sanPeriodMoney").val();
            if($.trim(money2)==""){
                $("#fenQiErrorTip").html("金额不能为空!");
                return false;
            }
            if(Number($.trim(money2))<100 || Number($.trim(money2)>100000)){
                $("#fenQiErrorTip").html("金额限制100-100000!");
                return false;
            }
        }
        //分期时间校验
        var beginTime = new Date();
        var erPeriodDate =$("#erPeriodDate").val();
        var sanPeriodDate =$("#sanPeriodDate").val();
        var compareTime=0;
        var fenqitime=0;
        if($('input[name="fenqiNumber"]:checked').val()==3){
            //三期
            if(erPeriodDate=="" || sanPeriodDate==""){
                $("#fenQiErrorTip").html("二期和三期时间不能为空!");
                return false;
            }
            compareTime =(Date.parse(sanPeriodDate)-Date.parse(beginTime))/86400000-30;
            fenqitime = (Date.parse(sanPeriodDate)-Date.parse(erPeriodDate));
        }else{
            //二期
            if(erPeriodDate==""){
                $("#fenQiErrorTip").html("二期时间不能为空!");
                return false;
            }
            compareTime =(Date.parse(erPeriodDate)-Date.parse(beginTime))/86400000-30;
        }
        if(compareTime>0){
            $("#fenQiErrorTip").html("分期时间不得超过优惠券有效期起始日期之后30天!");
            return false;
        }
        if(fenqitime<0){
            $("#fenQiErrorTip").html("分期三期时间不得小于二期时间!");
            return false;
        }
    }

    //分期数据组织成json
    var classTypeId= $("#classTypeId").val();
    if(classTypeId=='fq'||classTypeId=='sjfq'){
        var feiqi={};
        feiqi.fq=2;
        var period=new Array();
        var curObj1={};
        curObj1.count=1;
        curObj1.periodMoney=$("#erPeriodMoney").val();
        curObj1.periodDate="";
        period.push(curObj1);
        var curObj2={};
        curObj2.count=2;
        if($('input[name="fenqiNumber"]:checked').val()==3){
            curObj2.periodMoney=$("#sanPeriodMoney").val();
        }else{
            curObj2.periodMoney="";
        }
        curObj2.periodDate=$("#erPeriodDate").val();
        period.push(curObj2);
        if($('input[name="fenqiNumber"]:checked').val()==3){
            var json = {};
            json.count=3;
            feiqi.fq=3;
            json.periodMoney="";
            json.periodDate=$("#sanPeriodDate").val();
            period.push(json);
        }
        feiqi.shuju=period;
        periodJson=jsonUtil.JSONstringify(feiqi);

    }
    if(classTypeId!='cx'){
        if($("#payDiscountSku").val()==0){

            discountForm.find("#payDiscountSku").parent().parent().addClass("has-error has-feedback");
            discountForm.find("#payDiscountSku").parent().find("li").html("请选择SKU!");
            return false;
        }
    }
    return true;}
//保存新增优惠券
$("#addPayDiscount_b").click(function(){
    if(formCheck()){
        var datas = {"name":$.trim(discountForm.find("#payDiscountName").val()),"type":type,"discount":$.trim(discount),"num":$.trim(discountForm.find("#payDiscountNum").val()),"validityDateType":$("input[name='validityDateType']:checked").val(),"startDate":startDate,"endDate":endDate,"days":$.trim(discountForm.find("#payDiscountAfterDate").val()),
            "useCondition":$.trim(discountForm.find("#payDiscountUseDay").val()),"skuId":discountForm.find("#payDiscountSku").val(),"commodId":discountForm.find("#payDiscountCommod").val(),"discountType":discountForm.find("#classTypeId").val(),"period":periodJson}
            $.ajax({
                url:path+"/payDiscount/saveDiscount",
                type:"post",
                cache: false,
                data :datas,
                success: function (result){
                    if(result=="success"){
                        window.location.href=path+"/payDiscount/list/0";
                    }
                }
            })
    }
})
//分期显示或隐藏
$("#classTypeId").change(function(){
    var classTypeId = $(this).val();
    if(classTypeId=='cx'){
        $("#payDiscountTypeRadio1").attr("disabled",true);
        $("#payDiscountTypeRadio2").attr("disabled",true);
        $("#payDiscountType1").attr("disabled",true);
        $("#payDiscountType2").attr("disabled",true);
        $("#payDiscountType1").val(0);
        $("#payDiscountSku").attr("disabled",true);
        $("#payDiscountCommod").attr("disabled",true);
    }else{
        $("#payDiscountTypeRadio1").attr("disabled",false);
        $("#payDiscountTypeRadio2").attr("disabled",false);
        $("#payDiscountType1").attr("disabled",false);
        $("#payDiscountType2").attr("disabled",false);
        $("#payDiscountType1").val("");
        $("#payDiscountSku").attr("disabled",false);
        $("#payDiscountCommod").attr("disabled",false);
    }
    if(classTypeId=='fq'||classTypeId=='sjfq'){
        $("#fenQiId").show();
    }else{
        $("#fenQiId").hide();
    }
});
//是分2期还是分3期
$("input[name='fenqiNumber']").click(function(){
    if($('input[name="fenqiNumber"]:checked').val()==3){
        $("#fenQiId").show();
        $("#sanqiPay").show();
        $("#sanqiPayTime").show();
        $("#sanqiPayTime").show();
    }else{
        $("#sanqiPay").hide();
        $("#sanqiPayTime").hide();
    }
});

//通过sku获取商品信息
function skuChange(){
    var skuId = $("#payDiscountSku").val();
    var url = path+"/payDiscount/commodity"
    var data = {"skuId":skuId};
    $.post(url,data,function(data){
        if(data!=null&&data.length>0){
            $("#payDiscountCommod").empty();
            $("#payDiscountCommod").append($("<option value=''>无(不做限制)</option>"))
            for(var i = 0;i<data.length;i++){
                var option =  $("<option value="+data[i].id+">"+data[i].name+"</option>");
                $("#payDiscountCommod").append(option);
            }
        }
    })
}

//时间格式化
var newDate = new Date();
var erPeriodDate = $("#erPeriodDate").datetimepicker({
    language:  'zh-CN',
    format: 'yyyy-mm-dd',//格式化日期
    startDate: newDate,//最小日期
    endDate: "2099-12-31",//最大日期
    weekStart: 1,
    todayBtn:  true,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});

//时间格式化
var sanPeriodDate = $("#sanPeriodDate").datetimepicker({
    language:  'zh-CN',
    format: 'yyyy-mm-dd',//格式化日期
    startDate: newDate,//最小日期
    endDate: "2099-12-31",//最大日期
    weekStart: 1,
    todayBtn:  true,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});
// 是否为整形
function isdata(s){
    var patrn=/^[0-9]{1,20}$/;
    if (!patrn.exec(s)) return false;
    return true;
}
// 是否为double类型
function isDouble (str){
    var reg = /^\-?([1-9]\d*|0)\.\d+$/;
    if( reg.test(str) ){
        return true;
    }return false;
}

//正数和两位小数
function checkPrice (str){
    var reg = /^\d+(\.\d{1,2})?$/;
    if( reg.test(str) ){
        return true;
    }return false;
}

var jsonUtil = {
    JSONstringify:function(Json){
        if($.browser.msie){
            if($.browser.version=="7.0"||$.browser.version=="6.0"){
                var result=jsonUtil.toJSONString(Json);
            }else{
                var result=JSON.stringify(Json);
            }
        }else{
            var result=JSON.stringify(Json);
        }
        return result;
    },
    evalJSON : function(strJson) {
        return eval("(" + strJson + ")");
    },
    toJSONString : function(object) {
        var type = typeof object;
        if ('object' == type) {
            if (Array == object.constructor)
                type = 'array';
            else if (RegExp == object.constructor)
                type = 'regexp';
            else
                type = 'object';
        }
        switch (type) {
            case 'undefined' :
            case 'unknown' :
                return;
                break;
            case 'function' :
            case 'boolean' :
            case 'regexp' :
                return object.toString();
                break;
            case 'number' :
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string' :
                return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
                        var a = arguments[0];
                        return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
                    }) + '"';
                break;
            case 'object' :
                if (object === null)
                    return 'null';
                var results = [];
                for (var property in object) {
                    var value = jsonUtil.toJSONString(object[property]);
                    if (value !== undefined)
                        results.push(jsonUtil.toJSONString(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array' :
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value =  jsonUtil.toJSONString(object[i]);
                    if (value !== undefined)
                        results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    }
}