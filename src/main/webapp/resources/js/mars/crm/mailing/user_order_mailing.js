/**
 * Created by qiaolu on 2016/11/23.
 */

(function() {
    var path = $("#path").val();
    var objFalg = false;//对象是否有值
    $(document).ready(function(){
        loadObj();
        loadList();//重载数据
    });

    //载入数据
    function loadObj(){
        var orderId = $("#orderId").val();
        var params = new Object();
        params["orderId"] = orderId;
        if(orderId==undefined || orderId==""){
            return;
        }
        $.ajax({url:path + "/userMailAddress/getObj",data:params,type:"POST",success:function(data){
            //把对象带回
            if(data!="") {
                $("#addrId").val(data.id);
                //展示页面
                $("#addressee").html(data.addressee);
                $("#mobile").html(data.mobile);
                $("#getQQNum").html(data.qqNum);
                var html = "";
                if(data.province!=null && data.province!="") {
                    html+=data.province+" ";
                }
                if(data.city!=null && data.city!="") {
                    html+=data.city+" ";
                }
                if(data.county!=null && data.county!="") {
                    html+=data.county+" ";
                }
                if(data.detailAddress!=null && data.detailAddress!="") {
                    html+=data.detailAddress;
                }
                $("#getAddress").html(html);
                //修改的模态窗口

                $('#toUser').val(data.addressee);
                $('#toPhone').val(data.mobile);
                $("#toQQNum").val(data.qqNum);
                setTimeout(function(){
                    $('#province2').val(data.province);
                    change2(1);
                    $('#city2').val(data.city);
                    change2(2);
                    $('#county2').val(data.county);
                }, 200);
                $('#mailDetailAddress').html(data.detailAddress);
                objFalg = true;
            }else{
                //没有数据
                $("#dataForm").hide();
            }
        }});
    }


    //载入数据
    function loadList(){
        var orderId = $("#orderId").val();
        var params = new Object();
        params["orderId"] = orderId;
        if(orderId==undefined || orderId==""){
            return;
        }
        $.ajax({url:path + "/userMailAddress/page",data:params,type:"POST",success:function(data){
            //把数据加载到div下
            if(!objFalg) {//没有对象数据
                $("#noData").show();
            }else{
                $("#data-list").html(data);
            }
        }});
    }
    //省市县级联js引用
    setup2();

    //验证
    var validator;
        validator = $('#editForm').validate({
            rules: {
                "mobile": {
                    "isMobile": true
                }
            },
        });
    //保存方法
        $("#saveBtn").click(function () {
            if(validator.form()){
                var id = $("#addrId").val();
                var addressee = $("#toUser").val();
                var mobile = $("#toPhone").val();
                var province = $("#province2").val();
                var city = $("#city2").val();
                var county = $("#county2").val();
                var detailAddress = $("#mailDetailAddress").val();
                var qqNum = $("#toQQNum").val();
                if(qqNum!=null&&qqNum!=""){
                    if(!checkQQ(qqNum)){
                        $('#toQQNum-error-info').html("QQ格式不正确!");
                        $('#toQQNum-error-info').show();
                        $("#toQQNum").addClass("error");
                        return;
                    }else{
                        $("#toQQNum").removeClass("error");
                        $('#toQQNum-error-info').hide();
                    }
                }else{
                    $("#update_teacher_qq").removeClass("error");
                }

                var params = new Object();
                params["id"] = id;
                params["addressee"] = addressee;
                params["mobile"] = mobile;
                params["province"] = province;
                params["city"] = city;
                params["county"] = county;
                params["detailAddress"] = detailAddress;
                params["qqNum"] = qqNum;
                $.ajax({
                    url: path + '/userMailAddress/update',
                    data: params,
                    type: 'post',
                    success: function (data) {
                        if (ExceptionDialog(data)) {
                            $("#cancelBtn").click();
                            duiaAlter("修改成功！", duiaAlterColor.green);
                            loadObj();
                        }
                    }
                });
            }
        });


})();
