/**
 * Created by admin on 2017/4/7.
 */
;(function($){
    var path = $('#path').val();
    var alertMsg = '一次只能操作一题，请先保存或取消上一题';
    //点击保存材料的按钮
    $('.saveCl').on('click', function(){
        /**
         * 1、保存材料题题干成功，跳转到修改页面进行添加小题
         * 2、试卷上材料题题干保存成功后，刷新页面即可
         */
        DataSubmit.submit(function(result){
            // layer.alert('保存成功！', {icon: 1}, function(){
            if($('#paperId').val()){
                //window.location.reload();
                $('.tis, .tiBig').show();
                $('.tiCache, .selectType, .titles').remove();
                $('.tiku-cur').click();
                layer.closeAll();
            }else{
                window.location.href = path + '/title/update/'+$('#skuId').val()+'/'+$('#subId').val()+'/'+result.result;
//                        layer.closeAll();
                // $('.tiku-cur').click();
//                        $.getHtml($('.tiku-cur').attr('data-type'), $('#id').val());
            }
            //});
        });
    });
    //点击修改材料按钮
    $('.updateCl').on('click', function(){
        if($('.iseditoring').length){
            layer.alert(alertMsg);
            return;
        }
        $(this).parents('.stem-bottom').addClass('iseditoring');
        $(this).parents('.stem-bottom').find('#cailiao').addClass('des edit-xg').attr('contenteditable','true')
            .after('<input type="hidden" id="id" value="'+$('input[name=parentId]').val()+'">');
        $(this).parents('.stem-bottom').find('input').removeAttr('disabled');
        $('input[name=parentId]').remove();
        $('.saveCl').show();
        $('.quxiaoCl').show();
        $('.updateCl').hide();
        $(this).remove();
    });
    //点击取消修改材料的按钮
    $('.quxiaoCl').on('click', function(){
        if($('#paperId').val()){
            $('.iseditoring, input[name=parentId]').remove();
            $('.tiku-cur').click();
            $('.yl[data-type="tg"], .yl[data-type="btg"], .ty_title').hide();
        }else{
//                window.location.reload();
            $.getHtml($('.tiku-cur').attr('data-type'), $('#id').val());
        }
    });

    var sortTi4 = function(){
        $('.tiSort4').unbind('sortupdate');
        $('.tiSort4').children().length && $('.tiSort4').sortable({items:'.tiBig', cursor: "move"}).bind('sortupdate',function() {
            var titles = [];
            $.each($(this).children(), function(index, obj){
                var o = $(obj).attr('data-id');
                o && titles.push(o);
            });
            $.ajax({
                url: path+'/title/updateSort',
                data:{
                    parentId:$('input[name=parentId]').val(),
                    titles:titles
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
    };
    sortTi4();
    $('#t'+$('#typeCode').val()).addClass('tiku-cur');
    $(document).attr("title",$('#typeName').val());

    var typeTemp = [];
    var getTitleTypeTemp = function(){
        if(typeTemp.length==0) {
            var typeModel = $('#typeModel').val(),
                subId = $('#subId').val();
            var url = subId?path + '/tiTitleType/queryTypeSubId':path + '/tiTitleType/queryTypeSkuCode';
            typeTemp.push('<option value="">请选择题型</option>');
            $.ajax({
                url: url,
                data: {
                    skuCode: $('#skuId').val(),
                    subId: subId
                },
                async: false,
                type: 'post',
                success: function (result) {
                    if (result && result.length) {
                        $.each(result, function (index, type) {
                            if (typeModel == type.modelType) return true;
                            typeTemp.push('<option value="' + type.id + '" data-model="' + type.modelType + '">' + type.typeName + '</option>');
                        });
                    }
                },
                dataType: 'json'
            })
        }
        return typeTemp.join('');
    };

    /**
     * 点击新增题目时的模板
     * @returns {string}
     */
    var getTepm = function(){
        var tiTemp = [];
        tiTemp.push('<div class="stem-bottom selectType"><div class="Option"><div class="tigan"><div class="tiganBT">题型</div>');
        tiTemp.push('<div class="tianjia"></div><div class="vip-right"><select class="year-right titleType">');
        tiTemp.push(getTitleTypeTemp());
        tiTemp.push('</select></div><div class="mb10"></div></div></div></div>');
        return tiTemp.join('');
    };
    //点击新增试题按钮
    $('.addTitle1').on('click', function(){
        if ($('#paperId').val() && $('#subId').val() && $('#judgeId').val() == 0) {
            layer.alert('请先保存该大题的判分规则再添加试题');
            return;
        }
        if($('.iseditoring').length){
            layer.alert(alertMsg);
            return;
        }
        if($('.titleType').length) {
            return;
        }
        $('.tiSort4').append('<div class="titles"></div>');
        $('.titles').before(getTepm());
    });

    $('.stem-content .tiSort4').off('change', '.titleType');
    $('.stem-content .tiSort4').delegate('.titleType', 'change', function(e){
        var typeCode = $(e.target).val(),
            typeModel = $(e.target).find('option:selected').attr('data-model');
        $.ajax({
            url:path+'/title/type',
            data:{
                skuId: $('#skuId').val(),
                subId: $('#subId').val(),
                typeCode: typeCode,
                tId: '',
                pId: $('#paperId').val()
            },
            type:'post',
            dataType:'html',
            success:function(html){
                $('#typeCode').remove();
                $('#typeModel').remove();
                $('.titles').addClass('titles1').html(html);
                $('#paperId').val() && $.isHideScore();
                //$('.iseditoring').append('<input type="hidden" id="typeCode" value="'+typeCode+'">').append('<input type="hidden" id="typeModel" value="'+typeModel+'">');
            }
        });
    });
    $('.stem-content .tiSort4').off('dblclick', '.tiXT');
    $('.stem-content .tiSort4').delegate('.tiXT', 'dblclick', function(ev){
        if ($('#paperId').val() && $('#subId').val() && $('#judgeId').val() == 0) {
            layer.alert('请先保存该大题的判分规则再添加试题');
            return;
        }
        if($('.iseditoring').length || $('.selectType').length){
            layer.alert(alertMsg);
            return;
        }
        var e = ev || window.event;
        var $ts = $(e.target).parents('.tiBig');
        $.ajax({
            url: path+'/title/type',
            data: {
                skuId: $('#skuId').val(),
                subId: $('#subId').val(),
                tId: $ts.attr('data-id'),
                pId: $('#paperId').val()
            },
            type:'post',
            success:function(html){
                $('#typeCode').remove();
                $('#typeModel').remove();
                $ts.before('<div></div><div class="titles">'+html+'</div>');
                $('#paperId').val() && $.isHideScore();
                $ts.hide();
            }
        });
    });
    $('.stem-content .tiSort4').off('click', '.tiku-delete');
    $('.stem-content .tiSort4').delegate('.tiku-delete', 'click', function(ev){
        var e = ev || window.event;
        var $ts = $(e.target).parents('.stem-bg');
        layer.confirm('确认要删除？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.ajax({
                url: path+'/title/delete',
                data: {
                    titleId: $ts.attr('data-id'),
                    paperId: $('#paperId').val()
                },
                type: 'post',
                success: function(result){
                    if(result.code == '200'){
//                            layer.alert('删除成功！', {icon: 1}, function(){
//                                window.location.reload();
//                            });
                        $ts.remove();
                        $.getPaperScore();
                        layer.closeAll();
                    }else{
                        layer.msg('删除失败！', {icon: 2});
                    }
                }
            });
        }, function(){
        });
    });


    $('.ylshBtn').on('click', function(){
        var pId = $('input[name=parentId]').val();
        if (!pId) {
            layer.alert('请先保存后预览！');
            return;
        }
        window.location.href = '/title/preview/1/'+pId;
    });
    //点击试题取消按钮
    $('.tiClQx').click(function(){
        layer.confirm('确认要删除？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.ajax({
                url: path+'/title/delete',
                data:{
                    titleId: $('input[name=parentId]').val(),
                    paperId: $('#paperId').val()
                },
                type: 'post',
                success: function(result){
                    if(result.code == '200'){
                        layer.alert('删除成功！', {icon: 1}, function(){
                            window.location.href = path+'/title/update/'+$('#skuId').val()+'/'+$('#subId').val()+'/'+$('.tiku-cur').attr('data-type');
                        });
                    }else{
                        layer.msg('删除失败！', {icon: 2});
                    }
                }
            });
        }, function(){
        });
    });
})(jQuery);