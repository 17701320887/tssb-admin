//要渲染的表ID
var table_name = "title-table";
// 要获取表数据的URL
var table_data_url = "/tiChapter/jsonChapterList";
// 个性化工具栏
var number_list = "<'row'<'#mytool.col-xs-3'><'col-xs-9'>>t<'row'<'col-xs-1'l><'col-xs-11'p>>";
if($('#skuId').find("a:eq(0)")){
	$('#skuId').find("a:eq(0)").attr("select-data","1");
	$('#skuId').find("a:eq(0)").css("background","rgb(0, 172, 172) none repeat scroll 0% 0%");
	$('#skuId').find("a:eq(0)").css("color","rgb(255, 255, 255)");
}
// 绑定状态按钮操作 如果没有按钮需要操作则空实现
function action_status() {
	
}

// 组装查询数据
var dataManage = {
	currentItem : null,
	fuzzySearch : true,
	getQueryCondition : function(data) {
		var param = {};
		// 组装查询参数
		param.fuzzySearch = dataManage.fuzzySearch;
		param.sku = getValue("skuId");
		// 组装分页参数
		data.start = data.start;
		data.length = data.length;
		data.params = param;
		return JSON.stringify(data);
	},
};

// 组装返回数据
var returnDate = {
	getDate : [{
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "skuId",
		render :  function (data, type, row, meta) {
        	
            return skuList[data];
        },// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
	}, {
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现	
		data : "subName",
		render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
	},{
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "firstLevelCount",
		render :  function (data, type, row, meta) {
        	
			return data+" 个";
        },// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
	},{
		className : "ellipsis", // 文字过长时用省略号显示，CSS实现
		data : "id",
		render :  function (data, type, row, meta) {
		    return	addbut(data, type, row, meta);
		},// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
		orderable : false,
	}, ]
}

// 处理列表左下角信息 如果没有则空实现
function foot_info(result) {
}

// 渲染创建行数据 如果没有则空实现
function createdRow(row, data, index) {
	// 行渲染回调,在这里可以对该行dom元素进行任何操作
	// 给当前行加样式
	/*if (data.role) {
		$(row).addClass("info");
	}
	// 给当前行某列加样式
	$('td', row).eq(3).addClass(data.status ? "text-success" : "text-error");
	// 不使用render，改用jquery文档操作呈现单元格
	var $btnEdit = $('<button type="button" class="btn btn-small btn-primary btn-edit">修改</button>');
	var $btnDel = $('<button type="button" class="btn btn-small btn-danger btn-del">删除</button>');
	$('td', row).eq(3).append($btnEdit).append($btnDel);*/
}
function drawCallback(settings){
	
}