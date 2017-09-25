//要渲染的表ID
var table_name = "title-table";
//要获取表数据的URL
var table_data_url = "/tiCertificate/jsonCertificateList";
// 个性化工具栏
var number_list = "<'row'<'#mytool.col-xs-3'><'col-xs-9'>>t<'row'<'col-xs-1'l><'col-xs-11'p>>";
if($('#skuId').find("a:eq(0)")){
	$('#skuId').find("a:eq(0)").attr("select-data","1");
	$('#skuId').find("a:eq(0)").css("background","rgb(0, 172, 172) none repeat scroll 0% 0%");
	$('#skuId').find("a:eq(0)").css("color","rgb(255, 255, 255)");
	action_sku();
}
//级联查询
function query_subjectMin() {
	var skuId = $("#skuCode").val();
	if (skuId) {
		$.ajax({
			url : $('#path').val()+"/tiSubject/jsonSubList",
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
				$("#subject").empty();
				$("#subject").append('<option value="0">请选择</option>');
				$.each(result.data, function(index, subject) {
					$("#subject").append(
							'<option value="' + subject.id
				+ '">'
									+ subject.subName + '</option>')
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$.dialog.alert("查询失败");
			}
		});
	}
}
//时间格式2016-01-12 15:45
function timeStr(data){
	var datetime = new Date(data);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    return year + "-" + month + "-" + date+" "+hour+":"+minute;
}
//时间格式2016-01-12 15:45:44
function timeMStr(data){
	var datetime = new Date(data);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}
$('#addSK').on('click',function(){
	$('#saveCertificate').attr("operate","add");
	$('#id').val('');
	$('#nameNew').val('');
	$('#paperId').val('');
	$('#score').val('');
	$('#skuCode').val('');
	//$("#subject").empty();
	//$("#subject").append('<option value="0">请选择</option>');
	$('#startTime').val('');
	$('#endTime').val('');
	$('#certificateName').val('');
	$('#repeatNum').val('');
	$('#skuCode').removeAttr("disabled");
	//$("#subject").removeAttr("disabled");
	$('.col-md-9 input[type=radio]').attr("checked",false);
	$('#title-create-alert').modal('show');
});
$('#title-table').delegate(".btnoperate","click",function(event){
	$(event.target).blur();
	var typeOperate=$(this).attr("operate");
	if('addStudent'==typeOperate){
		$('#examineeCertificateId').val($(this).attr("data-id"));
		$('#examineeSubId').val($(this).attr("data-subId")=='' ?'default':$(this).attr("data-subId"));
		$('#examineeSku').val($(this).attr("data-skuCode"));
		if (validateForm("addExaminee")) {
			location.href=$("#path").val()+"/tiExaminee/index/"+$('#examineeSku').val()+"/"+$('#examineeSubId').val()
			+"/"+$('#examineeCertificateId').val();
		}
	}else if('update'==typeOperate){
		$('#id').val($(this).attr("data-id"));
		var trRow=$(this).parent().parent();
		$('#nameNew').val($(this).attr("data-name"));
		$('#paperId').val($(this).attr("data-paperId"));
		$('#score').val($(this).attr("data-score"));
		$('#skuCode').val($(this).attr("data-skuCode"));
		query_subjectMin();
		//$("#subject").val($(this).attr("data-subId"));
		$('#skuCode').attr("disabled","disabled");
		//$("#subject").attr("disabled","disabled");
		$('#certificateName').val($(this).attr("data-certificateName"));
		$('#repeatNum').val($(this).attr("data-repeatNum"));
		$('#startTime').val(timeStr(trRow.find("td:eq(4)").text()));
		$('#endTime').val(timeStr(trRow.find("td:eq(5)").text()));
		$('.col-md-9 input[type=radio][name=repeat][value='+$(this).attr("data-repeat")+']').attr("checked",true);
		$('#saveCertificate').attr("operate","update");
		$('#title-create-alert').modal('show');
	}
});
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
		param.skuCode = getValue("skuId");
		if (dataManage.fuzzySearch) {
			param.subId =0;
			param.name = "";
		} else {
			param.subId = getValue("subId");
			param.name = getValue("name");
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
				data : "paperName",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "270px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "name",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "270px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "certificateName",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "100px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "userCount",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "70px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "startTime",
				render : function(data, type, row, meta) {
					if(data){
						return timeMStr(data);
			         }else{
			         	return '';
			         }
				},// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "43px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "endTime",
				render : function(data, type, row, meta) {
					if(data){
						return timeMStr(data);
			         }else{
			         	return '';
			         }
				},// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "43px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "id",
				width : "150px",
				render : function(data, type, row, meta) {
					return addBut(data, type, row, meta);
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





