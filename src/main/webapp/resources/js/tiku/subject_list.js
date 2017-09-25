var subjectTable;
var count = true;
$(document).ready(function () {

    $(".form-control").live("change",function(){
        if($(this).val()==0)return;
        $.ajax({
            type:"post",
            url:"/tiSubject/index",
            success:function(ret){
                $("").html(ret);
            }
        });

    });
    subjectTable = $('#subject-table').DataTable({
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
            "url": "/tiSubject/jsonSubList",
            "type": "POST",
            "dataType": "json"
        },
        columns: [
            {"data": "id"},
            {"data": "skuName", "visible": false},//visible 隐藏或显示
            {"data": "parentId"},
            {"data": "sortNum"},
            {"data": "validSign"},
            {"data": "shortDes"},
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