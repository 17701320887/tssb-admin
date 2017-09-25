/**
 * Created by qiaolu on 2016/11/24.
 */
/*
* 此js为jquery-validate 补充方法用
* */

/*验证手机号*/
jQuery.validator.addMethod("isMobile", function (value, element) { // 手机号或座机
    return this.optional(element)
        || /(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^1[3578]\d{9}$)/
            .test(value);
}, "联系方式格式不正确");


// 验证值小数位数不能超过两位
jQuery.validator.addMethod("decimal", function(value, element) {
    var decimal = /^-?\d+(\.\d{1,2})?$/;
    return this.optional(element) || (decimal.test(value));
}, $.validator.format("小数位数不能超过两位!"));


//数字小数点
jQuery.validator.addMethod("alnum", function(value, element) {
    return this.optional(element) || /^[0-9\.]+$/.test(value);
}, "只能输入数字");

// 邮政编码验证
jQuery.validator.addMethod("zipCode", function(value, element) {

    var tel = /^[0-9]{6}$/;

    return this.optional(element) || (tel.test(value));

}, "邮政编码格式错误");



// QQ号码验证
jQuery.validator.addMethod("qq", function(value, element) {

    var tel = /^[1-9]\d{4,9}$/;

    return this.optional(element) || (tel.test(value));

}, "qq号码格式错误");



// IP地址验证
jQuery.validator.addMethod("ip", function(value, element) {

    var ip = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    return this.optional(element) || (ip.test(value) && (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256));

}, "Ip地址格式错误");



// 字母和数字的验证
jQuery.validator.addMethod("chrnum", function(value, element) {

    var chrnum = /^([a-zA-Z0-9]+)$/;

    return this.optional(element) || (chrnum.test(value));

}, "只能输入数字和字母(字符A-Z, a-z, 0-9)");



// 中文的验证
jQuery.validator.addMethod("chinese", function(value, element) {

    var chinese = /^[\u4e00-\u9fa5]+$/;

    return this.optional(element) || (chinese.test(value));

}, "只能输入中文");



// 下拉框验证
$.validator.addMethod("selectNone", function(value, element) {

    return value == "请选择";

}, "必须选择一项");



// 字节长度验证
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
    var length = value.length;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
            length++;
        }
    }
    return this.optional(element) || (length >= param[0] && length <= param[1]);
}, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));

function checkWordsNumber(idStr,sNum,eNum){
    var flag=false;
    var words=$("#"+idStr+"").val().length;
    if(sNum<=words&&words<=eNum){
        flag=true;
    }
    return flag;
}