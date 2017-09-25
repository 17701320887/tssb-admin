var path = $("#path").val();
$(document).ready(function () {
	$("body").on("click",".msbTeacher-add",function(){
	      window.open(path + "/msbAuthority/getMsbTeacher","_blank")
	});
	$("body").on("click",".msbAuthority-add",function(){
	      window.open(path + "/msbAuthority/msbShowAdd","_blank")
	});
	$("#saveTeacher").click(function () {
		var params = getParam();
		if (params==null){
			return;
		}
		$.ajax({
			type: "POST",
			url:path+"/msbAuthority/addMsbTeacher",
			data:params,
			async: false,
			success: function(data) {
				if (data.ret== 0){
					BootstrapDialog.show({
						title: "消息提示",
						message: "操作成功",
						type: BootstrapDialog.TYPE_SUCCESS,
						buttons: [{
							label: 'OK',
							action: function() {
								window.location.href = path+"/msbAuthority/getMsbTeacher";
							}
						}]
					});
				}else if (data.ret== 1){
					BootstrapDialog.alert({
						title: "消息提示",
						message: data.msg,
						type: BootstrapDialog.TYPE_WARNING
					});
				}else {
					BootstrapDialog.alert({
						title: "消息提示",
						message: "操作失败",
						type: BootstrapDialog.TYPE_WARNING
					});
				}
			}
		});
	});
	$("body").on("click",".delete",function(){
		var id = $(this).data("id");
		$.ajax({
			type: "POST",
			url:path+"/msbAuthority/del",
			data:{"id":id},
			async: false,
			success: function(data) {
				if (data== "success"){
					BootstrapDialog.alert({
						title: "消息提示",
						message: "操作成功",
						type: BootstrapDialog.TYPE_SUCCESS
					});
					$(".search").click();
				}else {
					BootstrapDialog.alert({
						title: "消息提示",
						message: "操作失败",
						type: BootstrapDialog.TYPE_WARNING
					});
				}
			}
		});
	});
	$("#skuList").change(function () {
		var skuList = $("#skuList").val();
		if (skuList && skuList > 0) {
			$.ajax({
				type: "POST",
				url: path + "/msbAuthority/findMsbClassType",
				data: {"skuId": $("#skuList").val()},
				async: false,
				success: function (data) {
					var pageState = $("#pageState").val();
					if (pageState == 1) {
						$("#classId").html("");
					}
					var classType = "<option value=''>--请选择--</option>";
					for (var i = 0; i < data.length; i++) {
						classType += "<option value='" + data[i].id + "'>" + data[i].title + "</option>";
					}
					$("#classTypes").html(classType);
					var classes = "<option value=''>--请选择--</option>";
					$("#classId").html(classes);
					var account = "<option value=''>--请选择--</option>";
					$("#account").html(account);
				}
			});
		}else {
			var classType = "<option value=''>--请选择--</option>";
			$("#classTypes").html(classType);
			var classes = "<option value=''>--请选择--</option>";
			$("#classId").html(classes);
			var account = "<option value=''>--请选择--</option>";
			$("#account").html(account);
		}
	});
	$("#classTypes").change(function () {
		var classTypes = $("#classTypes").val();
		if (classTypes && classTypes > 0) {
			$.ajax({
				type: "POST",
				url: path + "/msbAuthority/findMsbClass",
				data: {"classTypeId": $("#classTypes").val()},
				async: false,
				success: function (data) {
					var pageState = $("#pageState").val();
					if (pageState == 1) {
						var classes = "";
						for (var i = 0; i < data.length; i++) {
							classes += "<div class='col-md-3'><input name='classId' type='checkbox' value='" + data[i].id + "'/>" + data[i].classNo + "</div>"
						}
						$("#classId").html(classes);
					} else {
						var classes = "<option value=''>--请选择--</option>";
						for (var i = 0; i < data.length; i++) {
							classes += "<option value='" + data[i].id + "'>" + data[i].classNo + "</option>";
						}
						$("#classId").html(classes);
					}
					var account = "<option value=''>--请选择--</option>";
					$("#account").html(account);
				}
			});
	}else {
			var classes = "<option value=''>--请选择--</option>";
			$("#classId").html(classes);
			var account = "<option value=''>--请选择--</option>";
			$("#account").html(account);
		}
	});
	$("#classId").change(function () {
		var classId = $("#classId").val();
		if (classId && classId > 0) {
			$.ajax({
				type: "POST",
				url: path + "/msbAuthority/findMsbTeacher",
				data: {"classId": $("#classId").val()},
				async: false,
				success: function (data) {
					var classType = "<option value=''>--请选择--</option>";
					for (var i = 0; i < data.length; i++) {
						classType += "<option value='" + data[i].msbTeacherId + "'>" + data[i].msbTeacherName + "</option>";
					}
					$("#account").html(classType);
				}
			});
		}else {
			var account = "<option value=''>--请选择--</option>";
			$("#account").html(account);
		}
	});

	$("body").on("click",".search",function(){
		var skuId = $("#skuList").val();
		$("#skuList").parent().find("input[type='hidden']").val(skuId);
		var classType = $("#classTypes").val();
		$("#classTypes").parent().find("input[type='hidden']").val(classType);
		var classId = $("#classId").val();
		$("#classId").parent().find("input[type='hidden']").val(classId);
		var account = $("#account").val();
		$("#account").parent().find("input[type='hidden']").val(account);
		var params = new Object();
		params["skuId"] = skuId;
		params["classTypeId"] = classType;
		params["classId"] = classId;
		params["msbTeacherId"] = account;
		params["pageIndex"] = 1;
		params["pageSize"] = 10;
		
		$.ajax({
			url:path + "/msbAuthority/page",
			data:params,
			type:"POST",
			success:function(data){
				$("#msbTeacher-data-list").html(data);
				renderSwitcher();
			}
		});
	 });
	
	$(".search").click();
	
})

function getParam(){
    var userName = $("#userName").val();
    var teacherAccount = $("#teacherAccount").val();
    var teacherPassWord = $("#teacherPassWord").val();
	userName = $.trim(userName);
	teacherAccount = $.trim(teacherAccount);
    if (userName==""){
		BootstrapDialog.alert({
			title: "消息提示",
			message: "请输入姓名",
			type: BootstrapDialog.TYPE_WARNING
		});
		return null;
    }
    if (teacherAccount==""){
		BootstrapDialog.alert({
			title: "消息提示",
			message: "请填写账号",
			type: BootstrapDialog.TYPE_WARNING
		});
		return null;
    }
	if (teacherAccount.length<6){
		BootstrapDialog.alert({
			title: "消息提示",
			message: "账号位数不能少于6位",
			type: BootstrapDialog.TYPE_WARNING
		});
		return null;
	}
	if(!/(([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3})|(^((0\d{2,3}-\d{7,8})|(1[0-9]\d{9}))$)/.test(teacherAccount)){
		BootstrapDialog.alert({
			title:"消息提示",
			message:"账号只支持邮箱或者手机号码",
			type:BootstrapDialog.TYPE_WARNING
		});
		return;
	}
    if (teacherPassWord==""){
		BootstrapDialog.alert({
			title: "消息提示",
			message: "请输入密码",
			type: BootstrapDialog.TYPE_WARNING
		});
		return null;
    }
	if (teacherPassWord.length<6){
		BootstrapDialog.alert({
			title: "消息提示",
			message: "密码不能小于6位",
			type: BootstrapDialog.TYPE_WARNING
		});
		return null;
	}
    var params = new Object();
    params["name"] = userName;
    params["account"] = teacherAccount;
    params["password"] = teacherPassWord;
    params["type"] = 0;
    return params;
}

