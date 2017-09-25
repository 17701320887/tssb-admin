var $table, $table;

function tishiEmpty(){
	return "查询不到相关数据哦亲！";
}
$(function() {
	$table = $('#' + table_name);
	_table = $table.dataTable(
			$.extend(true, {}, CONSTANT.DATA_TABLES.DEFAULT_OPTION, {
				ajax : function(data, callback, settings) {// ajax配置为function,手动调用异步查询
					// 封装请求参数
					var param = dataManage.getQueryCondition(data);
					//显示loading框
					showLoading();
					$.ajax({
						type : "POST",
						url : table_data_url,
						cache : false, // 禁用缓存
						data : param, // 传入已封装的参数
						contentType : 'application/json;charset=UTF-8',
						dataType : "json",
						success : function(result) {
							if (result.errorCode) {
								alert("查询失败。错误码：" + result.errorCode);
								return;
							}
							// 封装返回数据，这里仅演示了修改属性名
							var returnData = {};
							returnData.draw = data.draw;// 这里直接自行返回了draw计数器,应该由后台返回
							returnData.recordsTotal = result.recordsTotal;
							returnData.recordsFiltered = result.recordsTotal;// 后台不实现过滤功能，每次查询均视作全部结果
							returnData.data = result.data;
							if(result.extParam){
								returnData.extParam = result.extParam;
							}
							// 调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
							// 此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
							callback(returnData);
							// 处理列表左下角信息
							foot_info(result);
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown) {
							alert("查询失败");
						}
					});
				},
				columns : returnDate.getDate,
				dom : number_list,
				createdRow : function(row, data, index) {
					createdRow(row, data, index)
				},
				drawCallback : function(settings) {
					// 渲染完毕后的回调
					drawCallback(settings);
					closeLoading();
				},
				bProcessing : true,// 隐藏加载提示,自行处理
				oLanguage: {
			         sEmptyTable: tishiEmpty()
			    }
			})).api();// 此处需调用api()方法,否则返回的是JQuery对象而不是DataTables的API对象
	$("#find").click(function() {
		find();
	});

});

// 表格重新加载
function find() {
	dataManage.fuzzySearch = false;
	_table.draw();
}