var zTreeObj;
var path = $("#path").val();

var TimeFn = null;
function zTreeOnDblClick(event, treeId, treeNode) {
	clearTimeout(TimeFn);
	var rflush = true;
	console.log(treeNode.level);
	// 判断是否是三级考点
	if (treeNode.level == 2) {
		$.each($("#exampoint .point"), function(index, element) {
			if ($(this).attr("data-id") == treeNode.id
					|| ($("#exampoint.point").length >= 5)) {
				rflush = false;
				return false;
			}
		});
		if (rflush) {
			if (treeNode.id) {
				$("#exampointId").attr("value", treeNode.id);
				find();
			}
		}
	}
};

// 初始化拦截器
function epFilter(treeId, parentNode, responseData) {
	$
			.each(
					responseData,
					function(index, r) {
						r.isParent = r.childCount;
						if (r.isParent) {
							r.epName = '<i class="fa fa-folder fa-lg" style="color: #348fe2;"></i> '
									+ r.epName;
						} else {
							r.epName = '<i class="fa fa-folder-o fa-lg" style="color: #348fe2;"></i> '
									+ r.epName;
						}
					});
	return responseData;
}
function zTreeOnClick(event, treeId, treeNode) {
	clearTimeout(TimeFn);
	TimeFn = setTimeout(function() {
		// 判断展开与否
		if (treeNode.isParent) {
			if (treeNode.open) {
				zTreeObj.expandNode(treeNode, false, true, true, true);
				treeNode.epName = treeNode.epName.replace('fa-folder-open',
						'fa-folder');
			} else {
				zTreeObj.expandNode(treeNode, true, true, true, true);
				treeNode.epName = treeNode.epName.replace('fa-folder',
						'fa-folder-open');
			}
			zTreeObj.updateNode(treeNode);
		}
	}, 300);
}



var showEpTree = function() {
	var skuId = $("#skuId").val();
	var subId = getValue("subId");
	var examYear = $("#examYear").val();
	// 考点树配置
	setting = {
		view : {
			dblClickExpand : false,// 关闭双击展开节点的功能，
			selectedMulti : false,
			showLine : false,
			showIcon : false,
			showTitle : false,
			nameIsHTML : true
		},
		async : {
			enable : true,
			type : "POST",
			url : path + "/tiExampoint/exampointList",
			autoParam : [ "id" ],
			otherParam : {
				"skuId" : skuId,
				"subjectCode" : subId,
				"examYear" : examYear
			},
			dataFilter : epFilter
		},
		data : {
			key : {
				name : "epName" // 指定显示名 默认name
			},
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId", // 指定父类id
				rootPId : ""
			}
		},
		callback : {
			onDblClick : zTreeOnDblClick,
			onClick : zTreeOnClick
		}
	}
	
	
	
	$
			.ajax({
				type : "post",
				url : "/tiExampoint/exampointList",
				async : false,
				data : {
					"skuId" : skuId,
					"subjectCode" : subId,
					"show" : true,
					"examYear" : examYear
				},
				success : function(ret) {// 初始化一级考点
					$(".zTree").empty();
					$
							.each(
									ret,
									function(index, r) {
										r.isParent = r.childCount;
										if (r.isParent) {
											r.epName = '<i class="fa fa-folder fa-lg" style="color: #348fe2;"></i> '
													+ r.epName;
										} else {
											r.epName = '<i class="fa fa-folder-o fa-lg" style="color: #348fe2;"></i> '
													+ r.epName;
										}
									});
					zTreeObj = $.fn.zTree.init($("#tree"), setting, ret);
				}
			});
}
