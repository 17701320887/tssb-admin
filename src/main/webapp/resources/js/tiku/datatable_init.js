//初始化高级选项
$(function() {
	$.each($("a"), function(index) {
		if ($(this).attr("data-value"))
			// 值为0的按不限制处理
			if ($(this).attr("default")) {
				$(this)[0].style.background = "rgb(0, 172, 172)";
				$(this)[0].style.color = "rgb(255, 255, 255)";
				$(this).attr("select-data",1);
			}
	});
	// 设置按钮初始化状态
	action_status();
	// 设置年份列表
	initYear();
	initYearSelect();
})

// 设置年份
function initYear() {
	if ($("#appendYear")) {
		for (var y = new Date().getFullYear() + 1; y >= 2010; y--) {
				$("#appendYear").parent().append(
						'<a target="_blank" data-value="' + y + '">' + y
								+ '</a>');
		}
	}
}

// 设置年份select
function initYearSelect() {
	var obj = $("select[loadFlag='appendYearSelect']")
	if (obj) {
		for (var y = new Date().getFullYear() + 1; y >= 2010; y--) {
				obj.append('<option value="' + y + '">' + y + '</option>');
		}
	}
}

// 获取高级选项值
function getValue(param) {
	var value;
	if ($("#" + param)[0]) {
		if ($("#" + param)[0].tagName == "DIV") {
			value = $("#" + param + " a[select-data=1]").attr("data-value");
		} else {
			value = $("#" + param).val();
		}
	}
	if (value) {
		return value;
	}
	return "";
}

// 选中参数处理
$(".tigan-bottom")
		.on(
				"click",
				"a",
				function() {
					$(this).css({
						"background" : "#00ACAC",
						"color" : "#ffffff"
					}).siblings().css({
						"background" : "#ffffff",
						"color" : "#999999"
					})
					$.each($(this).parent().find("a"), function(i, obj) {
						$(this).attr("select-data", 0)
					});
					$(this).attr("select-data", 1);

					// 绑定点击事件
					var action_id = $(this).parent().attr('id')
					if (action_id == 'skuId') {
						action_sku();
					} else if (action_id == 'status') {
						action_status();
					}

					// 判断是否需要ajax操作
					var ajax_flag = $(this).parent().attr("ajax");
					if (ajax_flag) {
						var target = $("#div-table-container").children(".panel");
						if (!$(target).hasClass('panel-loading')) {
							var targetBody = $(target).find('.panel-body');
							var spinnerHtml = '<div class="panel-loader"><span class="spinner-small"></span></div>';
							$(target).addClass('panel-loading');
							$(targetBody).prepend(spinnerHtml);
							find();
							setTimeout(function() {
								$(target).removeClass('panel-loading');
								$(target).find('.panel-loader').remove();
							}, 2000);
						}
					}
				});

// 绑定sku处理方法
function action_sku() {
	var skuId = getValue('skuId');
	var subject_name = $("#skuId").attr("subject_name");
	if (skuId && subject_name) {
		// 级联查询科目
		query_subject(skuId, subject_name);
	}
	var title_type_name = $("#skuId").attr("title_type_name");
	if (skuId && title_type_name) {
		// 级联查询题型
		query_title_type(skuId, title_type_name);
	}
}

// 操作按钮 0为禁用,1为启用
function operation_input(id, status) {
    var $btn = $("#" + id + "");
    if ($btn.length) {
        if (status == 1) {
            $btn.removeAttr("disabled");
            $btn[0].style.background = "#00ACAC";
        } else {
            $btn.attr("disabled", " disabled");
            $btn[0].style.background = "#CFE2F3";
        }
    }
}

// 级联查询科目
function query_subject(skuId, subject_name) {
	$
			.ajax({
				url : "/tiSubject/jsonSubList",
				type : "POST",
				data : {
					"skuId" : skuId,
					"start" : 0,
					"length" : 100,
				},
				cache : false, // 禁用缓存
				async : false,
				dataType : "json",
				success : function(result) {
					$("#" + subject_name).empty();
					$("#" + subject_name)
							.append(
									'<a data-value= "0" target="_blank" style="background: rgb(0, 172, 172); color: rgb(255, 255, 255);">不限</a>');
					$.each(result.data, function(index, subject) {
						$("#" + subject_name).append(
								'<a target="_blank" data-value=' + subject.id
										+ '>' + subject.subName + '</a>')
					});
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.dialog.alert("查询失败");
				}
			});
}

// 级联查询题型
function query_title_type(skuId, title_type_name) {
	$
			.ajax({
				url : "/tiTitleType/jsonTitleTypeList",
				type : "POST",
				data : {
					"skuId" : skuId,
					"start" : 0,
					"length" : 100,
				},
				cache : false, // 禁用缓存
				async : false,
				dataType : "json",
				success : function(result) {
					$("#typeCode").empty();
					$("#typeCode")
							.append(
									'<a data-value= "0" target="_blank" style="background: rgb(0, 172, 172); color: rgb(255, 255, 255);">不限</a>')
					$.each(result.data, function(index, titleType) {
						$("#typeCode").append(
								'<a target="_blank" data-value=' + titleType.id
										+ '>' + titleType.typeName + '</a>')
					});
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.dialog.alert("查询失败");
				}
			});
}
// 获取多选框值
function getCheckBox() {
	var arrItemId = [];
	$("tbody :checkbox:checked", $table).each(function(i) {
		var item = _table.row($(this).closest('tr')).data();
		arrItemId.push(item.id);
	});
	return arrItemId;
}

// 公用验证表单方法 validate验证表达式 validateText验证失败后文本显示
function validate(obj) {
	if (!obj) {
		return true;
	}

	if (obj.attr("type") == 'radio') {
		var val = $('input:radio[name="' + obj.attr("name") + '"]:checked')
				.val();
		if (val == null) {
			var validateText = obj.attr("validateText");
			if (validateText) {
				obj.parent().find("li").html(validateText);
			} else {
				obj.parent().find("li")
						.html(obj.attr("id") + "is not validate");
			}
			return false;
		} else {
			obj.parent().find("li").empty();
			return true;
		}
	}
	var value = obj.val();

	var onNull = obj.attr("onNull");
	if (onNull) {
		if (onNull == 't') {
			if (!value || value == '') {
				var validateText = obj.attr("validateText");
				if (validateText) {
					obj.parent().find("li").html(validateText);
				} else {
					obj.parent().find("li").html(
							obj.attr("id") + "is not validate");
				}
				return false;
			} else {
				obj.parent().find("li").empty();
			}
		}
	}
	var len = obj.attr("len");
	if (len) {
		if (len > 0) {
			if (value.length < 1 || value.length > len) {
				var validateText = obj.attr("validateText");
				if (validateText) {
					obj.parent().find("li").html(validateText);
				} else {
					obj.parent().find("li").html(
							obj.attr("id") + "is not validate");
				}
				return false;
			} else {
				obj.parent().find("li").empty();
			}
		}
	}
	var validate = obj.attr("validate");
	if (!validate) {
		return true;
	}
	if (!value.match(validate)) {
		var validateText = obj.attr("validateText");
		if (validateText) {
			obj.parent().find("li").html(validateText);
		} else {
			obj.parent().find("li").html(obj.attr("id") + "is not validate");
		}
		return false;
	} else {
		obj.parent().find("li").empty();
	}
	return true;
}

// 批量
function validateForm(formName) {
	var inputs = $("form[id=" + formName + "] :input");
	var returnFlag = true;
	inputs.each(function() {
		if (!validate($(this))) {
			returnFlag = false;
			return;
		}
	});
	return returnFlag;
}
// 公用提交表单方法,只需要传入form名称即可提交并验证所以带validate validateText属性的表单，验证通过后提交form
function submitForm(formName) {
	var inputs = $("form[id=" + formName + "] :input");
	var returnFlag = true;
	inputs.each(function() {
		if (!validate($(this))) {
			returnFlag = false;
			return;
		}
	});
	if (returnFlag) {
		var form = $("#" + formName);
		form.submit();
	}
}

//展示loading框,必须符合固定页面结构
function showLoading(){
	var div_table_container = $("#div-table-container");
	if(div_table_container){
		var target = div_table_container.children(".panel");
		if (target && !$(target).hasClass('panel-loading')) {
			var targetBody = $(target).find('.panel-body');
			var spinnerHtml = '<div class="panel-loader"><span class="spinner-small"></span></div>';
			$(target).addClass('panel-loading');
			$(targetBody).prepend(spinnerHtml);
		}
	}
}

//关闭loading框,必须符合固定页面结构
function closeLoading(){
	var target = $("#div-table-container").children(".panel");
	$(target).removeClass('panel-loading');
	$(target).find('.panel-loader').remove();
}