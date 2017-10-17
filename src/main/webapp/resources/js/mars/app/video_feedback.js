
$(function(){

    $("body").on("change",".appType",function(){
        var appType = $(this).val();
        $.ajax({
            type: "POST",
            url:basePath+"/appVideoFeedback/changeAppType",
            data:{'appType':appType},
            async: false,
            success: function(data) {
                if(data.length>0){
                    var jsonObj=eval(data);
                    var b =  "<option value=''>全部sku</option>";
                    if(appType == 1) {
                        b = b + "<option value='1' selected='selected'>会计从业资格</option>"
                        $.each(jsonObj, function (i, item) {
                            if (item.skuId != 1) {
                                b = b + "<option value='" + item.skuId + "'>" + item.skuName + "</option>"
                            }
                        });
                    }else {
                        $.each(jsonObj, function (i, item) {
                            b = b + "<option value='" + item.skuId + "'>" + item.skuName + "</option>"
                        });
                    }
                    $(".sku").html(b);
                }else{
                    var a = "<option value='0'><c:out value='暂无数据'></c:out></option>"
                    $(".sku").html(a);
                }
                $(".sku").change();
            }
        });
    });

    $("body").on("change",".sku",function(){
        var sku = $(this).val();
        var appType = $(".appType").val();
        $.ajax({
            type: "POST",
            url:basePath+"/appVideoFeedback/getVideo",
            data:{'sku':sku,'appType':appType},
            async: false,
            success: function(data) {
                if(data.length>0){
                    var jsonObj=eval(data);
                    var b =  "<option value=''>--请选择--</option>";
                    $.each(jsonObj, function (i, item) {
                        b = b+"<option value='"+item.courseId+"'>"+item.courseName+"</option>"
                    });
                    $(".courseId").html(b);
                }else{
                    var a = "<option value='0'><c:out value='暂无数据'></c:out></option>"
                    $(".courseId").html(a);
                }
            }
        });
    });

    $("body").on("click",".search",function(){
        var appType = $(".appType").val();
        $(".appType").parent().find("input[type='hidden']").val(appType);

        var sku = $(".sku").val();
        $(".sku").parent().find("input[type='hidden']").val(sku);

        var courseId = $(".courseId").val();
        $(".courseId").parent().find("input[type='hidden']").val(courseId);

        var startTime = $(".startTime").val();
        $(".startTime").parent().find("input[type='hidden']").val(startTime);

        var endTime = $(".endTime").val();
        $(".endTime").parent().find("input[type='hidden']").val(endTime);

        var type = $(".type").val();
        $(".type").parent().find("input[type='hidden']").val(type);

        var classify = $(".classify").val();
        $(".classify").parent().find("input[type='hidden']").val(classify);

        var params = new Object();
        params["appType"] = appType;
        params["sku"] = sku;
        params["courseId"] = courseId;
        params["type"] = type;
        params["classify"] = classify;
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        params["startTime"] = startTime;
        params["endTime"] = endTime;
        if(startTime !=null&&startTime !=""&&endTime !=null &&endTime !="") {
            if (params["startTime"] >= params["endTime"]) {
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "评论截止时间必须大于开始时间",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }
        $.ajax({url:basePath + "/appVideoFeedback/page",data:params,type:"POST",success:function(data){
            $("#video-feedback-data-list").html(data);
            renderSwitcher();
        }});
    });

    //
    //$("body").on("click",".update-btn",function(){
    //        var tr = $(this).parent().parent();
    //        var tag =" <tr style='height: 120px;' id='add-row'><td colspan='12'><textarea style='border:solid 1px;overflow:auto;height:100%;width:85%;border-radius:10px;resize:none; '></textarea><input type='button' value='发送' class='btn btn-success m-r-5 m-b-5 remark-btn' style='width: 6%;'></input></td></tr>"
    //        tr.after(tag);
    //        $(this).text("取消");
    //        $(this).attr('class','cancel-btn');
    //});
    //
    //$("body").on("click",".cancel-btn",function(){
    //    var param = $(".cancel-btn").attr('param');
    //    cancel_btn(param);
    //});
    //
    //$("body").on("click",".check-btn",function(){
    //    var param = 0;
    //    var replyContent = $(this).attr('data-reply');
    //    cancel_btn(param);
    //    var tr = $(this).parent().parent();
    //    var tag =" <tr style='height: 120px;' id='add-row'><td colspan='12'><textarea style='border:solid 1px;overflow:auto;height:100%;width:96%;border-radius:10px;resize:none;'></textarea></td></tr>"
    //    tr.after(tag);
    //    $("textarea").val(replyContent);
    //    $(this).text("取消");
    //    $(this).attr('class','cancel-btn');
    //});

    //$("body").on("click",".remark-btn",function(){
    //    var id= $(".cancel-btn").attr('data-id');
    //    var replyContent = $("textarea").val();
    //    $.ajax({
    //        type: "POST",
    //        url:basePath+"/appVideoFeedback/update",
    //        data:{'id':id,'replyContent':replyContent},
    //        async: false,
    //        success: function(data) {
    //            if (data) {
    //                if (data.ret == 1) {
    //                    location.href = basePath + "/appVideoFeedback/list";
    //                } else {
    //                    BootstrapDialog.alert({
    //                        title: "消息提示",
    //                        message: data.msg,
    //                        type: BootstrapDialog.TYPE_WARNING
    //                    });
    //                }
    //            }
    //        }
    //    });
    //});


    $("body").on("click",".excel",function(){
        var appType = $(".appType").val();
        $(".appType").parent().find("input[type='hidden']").val(appType);

        var sku = $(".sku").val();
        $(".sku").parent().find("input[type='hidden']").val(sku);

        var courseId = $(".courseId").val();
        $(".courseId").parent().find("input[type='hidden']").val(courseId);

        var startTime = $(".startTime").val();
        $(".startTime").parent().find("input[type='hidden']").val(startTime);

        var endTime = $(".endTime").val();
        $(".endTime").parent().find("input[type='hidden']").val(endTime);

        var type = $(".type").val();
        $(".type").parent().find("input[type='hidden']").val(type);

        var classify = $(".classify").val();
        $(".classify").parent().find("input[type='hidden']").val(classify);

        var params = new Object();
        params["appType"] = appType;
        params["sku"] = sku;
        params["courseId"] = courseId;
        params["type"] = type;
        params["classify"] = classify;
        params["pageIndex"] = 1;
        params["pageSize"] = 10;
        params["startTime"] = startTime;
        params["endTime"] = endTime;
        if(startTime !=null&&startTime !=""&&endTime !=null &&endTime !="") {
            if (params["startTime"] >= params["endTime"]) {
                BootstrapDialog.alert({
                    title: "消息提示",
                    message: "评论截止时间必须大于开始时间",
                    type: BootstrapDialog.TYPE_WARNING
                });
                return;
            }
        }

        $.ajax({url:basePath + "/appVideoFeedback/createExcelFile",data:params,type:"POST",success:function(data){
            //downloadFile("E:\\ceshi\\video_feedBack.xlsx");
            if(data.length>0){
               // method5("activity-list-table");
                var $this = $(this);
                //设定下载的文件名及后缀
                $this.attr('download', '视频用户反馈表.xls');
                //设定下载内容
                var jsonObj=eval(data);
                var tableToExcel = (function() {
                    var uri = 'data:application/vnd.ms-excel;base64,';
                    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table style="BORDER-BOTTOM-WIDTH: 0px; BORDER-COLLAPSE: collapse" borderColor=#111111 bgColor=#DFFFDF cellSpacing=0 cellPadding=0 align=center border=1">';
                    template = template+'<thead> <th>APP名称</th> <th>SKU</th> <th>视频名称</th> <th>用户id</th> <th>评论方向</th> <th>评论内容</th> <th>操作系统</th> <th>机型</th> <th>系统版本</th> <th>APP版本</th> <th>评论时间</th></thead>';
                    $.each(jsonObj,function (i,item) {
                        template += '<tbody> <tr> <td>'+item.appName+'</td> <td>'+item.skuName+'</td> <td>'+item.courseName+'</td> <td>'+item.userId+'</td><td>';
                        if(item.type == 1){
                            template += '内容方面';
                        }else {
                            template += '功能方面';
                        }
                        template +='</td><td>'+item.content+'</td><td>';
                        if(item.platform==1){
                            template += '安卓';
                        }else {
                            template += 'IOS';
                        }
                        var date = new Date(item.reviewTime);
                        Y = date.getFullYear() + '-';
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        D = date.getDate() + ' ';
                        h = date.getHours() + ':';
                        m = date.getMinutes() + ':';
                        s = date.getSeconds();
                        time=Y+M+D+h+m+s; //
                        template += '</td> <td>'+item.modelNo+'</td> <td>'+item.system+'</td> <td>'+item.version+'</td><td>'+time+'</td> </tr> </tbody>';
                    });
                    template +='</table></body></html>';
                    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
                        format = function(s, c) {
                            return s.replace(/{(\w+)}/g,
                                function(m, p) { return c[p]; }) }
                    return function() {
                        var ctx = {worksheet: name || 'Worksheet'}
                        window.location.href = uri + base64(format(template, ctx))
                    }
                })()
                $this.attr('href', tableToExcel());
            }
        }});
    });

    $(".search").click();
});
    //function cancel_btn(param){
    //    var tr = document.getElementById("add-row");
    //    if(tr != null) {
    //        var rowIndex = tr.rowIndex;
    //        var tb = document.getElementById("activity-list-table");
    //        tb.deleteRow(rowIndex);
    //        if (param == 0) {
    //            $(".cancel-btn").text("回复");
    //            $(".cancel-btn").attr('class', 'update-btn');
    //        } else {
    //            $(".cancel-btn").text("查看");
    //            $(".cancel-btn").attr('class', 'check-btn');
    //        }
    //    }
    //}






