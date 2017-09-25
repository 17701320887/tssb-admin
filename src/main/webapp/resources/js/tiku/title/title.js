/**
 * Created by admin on 2017/4/7.
 */
;(function($){
    var path = $('#path').val(),
        skuId = $("#skuId").val(),
        subId = $("#subId").val(),
//                paperId = $('#paperId').val(),
        f;//自定义试题数据提交后的回调函数，可不实现
    /**
     * 获取科目下所有题型
     */
    var getTitleType = function(){
        $.ajax({
            url: path+'/tiTitleType/queryTypeSubId',
            data:{
                subId:$('#subId').val()
            },
            type:'post',
            success:function(result){
                if(result && result.length){
                    var types = [],
                        typeCode = $('#typeCode').val();
                    $(result).each(function(index, obj){
                        types.push('<li ');
                        if(typeCode == obj.id)
                            types.push('class="tiku-cur" ');
                        types.push('data-type="'+obj.id+'" id="t'+obj.id+'">'+obj.typeName+'</li>');
                    });
                    $('.tiku-ul').html(types.join(''));
//                        anm();
                }else{
                    $('.tiku-ul').html('还没有题型');
                }
            },
            dataType:'json'
        })
    }
    var getHtml = function(type, Id){
        $.ajax({
            url: path+'/title/type',
            data:{
                skuId: skuId,
                subId: subId,
                typeCode: type,
                tId: Id
            },
            type:'post',
            success:function(html){
                $('.stem-content').html(html);
                anm();
            }
        });
    }
    //预览
    $(".yulan-right").on("click","#preview",function(){
        var id = $("#id").val();
        if(id==undefined){
            id = $("input[name=parentId]").val();
        }
        if($(this).attr("optype")==1){
            var skuId = $("#skuId").val();
            var subId = $("#subId").val();

            window.open(path+"/title/preview/1?id="+id+"&toOperation=1&&skuId="+skuId+"&&subId="+subId);
        }else{
            layer.msg('先保存题目');
        }
    });

    getTitleType();

    $('.tiku-ul').delegate('li', 'click',function(e){
        var ev = e || window.event;
        $(ev.target).addClass('tiku-cur').siblings().removeClass('tiku-cur');
        //window.location.href = path+'/title/update/'+$('#skuId').val()+'/'+$('#subId').val()+'/'+$(ev.target).attr('data-type');
        getHtml($(ev.target).attr('data-type'));
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

    $.getHtml = getHtml;
})(jQuery);