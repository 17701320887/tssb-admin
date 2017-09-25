var path = $("#path").val();


//订单修改 开始

function updateFindOrder(orderType,id,orderNum,payType,realpayPrice,costPrice,payTime,discountCode,categoryId,userId,payDiscountDetailId,productId){
    $("#update_order_id_1").val(id);
    $("#update_order_num_1").val($.trim(orderNum));
    $("#update_youhuiquan_1").val($.trim(discountCode));
    $("#update_user_id_1").val(userId);
    $("#update_order_type_1").val(orderType);
    if(payDiscountDetailId==0||payDiscountDetailId==null||payDiscountDetailId==""){
        $("#update_order_type_1").val(3);
    }
    $("#update_shangpin_id").val(productId);
    $("#update_category_id_1").val(categoryId);
    $("#update_payTime_1").html(payTime);
    $("#update_youhuiquan_id_1").val(payDiscountDetailId);
    var studyPackagePrice=$("#studyPackagePrice").val();
    getPayTypes(payType,1);
    if(orderType==1){
        $("#update_shifujine_1").html(costPrice);
        $("#update_dingdanjine_1").html(realpayPrice);
    }else if(orderType==2){
        $.ajax({
            url:path+"/payOrder/findParent",
            type:"post",
            dataType:"json",
            cache: false,
            async: false,
            data :{"id":id},
            success: function (datas){
                if(isNaN(datas.result)){
                    $('#update_dingdanjine_1').html(datas.result.realpayPrice);
                }
            }
        });
        $.ajax({
            url:path+"/payDiscount/entity",
            type:"post",
            dataType:"json",
            cache: false,
            async: false,
            data :{"id":payDiscountDetailId},
            success: function (datas){
                if(isNaN(datas.result)){
                    var tabs = [];
                    var price=$('#update_dingdanjine_1').html();
                    var fq = datas.result.period && JSON.parse(datas.result.period);
                    tabs.push('<table class="table"><tr><td>分期次数</td><td>' + fq.fq + '期</td></tr>');
                    if (fq.fq >= 1) {
                        tabs.push('<tr><td>一期（首付）</td><td>支付' +(Number(fq.shuju[0].periodMoney*1+studyPackagePrice*1).toFixed(2))  + '元</td></tr>');
                        price =price-Number(fq.shuju[0].periodMoney).toFixed(2)-studyPackagePrice*1;
                    }
                    if (fq.fq >= 2) {
                        var towPrice="";
                        if(fq.fq==2){
                            towPrice=price-parseInt(datas.result.discount);
                        }else if(fq.fq==3){
                            towPrice=fq.shuju[1].periodMoney;
                        }
                        tabs.push('<tr><td>二期</td><td>支付' + (towPrice) + '元</td>');
                        fq.shuju[1].periodDate && tabs.push('<td>补款时间' + fq.shuju[1].periodDate + '</td></tr>');
                        price = price - Number(fq.shuju[1].periodMoney).toFixed(2);
                    }
                    if (fq.fq >= 3) {

                        price = price -Number(datas.result.discount).toFixed(2);
                        tabs.push('<tr><td>三期</td><td>支付' + (Number(price).toFixed(2)) + '元</td><td>补款时间' + fq.shuju[2].periodDate + '</td></tr>');
                    }
                    tabs.push('</table>');
                    $('#update_shifujine_1').html(tabs.join(''));
                    $('#update_fenqi_number_1').val(fq.fq)
                }
            }
        });
    }else{
        $("#update_shifujine_1").html(costPrice);
        $("#update_dingdanjine_1").html(realpayPrice);
    }
}


//点击使用优惠券
$('#userDis').on('click', function(){
    var code = $('#update_youhuiquan_1').val();
    code && checkCode(code);
});
//撤销优惠券
$('#unuserDis').on('click', function(){
    $("#update_shifujine_1").html($("#update_dingdanjine_1").html());
    $('#update_youhuiquan_1').val('');
    $('#update_youhuiquan_id_1').val('');
});

//验证优惠券
var checkCode = function(code){
    var uid = $('#update_user_id_1').val(),
        sku = $('#update_category_id_1').val(),
        orderId=$("#update_order_id_1").val(),
        studyPackagePrice=$("#studyPackagePrice").val();
    if($("#update_order_type_1").val()==1){
        var  price = $('#update_shifujine_1').html();
    }else{
        var  price =$('#update_dingdanjine_1').html();
    }
    var comId=$('#update_shangpin_id').val();
    if(!uid){
        createRemind('请先填写账户！');
        return;
    }
    if(!price || !sku){
        createRemind('请先选择商品！');
        return;
    }
    $.post(path+'/payDiscount/code', {
        uid: uid,
        price: price,
        sku: sku,
        code: code,
        comId:comId
    }, function(data){
        if(ExceptionDialog(data)) {
            if(isNaN(data.result)){
                var order_type=$('#update_order_type_1').val();
                var discount = data.result.discount,
                    teacher = data.result.teacher,
                    tabs = []
                if(order_type==1){
                    if(discount.discountType != 'pt') {
                        createRemind('只能使用普通优惠券！');
                        return;
                    }else{
                        var flag =checkTeacher(orderId,code);
                        if(flag){

                            if(discount.type == 1){
                                price = $('#update_dingdanjine_1').html()-discount.discount;
                            }else if(discount.type == 2){
                                price = $('#update_dingdanjine_1').html()*parseFloat(discount.discount)/10;
                            }
                            //金额最低为订单金额1元 + 学习包
                            if(price<studyPackagePrice*1+1){
                                createRemind('优惠券使用规则不符！');
                                return;
                            }


                            $("#update_shifujine_1").html(price);
                            $('#update_youhuiquan_id_1').val(discount.id);
                        }else{
                            createRemind('优惠券的所属销售与订单的销售不一致！');
                            return;
                        }
                    }
                }else if (order_type==2) {
                    if(discount.discountType != 'fq'){
                        createRemind('只能使用分期优惠券！');
                        return;
                    }else{
                        var all_price="";
                        var all_time="";
                        fq = discount.period && JSON.parse(discount.period);
                        if(fq.fq==$('#update_fenqi_number_1').val()){
                            var flag =checkTeacher(orderId,code);
                            if(flag){
                                price = $('#update_dingdanjine_1').html()-discount.discount;
                                tabs.push('<table class="table"><tr><td>分期次数</td><td>' + fq.fq + '期</td></tr>');
                                if (fq.fq >= 1) {
                                    tabs.push('<tr><td>一期（首付）</td><td>支付' + fq.shuju[0].periodMoney+studyPackagePrice*1 + '元</td></tr>');
                                    price =price- Number(fq.shuju[0].periodMoney).toFixed(2)-studyPackagePrice*1;
                                    all_price+=Number(fq.shuju[0].periodMoney).toFixed(2)+",";
                                }
                                if (fq.fq >= 2) {
                                    if(price<=0){
                                        createRemind('第'+fq.fq+'期的实付金额不能小于等于0！');
                                        return;
                                    }
                                    tabs.push('<tr><td>二期</td><td>支付' + (fq.shuju[1].periodMoney || (Number(price).toFixed(2))) + '元</td>');
                                    fq.shuju[1].periodDate && tabs.push('<td>补款时间' + fq.shuju[1].periodDate + '</td></tr>');
                                    if(fq.shuju[1].periodMoney==0){
                                        all_price+=Number(price).toFixed(2)+",";
                                    }else{
                                        all_price+=Number(fq.shuju[1].periodMoney).toFixed(2)+",";
                                    }
                                    all_time+=fq.shuju[1].periodDate+",";
                                    price =price-Number(fq.shuju[1].periodMoney).toFixed(2);;
                                }
                                if (fq.fq >= 3) {
                                    if(price<=0){
                                        createRemind('第'+fq.fq+'期的实付金额不能小于等于0！');
                                        return;
                                    }
                                    tabs.push('<tr><td>三期</td><td>支付' + (Number(price).toFixed(2)) + '元</td><td>补款时间' + fq.shuju[2].periodDate + '</td></tr>');
                                    all_price+=Number(price).toFixed(2)
                                    all_time+=fq.shuju[2].periodDate;

                                }
                                tabs.push('</table>');
                                $('#update_youhuiquan_id_1').val(discount.id);
                                $('#update_shifujine_1').html(tabs.join(''));
                                $('#update_shifu_str').val(all_price);
                                $('#update_time_str').val(all_time);
                            }else{
                                createRemind('优惠券的所属销售与订单的销售不一致！');
                                return;
                            }
                        }else{
                            createRemind('你只能使用与之前期数相同的优惠券！');
                            return;
                        }
                    }
                }else{//原订单未使用优惠券
                    $('#update_youhuiquan_1').val("");
                    createRemind('原订单未使用优惠券，所以不能使用优惠券！');
                    return;
                }
            }else{
                $('#update_shifujine_1').val($('#update_dingdanjine_1').val());
                createRemind(data.msg);
            }
        }
    });
}

function checkTeacher(orderId,code){
    var flag=false;
    $.ajax({
        url:path+"/payOrder/checkTeacher",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"orderId":orderId,"code":code},
        success: function (datas){
            flag=datas.result
        }
    })
    return flag;
}

//点击修改按钮
$('#update_order_1').on('click', function() {
    $("#form_update_order_1").submit();
});
//提交表单验证
$('#form_update_order_1').validate({
    submitHandler: function(form) {
        var obj = document.getElementById('update_pay_type_1');
        var index = obj.selectedIndex; //序号，取当前选中选项的序号
        var payType = obj.options[index].value;
        var order_type = $('#update_order_type_1').val();
        var orderNum = $("#update_order_num_1").val();
        var costPrice = 0;
        if (order_type == 1) {
            costPrice = $("#update_shifujine_1").html();
        } else {
            costPrice = $("#update_shifu_str").val();
        }
        if (order_type == 1 || order_type == 2) {
            if ($("#update_youhuiquan_id_1").val() == null || $("#update_youhuiquan_id_1").val() == "") {
                createRemind("原订单已使用优惠券，所以不能取消优惠券");
                return;
            }
        }else if(order_type==3){
            if ($("#update_youhuiquan_1").val() != null && $("#update_youhuiquan_1").val() != "") {
                createRemind("原订单没有使用优惠券，所以不能使用优惠券");
                return;
            }
        }
        var all_time = $("#update_time_str").val();
        var datas = {
            "id": $("#update_order_id_1").val(),
            "payType": payType,
            "orderNum": orderNum,
            "costPriceStr": costPrice,
            "payTimeStr": all_time,
            "payDiscountDetailId": $("#update_youhuiquan_id_1").val()
        }
        $.ajax({
            url: path + "/payOrder/update",
            type: "post",
            dataType: "json",
            cache: false,
            data: datas,
            success: function (datas) {
                if (datas.code == 200) {
                    duiaAlter("修改成功！", duiaAlterColor.green);
                    xiangxiTable.ajax.reload(null, false);
                    $("#close_1").click()
                } else {
                    duiaAlter("修改失败！", duiaAlterColor.red);
                }
            }
        });

    }
});


jQuery.validator.addMethod("checkOrderNumber", function(value, element) {
    var flag = false,
        obj=document.getElementById('update_pay_type_1'),
        index=obj.selectedIndex, //序号，取当前选中选项的序号
        payType = obj.options[index].value;
    if(payType){
        var orderNum=$('#update_order_num_1').val();
        if(orderNum!=null&&orderNum!=""){
            $.ajax({
                url: path+'/payOrder/checkOrderNum',
                async:false,//要指定不能异步,必须等待后台服务校验完成再执行后续代码
                type: "post",
                dataType:"json",
                data: {
                    payType: payType,
                    orderNum: value,
                    "id": $("#update_order_id_1").val()
                },
                success:function(data) {
                    if(ExceptionDialog(data)){
                        if(data.result){
                            flag = true;
                        }else{
                            jQuery.validator.modifyMessages("checkOrderNumber",data.msg);
                        }
                    }
                }
            });
        }else{
            jQuery.validator.modifyMessages("checkOrderNumber","请输入支付凭证");
        }
    }else{
        jQuery.validator.modifyMessages("checkOrderNumber","未选择付款方式");
    }
    return flag;
});

jQuery.validator.addMethod("checkDiscount", function(value, element) {
    var flag = false,
        order_type=$("#update_order_type_1").val();
    if (order_type == 1 || order_type == 2) {
        if ($("#update_youhuiquan_1").val() == null || $("#update_youhuiquan_1").val() == "") {
            jQuery.validator.modifyMessages("checkDiscount","原订单已使用优惠券，所以不能取消优惠券");
        }else{
            flag = true;
        }
    }else if(order_type==3){
        if ($("#update_youhuiquan_1").val() != null && $("#update_youhuiquan_1").val() != "") {
            jQuery.validator.modifyMessages("checkDiscount","原订单未使用优惠券，所以不能使用优惠券");
        }else{
            flag = true;
        }
    }
    return flag;
});


//订单修改 结束

//补款修改 开始
function updateFindOrder_3(id,orderNum,payType,costPrice,payTime){
    $("#update_order_id_3").val(id);
    $("#update_order_num_3").val($.trim(orderNum));
    $("#update_benqijine_3").html(costPrice);
    $("#update_payTime_3").html(payTime);

    getPayTypes($.trim(payType),3);
    $("#update_pay_type_3").find("option[value='"+$.trim(payType)+"']").attr("selected",true);
}

$('#update_order_3').on('click', function(){
    $("#form_update_order_3").submit();
});
$('#form_update_order_3').validate({
    submitHandler: function(form) {
        var obj=document.getElementById('update_pay_type_3'),
            index=obj.selectedIndex, //序号，取当前选中选项的序号
            payType = obj.options[index].value,
            orderNum=$('#update_order_num_3').val(),
            bukuan=$('#update_bukuanjine_3').val(),
            benqi=$("#update_benqijine_3").html();
        if(parseFloat(bukuan)!=parseFloat(benqi)){
            $('#update_bukuanjine_3').addClass("error");
            $("#update_bukuanjine_3-error-info").html("补款金额必须与本期金额一致！");
            $("#update_bukuanjine_3-error-info").show();
            return ;
        }else{
            $('#update_bukuanjine_3').removeClass("error");
            $("#update_bukuanjine_3-error-info").hide();
        }
        var datas = {"id":$("#update_order_id_3").val(),"payType":payType,"orderNum":orderNum }
        $.ajax({
            url:path+"/payOrder/updateBukuan",
            type:"post",
            dataType:"json",
            cache: false,
            data :datas,
            success: function (datas){
                if(datas.code==200){
                    duiaAlter("修改成功！", duiaAlterColor.green);
                    xiangxiTable.ajax.reload(null, false);
                    $("#close_3").click()
                }else{
                    duiaAlter("修改失败！", duiaAlterColor.red);
                }
            }
        })
    }
});
//验证金额
jQuery.validator.addMethod("checkJine", function(value, element) {
    var flag = false,
        bukuan=$('#update_bukuanjine_3').val(),
        benqi=$("#update_benqijine_3").html();
    if(parseFloat(bukuan)!=parseFloat(benqi)){
        jQuery.validator.modifyMessages("checkJine","补款金额必须与本期金额一致！");
    }else{
        flag=true;
    }
    return flag;
});

//验证支付凭证
jQuery.validator.addMethod("checkOrderNum", function(value, element) {
    var flag = false,
        obj=document.getElementById('update_pay_type_3'),
        index=obj.selectedIndex, //序号，取当前选中选项的序号
        payType = obj.options[index].value;
    if(payType){
        var orderNum=$('#update_order_num_3').val();
        if(orderNum!=null&&orderNum!=""){
            $.ajax({
                url: path+'/payOrder/checkOrderNum',
                async:false,//要指定不能异步,必须等待后台服务校验完成再执行后续代码
                type: "post",
                dataType:"json",
                data: {
                    payType: payType,
                    orderNum: value,
                    "id": $("#update_order_id_3").val()
                },
                success:function(data) {
                    if(ExceptionDialog(data)){
                        if(data.result){
                            flag = true;
                        }else{
                            jQuery.validator.modifyMessages("checkOrderNum",data.msg);
                        }
                    }
                }
            });
        }else{
            jQuery.validator.modifyMessages("checkOrderNum","请输入支付凭证");
        }
    }else{
        jQuery.validator.modifyMessages("checkOrderNum","未选择付款方式");
    }
    return flag;
});

//补款修改 结束


//生成提醒窗口
function createRemind(message){
    BootstrapDialog.confirm({
        title: '提醒',
        message: message,
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        btnCancelLabel: '确认',
        btnOKClass: 'btn-warning'
    })
}
