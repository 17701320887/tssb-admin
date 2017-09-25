/**
 * Created by admin on 2016/11/8.
 */
$(function(){
    $.ajax({
        url: "/identity/getUserTypeAndInfo",
        type: "get",
        dataType: "json",
        cache: false,
        async: false,
        success:function(datas){
            if (ExceptionDialog(datas)){
                $("#authorityUser").show();


                var result = datas.result;
                if(result==null)
                {
                    return;
                }
                var department =result.department;
                var group =result.group;
                var rel =result.rel;
                if(department==null&&group==null){
                }else if(department!=null && group!=null && (group.grpOwnerId == rel.authUserId)){
                    //小组管理员
                    $("#operDep").prepend("<option value='"+ department.id + "'>"+department.depName +"</option>");
                    $("#operGrp").prepend("<option value='"+ group.id + "'>"+group.grpName +"</option>");

                    $("#operDep").val(department.id);

                    $("#operGrp").val(group.id);
                    if(department.depOwnerId==rel.authUserId)//既是小组管理员，又是部门管理员
                    {//填充小组下拉列表

                        fillGrps();

                    }

                }else if(department!=null && group==null &&(department.depOwnerId==rel.authUserId))
                {//部门管理员
                    //根据部门加载小组信息

                    $("#operDep").prepend("<option value='"+ department.id + "'>"+department.depName +"</option>");
                    $("#operDep").val(department.id);
                    fillGrps();
                    //填充小组下拉列表
                }else{//员工
                    $("#operDep").prepend("<option value='"+ department.id + "'>"+department.depName +"</option>");
                    $("#operGrp").prepend("<option value='"+ group.id + "'>"+group.grpName +"</option>");
                    $("#authorityUser").hide();
                }
            }
        }
    });

});

function fillGrps()
{
    $.ajax({
        url:"/identity/grpList",
        type: "get",
        dataType: "json",
        cache: false,
        async: false,
        success:function(datassss){
            if (ExceptionDialog(datassss))
            {
                $("#operGrp").html("");
                $("#operGrp").append("<option value='"+ 0 + "'>全部小组</option>");
                var result = datassss.result;
                $(result).each(function(i,val){
                    $("#operGrp").append("<option value='"+ val.id + "'>"+val.grpName +"</option>");
                });
               /* $("#operGrp").append("<option value='-1'>--小组--</option>");*/
            }


        }

    });
}


$(function(){

    $("#operGrp").change(function(){
        $("#authorityUser").val("");
    });


    $("#authorityUser").autocomplete("/identity/searchUser", {
        dataType: "json",
        max: 5,  //列表里的条目数
        minChars: 1,    //自动完成激活之前填入的最小字符,0时双击时触发查询
        width: 400,
        scrollHeight: 150,//提示的高度，溢出显示滚动条
        matchSubset: false,
        mustMatch: true,
        matchContains: false, //包含匹配，就是data参数里的数据,是否只要包含文本框里的数据就显示
        autoFill: false,    //自动填充
        cacheLength: 1, //缓存长度1为不缓存
        extraParams: {
            "email": function () {
                return $("#authorityUser").val();
                //if (em.indexOf('(') >= 0) em = em.substring(em.indexOf('(') + 1, em.indexOf(')'));
            },
            "depId": function () {
                return $("#operDep").val();
            },
            "grpId": function () {
                return  $("#operGrp").val();
            }

        },
        parse: function (datasss) {
            var a = [];
            $.each(datasss.result, function (i, j) {
                a.push({"result": j.email, "id": j.authorityUserId});
            });
            return a;
        },
        formatItem: function (row, i, max) {
            if(max==1){
                $("#authorityUser").val(row.result);
                $("#authorityUserId").val(row.id);
            }
            return '<li onclick="showResult(this);" email ="' +row.result + '" authorityUserId="' + row.id +  '"><strong>' +row.result + '</strong></li>';
        }

    });

});
function showResult(e)
{
    var e =$(e);
    $("#authorityUser").val(e.attr("email"));
    $("#authorityUserId").val(e.attr("authorityUserId"));
    $(e).remove();
    $(".ac_results").hide();
}