var path = $("#path").val();
var myDate = new Date();
$(document).ready(function () {
    $("#saveBtn").click(function () {
        var params = getParam();
        if (params==null){
            return;
        }
        $.ajax({
            type: "POST",
            url:path+"/msbAuthority/add",
            data:params,
            async: false,
            success: function(data) {
                if (data.ret==0){
                    BootstrapDialog.show({
                        title: "消息提示",
                        message: "操作成功",
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'OK',
                            action: function() {
                                window.location.href = path+"/msbAuthority/msbShowAdd";
                            }
                        }]
                    });
                }else if (data.ret==1){
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: data.msg+"已经存在",
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

    $("#updateBtn").click(function () {
        var params = getParam();
        if (params==null){
            return;
        }
        var classType = $("#classTypes").attr("data-id");
        params["classType"]=classType;
        $.ajax({
            type: "POST",
            url:path+"/msbAuthority/update",
            data:params,
            async: false,
            success: function(data) {
                if (data.ret==0){
                    BootstrapDialog.show({
                        title: "消息提示",
                        message: "操作成功",
                        type: BootstrapDialog.TYPE_SUCCESS,
                        buttons: [{
                            label: 'OK',
                            action: function() {
                                window.location.href = path+"/msbAuthority/ShowUpdate?id="+params["msbTeacherId"]+"&classTypeId="+ params["classTypeId"];
                            }
                        }]
                    });
                }else if (data.ret==1){
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: data.msg+"已经存在",
                        type: BootstrapDialog.TYPE_WARNING
                    });
                } else {
                    BootstrapDialog.alert({
                        title: "消息提示",
                        message: "操作失败",
                        type: BootstrapDialog.TYPE_WARNING
                    });
                }
            }
        });
    });

    //时间选择器
    var createDate =  $("#createDate").daterangepicker({
        format:'YYYY-MM-DD',//格式化日期
        showDropdowns:true,//显示年与月的选择框
        minDate:"2010-01-01",//最小日期
        maxDate:"2020-12-31",//最大日期
        applyClass: 'btn-success',//应用按钮class
        cancelClass: 'btn-warning',//取消按钮class
        separator:"/",
        startDate: myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate(),
        endDate: (myDate.getFullYear()+1)+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate(),
        locale: {
            applyLabel: '保存',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '选择日期',
            daysOfWeek: ['周日','周一', '周二', '周三', '周四', '周五', '周六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    });
    //选择取消按钮时
    $("#createDate").on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
});
$("#teacherName").autocomplete(path+"/msbTeacher/likeAccount", {
    dataType: "json",
    max: 10,  //列表里的条目数
    minChars: 1,    //自动完成激活之前填入的最小字符,0时双击时触发查询
    width:400,
    scrollHeight: 150,//提示的高度，溢出显示滚动条
    matchSubset: false,
    mustMatch:true,
    matchContains: false, //包含匹配，就是data参数里的数据,是否只要包含文本框里的数据就显示
    autoFill: false,    //自动填充
    cacheLength:1, //缓存长度1为不缓存
    extraParams : {
        "account": function (){
            var em = $("#teacherName").val();
            if(em.indexOf('(')>=0) em = em.substring(em.indexOf('(')+1, em.indexOf(')'));
            return em;
        },
        "type": function (){
            var em = $('input[name="accountType"]:checked').val();
            return em;
        }
    },
    parse: function (d) {
        var a = [];
        $.each(d, function (i, j) {
            a.push({id: j.id ,name: j.name, result: j.account});
        });
        return a;
    },
    formatItem: function (row, i, max) {
        if(max==1){
            $("#teacherName").val(row.result);
        }
        return '<li onclick="showResult(this);" id="' + row.id + '" title="' + row.name + '"  li-class="' + row.result + '"><strong>' + row.name +'('+row.result+')'+ '</strong></li>';
    }
});

var showResult = function(obj){
    $("#teacherName").val($(obj).attr("li-class"));
    $("#teacherName").attr("data_id",$(obj).attr("id"));
    $("#teacherName").attr("data-name",$(obj).attr("title"));
    $(obj).remove();
    $(".ac_results").hide();
}

function getParam(){
    var teacherId = $("#teacherName").attr("data_id");
    var teacherName = $("#teacherName").attr("data-name");
    var skuId = $("#skuList").val();
    var classTypeId = $("#classTypes").val();
    var createDate = $("#createDate").val();
    var type = $('input[name="accountType"]:checked').val();
    var chk_value ="";
    $('input[name="classId"]:checked').each(function(){
        chk_value+=$(this).val()+","
    });
    if(teacherId==""||teacherId==null||teacherName==""||teacherName==null){
        BootstrapDialog.alert({
            title: "消息提示",
            message: "请选择老师",
            type: BootstrapDialog.TYPE_WARNING
        });
        return null;
    }
    if (skuId==""){
        BootstrapDialog.alert({
            title: "消息提示",
            message: "请选择sku",
            type: BootstrapDialog.TYPE_WARNING
        });
        return null;
    }
    if (classTypeId==""){
        BootstrapDialog.alert({
            title: "消息提示",
            message:"请选择班型",
            type: BootstrapDialog.TYPE_WARNING
        });
        return null;
    }
    if (createDate==null||createDate==""){
        BootstrapDialog.alert({
            title: "消息提示",
            message: "请选择有效期",
            type: BootstrapDialog.TYPE_WARNING
        });
        return null;
    }
    if (chk_value.length<1){
        // return "请选择班级";
        BootstrapDialog.alert({
            title: "消息提示",
            message: "请选择班级",
            type: BootstrapDialog.TYPE_WARNING
        });
        return null;
    }
    if (type==""){
        // return "请选择班级";
        BootstrapDialog.alert({
            title: "消息提示",
            message: "请选择账号类型",
            type: BootstrapDialog.TYPE_WARNING
        });
        return null;
    }
    var params = new Object();
	params["sku"] = skuId;
	params["classTypeId"] = classTypeId;
	params["classIds"] = chk_value;
	params["msbTeacherId"] = teacherId;
    params["createDate"] = createDate;
    params["type"] = type;
    params["teacherName"] = teacherName;
	return params;
}

function cleanName() {
    $("#teacherName").val("");
    var teacherId = $("#teacherName").attr("data_id","");
    var teacherName = $("#teacherName").attr("data-name","");
    $("#teacherName").flushCache();
}