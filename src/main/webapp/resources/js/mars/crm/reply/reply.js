/**
 * Created by qiaolu on 2016/7/26.
 */

(function() {
    var path = $("#path").val();
    $(document).ready(function(){
        //移除发送的禁止标示
        $("#send").removeAttr("disabled");
        loadData();//重载数据

        //清除错误提示
        $("li[name=ErrorTip]").each(function (i, d) {
            $(d).html("");
        });
    });

    //载入数据
    function loadData(){
        var objId = $("#objId").val();
        var type = $("#type").val();
        var params = new Object();
        params["objId"] = objId;
        params["type"] = type;
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        if(objId==undefined || objId==""){
            return;
        }
        $.ajax({url:path + "/crmReply/page",data:params,type:"POST",success:function(data){
            //把数据加载到div下
            $("#reply-data-list").html(data);
        }});
    }

    //文本编辑器渲染
    var ue = UE.getEditor('context',{
        wordCount:true, //开启字数统计
        maximumWords:500, //允许的最大字符数
        initialFrameHeight:100,//设置编辑器高度
        scaleEnabled:false//拖拽大小
    });

    //监听焦点事件然后清空错误提示
    ue.addListener("focus", function (type, event) {
        $("li[name=ErrorTip]").each(function (i, d) {
            $(d).html("");
        });
    });

    $("#send").click(function () {
        //内容为空不新增
        if(ue.getContent()==""|| ue.getContent()==null) {
            return;
        }
        //获取输入字数
        if(ue.getContentLength(true)>500) {
            $("#passwordForm").find("li").html("字符超出限制!");
            return;
        }
        //防止重复点击
        $(this).attr("disabled", "disabled");
        $.ajax({
            url: path + '/crmReply/add',
            data: {
                objId: $('#objId').val(),
                type:$("#type").val(),
                content:ue.getContent()
            },
            type: 'post',
            success: function (data) {
                //移除禁止提交
                $("#send").removeAttr("disabled");
                if(ExceptionDialog(data)) {
                    if(data.code==501) {
                        $("#replyForm").find("li").html(data.msg);
                    }else{
                        //清空文本编辑器 重载数据
                        ue.execCommand('cleardoc');
                        loadData();
                    }
                }
            },
            error: function () {
                $("#send").removeAttr("disabled");
            }
        });
    });
})();
