/**
 * Created by admin on 2016/6/30.
 */
var path = $("#path").val();
$(document).ready(function () {
    var submit  = true;
    if($("input[name=id]").val()){
    	if($("#pic").val()){
    		$("#headImg").attr("selectData","1");
    	}
    }
    var div =$("#uploaddiv");
    var url="";
    // 校验图片格式
    function validataEval(obj, reg) {
        var result = obj.match(reg);
        if (result==null) {
            return false;
        } else {
            return true;
        }
    }
    $.ajax({
        url: path+'/tiSysDic/query',
        data:{type:'model'},
        type:'post',
        success:function(result){
            var selects = new Array();

            $(result).each(function(index, obj){
               if(index % 4 == 0) {
                    selects.push('<div class="row"');
                    if(index / 4 != 0) selects.push(' style="margin-top: 20px;"')
                    selects.push('>');
                }
                selects.push('<div class="col-md-2 checkbox">');

                selects.push('<label id="dicCode"><input type="checkbox" value="'+obj.dicCode+'" name="dicCode" > '+obj.dicName+'</label>');
                selects.push('</div>');
                if(index % 4 == 3) selects.push('</div>');
            });
            $('#divdic').append(selects.join(''));
            $.each($("#dicCode input"),function(){//前台显示选中
                for(var i in modulars){
                    if(modulars[i].trim()==$(this).val()){
                        $(this).val(modulars[i]);
                        $(this).attr("checked","checked");
                    }
                }
            });
        },
        dataType:'json'
    })
    titleTypeInit($("#skuId").val());

    $(".uploadImage").fileupload({
        url:path+'/tiSubject/ajaxBanReviewPic',
        sequentialUploads: true,
        add: function (e, data) {
            if (!validataEval(data.files[0].name.toLowerCase(), /(.jpg|.png|.gif|.ps|.jpeg|.bmp)$/)) {
                $('#myModal .msg').text('图片格式不支持,请选择PNG、JPG、JPEG等图片格式');
                $('#myModal').modal('show');
                return;
            }else if (data.files[0].size>(67*1024)) {
                $('#myModal .msg').text('图片大小超出限制，请重新上传');
                $('#myModal').modal('show');
                return;
            } else {
                data.submit();
            }
        }
    }).bind('fileuploadprogress', function (e, data) {
        div.find(".progress_div").css("display", "");
        div.find(".progressbar").css("display", "");
        var progress = parseInt(data.loaded / data.total * 100, 10);
        div.find(".pic_progress").css('width', progress + '%');
        div.find(".pic_progress").html(progress + '%');
    }).bind('fileuploaddone', function (e, data) {
        if(data._response.result[0]==undefined){
            $('#myModal .msg').text('图片像素为520X290且小于67KB');
            $('#myModal').modal('show');
        }else{
            $("#headImg").attr("selectData","1");
            $("#headImg").attr("src", data._response.result[0].src);
            $("#pic").val(data._response.result[0].path);
        }
        div.find(".progress_div").css("display","none");
        div.find(".progressbar").css("display", "none");
    });
    if($("input[name=id]").val().trim()==""){
        $(".form-group").removeClass("hide")
    }
    function checkForm(){
    	submit = false;
        var subName = $("input[name='subName']").val();
        var skuid =  $("#skuId").val();
        if(skuid==''||skuid==0){
        	 $('#myModal .msg').text('请选择SKU');
             $('#myModal').modal('show');
             return;
        }
        if(!/^[\u4e00-\u9fa5A-Za-z0-9()（）]{1,20}$/.test(subName)){
            $('#myModal .msg').text('科目名称由1-20个字母、汉字、数字、小括号组成');
            $('#myModal').modal('show');
            return;
        }
        var validSign=$('input:radio[name="validSign"]:checked').val();
        if(validSign){
        	if(validSign=='2'){
        		//前端显示
        		var dicCode="";
        		$.each($("#dicCode input"),function(){
    	            if($(this).attr("checked")=='checked'){
    	            	dicCode= dicCode+$(this).val()+",";
    	            }
    	        });
        		dicCode=dicCode.trim();
    	        if(dicCode==""){
    	            $('#myModal .msg').text('请选择前台显示模块');
    	            $('#myModal').modal('show');
    	            return;
    	        }
        		 //题型
        	    var ti = "";
        	    $.each($("#ti input"),function(){
        	         if($(this).attr("checked")=='checked'){
        	            ti= ti+$(this).val()+",";
        	        }
        	    });
        	    ti=ti.trim();
        	    if(ti==""){
        	        $('#myModal .msg').text('请选择题型');
        	        $('#myModal').modal('show');
        	        return;
        	    }
                //工具
                var tools = "";
                $.each($("#tools input"),function(){
                    if($(this).attr("checked")=='checked'){
                        tools= tools+$(this).val()+",";
                    }
                });
                tools=tools.trim();
                if(tools==""){
                    $('#myModal .msg').text('请选择工具');
                    $('#myModal').modal('show');
                    return;
                }
        	    // 图片
        	    var src = $("#headImg").attr("selectData");
        	    if(src==0){
        	        $('#myModal .msg').text('请上传图片');
        	        $('#myModal').modal('show');
        	        return;
        	    }
        	}
        }else{
        	$('#myModal .msg').text('请选择是否显示');
            $('#myModal').modal('show');
        	return;
        }
        submit = true;
    }
    //添加或修改
    $("#operate .btn-success").on("click",function(){
    	 $(".panel-footer button").attr("jump",0);
        var operateType=$(this).attr("operate_type");
        if($("input[name=id]").val()){
            url=path+"/tiSubject/update";
        }else{
            url=path+"/tiSubject/add";
        }
        if(operateType=="save"){
            checkForm();
            if(submit){
            	 //前端显示模块
                var dicCode = "";
                var data = $("#edit_table").serialize();
                $.ajax({
                    type:"post",
                    url:url,
                    data:data,
                    success:function(ret){
                        if(ExceptionDialog(ret)){
                            if("updateSuccess"==ret.result){
                                $('#myModal .msg').text('修改成功');
                                $('#myModal').modal('show');
                                $(".panel-footer button").attr("jump",1);
                                $("#skuId").val(ret.msg);
                            }
                            if("addSuccess"==ret.result){
                                $('#myModal .msg').text('添加成功');
                                $('#myModal').modal('show');
                                $("#skuId").val(ret.msg);
                                $(".panel-footer button").attr("jump",1);
                            }
                            if("sameName"==ret.result){
                                $('#myModal .msg').text('已经存在该科目,请重新输入科目');
                                $('#myModal').modal('show');
                                $(".panel-footer button").attr("jump",0);
                            }
                        }

                    }
                });
            }
        }
    });


    $(".panel-footer").on("click",function(){
        var jump = $(".panel-footer button").attr("jump");
        if(jump==1){
            location.href = path+"/tiSubject/index/"+$("#skuId").val();
        }

    });



});
function titleTypeInit(subCode){
    if(subCode>0){
        tiToolsInit(subCode);
        $.ajax({
            url: path+'/tiTitleType/queryTypeSkuCode',
            data:{skuCode:subCode},
            type:'post',
            success:function(result){
                var selects = new Array();
                $(result).each(function(index, obj){
                    if(index % 4 == 0) {
                        selects.push('<div class="row"');
                        if(index / 4 != 0) selects.push(' style="margin-top: 20px;"')
                        selects.push('>');
                    }
                    selects.push('<div class="col-md-1"><div><div class="checkbox padding" style="padding-top:1px"><label id="ti"><input value="');
                    selects.push(obj.id);
                    selects.push('" name="ti" type="checkbox">');
                    selects.push(obj.typeName);
                    selects.push('</label></div></div><div><a  class="model-type" data-code="');
                    selects.push(obj.modelType);
                    selects.push('" style="color: #FF7F00">查看模板样式</a></div><div class="col-md-1">');
                    // selects.push('<span  style="color: #707478" class="dic-short">'+obj.modelType+'</span>');
                    selects.push('</div></div>');
                    if(index % 4 == 3) selects.push('</div>');
                });
                $('#divtitleType').empty();
                $('#divtitleType').append(selects.join(''));
                $.each($("#ti input"),function(){//题目选中
                    for(var i in titleTypeIds){
                        if(titleTypeIds[i].trim()==$(this).val()){
                            $(this).val(titleTypeIds[i]);
                            $(this).attr("checked","checked").attr("disabled","disabled");
                        }
                    }
                });
                //查看模板
                $(".model-type").on("click",function(event){
                    var dataCode = $(this).attr("data-code");
                    $.ajax({
                        url: path + '/tiTitleType/temp/' + dataCode,
                        data:{},
                        type:'get',
                        success:function(result){
                            $('#muban .modal-content').html('');
                            $('#muban .modal-content').html(result);
                            $('#muban').modal('show');
                        },
                        dataType:'html'
                    })
                });
                gengduo();
            },
            dataType:'json'
        })
    }
}


function tiToolsInit(subCode){
    $.ajax({
        url: path+'/tiTools/list',
        data:{sku:subCode},
        type:'post',
        success:function(result){
            var selects = new Array();
            $(result).each(function(index, obj){
                if(index % 4 == 0) {
                    selects.push('<div class="row"');
                    if(index / 4 != 0) selects.push(' style="margin-top: 20px;"')
                    selects.push('>');
                }
                selects.push('<div class="col-md-1"><div><div class="checkbox padding" style="padding-top:1px"><label id="tools"><input value="');
                selects.push(obj.code);
                selects.push('" name="tools" type="checkbox">');
                selects.push(obj.name);
                selects.push('</label></div></div>');
                selects.push('</div>');
                if(index % 4 == 3) selects.push('</div>');
            });
            $('#ti-tools').empty();
            $('#ti-tools').append(selects.join(''));
            $.each($("#tools input"),function(){//工具选中
                for(var i in typeCodes){
                    if(typeCodes[i]==$(this).val().trim()){
                        $(this).val(typeCodes[i]);
                        $(this).attr("checked","checked");//.attr("disabled","disabled");
                    }
                }
            });
            moreTools();
        },
        dataType:'json'
    })
}
