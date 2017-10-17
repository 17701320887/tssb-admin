var roleTree;//角色树对象
var menuTree;//菜单树对象
var operTree;//操作树对象
var skuTree;//sku树对象
var saveBtn = $("#saveBtn");//保存
var path = $("#path").val();
var defaultRoleId = "-1";
var defaultMenuId = "-1";
var defaultOperId = "-1";
var defaultSkuId = "-1"

var  roleSetting = {
    view: {
        addHoverDom: null,
        removeHoverDom: null,
        selectedMulti: false
    },
    async:{
        enable:true,
        type:"post",
        url:path+"/per/role/list",
        dataFilter: RoleFilter
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn:false,
        showRenameBtn:false,
        drag:false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick:roleOnclick,
        onAsyncError:function(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown){
            console.log("ztree 异常码:",textStatus);
            console.log("ztree 异常信息:",errorThrown);
        },
        onAsyncSuccess:function(e,treeId,treeNode,msg){
            var node = roleTree.getNodeByParam("id",defaultRoleId,null);
            roleTree.selectNode(node);
            menuTree.setting.async.enable = true;
            menuTree.reAsyncChildNodes(null,"refresh");
        }
    }
};


var  menuSetting = {
    view: {
        addHoverDom: null,
        removeHoverDom: null,
        selectedMulti: false
    },
    async:{
        enable:false,
        type:"post",
        url:path+"/per/menu/list",
        dataFilter: RoleFilter
    },
    check: {
        enable:true,
        chkStyle:"checkbox",
        autoCheckTrigger:true
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn:false,
        showRenameBtn:false,
        drag:false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeCheck:function(treeId,treeNode){
            //控制无法勾选
            return false;
        },
        onClick:menuOnclick,
        beforeAsync:function(treeId,treeNode) {
            var selectRoleNode = roleTree.getSelectedNodes()[0];//当前选中的角色节点
            if (selectRoleNode.id == -1 || selectRoleNode.parent) {
                return false;//如果是根角色节点
            }
            menuTree.setting.async.otherParam = {"roleId":selectRoleNode.id};
            return true;
        },
        onAsyncError:function(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown){
            console.log("ztree 异常码:",textStatus);
            console.log("ztree 异常信息:",errorThrown);
        },
        onAsyncSuccess:function(e,treeId,treeNode,msg){
            //获取节点并选中,异步加载操作树
            var node = menuTree.getNodeByParam("id",defaultMenuId,null);
            menuTree.selectNode(node);
            operTree.setting.async.enable = true;
            operTree.reAsyncChildNodes(null,"refresh");
        }
    }
};


var  operSetting = {
    view: {
        addHoverDom: null,
        removeHoverDom: null,
        selectedMulti: false
    },
    async:{
        enable:false,
        type:"post",
        url:path+"/per/oper/list",
        dataFilter: RoleFilter
    },
    check: {
        enable: true,
        chkStyle: "checkbox",
        autoCheckTrigger: true
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn:false,
        showRenameBtn:false,
        drag:false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeCheck:function(treeId,treeNode){
            //控制无法勾选
            return false;
        },
        onCheck:function(event,treeId,treeNode){
            var checkNodes =  operTree.getCheckedNodes(true);//获取所有勾选的操作节点
            var selectMenuNode =  menuTree.getSelectedNodes()[0];//获取当前选中的菜单节点
            if(checkNodes.length<=0){
                //操作节点全部未勾选
                menuTree.checkNode(selectMenuNode, false, true);//取消当前选中的操作节点勾选状态
            }else{
                //sku节点有勾选的
                menuTree.checkNode(selectMenuNode, true, true);//设置当前选中的操作节点为勾选状态
            }
        },
        onClick:operOnclick,
        beforeAsync:function(treeId,treeNode) {
            var selectMenuNode = menuTree.getSelectedNodes()[0];//当前选中的菜单节点
            var selectRoleNode = roleTree.getSelectedNodes()[0];//当前选中的角色节点
            if (selectMenuNode.id == -1 || selectMenuNode.parent) {
                return false;//如果是根角色节点
            }
            operTree.setting.async.otherParam = {"roleId":selectRoleNode.id,"menuId":selectMenuNode.id};
            return true;
        },
        onAsyncError:function(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown){
            console.log("ztree 异常码:",textStatus);
            console.log("ztree 异常信息:",errorThrown);
        },
        onAsyncSuccess:function(e,treeId,treeNode,msg){
            var node = operTree.getNodeByParam("id",defaultOperId,null);
            operTree.selectNode(node);
            skuTree.setting.async.enable = true;
            skuTree.reAsyncChildNodes(null,"refresh");
        }
    }
};


var  skuSetting = {
    view: {
        addHoverDom: null,
        removeHoverDom: null,
        selectedMulti: false
    },
    async:{
        enable:false,
        type:"post",
        url:path+"/per/sku/list",
        dataFilter: RoleFilter
    },
    check: {
        enable: true,
        chkStyle: "checkbox",
        autoCheckTrigger: true
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn:false,
        showRenameBtn:false,
        drag:false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onCheck:function(event,treeId,treeNode){
            var checkNodes =  skuTree.getCheckedNodes(true);//获取所有勾选的sku节点
            var selectOperNode =  operTree.getSelectedNodes()[0];//获取当前选中的操作节点
            if(checkNodes.length<=0){
                //sku节点全部未勾选
                operTree.checkNode(selectOperNode, false, true);//取消当前选中的操作节点勾选状态
            }else{
                //sku节点有勾选的
                operTree.checkNode(selectOperNode, true, true);//设置当前选中的操作节点为勾选状态
            }
            saveBtn.show();//显示保存按钮
            //禁止其他树的切换点击操作
            operTree.setting.callback.beforeClick = function(){return false};
            menuTree.setting.callback.beforeClick = function(){return false};
            roleTree.setting.callback.beforeClick = function(){return false};
            /* if ( treeNode.name=='取消该权限' ) {
             勾选全部的时候不选《取消该权限》选项
             console.log(treeId + "   ,   " + treeNode+"  ,  "+treeNode.name);
             *//*   skuTree.cancelSelectedNode(treeNode);
             skuTree.cancelSelectedNode(treeId);*//*
             skuTree.checkNode(treeNode, false, false);
             }*/
        },
        beforeClick:function(){
            return false;
        },
        beforeAsync:function(treeId,treeNode) {
            var selectMenuNode = menuTree.getSelectedNodes()[0];//当前选中的菜单节点
            var selectRoleNode = roleTree.getSelectedNodes()[0];//当前选中的角色节点
            var selectOperNode = operTree.getSelectedNodes()[0];//当前选中的操作节点
            if (selectOperNode == null||selectOperNode.id == -1 || selectOperNode.parent) {
                return false;//如果是根角色节点
            }
            skuTree.setting.async.otherParam = {"roleId":selectRoleNode.id,"menuId":selectMenuNode.id,"operId":selectOperNode.id};
            //2016-11-04  添加取消权限功能
            var newNodes = [{id:-2,name:"取消此权限"}];
            skuTree.addNodes(null,-1,newNodes);
            return true;
        },
        onAsyncError:function(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown){
            console.log("ztree 异常码:",textStatus);
            console.log("ztree 异常信息:",errorThrown);
        },
        onAsyncSuccess:function(e,treeId,treeNode,msg){
            var node = skuTree.getNodeByParam("id",defaultSkuId,null);
            skuTree.selectNode(node);
        }
    }
};


//保存授权
saveBtn.click(function () {
    var roleNode = roleTree.getSelectedNodes()[0];//当前选中的角色节点
    var menuNode = menuTree.getSelectedNodes()[0];//当前选中的菜单节点
    var operNode = operTree.getSelectedNodes()[0];//当前选中的操作节点
    var skuNodes = skuTree.getCheckedNodes(true);//当前勾选的sku节点
    var flag = false;//标记是否含有默认sku
    var cancelFlag = false;//标记是否含有取消权限
    var skuArr = {};//sku数组
    for (var i = 0; i < skuNodes.length; i++) {
        skuArr[i] = skuNodes[i].id;
        if (skuNodes[i].id == 0) {
            flag = true;
        }
        if (skuNodes[i].id == -2) {
            cancelFlag = true;
        }
    }
    //判断是否勾选取消权限
    if (cancelFlag) {
        BootstrapDialog.confirm({
            title: '确定取消权限',
            message: "您已勾选取消权限选项，确定后将把原有的权限清除，请慎重操作",
            type: BootstrapDialog.TYPE_DANGER,
            closable: true,
            btnCancelLabel: '取消',
            btnOKLabel: '确认',
            btnOKClass: 'btn-danger',
            callback: function (result) {
                if (result) {
                    savePerData(roleNode,menuNode,operNode,skuArr,null,true)
                } else {
                    result;
                }
            }
        });
    }else{
        //不取消  判断是否勾选默认sku
        if (!flag) {
            $().toastmessage('showErrorToast', "默认sku必须勾选!");
            return;
        }else{
            savePerData(roleNode, menuNode, operNode, skuArr,null,null);
        }
    }
});


function savePerData(roleNode,menuNode,operNode,skuArr,delMenuFlag,delOperFlag){

    var datas = {
        "roleId": roleNode.id,
        "menuId": menuNode.id,
        "operId": operNode.id,
        "skuIds": skuArr,
        "resCode": menuNode.code,
        "operCode": operNode.code,
        "delMenuFlag": !menuNode.checked,
        "delOperFlag": !operNode.checked
    };
    if(delOperFlag) {
        datas.delOperFlag = true;
    }
    /*授权请求参数*/
    //保存授权前ID
    defaultRoleId = roleNode.id;
    defaultMenuId = menuNode.id;
    defaultOperId = operNode.id;
    $.ajax({
        url: path + "/per/role/auth",
        type: "post",
        dataType: "json",
        cache: false,
        data: datas,
        success: function (datas) {
            if (ExceptionDialog(datas)) {
                $().toastmessage('showSuccessToast', "保存成功!");
                roleTree.reAsyncChildNodes(null, "refresh");
                saveBtn.hide();//隐藏保存按钮
                //启用其他树的切换点击操作
                operTree.setting.callback.beforeClick = function () {
                    return true
                };
                menuTree.setting.callback.beforeClick = function () {
                    return true
                };
                roleTree.setting.callback.beforeClick = function () {
                    return true
                };
            }
        }
    });
}

//角色点击
function roleOnclick(e,treeId,treeNode,clickFlag){
    if(treeNode.parent){
        //父角色展开子节点
        roleTree.expandNode(treeNode, true, false, true);
    }else{
        var selectMenuNode = menuTree.getSelectedNodes()[0];
        if(null != selectMenuNode){
            defaultMenuId = selectMenuNode.id;//当前选中的菜单节点
        }
        var selectOperNode = operTree.getSelectedNodes()[0];
        if(null != selectOperNode){
            defaultOperId = selectOperNode.id;//当前选中的操作节点
        }
        //子角色触发菜单Ajax
        menuTree.reAsyncChildNodes(null,"refresh");
    }

}
//菜单点击
function menuOnclick(e,treeId,treeNode,clickFlag){
    if(treeNode.parent){
        //父菜单展开子节点
        menuTree.expandNode(treeNode, true, false, true);
    }else{
        var selectOperNode = operTree.getSelectedNodes()[0];
        if(null != selectOperNode){
            defaultOperId = selectOperNode.id;//当前选中的操作节点
        }
        //子菜单触发操作Ajax
        operTree.reAsyncChildNodes(null,"refresh");
    }

}
//操作点击
function operOnclick(e,treeId,treeNode,clickFlag){
    if(treeNode.parent){
        //父操作展开子节点
        operTree.expandNode(treeNode, true, false, true);
    }else{
        //子操作触发skuAjax
        skuTree.reAsyncChildNodes(null,"refresh");
    }
}

function RoleFilter(treeId, parentNode, responseData) {
    responseData.icon= path + '/resources/common/ztree/css/zTreeStyle/img/diy/1_open.png';
    var oneChildren = responseData.children;
    for (var i = 0; i< oneChildren.length; i++) {
        if (oneChildren[i].parent) {
            oneChildren[i].icon = path + '/resources/common/ztree/css/zTreeStyle/img/diy/1_close.png';
        }else{
            oneChildren[i].icon = path + '/resources/common/ztree/css/zTreeStyle/img/diy/3.png';
        }
        var twoChildren  = oneChildren[i].children;
        if(null != twoChildren){
            for(var j = 0; j< twoChildren.length; j++){
                if(twoChildren[j].parent){
                    twoChildren[j].icon = path + '/resources/common/ztree/css/zTreeStyle/img/diy/1_close.png';
                }else{
                    twoChildren[j].icon = path + '/resources/common/ztree/css/zTreeStyle/img/diy/3.png';
                }
            }
        }
    }
    return responseData;
}


var handleJstree = function(){
    roleTree = $.fn.zTree.init($("#jstree-role"), roleSetting);//初始化角色树
    menuTree = $.fn.zTree.init($("#jstree-menu"), menuSetting);//初始化菜单树
    operTree = $.fn.zTree.init($("#jstree-oper"), operSetting);//初始化操作树
    skuTree = $.fn.zTree.init($("#jstree-sku"),skuSetting);//初始化sku树
}
