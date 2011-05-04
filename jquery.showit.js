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
                'borderSize': '0px',
                'borderColor': '#000',
                'closeButton': false,
                'closeButtonText': 'Close',
                'fadeSpeed': 400,
                'fontSize': '.8em',
                'overlayAutoClick': true,
                'overlayOpacity': 0.5,
                'title': '',
                'titleColor': '#000',
                'titleBgColor': '#ccc',
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

                // set the element as shows
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
                            'onHide': function () {
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

                // apply border
                if (settings.borderSize != '0px') {
                    $this.css({
                        'border': 'solid ' + settings.borderSize + ' ' + settings.borderColor
                    });
                }

                // get title from tag
                if (!settings.title) {
                    settings.title = $this.attr('title');
                }

                // show title and closebutton
                if (settings.title || settings.closeButton) {
                    var bfd = $('div.showitBottomFrame');
                    if (bfd.length == 0) {
                        bfd = $('<div />').addClass('showitBottomFrame').css({ 'background-color': settings.titleBgColor, 'clear': 'both', 'overflow': 'auto', 'padding': '.5em' });
                        $this.append(bfd);
                    }

                    if (settings.title != '') {
                        var ts = $('span.showitTitle');
                        if (ts.length > 0) {
                            ts.css({ 'font-size': settings.fontSize, 'color': settings.titleColor, 'display': 'block', 'float': 'left' }).html(settings.title);
                        } else {
                            ts = $('<span />').addClass('showitTitle').css({ 'font-size': settings.fontSize, 'color': settings.titleColor, 'display': 'block', 'float': 'left' }).html(settings.title);
                            bfd.append(ts);
                        }
                    }
                    if (settings.closeButton) {
                        var cb = $('a.showitCloseButton');
                        if (cb.length > 0) {
                            cb.css({ 'font-size': settings.fontSize, 'display': 'block', 'float': 'right' }).attr('href', 'javascript:;').html(settings.closeButtonText);
                        } else {
                            cb = $('<a />').addClass('showitCloseButton').css({ 'font-size': settings.fontSize, 'display': 'block', 'float': 'right' }).attr('href', 'javascript:;').html(settings.closeButtonText);
                            bfd.append(cb);

                            cb.click(function () {
                                $this.hideit({ fadeSpeed: settings.fadeSpeed });
                            });
                        }
                    }
                }

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

                // set the element as hidden
                $this.data('showit').shown = false;

                // check for valid element
                if ($this.length == 0) {
                    $.error('Element does not exist');
                }

                // if jquery.overlay.js is loaded, call it
                if (typeof ($.fn.overlay) === 'function') {
                    $.overlay('hide');
                    $('div.showitBottomFrame').remove();
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