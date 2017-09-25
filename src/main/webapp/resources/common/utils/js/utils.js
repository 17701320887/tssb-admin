/**
 * 工具类
 */
var HttpUtil;
HttpUtil = {
      success_code:"200",
      error_code:"500",
    auth_error_code:"401"
};


var duiaAlterColor;
duiaAlterColor={
    green:"#7cdda7",
    blue:"#93cfe5",
    yellow:"#ffead0",
    red:"#f8b2b2"
}
/*手机验证*/
function IsMoble(num) {
      var phone = num || 0;
      phone = $.trim(phone);
      var Format = /^1[3,4,5,7,8]\d{9}$/;
      var Is = Format.test(phone) ? true : false;
      return Is;
}

/*email验证*/
function IsEmail(str) {
      if (str.indexOf("@") < 1 || str.indexOf(".") < 1) {
            return false;
      }
      var reg = /^([a-zA-Z0-9]+[-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (reg.test(str)) {
            return true;
      } else {
            return false;
      }
}
/*263对啊邮箱验证*/
function IsDuiaEmail(str){
      if(IsEmail(str)){
            var emailArr = str.split("@");
            if(emailArr == null || emailArr.length!=2){
                  return false;
            }else if(emailArr[1]!="duia.com"){
                  return false;
            }else{
                  return true;
            }

      }
}


function ExceptionDialog(data) {
    var flag = true;

    if(null != data && null != data.code){
        if (data.code == HttpUtil.error_code) { //500 错误
            var message = data.msg;//异常信息
            var excepitonDialog = BootstrapDialog.confirm({
                title: '系统异常',
                message: message,
                type: BootstrapDialog.TYPE_DANGER,
                closable: true,
                btnCancelLabel: '取消',
                btnOKLabel: '确认',
                btnOKClass: 'btn-danger',
                callback: function (result) {
                    if (result) {
                        excepitonDialog.close();
                        flag =  false;
                    }
                }
            });
            flag =  false;
        }else if(data.code == HttpUtil.auth_error_code){  //401 权限 错误
            var message = data.msg;//异常信息
            var excepitonDialog = BootstrapDialog.confirm({
                title: '权限异常',
                message: message,
                type: BootstrapDialog.TYPE_DANGER,
                closable: true,
                btnCancelLabel: '取消',
                btnOKLabel: '确认',
                btnOKClass: 'btn-danger',
                callback: function (result) {
                    if (result) {
                        excepitonDialog.close();
                        flag = false;
                    }
                }
            });
            flag =  false;
        } else if (data.code == HttpUtil.success_code) {
           flag = true;
        }else{
            flag = true;
        }
   }
   return flag;
}

//公共清除弹框
var time=3;   //设置倒计次数
function cleanAlert(id,callback){   //自定义函数  callback为回调函数
    var timer = setTimeout('cleanAlert('+callback+')',800);  //设置的时间函数
    if(time>0){
       // time--;
    }
    else{
        $("#"+id).fadeOut(800);
        if(callback!=undefined) {
            callback.call(this);
        }
        clearTimeout(timer);
    }
}
//WARNING消息提示框
function warningMsg(msg){
    BootstrapDialog.alert({
        title: "消息提示",
        message: msg,
        type: BootstrapDialog.TYPE_WARNING
    });
}


/**
 * 将表单序列化为json对象
 * @param 表单的id
 * @returns {{}}
 */
function formToJson(form) {
    var result = {};
    var fieldArray = $('#' + form).serializeArray();
    for (var i = 0; i < fieldArray.length; i++) {
        var field = fieldArray[i];
        if (field.name in result) {
            result[field.name] += ',' + field.value;
        } else {
            result[field.name] = field.value;
        }
    }
    return result;
}
