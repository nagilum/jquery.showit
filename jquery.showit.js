/*
 * jquery.showit.js, jQuery plugin to display any element centered
 *
 * Copyright 2011, Stian Hanger (pdnagilum@gmail.com)
 */
(function ($) {
    var methodsShowIt = {
        init: function (options, c, cbHide) {
            var settings = $.extend({},
            {
                'overlayAutoClick': true,
                'overlayOpacity': 0.5,
                'fadeSpeed': 400,
                'zIndex': 999
            }, options);
            return this.each(function () {
                // declare
                var $this = $(this);
                var windowHeight = $(window).height();
                var windowWidth = $(window).width();
                var elementHeight = $this.height();
                var elementWidth = $this.width();
                var elementLeft = 0;
                var elementTop = 0;

                $this.data('showit', { 'shown': true });

                // check for valid element
                if ($this.length == 0) {
                    $.error('Element does not exist');
                }

                // if jquery.overlay.js is loaded, call it
                if (settings.overlayAutoClick) {
                    if (typeof ($.fn.overlay) === 'function') {
                        $.overlay({
                            'autoClick': settings.overlayAutoClick,
                            'opacity': settings.overlayOpacity,
                            'onHide': function (e) {
                                if ($this.data('showit').shown) {
                                    $this.hideit(options, cbHide);
                                }
                            }
                        });
                    }
                }

                // calculate top/left
                if (windowHeight > elementHeight) { elementTop = ((windowHeight - elementHeight) / 2) + $(window).scrollTop(); }
                if (windowWidth > elementWidth) { elementLeft = ((windowWidth - elementWidth) / 2); }

                // show form
                $this
                .css({
                    'left': elementLeft,
                    'position': 'absolute',
                    'top': elementTop,
                    'zIndex': settings.zIndex
                })
                .fadeIn(
                    settings.fadeSpeed,
                    function (e) {
                        if (c) {
                            c.call($this);
                        }
                    }
                );
            });
        }
    };
    var methodsHideId = {
        init: function (options, c) {
            var settings = $.extend({},
            {
                'fadeSpeed': 400
            }, options);
            return this.each(function () {
                // declare
                var $this = $(this);

                $this.data('showit').shown = false;

                // check for valid element
                if ($this.length == 0) {
                    $.error('Element does not exist');
                }

                // if jquery.overlay.js is loaded, call it
                if (typeof ($.fn.overlay) === 'function') {
                    $.overlay('hide');
                }

                $this
                .fadeOut(
                    settings.fadeSpeed,
                    function (e) {
                        if (c) {
                            c.call($this);
                        }
                    }
                );
            });
        }
    };
    $.fn.showit = function (method) {
        if (methodsShowIt[method]) {
            return methodsShowIt[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof (method) === 'object' || !method) {
            return methodsShowIt.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.ShowIt');
        }
    };
    $.fn.hideit = function (method) {
        if (methodsHideId[method]) {
            return methodsHideId[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof (method) === 'object' || !method) {
            return methodsHideId.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.HideIt');
        }
    };
})(jQuery);