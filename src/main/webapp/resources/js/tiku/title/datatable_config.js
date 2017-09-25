//要渲染的表ID
var table_name = "title-table";
// 要获取表数据的URL
var table_data_url = "/title/jsonTiList";
// 个性化工具栏
var number_list = "<'row'<'#mytool.col-xs-3'><'col-xs-9'>>t<'row'<'#wait_audit.col-xs-3'><'#num_menu.col-xs-2'l><'col-xs-7'p>>";
if($('#subId').find("a:eq(0)")){
	$('#skuId').find("a:eq(0)").attr("select-data","1");
	$('#skuId').find("a:eq(0)").css("background","rgb(0, 172, 172) none repeat scroll 0% 0%");
	$('#skuId').find("a:eq(0)").css("color","rgb(255, 255, 255)");
	action_sku();
}
// 绑定状态操作按钮状态值 如果没有按钮需要操作则空实现
function action_status() {
	var status = getValue("status");
	var titleType = getValue("titleType");
	operation_input("add", 1);
	switch (status) {
	case '0':
		operation_input("modify", 0);
		operation_input("disable", 0);
		operation_input("enable", 0);
		operation_input("review", 0);
		break;
	case '1':
		operation_input("modify", 1);
		operation_input("disable", 0);
		operation_input("enable", 0);
		operation_input("review", 0);
		break;
	case '2':
		operation_input("modify", 0);
		operation_input("disable", 0);
		operation_input("enable", 0);
		operation_input("review", 1);
		break;
	case '3':
		operation_input("modify", 0);
		operation_input("disable", 1);
		operation_input("enable", 0);
		operation_input("review", 0);
		break;
	case '4':
		operation_input("modify", 1);
		operation_input("disable", 0);
		operation_input("enable", 0);
		operation_input("review", 0);
		break;
	case '5':
		operation_input("modify", 1);
		operation_input("disable", 0);
		operation_input("enable", 1);
		operation_input("review", 0);
		break;
	default:
		operation_input("modify", 0);
		operation_input("disable", 0);
		operation_input("enable", 0);
		operation_input("review", 0);
		break;
	}
	disableManager();
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
			param.subjectId = 0;
			param.isVip = 0;
			param.typeCode = 0;
			param.classifyId = 0;
			param.titleMac = 1;
			param.source = 0;
			param.type = 0;
			param.year = 0;
			param.status = 0;
			param.longTimeAgo = 0;
			param.des = "";
		} else {
			param.subjectId = getValue("subId");
			param.isVip = getValue("isVip");
			param.typeCode = getValue("typeCode");
			param.classifyId = getValue("titleType");
			if (param.classifyId == 7 || param.classifyId == '') {
				param.classifyId = 0;
				param.titleMac = 1;
			}
			param.source = getValue("source");
			param.type = getValue("type");
			param.year = getValue("year");
			param.status = getValue("status");
			param.des = getValue("des");
			var year = getValue("year");
			/*var longTimeAgo;
			if (year == 2010) {
				longTimeAgo = year = 2010;
			} else {
				longTimeAgo = 0;
			}
			param.longTimeAgo = longTimeAgo;*/
			param.year = year;
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
	getDate : [ CONSTANT.DATA_TABLES.COLUMN.CHECKBOX, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "id",
		render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
		width : "55px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "des",
		render : function(data, type, row, meta) {
			var data1=data.replace(/<\/?[^>]*>/g,'').replace(/&nbsp;/ig,"").replace(/&lt;/ig,"").replace(/&gt;/ig,"");
			return data1.substr(0,25)+(data1.length>25 ? "...":"");
		},// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
		width : "280px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "status",
		render : function(data) {
			switch (data) {
			case 1:
				return "未提审";
			case 2:
				return "待审核";
			case 3:
				return "启用";
			case 4:
				return "未通过";
			case 5:
				return "禁用";
			default:
				return "";
				break;
			}
		},
		orderable : false,
		width : "50px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "skuName",
		render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
		width : "100px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "subName",
		render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
		width : "100px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "paperName",
		render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
		width : "200px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "typeName",
		render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
		width : "50px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "createTimeFormat",
		orderable : false,
		width : "100px"
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "updateTimeFormat",
		orderable : false,
		width : "100px"
	} ]
}

// 处理列表左下角信息 如果没有则空实现
function foot_info(result) {
	$("#wait_audit").text(
			"试题总数：" + result.extParam.allCount + "，当前总数：" + result.recordsTotal
					+ "，待审数量：" + result.extParam.waitAuditCount);
	$("#wait_audit").css({
		"vertical-align" : "middle",
		"line-height" : "35px",
		"font-size" : "12px",
		"color" : "#242a30",
	});
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

// 绑定状态操作按钮(状态变更操作)
$(".anniu").click(function() {
	var input_name = $(this).attr("name");
	switch (input_name) {
	case "modify":
		modifyBut();
		break;
	case "disable":
		jumpPage('updateState', $(this).val());
		break;
	case "enable":
		jumpPage('updateState', $(this).val());
		break;
	case "review":
		jumpPage('updateState', $(this).val());
		break;
	case "add":
		$(this).blur();
		break;
	default:
		break;
	}
});
// 获取复选框选中的数量
$(".iCheck").live("click", function() {
	var num = $(".iCheck:checkbox:checked").length;
	if (num > 1) {
		operation_input("modify", 0);
	} else {
		var value = getValue("status");
		if (value == 1 || value == 4 || value == 5) {
			operation_input("modify", 1);
		} else {
			operation_input("modify", 0);
		}
	}
	disableManager();
});
function modifyBut() {
	var num = $(".iCheck:checkbox:checked").length;
	if (num == 1) {
		var item = _table.row($(".iCheck:checkbox:checked").closest('tr'))
				.data();
		$.ajax({
			url : $("#path").val() + "/title/findBytitleId",
			type : "POST",
			data : {
				"titleId" : item.id
			},
			cache : false, // 禁用缓存
			async : false,
			dataType : "json",
			success : function(ret) {
				if (ExceptionDialog(ret)) {
					if (ret.code == '200') {
						window.open($("#path").val() + "/title/update/"
								+ ret.result.sku + "/" + ret.result.subjectId
								+ "/" + item.id);
					} else {
						$('#myModal2 .msg').text(ret.msg);
						$('#myModal2').modal('show');
						$('#myModal2 .msg').attr("selectp", 1);
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('#myModal2 .msg').text("查询异常");
				$('#myModal2').modal('show');
				$('#myModal2 .msg').attr("selectp", 1);
			}
		});
	} else {
		$('#myModal2 .msg').text("请选择一条记录");
		if (num > 1) {
			$('#myModal2 .msg').text("只能选择一条记录");
		}
		$('#myModal2').modal('show');
		$('#myModal2 .msg').attr("selectp", 1);
	}
}
// 批量跳转页面
function jumpPage(formtableId, operationState) {
	var num = $(".iCheck:checkbox:checked").length;
	if (num < 1) {
		$('#myModal2 .msg').text("请选择一条记录");
		$('#myModal2').modal('show');
		$('#myModal2 .msg').attr("selectp", 1);
		return;
	}
	var checkbox_select = getCheckBox().join(",");
	// var stat=$("#status a[default='true']").attr("data-value");
	$('#titleIds').val(checkbox_select);
	// $('#state').val(stat);
	$('#operationState').val(operationState);
	submitForm(formtableId);
}

function disableManager(){
	var titleType = getValue("titleType");
	if(titleType && titleType != 7){
		operation_input("modify", 0);
		operation_input("disable", 0);
		operation_input("enable", 0);
		operation_input("review", 0);
	}
}
// 选中参数处理
$(".tigan-bottom").on("click", "a", function() {
	// 绑定点击事件
	var action_id = $(this).parent().attr('id')
	if (action_id == 'titleType') {
		action_status();
	}
});