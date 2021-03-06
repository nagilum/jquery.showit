/**
 * @file
 * jQuery plugin to show any element centered on the visible screen.
 *
 * @author
 *   Stian Hanger, pdnagilum@gmail.com
 */

(function ($) {
  var methodsShowIt = {
    init: function (options, c) {
      var settings = $.extend({}, {
        // Settings for showit.
        'fadeSpeed': 400,
        'zIndex': 999,
        'css': {},
        'maxWidthPercent': 80,
        'clickToClose': false,

        // Settings for overlay, if loaded.
        'useOverlay': false,
        'overlayObject': document,
        'overlayOptions': {}
      }, options);

      return this.each(function () {
        var element = $(this);

        if (element.length == 0) {
          $.error('Element does not exist!');
        }

        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var elementHeight = element.height();
        var elementWidth = element.width();
        var elementLeft = 0;
        var elementTop = 0;

        if (settings.maxWidthPercent < 100 && settings.maxWidthPercent > 0 && elementWidth > windowWidth) {
          var diff = elementWidth - windowWidth;
          var diffPercent = (100 / elementWidth) * diff;
          var diffPercentOperator = parseFloat('0.' + diffPercent.toString());

          elementWidth = windowWidth;
          elementHeight = elementHeight - (elementHeight * diffPercentOperator);

          var percent = parseFloat('0.' + settings.maxWidthPercent.toString());

          elementWidth = elementWidth * percent;
          elementHeight = elementHeight * percent;

          element
            .css({
              'height': elementHeight,
              'width': elementWidth
            });
        }

        element.data('showit', {
          'shown': true
        });

        if (typeof ($.fn.overlay) === 'function' && settings.overlayUseIfLoaded) {
          settings.overlayOptions.onHide = function () {
            if (element.data('showit').shown) {
              element.hideit(options);
            }
          }
          $(settings.overlayObject).overlay(settings.overlayOptions);
        }

        if (windowHeight > elementHeight) { elementTop = ((windowHeight - elementHeight) / 2) + $(window).scrollTop(); }
        if (windowWidth > elementWidth) { elementLeft = ((windowWidth - elementWidth) / 2); }

        element
          .css({
            'left': elementLeft,
            'position': 'absolute',
            'top': elementTop,
            'zIndex': settings.zIndex
          })
          .css(settings.css)
          .fadeIn(
            settings.fadeSpeed,
            function (e) {
              if (c) {
                c.call(element);
              }
            }
          )
          .click(function () {
            if (settings.clickToClose) {
              element.hideit();
            }
          });
      });
    }
  };
  var methodsHideIt = {
    init: function (options, c) {
      var settings = $.extend({}, {
        // Settings for showit.
        'fadeSpeed': 400,

        // Settings for overlay, if loaded.
        'overlayUseIfLoaded': true,
        'overlayObject': document,
        'overlayOptions': {}
      }, options);

      return this.each(function () {
        var element = $(this);

        if (element.length == 0) {
          $.error('Element does not exist!');
        }

        element.data('showit').shown = false;

        if (typeof ($.fn.overlay) === 'function' && settings.overlayUseIfLoaded) {
          $(settings.overlayObject).overlay('hide');
        }

        element
          .fadeOut(
            settings.fadeSpeed,
            function (e) {
              if (c) {
                c.call(element);
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
    if (methodsHideIt[method]) {
      return methodsHideIt[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof (method) === 'object' || !method) {
      return methodsHideIt.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.HideIt');
    }
  };
})(jQuery);
