(function(){
    var path = $("#path").val(),
        payTypes = {
            'pay_type_zfb':'支付宝',
            'pay_type_wxsm':'微信扫码支付',
            'pay_type_tbdp':'淘宝店铺',
            'pay_type_zfbhk':'支付宝汇款',
            'pay_type_jddp':'京东店铺',
            'pay_type_kjzf':'快捷支付',
            'pay_type_tbhk':'淘宝汇款',
            'pay_type_tenpay':'财付通',
            'pay_type_hk':'银行汇款',
            'pay_type_yyzf':'语音支付',
            'pay_type_wxxd':'微信小店',
            'pay_type_wxzf':'APP微信支付',
            'pay_type_ios':'苹果支付',
            'pay_type_yzf_bank':'网上银行',
            'pay_type_kq':'快钱',
            'pay_type_yhfk':'银行付款',
            'pay_type_cod':'货到付款',
            'pay_type_byfq':'北银分期',
            'pay_type_instal':'官网分期',
            'pay_type_batch':'官网分批',
            'pay_type_balance':'余额支付',
            'pay_type_kfyr':'咖啡易融',
            'pay_type_ybfq':'有贝分期',
            'pay_type_jd':'京东支付',
            'pay_type_wxgzh':'微信公众号'
        },
        payStatus = {
            'pay_status_success':'支付成功',
            'pay_status_non':'未支付',
            'ay_status_failed':'支付失败'
        },
        backStatus = ['未退款', '已退款', '退款中'];

    var getStatus = function(a, b, c, d){
        if(isNaN(a) || isNaN(b) || isNaN(c)){
            return '';
        }
        if(a < 0 || b < 0 || c < 0){
            return '';
        }
        if(a==0){
            return '待提交';
        }else{
            if(c==1){
                if (d==1) {
                    return '已确认';
                } else {
                    return '已关闭';
                }
            }else{
                if(b==0){
                    return '待审核';
                }else if(b==1){
                    return '已确认';
                }else{
                    return '不通过';
                }
            }
        }
        return '';
    }

    $('#searchOrderForm')[0].reset();

    $("#payTime").datetimepicker({
        language:  'zh-CN',
        minuteStep: 1,
        autoclose: true,
        endDate: new Date()
    });

    $('input[type="text"], textarea').on('blur', function(){
        $(this).val($.trim($(this).val()));
    });

    jQuery.validator.addMethod("checkOrderNum", function(value, element) {
        var flag = false,
            payType = $('#payType').val();
        if(payType){
            $.ajax({
                url: path+'/payOrder/checkOrderNum',
                async:false,//要指定不能异步,必须等待后台服务校验完成再执行后续代码
                type: "post",
                dataType:"json",
                data: {
                    payType: payType,
                    orderNum: $.trim(value)
                },
                success:function(data) {
                    if(ExceptionDialog(data)){
                        console.log(data);
                        if(data.result){
                            flag = true;
                        }else{
                            jQuery.validator.modifyMessages("checkOrderNum",data.msg);
                        }
                    }
                }
            });
        }else{
            jQuery.validator.modifyMessages("checkOrderNum","未选择付款方式");
        }
        return flag;
    });

    $('#searchOrder').on('click', function(){
        getOrderDetail();
    });

    var getOrderDetail = function(){
        $('#user_order tbody').html('');
        $('#childrenOrder tbody').html('');
        var payNum = $('#payNum').val(),
            userOrder = [],
            chilrenOrder = [];
        payNum && $.post(path+'/payOrder/searchOrder', {
            payNum: payNum
        }, function(data){
            if(ExceptionDialog(data)){
                if(!data.result.flag){
                    $('#alertMsg').html(alertTemp(data.result.msg));
                }else{
                    $('#alertMsg').html('');
                }
                if(typeof(data.result.childrenOrder) != "undefined" && typeof(data.result.com) != "undefined"){
                    $('#periodNum').val(data.result.childrenOrder.length);
                    var price = 0;
                    var parentStatus = data.result.order.payStatus.split(':');
                    $(data.result.childrenOrder).each(function(index, order){
                        var status = order.payStatus.split(':');
                        chilrenOrder.push('<tr><td id="payNum">'+order.payNum+'</td><td>'+order.realpayPrice+'</td><td>'+(order.deadline?TimeObjectUtil.longMsTimeConvertToDateTime2(order.deadline):'')+'</td>');
                        chilrenOrder.push('<td>'+payStatus[status[0]]+'</td><td>'+getStatus(status[1],status[2],status[3],status[5])+'</td><td>'+((!isNaN(parentStatus[4])&&status[4]>-1)?backStatus[parentStatus[4]]:'')+'</td>');
                        chilrenOrder.push('<td>'+(order.payType?payTypes[order.payType]:'')+'</td><td>'+(order.orderNum || '')+'</td>');
                        chilrenOrder.push('<td>'+order.costPrice+'</td><td>'+(order.payTime || '')+'</td><td>'+(order.payTime || '<a href="javascript:void(0);" class="btn btn-warning btn-xs luru" data-id="'+order.id+'" data-price="'+order.costPrice+'" disabled>录入汇款</a>')+'</td></tr>');
                        price += order.costPrice;
                        order.payTime && $('#payTime').datetimepicker('setStartDate', order.payTime);
                    });
                    userOrder.push('<tr><td>订单号</td><td>'+data.result.order.payNum+'</td></tr>');
                    userOrder.push('<tr><td>用户手机号</td><td>'+(data.result.user.mobile || '')+'</td>');
                    userOrder.push('<tr><td>用户邮箱</td><td>'+(data.result.user.email || '')+'</td></tr>');
                    userOrder.push('<tr><td>应付金额</td><td>'+price+'</td></tr>');
                    $(data.result.com).each(function(index, c){
                        var col = index==0?'包含班级':'';
                        userOrder.push('<tr><td>'+col+'</td><td>'+ (c.name || c.afterClassTypeName) +' ('+ (c.classNo || c.afterClassNo) +')</td></tr>');
                    });
                    $('#user_order tbody').html(userOrder.join(''));
                    $('#childrenOrder tbody').html(chilrenOrder.join(''));
                    $('.luru:first').attr('disabled', false);
                    if(!data.result.flag){
                        $('.luru').remove();
                    }
                    //$('#payTime').datetimepicker('setStartDate', data.result.order.payTime);
                }
            }
        });
    }

    $('#luruHKBtn').on('click', function(){
        $('#luruHKform').submit();
    });
    var validate = $('#luruHKform').validate({
        onkeyup: false,
        submitHandler: function(form) {
            $.ajax({
                url: path+'/payOrder/periodOrder',
                data: $(form).serialize(),
                type: 'post',
                success: function(data){
                    if(ExceptionDialog(data)) {
                        duiaAlter("保存成功！", duiaAlterColor.green);
                        $('#luruHKPanel').modal('hide');
                        // getOrderDetail();
                        $('#user_order tbody').html('');
                        $('#childrenOrder tbody').html('');
                    }
                }
            });
        }
    });

    $('#childrenOrder tbody').delegate('.luru', 'click', function(ev){
        var $this = $(ev.target);
        if($this.attr('disabled')!='disabled'){
            $('#luruHKform')[0].reset();
            $('#payNumForm').val($('#payNum').val());
            $('#orderId').val($this.attr('data-id'));
            $('#costPrice').val($this.attr('data-price'));
            $('#luruHKPanel').modal('show');
            validate.resetForm();
        }
    });

    var alertTemp = function(msg){
        var ss = [];
        ss.push('<div class="alert alert-danger m-b-15"');
        ss.push('<strong>'+msg+'</strong>');
        ss.push('<span class="close" data-dismiss="alert">×</span>');
        ss.push('</div>');
        return ss.join('');
    }

})();