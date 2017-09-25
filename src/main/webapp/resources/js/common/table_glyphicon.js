var count=true;
var tempObj = "";//存上次展开的对象
var tempIndex = 0;//存上次展开的行号
//表格折叠事件
function tableFold(obj,datas,temp) {
    //监听所有折叠标志 对整个table监听
    //获取行对象
    var tr = obj.closest('tr');
    var index = tr.find("td").find("span").attr("id");
    //具体点击对象
    //row对象
    var row = datas.row(tr);
    //第一次初始化赋值
    if (count) {
        tempIndex = index;
        tempObj = row.child;
        count = false;
    }

    //如果本次展开行和原来的对象不一样把原来的收起来
    if (index != tempIndex) {
        tempObj.hide();
    }

    //把所有的先收起 ,避免一行多个个收起按钮
    $('.glyphicon').removeClass().addClass("glyphicon glyphicon-plus").html("展开");

    //如果是展开状态
    if (row.child.isShown()) {
        // This row is already open - close it
        //改变标志提示内容，收起对象
        obj.html("<span id=" + index + " class='glyphicon glyphicon-plus'>展开</span>");
        row.child.hide();
    } else {
        //展开时把当前行付给tempIndex
        tempIndex = index;
        tempObj = row.child;
        // Open this row
        //改变标志提示内容，展开对象
        obj.html("<span id=" + index + " class='glyphicon glyphicon-minus'>收起</span>");
        row.child(format(row.data(),temp)).show();
    }
}

//传入行内数据，和要显示的详细内容
function format(d,temp) {
    //展开的表格数据处理
    return '<table cellpadding="5" cellspacing="0" border="0" width="100%" style="table-layout: fixed"><tbody>' +
        temp
    '</tbody></table>';
}

