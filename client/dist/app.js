/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Vue = __webpack_require__(1);

	__webpack_require__(3);  // Just Initializing


	new Vue(__webpack_require__(7)).$mount('#app');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * Vue.js v2.4.4
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	/*  */

	// these helpers produces better vm code in JS engines due to their
	// explicitness and function inlining
	function isUndef (v) {
	  return v === undefined || v === null
	}

	function isDef (v) {
	  return v !== undefined && v !== null
	}

	function isTrue (v) {
	  return v === true
	}

	function isFalse (v) {
	  return v === false
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return (
	    typeof value === 'string' ||
	    typeof value === 'number' ||
	    typeof value === 'boolean'
	  )
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	var _toString = Object.prototype.toString;

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	function isPlainObject (obj) {
	  return _toString.call(obj) === '[object Object]'
	}

	function isRegExp (v) {
	  return _toString.call(v) === '[object RegExp]'
	}

	/**
	 * Check if val is a valid array index.
	 */
	function isValidArrayIndex (val) {
	  var n = parseFloat(val);
	  return n >= 0 && Math.floor(n) === n && isFinite(val)
	}

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Check if a attribute is a reserved attribute.
	 */
	var isReservedAttribute = makeMap('key,ref,slot,is');

	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '-$1').toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 * Stubbing args to make Flow happy without leaving useless transpiled code
	 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
	 */
	function noop (a, b, c) {}

	/**
	 * Always return false.
	 */
	var no = function (a, b, c) { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */


	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  if (a === b) { return true }
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      var isArrayA = Array.isArray(a);
	      var isArrayB = Array.isArray(b);
	      if (isArrayA && isArrayB) {
	        return a.length === b.length && a.every(function (e, i) {
	          return looseEqual(e, b[i])
	        })
	      } else if (!isArrayA && !isArrayB) {
	        var keysA = Object.keys(a);
	        var keysB = Object.keys(b);
	        return keysA.length === keysB.length && keysA.every(function (key) {
	          return looseEqual(a[key], b[key])
	        })
	      } else {
	        /* istanbul ignore next */
	        return false
	      }
	    } catch (e) {
	      /* istanbul ignore next */
	      return false
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn.apply(this, arguments);
	    }
	  }
	}

	var SSR_ATTR = 'data-server-rendered';

	var ASSET_TYPES = [
	  'component',
	  'directive',
	  'filter'
	];

	var LIFECYCLE_HOOKS = [
	  'beforeCreate',
	  'created',
	  'beforeMount',
	  'mounted',
	  'beforeUpdate',
	  'updated',
	  'beforeDestroy',
	  'destroyed',
	  'activated',
	  'deactivated'
	];

	/*  */

	var config = ({
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: process.env.NODE_ENV !== 'production',

	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Whether to record perf
	   */
	  performance: false,

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Warn handler for watcher warns
	   */
	  warnHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if an attribute is reserved so that it cannot be used as a component
	   * prop. This is platform-dependent and may be overwritten.
	   */
	  isReservedAttr: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * Exposed for legacy reasons
	   */
	  _lifecycleHooks: LIFECYCLE_HOOKS
	});

	/*  */

	var emptyObject = Object.freeze({});

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}

	/*  */

	var warn = noop;
	var tip = noop;
	var formatComponentName = (null); // work around flow check

	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };

	  warn = function (msg, vm) {
	    var trace = vm ? generateComponentTrace(vm) : '';

	    if (config.warnHandler) {
	      config.warnHandler.call(null, msg, vm, trace);
	    } else if (hasConsole && (!config.silent)) {
	      console.error(("[Vue warn]: " + msg + trace));
	    }
	  };

	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + (
	        vm ? generateComponentTrace(vm) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var name = typeof vm === 'string'
	      ? vm
	      : typeof vm === 'function' && vm.options
	        ? vm.options.name
	        : vm._isVue
	          ? vm.$options.name || vm.$options._componentTag
	          : vm.name;

	    var file = vm._isVue && vm.$options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }

	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };

	  var repeat = function (str, n) {
	    var res = '';
	    while (n) {
	      if (n % 2 === 1) { res += str; }
	      if (n > 1) { str += str; }
	      n >>= 1;
	    }
	    return res
	  };

	  var generateComponentTrace = function (vm) {
	    if (vm._isVue && vm.$parent) {
	      var tree = [];
	      var currentRecursiveSequence = 0;
	      while (vm) {
	        if (tree.length > 0) {
	          var last = tree[tree.length - 1];
	          if (last.constructor === vm.constructor) {
	            currentRecursiveSequence++;
	            vm = vm.$parent;
	            continue
	          } else if (currentRecursiveSequence > 0) {
	            tree[tree.length - 1] = [last, currentRecursiveSequence];
	            currentRecursiveSequence = 0;
	          }
	        }
	        tree.push(vm);
	        vm = vm.$parent;
	      }
	      return '\n\nfound in\n\n' + tree
	        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
	            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
	            : formatComponentName(vm))); })
	        .join('\n')
	    } else {
	      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
	    }
	  };
	}

	/*  */

	function handleError (err, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler.call(null, err, vm, info);
	  } else {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

	// Firefox has a "watch" function on Object.prototype...
	var nativeWatch = ({}).watch;

	var supportsPassive = false;
	if (inBrowser) {
	  try {
	    var opts = {};
	    Object.defineProperty(opts, 'passive', ({
	      get: function get () {
	        /* istanbul ignore next */
	        supportsPassive = true;
	      }
	    })); // https://github.com/facebook/flow/issues/285
	    window.addEventListener('test-passive', null, opts);
	  } catch (e) {}
	}

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	}

	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) {
	        try {
	          cb.call(ctx);
	        } catch (e) {
	          handleError(e, ctx, 'nextTick');
	        }
	      } else if (_resolve) {
	        _resolve(ctx);
	      }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve, reject) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var args = [], len = arguments.length;
	    while ( len-- ) args[ len ] = arguments[ len ];

	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src, keys) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter,
	  shallow
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = !shallow && observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	          if (Array.isArray(value)) {
	            dependArray(value);
	          }
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = !shallow && observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(target, key)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	function mergeDataOrFn (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        typeof childVal === 'function' ? childVal.call(this) : childVal,
	        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : parentVal;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}

	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    if (childVal && typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );

	      return parentVal
	    }
	    return mergeDataOrFn.call(this, parentVal, childVal)
	  }

	  return mergeDataOrFn(parentVal, childVal, vm)
	};

	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	LIFECYCLE_HOOKS.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	ASSET_TYPES.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  // work around Firefox's Object.prototype.watch...
	  if (parentVal === nativeWatch) { parentVal = undefined; }
	  if (childVal === nativeWatch) { childVal = undefined; }
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : Array.isArray(child) ? child : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.inject =
	strats.computed = function (parentVal, childVal) {
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  if (childVal) { extend(ret, childVal); }
	  return ret
	};
	strats.provide = mergeDataOrFn;

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize all injections into Object-based format
	 */
	function normalizeInject (options) {
	  var inject = options.inject;
	  if (Array.isArray(inject)) {
	    var normalized = options.inject = {};
	    for (var i = 0; i < inject.length; i++) {
	      normalized[inject[i]] = inject[i];
	    }
	  }
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    checkComponents(child);
	  }

	  if (typeof child === 'function') {
	    child = child.options;
	  }

	  normalizeProps(child);
	  normalizeInject(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined
	  ) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (simpleCheckRE.test(expectedType)) {
	    var t = typeof value;
	    valid = t === expectedType.toLowerCase();
	    // for primitive wrapper objects
	    if (!valid && t === 'object') {
	      valid = value instanceof type;
	    }
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match ? match[1] : ''
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}

	/*  */

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	var mark;
	var measure;

	if (process.env.NODE_ENV !== 'production') {
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions,
	  asyncFactory
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	  this.asyncFactory = asyncFactory;
	  this.asyncMeta = undefined;
	  this.isAsyncPlaceholder = false;
	};

	var prototypeAccessors = { child: {} };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function (text) {
	  if ( text === void 0 ) text = '';

	  var node = new VNode();
	  node.text = text;
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode, deep) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions,
	    vnode.asyncFactory
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isComment = vnode.isComment;
	  cloned.isCloned = true;
	  if (deep && vnode.children) {
	    cloned.children = cloneVNodes(vnode.children);
	  }
	  return cloned
	}

	function cloneVNodes (vnodes, deep) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i], deep);
	  }
	  return res
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var passive = name.charAt(0) === '&';
	  name = passive ? name.slice(1) : name;
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  var plain = !(passive || once$$1 || capture);
	  return {
	    name: name,
	    plain: plain,
	    once: once$$1,
	    capture: capture,
	    passive: passive
	  }
	});

	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;

	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      var cloned = fns.slice();
	      for (var i = 0; i < cloned.length; i++) {
	        cloned[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}

	// #6552
	function prioritizePlainEvents (a, b) {
	  return a.plain ? -1 : b.plain ? 1 : 0
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  var toAdd = [];
	  var hasModifier = false;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (!event.plain) { hasModifier = true; }
	    if (isUndef(cur)) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (isUndef(old)) {
	      if (isUndef(cur.fns)) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      event.handler = cur;
	      toAdd.push(event);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  if (toAdd.length) {
	    if (hasModifier) { toAdd.sort(prioritizePlainEvents); }
	    for (var i = 0; i < toAdd.length; i++) {
	      var event$1 = toAdd[i];
	      add(event$1.name, event$1.handler, event$1.once, event$1.capture, event$1.passive);
	    }
	  }
	  for (name in oldOn) {
	    if (isUndef(on[name])) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook) {
	  var invoker;
	  var oldHook = def[hookKey];

	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }

	  if (isUndef(oldHook)) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }

	  invoker.merged = true;
	  def[hookKey] = invoker;
	}

	/*  */

	function extractPropsFromVNodeData (
	  data,
	  Ctor,
	  tag
	) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (isUndef(propOptions)) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  if (isDef(attrs) || isDef(props)) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      if (process.env.NODE_ENV !== 'production') {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && hasOwn(attrs, keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey, false);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (isDef(hash)) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function isTextNode (node) {
	  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (isUndef(c) || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (isTextNode(last)) {
	        // merge adjacent text nodes
	        // this is necessary for SSR hydration because text nodes are
	        // essentially merged when rendered to HTML strings
	        (last).text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (isTextNode(c) && isTextNode(last)) {
	        // merge adjacent text nodes
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (isTrue(children._isVList) &&
	          isDef(c.tag) &&
	          isUndef(c.key) &&
	          isDef(nestedIndex)) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function ensureCtor (comp, base) {
	  if (comp.__esModule && comp.default) {
	    comp = comp.default;
	  }
	  return isObject(comp)
	    ? base.extend(comp)
	    : comp
	}

	function createAsyncPlaceholder (
	  factory,
	  data,
	  context,
	  children,
	  tag
	) {
	  var node = createEmptyVNode();
	  node.asyncFactory = factory;
	  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
	  return node
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  context
	) {
	  if (isTrue(factory.error) && isDef(factory.errorComp)) {
	    return factory.errorComp
	  }

	  if (isDef(factory.resolved)) {
	    return factory.resolved
	  }

	  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	    return factory.loadingComp
	  }

	  if (isDef(factory.contexts)) {
	    // already pending
	    factory.contexts.push(context);
	  } else {
	    var contexts = factory.contexts = [context];
	    var sync = true;

	    var forceRender = function () {
	      for (var i = 0, l = contexts.length; i < l; i++) {
	        contexts[i].$forceUpdate();
	      }
	    };

	    var resolve = once(function (res) {
	      // cache resolved
	      factory.resolved = ensureCtor(res, baseCtor);
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        forceRender();
	      }
	    });

	    var reject = once(function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	      if (isDef(factory.errorComp)) {
	        factory.error = true;
	        forceRender();
	      }
	    });

	    var res = factory(resolve, reject);

	    if (isObject(res)) {
	      if (typeof res.then === 'function') {
	        // () => Promise
	        if (isUndef(factory.resolved)) {
	          res.then(resolve, reject);
	        }
	      } else if (isDef(res.component) && typeof res.component.then === 'function') {
	        res.component.then(resolve, reject);

	        if (isDef(res.error)) {
	          factory.errorComp = ensureCtor(res.error, baseCtor);
	        }

	        if (isDef(res.loading)) {
	          factory.loadingComp = ensureCtor(res.loading, baseCtor);
	          if (res.delay === 0) {
	            factory.loading = true;
	          } else {
	            setTimeout(function () {
	              if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                factory.loading = true;
	                forceRender();
	              }
	            }, res.delay || 200);
	          }
	        }

	        if (isDef(res.timeout)) {
	          setTimeout(function () {
	            if (isUndef(factory.resolved)) {
	              reject(
	                process.env.NODE_ENV !== 'production'
	                  ? ("timeout (" + (res.timeout) + "ms)")
	                  : null
	              );
	            }
	          }, res.timeout);
	        }
	      }
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.loading
	      ? factory.loadingComp
	      : factory.resolved
	  }
	}

	/*  */

	function isAsyncPlaceholder (node) {
	  return node.isComment && node.asyncFactory
	}

	/*  */

	function getFirstComponentChild (children) {
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      var c = children[i];
	      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
	        return c
	      }
	    }
	  }
	}

	/*  */

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add (event, fn, once$$1) {
	  if (once$$1) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$off(event[i], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    if (fn) {
	      // specific handler
	      var cb;
	      var i$1 = cbs.length;
	      while (i$1--) {
	        cb = cbs[i$1];
	        if (cb === fn || cb.fn === fn) {
	          cbs.splice(i$1, 1);
	          break
	        }
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    if (process.env.NODE_ENV !== 'production') {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        try {
	          cbs[i].apply(vm, args);
	        } catch (e) {
	          handleError(e, vm, ("event handler for \"" + event + "\""));
	        }
	      }
	    }
	    return vm
	  };
	}

	/*  */

	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    var data = child.data;
	    // remove slot attribute if the node is resolved as a Vue slot node
	    if (data && data.attrs && data.attrs.slot) {
	      delete data.attrs.slot;
	    }
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	      data && data.slot != null
	    ) {
	      var name = child.data.slot;
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore whitespace
	  if (!defaultSlot.every(isWhitespace)) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	function isWhitespace (node) {
	  return node.isComment || node.text === ' '
	}

	function resolveScopedSlots (
	  fns, // see flow/vnode
	  res
	) {
	  res = res || {};
	  for (var i = 0; i < fns.length; i++) {
	    if (Array.isArray(fns[i])) {
	      resolveScopedSlots(fns[i], res);
	    } else {
	      res[fns[i].key] = fns[i].fn;
	    }
	  }
	  return res
	}

	/*  */

	var activeInstance = null;
	var isUpdatingChildComponent = false;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	      // no need for the ref nodes after initial patch
	      // this prevents keeping a detached DOM tree in memory (#5851)
	      vm.$options._parentElm = vm.$options._refElm = null;
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	  };
	}

	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');

	  var updateComponent;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;

	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure((name + " render"), startTag, endTag);

	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure((name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }

	  vm._watcher = new Watcher(vm, updateComponent, noop);
	  hydrating = false;

	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}

	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    isUpdatingChildComponent = true;
	  }

	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );

	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;

	  // update $attrs and $listeners hash
	  // these are also reactive so they may trigger child update if the child
	  // used them during render
	  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
	  vm.$listeners = listeners || emptyObject;

	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }

	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    isUpdatingChildComponent = false;
	  }
	}

	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}

	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive === null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}

	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */


	var MAX_UPDATE_COUNT = 100;

	var queue = [];
	var activatedChildren = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  index = queue.length = activatedChildren.length = 0;
	  has = {};
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > MAX_UPDATE_COUNT) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // keep copies of post queues before resetting state
	  var activatedQueue = activatedChildren.slice();
	  var updatedQueue = queue.slice();

	  resetSchedulerState();

	  // call component updated and activated hooks
	  callActivatedHooks(activatedQueue);
	  callUpdatedHooks(updatedQueue);

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}

	function callUpdatedHooks (queue) {
	  var i = queue.length;
	  while (i--) {
	    var watcher = queue[i];
	    var vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }
	}

	/**
	 * Queue a kept-alive component that was activated during patch.
	 * The queue will be processed after the entire tree has been patched.
	 */
	function queueActivatedComponent (vm) {
	  // setting _inactive to false here so that a render function can
	  // rely on checking whether it's in an inactive tree (e.g. router-view)
	  vm._inactive = false;
	  activatedChildren.push(vm);
	}

	function callActivatedHooks (queue) {
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]._inactive = true;
	    activateChildComponent(queue[i], true /* true */);
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i > index && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(i + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = process.env.NODE_ENV !== 'production'
	    ? expOrFn.toString()
	    : '';
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  try {
	    value = this.getter.call(vm, vm);
	  } catch (e) {
	    if (this.user) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    } else {
	      throw e
	    }
	  } finally {
	    // "touch" every property so they are all tracked as
	    // dependencies for deep watching
	    if (this.deep) {
	      traverse(value);
	    }
	    popTarget();
	    this.cleanupDeps();
	  }
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch && opts.watch !== nativeWatch) {
	    initWatch(vm, opts.watch);
	  }
	}

	function checkOptionType (vm, name) {
	  var option = vm.$options[name];
	  if (!isPlainObject(option)) {
	    warn(
	      ("component option \"" + name + "\" should be an object."),
	      vm
	    );
	  }
	}

	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(props, key, value, function () {
	        if (vm.$parent && !isUpdatingChildComponent) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    } else {
	      defineReactive$$1(props, key, value);
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };

	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var methods = vm.$options.methods;
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    if (process.env.NODE_ENV !== 'production') {
	      if (methods && hasOwn(methods, key)) {
	        warn(
	          ("Method \"" + key + "\" has already been defined as a data property."),
	          vm
	        );
	      }
	    }
	    if (props && hasOwn(props, key)) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + key + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(key)) {
	      proxy(vm, "_data", key);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	function getData (data, vm) {
	  try {
	    return data.call(vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  }
	}

	var computedWatcherOptions = { lazy: true };

	function initComputed (vm, computed) {
	  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'computed');
	  var watchers = vm._computedWatchers = Object.create(null);
	  // computed properties are just getters during SSR
	  var isSSR = isServerRendering();

	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    if (process.env.NODE_ENV !== 'production' && getter == null) {
	      warn(
	        ("Getter is missing for computed property \"" + key + "\"."),
	        vm
	      );
	    }

	    if (!isSSR) {
	      // create internal watcher for the computed property.
	      watchers[key] = new Watcher(
	        vm,
	        getter || noop,
	        noop,
	        computedWatcherOptions
	      );
	    }

	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    } else if (process.env.NODE_ENV !== 'production') {
	      if (key in vm.$data) {
	        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
	      } else if (vm.$options.props && key in vm.$options.props) {
	        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
	      }
	    }
	  }
	}

	function defineComputed (
	  target,
	  key,
	  userDef
	) {
	  var shouldCache = !isServerRendering();
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = shouldCache
	      ? createComputedGetter(key)
	      : userDef;
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? shouldCache && userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  if (process.env.NODE_ENV !== 'production' &&
	      sharedPropertyDefinition.set === noop) {
	    sharedPropertyDefinition.set = function () {
	      warn(
	        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
	        this
	      );
	    };
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}

	function initMethods (vm, methods) {
	  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'methods');
	  var props = vm.$options.props;
	  for (var key in methods) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (methods[key] == null) {
	        warn(
	          "Method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("Method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	      if ((key in vm) && isReserved(key)) {
	        warn(
	          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
	          "Avoid defining component methods that start with _ or $."
	        );
	      }
	    }
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	  }
	}

	function initWatch (vm, watch) {
	  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'watch');
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (
	  vm,
	  keyOrFn,
	  handler,
	  options
	) {
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  return vm.$watch(keyOrFn, handler, options)
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    if (isPlainObject(cb)) {
	      return createWatcher(vm, expOrFn, cb, options)
	    }
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	/*  */

	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}

	function initInjections (vm) {
	  var result = resolveInject(vm.$options.inject, vm);
	  if (result) {
	    observerState.shouldConvert = false;
	    Object.keys(result).forEach(function (key) {
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        defineReactive$$1(vm, key, result[key], function () {
	          warn(
	            "Avoid mutating an injected value directly since the changes will be " +
	            "overwritten whenever the provided component re-renders. " +
	            "injection being mutated: \"" + key + "\"",
	            vm
	          );
	        });
	      } else {
	        defineReactive$$1(vm, key, result[key]);
	      }
	    });
	    observerState.shouldConvert = true;
	  }
	}

	function resolveInject (inject, vm) {
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    var result = Object.create(null);
	    var keys = hasSymbol
	        ? Reflect.ownKeys(inject).filter(function (key) {
	          /* istanbul ignore next */
	          return Object.getOwnPropertyDescriptor(inject, key).enumerable
	        })
	        : Object.keys(inject);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var provideKey = inject[key];
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          result[key] = source._provided[provideKey];
	          break
	        }
	        source = source.$parent;
	      }
	      if (process.env.NODE_ENV !== 'production' && !source) {
	        warn(("Injection \"" + key + "\" not found"), vm);
	      }
	    }
	    return result
	  }
	}

	/*  */

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (isDef(propOptions)) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData || emptyObject);
	    }
	  } else {
	    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
	    if (isDef(data.props)) { mergeProps(props, data.props); }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    data: data,
	    props: props,
	    children: children,
	    parent: context,
	    listeners: data.on || emptyObject,
	    injections: resolveInject(Ctor.options.inject, context),
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    vnode.functionalOptions = Ctor.options;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function mergeProps (to, from) {
	  for (var key in from) {
	    to[camelize(key)] = from[key];
	  }
	}

	/*  */

	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    } else if (vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    }
	  },

	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },

	  insert: function insert (vnode) {
	    var context = vnode.context;
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isMounted) {
	      componentInstance._isMounted = true;
	      callHook(componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      if (context._isMounted) {
	        // vue-router#1212
	        // During updates, a kept-alive component's child components may
	        // change, so directly walking the tree here may call activated hooks
	        // on incorrect children. Instead we push them into a queue which will
	        // be processed after the whole patch process ended.
	        queueActivatedComponent(componentInstance);
	      } else {
	        activateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  },

	  destroy: function destroy (vnode) {
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  }
	};

	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (isUndef(Ctor)) {
	    return
	  }

	  var baseCtor = context.$options._base;

	  // plain options object: turn it into a constructor
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  // if at this stage it's not a constructor or an async component factory,
	  // reject.
	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  var asyncFactory;
	  if (isUndef(Ctor.cid)) {
	    asyncFactory = Ctor;
	    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
	    if (Ctor === undefined) {
	      // return a placeholder node for async component, which is rendered
	      // as a comment node but preserves all the raw information for the node.
	      // the information will be used for async server-rendering and hydration.
	      return createAsyncPlaceholder(
	        asyncFactory,
	        data,
	        context,
	        children,
	        tag
	      )
	    }
	  }

	  data = data || {};

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  // transform component v-model data into props & events
	  if (isDef(data.model)) {
	    transformModel(Ctor.options, data);
	  }

	  // extract props
	  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

	  // functional component
	  if (isTrue(Ctor.options.functional)) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  // so it gets processed during parent component patch.
	  data.on = data.nativeOn;

	  if (isTrue(Ctor.options.abstract)) {
	    // abstract components do not keep anything
	    // other than props & listeners & slot

	    // work around flow
	    var slot = data.slot;
	    data = {};
	    if (slot) {
	      data.slot = slot;
	    }
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
	    asyncFactory
	  );
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (isDef(inlineTemplate)) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = componentVNodeHooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (isDef(on[event])) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (isTrue(alwaysNormalize)) {
	    normalizationType = ALWAYS_NORMALIZE;
	  }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (isDef(data) && isDef((data).__ob__)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  // object syntax in v-bind
	  if (isDef(data) && isDef(data.is)) {
	    tag = data.is;
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // warn against non-primitive key
	  if (process.env.NODE_ENV !== 'production' &&
	    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
	  ) {
	    warn(
	      'Avoid using non-primitive value as key, ' +
	      'use string/number value instead.',
	      context
	    );
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	    typeof children[0] === 'function'
	  ) {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (isDef(vnode)) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (isDef(vnode.children)) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (isDef(child.tag) && isUndef(child.ns)) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  if (isDef(ret)) {
	    (ret)._isVList = true;
	  }
	  return ret
	}

	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      props = extend(extend({}, bindObject), props);
	    }
	    return scopedSlotFn(props) || fallback
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && process.env.NODE_ENV !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  }
	}

	/*  */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}

	/*  */

	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (Array.isArray(keyCodes)) {
	    return keyCodes.indexOf(eventKeyCode) === -1
	  } else {
	    return keyCodes !== eventKeyCode
	  }
	}

	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp,
	  isSync
	) {
	  if (value) {
	    if (!isObject(value)) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      var loop = function ( key ) {
	        if (
	          key === 'class' ||
	          key === 'style' ||
	          isReservedAttribute(key)
	        ) {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];

	          if (isSync) {
	            var on = data.on || (data.on = {});
	            on[("update:" + key)] = function ($event) {
	              value[key] = $event;
	            };
	          }
	        }
	      };

	      for (var key in value) loop( key );
	    }
	  }
	  return data
	}

	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var tree = this._staticTrees[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = this._staticTrees[index] =
	    this.$options.staticRenderFns[index].call(this._renderProxy);
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}

	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}

	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}

	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}

	/*  */

	function bindObjectListeners (data, value) {
	  if (value) {
	    if (!isPlainObject(value)) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'v-on without argument expects an Object value',
	        this
	      );
	    } else {
	      var on = data.on = data.on ? extend({}, data.on) : {};
	      for (var key in value) {
	        var existing = on[key];
	        var ours = value[key];
	        on[key] = existing ? [].concat(ours, existing) : ours;
	      }
	    }
	  }
	  return data
	}

	/*  */

	function initRender (vm) {
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

	  // $attrs & $listeners are exposed for easier HOC creation.
	  // they need to be reactive so that HOCs using them are always updated
	  var parentData = parentVnode && parentVnode.data;

	  /* istanbul ignore else */
	  if (process.env.NODE_ENV !== 'production') {
	    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
	    }, true);
	    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
	    }, true);
	  } else {
	    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
	    defineReactive$$1(vm, '$listeners', vm.$options._parentListeners || emptyObject, null, true);
	  }
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // if the parent didn't update, the slot nodes will be the ones from
	      // last render. They need to be cloned to ensure "freshness" for this render.
	      for (var key in vm.$slots) {
	        var slot = vm.$slots[key];
	        if (slot._rendered) {
	          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
	        }
	      }
	    }

	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render function");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        vnode = vm.$options.renderError
	          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
	          : vm._vnode;
	      } else {
	        vnode = vm._vnode;
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // internal render helpers.
	  // these are exposed on the instance prototype to reduce generated render
	  // code size.
	  Vue.prototype._o = markOnce;
	  Vue.prototype._n = toNumber;
	  Vue.prototype._s = toString;
	  Vue.prototype._l = renderList;
	  Vue.prototype._t = renderSlot;
	  Vue.prototype._q = looseEqual;
	  Vue.prototype._i = looseIndexOf;
	  Vue.prototype._m = renderStatic;
	  Vue.prototype._f = resolveFilter;
	  Vue.prototype._k = checkKeyCodes;
	  Vue.prototype._b = bindObjectProps;
	  Vue.prototype._v = createTextVNode;
	  Vue.prototype._e = createEmptyVNode;
	  Vue.prototype._u = resolveScopedSlots;
	  Vue.prototype._g = bindObjectListeners;
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;

	    var startTag, endTag;
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	      startTag = "vue-perf-init:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }

	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm);
	    } else {
	      vm._renderProxy = vm;
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');

	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(((vm._name) + " init"), startTag, endTag);
	    }

	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var extended = Ctor.extendOptions;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
	    }
	  }
	  return modified
	}

	function dedupe (latest, extended, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    extended = Array.isArray(extended) ? extended : [extended];
	    for (var i = 0; i < latest.length; i++) {
	      // push original options and not sealed options to exclude duplicated options
	      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}

	function Vue$3 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$3)
	  ) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
	    if (installedPlugins.indexOf(plugin) > -1) {
	      return this
	    }

	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    installedPlugins.push(plugin);
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	    return this
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }

	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }

	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;

	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }

	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;

	    // create asset registers, so extended classes
	    // can have their private assets too.
	    ASSET_TYPES.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }

	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);

	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}

	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  ASSET_TYPES.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp, Array];

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (Array.isArray(pattern)) {
	    return pattern.indexOf(name) > -1
	  } else if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (isRegExp(pattern)) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}

	function pruneCache (cache, current, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        if (cachedNode !== current) {
	          pruneCacheEntry(cachedNode);
	        }
	        cache[key] = null;
	      }
	    }
	  }
	}

	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    vnode.componentInstance.$destroy();
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },

	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
	    }
	  },

	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);

	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };

	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  ASSET_TYPES.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Object.defineProperty(Vue$3.prototype, '$ssrContext', {
	  get: function get () {
	    /* istanbul ignore next */
	    return this.$vnode && this.$vnode.ssrContext
	  }
	});

	Vue$3.version = '2.4.4';

	/*  */

	// these are reserved for web because they are directly compiled away
	// during template compilation
	var isReservedAttr = makeMap('style,class');

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select,progress');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (isDef(childNode.componentInstance)) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while (isDef(parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return renderClass(data.staticClass, data.class)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: isDef(child.class)
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function renderClass (
	  staticClass,
	  dynamicClass
	) {
	  if (isDef(staticClass) || isDef(dynamicClass)) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  if (Array.isArray(value)) {
	    return stringifyArray(value)
	  }
	  if (isObject(value)) {
	    return stringifyObject(value)
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function stringifyArray (value) {
	  var res = '';
	  var stringified;
	  for (var i = 0, l = value.length; i < l; i++) {
	    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	      if (res) { res += ' '; }
	      res += stringified;
	    }
	  }
	  return res
	}

	function stringifyObject (value) {
	  var res = '';
	  for (var key in value) {
	    if (value[key]) {
	      if (res) { res += ' '; }
	      res += key;
	    }
	  }
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template,blockquote,iframe,tfoot'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);



	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	var isTextInputType = makeMap('text,number,password,search,email,tel,url');

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (!Array.isArray(refs[key])) {
	        refs[key] = [ref];
	      } else if (refs[key].indexOf(ref) < 0) {
	        // $flow-disable-line
	        refs[key].push(ref);
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function sameVnode (a, b) {
	  return (
	    a.key === b.key && (
	      (
	        a.tag === b.tag &&
	        a.isComment === b.isComment &&
	        isDef(a.data) === isDef(b.data) &&
	        sameInputType(a, b)
	      ) || (
	        isTrue(a.isAsyncPlaceholder) &&
	        a.asyncFactory === b.asyncFactory &&
	        isUndef(b.asyncFactory.error)
	      )
	    )
	  )
	}

	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	      vnode.data.pendingInsert = null;
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref$$1) {
	    if (isDef(parent)) {
	      if (isDef(ref$$1)) {
	        if (ref$$1.parentNode === parent) {
	          nodeOps.insertBefore(parent, elm, ref$$1);
	        }
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    var ancestor = vnode;
	    while (ancestor) {
	      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	      ancestor = ancestor.parent;
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	      i !== vnode.context &&
	      isDef(i = i.$options._scopeId)
	    ) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var i;
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key)
	          ? oldKeyToIdx[newStartVnode.key]
	          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          }
	        }
	        newStartVnode = newCh[++newStartIdx];
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function findIdxInOld (node, oldCh, start, end) {
	    for (var i = start; i < end; i++) {
	      var c = oldCh[i];
	      if (isDef(c) && sameVnode(node, c)) { return i }
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }

	    var elm = vnode.elm = oldVnode.elm;

	    if (isTrue(oldVnode.isAsyncPlaceholder)) {
	      if (isDef(vnode.asyncFactory.resolved)) {
	        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
	      } else {
	        vnode.isAsyncPlaceholder = true;
	      }
	      return
	    }

	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	      isTrue(oldVnode.isStatic) &&
	      vnode.key === oldVnode.key &&
	      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
	    ) {
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }

	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }

	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
	      vnode.elm = elm;
	      vnode.isAsyncPlaceholder = true;
	      return true
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          // v-html and domProps: innerHTML
	          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
	            if (i !== elm.innerHTML) {
	              /* istanbul ignore if */
	              if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed
	              ) {
	                bailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('server innerHTML: ', i);
	                console.warn('client innerHTML: ', elm.innerHTML);
	              }
	              return false
	            }
	          } else {
	            // iterate and compare children lists
	            var childrenMatch = true;
	            var childNode = elm.firstChild;
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	                childrenMatch = false;
	                break
	              }
	              childNode = childNode.nextSibling;
	            }
	            // if childNode is not null, it means the actual childNodes list is
	            // longer than the virtual children list.
	            if (!childrenMatch || childNode) {
	              /* istanbul ignore if */
	              if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed
	              ) {
	                bailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	              }
	              return false
	            }
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (isDef(vnode.tag)) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	            oldVnode.removeAttribute(SSR_ATTR);
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        if (isDef(vnode.parent)) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          var patchable = isPatchable(vnode);
	          while (ancestor) {
	            for (var i = 0; i < cbs.destroy.length; ++i) {
	              cbs.destroy[i](ancestor);
	            }
	            ancestor.elm = vnode.elm;
	            if (patchable) {
	              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	                cbs.create[i$1](emptyNode, ancestor);
	              }
	              // #6513
	              // invoke insert hooks that may have been merged by create hooks.
	              // e.g. for directives that uses the "inserted" hook.
	              var insert = ancestor.data.hook.insert;
	              if (insert.merged) {
	                // start at index 1 to avoid re-invoking component mounted hook
	                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
	                  insert.fns[i$2]();
	                }
	              }
	            }
	            ancestor = ancestor.parent;
	          }
	        }

	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    try {
	      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	    } catch (e) {
	      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
	    }
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  var opts = vnode.componentOptions;
	  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
	    return
	  }
	  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(attrs.__ob__)) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (isUndef(attrs[key])) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      // technically allowfullscreen is a boolean attribute for <iframe>,
	      // but Flash expects a value of "true" when used on <embed> tag
	      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
	        ? 'true'
	        : key;
	      el.setAttribute(key, value);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (
	    isUndef(data.staticClass) &&
	    isUndef(data.class) && (
	      isUndef(oldData) || (
	        isUndef(oldData.staticClass) &&
	        isUndef(oldData.class)
	      )
	    )
	  ) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (isDef(transitionClass)) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var validDivisionCharRE = /[\w).+\-_$\]]/;



	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	/*  */

	/**
	 * Cross-platform code generation for component v-model
	 */


	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */


	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	var str;
	var index$1;

	/*  */

	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';

	/*  */

	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  var event;
	  /* istanbul ignore if */
	  if (isDef(on[RANGE_TOKEN])) {
	    // IE input[type=range] only supports `change` event
	    event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	    // Chrome fires microtasks in between click/change, leads to #4521
	    event = isChrome ? 'click' : 'change';
	    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}

	var target$1;

	function add$1 (
	  event,
	  handler,
	  once$$1,
	  capture,
	  passive
	) {
	  if (once$$1) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      var res = arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, handler, capture, _target);
	      }
	    };
	  }
	  target$1.addEventListener(
	    event,
	    handler,
	    supportsPassive
	      ? { capture: capture, passive: passive }
	      : capture
	  );
	}

	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(props.__ob__)) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (isUndef(props[key])) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = isUndef(cur) ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(elm, checkVal)
	  ))
	}

	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is
	  // not equal to the updated value
	  var notInFocus = true;
	  // #6157
	  // work around IE bug when accessing document.activeElement in an iframe
	  try { notInFocus = document.activeElement !== elm; } catch (e) {}
	  return notInFocus && elm.value !== checkVal
	}

	function isInputChanged (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if (isDef(modifiers) && modifiers.number) {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (isDef(modifiers) && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    var normalizedName = normalize(name);
	    if (Array.isArray(val)) {
	      // Support values array created by autoprefixer, e.g.
	      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	      // Set them one by one, and the browser will only set those it can recognize
	      for (var i = 0, len = val.length; i < len; i++) {
	        el.style[normalizedName] = val[i];
	      }
	    } else {
	      el.style[normalizedName] = val;
	    }
	  }
	};

	var vendorNames = ['Webkit', 'Moz', 'ms'];

	var emptyStyle;
	var normalize = cached(function (prop) {
	  emptyStyle = emptyStyle || document.createElement('div').style;
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in emptyStyle)) {
	    return prop
	  }
	  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < vendorNames.length; i++) {
	    var name = vendorNames[i] + capName;
	    if (name in emptyStyle) {
	      return name
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (isUndef(data.staticStyle) && isUndef(data.style) &&
	    isUndef(oldData.staticStyle) && isUndef(oldData.style)
	  ) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldData.staticStyle;
	  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  // store normalized style under a different key for next diff
	  // make sure to clone it if it's reactive, since the user likely wants
	  // to mutate it.
	  vnode.data.normalizedStyle = isDef(style.__ob__)
	    ? extend({}, style)
	    : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (isUndef(newStyle[name])) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	    if (!el.classList.length) {
	      el.removeAttribute('class');
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    cur = cur.trim();
	    if (cur) {
	      el.setAttribute('class', cur);
	    } else {
	      el.removeAttribute('class');
	    }
	  }
	}

	/*  */

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  ) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  ) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
	  if (transitionClasses.indexOf(cls) < 0) {
	    transitionClasses.push(cls);
	    addClass(el, cls);
	  }
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (isDef(el._leaveCb)) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return
	  }

	  /* istanbul ignore if */
	  if (isDef(el._enterCb) || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;

	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;

	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );

	  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	        pendingNode.tag === vnode.tag &&
	        pendingNode.elm._leaveCb
	      ) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (isDef(el._enterCb)) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (isDef(el._leaveCb) || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);

	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );

	  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}

	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}

	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (isUndef(fn)) {
	    return false
	  }
	  var invokerFns = fn.fns;
	  if (isDef(invokerFns)) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}

	function _enter (_, vnode) {
	  if (vnode.data.show !== true) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (vnode.data.show !== true) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model$1 = {
	  inserted: function inserted (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      el._vOptions = [].map.call(el.options, getValue);
	    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        // Safari < 10.2 & UIWebView doesn't fire compositionend when
	        // switching focus before confirming composition choice
	        // this also fixes the issue where some browsers e.g. iOS Chrome
	        // fires "change" instead of "input" on autocomplete.
	        el.addEventListener('change', onCompositionEnd);
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var prevOptions = el._vOptions;
	      var curOptions = el._vOptions = [].map.call(el.options, getValue);
	      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
	        // trigger change event if
	        // no matching option found for at least one value
	        var needReset = el.multiple
	          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
	          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
	        if (needReset) {
	          trigger(el, 'change');
	        }
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  actuallySetSelected(el, binding, vm);
	  /* istanbul ignore if */
	  if (isIE || isEdge) {
	    setTimeout(function () {
	      actuallySetSelected(el, binding, vm);
	    }, 0);
	  }
	}

	function actuallySetSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  return options.every(function (o) { return !looseEqual(o, value); })
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  // prevent triggering an input event for no reason
	  if (!e.target.composing) { return }
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition$$1) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;
	    if (transition$$1) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: model$1,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  if (/\d-keep-alive$/.test(rawChild.tag)) {
	    return h('keep-alive', {
	      props: rawChild.componentOptions.propsData
	    })
	  }
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$options._renderChildren;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	      mode && mode !== 'in-out' && mode !== 'out-in'
	    ) {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? child.isComment
	        ? id + 'comment'
	        : id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;

	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (
	      oldChild &&
	      oldChild.data &&
	      !isSameChild(child, oldChild) &&
	      !isAsyncPlaceholder(oldChild)
	    ) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        if (isAsyncPlaceholder(child)) {
	          return oldRawChild
	        }
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var body = document.body;
	    var f = body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      /* istanbul ignore if */
	      if (this._hasMove) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.isReservedAttr = isReservedAttr;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

	// public mount method
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if (process.env.NODE_ENV !== 'production' &&
	    config.productionTip !== false &&
	    inBrowser && typeof console !== 'undefined'
	  ) {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);

	/*  */

	module.exports = Vue$3;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }())))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const Vue = __webpack_require__(1);
	const Vuex = __webpack_require__(4);

	const models = __webpack_require__(5);
	const utils = __webpack_require__(6);

	Vue.use(Vuex);

	const store = new Vuex.Store({
	  state: {
	    rootStakeholder: new models.Stakeholder('要求開発Web')
	      .addChild(
	        new models.Stakeholder("BeProud")
	          .addChild(
	            new models.Stakeholder("BPメンバー")
	              .addDemand(new models.Demand('プロジェクト内での合意をスムーズにしたい'))
	              .addDemand(new models.Demand('価値のある仕事をしたい'))
	              .addDemand(new models.Demand('Astaを使いたくない'))
	              .addDemand(new models.Demand('誰か1人でなく皆で要求開発を編集したい'))
	              .addValue(new models.Value(null, null, '自動で同期されるので、チームメンバー全員で編集できて嬉しい'))
	              .addValue(new models.Value(null, null, '自動で表示が整形されるので、Astaを調整する手間がなくて嬉しい'))
	          )
	          .addChild(
	            new models.Stakeholder("BP経営者")
	              .addDemand(new models.Demand('要求開発を社内で広めたい'))
	              .addValue(new models.Value(null, null, 'プロジェクトごとに気軽に導入できるので、気軽に社内で使いはじめれて嬉しい'))
	          )
	      )
	      .addChild(
	        new models.Stakeholder("お客さん")
	          .addDemand(new models.Demand('要望や仕様がまとまらない'))
	          .addValue(new models.Value(null, null, "単なる開発の依頼でなく、全員が参加して納得する製品ができて嬉しい"))
	          .addValue(new models.Value(null, null, "自分たちも編集したりコメントしたりできるので、一体感を感じれて嬉しい"))
	      )
	      .addChild(
	        new models.Stakeholder("匠Lab")
	          .addDemand(new models.Demand('要求開発が広がってほしい'))
	          .addValue(new models.Value(null, null, 'Astaに慣れてない人も使えるので、幅広い世代や人々に受け入れられて嬉しい'))
	      ),
	    bodyEditing: null,

	    purposes: [
	      new models.Purpose('要求開発を広める', '#ff7f7f'),
	      new models.Purpose('誰でも編集、参加できる、属人化しない。', '#7fff7f'),
	      new models.Purpose('作図やモデリングに手間をかけない', '#7f7fff')
	    ],

	    vision: new models.Vision("老練とモダンの融合"),
	    concept1: new models.Concept("誰もが要求開発に参加できる"),
	    concept2: new models.Concept("すぐに修正でき、ずっと使われ続ける要求開発"),
	    concept3: new models.Concept("モダン・要求開発"),
	    catchcopy: new models.CatchCopy("価値創造を、日常に"),
	    meaning: new models.Meaning("意味"),
	    story: new models.Story("ストーリー"),
	    design: new models.Design(),

	    reqPaths: [],
	    requirements: [],

	    showModal: false,
	    modalEditing: null
	  },
	  getters: {
	    allRequirements(state) {
	      return [
	        state.vision,
	        state.concept1,
	        state.concept2,
	        state.concept3,
	      ].concat(state.purposes).concat(state.requirements);
	    }
	  },
	  mutations: {
	    addPurpose(state, purpose) {
	      state.purposes.push(purpose);
	      store.commit("editOnModal", purpose);
	    },
	    removePurpose(state, purpose) {
	      utils.remove(state.purposes, purpose);
	      // Removing from requirement tree;
	      state.rootRequirement.searchAndPurge(purpose);
	    },
	    editBody(state, obj) {
	      state.bodyEditing = obj;
	    },
	    endBodyEditing(state) {
	      state.bodyEditing = null;
	    },
	    editOnModal(state, obj) {
	      state.modalEditing = obj;
	    }
	  }
	});

	module.exports = store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * vuex v2.4.1
	 * (c) 2017 Evan You
	 * @license MIT
	 */
	'use strict';

	var applyMixin = function (Vue) {
	  var version = Number(Vue.version.split('.')[0]);

	  if (version >= 2) {
	    Vue.mixin({ beforeCreate: vuexInit });
	  } else {
	    // override init and inject vuex init procedure
	    // for 1.x backwards compatibility.
	    var _init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      if ( options === void 0 ) options = {};

	      options.init = options.init
	        ? [vuexInit].concat(options.init)
	        : vuexInit;
	      _init.call(this, options);
	    };
	  }

	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */

	  function vuexInit () {
	    var options = this.$options;
	    // store injection
	    if (options.store) {
	      this.$store = typeof options.store === 'function'
	        ? options.store()
	        : options.store;
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store;
	    }
	  }
	};

	var devtoolHook =
	  typeof window !== 'undefined' &&
	  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	function devtoolPlugin (store) {
	  if (!devtoolHook) { return }

	  store._devtoolHook = devtoolHook;

	  devtoolHook.emit('vuex:init', store);

	  devtoolHook.on('vuex:travel-to-state', function (targetState) {
	    store.replaceState(targetState);
	  });

	  store.subscribe(function (mutation, state) {
	    devtoolHook.emit('vuex:mutation', mutation, state);
	  });
	}

	/**
	 * Get the first item that pass the test
	 * by second argument function
	 *
	 * @param {Array} list
	 * @param {Function} f
	 * @return {*}
	 */
	/**
	 * Deep copy the given object considering circular structure.
	 * This function caches all nested objects and its copies.
	 * If it detects circular structure, use cached copy to avoid infinite loop.
	 *
	 * @param {*} obj
	 * @param {Array<Object>} cache
	 * @return {*}
	 */


	/**
	 * forEach for object
	 */
	function forEachValue (obj, fn) {
	  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
	}

	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	function isPromise (val) {
	  return val && typeof val.then === 'function'
	}

	function assert (condition, msg) {
	  if (!condition) { throw new Error(("[vuex] " + msg)) }
	}

	var Module = function Module (rawModule, runtime) {
	  this.runtime = runtime;
	  this._children = Object.create(null);
	  this._rawModule = rawModule;
	  var rawState = rawModule.state;
	  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
	};

	var prototypeAccessors$1 = { namespaced: { configurable: true } };

	prototypeAccessors$1.namespaced.get = function () {
	  return !!this._rawModule.namespaced
	};

	Module.prototype.addChild = function addChild (key, module) {
	  this._children[key] = module;
	};

	Module.prototype.removeChild = function removeChild (key) {
	  delete this._children[key];
	};

	Module.prototype.getChild = function getChild (key) {
	  return this._children[key]
	};

	Module.prototype.update = function update (rawModule) {
	  this._rawModule.namespaced = rawModule.namespaced;
	  if (rawModule.actions) {
	    this._rawModule.actions = rawModule.actions;
	  }
	  if (rawModule.mutations) {
	    this._rawModule.mutations = rawModule.mutations;
	  }
	  if (rawModule.getters) {
	    this._rawModule.getters = rawModule.getters;
	  }
	};

	Module.prototype.forEachChild = function forEachChild (fn) {
	  forEachValue(this._children, fn);
	};

	Module.prototype.forEachGetter = function forEachGetter (fn) {
	  if (this._rawModule.getters) {
	    forEachValue(this._rawModule.getters, fn);
	  }
	};

	Module.prototype.forEachAction = function forEachAction (fn) {
	  if (this._rawModule.actions) {
	    forEachValue(this._rawModule.actions, fn);
	  }
	};

	Module.prototype.forEachMutation = function forEachMutation (fn) {
	  if (this._rawModule.mutations) {
	    forEachValue(this._rawModule.mutations, fn);
	  }
	};

	Object.defineProperties( Module.prototype, prototypeAccessors$1 );

	var ModuleCollection = function ModuleCollection (rawRootModule) {
	  // register root module (Vuex.Store options)
	  this.register([], rawRootModule, false);
	};

	ModuleCollection.prototype.get = function get (path) {
	  return path.reduce(function (module, key) {
	    return module.getChild(key)
	  }, this.root)
	};

	ModuleCollection.prototype.getNamespace = function getNamespace (path) {
	  var module = this.root;
	  return path.reduce(function (namespace, key) {
	    module = module.getChild(key);
	    return namespace + (module.namespaced ? key + '/' : '')
	  }, '')
	};

	ModuleCollection.prototype.update = function update$1 (rawRootModule) {
	  update([], this.root, rawRootModule);
	};

	ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
	    var this$1 = this;
	    if ( runtime === void 0 ) runtime = true;

	  if (process.env.NODE_ENV !== 'production') {
	    assertRawModule(path, rawModule);
	  }

	  var newModule = new Module(rawModule, runtime);
	  if (path.length === 0) {
	    this.root = newModule;
	  } else {
	    var parent = this.get(path.slice(0, -1));
	    parent.addChild(path[path.length - 1], newModule);
	  }

	  // register nested modules
	  if (rawModule.modules) {
	    forEachValue(rawModule.modules, function (rawChildModule, key) {
	      this$1.register(path.concat(key), rawChildModule, runtime);
	    });
	  }
	};

	ModuleCollection.prototype.unregister = function unregister (path) {
	  var parent = this.get(path.slice(0, -1));
	  var key = path[path.length - 1];
	  if (!parent.getChild(key).runtime) { return }

	  parent.removeChild(key);
	};

	function update (path, targetModule, newModule) {
	  if (process.env.NODE_ENV !== 'production') {
	    assertRawModule(path, newModule);
	  }

	  // update target module
	  targetModule.update(newModule);

	  // update nested modules
	  if (newModule.modules) {
	    for (var key in newModule.modules) {
	      if (!targetModule.getChild(key)) {
	        if (process.env.NODE_ENV !== 'production') {
	          console.warn(
	            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
	            'manual reload is needed'
	          );
	        }
	        return
	      }
	      update(
	        path.concat(key),
	        targetModule.getChild(key),
	        newModule.modules[key]
	      );
	    }
	  }
	}

	function assertRawModule (path, rawModule) {
	  ['getters', 'actions', 'mutations'].forEach(function (key) {
	    if (!rawModule[key]) { return }

	    forEachValue(rawModule[key], function (value, type) {
	      assert(
	        typeof value === 'function',
	        makeAssertionMessage(path, key, type, value)
	      );
	    });
	  });
	}

	function makeAssertionMessage (path, key, type, value) {
	  var buf = key + " should be function but \"" + key + "." + type + "\"";
	  if (path.length > 0) {
	    buf += " in module \"" + (path.join('.')) + "\"";
	  }
	  buf += " is " + (JSON.stringify(value)) + ".";

	  return buf
	}

	var Vue; // bind on install

	var Store = function Store (options) {
	  var this$1 = this;
	  if ( options === void 0 ) options = {};

	  // Auto install if it is not done yet and `window` has `Vue`.
	  // To allow users to avoid auto-installation in some cases,
	  // this code should be placed here. See #731
	  if (!Vue && typeof window !== 'undefined' && window.Vue) {
	    install(window.Vue);
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
	    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
	    assert(this instanceof Store, "Store must be called with the new operator.");
	  }

	  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
	  var strict = options.strict; if ( strict === void 0 ) strict = false;

	  var state = options.state; if ( state === void 0 ) state = {};
	  if (typeof state === 'function') {
	    state = state();
	  }

	  // store internal state
	  this._committing = false;
	  this._actions = Object.create(null);
	  this._mutations = Object.create(null);
	  this._wrappedGetters = Object.create(null);
	  this._modules = new ModuleCollection(options);
	  this._modulesNamespaceMap = Object.create(null);
	  this._subscribers = [];
	  this._watcherVM = new Vue();

	  // bind commit and dispatch to self
	  var store = this;
	  var ref = this;
	  var dispatch = ref.dispatch;
	  var commit = ref.commit;
	  this.dispatch = function boundDispatch (type, payload) {
	    return dispatch.call(store, type, payload)
	  };
	  this.commit = function boundCommit (type, payload, options) {
	    return commit.call(store, type, payload, options)
	  };

	  // strict mode
	  this.strict = strict;

	  // init root module.
	  // this also recursively registers all sub-modules
	  // and collects all module getters inside this._wrappedGetters
	  installModule(this, state, [], this._modules.root);

	  // initialize the store vm, which is responsible for the reactivity
	  // (also registers _wrappedGetters as computed properties)
	  resetStoreVM(this, state);

	  // apply plugins
	  plugins.forEach(function (plugin) { return plugin(this$1); });

	  if (Vue.config.devtools) {
	    devtoolPlugin(this);
	  }
	};

	var prototypeAccessors = { state: { configurable: true } };

	prototypeAccessors.state.get = function () {
	  return this._vm._data.$$state
	};

	prototypeAccessors.state.set = function (v) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert(false, "Use store.replaceState() to explicit replace store state.");
	  }
	};

	Store.prototype.commit = function commit (_type, _payload, _options) {
	    var this$1 = this;

	  // check object-style commit
	  var ref = unifyObjectStyle(_type, _payload, _options);
	    var type = ref.type;
	    var payload = ref.payload;
	    var options = ref.options;

	  var mutation = { type: type, payload: payload };
	  var entry = this._mutations[type];
	  if (!entry) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error(("[vuex] unknown mutation type: " + type));
	    }
	    return
	  }
	  this._withCommit(function () {
	    entry.forEach(function commitIterator (handler) {
	      handler(payload);
	    });
	  });
	  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

	  if (
	    process.env.NODE_ENV !== 'production' &&
	    options && options.silent
	  ) {
	    console.warn(
	      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
	      'Use the filter functionality in the vue-devtools'
	    );
	  }
	};

	Store.prototype.dispatch = function dispatch (_type, _payload) {
	  // check object-style dispatch
	  var ref = unifyObjectStyle(_type, _payload);
	    var type = ref.type;
	    var payload = ref.payload;

	  var entry = this._actions[type];
	  if (!entry) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error(("[vuex] unknown action type: " + type));
	    }
	    return
	  }
	  return entry.length > 1
	    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
	    : entry[0](payload)
	};

	Store.prototype.subscribe = function subscribe (fn) {
	  var subs = this._subscribers;
	  if (subs.indexOf(fn) < 0) {
	    subs.push(fn);
	  }
	  return function () {
	    var i = subs.indexOf(fn);
	    if (i > -1) {
	      subs.splice(i, 1);
	    }
	  }
	};

	Store.prototype.watch = function watch (getter, cb, options) {
	    var this$1 = this;

	  if (process.env.NODE_ENV !== 'production') {
	    assert(typeof getter === 'function', "store.watch only accepts a function.");
	  }
	  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
	};

	Store.prototype.replaceState = function replaceState (state) {
	    var this$1 = this;

	  this._withCommit(function () {
	    this$1._vm._data.$$state = state;
	  });
	};

	Store.prototype.registerModule = function registerModule (path, rawModule) {
	  if (typeof path === 'string') { path = [path]; }

	  if (process.env.NODE_ENV !== 'production') {
	    assert(Array.isArray(path), "module path must be a string or an Array.");
	    assert(path.length > 0, 'cannot register the root module by using registerModule.');
	  }

	  this._modules.register(path, rawModule);
	  installModule(this, this.state, path, this._modules.get(path));
	  // reset store to update getters...
	  resetStoreVM(this, this.state);
	};

	Store.prototype.unregisterModule = function unregisterModule (path) {
	    var this$1 = this;

	  if (typeof path === 'string') { path = [path]; }

	  if (process.env.NODE_ENV !== 'production') {
	    assert(Array.isArray(path), "module path must be a string or an Array.");
	  }

	  this._modules.unregister(path);
	  this._withCommit(function () {
	    var parentState = getNestedState(this$1.state, path.slice(0, -1));
	    Vue.delete(parentState, path[path.length - 1]);
	  });
	  resetStore(this);
	};

	Store.prototype.hotUpdate = function hotUpdate (newOptions) {
	  this._modules.update(newOptions);
	  resetStore(this, true);
	};

	Store.prototype._withCommit = function _withCommit (fn) {
	  var committing = this._committing;
	  this._committing = true;
	  fn();
	  this._committing = committing;
	};

	Object.defineProperties( Store.prototype, prototypeAccessors );

	function resetStore (store, hot) {
	  store._actions = Object.create(null);
	  store._mutations = Object.create(null);
	  store._wrappedGetters = Object.create(null);
	  store._modulesNamespaceMap = Object.create(null);
	  var state = store.state;
	  // init all modules
	  installModule(store, state, [], store._modules.root, true);
	  // reset vm
	  resetStoreVM(store, state, hot);
	}

	function resetStoreVM (store, state, hot) {
	  var oldVm = store._vm;

	  // bind store public getters
	  store.getters = {};
	  var wrappedGetters = store._wrappedGetters;
	  var computed = {};
	  forEachValue(wrappedGetters, function (fn, key) {
	    // use computed to leverage its lazy-caching mechanism
	    computed[key] = function () { return fn(store); };
	    Object.defineProperty(store.getters, key, {
	      get: function () { return store._vm[key]; },
	      enumerable: true // for local getters
	    });
	  });

	  // use a Vue instance to store the state tree
	  // suppress warnings just in case the user has added
	  // some funky global mixins
	  var silent = Vue.config.silent;
	  Vue.config.silent = true;
	  store._vm = new Vue({
	    data: {
	      $$state: state
	    },
	    computed: computed
	  });
	  Vue.config.silent = silent;

	  // enable strict mode for new vm
	  if (store.strict) {
	    enableStrictMode(store);
	  }

	  if (oldVm) {
	    if (hot) {
	      // dispatch changes in all subscribed watchers
	      // to force getter re-evaluation for hot reloading.
	      store._withCommit(function () {
	        oldVm._data.$$state = null;
	      });
	    }
	    Vue.nextTick(function () { return oldVm.$destroy(); });
	  }
	}

	function installModule (store, rootState, path, module, hot) {
	  var isRoot = !path.length;
	  var namespace = store._modules.getNamespace(path);

	  // register in namespace map
	  if (module.namespaced) {
	    store._modulesNamespaceMap[namespace] = module;
	  }

	  // set state
	  if (!isRoot && !hot) {
	    var parentState = getNestedState(rootState, path.slice(0, -1));
	    var moduleName = path[path.length - 1];
	    store._withCommit(function () {
	      Vue.set(parentState, moduleName, module.state);
	    });
	  }

	  var local = module.context = makeLocalContext(store, namespace, path);

	  module.forEachMutation(function (mutation, key) {
	    var namespacedType = namespace + key;
	    registerMutation(store, namespacedType, mutation, local);
	  });

	  module.forEachAction(function (action, key) {
	    var namespacedType = namespace + key;
	    registerAction(store, namespacedType, action, local);
	  });

	  module.forEachGetter(function (getter, key) {
	    var namespacedType = namespace + key;
	    registerGetter(store, namespacedType, getter, local);
	  });

	  module.forEachChild(function (child, key) {
	    installModule(store, rootState, path.concat(key), child, hot);
	  });
	}

	/**
	 * make localized dispatch, commit, getters and state
	 * if there is no namespace, just use root ones
	 */
	function makeLocalContext (store, namespace, path) {
	  var noNamespace = namespace === '';

	  var local = {
	    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;

	      if (!options || !options.root) {
	        type = namespace + type;
	        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
	          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
	          return
	        }
	      }

	      return store.dispatch(type, payload)
	    },

	    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;

	      if (!options || !options.root) {
	        type = namespace + type;
	        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
	          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
	          return
	        }
	      }

	      store.commit(type, payload, options);
	    }
	  };

	  // getters and state object must be gotten lazily
	  // because they will be changed by vm update
	  Object.defineProperties(local, {
	    getters: {
	      get: noNamespace
	        ? function () { return store.getters; }
	        : function () { return makeLocalGetters(store, namespace); }
	    },
	    state: {
	      get: function () { return getNestedState(store.state, path); }
	    }
	  });

	  return local
	}

	function makeLocalGetters (store, namespace) {
	  var gettersProxy = {};

	  var splitPos = namespace.length;
	  Object.keys(store.getters).forEach(function (type) {
	    // skip if the target getter is not match this namespace
	    if (type.slice(0, splitPos) !== namespace) { return }

	    // extract local getter type
	    var localType = type.slice(splitPos);

	    // Add a port to the getters proxy.
	    // Define as getter property because
	    // we do not want to evaluate the getters in this time.
	    Object.defineProperty(gettersProxy, localType, {
	      get: function () { return store.getters[type]; },
	      enumerable: true
	    });
	  });

	  return gettersProxy
	}

	function registerMutation (store, type, handler, local) {
	  var entry = store._mutations[type] || (store._mutations[type] = []);
	  entry.push(function wrappedMutationHandler (payload) {
	    handler.call(store, local.state, payload);
	  });
	}

	function registerAction (store, type, handler, local) {
	  var entry = store._actions[type] || (store._actions[type] = []);
	  entry.push(function wrappedActionHandler (payload, cb) {
	    var res = handler.call(store, {
	      dispatch: local.dispatch,
	      commit: local.commit,
	      getters: local.getters,
	      state: local.state,
	      rootGetters: store.getters,
	      rootState: store.state
	    }, payload, cb);
	    if (!isPromise(res)) {
	      res = Promise.resolve(res);
	    }
	    if (store._devtoolHook) {
	      return res.catch(function (err) {
	        store._devtoolHook.emit('vuex:error', err);
	        throw err
	      })
	    } else {
	      return res
	    }
	  });
	}

	function registerGetter (store, type, rawGetter, local) {
	  if (store._wrappedGetters[type]) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error(("[vuex] duplicate getter key: " + type));
	    }
	    return
	  }
	  store._wrappedGetters[type] = function wrappedGetter (store) {
	    return rawGetter(
	      local.state, // local state
	      local.getters, // local getters
	      store.state, // root state
	      store.getters // root getters
	    )
	  };
	}

	function enableStrictMode (store) {
	  store._vm.$watch(function () { return this._data.$$state }, function () {
	    if (process.env.NODE_ENV !== 'production') {
	      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
	    }
	  }, { deep: true, sync: true });
	}

	function getNestedState (state, path) {
	  return path.length
	    ? path.reduce(function (state, key) { return state[key]; }, state)
	    : state
	}

	function unifyObjectStyle (type, payload, options) {
	  if (isObject(type) && type.type) {
	    options = payload;
	    payload = type;
	    type = type.type;
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
	  }

	  return { type: type, payload: payload, options: options }
	}

	function install (_Vue) {
	  if (Vue && _Vue === Vue) {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error(
	        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
	      );
	    }
	    return
	  }
	  Vue = _Vue;
	  applyMixin(Vue);
	}

	var mapState = normalizeNamespace(function (namespace, states) {
	  var res = {};
	  normalizeMap(states).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedState () {
	      var state = this.$store.state;
	      var getters = this.$store.getters;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
	        if (!module) {
	          return
	        }
	        state = module.context.state;
	        getters = module.context.getters;
	      }
	      return typeof val === 'function'
	        ? val.call(this, state, getters)
	        : state[val]
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res
	});

	var mapMutations = normalizeNamespace(function (namespace, mutations) {
	  var res = {};
	  normalizeMap(mutations).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedMutation () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];

	      var commit = this.$store.commit;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
	        if (!module) {
	          return
	        }
	        commit = module.context.commit;
	      }
	      return typeof val === 'function'
	        ? val.apply(this, [commit].concat(args))
	        : commit.apply(this.$store, [val].concat(args))
	    };
	  });
	  return res
	});

	var mapGetters = normalizeNamespace(function (namespace, getters) {
	  var res = {};
	  normalizeMap(getters).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    val = namespace + val;
	    res[key] = function mappedGetter () {
	      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
	        return
	      }
	      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
	        console.error(("[vuex] unknown getter: " + val));
	        return
	      }
	      return this.$store.getters[val]
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res
	});

	var mapActions = normalizeNamespace(function (namespace, actions) {
	  var res = {};
	  normalizeMap(actions).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedAction () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];

	      var dispatch = this.$store.dispatch;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
	        if (!module) {
	          return
	        }
	        dispatch = module.context.dispatch;
	      }
	      return typeof val === 'function'
	        ? val.apply(this, [dispatch].concat(args))
	        : dispatch.apply(this.$store, [val].concat(args))
	    };
	  });
	  return res
	});

	var createNamespacedHelpers = function (namespace) { return ({
	  mapState: mapState.bind(null, namespace),
	  mapGetters: mapGetters.bind(null, namespace),
	  mapMutations: mapMutations.bind(null, namespace),
	  mapActions: mapActions.bind(null, namespace)
	}); };

	function normalizeMap (map) {
	  return Array.isArray(map)
	    ? map.map(function (key) { return ({ key: key, val: key }); })
	    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
	}

	function normalizeNamespace (fn) {
	  return function (namespace, map) {
	    if (typeof namespace !== 'string') {
	      map = namespace;
	      namespace = '';
	    } else if (namespace.charAt(namespace.length - 1) !== '/') {
	      namespace += '/';
	    }
	    return fn(namespace, map)
	  }
	}

	function getModuleByNamespace (store, helper, namespace) {
	  var module = store._modulesNamespaceMap[namespace];
	  if (process.env.NODE_ENV !== 'production' && !module) {
	    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
	  }
	  return module
	}

	var index = {
	  Store: Store,
	  install: install,
	  version: '2.4.1',
	  mapState: mapState,
	  mapMutations: mapMutations,
	  mapGetters: mapGetters,
	  mapActions: mapActions,
	  createNamespacedHelpers: createNamespacedHelpers
	};

	module.exports = index;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const utils = __webpack_require__(6);

	const PRIORITIES_LOW = 'low';
	const PRIORITIES_MIDDLE = 'middle';
	const PRIORITIES_HIGH_MIDDLE = 'high_middle';
	const PRIORITIES_HIGH = 'high';

	const PRIORITIES = [
	  {id: PRIORITIES_LOW, name: '重要度（低）'},
	  {id: PRIORITIES_MIDDLE, name: '重要度（中）'},
	  {id: PRIORITIES_HIGH_MIDDLE, name: '重要度（高）優先度（中）'},
	  {id: PRIORITIES_HIGH, name: '重要度（高）優先度（高）'}
	];

	const PRIORITY_LEVELS = PRIORITIES.map((p) => {return p.id;});

	const BASE_FIELDS = [
	  {model: 'note',
	   type: 'textArea',
	   label: 'ノート'}
	];

	const REQUIREMENT_FIELDS = [
	  {model: 'priority',
	   type: 'select',
	   label: '優先度',
	   values: PRIORITIES}
	].concat(BASE_FIELDS);


	function makeSchema(fields) {
	  // Make schema object for vue-form-generator
	  return {
	    fields: fields
	  };
	}


	class Path {
	  constructor() {
	    this.parent = null;
	    this.child = null;
	  }
	}


	class Node {
	  constructor() {
	    this.parent = null;
	    this.children = [];

	    this.note = '';
	  }

	  toJSON() {
	    return {
	      note: this.note,
	      children: this.children.map((c) => {return c.toJSON();})
	    };
	  }

	  addChild(child) {
	    this.children.unshift(child);
	    child.parent = this;
	    return this;
	  }

	  removeChild(child) {
	    child.parent = null;
	    utils.remove(this.children, child);
	  }

	  removeFromParent() {
	    if (this.parent) {
	      this.parent.removeChild(this);
	    }
	  }

	  purgeAllDescendants() {
	    this.removeFromParent();
	    this.children.forEach((c) => {
	      c.purgeAllDescendants();
	    });
	  }

	  searchAndPurge(obj) {
	    if (obj === this) {
	      this.purgeAllDescendants();
	    } else {
	      this.children.forEach((c) => {
	        c.searchAndPurge(obj);
	      });
	    }
	  }

	  hasChild() {
	    return this.children.length > 0;
	  }

	  hasParent() {
	    return this.parent;
	  }

	  flatten(options) {
	    options = options || {};
	    let ignoreMe = options.ignoreMe || false;
	    var ret;
	    if (!ignoreMe) {
	      ret = [this];
	    } else {
	      ret = [];
	    }
	    this.children.forEach((child) => {
	      ret = ret.concat(child.flatten());
	    });
	    return ret;
	  }
	}


	class BaseRequirementNode extends Node {
	  constructor(body) {
	    super();
	    this.layer = null;
	    this.priority = null;
	    this.body = body;
	  }

	  toJSON() {
	    var d = super.toJSON();
	    d.layer = this.layer;
	    d.priority = this.priority;
	    d.body = this.body;
	    return d;
	  }

	  get colorLighter() {
	    var c = this.color;
	    if (c) {
	      return utils.colorLuminance(c, 0.8);
	    } else {
	      return null;
	    }
	  }

	  get priorityLevel() {
	    var numStar = PRIORITY_LEVELS.indexOf(this.priority) + 1;
	    var numEmpty = PRIORITY_LEVELS.length + 1 - numStar;
	    return Array(numStar).fill(true).concat(Array(numEmpty).fill(false));
	  }
	}

	class Requirement extends BaseRequirementNode {
	  get color() {return null;}
	  get modelVerboseName() {return '要求';}

	  get schema() {
	    return makeSchema([
	      {
	        model: "body",
	        type: "textArea",
	        label: "内容"
	      }
	    ].concat(REQUIREMENT_FIELDS));
	  }
	}

	// ValueDesign

	class Vision extends BaseRequirementNode {
	  get color() {
	    return '#8989f1';
	  }


	  get modelVerboseName() {return 'ビジョン';}

	  get schema() {
	    return makeSchema([
	      {
	        model: "body",
	        type: "textArea",
	        label: "内容"
	      }
	    ].concat(REQUIREMENT_FIELDS));
	  }
	}

	class Concept extends BaseRequirementNode {
	  get color() {
	    return '#d69db1';
	  }

	  get modelVerboseName() {return 'コンセプト';}

	  get schema() {
	    return makeSchema([
	      {
	        model: "body",
	        type: "textArea",
	        label: "内容"
	      }
	    ].concat(REQUIREMENT_FIELDS));
	  }
	}

	class CatchCopy {
	  constructor(body) {
	    this.body = body;
	  }

	  toJSON() {
	    return {
	      body: this.body
	    };
	  }

	  get modelVerboseName() {return 'キャッチコピー';}

	  get schema() {
	    return makeSchema([
	      {
	        model: 'body',
	        type: 'textArea',
	        label: '内容'
	      }
	    ].concat(BASE_FIELDS));
	  }
	}

	class Meaning {
	  constructor(body) {
	    this.body = body;
	  }

	  toJSON() {
	    return {
	      body: this.body
	    };
	  }

	  get modelVerboseName() {return '意味';}

	  get schema() {
	    return makeSchema([
	      {
	        model: 'body',
	        type: 'textArea',
	        label: '内容'
	      }
	    ].concat(BASE_FIELDS));
	  }
	}

	class Story {
	  constructor(body) {
	    this.body = body;
	  }

	  toJSON() {
	    return {
	      body: this.body
	    };
	  }

	  get modelVerboseName() {return 'ストーリー';}

	  get schema() {
	    return makeSchema([
	      {
	        model: 'body',
	        type: 'textArea',
	        label: '内容'
	      }
	    ].concat(BASE_FIELDS));
	  }
	}

	class Design {
	  constructor(imageUrl) {
	    this.imageUrl = imageUrl;
	  }

	  toJSON() {
	    return {
	      imageUrl: this.imageUrl
	    };
	  }

	  get modelVerboseName() {return 'デザイン';}

	  get schema() {
	    return makeSchema([
	      {
	        model: 'imageUrl',
	        type: 'input',
	        label: '画像URL'
	      }
	    ].concat(BASE_FIELDS));
	  }
	}

	// StakeholderModel

	const DEMAND_TYPE_NEGATIVE = 'negative';
	const DEMAND_TYPE_POSITIVE = 'positive';

	const DEMAND_TYPE = [
	  {id: DEMAND_TYPE_POSITIVE, name: "肯定"},
	  {id: DEMAND_TYPE_NEGATIVE, name: "否定"}
	];


	class Demand {
	  constructor(body, type) {
	    this.stakeholder = null;
	    this.body = body;
	    this.type = type;
	  }

	  toJSON() {
	    return {
	      body: this.body,
	      type: this.type
	    };
	  }

	  get isPositive() {
	    return this.type == DEMAND_TYPE_POSITIVE;
	  }

	  get isNegative() {
	    return this.type == DEMAND_TYPE_NEGATIVE;
	  }

	  get modelVerboseName() {return '要望、痛み';}

	  get schema() {
	    return makeSchema([
	      {
	        model: "body",
	        type: "textArea",
	        label: "内容"
	      },
	      {
	        model: "type",
	        type: "select",
	        label: "肯定/否定",
	        values: DEMAND_TYPE
	      }
	    ].concat(BASE_FIELDS));
	  }
	}

	class Stakeholder extends Node {
	  constructor(name) {
	    super();
	    this.name = name;
	    this.demands = [];
	    this.values = [];
	  }

	  toJSON() {
	    return {
	      name: this.name
	    };
	  }

	  addDemand(demand) {
	    this.demands.unshift(demand);
	    demand.stakeholder = this;
	    return this;
	  }

	  removeDemand(demand) {
	    utils.remove(this.demands, demand);
	  }

	  addValue(value) {
	    value.stakeholder = this;
	    this.values.unshift(value);
	    return this;
	  }

	  removeValue(value) {
	    utils.remove(this.values, value);
	  }

	  get modelVerboseName() {return 'ステークホルダー';}

	  get schema() {
	    return makeSchema([
	      {
	        model: "name",
	        type: "input",
	        label: "名前"
	      }
	    ].concat(BASE_FIELDS));
	  }
	}

	// ValueAnalysisModel

	class Purpose extends BaseRequirementNode {
	  constructor(body, color) {
	    super(body);
	    this.color = color || '#888';
	  }

	  toJSON() {
	    var d = super.toJSON();
	    d.color = this.color;
	    return d;
	  }

	  get modelVerboseName() {return '目的';}

	  get schema() {
	    return makeSchema([
	      {
	        model: "body",
	        type: "textArea",
	        label: "内容"
	      },
	      {
	        model: "color",
	        type: "select",
	        label: "色",
	        values: [
	          {id: '#888', name: '灰色'},
	          {id: '#ff7f7f', name: '赤'},
	          {id: '#7fff7f', name: '緑'},
	          {id: '#7f7fff', name: '青'},
	        ],
	        default: "#888"
	      }
	    ].concat(REQUIREMENT_FIELDS));
	  }
	}

	class Value {
	  constructor(stakeholder, purpose, body) {
	    this.stakeholder = stakeholder;
	    this.purpose = purpose || null;
	    this.body = body || '';
	  }

	  toJSON() {
	    var d = super.toJSON();
	    d.body = this.body;
	    return d;
	  }

	  get color() {
	    if (this.purpose) {
	      return this.purpose.color;
	    } else {
	      return null;
	    }
	  }

	  get colorLighter() {
	    if (this.purpose) {
	      return this.purpose.colorLighter;
	    } else {
	      return null;
	    }
	  }

	  get modelVerboseName() {return '価値';}

	  get schema() {
	    return makeSchema([
	      {
	        model: "body",
	        type: "textArea",
	        label: "内容"
	      }
	    ].concat(BASE_FIELDS));
	  }
	}

	module.exports = {
	  PRIORITIES: PRIORITIES,
	  BaseRequirementModel: BaseRequirementNode,
	  Requirement: Requirement,
	  Vision: Vision,
	  Concept: Concept,
	  CatchCopy: CatchCopy,
	  Meaning: Meaning,
	  Story: Story,
	  Design: Design,
	  Stakeholder: Stakeholder,
	  DEMAND_TYPE: DEMAND_TYPE,
	  Demand: Demand,
	  Purpose: Purpose,
	  Value: Value
	};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	function remove(arr, obj) {
	  arr.splice(arr.indexOf(obj), 1);
	}

	function colorLuminance(hex, lum) {

		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	}

	module.exports = {
	  remove: remove,
	  colorLuminance: colorLuminance
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(8)

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(14),
	  /* template */
	  __webpack_require__(47),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/app.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f01fa9e8", Component.options)
	  } else {
	    hotAPI.reload("data-v-f01fa9e8", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("51b31c05", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f01fa9e8!./app.css", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f01fa9e8!./app.css");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\nbody {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n\n    color: #333;\n}\n.container {\n    width: 944px;\n    margin: 0 auto;\n    padding: 0 16px;\n}\na {\n    text-decoration: none;\n}\na:hover {\n    text-decoration: underline;\n}\ni.material-icons {\n    vertical-align: text-bottom;\n}\nbutton.btn {\n    border: solid 1px #d0cdcd;\n    border-radius: 4px;\n    background: linear-gradient(#fdfafa, #e2e2e2);\n\n    min-height: 24px;\n    vertical-align: middle;\n}\nbutton.btn > i.material-icons {\n    font-size: 12px;\n}\nfieldset {\n    border: none;\n    margin: 0;\n    padding: 0;\n}\n.form-group:not(:first-child) {\n    margin-top: 16px;\n}\nlabel {\n    font-weight: 600;\n}\ninput, textarea {\n    font-size: inherit;\n    border: solid 1px #d0cece;\n    border-radius: 2px\n}\ntextarea {\n    min-height: 80px;\n    min-width: 200px;\n    width: 100%;\n}\n\n/* Grid */\n.row {\n    display: flex;\n    flex-flow: row wrap;\n    flex: 0 1 auto;\n    align-items: flex-start;\n    justify-content: space-around;\n}\n.row.left {\n    align-items: flex-start;\n    justify-content: flex-start;\n}\n.row.right {\n    align-items: flex-end;\n    justify-content: flex-end;\n}\n.top-content {\n    padding-top: 1.618rem;\n    padding-bottom: 40px;\n}\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12 {\n    box-sizing: border-box;\n    flex: 0 0 auto;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n}\n.col-1:first-child,\n.col-2:first-child,\n.col-3:first-child,\n.col-4:first-child,\n.col-5:first-child,\n.col-6:first-child,\n.col-7:first-child,\n.col-8:first-child,\n.col-9:first-child,\n.col-10:first-child,\n.col-11:first-child,\n.col-12:first-child {\n    padding-left: 0;\n}\n.col-1:last-child,\n.col-2:last-child,\n.col-3:last-child,\n.col-4:last-child,\n.col-5:last-child,\n.col-6:last-child,\n.col-7:last-child,\n.col-8:last-child,\n.col-9:last-child,\n.col-10:last-child,\n.col-11:last-child,\n.col-12:last-child {\n    padding-right: 0;\n}\n.col-1 {\n    flex-basis: 8.333%;\n    max-width: 8.333%;\n}\n.col-2 {\n    flex-basis: 16.667%;\n    max-width: 16.667%;\n}\n.col-3 {\n    flex-basis: 25%;\n    max-width: 25%;\n}\n.col-4 {\n    flex-basis: 33.333%;\n    max-width: 33.333%;\n}\n.col-5 {\n    flex-basis: 41.667%;\n    max-width: 41.667%;\n}\n.col-6 {\n    flex-basis: 50%;\n    max-width: 50%;\n}\n.col-7 {\n    flex-basis: 58.333%;\n    max-width: 58.333%;\n}\n.col-8 {\n    flex-basis: 66.667%;\n    max-width: 66.667%;\n}\n.col-9 {\n    flex-basis: 75%;\n    max-width: 75%;\n}\n.col-10 {\n    flex-basis: 83.333%;\n    max-width: 83.333%;\n}\n.col-11 {\n    flex-basis: 91.667%;\n    max-width: 91.667%;\n}\n.col-12 {\n    flex-basis: 100%;\n    max-width: 100%;\n}\n\n/* Componets */\n\n/* Nav Bar */\nnav {\n    background-color: #5e747b;\n    color: white;\n    height: 38px;\n    display: flex;\n    align-items: center;\n}\nnav > div > a {\n    color: white;\n}\nnav > div > *:not(:first-child) {\n    margin-left: 8px;\n}\n\n/* Tree */\nul.tree {\n    padding-left: 60px;\n}\nul.tree.root {\n    padding: 0;\n}\nul.tree > li {\n    list-style: none;\n    margin: 4px 0 8px 0;\n}\n.inline {\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n}\n\n/* box */\n.box {\n    position: relative;\n    display: inline-flex;\n\n    border: solid 2px #c7c7c7;\n    border-radius: 4px;\n\n    background-color: #fbfbfb;\n\n    padding: 16px 12px;\n}\n.box.positive {\n    border-color: #47cb69;\n    background-color: #f6fff3;\n}\n.box.negative {\n    border-color: #e68e8e;\n    background-color: #fff3f3;\n}\n.box-stars {\n    position: absolute;\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n    top: 0;\n    right: 0;\n}\n.box-star {\n    font-size: 10px;\n    color: rgba(206, 42, 42, 0.67);\n}\n\n/* buttons */\n.action-buttons {\n    display: flex;\n    flex-flow: row nowrap;\n    align-items: center;\n\n    margin-left: 12px;\n}\n.action-buttons > button:not(:first-child) {\n    margin-left: 4px;\n}\n\n/* Models */\n\n/* Stakeholder */\n.stakeholder > i.material-icons {\n    color: #fb97b5;\n    font-size: 38px;\n    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);\n}\n.stakeholder > span {\n    font-size: 18px;\n}\n", ""]);

	// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(12)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

	  if (styleElement) {
	    if (isProduction) {
	      // has SSR styles and in production mode.
	      // simply do nothing.
	      return noop
	    } else {
	      // has SSR styles but in dev mode.
	      // for some reason Chrome can't handle source map in server-rendered
	      // style tags - source maps in <style> only works if the style tag is
	      // created and inserted dynamically. So we remove the server rendered
	      // styles and inject new ones.
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  update(obj)

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	
	const Vue = __webpack_require__(1);
	const VueFormGenerator = __webpack_require__(15);
	const VueRouter = __webpack_require__(16);

	const models = __webpack_require__(5);


	Vue.use(VueFormGenerator)
	Vue.use(VueRouter);
	Vue.component('modal', __webpack_require__(17));
	Vue.component('modal-button', __webpack_require__(22));
	Vue.component('bodyedit', __webpack_require__(25));

	const router = new VueRouter({
	  routes: [
	    {path: '/', component: __webpack_require__(30)},
	    {path: '/valueanalyse', component: __webpack_require__(36)},
	    {path: '/valuedesign', component: __webpack_require__(39)},
	    {path: '/requirements', component: __webpack_require__(44)},
	  ]
	});

	module.exports = {router};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * vue-form-generator v2.0.0
	 * https://github.com/icebob/vue-form-generator
	 * Released under the MIT License.
	 */

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueFormGenerator=t():e.VueFormGenerator=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}(function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))switch(typeof e[t]){case"function":break;case"object":e[t]=function(t){var n=t.slice(1),r=e[t[0]];return function(e,t,o){r.apply(this,[e,t,o].concat(n))}}(e[t]);break;default:e[t]=e[e[t]]}return e}([function(e,t,n){"use strict";e.exports={component:n(1),schema:n(46),validators:n(148),abstractField:n(147).default,install:function(t){t.component("VueFormGenerator",e.exports.component)}}},function(e,t,n){n(2);var r=n(3)(n(4),n(314),null,null);e.exports=r.exports},function(e,t){},function(e,t){e.exports=function(e,t,n,r){var o,i=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(o=e,i=e.default);var s="function"==typeof i?i.options:i;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),r){var u=s.computed||(s.computed={});Object.keys(r).forEach(function(e){var t=r[e];u[e]=function(){return t}})}return{esModule:o,exports:i,options:s}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(5),i=r(o),a=n(12),s=r(a),u=n(14),c=r(u),l=n(15),f=r(l),d=n(17),p=r(d),h=n(46),m={},v=n(143);(0,p.default)(v.keys(),function(e){var t=e.replace(/^\.\//,"").replace(/\.vue/,"");m[t]=v(e)});var y=n(228);(0,p.default)(y.keys(),function(e){var t=e.replace(/^\.\//,"").replace(/\.vue/,"");m[t]=y(e)}),t.default={components:m,props:{schema:Object,model:Object,options:{type:Object,default:function(){return{validateAfterLoad:!1,validateAfterChanged:!1,validationErrorClass:"error",validationSuccessClass:""}}},multiple:{type:Boolean,default:!1},isNewModel:{type:Boolean,default:!1},tag:{type:String,default:"fieldset",validator:function(e){return e.length>0}}},data:function(){return{errors:[]}},computed:{fields:function(){var e=this,t=[];return this.schema&&this.schema.fields&&(0,p.default)(this.schema.fields,function(n){e.multiple&&n.multi!==!0||t.push(n)}),t},groups:function(){var e=[];return this.schema&&this.schema.groups&&(0,p.default)(this.schema.groups,function(t){e.push(t)}),e}},watch:{model:function(e,t){var n=this;t!=e&&null!=e&&this.$nextTick(function(){n.options.validateAfterLoad===!0&&n.isNewModel!==!0?n.validate():n.clearValidationErrors()})}},mounted:function(){var e=this;this.$nextTick(function(){e.model&&(e.options.validateAfterLoad===!0&&e.isNewModel!==!0?e.validate():e.clearValidationErrors())})},methods:{getFieldRowClasses:function(e){var t=this.fieldErrors(e).length>0,n={error:t,disabled:this.fieldDisabled(e),readonly:this.fieldReadonly(e),featured:this.fieldFeatured(e),required:this.fieldRequired(e)},r=this.options,o=r.validationErrorClass,a=r.validationSuccessClass;return o&&a&&(t?(n[o]=!0,n.error=!1):n[a]=!0),(0,s.default)(e.styleClasses)?(0,p.default)(e.styleClasses,function(e){return n[e]=!0}):(0,i.default)(e.styleClasses)&&(n[e.styleClasses]=!0),n["field-"+e.type]=!0,n},getFieldType:function(e){return"field-"+e.type},fieldTypeHasLabel:function(e){var t="";switch(t="input"===e.type?e.inputType:e.type){case"button":case"submit":case"reset":return!1;default:return!0}},fieldDisabled:function(e){return(0,f.default)(e.disabled)?e.disabled.call(this,this.model,e,this):!(0,c.default)(e.disabled)&&e.disabled},fieldRequired:function(e){return(0,f.default)(e.required)?e.required.call(this,this.model,e,this):!(0,c.default)(e.required)&&e.required},fieldVisible:function(e){return(0,f.default)(e.visible)?e.visible.call(this,this.model,e,this):!!(0,c.default)(e.visible)||e.visible},fieldReadonly:function(e){return(0,f.default)(e.readonly)?e.readonly.call(this,this.model,e,this):!(0,c.default)(e.readonly)&&e.readonly},fieldFeatured:function(e){return(0,f.default)(e.featured)?e.featured.call(this,this.model,e,this):!(0,c.default)(e.featured)&&e.featured},buttonClickHandler:function(e,t,n){return e.onclick.call(this,this.model,t,n,this)},onFieldValidated:function(e,t,n){var r=this;this.errors=this.errors.filter(function(e){return e.field!=n.schema}),!e&&t&&t.length>0&&t.forEach(function(e){r.errors.push({field:n.schema,error:e})});var o=0==this.errors.length;this.$emit("validated",o,this.errors)},validate:function(){var e=this;this.clearValidationErrors(),this.$children.forEach(function(t){if((0,f.default)(t.validate)){var n=t.validate(!0);n.forEach(function(n){e.errors.push({field:t.schema,error:n})})}});var t=0==this.errors.length;return this.$emit("validated",t,this.errors),t},clearValidationErrors:function(){this.errors.splice(0),(0,p.default)(this.$children,function(e){e.clearValidationErrors()})},modelUpdated:function(e,t){this.$emit("model-updated",e,t)},buttonVisibility:function(e){return e.buttons&&e.buttons.length>0},fieldErrors:function(e){var t=this.errors.filter(function(t){return t.field==e});return t.map(function(e){return e.error})},getFieldID:function(e){var t=this.options&&this.options.fieldIdPrefix?this.options.fieldIdPrefix:"";return(0,h.slugifyFormID)(e,t)}}}},function(e,t,n){function r(e){return"string"==typeof e||!i(e)&&a(e)&&o(e)==s}var o=n(6),i=n(12),a=n(13),s="[object String]";e.exports=r},function(e,t,n){function r(e){return null==e?void 0===e?u:s:c&&c in Object(e)?i(e):a(e)}var o=n(7),i=n(10),a=n(11),s="[object Null]",u="[object Undefined]",c=o?o.toStringTag:void 0;e.exports=r},function(e,t,n){var r=n(8),o=r.Symbol;e.exports=o},function(e,t,n){var r=n(9),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},function(e,t){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(t,function(){return this}())},function(e,t,n){function r(e){var t=a.call(e,u),n=e[u];try{e[u]=void 0;var r=!0}catch(e){}var o=s.call(e);return r&&(t?e[u]=n:delete e[u]),o}var o=n(7),i=Object.prototype,a=i.hasOwnProperty,s=i.toString,u=o?o.toStringTag:void 0;e.exports=r},function(e,t){function n(e){return o.call(e)}var r=Object.prototype,o=r.toString;e.exports=n},function(e,t){var n=Array.isArray;e.exports=n},function(e,t){function n(e){return null!=e&&"object"==typeof e}e.exports=n},function(e,t){function n(e){return null==e}e.exports=n},function(e,t,n){function r(e){if(!i(e))return!1;var t=o(e);return t==s||t==u||t==a||t==c}var o=n(6),i=n(16),a="[object AsyncFunction]",s="[object Function]",u="[object GeneratorFunction]",c="[object Proxy]";e.exports=r},function(e,t){function n(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}e.exports=n},function(e,t,n){e.exports=n(18)},function(e,t,n){function r(e,t){var n=s(e)?o:i;return n(e,a(t))}var o=n(19),i=n(20),a=n(44),s=n(12);e.exports=r},function(e,t){function n(e,t){for(var n=-1,r=null==e?0:e.length;++n<r&&t(e[n],n,e)!==!1;);return e}e.exports=n},function(e,t,n){var r=n(21),o=n(43),i=o(r);e.exports=i},function(e,t,n){function r(e,t){return e&&o(e,t,i)}var o=n(22),i=n(24);e.exports=r},function(e,t,n){var r=n(23),o=r();e.exports=o},function(e,t){function n(e){return function(t,n,r){for(var o=-1,i=Object(t),a=r(t),s=a.length;s--;){var u=a[e?s:++o];if(n(i[u],u,i)===!1)break}return t}}e.exports=n},function(e,t,n){function r(e){return a(e)?o(e):i(e)}var o=n(25),i=n(38),a=n(42);e.exports=r},function(e,t,n){function r(e,t){var n=a(e),r=!n&&i(e),l=!n&&!r&&s(e),d=!n&&!r&&!l&&c(e),p=n||r||l||d,h=p?o(e.length,String):[],m=h.length;for(var v in e)!t&&!f.call(e,v)||p&&("length"==v||l&&("offset"==v||"parent"==v)||d&&("buffer"==v||"byteLength"==v||"byteOffset"==v)||u(v,m))||h.push(v);return h}var o=n(26),i=n(27),a=n(12),s=n(29),u=n(32),c=n(33),l=Object.prototype,f=l.hasOwnProperty;e.exports=r},function(e,t){function n(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}e.exports=n},function(e,t,n){var r=n(28),o=n(13),i=Object.prototype,a=i.hasOwnProperty,s=i.propertyIsEnumerable,u=r(function(){return arguments}())?r:function(e){return o(e)&&a.call(e,"callee")&&!s.call(e,"callee")};e.exports=u},function(e,t,n){function r(e){return i(e)&&o(e)==a}var o=n(6),i=n(13),a="[object Arguments]";e.exports=r},function(e,t,n){(function(e){var r=n(8),o=n(31),i="object"==typeof t&&t&&!t.nodeType&&t,a=i&&"object"==typeof e&&e&&!e.nodeType&&e,s=a&&a.exports===i,u=s?r.Buffer:void 0,c=u?u.isBuffer:void 0,l=c||o;e.exports=l}).call(t,n(30)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){function n(){return!1}e.exports=n},function(e,t){function n(e,t){return t=null==t?r:t,!!t&&("number"==typeof e||o.test(e))&&e>-1&&e%1==0&&e<t}var r=9007199254740991,o=/^(?:0|[1-9]\d*)$/;e.exports=n},function(e,t,n){var r=n(34),o=n(36),i=n(37),a=i&&i.isTypedArray,s=a?o(a):r;e.exports=s},function(e,t,n){function r(e){return a(e)&&i(e.length)&&!!T[o(e)]}var o=n(6),i=n(35),a=n(13),s="[object Arguments]",u="[object Array]",c="[object Boolean]",l="[object Date]",f="[object Error]",d="[object Function]",p="[object Map]",h="[object Number]",m="[object Object]",v="[object RegExp]",y="[object Set]",b="[object String]",g="[object WeakMap]",x="[object ArrayBuffer]",_="[object DataView]",w="[object Float32Array]",O="[object Float64Array]",j="[object Int8Array]",M="[object Int16Array]",k="[object Int32Array]",S="[object Uint8Array]",C="[object Uint8ClampedArray]",P="[object Uint16Array]",F="[object Uint32Array]",T={};T[w]=T[O]=T[j]=T[M]=T[k]=T[S]=T[C]=T[P]=T[F]=!0,T[s]=T[u]=T[x]=T[c]=T[_]=T[l]=T[f]=T[d]=T[p]=T[h]=T[m]=T[v]=T[y]=T[b]=T[g]=!1,e.exports=r},function(e,t){function n(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=r}var r=9007199254740991;e.exports=n},function(e,t){function n(e){return function(t){return e(t)}}e.exports=n},function(e,t,n){(function(e){var r=n(9),o="object"==typeof t&&t&&!t.nodeType&&t,i=o&&"object"==typeof e&&e&&!e.nodeType&&e,a=i&&i.exports===o,s=a&&r.process,u=function(){try{return s&&s.binding&&s.binding("util")}catch(e){}}();e.exports=u}).call(t,n(30)(e))},function(e,t,n){function r(e){if(!o(e))return i(e);var t=[];for(var n in Object(e))s.call(e,n)&&"constructor"!=n&&t.push(n);return t}var o=n(39),i=n(40),a=Object.prototype,s=a.hasOwnProperty;e.exports=r},function(e,t){function n(e){var t=e&&e.constructor,n="function"==typeof t&&t.prototype||r;return e===n}var r=Object.prototype;e.exports=n},function(e,t,n){var r=n(41),o=r(Object.keys,Object);e.exports=o},function(e,t){function n(e,t){return function(n){return e(t(n))}}e.exports=n},function(e,t,n){function r(e){return null!=e&&i(e.length)&&!o(e)}var o=n(15),i=n(35);e.exports=r},function(e,t,n){function r(e,t){return function(n,r){if(null==n)return n;if(!o(n))return e(n,r);for(var i=n.length,a=t?i:-1,s=Object(n);(t?a--:++a<i)&&r(s[a],a,s)!==!1;);return n}}var o=n(42);e.exports=r},function(e,t,n){function r(e){return"function"==typeof e?e:o}var o=n(45);e.exports=r},function(e,t){function n(e){return e}e.exports=n},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(47),i=r(o),a=n(15),s=r(a),u=n(12),c=r(u),l=n(16),f=r(l),d=n(17),p=r(d),h=n(129),m=r(h),v=n(141),y=r(v);e.exports.createDefaultObject=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,p.default)(e.fields,function(n){void 0===(0,y.default)(t,n.model)&&void 0!==n.default&&((0,s.default)(n.default)?(0,m.default)(t,n.model,n.default(n,e,t)):(0,f.default)(n.default)||(0,c.default)(n.default)?(0,m.default)(t,n.model,(0,i.default)(n.default)):(0,m.default)(t,n.model,n.default))}),t},e.exports.getMultipleFields=function(e){var t=[];return(0,p.default)(e.fields,function(e){e.multi===!0&&t.push(e)}),t},e.exports.mergeMultiObjectFields=function(t,n){var r={},o=e.exports.getMultipleFields(t);return(0,p.default)(o,function(e){var t=void 0,o=!0,i=e.model;(0,p.default)(n,function(e){var n=(0,y.default)(e,i);o?(t=n,o=!1):t!=n&&(t=void 0)}),(0,m.default)(r,i,t)}),r},e.exports.slugifyFormID=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"undefined"!=typeof e.id?t+e.id:t+(e.inputName||e.label||e.model).toString().trim().toLowerCase().replace(/ |_/g,"-").replace(/-{2,}/g,"-").replace(/^-+|-+$/g,"").replace(/([^a-zA-Z0-9-]+)/g,"")}},function(e,t,n){function r(e){return o(e,i|a)}var o=n(48),i=1,a=4;e.exports=r},function(e,t,n){function r(e,t,n,S,C,P){var F,I=t&O,$=t&j,E=t&M;if(n&&(F=C?n(e,S,C,P):n(e)),void 0!==F)return F;if(!_(e))return e;var N=g(e);if(N){if(F=v(e),!I)return l(e,F)}else{var Y=m(e),R=Y==T||Y==D;if(x(e))return c(e,I);if(Y==A||Y==k||R&&!C){if(F=$||R?{}:b(e),!I)return $?d(e,u(F,e)):f(e,s(F,e))}else{if(!X[Y])return C?e:{};F=y(e,Y,r,I)}}P||(P=new o);var V=P.get(e);if(V)return V;P.set(e,F);var L=E?$?h:p:$?keysIn:w,H=N?void 0:L(e);return i(H||e,function(o,i){H&&(i=o,o=e[i]),a(F,i,r(o,t,n,i,e,P))}),F}var o=n(49),i=n(19),a=n(85),s=n(88),u=n(90),c=n(94),l=n(95),f=n(96),d=n(100),p=n(104),h=n(106),m=n(107),v=n(112),y=n(113),b=n(127),g=n(12),x=n(29),_=n(16),w=n(24),O=1,j=2,M=4,k="[object Arguments]",S="[object Array]",C="[object Boolean]",P="[object Date]",F="[object Error]",T="[object Function]",D="[object GeneratorFunction]",I="[object Map]",$="[object Number]",A="[object Object]",E="[object RegExp]",N="[object Set]",Y="[object String]",R="[object Symbol]",V="[object WeakMap]",L="[object ArrayBuffer]",H="[object DataView]",U="[object Float32Array]",z="[object Float64Array]",q="[object Int8Array]",B="[object Int16Array]",Z="[object Int32Array]",G="[object Uint8Array]",W="[object Uint8ClampedArray]",J="[object Uint16Array]",K="[object Uint32Array]",X={};X[k]=X[S]=X[L]=X[H]=X[C]=X[P]=X[U]=X[z]=X[q]=X[B]=X[Z]=X[I]=X[$]=X[A]=X[E]=X[N]=X[Y]=X[R]=X[G]=X[W]=X[J]=X[K]=!0,X[F]=X[T]=X[V]=!1,e.exports=r},function(e,t,n){function r(e){var t=this.__data__=new o(e);this.size=t.size}var o=n(50),i=n(58),a=n(59),s=n(60),u=n(61),c=n(62);r.prototype.clear=i,r.prototype.delete=a,r.prototype.get=s,r.prototype.has=u,r.prototype.set=c,e.exports=r},function(e,t,n){function r(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}var o=n(51),i=n(52),a=n(55),s=n(56),u=n(57);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=s,r.prototype.set=u,e.exports=r},function(e,t){function n(){this.__data__=[],this.size=0}e.exports=n},function(e,t,n){function r(e){var t=this.__data__,n=o(t,e);if(n<0)return!1;var r=t.length-1;return n==r?t.pop():a.call(t,n,1),--this.size,!0}var o=n(53),i=Array.prototype,a=i.splice;e.exports=r},function(e,t,n){function r(e,t){for(var n=e.length;n--;)if(o(e[n][0],t))return n;return-1}var o=n(54);e.exports=r},function(e,t){function n(e,t){return e===t||e!==e&&t!==t}e.exports=n},function(e,t,n){function r(e){var t=this.__data__,n=o(t,e);return n<0?void 0:t[n][1]}var o=n(53);e.exports=r},function(e,t,n){function r(e){return o(this.__data__,e)>-1}var o=n(53);e.exports=r},function(e,t,n){function r(e,t){var n=this.__data__,r=o(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this}var o=n(53);e.exports=r},function(e,t,n){function r(){this.__data__=new o,this.size=0}var o=n(50);e.exports=r},function(e,t){function n(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}e.exports=n},function(e,t){function n(e){return this.__data__.get(e)}e.exports=n},function(e,t){function n(e){return this.__data__.has(e)}e.exports=n},function(e,t,n){function r(e,t){var n=this.__data__;if(n instanceof o){var r=n.__data__;if(!i||r.length<s-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new a(r)}return n.set(e,t),this.size=n.size,this}var o=n(50),i=n(63),a=n(70),s=200;e.exports=r},function(e,t,n){var r=n(64),o=n(8),i=r(o,"Map");e.exports=i},function(e,t,n){function r(e,t){var n=i(e,t);return o(n)?n:void 0}var o=n(65),i=n(69);e.exports=r},function(e,t,n){function r(e){if(!a(e)||i(e))return!1;var t=o(e)?h:c;return t.test(s(e))}var o=n(15),i=n(66),a=n(16),s=n(68),u=/[\\^$.*+?()[\]{}|]/g,c=/^\[object .+?Constructor\]$/,l=Function.prototype,f=Object.prototype,d=l.toString,p=f.hasOwnProperty,h=RegExp("^"+d.call(p).replace(u,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=r},function(e,t,n){function r(e){return!!i&&i in e}var o=n(67),i=function(){var e=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();e.exports=r},function(e,t,n){var r=n(8),o=r["__core-js_shared__"];e.exports=o},function(e,t){function n(e){if(null!=e){try{return o.call(e)}catch(e){}try{return e+""}catch(e){}}return""}var r=Function.prototype,o=r.toString;e.exports=n},function(e,t){function n(e,t){return null==e?void 0:e[t]}e.exports=n},function(e,t,n){function r(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}var o=n(71),i=n(79),a=n(82),s=n(83),u=n(84);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=s,r.prototype.set=u,e.exports=r},function(e,t,n){function r(){this.size=0,this.__data__={hash:new o,map:new(a||i),string:new o}}var o=n(72),i=n(50),a=n(63);e.exports=r},function(e,t,n){function r(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}var o=n(73),i=n(75),a=n(76),s=n(77),u=n(78);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=s,r.prototype.set=u,e.exports=r},function(e,t,n){function r(){this.__data__=o?o(null):{},this.size=0}var o=n(74);e.exports=r},function(e,t,n){var r=n(64),o=r(Object,"create");e.exports=o},function(e,t){function n(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}e.exports=n},function(e,t,n){function r(e){var t=this.__data__;if(o){var n=t[e];return n===i?void 0:n}return s.call(t,e)?t[e]:void 0}var o=n(74),i="__lodash_hash_undefined__",a=Object.prototype,s=a.hasOwnProperty;e.exports=r},function(e,t,n){function r(e){var t=this.__data__;return o?void 0!==t[e]:a.call(t,e)}var o=n(74),i=Object.prototype,a=i.hasOwnProperty;e.exports=r},function(e,t,n){function r(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=o&&void 0===t?i:t,this}var o=n(74),i="__lodash_hash_undefined__";e.exports=r},function(e,t,n){function r(e){var t=o(this,e).delete(e);return this.size-=t?1:0,t}var o=n(80);e.exports=r},function(e,t,n){function r(e,t){var n=e.__data__;return o(t)?n["string"==typeof t?"string":"hash"]:n.map}var o=n(81);e.exports=r},function(e,t){function n(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}e.exports=n},function(e,t,n){function r(e){return o(this,e).get(e)}var o=n(80);e.exports=r},function(e,t,n){function r(e){return o(this,e).has(e)}var o=n(80);e.exports=r},function(e,t,n){function r(e,t){var n=o(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this}var o=n(80);e.exports=r},function(e,t,n){function r(e,t,n){var r=e[t];s.call(e,t)&&i(r,n)&&(void 0!==n||t in e)||o(e,t,n)}var o=n(86),i=n(54),a=Object.prototype,s=a.hasOwnProperty;e.exports=r},function(e,t,n){function r(e,t,n){"__proto__"==t&&o?o(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}var o=n(87);e.exports=r},function(e,t,n){var r=n(64),o=function(){try{var e=r(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();e.exports=o},function(e,t,n){function r(e,t){return e&&o(t,i(t),e)}var o=n(89),i=n(24);e.exports=r},function(e,t,n){function r(e,t,n,r){var a=!n;n||(n={});for(var s=-1,u=t.length;++s<u;){var c=t[s],l=r?r(n[c],e[c],c,n,e):void 0;void 0===l&&(l=e[c]),a?i(n,c,l):o(n,c,l)}return n}var o=n(85),i=n(86);e.exports=r},function(e,t,n){function r(e,t){return e&&o(t,i(t),e)}var o=n(89),i=n(91);e.exports=r},function(e,t,n){function r(e){return a(e)?o(e,!0):i(e)}var o=n(25),i=n(92),a=n(42);e.exports=r},function(e,t,n){function r(e){if(!o(e))return a(e);var t=i(e),n=[];for(var r in e)("constructor"!=r||!t&&u.call(e,r))&&n.push(r);return n}var o=n(16),i=n(39),a=n(93),s=Object.prototype,u=s.hasOwnProperty;e.exports=r},function(e,t){function n(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}e.exports=n},function(e,t,n){(function(e){function r(e,t){if(t)return e.slice();var n=e.length,r=c?c(n):new e.constructor(n);return e.copy(r),r}var o=n(8),i="object"==typeof t&&t&&!t.nodeType&&t,a=i&&"object"==typeof e&&e&&!e.nodeType&&e,s=a&&a.exports===i,u=s?o.Buffer:void 0,c=u?u.allocUnsafe:void 0;e.exports=r}).call(t,n(30)(e))},function(e,t){function n(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}e.exports=n},function(e,t,n){function r(e,t){return o(e,i(e),t)}var o=n(89),i=n(97);e.exports=r},function(e,t,n){var r=n(98),o=n(99),i=Object.prototype,a=i.propertyIsEnumerable,s=Object.getOwnPropertySymbols,u=s?function(e){return null==e?[]:(e=Object(e),r(s(e),function(t){return a.call(e,t)}))}:o;e.exports=u},function(e,t){function n(e,t){for(var n=-1,r=null==e?0:e.length,o=0,i=[];++n<r;){var a=e[n];t(a,n,e)&&(i[o++]=a)}return i}e.exports=n},function(e,t){function n(){return[]}e.exports=n},function(e,t,n){function r(e,t){return o(e,i(e),t)}var o=n(89),i=n(101);e.exports=r},function(e,t,n){var r=n(102),o=n(103),i=n(97),a=n(99),s=Object.getOwnPropertySymbols,u=s?function(e){for(var t=[];e;)r(t,i(e)),e=o(e);return t}:a;e.exports=u},function(e,t){function n(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}e.exports=n},function(e,t,n){var r=n(41),o=r(Object.getPrototypeOf,Object);e.exports=o},function(e,t,n){function r(e){return o(e,a,i)}var o=n(105),i=n(97),a=n(24);e.exports=r},function(e,t,n){function r(e,t,n){var r=t(e);return i(e)?r:o(r,n(e))}var o=n(102),i=n(12);e.exports=r},function(e,t,n){function r(e){return o(e,a,i)}var o=n(105),i=n(101),a=n(91);e.exports=r},function(e,t,n){var r=n(108),o=n(63),i=n(109),a=n(110),s=n(111),u=n(6),c=n(68),l="[object Map]",f="[object Object]",d="[object Promise]",p="[object Set]",h="[object WeakMap]",m="[object DataView]",v=c(r),y=c(o),b=c(i),g=c(a),x=c(s),_=u;(r&&_(new r(new ArrayBuffer(1)))!=m||o&&_(new o)!=l||i&&_(i.resolve())!=d||a&&_(new a)!=p||s&&_(new s)!=h)&&(_=function(e){var t=u(e),n=t==f?e.constructor:void 0,r=n?c(n):"";if(r)switch(r){case v:return m;case y:return l;case b:return d;case g:return p;case x:return h}return t}),e.exports=_},function(e,t,n){var r=n(64),o=n(8),i=r(o,"DataView");e.exports=i},function(e,t,n){var r=n(64),o=n(8),i=r(o,"Promise");e.exports=i},function(e,t,n){var r=n(64),o=n(8),i=r(o,"Set");e.exports=i},function(e,t,n){var r=n(64),o=n(8),i=r(o,"WeakMap");e.exports=i},function(e,t){function n(e){var t=e.length,n=e.constructor(t);return t&&"string"==typeof e[0]&&o.call(e,"index")&&(n.index=e.index,n.input=e.input),n}var r=Object.prototype,o=r.hasOwnProperty;e.exports=n},function(e,t,n){function r(e,t,n,r){var F=e.constructor;switch(t){case g:return o(e);case f:case d:return new F(+e);case x:return i(e,r);case _:case w:case O:case j:case M:case k:case S:case C:case P:return l(e,r);case p:return a(e,r,n);case h:case y:return new F(e);case m:return s(e);case v:return u(e,r,n);case b:return c(e)}}var o=n(114),i=n(116),a=n(117),s=n(121),u=n(122),c=n(125),l=n(126),f="[object Boolean]",d="[object Date]",p="[object Map]",h="[object Number]",m="[object RegExp]",v="[object Set]",y="[object String]",b="[object Symbol]",g="[object ArrayBuffer]",x="[object DataView]",_="[object Float32Array]",w="[object Float64Array]",O="[object Int8Array]",j="[object Int16Array]",M="[object Int32Array]",k="[object Uint8Array]",S="[object Uint8ClampedArray]",C="[object Uint16Array]",P="[object Uint32Array]";e.exports=r},function(e,t,n){function r(e){var t=new e.constructor(e.byteLength);return new o(t).set(new o(e)),t}var o=n(115);e.exports=r},function(e,t,n){var r=n(8),o=r.Uint8Array;e.exports=o},function(e,t,n){function r(e,t){var n=t?o(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}var o=n(114);e.exports=r},function(e,t,n){function r(e,t,n){var r=t?n(a(e),s):a(e);return i(r,o,new e.constructor)}var o=n(118),i=n(119),a=n(120),s=1;e.exports=r},function(e,t){function n(e,t){return e.set(t[0],t[1]),e}e.exports=n},function(e,t){function n(e,t,n,r){var o=-1,i=null==e?0:e.length;for(r&&i&&(n=e[++o]);++o<i;)n=t(n,e[o],o,e);return n}e.exports=n},function(e,t){function n(e){var t=-1,n=Array(e.size);return e.forEach(function(e,r){n[++t]=[r,e]}),n}e.exports=n},function(e,t){function n(e){var t=new e.constructor(e.source,r.exec(e));return t.lastIndex=e.lastIndex,t}var r=/\w*$/;e.exports=n},function(e,t,n){function r(e,t,n){var r=t?n(a(e),s):a(e);return i(r,o,new e.constructor)}var o=n(123),i=n(119),a=n(124),s=1;e.exports=r},function(e,t){function n(e,t){return e.add(t),e}e.exports=n},function(e,t){function n(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}e.exports=n},function(e,t,n){function r(e){return a?Object(a.call(e)):{}}var o=n(7),i=o?o.prototype:void 0,a=i?i.valueOf:void 0;e.exports=r},function(e,t,n){function r(e,t){var n=t?o(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}var o=n(114);e.exports=r},function(e,t,n){function r(e){return"function"!=typeof e.constructor||a(e)?{}:o(i(e))}var o=n(128),i=n(103),a=n(39);e.exports=r},function(e,t,n){var r=n(16),o=Object.create,i=function(){function e(){}return function(t){if(!r(t))return{};if(o)return o(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();e.exports=i},function(e,t,n){function r(e,t,n){return null==e?e:o(e,t,n)}var o=n(130);e.exports=r},function(e,t,n){function r(e,t,n,r){if(!s(e))return e;t=i(t,e);for(var c=-1,l=t.length,f=l-1,d=e;null!=d&&++c<l;){var p=u(t[c]),h=n;if(c!=f){var m=d[p];h=r?r(m,p,d):void 0,void 0===h&&(h=s(m)?m:a(t[c+1])?[]:{})}o(d,p,h),d=d[p]}return e}var o=n(85),i=n(131),a=n(32),s=n(16),u=n(140);e.exports=r},function(e,t,n){function r(e,t){return o(e)?e:i(e,t)?[e]:a(s(e))}var o=n(12),i=n(132),a=n(134),s=n(137);e.exports=r},function(e,t,n){function r(e,t){if(o(e))return!1;var n=typeof e;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!i(e))||(s.test(e)||!a.test(e)||null!=t&&e in Object(t))}var o=n(12),i=n(133),a=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,s=/^\w*$/;e.exports=r},function(e,t,n){function r(e){return"symbol"==typeof e||i(e)&&o(e)==a}var o=n(6),i=n(13),a="[object Symbol]";e.exports=r},function(e,t,n){var r=n(135),o=/^\./,i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,a=/\\(\\)?/g,s=r(function(e){var t=[];return o.test(e)&&t.push(""),e.replace(i,function(e,n,r,o){t.push(r?o.replace(a,"$1"):n||e)}),t});e.exports=s},function(e,t,n){function r(e){var t=o(e,function(e){return n.size===i&&n.clear(),e}),n=t.cache;return t}var o=n(136),i=500;e.exports=r},function(e,t,n){function r(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError(i);var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var a=e.apply(this,r);return n.cache=i.set(o,a)||i,a};return n.cache=new(r.Cache||o),n}var o=n(70),i="Expected a function";r.Cache=o,e.exports=r},function(e,t,n){function r(e){return null==e?"":o(e)}var o=n(138);e.exports=r},function(e,t,n){function r(e){if("string"==typeof e)return e;if(a(e))return i(e,r)+"";if(s(e))return l?l.call(e):"";var t=e+"";return"0"==t&&1/e==-u?"-0":t}var o=n(7),i=n(139),a=n(12),s=n(133),u=1/0,c=o?o.prototype:void 0,l=c?c.toString:void 0;e.exports=r},function(e,t){function n(e,t){for(var n=-1,r=null==e?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o}e.exports=n},function(e,t,n){function r(e){if("string"==typeof e||o(e))return e;var t=e+"";return"0"==t&&1/e==-i?"-0":t}var o=n(133),i=1/0;e.exports=r},function(e,t,n){function r(e,t,n){var r=null==e?void 0:o(e,t);return void 0===r?n:r}var o=n(142);e.exports=r},function(e,t,n){function r(e,t){t=o(t,e);for(var n=0,r=t.length;null!=e&&n<r;)e=e[i(t[n++])];return n&&n==r?e:void 0}var o=n(131),i=n(140);e.exports=r},function(e,t,n){function r(e){return n(o(e))}function o(e){return i[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var i={"./fieldCheckbox.vue":144,"./fieldChecklist.vue":199,"./fieldInput.vue":204,"./fieldLabel.vue":208,"./fieldRadios.vue":212,"./fieldSelect.vue":216,"./fieldSubmit.vue":220,"./fieldTextArea.vue":224};r.keys=function(){return Object.keys(i)},r.resolve=o,e.exports=r,r.id=143},function(e,t,n){n(145);var r=n(3)(n(146),n(198),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(147),i=r(o);t.default={mixins:[i.default]}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return(0,u.default)(e)?null!=v.default[e]?v.default[e]:(console.warn("'"+e+"' is not a validator function!"),null):e}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),a=r(i),s=n(5),u=r(s),c=n(15),l=r(c),f=n(17),d=r(f),p=n(141),h=r(p),m=n(148),v=r(m),y=n(46);t.default={props:["model","schema","formOptions","disabled"],data:function(){return{errors:[]}},computed:{value:{cache:!1,get:function(){var e=void 0;return(0,l.default)(this.schema.get)?e=this.schema.get(this.model):this.model&&this.schema.model&&(e=(0,h.default)(this.model,this.schema.model)),(0,l.default)(this.formatValueToField)&&(e=this.formatValueToField(e)),e},set:function(e){var t=this.value;(0,l.default)(this.formatValueToModel)&&(e=this.formatValueToModel(e));var n=!1;(0,l.default)(this.schema.set)?(this.schema.set(this.model,e),n=!0):this.schema.model&&(this.setModelValueByPath(this.schema.model,e),n=!0),n&&(this.$emit("model-updated",e,this.schema.model),(0,l.default)(this.schema.onChanged)&&this.schema.onChanged.call(this,this.model,e,t,this.schema),this.$parent.options&&this.$parent.options.validateAfterChanged===!0&&this.validate())}}},methods:{validate:function(e){var t=this;if(this.clearValidationErrors(),this.schema.validator&&this.schema.readonly!==!0&&this.disabled!==!0){var n=[];(0,a.default)(this.schema.validator)?(0,d.default)(this.schema.validator,function(e){n.push(o(e).bind(t))}):n.push(o(this.schema.validator).bind(this)),(0,d.default)(n,function(e){var n=function(e){(0,a.default)(e)?Array.prototype.push.apply(t.errors,e):(0,u.default)(e)&&t.errors.push(e)},r=e(t.value,t.schema,t.model);r&&(0,l.default)(r.then)?r.then(function(e){if(e){n(e);var r=0==t.errors.length;t.$emit("validated",r,t.errors,t)}}):r&&n(r)})}(0,l.default)(this.schema.onValidated)&&this.schema.onValidated.call(this,this.model,this.errors,this.schema);var r=0==this.errors.length;return e||this.$emit("validated",r,this.errors,this),this.errors},clearValidationErrors:function(){this.errors.splice(0)},setModelValueByPath:function(e,t){var n=e.replace(/\[(\w+)\]/g,".$1");n=n.replace(/^\./,"");for(var r=this.model,o=n.split("."),i=0,a=o.length;i<a;){var s=o[i];if(!(i<a-1))return void this.$root.$set(r,s,t);void 0!==r[s]?r=r[s]:(this.$root.$set(r,s,{}),r=r[s]),++i}},getFieldID:function(e){var t=this.formOptions&&this.formOptions.fieldIdPrefix?this.formOptions.fieldIdPrefix:"";return(0,y.slugifyFormID)(e,t)}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:w;return(0,y.default)(e)||""===e?t?[i(n.fieldIsRequired)]:[]:null}function i(e){if(null!=e&&arguments.length>1)for(var t=1;t<arguments.length;t++)e=e.replace("{"+(t-1)+"}",arguments[t]);return e}var a=n(149),s=r(a),u=n(15),c=r(u),l=n(12),f=r(l),d=n(5),p=r(d),h=n(184),m=r(h),v=n(14),y=r(v),b=n(185),g=r(b),x=n(197),_=r(x),w={fieldIsRequired:"This field is required!",invalidFormat:"Invalid format!",numberTooSmall:"The number is too small! Minimum: {0}",numberTooBig:"The number is too big! Maximum: {0}",invalidNumber:"Invalid number",textTooSmall:"The length of text is too small! Current: {0}, Minimum: {1}",textTooBig:"The length of text is too big! Current: {0}, Maximum: {1}",thisNotText:"This is not a text!",
	thisNotArray:"This is not an array!",selectMinItems:"Select minimum {0} items!",selectMaxItems:"Select maximum {0} items!",invalidDate:"Invalid date!",dateIsEarly:"The date is too early! Current: {0}, Minimum: {1}",dateIsLate:"The date is too late! Current: {0}, Maximum: {1}",invalidEmail:"Invalid e-mail address!",invalidURL:"Invalid URL!",invalidCard:"Invalid card format!",invalidCardNumber:"Invalid card number!",invalidTextContainNumber:"Invalid text! Cannot contains numbers or special characters",invalidTextContainSpec:"Invalid text! Cannot contains special characters"};e.exports={resources:w,required:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w;return o(e,t.required,r)},number:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;var s=[];return(0,m.default)(e)?(!(0,y.default)(t.min)&&e<t.min&&s.push(i(r.numberTooSmall,t.min)),!(0,y.default)(t.max)&&e>t.max&&s.push(i(r.numberTooBig,t.max))):s.push(i(r.invalidNumber)),s},integer:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);return null!=a?a:Number(e)!==e||e%1!==0?[i(r.invalidNumber)]:void 0},double:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);return null!=a?a:!(0,m.default)(e)||isNaN(e)?[i(r.invalidNumber)]:void 0},string:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;var s=[];return(0,p.default)(e)?(!(0,y.default)(t.min)&&e.length<t.min&&s.push(i(r.textTooSmall,e.length,t.min)),!(0,y.default)(t.max)&&e.length>t.max&&s.push(i(r.textTooBig,e.length,t.max))):s.push(i(r.thisNotText)),s},array:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w;if(t.required){if(!(0,f.default)(e))return[i(r.thisNotArray)];if(0==e.length)return[i(r.fieldIsRequired)]}if(!(0,y.default)(e)){if(!(0,y.default)(t.min)&&e.length<t.min)return[i(r.selectMinItems,t.min)];if(!(0,y.default)(t.max)&&e.length>t.max)return[i(r.selectMaxItems,t.max)]}},date:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;var s=new Date(e);if(!s)return[i(r.invalidDate)];var u=[];if(!(0,y.default)(t.min)){var c=new Date(t.min);s.valueOf()<c.valueOf()&&u.push(i(r.dateIsEarly,_.default.format(s),_.default.format(c)))}if(!(0,y.default)(t.max)){var l=new Date(t.max);s.valueOf()>l.valueOf()&&u.push(i(r.dateIsLate,_.default.format(s),_.default.format(l)))}return u},regexp:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;if(!(0,y.default)(t.pattern)){var s=new RegExp(t.pattern);if(!s.test(e))return[i(r.invalidFormat)]}},email:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;var s=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return s.test(e)?void 0:[i(r.invalidEmail)]},url:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;var s=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g;return s.test(e)?void 0:[i(r.invalidURL)]},creditCard:function e(t,n,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,s=o(t,n.required,a);if(null!=s)return s;var e=/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,u=t.replace(/[^0-9]+/g,"");if(!e.test(u))return[i(a.invalidCard)];for(var c=0,l=void 0,f=void 0,d=void 0,p=u.length-1;p>=0;p--)l=u.substring(p,p+1),f=parseInt(l,10),d?(f*=2,c+=f>=10?f%10+1:f):c+=f,d=!d;return c%10===0&&u?void 0:[i(a.invalidCardNumber)]},alpha:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;var s=/^[a-zA-Z]*$/;return s.test(e)?void 0:[i(r.invalidTextContainNumber)]},alphaNumeric:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:w,a=o(e,t.required,r);if(null!=a)return a;var s=/^[a-zA-Z0-9]*$/;return s.test(e)?void 0:[i(r.invalidTextContainSpec)]}},(0,s.default)(e.exports).forEach(function(t){var n=e.exports[t];(0,c.default)(n)&&(n.locale=function(e){return function(t,r,o){return n(t,r,o,(0,g.default)(e,w))}})})},function(e,t,n){e.exports={default:n(150),__esModule:!0}},function(e,t,n){n(151),e.exports=n(171).Object.keys},function(e,t,n){var r=n(152),o=n(154);n(169)("keys",function(){return function(e){return o(r(e))}})},function(e,t,n){var r=n(153);e.exports=function(e){return Object(r(e))}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var r=n(155),o=n(168);e.exports=Object.keys||function(e){return r(e,o)}},function(e,t,n){var r=n(156),o=n(157),i=n(160)(!1),a=n(164)("IE_PROTO");e.exports=function(e,t){var n,s=o(e),u=0,c=[];for(n in s)n!=a&&r(s,n)&&c.push(n);for(;t.length>u;)r(s,n=t[u++])&&(~i(c,n)||c.push(n));return c}},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(158),o=n(153);e.exports=function(e){return r(o(e))}},function(e,t,n){var r=n(159);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(157),o=n(161),i=n(163);e.exports=function(e){return function(t,n,a){var s,u=r(t),c=o(u.length),l=i(a,c);if(e&&n!=n){for(;c>l;)if(s=u[l++],s!=s)return!0}else for(;c>l;l++)if((e||l in u)&&u[l]===n)return e||l||0;return!e&&-1}}},function(e,t,n){var r=n(162),o=Math.min;e.exports=function(e){return e>0?o(r(e),9007199254740991):0}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(162),o=Math.max,i=Math.min;e.exports=function(e,t){return e=r(e),e<0?o(e+t,0):i(e,t)}},function(e,t,n){var r=n(165)("keys"),o=n(167);e.exports=function(e){return r[e]||(r[e]=o(e))}},function(e,t,n){var r=n(166),o="__core-js_shared__",i=r[o]||(r[o]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var r=n(170),o=n(171),i=n(180);e.exports=function(e,t){var n=(o.Object||{})[e]||Object[e],a={};a[e]=t(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(e,t,n){var r=n(166),o=n(171),i=n(172),a=n(174),s="prototype",u=function(e,t,n){var c,l,f,d=e&u.F,p=e&u.G,h=e&u.S,m=e&u.P,v=e&u.B,y=e&u.W,b=p?o:o[t]||(o[t]={}),g=b[s],x=p?r:h?r[t]:(r[t]||{})[s];p&&(n=t);for(c in n)l=!d&&x&&void 0!==x[c],l&&c in b||(f=l?x[c]:n[c],b[c]=p&&"function"!=typeof x[c]?n[c]:v&&l?i(f,r):y&&x[c]==f?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[s]=e[s],t}(f):m&&"function"==typeof f?i(Function.call,f):f,m&&((b.virtual||(b.virtual={}))[c]=f,e&u.R&&g&&!g[c]&&a(g,c,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,e.exports=u},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){var r=n(173);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(175),o=n(183);e.exports=n(179)?function(e,t,n){return r.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(176),o=n(178),i=n(182),a=Object.defineProperty;t.f=n(179)?Object.defineProperty:function(e,t,n){if(r(e),t=i(t,!0),r(n),o)try{return a(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(177);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){e.exports=!n(179)&&!n(180)(function(){return 7!=Object.defineProperty(n(181)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){e.exports=!n(180)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,n){var r=n(177),o=n(166).document,i=r(o)&&r(o.createElement);e.exports=function(e){return i?o.createElement(e):{}}},function(e,t,n){var r=n(177);e.exports=function(e,t){if(!r(e))return e;var n,o;if(t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;if("function"==typeof(n=e.valueOf)&&!r(o=n.call(e)))return o;if(!t&&"function"==typeof(n=e.toString)&&!r(o=n.call(e)))return o;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){function r(e){return"number"==typeof e||i(e)&&o(e)==a}var o=n(6),i=n(13),a="[object Number]";e.exports=r},function(e,t,n){var r=n(186),o=n(187),i=n(189),a=n(196),s=i(function(e){return e.push(void 0,a),r(o,void 0,e)});e.exports=s},function(e,t){function n(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}e.exports=n},function(e,t,n){var r=n(89),o=n(188),i=n(91),a=o(function(e,t,n,o){r(t,i(t),e,o)});e.exports=a},function(e,t,n){function r(e){return o(function(t,n){var r=-1,o=n.length,a=o>1?n[o-1]:void 0,s=o>2?n[2]:void 0;for(a=e.length>3&&"function"==typeof a?(o--,a):void 0,s&&i(n[0],n[1],s)&&(a=o<3?void 0:a,o=1),t=Object(t);++r<o;){var u=n[r];u&&e(t,u,r,a)}return t})}var o=n(189),i=n(195);e.exports=r},function(e,t,n){function r(e,t){return a(i(e,t,o),e+"")}var o=n(45),i=n(190),a=n(191);e.exports=r},function(e,t,n){function r(e,t,n){return t=i(void 0===t?e.length-1:t,0),function(){for(var r=arguments,a=-1,s=i(r.length-t,0),u=Array(s);++a<s;)u[a]=r[t+a];a=-1;for(var c=Array(t+1);++a<t;)c[a]=r[a];return c[t]=n(u),o(e,this,c)}}var o=n(186),i=Math.max;e.exports=r},function(e,t,n){var r=n(192),o=n(194),i=o(r);e.exports=i},function(e,t,n){var r=n(193),o=n(87),i=n(45),a=o?function(e,t){return o(e,"toString",{configurable:!0,enumerable:!1,value:r(t),writable:!0})}:i;e.exports=a},function(e,t){function n(e){return function(){return e}}e.exports=n},function(e,t){function n(e){var t=0,n=0;return function(){var a=i(),s=o-(a-n);if(n=a,s>0){if(++t>=r)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}var r=800,o=16,i=Date.now;e.exports=n},function(e,t,n){function r(e,t,n){if(!s(n))return!1;var r=typeof t;return!!("number"==r?i(n)&&a(t,n.length):"string"==r&&t in n)&&o(n[t],e)}var o=n(54),i=n(42),a=n(32),s=n(16);e.exports=r},function(e,t,n){function r(e,t,n,r){return void 0===e||o(e,i[n])&&!a.call(r,n)?t:e}var o=n(54),i=Object.prototype,a=i.hasOwnProperty;e.exports=r},function(e,t,n){var r;!function(o){"use strict";function i(e,t){for(var n=[],r=0,o=e.length;r<o;r++)n.push(e[r].substr(0,t));return n}function a(e){return function(t,n,r){var o=r[e].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~o&&(t.month=o)}}function s(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var u={},c=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,l=/\d\d?/,f=/\d{3}/,d=/\d{4}/,p=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,h=/\[([^]*?)\]/gm,m=function(){},v=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],y=["January","February","March","April","May","June","July","August","September","October","November","December"],b=i(y,3),g=i(v,3);u.i18n={dayNamesShort:g,dayNames:v,monthNamesShort:b,monthNames:y,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!==10)*e%10]}};var x={D:function(e){return e.getDate()},DD:function(e){return s(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDay()},dd:function(e){return s(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return s(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return String(e.getFullYear()).substr(2)},YYYY:function(e){return e.getFullYear()},h:function(e){return e.getHours()%12||12},hh:function(e){return s(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return s(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return s(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return s(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return s(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return s(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+s(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},_={D:[l,function(e,t){e.day=t}],Do:[new RegExp(l.source+p.source),function(e,t){e.day=parseInt(t,10)}],M:[l,function(e,t){e.month=t-1}],YY:[l,function(e,t){var n=new Date,r=+(""+n.getFullYear()).substr(0,2);e.year=""+(t>68?r-1:r)+t}],h:[l,function(e,t){e.hour=t}],m:[l,function(e,t){e.minute=t}],s:[l,function(e,t){e.second=t}],YYYY:[d,function(e,t){e.year=t}],S:[/\d/,function(e,t){e.millisecond=100*t}],SS:[/\d{2}/,function(e,t){e.millisecond=10*t}],SSS:[f,function(e,t){e.millisecond=t}],d:[l,m],ddd:[p,m],MMM:[p,a("monthNamesShort")],MMMM:[p,a("monthNames")],a:[p,function(e,t,n){var r=t.toLowerCase();r===n.amPm[0]?e.isPm=!1:r===n.amPm[1]&&(e.isPm=!0)}],ZZ:[/[\+\-]\d\d:?\d\d/,function(e,t){var n,r=(t+"").match(/([\+\-]|\d\d)/gi);r&&(n=+(60*r[1])+parseInt(r[2],10),e.timezoneOffset="+"===r[0]?n:-n)}]};_.dd=_.d,_.dddd=_.ddd,_.DD=_.D,_.mm=_.m,_.hh=_.H=_.HH=_.h,_.MM=_.M,_.ss=_.s,_.A=_.a,u.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},u.format=function(e,t,n){var r=n||u.i18n;if("number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date in fecha.format");t=u.masks[t]||t||u.masks.default;var o=[];return t=t.replace(h,function(e,t){return o.push(t),"??"}),t=t.replace(c,function(t){return t in x?x[t](e,r):t.slice(1,t.length-1)}),t.replace(/\?\?/g,function(){return o.shift()})},u.parse=function(e,t,n){var r=n||u.i18n;if("string"!=typeof t)throw new Error("Invalid format in fecha.parse");if(t=u.masks[t]||t,e.length>1e3)return!1;var o=!0,i={};if(t.replace(c,function(t){if(_[t]){var n=_[t],a=e.search(n[0]);~a?e.replace(n[0],function(t){return n[1](i,t,r),e=e.substr(a+t.length),t}):o=!1}return _[t]?"":t.slice(1,t.length-1)}),!o)return!1;var a=new Date;i.isPm===!0&&null!=i.hour&&12!==+i.hour?i.hour=+i.hour+12:i.isPm===!1&&12===+i.hour&&(i.hour=0);var s;return null!=i.timezoneOffset?(i.minute=+(i.minute||0)-+i.timezoneOffset,s=new Date(Date.UTC(i.year||a.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0))):s=new Date(i.year||a.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0),s},"undefined"!=typeof e&&e.exports?e.exports=u:(r=function(){return u}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)))}(this)},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],attrs:{type:"checkbox",autocomplete:e.schema.autocomplete,disabled:e.disabled,name:e.schema.inputName},domProps:{checked:Array.isArray(e.value)?e._i(e.value,null)>-1:e.value},on:{click:function(t){var n=e.value,r=t.target,o=!!r.checked;if(Array.isArray(n)){var i=null,a=e._i(n,i);o?a<0&&(e.value=n.concat(i)):a>-1&&(e.value=n.slice(0,a).concat(n.slice(a+1)))}else e.value=o}}})},staticRenderFns:[]}},function(e,t,n){n(200);var r=n(3)(n(201),n(203),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(202),i=r(o),a=n(14),s=r(a),u=n(16),c=r(u),l=n(147),f=r(l);t.default={mixins:[f.default],data:function(){return{comboExpanded:!1}},computed:{items:function(){var e=this.schema.values;return"function"==typeof e?e.apply(this,[this.model,this.schema]):e},selectedCount:function(){return this.value?this.value.length:0}},methods:{getItemValue:function(e){if((0,c.default)(e)){if("undefined"!=typeof this.schema.checklistOptions&&"undefined"!=typeof this.schema.checklistOptions.value)return e[this.schema.checklistOptions.value];if("undefined"!=typeof e.value)return e.value;throw"value is not defined. If you want to use another key name, add a `value` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values"}return e},getItemName:function(e){if((0,c.default)(e)){if("undefined"!=typeof this.schema.checklistOptions&&"undefined"!=typeof this.schema.checklistOptions.name)return e[this.schema.checklistOptions.name];if("undefined"!=typeof e.name)return e.name;throw"name is not defined. If you want to use another key name, add a `name` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values"}return e},isItemChecked:function(e){return this.value&&this.value.indexOf(this.getItemValue(e))!=-1},onChanged:function(e,t){if(!(0,s.default)(this.value)&&Array.isArray(this.value)||(this.value=[]),e.target.checked){var n=(0,i.default)(this.value);n.push(this.getItemValue(t)),this.value=n}else{var r=(0,i.default)(this.value);r.splice(this.value.indexOf(this.getItemValue(t)),1),this.value=r}},onExpandCombo:function(){this.comboExpanded=!this.comboExpanded}}}},function(e,t,n){function r(e){return o(e,i)}var o=n(48),i=4;e.exports=r},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper"},[e.schema.listBox?n("div",{staticClass:"listbox form-control",attrs:{disabled:e.disabled}},e._l(e.items,function(t){return n("div",{staticClass:"list-row",class:{"is-checked":e.isItemChecked(t)}},[n("label",[n("input",{attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:e.isItemChecked(t)},on:{change:function(n){e.onChanged(n,t)}}}),e._v(e._s(e.getItemName(t)))])])})):e._e(),e.schema.listBox?e._e():n("div",{staticClass:"combobox form-control",attrs:{disabled:e.disabled}},[n("div",{staticClass:"mainRow",class:{expanded:e.comboExpanded},on:{click:e.onExpandCombo}},[n("div",{staticClass:"info"},[e._v(e._s(e.selectedCount)+" selected")]),n("div",{staticClass:"arrow"})]),n("div",{staticClass:"dropList"},e._l(e.items,function(t){return e.comboExpanded?n("div",{staticClass:"list-row",class:{"is-checked":e.isItemChecked(t)}},[n("label",[n("input",{attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:e.isItemChecked(t)},on:{change:function(n){e.onChanged(n,t)}}}),e._v(e._s(e.getItemName(t)))])]):e._e()}))])])},staticRenderFns:[]}},function(e,t,n){n(205);var r=n(3)(n(206),n(207),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(147),i=r(o),a=n(197),s=r(a);t.default={mixins:[i.default],methods:{onChange:function(e){"file"===this.schema.inputType&&(this.value=e.target.files)},formatValueToField:function(e){if(null!=e){var t=void 0;switch(this.schema.inputType){case"date":return t=this.schema.format?s.default.parse(e,this.schema.format):new Date(e),s.default.format(t,"YYYY-MM-DD");case"datetime":return t=this.schema.format?s.default.parse(e,this.schema.format):new Date(e),s.default.format(t,"YYYY-MM-DD HH:mm:ss");case"datetime-local":return t=this.schema.format?s.default.parse(e,this.schema.format):new Date(e),s.default.format(t,"YYYY-MM-DDTHH:mm:ss")}}return e},formatValueToModel:function(e){if(null!=e){var t=void 0;switch(this.schema.inputType){case"date":t=s.default.parse(e,"YYYY-MM-DD"),t!==!1&&(e=this.schema.format?s.default.format(t,this.schema.format):t.valueOf());break;case"datetime":t=s.default.parse(e,"YYYY-MM-DD HH:mm:ss"),t!==!1&&(e=this.schema.format?s.default.format(t,this.schema.format):t.valueOf());break;case"datetime-local":t=s.default.parse(e,"YYYY-MM-DDTHH:mm:ss"),t!==!1&&(e=this.schema.format?s.default.format(t,this.schema.format):t.valueOf());break;case"number":return Number(e)}}return e}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper"},[n("input",{staticClass:"form-control",attrs:{id:e.getFieldID(e.schema),type:e.schema.inputType,disabled:e.disabled,accept:e.schema.accept,alt:e.schema.alt,autocomplete:e.schema.autocomplete,dirname:e.schema.dirname,formaction:e.schema.formaction,formenctype:e.schema.formenctype,formmethod:e.schema.formmethod,formnovalidate:e.schema.formnovalidate,formtarget:e.schema.formtarget,height:e.schema.height,list:e.schema.list,max:e.schema.max,maxlength:e.schema.maxlength,min:e.schema.min,multiple:e.schema.multiple,name:e.schema.inputName,pattern:e.schema.pattern,placeholder:e.schema.placeholder,readonly:e.schema.readonly,required:e.schema.required,size:e.schema.size,src:e.schema.src,step:e.schema.step,width:e.schema.width,files:e.schema.files},domProps:{value:e.value,checked:e.schema.checked},on:{input:function(t){e.value=t.target.value},change:e.onChange}}),"color"===e.schema.inputType||"range"===e.schema.inputType?n("span",{staticClass:"helper"},[e._v(e._s(e.value))]):e._e()])},staticRenderFns:[]}},function(e,t,n){n(209);var r=n(3)(n(210),n(211),null,null);e.exports=r.exports},2,146,function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{attrs:{id:e.getFieldID(e.schema)}},[e._v(e._s(e.value))])},staticRenderFns:[]}},function(e,t,n){n(213);var r=n(3)(n(214),n(215),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(16),i=r(o),a=n(147),s=r(a);t.default={mixins:[s.default],computed:{items:function(){var e=this.schema.values;return"function"==typeof e?e.apply(this,[this.model,this.schema]):e},id:function(){return this.schema.model}},methods:{getItemValue:function(e){if((0,i.default)(e)){if("undefined"!=typeof this.schema.radiosOptions&&"undefined"!=typeof this.schema.radiosOptions.value)return e[this.schema.radiosOptions.value];if("undefined"!=typeof e.value)return e.value;throw"value is not defined. If you want to use another key name, add a `value` property under `radiosOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/radios.html#radios-field-with-object-values"}return e},getItemName:function(e){if((0,i.default)(e)){if("undefined"!=typeof this.schema.radiosOptions&&"undefined"!=typeof this.schema.radiosOptions.name)return e[this.schema.radiosOptions.name];if("undefined"!=typeof e.name)return e.name;throw"name is not defined. If you want to use another key name, add a `name` property under `radiosOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/radios.html#radios-field-with-object-values"}return e},onSelection:function(e){this.value=this.getItemValue(e)},isItemChecked:function(e){var t=this.getItemValue(e);return t===this.value}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"radio-list",attrs:{disabled:e.disabled}},e._l(e.items,function(t){return n("label",{class:{"is-checked":e.isItemChecked(t)}},[n("input",{attrs:{type:"radio",disabled:e.disabled,name:e.id},domProps:{value:e.getItemValue(t),checked:e.isItemChecked(t)},on:{click:function(n){e.onSelection(t)}}}),e._v(e._s(e.getItemName(t)))])}))},staticRenderFns:[]}},function(e,t,n){n(217);var r=n(3)(n(218),n(219),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(16),i=r(o),a=n(147),s=r(a);t.default={mixins:[s.default],computed:{selectOptions:function(){return this.schema.selectOptions||{}},items:function(){var e=this.schema.values;return"function"==typeof e?e.apply(this,[this.model,this.schema]):e}},methods:{getItemID:function(e){return(0,i.default)(e)&&e.id?e.id:e},getItemName:function(e){return(0,i.default)(e)&&e.name?e.name:e}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("select",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"form-control",attrs:{disabled:e.disabled,name:e.schema.inputName,id:e.getFieldID(e.schema)},on:{change:function(t){e.value=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t})[0]}}},[e.selectOptions.hideNoneSelectedText?e._e():n("option",{attrs:{disabled:e.schema.required},domProps:{value:null,selected:void 0==e.value}},[e._v(e._s(e.selectOptions.noneSelectedText||"<Nothing selected>"))]),e._l(e.items,function(t){return n("option",{domProps:{value:e.getItemID(t)}},[e._v(e._s(e.getItemName(t)))])})],2)},staticRenderFns:[]}},function(e,t,n){n(221);var r=n(3)(n(222),n(223),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(15),i=r(o),a=n(147),s=r(a);t.default={mixins:[s.default],methods:{click:function(){(this.schema.validateBeforeSubmit!==!0||this.$parent.validate())&&(0,i.default)(this.schema.onSubmit)&&this.schema.onSubmit(this.model,this.schema)}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"submit",name:e.schema.inputName,disabled:e.disabled},domProps:{value:e.schema.buttonText},on:{click:e.click}})},staticRenderFns:[]}},function(e,t,n){n(225);var r=n(3)(n(226),n(227),null,null);e.exports=r.exports},2,146,function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"form-control",attrs:{id:e.getFieldID(e.schema),disabled:e.disabled,maxlength:e.schema.max,minlength:e.schema.min,placeholder:e.schema.placeholder,readonly:e.schema.readonly,rows:e.schema.rows||2,name:e.schema.inputName},domProps:{value:e._s(e.value)},on:{input:function(t){t.target.composing||(e.value=t.target.value)}}})},staticRenderFns:[]}},function(e,t,n){function r(e){return n(o(e))}function o(e){return i[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var i={"./fieldCleave.vue":229,"./fieldDateTimePicker.vue":233,"./fieldGoogleAddress.vue":245,"./fieldImage.vue":249,"./fieldMasked.vue":253,"./fieldNoUiSlider.vue":257,"./fieldPikaday.vue":261,"./fieldRangeSlider.vue":265,"./fieldSelectEx.vue":295,"./fieldSpectrum.vue":299,"./fieldStaticMap.vue":303,"./fieldSwitch.vue":307,"./fieldVueMultiSelect.vue":311};r.keys=function(){return Object.keys(i)},r.resolve=o,e.exports=r,r.id=228},function(e,t,n){n(230);var r=n(3)(n(231),n(232),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(185),i=r(o),a=n(147),s=r(a);t.default={mixins:[s.default],data:function(){return{cleave:null}},mounted:function(){this.$nextTick(function(){window.Cleave?this.cleave=new window.Cleave(this.$el,(0,i.default)(this.schema.cleaveOptions||{},{creditCard:!1,phone:!1,phoneRegionCode:"AU",date:!1,datePattern:["d","m","Y"],numeral:!1,numeralThousandsGroupStyle:"thousand",numeralDecimalScale:2,numeralDecimalMark:".",blocks:[],delimiter:" ",prefix:null,numericOnly:!1,uppercase:!1,lowercase:!1})):console.warn("Cleave is missing. Please download from https://github.com/nosir/cleave.js/ and load the script in the HTML head section!")})},beforeDestroy:function(){this.cleave&&this.cleave.destroy()}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"form-control",attrs:{type:"text",autocomplete:e.schema.autocomplete,disabled:e.disabled,placeholder:e.schema.placeholder,readonly:e.schema.readonly,name:e.schema.inputName,id:e.getFieldID(e.schema)},domProps:{value:e._s(e.value)},on:{input:function(t){t.target.composing||(e.value=t.target.value)}}})},staticRenderFns:[]}},function(e,t,n){n(234);var r=n(3)(n(235),n(244),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(236),i=r(o),a=n(185),s=r(a),u=n(147),c=r(u),l=n(243),f=r(l),d="YYYY-MM-DD HH:mm:ss";t.default={mixins:[c.default],methods:(0,i.default)({getDateFormat:function(){return this.schema.dateTimePickerOptions&&this.schema.dateTimePickerOptions.format?this.schema.dateTimePickerOptions.format:d}},f.default),mounted:function(){this.$nextTick(function(){var e=this;if(window.$&&window.$.fn.datetimepicker){var t=this.$el.querySelector(".form-control");$(this.$el).datetimepicker((0,s.default)(this.schema.dateTimePickerOptions||{},{format:d})).on("dp.change",function(){e.value=t.value})}else console.warn("Bootstrap datetimepicker library is missing. Please download from https://eonasdan.github.io/bootstrap-datetimepicker/ and load the script and CSS in the HTML head section!")})},beforeDestroy:function(){window.$&&window.$.fn.datetimepicker&&$(this.$el).data("DateTimePicker").destroy()}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o=n(237),i=r(o);t.default=i.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}},function(e,t,n){e.exports={default:n(238),__esModule:!0}},function(e,t,n){n(239),e.exports=n(171).Object.assign},function(e,t,n){var r=n(170);r(r.S+r.F,"Object",{assign:n(240)})},function(e,t,n){"use strict";var r=n(154),o=n(241),i=n(242),a=n(152),s=n(158),u=Object.assign;e.exports=!u||n(180)(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e}),7!=u({},e)[n]||Object.keys(u({},t)).join("")!=r})?function(e,t){for(var n=a(e),u=arguments.length,c=1,l=o.f,f=i.f;u>c;)for(var d,p=s(arguments[c++]),h=l?r(p).concat(l(p)):r(p),m=h.length,v=0;m>v;)f.call(p,d=h[v++])&&(n[d]=p[d]);return n}:u},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t){t.f={}.propertyIsEnumerable;
	},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(197),i=r(o);t.default={formatValueToField:function(e){if(null!=e){var t=this.schema.format?i.default.parse(e,this.schema.format):new Date(e);return i.default.format(t,this.getDateFormat())}return e},formatValueToModel:function(e){if(null!=e){var t=i.default.parse(e,this.getDateFormat());e=this.schema.format?i.default.format(t,this.schema.format):t.valueOf()}return e}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"input-group date"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"form-control",attrs:{type:"text",autocomplete:e.schema.autocomplete,disabled:e.disabled,placeholder:e.schema.placeholder,readonly:e.schema.readonly,name:e.schema.inputName,id:e.getFieldID(e.schema)},domProps:{value:e._s(e.value)},on:{input:function(t){t.target.composing||(e.value=t.target.value)}}}),e._m(0)])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"input-group-addon"},[n("span",{staticClass:"glyphicon glyphicon-calendar"})])}]}},function(e,t,n){n(246);var r=n(3)(n(247),n(248),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(15),i=r(o),a=n(147),s=r(a);t.default={mixins:[s.default],data:function(){return{autocomplete:"",inputs:{street_number:"long_name",route:"long_name",country:"long_name",administrative_area_level_1:"long_name",administrative_area_level_2:"long_name",locality:"long_name",postal_code:"short_name"}}},mounted:function(){this.$nextTick(function(){window.google&&window.google.maps&&window.google.maps.places&&window.google.maps.places.Autocomplete?(this.autocomplete=new google.maps.places.Autocomplete(this.$el,{types:["geocode"]}),this.autocomplete.addListener("place_changed",this.pipeAddress)):console.warn("Google Maps API is missing. Please add https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places script in the HTML head section!")})},methods:{pipeAddress:function(){var e=this.autocomplete.getPlace();if(e){this.value=e.formatted_address;var t={};if(void 0!==e.address_components)for(var n=0;n<e.address_components.length;n++){var r=e.address_components[n].types[0];this.inputs[r]&&(t[r]=e.address_components[n][this.inputs[r]])}(0,i.default)(this.schema.onPlaceChanged)&&this.schema.onPlaceChanged(this.value,t,e,this.model,this.schema)}},geolocate:function(){var e=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(t){var n={lat:t.coords.latitude,lng:t.coords.longitude},r=new window.google.maps.Circle({center:n,radius:t.coords.accuracy});e.autocomplete.setBounds(r.getBounds())})}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"form-control",attrs:{type:"text",autocomplete:e.schema.autocomplete,disabled:e.disabled,placeholder:e.schema.placeholder,readonly:e.schema.readonly,name:e.schema.inputName,debounce:"500",id:e.getFieldID(e.schema)},domProps:{value:e._s(e.value)},on:{focus:function(t){e.geolocate()},input:function(t){t.target.composing||(e.value=t.target.value)}}})},staticRenderFns:[]}},function(e,t,n){n(250);var r=n(3)(n(251),n(252),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(147),i=r(o);t.default={mixins:[i.default],computed:{previewStyle:function(){return this.schema.preview!==!1?{display:"block","background-image":null!=this.value?"url("+this.value+")":"none"}:{display:"none"}},wrappedValue:{get:function(){return this.value&&0==this.value.indexOf("data")?"<inline base64 image>":this.value},set:function(e){e&&0==e.indexOf("http")&&(this.value=e)}}},watch:{model:function(){this.$el.querySelector("input.file").value=""}},methods:{remove:function(){this.value=""},fileChanged:function(e){var t=this,n=new FileReader;n.onload=function(e){t.value=e.target.result},e.target.files&&e.target.files.length>0&&n.readAsDataURL(e.target.files[0])}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper"},[n("input",{directives:[{name:"show",rawName:"v-show",value:e.schema.hideInput!==!0,expression:"schema.hideInput !== true"},{name:"model",rawName:"v-model",value:e.wrappedValue,expression:"wrappedValue"}],staticClass:"form-control link",attrs:{type:"text",autocomplete:e.schema.autocomplete,disabled:e.disabled,placeholder:e.schema.placeholder,readonly:e.schema.readonly},domProps:{value:e._s(e.wrappedValue)},on:{input:function(t){t.target.composing||(e.wrappedValue=t.target.value)}}}),e.schema.browse!==!1?n("input",{staticClass:"form-control file",attrs:{type:"file",disabled:e.disabled,name:e.schema.inputName},on:{change:e.fileChanged}}):e._e(),n("div",{staticClass:"preview",style:e.previewStyle},[n("div",{staticClass:"remove",attrs:{title:"Remove image"},on:{click:e.remove}})])])},staticRenderFns:[]}},function(e,t,n){n(254);var r=n(3)(n(255),n(256),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(147),i=r(o);t.default={mixins:[i.default],mounted:function(){this.$nextTick(function(){window.$&&window.$.fn.mask?$(this.$el).unmask().mask(this.schema.mask,this.schema.maskOptions):console.warn("JQuery MaskedInput library is missing. Please download from https://github.com/digitalBush/jquery.maskedinput and load the script in the HTML head section!")})},beforeDestroy:function(){window.$&&window.$.fn.mask&&$(this.$el).unmask()}}},232,function(e,t,n){n(258);var r=n(3)(n(259),n(260),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(185),i=r(o),a=n(12),s=r(a),u=n(147),c=r(u);t.default={mixins:[c.default],data:function(){return{slider:null}},watch:{model:function(){window.noUiSlider&&this.slider&&this.slider.noUiSlider&&this.slider.noUiSlider.set(this.value)}},computed:{containPips:function(){return this.schema.noUiSliderOptions&&"undefined"!=typeof this.schema.noUiSliderOptions.pips},containTooltip:function(){return this.schema.noUiSliderOptions&&this.schema.noUiSliderOptions.tooltips}},methods:{onChange:function(e){(0,s.default)(e)?this.value=[parseFloat(e[0]),parseFloat(e[1])]:this.value=parseFloat(e)},formatValueToField:function(e){null!==this.slider&&"undefined"!=typeof this.slider.noUiSlider&&this.slider.noUiSlider.set(e)},formatValueToModel:function(e){if("undefined"!=typeof this.slider.noUiSlider)return e instanceof Array?[Number(e[0]),Number(e[1])]:Number(e)},getStartValue:function(){return null!=this.value?this.value:"undefined"!=typeof this.schema.noUiSliderOptions&&this.schema.noUiSliderOptions.double?[this.schema.min,this.schema.min]:this.schema.min}},mounted:function(){this.$nextTick(function(){window.noUiSlider?(this.slider=this.$el,window.noUiSlider.create(this.slider,(0,i.default)(this.schema.noUiSliderOptions||{},{start:this.getStartValue(),range:{min:this.schema.min,max:this.schema.max}})),this.slider.noUiSlider.on("change",this.onChange.bind(this))):console.warn("noUiSlider is missing. Please download from https://github.com/leongersen/noUiSlider and load the script and CSS in the HTML head section!")})},beforeDestroy:function(){this.slider&&this.slider.noUiSlider.off("change")}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"slider",class:{"contain-pips":e.containPips,"contain-tooltip":e.containTooltip},attrs:{disabled:e.disabled}})},staticRenderFns:[]}},function(e,t,n){n(262);var r=n(3)(n(263),n(264),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(236),i=r(o),a=n(185),s=r(a),u=n(147),c=r(u),l=n(243),f=r(l),d="YYYY-MM-DD";t.default={mixins:[c.default],data:function(){return{picker:null}},methods:(0,i.default)({getDateFormat:function(){return this.schema.pikadayOptions&&this.schema.pikadayOptions.format?this.schema.pikadayOptions.format:d}},f.default),mounted:function(){var e=this;this.$nextTick(function(){window.Pikaday?e.picker=new window.Pikaday((0,s.default)(e.schema.pikadayOptions||{},{field:e.$el,onSelect:function(){e.value=e.picker.toString()}})):console.warn("Pikaday is missing. Please download from https://github.com/dbushell/Pikaday/ and load the script and CSS in the HTML head section!")})},beforeDestroy:function(){this.picker&&this.picker.destroy()}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"form-control",attrs:{type:"text",autocomplete:e.schema.autocomplete,disabled:e.disabled,placeholder:e.schema.placeholder,readonly:e.schema.readonly,name:e.schema.inputName},domProps:{value:e._s(e.value)},on:{input:function(t){t.target.composing||(e.value=t.target.value)}}})},staticRenderFns:[]}},function(e,t,n){n(266);var r=n(3)(n(267),n(294),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(268),i=r(o),a=n(12),s=r(a),u=n(185),c=r(u),l=n(147),f=r(l);t.default={mixins:[f.default],data:function(){return{slider:null}},watch:{model:function(){if(window.$&&window.$.fn.ionRangeSlider){var e=void 0,t=void 0;if((0,s.default)(this.value)){var n=(0,i.default)(this.value,2);e=n[0],t=n[1]}else e=this.value;this.slider&&this.slider.update({from:e,to:t})}}},mounted:function(){this.$nextTick(function(){if(window.$&&window.$.fn.ionRangeSlider){var e=void 0,t=void 0;if((0,s.default)(this.value)){var n=(0,i.default)(this.value,2);e=n[0],t=n[1]}else e=this.value;var r=this;$(this.$el).ionRangeSlider((0,c.default)(this.schema.rangeSliderOptions||{},{type:"single",grid:!0,hide_min_max:!0,from:e,to:t,onChange:function(e){"double"==r.slider.options.type?r.value=[e.from,e.to]:r.value=e.from}})),this.slider=$(this.$el).data("ionRangeSlider")}else console.warn("ion.rangeSlider library is missing. Please download from https://github.com/IonDen/ion.rangeSlider and load the script and CSS in the HTML head section!")})},beforeDestroy:function(){this.slider&&this.slider.destroy()}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o=n(269),i=r(o),a=n(290),s=r(a);t.default=function(){function e(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=(0,s.default)(e);!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if((0,i.default)(Object(t)))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},function(e,t,n){e.exports={default:n(270),__esModule:!0}},function(e,t,n){n(271),n(286),e.exports=n(288)},function(e,t,n){n(272);for(var r=n(166),o=n(174),i=n(275),a=n(284)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;u<5;u++){var c=s[u],l=r[c],f=l&&l.prototype;f&&!f[a]&&o(f,a,c),i[c]=i.Array}},function(e,t,n){"use strict";var r=n(273),o=n(274),i=n(275),a=n(157);e.exports=n(276)(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,o(1)):"keys"==t?o(0,n):"values"==t?o(0,e[n]):o(0,[n,e[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(e,t){e.exports=function(){}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t){e.exports={}},function(e,t,n){"use strict";var r=n(277),o=n(170),i=n(278),a=n(174),s=n(156),u=n(275),c=n(279),l=n(283),f=n(285),d=n(284)("iterator"),p=!([].keys&&"next"in[].keys()),h="@@iterator",m="keys",v="values",y=function(){return this};e.exports=function(e,t,n,b,g,x,_){c(n,t,b);var w,O,j,M=function(e){if(!p&&e in P)return P[e];switch(e){case m:return function(){return new n(this,e)};case v:return function(){return new n(this,e)}}return function(){return new n(this,e)}},k=t+" Iterator",S=g==v,C=!1,P=e.prototype,F=P[d]||P[h]||g&&P[g],T=F||M(g),D=g?S?M("entries"):T:void 0,I="Array"==t?P.entries||F:F;if(I&&(j=f(I.call(new e)),j!==Object.prototype&&(l(j,k,!0),r||s(j,d)||a(j,d,y))),S&&F&&F.name!==v&&(C=!0,T=function(){return F.call(this)}),r&&!_||!p&&!C&&P[d]||a(P,d,T),u[t]=T,u[k]=y,g)if(w={values:S?T:M(v),keys:x?T:M(m),entries:D},_)for(O in w)O in P||i(P,O,w[O]);else o(o.P+o.F*(p||C),t,w);return w}},function(e,t){e.exports=!0},function(e,t,n){e.exports=n(174)},function(e,t,n){"use strict";var r=n(280),o=n(183),i=n(283),a={};n(174)(a,n(284)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(a,{next:o(1,n)}),i(e,t+" Iterator")}},function(e,t,n){var r=n(176),o=n(281),i=n(168),a=n(164)("IE_PROTO"),s=function(){},u="prototype",c=function(){var e,t=n(181)("iframe"),r=i.length,o="<",a=">";for(t.style.display="none",n(282).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(o+"script"+a+"document.F=Object"+o+"/script"+a),e.close(),c=e.F;r--;)delete c[u][i[r]];return c()};e.exports=Object.create||function(e,t){var n;return null!==e?(s[u]=r(e),n=new s,s[u]=null,n[a]=e):n=c(),void 0===t?n:o(n,t)}},function(e,t,n){var r=n(175),o=n(176),i=n(154);e.exports=n(179)?Object.defineProperties:function(e,t){o(e);for(var n,a=i(t),s=a.length,u=0;s>u;)r.f(e,n=a[u++],t[n]);return e}},function(e,t,n){e.exports=n(166).document&&document.documentElement},function(e,t,n){var r=n(175).f,o=n(156),i=n(284)("toStringTag");e.exports=function(e,t,n){e&&!o(e=n?e:e.prototype,i)&&r(e,i,{configurable:!0,value:t})}},function(e,t,n){var r=n(165)("wks"),o=n(167),i=n(166).Symbol,a="function"==typeof i,s=e.exports=function(e){return r[e]||(r[e]=a&&i[e]||(a?i:o)("Symbol."+e))};s.store=r},function(e,t,n){var r=n(156),o=n(152),i=n(164)("IE_PROTO"),a=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=o(e),r(e,i)?e[i]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},function(e,t,n){"use strict";var r=n(287)(!0);n(276)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t,n){var r=n(162),o=n(153);e.exports=function(e){return function(t,n){var i,a,s=String(o(t)),u=r(n),c=s.length;return u<0||u>=c?e?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===c||(a=s.charCodeAt(u+1))<56320||a>57343?e?s.charAt(u):i:e?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},function(e,t,n){var r=n(289),o=n(284)("iterator"),i=n(275);e.exports=n(171).isIterable=function(e){var t=Object(e);return void 0!==t[o]||"@@iterator"in t||i.hasOwnProperty(r(t))}},function(e,t,n){var r=n(159),o=n(284)("toStringTag"),i="Arguments"==r(function(){return arguments}()),a=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,n,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=a(t=Object(e),o))?n:i?r(t):"Object"==(s=r(t))&&"function"==typeof t.callee?"Arguments":s}},function(e,t,n){e.exports={default:n(291),__esModule:!0}},function(e,t,n){n(271),n(286),e.exports=n(292)},function(e,t,n){var r=n(176),o=n(293);e.exports=n(171).getIterator=function(e){var t=o(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e))}},function(e,t,n){var r=n(289),o=n(284)("iterator"),i=n(275);e.exports=n(171).getIteratorMethod=function(e){if(void 0!=e)return e[o]||e["@@iterator"]||i[r(e)]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"text",autocomplete:e.schema.autocomplete,"data-disable":e.disabled,"data-max":e.schema.max,"data-min":e.schema.min,"data-step":e.schema.step,placeholder:e.schema.placeholder,readonly:e.schema.readonly,name:e.schema.inputName}})},staticRenderFns:[]}},function(e,t,n){n(296);var r=n(3)(n(297),n(298),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(16),i=r(o),a=n(147),s=r(a);t.default={mixins:[s.default],computed:{items:function(){var e=this.schema.values;return"function"==typeof e?e.apply(this,[this.model,this.schema]):e}},methods:{getItemID:function(e){return(0,i.default)(e)&&e.id?e.id:e},getItemName:function(e){return(0,i.default)(e)&&e.name?e.name:e}},watch:{model:function(){$.fn.selectpicker&&$(this.$el).selectpicker("refresh")}},mounted:function(){this.$nextTick(function(){$.fn.selectpicker?$(this.$el).selectpicker("destroy").selectpicker(this.schema.selectOptions):console.warn("Bootstrap-select library is missing. Please download from https://silviomoreto.github.io/bootstrap-select/ and load the script and CSS in the HTML head section!")})},beforeDestroy:function(){$.fn.selectpicker&&$(this.$el).selectpicker("destroy")}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("select",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"selectpicker",attrs:{disabled:e.disabled,multiple:e.schema.multiSelect,title:e.schema.placeholder,"data-width":"100%",name:e.schema.inputName},on:{change:function(t){e.value=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t})[0]}}},[e.schema.multiSelect!==!0?n("option",{attrs:{disabled:e.schema.required},domProps:{value:null,selected:void 0==e.value}}):e._e(),e._l(e.items,function(t){return n("option",{domProps:{value:e.getItemID(t)}},[e._v(e._s(e.getItemName(t)))])})],2)},staticRenderFns:[]}},function(e,t,n){n(300);var r=n(3)(n(301),n(302),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(185),i=r(o),a=n(147),s=r(a);t.default={mixins:[s.default],data:function(){return{picker:null}},watch:{model:function(){window.$&&window.$.fn.spectrum&&this.picker.spectrum("set",this.value)},disabled:function(e){e?this.picker.spectrum("disable"):this.picker.spectrum("enable")}},mounted:function(){this.$nextTick(function(){var e=this;window.$&&window.$.fn.spectrum?(this.picker=$(this.$el).spectrum("destroy").spectrum((0,i.default)(this.schema.colorOptions||{},{showInput:!0,showAlpha:!0,disabled:this.schema.disabled,allowEmpty:!this.schema.required,preferredFormat:"hex",change:function(t){e.value=t?t.toString():null}})),this.picker.spectrum("set",this.value)):console.warn("Spectrum color library is missing. Please download from http://bgrins.github.io/spectrum/ and load the script and CSS in the HTML head section!")})},beforeDestroy:function(){this.picker&&this.picker.spectrum("destroy")}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"text",autocomplete:e.schema.autocomplete,disabled:e.disabled,placeholder:e.schema.placeholder,readonly:e.schema.readonly,name:e.schema.inputName,id:e.getFieldID(e.schema)}})},staticRenderFns:[]}},function(e,t,n){n(304);var r=n(3)(n(305),n(306),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(290),i=r(o),a=n(185),s=r(a),u=n(147),c=r(u);t.default={mixins:[c.default],computed:{mapLink:function(){if(this.value){var e=void 0,t=void 0,n=(0,s.default)(this.schema.staticMapOptions||{},{lat:"lat",lng:"lng",zoom:8,sizeX:640,sizeY:640});e=this.value[n.lat],t=this.value[n.lng];var r="http://maps.googleapis.com/maps/api/staticmap?center="+e+","+t+"&zoom="+n.zoom+"&size="+n.sizeX+"x"+n.sizeY,o=["scale","format","maptype","language","region","markers","path","visible","style","key","signature"],a=!0,u=!1,c=void 0;try{for(var l,f=(0,i.default)(o);!(a=(l=f.next()).done);a=!0){var d=l.value;"undefined"!=typeof n[d]&&(r+="&"+d+"="+n[d])}}catch(e){u=!0,c=e}finally{try{!a&&f.return&&f.return()}finally{if(u)throw c}}if(e&&t)return r}}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("img",{attrs:{src:e.mapLink}})},staticRenderFns:[]}},function(e,t,n){n(308);var r=n(3)(n(309),n(310),null,null);e.exports=r.exports},2,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(147),i=r(o);t.default={mixins:[i.default],methods:{formatValueToField:function(e){return null!=e&&this.schema.valueOn?e==this.schema.valueOn:e},formatValueToModel:function(e){return null!=e&&this.schema.valueOn?e?this.schema.valueOn:this.schema.valueOff:e}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],attrs:{type:"checkbox",autocomplete:e.schema.autocomplete,disabled:e.disabled,name:e.schema.inputName,id:e.getFieldID(e.schema)},domProps:{checked:Array.isArray(e.value)?e._i(e.value,null)>-1:e.value},on:{click:function(t){var n=e.value,r=t.target,o=!!r.checked;if(Array.isArray(n)){var i=null,a=e._i(n,i);o?a<0&&(e.value=n.concat(i)):a>-1&&(e.value=n.slice(0,a).concat(n.slice(a+1)))}else e.value=o}}}),n("span",{staticClass:"label",attrs:{"data-on":e.schema.textOn||"On","data-off":e.schema.textOff||"Off",for:e.getFieldID(e.schema)}}),n("span",{staticClass:"handle"})])},staticRenderFns:[]}},function(e,t,n){var r=n(3)(n(312),n(313),null,null);e.exports=r.exports},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(147),i=r(o);t.default={mixins:[i.default],computed:{selectOptions:function(){return this.schema.selectOptions||{}},options:function(){var e=this.schema.values;return"function"==typeof e?e.apply(this,[this.model,this.schema]):e},customLabel:function(){return"undefined"!=typeof this.schema.selectOptions&&"undefined"!=typeof this.schema.selectOptions.customLabel&&"function"==typeof this.schema.selectOptions.customLabel?this.schema.selectOptions.customLabel:void 0}},methods:{updateSelected:function(e){this.value=e},addTag:function(e,t){var n=this.selectOptions.onNewTag;"function"==typeof n&&n(e,t,this.options,this.value)},onSearchChange:function(e,t){var n=this.selectOptions.onSearch;"function"==typeof n&&n(e,t,this.options)},onSelect:function(){},onRemove:function(){},onOpen:function(){},onClose:function(){}},created:function(){this.$root.$options.components.multiselect||console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!")}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("multiselect",{attrs:{id:e.selectOptions.id,options:e.options,value:e.value,multiple:e.selectOptions.multiple,"track-by":e.selectOptions.trackBy||null,label:e.selectOptions.label||null,searchable:e.selectOptions.searchable,"clear-on-select":e.selectOptions.clearOnSelect,"hide-selected":e.selectOptions.hideSelected,placeholder:e.schema.placeholder,"allow-empty":e.selectOptions.allowEmpty,"reset-after":e.selectOptions.resetAfter,"close-on-select":e.selectOptions.closeOnSelect,"custom-label":e.customLabel,taggable:e.selectOptions.taggable,"tag-placeholder":e.selectOptions.tagPlaceholder,max:e.schema.max||null,"options-limit":e.selectOptions.optionsLimit,"group-values":e.selectOptions.groupValues,"group-label":e.selectOptions.groupLabel,"block-keys":e.selectOptions.blockKeys,"internal-search":e.selectOptions.internalSearch,"select-label":e.selectOptions.selectLabel,"selected-label":e.selectOptions.selectedLabel,"deselect-label":e.selectOptions.deselectLabel,"show-labels":e.selectOptions.showLabels,limit:e.selectOptions.limit,"limit-text":e.selectOptions.limitText,loading:e.selectOptions.loading,disabled:e.disabled,"max-height":e.selectOptions.maxHeight,"show-pointer":e.selectOptions.showPointer,"option-height":e.selectOptions.optionHeight},on:{input:e.updateSelected,select:e.onSelect,remove:e.onRemove,"search-change":e.onSearchChange,tag:e.addTag,open:e.onOpen,close:e.onClose}})},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return null!=e.schema?n("div",{staticClass:"vue-form-generator"},[e.schema.fields?n(e.tag,{tag:"fieldset"},[e._l(e.fields,function(t){return[e.fieldVisible(t)?n("div",{staticClass:"form-group",class:e.getFieldRowClasses(t)},[e.fieldTypeHasLabel(t)?n("label",{attrs:{for:e.getFieldID(t)}},[e._v(e._s(t.label)),t.help?n("span",{staticClass:"help"},[n("i",{staticClass:"icon"}),n("div",{staticClass:"helpText",domProps:{innerHTML:e._s(t.help)}})]):e._e()]):e._e(),n("div",{staticClass:"field-wrap"},[n(e.getFieldType(t),{tag:"component",attrs:{disabled:e.fieldDisabled(t),model:e.model,schema:t,formOptions:e.options},on:{"model-updated":e.modelUpdated,validated:e.onFieldValidated}}),e.buttonVisibility(t)?n("div",{staticClass:"buttons"},e._l(t.buttons,function(r){return n("button",{class:r.classes,on:{click:function(n){e.buttonClickHandler(r,t,n)}}},[e._v(e._s(r.label))])})):e._e()],1),t.hint?n("div",{staticClass:"hint"},[e._v(e._s(t.hint))]):e._e(),e.fieldErrors(t).length>0?n("div",{staticClass:"errors help-block"},e._l(e.fieldErrors(t),function(t,r){return n("span",{attrs:{"track-by":"index"}},[e._v(e._s(t))])})):e._e()]):e._e()]})],2):e._e(),e._l(e.groups,function(t){return[n("fieldset",[t.legend?n("legend",[e._v(e._s(t.legend))]):e._e(),e._l(t.fields,function(t){return[e.fieldVisible(t)?n("div",{staticClass:"form-group",class:e.getFieldRowClasses(t)},[e.fieldTypeHasLabel(t)?n("label",{attrs:{for:e.getFieldID(t)}},[e._v(e._s(t.label)),t.help?n("span",{staticClass:"help"},[n("i",{staticClass:"icon"}),n("div",{staticClass:"helpText",domProps:{innerHTML:e._s(t.help)}})]):e._e()]):e._e(),n("div",{staticClass:"field-wrap"},[n(e.getFieldType(t),{tag:"component",attrs:{disabled:e.fieldDisabled(t),model:e.model,schema:t,formOptions:e.options},on:{"model-updated":e.modelUpdated,validated:e.onFieldValidated}}),e.buttonVisibility(t)?n("div",{staticClass:"buttons"},e._l(t.buttons,function(r){return n("button",{class:r.classes,on:{click:function(n){e.buttonClickHandler(r,t,n)}}},[e._v(e._s(r.label))])})):e._e()],1),t.hint?n("div",{staticClass:"hint"},[e._v(e._s(t.hint))]):e._e(),e.fieldErrors(t).length>0?n("div",{staticClass:"errors help-block"},e._l(e.fieldErrors(t),function(t,r){return n("span",{attrs:{"track-by":"index"}},[e._v(e._s(t))])})):e._e()]):e._e()]})],2)]})],2):e._e()},staticRenderFns:[]}}]))});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	  * vue-router v2.7.0
	  * (c) 2017 Evan You
	  * @license MIT
	  */
	'use strict';

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (process.env.NODE_ENV !== 'production' && !condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
	  }
	}

	function isError (err) {
	  return Object.prototype.toString.call(err).indexOf('Error') > -1
	}

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (_, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true;

	    // directly use parent context's createElement() function
	    // so that components rendered by router-view can resolve named slots
	    var h = parent.$createElement;
	    var name = props.name;
	    var route = parent.$route;
	    var cache = parent._routerViewCache || (parent._routerViewCache = {});

	    // determine current view depth, also check to see if the tree
	    // has been toggled inactive but kept-alive.
	    var depth = 0;
	    var inactive = false;
	    while (parent && parent._routerRoot !== parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++;
	      }
	      if (parent._inactive) {
	        inactive = true;
	      }
	      parent = parent.$parent;
	    }
	    data.routerViewDepth = depth;

	    // render previous view if the tree is inactive and kept-alive
	    if (inactive) {
	      return h(cache[name], data, children)
	    }

	    var matched = route.matched[depth];
	    // render empty node if no matched route
	    if (!matched) {
	      cache[name] = null;
	      return h()
	    }

	    var component = cache[name] = matched.components[name];

	    // attach instance registration hook
	    // this will be called in the instance's injected lifecycle hooks
	    data.registerRouteInstance = function (vm, val) {
	      // val could be undefined for unregistration
	      var current = matched.instances[name];
	      if (
	        (val && current !== vm) ||
	        (!val && current === vm)
	      ) {
	        matched.instances[name] = val;
	      }
	    }

	    // also regiseter instance in prepatch hook
	    // in case the same component instance is reused across different routes
	    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
	      matched.instances[name] = vnode.componentInstance;
	    };

	    // resolve props
	    data.props = resolveProps(route, matched.props && matched.props[name]);

	    return h(component, data, children)
	  }
	};

	function resolveProps (route, config) {
	  switch (typeof config) {
	    case 'undefined':
	      return
	    case 'object':
	      return config
	    case 'function':
	      return config(route)
	    case 'boolean':
	      return config ? route.params : undefined
	    default:
	      if (process.env.NODE_ENV !== 'production') {
	        warn(
	          false,
	          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
	          "expecting an object, function or boolean."
	        );
	      }
	  }
	}

	/*  */

	var encodeReserveRE = /[!'()*]/g;
	var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
	var commaRE = /%2C/g;

	// fixed encodeURIComponent which is more conformant to RFC3986:
	// - escapes [!'()*]
	// - preserve commas
	var encode = function (str) { return encodeURIComponent(str)
	  .replace(encodeReserveRE, encodeReserveReplacer)
	  .replace(commaRE, ','); };

	var decode = decodeURIComponent;

	function resolveQuery (
	  query,
	  extraQuery,
	  _parseQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  var parse = _parseQuery || parseQuery;
	  var parsedQuery;
	  try {
	    parsedQuery = parse(query || '');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn(false, e.message);
	    parsedQuery = {};
	  }
	  for (var key in extraQuery) {
	    var val = extraQuery[key];
	    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
	  }
	  return parsedQuery
	}

	function parseQuery (query) {
	  var res = {};

	  query = query.trim().replace(/^(\?|#|&)/, '');

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=');
	    var key = decode(parts.shift());
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null;

	    if (res[key] === undefined) {
	      res[key] = val;
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val);
	    } else {
	      res[key] = [res[key], val];
	    }
	  });

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).map(function (key) {
	    var val = obj[key];

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = [];
	      val.forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key));
	        } else {
	          result.push(encode(key) + '=' + encode(val2));
	        }
	      });
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null;
	  return res ? ("?" + res) : ''
	}

	/*  */


	var trailingSlashRE = /\/?$/;

	function createRoute (
	  record,
	  location,
	  redirectedFrom,
	  router
	) {
	  var stringifyQuery$$1 = router && router.options.stringifyQuery;
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location, stringifyQuery$$1),
	    matched: record ? formatMatch(record) : []
	  };
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	});

	function formatMatch (record) {
	  var res = [];
	  while (record) {
	    res.unshift(record);
	    record = record.parent;
	  }
	  return res
	}

	function getFullPath (
	  ref,
	  _stringifyQuery
	) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  var stringify = _stringifyQuery || stringifyQuery;
	  return (path || '/') + stringify(query) + hash
	}

	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a);
	  var bKeys = Object.keys(b);
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) {
	    var aVal = a[key];
	    var bVal = b[key];
	    // check nested equality
	    if (typeof aVal === 'object' && typeof bVal === 'object') {
	      return isObjectEqual(aVal, bVal)
	    }
	    return String(aVal) === String(bVal)
	  })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.replace(trailingSlashRE, '/').indexOf(
	      target.path.replace(trailingSlashRE, '/')
	    ) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object];
	var eventTypes = [String, Array];

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String,
	    exactActiveClass: String,
	    event: {
	      type: eventTypes,
	      default: 'click'
	    }
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router;
	    var current = this.$route;
	    var ref = router.resolve(this.to, current, this.append);
	    var location = ref.location;
	    var route = ref.route;
	    var href = ref.href;

	    var classes = {};
	    var globalActiveClass = router.options.linkActiveClass;
	    var globalExactActiveClass = router.options.linkExactActiveClass;
	    // Support global empty active class
	    var activeClassFallback = globalActiveClass == null
	            ? 'router-link-active'
	            : globalActiveClass;
	    var exactActiveClassFallback = globalExactActiveClass == null
	            ? 'router-link-exact-active'
	            : globalExactActiveClass;
	    var activeClass = this.activeClass == null
	            ? activeClassFallback
	            : this.activeClass;
	    var exactActiveClass = this.exactActiveClass == null
	            ? exactActiveClassFallback
	            : this.exactActiveClass;
	    var compareTarget = location.path
	      ? createRoute(null, location, null, router)
	      : route;

	    classes[exactActiveClass] = isSameRoute(current, compareTarget);
	    classes[activeClass] = this.exact
	      ? classes[exactActiveClass]
	      : isIncludedRoute(current, compareTarget);

	    var handler = function (e) {
	      if (guardEvent(e)) {
	        if (this$1.replace) {
	          router.replace(location);
	        } else {
	          router.push(location);
	        }
	      }
	    };

	    var on = { click: guardEvent };
	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) { on[e] = handler; });
	    } else {
	      on[this.event] = handler;
	    }

	    var data = {
	      class: classes
	    };

	    if (this.tag === 'a') {
	      data.on = on;
	      data.attrs = { href: href };
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default);
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false;
	        var extend = _Vue.util.extend;
	        var aData = a.data = extend({}, a.data);
	        aData.on = on;
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
	        aAttrs.href = href;
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on;
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	};

	function guardEvent (e) {
	  // don't redirect with control keys
	  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
	  // don't redirect when preventDefault called
	  if (e.defaultPrevented) { return }
	  // don't redirect on right click
	  if (e.button !== undefined && e.button !== 0) { return }
	  // don't redirect if `target="_blank"`
	  if (e.currentTarget && e.currentTarget.getAttribute) {
	    var target = e.currentTarget.getAttribute('target');
	    if (/\b_blank\b/i.test(target)) { return }
	  }
	  // this may be a Weex event which doesn't have this method
	  if (e.preventDefault) {
	    e.preventDefault();
	  }
	  return true
	}

	function findAnchor (children) {
	  if (children) {
	    var child;
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	var _Vue;

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true;

	  _Vue = Vue;

	  var isDef = function (v) { return v !== undefined; };

	  var registerInstance = function (vm, callVal) {
	    var i = vm.$options._parentVnode;
	    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
	      i(vm, callVal);
	    }
	  };

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (isDef(this.$options.router)) {
	        this._routerRoot = this;
	        this._router = this.$options.router;
	        this._router.init(this);
	        Vue.util.defineReactive(this, '_route', this._router.history.current);
	      } else {
	        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
	      }
	      registerInstance(this, this);
	    },
	    destroyed: function destroyed () {
	      registerInstance(this);
	    }
	  });

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this._routerRoot._router }
	  });

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get () { return this._routerRoot._route }
	  });

	  Vue.component('router-view', View);
	  Vue.component('router-link', Link);

	  var strats = Vue.config.optionMergeStrategies;
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
	}

	/*  */

	var inBrowser = typeof window !== 'undefined';

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  var firstChar = relative.charAt(0);
	  if (firstChar === '/') {
	    return relative
	  }

	  if (firstChar === '?' || firstChar === '#') {
	    return base + relative
	  }

	  var stack = base.split('/');

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '..') {
	      stack.pop();
	    } else if (segment !== '.') {
	      stack.push(segment);
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = '';
	  var query = '';

	  var hashIndex = path.indexOf('#');
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex);
	    path = path.slice(0, hashIndex);
	  }

	  var queryIndex = path.indexOf('?');
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1);
	    path = path.slice(0, queryIndex);
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	var index$1 = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp;
	var parse_1 = parse;
	var compile_1 = compile;
	var tokensToFunction_1 = tokensToFunction;
	var tokensToRegExp_1 = tokensToRegExp;

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g');

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var defaultDelimiter = options && options.delimiter || '/';
	  var res;

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue
	    }

	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }

	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || defaultDelimiter;
	    var pattern = capture || group;

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    });
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }

	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];

	      if (typeof token === 'string') {
	        path += token;

	        continue
	      }

	      var value = data[token.name];
	      var segment;

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (index$1(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment;
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys;
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = [];

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source);
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!index$1(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }

	  options = options || {};

	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';

	      keys.push(token);

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }

	      route += capture;
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/');
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
	  }

	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!index$1(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }

	  options = options || {};

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (index$1(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	var regexpCompileCache = Object.create(null);

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path));
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
	    }
	    return ''
	  }
	}

	/*  */

	function createRouteMap (
	  routes,
	  oldPathList,
	  oldPathMap,
	  oldNameMap
	) {
	  // the path list is used to control path matching priority
	  var pathList = oldPathList || [];
	  var pathMap = oldPathMap || Object.create(null);
	  var nameMap = oldNameMap || Object.create(null);

	  routes.forEach(function (route) {
	    addRouteRecord(pathList, pathMap, nameMap, route);
	  });

	  // ensure wildcard routes are always at the end
	  for (var i = 0, l = pathList.length; i < l; i++) {
	    if (pathList[i] === '*') {
	      pathList.push(pathList.splice(i, 1)[0]);
	      l--;
	      i--;
	    }
	  }

	  return {
	    pathList: pathList,
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathList,
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  if (process.env.NODE_ENV !== 'production') {
	    assert(path != null, "\"path\" is required in a route configuration.");
	    assert(
	      typeof route.component !== 'string',
	      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
	      "string id. Use an actual component instead."
	    );
	  }

	  var normalizedPath = normalizePath(path, parent);
	  var pathToRegexpOptions = route.pathToRegexpOptions || {};

	  if (typeof route.caseSensitive === 'boolean') {
	    pathToRegexpOptions.sensitive = route.caseSensitive;
	  }

	  var record = {
	    path: normalizedPath,
	    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {},
	    props: route.props == null
	      ? {}
	      : route.components
	        ? route.props
	        : { default: route.props }
	  };

	  if (route.children) {
	    // Warn if route is named, does not redirect and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (process.env.NODE_ENV !== 'production') {
	      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
	        warn(
	          false,
	          "Named Route '" + (route.name) + "' has a default child route. " +
	          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
	          "the default child route will not be rendered. Remove the name from " +
	          "this route and use the name of the default child route for named " +
	          "links instead."
	        );
	      }
	    }
	    route.children.forEach(function (child) {
	      var childMatchAs = matchAs
	        ? cleanPath((matchAs + "/" + (child.path)))
	        : undefined;
	      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
	    });
	  }

	  if (route.alias !== undefined) {
	    var aliases = Array.isArray(route.alias)
	      ? route.alias
	      : [route.alias];

	    aliases.forEach(function (alias) {
	      var aliasRoute = {
	        path: alias,
	        children: route.children
	      };
	      addRouteRecord(
	        pathList,
	        pathMap,
	        nameMap,
	        aliasRoute,
	        parent,
	        record.path || '/' // matchAs
	      );
	    });
	  }

	  if (!pathMap[record.path]) {
	    pathList.push(record.path);
	    pathMap[record.path] = record;
	  }

	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record;
	    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
	      warn(
	        false,
	        "Duplicate named routes definition: " +
	        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
	      );
	    }
	  }
	}

	function compileRouteRegex (path, pathToRegexpOptions) {
	  var regex = index(path, [], pathToRegexpOptions);
	  if (process.env.NODE_ENV !== 'production') {
	    var keys = {};
	    regex.keys.forEach(function (key) {
	      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
	      keys[key.name] = true;
	    });
	  }
	  return regex
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '');
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	/*  */


	function normalizeLocation (
	  raw,
	  current,
	  append,
	  router
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw;
	  // named target
	  if (next.name || next._normalized) {
	    return next
	  }

	  // relative params
	  if (!next.path && next.params && current) {
	    next = assign({}, next);
	    next._normalized = true;
	    var params = assign(assign({}, current.params), next.params);
	    if (current.name) {
	      next.name = current.name;
	      next.params = params;
	    } else if (current.matched.length) {
	      var rawPath = current.matched[current.matched.length - 1].path;
	      next.path = fillParams(rawPath, params, ("path " + (current.path)));
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, "relative params navigation requires a current route.");
	    }
	    return next
	  }

	  var parsedPath = parsePath(next.path || '');
	  var basePath = (current && current.path) || '/';
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append || next.append)
	    : basePath;

	  var query = resolveQuery(
	    parsedPath.query,
	    next.query,
	    router && router.options.parseQuery
	  );

	  var hash = next.hash || parsedPath.hash;
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash;
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function assign (a, b) {
	  for (var key in b) {
	    a[key] = b[key];
	  }
	  return a
	}

	/*  */


	function createMatcher (
	  routes,
	  router
	) {
	  var ref = createRouteMap(routes);
	  var pathList = ref.pathList;
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function addRoutes (routes) {
	    createRouteMap(routes, pathList, pathMap, nameMap);
	  }

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute, false, router);
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name];
	      if (process.env.NODE_ENV !== 'production') {
	        warn(record, ("Route with name '" + name + "' does not exist"));
	      }
	      if (!record) { return _createRoute(null, location) }
	      var paramNames = record.regex.keys
	        .filter(function (key) { return !key.optional; })
	        .map(function (key) { return key.name; });

	      if (typeof location.params !== 'object') {
	        location.params = {};
	      }

	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key];
	          }
	        }
	      }

	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {};
	      for (var i = 0; i < pathList.length; i++) {
	        var path = pathList[i];
	        var record$1 = pathMap[path];
	        if (matchRoute(record$1.regex, location.path, location.params)) {
	          return _createRoute(record$1, location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect;
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location, null, router))
	        : originalRedirect;

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect };
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      if (process.env.NODE_ENV !== 'production') {
	        warn(
	          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
	        );
	      }
	      return _createRoute(null, location)
	    }

	    var re = redirect;
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query;
	    hash = re.hasOwnProperty('hash') ? re.hash : hash;
	    params = re.hasOwnProperty('params') ? re.params : params;

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name];
	      if (process.env.NODE_ENV !== 'production') {
	        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
	      }
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record);
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      if (process.env.NODE_ENV !== 'production') {
	        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
	      }
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    });
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched;
	      var aliasedRecord = matched[matched.length - 1];
	      location.params = aliasedMatch.params;
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom, router)
	  }

	  return {
	    match: match,
	    addRoutes: addRoutes
	  }
	}

	function matchRoute (
	  regex,
	  path,
	  params
	) {
	  var m = path.match(regex);

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = regex.keys[i - 1];
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
	    if (key) {
	      params[key.name] = val;
	    }
	  }

	  return true
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */


	var positionStore = Object.create(null);

	function setupScroll () {
	  window.addEventListener('popstate', function (e) {
	    saveScrollPosition();
	    if (e.state && e.state.key) {
	      setStateKey(e.state.key);
	    }
	  });
	}

	function handleScroll (
	  router,
	  to,
	  from,
	  isPop
	) {
	  if (!router.app) {
	    return
	  }

	  var behavior = router.options.scrollBehavior;
	  if (!behavior) {
	    return
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert(typeof behavior === 'function', "scrollBehavior must be a function");
	  }

	  // wait until re-render finishes before scrolling
	  router.app.$nextTick(function () {
	    var position = getScrollPosition();
	    var shouldScroll = behavior(to, from, isPop ? position : null);
	    if (!shouldScroll) {
	      return
	    }
	    var isObject = typeof shouldScroll === 'object';
	    if (isObject && typeof shouldScroll.selector === 'string') {
	      var el = document.querySelector(shouldScroll.selector);
	      if (el) {
	        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
	        offset = normalizeOffset(offset);
	        position = getElementPosition(el, offset);
	      } else if (isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll);
	      }
	    } else if (isObject && isValidPosition(shouldScroll)) {
	      position = normalizePosition(shouldScroll);
	    }

	    if (position) {
	      window.scrollTo(position.x, position.y);
	    }
	  });
	}

	function saveScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    positionStore[key] = {
	      x: window.pageXOffset,
	      y: window.pageYOffset
	    };
	  }
	}

	function getScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    return positionStore[key]
	  }
	}

	function getElementPosition (el, offset) {
	  var docEl = document.documentElement;
	  var docRect = docEl.getBoundingClientRect();
	  var elRect = el.getBoundingClientRect();
	  return {
	    x: elRect.left - docRect.left - offset.x,
	    y: elRect.top - docRect.top - offset.y
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function normalizeOffset (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : 0,
	    y: isNumber(obj.y) ? obj.y : 0
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */

	var supportsPushState = inBrowser && (function () {
	  var ua = window.navigator.userAgent;

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})();

	// use User Timing api (if present) for more accurate key precision
	var Time = inBrowser && window.performance && window.performance.now
	  ? window.performance
	  : Date;

	var _key = genKey();

	function genKey () {
	  return Time.now().toFixed(3)
	}

	function getStateKey () {
	  return _key
	}

	function setStateKey (key) {
	  _key = key;
	}

	function pushState (url, replace) {
	  saveScrollPosition();
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history;
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url);
	    } else {
	      _key = genKey();
	      history.pushState({ key: _key }, '', url);
	    }
	  } catch (e) {
	    window.location[replace ? 'replace' : 'assign'](url);
	  }
	}

	function replaceState (url) {
	  pushState(url, true);
	}

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb();
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1);
	        });
	      } else {
	        step(index + 1);
	      }
	    }
	  };
	  step(0);
	}

	/*  */

	function resolveAsyncComponents (matched) {
	  return function (to, from, next) {
	    var hasAsync = false;
	    var pending = 0;
	    var error = null;

	    flatMapComponents(matched, function (def, _, match, key) {
	      // if it's a function and doesn't have cid attached,
	      // assume it's an async component resolve function.
	      // we are not using Vue's default async resolving mechanism because
	      // we want to halt the navigation until the incoming component has been
	      // resolved.
	      if (typeof def === 'function' && def.cid === undefined) {
	        hasAsync = true;
	        pending++;

	        var resolve = once(function (resolvedDef) {
	          if (resolvedDef.__esModule && resolvedDef.default) {
	            resolvedDef = resolvedDef.default;
	          }
	          // save resolved on async factory in case it's used elsewhere
	          def.resolved = typeof resolvedDef === 'function'
	            ? resolvedDef
	            : _Vue.extend(resolvedDef);
	          match.components[key] = resolvedDef;
	          pending--;
	          if (pending <= 0) {
	            next();
	          }
	        });

	        var reject = once(function (reason) {
	          var msg = "Failed to resolve async component " + key + ": " + reason;
	          process.env.NODE_ENV !== 'production' && warn(false, msg);
	          if (!error) {
	            error = isError(reason)
	              ? reason
	              : new Error(msg);
	            next(error);
	          }
	        });

	        var res;
	        try {
	          res = def(resolve, reject);
	        } catch (e) {
	          reject(e);
	        }
	        if (res) {
	          if (typeof res.then === 'function') {
	            res.then(resolve, reject);
	          } else {
	            // new syntax in Vue 2.3
	            var comp = res.component;
	            if (comp && typeof comp.then === 'function') {
	              comp.then(resolve, reject);
	            }
	          }
	        }
	      }
	    });

	    if (!hasAsync) { next(); }
	  }
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}

	// in Webpack 2, require.ensure now also returns a Promise
	// so the resolve/reject functions may get called an extra time
	// if the user uses an arrow function shorthand that happens to
	// return that Promise.
	function once (fn) {
	  var called = false;
	  return function () {
	    var args = [], len = arguments.length;
	    while ( len-- ) args[ len ] = arguments[ len ];

	    if (called) { return }
	    called = true;
	    return fn.apply(this, args)
	  }
	}

	/*  */

	var History = function History (router, base) {
	  this.router = router;
	  this.base = normalizeBase(base);
	  // start with a route object that stands for "nowhere"
	  this.current = START;
	  this.pending = null;
	  this.ready = false;
	  this.readyCbs = [];
	  this.readyErrorCbs = [];
	  this.errorCbs = [];
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb;
	};

	History.prototype.onReady = function onReady (cb, errorCb) {
	  if (this.ready) {
	    cb();
	  } else {
	    this.readyCbs.push(cb);
	    if (errorCb) {
	      this.readyErrorCbs.push(errorCb);
	    }
	  }
	};

	History.prototype.onError = function onError (errorCb) {
	  this.errorCbs.push(errorCb);
	};

	History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current);
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route);
	    onComplete && onComplete(route);
	    this$1.ensureURL();

	    // fire ready cbs once
	    if (!this$1.ready) {
	      this$1.ready = true;
	      this$1.readyCbs.forEach(function (cb) { cb(route); });
	    }
	  }, function (err) {
	    if (onAbort) {
	      onAbort(err);
	    }
	    if (err && !this$1.ready) {
	      this$1.ready = true;
	      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
	    }
	  });
	};

	History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
	    var this$1 = this;

	  var current = this.current;
	  var abort = function (err) {
	    if (isError(err)) {
	      if (this$1.errorCbs.length) {
	        this$1.errorCbs.forEach(function (cb) { cb(err); });
	      } else {
	        warn(false, 'uncaught error during route navigation:');
	        console.error(err);
	      }
	    }
	    onAbort && onAbort(err);
	  };
	  if (
	    isSameRoute(route, current) &&
	    // in the case the route map has been dynamically appended to
	    route.matched.length === current.matched.length
	  ) {
	    this.ensureURL();
	    return abort()
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var updated = ref.updated;
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // in-component update hooks
	    extractUpdateHooks(updated),
	    // in-config enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  );

	  this.pending = route;
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) {
	      return abort()
	    }
	    try {
	      hook(route, current, function (to) {
	        if (to === false || isError(to)) {
	          // next(false) -> abort navigation, ensure current URL
	          this$1.ensureURL(true);
	          abort(to);
	        } else if (
	          typeof to === 'string' ||
	          (typeof to === 'object' && (
	            typeof to.path === 'string' ||
	            typeof to.name === 'string'
	          ))
	        ) {
	          // next('/') or next({ path: '/' }) -> redirect
	          abort();
	          if (typeof to === 'object' && to.replace) {
	            this$1.replace(to);
	          } else {
	            this$1.push(to);
	          }
	        } else {
	          // confirm transition and pass on the value
	          next(to);
	        }
	      });
	    } catch (e) {
	      abort(e);
	    }
	  };

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = [];
	    var isValid = function () { return this$1.current === route; };
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
	    var queue = enterGuards.concat(this$1.router.resolveHooks);
	    runQueue(queue, iterator, function () {
	      if (this$1.pending !== route) {
	        return abort()
	      }
	      this$1.pending = null;
	      onComplete(route);
	      if (this$1.router.app) {
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { cb(); });
	        });
	      }
	    });
	  });
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current;
	  this.current = route;
	  this.cb && this.cb(route);
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev);
	  });
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base');
	      base = (baseEl && baseEl.getAttribute('href')) || '/';
	      // strip full URL origin
	      base = base.replace(/^https?:\/\/[^\/]+/, '');
	    } else {
	      base = '/';
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base;
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i;
	  var max = Math.max(current.length, next.length);
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    updated: next.slice(0, i),
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractGuards (
	  records,
	  name,
	  bind,
	  reverse
	) {
	  var guards = flatMapComponents(records, function (def, instance, match, key) {
	    var guard = extractGuard(def, name);
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
	        : bind(guard, instance, match, key)
	    }
	  });
	  return flatten(reverse ? guards.reverse() : guards)
	}

	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def);
	  }
	  return def.options[key]
	}

	function extractLeaveGuards (deactivated) {
	  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
	}

	function extractUpdateHooks (updated) {
	  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
	}

	function bindGuard (guard, instance) {
	  if (instance) {
	    return function boundRouteGuard () {
	      return guard.apply(instance, arguments)
	    }
	  }
	}

	function extractEnterGuards (
	  activated,
	  cbs,
	  isValid
	) {
	  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
	    return bindEnterGuard(guard, match, key, cbs, isValid)
	  })
	}

	function bindEnterGuard (
	  guard,
	  match,
	  key,
	  cbs,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb);
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid);
	        });
	      }
	    })
	  }
	}

	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key]);
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid);
	    }, 16);
	  }
	}

	/*  */


	var HTML5History = (function (History$$1) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History$$1.call(this, router, base);

	    var expectScroll = router.options.scrollBehavior;

	    if (expectScroll) {
	      setupScroll();
	    }

	    window.addEventListener('popstate', function (e) {
	      var current = this$1.current;
	      this$1.transitionTo(getLocation(this$1.base), function (route) {
	        if (expectScroll) {
	          handleScroll(router, route, current, true);
	        }
	      });
	    });
	  }

	  if ( History$$1 ) HTML5History.__proto__ = History$$1;
	  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n);
	  };

	  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;

	    var ref = this;
	    var fromRoute = ref.current;
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, fromRoute, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;

	    var ref = this;
	    var fromRoute = ref.current;
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, fromRoute, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath);
	      push ? pushState(current) : replaceState(current);
	    }
	  };

	  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getLocation(this.base)
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname;
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length);
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	/*  */


	var HashHistory = (function (History$$1) {
	  function HashHistory (router, base, fallback) {
	    History$$1.call(this, router, base);
	    // check history fallback deeplinking
	    if (fallback && checkFallback(this.base)) {
	      return
	    }
	    ensureSlash();
	  }

	  if ( History$$1 ) HashHistory.__proto__ = History$$1;
	  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  // this is delayed until the app mounts
	  // to avoid the hashchange listener being fired too early
	  HashHistory.prototype.setupListeners = function setupListeners () {
	    var this$1 = this;

	    window.addEventListener('hashchange', function () {
	      if (!ensureSlash()) {
	        return
	      }
	      this$1.transitionTo(getHash(), function (route) {
	        replaceHash(route.fullPath);
	      });
	    });
	  };

	  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n);
	  };

	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath;
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current);
	    }
	  };

	  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getHash()
	  };

	  return HashHistory;
	}(History));

	function checkFallback (base) {
	  var location = getLocation(base);
	  if (!/^\/#/.test(location)) {
	    window.location.replace(
	      cleanPath(base + '/#' + location)
	    );
	    return true
	  }
	}

	function ensureSlash () {
	  var path = getHash();
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path);
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var index = href.indexOf('#');
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path;
	}

	function replaceHash (path) {
	  var href = window.location.href;
	  var i = href.indexOf('#');
	  var base = i >= 0 ? href.slice(0, i) : href;
	  window.location.replace((base + "#" + path));
	}

	/*  */


	var AbstractHistory = (function (History$$1) {
	  function AbstractHistory (router, base) {
	    History$$1.call(this, router, base);
	    this.stack = [];
	    this.index = -1;
	  }

	  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
	  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
	      this$1.index++;
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n;
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex];
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex;
	      this$1.updateRoute(route);
	    });
	  };

	  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    var current = this.stack[this.stack.length - 1];
	    return current ? current.fullPath : '/'
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null;
	  this.apps = [];
	  this.options = options;
	  this.beforeHooks = [];
	  this.resolveHooks = [];
	  this.afterHooks = [];
	  this.matcher = createMatcher(options.routes || [], this);

	  var mode = options.mode || 'hash';
	  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
	  if (this.fallback) {
	    mode = 'hash';
	  }
	  if (!inBrowser) {
	    mode = 'abstract';
	  }
	  this.mode = mode;

	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base);
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback);
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this, options.base);
	      break
	    default:
	      if (process.env.NODE_ENV !== 'production') {
	        assert(false, ("invalid mode: " + mode));
	      }
	  }
	};

	var prototypeAccessors = { currentRoute: {} };

	VueRouter.prototype.match = function match (
	  raw,
	  current,
	  redirectedFrom
	) {
	  return this.matcher.match(raw, current, redirectedFrom)
	};

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  process.env.NODE_ENV !== 'production' && assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  );

	  this.apps.push(app);

	  // main app already initialized.
	  if (this.app) {
	    return
	  }

	  this.app = app;

	  var history = this.history;

	  if (history instanceof HTML5History) {
	    history.transitionTo(history.getCurrentLocation());
	  } else if (history instanceof HashHistory) {
	    var setupHashListener = function () {
	      history.setupListeners();
	    };
	    history.transitionTo(
	      history.getCurrentLocation(),
	      setupHashListener,
	      setupHashListener
	    );
	  }

	  history.listen(function (route) {
	    this$1.apps.forEach(function (app) {
	      app._route = route;
	    });
	  });
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  return registerHook(this.beforeHooks, fn)
	};

	VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
	  return registerHook(this.resolveHooks, fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  return registerHook(this.afterHooks, fn)
	};

	VueRouter.prototype.onReady = function onReady (cb, errorCb) {
	  this.history.onReady(cb, errorCb);
	};

	VueRouter.prototype.onError = function onError (errorCb) {
	  this.history.onError(errorCb);
	};

	VueRouter.prototype.push = function push (location, onComplete, onAbort) {
	  this.history.push(location, onComplete, onAbort);
	};

	VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
	  this.history.replace(location, onComplete, onAbort);
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n);
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1);
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1);
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
	  var route = to
	    ? to.matched
	      ? to
	      : this.resolve(to).route
	    : this.currentRoute;
	  if (!route) {
	    return []
	  }
	  return [].concat.apply([], route.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	VueRouter.prototype.resolve = function resolve (
	  to,
	  current,
	  append
	) {
	  var location = normalizeLocation(
	    to,
	    current || this.history.current,
	    append,
	    this
	  );
	  var route = this.match(location, current);
	  var fullPath = route.redirectedFrom || route.fullPath;
	  var base = this.history.base;
	  var href = createHref(base, fullPath, this.mode);
	  return {
	    location: location,
	    route: route,
	    href: href,
	    // for backwards compat
	    normalizedTo: location,
	    resolved: route
	  }
	};

	VueRouter.prototype.addRoutes = function addRoutes (routes) {
	  this.matcher.addRoutes(routes);
	  if (this.history.current !== START) {
	    this.history.transitionTo(this.history.getCurrentLocation());
	  }
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	function registerHook (list, fn) {
	  list.push(fn);
	  return function () {
	    var i = list.indexOf(fn);
	    if (i > -1) { list.splice(i, 1); }
	  }
	}

	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '#' + fullPath : fullPath;
	  return base ? cleanPath(base + '/' + path) : path
	}

	VueRouter.install = install;
	VueRouter.version = '2.7.0';

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter);
	}

	module.exports = VueRouter;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(18)

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(20),
	  /* template */
	  __webpack_require__(21),
	  /* scopeId */
	  "data-v-9915c650",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/modal.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] modal.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9915c650", Component.options)
	  } else {
	    hotAPI.reload("data-v-9915c650", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("57f2a308", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9915c650&scoped=true!./modal.css", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9915c650&scoped=true!./modal.css");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\n.modal[data-v-9915c650] {\n    z-index: 1000;\n}\n.modal-mask[data-v-9915c650] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.3);\n}\n.modal-inner[data-v-9915c650] {\n    margin: auto;\n    margin-top: 100px;\n    width: 660px;\n}\n.modal-container[data-v-9915c650] {\n    position: relative;\n    border-radius: 4px;\n    background-color: white;\n    padding: 32px;\n}\n.modal-close[data-v-9915c650] {\n    position: absolute;\n    right: 16px;\n    top: 16px;\n}\n", ""]);

	// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	
	// Requires vue-form-generator loaded
	const store = __webpack_require__(3);

	module.exports = {
	  computed: {
	    modalEditing() {return store.state.modalEditing}
	  },
	  methods: {
	    close() {
	      store.commit('editOnModal', null);
	    }
	  },
	  watch: {
	    'modalEditing': function(value) {
	      this.$nextTick(() => {
	        if (value) {
	          let input = this.$refs.container.querySelector('input, textarea');
	          if (input) {
	            input.focus();
	          }
	        }
	      });
	    }
	  }
	}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (_vm.modalEditing) ? _c('div', {
	    staticClass: "modal"
	  }, [_c('div', {
	    staticClass: "modal-mask",
	    on: {
	      "click": function($event) {
	        if ($event.target !== $event.currentTarget) { return null; }
	        _vm.close($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "modal-inner"
	  }, [_c('div', {
	    ref: "container",
	    staticClass: "modal-container",
	    on: {
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        if (!$event.ctrlKey) { return null; }
	        $event.stopPropagation();
	        _vm.close($event)
	      }
	    }
	  }, [_c('button', {
	    staticClass: "btn modal-close",
	    on: {
	      "click": _vm.close
	    }
	  }, [_c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("close")])]), _vm._v(" "), _c('h2', {
	    domProps: {
	      "textContent": _vm._s(_vm.modalEditing.modelVerboseName)
	    }
	  }), _vm._v(" "), _c('vue-form-generator', {
	    attrs: {
	      "schema": _vm.modalEditing.schema,
	      "model": _vm.modalEditing
	    }
	  })], 1)])])]) : _vm._e()
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9915c650", module.exports)
	  }
	}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(23),
	  /* template */
	  __webpack_require__(24),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/modalButton.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] modalButton.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4f15872a", Component.options)
	  } else {
	    hotAPI.reload("data-v-4f15872a", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	
	const store = __webpack_require__(3);

	module.exports = {
	  props: ["model"],
	  methods: {
	    open() {
	      store.commit('editOnModal', this.model);
	    }
	  }
	}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('button', {
	    staticClass: "btn",
	    on: {
	      "click": _vm.open
	    }
	  }, [_c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("edit")]), _vm._v("編集する")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4f15872a", module.exports)
	  }
	}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(26)

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(28),
	  /* template */
	  __webpack_require__(29),
	  /* scopeId */
	  "data-v-7663d851",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/bodyedit.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] bodyedit.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7663d851", Component.options)
	  } else {
	    hotAPI.reload("data-v-7663d851", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("b1115c44", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7663d851&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./bodyedit.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7663d851&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./bodyedit.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\nspan.body-text[data-v-7663d851] {\n    white-space: pre-line;\n}\n", ""]);

	// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	
	const Vue = __webpack_require__(1);

	const store = __webpack_require__(3);

	module.exports = {
	  directives: {
	    focus: function (el, value) {
	      Vue.nextTick(() => {
	        if (value) {
	          el.focus();
	        } else {
	          el.blur();
	        }
	      });
	    }
	  },
	  props: {
	    obj: Object,
	    bodyAttr: String,
	    widget: String  // 'input' or 'textarea'
	  },
	  computed: {
	    isEditing() {
	      return this.obj == store.state.bodyEditing;
	    }
	  },
	  methods: {
	    edit() {
	      store.commit('editBody', this.obj);
	    },
	    end() {
	      store.commit('endBodyEditing');
	    }
	  }
	}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', [(_vm.isEditing && _vm.widget == 'input') ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.obj[_vm.bodyAttr]),
	      expression: "obj[bodyAttr]"
	    }, {
	      name: "focus",
	      rawName: "v-focus",
	      value: (_vm.isEditing),
	      expression: "isEditing"
	    }],
	    domProps: {
	      "value": (_vm.obj[_vm.bodyAttr])
	    },
	    on: {
	      "blur": _vm.end,
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        if (!$event.ctrlKey) { return null; }
	        _vm.end($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.obj, _vm.bodyAttr, $event.target.value)
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.isEditing && _vm.widget == 'textarea') ? _c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.obj[_vm.bodyAttr]),
	      expression: "obj[bodyAttr]"
	    }, {
	      name: "focus",
	      rawName: "v-focus",
	      value: (_vm.isEditing),
	      expression: "isEditing"
	    }],
	    domProps: {
	      "value": (_vm.obj[_vm.bodyAttr])
	    },
	    on: {
	      "blur": _vm.end,
	      "keydown": function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        if (!$event.ctrlKey) { return null; }
	        _vm.end($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.obj, _vm.bodyAttr, $event.target.value)
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.isEditing) ? _c('span', {
	    staticClass: "body-text",
	    domProps: {
	      "textContent": _vm._s(_vm.obj[_vm.bodyAttr])
	    },
	    on: {
	      "dblclick": _vm.edit
	    }
	  }) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7663d851", module.exports)
	  }
	}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(31),
	  /* template */
	  __webpack_require__(35),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/stakeholders.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] stakeholders.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4d7d5232", Component.options)
	  } else {
	    hotAPI.reload("data-v-4d7d5232", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	
	const Vue = __webpack_require__(1);

	const models = __webpack_require__(5);
	const store = __webpack_require__(3);

	Vue.component('stakeholder', __webpack_require__(32));

	module.exports = {
	  computed: {
	    stakeholder() {return store.state.rootStakeholder}
	  }
	}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(33),
	  /* template */
	  __webpack_require__(34),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/stakeholder.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] stakeholder.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6dbc7111", Component.options)
	  } else {
	    hotAPI.reload("data-v-6dbc7111", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	
	const models = __webpack_require__(5);
	const store = __webpack_require__(3);

	module.exports = {
	  props: {
	    stakeholder: models.Stakeholder
	  },

	  methods: {
	    addChild() {
	      let s = new models.Stakeholder('');
	      this.stakeholder.addChild(s);
	      store.commit('editOnModal', s);
	    },
	    addDemand() {
	      let d = new models.Demand('');
	      this.stakeholder.addDemand(d);
	      store.commit('editOnModal', d);
	    }
	  }
	}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('li', [_c('div', {
	    staticClass: "stakeholder inline"
	  }, [_c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("person")]), _vm._v(" "), _c('bodyedit', {
	    attrs: {
	      "obj": _vm.stakeholder,
	      "bodyAttr": "name",
	      "widget": "input"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "action-buttons"
	  }, [_c('button', {
	    staticClass: "btn",
	    on: {
	      "click": _vm.addChild
	    }
	  }, [_c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("add")]), _vm._v(" "), _c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("person")])]), _vm._v(" "), (_vm.stakeholder.hasParent()) ? [_c('button', {
	    staticClass: "btn",
	    on: {
	      "click": _vm.addDemand
	    }
	  }, [_c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("add")]), _vm._v("\n          要望・痛み\n        ")]), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.stakeholder
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "btn",
	    on: {
	      "click": function($event) {
	        _vm.stakeholder.removeFromParent()
	      }
	    }
	  }, [_c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("delete")])])] : _vm._e()], 2)], 1), _vm._v(" "), _c('ul', {
	    staticClass: "tree"
	  }, _vm._l((_vm.stakeholder.demands), function(demand) {
	    return _c('li', [_c('div', {
	      staticClass: "inline"
	    }, [_c('div', {
	      staticClass: "box",
	      class: {
	        'positive': demand.isPositive,
	          'negative': demand.isNegative
	      }
	    }, [_c('bodyedit', {
	      attrs: {
	        "obj": demand,
	        "bodyAttr": "body",
	        "widget": "textarea"
	      }
	    })], 1), _vm._v(" "), _c('div', {
	      staticClass: "action-buttons"
	    }, [_c('modal-button', {
	      attrs: {
	        "model": demand
	      }
	    }), _vm._v(" "), _c('button', {
	      staticClass: "btn",
	      on: {
	        "click": function($event) {
	          _vm.stakeholder.removeDemand(demand)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "material-icons"
	    }, [_vm._v("delete")])])], 1)])])
	  })), _vm._v(" "), _c('ul', {
	    staticClass: "tree"
	  }, _vm._l((_vm.stakeholder.children), function(child) {
	    return _c('stakeholder', {
	      attrs: {
	        "stakeholder": child
	      }
	    })
	  }))])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6dbc7111", module.exports)
	  }
	}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container"
	  }, [_c('ul', {
	    staticClass: "tree root"
	  }, [_c('stakeholder', {
	    attrs: {
	      "stakeholder": _vm.stakeholder
	    }
	  })], 1)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4d7d5232", module.exports)
	  }
	}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(37),
	  /* template */
	  __webpack_require__(38),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/valueanalyse.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] valueanalyse.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-490a7207", Component.options)
	  } else {
	    hotAPI.reload("data-v-490a7207", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	
	const models = __webpack_require__(5);
	const store = __webpack_require__(3);

	module.exports = {
	  computed: {
	    purposes() {return store.state.purposes},
	    stakeholders() {
	      return store.state.rootStakeholder.flatten({ignoreMe: true});
	    }
	  },
	  methods: {
	    addPurpose() {
	      let purpose = new models.Purpose();
	      store.commit('addPurpose', purpose);
	    },
	    addValue(stakeholder) {
	      let value = new models.Value();
	      stakeholder.addValue(value);
	      store.commit('editOnModal', value);
	    },
	    removePurpose(purpose) {
	      store.commit('removePurpose', purpose)
	    }
	  }
	}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container"
	  }, [_c('ul', {
	    staticClass: "tree root"
	  }, [_vm._l((_vm.purposes), function(purpose) {
	    return _c('li', [_c('div', {
	      staticClass: "inline"
	    }, [_c('div', {
	      staticClass: "box",
	      style: ({
	        'border-color': purpose.color,
	        'background-color': purpose.colorLighter
	      })
	    }, [_c('bodyedit', {
	      attrs: {
	        "obj": purpose,
	        "bodyAttr": "body",
	        "widget": "textarea"
	      }
	    })], 1), _vm._v(" "), _c('div', {
	      staticClass: "action-buttons"
	    }, [_c('modal-button', {
	      attrs: {
	        "model": purpose
	      }
	    }), _vm._v(" "), _c('button', {
	      staticClass: "btn",
	      on: {
	        "click": function($event) {
	          _vm.removePurpose(purpose)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "material-icons"
	    }, [_vm._v("delete")])])], 1)])])
	  }), _vm._v(" "), _c('li', [_c('button', {
	    staticClass: "btn",
	    on: {
	      "click": _vm.addPurpose
	    }
	  }, [_c('i', {
	    staticClass: "material-icons"
	  }, [_vm._v("add")]), _vm._v("目的\n    ")])])], 2), _vm._v(" "), _c('ul', {
	    staticClass: "tree root"
	  }, _vm._l((_vm.stakeholders), function(stakeholder) {
	    return _c('li', [_c('div', {
	      staticClass: "stakeholder inline"
	    }, [_c('i', {
	      staticClass: "material-icons"
	    }, [_vm._v("person")]), _vm._v(" "), _c('div', {
	      staticClass: "action-buttons"
	    }, [_c('bodyedit', {
	      attrs: {
	        "obj": stakeholder,
	        "bodyAttr": "name",
	        "widget": "input"
	      }
	    }), _vm._v(" "), _c('modal-button', {
	      attrs: {
	        "model": stakeholder
	      }
	    }), _vm._v(" "), _c('button', {
	      staticClass: "btn",
	      on: {
	        "click": function($event) {
	          _vm.addValue(stakeholder)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "material-icons"
	    }, [_vm._v("add")]), _vm._v("価値\n          ")])], 1)]), _vm._v(" "), _c('ul', {
	      staticClass: "tree"
	    }, _vm._l((stakeholder.values), function(value) {
	      return _c('li', [_c('div', {
	        staticClass: "inline"
	      }, [_c('div', {
	        staticClass: "box",
	        style: ({
	          'border-color': value.color,
	          'background-color': value.colorLighter
	        })
	      }, [_c('bodyedit', {
	        attrs: {
	          "obj": value,
	          "bodyAttr": "body",
	          "widget": "textarea"
	        }
	      })], 1), _vm._v(" "), _c('div', {
	        staticClass: "action-buttons"
	      }, [_c('modal-button', {
	        attrs: {
	          "model": value
	        }
	      }), _vm._v(" "), _c('button', {
	        staticClass: "btn",
	        on: {
	          "click": function($event) {
	            stakeholder.removeValue(value)
	          }
	        }
	      }, [_c('i', {
	        staticClass: "material-icons"
	      }, [_vm._v("delete")])])], 1), _vm._v(" "), _c('select', {
	        directives: [{
	          name: "model",
	          rawName: "v-model",
	          value: (value.purpose),
	          expression: "value.purpose"
	        }],
	        on: {
	          "change": function($event) {
	            var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	              return o.selected
	            }).map(function(o) {
	              var val = "_value" in o ? o._value : o.value;
	              return val
	            });
	            value.purpose = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
	          }
	        }
	      }, [_c('option', {
	        domProps: {
	          "value": null
	        }
	      }, [_vm._v("<目的を選択>")]), _vm._v(" "), _vm._l((_vm.purposes), function(purpose) {
	        return _c('option', {
	          domProps: {
	            "value": purpose,
	            "selected": value.purpose == purpose,
	            "textContent": _vm._s(purpose.body)
	          }
	        })
	      })], 2)])])
	    }))])
	  }))])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-490a7207", module.exports)
	  }
	}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(40)

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(42),
	  /* template */
	  __webpack_require__(43),
	  /* scopeId */
	  "data-v-e91ddd4c",
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/valuedesign.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] valuedesign.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e91ddd4c", Component.options)
	  } else {
	    hotAPI.reload("data-v-e91ddd4c", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(11)("4c229891", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e91ddd4c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./valuedesign.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e91ddd4c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./valuedesign.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "\nh2[data-v-e91ddd4c] {\n  border-bottom: solid 2px;\n  padding-bottom: 8px;\n}\nh3[data-v-e91ddd4c] {\n  border-bottom: solid 1px #bbb;\n  padding-bottom: 8px;\n}\n.row[data-v-e91ddd4c] {\n  margin-top: 40px;\n}\n.vision[data-v-e91ddd4c],\n.concept[data-v-e91ddd4c],\n.catchcopy[data-v-e91ddd4c],\n.design[data-v-e91ddd4c],\n.meaning[data-v-e91ddd4c],\n.story[data-v-e91ddd4c] {\n  border: solid 4px #ccc;\n  border-radius: 8px;\n  padding: 12px;\n}\n", ""]);

	// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	
	const store = __webpack_require__(3);

	module.exports = {
	  computed: {
	    vision() {return store.state.vision},
	    concept1() {return store.state.concept1},
	    concept2() {return store.state.concept2},
	    concept3() {return store.state.concept3},
	    catchcopy() {return store.state.catchcopy},
	    meaning() {return store.state.meaning},
	    story() {return store.state.story},
	    design() {return store.state.design},
	  }
	}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container"
	  }, [_c('h2', {
	    style: ({
	      'border-color': _vm.vision.color
	    })
	  }, [_vm._v("ビジョン")]), _vm._v(" "), _c('p', [_c('bodyedit', {
	    attrs: {
	      "obj": _vm.vision,
	      "bodyAttr": "body",
	      "widget": "textarea"
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.vision
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-4"
	  }, [_c('div', {
	    staticClass: "concept",
	    style: ({
	      'border-color': _vm.concept1.color
	    })
	  }, [_c('h3', {
	    style: ({
	      'border-color': _vm.concept1.color
	    })
	  }, [_vm._v("コンセプト1")]), _vm._v(" "), _c('p', [_c('bodyedit', {
	    attrs: {
	      "obj": _vm.concept1,
	      "bodyAttr": "body",
	      "widget": "textarea"
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.concept1
	    }
	  })], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "col-4"
	  }, [_c('div', {
	    staticClass: "concept",
	    style: ({
	      'border-color': _vm.concept1.color
	    })
	  }, [_c('h3', {
	    style: ({
	      'border-color': _vm.concept2.color
	    })
	  }, [_vm._v("コンセプト2")]), _vm._v(" "), _c('p', [_c('bodyedit', {
	    attrs: {
	      "obj": _vm.concept2,
	      "bodyAttr": "body",
	      "widget": "textarea"
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.concept2
	    }
	  })], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "col-4"
	  }, [_c('div', {
	    staticClass: "concept",
	    style: ({
	      'border-color': _vm.concept1.color
	    })
	  }, [_c('h3', {
	    style: ({
	      'border-color': _vm.concept3.color
	    })
	  }, [_vm._v("コンセプト3")]), _vm._v(" "), _c('p', [_c('bodyedit', {
	    attrs: {
	      "obj": _vm.concept3,
	      "bodyAttr": "body",
	      "widget": "textarea"
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.concept3
	    }
	  })], 1)])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-6"
	  }, [_c('div', {
	    staticClass: "catchcopy"
	  }, [_c('h3', [_vm._v("キャッチコピー")]), _vm._v(" "), _c('p', [_c('bodyedit', {
	    attrs: {
	      "obj": _vm.catchcopy,
	      "bodyAttr": "body",
	      "widget": "textarea"
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.catchcopy
	    }
	  })], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "col-6"
	  }, [_c('div', {
	    staticClass: "design"
	  }, [_c('h3', [_vm._v("デザイン")]), _vm._v(" "), _c('p', [_c('img', {
	    attrs: {
	      "src": _vm.design.imageUrl
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.design
	    }
	  })], 1)])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-6"
	  }, [_c('div', {
	    staticClass: "meaning"
	  }, [_c('h3', [_vm._v("意味")]), _vm._v(" "), _c('p', [_c('bodyedit', {
	    attrs: {
	      "obj": _vm.meaning,
	      "bodyAttr": "body",
	      "widget": "textarea"
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.meaning
	    }
	  })], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "col-6"
	  }, [_c('div', {
	    staticClass: "story"
	  }, [_c('h3', [_vm._v("ストーリー")]), _vm._v(" "), _c('p', [_c('bodyedit', {
	    attrs: {
	      "obj": _vm.story,
	      "bodyAttr": "body",
	      "widget": "textarea"
	    }
	  }), _vm._v(" "), _c('modal-button', {
	    attrs: {
	      "model": _vm.story
	    }
	  })], 1)])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e91ddd4c", module.exports)
	  }
	}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(13)(
	  /* script */
	  __webpack_require__(45),
	  /* template */
	  __webpack_require__(46),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/home/hirokiky/dev/rd/client/src/js/requirements.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] requirements.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-50ecc496", Component.options)
	  } else {
	    hotAPI.reload("data-v-50ecc496", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	
	const SVG = __webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	const IterateObject = __webpack_require__(57);

	const Vue = __webpack_require__(1);

	const store = __webpack_require__(3);


	// My Own computeLineCoordinates
	// which connects box 'tail' and box head,
	// not 'centors'.
	// https://github.com/jillix/svg.connectable.js/blob/4c6827021e1ff9c492e93ced74fadc315b70cbc0/lib/index.js#L116
	var myLineCoordinates = function (cons) {

	  var output = []
	    , l = cons.length
	  ;

	  IterateObject(cons, function (con, i) {

	    var sT = con.source.transform()
	      , tT = con.target.transform()
	      , sB = con.source.bbox()
	      , tB = con.target.bbox()
	      , x1 = sT.x + sB.width
	      , y1 = sT.y + sB.height / 2
	      , x2 = tT.x - 2  // minus 3px for showing arrow heads
	      , y2 = tT.y + tB.height / 2
	      , cx = (x1 + x2) / 2
	      , cy = (y1 + y2) / 2
	      , dx = Math.abs((x1 - x2) / 2)
	      , dy = Math.abs((y1 - y2) / 2)
	      , dd = null
	      , out = {
	        x1: x1
	        , y1: y1
	        , x2: x2
	        , y2: y2
	        , ex: x1
	        , ey: y1
	      }
	    ;

	    if (i !== (l - 1) / 2) {
	      dd = Math.sqrt(dx * dx + dy * dy);
	      out.ex = cx + dy / dd * options.k * (i - (l - 1) / 2);
	      out.ey = cy - dx / dd * options.k * (i - (l - 1) / 2);
	    }
	    output.push(out);
	  });
	  return output;
	}


	module.exports = {
	  methods: {
	    updateSVG() {
	      var draw = SVG('requirements').size(1500, 1000);
	      var links = draw.group();
	      var markers = draw.group();

	      var strategy = draw.group();
	      var business = draw.group();
	      var it = draw.group();

	      strategy.move(100, 40);
	      strategy.rect(350, 800)
	              .attr({fill: 'none', stroke: '#555'});
	      strategy.text("戦略要求").attr({x: 175}).font({anchor: 'middle'});
	      business.move(450, 40);
	      business.rect(350, 800)
	              .attr({fill: 'none', stroke: '#555'});
	      business.text("業務要求").attr({x: 175}).font({anchor: 'middle'});
	      it.move(800, 40);
	      it.rect(350, 800)
	        .attr({fill: 'none', stroke: '#555'});
	      it.text("IT要求").attr({x: 175}).font({anchor: 'middle'});

	      var reqs = [];
	      for (var req of this.allRequirements) {
	        var reqGroup = draw.group();
	        reqGroup.move(120, (reqs.length + 1) * 80);
	        reqGroup.draggy();
	        var rect = reqGroup.rect();
	        var text = reqGroup.text(req.body).attr({x: 10, y: 0}).font({
	          'dominant-baseline': 'central'
	        });
	        var bbox = text.bbox();
	        rect.attr({
	          fill: req.colorLighter,
	          stroke: req.color,
	          width: bbox.width + 20,
	          height: bbox.height + 30
	        });
	        reqs.push(reqGroup);
	      }

	      reqs[0].move(120, 340);
	      for (var reqGroup of reqs.slice(1)) {
	        reqGroup.move(300);
	        var con = reqs[0].connectable({
	          container: links,
	          markers: markers
	        }, reqGroup);
	        con.setLineColor("#5D4037");
	        con.computeLineCoordinates = myLineCoordinates;
	        con.update();
	      }
	    },
	  },
	  computed: {
	    requirements() {return store.state.requirements;},
	    allRequirements() {return store.getters.allRequirements;}
	  },
	  mounted() {
	    this.updateSVG();
	  }
	}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "requirements"
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-50ecc496", module.exports)
	  }
	}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('nav', [_c('div', {
	    staticClass: "container"
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/"
	    }
	  }, [_vm._v("ステークホルダー")]), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/valueanalyse"
	    }
	  }, [_vm._v("価値分析")]), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/valuedesign"
	    }
	  }, [_vm._v("価値デザイン")]), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/requirements"
	    }
	  }, [_vm._v("要求分析")])], 1)]), _vm._v(" "), _c('router-view'), _vm._v(" "), _c('modal')], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f01fa9e8", module.exports)
	  }
	}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	* svg.js - A lightweight library for manipulating and animating SVG.
	* @version 2.6.3
	* https://svgdotjs.github.io/
	*
	* @copyright Wout Fierens <wout@mick-wout.com>
	* @license MIT
	*
	* BUILT: Fri Jul 21 2017 14:50:37 GMT+0200 (Mitteleuropäische Sommerzeit)
	*/;
	(function(root, factory) {
	  /* istanbul ignore next */
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	      return factory(root, root.document)
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  } else if (typeof exports === 'object') {
	    module.exports = root.document ? factory(root, root.document) : function(w){ return factory(w, w.document) }
	  } else {
	    root.SVG = factory(root, root.document)
	  }
	}(typeof window !== "undefined" ? window : this, function(window, document) {

	// The main wrapping element
	var SVG = this.SVG = function(element) {
	  if (SVG.supported) {
	    element = new SVG.Doc(element)

	    if(!SVG.parser.draw)
	      SVG.prepare()

	    return element
	  }
	}

	// Default namespaces
	SVG.ns    = 'http://www.w3.org/2000/svg'
	SVG.xmlns = 'http://www.w3.org/2000/xmlns/'
	SVG.xlink = 'http://www.w3.org/1999/xlink'
	SVG.svgjs = 'http://svgjs.com/svgjs'

	// Svg support test
	SVG.supported = (function() {
	  return !! document.createElementNS &&
	         !! document.createElementNS(SVG.ns,'svg').createSVGRect
	})()

	// Don't bother to continue if SVG is not supported
	if (!SVG.supported) return false

	// Element id sequence
	SVG.did  = 1000

	// Get next named element id
	SVG.eid = function(name) {
	  return 'Svgjs' + capitalize(name) + (SVG.did++)
	}

	// Method for element creation
	SVG.create = function(name) {
	  // create element
	  var element = document.createElementNS(this.ns, name)

	  // apply unique id
	  element.setAttribute('id', this.eid(name))

	  return element
	}

	// Method for extending objects
	SVG.extend = function() {
	  var modules, methods, key, i

	  // Get list of modules
	  modules = [].slice.call(arguments)

	  // Get object with extensions
	  methods = modules.pop()

	  for (i = modules.length - 1; i >= 0; i--)
	    if (modules[i])
	      for (key in methods)
	        modules[i].prototype[key] = methods[key]

	  // Make sure SVG.Set inherits any newly added methods
	  if (SVG.Set && SVG.Set.inherit)
	    SVG.Set.inherit()
	}

	// Invent new element
	SVG.invent = function(config) {
	  // Create element initializer
	  var initializer = typeof config.create == 'function' ?
	    config.create :
	    function() {
	      this.constructor.call(this, SVG.create(config.create))
	    }

	  // Inherit prototype
	  if (config.inherit)
	    initializer.prototype = new config.inherit

	  // Extend with methods
	  if (config.extend)
	    SVG.extend(initializer, config.extend)

	  // Attach construct method to parent
	  if (config.construct)
	    SVG.extend(config.parent || SVG.Container, config.construct)

	  return initializer
	}

	// Adopt existing svg elements
	SVG.adopt = function(node) {
	  // check for presence of node
	  if (!node) return null

	  // make sure a node isn't already adopted
	  if (node.instance) return node.instance

	  // initialize variables
	  var element

	  // adopt with element-specific settings
	  if (node.nodeName == 'svg')
	    element = node.parentNode instanceof window.SVGElement ? new SVG.Nested : new SVG.Doc
	  else if (node.nodeName == 'linearGradient')
	    element = new SVG.Gradient('linear')
	  else if (node.nodeName == 'radialGradient')
	    element = new SVG.Gradient('radial')
	  else if (SVG[capitalize(node.nodeName)])
	    element = new SVG[capitalize(node.nodeName)]
	  else
	    element = new SVG.Element(node)

	  // ensure references
	  element.type  = node.nodeName
	  element.node  = node
	  node.instance = element

	  // SVG.Class specific preparations
	  if (element instanceof SVG.Doc)
	    element.namespace().defs()

	  // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
	  element.setData(JSON.parse(node.getAttribute('svgjs:data')) || {})

	  return element
	}

	// Initialize parsing element
	SVG.prepare = function() {
	  // Select document body and create invisible svg element
	  var body = document.getElementsByTagName('body')[0]
	    , draw = (body ? new SVG.Doc(body) : SVG.adopt(document.documentElement).nested()).size(2, 0)

	  // Create parser object
	  SVG.parser = {
	    body: body || document.documentElement
	  , draw: draw.style('opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden').node
	  , poly: draw.polyline().node
	  , path: draw.path().node
	  , native: SVG.create('svg')
	  }
	}

	SVG.parser = {
	  native: SVG.create('svg')
	}

	document.addEventListener('DOMContentLoaded', function() {
	  if(!SVG.parser.draw)
	    SVG.prepare()
	}, false)

	// Storage for regular expressions
	SVG.regex = {
	  // Parse unit value
	  numberAndUnit:    /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i

	  // Parse hex value
	, hex:              /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

	  // Parse rgb value
	, rgb:              /rgb\((\d+),(\d+),(\d+)\)/

	  // Parse reference id
	, reference:        /#([a-z0-9\-_]+)/i

	  // splits a transformation chain
	, transforms:       /\)\s*,?\s*/

	  // Whitespace
	, whitespace:       /\s/g

	  // Test hex value
	, isHex:            /^#[a-f0-9]{3,6}$/i

	  // Test rgb value
	, isRgb:            /^rgb\(/

	  // Test css declaration
	, isCss:            /[^:]+:[^;]+;?/

	  // Test for blank string
	, isBlank:          /^(\s+)?$/

	  // Test for numeric string
	, isNumber:         /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

	  // Test for percent value
	, isPercent:        /^-?[\d\.]+%$/

	  // Test for image url
	, isImage:          /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i

	  // split at whitespace and comma
	, delimiter:        /[\s,]+/

	  // The following regex are used to parse the d attribute of a path

	  // Matches all hyphens which are not after an exponent
	, hyphen:           /([^e])\-/gi

	  // Replaces and tests for all path letters
	, pathLetters:      /[MLHVCSQTAZ]/gi

	  // yes we need this one, too
	, isPathLetter:     /[MLHVCSQTAZ]/i

	  // matches 0.154.23.45
	, numbersWithDots:  /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi

	  // matches .
	, dots:             /\./g
	}

	SVG.utils = {
	  // Map function
	  map: function(array, block) {
	    var i
	      , il = array.length
	      , result = []

	    for (i = 0; i < il; i++)
	      result.push(block(array[i]))

	    return result
	  }

	  // Filter function
	, filter: function(array, block) {
	    var i
	      , il = array.length
	      , result = []

	    for (i = 0; i < il; i++)
	      if (block(array[i]))
	        result.push(array[i])

	    return result
	  }

	  // Degrees to radians
	, radians: function(d) {
	    return d % 360 * Math.PI / 180
	  }

	  // Radians to degrees
	, degrees: function(r) {
	    return r * 180 / Math.PI % 360
	  }

	, filterSVGElements: function(nodes) {
	    return this.filter( nodes, function(el) { return el instanceof window.SVGElement })
	  }

	}

	SVG.defaults = {
	  // Default attribute values
	  attrs: {
	    // fill and stroke
	    'fill-opacity':     1
	  , 'stroke-opacity':   1
	  , 'stroke-width':     0
	  , 'stroke-linejoin':  'miter'
	  , 'stroke-linecap':   'butt'
	  , fill:               '#000000'
	  , stroke:             '#000000'
	  , opacity:            1
	    // position
	  , x:                  0
	  , y:                  0
	  , cx:                 0
	  , cy:                 0
	    // size
	  , width:              0
	  , height:             0
	    // radius
	  , r:                  0
	  , rx:                 0
	  , ry:                 0
	    // gradient
	  , offset:             0
	  , 'stop-opacity':     1
	  , 'stop-color':       '#000000'
	    // text
	  , 'font-size':        16
	  , 'font-family':      'Helvetica, Arial, sans-serif'
	  , 'text-anchor':      'start'
	  }

	}
	// Module for color convertions
	SVG.Color = function(color) {
	  var match

	  // initialize defaults
	  this.r = 0
	  this.g = 0
	  this.b = 0

	  if(!color) return

	  // parse color
	  if (typeof color === 'string') {
	    if (SVG.regex.isRgb.test(color)) {
	      // get rgb values
	      match = SVG.regex.rgb.exec(color.replace(SVG.regex.whitespace,''))

	      // parse numeric values
	      this.r = parseInt(match[1])
	      this.g = parseInt(match[2])
	      this.b = parseInt(match[3])

	    } else if (SVG.regex.isHex.test(color)) {
	      // get hex values
	      match = SVG.regex.hex.exec(fullHex(color))

	      // parse numeric values
	      this.r = parseInt(match[1], 16)
	      this.g = parseInt(match[2], 16)
	      this.b = parseInt(match[3], 16)

	    }

	  } else if (typeof color === 'object') {
	    this.r = color.r
	    this.g = color.g
	    this.b = color.b

	  }

	}

	SVG.extend(SVG.Color, {
	  // Default to hex conversion
	  toString: function() {
	    return this.toHex()
	  }
	  // Build hex value
	, toHex: function() {
	    return '#'
	      + compToHex(this.r)
	      + compToHex(this.g)
	      + compToHex(this.b)
	  }
	  // Build rgb value
	, toRgb: function() {
	    return 'rgb(' + [this.r, this.g, this.b].join() + ')'
	  }
	  // Calculate true brightness
	, brightness: function() {
	    return (this.r / 255 * 0.30)
	         + (this.g / 255 * 0.59)
	         + (this.b / 255 * 0.11)
	  }
	  // Make color morphable
	, morph: function(color) {
	    this.destination = new SVG.Color(color)

	    return this
	  }
	  // Get morphed color at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    // normalise pos
	    pos = pos < 0 ? 0 : pos > 1 ? 1 : pos

	    // generate morphed color
	    return new SVG.Color({
	      r: ~~(this.r + (this.destination.r - this.r) * pos)
	    , g: ~~(this.g + (this.destination.g - this.g) * pos)
	    , b: ~~(this.b + (this.destination.b - this.b) * pos)
	    })
	  }

	})

	// Testers

	// Test if given value is a color string
	SVG.Color.test = function(color) {
	  color += ''
	  return SVG.regex.isHex.test(color)
	      || SVG.regex.isRgb.test(color)
	}

	// Test if given value is a rgb object
	SVG.Color.isRgb = function(color) {
	  return color && typeof color.r == 'number'
	               && typeof color.g == 'number'
	               && typeof color.b == 'number'
	}

	// Test if given value is a color
	SVG.Color.isColor = function(color) {
	  return SVG.Color.isRgb(color) || SVG.Color.test(color)
	}
	// Module for array conversion
	SVG.Array = function(array, fallback) {
	  array = (array || []).valueOf()

	  // if array is empty and fallback is provided, use fallback
	  if (array.length == 0 && fallback)
	    array = fallback.valueOf()

	  // parse array
	  this.value = this.parse(array)
	}

	SVG.extend(SVG.Array, {
	  // Make array morphable
	  morph: function(array) {
	    this.destination = this.parse(array)

	    // normalize length of arrays
	    if (this.value.length != this.destination.length) {
	      var lastValue       = this.value[this.value.length - 1]
	        , lastDestination = this.destination[this.destination.length - 1]

	      while(this.value.length > this.destination.length)
	        this.destination.push(lastDestination)
	      while(this.value.length < this.destination.length)
	        this.value.push(lastValue)
	    }

	    return this
	  }
	  // Clean up any duplicate points
	, settle: function() {
	    // find all unique values
	    for (var i = 0, il = this.value.length, seen = []; i < il; i++)
	      if (seen.indexOf(this.value[i]) == -1)
	        seen.push(this.value[i])

	    // set new value
	    return this.value = seen
	  }
	  // Get morphed array at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    // generate morphed array
	    for (var i = 0, il = this.value.length, array = []; i < il; i++)
	      array.push(this.value[i] + (this.destination[i] - this.value[i]) * pos)

	    return new SVG.Array(array)
	  }
	  // Convert array to string
	, toString: function() {
	    return this.value.join(' ')
	  }
	  // Real value
	, valueOf: function() {
	    return this.value
	  }
	  // Parse whitespace separated string
	, parse: function(array) {
	    array = array.valueOf()

	    // if already is an array, no need to parse it
	    if (Array.isArray(array)) return array

	    return this.split(array)
	  }
	  // Strip unnecessary whitespace
	, split: function(string) {
	    return string.trim().split(SVG.regex.delimiter).map(parseFloat)
	  }
	  // Reverse array
	, reverse: function() {
	    this.value.reverse()

	    return this
	  }
	, clone: function() {
	    var clone = new this.constructor()
	    clone.value = array_clone(this.value)
	    return clone
	  }
	})
	// Poly points array
	SVG.PointArray = function(array, fallback) {
	  SVG.Array.call(this, array, fallback || [[0,0]])
	}

	// Inherit from SVG.Array
	SVG.PointArray.prototype = new SVG.Array
	SVG.PointArray.prototype.constructor = SVG.PointArray

	SVG.extend(SVG.PointArray, {
	  // Convert array to string
	  toString: function() {
	    // convert to a poly point string
	    for (var i = 0, il = this.value.length, array = []; i < il; i++)
	      array.push(this.value[i].join(','))

	    return array.join(' ')
	  }
	  // Convert array to line object
	, toLine: function() {
	    return {
	      x1: this.value[0][0]
	    , y1: this.value[0][1]
	    , x2: this.value[1][0]
	    , y2: this.value[1][1]
	    }
	  }
	  // Get morphed array at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    // generate morphed point string
	    for (var i = 0, il = this.value.length, array = []; i < il; i++)
	      array.push([
	        this.value[i][0] + (this.destination[i][0] - this.value[i][0]) * pos
	      , this.value[i][1] + (this.destination[i][1] - this.value[i][1]) * pos
	      ])

	    return new SVG.PointArray(array)
	  }
	  // Parse point string and flat array
	, parse: function(array) {
	    var points = []

	    array = array.valueOf()

	    // if it is an array
	    if (Array.isArray(array)) {
	      // and it is not flat, there is no need to parse it
	      if(Array.isArray(array[0])) {
	        return array
	      }
	    } else { // Else, it is considered as a string
	      // parse points
	      array = array.trim().split(SVG.regex.delimiter).map(parseFloat)
	    }

	    // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
	    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.
	    if (array.length % 2 !== 0) array.pop()

	    // wrap points in two-tuples and parse points as floats
	    for(var i = 0, len = array.length; i < len; i = i + 2)
	      points.push([ array[i], array[i+1] ])

	    return points
	  }
	  // Move point string
	, move: function(x, y) {
	    var box = this.bbox()

	    // get relative offset
	    x -= box.x
	    y -= box.y

	    // move every point
	    if (!isNaN(x) && !isNaN(y))
	      for (var i = this.value.length - 1; i >= 0; i--)
	        this.value[i] = [this.value[i][0] + x, this.value[i][1] + y]

	    return this
	  }
	  // Resize poly string
	, size: function(width, height) {
	    var i, box = this.bbox()

	    // recalculate position of all points according to new size
	    for (i = this.value.length - 1; i >= 0; i--) {
	      if(box.width) this.value[i][0] = ((this.value[i][0] - box.x) * width)  / box.width  + box.x
	      if(box.height) this.value[i][1] = ((this.value[i][1] - box.y) * height) / box.height + box.y
	    }

	    return this
	  }
	  // Get bounding box of points
	, bbox: function() {
	    SVG.parser.poly.setAttribute('points', this.toString())

	    return SVG.parser.poly.getBBox()
	  }
	})

	var pathHandlers = {
	  M: function(c, p, p0) {
	    p.x = p0.x = c[0]
	    p.y = p0.y = c[1]

	    return ['M', p.x, p.y]
	  },
	  L: function(c, p) {
	    p.x = c[0]
	    p.y = c[1]
	    return ['L', c[0], c[1]]
	  },
	  H: function(c, p) {
	    p.x = c[0]
	    return ['H', c[0]]
	  },
	  V: function(c, p) {
	    p.y = c[0]
	    return ['V', c[0]]
	  },
	  C: function(c, p) {
	    p.x = c[4]
	    p.y = c[5]
	    return ['C', c[0], c[1], c[2], c[3], c[4], c[5]]
	  },
	  S: function(c, p) {
	    p.x = c[2]
	    p.y = c[3]
	    return ['S', c[0], c[1], c[2], c[3]]
	  },
	  Q: function(c, p) {
	    p.x = c[2]
	    p.y = c[3]
	    return ['Q', c[0], c[1], c[2], c[3]]
	  },
	  T: function(c, p) {
	    p.x = c[0]
	    p.y = c[1]
	    return ['T', c[0], c[1]]
	  },
	  Z: function(c, p, p0) {
	    p.x = p0.x
	    p.y = p0.y
	    return ['Z']
	  },
	  A: function(c, p) {
	    p.x = c[5]
	    p.y = c[6]
	    return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]]
	  }
	}

	var mlhvqtcsa = 'mlhvqtcsaz'.split('')

	for(var i = 0, il = mlhvqtcsa.length; i < il; ++i){
	  pathHandlers[mlhvqtcsa[i]] = (function(i){
	    return function(c, p, p0) {
	      if(i == 'H') c[0] = c[0] + p.x
	      else if(i == 'V') c[0] = c[0] + p.y
	      else if(i == 'A'){
	        c[5] = c[5] + p.x,
	        c[6] = c[6] + p.y
	      }
	      else
	        for(var j = 0, jl = c.length; j < jl; ++j) {
	          c[j] = c[j] + (j%2 ? p.y : p.x)
	        }

	      return pathHandlers[i](c, p, p0)
	    }
	  })(mlhvqtcsa[i].toUpperCase())
	}

	// Path points array
	SVG.PathArray = function(array, fallback) {
	  SVG.Array.call(this, array, fallback || [['M', 0, 0]])
	}

	// Inherit from SVG.Array
	SVG.PathArray.prototype = new SVG.Array
	SVG.PathArray.prototype.constructor = SVG.PathArray

	SVG.extend(SVG.PathArray, {
	  // Convert array to string
	  toString: function() {
	    return arrayToString(this.value)
	  }
	  // Move path string
	, move: function(x, y) {
	    // get bounding box of current situation
	    var box = this.bbox()

	    // get relative offset
	    x -= box.x
	    y -= box.y

	    if (!isNaN(x) && !isNaN(y)) {
	      // move every point
	      for (var l, i = this.value.length - 1; i >= 0; i--) {
	        l = this.value[i][0]

	        if (l == 'M' || l == 'L' || l == 'T')  {
	          this.value[i][1] += x
	          this.value[i][2] += y

	        } else if (l == 'H')  {
	          this.value[i][1] += x

	        } else if (l == 'V')  {
	          this.value[i][1] += y

	        } else if (l == 'C' || l == 'S' || l == 'Q')  {
	          this.value[i][1] += x
	          this.value[i][2] += y
	          this.value[i][3] += x
	          this.value[i][4] += y

	          if (l == 'C')  {
	            this.value[i][5] += x
	            this.value[i][6] += y
	          }

	        } else if (l == 'A')  {
	          this.value[i][6] += x
	          this.value[i][7] += y
	        }

	      }
	    }

	    return this
	  }
	  // Resize path string
	, size: function(width, height) {
	    // get bounding box of current situation
	    var i, l, box = this.bbox()

	    // recalculate position of all points according to new size
	    for (i = this.value.length - 1; i >= 0; i--) {
	      l = this.value[i][0]

	      if (l == 'M' || l == 'L' || l == 'T')  {
	        this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x
	        this.value[i][2] = ((this.value[i][2] - box.y) * height) / box.height + box.y

	      } else if (l == 'H')  {
	        this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x

	      } else if (l == 'V')  {
	        this.value[i][1] = ((this.value[i][1] - box.y) * height) / box.height + box.y

	      } else if (l == 'C' || l == 'S' || l == 'Q')  {
	        this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x
	        this.value[i][2] = ((this.value[i][2] - box.y) * height) / box.height + box.y
	        this.value[i][3] = ((this.value[i][3] - box.x) * width)  / box.width  + box.x
	        this.value[i][4] = ((this.value[i][4] - box.y) * height) / box.height + box.y

	        if (l == 'C')  {
	          this.value[i][5] = ((this.value[i][5] - box.x) * width)  / box.width  + box.x
	          this.value[i][6] = ((this.value[i][6] - box.y) * height) / box.height + box.y
	        }

	      } else if (l == 'A')  {
	        // resize radii
	        this.value[i][1] = (this.value[i][1] * width)  / box.width
	        this.value[i][2] = (this.value[i][2] * height) / box.height

	        // move position values
	        this.value[i][6] = ((this.value[i][6] - box.x) * width)  / box.width  + box.x
	        this.value[i][7] = ((this.value[i][7] - box.y) * height) / box.height + box.y
	      }

	    }

	    return this
	  }
	  // Test if the passed path array use the same path data commands as this path array
	, equalCommands: function(pathArray) {
	    var i, il, equalCommands

	    pathArray = new SVG.PathArray(pathArray)

	    equalCommands = this.value.length === pathArray.value.length
	    for(i = 0, il = this.value.length; equalCommands && i < il; i++) {
	      equalCommands = this.value[i][0] === pathArray.value[i][0]
	    }

	    return equalCommands
	  }
	  // Make path array morphable
	, morph: function(pathArray) {
	    pathArray = new SVG.PathArray(pathArray)

	    if(this.equalCommands(pathArray)) {
	      this.destination = pathArray
	    } else {
	      this.destination = null
	    }

	    return this
	  }
	  // Get morphed path array at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    var sourceArray = this.value
	      , destinationArray = this.destination.value
	      , array = [], pathArray = new SVG.PathArray()
	      , i, il, j, jl

	    // Animate has specified in the SVG spec
	    // See: https://www.w3.org/TR/SVG11/paths.html#PathElement
	    for (i = 0, il = sourceArray.length; i < il; i++) {
	      array[i] = [sourceArray[i][0]]
	      for(j = 1, jl = sourceArray[i].length; j < jl; j++) {
	        array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos
	      }
	      // For the two flags of the elliptical arc command, the SVG spec say:
	      // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
	      // Elliptical arc command as an array followed by corresponding indexes:
	      // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
	      //   0    1   2        3                 4             5      6  7
	      if(array[i][0] === 'A') {
	        array[i][4] = +(array[i][4] != 0)
	        array[i][5] = +(array[i][5] != 0)
	      }
	    }

	    // Directly modify the value of a path array, this is done this way for performance
	    pathArray.value = array
	    return pathArray
	  }
	  // Absolutize and parse path to array
	, parse: function(array) {
	    // if it's already a patharray, no need to parse it
	    if (array instanceof SVG.PathArray) return array.valueOf()

	    // prepare for parsing
	    var i, x0, y0, s, seg, arr
	      , x = 0
	      , y = 0
	      , paramCnt = { 'M':2, 'L':2, 'H':1, 'V':1, 'C':6, 'S':4, 'Q':4, 'T':2, 'A':7, 'Z':0 }

	    if(typeof array == 'string'){

	      array = array
	        .replace(SVG.regex.numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
	        .replace(SVG.regex.pathLetters, ' $& ') // put some room between letters and numbers
	        .replace(SVG.regex.hyphen, '$1 -')      // add space before hyphen
	        .trim()                                 // trim
	        .split(SVG.regex.delimiter)   // split into array

	    }else{
	      array = array.reduce(function(prev, curr){
	        return [].concat.call(prev, curr)
	      }, [])
	    }

	    // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]
	    var arr = []
	      , p = new SVG.Point()
	      , p0 = new SVG.Point()
	      , index = 0
	      , len = array.length

	    do{
	      // Test if we have a path letter
	      if(SVG.regex.isPathLetter.test(array[index])){
	        s = array[index]
	        ++index
	      // If last letter was a move command and we got no new, it defaults to [L]ine
	      }else if(s == 'M'){
	        s = 'L'
	      }else if(s == 'm'){
	        s = 'l'
	      }

	      arr.push(pathHandlers[s].call(null,
	          array.slice(index, (index = index + paramCnt[s.toUpperCase()])).map(parseFloat),
	          p, p0
	        )
	      )

	    }while(len > index)

	    return arr

	  }
	  // Get bounding box of path
	, bbox: function() {
	    SVG.parser.path.setAttribute('d', this.toString())

	    return SVG.parser.path.getBBox()
	  }

	})

	// Module for unit convertions
	SVG.Number = SVG.invent({
	  // Initialize
	  create: function(value, unit) {
	    // initialize defaults
	    this.value = 0
	    this.unit  = unit || ''

	    // parse value
	    if (typeof value === 'number') {
	      // ensure a valid numeric value
	      this.value = isNaN(value) ? 0 : !isFinite(value) ? (value < 0 ? -3.4e+38 : +3.4e+38) : value

	    } else if (typeof value === 'string') {
	      unit = value.match(SVG.regex.numberAndUnit)

	      if (unit) {
	        // make value numeric
	        this.value = parseFloat(unit[1])

	        // normalize
	        if (unit[5] == '%')
	          this.value /= 100
	        else if (unit[5] == 's')
	          this.value *= 1000

	        // store unit
	        this.unit = unit[5]
	      }

	    } else {
	      if (value instanceof SVG.Number) {
	        this.value = value.valueOf()
	        this.unit  = value.unit
	      }
	    }

	  }
	  // Add methods
	, extend: {
	    // Stringalize
	    toString: function() {
	      return (
	        this.unit == '%' ?
	          ~~(this.value * 1e8) / 1e6:
	        this.unit == 's' ?
	          this.value / 1e3 :
	          this.value
	      ) + this.unit
	    }
	  , toJSON: function() {
	      return this.toString()
	    }
	  , // Convert to primitive
	    valueOf: function() {
	      return this.value
	    }
	    // Add number
	  , plus: function(number) {
	      number = new SVG.Number(number)
	      return new SVG.Number(this + number, this.unit || number.unit)
	    }
	    // Subtract number
	  , minus: function(number) {
	      number = new SVG.Number(number)
	      return new SVG.Number(this - number, this.unit || number.unit)
	    }
	    // Multiply number
	  , times: function(number) {
	      number = new SVG.Number(number)
	      return new SVG.Number(this * number, this.unit || number.unit)
	    }
	    // Divide number
	  , divide: function(number) {
	      number = new SVG.Number(number)
	      return new SVG.Number(this / number, this.unit || number.unit)
	    }
	    // Convert to different unit
	  , to: function(unit) {
	      var number = new SVG.Number(this)

	      if (typeof unit === 'string')
	        number.unit = unit

	      return number
	    }
	    // Make number morphable
	  , morph: function(number) {
	      this.destination = new SVG.Number(number)

	      if(number.relative) {
	        this.destination.value += this.value
	      }

	      return this
	    }
	    // Get morphed number at given position
	  , at: function(pos) {
	      // Make sure a destination is defined
	      if (!this.destination) return this

	      // Generate new morphed number
	      return new SVG.Number(this.destination)
	          .minus(this)
	          .times(pos)
	          .plus(this)
	    }

	  }
	})


	SVG.Element = SVG.invent({
	  // Initialize node
	  create: function(node) {
	    // make stroke value accessible dynamically
	    this._stroke = SVG.defaults.attrs.stroke
	    this._event = null

	    // initialize data object
	    this.dom = {}

	    // create circular reference
	    if (this.node = node) {
	      this.type = node.nodeName
	      this.node.instance = this

	      // store current attribute value
	      this._stroke = node.getAttribute('stroke') || this._stroke
	    }
	  }

	  // Add class methods
	, extend: {
	    // Move over x-axis
	    x: function(x) {
	      return this.attr('x', x)
	    }
	    // Move over y-axis
	  , y: function(y) {
	      return this.attr('y', y)
	    }
	    // Move by center over x-axis
	  , cx: function(x) {
	      return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2)
	    }
	    // Move by center over y-axis
	  , cy: function(y) {
	      return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2)
	    }
	    // Move element to given x and y values
	  , move: function(x, y) {
	      return this.x(x).y(y)
	    }
	    // Move element by its center
	  , center: function(x, y) {
	      return this.cx(x).cy(y)
	    }
	    // Set width of element
	  , width: function(width) {
	      return this.attr('width', width)
	    }
	    // Set height of element
	  , height: function(height) {
	      return this.attr('height', height)
	    }
	    // Set element size to given width and height
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this
	        .width(new SVG.Number(p.width))
	        .height(new SVG.Number(p.height))
	    }
	    // Clone element
	  , clone: function(parent, withData) {
	      // write dom data to the dom so the clone can pickup the data
	      this.writeDataToDom()

	      // clone element and assign new id
	      var clone = assignNewId(this.node.cloneNode(true))

	      // insert the clone in the given parent or after myself
	      if(parent) parent.add(clone)
	      else this.after(clone)

	      return clone
	    }
	    // Remove element
	  , remove: function() {
	      if (this.parent())
	        this.parent().removeElement(this)

	      return this
	    }
	    // Replace element
	  , replace: function(element) {
	      this.after(element).remove()

	      return element
	    }
	    // Add element to given container and return self
	  , addTo: function(parent) {
	      return parent.put(this)
	    }
	    // Add element to given container and return container
	  , putIn: function(parent) {
	      return parent.add(this)
	    }
	    // Get / set id
	  , id: function(id) {
	      return this.attr('id', id)
	    }
	    // Checks whether the given point inside the bounding box of the element
	  , inside: function(x, y) {
	      var box = this.bbox()

	      return x > box.x
	          && y > box.y
	          && x < box.x + box.width
	          && y < box.y + box.height
	    }
	    // Show element
	  , show: function() {
	      return this.style('display', '')
	    }
	    // Hide element
	  , hide: function() {
	      return this.style('display', 'none')
	    }
	    // Is element visible?
	  , visible: function() {
	      return this.style('display') != 'none'
	    }
	    // Return id on string conversion
	  , toString: function() {
	      return this.attr('id')
	    }
	    // Return array of classes on the node
	  , classes: function() {
	      var attr = this.attr('class')

	      return attr == null ? [] : attr.trim().split(SVG.regex.delimiter)
	    }
	    // Return true if class exists on the node, false otherwise
	  , hasClass: function(name) {
	      return this.classes().indexOf(name) != -1
	    }
	    // Add class to the node
	  , addClass: function(name) {
	      if (!this.hasClass(name)) {
	        var array = this.classes()
	        array.push(name)
	        this.attr('class', array.join(' '))
	      }

	      return this
	    }
	    // Remove class from the node
	  , removeClass: function(name) {
	      if (this.hasClass(name)) {
	        this.attr('class', this.classes().filter(function(c) {
	          return c != name
	        }).join(' '))
	      }

	      return this
	    }
	    // Toggle the presence of a class on the node
	  , toggleClass: function(name) {
	      return this.hasClass(name) ? this.removeClass(name) : this.addClass(name)
	    }
	    // Get referenced element form attribute value
	  , reference: function(attr) {
	      return SVG.get(this.attr(attr))
	    }
	    // Returns the parent element instance
	  , parent: function(type) {
	      var parent = this

	      // check for parent
	      if(!parent.node.parentNode) return null

	      // get parent element
	      parent = SVG.adopt(parent.node.parentNode)

	      if(!type) return parent

	      // loop trough ancestors if type is given
	      while(parent && parent.node instanceof window.SVGElement){
	        if(typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent
	        if(parent.node.parentNode.nodeName == '#document') return null // #720
	        parent = SVG.adopt(parent.node.parentNode)
	      }
	    }
	    // Get parent document
	  , doc: function() {
	      return this instanceof SVG.Doc ? this : this.parent(SVG.Doc)
	    }
	    // return array of all ancestors of given type up to the root svg
	  , parents: function(type) {
	      var parents = [], parent = this

	      do{
	        parent = parent.parent(type)
	        if(!parent || !parent.node) break

	        parents.push(parent)
	      } while(parent.parent)

	      return parents
	    }
	    // matches the element vs a css selector
	  , matches: function(selector){
	      return matches(this.node, selector)
	    }
	    // Returns the svg node to call native svg methods on it
	  , native: function() {
	      return this.node
	    }
	    // Import raw svg
	  , svg: function(svg) {
	      // create temporary holder
	      var well = document.createElement('svg')

	      // act as a setter if svg is given
	      if (svg && this instanceof SVG.Parent) {
	        // dump raw svg
	        well.innerHTML = '<svg>' + svg.replace(/\n/, '').replace(/<(\w+)([^<]+?)\/>/g, '<$1$2></$1>') + '</svg>'

	        // transplant nodes
	        for (var i = 0, il = well.firstChild.childNodes.length; i < il; i++)
	          this.node.appendChild(well.firstChild.firstChild)

	      // otherwise act as a getter
	      } else {
	        // create a wrapping svg element in case of partial content
	        well.appendChild(svg = document.createElement('svg'))

	        // write svgjs data to the dom
	        this.writeDataToDom()

	        // insert a copy of this node
	        svg.appendChild(this.node.cloneNode(true))

	        // return target element
	        return well.innerHTML.replace(/^<svg>/, '').replace(/<\/svg>$/, '')
	      }

	      return this
	    }
	  // write svgjs data to the dom
	  , writeDataToDom: function() {

	      // dump variables recursively
	      if(this.each || this.lines){
	        var fn = this.each ? this : this.lines();
	        fn.each(function(){
	          this.writeDataToDom()
	        })
	      }

	      // remove previously set data
	      this.node.removeAttribute('svgjs:data')

	      if(Object.keys(this.dom).length)
	        this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)) // see #428

	      return this
	    }
	  // set given data to the elements data property
	  , setData: function(o){
	      this.dom = o
	      return this
	    }
	  , is: function(obj){
	      return is(this, obj)
	    }
	  }
	})

	SVG.easing = {
	  '-': function(pos){return pos}
	, '<>':function(pos){return -Math.cos(pos * Math.PI) / 2 + 0.5}
	, '>': function(pos){return  Math.sin(pos * Math.PI / 2)}
	, '<': function(pos){return -Math.cos(pos * Math.PI / 2) + 1}
	}

	SVG.morph = function(pos){
	  return function(from, to) {
	    return new SVG.MorphObj(from, to).at(pos)
	  }
	}

	SVG.Situation = SVG.invent({

	  create: function(o){
	    this.init = false
	    this.reversed = false
	    this.reversing = false

	    this.duration = new SVG.Number(o.duration).valueOf()
	    this.delay = new SVG.Number(o.delay).valueOf()

	    this.start = +new Date() + this.delay
	    this.finish = this.start + this.duration
	    this.ease = o.ease

	    // this.loop is incremented from 0 to this.loops
	    // it is also incremented when in an infinite loop (when this.loops is true)
	    this.loop = 0
	    this.loops = false

	    this.animations = {
	      // functionToCall: [list of morphable objects]
	      // e.g. move: [SVG.Number, SVG.Number]
	    }

	    this.attrs = {
	      // holds all attributes which are not represented from a function svg.js provides
	      // e.g. someAttr: SVG.Number
	    }

	    this.styles = {
	      // holds all styles which should be animated
	      // e.g. fill-color: SVG.Color
	    }

	    this.transforms = [
	      // holds all transformations as transformation objects
	      // e.g. [SVG.Rotate, SVG.Translate, SVG.Matrix]
	    ]

	    this.once = {
	      // functions to fire at a specific position
	      // e.g. "0.5": function foo(){}
	    }

	  }

	})


	SVG.FX = SVG.invent({

	  create: function(element) {
	    this._target = element
	    this.situations = []
	    this.active = false
	    this.situation = null
	    this.paused = false
	    this.lastPos = 0
	    this.pos = 0
	    // The absolute position of an animation is its position in the context of its complete duration (including delay and loops)
	    // When performing a delay, absPos is below 0 and when performing a loop, its value is above 1
	    this.absPos = 0
	    this._speed = 1
	  }

	, extend: {

	    /**
	     * sets or returns the target of this animation
	     * @param o object || number In case of Object it holds all parameters. In case of number its the duration of the animation
	     * @param ease function || string Function which should be used for easing or easing keyword
	     * @param delay Number indicating the delay before the animation starts
	     * @return target || this
	     */
	    animate: function(o, ease, delay){

	      if(typeof o == 'object'){
	        ease = o.ease
	        delay = o.delay
	        o = o.duration
	      }

	      var situation = new SVG.Situation({
	        duration: o || 1000,
	        delay: delay || 0,
	        ease: SVG.easing[ease || '-'] || ease
	      })

	      this.queue(situation)

	      return this
	    }

	    /**
	     * sets a delay before the next element of the queue is called
	     * @param delay Duration of delay in milliseconds
	     * @return this.target()
	     */
	  , delay: function(delay){
	      // The delay is performed by an empty situation with its duration
	      // attribute set to the duration of the delay
	      var situation = new SVG.Situation({
	        duration: delay,
	        delay: 0,
	        ease: SVG.easing['-']
	      })

	      return this.queue(situation)
	    }

	    /**
	     * sets or returns the target of this animation
	     * @param null || target SVG.Element which should be set as new target
	     * @return target || this
	     */
	  , target: function(target){
	      if(target && target instanceof SVG.Element){
	        this._target = target
	        return this
	      }

	      return this._target
	    }

	    // returns the absolute position at a given time
	  , timeToAbsPos: function(timestamp){
	      return (timestamp - this.situation.start) / (this.situation.duration/this._speed)
	    }

	    // returns the timestamp from a given absolute positon
	  , absPosToTime: function(absPos){
	      return this.situation.duration/this._speed * absPos + this.situation.start
	    }

	    // starts the animationloop
	  , startAnimFrame: function(){
	      this.stopAnimFrame()
	      this.animationFrame = window.requestAnimationFrame(function(){ this.step() }.bind(this))
	    }

	    // cancels the animationframe
	  , stopAnimFrame: function(){
	      window.cancelAnimationFrame(this.animationFrame)
	    }

	    // kicks off the animation - only does something when the queue is currently not active and at least one situation is set
	  , start: function(){
	      // dont start if already started
	      if(!this.active && this.situation){
	        this.active = true
	        this.startCurrent()
	      }

	      return this
	    }

	    // start the current situation
	  , startCurrent: function(){
	      this.situation.start = +new Date + this.situation.delay/this._speed
	      this.situation.finish = this.situation.start + this.situation.duration/this._speed
	      return this.initAnimations().step()
	    }

	    /**
	     * adds a function / Situation to the animation queue
	     * @param fn function / situation to add
	     * @return this
	     */
	  , queue: function(fn){
	      if(typeof fn == 'function' || fn instanceof SVG.Situation)
	        this.situations.push(fn)

	      if(!this.situation) this.situation = this.situations.shift()

	      return this
	    }

	    /**
	     * pulls next element from the queue and execute it
	     * @return this
	     */
	  , dequeue: function(){
	      // stop current animation
	      this.stop()

	      // get next animation from queue
	      this.situation = this.situations.shift()

	      if(this.situation){
	        if(this.situation instanceof SVG.Situation) {
	          this.start()
	        } else {
	          // If it is not a SVG.Situation, then it is a function, we execute it
	          this.situation.call(this)
	        }
	      }

	      return this
	    }

	    // updates all animations to the current state of the element
	    // this is important when one property could be changed from another property
	  , initAnimations: function() {
	      var i, j, source
	      var s = this.situation

	      if(s.init) return this

	      for(i in s.animations){
	        source = this.target()[i]()

	        if(!Array.isArray(source)) {
	          source = [source]
	        }

	        if(!Array.isArray(s.animations[i])) {
	          s.animations[i] = [s.animations[i]]
	        }

	        //if(s.animations[i].length > source.length) {
	        //  source.concat = source.concat(s.animations[i].slice(source.length, s.animations[i].length))
	        //}

	        for(j = source.length; j--;) {
	          // The condition is because some methods return a normal number instead
	          // of a SVG.Number
	          if(s.animations[i][j] instanceof SVG.Number)
	            source[j] = new SVG.Number(source[j])

	          s.animations[i][j] = source[j].morph(s.animations[i][j])
	        }
	      }

	      for(i in s.attrs){
	        s.attrs[i] = new SVG.MorphObj(this.target().attr(i), s.attrs[i])
	      }

	      for(i in s.styles){
	        s.styles[i] = new SVG.MorphObj(this.target().style(i), s.styles[i])
	      }

	      s.initialTransformation = this.target().matrixify()

	      s.init = true
	      return this
	    }
	  , clearQueue: function(){
	      this.situations = []
	      return this
	    }
	  , clearCurrent: function(){
	      this.situation = null
	      return this
	    }
	    /** stops the animation immediately
	     * @param jumpToEnd A Boolean indicating whether to complete the current animation immediately.
	     * @param clearQueue A Boolean indicating whether to remove queued animation as well.
	     * @return this
	     */
	  , stop: function(jumpToEnd, clearQueue){
	      var active = this.active
	      this.active = false

	      if(clearQueue){
	        this.clearQueue()
	      }

	      if(jumpToEnd && this.situation){
	        // initialize the situation if it was not
	        !active && this.startCurrent()
	        this.atEnd()
	      }

	      this.stopAnimFrame()

	      return this.clearCurrent()
	    }

	    /** resets the element to the state where the current element has started
	     * @return this
	     */
	  , reset: function(){
	      if(this.situation){
	        var temp = this.situation
	        this.stop()
	        this.situation = temp
	        this.atStart()
	      }
	      return this
	    }

	    // Stop the currently-running animation, remove all queued animations, and complete all animations for the element.
	  , finish: function(){

	      this.stop(true, false)

	      while(this.dequeue().situation && this.stop(true, false));

	      this.clearQueue().clearCurrent()

	      return this
	    }

	    // set the internal animation pointer at the start position, before any loops, and updates the visualisation
	  , atStart: function() {
	      return this.at(0, true)
	    }

	    // set the internal animation pointer at the end position, after all the loops, and updates the visualisation
	  , atEnd: function() {
	      if (this.situation.loops === true) {
	        // If in a infinite loop, we end the current iteration
	        this.situation.loops = this.situation.loop + 1
	      }

	      if(typeof this.situation.loops == 'number') {
	        // If performing a finite number of loops, we go after all the loops
	        return this.at(this.situation.loops, true)
	      } else {
	        // If no loops, we just go at the end
	        return this.at(1, true)
	      }
	    }

	    // set the internal animation pointer to the specified position and updates the visualisation
	    // if isAbsPos is true, pos is treated as an absolute position
	  , at: function(pos, isAbsPos){
	      var durDivSpd = this.situation.duration/this._speed

	      this.absPos = pos
	      // If pos is not an absolute position, we convert it into one
	      if (!isAbsPos) {
	        if (this.situation.reversed) this.absPos = 1 - this.absPos
	        this.absPos += this.situation.loop
	      }

	      this.situation.start = +new Date - this.absPos * durDivSpd
	      this.situation.finish = this.situation.start + durDivSpd

	      return this.step(true)
	    }

	    /**
	     * sets or returns the speed of the animations
	     * @param speed null || Number The new speed of the animations
	     * @return Number || this
	     */
	  , speed: function(speed){
	      if (speed === 0) return this.pause()

	      if (speed) {
	        this._speed = speed
	        // We use an absolute position here so that speed can affect the delay before the animation
	        return this.at(this.absPos, true)
	      } else return this._speed
	    }

	    // Make loopable
	  , loop: function(times, reverse) {
	      var c = this.last()

	      // store total loops
	      c.loops = (times != null) ? times : true
	      c.loop = 0

	      if(reverse) c.reversing = true
	      return this
	    }

	    // pauses the animation
	  , pause: function(){
	      this.paused = true
	      this.stopAnimFrame()

	      return this
	    }

	    // unpause the animation
	  , play: function(){
	      if(!this.paused) return this
	      this.paused = false
	      // We use an absolute position here so that the delay before the animation can be paused
	      return this.at(this.absPos, true)
	    }

	    /**
	     * toggle or set the direction of the animation
	     * true sets direction to backwards while false sets it to forwards
	     * @param reversed Boolean indicating whether to reverse the animation or not (default: toggle the reverse status)
	     * @return this
	     */
	  , reverse: function(reversed){
	      var c = this.last()

	      if(typeof reversed == 'undefined') c.reversed = !c.reversed
	      else c.reversed = reversed

	      return this
	    }


	    /**
	     * returns a float from 0-1 indicating the progress of the current animation
	     * @param eased Boolean indicating whether the returned position should be eased or not
	     * @return number
	     */
	  , progress: function(easeIt){
	      return easeIt ? this.situation.ease(this.pos) : this.pos
	    }

	    /**
	     * adds a callback function which is called when the current animation is finished
	     * @param fn Function which should be executed as callback
	     * @return number
	     */
	  , after: function(fn){
	      var c = this.last()
	        , wrapper = function wrapper(e){
	            if(e.detail.situation == c){
	              fn.call(this, c)
	              this.off('finished.fx', wrapper) // prevent memory leak
	            }
	          }

	      this.target().on('finished.fx', wrapper)

	      return this._callStart()
	    }

	    // adds a callback which is called whenever one animation step is performed
	  , during: function(fn){
	      var c = this.last()
	        , wrapper = function(e){
	            if(e.detail.situation == c){
	              fn.call(this, e.detail.pos, SVG.morph(e.detail.pos), e.detail.eased, c)
	            }
	          }

	      // see above
	      this.target().off('during.fx', wrapper).on('during.fx', wrapper)

	      this.after(function(){
	        this.off('during.fx', wrapper)
	      })

	      return this._callStart()
	    }

	    // calls after ALL animations in the queue are finished
	  , afterAll: function(fn){
	      var wrapper = function wrapper(e){
	            fn.call(this)
	            this.off('allfinished.fx', wrapper)
	          }

	      // see above
	      this.target().off('allfinished.fx', wrapper).on('allfinished.fx', wrapper)

	      return this._callStart()
	    }

	    // calls on every animation step for all animations
	  , duringAll: function(fn){
	      var wrapper = function(e){
	            fn.call(this, e.detail.pos, SVG.morph(e.detail.pos), e.detail.eased, e.detail.situation)
	          }

	      this.target().off('during.fx', wrapper).on('during.fx', wrapper)

	      this.afterAll(function(){
	        this.off('during.fx', wrapper)
	      })

	      return this._callStart()
	    }

	  , last: function(){
	      return this.situations.length ? this.situations[this.situations.length-1] : this.situation
	    }

	    // adds one property to the animations
	  , add: function(method, args, type){
	      this.last()[type || 'animations'][method] = args
	      return this._callStart()
	    }

	    /** perform one step of the animation
	     *  @param ignoreTime Boolean indicating whether to ignore time and use position directly or recalculate position based on time
	     *  @return this
	     */
	  , step: function(ignoreTime){

	      // convert current time to an absolute position
	      if(!ignoreTime) this.absPos = this.timeToAbsPos(+new Date)

	      // This part convert an absolute position to a position
	      if(this.situation.loops !== false) {
	        var absPos, absPosInt, lastLoop

	        // If the absolute position is below 0, we just treat it as if it was 0
	        absPos = Math.max(this.absPos, 0)
	        absPosInt = Math.floor(absPos)

	        if(this.situation.loops === true || absPosInt < this.situation.loops) {
	          this.pos = absPos - absPosInt
	          lastLoop = this.situation.loop
	          this.situation.loop = absPosInt
	        } else {
	          this.absPos = this.situation.loops
	          this.pos = 1
	          // The -1 here is because we don't want to toggle reversed when all the loops have been completed
	          lastLoop = this.situation.loop - 1
	          this.situation.loop = this.situation.loops
	        }

	        if(this.situation.reversing) {
	          // Toggle reversed if an odd number of loops as occured since the last call of step
	          this.situation.reversed = this.situation.reversed != Boolean((this.situation.loop - lastLoop) % 2)
	        }

	      } else {
	        // If there are no loop, the absolute position must not be above 1
	        this.absPos = Math.min(this.absPos, 1)
	        this.pos = this.absPos
	      }

	      // while the absolute position can be below 0, the position must not be below 0
	      if(this.pos < 0) this.pos = 0

	      if(this.situation.reversed) this.pos = 1 - this.pos


	      // apply easing
	      var eased = this.situation.ease(this.pos)

	      // call once-callbacks
	      for(var i in this.situation.once){
	        if(i > this.lastPos && i <= eased){
	          this.situation.once[i].call(this.target(), this.pos, eased)
	          delete this.situation.once[i]
	        }
	      }

	      // fire during callback with position, eased position and current situation as parameter
	      if(this.active) this.target().fire('during', {pos: this.pos, eased: eased, fx: this, situation: this.situation})

	      // the user may call stop or finish in the during callback
	      // so make sure that we still have a valid situation
	      if(!this.situation){
	        return this
	      }

	      // apply the actual animation to every property
	      this.eachAt()

	      // do final code when situation is finished
	      if((this.pos == 1 && !this.situation.reversed) || (this.situation.reversed && this.pos == 0)){

	        // stop animation callback
	        this.stopAnimFrame()

	        // fire finished callback with current situation as parameter
	        this.target().fire('finished', {fx:this, situation: this.situation})

	        if(!this.situations.length){
	          this.target().fire('allfinished')

	          // Recheck the length since the user may call animate in the afterAll callback
	          if(!this.situations.length){
	            this.target().off('.fx') // there shouldnt be any binding left, but to make sure...
	            this.active = false
	          }
	        }

	        // start next animation
	        if(this.active) this.dequeue()
	        else this.clearCurrent()

	      }else if(!this.paused && this.active){
	        // we continue animating when we are not at the end
	        this.startAnimFrame()
	      }

	      // save last eased position for once callback triggering
	      this.lastPos = eased
	      return this

	    }

	    // calculates the step for every property and calls block with it
	  , eachAt: function(){
	      var i, len, at, self = this, target = this.target(), s = this.situation

	      // apply animations which can be called trough a method
	      for(i in s.animations){

	        at = [].concat(s.animations[i]).map(function(el){
	          return typeof el !== 'string' && el.at ? el.at(s.ease(self.pos), self.pos) : el
	        })

	        target[i].apply(target, at)

	      }

	      // apply animation which has to be applied with attr()
	      for(i in s.attrs){

	        at = [i].concat(s.attrs[i]).map(function(el){
	          return typeof el !== 'string' && el.at ? el.at(s.ease(self.pos), self.pos) : el
	        })

	        target.attr.apply(target, at)

	      }

	      // apply animation which has to be applied with style()
	      for(i in s.styles){

	        at = [i].concat(s.styles[i]).map(function(el){
	          return typeof el !== 'string' && el.at ? el.at(s.ease(self.pos), self.pos) : el
	        })

	        target.style.apply(target, at)

	      }

	      // animate initialTransformation which has to be chained
	      if(s.transforms.length){

	        // get initial initialTransformation
	        at = s.initialTransformation
	        for(i = 0, len = s.transforms.length; i < len; i++){

	          // get next transformation in chain
	          var a = s.transforms[i]

	          // multiply matrix directly
	          if(a instanceof SVG.Matrix){

	            if(a.relative){
	              at = at.multiply(new SVG.Matrix().morph(a).at(s.ease(this.pos)))
	            }else{
	              at = at.morph(a).at(s.ease(this.pos))
	            }
	            continue
	          }

	          // when transformation is absolute we have to reset the needed transformation first
	          if(!a.relative)
	            a.undo(at.extract())

	          // and reapply it after
	          at = at.multiply(a.at(s.ease(this.pos)))

	        }

	        // set new matrix on element
	        target.matrix(at)
	      }

	      return this

	    }


	    // adds an once-callback which is called at a specific position and never again
	  , once: function(pos, fn, isEased){
	      var c = this.last()
	      if(!isEased) pos = c.ease(pos)

	      c.once[pos] = fn

	      return this
	    }

	  , _callStart: function() {
	      setTimeout(function(){this.start()}.bind(this), 0)
	      return this
	    }

	  }

	, parent: SVG.Element

	  // Add method to parent elements
	, construct: {
	    // Get fx module or create a new one, then animate with given duration and ease
	    animate: function(o, ease, delay) {
	      return (this.fx || (this.fx = new SVG.FX(this))).animate(o, ease, delay)
	    }
	  , delay: function(delay){
	      return (this.fx || (this.fx = new SVG.FX(this))).delay(delay)
	    }
	  , stop: function(jumpToEnd, clearQueue) {
	      if (this.fx)
	        this.fx.stop(jumpToEnd, clearQueue)

	      return this
	    }
	  , finish: function() {
	      if (this.fx)
	        this.fx.finish()

	      return this
	    }
	    // Pause current animation
	  , pause: function() {
	      if (this.fx)
	        this.fx.pause()

	      return this
	    }
	    // Play paused current animation
	  , play: function() {
	      if (this.fx)
	        this.fx.play()

	      return this
	    }
	    // Set/Get the speed of the animations
	  , speed: function(speed) {
	      if (this.fx)
	        if (speed == null)
	          return this.fx.speed()
	        else
	          this.fx.speed(speed)

	      return this
	    }
	  }

	})

	// MorphObj is used whenever no morphable object is given
	SVG.MorphObj = SVG.invent({

	  create: function(from, to){
	    // prepare color for morphing
	    if(SVG.Color.isColor(to)) return new SVG.Color(from).morph(to)
	    // prepare value list for morphing
	    if(SVG.regex.delimiter.test(from)) return new SVG.Array(from).morph(to)
	    // prepare number for morphing
	    if(SVG.regex.numberAndUnit.test(to)) return new SVG.Number(from).morph(to)

	    // prepare for plain morphing
	    this.value = from
	    this.destination = to
	  }

	, extend: {
	    at: function(pos, real){
	      return real < 1 ? this.value : this.destination
	    },

	    valueOf: function(){
	      return this.value
	    }
	  }

	})

	SVG.extend(SVG.FX, {
	  // Add animatable attributes
	  attr: function(a, v, relative) {
	    // apply attributes individually
	    if (typeof a == 'object') {
	      for (var key in a)
	        this.attr(key, a[key])

	    } else {
	      this.add(a, v, 'attrs')
	    }

	    return this
	  }
	  // Add animatable styles
	, style: function(s, v) {
	    if (typeof s == 'object')
	      for (var key in s)
	        this.style(key, s[key])

	    else
	      this.add(s, v, 'styles')

	    return this
	  }
	  // Animatable x-axis
	, x: function(x, relative) {
	    if(this.target() instanceof SVG.G){
	      this.transform({x:x}, relative)
	      return this
	    }

	    var num = new SVG.Number(x)
	    num.relative = relative
	    return this.add('x', num)
	  }
	  // Animatable y-axis
	, y: function(y, relative) {
	    if(this.target() instanceof SVG.G){
	      this.transform({y:y}, relative)
	      return this
	    }

	    var num = new SVG.Number(y)
	    num.relative = relative
	    return this.add('y', num)
	  }
	  // Animatable center x-axis
	, cx: function(x) {
	    return this.add('cx', new SVG.Number(x))
	  }
	  // Animatable center y-axis
	, cy: function(y) {
	    return this.add('cy', new SVG.Number(y))
	  }
	  // Add animatable move
	, move: function(x, y) {
	    return this.x(x).y(y)
	  }
	  // Add animatable center
	, center: function(x, y) {
	    return this.cx(x).cy(y)
	  }
	  // Add animatable size
	, size: function(width, height) {
	    if (this.target() instanceof SVG.Text) {
	      // animate font size for Text elements
	      this.attr('font-size', width)

	    } else {
	      // animate bbox based size for all other elements
	      var box

	      if(!width || !height){
	        box = this.target().bbox()
	      }

	      if(!width){
	        width = box.width / box.height  * height
	      }

	      if(!height){
	        height = box.height / box.width  * width
	      }

	      this.add('width' , new SVG.Number(width))
	          .add('height', new SVG.Number(height))

	    }

	    return this
	  }
	  // Add animatable width
	, width: function(width) {
	    return this.add('width', new SVG.Number(width))
	  }
	  // Add animatable height
	, height: function(height) {
	    return this.add('height', new SVG.Number(height))
	  }
	  // Add animatable plot
	, plot: function(a, b, c, d) {
	    // Lines can be plotted with 4 arguments
	    if(arguments.length == 4) {
	      return this.plot([a, b, c, d])
	    }

	    return this.add('plot', new (this.target().morphArray)(a))
	  }
	  // Add leading method
	, leading: function(value) {
	    return this.target().leading ?
	      this.add('leading', new SVG.Number(value)) :
	      this
	  }
	  // Add animatable viewbox
	, viewbox: function(x, y, width, height) {
	    if (this.target() instanceof SVG.Container) {
	      this.add('viewbox', new SVG.ViewBox(x, y, width, height))
	    }

	    return this
	  }
	, update: function(o) {
	    if (this.target() instanceof SVG.Stop) {
	      if (typeof o == 'number' || o instanceof SVG.Number) {
	        return this.update({
	          offset:  arguments[0]
	        , color:   arguments[1]
	        , opacity: arguments[2]
	        })
	      }

	      if (o.opacity != null) this.attr('stop-opacity', o.opacity)
	      if (o.color   != null) this.attr('stop-color', o.color)
	      if (o.offset  != null) this.attr('offset', o.offset)
	    }

	    return this
	  }
	})

	SVG.Box = SVG.invent({
	  create: function(x, y, width, height) {
	    if (typeof x == 'object' && !(x instanceof SVG.Element)) {
	      // chromes getBoundingClientRect has no x and y property
	      return SVG.Box.call(this, x.left != null ? x.left : x.x , x.top != null ? x.top : x.y, x.width, x.height)
	    } else if (arguments.length == 4) {
	      this.x = x
	      this.y = y
	      this.width = width
	      this.height = height
	    }

	    // add center, right, bottom...
	    fullBox(this)
	  }
	, extend: {
	    // Merge rect box with another, return a new instance
	    merge: function(box) {
	      var b = new this.constructor()

	      // merge boxes
	      b.x      = Math.min(this.x, box.x)
	      b.y      = Math.min(this.y, box.y)
	      b.width  = Math.max(this.x + this.width,  box.x + box.width)  - b.x
	      b.height = Math.max(this.y + this.height, box.y + box.height) - b.y

	      return fullBox(b)
	    }

	  , transform: function(m) {
	      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, p, bbox

	      var pts = [
	        new SVG.Point(this.x, this.y),
	        new SVG.Point(this.x2, this.y),
	        new SVG.Point(this.x, this.y2),
	        new SVG.Point(this.x2, this.y2)
	      ]

	      pts.forEach(function(p) {
	        p = p.transform(m)
	        xMin = Math.min(xMin,p.x)
	        xMax = Math.max(xMax,p.x)
	        yMin = Math.min(yMin,p.y)
	        yMax = Math.max(yMax,p.y)
	      })

	      bbox = new this.constructor()
	      bbox.x = xMin
	      bbox.width = xMax-xMin
	      bbox.y = yMin
	      bbox.height = yMax-yMin

	      fullBox(bbox)

	      return bbox
	    }
	  }
	})

	SVG.BBox = SVG.invent({
	  // Initialize
	  create: function(element) {
	    SVG.Box.apply(this, [].slice.call(arguments))

	    // get values if element is given
	    if (element instanceof SVG.Element) {
	      var box

	      // yes this is ugly, but Firefox can be a bitch when it comes to elements that are not yet rendered
	      try {

	        if (!document.documentElement.contains){
	          // This is IE - it does not support contains() for top-level SVGs
	          var topParent = element.node
	          while (topParent.parentNode){
	            topParent = topParent.parentNode
	          }
	          if (topParent != document) throw new Exception('Element not in the dom')
	        } else {
	          // the element is NOT in the dom, throw error
	          if(!document.documentElement.contains(element.node)) throw new Exception('Element not in the dom')
	        }

	        // find native bbox
	        box = element.node.getBBox()
	      } catch(e) {
	        if(element instanceof SVG.Shape){
	          var clone = element.clone(SVG.parser.draw.instance).show()
	          box = clone.node.getBBox()
	          clone.remove()
	        }else{
	          box = {
	            x:      element.node.clientLeft
	          , y:      element.node.clientTop
	          , width:  element.node.clientWidth
	          , height: element.node.clientHeight
	          }
	        }
	      }

	      SVG.Box.call(this, box)
	    }

	  }

	  // Define ancestor
	, inherit: SVG.Box

	  // Define Parent
	, parent: SVG.Element

	  // Constructor
	, construct: {
	    // Get bounding box
	    bbox: function() {
	      return new SVG.BBox(this)
	    }
	  }

	})

	SVG.BBox.prototype.constructor = SVG.BBox


	SVG.extend(SVG.Element, {
	  tbox: function(){
	    console.warn('Use of TBox is deprecated and mapped to RBox. Use .rbox() instead.')
	    return this.rbox(this.doc())
	  }
	})

	SVG.RBox = SVG.invent({
	  // Initialize
	  create: function(element) {
	    SVG.Box.apply(this, [].slice.call(arguments))

	    if (element instanceof SVG.Element) {
	      SVG.Box.call(this, element.node.getBoundingClientRect())
	    }
	  }

	, inherit: SVG.Box

	  // define Parent
	, parent: SVG.Element

	, extend: {
	    addOffset: function() {
	      // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
	      this.x += window.pageXOffset
	      this.y += window.pageYOffset
	      return this
	    }
	  }

	  // Constructor
	, construct: {
	    // Get rect box
	    rbox: function(el) {
	      if (el) return new SVG.RBox(this).transform(el.screenCTM().inverse())
	      return new SVG.RBox(this).addOffset()
	    }
	  }

	})

	SVG.RBox.prototype.constructor = SVG.RBox

	SVG.Matrix = SVG.invent({
	  // Initialize
	  create: function(source) {
	    var i, base = arrayToMatrix([1, 0, 0, 1, 0, 0])

	    // ensure source as object
	    source = source instanceof SVG.Element ?
	      source.matrixify() :
	    typeof source === 'string' ?
	      arrayToMatrix(source.split(SVG.regex.delimiter).map(parseFloat)) :
	    arguments.length == 6 ?
	      arrayToMatrix([].slice.call(arguments)) :
	    Array.isArray(source) ?
	      arrayToMatrix(source) :
	    typeof source === 'object' ?
	      source : base

	    // merge source
	    for (i = abcdef.length - 1; i >= 0; --i)
	      this[abcdef[i]] = source[abcdef[i]] != null ?
	        source[abcdef[i]] : base[abcdef[i]]
	  }

	  // Add methods
	, extend: {
	    // Extract individual transformations
	    extract: function() {
	      // find delta transform points
	      var px    = deltaTransformPoint(this, 0, 1)
	        , py    = deltaTransformPoint(this, 1, 0)
	        , skewX = 180 / Math.PI * Math.atan2(px.y, px.x) - 90

	      return {
	        // translation
	        x:        this.e
	      , y:        this.f
	      , transformedX:(this.e * Math.cos(skewX * Math.PI / 180) + this.f * Math.sin(skewX * Math.PI / 180)) / Math.sqrt(this.a * this.a + this.b * this.b)
	      , transformedY:(this.f * Math.cos(skewX * Math.PI / 180) + this.e * Math.sin(-skewX * Math.PI / 180)) / Math.sqrt(this.c * this.c + this.d * this.d)
	        // skew
	      , skewX:    -skewX
	      , skewY:    180 / Math.PI * Math.atan2(py.y, py.x)
	        // scale
	      , scaleX:   Math.sqrt(this.a * this.a + this.b * this.b)
	      , scaleY:   Math.sqrt(this.c * this.c + this.d * this.d)
	        // rotation
	      , rotation: skewX
	      , a: this.a
	      , b: this.b
	      , c: this.c
	      , d: this.d
	      , e: this.e
	      , f: this.f
	      , matrix: new SVG.Matrix(this)
	      }
	    }
	    // Clone matrix
	  , clone: function() {
	      return new SVG.Matrix(this)
	    }
	    // Morph one matrix into another
	  , morph: function(matrix) {
	      // store new destination
	      this.destination = new SVG.Matrix(matrix)

	      return this
	    }
	    // Get morphed matrix at a given position
	  , at: function(pos) {
	      // make sure a destination is defined
	      if (!this.destination) return this

	      // calculate morphed matrix at a given position
	      var matrix = new SVG.Matrix({
	        a: this.a + (this.destination.a - this.a) * pos
	      , b: this.b + (this.destination.b - this.b) * pos
	      , c: this.c + (this.destination.c - this.c) * pos
	      , d: this.d + (this.destination.d - this.d) * pos
	      , e: this.e + (this.destination.e - this.e) * pos
	      , f: this.f + (this.destination.f - this.f) * pos
	      })

	      return matrix
	    }
	    // Multiplies by given matrix
	  , multiply: function(matrix) {
	      return new SVG.Matrix(this.native().multiply(parseMatrix(matrix).native()))
	    }
	    // Inverses matrix
	  , inverse: function() {
	      return new SVG.Matrix(this.native().inverse())
	    }
	    // Translate matrix
	  , translate: function(x, y) {
	      return new SVG.Matrix(this.native().translate(x || 0, y || 0))
	    }
	    // Scale matrix
	  , scale: function(x, y, cx, cy) {
	      // support uniformal scale
	      if (arguments.length == 1) {
	        y = x
	      } else if (arguments.length == 3) {
	        cy = cx
	        cx = y
	        y = x
	      }

	      return this.around(cx, cy, new SVG.Matrix(x, 0, 0, y, 0, 0))
	    }
	    // Rotate matrix
	  , rotate: function(r, cx, cy) {
	      // convert degrees to radians
	      r = SVG.utils.radians(r)

	      return this.around(cx, cy, new SVG.Matrix(Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0))
	    }
	    // Flip matrix on x or y, at a given offset
	  , flip: function(a, o) {
	      return a == 'x' ?
	          this.scale(-1, 1, o, 0) :
	        a == 'y' ?
	          this.scale(1, -1, 0, o) :
	          this.scale(-1, -1, a, o != null ? o : a)
	    }
	    // Skew
	  , skew: function(x, y, cx, cy) {
	      // support uniformal skew
	      if (arguments.length == 1) {
	        y = x
	      } else if (arguments.length == 3) {
	        cy = cx
	        cx = y
	        y = x
	      }

	      // convert degrees to radians
	      x = SVG.utils.radians(x)
	      y = SVG.utils.radians(y)

	      return this.around(cx, cy, new SVG.Matrix(1, Math.tan(y), Math.tan(x), 1, 0, 0))
	    }
	    // SkewX
	  , skewX: function(x, cx, cy) {
	      return this.skew(x, 0, cx, cy)
	    }
	    // SkewY
	  , skewY: function(y, cx, cy) {
	      return this.skew(0, y, cx, cy)
	    }
	    // Transform around a center point
	  , around: function(cx, cy, matrix) {
	      return this
	        .multiply(new SVG.Matrix(1, 0, 0, 1, cx || 0, cy || 0))
	        .multiply(matrix)
	        .multiply(new SVG.Matrix(1, 0, 0, 1, -cx || 0, -cy || 0))
	    }
	    // Convert to native SVGMatrix
	  , native: function() {
	      // create new matrix
	      var matrix = SVG.parser.native.createSVGMatrix()

	      // update with current values
	      for (var i = abcdef.length - 1; i >= 0; i--)
	        matrix[abcdef[i]] = this[abcdef[i]]

	      return matrix
	    }
	    // Convert matrix to string
	  , toString: function() {
	      return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')'
	    }
	  }

	  // Define parent
	, parent: SVG.Element

	  // Add parent method
	, construct: {
	    // Get current matrix
	    ctm: function() {
	      return new SVG.Matrix(this.node.getCTM())
	    },
	    // Get current screen matrix
	    screenCTM: function() {
	      /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
	         This is needed because FF does not return the transformation matrix
	         for the inner coordinate system when getScreenCTM() is called on nested svgs.
	         However all other Browsers do that */
	      if(this instanceof SVG.Nested) {
	        var rect = this.rect(1,1)
	        var m = rect.node.getScreenCTM()
	        rect.remove()
	        return new SVG.Matrix(m)
	      }
	      return new SVG.Matrix(this.node.getScreenCTM())
	    }

	  }

	})

	SVG.Point = SVG.invent({
	  // Initialize
	  create: function(x,y) {
	    var i, source, base = {x:0, y:0}

	    // ensure source as object
	    source = Array.isArray(x) ?
	      {x:x[0], y:x[1]} :
	    typeof x === 'object' ?
	      {x:x.x, y:x.y} :
	    x != null ?
	      {x:x, y:(y != null ? y : x)} : base // If y has no value, then x is used has its value

	    // merge source
	    this.x = source.x
	    this.y = source.y
	  }

	  // Add methods
	, extend: {
	    // Clone point
	    clone: function() {
	      return new SVG.Point(this)
	    }
	    // Morph one point into another
	  , morph: function(x, y) {
	      // store new destination
	      this.destination = new SVG.Point(x, y)

	      return this
	    }
	    // Get morphed point at a given position
	  , at: function(pos) {
	      // make sure a destination is defined
	      if (!this.destination) return this

	      // calculate morphed matrix at a given position
	      var point = new SVG.Point({
	        x: this.x + (this.destination.x - this.x) * pos
	      , y: this.y + (this.destination.y - this.y) * pos
	      })

	      return point
	    }
	    // Convert to native SVGPoint
	  , native: function() {
	      // create new point
	      var point = SVG.parser.native.createSVGPoint()

	      // update with current values
	      point.x = this.x
	      point.y = this.y

	      return point
	    }
	    // transform point with matrix
	  , transform: function(matrix) {
	      return new SVG.Point(this.native().matrixTransform(matrix.native()))
	    }

	  }

	})

	SVG.extend(SVG.Element, {

	  // Get point
	  point: function(x, y) {
	    return new SVG.Point(x,y).transform(this.screenCTM().inverse());
	  }

	})

	SVG.extend(SVG.Element, {
	  // Set svg element attribute
	  attr: function(a, v, n) {
	    // act as full getter
	    if (a == null) {
	      // get an object of attributes
	      a = {}
	      v = this.node.attributes
	      for (n = v.length - 1; n >= 0; n--)
	        a[v[n].nodeName] = SVG.regex.isNumber.test(v[n].nodeValue) ? parseFloat(v[n].nodeValue) : v[n].nodeValue

	      return a

	    } else if (typeof a == 'object') {
	      // apply every attribute individually if an object is passed
	      for (v in a) this.attr(v, a[v])

	    } else if (v === null) {
	        // remove value
	        this.node.removeAttribute(a)

	    } else if (v == null) {
	      // act as a getter if the first and only argument is not an object
	      v = this.node.getAttribute(a)
	      return v == null ?
	        SVG.defaults.attrs[a] :
	      SVG.regex.isNumber.test(v) ?
	        parseFloat(v) : v

	    } else {
	      // BUG FIX: some browsers will render a stroke if a color is given even though stroke width is 0
	      if (a == 'stroke-width')
	        this.attr('stroke', parseFloat(v) > 0 ? this._stroke : null)
	      else if (a == 'stroke')
	        this._stroke = v

	      // convert image fill and stroke to patterns
	      if (a == 'fill' || a == 'stroke') {
	        if (SVG.regex.isImage.test(v))
	          v = this.doc().defs().image(v, 0, 0)

	        if (v instanceof SVG.Image)
	          v = this.doc().defs().pattern(0, 0, function() {
	            this.add(v)
	          })
	      }

	      // ensure correct numeric values (also accepts NaN and Infinity)
	      if (typeof v === 'number')
	        v = new SVG.Number(v)

	      // ensure full hex color
	      else if (SVG.Color.isColor(v))
	        v = new SVG.Color(v)

	      // parse array values
	      else if (Array.isArray(v))
	        v = new SVG.Array(v)

	      // if the passed attribute is leading...
	      if (a == 'leading') {
	        // ... call the leading method instead
	        if (this.leading)
	          this.leading(v)
	      } else {
	        // set given attribute on node
	        typeof n === 'string' ?
	          this.node.setAttributeNS(n, a, v.toString()) :
	          this.node.setAttribute(a, v.toString())
	      }

	      // rebuild if required
	      if (this.rebuild && (a == 'font-size' || a == 'x'))
	        this.rebuild(a, v)
	    }

	    return this
	  }
	})
	SVG.extend(SVG.Element, {
	  // Add transformations
	  transform: function(o, relative) {
	    // get target in case of the fx module, otherwise reference this
	    var target = this
	      , matrix, bbox

	    // act as a getter
	    if (typeof o !== 'object') {
	      // get current matrix
	      matrix = new SVG.Matrix(target).extract()

	      return typeof o === 'string' ? matrix[o] : matrix
	    }

	    // get current matrix
	    matrix = new SVG.Matrix(target)

	    // ensure relative flag
	    relative = !!relative || !!o.relative

	    // act on matrix
	    if (o.a != null) {
	      matrix = relative ?
	        // relative
	        matrix.multiply(new SVG.Matrix(o)) :
	        // absolute
	        new SVG.Matrix(o)

	    // act on rotation
	    } else if (o.rotation != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // apply transformation
	      matrix = relative ?
	        // relative
	        matrix.rotate(o.rotation, o.cx, o.cy) :
	        // absolute
	        matrix.rotate(o.rotation - matrix.extract().rotation, o.cx, o.cy)

	    // act on scale
	    } else if (o.scale != null || o.scaleX != null || o.scaleY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure scale values on both axes
	      o.scaleX = o.scale != null ? o.scale : o.scaleX != null ? o.scaleX : 1
	      o.scaleY = o.scale != null ? o.scale : o.scaleY != null ? o.scaleY : 1

	      if (!relative) {
	        // absolute; multiply inversed values
	        var e = matrix.extract()
	        o.scaleX = o.scaleX * 1 / e.scaleX
	        o.scaleY = o.scaleY * 1 / e.scaleY
	      }

	      matrix = matrix.scale(o.scaleX, o.scaleY, o.cx, o.cy)

	    // act on skew
	    } else if (o.skew != null || o.skewX != null || o.skewY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure skew values on both axes
	      o.skewX = o.skew != null ? o.skew : o.skewX != null ? o.skewX : 0
	      o.skewY = o.skew != null ? o.skew : o.skewY != null ? o.skewY : 0

	      if (!relative) {
	        // absolute; reset skew values
	        var e = matrix.extract()
	        matrix = matrix.multiply(new SVG.Matrix().skew(e.skewX, e.skewY, o.cx, o.cy).inverse())
	      }

	      matrix = matrix.skew(o.skewX, o.skewY, o.cx, o.cy)

	    // act on flip
	    } else if (o.flip) {
	      if(o.flip == 'x' || o.flip == 'y') {
	        o.offset = o.offset == null ? target.bbox()['c' + o.flip] : o.offset
	      } else {
	        if(o.offset == null) {
	          bbox = target.bbox()
	          o.flip = bbox.cx
	          o.offset = bbox.cy
	        } else {
	          o.flip = o.offset
	        }
	      }

	      matrix = new SVG.Matrix().flip(o.flip, o.offset)

	    // act on translate
	    } else if (o.x != null || o.y != null) {
	      if (relative) {
	        // relative
	        matrix = matrix.translate(o.x, o.y)
	      } else {
	        // absolute
	        if (o.x != null) matrix.e = o.x
	        if (o.y != null) matrix.f = o.y
	      }
	    }

	    return this.attr('transform', matrix)
	  }
	})

	SVG.extend(SVG.FX, {
	  transform: function(o, relative) {
	    // get target in case of the fx module, otherwise reference this
	    var target = this.target()
	      , matrix, bbox

	    // act as a getter
	    if (typeof o !== 'object') {
	      // get current matrix
	      matrix = new SVG.Matrix(target).extract()

	      return typeof o === 'string' ? matrix[o] : matrix
	    }

	    // ensure relative flag
	    relative = !!relative || !!o.relative

	    // act on matrix
	    if (o.a != null) {
	      matrix = new SVG.Matrix(o)

	    // act on rotation
	    } else if (o.rotation != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // apply transformation
	      matrix = new SVG.Rotate(o.rotation, o.cx, o.cy)

	    // act on scale
	    } else if (o.scale != null || o.scaleX != null || o.scaleY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure scale values on both axes
	      o.scaleX = o.scale != null ? o.scale : o.scaleX != null ? o.scaleX : 1
	      o.scaleY = o.scale != null ? o.scale : o.scaleY != null ? o.scaleY : 1

	      matrix = new SVG.Scale(o.scaleX, o.scaleY, o.cx, o.cy)

	    // act on skew
	    } else if (o.skewX != null || o.skewY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure skew values on both axes
	      o.skewX = o.skewX != null ? o.skewX : 0
	      o.skewY = o.skewY != null ? o.skewY : 0

	      matrix = new SVG.Skew(o.skewX, o.skewY, o.cx, o.cy)

	    // act on flip
	    } else if (o.flip) {
	      if(o.flip == 'x' || o.flip == 'y') {
	        o.offset = o.offset == null ? target.bbox()['c' + o.flip] : o.offset
	      } else {
	        if(o.offset == null) {
	          bbox = target.bbox()
	          o.flip = bbox.cx
	          o.offset = bbox.cy
	        } else {
	          o.flip = o.offset
	        }
	      }

	      matrix = new SVG.Matrix().flip(o.flip, o.offset)

	    // act on translate
	    } else if (o.x != null || o.y != null) {
	      matrix = new SVG.Translate(o.x, o.y)
	    }

	    if(!matrix) return this

	    matrix.relative = relative

	    this.last().transforms.push(matrix)

	    return this._callStart()
	  }
	})

	SVG.extend(SVG.Element, {
	  // Reset all transformations
	  untransform: function() {
	    return this.attr('transform', null)
	  },
	  // merge the whole transformation chain into one matrix and returns it
	  matrixify: function() {

	    var matrix = (this.attr('transform') || '')
	      // split transformations
	      .split(SVG.regex.transforms).slice(0,-1).map(function(str){
	        // generate key => value pairs
	        var kv = str.trim().split('(')
	        return [kv[0], kv[1].split(SVG.regex.delimiter).map(function(str){ return parseFloat(str) })]
	      })
	      // merge every transformation into one matrix
	      .reduce(function(matrix, transform){

	        if(transform[0] == 'matrix') return matrix.multiply(arrayToMatrix(transform[1]))
	        return matrix[transform[0]].apply(matrix, transform[1])

	      }, new SVG.Matrix())

	    return matrix
	  },
	  // add an element to another parent without changing the visual representation on the screen
	  toParent: function(parent) {
	    if(this == parent) return this
	    var ctm = this.screenCTM()
	    var pCtm = parent.screenCTM().inverse()

	    this.addTo(parent).untransform().transform(pCtm.multiply(ctm))

	    return this
	  },
	  // same as above with parent equals root-svg
	  toDoc: function() {
	    return this.toParent(this.doc())
	  }

	})

	SVG.Transformation = SVG.invent({

	  create: function(source, inversed){

	    if(arguments.length > 1 && typeof inversed != 'boolean'){
	      return this.constructor.call(this, [].slice.call(arguments))
	    }

	    if(Array.isArray(source)){
	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        this[this.arguments[i]] = source[i]
	      }
	    } else if(typeof source == 'object'){
	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        this[this.arguments[i]] = source[this.arguments[i]]
	      }
	    }

	    this.inversed = false

	    if(inversed === true){
	      this.inversed = true
	    }

	  }

	, extend: {

	    arguments: []
	  , method: ''

	  , at: function(pos){

	      var params = []

	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        params.push(this[this.arguments[i]])
	      }

	      var m = this._undo || new SVG.Matrix()

	      m = new SVG.Matrix().morph(SVG.Matrix.prototype[this.method].apply(m, params)).at(pos)

	      return this.inversed ? m.inverse() : m

	    }

	  , undo: function(o){
	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        o[this.arguments[i]] = typeof this[this.arguments[i]] == 'undefined' ? 0 : o[this.arguments[i]]
	      }

	      // The method SVG.Matrix.extract which was used before calling this
	      // method to obtain a value for the parameter o doesn't return a cx and
	      // a cy so we use the ones that were provided to this object at its creation
	      o.cx = this.cx
	      o.cy = this.cy

	      this._undo = new SVG[capitalize(this.method)](o, true).at(1)

	      return this
	    }

	  }

	})

	SVG.Translate = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    this.constructor.apply(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['transformedX', 'transformedY']
	  , method: 'translate'
	  }

	})

	SVG.Rotate = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    this.constructor.apply(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['rotation', 'cx', 'cy']
	  , method: 'rotate'
	  , at: function(pos){
	      var m = new SVG.Matrix().rotate(new SVG.Number().morph(this.rotation - (this._undo ? this._undo.rotation : 0)).at(pos), this.cx, this.cy)
	      return this.inversed ? m.inverse() : m
	    }
	  , undo: function(o){
	      this._undo = o
	      return this
	    }
	  }

	})

	SVG.Scale = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    this.constructor.apply(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['scaleX', 'scaleY', 'cx', 'cy']
	  , method: 'scale'
	  }

	})

	SVG.Skew = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    this.constructor.apply(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['skewX', 'skewY', 'cx', 'cy']
	  , method: 'skew'
	  }

	})

	SVG.extend(SVG.Element, {
	  // Dynamic style generator
	  style: function(s, v) {
	    if (arguments.length == 0) {
	      // get full style
	      return this.node.style.cssText || ''

	    } else if (arguments.length < 2) {
	      // apply every style individually if an object is passed
	      if (typeof s == 'object') {
	        for (v in s) this.style(v, s[v])

	      } else if (SVG.regex.isCss.test(s)) {
	        // parse css string
	        s = s.split(/\s*;\s*/)
	          // filter out suffix ; and stuff like ;;
	          .filter(function(e) { return !!e })
	          .map(function(e){ return e.split(/\s*:\s*/) })

	        // apply every definition individually
	        while (v = s.pop()) {
	          this.style(v[0], v[1])
	        }
	      } else {
	        // act as a getter if the first and only argument is not an object
	        return this.node.style[camelCase(s)]
	      }

	    } else {
	      this.node.style[camelCase(s)] = v === null || SVG.regex.isBlank.test(v) ? '' : v
	    }

	    return this
	  }
	})
	SVG.Parent = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    this.constructor.call(this, element)
	  }

	  // Inherit from
	, inherit: SVG.Element

	  // Add class methods
	, extend: {
	    // Returns all child elements
	    children: function() {
	      return SVG.utils.map(SVG.utils.filterSVGElements(this.node.childNodes), function(node) {
	        return SVG.adopt(node)
	      })
	    }
	    // Add given element at a position
	  , add: function(element, i) {
	      if (i == null)
	        this.node.appendChild(element.node)
	      else if (element.node != this.node.childNodes[i])
	        this.node.insertBefore(element.node, this.node.childNodes[i])

	      return this
	    }
	    // Basically does the same as `add()` but returns the added element instead
	  , put: function(element, i) {
	      this.add(element, i)
	      return element
	    }
	    // Checks if the given element is a child
	  , has: function(element) {
	      return this.index(element) >= 0
	    }
	    // Gets index of given element
	  , index: function(element) {
	      return [].slice.call(this.node.childNodes).indexOf(element.node)
	    }
	    // Get a element at the given index
	  , get: function(i) {
	      return SVG.adopt(this.node.childNodes[i])
	    }
	    // Get first child
	  , first: function() {
	      return this.get(0)
	    }
	    // Get the last child
	  , last: function() {
	      return this.get(this.node.childNodes.length - 1)
	    }
	    // Iterates over all children and invokes a given block
	  , each: function(block, deep) {
	      var i, il
	        , children = this.children()

	      for (i = 0, il = children.length; i < il; i++) {
	        if (children[i] instanceof SVG.Element)
	          block.apply(children[i], [i, children])

	        if (deep && (children[i] instanceof SVG.Container))
	          children[i].each(block, deep)
	      }

	      return this
	    }
	    // Remove a given child
	  , removeElement: function(element) {
	      this.node.removeChild(element.node)

	      return this
	    }
	    // Remove all elements in this container
	  , clear: function() {
	      // remove children
	      while(this.node.hasChildNodes())
	        this.node.removeChild(this.node.lastChild)

	      // remove defs reference
	      delete this._defs

	      return this
	    }
	  , // Get defs
	    defs: function() {
	      return this.doc().defs()
	    }
	  }

	})

	SVG.extend(SVG.Parent, {

	  ungroup: function(parent, depth) {
	    if(depth === 0 || this instanceof SVG.Defs || this.node == SVG.parser.draw) return this

	    parent = parent || (this instanceof SVG.Doc ? this : this.parent(SVG.Parent))
	    depth = depth || Infinity

	    this.each(function(){
	      if(this instanceof SVG.Defs) return this
	      if(this instanceof SVG.Parent) return this.ungroup(parent, depth-1)
	      return this.toParent(parent)
	    })

	    this.node.firstChild || this.remove()

	    return this
	  },

	  flatten: function(parent, depth) {
	    return this.ungroup(parent, depth)
	  }

	})
	SVG.Container = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    this.constructor.call(this, element)
	  }

	  // Inherit from
	, inherit: SVG.Parent

	})

	SVG.ViewBox = SVG.invent({

	  create: function(source) {
	    var i, base = [0, 0, 0, 0]

	    var x, y, width, height, box, view, we, he
	      , wm   = 1 // width multiplier
	      , hm   = 1 // height multiplier
	      , reg  = /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi

	    if(source instanceof SVG.Element){

	      we = source
	      he = source
	      view = (source.attr('viewBox') || '').match(reg)
	      box = source.bbox

	      // get dimensions of current node
	      width  = new SVG.Number(source.width())
	      height = new SVG.Number(source.height())

	      // find nearest non-percentual dimensions
	      while (width.unit == '%') {
	        wm *= width.value
	        width = new SVG.Number(we instanceof SVG.Doc ? we.parent().offsetWidth : we.parent().width())
	        we = we.parent()
	      }
	      while (height.unit == '%') {
	        hm *= height.value
	        height = new SVG.Number(he instanceof SVG.Doc ? he.parent().offsetHeight : he.parent().height())
	        he = he.parent()
	      }

	      // ensure defaults
	      this.x      = 0
	      this.y      = 0
	      this.width  = width  * wm
	      this.height = height * hm
	      this.zoom   = 1

	      if (view) {
	        // get width and height from viewbox
	        x      = parseFloat(view[0])
	        y      = parseFloat(view[1])
	        width  = parseFloat(view[2])
	        height = parseFloat(view[3])

	        // calculate zoom accoring to viewbox
	        this.zoom = ((this.width / this.height) > (width / height)) ?
	          this.height / height :
	          this.width  / width

	        // calculate real pixel dimensions on parent SVG.Doc element
	        this.x      = x
	        this.y      = y
	        this.width  = width
	        this.height = height

	      }

	    }else{

	      // ensure source as object
	      source = typeof source === 'string' ?
	        source.match(reg).map(function(el){ return parseFloat(el) }) :
	      Array.isArray(source) ?
	        source :
	      typeof source == 'object' ?
	        [source.x, source.y, source.width, source.height] :
	      arguments.length == 4 ?
	        [].slice.call(arguments) :
	        base

	      this.x = source[0]
	      this.y = source[1]
	      this.width = source[2]
	      this.height = source[3]
	    }


	  }

	, extend: {

	    toString: function() {
	      return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
	    }
	  , morph: function(x, y, width, height){
	      this.destination = new SVG.ViewBox(x, y, width, height)
	      return this
	    }

	  , at: function(pos) {

	      if(!this.destination) return this

	      return new SVG.ViewBox([
	          this.x + (this.destination.x - this.x) * pos
	        , this.y + (this.destination.y - this.y) * pos
	        , this.width + (this.destination.width - this.width) * pos
	        , this.height + (this.destination.height - this.height) * pos
	      ])

	    }

	  }

	  // Define parent
	, parent: SVG.Container

	  // Add parent method
	, construct: {

	    // get/set viewbox
	    viewbox: function(x, y, width, height) {
	      if (arguments.length == 0)
	        // act as a getter if there are no arguments
	        return new SVG.ViewBox(this)

	      // otherwise act as a setter
	      return this.attr('viewBox', new SVG.ViewBox(x, y, width, height))
	    }

	  }

	})
	// Add events to elements
	;[  'click'
	  , 'dblclick'
	  , 'mousedown'
	  , 'mouseup'
	  , 'mouseover'
	  , 'mouseout'
	  , 'mousemove'
	  // , 'mouseenter' -> not supported by IE
	  // , 'mouseleave' -> not supported by IE
	  , 'touchstart'
	  , 'touchmove'
	  , 'touchleave'
	  , 'touchend'
	  , 'touchcancel' ].forEach(function(event) {

	  // add event to SVG.Element
	  SVG.Element.prototype[event] = function(f) {
	    // bind event to element rather than element node
	    SVG.on(this.node, event, f)
	    return this
	  }
	})

	// Initialize listeners stack
	SVG.listeners = []
	SVG.handlerMap = []
	SVG.listenerId = 0

	// Add event binder in the SVG namespace
	SVG.on = function(node, event, listener, binding, options) {
	  // create listener, get object-index
	  var l     = listener.bind(binding || node.instance || node)
	    , index = (SVG.handlerMap.indexOf(node) + 1 || SVG.handlerMap.push(node)) - 1
	    , ev    = event.split('.')[0]
	    , ns    = event.split('.')[1] || '*'


	  // ensure valid object
	  SVG.listeners[index]         = SVG.listeners[index]         || {}
	  SVG.listeners[index][ev]     = SVG.listeners[index][ev]     || {}
	  SVG.listeners[index][ev][ns] = SVG.listeners[index][ev][ns] || {}

	  if(!listener._svgjsListenerId)
	    listener._svgjsListenerId = ++SVG.listenerId

	  // reference listener
	  SVG.listeners[index][ev][ns][listener._svgjsListenerId] = l

	  // add listener
	  node.addEventListener(ev, l, options || false)
	}

	// Add event unbinder in the SVG namespace
	SVG.off = function(node, event, listener) {
	  var index = SVG.handlerMap.indexOf(node)
	    , ev    = event && event.split('.')[0]
	    , ns    = event && event.split('.')[1]
	    , namespace = ''

	  if(index == -1) return

	  if (listener) {
	    if(typeof listener == 'function') listener = listener._svgjsListenerId
	    if(!listener) return

	    // remove listener reference
	    if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns || '*']) {
	      // remove listener
	      node.removeEventListener(ev, SVG.listeners[index][ev][ns || '*'][listener], false)

	      delete SVG.listeners[index][ev][ns || '*'][listener]
	    }

	  } else if (ns && ev) {
	    // remove all listeners for a namespaced event
	    if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns]) {
	      for (listener in SVG.listeners[index][ev][ns])
	        SVG.off(node, [ev, ns].join('.'), listener)

	      delete SVG.listeners[index][ev][ns]
	    }

	  } else if (ns){
	    // remove all listeners for a specific namespace
	    for(event in SVG.listeners[index]){
	        for(namespace in SVG.listeners[index][event]){
	            if(ns === namespace){
	                SVG.off(node, [event, ns].join('.'))
	            }
	        }
	    }

	  } else if (ev) {
	    // remove all listeners for the event
	    if (SVG.listeners[index][ev]) {
	      for (namespace in SVG.listeners[index][ev])
	        SVG.off(node, [ev, namespace].join('.'))

	      delete SVG.listeners[index][ev]
	    }

	  } else {
	    // remove all listeners on a given node
	    for (event in SVG.listeners[index])
	      SVG.off(node, event)

	    delete SVG.listeners[index]
	    delete SVG.handlerMap[index]

	  }
	}

	//
	SVG.extend(SVG.Element, {
	  // Bind given event to listener
	  on: function(event, listener, binding, options) {
	    SVG.on(this.node, event, listener, binding, options)

	    return this
	  }
	  // Unbind event from listener
	, off: function(event, listener) {
	    SVG.off(this.node, event, listener)

	    return this
	  }
	  // Fire given event
	, fire: function(event, data) {

	    // Dispatch event
	    if(event instanceof window.Event){
	        this.node.dispatchEvent(event)
	    }else{
	        this.node.dispatchEvent(event = new window.CustomEvent(event, {detail:data, cancelable: true}))
	    }

	    this._event = event
	    return this
	  }
	, event: function() {
	    return this._event
	  }
	})


	SVG.Defs = SVG.invent({
	  // Initialize node
	  create: 'defs'

	  // Inherit from
	, inherit: SVG.Container

	})
	SVG.G = SVG.invent({
	  // Initialize node
	  create: 'g'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Move over x-axis
	    x: function(x) {
	      return x == null ? this.transform('x') : this.transform({ x: x - this.x() }, true)
	    }
	    // Move over y-axis
	  , y: function(y) {
	      return y == null ? this.transform('y') : this.transform({ y: y - this.y() }, true)
	    }
	    // Move by center over x-axis
	  , cx: function(x) {
	      return x == null ? this.gbox().cx : this.x(x - this.gbox().width / 2)
	    }
	    // Move by center over y-axis
	  , cy: function(y) {
	      return y == null ? this.gbox().cy : this.y(y - this.gbox().height / 2)
	    }
	  , gbox: function() {

	      var bbox  = this.bbox()
	        , trans = this.transform()

	      bbox.x  += trans.x
	      bbox.x2 += trans.x
	      bbox.cx += trans.x

	      bbox.y  += trans.y
	      bbox.y2 += trans.y
	      bbox.cy += trans.y

	      return bbox
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a group element
	    group: function() {
	      return this.put(new SVG.G)
	    }
	  }
	})

	// ### This module adds backward / forward functionality to elements.

	//
	SVG.extend(SVG.Element, {
	  // Get all siblings, including myself
	  siblings: function() {
	    return this.parent().children()
	  }
	  // Get the curent position siblings
	, position: function() {
	    return this.parent().index(this)
	  }
	  // Get the next element (will return null if there is none)
	, next: function() {
	    return this.siblings()[this.position() + 1]
	  }
	  // Get the next element (will return null if there is none)
	, previous: function() {
	    return this.siblings()[this.position() - 1]
	  }
	  // Send given element one step forward
	, forward: function() {
	    var i = this.position() + 1
	      , p = this.parent()

	    // move node one step forward
	    p.removeElement(this).add(this, i)

	    // make sure defs node is always at the top
	    if (p instanceof SVG.Doc)
	      p.node.appendChild(p.defs().node)

	    return this
	  }
	  // Send given element one step backward
	, backward: function() {
	    var i = this.position()

	    if (i > 0)
	      this.parent().removeElement(this).add(this, i - 1)

	    return this
	  }
	  // Send given element all the way to the front
	, front: function() {
	    var p = this.parent()

	    // Move node forward
	    p.node.appendChild(this.node)

	    // Make sure defs node is always at the top
	    if (p instanceof SVG.Doc)
	      p.node.appendChild(p.defs().node)

	    return this
	  }
	  // Send given element all the way to the back
	, back: function() {
	    if (this.position() > 0)
	      this.parent().removeElement(this).add(this, 0)

	    return this
	  }
	  // Inserts a given element before the targeted element
	, before: function(element) {
	    element.remove()

	    var i = this.position()

	    this.parent().add(element, i)

	    return this
	  }
	  // Insters a given element after the targeted element
	, after: function(element) {
	    element.remove()

	    var i = this.position()

	    this.parent().add(element, i + 1)

	    return this
	  }

	})
	SVG.Mask = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('mask'))

	    // keep references to masked elements
	    this.targets = []
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Unmask all masked elements and remove itself
	    remove: function() {
	      // unmask all targets
	      for (var i = this.targets.length - 1; i >= 0; i--)
	        if (this.targets[i])
	          this.targets[i].unmask()
	      this.targets = []

	      // remove mask from parent
	      this.parent().removeElement(this)

	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create masking element
	    mask: function() {
	      return this.defs().put(new SVG.Mask)
	    }
	  }
	})


	SVG.extend(SVG.Element, {
	  // Distribute mask to svg element
	  maskWith: function(element) {
	    // use given mask or create a new one
	    this.masker = element instanceof SVG.Mask ? element : this.parent().mask().add(element)

	    // store reverence on self in mask
	    this.masker.targets.push(this)

	    // apply mask
	    return this.attr('mask', 'url("#' + this.masker.attr('id') + '")')
	  }
	  // Unmask element
	, unmask: function() {
	    delete this.masker
	    return this.attr('mask', null)
	  }

	})

	SVG.ClipPath = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('clipPath'))

	    // keep references to clipped elements
	    this.targets = []
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Unclip all clipped elements and remove itself
	    remove: function() {
	      // unclip all targets
	      for (var i = this.targets.length - 1; i >= 0; i--)
	        if (this.targets[i])
	          this.targets[i].unclip()
	      this.targets = []

	      // remove clipPath from parent
	      this.parent().removeElement(this)

	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create clipping element
	    clip: function() {
	      return this.defs().put(new SVG.ClipPath)
	    }
	  }
	})

	//
	SVG.extend(SVG.Element, {
	  // Distribute clipPath to svg element
	  clipWith: function(element) {
	    // use given clip or create a new one
	    this.clipper = element instanceof SVG.ClipPath ? element : this.parent().clip().add(element)

	    // store reverence on self in mask
	    this.clipper.targets.push(this)

	    // apply mask
	    return this.attr('clip-path', 'url("#' + this.clipper.attr('id') + '")')
	  }
	  // Unclip element
	, unclip: function() {
	    delete this.clipper
	    return this.attr('clip-path', null)
	  }

	})
	SVG.Gradient = SVG.invent({
	  // Initialize node
	  create: function(type) {
	    this.constructor.call(this, SVG.create(type + 'Gradient'))

	    // store type
	    this.type = type
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Add a color stop
	    at: function(offset, color, opacity) {
	      return this.put(new SVG.Stop).update(offset, color, opacity)
	    }
	    // Update gradient
	  , update: function(block) {
	      // remove all stops
	      this.clear()

	      // invoke passed block
	      if (typeof block == 'function')
	        block.call(this, this)

	      return this
	    }
	    // Return the fill id
	  , fill: function() {
	      return 'url(#' + this.id() + ')'
	    }
	    // Alias string convertion to fill
	  , toString: function() {
	      return this.fill()
	    }
	    // custom attr to handle transform
	  , attr: function(a, b, c) {
	      if(a == 'transform') a = 'gradientTransform'
	      return SVG.Container.prototype.attr.call(this, a, b, c)
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create gradient element in defs
	    gradient: function(type, block) {
	      return this.defs().gradient(type, block)
	    }
	  }
	})

	// Add animatable methods to both gradient and fx module
	SVG.extend(SVG.Gradient, SVG.FX, {
	  // From position
	  from: function(x, y) {
	    return (this._target || this).type == 'radial' ?
	      this.attr({ fx: new SVG.Number(x), fy: new SVG.Number(y) }) :
	      this.attr({ x1: new SVG.Number(x), y1: new SVG.Number(y) })
	  }
	  // To position
	, to: function(x, y) {
	    return (this._target || this).type == 'radial' ?
	      this.attr({ cx: new SVG.Number(x), cy: new SVG.Number(y) }) :
	      this.attr({ x2: new SVG.Number(x), y2: new SVG.Number(y) })
	  }
	})

	// Base gradient generation
	SVG.extend(SVG.Defs, {
	  // define gradient
	  gradient: function(type, block) {
	    return this.put(new SVG.Gradient(type)).update(block)
	  }

	})

	SVG.Stop = SVG.invent({
	  // Initialize node
	  create: 'stop'

	  // Inherit from
	, inherit: SVG.Element

	  // Add class methods
	, extend: {
	    // add color stops
	    update: function(o) {
	      if (typeof o == 'number' || o instanceof SVG.Number) {
	        o = {
	          offset:  arguments[0]
	        , color:   arguments[1]
	        , opacity: arguments[2]
	        }
	      }

	      // set attributes
	      if (o.opacity != null) this.attr('stop-opacity', o.opacity)
	      if (o.color   != null) this.attr('stop-color', o.color)
	      if (o.offset  != null) this.attr('offset', new SVG.Number(o.offset))

	      return this
	    }
	  }

	})

	SVG.Pattern = SVG.invent({
	  // Initialize node
	  create: 'pattern'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Return the fill id
	    fill: function() {
	      return 'url(#' + this.id() + ')'
	    }
	    // Update pattern by rebuilding
	  , update: function(block) {
	      // remove content
	      this.clear()

	      // invoke passed block
	      if (typeof block == 'function')
	        block.call(this, this)

	      return this
	    }
	    // Alias string convertion to fill
	  , toString: function() {
	      return this.fill()
	    }
	    // custom attr to handle transform
	  , attr: function(a, b, c) {
	      if(a == 'transform') a = 'patternTransform'
	      return SVG.Container.prototype.attr.call(this, a, b, c)
	    }

	  }

	  // Add parent method
	, construct: {
	    // Create pattern element in defs
	    pattern: function(width, height, block) {
	      return this.defs().pattern(width, height, block)
	    }
	  }
	})

	SVG.extend(SVG.Defs, {
	  // Define gradient
	  pattern: function(width, height, block) {
	    return this.put(new SVG.Pattern).update(block).attr({
	      x:            0
	    , y:            0
	    , width:        width
	    , height:       height
	    , patternUnits: 'userSpaceOnUse'
	    })
	  }

	})
	SVG.Doc = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    if (element) {
	      // ensure the presence of a dom element
	      element = typeof element == 'string' ?
	        document.getElementById(element) :
	        element

	      // If the target is an svg element, use that element as the main wrapper.
	      // This allows svg.js to work with svg documents as well.
	      if (element.nodeName == 'svg') {
	        this.constructor.call(this, element)
	      } else {
	        this.constructor.call(this, SVG.create('svg'))
	        element.appendChild(this.node)
	        this.size('100%', '100%')
	      }

	      // set svg element attributes and ensure defs node
	      this.namespace().defs()
	    }
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Add namespaces
	    namespace: function() {
	      return this
	        .attr({ xmlns: SVG.ns, version: '1.1' })
	        .attr('xmlns:xlink', SVG.xlink, SVG.xmlns)
	        .attr('xmlns:svgjs', SVG.svgjs, SVG.xmlns)
	    }
	    // Creates and returns defs element
	  , defs: function() {
	      if (!this._defs) {
	        var defs

	        // Find or create a defs element in this instance
	        if (defs = this.node.getElementsByTagName('defs')[0])
	          this._defs = SVG.adopt(defs)
	        else
	          this._defs = new SVG.Defs

	        // Make sure the defs node is at the end of the stack
	        this.node.appendChild(this._defs.node)
	      }

	      return this._defs
	    }
	    // custom parent method
	  , parent: function() {
	      return this.node.parentNode.nodeName == '#document' ? null : this.node.parentNode
	    }
	    // Fix for possible sub-pixel offset. See:
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=608812
	  , spof: function() {
	      var pos = this.node.getScreenCTM()

	      if (pos)
	        this
	          .style('left', (-pos.e % 1) + 'px')
	          .style('top',  (-pos.f % 1) + 'px')

	      return this
	    }

	      // Removes the doc from the DOM
	  , remove: function() {
	      if(this.parent()) {
	        this.parent().removeChild(this.node)
	      }

	      return this
	    }
	  , clear: function() {
	      // remove children
	      while(this.node.hasChildNodes())
	        this.node.removeChild(this.node.lastChild)

	      // remove defs reference
	      delete this._defs

	      // add back parser
	      if(!SVG.parser.draw.parentNode)
	        this.node.appendChild(SVG.parser.draw)

	      return this
	    }
	  }

	})

	SVG.Shape = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    this.constructor.call(this, element)
	  }

	  // Inherit from
	, inherit: SVG.Element

	})

	SVG.Bare = SVG.invent({
	  // Initialize
	  create: function(element, inherit) {
	    // construct element
	    this.constructor.call(this, SVG.create(element))

	    // inherit custom methods
	    if (inherit)
	      for (var method in inherit.prototype)
	        if (typeof inherit.prototype[method] === 'function')
	          this[method] = inherit.prototype[method]
	  }

	  // Inherit from
	, inherit: SVG.Element

	  // Add methods
	, extend: {
	    // Insert some plain text
	    words: function(text) {
	      // remove contents
	      while (this.node.hasChildNodes())
	        this.node.removeChild(this.node.lastChild)

	      // create text node
	      this.node.appendChild(document.createTextNode(text))

	      return this
	    }
	  }
	})


	SVG.extend(SVG.Parent, {
	  // Create an element that is not described by SVG.js
	  element: function(element, inherit) {
	    return this.put(new SVG.Bare(element, inherit))
	  }
	})

	SVG.Symbol = SVG.invent({
	  // Initialize node
	  create: 'symbol'

	  // Inherit from
	, inherit: SVG.Container

	, construct: {
	    // create symbol
	    symbol: function() {
	      return this.put(new SVG.Symbol)
	    }
	  }
	})

	SVG.Use = SVG.invent({
	  // Initialize node
	  create: 'use'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Use element as a reference
	    element: function(element, file) {
	      // Set lined element
	      return this.attr('href', (file || '') + '#' + element, SVG.xlink)
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a use element
	    use: function(element, file) {
	      return this.put(new SVG.Use).element(element, file)
	    }
	  }
	})
	SVG.Rect = SVG.invent({
	  // Initialize node
	  create: 'rect'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create a rect element
	    rect: function(width, height) {
	      return this.put(new SVG.Rect()).size(width, height)
	    }
	  }
	})
	SVG.Circle = SVG.invent({
	  // Initialize node
	  create: 'circle'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create circle element, based on ellipse
	    circle: function(size) {
	      return this.put(new SVG.Circle).rx(new SVG.Number(size).divide(2)).move(0, 0)
	    }
	  }
	})

	SVG.extend(SVG.Circle, SVG.FX, {
	  // Radius x value
	  rx: function(rx) {
	    return this.attr('r', rx)
	  }
	  // Alias radius x value
	, ry: function(ry) {
	    return this.rx(ry)
	  }
	})

	SVG.Ellipse = SVG.invent({
	  // Initialize node
	  create: 'ellipse'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create an ellipse
	    ellipse: function(width, height) {
	      return this.put(new SVG.Ellipse).size(width, height).move(0, 0)
	    }
	  }
	})

	SVG.extend(SVG.Ellipse, SVG.Rect, SVG.FX, {
	  // Radius x value
	  rx: function(rx) {
	    return this.attr('rx', rx)
	  }
	  // Radius y value
	, ry: function(ry) {
	    return this.attr('ry', ry)
	  }
	})

	// Add common method
	SVG.extend(SVG.Circle, SVG.Ellipse, {
	    // Move over x-axis
	    x: function(x) {
	      return x == null ? this.cx() - this.rx() : this.cx(x + this.rx())
	    }
	    // Move over y-axis
	  , y: function(y) {
	      return y == null ? this.cy() - this.ry() : this.cy(y + this.ry())
	    }
	    // Move by center over x-axis
	  , cx: function(x) {
	      return x == null ? this.attr('cx') : this.attr('cx', x)
	    }
	    // Move by center over y-axis
	  , cy: function(y) {
	      return y == null ? this.attr('cy') : this.attr('cy', y)
	    }
	    // Set width of element
	  , width: function(width) {
	      return width == null ? this.rx() * 2 : this.rx(new SVG.Number(width).divide(2))
	    }
	    // Set height of element
	  , height: function(height) {
	      return height == null ? this.ry() * 2 : this.ry(new SVG.Number(height).divide(2))
	    }
	    // Custom size function
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this
	        .rx(new SVG.Number(p.width).divide(2))
	        .ry(new SVG.Number(p.height).divide(2))
	    }
	})
	SVG.Line = SVG.invent({
	  // Initialize node
	  create: 'line'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Get array
	    array: function() {
	      return new SVG.PointArray([
	        [ this.attr('x1'), this.attr('y1') ]
	      , [ this.attr('x2'), this.attr('y2') ]
	      ])
	    }
	    // Overwrite native plot() method
	  , plot: function(x1, y1, x2, y2) {
	      if (x1 == null)
	        return this.array()
	      else if (typeof y1 !== 'undefined')
	        x1 = { x1: x1, y1: y1, x2: x2, y2: y2 }
	      else
	        x1 = new SVG.PointArray(x1).toLine()

	      return this.attr(x1)
	    }
	    // Move by left top corner
	  , move: function(x, y) {
	      return this.attr(this.array().move(x, y).toLine())
	    }
	    // Set element size to given width and height
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this.attr(this.array().size(p.width, p.height).toLine())
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a line element
	    line: function(x1, y1, x2, y2) {
	      // make sure plot is called as a setter
	      // x1 is not necessarily a number, it can also be an array, a string and a SVG.PointArray
	      return SVG.Line.prototype.plot.apply(
	        this.put(new SVG.Line)
	      , x1 != null ? [x1, y1, x2, y2] : [0, 0, 0, 0]
	      )
	    }
	  }
	})

	SVG.Polyline = SVG.invent({
	  // Initialize node
	  create: 'polyline'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create a wrapped polyline element
	    polyline: function(p) {
	      // make sure plot is called as a setter
	      return this.put(new SVG.Polyline).plot(p || new SVG.PointArray)
	    }
	  }
	})

	SVG.Polygon = SVG.invent({
	  // Initialize node
	  create: 'polygon'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create a wrapped polygon element
	    polygon: function(p) {
	      // make sure plot is called as a setter
	      return this.put(new SVG.Polygon).plot(p || new SVG.PointArray)
	    }
	  }
	})

	// Add polygon-specific functions
	SVG.extend(SVG.Polyline, SVG.Polygon, {
	  // Get array
	  array: function() {
	    return this._array || (this._array = new SVG.PointArray(this.attr('points')))
	  }
	  // Plot new path
	, plot: function(p) {
	    return (p == null) ?
	      this.array() :
	      this.clear().attr('points', typeof p == 'string' ? p : (this._array = new SVG.PointArray(p)))
	  }
	  // Clear array cache
	, clear: function() {
	    delete this._array
	    return this
	  }
	  // Move by left top corner
	, move: function(x, y) {
	    return this.attr('points', this.array().move(x, y))
	  }
	  // Set element size to given width and height
	, size: function(width, height) {
	    var p = proportionalSize(this, width, height)

	    return this.attr('points', this.array().size(p.width, p.height))
	  }

	})

	// unify all point to point elements
	SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, {
	  // Define morphable array
	  morphArray:  SVG.PointArray
	  // Move by left top corner over x-axis
	, x: function(x) {
	    return x == null ? this.bbox().x : this.move(x, this.bbox().y)
	  }
	  // Move by left top corner over y-axis
	, y: function(y) {
	    return y == null ? this.bbox().y : this.move(this.bbox().x, y)
	  }
	  // Set width of element
	, width: function(width) {
	    var b = this.bbox()

	    return width == null ? b.width : this.size(width, b.height)
	  }
	  // Set height of element
	, height: function(height) {
	    var b = this.bbox()

	    return height == null ? b.height : this.size(b.width, height)
	  }
	})
	SVG.Path = SVG.invent({
	  // Initialize node
	  create: 'path'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Define morphable array
	    morphArray:  SVG.PathArray
	    // Get array
	  , array: function() {
	      return this._array || (this._array = new SVG.PathArray(this.attr('d')))
	    }
	    // Plot new path
	  , plot: function(d) {
	      return (d == null) ?
	        this.array() :
	        this.clear().attr('d', typeof d == 'string' ? d : (this._array = new SVG.PathArray(d)))
	    }
	    // Clear array cache
	  , clear: function() {
	      delete this._array
	      return this
	    }
	    // Move by left top corner
	  , move: function(x, y) {
	      return this.attr('d', this.array().move(x, y))
	    }
	    // Move by left top corner over x-axis
	  , x: function(x) {
	      return x == null ? this.bbox().x : this.move(x, this.bbox().y)
	    }
	    // Move by left top corner over y-axis
	  , y: function(y) {
	      return y == null ? this.bbox().y : this.move(this.bbox().x, y)
	    }
	    // Set element size to given width and height
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this.attr('d', this.array().size(p.width, p.height))
	    }
	    // Set width of element
	  , width: function(width) {
	      return width == null ? this.bbox().width : this.size(width, this.bbox().height)
	    }
	    // Set height of element
	  , height: function(height) {
	      return height == null ? this.bbox().height : this.size(this.bbox().width, height)
	    }

	  }

	  // Add parent method
	, construct: {
	    // Create a wrapped path element
	    path: function(d) {
	      // make sure plot is called as a setter
	      return this.put(new SVG.Path).plot(d || new SVG.PathArray)
	    }
	  }
	})

	SVG.Image = SVG.invent({
	  // Initialize node
	  create: 'image'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // (re)load image
	    load: function(url) {
	      if (!url) return this

	      var self = this
	        , img  = new window.Image()

	      // preload image
	      SVG.on(img, 'load', function() {
	        var p = self.parent(SVG.Pattern)

	        if(p === null) return

	        // ensure image size
	        if (self.width() == 0 && self.height() == 0)
	          self.size(img.width, img.height)

	        // ensure pattern size if not set
	        if (p && p.width() == 0 && p.height() == 0)
	          p.size(self.width(), self.height())

	        // callback
	        if (typeof self._loaded === 'function')
	          self._loaded.call(self, {
	            width:  img.width
	          , height: img.height
	          , ratio:  img.width / img.height
	          , url:    url
	          })
	      })

	      SVG.on(img, 'error', function(e){
	        if (typeof self._error === 'function'){
	            self._error.call(self, e)
	        }
	      })

	      return this.attr('href', (img.src = this.src = url), SVG.xlink)
	    }
	    // Add loaded callback
	  , loaded: function(loaded) {
	      this._loaded = loaded
	      return this
	    }

	  , error: function(error) {
	      this._error = error
	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // create image element, load image and set its size
	    image: function(source, width, height) {
	      return this.put(new SVG.Image).load(source).size(width || 0, height || width || 0)
	    }
	  }

	})
	SVG.Text = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('text'))

	    this.dom.leading = new SVG.Number(1.3)    // store leading value for rebuilding
	    this._rebuild = true                      // enable automatic updating of dy values
	    this._build   = false                     // disable build mode for adding multiple lines

	    // set default font
	    this.attr('font-family', SVG.defaults.attrs['font-family'])
	  }

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Move over x-axis
	    x: function(x) {
	      // act as getter
	      if (x == null)
	        return this.attr('x')

	      return this.attr('x', x)
	    }
	    // Move over y-axis
	  , y: function(y) {
	      var oy = this.attr('y')
	        , o  = typeof oy === 'number' ? oy - this.bbox().y : 0

	      // act as getter
	      if (y == null)
	        return typeof oy === 'number' ? oy - o : oy

	      return this.attr('y', typeof y === 'number' ? y + o : y)
	    }
	    // Move center over x-axis
	  , cx: function(x) {
	      return x == null ? this.bbox().cx : this.x(x - this.bbox().width / 2)
	    }
	    // Move center over y-axis
	  , cy: function(y) {
	      return y == null ? this.bbox().cy : this.y(y - this.bbox().height / 2)
	    }
	    // Set the text content
	  , text: function(text) {
	      // act as getter
	      if (typeof text === 'undefined'){
	        var text = ''
	        var children = this.node.childNodes
	        for(var i = 0, len = children.length; i < len; ++i){

	          // add newline if its not the first child and newLined is set to true
	          if(i != 0 && children[i].nodeType != 3 && SVG.adopt(children[i]).dom.newLined == true){
	            text += '\n'
	          }

	          // add content of this node
	          text += children[i].textContent
	        }

	        return text
	      }

	      // remove existing content
	      this.clear().build(true)

	      if (typeof text === 'function') {
	        // call block
	        text.call(this, this)

	      } else {
	        // store text and make sure text is not blank
	        text = text.split('\n')

	        // build new lines
	        for (var i = 0, il = text.length; i < il; i++)
	          this.tspan(text[i]).newLine()
	      }

	      // disable build mode and rebuild lines
	      return this.build(false).rebuild()
	    }
	    // Set font size
	  , size: function(size) {
	      return this.attr('font-size', size).rebuild()
	    }
	    // Set / get leading
	  , leading: function(value) {
	      // act as getter
	      if (value == null)
	        return this.dom.leading

	      // act as setter
	      this.dom.leading = new SVG.Number(value)

	      return this.rebuild()
	    }
	    // Get all the first level lines
	  , lines: function() {
	      var node = (this.textPath && this.textPath() || this).node

	      // filter tspans and map them to SVG.js instances
	      var lines = SVG.utils.map(SVG.utils.filterSVGElements(node.childNodes), function(el){
	        return SVG.adopt(el)
	      })

	      // return an instance of SVG.set
	      return new SVG.Set(lines)
	    }
	    // Rebuild appearance type
	  , rebuild: function(rebuild) {
	      // store new rebuild flag if given
	      if (typeof rebuild == 'boolean')
	        this._rebuild = rebuild

	      // define position of all lines
	      if (this._rebuild) {
	        var self = this
	          , blankLineOffset = 0
	          , dy = this.dom.leading * new SVG.Number(this.attr('font-size'))

	        this.lines().each(function() {
	          if (this.dom.newLined) {
	            if (!self.textPath())
	              this.attr('x', self.attr('x'))
	            if(this.text() == '\n') {
	              blankLineOffset += dy
	            }else{
	              this.attr('dy', dy + blankLineOffset)
	              blankLineOffset = 0
	            }
	          }
	        })

	        this.fire('rebuild')
	      }

	      return this
	    }
	    // Enable / disable build mode
	  , build: function(build) {
	      this._build = !!build
	      return this
	    }
	    // overwrite method from parent to set data properly
	  , setData: function(o){
	      this.dom = o
	      this.dom.leading = new SVG.Number(o.leading || 1.3)
	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create text element
	    text: function(text) {
	      return this.put(new SVG.Text).text(text)
	    }
	    // Create plain text element
	  , plain: function(text) {
	      return this.put(new SVG.Text).plain(text)
	    }
	  }

	})

	SVG.Tspan = SVG.invent({
	  // Initialize node
	  create: 'tspan'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Set text content
	    text: function(text) {
	      if(text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '')

	      typeof text === 'function' ? text.call(this, this) : this.plain(text)

	      return this
	    }
	    // Shortcut dx
	  , dx: function(dx) {
	      return this.attr('dx', dx)
	    }
	    // Shortcut dy
	  , dy: function(dy) {
	      return this.attr('dy', dy)
	    }
	    // Create new line
	  , newLine: function() {
	      // fetch text parent
	      var t = this.parent(SVG.Text)

	      // mark new line
	      this.dom.newLined = true

	      // apply new hy¡n
	      return this.dy(t.dom.leading * t.attr('font-size')).attr('x', t.x())
	    }
	  }

	})

	SVG.extend(SVG.Text, SVG.Tspan, {
	  // Create plain text node
	  plain: function(text) {
	    // clear if build mode is disabled
	    if (this._build === false)
	      this.clear()

	    // create text node
	    this.node.appendChild(document.createTextNode(text))

	    return this
	  }
	  // Create a tspan
	, tspan: function(text) {
	    var node  = (this.textPath && this.textPath() || this).node
	      , tspan = new SVG.Tspan

	    // clear if build mode is disabled
	    if (this._build === false)
	      this.clear()

	    // add new tspan
	    node.appendChild(tspan.node)

	    return tspan.text(text)
	  }
	  // Clear all lines
	, clear: function() {
	    var node = (this.textPath && this.textPath() || this).node

	    // remove existing child nodes
	    while (node.hasChildNodes())
	      node.removeChild(node.lastChild)

	    return this
	  }
	  // Get length of text element
	, length: function() {
	    return this.node.getComputedTextLength()
	  }
	})

	SVG.TextPath = SVG.invent({
	  // Initialize node
	  create: 'textPath'

	  // Inherit from
	, inherit: SVG.Parent

	  // Define parent class
	, parent: SVG.Text

	  // Add parent method
	, construct: {
	    morphArray: SVG.PathArray
	    // Create path for text to run on
	  , path: function(d) {
	      // create textPath element
	      var path  = new SVG.TextPath
	        , track = this.doc().defs().path(d)

	      // move lines to textpath
	      while (this.node.hasChildNodes())
	        path.node.appendChild(this.node.firstChild)

	      // add textPath element as child node
	      this.node.appendChild(path.node)

	      // link textPath to path and add content
	      path.attr('href', '#' + track, SVG.xlink)

	      return this
	    }
	    // return the array of the path track element
	  , array: function() {
	      var track = this.track()

	      return track ? track.array() : null
	    }
	    // Plot path if any
	  , plot: function(d) {
	      var track = this.track()
	        , pathArray = null

	      if (track) {
	        pathArray = track.plot(d)
	      }

	      return (d == null) ? pathArray : this
	    }
	    // Get the path track element
	  , track: function() {
	      var path = this.textPath()

	      if (path)
	        return path.reference('href')
	    }
	    // Get the textPath child
	  , textPath: function() {
	      if (this.node.firstChild && this.node.firstChild.nodeName == 'textPath')
	        return SVG.adopt(this.node.firstChild)
	    }
	  }
	})

	SVG.Nested = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('svg'))

	    this.style('overflow', 'visible')
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add parent method
	, construct: {
	    // Create nested svg document
	    nested: function() {
	      return this.put(new SVG.Nested)
	    }
	  }
	})
	SVG.A = SVG.invent({
	  // Initialize node
	  create: 'a'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Link url
	    to: function(url) {
	      return this.attr('href', url, SVG.xlink)
	    }
	    // Link show attribute
	  , show: function(target) {
	      return this.attr('show', target, SVG.xlink)
	    }
	    // Link target attribute
	  , target: function(target) {
	      return this.attr('target', target)
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a hyperlink element
	    link: function(url) {
	      return this.put(new SVG.A).to(url)
	    }
	  }
	})

	SVG.extend(SVG.Element, {
	  // Create a hyperlink element
	  linkTo: function(url) {
	    var link = new SVG.A

	    if (typeof url == 'function')
	      url.call(link, link)
	    else
	      link.to(url)

	    return this.parent().put(link).put(this)
	  }

	})
	SVG.Marker = SVG.invent({
	  // Initialize node
	  create: 'marker'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Set width of element
	    width: function(width) {
	      return this.attr('markerWidth', width)
	    }
	    // Set height of element
	  , height: function(height) {
	      return this.attr('markerHeight', height)
	    }
	    // Set marker refX and refY
	  , ref: function(x, y) {
	      return this.attr('refX', x).attr('refY', y)
	    }
	    // Update marker
	  , update: function(block) {
	      // remove all content
	      this.clear()

	      // invoke passed block
	      if (typeof block == 'function')
	        block.call(this, this)

	      return this
	    }
	    // Return the fill id
	  , toString: function() {
	      return 'url(#' + this.id() + ')'
	    }
	  }

	  // Add parent method
	, construct: {
	    marker: function(width, height, block) {
	      // Create marker element in defs
	      return this.defs().marker(width, height, block)
	    }
	  }

	})

	SVG.extend(SVG.Defs, {
	  // Create marker
	  marker: function(width, height, block) {
	    // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
	    return this.put(new SVG.Marker)
	      .size(width, height)
	      .ref(width / 2, height / 2)
	      .viewbox(0, 0, width, height)
	      .attr('orient', 'auto')
	      .update(block)
	  }

	})

	SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, SVG.Path, {
	  // Create and attach markers
	  marker: function(marker, width, height, block) {
	    var attr = ['marker']

	    // Build attribute name
	    if (marker != 'all') attr.push(marker)
	    attr = attr.join('-')

	    // Set marker attribute
	    marker = arguments[1] instanceof SVG.Marker ?
	      arguments[1] :
	      this.doc().marker(width, height, block)

	    return this.attr(attr, marker)
	  }

	})
	// Define list of available attributes for stroke and fill
	var sugar = {
	  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset']
	, fill:   ['color', 'opacity', 'rule']
	, prefix: function(t, a) {
	    return a == 'color' ? t : t + '-' + a
	  }
	}

	// Add sugar for fill and stroke
	;['fill', 'stroke'].forEach(function(m) {
	  var i, extension = {}

	  extension[m] = function(o) {
	    if (typeof o == 'undefined')
	      return this
	    if (typeof o == 'string' || SVG.Color.isRgb(o) || (o && typeof o.fill === 'function'))
	      this.attr(m, o)

	    else
	      // set all attributes from sugar.fill and sugar.stroke list
	      for (i = sugar[m].length - 1; i >= 0; i--)
	        if (o[sugar[m][i]] != null)
	          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]])

	    return this
	  }

	  SVG.extend(SVG.Element, SVG.FX, extension)

	})

	SVG.extend(SVG.Element, SVG.FX, {
	  // Map rotation to transform
	  rotate: function(d, cx, cy) {
	    return this.transform({ rotation: d, cx: cx, cy: cy })
	  }
	  // Map skew to transform
	, skew: function(x, y, cx, cy) {
	    return arguments.length == 1  || arguments.length == 3 ?
	      this.transform({ skew: x, cx: y, cy: cx }) :
	      this.transform({ skewX: x, skewY: y, cx: cx, cy: cy })
	  }
	  // Map scale to transform
	, scale: function(x, y, cx, cy) {
	    return arguments.length == 1  || arguments.length == 3 ?
	      this.transform({ scale: x, cx: y, cy: cx }) :
	      this.transform({ scaleX: x, scaleY: y, cx: cx, cy: cy })
	  }
	  // Map translate to transform
	, translate: function(x, y) {
	    return this.transform({ x: x, y: y })
	  }
	  // Map flip to transform
	, flip: function(a, o) {
	    o = typeof a == 'number' ? a : o
	    return this.transform({ flip: a || 'both', offset: o })
	  }
	  // Map matrix to transform
	, matrix: function(m) {
	    return this.attr('transform', new SVG.Matrix(arguments.length == 6 ? [].slice.call(arguments) : m))
	  }
	  // Opacity
	, opacity: function(value) {
	    return this.attr('opacity', value)
	  }
	  // Relative move over x axis
	, dx: function(x) {
	    return this.x(new SVG.Number(x).plus(this instanceof SVG.FX ? 0 : this.x()), true)
	  }
	  // Relative move over y axis
	, dy: function(y) {
	    return this.y(new SVG.Number(y).plus(this instanceof SVG.FX ? 0 : this.y()), true)
	  }
	  // Relative move over x and y axes
	, dmove: function(x, y) {
	    return this.dx(x).dy(y)
	  }
	})

	SVG.extend(SVG.Rect, SVG.Ellipse, SVG.Circle, SVG.Gradient, SVG.FX, {
	  // Add x and y radius
	  radius: function(x, y) {
	    var type = (this._target || this).type;
	    return type == 'radial' || type == 'circle' ?
	      this.attr('r', new SVG.Number(x)) :
	      this.rx(x).ry(y == null ? x : y)
	  }
	})

	SVG.extend(SVG.Path, {
	  // Get path length
	  length: function() {
	    return this.node.getTotalLength()
	  }
	  // Get point at length
	, pointAt: function(length) {
	    return this.node.getPointAtLength(length)
	  }
	})

	SVG.extend(SVG.Parent, SVG.Text, SVG.Tspan, SVG.FX, {
	  // Set font
	  font: function(a, v) {
	    if (typeof a == 'object') {
	      for (v in a) this.font(v, a[v])
	    }

	    return a == 'leading' ?
	        this.leading(v) :
	      a == 'anchor' ?
	        this.attr('text-anchor', v) :
	      a == 'size' || a == 'family' || a == 'weight' || a == 'stretch' || a == 'variant' || a == 'style' ?
	        this.attr('font-'+ a, v) :
	        this.attr(a, v)
	  }
	})

	SVG.Set = SVG.invent({
	  // Initialize
	  create: function(members) {
	    // Set initial state
	    Array.isArray(members) ? this.members = members : this.clear()
	  }

	  // Add class methods
	, extend: {
	    // Add element to set
	    add: function() {
	      var i, il, elements = [].slice.call(arguments)

	      for (i = 0, il = elements.length; i < il; i++)
	        this.members.push(elements[i])

	      return this
	    }
	    // Remove element from set
	  , remove: function(element) {
	      var i = this.index(element)

	      // remove given child
	      if (i > -1)
	        this.members.splice(i, 1)

	      return this
	    }
	    // Iterate over all members
	  , each: function(block) {
	      for (var i = 0, il = this.members.length; i < il; i++)
	        block.apply(this.members[i], [i, this.members])

	      return this
	    }
	    // Restore to defaults
	  , clear: function() {
	      // initialize store
	      this.members = []

	      return this
	    }
	    // Get the length of a set
	  , length: function() {
	      return this.members.length
	    }
	    // Checks if a given element is present in set
	  , has: function(element) {
	      return this.index(element) >= 0
	    }
	    // retuns index of given element in set
	  , index: function(element) {
	      return this.members.indexOf(element)
	    }
	    // Get member at given index
	  , get: function(i) {
	      return this.members[i]
	    }
	    // Get first member
	  , first: function() {
	      return this.get(0)
	    }
	    // Get last member
	  , last: function() {
	      return this.get(this.members.length - 1)
	    }
	    // Default value
	  , valueOf: function() {
	      return this.members
	    }
	    // Get the bounding box of all members included or empty box if set has no items
	  , bbox: function(){
	      // return an empty box of there are no members
	      if (this.members.length == 0)
	        return new SVG.RBox()

	      // get the first rbox and update the target bbox
	      var rbox = this.members[0].rbox(this.members[0].doc())

	      this.each(function() {
	        // user rbox for correct position and visual representation
	        rbox = rbox.merge(this.rbox(this.doc()))
	      })

	      return rbox
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a new set
	    set: function(members) {
	      return new SVG.Set(members)
	    }
	  }
	})

	SVG.FX.Set = SVG.invent({
	  // Initialize node
	  create: function(set) {
	    // store reference to set
	    this.set = set
	  }

	})

	// Alias methods
	SVG.Set.inherit = function() {
	  var m
	    , methods = []

	  // gather shape methods
	  for(var m in SVG.Shape.prototype)
	    if (typeof SVG.Shape.prototype[m] == 'function' && typeof SVG.Set.prototype[m] != 'function')
	      methods.push(m)

	  // apply shape aliasses
	  methods.forEach(function(method) {
	    SVG.Set.prototype[method] = function() {
	      for (var i = 0, il = this.members.length; i < il; i++)
	        if (this.members[i] && typeof this.members[i][method] == 'function')
	          this.members[i][method].apply(this.members[i], arguments)

	      return method == 'animate' ? (this.fx || (this.fx = new SVG.FX.Set(this))) : this
	    }
	  })

	  // clear methods for the next round
	  methods = []

	  // gather fx methods
	  for(var m in SVG.FX.prototype)
	    if (typeof SVG.FX.prototype[m] == 'function' && typeof SVG.FX.Set.prototype[m] != 'function')
	      methods.push(m)

	  // apply fx aliasses
	  methods.forEach(function(method) {
	    SVG.FX.Set.prototype[method] = function() {
	      for (var i = 0, il = this.set.members.length; i < il; i++)
	        this.set.members[i].fx[method].apply(this.set.members[i].fx, arguments)

	      return this
	    }
	  })
	}




	SVG.extend(SVG.Element, {
	  // Store data values on svg nodes
	  data: function(a, v, r) {
	    if (typeof a == 'object') {
	      for (v in a)
	        this.data(v, a[v])

	    } else if (arguments.length < 2) {
	      try {
	        return JSON.parse(this.attr('data-' + a))
	      } catch(e) {
	        return this.attr('data-' + a)
	      }

	    } else {
	      this.attr(
	        'data-' + a
	      , v === null ?
	          null :
	        r === true || typeof v === 'string' || typeof v === 'number' ?
	          v :
	          JSON.stringify(v)
	      )
	    }

	    return this
	  }
	})
	SVG.extend(SVG.Element, {
	  // Remember arbitrary data
	  remember: function(k, v) {
	    // remember every item in an object individually
	    if (typeof arguments[0] == 'object')
	      for (var v in k)
	        this.remember(v, k[v])

	    // retrieve memory
	    else if (arguments.length == 1)
	      return this.memory()[k]

	    // store memory
	    else
	      this.memory()[k] = v

	    return this
	  }

	  // Erase a given memory
	, forget: function() {
	    if (arguments.length == 0)
	      this._memory = {}
	    else
	      for (var i = arguments.length - 1; i >= 0; i--)
	        delete this.memory()[arguments[i]]

	    return this
	  }

	  // Initialize or return local memory object
	, memory: function() {
	    return this._memory || (this._memory = {})
	  }

	})
	// Method for getting an element by id
	SVG.get = function(id) {
	  var node = document.getElementById(idFromReference(id) || id)
	  return SVG.adopt(node)
	}

	// Select elements by query string
	SVG.select = function(query, parent) {
	  return new SVG.Set(
	    SVG.utils.map((parent || document).querySelectorAll(query), function(node) {
	      return SVG.adopt(node)
	    })
	  )
	}

	SVG.extend(SVG.Parent, {
	  // Scoped select method
	  select: function(query) {
	    return SVG.select(query, this.node)
	  }

	})
	function pathRegReplace(a, b, c, d) {
	  return c + d.replace(SVG.regex.dots, ' .')
	}

	// creates deep clone of array
	function array_clone(arr){
	  var clone = arr.slice(0)
	  for(var i = clone.length; i--;){
	    if(Array.isArray(clone[i])){
	      clone[i] = array_clone(clone[i])
	    }
	  }
	  return clone
	}

	// tests if a given element is instance of an object
	function is(el, obj){
	  return el instanceof obj
	}

	// tests if a given selector matches an element
	function matches(el, selector) {
	  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	}

	// Convert dash-separated-string to camelCase
	function camelCase(s) {
	  return s.toLowerCase().replace(/-(.)/g, function(m, g) {
	    return g.toUpperCase()
	  })
	}

	// Capitalize first letter of a string
	function capitalize(s) {
	  return s.charAt(0).toUpperCase() + s.slice(1)
	}

	// Ensure to six-based hex
	function fullHex(hex) {
	  return hex.length == 4 ?
	    [ '#',
	      hex.substring(1, 2), hex.substring(1, 2)
	    , hex.substring(2, 3), hex.substring(2, 3)
	    , hex.substring(3, 4), hex.substring(3, 4)
	    ].join('') : hex
	}

	// Component to hex value
	function compToHex(comp) {
	  var hex = comp.toString(16)
	  return hex.length == 1 ? '0' + hex : hex
	}

	// Calculate proportional width and height values when necessary
	function proportionalSize(element, width, height) {
	  if (width == null || height == null) {
	    var box = element.bbox()

	    if (width == null)
	      width = box.width / box.height * height
	    else if (height == null)
	      height = box.height / box.width * width
	  }

	  return {
	    width:  width
	  , height: height
	  }
	}

	// Delta transform point
	function deltaTransformPoint(matrix, x, y) {
	  return {
	    x: x * matrix.a + y * matrix.c + 0
	  , y: x * matrix.b + y * matrix.d + 0
	  }
	}

	// Map matrix array to object
	function arrayToMatrix(a) {
	  return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
	}

	// Parse matrix if required
	function parseMatrix(matrix) {
	  if (!(matrix instanceof SVG.Matrix))
	    matrix = new SVG.Matrix(matrix)

	  return matrix
	}

	// Add centre point to transform object
	function ensureCentre(o, target) {
	  o.cx = o.cx == null ? target.bbox().cx : o.cx
	  o.cy = o.cy == null ? target.bbox().cy : o.cy
	}

	// PathArray Helpers
	function arrayToString(a) {
	  for (var i = 0, il = a.length, s = ''; i < il; i++) {
	    s += a[i][0]

	    if (a[i][1] != null) {
	      s += a[i][1]

	      if (a[i][2] != null) {
	        s += ' '
	        s += a[i][2]

	        if (a[i][3] != null) {
	          s += ' '
	          s += a[i][3]
	          s += ' '
	          s += a[i][4]

	          if (a[i][5] != null) {
	            s += ' '
	            s += a[i][5]
	            s += ' '
	            s += a[i][6]

	            if (a[i][7] != null) {
	              s += ' '
	              s += a[i][7]
	            }
	          }
	        }
	      }
	    }
	  }

	  return s + ' '
	}

	// Deep new id assignment
	function assignNewId(node) {
	  // do the same for SVG child nodes as well
	  for (var i = node.childNodes.length - 1; i >= 0; i--)
	    if (node.childNodes[i] instanceof window.SVGElement)
	      assignNewId(node.childNodes[i])

	  return SVG.adopt(node).id(SVG.eid(node.nodeName))
	}

	// Add more bounding box properties
	function fullBox(b) {
	  if (b.x == null) {
	    b.x      = 0
	    b.y      = 0
	    b.width  = 0
	    b.height = 0
	  }

	  b.w  = b.width
	  b.h  = b.height
	  b.x2 = b.x + b.width
	  b.y2 = b.y + b.height
	  b.cx = b.x + b.width / 2
	  b.cy = b.y + b.height / 2

	  return b
	}

	// Get id from reference string
	function idFromReference(url) {
	  var m = url.toString().match(SVG.regex.reference)

	  if (m) return m[1]
	}

	// Create matrix array for looping
	var abcdef = 'abcdef'.split('')
	// Add CustomEvent to IE9 and IE10
	if (typeof window.CustomEvent !== 'function') {
	  // Code from: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
	  var CustomEvent = function(event, options) {
	    options = options || { bubbles: false, cancelable: false, detail: undefined }
	    var e = document.createEvent('CustomEvent')
	    e.initCustomEvent(event, options.bubbles, options.cancelable, options.detail)
	    return e
	  }

	  CustomEvent.prototype = window.Event.prototype

	  window.CustomEvent = CustomEvent
	}

	// requestAnimationFrame / cancelAnimationFrame Polyfill with fallback based on Paul Irish
	(function(w) {
	  var lastTime = 0
	  var vendors = ['moz', 'webkit']

	  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame']
	    w.cancelAnimationFrame  = w[vendors[x] + 'CancelAnimationFrame'] ||
	                              w[vendors[x] + 'CancelRequestAnimationFrame']
	  }

	  w.requestAnimationFrame = w.requestAnimationFrame ||
	    function(callback) {
	      var currTime = new Date().getTime()
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime))

	      var id = w.setTimeout(function() {
	        callback(currTime + timeToCall)
	      }, timeToCall)

	      lastTime = currTime + timeToCall
	      return id
	    }

	  w.cancelAnimationFrame = w.cancelAnimationFrame || w.clearTimeout;

	}(window))

	return SVG

	}));

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	(function() {
	    SVG.extend(SVG.Element, {
	        /**
	         * draggy
	         * Makes an element draggable.
	         *
	         * @name draggy
	         * @function
	         * @param {Object|Function} constraint An object containing the
	         * constraint values or a function which gets the `x` and `y` values
	         * and returns a boolean or an object containing the `x` and `y`
	         * boolean values.`false` skips moving while `true` allows it.
	         * @return {SVG} The SVG element.
	         */
	        draggy: function (constraint) {

	            var start
	              , drag
	              , end
	              , element = this
	              ;

	            // Remove draggable if already present
	            if (typeof this.fixed === "function") {
	                this.fixed();
	            }

	            // Ensure constraint object
	            constraint = constraint || {};

	            // Start dragging
	            start = function(event) {
	                var parent = this.parent(SVG.Nested) || this.parent(SVG.Doc);
	                event = event || window.event;

	                // Invoke any callbacks
	                if (element.beforedrag) {
	                    element.beforedrag(event);
	                }

	                // Get element bounding box
	                var box = element.bbox();

	                if (element instanceof SVG.G) {
	                    box.x = element.x();
	                    box.y = element.y();
	                } else if (element instanceof SVG.Nested) {
	                    box = {
	                        x: element.x()
	                      , y: element.y()
	                      , width: element.width()
	                      , height: element.height()
	                    };
	                }

	                // Store event
	                element.startEvent = event;

	                // Store start position
	                element.startPosition = {
	                    x: box.x
	                  , y: box.y
	                  , width: box.width
	                  , height: box.height
	                  , zoom: parent.viewbox().zoom
	                  , rotation: element.transform("rotation") * Math.PI / 180
	                };

	                // Add while and end events to window
	                SVG.on(window, "mousemove", drag);
	                SVG.on(window, "touchmove", drag);

	                SVG.on(window, "mouseup", end);
	                SVG.on(window, "touchend", end);

	                // Invoke any callbacks
	                element.node.dispatchEvent(new CustomEvent("dragstart", {
	                    detail: {
	                        event: event
	                      , delta: {
	                            x: 0
	                          , y: 0
	                        }
	                    }
	                }));

	                // Prevent selection dragging
	                if (event.preventDefault) {
	                    event.preventDefault();
	                } else {
	                    event.returnValue = false;
	                }
	            };

	            function elmZoom(elm) {
	                if (!elm || typeof elm.transform !== "function") { return { x: 1, y: 1 }; }
	                var p = elm.parent();
	                var t = elm.transform();
	                pz = {};
	                var pz = elmZoom(p);
	                return {
	                    x: t.scaleX * pz.x
	                  , y: t.scaleY * pz.y
	                };
	            }

	            // While dragging
	            drag = function(event) {
	                event = event || window.event;

	                if (element.startEvent) {
	                    // Calculate move position
	                    var x
	                      , y
	                      , rotation = element.startPosition.rotation
	                      , width = element.startPosition.width
	                      , height = element.startPosition.height
	                      , zoom = element.startPosition.zoom
	                      , delta = {
	                            x: event.pageX - element.startEvent.pageX
	                          , y: event.pageY - element.startEvent.pageY
	                        }
	                      ;

	                    if (/^touchstart|touchmove$/.test(event.type)) {
	                        delta.x = event.touches[0].pageX - element.startEvent.touches[0].pageX;
	                        delta.y = event.touches[0].pageY - element.startEvent.touches[0].pageY;
	                    } else if(/^click|mousedown|mousemove$/.test(event.type)) {
	                        delta.x = event.pageX - element.startEvent.pageX;
	                        delta.y = event.pageY - element.startEvent.pageY;
	                    }

	                    delta.scale = elmZoom(element);

	                    x = element.startPosition.x + (delta.x * Math.cos(rotation) + delta.y * Math.sin(rotation)) / Math.pow(delta.scale.x * zoom, 1);
	                    y = element.startPosition.y + (delta.y * Math.cos(rotation) + delta.x * Math.sin(-rotation)) / Math.pow(delta.scale.y * zoom, 1);

	                    // Move the element to its new position, if possible by constraint
	                    if (typeof constraint === "function") {
	                        var coord = constraint(x, y);
	                        if (typeof coord === "object") {
	                            if (typeof coord.x !== "boolean" || coord.x) {
	                                x = typeof coord.x === "number" ? coord.x : x;
	                                element.x(x);
	                            } else {
	                                x = element.x();
	                            }

	                            if (typeof coord.y !== "boolean" || coord.y) {
	                                y = typeof coord.y === "number" ? coord.y : y;
	                                element.y(y);
	                            } else {
	                                y = element.y();
	                            }
	                        } else if (typeof coord === "boolean" && coord) {
	                            element.move(x, y);
	                        } else {
	                            x = element.x();
	                            y = element.y();
	                        }
	                    } else if (typeof constraint === "object") {
	                        // Keep element within constrained box
	                        if (constraint.minX !== null && x < constraint.minX) {
	                            x = constraint.minX;
	                        } else if (constraint.maxX !== null && x > constraint.maxX - width) {
	                            x = constraint.maxX - width;
	                        }

	                        if (constraint.minY !== null && y < constraint.minY) {
	                            y = constraint.minY;
	                        } else if (constraint.maxY !== null && y > constraint.maxY - height) {
	                            y = constraint.maxY - height;
	                        }

	                        element.move(x, y);
	                    }

	                    // Calculate the total movement
	                    delta.movedX = x - element.startPosition.x;
	                    delta.movedY = y - element.startPosition.y;

	                    // Invoke any callbacks
	                    element.node.dispatchEvent(new CustomEvent("dragmove", {
	                        detail: {
	                            delta: delta
	                          , event: event
	                        }
	                    }));
	                }
	            };

	            // When dragging ends
	            end = function(event) {
	                event = event || window.event;

	                // Calculate move position
	                var delta = {
	                    x: event.pageX - element.startEvent.pageX
	                  , y: event.pageY - element.startEvent.pageY
	                  , zoom: element.startPosition.zoom
	                };

	                // Reset store
	                element.startEvent = null;
	                element.startPosition = null;

	                // Remove while and end events to window
	                SVG.off(window, "mousemove", drag);
	                SVG.off(window, "touchmove", drag);
	                SVG.off(window, "mouseup", end);
	                SVG.off(window, "touchend", end);

	                // Invoke any callbacks
	                element.node.dispatchEvent(new CustomEvent("dragend", {
	                    detail: {
	                        delta: {
	                            x: 0
	                          , y: 0
	                        }
	                      , event: event
	                    }
	                }));
	            };

	            // Bind mousedown event
	            element.on("mousedown", start);
	            element.on("touchstart", start);

	            // Disable draggable
	            element.fixed = function() {
	                element.off("mousedown", start);
	                element.off("touchstart", start);

	                SVG.off(window, "mousemove", drag);
	                SVG.off(window, "touchmove", drag);
	                SVG.off(window, "mouseup", end);
	                SVG.off(window, "touchend", end);

	                start = drag = end = null;

	                return element;
	            };

	            return this;
	        }
	    });
	}).call(this);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// Dependencies
	var Id = __webpack_require__(51)
	  , SetOrGet = __webpack_require__(52)
	  , IterateObject = __webpack_require__(57)
	  , Deffy = __webpack_require__(53)
	  ;

	// Internal cache
	var _connections = {}
	  , _betweenTwoBubbles = {}
	  , container = null
	  , markers = null
	  ;

	/**
	 * connectable
	 * Connects two elements. If called multiple times, the lines will be curved.
	 *
	 * @name connectable
	 * @function
	 * @param {Object} options An object containing the following fields:
	 *
	 *  - `container` (SVGElement): The line elements container.
	 *  - `markers` (SVGElement): The marker elements container.
	 *
	 * @param {SVGElement} elmTarget The target SVG element.
	 * @return {Object} The connectable object containing:
	 *
	 *  - `source` (SVGElement): The source element.
	 *  - `target` (SVGElement): The target element.
	 *  - `line` (SVGElement): The line element.
	 *  - `marker` (SVGElement): The marker element.
	 *  - `padEllipe` (Boolean): If `true`, the line coordinates will be placed with a padding.
	 *  - [`computeLineCoordinates` (Function)](#computelinecoordinatescon)
	 *  - [`update` (Function)](#update)
	 *  - [`setLineColor` (Function)](#setlinecolorcolor-c)
	 */
	function connectable(options, elmTarget) {

	    var con = {};

	    if (elmTarget === undefined) {
	        elmTarget = options;
	        options = {};
	    }

	    container = options.container || container;
	    var elmSource = this;
	    markers = options.markers || markers;

	    options.k = options.k || 100;
	    options.kk = options.kk || 10;

	    var marker = markers.marker(10, 10)
	      , markerId = "triangle-" + Id()
	      , line = container.path().attr("marker-end", "url(#" + markerId + ")").fill("none")
	      ;

	    marker.attr({
	        id: markerId,
	        viewBox: "0 0 10 10",
	        refX: "0",
	        refY: "5",
	        markerUnits: "strokeWidth",
	        markerWidth: "4",
	        markerHeight: "5"
	    });

	    marker.path().attr({
	        d: "M 0 0 L 10 5 L 0 10 z"
	    });

	    // Source and target positions
	    var sPos = {}
	      , tPos = {}
	      ;

	    // Append the SVG elements
	    con.source = elmSource;
	    con.target = elmTarget;
	    con.line = line;
	    con.marker = marker;

	    SetOrGet(_connections, con.source.id(), []).push(con);
	    SetOrGet(_connections, con.target.id(), []).push(con);

	    SetOrGet(_betweenTwoBubbles, {
	        toString: function () {
	            var ids = [con.source.id(), con.target.id()]
	              , id1 = ids.join("->")
	              , id2 = ids.reverse().join("->")
	              ;

	            con._ = con.id = id1;

	            if (_betweenTwoBubbles[id2]) {
	                con._ = id2;
	                return id2;
	            }

	            con.id = id1;
	            return id1;
	        }
	    }, []).push(con);

	    /**
	     * computeLineCoordinates
	     * The function that computes the new coordinates.
	     * It can be overriden with a custom function.
	     *
	     * @name computeLineCoordinates
	     * @function
	     * @param {Connectable} con The connectable instance.
	     * @return {Object} An object containing the `x1`, `x2`, `y1` and `y2` coordinates.
	     */
	    con.computeLineCoordinates = function (cons) {

	        var output = []
	          , l = cons.length
	          ;

	        IterateObject(cons, function (con, i) {

	            var sT = con.source.transform()
	              , tT = con.target.transform()
	              , sB = con.source.bbox()
	              , tB = con.target.bbox()
	              , x1 = sT.x + sB.width / 2
	              , y1 = sT.y + sB.height / 2
	              , x2 = tT.x + tB.width / 2
	              , y2 = tT.y + tB.height / 2
	              , cx = (x1 + x2) / 2
	              , cy = (y1 + y2) / 2
	              , dx = Math.abs((x1 - x2) / 2)
	              , dy = Math.abs((y1 - y2) / 2)
	              , dd = null
	              , out = {
	                    x1: x1
	                  , y1: y1
	                  , x2: x2
	                  , y2: y2
	                  , ex: x1
	                  , ey: y1
	                }
	              ;

	            if (i !== (l - 1) / 2) {
	                dd = Math.sqrt(dx * dx + dy * dy);
	                out.ex = cx + dy / dd * options.k * (i - (l - 1) / 2);
	                out.ey = cy - dx / dd * options.k * (i - (l - 1) / 2);
	            }
	            output.push(out);
	        });

	        return output;
	    };

	    if (options.padEllipse) {
	        con.computeLineCoordinates = function (cons) {

	            var output = []
	              , l = cons.length
	              ;

	            IterateObject(cons, function (con, i) {

	                var elmS = con.source.node.querySelector("ellipse") || con.source.node.querySelector("circle")
	                  , elmT = con.target.node.querySelector("ellipse") || con.target.node.querySelector("circle")
	                  , xR1, xR2, yR1, yR2
	                  , sT = con.source.transform()
	                  , tT = con.target.transform()
	                  , sB = con.source.bbox()
	                  , tB = con.target.bbox()
	                  ;

	                if (elmS.tagName === "circle") {
	                    xR1 = yR1 = parseFloat(elmS.getAttribute("r"));
	                    xR2 = yR2 = parseFloat(elmT.getAttribute("r"));
	                } else {
	                    xR1 = parseFloat(elmS.getAttribute("rx"));
	                    yR1 = parseFloat(elmS.getAttribute("ry"));

	                    xR2 = parseFloat(elmT.getAttribute("rx"));
	                    yR2 = parseFloat(elmT.getAttribute("ry"));
	                }

	                // Get centers
	                var sx = sT.x + xR1 / 2
	                  , sy = sT.y + yR1 / 2
	                  , tx = tT.x + xR2 / 2
	                  , ty = tT.y + yR2 / 2

	                    // Calculate distance from source center to target center
	                  , dx = tx - sx
	                  , dy = ty - sy
	                  , d = Math.sqrt(dx * dx + dy * dy)

	                    // Construct unit vector between centers
	                  , ux = dx / d
	                  , uy = dy / d

	                    // Point on source circle
	                  , cx1 = sx + xR1 * ux
	                  , cy1 = sy + yR1 * uy

	                    // Point on target circle
	                  , cx2 = sx + (d - xR2 - 5) * ux
	                  , cy2 = sy + (d - yR2 - 5) * uy
	                  ;

	                var x1 = cx1 + xR1 / 2
	                  , y1 = cy1 + yR1 / 2
	                  , x2 = cx2 + xR2 / 2
	                  , y2 = cy2 + yR2 / 2
	                // TODO
	                //  , step = (Math.PI / 2 / l) * (i % 2 !== 0 ? 1 : -1)
	                //  , angle = 0
	                  ;

	                //if (i !== (l - 1) / 2) {
	                //    angle = step * (i + 1);
	                //}


	                //var xC1 = (sT.x + xR1)
	                //  , yC1 = (sT.y + yR1)
	                //  , xC2 = (tT.y + xR2)
	                //  , yC2 = (tT.y + yR2)
	                //  , ddx1 = x1 - xC1
	                //  , ddy1 = y1 - yC1
	                //  , ddx2 = x2 - xC2
	                //  , ddy2 = y2 - yC2
	                //  , cosAngle = Math.cos(angle)
	                //  , sinAngle = Math.sin(angle)
	                //  , cosAngleM = Math.cos(-angle)
	                //  , sinAngleM = Math.sin(-angle)
	                //  ;

	                // TODO This should change the points to arrange them on the circle
	                //
	                // x1 = ddx1 * cosAngle - ddy1 * sinAngle + xC1;
	                // y1 = ddx1 * sinAngle + ddy1 * cosAngle + yC1;

	                // x2 = ddx2 * cosAngleM - ddy2 * sinAngle + xC2;
	                // y2 = ddx2 * sinAngleM + ddy2 * cosAngle + yC2;

	                // ===================
	                // x1 = cx1 + ddx1 * Math.cos(angle) - ddy1 * Math.sin(angle)
	                // y1 = cy1 + ddx1 * Math.sin(angle) - ddy1 * Math.cos(angle)

	                //x2 = cx2 + ddx2 * Math.cos(angle) - ddy2 * Math.sin(angle) + xR2
	                //y2 = cy2 + ddx2 * Math.sin(angle) - ddy2 * Math.cos(angle) + yR2

	                var cx = (x1 + x2) / 2
	                  , cy = (y1 + y2) / 2
	                  , dd = null
	                  , out = {
	                        x1: x1
	                      , y1: y1
	                      , x2: x2
	                      , y2: y2
	                      , ex: x1
	                      , ey: y1
	                    }
	                  ;

	                if (isNaN(out.x1)) {
	                    out.x1 = sT.x + xR1 * 2;
	                    out.y1 = sT.y + yR1 / 2
	                    out.x2 = sT.x;
	                    out.y2 = out.y1;
	                    out.ex = (out.x1 + out.x2) / 2;
	                    out.ey = out.y1 - (options.kk * (i + 1));
	                } else {
	                    dx = Math.abs((x1 - x2) / 2);
	                    dy = Math.abs((y1 - y2) / 2);

	                    if (i !== (l - 1) / 2) {
	                        dd = Math.sqrt(dx * dx + dy * dy);
	                        out.ex = cx + dy / dd * options.k * (i - (l - 1) / 2);
	                        out.ey = cy - dx / dd * options.k * (i - (l - 1) / 2);
	                    }
	                }

	                output.push(out);
	            });

	            return output;
	        };
	    }

	    elmSource.cons = elmSource.cons || [];
	    elmSource.cons.push(con);

	    /**
	     * update
	     * Updates the line coordinates.
	     *
	     * @name update
	     * @function
	     */
	    con.update = function () {
	        var cons = Deffy(_betweenTwoBubbles[con._], [])
	          , results = con.computeLineCoordinates(cons)
	          ;

	        IterateObject(results, function (r, i) {
	            cons[i].line.plot(
	                "M" + r.x1 + " " + r.y1
	              + " Q" + r.ex + " " + r.ey
	              + " " + r.x2 + " " + r.y2
	            );
	        });
	    };

	    con.update();
	    elmSource.on("dragmove", con.update);
	    elmTarget.on("dragmove", con.update);

	    /**
	     * setLineColor
	     * Sets the line color.
	     *
	     * @name setLineColor
	     * @function
	     * @param {String} color The new color.
	     * @param {Connectable} c The connectable instance.
	     */
	    con.setLineColor = function (color, c) {
	        c = c || this;
	        c.line.stroke(color);
	        c.marker.fill(color);
	    };

	    return con;
	}

	if (typeof SVG === "function") {
	    SVG.extend(SVG.Element, {
	        connectable: connectable
	    });
	} else if (typeof window === "object") {
	    throw new Error("SVG.js is not loaded but it is required.");
	}

	module.exports = connectable;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Idy
	 * Generates a random id and potentially unique.
	 *
	 * @name Idy
	 * @function
	 * @param {Number} length The id length (default: 10).
	 * @return {String} The generated id.
	 */
	function Idy(length) {
	  length = length || 10;
	  return Math.random().toString(35).substr(2, length);
	}

	module.exports = Idy;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Dependencies
	var Deffy = __webpack_require__(53);

	/**
	 * SetOrGet
	 * Sets or gets an object field value.
	 *
	 * @name SetOrGet
	 * @function
	 * @param {Object|Array} input The cache/input object.
	 * @param {String|Number} field The field you want to update/create.
	 * @param {Object|Array} def The default value.
	 * @return {Object|Array} The field value.
	 */
	function SetOrGet(input, field, def) {
	  return input[field] = Deffy(input[field], def);
	}

	module.exports = SetOrGet;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// Dependencies
	var Typpy = __webpack_require__(54);

	/**
	 * Deffy
	 * Computes a final value by providing the input and default values.
	 *
	 * @name Deffy
	 * @function
	 * @param {Anything} input The input value.
	 * @param {Anything|Function} def The default value or a function getting the
	 * input value as first argument.
	 * @param {Object|Boolean} options The `empty` value or an object containing
	 * the following fields:
	 *
	 *  - `empty` (Boolean): Handles the input value as empty field (`input || default`). Default is `false`.
	 *
	 * @return {Anything} The computed value.
	 */
	function Deffy(input, def, options) {

	    // Default is a function
	    if (typeof def === "function") {
	        return def(input);
	    }

	    options = Typpy(options) === "boolean" ? {
	        empty: options
	    } : {
	        empty: false
	    };

	    // Handle empty
	    if (options.empty) {
	        return input || def;
	    }

	    // Return input
	    if (Typpy(input) === Typpy(def)) {
	        return input;
	    }

	    // Return the default
	    return def;
	}

	module.exports = Deffy;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(55);

	/**
	 * Typpy
	 * Gets the type of the input value or compares it
	 * with a provided type.
	 *
	 * Usage:
	 *
	 * ```js
	 * Typpy({}) // => "object"
	 * Typpy(42, Number); // => true
	 * Typpy.get([], "array"); => true
	 * ```
	 *
	 * @name Typpy
	 * @function
	 * @param {Anything} input The input value.
	 * @param {Constructor|String} target The target type.
	 * It could be a string (e.g. `"array"`) or a
	 * constructor (e.g. `Array`).
	 * @return {String|Boolean} It returns `true` if the
	 * input has the provided type `target` (if was provided),
	 * `false` if the input type does *not* have the provided type
	 * `target` or the stringified type of the input (always lowercase).
	 */
	function Typpy(input, target) {
	    if (arguments.length === 2) {
	        return Typpy.is(input, target);
	    }
	    return Typpy.get(input, true);
	}

	/**
	 * Typpy.is
	 * Checks if the input value has a specified type.
	 *
	 * @name Typpy.is
	 * @function
	 * @param {Anything} input The input value.
	 * @param {Constructor|String} target The target type.
	 * It could be a string (e.g. `"array"`) or a
	 * constructor (e.g. `Array`).
	 * @return {Boolean} `true`, if the input has the same
	 * type with the target or `false` otherwise.
	 */
	Typpy.is = function (input, target) {
	    return Typpy.get(input, typeof target === "string") === target;
	};

	/**
	 * Typpy.get
	 * Gets the type of the input value. This is used internally.
	 *
	 * @name Typpy.get
	 * @function
	 * @param {Anything} input The input value.
	 * @param {Boolean} str A flag to indicate if the return value
	 * should be a string or not.
	 * @return {Constructor|String} The input value constructor
	 * (if any) or the stringified type (always lowercase).
	 */
	Typpy.get = function (input, str) {

	    if (typeof input === "string") {
	        return str ? "string" : String;
	    }

	    if (null === input) {
	        return str ? "null" : null;
	    }

	    if (undefined === input) {
	        return str ? "undefined" : undefined;
	    }

	    if (input !== input) {
	        return str ? "nan" : NaN;
	    }

	    return str ? input.constructor.name.toLowerCase() : input.constructor;
	};

	module.exports = Typpy;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var noop6 = __webpack_require__(56);

	(function () {
	    var NAME_FIELD = "name";

	    if (typeof noop6.name === "string") {
	        return;
	    }

	    try {
	        Object.defineProperty(Function.prototype, NAME_FIELD, {
	            get: function get() {
	                var name = this.toString().trim().match(/^function\s*([^\s(]+)/)[1];
	                Object.defineProperty(this, NAME_FIELD, { value: name });
	                return name;
	            }
	        });
	    } catch (e) {}
	})();

	/**
	 * functionName
	 * Get the function name.
	 *
	 * @name functionName
	 * @function
	 * @param {Function} input The input function.
	 * @returns {String} The function name.
	 */
	module.exports = function functionName(input) {
	    return input.name;
	};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function () {};

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	/**
	 * iterateObject
	 * Iterates an object. Note the object field order may differ.
	 *
	 * @name iterateObject
	 * @function
	 * @param {Object} obj The input object.
	 * @param {Function} fn A function that will be called with the current value, field name and provided object.
	 * @return {Function} The `iterateObject` function.
	 */
	function iterateObject(obj, fn) {
	    var i = 0
	      , keys = []
	      ;

	    if (Array.isArray(obj)) {
	        for (; i < obj.length; ++i) {
	            if (fn(obj[i], i, obj) === false) {
	                break;
	            }
	        }
	    } else if (typeof obj === "object" && obj !== null) {
	        keys = Object.keys(obj);
	        for (; i < keys.length; ++i) {
	            if (fn(obj[keys[i]], keys[i], obj) === false) {
	                break;
	            }
	        }
	    }
	}

	module.exports = iterateObject;


/***/ })
/******/ ]);