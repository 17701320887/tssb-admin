var zTreeObj,
    skuId = $("#skuId").val(),
    subId = $("#subId").val(),
    path = $("#path").val();

var TimeFn = null;
function zTreeOnDblClick(event, treeId, treeNode) {
    clearTimeout(TimeFn);
    var append = true;
    //判断是否是三级考点
    if(treeNode.level == 2){
        $.each($("#exampoint .point"),function(index,element){
            if($(this).attr("data-id")==treeNode.id){
                append = false;
                return false;
            }
        });
        if(append){
            var obj = $("#exampoint");
            if(obj!=undefined){
                obj.append('<div class="analy-kdlist point" data-id="'+treeNode.id+'"><p>'+$('<p>'+treeNode.epName+'</p>').text()+'</p><a>×</a></div>');
            }
        }
    }
};


//初始化拦截器
function epFilter(treeId, parentNode, responseData){
    $.each(responseData, function(index, r){
        r.isParent = r.childCount;
        if(r.isParent){
            r.epName = '<i class="fa fa-folder fa-lg" style="color: #348fe2;"></i> '+r.epName;
        }else{
            r.epName = '<i class="fa fa-folder-o fa-lg" style="color: #348fe2;"></i> '+r.epName;
        }
    });
    return responseData;
}
function zTreeOnClick(event, treeId, treeNode){
    clearTimeout(TimeFn);
    TimeFn = setTimeout(function(){
        //判断展开与否
        if(treeNode.isParent) {
            if (treeNode.open) {
                zTreeObj.expandNode(treeNode, false, true, true, true);
                treeNode.epName = treeNode.epName.replace('fa-folder-open', 'fa-folder');
            } else {
                zTreeObj.expandNode(treeNode, true, true, true, true);
                treeNode.epName = treeNode.epName.replace('fa-folder', 'fa-folder-open');
            }
            zTreeObj.updateNode(treeNode);
        }
    }, 300);
}

//考点树配置
setting = {
    view: {
        dblClickExpand:false,//关闭双击展开节点的功能，
        selectedMulti: false,
        showLine : false,
        showIcon:false,
        showTitle:false,
        nameIsHTML: true
    },
    async:{
        enable:true,
        type:"POST",
        url:path+"/tiExampoint/exampointList",
        autoParam: ["id"],
        otherParam: {
            "skuId":skuId,
            "subjectCode":subId,
            "examYear" : function () {
                return $("#examYear").val();
            }
        },
        dataFilter: epFilter
    },
    data:{
        key:{
            name: "epName"  //指定显示名 默认name
        },
        simpleData: {
            enable:true,
            idKey: "id",
            pIdKey: "parentId", //指定父类id
            rootPId: ""
        }
    },
    callback: {
        onDblClick: zTreeOnDblClick,
        onClick: zTreeOnClick
    }
}


var showEpTree = function(){
    $.ajax({
        type:"post",
        url:"/tiExampoint/exampointList",
        async:false,
        data:{
            "skuId":skuId,"subjectCode":subId,"examYear" : $("#examYear").val()
        },
        success:function(ret){//初始化一级考点
            $.each(ret, function(index, r){
                r.isParent = r.childCount;
                if(r.isParent){
                    r.epName = '<i class="fa fa-folder fa-lg" style="color: #348fe2;"></i> '+r.epName;
                }else{
                    r.epName = '<i class="fa fa-folder-o fa-lg" style="color: #348fe2;"></i> '+r.epName;
                }
            });
            zTreeObj = $.fn.zTree.init($("#tree"),setting,ret);
        }
    });
}

if (skuId && subId) {
    var years = [];
    $.post(path + '/tiExampoint/queryYears', {
        skuCode: skuId,
        subId: subId
    }, function (data) {
        $.each(data, function (index, year) {
            years.push('<option value="'+year+'">'+year+'年</option>');
        });
        $("#examYear").html(years.join(''));
        $("#examYear").change(function() {
            showEpTree();
        });
        showEpTree();
    });
}

$('.kaodian-con').css('height', $(window).height() - 160);