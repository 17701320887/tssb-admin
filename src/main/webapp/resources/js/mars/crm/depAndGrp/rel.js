/**
 * Created by admin on 2016/11/2.
 */
;(function($, window, document, undefined){

    var path = $("#path").val(),
        userStatus = ['离职', '在职'],
        positions = ['', '老师', '教务', '销售', '财务', '技术', '其他'],
        depId = $('#depId').val(),
        grpId = $('#grpId').val(),
        grpName = $('#grpName').val();

    jQuery.validator.addMethod("unequle", function(value, element, param) {
        return $(param).val()!=value;
    }, "请选择不同的小组");

    var table = $('#table_id_example').DataTable({
        ajax:{
            url: path+'/usersDepGrpRel/query',
            type: 'post',
            data: function (data) {
                data.params = {
                    depId: depId,
                    grpId: grpId,
                    email: $('#email-search').val().trim()
                };
                return JSON.stringify(data);
            },
            dataType: "json",
            processData: false,
            contentType: 'application/json;charset=UTF-8'
        },
        searching:false,
        processing: true,
        serverSide: true,
        language: {
            url: path+'/resources/assets/plugins/DataTables/media/Chinese.json'
        },
        pagingType: "full_numbers",
        ordering: false,
        //dom: "<'row'<'.col-xs-3'><'col-xs-9'>>t<'row'<'col-xs-3'i><'col-xs-2'l><'col-xs-7'p>>",
        columns: [{
            data: "num"
        },{
            data: "username"
        },{
            data: "email"
        },{
            data: "mobile"
        },{
            data: null,
            render: function(){
                return grpName;
            }
        },{
            data: "userStatus",
            render: function(data,type,row,meta){
                return userStatus[data];
            }
        },{
            data: null
        }],
        columnDefs: [
            {
                targets: 6,
                render: function (data, type, row, metad) {
                    return tableTool(data);
                }
            }

        ]
    });
    $('#search-btn').on('click', function(){
        table.ajax.reload();
    });
    $('#addUserBtn').on('click', function(){
        $('#addUserform')[0].reset();
        $('#addUser').modal('show');
    });
    $('#table_id_example').delegate('.moveUserBtn', 'click', function(event){
        var $this = $(event.target);
        $('#updateUserform')[0].reset();
        $('#upUserId').val($this.attr('data-uid'));
        $('#updateUserPanel').modal('show');
    });
    $('#table_id_example').delegate('.deleteUserBtn', 'click', function(event){
        var $this = $(event.target),
            $tr = $this.parents('tr');
        BootstrapDialog.show({
            title: '移除成员',
            type: BootstrapDialog.TYPE_DANGER,
            message: '确认移除成员 <strong>'+$tr.children('td:eq(1)').text()+'</strong> ?',
            buttons: [{
                label: '移除',
                cssClass: 'btn-success btn-sm',
                action: function(dialogItself){
                    $.post(path+'/usersDepGrpRel/del',{
                        depId: depId,
                        grpId: grpId,
                        authUserId: $this.attr('data-uid')
                    },function(result){
                        if(ExceptionDialog(result)) {
                            if(result.code == HttpUtil.success_code){
                                dialogItself.close();
                                duiaAlter("移除成功！", duiaAlterColor.green);
                                table.ajax.reload(null, false);
                            }else{
                                dialogItself.close();
                                duiaAlter("移除失败！", duiaAlterColor.red);
                            }
                        }
                    });
                }
            }, {
                label: '取消',
                cssClass: 'btn-sm',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }]
        });
    });
    $('#userEmail').focus().autocomplete(path+'/user/likeEmail', {
        dataType: 'json',
        max: 5,  //列表里的条目数
        minChars: 1,    //自动完成激活之前填入的最小字符,0时双击时触发查询
        matchSubset: false,
        mustMatch:true,
        matchContains: false, //包含匹配，就是data参数里的数据,是否只要包含文本框里的数据就显示
        autoFill: false,    //自动填充
        cacheLength:1, //缓存长度1为不缓存
        extraParams : {
            "email": function (){
                var em = $("#userEmail").val();
//                if(em.indexOf('(')>=0) em = em.substring(em.indexOf('(')+1, em.indexOf(')'));
                return em;
            }
        },
        parse: function (date) {
            return $.map(date, function(user){
                return {
                    id: user.id,
                    name: user.username,
                    position: user.position,
                    result: user.email
                }
            });
        },
        formatItem: function (row, i, max) {
            if(max==1){
                $('#position').val(row.name);
                $('#authUserId').val(row.id);
            }
            return row.name +'('+row.result+')'
        }
    }).result(function(event, data, formatted){
        if(data){
            $('#position').val(positions[data.position]);
            $('#authUserId').val(data.id);
        }else{
            $('#position').val('');
            $('#authUserId').val('');
        }
    });
    $('#saveUserBtn').on('click', function(){
        $('#addUserform').submit();
    });
    $('#addUserform').validate({
        submitHandler: function(form) {
            $.ajax({
                url:path+'/usersDepGrpRel/add',
                data:$('#addUserform').serialize(),
                type:'post',
                success:function(result){
                    if(ExceptionDialog(result)) {
                        if(result.code == HttpUtil.success_code){
                            $('#addUser').modal('hide');
                            duiaAlter("添加成功！", duiaAlterColor.green);
                            table.ajax.reload(null, false);
                        }else{
                            duiaAlter("添加失败！", duiaAlterColor.red);
                        }
                    }
                }
            });
        }
    });
    $('#updateUserBtn').on('click', function(){
        $('#updateUserform').submit();
    });
    $('#updateUserform').validate({
        rules: {
            newGrpId: {
                required: true,
                unequle: "#oldGrpId"
            }
        },
        submitHandler: function(form) {
            $.ajax({
                url:path+'/usersDepGrpRel/update',
                data:$('#updateUserform').serialize(),
                type:'post',
                success:function(result){
                    if(ExceptionDialog(result)) {
                        if(result.code == HttpUtil.success_code){
                            $('#updateUserPanel').modal('hide');
                            duiaAlter("移动成功！", duiaAlterColor.green);
                            table.ajax.reload(null, false);
                        }else{
                            duiaAlter("移动失败！", duiaAlterColor.red);
                        }
                    }
                }
            });
        }
    });
    $.post(path+'/depGroups/findGroupByDepId', {
        depId: depId
    }, function(result){
        if(ExceptionDialog(result)) {
            var gs = [];
            gs.push('<option value="">--请选择小组--</option>');
            $(result.result).each(function(index, g){
                gs.push('<option value="'+ g.id+'">'+ g.grpName+'</option>');
            });
            $('#grp').html(gs.join(''));
        }
    });

})(jQuery, window, document);