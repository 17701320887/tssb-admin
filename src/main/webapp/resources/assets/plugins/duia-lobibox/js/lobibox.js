var Lobibox = Lobibox || {};

(function () {

    var LobiboxNotify = function (type, options) {
//------------------------------------------------------------------------------
//----------------PROTOTYPE VARIABLES-------------------------------------------
//------------------------------------------------------------------------------
        this.$type = null;
        this.$options = null;
        this.$el = null;
//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------        
        var me = this;
//------------------------------------------------------------------------------
//-----------------私有函数--------------------------------------------
//------------------------------------------------------------------------------
        var _processInput = function (options) {
            if (options.size === 'mini' || options.size === 'large') {
                options = $.extend({}, Lobibox.notify.OPTIONS[options.size], options);
            }
            options = $.extend({}, Lobibox.notify.OPTIONS[me.$type], Lobibox.notify.DEFAULTS, options);

            if (options.size !== 'mini' && options.title === true) {
                options.title = Lobibox.notify.OPTIONS[me.$type].title;
            } else if (options.size === 'mini' && options.title === true) {
                options.title = false;
            }
            if (options.icon === true) {
                options.icon = Lobibox.notify.OPTIONS.icons[options.iconSource][me.$type];
            }
            if (options.sound === true) {
                options.sound = Lobibox.notify.OPTIONS[me.$type].sound;
            }
            if (options.sound) {
                options.sound = options.soundPath + options.sound + options.soundExt;
            }
            Lobibox.notify.OPTIONS.color = options.color;
            return options;
        };

        var _appendInWrapper = function ($el, $wrapper) {
            if (me.$options.size === 'normal') {
                if ($wrapper.hasClass('bottom')) {
                    $wrapper.prepend($el);
                } else {
                    $wrapper.append($el);
                }

            } else if (me.$options.size === 'mini') {
                if ($wrapper.hasClass('bottom')) {
                    $wrapper.prepend($el);
                } else {
                    $wrapper.append($el);
                }
            } else if (me.$options.size === 'large') {
                var tabPane = _createTabPane().append($el);
                var $li = _createTabControl(tabPane.attr('id'));
                $wrapper.find('.lb-notify-wrapper').append(tabPane);
                $wrapper.find('.lb-notify-tabs').append($li);
                _activateTab($li);
                $li.find('>a').click(function () {
                    _activateTab($li);
                });
            }
        };
        var _activateTab = function ($li) {
            $li.closest('.lb-notify-tabs').find('>li').removeClass('active');
            $li.addClass('active');
            var $current = $($li.find('>a').attr('href'));
            $current.closest('.lb-notify-wrapper').find('>.lb-tab-pane').removeClass('active');
            $current.addClass('active')
        };
        var _createTabControl = function (tabPaneId) {
            var $li = $('<li></li>', {
                'class': Lobibox.notify.OPTIONS[me.$type]['class']
            });
            $('<a></a>', {
                'href': '#' + tabPaneId
            }).append('<i class="tab-control-icon ' + me.$options.icon + '"></i>')
                .appendTo($li);
            return $li;
        };
        var _createTabPane = function () {
            return $('<div></div>', {
                'class': 'lb-tab-pane',
                'id': Math.randomString(10)
            })
        };
        var _createNotifyWrapper = function () {
            var selector = (me.$options.size === 'large' ? '.lobibox-notify-wrapper-large' : '.lobibox-notify-wrapper')
                    + "." + me.$options.position.replace(/\s/gi, '.'),
                $wrapper;

            //var classes = me.$options.position.split(" ");
            $wrapper = $(selector);
            if ($wrapper.length === 0) {
                $wrapper = $('<div></div>')
                    .addClass(selector.replace(/\./g, ' ').trim())
                    .appendTo($('body'));
                if (me.$options.size === 'large') {
                    $wrapper.append($('<ul class="lb-notify-tabs"></ul>'))
                        .append($('<div class="lb-notify-wrapper"></div>'));
                }
            }
            return $wrapper;
        };
        var _createNotify = function () {

            var OPTS = Lobibox.notify.OPTIONS,
                $iconEl,
                $innerIconEl,
                $iconWrapper,
                $body,
                $msg,
                //$background_color,
                $notify = $('<div></div>', {
                    'class': 'lobibox-notify ' + ' ' + OPTS['class'] + ' ' + me.$options.showClass
                });
                $notify.css("background-color",options.color);
            $iconWrapper = $('<div class="lobibox-notify-icon-wrapper"></div>').appendTo($notify);
            $iconEl = $('<div class="lobibox-notify-icon"></div>').appendTo($iconWrapper);
            $innerIconEl = $('<div></div>').appendTo($iconEl);
            // Add image or icon depending on given parameters
            if (me.$options.img) {
                $innerIconEl.append('<img src="' + me.$options.img + '"/>');
            } else if (me.$options.icon) {
                $innerIconEl.append('<div class="icon-el"><i class="' + me.$options.icon + '"></i></div>');
            } else {
                $notify.addClass('without-icon');
            }
            // Create body, append title and message in body and append body in notification
            $msg = $('<div class="lobibox-notify-msg">' + me.$options.msg + '</div>');

            if (me.$options.messageHeight !== false) {
                $msg.css('max-height', me.$options.messageHeight);
            }

            $body = $('<div></div>', {
                'class': 'lobibox-notify-body'
            }).append($msg).appendTo($notify);

            if (me.$options.title) {
                $body.prepend('<div class="lobibox-notify-title">' + me.$options.title + '<div>');
            }
            _addCloseButton($notify);
            if (me.$options.size === 'normal' || me.$options.size === 'mini') {
                _addCloseOnClick($notify);
                _addDelay($notify);
            }

            // Give width to notification
            if (me.$options.width) {
                $notify.css('width', _calculateWidth(me.$options.width));
            }

            return $notify;
        };
        var _addCloseButton = function ($el) {
            if (!me.$options.closable) {
                return;
            }
            $('<span class="lobibox-close">&times;</span>').click(function () {
                me.remove();
            }).appendTo($el);
        };
        var _addCloseOnClick = function ($el) {
            if (!me.$options.closeOnClick) {
                return;
            }
            $el.click(function () {
                me.remove();
            });
        };
        var _addDelay = function ($el) {
            if (!me.$options.delay) {
                return;
            }
            if (me.$options.delayIndicator) {
                var delay = $('<div class="lobibox-delay-indicator"><div></div></div>');
                $el.append(delay);
            }
            var time = 0;
            var interval = 1000 / 30;
            var currentTime = new Date().getTime();
            var timer = setInterval(function () {
                if (me.$options.continueDelayOnInactiveTab){
                    time = new Date().getTime() - currentTime;
                } else {
                    time += interval;
                }

                var width = 100 * time / me.$options.delay;
                if (width >= 100) {
                    width = 100;
                    me.remove();
                    timer = clearInterval(timer);
                }
                if (me.$options.delayIndicator) {
                    delay.find('div').css('width', width + "%");
                }

            }, interval);

            if (me.$options.pauseDelayOnHover) {
                $el.on('mouseenter.lobibox', function () {
                    interval = 0;
                }).on('mouseleave.lobibox', function () {
                    interval = 1000 / 30;
                });
            }
        };
        var _findTabToActivate = function ($li) {
            var $itemToActivate = $li.prev();
            if ($itemToActivate.length === 0) {
                $itemToActivate = $li.next();
            }
            if ($itemToActivate.length === 0) {
                return null;
            }
            return $itemToActivate;
        };
        var _calculateWidth = function (width) {
            width = Math.min($(window).outerWidth(), width);
            return width;
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        /**
         * Delete the notification
         *
         * @returns {LobiboxNotify}
         */
        this.remove = function () {
            me.$el.removeClass(me.$options.showClass)
                .addClass(me.$options.hideClass);
            var parent = me.$el.parent();
            var wrapper = parent.closest('.lobibox-notify-wrapper-large');

            var href = '#' + parent.attr('id');

            var $li = wrapper.find('>.lb-notify-tabs>li:has(a[href="' + href + '"])');
            $li.addClass(Lobibox.notify.OPTIONS['class'])
                .addClass(me.$options.hideClass);
            setTimeout(function () {
                if (me.$options.size === 'normal' || me.$options.size === 'mini') {
                    me.$el.remove();
                } else if (me.$options.size === 'large') {

                    var $newLi = _findTabToActivate($li);
                    if ($newLi) {
                        _activateTab($newLi);
                    }
                    $li.remove();
                    parent.remove();
                }
                var list = Lobibox.notify.list;
                var ind = list.indexOf(me);
                list.splice(ind, 1);
                var next = list[ind];
                if (next && next.$options.showAfterPrevious){
                    next._init();
                }
            }, 500);

            return me;
        };
        me._init = function () {
            // Create notification
            var $notify = _createNotify();
            if (me.$options.size === 'mini') {
                $notify.addClass('notify-mini');
            }

            if (typeof me.$options.position === 'string') {
                var $wrapper = _createNotifyWrapper();
                _appendInWrapper($notify, $wrapper);
                if ($wrapper.hasClass('center')) {
                    $wrapper.css('margin-left', '-' + ($wrapper.width() / 2) + "px");
                }
            } else {
                $('body').append($notify);
                $notify.css({
                    'position': 'fixed',
                    left: me.$options.position.left,
                    top: me.$options.position.top
                })
            }

            me.$el = $notify;
            if (me.$options.sound) {
                var snd = new Audio(me.$options.sound); // buffers automatically when created
                snd.play();
            }
            if (me.$options.rounded) {
                me.$el.addClass('rounded');
            }
            me.$el.on('click.lobibox', function(ev){
                if (me.$options.onClickUrl){
                    window.location.href = me.$options.onClickUrl;
                }
                if (me.$options.onClick && typeof me.$options.onClick === 'function'){
                    me.$options.onClick.call(me, ev);
                }
            });
            me.$el.data('lobibox', me);
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        this.$type = type;
        this.$options = _processInput(options);
        if (!me.$options.showAfterPrevious || Lobibox.notify.list.length === 0){
            this._init();
        }

    };
    Lobibox.notify = function (type, options) {
        if (["default", "info", "warning", "error", "success"].indexOf(type) > -1) {
            var lobibox = new LobiboxNotify(type, options);
            Lobibox.notify.list.push(lobibox);
            return lobibox;
        }
    };
    Lobibox.notify.list = [];
    Lobibox.notify.closeAll = function () {
        var list = Lobibox.notify.list;
        for (var i in list){
            list[i].remove();
        }
    };

    Lobibox.notify.OPTIONS = {
        'class': 'animated-fast',
        large: {
            width: 500,
            messageHeight: 96
        },
        mini: {
            'class': 'notify-mini',
            messageHeight: 32
        },
        success: {
            'class': 'lobibox-notify-success',
            'title': 'Success',
        },
        error: {
        },
        icons: {
            bootstrap: {
                success: 'glyphicon glyphicon-ok-sign',
                error: 'glyphicon glyphicon-remove-sign',
                warning: 'glyphicon glyphicon-exclamation-sign',
                info: 'glyphicon glyphicon-info-sign'
            },
            fontAwesome: {
                success: 'fa fa-check-circle',
                error: 'fa fa-times-circle',
                warning: 'fa fa-exclamation-circle',
                info: 'fa fa-info-circle'
            }
        },
        color:"#cccccc"
    };
})();

//            传参函数
(function () {
    $('#basicDefaults').click(function () {
        duiaAlter('成功 绿色', duiaAlterColor.green);
        duiaAlter('信息 蓝色', duiaAlterColor.blue);
        duiaAlter('警告 黄色', duiaAlterColor.yellow);
        duiaAlter('错误 红色', duiaAlterColor.red);
    });
})();

function duiaAlter(content,color){
    Lobibox.notify('error', {
        //title: title,                // 自定义标题
        //从Lobibox.notify。选择对象的不同类型的通知或一组自定义字符串。设置这个假禁用标题
        size: 'mini',             // normal, mini, large 正常,迷你,大
        //showClass: 'zoomIn',        // 显示动画类。
        //hideClass: 'zoomOut',       // 隐藏动画类。
        showClass: 'fadeInDown',
        hideClass: 'fadeUpDown',
        icon:false,                 // 是否显示图标
        msg: content,   // 基本的通知   消息的通知
        //img: IMG_PREFIX + '3.jpg',  // 图像源
        closable: true,             // 让通知可闭
        delay: 2000,                // 增加延迟时间   粘性(及时)
        delayIndicator: true,       // 显示计时器指示器
        closeOnClick: true,         // 通过点击关闭通知他们
        width: ($(window).width())-220,   // 通知框宽度
        position: "top",    // 'top left', 'top right', 'bottom left', 'bottom right'  替代的位置
        iconSource: "bootstrap",     // “引导”或“fontAwesome”图书馆将用于图标
        rounded: false,             // 是否要圆角
        messageHeight: 60,          // 通知消息的最大高度。这不是通知本身,这是.lobibox-notify-msg
        pauseDelayOnHover: true,    // 当你鼠标在通知,延迟会停顿了一下,只有continueDelayOnInactiveTab是错误的.
        onClickUrl: null,           // 点击通知打开url
        showAfterPrevious: false,   // 前关闭后显示通知
        continueDelayOnInactiveTab: true, // false 当你鼠标在通知,延迟会停顿了一下, true 继续拖延
        color:color
    });
}

