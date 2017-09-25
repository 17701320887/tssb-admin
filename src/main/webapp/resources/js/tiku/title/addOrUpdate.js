/**
 * Created by admin on 2016/7/18.
 */
;(function($, window, document, undefined){
    var defaultData = function(){
        return {
            id:'',
            examPoint:[],//考点集合
            point:'',//文字类型的考点
            des:'',
            desAudio:'',
            desVoide:'',
            typeCode:'',//题型id
            excuse:'',//理由
            answer:'',//答案
            interfere:'',//选词填空的干扰项
            analyzeText:'',//解析
            analyzeVoiceUrl:'',//语音
            letvVideoId:'',//视频
            parentId:'', /* 试题父id，材料题使用 */
            titles:[],
            titleMac:'',
            subjectId:'', /* 科目外键id */
            sku:'',		 /* sku外键id */
            isVip:'',	 /* 建议vip使用，1是、0否 */
            titleType:'',
            source:'',		 /* 试题来源，1参考书、2网络、3直编 */
            year:'',		 /* 试题所属年份 */
            options:[],     /* 选项 */
            tiItems:[],
            paperId:'',
            sortNum:'',
            score:''
        }
    };

    var data;
    var error;/* 提交数据时的错误信息 */
    var opts = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var o_a = false;//标记 先验证选项，选项有问题时不用验证答案
    var regExp = /^[-]?(0|([1-9]\d*))(\.\d)?$/;//小数点后一位，负数或正数

    /**
     * 获取题目信息
     */
    var getDes = function(){
        //获取题干 *
        var $des = $('.des');
        var maxLength = $des.attr('max_length') || 3000;
        if($des.text().length <= 0 || $des.text().length > maxLength){
            error.push({msg: '题干内容为1~'+maxLength+'个字', element: $des.parent()});
        }else{
            data.des = $des.html();
        }
        //获取题干音频
        var desAudio = $('input[name=desAudio]').val();
        if(desAudio){
            data.desAudio = desAudio;
        }else{
            data.desAudio = '';
        }
        //获取题干视频
        var desVoide = $('input[name=desVoide]').val();
        if(desVoide){
            var flag = $('#yzDesFlag').val();
            if(flag == '1'){
                data.desVoide = desVoide;
            }else{
                error.push({msg:'题干ID未验证或验证不通过',element:$('input[name=desVoide]').parent().parent().parent().parent()});
            }
        }else{
            data.desVoide = '';
        }
    };

    /**
     * 选项
     */
    var getOpt = function(){
        //选项 *
        var $opts = $('.options');
        $.each($opts, function(index, option){
            var optText = $(option).text().trim(),
                optHtml = $(option).html().trim();
            var maxLength = $(option).attr('max_length') || 3000;
            if ($(option).find('img, table').length == 0 && (optText.length < 1 || optText.length > maxLength)) {
                error.push({msg: '第'+(index+1)+'项内容应为1~'+maxLength+'个字', element: $(option).parent()});
                o_a = true;
            } else {
                data.options.push({
                    sortNum: index+1,
                    optionContent: optHtml
                });
            }
        });
        var os = [];
        $.each(data.options, function (index, o) {
            if ($(o.optionContent).find('img').length > 0) return true;
            var optText = o.optionContent.replace(/<\/?[^>]*>/g,'');
            if (os.length > 0 && $.inArray(optText, os) >= 0) {
                error.push({msg: '选项有重复', element:$('#songListEdit')});
                o_a = true;
                return false;
            }
            os.push(optText);
        });
    };

    //分录题选项 *
    var getItem = function(){
        var fenlus = $('.fenlus').find('.fenlu');
        $.each(fenlus, function(i, fenlu){
            var items = $(fenlu).find('.item');
            $.each(items, function(j, item){
                var loanType = $(item).find('[name=loanType]').val(),
                    itemName = $(item).find('[name=itemName]').val(),
                    price = parseFloat($(item).find('[name=price]').val());
                if(!itemName || itemName.length > 10){
                    error.push({msg: '分录项科目为1~10个字', element: $(item)});
                } else if (isNaN(price)) {
                    error.push({msg: '分录项金额未填写', element: $(item)});
                } else if (!regExp.test(price)) {
                    error.push({msg: '分录项金额格式错误', element: $(item)});
                }
                data.tiItems.push({
                    groupNumber: i,
                    sortNumber: j,
                    loanType: loanType,
                    itemName: itemName,
                    price: price
                });
            });
        });
    };

    //答案 *
    var getAnswer = function (type) {
        var a = true;//如果有答案没填写不需要验证最后答案
        if (o_a) {
            return;
        }
        var answerStr = '', interfere = '';
        var $answers = $('input[name=answer]');
        if (!$answers.length) $answers = $('.answer');
        var $interferes = $('input[name=interfere]');
        $.each($answers, function(index, answer){
            if ($.inArray(parseInt(type), [1, 2, 3, 10]) >= 0 && answer.checked) {
                if(answerStr.length>0)
                    answerStr += '╎';
                switch(parseInt(type))
                {
                    case 1: case 2://单选 多选，答案按照排序进行确认
                        answerStr += opts[index];
                        break;
                    case 3: case 10://判断
                        answerStr += $(answer).val();
                        break;
                    default:{
                        console.log(type);
                    }
                }
            } else if ($.inArray(parseInt(type), [6, 7, 8, 9]) >= 0) {
                if ($interferes.length > 0) {
                    var $fere = $($interferes[index]);
                    if ($fere.is(':checked')) {
                        if(interfere.length>0)
                            interfere += '╎';
                        if ($(answer).val()) {
                            interfere += $(answer).val()
                        } else {
                            a = false;
                            error.push({msg:'未填写答案',element:$(answer).parents('.stemxx')});
                        }
                        return true;
                    }
                }
                if(answerStr.length>0)
                    answerStr += '╎';
                switch(parseInt(type))
                {
                    case 6://简答
                        var maxLength = $(answer).attr('max_length') || 3000;
                        if ($(answer).text() && $(answer).text().length > maxLength) {
                            a = false;
                            error.push({msg:'答案应为1~'+maxLength+'个字', element: $(answer).parents('.stemxx')});
                        } else {
                            answerStr += $(answer).html();
                        }
                        break;
                    case 7: case 8: //填空、选词填空 答案根据内容确认
                        var maxLength = $(answer).attr('max_length') || 3000;
                        if ($(answer).val() && $(answer).val().length <= maxLength) {
                            answerStr += $(answer).val()
                        } else {
                            a = false;
                            error.push({msg: '答案应为1~'+maxLength+'个字', element: $(answer).parents('.stemxx')});
                        }
                        break;
                    case 9: //段落匹配
                        if ($(answer).val()) {
                            answerStr += $(answer).val()
                        } else {
                            a = false;
                            error.push({msg: '未填写答案', element: $(answer).parents('.stemxx')});
                        }
                        break;
                    default:{
                        console.log(type);
                    }
                }
            }
        });
        if (a && $.inArray(parseInt(type), [7, 8]) >= 0) {
            var as = [];
            a && $.each(answerStr.split('╎'), function (i, an) {
                if ($.inArray(an, as) >= 0) {
                    error.push({msg: '答案有重复', element:$('#songListEdit')});
                    a = false;
                    return false;
                }
                as.push(an);
            });
            a && $.each(interfere.split('╎'), function (i, an) {
                if ($.inArray(an, as) >= 0) {
                    error.push({msg: '答案有重复', element:$('#songListEdit')});
                    a = false;
                    return false;
                }
                as.push(an);
            });
        }
        if(a && answerStr){
            if (interfere) {
                data.interfere += interfere;
            } else if (a && parseInt(type) == 8) {
                error.push({msg: '至少添加一个干扰项', element:$('#songListEdit')});
            }
            data.answer = answerStr;
        }else if (a){
            var $p = $answers.parents('#songListEdit').length > 0 ? $answers.parents('#songListEdit') : $answers.parents('.answerParent');
            error.push({msg:'未填写答案', element: $p});
        }
    };

    //理由
    var getExcuse = function () {
        var $excuse = $('#excuse');
        if(!$excuse.text() || $excuse.text().length > 500){
            error.push({msg:'理由为1~500个字', element: $excuse.parent()});
        }else{
            data.excuse = $excuse.html();
        }
    }

    //获取知识点 *
    var getPoint = function () {
        var points = $('#exampoint').children();
        if(points.length){
            $.each(points, function(index, p){
                data.examPoint.push($(p).attr('data-id'));
            });
        }else{
            error.push({msg:'请选择知识点',element:$('#exampoint').parent()});
            // return;
        }
    }

    var getScore = function () {
        var regExp = /^[-]?(0|([1-9]\d*))(\.\d)?$/;//小数点后一位，负数或正数
        var score = $('#score').val();
        var judgeType = $('input[name=judgeType]:checked').val();
        if(judgeType == 1 && (!regExp.test(score) || score == 0 || score > 1000)){
            error.push({msg:'分值输入不合理',element:$('#score').parents('.analysis')});
        }else{
            data.score = score;
        }
    }

    //解析 * 2000
    var getAnalyze = function () {
        var analyzeText = $('.analyzeText').text(),
            analyzeHtml = $('.analyzeText').html();
        var maxLength = $('.analyzeText').attr('max_length') || 3000;
        if ($('.analyzeText').find('img, table').length == 0 && (analyzeText == 0 || analyzeText.length > maxLength)) {
            error.push({msg:'解析内容为1~'+maxLength+'个字', element:$('.analyzeText').parent()});
        }else{
            data.analyzeText = analyzeHtml;
        }
    }

    //音频
    var getVoice = function () {
        var analyzeVoiceUrl = $('input[name=analyzeVoiceUrl]').val();
        if(analyzeVoiceUrl){
            data.analyzeVoiceUrl = analyzeVoiceUrl;
        }else{
            data.analyzeVoiceUrl = "";
        }
    }

    //视频
    var getViode = function () {
        var letvVideoId = $('input[name=letvVideoId]').val();
        if(letvVideoId){
            var flag = $('#yzFlag').val();
            if(flag == '1'){
                data.letvVideoId = letvVideoId;
            }else{
                error.push({msg:'乐视ID未验证或验证不通过',element:$('input[name=letvVideoId]').parent().parent().parent().parent()});
            }
        }else{
            data.letvVideoId = "";
        }
    }

    //vip *
    var getVip = function () {
        var isVip = $('input[name=isVip]:checked').val();
        if(isVip){
            data.isVip = isVip;
        }else{
            error.push({msg:'选择是否属于VIP',element:$('input[name=isVip]').parent().parent().parent()});
            // return;
        }
    }

    //题类 *
    var getType = function () {
        var titleType = $('input[name=titleType]:checked').val();
        if(titleType){
            data.titleType = titleType;
        }else{
            error.push({msg:'选择题类',element:$('input[name=titleType]').parent().parent().parent()});
            // return;
        }
    }

    //来源 *
    var getSource = function () {
        var source = $('input[name=source]:checked').val();
        if(source){
            data.source = source;
        }else{
            error.push({msg:'选择来源',element:$('input[name=source]').parent().parent().parent()});
            // return;
        }
    }

    //年份 *
    var getYear = function () {
        if($('.year').length){
            var year = $('.year').val();
            data.year = year;
        }
    }

    //父id，材料题需要追加父id
    var getParent = function () {
        if($('input[name=parentId]').length){
            var pId = $('input[name=parentId]').val();
            if(pId){
                data.parentId = pId;
            }else{
                error.push('先确保材料录入！');
                // return;
            }
        }
    }

    var getPointStr = function () {
        var point = $('input[name=point]').val();
        if (point) {
            data.point = point;
        } else {
            error.push({msg:'添加考点',element:$('input[name=point]').parents('.analysis')});
        }
    }

    var validate = function(){ /* 获取数据并进行验证 */
        /**
         * typeModel
         * 1：单选，2：多选，3：判断，4：材料，5：分录，6：简答，7：填空，8：选词填空，9：段落匹配
         */
        var typeModel = $('#typeModel').val(),
            isCl = $('#tiType').val(),
            subId = $('#subId').val(),
            paperId = $('#paperId').val();

        data = defaultData();
        error = [];
        o_a = false;

        typeModel = parseInt(typeModel);

        getDes();//所有题型都要获取题目

        if ($.inArray(typeModel, [1, 2, 9]) >= 0) {//单选、多选、段落匹配 需要选项
            getOpt();
        }

        if ($.inArray(typeModel, [1, 2, 3, 6, 7, 8, 9, 10]) >= 0) {//单选、多选、判断、简答、填空、选词填空、段落匹配 需要答案
            getAnswer(typeModel);
        }

        if (typeModel == 5) {//分录
            getItem();
        }

        if (typeModel == 10) {//判断说明 需要理由
            getExcuse();
        }

        if ($.inArray(typeModel, [1, 2, 3, 5, 6, 7, 8, 9, 10]) >= 0) {//除录入材料时，其它录入试题全部需要高级设置
            subId && getPoint();
            getAnalyze();
            getVoice();
            getViode();
            if (paperId == null || paperId == 0) {//非试卷录题时需要以下四个属性
                getVip();
                getType();
                getSource();
                getYear();
            } else {//试卷录题时需要试题分数
                getScore();
            }
        }

        if (isCl === 'cl') {//材料题录入小题时需管理父id
            getParent();
        }

        if (!subId && typeModel != 4) {//没有sub为每日一练 且为材料题子题时获取以下属性
            getPointStr();
            getSource();
            getYear();
        }

    }

    //默认的保存成功后处理页面
    var successFun = function(result){
        var tiType = $('#tiType').val(),//4为材料题
            paperId = $('#paperId').val();
        if(result.code == '200' && result.result){
            /**
             * 三种情况：
             *  1.单独保存一个试题，保存完试题后，跳转到预览页面进行预览进行预览、审核、修改等。 paperId==null tiType!=cl
             *  2.保存材料题上小题，保存完后直接刷新页面即可     paperId==null  tiType==cl
             *  3.保存试卷上小题，保存完成后刷新页面             paperId!=null  tiType!=cl
             *  4.保存试卷上材料题小题，保存完成后折叠小题即可    paperId!=null  tiType==cl
             */
            if(paperId==null && tiType!='cl'){//1
                window.location.href='/title/preview/1/'+result.result;
                //保存单个试题后
                // layer.closeAll();
                // $('.tiku-cur').click();
            }else if(paperId==null && tiType=='cl'){//录材料题的小题时保存试题成功后将试题折叠起来
                layer.closeAll();
                var parentId = $('input[name=parentId]').val();
                $.getHtml($('.tiku-cur').attr('data-type'), parentId);
            }else if (paperId!=null && tiType=='cl') {
                layer.closeAll();
                var $tis = $('.tis:hidden');
                $('.tis, .tiBig').show();
                $('.tiCache, .selectType, .titles').remove();
                $.getHtmlPaper($tis.attr('data-id'), $tis);
                $.getPaperScore();
            } else if (paperId != null && tiType!='cl'){
                layer.closeAll();
                $('.iseditoring').remove();
                $('.tiku-cur').click();
                $.getPaperScore();
            }else{
                window.location.reload();
            }
        }else{
            layer.closeAll();
            layer.msg(result.msg);
        }
    }

    var submit = function(fun){
        validate();
        data.id = $('#id').val();//标记字段，有此ID是修改功能，没有是新增
        data.subjectId = $('#subId').val();
        data.sku = $('#skuId').val();
        data.typeModel = $('#typeModel').val();
        data.typeCode = $('#typeCode').val();
        data.sortNum = ($('.tiBig').length || $('.tis').length) + 1;
        var paperId = $('#paperId').val();
        data.titleMac = paperId?'2':'1';/*试题标识，1为单独录题，2为属于试卷录题*/
        data.paperId = paperId;
        console.log(data);
        // console.log(error);
        if(error.length>0){
            layer.closeAll();
            $.each(error, function(index, v){
                //多窗口模式，层叠置顶
                v.msg && layer.open({
                    type: 1
                    ,title: false
                    ,shade: 0
                    ,time: 5000
                    ,closeBtn: 0
                    ,offset: [
                        100+(45*$('.errorMsg').length),
                        $(window).width()-200
                    ]
                    ,content: '<p class="errorMsg" style="padding: 5px 20px; background-color: #1a1a1a;line-height: 30px;color: #ffffff; filter:alpha(opacity=50); -moz-opacity:0.5; opacity:0.5;">'+v.msg+'</p>'
                    ,zIndex: layer.zIndex //重点1
                });
                flash(v.element,8,10,100);
            });
            return;
        }
        fun = fun || successFun;
        layer.load(2, {shade: [0.3, '#393D49']});
        $.ajax({
            url: paperId?'/tiPaper/savePaperTitle':'/title/save',
            data: {
                title: JSON.stringify(data)
            },
            type: 'POST',
            success: fun,
            dataType: "json"
        });
        // fun();
    };

    window.DataSubmit = {
        submit : submit
    }
})(jQuery, window, document);