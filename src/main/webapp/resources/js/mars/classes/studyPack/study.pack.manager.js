var path = $("#path").val();
var DataTable;
var chooseCate = {
    all: "",
    sel: ""
};
$(document).ready(function () {
    // 设置sku查询使用
    if ($('#skuId option:selected').val() == 0) {
        chooseCate.sel = "";
        $("#skuId option").each(function () { //遍历全部option
            var txt = $(this).val(); //获取option的内容
            if (txt != 0) //如果不是“全部”
                chooseCate.sel = chooseCate.sel + txt + ',';
        });
        chooseCate.all = chooseCate.sel;
    } else {
        chooseCate.sel = $('#skuId option:selected').val();
    }

    // 点击列表上方的新建按钮打开一个新的页面
    $("body").on("click", "#save-btn", function () {
        window.open(path + "/studyPack/initPack", "_blank")
    });

    DataTable = $('#packTable').DataTable({
        ajax: {
            "url": '/studyPack/list',
            "type": 'post',
            "dataType": "json",
            "data": function (d) {
                var times = $('#updateTime').val();
                d.title = $('#packName').val();
                d.skuIdStr = chooseCate.sel;
                d.startTime = times && times.split('/')[0] + ' 00:00:00';
                d.endTime = times && times.split('/')[1] + ' 23:59:59';
            }
        },
        searching: false,
        processing: true,
        serverSide: true,
        language: {
            url: path + '/resources/assets/plugins/DataTables/media/Chinese.json'
        },
        pagingType: "full_numbers",
        ordering: false,
        columns: [
            {data: "id", "visible": false},
            {data: null},
            {data: "skuTitle"},
            {data: "code"},
            {data: "title"},
            {data: "username"},
            {
                render: function (data, type, row, meta) {
                    return moment(row.updateDate).format('YYYY-MM-DD HH:mm:ss ');
                }
            },
            {
                render: function (data, type, row, meta) {
                    var buttons = '';
                    buttons += $('#button-1').html();
                    buttons += $('#button-2').html();
                    return buttons.replace(/#id/g, row.id);
                }
            }],
        //设置第一列为自增列
        drawCallback: function (settings) {
            n = this.api().page.info().start;
            this.api().column(1).nodes().each(function (cell, i) {
                cell.innerHTML = ++n;
            })
        }
    });

    //时间选择器
    var updateTime = $("#updateTime").daterangepicker({
        format: 'YYYY-MM-DD',//格式化日期
        showDropdowns: true,//显示年与月的选择框
        minDate: "2010-01-01",//最小日期
        maxDate: TimeObjectUtil.getRecentDaysDateTime(30).endTime,//最大日期
        dateLimit: {
            days: 30
        }, //起止时间的最大间隔
        daysOfWeekDisabled: "0,7",
        applyClass: 'btn-success',//应用按钮class
        cancelClass: 'btn-warning',//取消按钮class
        separator: "/",
        ranges: {
            '今天': [moment(), moment()],
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '一周内': [moment().subtract(7, 'days'), moment()],
            '30天内': [moment().subtract(30, 'days'), moment()]
        },
        locale: {
            applyLabel: '保存',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '选择日期',
            daysOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    });
    //选择取消按钮时
    $("#updateTime").on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    $('#search-btn').on('click', function () {
        var selSku = $('#skuId option:selected').val();
        if (selSku == 0) {
            chooseCate.sel = chooseCate.all;
        } else {
            chooseCate.sel = selSku;
        }
        DataTable.ajax.reload();
    });
});

/**
 * 学习包修改
 * @param id
 */
function studyPackUpdate(id) {
    // 检测班型的使用情况
    var check = studyPackUsedVerify(id);
    if (check.flag) {
        var msg = '【当前',
            temp = '';
        $.each(check.data, function (i, n) {
            temp += n.title + "班型，"
        });
        msg += temp.substring(0, temp.length - 1);
        msg += '正在使用该学习包是否修改（修改后学员前台将更新修改内容）】';

        BootstrapDialog.confirm({
            title: '提示信息',
            message: msg,
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-warning',
            callback: function (yes) {
                if (yes) {
                    window.open(path + "/studyPack/edit/" + id, "_blank");
                }
            }
        });
        return;
    }

    // 跳转到修改页面
    window.open(path + "/studyPack/edit/" + id, "_blank");
}

/**
 * 学习包删除
 * @param id
 */
function studyPackDelete(id) {
    // 检测班型的使用情况
    var check = studyPackUsedVerify(id);
    if (check.flag) {
        var msg = '【当前',
            temp = '';
        $.each(check.data, function (i, n) {
            temp += n.title + "班型，"
        });
        msg += temp.substring(0, temp.length - 1);
        msg += '正在使用，如需删除请先联系项目经理移除学习包后再返回操作】';

        // 弹框提示
        BootstrapDialog.alert({
            title: "消息提示",
            message: msg,
            type: BootstrapDialog.TYPE_WARNING
        });
        return;
    }
    // 执行删除功能
    BootstrapDialog.confirm({
        title: '删除学习包',
        message: '确认是否删除学习包?',
        type: BootstrapDialog.TYPE_WARNING,
        closable: true,
        btnCancelLabel: '取消',
        btnOKLabel: '确认',
        btnOKClass: 'btn-warning',
        callback: function (yes) {
            if (yes) {
                $.post('/studyPack/delete', {id: id})
                    .done(function (data) {
                        if (data.code == HttpUtil.success_code) {
                            DataTable.ajax.reload();
                        } else {
                            BootstrapDialog.alert(data.msg);
                        }
                    })
                    .fail(function () {
                        BootstrapDialog.alert('请求服务器失败!');
                    });
            }
        }
    });
}

/**
 * 学习包使用情况检测
 * @param id
 */
function studyPackUsedVerify(id) {
    var result = {flag: false, data: null}
    $.ajax({
        url: "/classType/findByStudyPackId",
        type: "post",
        async: false,
        data: {studyPackId: id},
        success: function (data) {
            if (data.code == HttpUtil.success_code) {
                var dr = data.result;
                if (dr != null && dr.length > 0) {
                    result.flag = true;
                    result.data = dr;
                }
            }
        }
    });
    return result;
}