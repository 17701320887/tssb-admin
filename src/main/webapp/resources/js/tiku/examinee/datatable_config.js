//要渲染的表ID
var table_name = "title-table";
//要获取表数据的URL
var table_data_url = "/tiExaminee/jsonExamineeList";
// 个性化工具栏
var number_list = "<'row'<'#mytool.col-xs-3'><'col-xs-9'>>t<'row'<'col-xs-1'l><'col-xs-11'p>>";
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
		param.skuCode = getValue("examineeSku");
		param.subId = getValue("examineeSubId");
		param.certificateId = getValue("examineeCertificateId");
		if (dataManage.fuzzySearch) {
			param.accounts = "";
		} else {
			param.accounts = getValue("accounts");
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
				data : "id",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "60px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "userName",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "70px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "accounts",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "80px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "pass",
				render : CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "120px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "idCard",
				render :CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "120px"
			},{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "examinationCount",
				render :CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "60px"
			},{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "score",
				render :CONSTANT.DATA_TABLES.RENDER.ELLIPSIS,// 会显示省略号的列，需要用title属性实现划过时显示全部文本的效果
				orderable : false,
				width : "80px"
			},
			{
				className : "ellipsis", // 文字过长时用省略号显示，CSS实现
				data : "assignmentTime",
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
				width : "70px",
				render : function(data, type, row, meta) {
					return  addBut(row,data);
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
$('#addExamineeNew').on('click',function(){
	if(!$.trim(getValue("accountsNew"))){
		layer.alert('请填写一个学员帐号再添加哦');
		return;
	}
	var subShow=getValue("examineeSubId");
	if(subShow=='default'){
		subShow='';
	}
	$.ajax({
		url : $("#path").val()+"/tiExaminee/addExaminee",
		type : "POST",
		data : {
			"skuCode":getValue("examineeSku"),
			"subId":subShow,
			"certificateId":getValue("examineeCertificateId"),
			"accounts" : getValue("accountsNew")
		},
		cache : false, // 禁用缓存
		async : false,
		success:function(ret){
			if(ret.code=="200"){
				layer.alert('添加学员'+ret.msg);
				$('#accountsNew').val('');
				find();//加载
			}else{
				layer.alert('添加学员失败:'+ret.msg);
			}
        },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.alert('操作异常');
		}
	}); 
});
$('#title-table').delegate(".btnoperate","click",function(event){
	var actionV=$(this).attr("actionV");
	var id=$(this).attr("data-id");
	if('update'==actionV){
		$('#id').val(id);
		$('#userName').val($(this).attr("data-userName"));
		$('#pass').val($(this).attr("data-pass"));
		$('#idCard').val($(this).attr("data-idCard"));
		$('#passLabel').html($(this).attr("data-pass"));
		$('#userNameLabel').html($(this).attr("data-userName"));
		$('#examinee-create-alert').modal('show');
	}else if('del'==actionV){
		$.ajax({
			url : $("#path").val()+"/tiExaminee/delExaminee",
			type : "POST",
			data : {
				"id":id
			},
			cache : false, // 禁用缓存
			async : false,
			success:function(ret){
				if(ret.code=="200"){
					layer.alert('移除'+ret.msg);
					find();//加载
				}else{
					layer.alert('移除学员失败:'+ret.msg);
				}
	        },
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				layer.alert('操作异常');
			}
		});
	} 
});
$('#reset').on('click',function(){
	$('#accounts').val('');
	find();//加载
});
$('#copyUrl').on('click',function(){
	layer.alert('还没有开发哦，请耐心等待');
	/*var sku=getValue("examineeSku");
	var subId=getValue("examineeSubId");
	var id=getValue("examineeCertificateId");*/
});
$('#statistics').on('click',function(){
	layer.alert('还没有开发哦，请耐心等待');
	/*var sku=getValue("examineeSku");
	var subId=getValue("examineeSubId");
	var id=getValue("examineeCertificateId");*/
});





