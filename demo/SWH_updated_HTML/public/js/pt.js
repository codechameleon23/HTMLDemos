(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('jquery-bridget/jquery-bridget', ['jquery'], function (jQuery) {
         return factory(window, jQuery)
      })
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(window, require('jquery'))
   } else {
      window.jQueryBridget = factory(window, window.jQuery)
   }
}(window, function factory(window, jQuery) {
   'use strict';
   var arraySlice = Array.prototype.slice;
   var console = window.console;
   var logError = typeof console == 'undefined' ? function () {} : function (message) {
      console.error(message)
   };

   function jQueryBridget(namespace, PluginClass, $) {
      $ = $ || jQuery || window.jQuery;
      if (!$) {
         return
      }
      if (!PluginClass.prototype.option) {
         PluginClass.prototype.option = function (opts) {
            if (!$.isPlainObject(opts)) {
               return
            }
            this.options = $.extend(!0, this.options, opts)
         }
      }
      $.fn[namespace] = function (arg0) {
         if (typeof arg0 == 'string') {
            var args = arraySlice.call(arguments, 1);
            return methodCall(this, arg0, args)
         }
         plainCall(this, arg0);
         return this
      };

      function methodCall($elems, methodName, args) {
         var returnValue;
         var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';
         $elems.each(function (i, elem) {
            var instance = $.data(elem, namespace);
            if (!instance) {
               logError(namespace + ' not initialized. Cannot call methods, i.e. ' + pluginMethodStr);
               return
            }
            var method = instance[methodName];
            if (!method || methodName.charAt(0) == '_') {
               logError(pluginMethodStr + ' is not a valid method');
               return
            }
            var value = method.apply(instance, args);
            returnValue = returnValue === undefined ? value : returnValue
         });
         return returnValue !== undefined ? returnValue : $elems
      }

      function plainCall($elems, options) {
         $elems.each(function (i, elem) {
            var instance = $.data(elem, namespace);
            if (instance) {
               instance.option(options);
               instance._init()
            } else {
               instance = new PluginClass(elem, options);
               $.data(elem, namespace, instance)
            }
         })
      }
      updateJQuery($)
   }

   function updateJQuery($) {
      if (!$ || ($ && $.bridget)) {
         return
      }
      $.bridget = jQueryBridget
   }
   updateJQuery(jQuery || window.jQuery);
   return jQueryBridget
}));
(function (global, factory) {
   if (typeof define == 'function' && define.amd) {
      define('ev-emitter/ev-emitter', factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory()
   } else {
      global.EvEmitter = factory()
   }
}(typeof window != 'undefined' ? window : this, function () {
   function EvEmitter() {}
   var proto = EvEmitter.prototype;
   proto.on = function (eventName, listener) {
      if (!eventName || !listener) {
         return
      }
      var events = this._events = this._events || {};
      var listeners = events[eventName] = events[eventName] || [];
      if (listeners.indexOf(listener) == -1) {
         listeners.push(listener)
      }
      return this
   };
   proto.once = function (eventName, listener) {
      if (!eventName || !listener) {
         return
      }
      this.on(eventName, listener);
      var onceEvents = this._onceEvents = this._onceEvents || {};
      var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
      onceListeners[listener] = !0;
      return this
   };
   proto.off = function (eventName, listener) {
      var listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length) {
         return
      }
      var index = listeners.indexOf(listener);
      if (index != -1) {
         listeners.splice(index, 1)
      }
      return this
   };
   proto.emitEvent = function (eventName, args) {
      var listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length) {
         return
      }
      var i = 0;
      var listener = listeners[i];
      args = args || [];
      var onceListeners = this._onceEvents && this._onceEvents[eventName];
      while (listener) {
         var isOnce = onceListeners && onceListeners[listener];
         if (isOnce) {
            this.off(eventName, listener);
            delete onceListeners[listener]
         }
         listener.apply(this, args);
         i += isOnce ? 0 : 1;
         listener = listeners[i]
      }
      return this
   };
   return EvEmitter
}));
(function (window, factory) {
   'use strict';
   if (typeof define == 'function' && define.amd) {
      define('get-size/get-size', [], function () {
         return factory()
      })
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory()
   } else {
      window.getSize = factory()
   }
})(window, function factory() {
   'use strict';

   function getStyleSize(value) {
      var num = parseFloat(value);
      var isValid = value.indexOf('%') == -1 && !isNaN(num);
      return isValid && num
   }

   function noop() {}
   var logError = typeof console == 'undefined' ? noop : function (message) {
      console.error(message)
   };
   var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
   var measurementsLength = measurements.length;

   function getZeroSize() {
      var size = {
         width: 0,
         height: 0,
         innerWidth: 0,
         innerHeight: 0,
         outerWidth: 0,
         outerHeight: 0
      };
      for (var i = 0; i < measurementsLength; i++) {
         var measurement = measurements[i];
         size[measurement] = 0
      }
      return size
   }

   function getStyle(elem) {
      var style = getComputedStyle(elem);
      if (!style) {
         logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See //bit.ly/getsizebug1')
      }
      return style
   }
   var isSetup = !1;
   var isBoxSizeOuter;

   function setup() {
      if (isSetup) {
         return
      }
      isSetup = !0;
      var div = document.createElement('div');
      div.style.width = '200px';
      div.style.padding = '1px 2px 3px 4px';
      div.style.borderStyle = 'solid';
      div.style.borderWidth = '1px 2px 3px 4px';
      div.style.boxSizing = 'border-box';
      var body = document.body || document.documentElement;
      body.appendChild(div);
      var style = getStyle(div);
      getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
      body.removeChild(div)
   }

   function getSize(elem) {
      setup();
      if (typeof elem == 'string') {
         elem = document.querySelector(elem)
      }
      if (!elem || typeof elem != 'object' || !elem.nodeType) {
         return
      }
      var style = getStyle(elem);
      if (style.display == 'none') {
         return getZeroSize()
      }
      var size = {};
      size.width = elem.offsetWidth;
      size.height = elem.offsetHeight;
      var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';
      for (var i = 0; i < measurementsLength; i++) {
         var measurement = measurements[i];
         var value = style[measurement];
         var num = parseFloat(value);
         size[measurement] = !isNaN(num) ? num : 0
      }
      var paddingWidth = size.paddingLeft + size.paddingRight;
      var paddingHeight = size.paddingTop + size.paddingBottom;
      var marginWidth = size.marginLeft + size.marginRight;
      var marginHeight = size.marginTop + size.marginBottom;
      var borderWidth = size.borderLeftWidth + size.borderRightWidth;
      var borderHeight = size.borderTopWidth + size.borderBottomWidth;
      var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
      var styleWidth = getStyleSize(style.width);
      if (styleWidth !== !1) {
         size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth)
      }
      var styleHeight = getStyleSize(style.height);
      if (styleHeight !== !1) {
         size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight)
      }
      size.innerWidth = size.width - (paddingWidth + borderWidth);
      size.innerHeight = size.height - (paddingHeight + borderHeight);
      size.outerWidth = size.width + marginWidth;
      size.outerHeight = size.height + marginHeight;
      return size
   }
   return getSize
});
(function (window, factory) {
   'use strict';
   if (typeof define == 'function' && define.amd) {
      define('desandro-matches-selector/matches-selector', factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory()
   } else {
      window.matchesSelector = factory()
   }
}(window, function factory() {
   'use strict';
   var matchesMethod = (function () {
      var ElemProto = window.Element.prototype;
      if (ElemProto.matches) {
         return 'matches'
      }
      if (ElemProto.matchesSelector) {
         return 'matchesSelector'
      }
      var prefixes = ['webkit', 'moz', 'ms', 'o'];
      for (var i = 0; i < prefixes.length; i++) {
         var prefix = prefixes[i];
         var method = prefix + 'MatchesSelector';
         if (ElemProto[method]) {
            return method
         }
      }
   })();
   return function matchesSelector(elem, selector) {
      return elem[matchesMethod](selector)
   }
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('fizzy-ui-utils/utils', ['desandro-matches-selector/matches-selector'], function (matchesSelector) {
         return factory(window, matchesSelector)
      })
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(window, require('desandro-matches-selector'))
   } else {
      window.fizzyUIUtils = factory(window, window.matchesSelector)
   }
}(window, function factory(window, matchesSelector) {
   var utils = {};
   utils.extend = function (a, b) {
      for (var prop in b) {
         a[prop] = b[prop]
      }
      return a
   };
   utils.modulo = function (num, div) {
      return ((num % div) + div) % div
   };
   utils.makeArray = function (obj) {
      var ary = [];
      if (Array.isArray(obj)) {
         ary = obj
      } else if (obj && typeof obj == 'object' && typeof obj.length == 'number') {
         for (var i = 0; i < obj.length; i++) {
            ary.push(obj[i])
         }
      } else {
         ary.push(obj)
      }
      return ary
   };
   utils.removeFrom = function (ary, obj) {
      var index = ary.indexOf(obj);
      if (index != -1) {
         ary.splice(index, 1)
      }
   };
   utils.getParent = function (elem, selector) {
      while (elem.parentNode && elem != document.body) {
         elem = elem.parentNode;
         if (matchesSelector(elem, selector)) {
            return elem
         }
      }
   };
   utils.getQueryElement = function (elem) {
      if (typeof elem == 'string') {
         return document.querySelector(elem)
      }
      return elem
   };
   utils.handleEvent = function (event) {
      var method = 'on' + event.type;
      if (this[method]) {
         this[method](event)
      }
   };
   utils.filterFindElements = function (elems, selector) {
      elems = utils.makeArray(elems);
      var ffElems = [];
      elems.forEach(function (elem) {
         if (!(elem instanceof HTMLElement)) {
            return
         }
         if (!selector) {
            ffElems.push(elem);
            return
         }
         if (matchesSelector(elem, selector)) {
            ffElems.push(elem)
         }
         var childElems = elem.querySelectorAll(selector);
         for (var i = 0; i < childElems.length; i++) {
            ffElems.push(childElems[i])
         }
      });
      return ffElems
   };
   utils.debounceMethod = function (_class, methodName, threshold) {
      var method = _class.prototype[methodName];
      var timeoutName = methodName + 'Timeout';
      _class.prototype[methodName] = function () {
         var timeout = this[timeoutName];
         if (timeout) {
            clearTimeout(timeout)
         }
         var args = arguments;
         var _this = this;
         this[timeoutName] = setTimeout(function () {
            method.apply(_this, args);
            delete _this[timeoutName]
         }, threshold || 100)
      }
   };
   utils.docReady = function (callback) {
      var readyState = document.readyState;
      if (readyState == 'complete' || readyState == 'interactive') {
         setTimeout(callback)
      } else {
         document.addEventListener('DOMContentLoaded', callback)
      }
   };
   utils.toDashed = function (str) {
      return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
         return $1 + '-' + $2
      }).toLowerCase()
   };
   var console = window.console;
   utils.htmlInit = function (WidgetClass, namespace) {
      utils.docReady(function () {
         var dashedNamespace = utils.toDashed(namespace);
         var dataAttr = 'data-' + dashedNamespace;
         var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
         var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
         var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
         var dataOptionsAttr = dataAttr + '-options';
         var jQuery = window.jQuery;
         elems.forEach(function (elem) {
            var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
            var options;
            try {
               options = attr && JSON.parse(attr)
            } catch (error) {
               if (console) {
                  console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error)
               }
               return
            }
            var instance = new WidgetClass(elem, options);
            if (jQuery) {
               jQuery.data(elem, namespace, instance)
            }
         })
      })
   };
   return utils
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('outlayer/item', ['ev-emitter/ev-emitter', 'get-size/get-size'], factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(require('ev-emitter'), require('get-size'))
   } else {
      window.Outlayer = {};
      window.Outlayer.Item = factory(window.EvEmitter, window.getSize)
   }
}(window, function factory(EvEmitter, getSize) {
   'use strict';

   function isEmptyObj(obj) {
      for (var prop in obj) {
         return !1
      }
      prop = null;
      return !0
   }
   var docElemStyle = document.documentElement.style;
   var transitionProperty = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
   var transformProperty = typeof docElemStyle.transform == 'string' ? 'transform' : 'WebkitTransform';
   var transitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      transition: 'transitionend'
   } [transitionProperty];
   var vendorProperties = {
      transform: transformProperty,
      transition: transitionProperty,
      transitionDuration: transitionProperty + 'Duration',
      transitionProperty: transitionProperty + 'Property',
      transitionDelay: transitionProperty + 'Delay'
   };

   function Item(element, layout) {
      if (!element) {
         return
      }
      this.element = element;
      this.layout = layout;
      this.position = {
         x: 0,
         y: 0
      };
      this._create()
   }
   var proto = Item.prototype = Object.create(EvEmitter.prototype);
   proto.constructor = Item;
   proto._create = function () {
      this._transn = {
         ingProperties: {},
         clean: {},
         onEnd: {}
      };
      this.css({
         position: 'absolute'
      })
   };
   proto.handleEvent = function (event) {
      var method = 'on' + event.type;
      if (this[method]) {
         this[method](event)
      }
   };
   proto.getSize = function () {
      this.size = getSize(this.element)
   };
   proto.css = function (style) {
      var elemStyle = this.element.style;
      for (var prop in style) {
         var supportedProp = vendorProperties[prop] || prop;
         elemStyle[supportedProp] = style[prop]
      }
   };
   proto.getPosition = function () {
      var style = getComputedStyle(this.element);
      var isOriginLeft = this.layout._getOption('originLeft');
      var isOriginTop = this.layout._getOption('originTop');
      var xValue = style[isOriginLeft ? 'left' : 'right'];
      var yValue = style[isOriginTop ? 'top' : 'bottom'];
      var layoutSize = this.layout.size;
      var x = xValue.indexOf('%') != -1 ? (parseFloat(xValue) / 100) * layoutSize.width : parseInt(xValue, 10);
      var y = yValue.indexOf('%') != -1 ? (parseFloat(yValue) / 100) * layoutSize.height : parseInt(yValue, 10);
      x = isNaN(x) ? 0 : x;
      y = isNaN(y) ? 0 : y;
      x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
      y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
      this.position.x = x;
      this.position.y = y
   };
   proto.layoutPosition = function () {
      var layoutSize = this.layout.size;
      var style = {};
      var isOriginLeft = this.layout._getOption('originLeft');
      var isOriginTop = this.layout._getOption('originTop');
      var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
      var xProperty = isOriginLeft ? 'left' : 'right';
      var xResetProperty = isOriginLeft ? 'right' : 'left';
      var x = this.position.x + layoutSize[xPadding];
      style[xProperty] = this.getXValue(x);
      style[xResetProperty] = '';
      var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
      var yProperty = isOriginTop ? 'top' : 'bottom';
      var yResetProperty = isOriginTop ? 'bottom' : 'top';
      var y = this.position.y + layoutSize[yPadding];
      style[yProperty] = this.getYValue(y);
      style[yResetProperty] = '';
      this.css(style);
      this.emitEvent('layout', [this])
   };
   proto.getXValue = function (x) {
      var isHorizontal = this.layout._getOption('horizontal');
      return this.layout.options.percentPosition && !isHorizontal ? ((x / this.layout.size.width) * 100) + '%' : x + 'px'
   };
   proto.getYValue = function (y) {
      var isHorizontal = this.layout._getOption('horizontal');
      return this.layout.options.percentPosition && isHorizontal ? ((y / this.layout.size.height) * 100) + '%' : y + 'px'
   };
   proto._transitionTo = function (x, y) {
      this.getPosition();
      var curX = this.position.x;
      var curY = this.position.y;
      var compareX = parseInt(x, 10);
      var compareY = parseInt(y, 10);
      var didNotMove = compareX === this.position.x && compareY === this.position.y;
      this.setPosition(x, y);
      if (didNotMove && !this.isTransitioning) {
         this.layoutPosition();
         return
      }
      var transX = x - curX;
      var transY = y - curY;
      var transitionStyle = {};
      transitionStyle.transform = this.getTranslate(transX, transY);
      this.transition({
         to: transitionStyle,
         onTransitionEnd: {
            transform: this.layoutPosition
         },
         isCleaning: !0
      })
   };
   proto.getTranslate = function (x, y) {
      var isOriginLeft = this.layout._getOption('originLeft');
      var isOriginTop = this.layout._getOption('originTop');
      x = isOriginLeft ? x : -x;
      y = isOriginTop ? y : -y;
      return 'translate3d(' + x + 'px, ' + y + 'px, 0)'
   };
   proto.goTo = function (x, y) {
      this.setPosition(x, y);
      this.layoutPosition()
   };
   proto.moveTo = proto._transitionTo;
   proto.setPosition = function (x, y) {
      this.position.x = parseInt(x, 10);
      this.position.y = parseInt(y, 10)
   };
   proto._nonTransition = function (args) {
      this.css(args.to);
      if (args.isCleaning) {
         this._removeStyles(args.to)
      }
      for (var prop in args.onTransitionEnd) {
         args.onTransitionEnd[prop].call(this)
      }
   };
   proto.transition = function (args) {
      if (!parseFloat(this.layout.options.transitionDuration)) {
         this._nonTransition(args);
         return
      }
      var _transition = this._transn;
      for (var prop in args.onTransitionEnd) {
         _transition.onEnd[prop] = args.onTransitionEnd[prop]
      }
      for (prop in args.to) {
         _transition.ingProperties[prop] = !0;
         if (args.isCleaning) {
            _transition.clean[prop] = !0
         }
      }
      if (args.from) {
         this.css(args.from);
         var h = this.element.offsetHeight;
         h = null
      }
      this.enableTransition(args.to);
      this.css(args.to);
      this.isTransitioning = !0
   };

   function toDashedAll(str) {
      return str.replace(/([A-Z])/g, function ($1) {
         return '-' + $1.toLowerCase()
      })
   }
   var transitionProps = 'opacity,' + toDashedAll(transformProperty);
   proto.enableTransition = function () {
      if (this.isTransitioning) {
         return
      }
      var duration = this.layout.options.transitionDuration;
      duration = typeof duration == 'number' ? duration + 'ms' : duration;
      this.css({
         transitionProperty: transitionProps,
         transitionDuration: duration,
         transitionDelay: this.staggerDelay || 0
      });
      this.element.addEventListener(transitionEndEvent, this, !1)
   };
   proto.onwebkitTransitionEnd = function (event) {
      this.ontransitionend(event)
   };
   proto.onotransitionend = function (event) {
      this.ontransitionend(event)
   };
   var dashedVendorProperties = {
      '-webkit-transform': 'transform'
   };
   proto.ontransitionend = function (event) {
      if (event.target !== this.element) {
         return
      }
      var _transition = this._transn;
      var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
      delete _transition.ingProperties[propertyName];
      if (isEmptyObj(_transition.ingProperties)) {
         this.disableTransition()
      }
      if (propertyName in _transition.clean) {
         this.element.style[event.propertyName] = '';
         delete _transition.clean[propertyName]
      }
      if (propertyName in _transition.onEnd) {
         var onTransitionEnd = _transition.onEnd[propertyName];
         onTransitionEnd.call(this);
         delete _transition.onEnd[propertyName]
      }
      this.emitEvent('transitionEnd', [this])
   };
   proto.disableTransition = function () {
      this.removeTransitionStyles();
      this.element.removeEventListener(transitionEndEvent, this, !1);
      this.isTransitioning = !1
   };
   proto._removeStyles = function (style) {
      var cleanStyle = {};
      for (var prop in style) {
         cleanStyle[prop] = ''
      }
      this.css(cleanStyle)
   };
   var cleanTransitionStyle = {
      transitionProperty: '',
      transitionDuration: '',
      transitionDelay: ''
   };
   proto.removeTransitionStyles = function () {
      this.css(cleanTransitionStyle)
   };
   proto.stagger = function (delay) {
      delay = isNaN(delay) ? 0 : delay;
      this.staggerDelay = delay + 'ms'
   };
   proto.removeElem = function () {
      this.element.parentNode.removeChild(this.element);
      this.css({
         display: ''
      });
      this.emitEvent('remove', [this])
   };
   proto.remove = function () {
      if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
         this.removeElem();
         return
      }
      this.once('transitionEnd', function () {
         this.removeElem()
      });
      this.hide()
   };
   proto.reveal = function () {
      delete this.isHidden;
      this.css({
         display: ''
      });
      var options = this.layout.options;
      var onTransitionEnd = {};
      var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
      onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
      this.transition({
         from: options.hiddenStyle,
         to: options.visibleStyle,
         isCleaning: !0,
         onTransitionEnd: onTransitionEnd
      })
   };
   proto.onRevealTransitionEnd = function () {
      if (!this.isHidden) {
         this.emitEvent('reveal')
      }
   };
   proto.getHideRevealTransitionEndProperty = function (styleProperty) {
      var optionStyle = this.layout.options[styleProperty];
      if (optionStyle.opacity) {
         return 'opacity'
      }
      for (var prop in optionStyle) {
         return prop
      }
   };
   proto.hide = function () {
      this.isHidden = !0;
      this.css({
         display: ''
      });
      var options = this.layout.options;
      var onTransitionEnd = {};
      var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
      onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
      this.transition({
         from: options.visibleStyle,
         to: options.hiddenStyle,
         isCleaning: !0,
         onTransitionEnd: onTransitionEnd
      })
   };
   proto.onHideTransitionEnd = function () {
      if (this.isHidden) {
         this.css({
            display: 'none'
         });
         this.emitEvent('hide')
      }
   };
   proto.destroy = function () {
      this.css({
         position: '',
         left: '',
         right: '',
         top: '',
         bottom: '',
         transition: '',
         transform: ''
      })
   };
   return Item
}));
(function (window, factory) {
   'use strict';
   if (typeof define == 'function' && define.amd) {
      define('outlayer/outlayer', ['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'], function (EvEmitter, getSize, utils, Item) {
         return factory(window, EvEmitter, getSize, utils, Item)
      })
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(window, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item'))
   } else {
      window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item)
   }
}(window, function factory(window, EvEmitter, getSize, utils, Item) {
   'use strict';
   var console = window.console;
   var jQuery = window.jQuery;
   var noop = function () {};
   var GUID = 0;
   var instances = {};

   function Outlayer(element, options) {
      var queryElement = utils.getQueryElement(element);
      if (!queryElement) {
         if (console) {
            console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element))
         }
         return
      }
      this.element = queryElement;
      if (jQuery) {
         this.$element = jQuery(this.element)
      }
      this.options = utils.extend({}, this.constructor.defaults);
      this.option(options);
      var id = ++GUID;
      this.element.outlayerGUID = id;
      instances[id] = this;
      this._create();
      var isInitLayout = this._getOption('initLayout');
      if (isInitLayout) {
         this.layout()
      }
   }
   Outlayer.namespace = 'outlayer';
   Outlayer.Item = Item;
   Outlayer.defaults = {
      containerStyle: {
         position: 'relative'
      },
      initLayout: !0,
      originLeft: !0,
      originTop: !0,
      resize: !0,
      resizeContainer: !0,
      transitionDuration: '0.4s',
      hiddenStyle: {
         opacity: 0,
         transform: 'scale(0.001)'
      },
      visibleStyle: {
         opacity: 1,
         transform: 'scale(1)'
      }
   };
   var proto = Outlayer.prototype;
   utils.extend(proto, EvEmitter.prototype);
   proto.option = function (opts) {
      utils.extend(this.options, opts)
   };
   proto._getOption = function (option) {
      var oldOption = this.constructor.compatOptions[option];
      return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option]
   };
   Outlayer.compatOptions = {
      initLayout: 'isInitLayout',
      horizontal: 'isHorizontal',
      layoutInstant: 'isLayoutInstant',
      originLeft: 'isOriginLeft',
      originTop: 'isOriginTop',
      resize: 'isResizeBound',
      resizeContainer: 'isResizingContainer'
   };
   proto._create = function () {
      this.reloadItems();
      this.stamps = [];
      this.stamp(this.options.stamp);
      utils.extend(this.element.style, this.options.containerStyle);
      var canBindResize = this._getOption('resize');
      if (canBindResize) {
         this.bindResize()
      }
   };
   proto.reloadItems = function () {
      this.items = this._itemize(this.element.children)
   };
   proto._itemize = function (elems) {
      var itemElems = this._filterFindItemElements(elems);
      var Item = this.constructor.Item;
      var items = [];
      for (var i = 0; i < itemElems.length; i++) {
         var elem = itemElems[i];
         var item = new Item(elem, this);
         items.push(item)
      }
      return items
   };
   proto._filterFindItemElements = function (elems) {
      return utils.filterFindElements(elems, this.options.itemSelector)
   };
   proto.getItemElements = function () {
      return this.items.map(function (item) {
         return item.element
      })
   };
   proto.layout = function () {
      this._resetLayout();
      this._manageStamps();
      var layoutInstant = this._getOption('layoutInstant');
      var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
      this.layoutItems(this.items, isInstant);
      this._isLayoutInited = !0
   };
   proto._init = proto.layout;
   proto._resetLayout = function () {
      this.getSize()
   };
   proto.getSize = function () {
      this.size = getSize(this.element)
   };
   proto._getMeasurement = function (measurement, size) {
      var option = this.options[measurement];
      var elem;
      if (!option) {
         this[measurement] = 0
      } else {
         if (typeof option == 'string') {
            elem = this.element.querySelector(option)
         } else if (option instanceof HTMLElement) {
            elem = option
         }
         this[measurement] = elem ? getSize(elem)[size] : option
      }
   };
   proto.layoutItems = function (items, isInstant) {
      items = this._getItemsForLayout(items);
      this._layoutItems(items, isInstant);
      this._postLayout()
   };
   proto._getItemsForLayout = function (items) {
      return items.filter(function (item) {
         return !item.isIgnored
      })
   };
   proto._layoutItems = function (items, isInstant) {
      this._emitCompleteOnItems('layout', items);
      if (!items || !items.length) {
         return
      }
      var queue = [];
      items.forEach(function (item) {
         var position = this._getItemLayoutPosition(item);
         position.item = item;
         position.isInstant = isInstant || item.isLayoutInstant;
         queue.push(position)
      }, this);
      this._processLayoutQueue(queue)
   };
   proto._getItemLayoutPosition = function () {
      return {
         x: 0,
         y: 0
      }
   };
   proto._processLayoutQueue = function (queue) {
      this.updateStagger();
      queue.forEach(function (obj, i) {
         this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i)
      }, this)
   };
   proto.updateStagger = function () {
      var stagger = this.options.stagger;
      if (stagger === null || stagger === undefined) {
         this.stagger = 0;
         return
      }
      this.stagger = getMilliseconds(stagger);
      return this.stagger
   };
   proto._positionItem = function (item, x, y, isInstant, i) {
      if (isInstant) {
         item.goTo(x, y)
      } else {
         item.stagger(i * this.stagger);
         item.moveTo(x, y)
      }
   };
   proto._postLayout = function () {
      this.resizeContainer()
   };
   proto.resizeContainer = function () {
      var isResizingContainer = this._getOption('resizeContainer');
      if (!isResizingContainer) {
         return
      }
      var size = this._getContainerSize();
      if (size) {
         this._setContainerMeasure(size.width, !0);
         this._setContainerMeasure(size.height, !1)
      }
   };
   proto._getContainerSize = noop;
   proto._setContainerMeasure = function (measure, isWidth) {
      if (measure === undefined) {
         return
      }
      var elemSize = this.size;
      if (elemSize.isBorderBox) {
         measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth
      }
      measure = Math.max(measure, 0);
      this.element.style[isWidth ? 'width' : 'height'] = measure + 'px'
   };
   proto._emitCompleteOnItems = function (eventName, items) {
      var _this = this;

      function onComplete() {
         _this.dispatchEvent(eventName + 'Complete', null, [items])
      }
      var count = items.length;
      if (!items || !count) {
         onComplete();
         return
      }
      var doneCount = 0;

      function tick() {
         doneCount++;
         if (doneCount == count) {
            onComplete()
         }
      }
      items.forEach(function (item) {
         item.once(eventName, tick)
      })
   };
   proto.dispatchEvent = function (type, event, args) {
      var emitArgs = event ? [event].concat(args) : args;
      this.emitEvent(type, emitArgs);
      if (jQuery) {
         this.$element = this.$element || jQuery(this.element);
         if (event) {
            var $event = jQuery.Event(event);
            $event.type = type;
            this.$element.trigger($event, args)
         } else {
            this.$element.trigger(type, args)
         }
      }
   };
   proto.ignore = function (elem) {
      var item = this.getItem(elem);
      if (item) {
         item.isIgnored = !0
      }
   };
   proto.unignore = function (elem) {
      var item = this.getItem(elem);
      if (item) {
         delete item.isIgnored
      }
   };
   proto.stamp = function (elems) {
      elems = this._find(elems);
      if (!elems) {
         return
      }
      this.stamps = this.stamps.concat(elems);
      elems.forEach(this.ignore, this)
   };
   proto.unstamp = function (elems) {
      elems = this._find(elems);
      if (!elems) {
         return
      }
      elems.forEach(function (elem) {
         utils.removeFrom(this.stamps, elem);
         this.unignore(elem)
      }, this)
   };
   proto._find = function (elems) {
      if (!elems) {
         return
      }
      if (typeof elems == 'string') {
         elems = this.element.querySelectorAll(elems)
      }
      elems = utils.makeArray(elems);
      return elems
   };
   proto._manageStamps = function () {
      if (!this.stamps || !this.stamps.length) {
         return
      }
      this._getBoundingRect();
      this.stamps.forEach(this._manageStamp, this)
   };
   proto._getBoundingRect = function () {
      var boundingRect = this.element.getBoundingClientRect();
      var size = this.size;
      this._boundingRect = {
         left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
         top: boundingRect.top + size.paddingTop + size.borderTopWidth,
         right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
         bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
      }
   };
   proto._manageStamp = noop;
   proto._getElementOffset = function (elem) {
      var boundingRect = elem.getBoundingClientRect();
      var thisRect = this._boundingRect;
      var size = getSize(elem);
      var offset = {
         left: boundingRect.left - thisRect.left - size.marginLeft,
         top: boundingRect.top - thisRect.top - size.marginTop,
         right: thisRect.right - boundingRect.right - size.marginRight,
         bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
      };
      return offset
   };
   proto.handleEvent = utils.handleEvent;
   proto.bindResize = function () {
      window.addEventListener('resize', this);
      this.isResizeBound = !0
   };
   proto.unbindResize = function () {
      window.removeEventListener('resize', this);
      this.isResizeBound = !1
   };
   proto.onresize = function () {
      this.resize()
   };
   utils.debounceMethod(Outlayer, 'onresize', 100);
   proto.resize = function () {
      if (!this.isResizeBound || !this.needsResizeLayout()) {
         return
      }
      this.layout()
   };
   proto.needsResizeLayout = function () {
      var size = getSize(this.element);
      var hasSizes = this.size && size;
      return hasSizes && size.innerWidth !== this.size.innerWidth
   };
   proto.addItems = function (elems) {
      var items = this._itemize(elems);
      if (items.length) {
         this.items = this.items.concat(items)
      }
      return items
   };
   proto.appended = function (elems) {
      var items = this.addItems(elems);
      if (!items.length) {
         return
      }
      this.layoutItems(items, !0);
      this.reveal(items)
   };
   proto.prepended = function (elems) {
      var items = this._itemize(elems);
      if (!items.length) {
         return
      }
      var previousItems = this.items.slice(0);
      this.items = items.concat(previousItems);
      this._resetLayout();
      this._manageStamps();
      this.layoutItems(items, !0);
      this.reveal(items);
      this.layoutItems(previousItems)
   };
   proto.reveal = function (items) {
      this._emitCompleteOnItems('reveal', items);
      if (!items || !items.length) {
         return
      }
      var stagger = this.updateStagger();
      items.forEach(function (item, i) {
         item.stagger(i * stagger);
         item.reveal()
      })
   };
   proto.hide = function (items) {
      this._emitCompleteOnItems('hide', items);
      if (!items || !items.length) {
         return
      }
      var stagger = this.updateStagger();
      items.forEach(function (item, i) {
         item.stagger(i * stagger);
         item.hide()
      })
   };
   proto.revealItemElements = function (elems) {
      var items = this.getItems(elems);
      this.reveal(items)
   };
   proto.hideItemElements = function (elems) {
      var items = this.getItems(elems);
      this.hide(items)
   };
   proto.getItem = function (elem) {
      for (var i = 0; i < this.items.length; i++) {
         var item = this.items[i];
         if (item.element == elem) {
            return item
         }
      }
   };
   proto.getItems = function (elems) {
      elems = utils.makeArray(elems);
      var items = [];
      elems.forEach(function (elem) {
         var item = this.getItem(elem);
         if (item) {
            items.push(item)
         }
      }, this);
      return items
   };
   proto.remove = function (elems) {
      var removeItems = this.getItems(elems);
      this._emitCompleteOnItems('remove', removeItems);
      if (!removeItems || !removeItems.length) {
         return
      }
      removeItems.forEach(function (item) {
         item.remove();
         utils.removeFrom(this.items, item)
      }, this)
   };
   proto.destroy = function () {
      var style = this.element.style;
      style.height = '';
      style.position = '';
      style.width = '';
      this.items.forEach(function (item) {
         item.destroy()
      });
      this.unbindResize();
      var id = this.element.outlayerGUID;
      delete instances[id];
      delete this.element.outlayerGUID;
      if (jQuery) {
         jQuery.removeData(this.element, this.constructor.namespace)
      }
   };
   Outlayer.data = function (elem) {
      elem = utils.getQueryElement(elem);
      var id = elem && elem.outlayerGUID;
      return id && instances[id]
   };
   Outlayer.create = function (namespace, options) {
      var Layout = subclass(Outlayer);
      Layout.defaults = utils.extend({}, Outlayer.defaults);
      utils.extend(Layout.defaults, options);
      Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
      Layout.namespace = namespace;
      Layout.data = Outlayer.data;
      Layout.Item = subclass(Item);
      utils.htmlInit(Layout, namespace);
      if (jQuery && jQuery.bridget) {
         jQuery.bridget(namespace, Layout)
      }
      return Layout
   };

   function subclass(Parent) {
      function SubClass() {
         Parent.apply(this, arguments)
      }
      SubClass.prototype = Object.create(Parent.prototype);
      SubClass.prototype.constructor = SubClass;
      return SubClass
   }
   var msUnits = {
      ms: 1,
      s: 1000
   };

   function getMilliseconds(time) {
      if (typeof time == 'number') {
         return time
      }
      var matches = time.match(/(^\d*\.?\d*)(\w*)/);
      var num = matches && matches[1];
      var unit = matches && matches[2];
      if (!num.length) {
         return 0
      }
      num = parseFloat(num);
      var mult = msUnits[unit] || 1;
      return num * mult
   }
   Outlayer.Item = Item;
   return Outlayer
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('isotope/js/item', ['outlayer/outlayer'], factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(require('outlayer'))
   } else {
      window.Isotope = window.Isotope || {};
      window.Isotope.Item = factory(window.Outlayer)
   }
}(window, function factory(Outlayer) {
   'use strict';

   function Item() {
      Outlayer.Item.apply(this, arguments)
   }
   var proto = Item.prototype = Object.create(Outlayer.Item.prototype);
   var _create = proto._create;
   proto._create = function () {
      this.id = this.layout.itemGUID++;
      _create.call(this);
      this.sortData = {}
   };
   proto.updateSortData = function () {
      if (this.isIgnored) {
         return
      }
      this.sortData.id = this.id;
      this.sortData['original-order'] = this.id;
      this.sortData.random = Math.random();
      var getSortData = this.layout.options.getSortData;
      var sorters = this.layout._sorters;
      for (var key in getSortData) {
         var sorter = sorters[key];
         this.sortData[key] = sorter(this.element, this)
      }
   };
   var _destroy = proto.destroy;
   proto.destroy = function () {
      _destroy.apply(this, arguments);
      this.css({
         display: ''
      })
   };
   return Item
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('isotope/js/layout-mode', ['get-size/get-size', 'outlayer/outlayer'], factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(require('get-size'), require('outlayer'))
   } else {
      window.Isotope = window.Isotope || {};
      window.Isotope.LayoutMode = factory(window.getSize, window.Outlayer)
   }
}(window, function factory(getSize, Outlayer) {
   'use strict';

   function LayoutMode(isotope) {
      this.isotope = isotope;
      if (isotope) {
         this.options = isotope.options[this.namespace];
         this.element = isotope.element;
         this.items = isotope.filteredItems;
         this.size = isotope.size
      }
   }
   var proto = LayoutMode.prototype;
   var facadeMethods = ['_resetLayout', '_getItemLayoutPosition', '_manageStamp', '_getContainerSize', '_getElementOffset', 'needsResizeLayout', '_getOption'];
   facadeMethods.forEach(function (methodName) {
      proto[methodName] = function () {
         return Outlayer.prototype[methodName].apply(this.isotope, arguments)
      }
   });
   proto.needsVerticalResizeLayout = function () {
      var size = getSize(this.isotope.element);
      var hasSizes = this.isotope.size && size;
      return hasSizes && size.innerHeight != this.isotope.size.innerHeight
   };
   proto._getMeasurement = function () {
      this.isotope._getMeasurement.apply(this, arguments)
   };
   proto.getColumnWidth = function () {
      this.getSegmentSize('column', 'Width')
   };
   proto.getRowHeight = function () {
      this.getSegmentSize('row', 'Height')
   };
   proto.getSegmentSize = function (segment, size) {
      var segmentName = segment + size;
      var outerSize = 'outer' + size;
      this._getMeasurement(segmentName, outerSize);
      if (this[segmentName]) {
         return
      }
      var firstItemSize = this.getFirstItemSize();
      this[segmentName] = firstItemSize && firstItemSize[outerSize] || this.isotope.size['inner' + size]
   };
   proto.getFirstItemSize = function () {
      var firstItem = this.isotope.filteredItems[0];
      return firstItem && firstItem.element && getSize(firstItem.element)
   };
   proto.layout = function () {
      this.isotope.layout.apply(this.isotope, arguments)
   };
   proto.getSize = function () {
      this.isotope.getSize();
      this.size = this.isotope.size
   };
   LayoutMode.modes = {};
   LayoutMode.create = function (namespace, options) {
      function Mode() {
         LayoutMode.apply(this, arguments)
      }
      Mode.prototype = Object.create(proto);
      Mode.prototype.constructor = Mode;
      if (options) {
         Mode.options = options
      }
      Mode.prototype.namespace = namespace;
      LayoutMode.modes[namespace] = Mode;
      return Mode
   };
   return LayoutMode
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('masonry/masonry', ['outlayer/outlayer', 'get-size/get-size'], factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(require('outlayer'), require('get-size'))
   } else {
      window.Masonry = factory(window.Outlayer, window.getSize)
   }
}(window, function factory(Outlayer, getSize) {
   var Masonry = Outlayer.create('masonry');
   Masonry.compatOptions.fitWidth = 'isFitWidth';
   var proto = Masonry.prototype;
   proto._resetLayout = function () {
      this.getSize();
      this._getMeasurement('columnWidth', 'outerWidth');
      this._getMeasurement('gutter', 'outerWidth');
      this.measureColumns();
      this.colYs = [];
      for (var i = 0; i < this.cols; i++) {
         this.colYs.push(0)
      }
      this.maxY = 0;
      this.horizontalColIndex = 0
   };
   proto.measureColumns = function () {
      this.getContainerWidth();
      if (!this.columnWidth) {
         var firstItem = this.items[0];
         var firstItemElem = firstItem && firstItem.element;
         this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth
      }
      var columnWidth = this.columnWidth += this.gutter;
      var containerWidth = this.containerWidth + this.gutter;
      var cols = containerWidth / columnWidth;
      var excess = columnWidth - containerWidth % columnWidth;
      var mathMethod = excess && excess < 1 ? 'round' : 'floor';
      cols = Math[mathMethod](cols);
      this.cols = Math.max(cols, 1)
   };
   proto.getContainerWidth = function () {
      var isFitWidth = this._getOption('fitWidth');
      var container = isFitWidth ? this.element.parentNode : this.element;
      var size = getSize(container);
      this.containerWidth = size && size.innerWidth
   };
   proto._getItemLayoutPosition = function (item) {
      item.getSize();
      var remainder = item.size.outerWidth % this.columnWidth;
      var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
      var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
      colSpan = Math.min(colSpan, this.cols);
      var colPosMethod = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition';
      var colPosition = this[colPosMethod](colSpan, item);
      var position = {
         x: this.columnWidth * colPosition.col,
         y: colPosition.y
      };
      var setHeight = colPosition.y + item.size.outerHeight;
      var setMax = colSpan + colPosition.col;
      for (var i = colPosition.col; i < setMax; i++) {
         this.colYs[i] = setHeight
      }
      return position
   };
   proto._getTopColPosition = function (colSpan) {
      var colGroup = this._getTopColGroup(colSpan);
      var minimumY = Math.min.apply(Math, colGroup);
      return {
         col: colGroup.indexOf(minimumY),
         y: minimumY,
      }
   };
   proto._getTopColGroup = function (colSpan) {
      if (colSpan < 2) {
         return this.colYs
      }
      var colGroup = [];
      var groupCount = this.cols + 1 - colSpan;
      for (var i = 0; i < groupCount; i++) {
         colGroup[i] = this._getColGroupY(i, colSpan)
      }
      return colGroup
   };
   proto._getColGroupY = function (col, colSpan) {
      if (colSpan < 2) {
         return this.colYs[col]
      }
      var groupColYs = this.colYs.slice(col, col + colSpan);
      return Math.max.apply(Math, groupColYs)
   };
   proto._getHorizontalColPosition = function (colSpan, item) {
      var col = this.horizontalColIndex % this.cols;
      var isOver = colSpan > 1 && col + colSpan > this.cols;
      col = isOver ? 0 : col;
      var hasSize = item.size.outerWidth && item.size.outerHeight;
      this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
      return {
         col: col,
         y: this._getColGroupY(col, colSpan),
      }
   };
   proto._manageStamp = function (stamp) {
      var stampSize = getSize(stamp);
      var offset = this._getElementOffset(stamp);
      var isOriginLeft = this._getOption('originLeft');
      var firstX = isOriginLeft ? offset.left : offset.right;
      var lastX = firstX + stampSize.outerWidth;
      var firstCol = Math.floor(firstX / this.columnWidth);
      firstCol = Math.max(0, firstCol);
      var lastCol = Math.floor(lastX / this.columnWidth);
      lastCol -= lastX % this.columnWidth ? 0 : 1;
      lastCol = Math.min(this.cols - 1, lastCol);
      var isOriginTop = this._getOption('originTop');
      var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
      for (var i = firstCol; i <= lastCol; i++) {
         this.colYs[i] = Math.max(stampMaxY, this.colYs[i])
      }
   };
   proto._getContainerSize = function () {
      this.maxY = Math.max.apply(Math, this.colYs);
      var size = {
         height: this.maxY
      };
      if (this._getOption('fitWidth')) {
         size.width = this._getContainerFitWidth()
      }
      return size
   };
   proto._getContainerFitWidth = function () {
      var unusedCols = 0;
      var i = this.cols;
      while (--i) {
         if (this.colYs[i] !== 0) {
            break
         }
         unusedCols++
      }
      return (this.cols - unusedCols) * this.columnWidth - this.gutter
   };
   proto.needsResizeLayout = function () {
      var previousWidth = this.containerWidth;
      this.getContainerWidth();
      return previousWidth != this.containerWidth
   };
   return Masonry
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('isotope/js/layout-modes/masonry', ['../layout-mode', 'masonry/masonry'], factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(require('../layout-mode'), require('masonry-layout'))
   } else {
      factory(window.Isotope.LayoutMode, window.Masonry)
   }
}(window, function factory(LayoutMode, Masonry) {
   'use strict';
   var MasonryMode = LayoutMode.create('masonry');
   var proto = MasonryMode.prototype;
   var keepModeMethods = {
      _getElementOffset: !0,
      layout: !0,
      _getMeasurement: !0
   };
   for (var method in Masonry.prototype) {
      if (!keepModeMethods[method]) {
         proto[method] = Masonry.prototype[method]
      }
   }
   var measureColumns = proto.measureColumns;
   proto.measureColumns = function () {
      this.items = this.isotope.filteredItems;
      measureColumns.call(this)
   };
   var _getOption = proto._getOption;
   proto._getOption = function (option) {
      if (option == 'fitWidth') {
         return this.options.isFitWidth !== undefined ? this.options.isFitWidth : this.options.fitWidth
      }
      return _getOption.apply(this.isotope, arguments)
   };
   return MasonryMode
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('isotope/js/layout-modes/fit-rows', ['../layout-mode'], factory)
   } else if (typeof exports == 'object') {
      module.exports = factory(require('../layout-mode'))
   } else {
      factory(window.Isotope.LayoutMode)
   }
}(window, function factory(LayoutMode) {
   'use strict';
   var FitRows = LayoutMode.create('fitRows');
   var proto = FitRows.prototype;
   proto._resetLayout = function () {
      this.x = 0;
      this.y = 0;
      this.maxY = 0;
      this._getMeasurement('gutter', 'outerWidth')
   };
   proto._getItemLayoutPosition = function (item) {
      item.getSize();
      var itemWidth = item.size.outerWidth + this.gutter;
      var containerWidth = this.isotope.size.innerWidth + this.gutter;
      if (this.x !== 0 && itemWidth + this.x > containerWidth) {
         this.x = 0;
         this.y = this.maxY
      }
      var position = {
         x: this.x,
         y: this.y
      };
      this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
      this.x += itemWidth;
      return position
   };
   proto._getContainerSize = function () {
      return {
         height: this.maxY
      }
   };
   return FitRows
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define('isotope/js/layout-modes/vertical', ['../layout-mode'], factory)
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(require('../layout-mode'))
   } else {
      factory(window.Isotope.LayoutMode)
   }
}(window, function factory(LayoutMode) {
   'use strict';
   var Vertical = LayoutMode.create('vertical', {
      horizontalAlignment: 0
   });
   var proto = Vertical.prototype;
   proto._resetLayout = function () {
      this.y = 0
   };
   proto._getItemLayoutPosition = function (item) {
      item.getSize();
      var x = (this.isotope.size.innerWidth - item.size.outerWidth) * this.options.horizontalAlignment;
      var y = this.y;
      this.y += item.size.outerHeight;
      return {
         x: x,
         y: y
      }
   };
   proto._getContainerSize = function () {
      return {
         height: this.y
      }
   };
   return Vertical
}));
(function (window, factory) {
   if (typeof define == 'function' && define.amd) {
      define(['outlayer/outlayer', 'get-size/get-size', 'desandro-matches-selector/matches-selector', 'fizzy-ui-utils/utils', 'isotope/js/item', 'isotope/js/layout-mode', 'isotope/js/layout-modes/masonry', 'isotope/js/layout-modes/fit-rows', 'isotope/js/layout-modes/vertical'], function (Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
         return factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode)
      })
   } else if (typeof module == 'object' && module.exports) {
      module.exports = factory(window, require('outlayer'), require('get-size'), require('desandro-matches-selector'), require('fizzy-ui-utils'), require('isotope/js/item'), require('isotope/js/layout-mode'), require('isotope/js/layout-modes/masonry'), require('isotope/js/layout-modes/fit-rows'), require('isotope/js/layout-modes/vertical'))
   } else {
      window.Isotope = factory(window, window.Outlayer, window.getSize, window.matchesSelector, window.fizzyUIUtils, window.Isotope.Item, window.Isotope.LayoutMode)
   }
}(window, function factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
   var jQuery = window.jQuery;
   var trim = String.prototype.trim ? function (str) {
      return str.trim()
   } : function (str) {
      return str.replace(/^\s+|\s+$/g, '')
   };
   var Isotope = Outlayer.create('isotope', {
      layoutMode: 'masonry',
      isJQueryFiltering: !0,
      sortAscending: !0
   });
   Isotope.Item = Item;
   Isotope.LayoutMode = LayoutMode;
   var proto = Isotope.prototype;
   proto._create = function () {
      this.itemGUID = 0;
      this._sorters = {};
      this._getSorters();
      Outlayer.prototype._create.call(this);
      this.modes = {};
      this.filteredItems = this.items;
      this.sortHistory = ['original-order'];
      for (var name in LayoutMode.modes) {
         this._initLayoutMode(name)
      }
   };
   proto.reloadItems = function () {
      this.itemGUID = 0;
      Outlayer.prototype.reloadItems.call(this)
   };
   proto._itemize = function () {
      var items = Outlayer.prototype._itemize.apply(this, arguments);
      for (var i = 0; i < items.length; i++) {
         var item = items[i];
         item.id = this.itemGUID++
      }
      this._updateItemsSortData(items);
      return items
   };
   proto._initLayoutMode = function (name) {
      var Mode = LayoutMode.modes[name];
      var initialOpts = this.options[name] || {};
      this.options[name] = Mode.options ? utils.extend(Mode.options, initialOpts) : initialOpts;
      this.modes[name] = new Mode(this)
   };
   proto.layout = function () {
      if (!this._isLayoutInited && this._getOption('initLayout')) {
         this.arrange();
         return
      }
      this._layout()
   };
   proto._layout = function () {
      var isInstant = this._getIsInstant();
      this._resetLayout();
      this._manageStamps();
      this.layoutItems(this.filteredItems, isInstant);
      this._isLayoutInited = !0
   };
   proto.arrange = function (opts) {
      this.option(opts);
      this._getIsInstant();
      var filtered = this._filter(this.items);
      this.filteredItems = filtered.matches;
      this._bindArrangeComplete();
      if (this._isInstant) {
         this._noTransition(this._hideReveal, [filtered])
      } else {
         this._hideReveal(filtered)
      }
      this._sort();
      this._layout()
   };
   proto._init = proto.arrange;
   proto._hideReveal = function (filtered) {
      this.reveal(filtered.needReveal);
      this.hide(filtered.needHide)
   };
   proto._getIsInstant = function () {
      var isLayoutInstant = this._getOption('layoutInstant');
      var isInstant = isLayoutInstant !== undefined ? isLayoutInstant : !this._isLayoutInited;
      this._isInstant = isInstant;
      return isInstant
   };
   proto._bindArrangeComplete = function () {
      var isLayoutComplete, isHideComplete, isRevealComplete;
      var _this = this;

      function arrangeParallelCallback() {
         if (isLayoutComplete && isHideComplete && isRevealComplete) {
            _this.dispatchEvent('arrangeComplete', null, [_this.filteredItems])
         }
      }
      this.once('layoutComplete', function () {
         isLayoutComplete = !0;
         arrangeParallelCallback()
      });
      this.once('hideComplete', function () {
         isHideComplete = !0;
         arrangeParallelCallback()
      });
      this.once('revealComplete', function () {
         isRevealComplete = !0;
         arrangeParallelCallback()
      })
   };
   proto._filter = function (items) {
      var filter = this.options.filter;
      filter = filter || '*';
      var matches = [];
      var hiddenMatched = [];
      var visibleUnmatched = [];
      var test = this._getFilterTest(filter);
      for (var i = 0; i < items.length; i++) {
         var item = items[i];
         if (item.isIgnored) {
            continue
         }
         var isMatched = test(item);
         if (isMatched) {
            matches.push(item)
         }
         if (isMatched && item.isHidden) {
            hiddenMatched.push(item)
         } else if (!isMatched && !item.isHidden) {
            visibleUnmatched.push(item)
         }
      }
      return {
         matches: matches,
         needReveal: hiddenMatched,
         needHide: visibleUnmatched
      }
   };
   proto._getFilterTest = function (filter) {
      if (jQuery && this.options.isJQueryFiltering) {
         return function (item) {
            return jQuery(item.element).is(filter)
         }
      }
      if (typeof filter == 'function') {
         return function (item) {
            return filter(item.element)
         }
      }
      return function (item) {
         return matchesSelector(item.element, filter)
      }
   };
   proto.updateSortData = function (elems) {
      var items;
      if (elems) {
         elems = utils.makeArray(elems);
         items = this.getItems(elems)
      } else {
         items = this.items
      }
      this._getSorters();
      this._updateItemsSortData(items)
   };
   proto._getSorters = function () {
      var getSortData = this.options.getSortData;
      for (var key in getSortData) {
         var sorter = getSortData[key];
         this._sorters[key] = mungeSorter(sorter)
      }
   };
   proto._updateItemsSortData = function (items) {
      var len = items && items.length;
      for (var i = 0; len && i < len; i++) {
         var item = items[i];
         item.updateSortData()
      }
   };
   var mungeSorter = (function () {
      function mungeSorter(sorter) {
         if (typeof sorter != 'string') {
            return sorter
         }
         var args = trim(sorter).split(' ');
         var query = args[0];
         var attrMatch = query.match(/^\[(.+)\]$/);
         var attr = attrMatch && attrMatch[1];
         var getValue = getValueGetter(attr, query);
         var parser = Isotope.sortDataParsers[args[1]];
         sorter = parser ? function (elem) {
            return elem && parser(getValue(elem))
         } : function (elem) {
            return elem && getValue(elem)
         };
         return sorter
      }

      function getValueGetter(attr, query) {
         if (attr) {
            return function getAttribute(elem) {
               return elem.getAttribute(attr)
            }
         }
         return function getChildText(elem) {
            var child = elem.querySelector(query);
            return child && child.textContent
         }
      }
      return mungeSorter
   })();
   Isotope.sortDataParsers = {
      'parseInt': function (val) {
         return parseInt(val, 10)
      },
      'parseFloat': function (val) {
         return parseFloat(val)
      }
   };
   proto._sort = function () {
      if (!this.options.sortBy) {
         return
      }
      var sortBys = utils.makeArray(this.options.sortBy);
      if (!this._getIsSameSortBy(sortBys)) {
         this.sortHistory = sortBys.concat(this.sortHistory)
      }
      var itemSorter = getItemSorter(this.sortHistory, this.options.sortAscending);
      this.filteredItems.sort(itemSorter)
   };
   proto._getIsSameSortBy = function (sortBys) {
      for (var i = 0; i < sortBys.length; i++) {
         if (sortBys[i] != this.sortHistory[i]) {
            return !1
         }
      }
      return !0
   };

   function getItemSorter(sortBys, sortAsc) {
      return function sorter(itemA, itemB) {
         for (var i = 0; i < sortBys.length; i++) {
            var sortBy = sortBys[i];
            var a = itemA.sortData[sortBy];
            var b = itemB.sortData[sortBy];
            if (a > b || a < b) {
               var isAscending = sortAsc[sortBy] !== undefined ? sortAsc[sortBy] : sortAsc;
               var direction = isAscending ? 1 : -1;
               return (a > b ? 1 : -1) * direction
            }
         }
         return 0
      }
   }
   proto._mode = function () {
      var layoutMode = this.options.layoutMode;
      var mode = this.modes[layoutMode];
      if (!mode) {
         throw new Error('No layout mode: ' + layoutMode)
      }
      mode.options = this.options[layoutMode];
      return mode
   };
   proto._resetLayout = function () {
      Outlayer.prototype._resetLayout.call(this);
      this._mode()._resetLayout()
   };
   proto._getItemLayoutPosition = function (item) {
      return this._mode()._getItemLayoutPosition(item)
   };
   proto._manageStamp = function (stamp) {
      this._mode()._manageStamp(stamp)
   };
   proto._getContainerSize = function () {
      return this._mode()._getContainerSize()
   };
   proto.needsResizeLayout = function () {
      return this._mode().needsResizeLayout()
   };
   proto.appended = function (elems) {
      var items = this.addItems(elems);
      if (!items.length) {
         return
      }
      var filteredItems = this._filterRevealAdded(items);
      this.filteredItems = this.filteredItems.concat(filteredItems)
   };
   proto.prepended = function (elems) {
      var items = this._itemize(elems);
      if (!items.length) {
         return
      }
      this._resetLayout();
      this._manageStamps();
      var filteredItems = this._filterRevealAdded(items);
      this.layoutItems(this.filteredItems);
      this.filteredItems = filteredItems.concat(this.filteredItems);
      this.items = items.concat(this.items)
   };
   proto._filterRevealAdded = function (items) {
      var filtered = this._filter(items);
      this.hide(filtered.needHide);
      this.reveal(filtered.matches);
      this.layoutItems(filtered.matches, !0);
      return filtered.matches
   };
   proto.insert = function (elems) {
      var items = this.addItems(elems);
      if (!items.length) {
         return
      }
      var i, item;
      var len = items.length;
      for (i = 0; i < len; i++) {
         item = items[i];
         this.element.appendChild(item.element)
      }
      var filteredInsertItems = this._filter(items).matches;
      for (i = 0; i < len; i++) {
         items[i].isLayoutInstant = !0
      }
      this.arrange();
      for (i = 0; i < len; i++) {
         delete items[i].isLayoutInstant
      }
      this.reveal(filteredInsertItems)
   };
   var _remove = proto.remove;
   proto.remove = function (elems) {
      elems = utils.makeArray(elems);
      var removeItems = this.getItems(elems);
      _remove.call(this, elems);
      var len = removeItems && removeItems.length;
      for (var i = 0; len && i < len; i++) {
         var item = removeItems[i];
         utils.removeFrom(this.filteredItems, item)
      }
   };
   proto.shuffle = function () {
      for (var i = 0; i < this.items.length; i++) {
         var item = this.items[i];
         item.sortData.random = Math.random()
      }
      this.options.sortBy = 'random';
      this._sort();
      this._layout()
   };
   proto._noTransition = function (fn, args) {
      var transitionDuration = this.options.transitionDuration;
      this.options.transitionDuration = 0;
      var returnValue = fn.apply(this, args);
      this.options.transitionDuration = transitionDuration;
      return returnValue
   };
   proto.getFilteredItemElements = function () {
      return this.filteredItems.map(function (item) {
         return item.element
      })
   };
   return Isotope
}));
(function ($) {
   'use strict';
   if (typeof wpcf7 === 'undefined' || wpcf7 === null) {
      return
   }
   wpcf7 = $.extend({
      cached: 0,
      inputs: []
   }, wpcf7);
   $(function () {
      wpcf7.supportHtml5 = (function () {
         var features = {};
         var input = document.createElement('input');
         features.placeholder = 'placeholder' in input;
         var inputTypes = ['email', 'url', 'tel', 'number', 'range', 'date'];
         $.each(inputTypes, function (index, value) {
            input.setAttribute('type', value);
            features[value] = input.type !== 'text'
         });
         return features
      })();
      $('div.wpcf7 > form').each(function () {
         var $form = $(this);
         $form.submit(function (event) {
            if (typeof window.FormData !== 'function') {
               return
            }
            wpcf7.submit($form);
            event.preventDefault()
         });
         $('.wpcf7-submit', $form).after('<span class="ajax-loader"></span>');
         wpcf7.toggleSubmit($form);
         $form.on('click', '.wpcf7-acceptance', function () {
            wpcf7.toggleSubmit($form)
         });
         $('.wpcf7-exclusive-checkbox', $form).on('click', 'input:checkbox', function () {
            var name = $(this).attr('name');
            $form.find('input:checkbox[name="' + name + '"]').not(this).prop('checked', !1)
         });
         $('.wpcf7-list-item.has-free-text', $form).each(function () {
            var $freetext = $(':input.wpcf7-free-text', this);
            var $wrap = $(this).closest('.wpcf7-form-control');
            if ($(':checkbox, :radio', this).is(':checked')) {
               $freetext.prop('disabled', !1)
            } else {
               $freetext.prop('disabled', !0)
            }
            $wrap.on('change', ':checkbox, :radio', function () {
               var $cb = $('.has-free-text', $wrap).find(':checkbox, :radio');
               if ($cb.is(':checked')) {
                  $freetext.prop('disabled', !1).focus()
               } else {
                  $freetext.prop('disabled', !0)
               }
            })
         });
         if (!wpcf7.supportHtml5.placeholder) {
            $('[placeholder]', $form).each(function () {
               $(this).val($(this).attr('placeholder'));
               $(this).addClass('placeheld');
               $(this).focus(function () {
                  if ($(this).hasClass('placeheld')) {
                     $(this).val('').removeClass('placeheld')
                  }
               });
               $(this).blur(function () {
                  if ('' === $(this).val()) {
                     $(this).val($(this).attr('placeholder'));
                     $(this).addClass('placeheld')
                  }
               })
            })
         }
         if (wpcf7.jqueryUi && !wpcf7.supportHtml5.date) {
            $form.find('input.wpcf7-date[type="date"]').each(function () {
               $(this).datepicker({
                  dateFormat: 'yy-mm-dd',
                  minDate: new Date($(this).attr('min')),
                  maxDate: new Date($(this).attr('max'))
               })
            })
         }
         if (wpcf7.jqueryUi && !wpcf7.supportHtml5.number) {
            $form.find('input.wpcf7-number[type="number"]').each(function () {
               $(this).spinner({
                  min: $(this).attr('min'),
                  max: $(this).attr('max'),
                  step: $(this).attr('step')
               })
            })
         }
         $('.wpcf7-character-count', $form).each(function () {
            var $count = $(this);
            var name = $count.attr('data-target-name');
            var down = $count.hasClass('down');
            var starting = parseInt($count.attr('data-starting-value'), 10);
            var maximum = parseInt($count.attr('data-maximum-value'), 10);
            var minimum = parseInt($count.attr('data-minimum-value'), 10);
            var updateCount = function (target) {
               var $target = $(target);
               var length = $target.val().length;
               var count = down ? starting - length : length;
               $count.attr('data-current-value', count);
               $count.text(count);
               if (maximum && maximum < length) {
                  $count.addClass('too-long')
               } else {
                  $count.removeClass('too-long')
               }
               if (minimum && length < minimum) {
                  $count.addClass('too-short')
               } else {
                  $count.removeClass('too-short')
               }
            };
            $(':input[name="' + name + '"]', $form).each(function () {
               updateCount(this);
               $(this).keyup(function () {
                  updateCount(this)
               })
            })
         });
         $form.on('change', '.wpcf7-validates-as-url', function () {
            var val = $.trim($(this).val());
            if (val && !val.match(/^[a-z][a-z0-9.+-]*:/i)) {
               val = val.replace(/^\/+/, '');
               val = '//' + val
            }
            $(this).val(val)
         });
         if (wpcf7.cached) {
            wpcf7.refill($form)
         }
      })
   });
   wpcf7.getId = function (form) {
      return parseInt($('input[name="_wpcf7"]', form).val(), 10)
   };
   wpcf7.submit = function (form) {
      var $form = $(form);
      $('[placeholder].placeheld', $form).each(function (i, n) {
         $(n).val('')
      });
      wpcf7.clearResponse($form);
      $('.ajax-loader', $form).addClass('is-active');
      if (typeof window.FormData !== 'function') {
         return
      }
      var formData = new FormData($form.get(0));
      var ajaxSuccess = function (data, status, xhr, $form) {
         var detail = {
            id: $(data.into).attr('id'),
            status: data.status,
            inputs: []
         };
         $.each($form.serializeArray(), function (i, field) {
            if ('_wpcf7' == field.name) {
               detail.contactFormId = field.value
            } else if ('_wpcf7_version' == field.name) {
               detail.pluginVersion = field.value
            } else if ('_wpcf7_locale' == field.name) {
               detail.contactFormLocale = field.value
            } else if ('_wpcf7_unit_tag' == field.name) {
               detail.unitTag = field.value
            } else if ('_wpcf7_container_post' == field.name) {
               detail.containerPostId = field.value
            } else if (field.name.match(/^_/)) {} else {
               detail.inputs.push(field)
            }
         });
         var $message = $('.wpcf7-response-output', $form);
         switch (data.status) {
            case 'validation_failed':
               $.each(data.invalidFields, function (i, n) {
                  $(n.into, $form).each(function () {
                     wpcf7.notValidTip(this, n.message);
                     $('.wpcf7-form-control', this).addClass('wpcf7-not-valid');
                     $('[aria-invalid]', this).attr('aria-invalid', 'true')
                  })
               });
               $message.addClass('wpcf7-validation-errors');
               $form.addClass('invalid');
               wpcf7.triggerEvent(data.into, 'invalid', detail);
               break;
            case 'spam':
               $message.addClass('wpcf7-spam-blocked');
               $form.addClass('spam');
               $('[name="g-recaptcha-response"]', $form).each(function () {
                  if ('' === $(this).val()) {
                     var $recaptcha = $(this).closest('.wpcf7-form-control-wrap');
                     wpcf7.notValidTip($recaptcha, wpcf7.recaptcha.messages.empty)
                  }
               });
               wpcf7.triggerEvent(data.into, 'spam', detail);
               break;
            case 'mail_sent':
               $message.addClass('wpcf7-mail-sent-ok');
               $form.addClass('sent');
               if (data.onSentOk) {
                  $.each(data.onSentOk, function (i, n) {
                     eval(n)
                  })
               }
               wpcf7.triggerEvent(data.into, 'mailsent', detail);
               break;
            case 'mail_failed':
            case 'acceptance_missing':
            default:
               $message.addClass('wpcf7-mail-sent-ng');
               $form.addClass('failed');
               wpcf7.triggerEvent(data.into, 'mailfailed', detail)
         }
         wpcf7.refill($form, data);
         if (data.onSubmit) {
            $.each(data.onSubmit, function (i, n) {
               eval(n)
            })
         }
         wpcf7.triggerEvent(data.into, 'submit', detail);
         if ('mail_sent' == data.status) {
            $form.each(function () {
               this.reset()
            })
         }
         $form.find('[placeholder].placeheld').each(function (i, n) {
            $(n).val($(n).attr('placeholder'))
         });
         $message.append(data.message).slideDown('fast');
         $message.attr('role', 'alert');
         $('.screen-reader-response', $form.closest('.wpcf7')).each(function () {
            var $response = $(this);
            $response.html('').attr('role', '').append(data.message);
            if (data.invalidFields) {
               var $invalids = $('<ul></ul>');
               $.each(data.invalidFields, function (i, n) {
                  if (n.idref) {
                     var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message))
                  } else {
                     var $li = $('<li></li>').append(n.message)
                  }
                  $invalids.append($li)
               });
               $response.append($invalids)
            }
            $response.attr('role', 'alert').focus()
         })
      };
      $.ajax({
         type: 'POST',
         url: wpcf7.apiSettings.root + wpcf7.apiSettings.namespace + '/contact-forms/' + wpcf7.getId($form) + '/feedback',
         data: formData,
         dataType: 'json',
         processData: !1,
         contentType: !1
      }).done(function (data, status, xhr) {
         ajaxSuccess(data, status, xhr, $form);
         $('.ajax-loader', $form).removeClass('is-active')
      }).fail(function (xhr, status, error) {
         var $e = $('<div class="ajax-error"></div>').text(error.message);
         $form.after($e)
      })
   };
   wpcf7.triggerEvent = function (target, name, detail) {
      var $target = $(target);
      var event = new CustomEvent('wpcf7' + name, {
         bubbles: !0,
         detail: detail
      });
      $target.get(0).dispatchEvent(event);
      $target.trigger('wpcf7:' + name, detail);
      $target.trigger(name + '.wpcf7', detail)
   };
   wpcf7.toggleSubmit = function (form, state) {
      var $form = $(form);
      var $submit = $('input:submit', $form);
      if (typeof state !== 'undefined') {
         $submit.prop('disabled', !state);
         return
      }
      if ($form.hasClass('wpcf7-acceptance-as-validation')) {
         return
      }
      $submit.prop('disabled', !1);
      $('input:checkbox.wpcf7-acceptance', $form).each(function () {
         var $a = $(this);
         if ($a.hasClass('wpcf7-invert') && $a.is(':checked') || !$a.hasClass('wpcf7-invert') && !$a.is(':checked')) {
            $submit.prop('disabled', !0);
            return !1
         }
      })
   };
   wpcf7.notValidTip = function (target, message) {
      var $target = $(target);
      $('.wpcf7-not-valid-tip', $target).remove();
      $('<span role="alert" class="wpcf7-not-valid-tip"></span>').text(message).appendTo($target);
      if ($target.is('.use-floating-validation-tip *')) {
         var fadeOut = function (target) {
            $(target).not(':hidden').animate({
               opacity: 0
            }, 'fast', function () {
               $(this).css({
                  'z-index': -100
               })
            })
         }
         $target.on('mouseover', '.wpcf7-not-valid-tip', function () {
            fadeOut(this)
         });
         $target.on('focus', ':input', function () {
            fadeOut($('.wpcf7-not-valid-tip', $target))
         })
      }
   }
   wpcf7.refill = function (form, data) {
      var $form = $(form);
      var refillCaptcha = function ($form, items) {
         $.each(items, function (i, n) {
            $form.find(':input[name="' + i + '"]').val('');
            $form.find('img.wpcf7-captcha-' + i).attr('src', n);
            var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
            $form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1])
         })
      };
      var refillQuiz = function ($form, items) {
         $.each(items, function (i, n) {
            $form.find(':input[name="' + i + '"]').val('');
            $form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
            $form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1])
         })
      };
      if (typeof data === 'undefined') {
         $.ajax({
            type: 'GET',
            url: wpcf7.apiSettings.root + wpcf7.apiSettings.namespace + '/contact-forms/' + wpcf7.getId($form) + '/refill',
            dataType: 'json'
         }).done(function (data, status, xhr) {
            if (data.captcha) {
               refillCaptcha($form, data.captcha)
            }
            if (data.quiz) {
               refillQuiz($form, data.quiz)
            }
         })
      } else {
         if (data.captcha) {
            refillCaptcha($form, data.captcha)
         }
         if (data.quiz) {
            refillQuiz($form, data.quiz)
         }
      }
   };
   wpcf7.clearResponse = function (form) {
      var $form = $(form);
      $form.removeClass('invalid spam sent failed');
      $form.siblings('.screen-reader-response').html('').attr('role', '');
      $('.wpcf7-not-valid-tip', $form).remove();
      $('[aria-invalid]', $form).attr('aria-invalid', 'false');
      $('.wpcf7-form-control', $form).removeClass('wpcf7-not-valid');
      $('.wpcf7-response-output', $form).hide().empty().removeAttr('role').removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked')
   }
})(jQuery);
(function () {
   if (typeof window.CustomEvent === "function") return !1;

   function CustomEvent(event, params) {
      params = params || {
         bubbles: !1,
         cancelable: !1,
         detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt
   }
   CustomEvent.prototype = window.Event.prototype;
   window.CustomEvent = CustomEvent
})();
var sbi_js_exists = (typeof sbi_js_exists !== 'undefined') ? !0 : !1;
if (!sbi_js_exists) {
   (function () {
      var e, t;
      e = function () {
         function e(e, t) {
            var n, r;
            this.options = {
               target: "instafeed",
               get: "popular",
               resolution: "thumbnail",
               sortBy: "none",
               links: !0,
               mock: !1,
               useHttp: !1
            };
            if (typeof e == "object")
               for (n in e) r = e[n], this.options[n] = r;
            this.context = t != null ? t : this, this.unique = this._genKey()
         }
         return e.prototype.hasNext = function () {
            return typeof this.context.nextUrl == "string" && this.context.nextUrl.length > 0
         }, e.prototype.next = function () {
            return this.hasNext() ? this.run(this.context.nextUrl) : !1
         }, e.prototype.run = function (t) {
            var n, r, i;
            if (typeof this.options.clientId != "string" && typeof this.options.accessToken != "string") throw new Error("Missing clientId or accessToken.");
            if (typeof this.options.accessToken != "string" && typeof this.options.clientId != "string") throw new Error("Missing clientId or accessToken.");
            return this.options.before != null && typeof this.options.before == "function" && this.options.before.call(this), typeof document != "undefined" && document !== null && (i = document.createElement("script"), i.id = "instafeed-fetcher", i.src = t || this._buildUrl(), n = document.getElementsByTagName("head"), n[0].appendChild(i), r = "instafeedCache" + this.unique, window[r] = new e(this.options, this), window[r].unique = this.unique), !0
         }, e.prototype.parse = function (e) {
            var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S;
            if (typeof e != "object") {
               if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "Invalid JSON data"), !1;
               throw new Error("Invalid JSON response")
            }
            if (e.meta.code !== 200) {
               if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, e.meta.error_message), !1;
               throw new Error("Error from Instagram: " + e.meta.error_message)
            }
            if (e.data.length === 0) {
               if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "No images were returned from Instagram"), !1;
               throw new Error("No images were returned from Instagram")
            }
            this.options.success != null && typeof this.options.success == "function" && this.options.success.call(this, e), this.context.nextUrl = "", e.pagination != null && (this.context.nextUrl = e.pagination.next_url);
            if (this.options.sortBy !== "none") {
               this.options.sortBy === "random" ? d = ["", "random"] : d = this.options.sortBy.split("-"), p = d[0] === "least" ? !0 : !1;
               switch (d[1]) {
                  case "random":
                     e.data.sort(function () {
                        return .5 - Math.random()
                     });
                     break;
                  case "recent":
                     e.data = this._sortBy(e.data, "created_time", p);
                     break;
                  case "liked":
                     e.data = this._sortBy(e.data, "likes.count", p);
                     break;
                  case "commented":
                     e.data = this._sortBy(e.data, "comments.count", p);
                     break;
                  default:
                     throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
               }
            }
            if (typeof document != "undefined" && document !== null && this.options.mock === !1) {
               a = e.data, this.options.limit != null && a.length > this.options.limit && (a = a.slice(0, this.options.limit + 1 || 9e9)), n = document.createDocumentFragment(), this.options.filter != null && typeof this.options.filter == "function" && (a = this._filter(a, this.options.filter));
               if (this.options.template != null && typeof this.options.template == "string") {
                  i = "", o = "", l = "", v = document.createElement("div");
                  for (m = 0, b = a.length; m < b; m++) s = a[m], u = s.images[this.options.resolution].url, this.options.useHttp || (u = u.replace("//", "//")), o = this._makeTemplate(this.options.template, {
                     model: s,
                     id: s.id,
                     link: s.link,
                     image: u,
                     caption: this._getObjectProperty(s, "caption.text"),
                     likes: s.likes.count,
                     comments: s.comments.count,
                     location: this._getObjectProperty(s, "location.name")
                  }), i += o;
                  v.innerHTML = i, S = [].slice.call(v.childNodes);
                  for (g = 0, w = S.length; g < w; g++) h = S[g], n.appendChild(h)
               } else
                  for (y = 0, E = a.length; y < E; y++) s = a[y], f = document.createElement("img"), u = s.images[this.options.resolution].url, this.options.useHttp || (u = u.replace("//", "//")), f.src = u, this.options.links === !0 ? (t = document.createElement("a"), t.href = s.link, t.appendChild(f), n.appendChild(t)) : n.appendChild(f);
               this.options.target.append(n), r = document.getElementsByTagName("head")[0], r.removeChild(document.getElementById("instafeed-fetcher")), c = "instafeedCache" + this.unique, window[c] = void 0;
               try {
                  delete window[c]
               } catch (x) {}
            }
            return this.options.after != null && typeof this.options.after == "function" && this.options.after.call(this), !0
         }, e.prototype._buildUrl = function () {
            var e, t, n;
            e = "//api.instagram.com/v1";
            switch (this.options.get) {
               case "popular":
                  t = "media/popular";
                  break;
               case "tagged":
                  if (typeof this.options.tagName != "string") throw new Error("No tag name specified. Use the 'tagName' option.");
                  t = "tags/" + this.options.tagName + "/media/recent";
                  break;
               case "location":
                  if (typeof this.options.locationId != "number") throw new Error("No location specified. Use the 'locationId' option.");
                  t = "locations/" + this.options.locationId + "/media/recent";
                  break;
               case "user":
                  if (typeof this.options.userId != "number") throw new Error("No user specified. Use the 'userId' option.");
                  if (typeof this.options.accessToken != "string") throw new Error("No access token. Use the 'accessToken' option.");
                  t = "users/" + this.options.userId + "/media/recent";
                  break;
               default:
                  throw new Error("Invalid option for get: '" + this.options.get + "'.")
            }
            return n = "" + e + "/" + t, this.options.accessToken != null ? n += "?access_token=" + this.options.accessToken : n += "?client_id=" + this.options.clientId, this.options.limit != null && (n += "&count=" + this.options.limit), n += "&callback=instafeedCache" + this.unique + ".parse", n
         }, e.prototype._genKey = function () {
            var e;
            return e = function () {
               return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
            }, "" + e() + e() + e() + e()
         }, e.prototype._makeTemplate = function (e, t) {
            var n, r, i, s, o;
            r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, n = e;
            while (r.test(n)) i = n.match(r)[1], s = (o = this._getObjectProperty(t, i)) != null ? o : "", n = n.replace(r, "" + s);
            return n
         }, e.prototype._getObjectProperty = function (e, t) {
            var n, r;
            t = t.replace(/\[(\w+)\]/g, ".$1"), r = t.split(".");
            while (r.length) {
               n = r.shift();
               if (!(e != null && n in e)) return null;
               e = e[n]
            }
            return e
         }, e.prototype._sortBy = function (e, t, n) {
            var r;
            return r = function (e, r) {
               var i, s;
               return i = this._getObjectProperty(e, t), s = this._getObjectProperty(r, t), n ? i > s ? 1 : -1 : i < s ? 1 : -1
            }, e.sort(r.bind(this)), e
         }, e.prototype._filter = function (e, t) {
            var n, r, i, s, o;
            n = [], i = function (e) {
               if (t(e)) return n.push(e)
            };
            for (s = 0, o = e.length; s < o; s++) r = e[s], i(r);
            return n
         }, e
      }(), t = typeof exports != "undefined" && exports !== null ? exports : window, t.instagramfeed = e
   }).call(this);
   (function () {
      "use strict";
      var e = Array.prototype.slice;
      try {
         e.call(document.documentElement)
      } catch (t) {
         Array.prototype.slice = function (t, n) {
            n = typeof n !== "undefined" ? n : this.length;
            if (Object.prototype.toString.call(this) === "[object Array]") {
               return e.call(this, t, n)
            }
            var r, i = [],
               s, o = this.length;
            var u = t || 0;
            u = u >= 0 ? u : o + u;
            var a = n ? n : o;
            if (n < 0) {
               a = o + n
            }
            s = a - u;
            if (s > 0) {
               i = new Array(s);
               if (this.charAt) {
                  for (r = 0; r < s; r++) {
                     i[r] = this.charAt(u + r)
                  }
               } else {
                  for (r = 0; r < s; r++) {
                     i[r] = this[u + r]
                  }
               }
            }
            return i
         }
      }
   })()
   if (!Function.prototype.bind) {
      Function.prototype.bind = function (e) {
         if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
         }
         var t = Array.prototype.slice.call(arguments, 1),
            n = this,
            r = function () {},
            i = function () {
               return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
            };
         r.prototype = this.prototype;
         i.prototype = new r;
         return i
      }
   }

   function sbi_init() {
      jQuery('#sb_instagram.sbi').each(function () {
         var $self = jQuery(this),
            $target = $self.find('#sbi_images'),
            $loadBtn = $self.find("#sbi_load .sbi_load_btn"),
            imgRes = 'standard_resolution',
            cols = parseInt(this.getAttribute('data-cols'), 10),
            num = this.getAttribute('data-num'),
            feedOptions = JSON.parse(this.getAttribute('data-options')),
            getType = 'user',
            sortby = 'none',
            user_id = this.getAttribute('data-id'),
            num = this.getAttribute('data-num'),
            posts_arr = [],
            $header = '',
            morePosts = [];
         if (feedOptions.sortby !== '') sortby = feedOptions.sortby;
         switch (this.getAttribute('data-res')) {
            case 'auto':
               var feedWidth = $self.innerWidth(),
                  colWidth = $self.innerWidth() / cols;
               var sbiWindowWidth = jQuery(window).width();
               if (sbiWindowWidth < 640) {
                  if (feedWidth < 640 && $self.is('.sbi_col_3, .sbi_col_4, .sbi_col_5, .sbi_col_6')) colWidth = 300;
                  if (feedWidth < 640 && $self.is('.sbi_col_7, .sbi_col_8, .sbi_col_9, .sbi_col_10')) colWidth = 100;
                  if ((feedWidth > 320 && feedWidth < 480) && sbiWindowWidth < 480) colWidth = 480;
                  if (feedWidth < 320 && sbiWindowWidth < 480) colWidth = 300
               }
               if (colWidth < 150) {
                  imgRes = 'thumbnail'
               } else if (colWidth < 320) {
                  imgRes = 'low_resolution'
               } else {
                  imgRes = 'standard_resolution'
               }
               if (feedWidth <= 100) imgRes = 'low_resolution';
               break;
            case 'thumb':
               imgRes = 'thumbnail';
               break;
            case 'medium':
               imgRes = 'low_resolution';
               break;
            default:
               imgRes = 'standard_resolution'
         }
         var ids_arr = user_id.replace(/ /g, '').split(",");
         var looparray = ids_arr;
         var headerStyles = '',
            sbi_page_url = '//api.instagram.com/v1/users/' + ids_arr[0] + '?access_token=' + sb_instagram_js_options.sb_instagram_at;
         if (feedOptions.headercolor.length) headerStyles = 'style="color: #' + feedOptions.headercolor + '"';
         jQuery.ajax({
            method: "GET",
            url: sbi_page_url,
            dataType: "jsonp",
            success: function (data) {
               $header = '<a href="//instagram.com/' + data.data.username + '" target="_blank" title="@' + data.data.username + '" class="sbi_header_link">';
               $header += '<div class="sbi_header_text">';
               $header += '<h3 ' + headerStyles;
               if (data.data.bio.length == 0) $header += ' class="sbi_no_bio"';
               $header += '>@' + data.data.username + '</h3>';
               if (data.data.bio.length) $header += '<p class="sbi_bio" ' + headerStyles + '>' + data.data.bio + '</p>';
               $header += '</div>';
               $header += '<div class="sbi_header_img">';
               $header += '<div class="sbi_header_img_hover"><i></i></div>';
               $header += '<img src="' + data.data.profile_picture + '" alt="' + data.data.full_name + '" width="50" height="50">';
               $header += '</div>';
               $header += '</a>';
               $self.find('.sb_instagram_header').prepend($header);
               if ($self.find('.sbi_follow_btn').length) $self.find('.sbi_follow_btn a').attr('href', '//instagram.com/' + data.data.username)
            }
         });
         jQuery.each(looparray, function (index, entry) {
            var userFeed = new instagramfeed({
               target: $target,
               get: getType,
               sortBy: sortby,
               resolution: imgRes,
               limit: parseInt(num, 10),
               template: '<div class="sbi_item sbi_type_{{model.type}} sbi_new" id="sbi_{{id}}" data-date="{{model.created_time_raw}}"><div class="sbi_photo_wrap"><a class="sbi_photo" href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" width="200" height="200" /></a></div></div>',
               filter: function (image) {
                  var date = new Date(image.created_time * 1000),
                     time = date.getTime();
                  image.created_time_raw = time;
                  if (image.caption != null) image.caption.text = image.caption.text.replace(/[^a-zA-Z ]/g, "");
                  image.images.thumbnail.url = image.images.thumbnail.url.split("?ig_cache_key")[0];
                  image.images.standard_resolution.url = image.images.standard_resolution.url.split("?ig_cache_key")[0];
                  image.images.low_resolution.url = image.images.low_resolution.url.split("?ig_cache_key")[0];
                  return !0
               },
               userId: parseInt(entry, 10),
               accessToken: sb_instagram_js_options.sb_instagram_at,
               after: function () {
                  $self.find('.sbi_loader').remove();
                  if (this.hasNext()) morePosts.push('1');
                  if (morePosts.length > 0) {
                     $loadBtn.show()
                  } else {
                     $loadBtn.hide();
                     $self.css('padding-bottom', 0)
                  }
                  if (typeof sbi_custom_js == 'function') setTimeout(function () {
                     sbi_custom_js()
                  }, 100);
                  if (imgRes !== 'thumbnail') {
                     var sbi_imgLiquid = sbi_imgLiquid || {
                        VER: "0.9.944"
                     };
                     sbi_imgLiquid.bgs_Available = !1, sbi_imgLiquid.bgs_CheckRunned = !1,
                        function (i) {
                           function t() {
                              if (!sbi_imgLiquid.bgs_CheckRunned) {
                                 sbi_imgLiquid.bgs_CheckRunned = !0;
                                 var t = i('<span style="background-size:cover" />');
                                 i("body").append(t), ! function () {
                                    var i = t[0];
                                    if (i && window.getComputedStyle) {
                                       var e = window.getComputedStyle(i, null);
                                       e && e.backgroundSize && (sbi_imgLiquid.bgs_Available = "cover" === e.backgroundSize)
                                    }
                                 }(), t.remove()
                              }
                           }
                           i.fn.extend({
                              sbi_imgLiquid: function (e) {
                                 this.defaults = {
                                    fill: !0,
                                    verticalAlign: "center",
                                    horizontalAlign: "center",
                                    useBackgroundSize: !0,
                                    useDataHtmlAttr: !0,
                                    responsive: !0,
                                    delay: 0,
                                    fadeInTime: 0,
                                    removeBoxBackground: !0,
                                    hardPixels: !0,
                                    responsiveCheckTime: 500,
                                    timecheckvisibility: 500,
                                    onStart: null,
                                    onFinish: null,
                                    onItemStart: null,
                                    onItemFinish: null,
                                    onItemError: null
                                 }, t();
                                 var a = this;
                                 return this.options = e, this.settings = i.extend({}, this.defaults, this.options), this.settings.onStart && this.settings.onStart(), this.each(function (t) {
                                    function e() {
                                       -1 === u.css("background-image").indexOf(encodeURI(c.attr("src"))) && u.css({
                                          "background-image": 'url("' + encodeURI(c.attr("src")) + '")'
                                       }), u.css({
                                          "background-size": g.fill ? "cover" : "contain",
                                          "background-position": (g.horizontalAlign + " " + g.verticalAlign).toLowerCase(),
                                          "background-repeat": "no-repeat"
                                       }), i("a:first", u).css({
                                          display: "block",
                                          width: "100%",
                                          height: "100%"
                                       }), i("img", u).css({
                                          display: "none"
                                       }), g.onItemFinish && g.onItemFinish(t, u, c), u.addClass("sbi_imgLiquid_bgSize"), u.addClass("sbi_imgLiquid_ready"), l()
                                    }

                                    function o() {
                                       function e() {
                                          c.data("sbi_imgLiquid_error") || c.data("sbi_imgLiquid_loaded") || c.data("sbi_imgLiquid_oldProcessed") || (u.is(":visible") && c[0].complete && c[0].width > 0 && c[0].height > 0 ? (c.data("sbi_imgLiquid_loaded", !0), setTimeout(r, t * g.delay)) : setTimeout(e, g.timecheckvisibility))
                                       }
                                       if (c.data("oldSrc") && c.data("oldSrc") !== c.attr("src")) {
                                          var a = c.clone().removeAttr("style");
                                          return a.data("sbi_imgLiquid_settings", c.data("sbi_imgLiquid_settings")), c.parent().prepend(a), c.remove(), c = a, c[0].width = 0, void setTimeout(o, 10)
                                       }
                                       return c.data("sbi_imgLiquid_oldProcessed") ? void r() : (c.data("sbi_imgLiquid_oldProcessed", !1), c.data("oldSrc", c.attr("src")), i("img:not(:first)", u).css("display", "none"), u.css({
                                          overflow: "hidden"
                                       }), c.fadeTo(0, 0).removeAttr("width").removeAttr("height").css({
                                          visibility: "visible",
                                          "max-width": "none",
                                          "max-height": "none",
                                          width: "auto",
                                          height: "auto",
                                          display: "block"
                                       }), c.on("error", n), c[0].onerror = n, e(), void d())
                                    }

                                    function d() {
                                       (g.responsive || c.data("sbi_imgLiquid_oldProcessed")) && c.data("sbi_imgLiquid_settings") && (g = c.data("sbi_imgLiquid_settings"), u.actualSize = u.get(0).offsetWidth + u.get(0).offsetHeight / 1e4, u.sizeOld && u.actualSize !== u.sizeOld && r(), u.sizeOld = u.actualSize, setTimeout(d, g.responsiveCheckTime))
                                    }

                                    function n() {
                                       c.data("sbi_imgLiquid_error", !0), u.addClass("sbi_imgLiquid_error"), g.onItemError && g.onItemError(t, u, c), l()
                                    }

                                    function s() {
                                       var i = {};
                                       if (a.settings.useDataHtmlAttr) {
                                          var t = u.attr("data-sbi_imgLiquid-fill"),
                                             e = u.attr("data-sbi_imgLiquid-horizontalAlign"),
                                             o = u.attr("data-sbi_imgLiquid-verticalAlign");
                                          ("true" === t || "false" === t) && (i.fill = Boolean("true" === t)), void 0 === e || "left" !== e && "center" !== e && "right" !== e && -1 === e.indexOf("%") || (i.horizontalAlign = e), void 0 === o || "top" !== o && "bottom" !== o && "center" !== o && -1 === o.indexOf("%") || (i.verticalAlign = o)
                                       }
                                       return sbi_imgLiquid.isIE && a.settings.ieFadeInDisabled && (i.fadeInTime = 0), i
                                    }

                                    function r() {
                                       var i, e, a, o, d, n, s, r, m = 0,
                                          h = 0,
                                          f = u.width(),
                                          v = u.height();
                                       void 0 === c.data("owidth") && c.data("owidth", c[0].width), void 0 === c.data("oheight") && c.data("oheight", c[0].height), g.fill === f / v >= c.data("owidth") / c.data("oheight") ? (i = "100%", e = "auto", a = Math.floor(f), o = Math.floor(f * (c.data("oheight") / c.data("owidth")))) : (i = "auto", e = "100%", a = Math.floor(v * (c.data("owidth") / c.data("oheight"))), o = Math.floor(v)), d = g.horizontalAlign.toLowerCase(), s = f - a, "left" === d && (h = 0), "center" === d && (h = .5 * s), "right" === d && (h = s), -1 !== d.indexOf("%") && (d = parseInt(d.replace("%", ""), 10), d > 0 && (h = s * d * .01)), n = g.verticalAlign.toLowerCase(), r = v - o, "left" === n && (m = 0), "center" === n && (m = .5 * r), "bottom" === n && (m = r), -1 !== n.indexOf("%") && (n = parseInt(n.replace("%", ""), 10), n > 0 && (m = r * n * .01)), g.hardPixels && (i = a, e = o), c.css({
                                          width: i,
                                          height: e,
                                          "margin-left": Math.floor(h),
                                          "margin-top": Math.floor(m)
                                       }), c.data("sbi_imgLiquid_oldProcessed") || (c.fadeTo(g.fadeInTime, 1), c.data("sbi_imgLiquid_oldProcessed", !0), g.removeBoxBackground && u.css("background-image", "none"), u.addClass("sbi_imgLiquid_nobgSize"), u.addClass("sbi_imgLiquid_ready")), g.onItemFinish && g.onItemFinish(t, u, c), l()
                                    }

                                    function l() {
                                       t === a.length - 1 && a.settings.onFinish && a.settings.onFinish()
                                    }
                                    var g = a.settings,
                                       u = i(this),
                                       c = i("img:first", u);
                                    return c.length ? (c.data("sbi_imgLiquid_settings") ? (u.removeClass("sbi_imgLiquid_error").removeClass("sbi_imgLiquid_ready"), g = i.extend({}, c.data("sbi_imgLiquid_settings"), a.options)) : g = i.extend({}, a.settings, s()), c.data("sbi_imgLiquid_settings", g), g.onItemStart && g.onItemStart(t, u, c), void(sbi_imgLiquid.bgs_Available && g.useBackgroundSize ? e() : o())) : void n()
                                 })
                              }
                           })
                        }(jQuery);
                     ! function () {
                        var css = sbi_imgLiquid.injectCss,
                           head = document.getElementsByTagName('head')[0],
                           style = document.createElement('style');
                        style.type = 'text/css';
                        if (style.styleSheet) {
                           style.styleSheet.cssText = css
                        } else {
                           style.appendChild(document.createTextNode(css))
                        }
                        head.appendChild(style)
                     }();
                     $self.find(".sbi_photo").sbi_imgLiquid({
                        fill: !0
                     })
                  }
                  var sbi_delay = (function () {
                     var sbi_timer = 0;
                     return function (sbi_callback, sbi_ms) {
                        clearTimeout(sbi_timer);
                        sbi_timer = setTimeout(sbi_callback, sbi_ms)
                     }
                  })();
                  jQuery(window).resize(function () {
                     sbi_delay(function () {
                        sbiSetPhotoHeight()
                     }, 500)
                  });

                  function sbiSetPhotoHeight() {
                     if (imgRes !== 'thumbnail') {
                        var sbi_photo_width = $self.find('.sbi_photo').eq(0).innerWidth();
                        var sbi_num_cols = parseInt(cols);
                        if (!$self.hasClass('sbi_disable_mobile')) {
                           var sbiWindowWidth = jQuery(window).width();
                           if (sbiWindowWidth < 640 && (parseInt(cols) > 2 && parseInt(cols) < 7)) sbi_num_cols = 2;
                           if (sbiWindowWidth < 640 && (parseInt(cols) > 6 && parseInt(cols) < 11)) sbi_num_cols = 4;
                           if (sbiWindowWidth <= 480 && parseInt(cols) > 2) sbi_num_cols = 1
                        }
                        var sbi_photo_width_manual = ($self.find('#sbi_images').width() / sbi_num_cols) - (feedOptions.imagepadding * 2);
                        if (sbi_photo_width <= (sbi_photo_width_manual)) sbi_photo_width = sbi_photo_width_manual;
                        $self.find('.sbi_photo').css('height', sbi_photo_width)
                     }
                  }
                  sbiSetPhotoHeight();
                  ! function (i) {
                     var n = {
                           callback: function () {},
                           runOnLoad: !0,
                           frequency: 100,
                           sbiPreviousVisibility: null
                        },
                        c = {};
                     c.sbiCheckVisibility = function (i, n) {
                        if (jQuery.contains(document, i[0])) {
                           var e = n.sbiPreviousVisibility,
                              t = i.is(":visible");
                           n.sbiPreviousVisibility = t, null == e ? n.runOnLoad && n.callback(i, t) : e !== t && n.callback(i, t), setTimeout(function () {
                              c.sbiCheckVisibility(i, n)
                           }, n.frequency)
                        }
                     }, i.fn.sbiVisibilityChanged = function (e) {
                        var t = i.extend({}, n, e);
                        return this.each(function () {
                           c.sbiCheckVisibility(i(this), t)
                        })
                     }
                  }(jQuery);
                  jQuery(".sbi").filter(':hidden').sbiVisibilityChanged({
                     callback: function (element, visible) {
                        sbiSetPhotoHeight()
                     },
                     runOnLoad: !1
                  });
                  jQuery('#sb_instagram .sbi_photo').each(function () {
                     $sbi_photo = jQuery(this);
                     $sbi_photo.hover(function () {
                        jQuery(this).fadeTo(200, 0.85)
                     }, function () {
                        jQuery(this).stop().fadeTo(500, 1)
                     });
                     if ($sbi_photo.closest('.sbi_item').hasClass('sbi_type_video')) {
                        if (!$sbi_photo.find('.sbi_playbtn').length) $sbi_photo.append('<i class="fa fa-play sbi_playbtn"></i>')
                     }
                  });
                  $self.find('#sbi_images .sbi_item.sbi_new').sort(function (a, b) {
                     var aComp = jQuery(a).data('date'),
                        bComp = jQuery(b).data('date');
                     if (sortby == 'none') {
                        return bComp - aComp
                     } else {
                        return (Math.round(Math.random()) - 0.5)
                     }
                  }).appendTo($self.find("#sbi_images"));
                  setTimeout(function () {
                     jQuery('#sbi_images .sbi_item.sbi_new').removeClass('sbi_new');
                     morePosts = []
                  }, 500);

                  function sbiGetItemSize() {
                     $self.removeClass('sbi_small sbi_medium');
                     var sbiItemWidth = $self.find('.sbi_item').innerWidth();
                     if (sbiItemWidth > 120 && sbiItemWidth < 240) {
                        $self.addClass('sbi_medium')
                     } else if (sbiItemWidth <= 120) {
                        $self.addClass('sbi_small')
                     }
                  }
                  sbiGetItemSize()
               },
               error: function (data) {
                  var sbiErrorMsg = '',
                     sbiErrorDir = '';
                  if (data.indexOf('access_token') > -1) {
                     sbiErrorMsg += '<p><b>Error: Access Token is not valid</b><br /><span>This error message is only visible to WordPress admins</span>';
                     sbiErrorDir = "<p>There's an issue with the Instagram Access Token that you are using. Please obtain a new Access Token on the plugin's Settings page.<br />If you continue to have an issue with your Access Token then please see <a href='//smashballoon.com/my-instagram-access-token-keep-expiring/' target='_blank'>this FAQ</a> for more information."
                  } else if (data.indexOf('user does not exist') > -1) {
                     sbiErrorMsg += '<p><b>Error: The User ID does not exist</b><br /><span>This error is only visible to WordPress admins</span>';
                     sbiErrorDir = "<p>Please double check the Instagram User ID that you are using. To find your User ID simply enter your Instagram user name into this <a href='//www.otzberg.net/iguserid/' target='_blank'>tool</a>.</p>"
                  }
                  if (looparray.length < 2) jQuery('#sb_instagram').empty().append('<p style="text-align: center;">Unable to show Instagram photos</p><div id="sbi_mod_error">' + sbiErrorMsg + sbiErrorDir + '</div>')
               }
            });
            $loadBtn.click(function () {
               userFeed.next()
            });
            userFeed.run()
         })
      })
   }
   jQuery(document).ready(function () {
      sbi_init()
   })
};
jQuery(document).ready(function ($) {
   $("select.has_parent").each(function (index) {
      var $child = $(this);
      if ($("#ril_" + $(this).data("parent")).length > 0) {
         var $parent = $("#ril_" + $(this).data("parent"));
         $parent.change(function () {
            var value = $(this).find("option:selected").val();
            $.ajax({
               type: 'POST',
               url: siteData.ajaxurl,
               data: {
                  action: 'getAjaxSelect',
                  child_name: $child.attr("name"),
                  parent: value
               },
               success: function (html) {
                  $child.html(html)
               }
            })
         })
      }
   });
   if ($('.ril-item-list').length > 0) {
      var $grid = $('.ril-item-list').isotope({
         filter: "." + $("#ril_country option:selected").val()
      }, function ($changedItems, instance) {
         instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
         alert((instance.$allAtoms.filter('.isotope-hidden')).length);
         instance.$filteredAtoms.addClass('is-filtered')
      });
      changeGridColor()
   }
   $(".ril-filter-form").submit(function (e) {
      e.preventDefault();
      console.log($(".ril_city option:selected").val());
      var test;
      if ($("#ril_city option:selected").val()) {
         test = $grid.isotope({
            filter: "." + $("#ril_city option:selected").val()
         });
         changeGridColor()
      } else if ($("#ril_country option:selected").val()) {
         test = $grid.isotope({
            filter: "." + $("#ril_country option:selected").val()
         });
         changeGridColor()
      } else {
         test = $grid.isotope({
            filter: ""
         });
         changeGridColor()
      }
      return !1
   })

   function changeGridColor() {
      var elems = $grid.isotope('getFilteredItemElements');
      var i = 1;
      var delta = 0;
      var maxDelta = 1;
      var maxi = 4;
      if ($(window).width() <= 1100) {
         maxDelta = 2;
         maxi = 3
      }
      if ($(window).width() <= 750) {
         maxDelta = 3;
         maxi = 2
      }
      if ($(window).width() <= 500) {
         maxDelta = 4;
         maxi = 1
      }
      $(elems).each(function (index) {
         if ((index + delta) % 2 == 0) {
            $(this).css("background", "#eee")
         } else {
            $(this).css("background", "#f4f4f4")
         }
         if (i == maxi) {
            if (delta == 0) {
               delta = maxDelta
            } else {
               delta = 0
            }
            i = 1
         } else {
            i++
         }
      })
   }
}); /*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */

(function ($, window, undefined) {
   'use strict';
   var Modernizr = window.Modernizr,
      $body = $('body');
   $.DLMenu = function (options, element) {
      this.$el = $(element);
      this._init(options)
   };
   $.DLMenu.defaults = {
      animationClasses: {
         classin: 'dl-animate-in-1',
         classout: 'dl-animate-out-1'
      },
      onLevelClick: function (el, name) {
         return !1
      },
      onLinkClick: function (el, ev) {
         return !1
      }
   };
   $.DLMenu.prototype = {
      _init: function (options) {
         this.options = $.extend(!0, {}, $.DLMenu.defaults, options);
         this._config();
         var animEndEventNames = {
               'WebkitAnimation': 'webkitAnimationEnd',
               'OAnimation': 'oAnimationEnd',
               'msAnimation': 'MSAnimationEnd',
               'animation': 'animationend'
            },
            transEndEventNames = {
               'WebkitTransition': 'webkitTransitionEnd',
               'MozTransition': 'transitionend',
               'OTransition': 'oTransitionEnd',
               'msTransition': 'MSTransitionEnd',
               'transition': 'transitionend'
            };
         this.animEndEventName = animEndEventNames[Modernizr.prefixed('animation')] + '.dlmenu';
         this.transEndEventName = transEndEventNames[Modernizr.prefixed('transition')] + '.dlmenu', this.supportAnimations = Modernizr.cssanimations, this.supportTransitions = Modernizr.csstransitions;
         this._initEvents()
      },
      _config: function () {
         this.open = !1;
         this.$trigger = this.$el.children('.dl-trigger');
         this.$menu = this.$el.children('ul.dl-menu');
         this.$menuitems = this.$menu.find('li:not(.dl-back)');
         this.$el.find('ul.dl-submenu').prepend('<li class="dl-back"><a href="#">back</a></li>');
         this.$back = this.$menu.find('li.dl-back')
      },
      _initEvents: function () {
         var self = this;
         this.$trigger.on('click.dlmenu', function () {
            if (self.open) {
               self._closeMenu()
            } else {
               self._openMenu()
            }
            return !1
         });
         this.$menuitems.on('click.dlmenu', function (event) {
            event.stopPropagation();
            var $item = $(this),
               $submenu = $item.children('ul.dl-submenu');
            if ($submenu.length > 0) {
               var $flyin = $submenu.clone().css('opacity', 0).insertAfter(self.$menu),
                  onAnimationEndFn = function () {
                     self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classout).addClass('dl-subview');
                     $item.addClass('dl-subviewopen').parents('.dl-subviewopen:first').removeClass('dl-subviewopen').addClass('dl-subview');
                     $flyin.remove()
                  };
               setTimeout(function () {
                  $flyin.addClass(self.options.animationClasses.classin);
                  self.$menu.addClass(self.options.animationClasses.classout);
                  if (self.supportAnimations) {
                     self.$menu.on(self.animEndEventName, onAnimationEndFn)
                  } else {
                     onAnimationEndFn.call()
                  }
                  self.options.onLevelClick($item, $item.children('a:first').text())
               });
               return !1
            } else {
               self.options.onLinkClick($item, event)
            }
         });
         this.$back.on('click.dlmenu', function (event) {
            var $this = $(this),
               $submenu = $this.parents('ul.dl-submenu:first'),
               $item = $submenu.parent(),
               $flyin = $submenu.clone().insertAfter(self.$menu);
            var onAnimationEndFn = function () {
               self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classin);
               $flyin.remove()
            };
            setTimeout(function () {
               $flyin.addClass(self.options.animationClasses.classout);
               self.$menu.addClass(self.options.animationClasses.classin);
               if (self.supportAnimations) {
                  self.$menu.on(self.animEndEventName, onAnimationEndFn)
               } else {
                  onAnimationEndFn.call()
               }
               $item.removeClass('dl-subviewopen');
               var $subview = $this.parents('.dl-subview:first');
               if ($subview.is('li')) {
                  $subview.addClass('dl-subviewopen')
               }
               $subview.removeClass('dl-subview')
            });
            return !1
         })
      },
      closeMenu: function () {
         if (this.open) {
            this._closeMenu()
         }
      },
      _closeMenu: function () {
         var self = this,
            onTransitionEndFn = function () {
               self.$menu.off(self.transEndEventName);
               self._resetMenu()
            };
         this.$menu.removeClass('dl-menuopen');
         this.$menu.addClass('dl-menu-toggle');
         this.$trigger.removeClass('dl-active');
         if (this.supportTransitions) {
            this.$menu.on(this.transEndEventName, onTransitionEndFn)
         } else {
            onTransitionEndFn.call()
         }
         this.open = !1
      },
      openMenu: function () {
         if (!this.open) {
            this._openMenu()
         }
      },
      _openMenu: function () {
         var self = this;
         $body.off('click').on('click.dlmenu', function () {
            self._closeMenu()
         });
         this.$menu.addClass('dl-menuopen dl-menu-toggle').on(this.transEndEventName, function () {
            $(this).removeClass('dl-menu-toggle')
         });
         this.$trigger.addClass('dl-active');
         this.open = !0
      },
      _resetMenu: function () {
         this.$menu.removeClass('dl-subview');
         this.$menuitems.removeClass('dl-subview dl-subviewopen')
      }
   };
   var logError = function (message) {
      if (window.console) {
         window.console.error(message)
      }
   };
   $.fn.dlmenu = function (options) {
      if (typeof options === 'string') {
         var args = Array.prototype.slice.call(arguments, 1);
         this.each(function () {
            var instance = $.data(this, 'dlmenu');
            if (!instance) {
               logError("cannot call methods on dlmenu prior to initialization; " + "attempted to call method '" + options + "'");
               return
            }
            if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
               logError("no such method '" + options + "' for dlmenu instance");
               return
            }
            instance[options].apply(instance, args)
         })
      } else {
         this.each(function () {
            var instance = $.data(this, 'dlmenu');
            if (instance) {
               instance._init()
            } else {
               instance = $.data(this, 'dlmenu', new $.DLMenu(options, this))
            }
         })
      }
      return this
   }
})(jQuery, window);
var intervalID;
(function ($) {
   var supportTouch = $.support.touch,
      scrollEvent = "touchmove scroll",
      touchStartEvent = supportTouch ? "touchstart" : "mousedown",
      touchStopEvent = supportTouch ? "touchend" : "mouseup",
      touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
   $.event.special.swipeupdown = {
      setup: function () {
         var thisObject = this;
         var $this = $(thisObject);
         $this.bind(touchStartEvent, function (event) {
            var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
               start = {
                  time: (new Date).getTime(),
                  coords: [data.pageX, data.pageY],
                  origin: $(event.target)
               },
               stop;

            function moveHandler(event) {
               if (!start) {
                  return
               }
               var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
               stop = {
                  time: (new Date).getTime(),
                  coords: [data.pageX, data.pageY]
               };
               if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                  event.preventDefault()
               }
            }
            $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent, function (event) {
               $this.unbind(touchMoveEvent, moveHandler);
               if (start && stop) {
                  if (stop.time - start.time < 1000 && Math.abs(start.coords[1] - stop.coords[1]) > 30 && Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                     start.origin.trigger("swipeupdown").trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown")
                  }
               }
               start = stop = undefined
            })
         })
      }
   };
   $.each({
      swipedown: "swipeupdown",
      swipeup: "swipeupdown"
   }, function (event, sourceEvent) {
      $.event.special[event] = {
         setup: function () {
            $(this).bind(sourceEvent, $.noop)
         }
      }
   })
})(jQuery);
var PageTransitions = (function ($) {
   var $main = $('#pt-main'),
      $pages = $main.children('div.pt-page'),
      pagesCount = $pages.length,
      current = 0,
      pagesShow = 9,
      pitemChange = 30,
      isAnimating = !1,
      endCurrPage = !1,
      endNextPage = !1,
      animEndEventNames = {
         'WebkitAnimation': 'webkitAnimationEnd',
         'OAnimation': 'oAnimationEnd',
         'msAnimation': 'MSAnimationEnd',
         'animation': 'animationend'
      },
      animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
      support = Modernizr.cssanimations;

   function init() {
      $pages.each(function () {
         var $page = $(this);
         $page.data('originalClassList', $page.attr('class'))
      });
      $pages.eq(current).addClass('pt-page-current');
      initScrollEvents();
      $('.p-item[data-slide_id="' + (current + 1) + '"]').addClass("current");
      if (PTSettings.loop == "1") {
         var inf = 4;
         for (var i = 0; i <= inf; i++) {
            $(".p-container").prepend($(".p-item").eq($(".p-item").length - i).clone().removeClass("current normal").addClass("clone"))
         }
      }
      var inf = 3;
      var normalIndex = 0;
      for (var i = 0; i <= inf; i++) {
         if (normalIndex >= $(".p-item.normal").length) normalIndex = 0;
         $(".p-container").append($(".p-item.normal").eq(normalIndex).clone().removeClass("current normal").addClass("clone"));
         normalIndex++
      }
      $(".next").click(function () {
         nextPage(13)
      });
      $(".prev").click(function () {
         prevPage(12)
      });
      $(".p-item").click(function () {
         clearInterval(intervalID);
         var activeIndex = $(".p-item.current").index();
         var indexclick = $(this).index();
         var action = "";
         var dChange = indexclick - activeIndex;
         if (dChange < 0) {
            action = "+="
         } else if (dChange > 0) {
            action = "-="
         } else {
            return
         }
         var _this = $(this);
         var dChangemodule = Math.abs(dChange)
         $(this).data("slide_id");
         toPage(12, $(this).data("slide_id"));
         jQuery(".p-container").animate({
            "margin-top": action + "" + (pitemChange * dChangemodule),
         }, 800, function () {
            var $prev = _this;
            $('.p-item').removeClass("current");
            $prev.addClass("current");
            if (dChange > 0) {
               if (!$('.p-item').eq($prev.index() + 4).length) {
                  $('.p-item[data-slide_id="' + ($prev.data("slide_id")) + '"].normal').addClass("current");
                  var margin = -60 - (($prev.data("slide_id") - 1) * pitemChange);
                  jQuery(".p-container").css("margin-top", margin + "px");
                  $prev.removeClass("current")
               }
            } else if (dChange < 0) {
               console.log("not found");
               console.log($('.p-item:nth-child(' + ($prev.index() - 2) + ')'));
               if (!$('.p-item:nth-child(' + ($prev.index() - 2) + ')').length) {
                  $('.p-item[data-slide_id="' + ($prev.data("slide_id")) + '"].normal').addClass("current");
                  var margin = -60 - (($prev.data("slide_id") - 1) * pitemChange);
                  jQuery(".p-container").css("margin-top", margin + "px");
                  $prev.removeClass("current")
               }
            }
         })
      })
      if (PTSettings.autoslide == "yes") {
         initAutoSlide()
      }
   }

   function initAutoSlide() {
      console.log("initAutoSlide");
      console.log(PTSettings.autoslideduration);
      intervalID = setInterval(function () {
         nextPage(PTSettings.f_effect)
      }, PTSettings.autoslideduration)
   }

   function initScrollEvents() {
      console.log("initScrollEvents");
      jQuery(window).on('mousewheel DOMMouseScroll keydown', function (event) {
         if (jQuery(".pt-slider").length == 0) return;
         event.stopPropagation();
         // console.log('scroll event fired');
         // console.log(event.keyCode);
         // console.log(event.originalEvent.wheelDelta);
         // console.log(event.originalEvent.detail);
         var delta = 0;
         if (event.originalEvent.detail) {
            delta = event.originalEvent.detail * -40
         } else {
            delta = event.originalEvent.wheelDelta
         }
         if (event.keyCode == 40) {
            console.log(1);
            event.preventDefault();
            nextPage(PTSettings.f_effect)
         }
         if ((delta / 120 < 0)) {
            console.log(2);
            event.preventDefault();
            nextPage(PTSettings.f_effect)
         }
         if (event.keyCode == 38) {
            event.preventDefault();
            prevPage(PTSettings.b_effect)
         }
         if ((delta / 120 > 0)) {
            event.preventDefault();
            prevPage(PTSettings.b_effect)
         }
      });
      if (jQuery(window).width() <= 768) {
         jQuery("#pt-main").on("swipedown", function (event) {
            console.log(123);
            prevPage(PTSettings.b_effect)
         })
         jQuery("#pt-main").on("swipeup", function (event) {
            nextPage(PTSettings.f_effect)
         })
      }
   }

   function nextPage(options) {
      var animation = (options.animation) ? options.animation : options;
      animation = parseInt(PTSettings.f_effect);
      if (isAnimating) {
         return !1
      }
      isAnimating = !0;
      var $currPage = $pages.eq(current);
      if (options.showPage) {
         if (options.showPage < pagesCount - 1) {
            current = options.showPage
         } else {
            current = 0
         }
      } else {
         if (current < pagesCount - 1) {
            ++current
         } else {
            current = 0
         }
      }
      var $nextPage = $pages.eq(current).addClass('pt-page-current'),
         outClass = '',
         inClass = '';
      var animationClasses = getAnimationClasses(animation);
      outClass = animationClasses.outClass;
      inClass = animationClasses.inClass;
      $currPage.addClass(outClass).on(animEndEventName, function () {
         $currPage.off(animEndEventName);
         endCurrPage = !0;
         if (endNextPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      $nextPage.addClass(inClass).on(animEndEventName, function () {
         $nextPage.off(animEndEventName);
         endNextPage = !0;
         if (endCurrPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      if (!support) {
         onEndAnimation($currPage, $nextPage)
      }
      jQuery(".p-container").animate({
         "margin-top": "+=-" + pitemChange,
      }, 800, function () {
         var $next = jQuery(".p-item.current").next();
         $('.p-item').removeClass("current");
         $next.addClass("current");
         if (!$('.p-item').eq($next.index() + 4).length) {
            $('.p-item[data-slide_id="' + (current + 1) + '"].normal').addClass("current");
            jQuery(".p-container").css("margin-top", "-60px");
            $next.removeClass("current")
         }
      })
   }

   function prevPage(animation) {
      if ((isAnimating)) {
         return !1
      }
      animation = parseInt(PTSettings.b_effect);
      isAnimating = !0;
      var $currPage = $pages.eq(current);
      if (current != 0) {
         --current
      } else {
         current = pagesCount - 1
      }
      var $nextPage = $pages.eq(current).addClass('pt-page-current'),
         outClass = '',
         inClass = '';
      var animationClasses = getAnimationClasses(animation);
      outClass = animationClasses.outClass;
      inClass = animationClasses.inClass;
      $currPage.addClass(outClass).on(animEndEventName, function () {
         $currPage.off(animEndEventName);
         endCurrPage = !0;
         if (endNextPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      $nextPage.addClass(inClass).on(animEndEventName, function () {
         $nextPage.off(animEndEventName);
         endNextPage = !0;
         if (endCurrPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      if (!support) {
         onEndAnimation($currPage, $nextPage)
      }
      jQuery(".p-container").animate({
         "margin-top": "+=" + pitemChange,
      }, 800, function () {
         var $prev = jQuery(".p-item.current").prev();
         $('.p-item').removeClass("current");
         $prev.addClass("current");
         console.log($prev.index());
         console.log($('.p-item:nth-child(' + ($prev.index() - 2) + ')'));
         if (!$('.p-item:nth-child(' + ($prev.index() - 2) + ')').length) {
            $('.p-item[data-slide_id="' + (current + 1) + '"].normal').addClass("current");
            var margin = -60 - (($prev.data("slide_id") - 1) * pitemChange);
            jQuery(".p-container").css("margin-top", margin + "px");
            $prev.removeClass("current")
         }
      })
   }

   function toPage(animation, page) {
      if (isAnimating) {
         return !1
      }
      console.log(page);
      page = page - 1;
      isAnimating = !0;
      var $currPage = $pages.eq(current);
      if (current < page) {
         animation = parseInt(PTSettings.f_effect)
      } else if (current > page) {
         animation = parseInt(PTSettings.b_effect)
      } else {
         return
      }
      var $nextPage = $pages.eq(page).addClass('pt-page-current');
      var animationClasses = getAnimationClasses(animation);
      var outClass = animationClasses.outClass;
      var inClass = animationClasses.inClass;
      $currPage.addClass(outClass).on(animEndEventName, function () {
         $currPage.off(animEndEventName);
         endCurrPage = !0;
         if (endNextPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      $nextPage.addClass(inClass).on(animEndEventName, function () {
         $nextPage.off(animEndEventName);
         endNextPage = !0;
         if (endCurrPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      if (!support) {
         onEndAnimation($currPage, $nextPage)
      }
      current = page
   }

   // function changePagination() {
   //    jQuery(".p-container").animate({
   //       "margin-top": "+=" + pitemChange,
   //    }, 800, function () {
   //       var $prev = jQuery(".p-item.current").prev();
   //       $('.p-item').removeClass("current");
   //       $prev.addClass("current");
   //       console.log($prev.index());
   //       console.log($('.p-item:nth-child(' + ($prev.index() - 2) + ')'));
   //       if (!$('.p-item:nth-child(' + ($prev.index() - 2) + ')').length) {
   //          $('.p-item[data-slide_id="' + (current + 1) + '"].normal').addClass("current");
   //          jQuery(".p-container").css("margin-top", "-90px");
   //          $prev.removeClass("current")
   //       }
   //    })
   // }

   function onEndAnimation($outpage, $inpage) {
      endCurrPage = !1;
      endNextPage = !1;
      var isMac = /mac/i.test(navigator.platform);
      var setTimeoutTime = 0;
      if (isMac) setTimeoutTime = 400;
      resetPage($outpage, $inpage);
      setTimeout(function () {
         isAnimating = !1
      }, setTimeoutTime)
   }

   function resetPage($outpage, $inpage) {
      $outpage.attr('class', $outpage.data('originalClassList'));
      $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current')
   }

   function getAnimationClasses(animation) {
      var outClass;
      var inClass;
      switch (animation) {
         case 1:
            outClass = 'pt-page-moveToLeft';
            inClass = 'pt-page-moveFromRight';
            break;
         case 2:
            outClass = 'pt-page-moveToRight';
            inClass = 'pt-page-moveFromLeft';
            break;
         case 3:
            outClass = 'pt-page-moveToTop';
            inClass = 'pt-page-moveFromBottom';
            break;
         case 4:
            outClass = 'pt-page-moveToBottom';
            inClass = 'pt-page-moveFromTop';
            break;
         case 5:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
         case 6:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
         case 7:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
         case 8:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
         case 9:
            outClass = 'pt-page-moveToLeftFade';
            inClass = 'pt-page-moveFromRightFade';
            break;
         case 10:
            outClass = 'pt-page-moveToRightFade';
            inClass = 'pt-page-moveFromLeftFade';
            break;
         case 11:
            outClass = 'pt-page-moveToTopFade';
            inClass = 'pt-page-moveFromBottomFade';
            break;
         case 12:
            outClass = 'pt-page-moveToBottomFade';
            inClass = 'pt-page-moveFromTopFade';
            break;
         case 13:
            outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
            inClass = 'pt-page-moveFromRight';
            break;
         case 14:
            outClass = 'pt-page-moveToRightEasing pt-page-ontop';
            inClass = 'pt-page-moveFromLeft';
            break;
         case 15:
            outClass = 'pt-page-moveToTopEasing pt-page-ontop';
            inClass = 'pt-page-moveFromBottom';
            break;
         case 16:
            outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
            inClass = 'pt-page-moveFromTop';
            break;
         case 17:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
         case 18:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
         case 19:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
         case 20:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
         case 21:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-scaleUpDown pt-page-delay300';
            break;
         case 22:
            outClass = 'pt-page-scaleDownUp';
            inClass = 'pt-page-scaleUp pt-page-delay300';
            break;
         case 23:
            outClass = 'pt-page-moveToLeft pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 24:
            outClass = 'pt-page-moveToRight pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 25:
            outClass = 'pt-page-moveToTop pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 26:
            outClass = 'pt-page-moveToBottom pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 27:
            outClass = 'pt-page-scaleDownCenter';
            inClass = 'pt-page-scaleUpCenter pt-page-delay400';
            break;
         case 28:
            outClass = 'pt-page-rotateRightSideFirst';
            inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
            break;
         case 29:
            outClass = 'pt-page-rotateLeftSideFirst';
            inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
            break;
         case 30:
            outClass = 'pt-page-rotateTopSideFirst';
            inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
            break;
         case 31:
            outClass = 'pt-page-rotateBottomSideFirst';
            inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
            break;
         case 32:
            outClass = 'pt-page-flipOutRight';
            inClass = 'pt-page-flipInLeft pt-page-delay500';
            break;
         case 33:
            outClass = 'pt-page-flipOutLeft';
            inClass = 'pt-page-flipInRight pt-page-delay500';
            break;
         case 34:
            outClass = 'pt-page-flipOutTop';
            inClass = 'pt-page-flipInBottom pt-page-delay500';
            break;
         case 35:
            outClass = 'pt-page-flipOutBottom';
            inClass = 'pt-page-flipInTop pt-page-delay500';
            break;
         case 36:
            outClass = 'pt-page-rotateFall pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 37:
            outClass = 'pt-page-rotateOutNewspaper';
            inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
            break;
         case 38:
            outClass = 'pt-page-rotatePushLeft';
            inClass = 'pt-page-moveFromRight';
            break;
         case 39:
            outClass = 'pt-page-rotatePushRight';
            inClass = 'pt-page-moveFromLeft';
            break;
         case 40:
            outClass = 'pt-page-rotatePushTop';
            inClass = 'pt-page-moveFromBottom';
            break;
         case 41:
            outClass = 'pt-page-rotatePushBottom';
            inClass = 'pt-page-moveFromTop';
            break;
         case 42:
            outClass = 'pt-page-rotatePushLeft';
            inClass = 'pt-page-rotatePullRight pt-page-delay180';
            break;
         case 43:
            outClass = 'pt-page-rotatePushRight';
            inClass = 'pt-page-rotatePullLeft pt-page-delay180';
            break;
         case 44:
            outClass = 'pt-page-rotatePushTop';
            inClass = 'pt-page-rotatePullBottom pt-page-delay180';
            break;
         case 45:
            outClass = 'pt-page-rotatePushBottom';
            inClass = 'pt-page-rotatePullTop pt-page-delay180';
            break;
         case 46:
            outClass = 'pt-page-rotateFoldLeft';
            inClass = 'pt-page-moveFromRightFade';
            break;
         case 47:
            outClass = 'pt-page-rotateFoldRight';
            inClass = 'pt-page-moveFromLeftFade';
            break;
         case 48:
            outClass = 'pt-page-rotateFoldTop';
            inClass = 'pt-page-moveFromBottomFade';
            break;
         case 49:
            outClass = 'pt-page-rotateFoldBottom';
            inClass = 'pt-page-moveFromTopFade';
            break;
         case 50:
            outClass = 'pt-page-moveToRightFade';
            inClass = 'pt-page-rotateUnfoldLeft';
            break;
         case 51:
            outClass = 'pt-page-moveToLeftFade';
            inClass = 'pt-page-rotateUnfoldRight';
            break;
         case 52:
            outClass = 'pt-page-moveToBottomFade';
            inClass = 'pt-page-rotateUnfoldTop';
            break;
         case 53:
            outClass = 'pt-page-moveToTopFade';
            inClass = 'pt-page-rotateUnfoldBottom';
            break;
         case 54:
            outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomLeftIn';
            break;
         case 55:
            outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomRightIn';
            break;
         case 56:
            outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomTopIn';
            break;
         case 57:
            outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomBottomIn';
            break;
         case 58:
            outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeLeftIn';
            break;
         case 59:
            outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeRightIn';
            break;
         case 60:
            outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeTopIn';
            break;
         case 61:
            outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeBottomIn';
            break;
         case 62:
            outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselLeftIn';
            break;
         case 63:
            outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselRightIn';
            break;
         case 64:
            outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselTopIn';
            break;
         case 65:
            outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselBottomIn';
            break;
         case 66:
            outClass = 'pt-page-rotateSidesOut';
            inClass = 'pt-page-rotateSidesIn pt-page-delay200';
            break;
         case 67:
            outClass = 'pt-page-rotateSlideOut';
            inClass = 'pt-page-rotateSlideIn';
            break
      }
      return {
         outClass: outClass,
         inClass: inClass
      }
   }
   init();

   function test() {
      jQuery(".p-container").animate({
         "margin-top": "-150px",
      }, 800, function () {
         jQuery(".p-container").css("margin-top", "-60px")
      })
   }
   return {
      init: init,
      nextPage: nextPage,
      prevPage: prevPage,
      test: test,
   }
})(jQuery);