# jQuery.showit

A plugin for jQuery to show any element centered.

The most basic use of the plugin is: $(object).showit(); which will take the object and show it centered on the viewscreen based on its size.

There are 4 settings you can add to extend showit(), which are:

* fadeSpeed, how quickly it should fade in. 0 makes it instant. 400 is default.
* zIndex, where in the z-index range it should be displayed, 999 is default.
* css, in here you can put any css you wish to forward to the element.
* maxWidthPercent, how many percent of the window-width will be the maximum allowed for the element to use. 80% is default.

This plugin is also coded to work in tandem with jQuery.overlay, a plugin to darken the surrounding area while viewing the element. The jQuery.overlay plugin can be found here: https://github.com/egilkh/jquery.overlay

If the jQuery.overlay plugin is loaded, you can provide 3 aditional settings to showit, telling it how to work with jQuery.overlay.

* overlayUseIfLoaded, a boolean value indicating to use jQuery.overlay or not. Default is false.
* overlayObject, which object should jQuery.overlay darken while we show out element. Default is document.
* overlayOptions, provides a json array where you can specify any options that will be passed along to jQuery.overlay.

If you wish to programatically hide the shown showit-object, just call: $(object).hideit();
