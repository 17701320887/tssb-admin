var count = true;
var operTypeMap;
var logTable;
var operateArray  = ["","未提审","待审核","审核通过","审核不通过","禁用"]
var findObj = $("#find");

$(document).ready(function () {
    operTypeMap = ($("#operType").data("map"));

    logTable = $('#logTable').DataTable({
        select: true, //是否选中
        autoWidth: true,
        deferRender: true,
        responsive: true,
        searching: false, //是否开启搜索
        pagingType: "full_numbers",//分页类型 full_numbers显示所有分页信息
        processing: false, //是否显示处理状态
        serverSide: true, //是否开启服务器模式
        ordering: false, //排序
        aLengthMenu: [10, 20, 50, 100], //下拉框每页显示数量
        ajax: {
            "url": "/tiOperationLog/search",
            "type": "POST",
            "dataType": "json",
            "data": function (d) {
                d.toOperationId = $("#toOperationId").val();
                //d.operationType = $("#opstatu").val();
                //d.toOperation = $("#optype").val();
                //d.userName = $("#userName").val();
                //d.operationTime = $("#operTime").val();
            }
        },
        columns: [
            {"data": "id"},
            {"data": "userName"},
            {"data": "operationTime"},
            {"data": "operationType", "render": function (data, type, row, meta) {
                if(data==-1){
                    return "删除"
                }else{
                    return operateArray[data];
                }
            }},
        ],
        columnDefs: [
            {className: "dt-body-center", "targets": "_all"},
            {
                "targets": [2],
                "render": function (data, type, row, meta) {
                    return TimeObjectUtil.formatterDateTime(new Date(data))
                }
            }
        ],
        language: {
            lengthMenu: "每页 _MENU_ 条记录",//下拉框文字
            info: "第 _PAGE_ 页 ( 总共 _PAGES_ 页 ,共 _TOTAL_ 项)",//左下角显示文字
            infoEmpty: "",//当查询没有数据时左下角显示文字
            sEmptyTable: "没有数据..",//当查询没有数据时表格中间显示文字
            paginate: {                          //分页
                first: "首页",
                last: "尾页",
                next: "下一页",
                previous: "上一页"
            }
        }

    });
});

//时间选择器
var operTime =  $("#operTime").daterangepicker({
    format:'YYYY-MM-DD',//格式化日期
    showDropdowns:true,//显示年与月的选择框
    minDate:"2010-01-01",//最小日期
    maxDate:"2020-12-31",//最大日期
    applyClass: 'btn-success',//应用按钮class
    cancelClass: 'btn-warning',//取消按钮class
    separator:"/",
    ranges: {
        '今天': [moment(), moment()],
        '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        '一周内': [moment().subtract(7, 'days'), moment()],
        '30天内': [moment().subtract(30, 'days'), moment()],
        '本月': [moment().startOf('month'), moment().endOf('month')],
        '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
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
$("#operTime").on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});


findObj.click(function () {
    logTable.ajax.reload(null,false);
});

//传入行内数据，和要显示的详细内容
function format(d,name) {
    var temp = "";
    if(name=="operName"){
        temp+= '<td width="6%">调用方法:</td><td style="word-wrap:break-word;word-break:break-all;" width="94%"> ' + d.operName + '</td>' ;
    }
    if(name=="operParam"){
        temp+= '<td width="6%">传递参数:</td><td style="word-wrap:break-word;word-break:break-all;" width="94%">' + d.operParam + '</td>';
    }
    //展开的表格数据处理
    return '<table cellpadding="5" cellspacing="0" border="0" width="100%" style="table-layout: fixed"><tbody>' +
        '<tr>' +
        temp
        + '</tr>' +
        '</tbody></table>';
}