/**
 * Created by admin on 2016/8/9.
 */
;(function($){
    var f, myCkeditor;
    $('.exampoint').delegate('a', 'click', function(e){
        var ev = e || window.event;
        $(ev.target).parent().remove();
    });

    //年份选择框初始化
    var years = [];
    for(var y = new Date().getFullYear() + 1; y>=2010; y--){
        years.push('<option value="'+y+'">'+y+'年</option>');
    }
    $('.year').html(years.join(''));
    if($('#tiType').val()!='cl'){
        $('#t'+$('#typeCode').val()).addClass('tiku-cur');
        $(document).attr("title",$('#typeName').val());
    }
    $('.saveBtn').click(function(){
        if($("#status").val()==3&&$("#id").val()&&($("#typeModel").val()!=3)){
            layer.confirm('此操作会将试卷从审核通过中移出，请确定？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                DataSubmit.submit(f);
            }, function(){
            });
        }else{
            DataSubmit.submit(f);
        }
    });
    //试卷或材料题添加小题时的取消按钮
    $('.quxiao').click(function(){
        var pId = $('#paperId').val(),
            tiType = $('#tiType').val();
        if(typeof(pId) != 'undefined' || typeof(tiType) != 'undefined'){//试卷或材料题添加小题时的取消按钮
            var $tis = $('.tis:hidden');
            $('.tis, .tiBig').show();
            $('.tiCache, .selectType, .titles').remove();
            $('.yl[data-type="tg"], .yl[data-type="btg"], .ty_title').hide();
            pId && tiType && $.getHtmlPaper($tis.attr('data-id'), $tis);
        }else{//普通添加小题
            layer.confirm('您确定要关闭本页吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                window.opener = null;
                window.open('', '_self');
                window.close()
            }, function(){
            });
        }
        //window.location.reload();
    });

    $.each($(".uploadImage"), function (index, ele) {
        new plupload.Uploader({
            runtimes : 'html5,flash,silverlight',//设置运行环境，会按设置的顺序，可以选择的值有html5,gears,flash,silverlight,browserplus,html
            flash_swf_url : path+'/resources/js/tiku/plupload-2.3.1/js/Moxie.swf',
            silverlight_xap_url : path+'/resources/js/tiku/plupload-2.3.1/js/Moxie.xap',
            url : path+'/title/ajaxupload',//上传文件路径
            max_file_size : '20M',//100b, 10kb, 10mb, 1gb
            chunk_size : '1mb',//分块大小，小于这个大小的不分块
            unique_names : true,//生成唯一文件名
            browse_button : ele,
            filters : [ {
                title : 'Mp3',
                extensions : 'mp3,ogg'
            } ],

            init : {
                FilesAdded: function(up, files) {
                    var $parAnm = $(ele).parent();
                    $parAnm.after('<div id="progress" style="margin: 8px -55px 8px 115px;"><div class="bar" style="width: 0%;"></div></div>');
                    this.start();
                    return false;
                },
                FileUploaded : function(up, file, info) {//文件上传完毕触发
                    console.log("单独文件上传完毕");
                    var response = $.parseJSON(info.response)[0];
                    $('#progress').remove();
                    var $par = $(ele).parent().parent();
                    $par.find('.analyzeVoiceUrl').val(response.src);
                    $par.find('.voiceUrlClass source').attr('src', response.src);
                    $par.find('.voiceUrlClass').show();
                    $par.find('.voiceUrlClass audio').load();
                },
                UploadComplete : function(uploader, files) {
                    console.log("所有文件上传完毕");
                },
                UploadProgress : function(uploader, file) {
                    $('#progress .bar').css(
                        'width',
                        file.percent + '%'
                    ).text(file.percent + '%');
                },
                Error : function (uploader, errObject) {
                    if (errObject.code == '-600') {
                        layer.alert('文件不能超过20M');
                    }
                }
            }
        }).init();
    });

    $('.delVoice').on('click', function(){
        var $par = $(this).parent().parent();
        $par.find('.analyzeVoiceUrl').val('');
        $par.find('.voiceUrlClass source').attr('src', '');
        $par.find('.voiceUrlClass').hide();
    });
    $('.voide-id input:visible').on('change', function () {
        $(this).nextAll('input').val(0);
    });
    $('.yanzheng').on('click', function(){
        var $yanzheng = $(this),
            leId = $yanzheng.prev().val();
        leId && $.ajax({
            url:'/letv/validate/'+leId,
            data:{},
            type:'post',
            success:function(result){
                result = JSON.parse(result);
                if(result.code==0){
                    $yanzheng.next().val('1');
                    alert(result.message);
                }else{
                    $yanzheng.next().val('0');
                    alert(result.message);
                }
            }
        });
    });

    $('#songListEdit').sortable({
        cancel:'.options,.answer,.year-right',
        update: function (event, ui) {
            ui.item.find('div[contenteditable=true]').blur();
            if (myCkeditor) {
                CKEDITOR.remove(myCkeditor);
                $('#cke_'+myCkeditor.element.$.id).remove();
                myCkeditor = undefined;
            }
            for (var editor in CKEDITOR.instances) {
                $('#cke_'+editor).remove();
                CKEDITOR.remove(CKEDITOR.instances[editor]);
            }
        }
    });

    $('.stem-content').off('blur', 'div[contenteditable=true]');
    $('.stem-content').delegate('div[contenteditable=true]', 'blur', function(event){
        event = event || window.event;
        var $target = $(event.target);
        ($target.find('img, table').length == 0 && $target.text()=='')?$target.html(''):null;
    });
    $('.stem-content').off('focus', 'div[contenteditable=true]');
    $('.stem-content').delegate('div[contenteditable=true]', 'focus', function(event){
        event = event || window.event;
        if (!myCkeditor) {//未实例化
            myCkeditor = CKEDITOR.inline(event.target);
        } else {
            // console.log(myCkeditor.element.$.id);
            // console.log(event.target.id);
            if (myCkeditor.element.$.id === event.target.id) {
            } else {//已实例化，但不是该文本框的实例
                //清除并重新实例化
                // for (var editor in CKEDITOR.instances) {
                //     CKEDITOR.remove(CKEDITOR.instances[editor]);
                // }
                CKEDITOR.remove(myCkeditor);
                $('#cke_'+myCkeditor.element.$.id).remove();
                myCkeditor = CKEDITOR.inline(event.target);
            }
        }
    });
    $('.stem-content').off('blur', 'input[type="text"], textarea');
    $('.stem-content').delegate('input[type="text"], textarea', 'blur',function(){
        $(this).val($.trim($(this).val()));
    });
})(jQuery);