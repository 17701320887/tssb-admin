//要渲染的表ID
var table_name = "title-table";
// 要获取表数据的URL
var table_data_url = "/title/jsonTiList";
// 个性化工具栏
var number_list = "<'row'<'#mytool.col-xs-3'><'col-xs-9'>>t<'row'<'col-xs-1'l><'col-xs-11'p>>";
action_sku();
$('#butdiv').hide();
$("input[name='my-checkbox']").hide();
var jiniyonganniu=5;
function enableLiveDisable(booStr){
	$("input[name='my-checkbox']").show();
	$("input[name='my-checkbox']").bootstrapSwitch({  
        onText:"启用",  
        offText:"禁用",  
        onColor:"success",  
        offColor:"danger",
        state:booStr,
       // size:"small",  
        handleWidth:"80px",
        onSwitchChange:function(event,state){  
        	var states=3;
    		if(true==state){
    			states=5;
    		}
    		$.ajax({
    			url : $("#path").val()+"/tiPaper/updatePaperState",
    			type : "POST",
    			data : {
    				"state":states,
    				"paperId":$('#paperId').val(),
    			},
    			cache : false, // 禁用缓存
    			async : false,
    			success:function(ret){
    				if(ret.code=="200"){
    					jiniyonganniu=states;
    					if(states==3){
    						$('#rigthdiv').find("div:eq(1) input[type=button][operate_type='S']").hide();
    						find();
    						layer.alert('启用成功');
    						// $("#title-table .btnoperate[operate=add]").hide();
    						// $("#title-table .btnoperate[operate=del]").hide();
    					}else{
    						$('#rigthdiv').find("div:eq(1) input[type=button][operate_type='S']").show();
    						find();
    						layer.alert('禁用成功');
    						// $("#title-table .btnoperate[operate=add]").show();
    						// $("#title-table .btnoperate[operate=del]").show();
    					}
    					
    				}else{
    					layer.alert(ret.msg);
    				}
    	        },
    			error : function(XMLHttpRequest, textStatus, errorThrown) {
    				layer.alert('操作异常');
    			}
    		}); 
        }  
    });
}
function paper(subValue){
	$.ajax({
		url : $("#path").val()+'/tiPaper/titleBluePaper',
		type : "POST",
		data : {
			"subId" :subValue,
			"skuCode" : $('#skuId').val(),
			"classifyCode" :$('#classifyCode').val(),
			"classType" :$('#classType').val(),
			"classId" :$('#classId').val(),
			"schedule" :$('#schedule').val(),
			"chapter" :$('#chapter').val(),
			"course" :$('#course').val()
		},
		cache : false, // 禁用缓存
		async : false,
		success:function(ret){
			//响应200、100该操作都属于成功
			$("input[name='my-checkbox']").bootstrapSwitch('destroy');
			if(ret.code=="200"){
				$('#paperId').val(ret.result.key);
				jiniyonganniu=ret.result.state;
				if(ret.result.state=='3'){
					$('#rigthdiv').find("div:eq(1) input[type=button][operate_type='S']").hide();
				}else{
					$('#rigthdiv').find("div:eq(1) input[type=button][operate_type='S']").show();
				}
				enableLiveDisable(ret.result.state=='3'? false:true);
			}else{
				$("input[name='my-checkbox']").hide();
			}
        },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.alert('操作异常');
		}
	});
}
$('#subId').delegate("a","click",function(event){
	$('.kaodian-con li').remove();
	$('#examYear').find("option[value=-1]").attr("selected",true);
	var subValue=$(this).attr("data-value");
	$("#exampointId").val('');
	if(subValue>0){
		$('#butdiv').show();
		paper(subValue);
		initTitleBlue(subValue);
	}else{
		$('#butdiv').hide();
		$("input[name='my-checkbox']").hide();
	}
});

// 绑定状态操作按钮状态值 如果没有按钮需要操作则空实现
function action_status() {
}
//定位实体蓝div
$("#selectTitle").css("left",$('#rigthdiv').find("div:eq(1)").offset().left-60);
$("#selectTitle").css("top", $('#rigthdiv').find("div:eq(1)").offset().top+$('#rigthdiv').find("div:eq(1)").height()+10);
var titleBlue={};//试题蓝的题id
var ind=0;//试题蓝数量
function ajaxAddAndDel(url,dec,tId,x,typeOperate,name){
	$.ajax({
		url : $("#path").val()+url,
		type : "POST",
		data : {
			"subId" :getValue("subId"),
			"skuCode" : $('#skuId').val(),
			"classifyCode" :$('#classifyCode').val(),
			"dec":dec,
			"titleId":tId,
			"classType" :$('#classType').val(),
			"classId" :$('#classId').val(),
			"schedule" :$('#schedule').val(),
			"chapter" :$('#chapter').val(),
			"course" :$('#course').val()
		},
		cache : false, // 禁用缓存
		async : false,
		success:function(ret){
			//响应200、100该操作都属于成功，只是100为已经操作过
			if(ret.code=="200"||ret.code=="100"){
				if('del'==typeOperate){
					delete titleBlue[tId];
					if(x){
						x.html("加入");
						x.css("background-color","#49b6d6");
						x.attr("operate","add");
					}
					if('移除'==name){
						$('#titleselect tr[data-id='+tId+']').remove();
					}
				}else{
					titleBlue[tId]=tId;
					if(x){
						x.html("撤回");
						x.css("background-color","#FF60AF");
						x.attr("operate","del");
					}
				}
			}
			//200为操作成功需要计数，100为已经备操作过不需要计数
			if(ret.code=="200"){
				if('del'==typeOperate){
					ind--;
				}else{
					ind++;
				}
				if(ind>=0){
					$('#blueBut').val('试题篮('+ind+')');
				}
			}
			layer.alert(name+ret.msg);
        },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.alert('操作异常');
		}
	});
}
function del(tId){
	var x=$('.ellipsis button[data-id='+tId+'][operate=del]');
	ajaxAddAndDel('/title/delTitleBlue','',tId,x,'del','移除');
}
//初始化加载试题蓝
function initTitleBlue(subValue){
	$.ajax({
		url : $("#path").val() + "/title/jsonTitleBlue",
		type : "POST",
		data : {
			"subId" :subValue,
			"skuCode" : $('#skuId').val(),
			"classifyCode" :$('#classifyCode').val(),
			"classType" :$('#classType').val(),
			"classId" :$('#classId').val(),
			"schedule" :$('#schedule').val(),
			"chapter" :$('#chapter').val(),
			"course" :$('#course').val()
		},
		cache : false, // 禁用缓存
		async : false,
		dataType : "json",
		success : function(result) {
			 var selects = new Array();
			 ind=0;
			$(result).each(function(index, obj){
				ind=index+1;
				titleBlue[obj.id]=obj.id;
				var obj_id = obj.id;
				var obj_des = obj.des;
				var p_tag_start = '<p style="display:inline;">';
				var p_tag_end = '</p>';
				selects.push('<li class="media">');
				selects.push('<a href="javascript:;">');
				if(jiniyonganniu!=3){
					selects.push('<span class="badge badge-danger pull-right" data-id="'+ obj_id +'" onclick="del('+obj_id+')">移除');
					selects.push('</span>');
				}
				selects.push(p_tag_start + ind + '、' + p_tag_end);
				obj_des=obj_des.replace(/<\/?[^>]*>/g,'');
				selects.push((obj_des ?( obj_des.length > 20 ? obj_des.substr(0,20)+"...": obj_des):""));
				/*if(obj_des.indexOf('<p>') >= 0){
					obj_des = p_tag_start + $(obj_des).text() + p_tag_start;
				}*/
				selects.push('</a>');
				selects.push('</li>');

//				selects.push('<tr data-id="');
//				selects.push(obj.id);
//				selects.push('"><td style="width:440px;">');
//				selects.push(index+1);
//				selects.push('.<em class="nextEm" style="width:430px;">');
//				selects.push(obj.des);
//				selects.push('</em></td><td style="width:50px;"><button class="btn btn-info" data-id="');
//				selects.push(obj.id);
//				selects.push('" style="background-color:#FF0000;" onclick="del('+obj.id+')">移除</button></td></tr>');
				var x=$('.ellipsis button[data-id='+obj.id+'][operate=add]');
				if(x){
					x.html("撤回");
					x.css("background-color","#FF60AF");
					x.attr("operate","del");
				}
			});
			$('#titleselect').empty();
			$('#titleselect').append(selects.join(''));
			$('#blueBut').val('试题篮('+ind+')');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.alert("查询异常");
		}
	});
}
// 组装查询数据
var dataManage = {
	currentItem : null,
	fuzzySearch : true,
	getQueryCondition : function(data) {
		var return_data = {};
		var param = {};
		// 组装查询参数
		param.fuzzySearch = dataManage.fuzzySearch;
		param.sku = getValue("skuId");
		if (dataManage.fuzzySearch) {
			param.subjectId =0;
			param.isVip = 0;
			param.typeCode = 0;
			param.source = 0;
			param.year = 0;
			param.type = 0;
			param.status =3;
			param.longTimeAgo = 0;
			param.exampointId = 0;
			param.des = "";
			param.titleMac=1;
		} else {
			param.subjectId = getValue("subId");
			param.isVip = getValue("isVip");
			param.typeCode = getValue("typeCode");
			param.type = getValue("type");
			param.source = getValue("source");
			param.year = getValue("year");
			param.status =3;
			param.des = getValue("des");
			param.exampointId = getValue("exampointId");
			var year = getValue("year");
			/*var longTimeAgo;
			if (year == 2010) {
				longTimeAgo = year = 2010;
			} else {
				longTimeAgo = 0;
			}
			param.longTimeAgo = longTimeAgo;*/
			param.year = year;
			param.titleMac=1;
		}
		// 组装分页参数
		return_data.params = param;
		return_data.start = data.start;
		return_data.length = data.length;
		return JSON.stringify(return_data);
	},
};

// 组装返回数据
var returnDate = {
	getDate : [
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "id",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "35px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "des",
				render :  function(data, type, row, meta) {
					var data1=data.replace(/<\/?[^>]*>/g,'');
					//data1.substr(0,25)+(data1.length>25 ? "...":"")
					return data1;
				},// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "300px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "skuName",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "100px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "subName",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "100px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "typeName",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "50px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "createTimeFormat",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "50px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "id",
				width : "150px",
				render : function(data, type, row, meta) {
					var selects = new Array();
					selects.push('<button class="btn btn-info btnoperate"  operate="find" data-sku="');
					selects.push($('#skuId').val());
					selects.push('"  data-sub= "');
					selects.push($('#subId').val());
					selects.push('" data-type="');
					selects.push($('#classifyCode').val());
					selects.push('" data-id="');
					selects.push(data);
					selects.push('" type="button">预览</button>');
					var subValue=getValue("subId");
					if(subValue>0&&jiniyonganniu!=3){
						selects.push('<button class="btn btn-info btnoperate" ');
						selects.push('  data-des= "');
						selects.push(row.des.replace(/<\/?[^>]*>/g,''));
						selects.push('" data-id="');
						selects.push(data);
						selects.push('" type="button" ');
						if(titleBlue[data]){
							selects.push(' style="margin-left:5px; background-color:#FF60AF;" operate="del">撤回</button>');
						}else{
							selects.push(' style="margin-left:5px;" operate="add">加入</button>');
						}
					}
					return selects.join('');
				},// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
			} ]
}

// 处理列表左下角信息 如果没有则空实现
function foot_info(result) {

}

// 渲染创建行数据 如果没有则空实现
function createdRow(row, data, index) {
	// 行渲染回调,在这里可以对该行dom元素进行任何操作
	// 给当前行加样式
	if (data.role) {
		$(row).addClass("info");
	}
}
// 渲染完毕后的回调
function drawCallback(settings) {

}

$("#examYear").change(function() {
	showEpTree();
});

$('.placeBot-left').on("click",function(event){
	$('#selectTitle').hide();
});
$('.pos-moban').on("click",function(event){
	$('#selectTitle').hide();
});
$('#rigthdiv').find("div:eq(1) input[type=button]").on("click",function(event){
	var typeBut=$(this).attr("operate_type");
	$('#selectTitle').hide();
	var subValue=getValue("subId");
	if(!subValue){
		layer.alert('请选择科目');
		return;
	}
	if(typeBut=='L'){
		initTitleBlue(subValue);//点击试题蓝查看试题蓝的试题
		$('#selectTitle').show();
	}else if(typeBut=='F'){
		layer.alert('该功能还不能使用哦亲');
	}else if(typeBut=='S'){
		$.ajax({
			url : $("#path").val()+'/title/savesTitleBlue',
			type : "POST",
			data : {
				"subId" :subValue,
				"skuCode" : $('#skuId').val(),
				"classifyCode" :$('#classifyCode').val(),
				"classType" :$('#classType').val(),
				"classId" :$('#classId').val(),
				"schedule" :$('#schedule').val(),
				"chapter" :$('#chapter').val(),
				"course" :$('#course').val()
			},
			cache : false, // 禁用缓存
			async : false,
			success:function(ret){
				if(ret.code=="200"){
					paper(subValue);
				}
				layer.alert(ret.msg);
	        },
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				layer.alert('操作异常');
			}
		});
	}
});
$('#title-table').delegate(".btnoperate","click",function(event){
	var typeOperate=$(this).attr("operate");
	if(!getValue("subId")){
		layer.alert('请选择科目');
		return;
	}
	if('find'==typeOperate){
		window.open($("#path").val()+'/title/preview/1/'+$(this).attr("data-id"));  
	}else if('add'==typeOperate||'del'==typeOperate){
		var x=$(this);
		var tId=x.attr("data-id");
		var dec=x.attr("data-des");
		var url='/title/addTitleBlue';
		var name=x.html();
		if('del'==typeOperate){
			url='/title/delTitleBlue';
		}
		ajaxAddAndDel(url,dec,tId,x,typeOperate,name);
	}
});

