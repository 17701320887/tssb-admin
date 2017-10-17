$(function(){
    var path = $('#path').val();
    var frequenceAarry = ['','必考','高','中','低'];
    var importenceAarry = ['','必须掌握','一般了解','加分项'];
    var secondLevelList = $("#secondLevelList");
    var threeLevelList = $("#threeLevelList");
    var submit = false;
    var  curlever = 0;
    var showOperate = $("#id").attr("showOperate")
    var skuId = $("#skuId").val();
    var subId = $("#subjectCode").val();
    //修改考点
    $(".update").live("click",function(event){
        $("#saveOrUpdate").attr("operate_type","update");
        $("#myModal").find("h4").text("修改考点");
        var clever = $(this).parents("ul").attr("id");
        var id = $(this).parents("li").attr("data-id");
        var epName = $(this).parent().parent().attr("data-name");
        var parentId = $(this).parents("li").attr("data-parent");
        $("#parentId").val(parentId);
        $("#epName").val(epName);
        $("#id").val(id);
        if("secondLevelList"==clever||"firstLevelList"==clever){//修改一二级考点
            $("#alertTable").attr("style","margin:330px auto;width:400px");
            $("#myModal .not-required").addClass("hide");
        }else{//修改三级考点 页面回显(未查数据库)
            $("#alertTable").attr("style","margin:250px auto;");
            var frequence = $(this).parents(".next").find("span:eq(0)").attr("data-value");
            var importence = $(this).parents(".next").find("span:eq(1)").attr("data-value");
            var epExplain = $(this).parents(".next").find("span:eq(2)").attr("data-content");
            $.each($("input:radio[name='frequence']"),function(index,element){
                if($(this).val()==frequence){
                    $(this).attr("checked","checked");
                }
            });
            $.each($("input:radio[name='importence']"),function(index,element){
                if($(this).val()==importence){
                    $(this).attr("checked","checked");
                }
            });
            $("#epExplain").val(epExplain);
            $("#myModal div:eq(0)").attr("class","modal-dialog");
            $("#myModal .not-required").removeClass("hide");
        }
        $("#myModal").modal('show');
        event.stopPropagation();
        event.preventDefault();
    });

    //删除考点
    $(".del").live("click",function(event) {
        var id = $(this).parents("li").attr("data-id");
        $.ajax({
            url:"/tiExampoint/del/"+id,
            success:function(ret){
                if(ExceptionDialog(ret)) {
                    if (ret.result=='error'){
                        $('#myModal2 .msg').text('存在子类');
                        $('#myModal2').modal('show');
                    }else{
                        location.reload();
                    }

                }
            }
        });
        event.stopPropagation();
        event.preventDefault();
    });


    //获得二级考点
    $("#firstLevelList li").live("click",function(event){
        curlever = 1;
        $('#firstLevelList .iTemActive').removeClass('iTemActive');
        $(this).addClass('iTemActive');
        var parentId = $(this).attr("data-id");
        $("#parentId").val(parentId);
        $.ajax({
            type: "POST",
            url: "/tiExampoint/secondLevelList/"+subId+"/"+skuId+"/"+parentId,
            success: function (ret) {
                secondLevelList.empty();
                threeLevelList.empty();
                //secondLevelList.append("<br/>");
                if(ret==''){

                }else{
                    $.each(ret,function(index,exampoint){
                        $("#secondLevelList").append(
                            "<li class='nextExampoint list-group-item' data-parent="+exampoint.parentId+" data-id="+exampoint.id+">"+
                            "<div class='list-group-item-heading m-b-0' data-name="+exampoint.epName+"  data-content="+exampoint.epName+">"+exampoint.epName+
                            "<div class='panel-heading-btn hide'>"+
                            "<a class='update btn btn-link btn-xs'  type='button'>修改</a>|<a class='del btn btn-link btn-xs' type='button'>删除</a>"+
                            "</div>"+
                            "</div>"+
                            "</li>"
                        )
                    });
                    if(showOperate=="1;"){
                        secondLevelList.find(".panel-heading-btn").removeClass("hide");
                    }
                }
                twoToOne();
                liSpan();
            }
        });
        event.stopPropagation();
        event.preventDefault();
    });

    //校验表单,默认检查添加一二级别
    function checkForm(){
        var epName = $("#epName").val();
        //名字
        if(epName.length<1 || epName.length>20){
            $("#myModal .panel-heading a").click();
            $('#myModal2 .msg').text('1-20个字，必填');
            $('#myModal2').modal('show');
            submit = false;
            return;
        }else{
            var check = $("#saveOrUpdate").attr("check");
            if("3"==check){
                var frequence = $("input:radio[name='frequence']:checked").val();
                var importence= $("input:radio[name='importence']:checked").val();
                //频率
                if(frequence==null){
                    $('#myModal2 .msg').text('必考、高、中、低，单选，必填');
                    $('#myModal2').modal('show');
                    submit = false;
                    return;
                }
                if(importence==null){
                    $('#myModal2 .msg').text('必须掌握、一般了解、加分项，单选，必填');
                    $('#myModal2').modal('show');
                    submit = false;
                    return;
                }
                var epExplain = $("#epExplain").val();
                if(epExplain.length>500){
                    $('#myModal2 .msg').text('1-500字，选填');
                    $('#myModal2').modal('show');
                    submit = false;
                    return;
                }else{
                    submit=true;
                }
            }else{
                submit=true;
            }
        }

    }

    //保存与取消按钮
    $("#myModal button").on("click",function(){
        var optype = $(this).attr("operate_type");
        if("cancel"==optype){
            $("#myModal .panel-heading a").click();
            return;
        }
        checkForm();
        if(submit){
            var data = $("#addExampointTable").serialize();
            var url="";
            if("save"==optype){
                url="/tiExampoint/add";
            }else{ //修改
                url="/tiExampoint/update";
            }
            $.ajax({
                type:"post",
                data:data,
                url:url,
                async: false,
                success:function(ret){
                    if(ExceptionDialog(ret)) {
                        location.reload();
                    }
                }
            });
        }
    });

    function showalert(){
        $('#myModal2 .msg').text('请选择父类考点');
        $('#myModal2').modal('show');
    }
    function csstable(){
        $("#alertTable").attr("style","margin:330px auto;width:400px");
        $('#myModal').modal('show');
    }

    //增加考点
    $(".addExamPoint").on("click",function(){
        var parentId = $("#parentId");
        $("#saveOrUpdate").attr("operate_type","save");
        $("#epName").val("");
        var exampoint = ($(this).parents(".panel-success").find("h4").text());
        $("#myModal").find("h4").text("添加"+exampoint);
        var skuid=$(".form-control option:selected").val();
        $('#myModal .input[name=skuId]').val(skuid);

        $("#saveOrUpdate").attr("check","1");
        $("#myModal .not-required").addClass("hide");

        if("一级考点"==exampoint){
            parentId.val(0);
            csstable();
            return;
        }
        if(curlever==0){
            if("一级考点"==exampoint){
                parentId.val(0);
                csstable();
            }else{
                showalert();
            }
        }
        if(curlever==1){
            if("一级考点"==exampoint){
                parentId.val(0);
                csstable();
                return ;
            }
            if("二级考点"==exampoint){
                csstable();
            }else{
                showalert();
            }
        }
        if(curlever==2){
            if("三级考点"==exampoint){
                $("#epExplain").val("");
                $.each($("input[name='frequence']"),function(){
                    this.checked=false;

                });
                $.each($("input[name='importence']"),function(){
                    this.checked=false;
                });
                $("#saveOrUpdate").attr("check","3");
                $("#alertTable").attr("style","margin:250px auto;");
                $("#myModal .not-required").removeClass("hide");
                $('#myModal').modal('show');
                return;
            }
            if("一级考点"==exampoint){
                parentId.val(0);
                csstable();
                return;
            }
            if("二级考点"==exampoint){
                showalert();
            }else{
                showalert();
            }
        }

    });

    //获得三级考点
    $("#secondLevelList li").live("click",function(){
        curlever = 2;
        $('#secondLevelList .iTemActive').removeClass('iTemActive');
        $(this).addClass('iTemActive');
        var parentId = $(this).attr("data-id");
        $("#parentId").val(parentId);
        $.ajax({
            type: "POST",
            url: "/tiExampoint/threeLevelList/"+subId+"/"+skuId+"/"+parentId,
            success: function (ret) {
                threeLevelList.empty();
                //threeLevelList.append("<br/>");
                if(ret==''){

                }else{
                    $.each(ret,function(index,exampoint){
                        threeLevelList.append(
                            "<li class='next list-group-item'  data-parent="+exampoint.parentId+" data-id="+exampoint.id+">"+
                            "<div class='list-group-item-heading m-b-0' data-name="+exampoint.epName+" data-content="+exampoint.epName+"|"+frequenceAarry[exampoint.frequence]+"|"+importenceAarry[exampoint.importence]+"|"+exampoint.epExplain+">"+exampoint.epName+
                            "<div class='panel-heading-btn hide'>"+
                            "<a class='update btn btn-link btn-xs  l-h-1' type='button'>修改</a>|<a class='del btn btn-link btn-xs' type='button'>删除</a>"+
                            "</div>"+
                            "</div>"+
                            "<p class='list-group-item-text'/><span class='frequence' data-value="+exampoint.frequence+"  data-content="+frequenceAarry[exampoint.frequence]+">"+frequenceAarry[exampoint.frequence]+"</span> |<span class='importence' data-value="+exampoint.importence+" data-content="+importenceAarry[exampoint.importence]+"> "+importenceAarry[exampoint.importence]+
                            "</span>|<span class='epExplain' data-content="+exampoint.epExplain+"> "+exampoint.epExplain+"</span>" +
                            "</p>"+
                            "</li>"
                        )
                    });
                    if(showOperate=="1;"){
                        threeLevelList.find(".panel-heading-btn").removeClass("hide");
                    }
                }
                threeToTwo();
                liSpan();
            }
        });
    });

    var twoToOne = function(){
        $('.two .list-group-item').draggable({
            containment: '.con',
            revert: "invalid",
            scope: 'two-one',
            cursor: "move",
            helper: "clone",
            //iframeFix: true,
            //stack: ".products",
            zIndex: 100,
            //snap: true,
            //opacity: 0.35,
            start: function(event, ui){
                //$(this).css('z-index','1052');
                //$('.two,.one').css({'z-index':'1051','position':'relative'});
                //$('.bs-example-modal-sm').modal('show')
                $(this).parent().parent().css({overflow:'visible'});
            },
            stop: function(event, ui) {
//              $(this).css('z-index','');
//              $('.two,.one').css({'z-index':'','position':''});
//              $('.bs-example-modal-sm').modal('hide')
                $(this).parent().parent().css({overflow:'hidden'});
            }
        });
        $('.one .list-group-item').droppable({
            scope: 'two-one',
            activeClass: 'ui-droppable-active',
            hoverClass: 'ui-droppable-hover',
            over: function(event, ui) {
            },
            out: function(event, ui) {
            },
            drop: function( event, ui ) {
                if(confirm('确定要将（'+ui.draggable.find('div').attr('data-name')+'）移到（'+$(this).find('div').attr('data-name')+'）中？')){
                    $.ajax({
                        url: path+'/tiExampoint/updateParent',
                        type:'post',
                        data:{
                            id:ui.draggable.attr('data-id'),
                            pid:$(this).attr('data-id')
                        },
                        success:function(result){
                            ui.draggable.remove();
                        }
                    });
                }else{
                    ui.draggable.css({
                        left: '0px',
                        top: '0px'
                    });
                }
            }
        });
        if(showOperate=="-1;"){
            $(".two .list-group-item").draggable("disable");
        }
    }

    var threeToTwo = function(){
        $('.three .list-group-item').draggable({
            containment: '.con',
            revert: "invalid",
            scope: 'three-two',
            cursor: "move",
            helper: "clone",
            //iframeFix: true,
            //stack: ".products",
            zIndex: 100,
            //snap: true,
            //opacity: 0.35,
            start: function(event, ui){
                //$(this).css('z-index','1052');
                //$('.three,.two').css({'z-index':'1051','position':'relative'});
                //$('body').css("overflow","hidden")
                // $("#cover").show();
                //$('.bs-example-modal-sm').modal('show')
                //$(this).parent().css({overflow:'visible'});
                $(this).parent().parent().css({overflow:'visible'});
            },
            stop: function(event, ui) {
                //$(this).css('z-index','');
                //$('.three,.two').css({'z-index':'','position':''});
                //$('.bs-example-modal-sm').modal('hide')
                //$(this).parent().css({overflow:'hidden'});
                $(this).parent().parent().css({overflow:'hidden'});
            }
        });
        $('.two .list-group-item').droppable({
            scope: 'three-two',
            activeClass: 'ui-droppable-active',
            hoverClass: 'ui-droppable-hover',
            over: function(event, ui) {
            },
            out: function(event, ui) {
            },
            drop: function( event, ui ) {
                if(confirm('确定要将（'+ui.draggable.find('div').attr('data-name')+'）移到（'+$(this).find('div').attr('data-name')+'）中？')){
                    $.ajax({
                        url: path+'/tiExampoint/updateParent',
                        type:'post',
                        data:{
                            id:ui.draggable.attr('data-id'),
                            pid:$(this).attr('data-id')
                        },
                        success:function(result){
                            ui.draggable.remove();
                        }
                    });
                }else{
                    ui.draggable.css({
                        left: '0px',
                        top: '0px'
                    });
                }
            }
        });
        if(showOperate=="-1;"){
            $(".three .list-group-item").draggable("disable");
        }
    }

    var liSpan = function(){
        $('.list-group-item-heading').popover({
            animation:true,
            delay: { "show": 200, "hide": 100 },
            trigger: 'hover ',
            template: '<div class="popover" role="tooltip" style="width: 263px;"><div class="arrow"></div><div class="popover-content" style="color: #cccccc;"></div></div>',
            content: $(this).attr('data-content'),
            placement: 'top'
        });
    }

    twoToOne();
    threeToTwo();
    liSpan();

});
