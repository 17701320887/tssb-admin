var path = $("#path").val();
var userForm = $("#userForm");
var updateUserForm = $("#updateUserForm");
var groupForm = $("#groupForm");
var updateGroupForm = $("#updateGroupForm");

$("#saveDepartment").click(function(){

    if(formCheck()){
        var datas = {"depName":$("#depname").val(),"depOwnerId":$("#depOwnerId").val(),"depOwnerName":$("#depOwnerName").val(),"remark":$("#remark").val()}
        $.ajax({
            url:path+"/department/save",
            type:"post",
            dataType:"json",
            cache: false,
            data :datas,
            success: function (datas){
                if(ExceptionDialog(datas)){
                    userForm.find("#depname").val("");
                    userForm.find("#depOwnerName").val("");
                    userForm.find("#depOwnerId").val("");
                    userForm.find("#remark").val("");
                    userTable.ajax.reload();//刷新
                    duiaAlter("保存成功！", duiaAlterColor.green);
                }
            }
        })
        $("#close").click();
    }

})

$("#save_group").click(function(){
    if(formGroupCheck()){
        $("gId").val(0);
        var obj=document.getElementById('group_dname');
        var index=obj.selectedIndex; //序号，取当前选中选项的序号
        var val = obj.options[index].value;
        var datas = {"depId":val,"grpName":$("#group_name").val(),"grpOwnerId":$("#group_owner_id").val(),"grpOwnerName":$("#group_owner_name").val(),"remark":$("#group_remark").val()}
        $.ajax({
            url:path+"/depGroups/add",
            type:"post",
            dataType:"json",
            cache: false,
            data :datas,
            success: function (datas){
                if(ExceptionDialog(datas)){
                    userForm.find("#depname").val("");
                    userForm.find("#depOwnerName").val("");
                    userForm.find("#depOwnerId").val("");
                    userForm.find("#remark").val("");
                    userTable.ajax.reload();//刷新
                    duiaAlter("保存成功！", duiaAlterColor.green);
                }
            }
        })
        $("#close_group").click();
    }

})

function updateDepartmentDialog(id){
    formInit();
    $.ajax({
        url:path+"/department/entity",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"id":id},
        success: function (datas){
            if(ExceptionDialog(datas)){
                var result = datas.result;
                updateUserForm.find("#update_depOwnerEmail").val(result.email);
                updateUserForm.find("#dId").val(result.id);
                updateUserForm.find("#update_depname").val(result.depName);
                updateUserForm.find("#update_depOwnerName").val(result.depOwnerName);
                updateUserForm.find("#update_depOwnerId").val(result.depOwnerId);
                oldDepOwnerId=result.depOwnerId;
            }
        }
    })
}
var oldDepOwnerId=0;
function updateGroupDialog(id){
    formInit();
    $.ajax({
        url:path+"/depGroups/entity",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"id":id},
        success: function (datas){
            if(ExceptionDialog(datas)){
                var result = datas.result;
                findDepartment(result.depId);
                updateGroupForm.find("#gId").val(result.id);
                updateGroupForm.find("#update_group_name").val(result.grpName);
                updateGroupForm.find("#update_group_owner_name").val(result.grpOwnerName);
                updateGroupForm.find("#update_group_owner_id").val(result.grpOwnerId);
                updateGroupForm.find("#update_group_owner_email").val(result.email);
            }
        }
    })
}

function deleteDepartmentDialog(id){
    var message ="是否要删除部门？删除后数据不可恢复<span style='color: red'>（慎选）<span>";
    BootstrapDialog.confirm({
        title: '删除部门',
        message: message,
        type: BootstrapDialog.TYPE_DANGER,
        closable: true,
        btnCancelLabel: '取消',
        btnOKLabel: '删除',
        btnOKClass: 'btn-warning',

        callback: function (result) {
            if (result) {
                $.ajax({
                    url: path + "/department/delete",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    async: false,
                    data: {"id":id},
                    success: function (d) {
                        if(d.code==200){
                            duiaAlter("删除成功！", duiaAlterColor.green);
                            userTable.ajax.reload(null, false);
                        }else{
                            duiaAlter("删除失败！", duiaAlterColor.red);
                        }
                    }
                })
            }
        }
    })
}

function deleteGroupDialog(id){

    var message ="是否要删除小组？删除后数据不可恢复<span style='color: red'>（慎选）<span>";
    BootstrapDialog.confirm({
        title: '删除小组',
        message: message,
        type: BootstrapDialog.TYPE_DANGER,
        closable: true,
        btnCancelLabel: '取消',
        btnOKLabel: '删除',
        btnOKClass: 'btn-warning',

        callback: function (result) {
            if (result) {
                $.ajax({
                    url: path + "/depGroups/delete",
                    type: "post",
                    dataType: "json",
                    cache: false,
                    async: false,
                    data: {"id":id},
                    success: function (d) {
                        if (ExceptionDialog(d)) {
                            duiaAlter("删除成功！", duiaAlterColor.green);
                            userTable.ajax.reload(null, false);
                        }
                    }
                })
            }
        }
    })
}

function findDepartment(dId){
    formInit();
    var obj;
    if(dId==undefined||dId==''){
        obj=document.getElementById('group_dname');
        $("#group_dname").val('');
        $("#group_name").val('');
        $("#group_owner_name").val('');
        $("#group_owner_email").val('');
        $("#group_owner_id").val('');
        $("#gId").val('');
    }else{
        obj=document.getElementById('update_group_dname');
    }
    obj.options.length=0;
    $.ajax({
        url:path+"/department/find/departmentAll",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        success: function (datas){
            for(var i=0;i<datas.result.length;i++){
                var entity=datas.result[i];
                if(dId==entity.id){
                    obj.add(new Option(entity.depName,entity.id));
                    obj.options[i].selected=true;
                }else{
                    obj.add(new Option(entity.depName,entity.id));
                }

            }
        }
    })
}


function formInit(){
    $(".has-error").each(function(i,d){
        $(d).removeClass("has-error has-feedback");
    })
    $("li[name=ErrorTip]").each(function(i,d){
        $(d).html("");
    })
}

$("#update_deparment").click(function(){
    if(updateformCheck()){
        var datas = {"id":updateUserForm.find("#dId").val(),"depName":$("#update_depname").val(),"depOwnerName":$("#update_depOwnerName").val(),
            "depOwnerId":$("#update_depOwnerId").val(), "remark":$("#update_remark").val(),"oldDepOwnerId":oldDepOwnerId}
        $.ajax({
            url:path+"/department/update",
            type:"post",
            dataType:"json",
            cache: false,
            data :datas,
            success: function (datas){
                if(datas.code==200){
                    duiaAlter("修改成功！", duiaAlterColor.green);
                    userTable.ajax.reload(null, false);
                }else if(datas.code==401){
                    duiaAlter("你没有修改部门的权限！", duiaAlterColor.red);
                }else{
                    duiaAlter("修改失败！", duiaAlterColor.red);
                }
            }
        })
        $("#update_close").click();
    }
});

$("#update_group").click(function(){
    if(updateFormGroupCheck()){
        var obj=document.getElementById('update_group_dname');
        var index=obj.selectedIndex; //序号，取当前选中选项的序号
        var val = obj.options[index].value;
        var datas = {"id":updateGroupForm.find("#gId").val(),"depId":val,"grpName":$("#update_group_name").val(),"grpOwnerId":$("#update_group_owner_id").val(),
            "grpOwnerName":$("#update_group_owner_name").val(),"remark":$("#update_group_remark").val()}
        $.ajax({
            url:path+"/depGroups/update",
            type:"post",
            dataType:"json",
            cache: false,
            data :datas,
            success: function (datas){
                if(ExceptionDialog(datas)){
                    duiaAlter("修改成功！", duiaAlterColor.green);
                    userTable.ajax.reload(null, false);
                }
            }
        })
        $("#update_close_group").click();
    }
});

//验证部门名称是否唯一
function isCheckDname(dName){
    var dId=$("#dId").val();
    var flag = false;
    if(dId==undefined){
        dId=0;
    }
    $.ajax({
        url:path+"/department/check/department",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"depName":dName,"id":dId},
        success: function (datas){
            if(datas.code == HttpUtil.success_code){
                flag =  true;
            }
        }
    })
    return flag;
}
//验证小组名称是否唯一
function isCheckGname(gName){
    var dId =0;
    var gId=$("#gId").val();
    var flag = false;
    if(gId==undefined||gId==""){
        gId=0;
        var obj=document.getElementById('group_dname');
        var index=obj.selectedIndex; //序号，取当前选中选项的序号
        dId = obj.options[index].value;
    }else{
        var  obj=document.getElementById('update_group_dname');
        var index=obj.selectedIndex; //序号，取当前选中选项的序号
        dId = obj.options[index].value;
    }
    $.ajax({
        url:path+"/depGroups/check/group",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"grpName":gName,"id":gId,"depId":dId},
        success: function (datas){
            if(datas.code == HttpUtil.success_code){
                flag =  true;
            }
        }
    })
    return flag;
}
//验证部门负责人是否唯一
function isCheckLeader(data){
    var dId=$("#dId").val();
    if(dId==undefined){
        dId=0;
    }
    var flag = HttpUtil.error_code;
    $.ajax({
        url:path+"/department/check/departmentLeader",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"depOwnerId":data,"id":dId},
        success: function (datas){
            flag  =  datas.code ;
        }
    })
    return flag;
}

//验证小组负责人是否唯一
function isCheckGroupLeader(data){
    var obj;
    var gId=$("#gId").val();
    if(gId==undefined||gId==""){
        gId=0;
        obj=document.getElementById('group_dname');
    }else{
        obj=document.getElementById('update_group_dname');
    }
    var index=obj.selectedIndex; //序号，取当前选中选项的序号
    var dId = obj.options[index].value;
    var flag = false;
    $.ajax({
        url:path+"/depGroups/check/groupLeader",
        type:"post",
        dataType:"json",
        cache: false,
        async: false,
        data :{"grpOwnerId":data,"id":gId,"depId":dId},
        success: function (datas){
            if(datas.code == HttpUtil.success_code){
                flag =  true;
            }
        }
    })
    return flag;
}

function formCheck(){
    formInit();
    if($.trim(userForm.find("#depname").val())==""){
        userForm.find("#depname").parent().parent().addClass("has-error has-feedback");
        userForm.find("#depname").parent().find("li").html("名称不能为空!");
        return false;
    }

    if($.trim(userForm.find("#depname").val()).length>15){
        userForm.find("#depname").parent().parent().addClass("has-error has-feedback");
        userForm.find("#depname").parent().find("li").html("部门名称1-15个字或字符!");
        return false;
    }
    if(!isCheckDname(userForm.find("#depname").val())){
        userForm.find("#depname").parent().parent().addClass("has-error has-feedback");
        userForm.find("#depname").parent().find("li").html("部门名称重复!");
        return false;
    }

    if($.trim(userForm.find("#depOwnerName").val())==""){
        userForm.find("#depOwnerName").parent().parent().addClass("has-error has-feedback");
        userForm.find("#depOwnerName").parent().find("li").html("负责人不能为空!");
        return false;
    }
    if($.trim(userForm.find("#depOwnerEmail").val())==""){
        userForm.find("#depOwnerName").parent().parent().addClass("has-error has-feedback");
        userForm.find("#depOwnerName").parent().find("li").html("负责人不能为空!");
        return false;
    }

    var is_checkLeader=isCheckLeader(userForm.find("#depOwnerId").val());
    if(is_checkLeader==500){
        userForm.find("#depOwnerName").parent().parent().addClass("has-error has-feedback");
        userForm.find("#depOwnerName").parent().find("li").html("此人已负责其他部门!");
        return false;
    }else if(is_checkLeader==501){
        userForm.find("#depOwnerName").parent().parent().addClass("has-error has-feedback");
        userForm.find("#depOwnerName").parent().find("li").html("此人属于小组中成员，请先删除该角色!");
        return false;
    }
    return true;
}

function updateformCheck(){
    formInit();
    if($.trim(updateUserForm.find("#update_depname").val())==""){
        updateUserForm.find("#update_depname").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_depname").parent().find("li").html("邮箱名称不能为空!");
        return false;
    }

    if($.trim(updateUserForm.find("#update_depname").val()).length>15){
        updateUserForm.find("#update_depname").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_depname").parent().find("li").html("部门名称1-15个字或字符!");
        return false;
    }
    if(!isCheckDname(updateUserForm.find("#update_depname").val())){
        updateUserForm.find("#update_depname").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_depname").parent().find("li").html("部门名称重复!");
        return false;
    }

    if($.trim(updateUserForm.find("#update_depOwnerName").val())==""){
        updateUserForm.find("#update_depOwnerName").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_depOwnerName").parent().find("li").html("负责人不能为空!");
        return false;
    }

    if($.trim(updateUserForm.find("#update_depOwnerEmail").val())==""){
        updateUserForm.find("#update_depOwnerName").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_depOwnerName").parent().find("li").html("负责人不能为空!");
        return false;
    }

    var is_checkLeader=isCheckLeader(updateUserForm.find("#update_depOwnerId").val());
    if(is_checkLeader==500){
        updateUserForm.find("#update_depOwnerName").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_depOwnerName").parent().find("li").html("此人已负责其他部门!");
        return false;
    }else if(is_checkLeader==501){
        updateUserForm.find("#update_depOwnerName").parent().parent().addClass("has-error has-feedback");
        updateUserForm.find("#update_depOwnerName").parent().find("li").html("此人属于小组中成员，请先删除该角色!")
        return false;
    }
    return true;
}

function formGroupCheck(){
    formInit();
    if($.trim(groupForm.find("#group_dname").val())==""){
        groupForm.find("#group_dname").parent().parent().addClass("has-error has-feedback");
        groupForm.find("#group_dname").parent().find("li").html("名称不能为空!");
        return false;
    }

    if($.trim(groupForm.find("#group_name").val())==""){
        groupForm.find("#group_name").parent().parent().addClass("has-error has-feedback");
        groupForm.find("#group_name").parent().find("li").html("名称不能为空!");
        return false;
    }

    if($.trim(groupForm.find("#group_name").val()).length>15){
        groupForm.find("#group_name").parent().parent().addClass("has-error has-feedback");
        groupForm.find("#group_name").parent().find("li").html("名称1-15个字或字符!");
        return false;
    }
    if(!isCheckGname(groupForm.find("#group_name").val())){
        groupForm.find("#group_name").parent().parent().addClass("has-error has-feedback");
        groupForm.find("#group_name").parent().find("li").html("小组名称重复!");
        return false;
    }

    if($.trim(groupForm.find("#group_owner_name").val())==""){
        groupForm.find("#group_owner_name").parent().parent().addClass("has-error has-feedback");
        groupForm.find("#group_owner_name").parent().find("li").html("负责人不能为空!");
        return false;
    }

    if($.trim(groupForm.find("#group_owner_email").val())==""){
        groupForm.find("#group_owner_name").parent().parent().addClass("has-error has-feedback");
        groupForm.find("#group_owner_name").parent().find("li").html("负责人不能为空!");
        return false;
    }

    if(!isCheckGroupLeader(groupForm.find("#group_owner_id").val())){
        groupForm.find("#group_owner_name").parent().parent().addClass("has-error has-feedback");
        groupForm.find("#group_owner_name").parent().find("li").html("此人已存在于其他部门或小组!");
        return false;
    }
    return true;
}

function updateFormGroupCheck(){
    formInit();
    if($.trim(updateGroupForm.find("#update_group_dname").val())==""){
        updateGroupForm.find("#update_group_dname").parent().parent().addClass("has-error has-feedback");
        updateGroupForm.find("#update_group_dname").parent().find("li").html("部门不能为空!");
        return false;
    }

    if($.trim(updateGroupForm.find("#update_group_name").val())==""){
        updateGroupForm.find("#update_group_name").parent().parent().addClass("has-error has-feedback");
        updateGroupForm.find("#update_group_name").parent().find("li").html("名称不能为空!");
        return false;
    }

    if($.trim(updateGroupForm.find("#update_group_name").val()).length>15){
        updateGroupForm.find("#update_group_name").parent().parent().addClass("has-error has-feedback");
        updateGroupForm.find("#update_group_name").parent().find("li").html("名称1-15个字或字符!");
        return false;
    }
    if(!isCheckGname(updateGroupForm.find("#update_group_name").val())){
        updateGroupForm.find("#update_group_name").parent().parent().addClass("has-error has-feedback");
        updateGroupForm.find("#update_group_name").parent().find("li").html("小组名称重复!");
        return false;
    }

    if($.trim(updateGroupForm.find("#update_group_owner_name").val())==""){
        updateGroupForm.find("#update_group_owner_name").parent().parent().addClass("has-error has-feedback");
        updateGroupForm.find("#update_group_owner_name").parent().find("li").html("负责人不能为空!");
        return false;
    }

    if($.trim(updateGroupForm.find("#update_group_owner_email").val())==""){
        updateGroupForm.find("#update_group_owner_name").parent().parent().addClass("has-error has-feedback");
        updateGroupForm.find("#update_group_owner_name").parent().find("li").html("负责人不能为空!");
        return false;
    }

    if(!isCheckGroupLeader(updateGroupForm.find("#update_group_owner_id").val())){
        updateGroupForm.find("#update_group_owner_name").parent().parent().addClass("has-error has-feedback");
        updateGroupForm.find("#update_group_owner_name").parent().find("li").html("此人已存在于其他部门或小组!");
        return false;
    }
    return true;
}

var jumpUserPage = function(depId, grpId){
    var f=document.createElement('form');
    f.style.display='none';
    f.action= path+'/usersDepGrpRel';
    f.method='post';
    f.innerHTML='<input type="hidden" name="depId" value="'+depId+'"/><input type="hidden" name="grpId" value="'+grpId+'"/>';
    document.body.appendChild(f);
    f.submit();
}
