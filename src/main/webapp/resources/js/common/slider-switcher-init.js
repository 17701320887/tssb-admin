/**
 * Created by admin on 2016/7/29.
 */
var green = '#00acac',
    red = '#ff5b57',
    blue = '#348fe2',
    purple = '#727cb6',
    orange = '#f59c1a',
    black = '#2d353c';

var renderSwitcher = function() {
    if ($('[data-render=switchery]').length !== 0) {
        $('[data-render=switchery]').each(function() {
            var themeColor = green;
            if ($(this).attr('data-theme')) {
                switch ($(this).attr('data-theme')) {
                    case 'red':
                        themeColor = red;
                        break;
                    case 'blue':
                        themeColor = blue;
                        break;
                    case 'purple':
                        themeColor = purple;
                        break;
                    case 'orange':
                        themeColor = orange;
                        break;
                    case 'black':
                        themeColor = black;
                        break;
                }
            }
            var option = {};
            option.color = themeColor;
            option.secondaryColor = ($(this).attr('data-secondary-color')) ? $(this).attr('data-secondary-color') : '#dfdfdf';
            option.className = ($(this).attr('data-classname')) ? $(this).attr('data-classname') : 'switchery';
            option.disabled = ($(this).attr('data-disabled')) ? true : false;
            option.disabledOpacity = ($(this).attr('data-disabled-opacity')) ? $(this).attr('data-disabled-opacity') : 0.5;
            option.speed = ($(this).attr('data-speed')) ? $(this).attr('data-speed') : '0.5s';
            var switchery = new Switchery(this, option);
        });
    }
};

var renderSwitcherInit = function(self) {
    var themeColor = green;
    if ($(self).attr('data-theme')) {
        switch ($(self).attr('data-theme')) {
            case 'red':
                themeColor = red;
                break;
            case 'blue':
                themeColor = blue;
                break;
            case 'purple':
                themeColor = purple;
                break;
            case 'orange':
                themeColor = orange;
                break;
            case 'black':
                themeColor = black;
                break;
        }
    }
    var option = {};
    option.color = themeColor;
    option.secondaryColor = ($(self).attr('data-secondary-color')) ? $(self).attr('data-secondary-color') : '#dfdfdf';
    option.className = ($(self).attr('data-classname')) ? $(self).attr('data-classname') : 'switchery';
    option.disabled = ($(self).attr('data-disabled')) ? true : false;
    option.disabledOpacity = ($(self).attr('data-disabled-opacity')) ? $(self).attr('data-disabled-opacity') : 0.5;
    option.speed = ($(self).attr('data-speed')) ? $(self).attr('data-speed') : '0.5s';
    var switchery = new Switchery(self, option);
};