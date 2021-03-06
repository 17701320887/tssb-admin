//要渲染的表ID
var table_name = "paper-table";
// 要获取表数据的URL
var table_data_url = "/tiPaper/jsonPaperList";
// 个性化工具栏
var number_list = "<'row'<'#mytool.col-xs-3'><'col-xs-9'>>t<'row'<'#wait_audit.col-xs-3'><'#num_menu.col-xs-2'l><'col-xs-7'p>>";
if($('#skuId').find("a:eq(0)")){
	$('#skuId').find("a:eq(0)").attr("select-data","1");
	$('#skuId').find("a:eq(0)").css("background","rgb(0, 172, 172) none repeat scroll 0% 0%");
	$('#skuId').find("a:eq(0)").css("color","rgb(255, 255, 255)");
}
// 绑定状态操作按钮状态值 如果没有按钮需要操作则空实现
function action_status() {
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
		param.classifyCode = 4;
		param.classifyCodeAll = 4;
		param.name = getValue("name");
		if (dataManage.fuzzySearch) {
			//param.isVip = 0;
			param.status = 0;
			param.longTimeAgo = 0;
		} else {
			//param.isVip = getValue("isVip");
			param.status = getValue("status");
			var year = getValue("year");
			var longTimeAgo;
			if (year == 2010) {
				longTimeAgo = year = 2010;
			} else {
				longTimeAgo = 0;
			}
			param.longTimeAgo = longTimeAgo;
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
	getDate : [
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "name",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "260px"
			},
			{
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
				data : "startTimeFormat",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "100px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "answerTimeFromat",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "100px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "updateTimeFormat",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "100px"
			},{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "examineTimeFormat",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "100px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "id",
				width : "40px",
				render : function(data, type, row, meta) {
					return  manage(data, type, row, meta);
				},// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
			} ]
}

// 处理列表左下角信息 如果没有则空实现
function foot_info(result) {
	$("#wait_audit").text(
			"试卷总数：" + result.extParam.allCount +
			"， 当前试卷总数：" + result.recordsTotal + "， 待审数量：" + result.recordsFiltered);
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
$('#add').on('click',function(){
	$(this).blur();
});
$('#paper-table').delegate(".btnoperate","click",function(event){
	var paperId=$(this).attr("data-id");
	var status=$(this).attr("data-status");
	var statusName=$(this).html;
	var path=$("#path").val();
	window.open(path+'/tiPaper/paperAddTi/'+paperId);
});
// 批量跳转页面
function jumpPage(url, macro) {
	var checkbox_select = getCheckBox().join(",");
	var url = url.replace(macro, checkbox_select);
	window.open(url);
}