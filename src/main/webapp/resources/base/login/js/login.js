var path;
$(function () {
    path = $("#path").val();
    var userInput = $("#user_input");/*用户名*/
    var pwdInput = $("#user_pwd");//密码
    var rem = $("#remember");//记住我
    var loginErrTip = $("#login_error_tip");//登录错误提示
    var userDivError = $("#user_div");//用户名Div提示
    var pwdDivError = $("#pwd_div");//密码Div提示
    var login_btn = $("#login_btn");//登录btn
    userInput.focus();

    /*回车登录*/
    $("body").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#login_btn").click();
        }
    })




    /*清空错误提示*/
    function clearErrorTip() {
        loginErrTip.html("");
        loginErrTip.hide();
        userDivError.removeClass("has-error");
        pwdDivError.removeClass("has-error");
    }


    /*登录验证非空*/
    function LoginisNotNull(username, pwd) {
        var flag = true;
        if ($.trim(username) == "") {
            loginErrTip.html("请填写用户名或密码!");
            loginErrTip.show();
            userDivError.addClass("has-error");
            flag = false;
        }
        if ($.trim(pwd) == "") {
            loginErrTip.html("请填写用户名或密码!");
            loginErrTip.show();
            pwdDivError.addClass("has-error");
            flag = false;
        }
        return flag;
    }


    $("#login_btn").bind("click",function(){
        var username = $.trim(userInput.val());
        var pwd = $.trim(pwdInput.val());
        var urls = $("#loginform").attr("action");
        var loginBtn = $(this);
        var isrem = $("#remember")[0].checked;
        var flag = true;
        clearErrorTip();
        if(LoginisNotNull(username,pwd)){
            if(flag){
                loginBtn.html("登录中,请稍后!");
                data = {"name": username, "password":pwd,"isrem":isrem};
                $.ajax({
                    url: urls,
                    type: "post",
                    dataType: "json",
                    data : data,
                    success: function (datas) {
                        console.log(datas);
                        loginBtn.html("登录");
                        if (datas == "200") {
                            window.location.href = path+"/system/userList";
                        } else{
                            loginErrTip.html(datas.message);
                            loginErrTip.show();
                        }
                    }
                })
            }
        }
    })


});
