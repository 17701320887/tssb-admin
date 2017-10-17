/**
 * Created by admin on 2016/7/26.
 */
(function(window){
    var setting = {
        // check: {
        //     enable: true,
        //     chkboxType: {"Y":"", "N":""}
        // },
        view: {
            dblClickExpand: false
        },
        data: {
            key: {
                name: "itemName"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentId",
                rootPId: 0
            }
        },
        callback: {
            onClick: onClick
        }
    };
    var zTree;
    $.ajax({
        url:'/tiItemConfig/queryItemBySku',
        data:{
            skuId:$("#dataId").attr("skuId")
        },
        type:'post',
        success:function(zNodes){
            zTree = $.fn.zTree.init($("#treeDemo2"), setting, zNodes);
        }
    });

    var checkItem;
    function onClick(e, treeId, treeNode) {
        checkItem.val(treeNode.itemName);
    }
    $('.items').delegate('.itemName', 'click', function(e){
        var ev = e || window.event;
        var obj = $(ev.target);
        var offset = obj.offset();
        checkItem = obj;
        $("#menuContent").css({left:offset.left + "px", top:offset.top + obj.outerHeight() + "px"}).slideDown("fast");
        $("body").bind("mousedown", onBodyDown);
    })

    function hideMenu() {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }
    function onBodyDown(event) {
        if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
            hideMenu();
        }
    }

})(window);
