$(".tiparam").on({
	focus : function(event) {
		$(this).attr("placeholder", "");
		event.stopPropagation;
	},
	blur : function(event) {
		if ($(event.target).attr("id") == "des") {
			$(this).attr("placeholder", "请输入题干");
		} else {
			$(this).attr("placeholder", "最后编辑人");
		}
		event.stopPropagation;
	}
});

for (var y = new Date().getFullYear(); y >= 2010; y--) {
		$("#appendYear").parent().append(
				'<a target="_blank" data-value="' + y + '">' + y + '</a>');
}

// 全选
$("#title-table").on(
		"change",
		"#all",
		function() {
			if (this.checked) {
				$(".ti-id").attr("checked", true);
			} else {
				$(".ti-id").attr("checked", false);
			}
			// 计算选中的数量
			$("#count").text($("#title-table .ti-id:checked").length + "道题")
					.removeClass("hide");
			if ($("#title-table .ti-id:checked").length > 0) {
				submit.attr("disabled", false);
			} else {
				$("#count").addClass("hide");
				submit.attr("disabled", true);
			}
		});

// 勾选题 计算选中的数量
$("#title-table").on(
		"change",
		".ti-id",
		function(event) {
			$("#count").text($("#title-table .ti-id:checked").length + "道题")
					.removeClass("hide");
			if ($("#title-table .ti-id:checked").length > 0) {
				submit.attr("disabled", false);
			} else {
				$("#count").addClass("hide");
				submit.attr("disabled", true);
			}
			event.stopPropagation();
		});

function titleOperteAjax(url, ids) {
	$.ajax({
		url : url,
		data : {
			"id" : ids
		},
		success : function(ret) {
			if (ret.code == 200) {
				location.reload();
			} else {
				alert("操作失败");
			}
		}
	});
}

// 操作
$("#title-table").on(
		"click",
		".operate",
		function(event) {
			var id = $(this).attr("data-id");
			var opt = $(this).attr("optype");
			if (opt == "log") {
				location.href = path
						+ "/tiOperationLog/index?toOperation=1&toOperationId="
						+ id;
			} else if (opt == "del") {
				if (confirm(("确定要删除该题嘛?"))) {
					titleOperteAjax(path + "/title/operate/1/-1", id);
				}
			} else {
				location.href = path + "/title/update/" + skuId + "/" + subId
						+ "/" + id;
			}
		});
