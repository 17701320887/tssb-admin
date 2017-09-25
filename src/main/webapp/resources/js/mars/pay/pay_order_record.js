(function(window, $){
    var path = $("#path").val(),
        loginUser = $('#saleName').val();

    $('#addOrderForm')[0] && $('#addOrderForm')[0].reset();

    $("#payTime").length && $("#payTime").datetimepicker({
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
                        getDis(data.result.id);
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

    var resetInfo = function(){
        $('#coms').html('');
        $('#classes').html('');
        $('#disCode').val('');
        $('#disId').val('');
        $('#userDis').show();
        $('#unuserDis').hide();
        $('.bg-green-lighter').removeClass('bg-green-lighter');
        $('#disCode').removeAttr('readonly');
        $('#realpayPrice').val('');
        $('#costPrice').val('');
        $('#disMsg').html('');
        $('#classMsg').html('');
        $('#addressDiv').hide();
        $('#subject_div').hide();
        $('#subject_div2').hide();
        $('#saleName').val(loginUser);
        $('#saleUserId').val('');
    }
    /**
     * 选择sku时加载产品
     */
    $('#categoryId').on('change', function(ev){
        if(!$('#userId').val()){
            BootstrapDialog.show({
                title: '提示',
                message: '请先填写账号！',
                buttons: [{
                    label: '关闭',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });
            $(ev.target).val('');
            return;
        }
        resetInfo();
        var $this = $(this);
        $('#skuName').val($this.find('option:selected').text());
        $this.val() && $.post(path+'/commodity/getCommodityList/'+$this.val(), {
        }, function(data){
            if(ExceptionDialog(data)){
                var ss = [];
                ss.push('<option value="">--选择商品--</option>');
                $(data).each(function(index, com){
                    ss.push('<option value="'+com.id+'" data-type="'+com.type+'">'+com.name+'</option>');
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
            type=$this.find("option:selected").attr("data-type"),
            name = $this.find("option:selected").text(),
            $coms = $('#coms'),
            $classes = $('#classes'),
            $balance = $('#balance');

        var balance = $balance.length?$balance.val():0;
        $('#studyPrice').html(0);
        resetInfo();
        $('#comName').val(name);
        $this.val() && $.post(path+'/commodity/getCommodity', {
            id: $this.val(),
            type: type
        }, function(data){
            if(ExceptionDialog(data)){
                $('#comType').val(data.type);
                $("#isMailDiv").hide();
                if($("#disId").val()!=""&&$("#disId").val()!=null){
                    $("#unuserDis").click();
                }

                if(data.type == 0){//普通商品
                    $coms.html('<div class="checkbox"><label><input value="'+data.commodity.classNo+'" name="classNos" type="checkbox" checked hidden>'+data.commodity.name+'</label></div>');
                    $classes.html('<input class="form-control bg-green-lighter" readonly type="text" value="'+data.commodity.classNo+'"><input type="hidden" value="'+data.commodity.id+'" name="comIds">');
                    $('#costPrice').val(data.commodity.realPrice-balance);
                    $('#realpayPrice').val(data.commodity.realPrice);
                    $('#studyPackagePrice').val(data.studyPackagePrice!=null?data.studyPackagePrice:0);
                    isAddress(data.commodity.classNo);
                    isBuy(data.type, data.commodity.classNo);
                    $coms.prev().text('');
                }else{//组合或套餐
                    var coms = [],
                        classes = [],
                        checkbox = data.type,
                        classNos = [],
                        price = 0,
                        studyPrice=0;
                    $(data.commodities).each(function(index, com){
                        coms.push('<div class="checkbox"><label>');
                        if(com.studyPackagePrice==null){
                            com.studyPackagePrice=0;
                        }
                        coms.push('<input value="'+com.classNo+'" data-id="'+com.id+'" data-price="'+com.realPrice+'" data-bookPrice="'+com.studyPackagePrice+'" name="classNos" type="checkbox" required');
                        if(checkbox == 1) {//套餐
                            coms.push(' hidden checked>');
                        }else{
                            coms.push('>');
                        }
                        coms.push(com.name+'</label></div>');
                        classes.push('<input readonly type="text" value="'+com.classNo+'" class="form-control ');
                        if(checkbox == 1) {//套餐
                            classes.push('bg-green-lighter"><input type="hidden" value="'+com.id+'" name="comIds">');
                            price += com.realPrice;
                        }else{
                            classes.push('">');
                        }
                        classNos.push(com.classNo);
                        studyPrice+=com.studyPackagePrice;
                    });
                    coms.push('<label for="classNos" class="error" style="display: none;"></label>');
                    if(checkbox == 1){//套餐
                        $("#studyPackagePrice").val(studyPrice);
                        $('#costPrice').val(data.commoditySpecial.realPrice-balance);
                        $('#realpayPrice').val(data.commoditySpecial.realPrice);
                        isAddress(classNos.join(','));
                        $coms.prev().text('选择套餐');
                    }else{
                        var obj=0;
                        if(data.commoditySpecial.isDiscount!=2){
                            obj = JSON.parse(data.commoditySpecial.discountPrice);
                            for (var i = 0; i < data.commodities.length - 1; i++) {
                                coms.push('<input type="hidden" id="comSp'+(i+2)+'" value="'+obj[i+2]+'" />');
                            }
                        }


                        $('#costPrice').val(0);
                        $('#realpayPrice').val(0);
                        $('#addressDiv').hide();
                        $coms.prev().text('选择组合');
                    }
                    $coms.html(coms.join(''));
                    $classes.html(classes.join(''));
                    isBuy(data.type, classNos.join(','));
                }
            }
        });
    });
    /**
     * 判断选择的产品是否需要邮寄地址
     */
    var isAddress = function(classNos){
        var skuId = $('#categoryId').val();
        classNos && $.post(path+'/classes/isAddress', {
            uid: $('#userId').val(),
            classNo: classNos.split(',')
        }, function(data){
            if(ExceptionDialog(data)){
                if(data.result[0]){//是否需要邮寄地址
                    $('#isMailDiv').show();
                    $("#isMail").attr("checked","checked");
                    $('#addressDiv').show();
                    setup();
                    getAddress();
                    $('#studyPrice').html($("#studyPackagePrice").val());
                    $('#realpayPrice').val($("#studyPackagePrice").val()*1+$('#realpayPrice').val()*1);
                    $('#costPrice').val($("#studyPackagePrice").val()*1+$('#costPrice').val()*1);
                    if(skuId == '118' || skuId == '200' || skuId == '201'){
                        $("#subject_div").show();
                    }else{
                        $("#subject_div").hide();
                    }
                }else{
                    $('#isMailDiv').hide();
                }
                if(data.result[1]){//是否是面试班
                    if(skuId == '118' || skuId == '200' || skuId == '201'){
                        $("#subject_div2").show();
                    }else{
                        $("#subject_div2").hide();
                    }
                }
            }
        });
    }

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
    var isBuy = function(type, classNos){
        $('#classMsg').text('');
        $('.recordBtn').show();
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
                if(buy == classNos.split(',').length && buy == 1){
                    $('#classMsg').text('已购买过该商品，无法购买！');
                    $('.recordBtn').hide();
                }else if(buy){
                    $('#classMsg').text('已购买过该商品中的部分商品，请确认购买！');
                }
            }
        });
    }
    /**
     * 组合商品勾选
     */
    $('#coms').delegate('input', 'change', function(ev){
        if($(ev.target).is(":hidden")){
            return;
        }
        var $coms = $(ev.delegateTarget).find('input[name="classNos"]:checked'),
            classNos = [],
            price = 0,
            priceSub = $('#comSp'+$coms.length).val() || 0,
            $balance = $('#balance'),
            studyPrice=0;

        if($("#disId").val()!=""&&$("#disId").val()!=null){
            $("#unuserDis").click();
        }

        var balance = $balance.length?$balance.val():0;
        $('.bg-green-lighter').removeClass('bg-green-lighter');
        $('input[name="comIds"]').remove();
        $($coms).each(function(index, no){
            $this = $(no);
            $('#classes input[value="'+$this.val()+'"').addClass('bg-green-lighter').after('<input type="hidden" value="'+$this.attr('data-id')+'" name="comIds">');
            classNos.push($this.val());
            price += parseFloat($this.attr('data-price'));
            if($this.attr('data-bookPrice')!=null){
                studyPrice +=  parseFloat($this.attr('data-bookPrice'));
            }
        });
        isAddress(classNos.join(','));
        $('#costPrice').val(parseFloat(price-balance-priceSub).toFixed(2));
        $('#realpayPrice').val(price-priceSub);
        $("#studyPackagePrice").val(studyPrice);
        $("#studyPrice").html(0);


    });
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
//                        dises.push('<div class="checkbox"><label><input value="" data-no="" name="classNoBox" type="checkbox">');
//                        dises.push(dis.name + ' ' + dis.discount + '元（' + dis.type + '） 教务' + dis.teacherName + ' ' + dis.startDate + ' 到 ' + dis.endDate + ' 满' + dis.useCondition + '元可用' +
//                                dis.sku + ' ' + dis.commodName);
//                        dises.push('</label></div>');
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

    /**
     * 使用优惠券
     */
    $('#userDis').on('click', function(){
        var code = $('#disCode').val();
        code && checkCode(code);
    });

    /**
     * 撤销优惠券
     */
    $('#unuserDis').on('click', function(){
        var $balance = $('#balance');
        var balance = $balance.length?$balance.val():0;
        $('#userDis').toggle();
        $('#unuserDis').toggle();
        //$('.bg-green-lighter').removeClass('bg-green-lighter');
        $('#costPrice').val($('#realpayPrice').val()-balance);
        $('#disCode').removeAttr('readonly');
        $('#disId').val('');
        $('#saleName').val(loginUser);
        $('#saleUserId').val('');
        $('#disMsg').html('');
    });
    //验证优惠券
    var checkCode = function(code){
        var uid = $('#userId').val(),
            sku = $('#categoryId').val(),
            comId = $('#programId').val(),
            price= 0,
            $balance = $('#balance');
        if($('#isMailDiv input[name="isMail"]:checked ').val()==0){
            price = $('#costPrice').val();
        }else{
            price = $('#costPrice').val()*1 -  $('#studyPackagePrice').val()*1 ;
        }
        var balance = $balance.length?$balance.val():0;
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
            code: code
        }, function(data){
            if(ExceptionDialog(data)) {
                if(isNaN(data.result)){
                    var discount = data.result.discount,
                        teacher = data.result.teacher,
                        tabs = [],
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
                        $('#costPrice').val($('#realpayPrice').val()-balance);
                        $('#disMsg').html('优惠券使用规则不符');
                        return;
                    }
                    $('#costPrice').val(price-balance);
                    $('#disId').val(discount.id);
                    $('#saleName').val(teacher.teachName);
                    $('#saleUserId').val(teacher.id);
                    if(discount.discountType == 'fq') {
                        tabs.push('<table class="table"><tr><td>分期次数</td><td>' + fq.fq + '期</td></tr>');
                        if (fq.fq >= 1) {
                            if(fq.shuju[0].periodMoney && parseFloat(fq.shuju[0].periodMoney)>=price){
                                $('#costPrice').val($('#realpayPrice').val()-balance);
                                $('#disMsg').html('优惠券使用规则不符');
                                return;
                            }
                            if($('#isMailDiv input[name="isMail"]:checked ').val()==1){
                                tabs.push('<tr><td>一期（首付）</td><td id="onePrice" data-price="' + (fq.shuju[0].periodMoney-balance+$("#studyPackagePrice").val()*1) + '">'+(balance?'优惠券首付('+fq.shuju[0].periodMoney+')-余额('+balance+')=':'')+(fq.shuju[0].periodMoney-balance+$("#studyPackagePrice").val()*1)+'元</td></tr>');
                                price -= parseFloat(fq.shuju[0].periodMoney)+$("#studyPackagePrice").val()*1;
                            }else{
                                tabs.push('<tr><td>一期（首付）</td><td id="onePrice" data-price="' + (fq.shuju[0].periodMoney-balance) + '">'+(balance?'优惠券首付('+fq.shuju[0].periodMoney+')-余额('+balance+')=':'')+(fq.shuju[0].periodMoney-balance)+'元</td></tr>');
                                price -= parseFloat(fq.shuju[0].periodMoney);
                            }

                        }
                        if (fq.fq >= 2) {
                            if(fq.shuju[1].periodMoney && parseFloat(fq.shuju[1].periodMoney)>=price){
                                $('#costPrice').val($('#realpayPrice').val()-balance);
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
                    $('#costPrice').val($('#realpayPrice').val()-balance);
                    $('#disMsg').html(data.msg);
                    //$('.bg-green-lighter').removeClass('bg-green-lighter');
                }
            }
        });
    }

    $('#saveOrderBtn').on('click', function(){
        $('#addOrderForm').submit();
    });
    $('#addOrderForm').validate({
        onkeyup: false,
        messages: {
            realpayPrice: {
                min: '金额必须大于0'
            },
            costPrice: {
                min: '金额必须大于0'
            }
        },
        submitHandler: function(form) {

            if($('#disId').val()==null||$('#disId').val()==""){
                var message ="该订单没有使用优惠券！";
                BootstrapDialog.confirm({
                    title: '提示',
                    message: message,
                    type: BootstrapDialog.TYPE_DANGER,
                    closable: true,
                    btnCancelLabel: '取消',
                    btnOKLabel: '确认录入',
                    btnOKClass: 'btn-warning',
                    callback: function (result) {
                        if (result) {
                            saveOrderAjax(form);
                        }
                    }
                })
            }else{
                saveOrderAjax(form);
            }
        }
    });

    function saveOrderAjax(form){
        $.ajax({
            url: path+'/payOrder/addOrder',
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

    $.resetInfo = resetInfo;
})(window, jQuery);