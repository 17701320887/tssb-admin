/*常量*/
var CONSTANT = {
	DATA_TABLES : {
		DEFAULT_OPTION : { // DataTables初始化选项
			oLanguage : {
				sLengthMenu : "每页 _MENU_ 条记录",// 下拉框文字,
				sZeroRecords : "没有匹配结果",
				sInfo : "",// 左下角显示文字,
				sInfoEmpty : "",
				sInfoFiltered : "",
				sInfoPostFix : "",
				sSearch : "搜索:",
				sUrl : "",
				sEmptyTable : "表中数据为空",
				sLoadingRecords : "载入中...",
				sInfoThousands : ",",
				oPaginate : {
					sFirst : "首页",
					sPrevious : "上页",
					sNext : "下页",
					sLast : "末页",
					sJump : "跳转"
				},
				oAria : {
					sSortAscending : ": 以升序排列此列",
					sSortDescending : ": 以降序排列此列"
				}
			},
			autoWidth : false, // 禁用自动调整列宽
			stripeClasses : [ "odd", "even" ],// 为奇偶行加上样式，兼容不支持CSS伪类的场合
			order : [], // 取消默认排序查询,否则复选框一列会出现小箭头
			serverSide : true, // 启用服务器端分页
			searching : false
		// 禁用原生搜索
		},
		COLUMN : {
			CHECKBOX : { // 复选框单元格
				className : "td-checkbox",
				orderable : false,
				width : "40px",
				data : null,
				render : function(data, type, row, meta) {
					return '<input type="checkbox" class="iCheck">';
				}
			}
		},
		RENDER : { // 常用render可以抽取出来，如日期时间、头像等
			ELLIPSIS : function(data, type, row, meta) {
				if (data) {
					if (data.length > 24) {
						return data.substring(0, 24) + "...";
					} else
						return data;
				} else
					return '';
			}
		}
	}
};
