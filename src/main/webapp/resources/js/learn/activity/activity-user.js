/**
 * Created by admin on 2016/7/28.
 */
$(function(){
    $("#activity-user-list-table").DataTable({
        select: true, //是否选中
        autoWidth: true,
        deferRender: true,
        responsive: true,
        processing:true,
        ordering:false,
        bLengthChange:null,
        searching:false,
        ajax: {
            "url": basePath + "/activity/searchUserList",
            "type": "POST",
            "dataType": "json",
            "data": function (d) {
                d.firstIndex = 0;
                d.pageSize = 20;
            }
        },
        columns: [
            {"data": "id"},
            {"data": "userId"},//visible 隐藏或显示
            {"data": "joinTime"},
            {"data":"money"},
            {"data":"checkInNum","render":function(data, type, row, meta){
                return data + "/" + row.courseNum;
            }},
            {"data": "status","render":function(data, type, row, meta){
                var html = "活动进行中";
                if(data == 1){
                    html = "成绩审核通过";
                }else if(data == -1){
                    html = "成绩审核失败";
                }else{
                    html = "成绩审核中";
                }
                return html;
            }},
            {"data": "activiyId", "render": function (data, type, row, meta) {
                    return "<a href=\""+data+"\">详情</a>";
            }}
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