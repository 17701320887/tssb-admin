/**
 * Created by admin on 2017/3/25.
 * 试卷页面相关功能
 * wangpengcheng
 */
//提交时调用后台
function subm(dataId,stateN,content){
    $.ajax({
        url : $("#path").val()+"/title/updateState",
        type : "POST",
        data : {
            "state":stateN,
            "tid":dataId,
            "content":content
        },
        cache : false, // 禁用缓存
        async : false,
        success:function(ret){
            if(ret.code=="200"){
                $('.tiku-cur').click();
            }
            layer.alert(ret.msg);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            layer.alert('操作异常');
        }
    });
}
//审核不通过的时候调用
function queding(dataId,stateN,content){
	if($.trim(content).length==0){
		layer.alert('理由长度为1~100哦');
		return;
	}
    layer.closeAll();
    subm(dataId,stateN,content);
}
(function($){
    var alertMsg = '一次只能操作一题，请先保存或取消上一题';
    var tiStatus = ['', '未提审', '待审核', '通过', '未通过', '禁用'];
    var editorAble = true;
    var path = $('#path').val(),
        skuId = $("#skuId").val(),
        subId = $("#subId").val(),
        paperId = $('#paperId').val(),
        f;//自定义试题数据提交后的回调函数，可不实现

    if (paperId) editorAble = false;

    $('input[type="text"], textarea').on('blur', function(){
        $(this).val($.trim($(this).val()));
    });
    $('.tiku-pfGz').delegate('input[type="text"]', 'blur', function () {
        $(this).val($.trim($(this).val()));
    });

    $('.tiku-ul li').on('click',function(){
        /*if($('.iseditoring').length  || $('input[name=parentId]').val()){
            layer.alert(alertMsg);
            return;
        }*/
        var id = $(this).attr('data-type');
        $(this).addClass('tiku-cur').siblings().removeClass('tiku-cur');

        if (id) {
            $('.stem-content:first').hide();
            $('.stem-content:last').show();
            var $div = $('.tiSort');
            $div.empty();
            $('.tiCache').remove();
            $('.yl[data-type="tg"], .yl[data-type="btg"], .ty_title').hide();
            $.ajax({
                url: path+'/title/queryTiByPidAndType',
                data:{
                    paperId: paperId,
                    typeCode: id
                },
                type:'post',
                success:function(data){
                    var html = template('tiHtml', {tis: data, status: tiStatus});
                    $div.append(html);
                    sortFun();
                    subId && getJudge(id);
                },
                dataType:'json'
            });
        } else {
            $('.stem-content:first').show();
            $('.stem-content:last').hide();
        }
    });

    $($('.tiku-ul').children()).each(function(index, obj){
        var dt = $(obj).attr('data-type');
        dt && $('.King-all input[value='+dt+']').attr("checked","checked");
    });

    var getJudge = function (typeCode) {
        $.post(path + '/tiPaperTitleType/queryByPaperAndType', {
            paperId: paperId,
            typeCode: typeCode
        }, function (data) {
            if (data.code === '200') {
                var judge = data.result;
                var html = template('judgeHtml', judge);
                $('#judgeForm').html(html);
            }
        });
    };
    //anm();
    //题型拖拽排序
    $('.tiTypeSort').sortable({ items: 'li:gt(0)', cursor: "move"}).bind('sortupdate',function() {
        var types = [];
        $.each($(this).children(), function(index, obj){
            var t = $(obj).attr('data-type');
            t && types.push(t);
        });
        $.ajax({
            url: path+'/tiPaperTitleType/updateTypeSort',
            data:{
                paperId:paperId,
                types:types
            },
            type:'post',
            success:function(result){
                if(result.code == '200'){
                    //layer.alert('调序成功！', {icon: 1});
                    $('input[data-type=qy]').attr('data-type', 'ylts').val('预览提审');
                }else{
                    layer.alert(result.msg);
                }
            },
            dataType:'json'
        });
    });
    //点击新增试题按钮
    $('.addTitle').click(function(){
        if (subId && $('#judgeId').val() == 0) {//&& (!$('#tiJudge').val() || !$('input[name=judgeType]:checked').val() || !$('#totalScore').val())
            layer.alert('请先保存该大题的判分规则再添加试题');
            return;
        }
        if($('.iseditoring').length || $('input[name=parentId]').val()){
            layer.alert(alertMsg);
            return;
        }
        $.ajax({
            url:path+'/title/type',
            data:{
                skuId: skuId,
                subId: subId,
                typeCode: $('.tiku-cur').attr('data-type'),
                pId: paperId
            },
            type:'post',
            success:function(html){
                $('.addTitle').parent().before('<div class="tiCache">'+html+'</div>');
                isHideScore();
            }
        });
    });

    var anm = function(){
        var resT = 0;
        $(".tiku-tx li").each(function(){
            resT += parseInt($(this).width());//获取宽度。并累加
        });
        $(".tiku-tx ul").width(resT+30+"px");
        var indexT=0;
        var a1T=parseInt((resT+30)/1012);
        $(".tiku-r").click(function(){
            if(indexT<a1T){
                indexT++;
                $(".tiku-tx").animate({
                    scrollLeft: 1012 * indexT
                }, 500)
            }
        });
        $(".tiku-l").click(function(){
            if(indexT>0){
                indexT--;
                $(".tiku-tx").animate({
                    scrollLeft: 1012 * indexT
                }, 500)
            }
        });
        indexT = parseInt($('.tiku-ul li').index($('.tiku-cur'))/10);
        $(".tiku-tx").animate({
            scrollLeft: 1012 * indexT
        }, 500)
    };
    anm();
    //试题拖拽排序
    var sortFun = function(){
        $('.tiSort').unbind('sortupdate');
        $('.tiSort').sortable({items:'.tis', cursor: "move"}).bind('sortupdate',function() {
            var titles = [];
            $.each($(this).children(), function(index, obj){
                var o = $(obj).attr('data-id');
                o && titles.push(o);
            });
            $.ajax({
                url: path+'/tiPaper/updateSort',
                data:{
                    paperId:paperId,
                    titles:titles,
                    typeCode:$('.tiku-cur').attr('data-type')
                },
                type:'post',
                success:function(result){
                    if(result.code == '200'){
                        //layer.alert('调序成功！', {icon: 1});
                        $('input[data-type=qy]').attr('data-type', 'ylts').val('预览提审');
                    }else{
                        layer.alert(result.msg);
                    }
                },
                dataType:'json'
            })
        });
    }
    $('.tiSort').children().length && sortFun();

    $('.tiku-add').click(function(){
        if(!paperId){
            layer.alert('请先保存试卷信息');
            return;
        }
        if (editorAble) {
            $('.King-all').show();
        }
    });
    $('.closeType').click(function(){
        $('.King-all').hide();
    });
    $('.saveType').click(function(){
        var types = [];
        $.each($('input[name=typeCodes]:checked'), function(index, type){
            types.push($(type).val());
        });
        if (types.length == 0) types.push(0);
        $.ajax({
            url: path+'/tiPaperTitleType/savePaperType',
            data: {
                paperId: paperId,
                types: types
            },
            type: 'post',
            success: function(result){
                if( result.code == '200') {
                    layer.alert('保存成功！', {icon: 1}, function(){
                        window.location.reload();
                    });
                } else {
                    layer.alert(result.msg);
                }
            }
        });
    });

    $('.savePaper').on('click', function(){
        var errors = [];
        var name = $('#name').val(),
            $paperDes = $('#paperDes'),
            totalTime = $('#totalTime').val(),
            startTime = $('#startTime').val(),
            answerTime = $('#answerTime').val(),
            isVip = $('input[name=isVip]:checked').val(),
            type = $('input[name=type]:checked').val(),
            totalScore = parseFloat($('#paperTotalScore').val());
        if (!$paperDes.text()) {
            layer.alert('请填写考生须知');
            return;
        }
        if(!name){
            layer.alert('卷名不能为空');
            return;
        }else if(name.length > 60){
            layer.alert('卷名应该1~60个字');
            return;
        }
        var regExp = /^[-]?(0|([1-9]\d*))(\.\d)?$/;//小数点后一位，负数或正数
        if (subId && !regExp.test(totalTime)) {
            layer.alert('时间格式必须是整数');
            return;
        }
        if (subId && (totalTime < 1 || totalTime > 300)) {
            layer.alert('时间应1~300分钟');
            return;
        }
        if (!subId && !startTime) {
            layer.alert('开始时间不能为空');
            return;
        }
        if (!subId && !answerTime) {
            layer.alert('公布时间不能为空');
            return;
        }
        if (!subId && startTime >= answerTime) {
            layer.alert('公布时间需晚于开始时间');
            return;
        }
        if(!type){
            layer.alert('请选择试卷类型');
            return;
        }
        if(subId && !isVip){
            layer.alert('请选择是否为vip');
            return;
        }
        if (subId && !regExp.test(totalScore)) {
            layer.alert('分数格式必须是整数或保留一位小数');
            return;
        }
        if(subId && (totalScore < 0.1 || totalScore > 1000)){
            layer.alert('分数应0.1~1000分');
            return;
        }
        if (!subId) {
            totalScore = null;
        }
        // layer.confirm('【试卷类型、VIP、年份】保存后将无法修改<br>确认保存吗？', {
        //     btn: ['确认','取消'] //按钮
        // }, function(){
            $.ajax({
                url: path+'/tiPaper/mgrTiPaperAdd',
                data: {
                    id: paperId,
                    skuCode: skuId,
                    subjectCode: subId,
                    name:name,
                    paperDes: $paperDes.html(),
                    totalTime: totalTime,
                    startTime: startTime,
                    answerTime: answerTime,
                    isVip: isVip,
                    classifyCode: type,
                    year: $('.year').val(),
                    address: $('#address').val(),
                    totalScore: totalScore
                },
                type: 'post',
                success: function(result){
                    if(result.code == '200'){
                        if (result.result > 0) {
                            layer.alert('保存成功！', {icon: 1}, function () {
                                window.location.href = path + '/tiPaper/paperAddTi/' + result.result;
                            });
                        } else if (result.result == '-1') {
                            layer.alert("分值设置不正确，请检查！");
                        } else if (result.result == '-2') {
                            layer.alert("同一sku中已存在该试卷，请重新输入名称");
                        } else if (result.result == '-3') {
                            layer.alert("开始考试当天已经创建试卷！");
                        } else {
                            layer.alert("服务器异常");
                        }
                    }else{
                        layer.alert(result.msg);
                    }
                }
            });
        // }, function(){
        // });
    });

    var getHtmlPaper = function (id, element) {
        $.ajax({
            url:path+'/title/type',
            data:{
                skuId: skuId,
                subId: subId,
                typeCode: $('.tiku-cur').attr('data-type'),
                tId: id,
                pId: paperId
            },
            type:'post',
            success:function(html){
                element.before('<div class="tiCache">'+html+'</div>');
                showBtn();
                element.hide();
                isHideScore();
            }
        });
    };

    var isHideScore = function () {
        var judgeType = $('input[name=judgeType]:checked').val();
        if (judgeType === '2') {
            $('#score').parents('.analysis').remove();
        }
    };

    $('.stem-content .tiSort').delegate('.tiJJ', 'dblclick', function(){
        if (subId && $('#judgeId').val() == 0) {//&& (!$('#tiJudge').val() || !$('input[name=judgeType]:checked').val() || !$('#totalScore').val())
            layer.alert('请先保存该大题的判分规则再添加试题');
            return;
        }
        if($('.iseditoring').length  || $('input[name=parentId]').val()){
            layer.alert(alertMsg);
            return;
        }
        var element = $(this).parent();
        getHtmlPaper($(this).parent().attr('data-id'), element);
    });

    $('.stem-content .tiSort').delegate('.tiDE', 'click', function(){
        var element = $(this).parent();
        var id = element.attr('data-id');
        layer.confirm('确认要删除？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.ajax({
                url: path+'/title/delete',
                data: {
                    titleId: id,
                    paperId: paperId
                },
                type: 'post',
                success: function(result){
                    if(result.code == '200'){
                        element.remove();
                        getPaperScore();
                        layer.closeAll();
//                            layer.alert('删除成功！', {icon: 1}, function(){
//                                window.location.reload();
//                            });
                    }else{
                        layer.msg('删除失败！', {icon: 2});
                    }
                }
            });
        }, function(){
        });
    });

    $('.tiku-pfGz').delegate('.saveJudge', 'click', function(){
        if($('.iseditoring').length  || $('input[name=parentId]').val()){
            layer.alert(alertMsg);
            return;
        }
        var tiJudge = $('#tiJudge').val(),
            judgeType = $('input[name=judgeType]:checked').val(),
            totalScore = $('#totalScore').val(),

            wrongChoice = $('#wrongChoice').val(),
            itemScore = $('#itemScore').val(),
            drainChoice = $('#drainChoice').val();

        var typeCode = $('.tiku-cur').attr('data-type');
        if (!tiJudge || tiJudge.length > 100) {
            layer.alert('判分规则为1~100个字');
            return;
        }
        var regExp = /^[-]?(0|([1-9]\d*))(\.\d)?$/;//小数点后一位，负数或正数
        if (!regExp.test(totalScore) || ($('#drainChoice').length > 0 && !regExp.test(drainChoice)) || ($('#wrongChoice').length > 0 && !regExp.test(wrongChoice))) {
            layer.alert('分数不可为空且格式必须是整数或保留一位小数');
            return;
        }
        if (judgeType == 2) {
            if (!regExp.test(itemScore)) {
                layer.alert('分数不可为空且格式必须是整数或保留一位小数');
                return;
            }
        }
        if (parseFloat(totalScore) < 0.1 || parseFloat(totalScore) > 1000) {
            layer.alert('大题总分为0.1~1000分');
            return;
        }
        if (judgeType == 2) {
            if (parseFloat(itemScore) < 0.1 || parseFloat(itemScore) > parseFloat(totalScore)) {
                layer.alert('单题分数为0.1~' + totalScore + '分');
                return;
            }
        }
        if (parseFloat(totalScore) < parseFloat(drainChoice)) {
            layer.alert('漏选分数为0~'+totalScore+'分');
            return;
        }
        if (parseFloat(totalScore) < parseFloat(wrongChoice) || parseFloat(totalScore) + parseFloat(wrongChoice) < 0) {
            layer.alert('错选分数为-'+totalScore+'~'+totalScore+'分');
            return;
        }
        $.post(path + '/tiPaperTitleType/updateRule', {
            paperId: paperId,
            bigTitleType: typeCode,
            tiJudge: tiJudge,
            judgeType: judgeType,
            totalScore: totalScore,
            wrongChoice: isNaN(wrongChoice)?0:wrongChoice,
            itemScore: isNaN(itemScore)?0:itemScore,
            drainChoice: isNaN(drainChoice)?0:drainChoice
        }, function (data) {
            if (data.code === '200' && data.result > 0) {
                layer.alert('保存成功');
                $('.tiku-cur').click();
                getPaperScore();
            } else {
                layer.alert('保存失败，分数设置异常');
            }
        });
    });
    $('.tiku-pfGz').delegate('input[name=judgeType], #itemScore, #totalScore', 'change', function () {
        $('#judgeId').val(0);
    });
    $('.closeWin').on('click', function(){
        layer.confirm('您确定要关闭本页吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            window.opener = null;
            window.open('', '_self');
            window.close()
        }, function(){
        });
    });
    //异步获取试卷总分
    var getPaperScore = function(){
        $('input[data-type=qy]').attr('data-type', 'ylts').val('预览提审');
        $.ajax({
            url: path+'/tiPaper/getScore',
            data: {
                paperId: paperId
            },
            type: 'post',
            success: function(result){
                if (result.code == '200') {
                    $('.yulan-top span').html(parseFloat(result.result.score).toFixed(2) + '分 / ' +
                        parseFloat(result.result.scoreNow).toFixed(2) + '分');
                }
            }
        });
    };

    var updatePaperState = function (state, content) {
        $.ajax({
            url : path+"/tiPaper/updatePaperState",
            type : "POST",
            data : {
                "state":state,
                "paperId":paperId,
                content: content
            },
            cache : false, // 禁用缓存
            async : false,
            success:function(ret){
                if(ret.code=="200"){
                    // layer.alert(ret.msg+'，该页面将要关闭', {
                    //     closeBtn: 0
                    // }, function(){
                    //     window.opener=null;
                    //     window.open('','_self');
                    //     window.close();
                    // });
                    window.location.reload();
                }else{
                    layer.alert(ret.msg);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                layer.alert('操作异常');
            }
        });
    }

    $('.yulan-right').delegate('.yl', 'click', function (event) {
        var $this = $(event.target);
        var type=$this.attr('data-type');
        switch (type){
            case 'xg'://修改
                editorAble = true;
                $this.attr('data-type', 'qx').val('取消');
                $('.tiku-cur').click();
                $('#examYear').removeAttr('disabled');
                subId && showEpTree();
                enableElement();
                break;
            case 'qx'://取消
                editorAble = false;
                $this.attr('data-type', 'xg').val('修改');
                $('.tiku-cur').click();
                disableElement();
                break;
            case 'ylts'://预览提审
                window.location.href = path+'/title/preview/2/'+paperId;
                break;
            case 'qy'://启用
            case 'sh'://审核
                updatePaperState(3);
                break;
            case 'nsh'://审核
                layer.prompt({
                    formType: 2,
                    maxlength: 300,
                    title: '请输理由'
                }, function(value, index, elem){
                	if($.trim(value).length==0){
            			layer.alert('理由长度为1~300哦');
            			return;
            		}
                    updatePaperState(4, value);
                    layer.close(index);
                });
                break;
            case 'jy'://禁用
                updatePaperState(5);
                break;
            case 'tg':
            case 'btg':
                var tId= $('#parentId').val();
                if(!tId){
                    tId= $('#id').val();
                }
                if(type=='btg'){
                    layer.prompt({
                        formType: 2,
                        maxlength: 100,
                        title: '请输理由'
                    }, function(value, index, elem){
                        queding(tId, 4, value); //得到value
                        layer.close(index);
                    });
                }else{//修改题的状态
                    subm(tId,3,'');
                }
                break;
            default: {

            }
        }
        var type=$this.attr('data-type');
    });

    var showBtn = function () {
        var status = $('#status').val(),
            paperStatus = $('#paperStatus').val();
        if (status) {
            var $ele = $('.yl[data-type="tg"], .yl[data-type="btg"]'),
                $span = $('.ty_title');
            if (status == 2 && paperStatus == 2) {
                $ele.css('background-color','#348fe2').removeAttr('disabled');
            } else {
                $ele.css('background-color','#b6c2c9').attr('disabled','disabled');
            }
            $ele.show();
            $span.show();
        }
    };

    var timers = null;
    $('.stem-content').bind('DOMNodeInserted', function(e) {
        if (timers != null) {

        } else {
            timers = setTimeout(function () {
                showBtn();
                if (editorAble) {//试卷处于待审核、启用、禁用不修改时
                    enableElement();
                } else {
                    disableElement();
                }
                clearTimeout(timers);
                timers = null;
            }, 100);
        }
    });

    var disableElement = function () {
        $('.stem input:not(.quxiao), .stem select, #examYear').attr('disabled', 'disabled');
        // $('div[contenteditable=true]').attr('contenteditable', false);
        $('#paperDes').attr('contenteditable', false);
        $('.updateCl, .saveCl').remove();
        $('.tiku-delete, .stem-xt, .stem-ti').hide();
        $.fn.zTree.destroy(zTreeObj);
        setTimeout(function () {
            $('#songListEdit').sortable("disable");
            $(".tiTypeSort").sortable("disable");
            $(".tiSort .tis").length && $(".tiSort").sortable("disable");
            $(".tiSort4 .tiBig").length && $(".tiSort4").sortable("disable");
        }, 200);
    };

    var enableElement = function () {
        $('.stem input:not([name=type]), .stem select, #examYear').removeAttr('disabled');
        // $('div[contenteditable=false]').attr('contenteditable', true);
        $('#paperDes').attr('contenteditable', true);
        $('.tiku-delete, .stem-xt, .stem-ti').show();
        setTimeout(function () {
            $('#songListEdit').sortable("enable");
            $(".tiTypeSort").sortable("enable");
            $(".tiSort .tis").length && $(".tiSort").sortable("enable");
            $(".tiSort4 .tiBig").length && $(".tiSort4").sortable("enable");
        }, 200);
    };

    $.getPaperScore = getPaperScore;
    $.getHtmlPaper = getHtmlPaper;
    $.isHideScore = isHideScore;
})(jQuery);