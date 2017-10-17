(function(){
    var path = $("#path").val(),
        loginUser = $('#saleName').val();

    $('#addOrderForm')[0].reset();

    $("#payTime").datetimepicker({
        language:  'zh-CN',
        minuteStep: 1,
        autoclose: true,
        endDate: new Date()
    });

//        setup();

    $('input[type="text"], textarea').on('blur', function(){
        $(this).val($.trim($(this).val()));
    });

    /**
     * 人员账号验证
     */
    jQuery.validator.addMethod("checkUser", function(value, element) {
        var flag = false;
        $.ajax({
            url: path+'/users/check',
            async:false,//要指定不能异步,必须等待后台服务校验完成再执行后续代码
            type: "post",
            dataType:"json",
            data: {
                str: $.trim(value)
            },
            success:function(data) {
                if(ExceptionDialog(data)){
                    if(isNaN(data.result)){
                        $('#userId').val(data.result.id);
                        flag = true;
                    }else{
                        jQuery.validator.modifyMessages("checkUser",data.msg);
                    }
                }
            }
        });
        return flag;
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

    /*
     * 验证升级的班级对应订单是否业绩已确认
     * */
    jQuery.validator.addMethod("checkOrderUpdate", function(value, element) {
        var flag = false;
        $.ajax({
            url: path+'/payOrder/checkOrderUpdate',
            async:false,//要指定不能异步,必须等待后台服务校验完成再执行后续代码
            type: "post",
            dataType:"json",
            data: {
                userId: $('#userId').val(),
                classId: value
            },
            success:function(data) {
                if(ExceptionDialog(data)){
                    if(data.result){
                        flag = true;
                    }else{
                        jQuery.validator.modifyMessages("checkOrderUpdate",data.msg);
                    }
                }
            }
        });
        return flag;
    });

    $('#userName').on('blur', function(){
        var uid = $('#userId').val();
        if(uid){
            getComByUid(uid);
            getDis(uid);
        }
    });

    var resetInfo = function(){
        $('#disCode').val('');
        $('#disId').val('');
        $('#userDis').show();
        $('#unuserDis').hide();
        $('.bg-green-lighter').removeClass('bg-green-lighter');
        $('#disCode').removeAttr('readonly');
        $('#realpayPrice').val('');
        $('#costPrice').val('');
        $('#disMsg').html('');
//            $('#classMsg').html('');
        $('#addressDiv').hide();
//            $('#subject_div').hide();
//            $('#subject_div2').hide();
        $('#saleName').val(loginUser);
        $('#saleUserId').val('');
    }
    var getComByUid = function(uid){
        $.post(path+'/classes/getClassesByUid', {
            uid: uid
        }, function(data){
            if(ExceptionDialog(data)){
                var ss = [];
                ss.push('<option value="">--选择原班级--</option>');
                $(data.result).each(function(index, cl){
                    ss.push('<option value="'+cl.id+'">'+cl.title+'</option>');
                });
                $('#oldComId').html(ss.join(''));
            }
        });
    }
    /**
     * 选择sku时加载产品
     */
    $('#oldComId').on('change', function(){
        resetInfo();
        var $this = $(this);
        $this.val() && $.post(path+'/classes/findClassesByOld', {
            classId: $this.val()
        }, function(data){
            if(ExceptionDialog(data)){
                var ss = [];
                ss.push('<option value="">--选择班级--</option>');
                $(data).each(function(index, cl){
                    if(cl.studyPackagePrice==null){
                        cl.studyPackagePrice=0;
                    }
                    ss.push('<option value="'+cl.afterClassid+'" data-bookPrice="'+cl.studyPackagePrice+'" data-no="'+cl.classNo+'" data-sku="'+cl.sku+'" data-mark="'+cl.isMail+'" data-price="'+cl.price+'">'+cl.title+'</option>');
                });
                $('#programId').html(ss.join(''));
            }
        });
    });
    /**
     * 选择产品时事件，获取商品详情
     */
    $('#programId').on('change', function(){
        var $this = $(this),
            classNo=$this.find("option:selected").attr("data-no"),
            skuId=$this.find("option:selected").attr("data-sku"),
            addressMark = $this.find("option:selected").attr("data-mark"),
            price = $this.find("option:selected").attr("data-price"),
            studyPackagePrice=$this.find("option:selected").attr("data-bookPrice");
        resetInfo();
        $('#studyPrice').html(0);
        $('#categoryId').val(skuId);
        $('#classNos').val(classNo);
        $('#studyPackagePrice').val(studyPackagePrice);

        if($("#disId").val()!=""&&$("#disId").val()!=null){
            $("#unuserDis").click();
        }

        if(addressMark==2){
            $('#isMailDiv').show();
            $("#isMail").attr("checked","checked");
            $('#addressDiv').show();
            setup();
            getAddress();
            $('#realpayPrice').val(studyPackagePrice*1+price*1);
            $('#costPrice').val(studyPackagePrice*1+price*1);
            $('#studyPrice').html(studyPackagePrice);
        }else{
            $('#isMailDiv').hide();
            $('#realpayPrice').val(price);
            $('#costPrice').val(price);
        }
        isBuy(classNo);



    });

    $("input[name=isMail]").change(function(){
        if($("#disId").val()!=""&&$("#disId").val()!=null){
            $("#unuserDis").click();
        }
        if($(this).val()==1){
            $('#addressDiv').show();
            setup();
            getAddress();
            $('#realpayPrice').val($("#studyPackagePrice").val()*1+$('#realpayPrice').val()*1);
            $('#costPrice').val($("#studyPackagePrice").val()*1+$('#costPrice').val()*1);
            $('#studyPrice').html($("#studyPackagePrice").val());

        }else{
            $('#addressDiv').hide();
            $('#realpayPrice').val($('#realpayPrice').val()*1-$("#studyPackagePrice").val()*1);
            $('#costPrice').val($('#costPrice').val()*1-$("#studyPackagePrice").val()*1);
            $('#studyPrice').html(0);
        }
    });

    var getAddress = function(){
        $.post(path+'/userMailAddress/getUMAInfo', {
            userId: $('#userId').val()
        }, function(data){
            if(ExceptionDialog(data)){
                if(data.result){
                    console.log(data.result);
                    $('#toUser').val(data.result.addressee);
                    $('#toPhone').val(data.result.mobile);
                    setTimeout(function(){
                        $('#province').val(data.result.province);
                        change(1);
                        $('#city').val(data.result.city);
                        change(2);
                        $('#county').val(data.result.county);
                    }, 200);
                    $('#detailAddress').val(data.result.detailAddress);
                }
            }
        });
    }
    /**
     * 验证商品的购买情况
     *
     */
    var isBuy = function(classNos){
        $('#classMsg').text('');
        $('#saveOrderBtn').show();
        $.post(path+'/classes/isBuys', {
            uid: $('#userId').val(),
            classNo: classNos.split(',')
        }, function(data){
            if(ExceptionDialog(data)){
                var buy = 0;
                $(data.result).each(function(index, obj){
                    if(obj.value) {
                        $('input[value="'+obj.key+'"]').addClass('has-error');
                        buy++;
                    }
                });
                if(buy == classNos.split(',').length){
                    $('#classMsg').text('已购买过该商品，无法购买！');
                    $('#saveOrderBtn').hide();
                }else if(buy){
                    $('#classMsg').text('已购买过该商品中的部分商品，请确认购买！');
                }
            }
        });
    }

    /**
     * 获取优惠券
     */
    var getDis = function(id){
        var dises = [];
        $.post(path+'/payDiscount/dis', {
            uid: id
        }, function(data){
            if(ExceptionDialog(data)) {
                $(data.result).each(function (index, dis) {
                    dises.push('<div class="row bg-silver m-l-0 m-b-5 user_dis" data-code="'+dis.discountCode+'" style="width: 500px">');
                    dises.push('<ul class="list-inline col-md-12">');
                    dises.push('<li class="col-md-4">'+dis.name+'</li><li class="col-md-4"></li><li class="col-md-4">sku:'+dis.sku+'</li>');
                    dises.push('</ul><ul class="list-inline col-md-12">');
                    dises.push('<li class="col-md-4"></li><li class="col-md-4"><h4>'+(dis.type==1?'减免'+dis.discount+'元':'打'+dis.discount+'折')+'</h4></li><li class="col-md-4"></li>');
                    dises.push('</ul><ul class="list-inline col-md-12">');
                    dises.push('<li class="col-md-4">满'+dis.useCondition+'元使用</li><li class="col-md-4"></li><li class="col-md-4">'+TimeObjectUtil.longMsTimeConvertToDateTime2(dis.startDate)+'到'+TimeObjectUtil.longMsTimeConvertToDateTime2(dis.endDate)+'</li>');
                    dises.push('</ul></div>');
                });
                $('#dises').html(dises.join(''));
            }
        });
    }
    $('#dises').delegate('.user_dis', 'dblclick', function(ev){
        var price = $('#costPrice').val(),
            sku = $('#categoryId').val();
        if(!price || !sku){
            BootstrapDialog.show({
                title: '提示',
                message: '请先选择商品！',
                buttons: [{
                    label: '关闭',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });
            return;
        }
        var $this = $(ev.currentTarget);
        $this.toggleClass('bg-green-lighter').siblings().removeClass('bg-green-lighter');
        $('#disCode').val($('#dises').find('.bg-green-lighter').attr('data-code'));
        $('#userDis').show();
        $('#unuserDis').hide();
        $('#costPrice').val($('#realpayPrice').val());
        $('#disCode').removeAttr('readonly');
        $('#disId').val('');
        $('#saleName').val(loginUser);
        $('#saleUserId').val('');
        $('#disMsg').html('');

        var code = $('#disCode').val();
        code && checkCode(code);
    });
    $('#userDis').on('click', function(){
        var code = $('#disCode').val();
        code && checkCode(code);
    });
    $('#unuserDis').on('click', function(){
        $('#userDis').toggle();
        $('#unuserDis').toggle();
        $('.bg-green-lighter').removeClass('bg-green-lighter');
        $('#costPrice').val($('#realpayPrice').val());
        $('#disCode').removeAttr('readonly');
        $('#disId').val('');
        $('#saleName').val(loginUser);
        $('#saleUserId').val('');
        $('#disMsg').html('');
    });
    //验证优惠券
    var checkCode = function(code){
        var uid = $('#userId').val(),
            price= 0,
            sku = $('#categoryId').val(),
            comId = $('#programId').val();
        if($('#isMailDiv input[name="isMail"]:checked ').val()==0){
            price = $('#costPrice').val();
        }else{
            price = $('#costPrice').val()*1 -  $('#studyPackagePrice').val()*1 ;
        }
        if(!uid){
            BootstrapDialog.show({
                title: '提示',
                message: '请先填写账户！',
                buttons: [{
                    label: '关闭',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });
            return;
        }
        if(!price || !sku){
            BootstrapDialog.show({
                title: '提示',
                message: '请先选择商品！',
                buttons: [{
                    label: '关闭',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });
            return;
        }
        $('#disMsg').html('');
        $.post(path+'/payDiscount/code', {
            uid: uid,
            price: price,
            sku: sku,
            comId: comId,
            code: code,
            isUpdate: true
        }, function(data){
            if(ExceptionDialog(data)) {
                if(isNaN(data.result)){
                    var discount = data.result.discount,
                        teacher = data.result.teacher,
                        tabs = []
                    fq = discount.period && JSON.parse(discount.period);
                    if(discount.type == 1){
                        price = $('#realpayPrice').val()-parseFloat(discount.discount);
                    }else if(discount.type == 2){
                        if($('#isMailDiv input[name="isMail"]:checked ').val()==1){
                            price = ($('#realpayPrice').val()*1 - $("#studyPackagePrice").val()*1 )*parseFloat(discount.discount)/10  + $("#studyPackagePrice").val()*1;
                        }else{
                            price = $('#realpayPrice').val()*parseFloat(discount.discount)/10;
                        }
                    }
                    price = parseFloat(price).toFixed(2);
                    if(price == 0||(price == parseFloat($("#studyPackagePrice").val())&&$('#isMailDiv input[name="isMail"]:checked ').val()==1)){
                        $('#costPrice').val($('#realpayPrice').val());
                        $('#disMsg').html('优惠券使用规则不符');
                        return;
                    }
                    $('#costPrice').val(price);
                    $('#disId').val(discount.id);
                    $('#saleName').val(teacher.teachName);
                    $('#saleUserId').val(teacher.id);
                    if(discount.discountType == 'fq' || discount.discountType == 'sjfq') {
                        tabs.push('<table class="table"><tr><td>分期次数</td><td>' + fq.fq + '期</td></tr>');
                        if (fq.fq >= 1) {
                            if(fq.shuju[0].periodMoney && parseFloat(fq.shuju[0].periodMoney)>=price){
                                $('#costPrice').val($('#realpayPrice').val());
                                $('#disMsg').html('优惠券使用规则不符');
                                return;
                            }
                            //tabs.push('<tr><td>一期（首付）</td><td>' + fq.shuju[0].periodMoney + '元</td></tr>');
                            //price -= parseFloat(fq.shuju[0].periodMoney);
                            if($('#isMailDiv input[name="isMail"]:checked ').val()==1){
                                tabs.push('<tr><td>一期（首付）</td><td id="onePrice" data-price="' + (fq.shuju[0].periodMoney+$("#studyPackagePrice").val()*1) + '">'+(fq.shuju[0].periodMoney*1 + $("#studyPackagePrice").val()*1)+'元</td></tr>');
                                price -= parseFloat(fq.shuju[0].periodMoney)+$("#studyPackagePrice").val()*1;
                            }else{
                                tabs.push('<tr><td>一期（首付）</td><td>' + fq.shuju[0].periodMoney + '元</td></tr>');
                                price -= parseFloat(fq.shuju[0].periodMoney);
                            }
                        }
                        if (fq.fq >= 2) {
                            if(fq.shuju[1].periodMoney && parseFloat(fq.shuju[1].periodMoney)>=price){
                                $('#costPrice').val($('#realpayPrice').val());
                                $('#disMsg').html('优惠券使用规则不符');
                                return;
                            }
                            tabs.push('<tr><td>二期</td><td>支付' + (fq.shuju[1].periodMoney || parseFloat(price).toFixed(2)) + '元</td>');
                            fq.shuju[1].periodDate && tabs.push('<td>补款时间' + fq.shuju[1].periodDate + '</td></tr>');
                            price -= parseFloat(fq.shuju[1].periodMoney);
                        }
                        if (fq.fq >= 3) {
                            tabs.push('<tr><td>三期</td><td>支付' + parseFloat(price).toFixed(2) + '元</td><td>补款时间' + fq.shuju[2].periodDate + '</td></tr>');
                        }
                        tabs.push('</table>');
                        $('#disMsg').html(tabs.join(''));
                    }
                    $('#disCode').attr('readonly', true);
                    $('#userDis').toggle();
                    $('#unuserDis').toggle();
                }else{
                    $('#costPrice').val($('#realpayPrice').val());
                    $('#disMsg').html(data.msg);
                    $('.bg-green-lighter').removeClass('bg-green-lighter');
                }
            }
        });
    }

    $('#saveOrderBtn').on('click', function(){
        $('#addOrderForm').submit();
    });
    $('#addOrderForm').validate({
        onkeyup: false,
        submitHandler: function(form) {
            $.ajax({
                url: path+'/payOrder/addUpdateOrder',
                data: $(form).serialize(),
                type: 'post',
                success: function(data){
                    if(ExceptionDialog(data)) {
                        duiaAlter("保存成功！", duiaAlterColor.green);
                        $('#addOrderForm')[0].reset();
                        resetInfo();
                        window.location.reload();
                    }else{
                        setTimeout(function(){
                            window.location.reload();
                        }, 3000);
                    }
                }
            });
        }
    });
})();