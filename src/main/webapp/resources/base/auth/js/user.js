var path = $("#path").val();
var userForm = $("#userForm");
var updateUserForm = $("#updateUserForm");
var setSwitch =  $("#sex").bootstrapSwitch();
var updateSetSwitch =  $("#update_sex").bootstrapSwitch();
var statusSwitch = $("#status").bootstrapSwitch();
//保存用户
$("#saveUser").click(function(){
    if(formCheck()){
        var parm =  {"email":$("#email").val()};
        if(checkEmail(parm)){
            var sex = setSwitch.bootstrapSwitch("onText");
            if(!setSwitch.bootstrapSwitch("state")){
                sex = setSwitch.bootstrapSwitch("offText");
            }
            var datas = {"username":$.trim($("#name").val()),"mobile":$.trim($("#mobile").val()),"email":$.trim($("#email").val()),"sex":sex,
                "num":$.trim($("#num").val()),"bigImg":"temp/duia.png","smallImg":"temp/duia.png"}
            $.ajax({
                url:path+"/user/save",
                type:"post",
                dataType:"json",
                cache: false,
                data :datas,
                success: function (datas){
                    if(datas.code=="501")
                    {
                        $().toastmessage('showErrorToast', datas.msg);
                        return;
                    }
                    if(ExceptionDialog(datas)){
                        userForm.find("#email").val("");
                        userForm.find("#mobile").val("");
                        userForm.find("#name").val("");
                        userForm.find("#num").val("");
                        userForm.find("#sex").prop("checked",true);
                        setSwitch.bootstrapSwitch("state",true);
                        userTable.ajax.reload();//刷新
                        $("#close").click();
                        $("#success_alert").fadeIn(800, cleanAlert());
                    }
                }
            })
        }else{
            userForm.find("#email").parent().parent().addClass("has-error has-feedback");
            userForm.find("#email").parent().find("li").html("邮箱已经存在!");
        }
    }

})

//修改用户
$("#update_saveUser").click(function(){
    if(updateformCheck()){
        var parm =  {"email":$("#update_email").val(),"id":updateUserForm.find("#userId").val()};
        if(checkEmail(parm)){
            var sex = updateSetSwitch.bootstrapSwitch("onText");
            if(!updateSetSwitch.bootstrapSwitch("state")){
                sex = updateSetSwitch.bootstrapSwitch("offText");
            }
            var status = 1;//默认在职
            if(!statusSwitch.bootstrapSwitch("state")){
                status = 0;//离职
            }
            var datas = {"id":updateUserForm.find("#userId").val(),"username":$("#update_name").val(),"mobile":$("#update_mobile").val(),
                "email":$("#update_email").val(),"sex":sex, "num":$("#update_num").val(),"userStatus":status}
            $.ajax({
                url:path+"/user/update",
                type:"post",
                dataType:"json",
                cache: false,
                data :datas,
                success: function (datas){

                    if(datas.code=="501")
                    {
                        $().toastmessage('showErrorToast', "工号重复");
                        return;
                    }
                    if(ExceptionDialog(datas)){
                        userTable.ajax.reload(null,false);//刷新
                        $("#update_close").click();
                        $("#success_alert").fadeIn(800, cleanAlert());
                    }
                }
            })
        }else{
            updateUserForm.find("#update_email").parent().parent().addClass("has-error has-feedback");
            updateUserForm.find("#update_email").parent().find("li").html("邮箱已经存在");
        }
    }
})


//验证Email是否唯一
function checkEmail(data){
    var flag = false;
    $.ajax({
        url:path+"/user/check/userEmail",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :data,
        success: function (datas){
            if(datas.code == HttpUtil.success_code){
                flag =  true;
            }
        }
    })
    return flag;
}



function formInit(){
    $(".has-error").each(function(i,d){
        $(d).removeClass("has-error has-feedback");
    })
    $("li[name=ErrorTip]").each(function(i,d){
        $(d).html("");
    })
}


function formCheck(){
    formInit();
    if($.trim(userForm.find("#email").val())==""){
        userForm.find("#email").parent().parent().addClass("has-error has-feedback");
        userForm.find("#email").parent().find("li").html("邮箱名称不能为空!");
        return false;
    }

    if(!IsDuiaEmail(userForm.find("#email").val())){
        userForm.find("#email").parent().parent().addClass("has-error has-feedback");
        userForm.find("#email").parent().find("li").html("请填写对啊网员工邮箱!");
        return false;
    }

    if($.trim(userForm.find("#mobile").val())==""){
        userForm.find("#mobile").parent().parent().addClass("has-error has-feedback");
        userForm.find("#mobile").parent().find("li").html("手机不能为空!");
        return false;
    }


    if(!IsMoble(userForm.find("#mobile").val())){
        userForm.find("#mobile").parent().parent().addClass("has-error has-feedback");
        userForm.find("#mobile").parent().find("li").html("请填写正确的手机号!");
        return false;
    }

    if($.trim(userForm.find("#name").val())==""){
        userForm.find("#name").parent().parent().addClass("has-error has-feedback");
        userForm.find("#name").parent().find("li").html("姓名不能为空!");
        return false;
    }

    if($.trim(userForm.find("#num").val())==""){
        userForm.find("#num").parent().parent().addClass("has-error has-feedback");
        userForm.find("#num").parent().find("li").html("工号不能为空!");
        return false;
    }


    return true;
}





function updateformCheck(){
    formInit();
    if($.trim(updateUserForm.find("#update_email").val())==""){
        updateUserForm.find("#update_email").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_email").parent().find("li").html("邮箱名称不能为空!");
        return false;
    }

    if(!IsDuiaEmail(updateUserForm.find("#update_email").val())){
        updateUserForm.find("#update_email").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_email").parent().find("li").html("请填写对啊网员工邮箱!");
        return false;
    }

    if($.trim(updateUserForm.find("#update_mobile").val())==""){
        updateUserForm.find("#update_mobile").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_mobile").parent().find("li").html("手机不能为空!");
        return false;
    }


    if(!IsMoble(updateUserForm.find("#update_mobile").val())){
        updateUserForm.find("#update_mobile").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_mobile").parent().find("li").html("请填写正确的手机号!");
        return false;
    }

    if($.trim(updateUserForm.find("#update_name").val())==""){
        updateUserForm.find("#update_name").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_name").parent().find("li").html("姓名不能为空!");
        return false;
    }

    if($.trim(updateUserForm.find("#update_num").val())==""){
        updateUserForm.find("#update_num").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_num").parent().find("li").html("工号不能为空!");
        return false;
    }


    return true;
}



//时间选择器
var createDate =  $("#createDate").daterangepicker({
    format:'YYYY-MM-DD',//格式化日期
    showDropdowns:true,//显示年与月的选择框
    minDate:"2010-01-01",//最小日期
    maxDate:"2020-12-31",//最大日期
    applyClass: 'btn-success',//应用按钮class
    cancelClass: 'btn-warning',//取消按钮class
    separator:"/",
    ranges: {
        '今天': [moment(), moment()],
        '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '一周内': [moment().subtract(7, 'days'), moment()],
        '30天内': [moment().subtract(30, 'days'), moment()],
        '本月': [moment().startOf('month'), moment().endOf('month')],
        '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    locale: {
        applyLabel: '保存',
        cancelLabel: '取消',
        fromLabel: '起始时间',
        toLabel: '结束时间',
        customRangeLabel: '选择日期',
        daysOfWeek: ['周日','周一', '周二', '周三', '周四', '周五', '周六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
});
//选择取消按钮时
$("#createDate").on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});
//锁定用户
function lockUser(obj){
    var status = $(obj).attr("status");//当前状态,1正常,0锁定
    var userId = $(obj).val();//用户ID
    var message = status == 1?"是否要锁定用户?":"是否要解锁用户?";
    var data ;
    BootstrapDialog.confirm({
        title: '用户锁定',
        message: message,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        btnCancelLabel: '取消',
        btnOKLabel: '确认',
        btnOKClass: 'btn-warning',
        callback: function (result) {
            if (result) {
                if (status == 1) {
                    //锁定用户
                    data = {"id": userId, "userLock": 0}
                } else {
                    //解锁用户
                    data = {"id": userId, "userLock": 1}
                }
                $.ajax({
                    url: path + "/user/lock",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    async: false,
                    data: data,
                    success: function (d) {
                        if (ExceptionDialog(d)) {
                            //重新加载下用户表格
                            userTable.ajax.reload(null,false);
                        }
                    }
                })
            }
        }
    })
}

//修改用户弹出框
function updateUserDialog(obj){
    formInit();
    $.ajax({
        url:path+"/user/entity",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"id":obj},
        success: function (datas){
            if(ExceptionDialog(datas)){
                var result = datas.result;
                updateUserForm.find("#userId").val(result.id);
                updateUserForm.find("#update_email").val(result.email);
                updateUserForm.find("#update_mobile").val(result.mobile);
                updateUserForm.find("#update_name").val(result.username);
                updateUserForm.find("#update_num").val(result.num);
                if(result.sex == "女"){
                    updateUserForm.find("#update_sex").prop("checked",false);
                    updateSetSwitch.bootstrapSwitch("state",false);
                }else{
                    updateUserForm.find("#update_sex").prop("checked",true);
                    updateSetSwitch.bootstrapSwitch("state",true);
                }

                if(result.userStatus == 1){
                    //在职
                    updateUserForm.find("#status").prop("checked",true);
                    statusSwitch.bootstrapSwitch("state",true);
                }else{
                    //离职
                    updateUserForm.find("#status").prop("checked",false);
                    statusSwitch.bootstrapSwitch("state",false);
                }

                updateUserForm.find("#update_setState").text(result.sex);
                updateUserForm.find("#update_email").val(result.email);

            }
        }
    })
}
var time=5;
function cleanAlert(){   //自定义函数
       //设置倒计时时间
    setTimeout('cleanAlert()',800);  //设置的时间函数
    if(time>0){
        time--;
    }
    else{
        $(".alert").fadeOut(800);
    }
}

