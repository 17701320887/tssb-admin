/**
 * Created by qiaolu on 2016/7/26.
 */

(function() {
    var path = $("#path").val();
    var orderId = $("#orderId").val();
    $(document).ready(function(){

        loadData();//重载数据
    });

    //查询自己地址
    function queryAddress() {
        if (orderId == undefined || orderId == "") {
            return;
        }
        $.ajax({
            url: path + "/payOrderMailingAddress/queryAddress?orderId=" + orderId,
            type: "POST",
            resultType: "json",
            success: function (data) {
                if (ExceptionDialog(data)) {
                    $("#addressee").html(data.addressee);
                    $("#mobile").html(data.mobile);
                    $("#addressee").html(data.province + data.city + data.county + data.detailAddress);
                }
            }
        });
    }

    //载入数据
    function loadData(){
        var params = new Object();
        params["orderId"] = orderId;
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        if(orderId==undefined || orderId==""){
            return;
        }
        $.ajax({url:path + "/crmReply/page",data:params,type:"POST",success:function(data){
            //把数据加载到div下
            $("#reply-data-list").html(data);
        }});
    }

    //文本编辑器渲染
    var ue = UE.getEditor('context',{
        initialFrameHeight:200,//设置编辑器高度
        scaleEnabled:false//拖拽大小
    });

    $("#send").click(function () {
        //内容为空不新增
        if(ue.getContent()==""|| ue.getContent()==null) {
            return;
        }
        //防止重复点击
        $(this).attr("disabled", "disabled");
        $.ajax({
            url: path + '/crmReply/add',
            data: {
                handoverId: $('#handoverId').val(),
                content:ue.getContent()
            },
            type: 'post',
            success: function (data) {
                //移除禁止提交
                $("#send").removeAttr("disabled");
                if(ExceptionDialog(data)) {
                    //清空文本编辑器 重载数据
                    ue.execCommand('cleardoc');
                    loadData();
                }
            },
            error: function () {
                $("#send").removeAttr("disabled");
            }
        });
    });
})();
