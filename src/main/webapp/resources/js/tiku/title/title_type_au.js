/**
 * Created by admin on 2016/6/23.
 */
 var path = $("#path").val();
$(function(){
    var titleType = $('#modelType').val();
    //默认新建题型地址信息，加载所有的题型模版
    var urlTT=path+'/tiSysDic/query';
    var dataInit={};
    //是否非空，不为空则取当前值的模版用于显示，不能操作
    if(titleType){
    	urlTT=path+'/tiSysDic/queryByDicCodeAType';
    	dataInit.dicCode=titleType;
    	dataInit.dicType='ttemp';
    }
    $.ajax({
        url: urlTT,
        data:dataInit,
        type:'post',
        success:function(result){
            var selects = new Array();

            $(result).each(function(index, obj){
               if(index % 4 == 0) {
                    selects.push('<div class="row"');
                    if(index / 4 != 0) selects.push(' style="margin-top: 20px;"')
                    selects.push('>');
                }
                selects.push('<div class="col-md-2">');
                selects.push('<img src="'+path+'/resources/image/tiku/u619.png" style="width: 180px; height: 150px; margin: 5px 0;" data-type="'+obj.dicCode+'">');
                selects.push('<label class="radio-inline"><input type="radio" value="'+obj.dicCode+'" name="titleType" '
                    +(titleType && titleType==obj.dicCode?'checked':'')+' '+(titleType?'disabled':'')+'> '+obj.dicName+'</label>');
                selects.push('<p style="margin: 5px 0;">'+obj.dicShort+'</p>');
                selects.push('</div>');
                if(index % 4 == 3) selects.push('</div>');
            });
            $('#temp').append(selects.join(''));
        },
        dataType:'json'
    })
    $('#addUp').click(function(){
        var name = $('#titleName').val(),
            type = $('input[name=titleType]:checked').val(),
            desc = $('#titleDesc').val(),
            id = $('#id').val(),
            skuId=$(".form-control option:selected").val(),
            url = path+'/tiTitleType/add';//默认添加地址
        if(!skuId){
        	skuId= $('#skuIdUpdate').val();
        	if(!skuId){
        		 $('#myModal .msg').text('SKU不能为空');
                 $('#myModal').modal('show');
                 return;
        	}
        }
        if(!/^[\u4e00-\u9fa5A-Za-z0-9]{1,10}$/.test(name)){
            $('#myModal .msg').text('题型名称由1-10个字母、汉字、数字组成');
            $('#myModal').modal('show');
            return;
        }
        if(!type){
            $('#myModal .msg').text('请选择题型模版');
            $('#myModal').modal('show');
            return;
        }
        if(desc && desc.length>200){
            $('#myModal .msg').text('备注请输入0-200字');
            $('#myModal').modal('show');
            return;
        }
        url = id?'/tiTitleType/update':url;//如果id非空，则进行数据更新
        if(name && type&&skuId){
            $.ajax({
                url: url,
                data:{
                    id:id,
                    typeName:name,
                    modelType:type,
                    typeDesc:desc,
                    skuId:skuId
                },
                type:'post',
                success:function(result){
                    if(result.code=='200'){
                        window.location.href = '/tiTitleType/index/'+(skuId?skuId:'1');//当sku非空是，跳回相对应的sku题型页，否则默认为1
                    }else{
                        $('#myModal .msg').text(result.msg);
                        $('#myModal').modal('show');
                    }
                },
                dataType:'json'
            })
        }
    });
    $('#temp').delegate('img', 'click', function(event){
        var type_model = $(event.target).attr('data-type');
        $.ajax({
            url: path + '/tiTitleType/temp/' + type_model,
            data:{

            },
            type:'get',
            success:function(result){
                $('#muban .modal-content').html('');
                $('#muban .modal-content').html(result);
                if (type_model == 4) {
                    $('.expert, .voice, .voiceTj').remove();
                }
                $('#muban').modal('show');
            },
            dataType:'html'
        })
    });
});