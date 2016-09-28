/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _meiosis = __webpack_require__(27);
	
	var _meiosisInferno = __webpack_require__(30);
	
	var _meiosisTracer = __webpack_require__(33);
	
	var _meiosisTracer2 = _interopRequireDefault(_meiosisTracer);
	
	var _componentInferno = __webpack_require__(34);
	
	var _componentInferno2 = _interopRequireDefault(_componentInferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var runapp = function runapp() {
	  var renderRoot = (0, _meiosis.run)((0, _meiosisInferno.renderer)().intoId(document, "app"), (0, _componentInferno2.default)());
	  (0, _meiosisTracer2.default)(_meiosis.createComponent, renderRoot, "#tracer");
	};
	
	(0, _app2.default)(runapp);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (runapp) {
	  _unionType2.default.check = false;
	
	  (0, _sinonServer2.default)();
	  runapp();
	};
	
	var _unionType = __webpack_require__(2);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	var _sinonServer = __webpack_require__(25);
	
	var _sinonServer2 = _interopRequireDefault(_sinonServer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var curryN = __webpack_require__(3);
	var compose = __webpack_require__(9);
	var isString = function(s) { return typeof s === 'string'; };
	var isNumber = function(n) { return typeof n === 'number'; };
	var isBoolean = function(b) { return typeof b === 'boolean'; };
	var isObject = function(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	};
	var isFunction = function(f) { return typeof f === 'function'; };
	var isArray = Array.isArray || function(a) { return 'length' in a; };
	
	var mapConstrToFn = function(group, constr) {
	  return constr === String    ? isString
	       : constr === Number    ? isNumber
	       : constr === Boolean   ? isBoolean
	       : constr === Object    ? isObject
	       : constr === Array     ? isArray
	       : constr === Function  ? isFunction
	       : constr === undefined ? group
	                              : constr;
	};
	
	var numToStr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
	
	var validate = function(group, validators, name, args) {
	  var validator, v, i;
	  if (args.length > validators.length) {
	    throw new TypeError('too many arguments supplied to constructor ' + name
	      + ' (expected ' + validators.length + ' but got ' + args.length + ')');
	  }
	  for (i = 0; i < args.length; ++i) {
	    v = args[i];
	    validator = mapConstrToFn(group, validators[i]);
	    if (Type.check === true &&
	        (validator.prototype === undefined || !validator.prototype.isPrototypeOf(v)) &&
	        (typeof validator !== 'function' || !validator(v))) {
	      var strVal = typeof v === 'string' ? "'" + v + "'" : v; // put the value in quotes if it's a string
	      throw new TypeError('bad value ' + strVal + ' passed as ' + numToStr[i] + ' argument to constructor ' + name);
	    }
	  }
	};
	
	function valueToArray(value) {
	  var i, arr = [];
	  for (i = 0; i < value._keys.length; ++i) {
	    arr.push(value[value._keys[i]]);
	  }
	  return arr;
	}
	
	function extractValues(keys, obj) {
	  var arr = [], i;
	  for (i = 0; i < keys.length; ++i) arr[i] = obj[keys[i]];
	  return arr;
	}
	
	function constructor(group, name, fields) {
	  var validators, keys = Object.keys(fields), i;
	  if (isArray(fields)) {
	    validators = fields;
	  } else {
	    validators = extractValues(keys, fields);
	  }
	  function construct() {
	    var val = Object.create(group.prototype), i;
	    val._keys = keys;
	    val._name = name;
	    if (Type.check === true) {
	      validate(group, validators, name, arguments);
	    }
	    for (i = 0; i < arguments.length; ++i) {
	      val[keys[i]] = arguments[i];
	    }
	    return val;
	  }
	  group[name] = curryN(keys.length, construct);
	  if (keys !== undefined) {
	    group[name+'Of'] = function(obj) {
	      return construct.apply(undefined, extractValues(keys, obj));
	    };
	  }
	}
	
	function rawCase(type, cases, value, arg) {
	  var wildcard = false;
	  var handler = cases[value._name];
	  if (handler === undefined) {
	    handler = cases['_'];
	    wildcard = true;
	  }
	  if (Type.check === true) {
	    if (!type.prototype.isPrototypeOf(value)) {
	      throw new TypeError('wrong type passed to case');
	    } else if (handler === undefined) {
	      throw new Error('non-exhaustive patterns in a function');
	    }
	  }
	  var args = wildcard === true ? [arg]
	           : arg !== undefined ? valueToArray(value).concat([arg])
	           : valueToArray(value);
	  return handler.apply(undefined, args);
	}
	
	var typeCase = curryN(3, rawCase);
	var caseOn = curryN(4, rawCase);
	
	function createIterator() {
	  return {
	    idx: 0,
	    val: this,
	    next: function() {
	      var keys = this.val._keys;
	      return this.idx === keys.length
	        ? {done: true}
	        : {value: this.val[keys[this.idx++]]};
	    }
	  };
	}
	
	function Type(desc) {
	  var key, res, obj = {};
	  obj.case = typeCase(obj);
	  obj.caseOn = caseOn(obj);
	  
	  obj.prototype = {};
	  obj.prototype[Symbol ? Symbol.iterator : '@@iterator'] = createIterator;
	  obj.prototype.case = function (cases) { return obj.case(cases, this); }
	  obj.prototype.caseOn = function (cases) { return obj.caseOn(cases, this); }
	  
	  for (key in desc) {
	    res = constructor(obj, key, desc[key]);
	  }
	  return obj;
	}
	
	Type.check = true;
	
	Type.ListOf = function (T) {
	  var List = Type({List:[Array]});
	  var innerType = Type({T: [T]}).T;
	  var validate = List.case({
	    List: function (array) {
	      try{
	        for(var n = 0; n < array.length; n++) {
	          innerType(array[n])
	        }
	      } catch (e) {
	        throw TypeError('wrong value '+array[n]+' passed to location '+numToStr[n]+' in List')
	      }
	      return true;
	    }
	  });
	  return compose(validate, List.List);
	}
	
	module.exports = Type;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(4);
	var _curry1 = __webpack_require__(5);
	var _curry2 = __webpack_require__(7);
	var _curryN = __webpack_require__(8);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the specified
	 * arity. The curried function has two unusual capabilities. First, its
	 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	 * following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(6);
	
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(5);
	var _isPlaceholder = __webpack_require__(6);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2
	             : _curry1(function(_b) { return fn(a, _b); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
	             : fn(a, b);
	    }
	  };
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(4);
	var _isPlaceholder = __webpack_require__(6);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @param {Array} received An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (!_isPlaceholder(received[combinedIdx]) ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (!_isPlaceholder(result)) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined)
	                     : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var pipe = __webpack_require__(10);
	var reverse = __webpack_require__(23);
	
	
	/**
	 * Performs right-to-left function composition. The rightmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.pipe
	 * @example
	 *
	 *      var f = R.compose(R.inc, R.negate, Math.pow);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function compose() {
	  if (arguments.length === 0) {
	    throw new Error('compose requires at least one argument');
	  }
	  return pipe.apply(this, reverse(arguments));
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(4);
	var _pipe = __webpack_require__(11);
	var reduce = __webpack_require__(12);
	var tail = __webpack_require__(19);
	
	
	/**
	 * Performs left-to-right function composition. The leftmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * In some libraries this function is named `sequence`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.compose
	 * @example
	 *
	 *      var f = R.pipe(Math.pow, R.negate, R.inc);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function pipe() {
	  if (arguments.length === 0) {
	    throw new Error('pipe requires at least one argument');
	  }
	  return _arity(arguments[0].length,
	                reduce(_pipe, arguments[0], tail(arguments)));
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function _pipe(f, g) {
	  return function() {
	    return g.call(this, f.apply(this, arguments));
	  };
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(13);
	var _reduce = __webpack_require__(14);
	
	
	/**
	 * Returns a single item by iterating through the list, successively calling
	 * the iterator function and passing it an accumulator value and the current
	 * value from the array, and then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*. It may use
	 * `R.reduced` to shortcut the iteration.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	 * arrays), unlike the native `Array.prototype.reduce` method. For more details
	 * on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 *
	 * Dispatches to the `reduce` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig ((a, b) -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @see R.reduced, R.addIndex
	 * @example
	 *
	 *      var numbers = [1, 2, 3];
	 *      var add = (a, b) => a + b;
	 *
	 *      R.reduce(add, 10, numbers); //=> 16
	 */
	module.exports = _curry3(_reduce);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(5);
	var _curry2 = __webpack_require__(7);
	var _isPlaceholder = __webpack_require__(6);
	
	
	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    switch (arguments.length) {
	      case 0:
	        return f3;
	      case 1:
	        return _isPlaceholder(a) ? f3
	             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
	      case 2:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
	             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _curry1(function(_c) { return fn(a, b, _c); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
	             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
	             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
	             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
	             : fn(a, b, c);
	    }
	  };
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var _xwrap = __webpack_require__(15);
	var bind = __webpack_require__(16);
	var isArrayLike = __webpack_require__(17);
	
	
	module.exports = (function() {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0;
	    var len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _methodReduce(xf, acc, obj) {
	    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	  }
	
	  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list);
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	}());


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = (function() {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function() {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
	  XWrap.prototype['@@transducer/step'] = function(acc, x) {
	    return this.f(acc, x);
	  };
	
	  return function _xwrap(fn) { return new XWrap(fn); };
	}());


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(4);
	var _curry2 = __webpack_require__(7);
	
	
	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @category Object
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 * @see R.partial
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function() {
	    return fn.apply(thisObj, arguments);
	  });
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(5);
	var _isArray = __webpack_require__(18);
	
	
	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      R.isArrayLike([]); //=> true
	 *      R.isArrayLike(true); //=> false
	 *      R.isArrayLike({}); //=> false
	 *      R.isArrayLike({length: 10}); //=> false
	 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) { return true; }
	  if (!x) { return false; }
	  if (typeof x !== 'object') { return false; }
	  if (x instanceof String) { return false; }
	  if (x.nodeType === 1) { return !!x.length; }
	  if (x.length === 0) { return true; }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return (val != null &&
	          val.length >= 0 &&
	          Object.prototype.toString.call(val) === '[object Array]');
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(20);
	var slice = __webpack_require__(22);
	
	
	/**
	 * Returns all but the first element of the given list or string (or object
	 * with a `tail` method).
	 *
	 * Dispatches to the `slice` method of the first argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @see R.head, R.init, R.last
	 * @example
	 *
	 *      R.tail([1, 2, 3]);  //=> [2, 3]
	 *      R.tail([1, 2]);     //=> [2]
	 *      R.tail([1]);        //=> []
	 *      R.tail([]);         //=> []
	 *
	 *      R.tail('abc');  //=> 'bc'
	 *      R.tail('ab');   //=> 'b'
	 *      R.tail('a');    //=> ''
	 *      R.tail('');     //=> ''
	 */
	module.exports = _checkForMethod('tail', slice(1, Infinity));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(18);
	var _slice = __webpack_require__(21);
	
	
	/**
	 * Similar to hasMethod, this checks whether a function has a [methodname]
	 * function. If it isn't an array it will execute that function otherwise it
	 * will default to the ramda implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
	      fn.apply(this, arguments) :
	      obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	  };
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * An optimized, private array `slice` implementation.
	 *
	 * @private
	 * @param {Arguments|Array} args The array or arguments object to consider.
	 * @param {Number} [from=0] The array index to slice from, inclusive.
	 * @param {Number} [to=args.length] The array index to slice to, exclusive.
	 * @return {Array} A new, sliced array.
	 * @example
	 *
	 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	 *
	 *      var firstThreeArgs = function(a, b, c, d) {
	 *        return _slice(arguments, 0, 3);
	 *      };
	 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	 */
	module.exports = function _slice(args, from, to) {
	  switch (arguments.length) {
	    case 1: return _slice(args, 0, args.length);
	    case 2: return _slice(args, from, args.length);
	    default:
	      var list = [];
	      var idx = 0;
	      var len = Math.max(0, Math.min(args.length, to) - from);
	      while (idx < len) {
	        list[idx] = args[from + idx];
	        idx += 1;
	      }
	      return list;
	  }
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(20);
	var _curry3 = __webpack_require__(13);
	
	
	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * Dispatches to the `slice` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.4
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @sig Number -> Number -> String -> String
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	 */
	module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	  return Array.prototype.slice.call(list, fromIndex, toIndex);
	}));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(5);
	var _isString = __webpack_require__(24);
	var _slice = __webpack_require__(21);
	
	
	/**
	 * Returns a new list or string with the elements or characters in reverse
	 * order.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {Array|String} list
	 * @return {Array|String}
	 * @example
	 *
	 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	 *      R.reverse([1, 2]);     //=> [2, 1]
	 *      R.reverse([1]);        //=> [1]
	 *      R.reverse([]);         //=> []
	 *
	 *      R.reverse('abc');      //=> 'cba'
	 *      R.reverse('ab');       //=> 'ba'
	 *      R.reverse('a');        //=> 'a'
	 *      R.reverse('');         //=> ''
	 */
	module.exports = _curry1(function reverse(list) {
	  return _isString(list) ? list.split('').reverse().join('') :
	                           _slice(list).reverse();
	});


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function _isString(x) {
	  return Object.prototype.toString.call(x) === '[object String]';
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var sinon = __webpack_require__(26);
	
	module.exports = function () {
	  var server = sinon.fakeServer.create();
	  server.autoRespond = true;
	  var headers = { "Content-Type": "application/json" };
	
	  var createTodoList = function createTodoList() {
	    return [{ id: 1, priority: 1, description: "Buy more beer" }, { id: 2, priority: 1, description: "Order pizza" }, { id: 3, priority: 2, description: "Eat pie" }, { id: 4, priority: 4, description: "Watch TV" }, { id: 5, priority: 5, description: "Sleep" }];
	  };
	  var todoList = [];
	
	  var nextId = 6;
	
	  var getTodoList = function getTodoList() {
	    if (todoList.length === 0) {
	      todoList = createTodoList();
	    }
	    return todoList;
	  };
	
	  server.respondWith("GET", "/todoList", function (request) {
	    request.respond(200, headers, JSON.stringify(getTodoList()));
	  });
	
	  var deleteTodo = function deleteTodo(todoId) {
	    for (var i = 0, t = todoList.length; i < t; i++) {
	      if (todoList[i].id === todoId) {
	        todoList.splice(i, 1);
	        break;
	      }
	    }
	  };
	
	  server.respondWith("DELETE", /\/api\/deleteTodo\/(\d+)/, function (request, todoId) {
	    deleteTodo(parseInt(todoId, 10));
	    request.respond(204);
	  });
	
	  var saveTodo = function saveTodo(todo) {
	    todo.priority = parseInt(todo.priority, 10);
	
	    if (!todo.id) {
	      todo.id = nextId;
	      nextId++;
	      todoList.push(todo);
	    } else {
	      todo.id = parseInt(todo.id, 10);
	      for (var i = 0, t = todoList.length; i < t; i++) {
	        if (todoList[i].id === todo.id) {
	          todoList[i] = todo;
	          break;
	        }
	      }
	    }
	    return todo;
	  };
	
	  server.respondWith("POST", "/api/saveTodo", function (request) {
	    var todo = JSON.parse(request.requestBody);
	    request.respond(200, headers, JSON.stringify(saveTodo(todo)));
	  });
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Sinon.JS 1.17.6, 2016/09/19
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @author Contributors: https://github.com/cjohansen/Sinon.JS/blob/master/AUTHORS
	 *
	 * (The BSD License)
	 * 
	 * Copyright (c) 2010-2014, Christian Johansen, christian@cjohansen.no
	 * All rights reserved.
	 * 
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 * 
	 *     * Redistributions of source code must retain the above copyright notice,
	 *       this list of conditions and the following disclaimer.
	 *     * Redistributions in binary form must reproduce the above copyright notice,
	 *       this list of conditions and the following disclaimer in the documentation
	 *       and/or other materials provided with the distribution.
	 *     * Neither the name of Christian Johansen nor the names of his contributors
	 *       may be used to endorse or promote products derived from this software
	 *       without specific prior written permission.
	 * 
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
	 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
	 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
	 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
	 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
	 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	
	(function (root, factory) {
	  'use strict';
	  if (typeof define === 'function' && define.amd) {
	    define('sinon', [], function () {
	      return (root.sinon = factory());
	    });
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.sinon = factory();
	  }
	}(this, function () {
	  'use strict';
	  var samsam, formatio, lolex;
	  (function () {
	                function define(mod, deps, fn) {
	                  if (mod == "samsam") {
	                    samsam = deps();
	                  } else if (typeof deps === "function" && mod.length === 0) {
	                    lolex = deps();
	                  } else if (typeof fn === "function") {
	                    formatio = fn(samsam);
	                  }
	                }
	    define.amd = {};
	((typeof define === "function" && define.amd && function (m) { define("samsam", m); }) ||
	 (typeof module === "object" &&
	      function (m) { module.exports = m(); }) || // Node
	 function (m) { this.samsam = m(); } // Browser globals
	)(function () {
	    var o = Object.prototype;
	    var div = typeof document !== "undefined" && document.createElement("div");
	
	    function isNaN(value) {
	        // Unlike global isNaN, this avoids type coercion
	        // typeof check avoids IE host object issues, hat tip to
	        // lodash
	        var val = value; // JsLint thinks value !== value is "weird"
	        return typeof value === "number" && value !== val;
	    }
	
	    function getClass(value) {
	        // Returns the internal [[Class]] by calling Object.prototype.toString
	        // with the provided value as this. Return value is a string, naming the
	        // internal class, e.g. "Array"
	        return o.toString.call(value).split(/[ \]]/)[1];
	    }
	
	    /**
	     * @name samsam.isArguments
	     * @param Object object
	     *
	     * Returns ``true`` if ``object`` is an ``arguments`` object,
	     * ``false`` otherwise.
	     */
	    function isArguments(object) {
	        if (getClass(object) === 'Arguments') { return true; }
	        if (typeof object !== "object" || typeof object.length !== "number" ||
	                getClass(object) === "Array") {
	            return false;
	        }
	        if (typeof object.callee == "function") { return true; }
	        try {
	            object[object.length] = 6;
	            delete object[object.length];
	        } catch (e) {
	            return true;
	        }
	        return false;
	    }
	
	    /**
	     * @name samsam.isElement
	     * @param Object object
	     *
	     * Returns ``true`` if ``object`` is a DOM element node. Unlike
	     * Underscore.js/lodash, this function will return ``false`` if ``object``
	     * is an *element-like* object, i.e. a regular object with a ``nodeType``
	     * property that holds the value ``1``.
	     */
	    function isElement(object) {
	        if (!object || object.nodeType !== 1 || !div) { return false; }
	        try {
	            object.appendChild(div);
	            object.removeChild(div);
	        } catch (e) {
	            return false;
	        }
	        return true;
	    }
	
	    /**
	     * @name samsam.keys
	     * @param Object object
	     *
	     * Return an array of own property names.
	     */
	    function keys(object) {
	        var ks = [], prop;
	        for (prop in object) {
	            if (o.hasOwnProperty.call(object, prop)) { ks.push(prop); }
	        }
	        return ks;
	    }
	
	    /**
	     * @name samsam.isDate
	     * @param Object value
	     *
	     * Returns true if the object is a ``Date``, or *date-like*. Duck typing
	     * of date objects work by checking that the object has a ``getTime``
	     * function whose return value equals the return value from the object's
	     * ``valueOf``.
	     */
	    function isDate(value) {
	        return typeof value.getTime == "function" &&
	            value.getTime() == value.valueOf();
	    }
	
	    /**
	     * @name samsam.isNegZero
	     * @param Object value
	     *
	     * Returns ``true`` if ``value`` is ``-0``.
	     */
	    function isNegZero(value) {
	        return value === 0 && 1 / value === -Infinity;
	    }
	
	    /**
	     * @name samsam.equal
	     * @param Object obj1
	     * @param Object obj2
	     *
	     * Returns ``true`` if two objects are strictly equal. Compared to
	     * ``===`` there are two exceptions:
	     *
	     *   - NaN is considered equal to NaN
	     *   - -0 and +0 are not considered equal
	     */
	    function identical(obj1, obj2) {
	        if (obj1 === obj2 || (isNaN(obj1) && isNaN(obj2))) {
	            return obj1 !== 0 || isNegZero(obj1) === isNegZero(obj2);
	        }
	    }
	
	
	    /**
	     * @name samsam.deepEqual
	     * @param Object obj1
	     * @param Object obj2
	     *
	     * Deep equal comparison. Two values are "deep equal" if:
	     *
	     *   - They are equal, according to samsam.identical
	     *   - They are both date objects representing the same time
	     *   - They are both arrays containing elements that are all deepEqual
	     *   - They are objects with the same set of properties, and each property
	     *     in ``obj1`` is deepEqual to the corresponding property in ``obj2``
	     *
	     * Supports cyclic objects.
	     */
	    function deepEqualCyclic(obj1, obj2) {
	
	        // used for cyclic comparison
	        // contain already visited objects
	        var objects1 = [],
	            objects2 = [],
	        // contain pathes (position in the object structure)
	        // of the already visited objects
	        // indexes same as in objects arrays
	            paths1 = [],
	            paths2 = [],
	        // contains combinations of already compared objects
	        // in the manner: { "$1['ref']$2['ref']": true }
	            compared = {};
	
	        /**
	         * used to check, if the value of a property is an object
	         * (cyclic logic is only needed for objects)
	         * only needed for cyclic logic
	         */
	        function isObject(value) {
	
	            if (typeof value === 'object' && value !== null &&
	                    !(value instanceof Boolean) &&
	                    !(value instanceof Date)    &&
	                    !(value instanceof Number)  &&
	                    !(value instanceof RegExp)  &&
	                    !(value instanceof String)) {
	
	                return true;
	            }
	
	            return false;
	        }
	
	        /**
	         * returns the index of the given object in the
	         * given objects array, -1 if not contained
	         * only needed for cyclic logic
	         */
	        function getIndex(objects, obj) {
	
	            var i;
	            for (i = 0; i < objects.length; i++) {
	                if (objects[i] === obj) {
	                    return i;
	                }
	            }
	
	            return -1;
	        }
	
	        // does the recursion for the deep equal check
	        return (function deepEqual(obj1, obj2, path1, path2) {
	            var type1 = typeof obj1;
	            var type2 = typeof obj2;
	
	            // == null also matches undefined
	            if (obj1 === obj2 ||
	                    isNaN(obj1) || isNaN(obj2) ||
	                    obj1 == null || obj2 == null ||
	                    type1 !== "object" || type2 !== "object") {
	
	                return identical(obj1, obj2);
	            }
	
	            // Elements are only equal if identical(expected, actual)
	            if (isElement(obj1) || isElement(obj2)) { return false; }
	
	            var isDate1 = isDate(obj1), isDate2 = isDate(obj2);
	            if (isDate1 || isDate2) {
	                if (!isDate1 || !isDate2 || obj1.getTime() !== obj2.getTime()) {
	                    return false;
	                }
	            }
	
	            if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
	                if (obj1.toString() !== obj2.toString()) { return false; }
	            }
	
	            var class1 = getClass(obj1);
	            var class2 = getClass(obj2);
	            var keys1 = keys(obj1);
	            var keys2 = keys(obj2);
	
	            if (isArguments(obj1) || isArguments(obj2)) {
	                if (obj1.length !== obj2.length) { return false; }
	            } else {
	                if (type1 !== type2 || class1 !== class2 ||
	                        keys1.length !== keys2.length) {
	                    return false;
	                }
	            }
	
	            var key, i, l,
	                // following vars are used for the cyclic logic
	                value1, value2,
	                isObject1, isObject2,
	                index1, index2,
	                newPath1, newPath2;
	
	            for (i = 0, l = keys1.length; i < l; i++) {
	                key = keys1[i];
	                if (!o.hasOwnProperty.call(obj2, key)) {
	                    return false;
	                }
	
	                // Start of the cyclic logic
	
	                value1 = obj1[key];
	                value2 = obj2[key];
	
	                isObject1 = isObject(value1);
	                isObject2 = isObject(value2);
	
	                // determine, if the objects were already visited
	                // (it's faster to check for isObject first, than to
	                // get -1 from getIndex for non objects)
	                index1 = isObject1 ? getIndex(objects1, value1) : -1;
	                index2 = isObject2 ? getIndex(objects2, value2) : -1;
	
	                // determine the new pathes of the objects
	                // - for non cyclic objects the current path will be extended
	                //   by current property name
	                // - for cyclic objects the stored path is taken
	                newPath1 = index1 !== -1
	                    ? paths1[index1]
	                    : path1 + '[' + JSON.stringify(key) + ']';
	                newPath2 = index2 !== -1
	                    ? paths2[index2]
	                    : path2 + '[' + JSON.stringify(key) + ']';
	
	                // stop recursion if current objects are already compared
	                if (compared[newPath1 + newPath2]) {
	                    return true;
	                }
	
	                // remember the current objects and their pathes
	                if (index1 === -1 && isObject1) {
	                    objects1.push(value1);
	                    paths1.push(newPath1);
	                }
	                if (index2 === -1 && isObject2) {
	                    objects2.push(value2);
	                    paths2.push(newPath2);
	                }
	
	                // remember that the current objects are already compared
	                if (isObject1 && isObject2) {
	                    compared[newPath1 + newPath2] = true;
	                }
	
	                // End of cyclic logic
	
	                // neither value1 nor value2 is a cycle
	                // continue with next level
	                if (!deepEqual(value1, value2, newPath1, newPath2)) {
	                    return false;
	                }
	            }
	
	            return true;
	
	        }(obj1, obj2, '$1', '$2'));
	    }
	
	    var match;
	
	    function arrayContains(array, subset) {
	        if (subset.length === 0) { return true; }
	        var i, l, j, k;
	        for (i = 0, l = array.length; i < l; ++i) {
	            if (match(array[i], subset[0])) {
	                for (j = 0, k = subset.length; j < k; ++j) {
	                    if (!match(array[i + j], subset[j])) { return false; }
	                }
	                return true;
	            }
	        }
	        return false;
	    }
	
	    /**
	     * @name samsam.match
	     * @param Object object
	     * @param Object matcher
	     *
	     * Compare arbitrary value ``object`` with matcher.
	     */
	    match = function match(object, matcher) {
	        if (matcher && typeof matcher.test === "function") {
	            return matcher.test(object);
	        }
	
	        if (typeof matcher === "function") {
	            return matcher(object) === true;
	        }
	
	        if (typeof matcher === "string") {
	            matcher = matcher.toLowerCase();
	            var notNull = typeof object === "string" || !!object;
	            return notNull &&
	                (String(object)).toLowerCase().indexOf(matcher) >= 0;
	        }
	
	        if (typeof matcher === "number") {
	            return matcher === object;
	        }
	
	        if (typeof matcher === "boolean") {
	            return matcher === object;
	        }
	
	        if (typeof(matcher) === "undefined") {
	            return typeof(object) === "undefined";
	        }
	
	        if (matcher === null) {
	            return object === null;
	        }
	
	        if (getClass(object) === "Array" && getClass(matcher) === "Array") {
	            return arrayContains(object, matcher);
	        }
	
	        if (matcher && typeof matcher === "object") {
	            if (matcher === object) {
	                return true;
	            }
	            var prop;
	            for (prop in matcher) {
	                var value = object[prop];
	                if (typeof value === "undefined" &&
	                        typeof object.getAttribute === "function") {
	                    value = object.getAttribute(prop);
	                }
	                if (matcher[prop] === null || typeof matcher[prop] === 'undefined') {
	                    if (value !== matcher[prop]) {
	                        return false;
	                    }
	                } else if (typeof  value === "undefined" || !match(value, matcher[prop])) {
	                    return false;
	                }
	            }
	            return true;
	        }
	
	        throw new Error("Matcher was not a string, a number, a " +
	                        "function, a boolean or an object");
	    };
	
	    return {
	        isArguments: isArguments,
	        isElement: isElement,
	        isDate: isDate,
	        isNegZero: isNegZero,
	        identical: identical,
	        deepEqual: deepEqualCyclic,
	        match: match,
	        keys: keys
	    };
	});
	((typeof define === "function" && define.amd && function (m) {
	    define("formatio", ["samsam"], m);
	}) || (typeof module === "object" && function (m) {
	    module.exports = m(require("samsam"));
	}) || function (m) { this.formatio = m(this.samsam); }
	)(function (samsam) {
	    
	    var formatio = {
	        excludeConstructors: ["Object", /^.$/],
	        quoteStrings: true,
	        limitChildrenCount: 0
	    };
	
	    var hasOwn = Object.prototype.hasOwnProperty;
	
	    var specialObjects = [];
	    if (typeof global !== "undefined") {
	        specialObjects.push({ object: global, value: "[object global]" });
	    }
	    if (typeof document !== "undefined") {
	        specialObjects.push({
	            object: document,
	            value: "[object HTMLDocument]"
	        });
	    }
	    if (typeof window !== "undefined") {
	        specialObjects.push({ object: window, value: "[object Window]" });
	    }
	
	    function functionName(func) {
	        if (!func) { return ""; }
	        if (func.displayName) { return func.displayName; }
	        if (func.name) { return func.name; }
	        var matches = func.toString().match(/function\s+([^\(]+)/m);
	        return (matches && matches[1]) || "";
	    }
	
	    function constructorName(f, object) {
	        var name = functionName(object && object.constructor);
	        var excludes = f.excludeConstructors ||
	                formatio.excludeConstructors || [];
	
	        var i, l;
	        for (i = 0, l = excludes.length; i < l; ++i) {
	            if (typeof excludes[i] === "string" && excludes[i] === name) {
	                return "";
	            } else if (excludes[i].test && excludes[i].test(name)) {
	                return "";
	            }
	        }
	
	        return name;
	    }
	
	    function isCircular(object, objects) {
	        if (typeof object !== "object") { return false; }
	        var i, l;
	        for (i = 0, l = objects.length; i < l; ++i) {
	            if (objects[i] === object) { return true; }
	        }
	        return false;
	    }
	
	    function ascii(f, object, processed, indent) {
	        if (typeof object === "string") {
	            var qs = f.quoteStrings;
	            var quote = typeof qs !== "boolean" || qs;
	            return processed || quote ? '"' + object + '"' : object;
	        }
	
	        if (typeof object === "function" && !(object instanceof RegExp)) {
	            return ascii.func(object);
	        }
	
	        processed = processed || [];
	
	        if (isCircular(object, processed)) { return "[Circular]"; }
	
	        if (Object.prototype.toString.call(object) === "[object Array]") {
	            return ascii.array.call(f, object, processed);
	        }
	
	        if (!object) { return String((1/object) === -Infinity ? "-0" : object); }
	        if (samsam.isElement(object)) { return ascii.element(object); }
	
	        if (typeof object.toString === "function" &&
	                object.toString !== Object.prototype.toString) {
	            return object.toString();
	        }
	
	        var i, l;
	        for (i = 0, l = specialObjects.length; i < l; i++) {
	            if (object === specialObjects[i].object) {
	                return specialObjects[i].value;
	            }
	        }
	
	        return ascii.object.call(f, object, processed, indent);
	    }
	
	    ascii.func = function (func) {
	        return "function " + functionName(func) + "() {}";
	    };
	
	    ascii.array = function (array, processed) {
	        processed = processed || [];
	        processed.push(array);
	        var pieces = [];
	        var i, l;
	        l = (this.limitChildrenCount > 0) ? 
	            Math.min(this.limitChildrenCount, array.length) : array.length;
	
	        for (i = 0; i < l; ++i) {
	            pieces.push(ascii(this, array[i], processed));
	        }
	
	        if(l < array.length)
	            pieces.push("[... " + (array.length - l) + " more elements]");
	
	        return "[" + pieces.join(", ") + "]";
	    };
	
	    ascii.object = function (object, processed, indent) {
	        processed = processed || [];
	        processed.push(object);
	        indent = indent || 0;
	        var pieces = [], properties = samsam.keys(object).sort();
	        var length = 3;
	        var prop, str, obj, i, k, l;
	        l = (this.limitChildrenCount > 0) ? 
	            Math.min(this.limitChildrenCount, properties.length) : properties.length;
	
	        for (i = 0; i < l; ++i) {
	            prop = properties[i];
	            obj = object[prop];
	
	            if (isCircular(obj, processed)) {
	                str = "[Circular]";
	            } else {
	                str = ascii(this, obj, processed, indent + 2);
	            }
	
	            str = (/\s/.test(prop) ? '"' + prop + '"' : prop) + ": " + str;
	            length += str.length;
	            pieces.push(str);
	        }
	
	        var cons = constructorName(this, object);
	        var prefix = cons ? "[" + cons + "] " : "";
	        var is = "";
	        for (i = 0, k = indent; i < k; ++i) { is += " "; }
	
	        if(l < properties.length)
	            pieces.push("[... " + (properties.length - l) + " more elements]");
	
	        if (length + indent > 80) {
	            return prefix + "{\n  " + is + pieces.join(",\n  " + is) + "\n" +
	                is + "}";
	        }
	        return prefix + "{ " + pieces.join(", ") + " }";
	    };
	
	    ascii.element = function (element) {
	        var tagName = element.tagName.toLowerCase();
	        var attrs = element.attributes, attr, pairs = [], attrName, i, l, val;
	
	        for (i = 0, l = attrs.length; i < l; ++i) {
	            attr = attrs.item(i);
	            attrName = attr.nodeName.toLowerCase().replace("html:", "");
	            val = attr.nodeValue;
	            if (attrName !== "contenteditable" || val !== "inherit") {
	                if (!!val) { pairs.push(attrName + "=\"" + val + "\""); }
	            }
	        }
	
	        var formatted = "<" + tagName + (pairs.length > 0 ? " " : "");
	        var content = element.innerHTML;
	
	        if (content.length > 20) {
	            content = content.substr(0, 20) + "[...]";
	        }
	
	        var res = formatted + pairs.join(" ") + ">" + content +
	                "</" + tagName + ">";
	
	        return res.replace(/ contentEditable="inherit"/, "");
	    };
	
	    function Formatio(options) {
	        for (var opt in options) {
	            this[opt] = options[opt];
	        }
	    }
	
	    Formatio.prototype = {
	        functionName: functionName,
	
	        configure: function (options) {
	            return new Formatio(options);
	        },
	
	        constructorName: function (object) {
	            return constructorName(this, object);
	        },
	
	        ascii: function (object, processed, indent) {
	            return ascii(this, object, processed, indent);
	        }
	    };
	
	    return Formatio.prototype;
	});
	!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.lolex=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	(function (global){
	/*global global, window*/
	/**
	 * @author Christian Johansen (christian@cjohansen.no) and contributors
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	
	(function (global) {
	    
	    // Make properties writable in IE, as per
	    // http://www.adequatelygood.com/Replacing-setTimeout-Globally.html
	    // JSLint being anal
	    var glbl = global;
	
	    global.setTimeout = glbl.setTimeout;
	    global.clearTimeout = glbl.clearTimeout;
	    global.setInterval = glbl.setInterval;
	    global.clearInterval = glbl.clearInterval;
	    global.Date = glbl.Date;
	
	    // setImmediate is not a standard function
	    // avoid adding the prop to the window object if not present
	    if('setImmediate' in global) {
	        global.setImmediate = glbl.setImmediate;
	        global.clearImmediate = glbl.clearImmediate;
	    }
	
	    // node expects setTimeout/setInterval to return a fn object w/ .ref()/.unref()
	    // browsers, a number.
	    // see https://github.com/cjohansen/Sinon.JS/pull/436
	
	    var NOOP = function () { return undefined; };
	    var timeoutResult = setTimeout(NOOP, 0);
	    var addTimerReturnsObject = typeof timeoutResult === "object";
	    clearTimeout(timeoutResult);
	
	    var NativeDate = Date;
	    var uniqueTimerId = 1;
	
	    /**
	     * Parse strings like "01:10:00" (meaning 1 hour, 10 minutes, 0 seconds) into
	     * number of milliseconds. This is used to support human-readable strings passed
	     * to clock.tick()
	     */
	    function parseTime(str) {
	        if (!str) {
	            return 0;
	        }
	
	        var strings = str.split(":");
	        var l = strings.length, i = l;
	        var ms = 0, parsed;
	
	        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
	            throw new Error("tick only understands numbers and 'h:m:s'");
	        }
	
	        while (i--) {
	            parsed = parseInt(strings[i], 10);
	
	            if (parsed >= 60) {
	                throw new Error("Invalid time " + str);
	            }
	
	            ms += parsed * Math.pow(60, (l - i - 1));
	        }
	
	        return ms * 1000;
	    }
	
	    /**
	     * Used to grok the `now` parameter to createClock.
	     */
	    function getEpoch(epoch) {
	        if (!epoch) { return 0; }
	        if (typeof epoch.getTime === "function") { return epoch.getTime(); }
	        if (typeof epoch === "number") { return epoch; }
	        throw new TypeError("now should be milliseconds since UNIX epoch");
	    }
	
	    function inRange(from, to, timer) {
	        return timer && timer.callAt >= from && timer.callAt <= to;
	    }
	
	    function mirrorDateProperties(target, source) {
	        var prop;
	        for (prop in source) {
	            if (source.hasOwnProperty(prop)) {
	                target[prop] = source[prop];
	            }
	        }
	
	        // set special now implementation
	        if (source.now) {
	            target.now = function now() {
	                return target.clock.now;
	            };
	        } else {
	            delete target.now;
	        }
	
	        // set special toSource implementation
	        if (source.toSource) {
	            target.toSource = function toSource() {
	                return source.toSource();
	            };
	        } else {
	            delete target.toSource;
	        }
	
	        // set special toString implementation
	        target.toString = function toString() {
	            return source.toString();
	        };
	
	        target.prototype = source.prototype;
	        target.parse = source.parse;
	        target.UTC = source.UTC;
	        target.prototype.toUTCString = source.prototype.toUTCString;
	
	        return target;
	    }
	
	    function createDate() {
	        function ClockDate(year, month, date, hour, minute, second, ms) {
	            // Defensive and verbose to avoid potential harm in passing
	            // explicit undefined when user does not pass argument
	            switch (arguments.length) {
	            case 0:
	                return new NativeDate(ClockDate.clock.now);
	            case 1:
	                return new NativeDate(year);
	            case 2:
	                return new NativeDate(year, month);
	            case 3:
	                return new NativeDate(year, month, date);
	            case 4:
	                return new NativeDate(year, month, date, hour);
	            case 5:
	                return new NativeDate(year, month, date, hour, minute);
	            case 6:
	                return new NativeDate(year, month, date, hour, minute, second);
	            default:
	                return new NativeDate(year, month, date, hour, minute, second, ms);
	            }
	        }
	
	        return mirrorDateProperties(ClockDate, NativeDate);
	    }
	
	    function addTimer(clock, timer) {
	        if (timer.func === undefined) {
	            throw new Error("Callback must be provided to timer calls");
	        }
	
	        if (!clock.timers) {
	            clock.timers = {};
	        }
	
	        timer.id = uniqueTimerId++;
	        timer.createdAt = clock.now;
	        timer.callAt = clock.now + (timer.delay || (clock.duringTick ? 1 : 0));
	
	        clock.timers[timer.id] = timer;
	
	        if (addTimerReturnsObject) {
	            return {
	                id: timer.id,
	                ref: NOOP,
	                unref: NOOP
	            };
	        }
	
	        return timer.id;
	    }
	
	
	    function compareTimers(a, b) {
	        // Sort first by absolute timing
	        if (a.callAt < b.callAt) {
	            return -1;
	        }
	        if (a.callAt > b.callAt) {
	            return 1;
	        }
	
	        // Sort next by immediate, immediate timers take precedence
	        if (a.immediate && !b.immediate) {
	            return -1;
	        }
	        if (!a.immediate && b.immediate) {
	            return 1;
	        }
	
	        // Sort next by creation time, earlier-created timers take precedence
	        if (a.createdAt < b.createdAt) {
	            return -1;
	        }
	        if (a.createdAt > b.createdAt) {
	            return 1;
	        }
	
	        // Sort next by id, lower-id timers take precedence
	        if (a.id < b.id) {
	            return -1;
	        }
	        if (a.id > b.id) {
	            return 1;
	        }
	
	        // As timer ids are unique, no fallback `0` is necessary
	    }
	
	    function firstTimerInRange(clock, from, to) {
	        var timers = clock.timers,
	            timer = null,
	            id,
	            isInRange;
	
	        for (id in timers) {
	            if (timers.hasOwnProperty(id)) {
	                isInRange = inRange(from, to, timers[id]);
	
	                if (isInRange && (!timer || compareTimers(timer, timers[id]) === 1)) {
	                    timer = timers[id];
	                }
	            }
	        }
	
	        return timer;
	    }
	
	    function callTimer(clock, timer) {
	        var exception;
	
	        if (typeof timer.interval === "number") {
	            clock.timers[timer.id].callAt += timer.interval;
	        } else {
	            delete clock.timers[timer.id];
	        }
	
	        try {
	            if (typeof timer.func === "function") {
	                timer.func.apply(null, timer.args);
	            } else {
	                eval(timer.func);
	            }
	        } catch (e) {
	            exception = e;
	        }
	
	        if (!clock.timers[timer.id]) {
	            if (exception) {
	                throw exception;
	            }
	            return;
	        }
	
	        if (exception) {
	            throw exception;
	        }
	    }
	
	    function timerType(timer) {
	        if (timer.immediate) {
	            return "Immediate";
	        } else if (typeof timer.interval !== "undefined") {
	            return "Interval";
	        } else {
	            return "Timeout";
	        }
	    }
	
	    function clearTimer(clock, timerId, ttype) {
	        if (!timerId) {
	            // null appears to be allowed in most browsers, and appears to be
	            // relied upon by some libraries, like Bootstrap carousel
	            return;
	        }
	
	        if (!clock.timers) {
	            clock.timers = [];
	        }
	
	        // in Node, timerId is an object with .ref()/.unref(), and
	        // its .id field is the actual timer id.
	        if (typeof timerId === "object") {
	            timerId = timerId.id;
	        }
	
	        if (clock.timers.hasOwnProperty(timerId)) {
	            // check that the ID matches a timer of the correct type
	            var timer = clock.timers[timerId];
	            if (timerType(timer) === ttype) {
	                delete clock.timers[timerId];
	            } else {
					throw new Error("Cannot clear timer: timer created with set" + ttype + "() but cleared with clear" + timerType(timer) + "()");
				}
	        }
	    }
	
	    function uninstall(clock, target) {
	        var method,
	            i,
	            l;
	
	        for (i = 0, l = clock.methods.length; i < l; i++) {
	            method = clock.methods[i];
	
	            if (target[method].hadOwnProperty) {
	                target[method] = clock["_" + method];
	            } else {
	                try {
	                    delete target[method];
	                } catch (ignore) {}
	            }
	        }
	
	        // Prevent multiple executions which will completely remove these props
	        clock.methods = [];
	    }
	
	    function hijackMethod(target, method, clock) {
	        var prop;
	
	        clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(target, method);
	        clock["_" + method] = target[method];
	
	        if (method === "Date") {
	            var date = mirrorDateProperties(clock[method], target[method]);
	            target[method] = date;
	        } else {
	            target[method] = function () {
	                return clock[method].apply(clock, arguments);
	            };
	
	            for (prop in clock[method]) {
	                if (clock[method].hasOwnProperty(prop)) {
	                    target[method][prop] = clock[method][prop];
	                }
	            }
	        }
	
	        target[method].clock = clock;
	    }
	
	    var timers = {
	        setTimeout: setTimeout,
	        clearTimeout: clearTimeout,
	        setImmediate: global.setImmediate,
	        clearImmediate: global.clearImmediate,
	        setInterval: setInterval,
	        clearInterval: clearInterval,
	        Date: Date
	    };
	
	    var keys = Object.keys || function (obj) {
	        var ks = [],
	            key;
	
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                ks.push(key);
	            }
	        }
	
	        return ks;
	    };
	
	    exports.timers = timers;
	
	    function createClock(now) {
	        var clock = {
	            now: getEpoch(now),
	            timeouts: {},
	            Date: createDate()
	        };
	
	        clock.Date.clock = clock;
	
	        clock.setTimeout = function setTimeout(func, timeout) {
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 2),
	                delay: timeout
	            });
	        };
	
	        clock.clearTimeout = function clearTimeout(timerId) {
	            return clearTimer(clock, timerId, "Timeout");
	        };
	
	        clock.setInterval = function setInterval(func, timeout) {
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 2),
	                delay: timeout,
	                interval: timeout
	            });
	        };
	
	        clock.clearInterval = function clearInterval(timerId) {
	            return clearTimer(clock, timerId, "Interval");
	        };
	
	        clock.setImmediate = function setImmediate(func) {
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 1),
	                immediate: true
	            });
	        };
	
	        clock.clearImmediate = function clearImmediate(timerId) {
	            return clearTimer(clock, timerId, "Immediate");
	        };
	
	        clock.tick = function tick(ms) {
	            ms = typeof ms === "number" ? ms : parseTime(ms);
	            var tickFrom = clock.now, tickTo = clock.now + ms, previous = clock.now;
	            var timer = firstTimerInRange(clock, tickFrom, tickTo);
	            var oldNow;
	
	            clock.duringTick = true;
	
	            var firstException;
	            while (timer && tickFrom <= tickTo) {
	                if (clock.timers[timer.id]) {
	                    tickFrom = clock.now = timer.callAt;
	                    try {
	                        oldNow = clock.now;
	                        callTimer(clock, timer);
	                        // compensate for any setSystemTime() call during timer callback
	                        if (oldNow !== clock.now) {
	                            tickFrom += clock.now - oldNow;
	                            tickTo += clock.now - oldNow;
	                            previous += clock.now - oldNow;
	                        }
	                    } catch (e) {
	                        firstException = firstException || e;
	                    }
	                }
	
	                timer = firstTimerInRange(clock, previous, tickTo);
	                previous = tickFrom;
	            }
	
	            clock.duringTick = false;
	            clock.now = tickTo;
	
	            if (firstException) {
	                throw firstException;
	            }
	
	            return clock.now;
	        };
	
	        clock.reset = function reset() {
	            clock.timers = {};
	        };
	
	        clock.setSystemTime = function setSystemTime(now) {
	            // determine time difference
	            var newNow = getEpoch(now);
	            var difference = newNow - clock.now;
	
	            // update 'system clock'
	            clock.now = newNow;
	
	            // update timers and intervals to keep them stable
	            for (var id in clock.timers) {
	                if (clock.timers.hasOwnProperty(id)) {
	                    var timer = clock.timers[id];
	                    timer.createdAt += difference;
	                    timer.callAt += difference;
	                }
	            }
	        };
	
	        return clock;
	    }
	    exports.createClock = createClock;
	
	    exports.install = function install(target, now, toFake) {
	        var i,
	            l;
	
	        if (typeof target === "number") {
	            toFake = now;
	            now = target;
	            target = null;
	        }
	
	        if (!target) {
	            target = global;
	        }
	
	        var clock = createClock(now);
	
	        clock.uninstall = function () {
	            uninstall(clock, target);
	        };
	
	        clock.methods = toFake || [];
	
	        if (clock.methods.length === 0) {
	            clock.methods = keys(timers);
	        }
	
	        for (i = 0, l = clock.methods.length; i < l; i++) {
	            hijackMethod(target, clock.methods[i], clock);
	        }
	
	        return clock;
	    };
	
	}(global || this));
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}]},{},[1])(1)
	});
	  })();
	  var define;
	/**
	 * Sinon core utilities. For internal use only.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	var sinon = (function () {
	"use strict";
	 // eslint-disable-line no-unused-vars
	    
	    var sinonModule;
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        sinonModule = module.exports = require("./sinon/util/core");
	        require("./sinon/extend");
	        require("./sinon/walk");
	        require("./sinon/typeOf");
	        require("./sinon/times_in_words");
	        require("./sinon/spy");
	        require("./sinon/call");
	        require("./sinon/behavior");
	        require("./sinon/stub");
	        require("./sinon/mock");
	        require("./sinon/collection");
	        require("./sinon/assert");
	        require("./sinon/sandbox");
	        require("./sinon/test");
	        require("./sinon/test_case");
	        require("./sinon/match");
	        require("./sinon/format");
	        require("./sinon/log_error");
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	        sinonModule = module.exports;
	    } else {
	        sinonModule = {};
	    }
	
	    return sinonModule;
	}());
	
	/**
	 * @depend ../../sinon.js
	 */
	/**
	 * Sinon core utilities. For internal use only.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    var div = typeof document !== "undefined" && document.createElement("div");
	    var hasOwn = Object.prototype.hasOwnProperty;
	
	    function isDOMNode(obj) {
	        var success = false;
	
	        try {
	            obj.appendChild(div);
	            success = div.parentNode === obj;
	        } catch (e) {
	            return false;
	        } finally {
	            try {
	                obj.removeChild(div);
	            } catch (e) {
	                // Remove failed, not much we can do about that
	            }
	        }
	
	        return success;
	    }
	
	    function isElement(obj) {
	        return div && obj && obj.nodeType === 1 && isDOMNode(obj);
	    }
	
	    function isFunction(obj) {
	        return typeof obj === "function" || !!(obj && obj.constructor && obj.call && obj.apply);
	    }
	
	    function isReallyNaN(val) {
	        return typeof val === "number" && isNaN(val);
	    }
	
	    function mirrorProperties(target, source) {
	        for (var prop in source) {
	            if (!hasOwn.call(target, prop)) {
	                target[prop] = source[prop];
	            }
	        }
	    }
	
	    function isRestorable(obj) {
	        return typeof obj === "function" && typeof obj.restore === "function" && obj.restore.sinon;
	    }
	
	    // Cheap way to detect if we have ES5 support.
	    var hasES5Support = "keys" in Object;
	
	    function makeApi(sinon) {
	        sinon.wrapMethod = function wrapMethod(object, property, method) {
	            if (!object) {
	                throw new TypeError("Should wrap property of object");
	            }
	
	            if (typeof method !== "function" && typeof method !== "object") {
	                throw new TypeError("Method wrapper should be a function or a property descriptor");
	            }
	
	            function checkWrappedMethod(wrappedMethod) {
	                var error;
	
	                if (!isFunction(wrappedMethod)) {
	                    error = new TypeError("Attempted to wrap " + (typeof wrappedMethod) + " property " +
	                                        property + " as function");
	                } else if (wrappedMethod.restore && wrappedMethod.restore.sinon) {
	                    error = new TypeError("Attempted to wrap " + property + " which is already wrapped");
	                } else if (wrappedMethod.calledBefore) {
	                    var verb = wrappedMethod.returns ? "stubbed" : "spied on";
	                    error = new TypeError("Attempted to wrap " + property + " which is already " + verb);
	                }
	
	                if (error) {
	                    if (wrappedMethod && wrappedMethod.stackTrace) {
	                        error.stack += "\n--------------\n" + wrappedMethod.stackTrace;
	                    }
	                    throw error;
	                }
	            }
	
	            var error, wrappedMethod, i;
	
	            function simplePropertyAssignment() {
	                wrappedMethod = object[property];
	                checkWrappedMethod(wrappedMethod);
	                object[property] = method;
	                method.displayName = property;
	            }
	
	            // IE 8 does not support hasOwnProperty on the window object and Firefox has a problem
	            // when using hasOwn.call on objects from other frames.
	            var owned = object.hasOwnProperty ? object.hasOwnProperty(property) : hasOwn.call(object, property);
	
	            if (hasES5Support) {
	                var methodDesc = (typeof method === "function") ? {value: method} : method;
	                var wrappedMethodDesc = sinon.getPropertyDescriptor(object, property);
	
	                if (!wrappedMethodDesc) {
	                    error = new TypeError("Attempted to wrap " + (typeof wrappedMethod) + " property " +
	                                        property + " as function");
	                } else if (wrappedMethodDesc.restore && wrappedMethodDesc.restore.sinon) {
	                    error = new TypeError("Attempted to wrap " + property + " which is already wrapped");
	                }
	                if (error) {
	                    if (wrappedMethodDesc && wrappedMethodDesc.stackTrace) {
	                        error.stack += "\n--------------\n" + wrappedMethodDesc.stackTrace;
	                    }
	                    throw error;
	                }
	
	                var types = sinon.objectKeys(methodDesc);
	                for (i = 0; i < types.length; i++) {
	                    wrappedMethod = wrappedMethodDesc[types[i]];
	                    checkWrappedMethod(wrappedMethod);
	                }
	
	                mirrorProperties(methodDesc, wrappedMethodDesc);
	                for (i = 0; i < types.length; i++) {
	                    mirrorProperties(methodDesc[types[i]], wrappedMethodDesc[types[i]]);
	                }
	                Object.defineProperty(object, property, methodDesc);
	
	                // catch failing assignment
	                // this is the converse of the check in `.restore` below
	                if ( typeof method === "function" && object[property] !== method ) {
	                    // correct any wrongdoings caused by the defineProperty call above,
	                    // such as adding new items (if object was a Storage object)
	                    delete object[property];
	                    simplePropertyAssignment();
	                }
	            } else {
	                simplePropertyAssignment();
	            }
	
	            method.displayName = property;
	
	            // Set up a stack trace which can be used later to find what line of
	            // code the original method was created on.
	            method.stackTrace = (new Error("Stack Trace for original")).stack;
	
	            method.restore = function () {
	                // For prototype properties try to reset by delete first.
	                // If this fails (ex: localStorage on mobile safari) then force a reset
	                // via direct assignment.
	                if (!owned) {
	                    // In some cases `delete` may throw an error
	                    try {
	                        delete object[property];
	                    } catch (e) {} // eslint-disable-line no-empty
	                    // For native code functions `delete` fails without throwing an error
	                    // on Chrome < 43, PhantomJS, etc.
	                } else if (hasES5Support) {
	                    Object.defineProperty(object, property, wrappedMethodDesc);
	                }
	
	                // Use strict equality comparison to check failures then force a reset
	                // via direct assignment.
	                if (object[property] === method) {
	                    object[property] = wrappedMethod;
	                }
	            };
	
	            method.restore.sinon = true;
	
	            if (!hasES5Support) {
	                mirrorProperties(method, wrappedMethod);
	            }
	
	            return method;
	        };
	
	        sinon.create = function create(proto) {
	            var F = function () {};
	            F.prototype = proto;
	            return new F();
	        };
	
	        sinon.deepEqual = function deepEqual(a, b) {
	            if (sinon.match && sinon.match.isMatcher(a)) {
	                return a.test(b);
	            }
	
	            if (typeof a !== "object" || typeof b !== "object") {
	                return isReallyNaN(a) && isReallyNaN(b) || a === b;
	            }
	
	            if (isElement(a) || isElement(b)) {
	                return a === b;
	            }
	
	            if (a === b) {
	                return true;
	            }
	
	            if ((a === null && b !== null) || (a !== null && b === null)) {
	                return false;
	            }
	
	            if (a instanceof RegExp && b instanceof RegExp) {
	                return (a.source === b.source) && (a.global === b.global) &&
	                    (a.ignoreCase === b.ignoreCase) && (a.multiline === b.multiline);
	            }
	
	            var aString = Object.prototype.toString.call(a);
	            if (aString !== Object.prototype.toString.call(b)) {
	                return false;
	            }
	
	            if (aString === "[object Date]") {
	                return a.valueOf() === b.valueOf();
	            }
	
	            var prop;
	            var aLength = 0;
	            var bLength = 0;
	
	            if (aString === "[object Array]" && a.length !== b.length) {
	                return false;
	            }
	
	            for (prop in a) {
	                if (hasOwn.call(a, prop)) {
	                    aLength += 1;
	
	                    if (!(prop in b)) {
	                        return false;
	                    }
	
	                    if (!deepEqual(a[prop], b[prop])) {
	                        return false;
	                    }
	                }
	            }
	
	            for (prop in b) {
	                if (hasOwn.call(b, prop)) {
	                    bLength += 1;
	                }
	            }
	
	            return aLength === bLength;
	        };
	
	        sinon.functionName = function functionName(func) {
	            var name = func.displayName || func.name;
	
	            // Use function decomposition as a last resort to get function
	            // name. Does not rely on function decomposition to work - if it
	            // doesn't debugging will be slightly less informative
	            // (i.e. toString will say 'spy' rather than 'myFunc').
	            if (!name) {
	                var matches = func.toString().match(/function ([^\s\(]+)/);
	                name = matches && matches[1];
	            }
	
	            return name;
	        };
	
	        sinon.functionToString = function toString() {
	            if (this.getCall && this.callCount) {
	                var thisValue,
	                    prop;
	                var i = this.callCount;
	
	                while (i--) {
	                    thisValue = this.getCall(i).thisValue;
	
	                    for (prop in thisValue) {
	                        if (thisValue[prop] === this) {
	                            return prop;
	                        }
	                    }
	                }
	            }
	
	            return this.displayName || "sinon fake";
	        };
	
	        sinon.objectKeys = function objectKeys(obj) {
	            if (obj !== Object(obj)) {
	                throw new TypeError("sinon.objectKeys called on a non-object");
	            }
	
	            var keys = [];
	            var key;
	            for (key in obj) {
	                if (hasOwn.call(obj, key)) {
	                    keys.push(key);
	                }
	            }
	
	            return keys;
	        };
	
	        sinon.getPropertyDescriptor = function getPropertyDescriptor(object, property) {
	            var proto = object;
	            var descriptor;
	
	            while (proto && !(descriptor = Object.getOwnPropertyDescriptor(proto, property))) {
	                proto = Object.getPrototypeOf(proto);
	            }
	            return descriptor;
	        };
	
	        sinon.getConfig = function (custom) {
	            var config = {};
	            custom = custom || {};
	            var defaults = sinon.defaultConfig;
	
	            for (var prop in defaults) {
	                if (defaults.hasOwnProperty(prop)) {
	                    config[prop] = custom.hasOwnProperty(prop) ? custom[prop] : defaults[prop];
	                }
	            }
	
	            return config;
	        };
	
	        sinon.defaultConfig = {
	            injectIntoThis: true,
	            injectInto: null,
	            properties: ["spy", "stub", "mock", "clock", "server", "requests"],
	            useFakeTimers: true,
	            useFakeServer: true
	        };
	
	        sinon.timesInWords = function timesInWords(count) {
	            return count === 1 && "once" ||
	                count === 2 && "twice" ||
	                count === 3 && "thrice" ||
	                (count || 0) + " times";
	        };
	
	        sinon.calledInOrder = function (spies) {
	            for (var i = 1, l = spies.length; i < l; i++) {
	                if (!spies[i - 1].calledBefore(spies[i]) || !spies[i].called) {
	                    return false;
	                }
	            }
	
	            return true;
	        };
	
	        sinon.orderByFirstCall = function (spies) {
	            return spies.sort(function (a, b) {
	                // uuid, won't ever be equal
	                var aCall = a.getCall(0);
	                var bCall = b.getCall(0);
	                var aId = aCall && aCall.callId || -1;
	                var bId = bCall && bCall.callId || -1;
	
	                return aId < bId ? -1 : 1;
	            });
	        };
	
	        sinon.createStubInstance = function (constructor) {
	            if (typeof constructor !== "function") {
	                throw new TypeError("The constructor should be a function.");
	            }
	            return sinon.stub(sinon.create(constructor.prototype));
	        };
	
	        sinon.restore = function (object) {
	            if (object !== null && typeof object === "object") {
	                for (var prop in object) {
	                    if (isRestorable(object[prop])) {
	                        object[prop].restore();
	                    }
	                }
	            } else if (isRestorable(object)) {
	                object.restore();
	            }
	        };
	
	        return sinon;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports) {
	        makeApi(exports);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	
	        // Adapted from https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	        var hasDontEnumBug = (function () {
	            var obj = {
	                constructor: function () {
	                    return "0";
	                },
	                toString: function () {
	                    return "1";
	                },
	                valueOf: function () {
	                    return "2";
	                },
	                toLocaleString: function () {
	                    return "3";
	                },
	                prototype: function () {
	                    return "4";
	                },
	                isPrototypeOf: function () {
	                    return "5";
	                },
	                propertyIsEnumerable: function () {
	                    return "6";
	                },
	                hasOwnProperty: function () {
	                    return "7";
	                },
	                length: function () {
	                    return "8";
	                },
	                unique: function () {
	                    return "9";
	                }
	            };
	
	            var result = [];
	            for (var prop in obj) {
	                if (obj.hasOwnProperty(prop)) {
	                    result.push(obj[prop]());
	                }
	            }
	            return result.join("") !== "0123456789";
	        })();
	
	        /* Public: Extend target in place with all (own) properties from sources in-order. Thus, last source will
	         *         override properties in previous sources.
	         *
	         * target - The Object to extend
	         * sources - Objects to copy properties from.
	         *
	         * Returns the extended target
	         */
	        function extend(target /*, sources */) {
	            var sources = Array.prototype.slice.call(arguments, 1);
	            var source, i, prop;
	
	            for (i = 0; i < sources.length; i++) {
	                source = sources[i];
	
	                for (prop in source) {
	                    if (source.hasOwnProperty(prop)) {
	                        target[prop] = source[prop];
	                    }
	                }
	
	                // Make sure we copy (own) toString method even when in JScript with DontEnum bug
	                // See https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	                if (hasDontEnumBug && source.hasOwnProperty("toString") && source.toString !== target.toString) {
	                    target.toString = source.toString;
	                }
	            }
	
	            return target;
	        }
	
	        sinon.extend = extend;
	        return sinon.extend;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	
	        function timesInWords(count) {
	            switch (count) {
	                case 1:
	                    return "once";
	                case 2:
	                    return "twice";
	                case 3:
	                    return "thrice";
	                default:
	                    return (count || 0) + " times";
	            }
	        }
	
	        sinon.timesInWords = timesInWords;
	        return sinon.timesInWords;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        module.exports = makeApi(core);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	/**
	 * Format functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function typeOf(value) {
	            if (value === null) {
	                return "null";
	            } else if (value === undefined) {
	                return "undefined";
	            }
	            var string = Object.prototype.toString.call(value);
	            return string.substring(8, string.length - 1).toLowerCase();
	        }
	
	        sinon.typeOf = typeOf;
	        return sinon.typeOf;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        module.exports = makeApi(core);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend typeOf.js
	 */
	/*jslint eqeqeq: false, onevar: false, plusplus: false*/
	/*global module, require, sinon*/
	/**
	 * Match functions
	 *
	 * @author Maximilian Antoni (mail@maxantoni.de)
	 * @license BSD
	 *
	 * Copyright (c) 2012 Maximilian Antoni
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function assertType(value, type, name) {
	            var actual = sinon.typeOf(value);
	            if (actual !== type) {
	                throw new TypeError("Expected type of " + name + " to be " +
	                    type + ", but was " + actual);
	            }
	        }
	
	        var matcher = {
	            toString: function () {
	                return this.message;
	            }
	        };
	
	        function isMatcher(object) {
	            return matcher.isPrototypeOf(object);
	        }
	
	        function matchObject(expectation, actual) {
	            if (actual === null || actual === undefined) {
	                return false;
	            }
	            for (var key in expectation) {
	                if (expectation.hasOwnProperty(key)) {
	                    var exp = expectation[key];
	                    var act = actual[key];
	                    if (isMatcher(exp)) {
	                        if (!exp.test(act)) {
	                            return false;
	                        }
	                    } else if (sinon.typeOf(exp) === "object") {
	                        if (!matchObject(exp, act)) {
	                            return false;
	                        }
	                    } else if (!sinon.deepEqual(exp, act)) {
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	
	        function match(expectation, message) {
	            var m = sinon.create(matcher);
	            var type = sinon.typeOf(expectation);
	            switch (type) {
	            case "object":
	                if (typeof expectation.test === "function") {
	                    m.test = function (actual) {
	                        return expectation.test(actual) === true;
	                    };
	                    m.message = "match(" + sinon.functionName(expectation.test) + ")";
	                    return m;
	                }
	                var str = [];
	                for (var key in expectation) {
	                    if (expectation.hasOwnProperty(key)) {
	                        str.push(key + ": " + expectation[key]);
	                    }
	                }
	                m.test = function (actual) {
	                    return matchObject(expectation, actual);
	                };
	                m.message = "match(" + str.join(", ") + ")";
	                break;
	            case "number":
	                m.test = function (actual) {
	                    // we need type coercion here
	                    return expectation == actual; // eslint-disable-line eqeqeq
	                };
	                break;
	            case "string":
	                m.test = function (actual) {
	                    if (typeof actual !== "string") {
	                        return false;
	                    }
	                    return actual.indexOf(expectation) !== -1;
	                };
	                m.message = "match(\"" + expectation + "\")";
	                break;
	            case "regexp":
	                m.test = function (actual) {
	                    if (typeof actual !== "string") {
	                        return false;
	                    }
	                    return expectation.test(actual);
	                };
	                break;
	            case "function":
	                m.test = expectation;
	                if (message) {
	                    m.message = message;
	                } else {
	                    m.message = "match(" + sinon.functionName(expectation) + ")";
	                }
	                break;
	            default:
	                m.test = function (actual) {
	                    return sinon.deepEqual(expectation, actual);
	                };
	            }
	            if (!m.message) {
	                m.message = "match(" + expectation + ")";
	            }
	            return m;
	        }
	
	        matcher.or = function (m2) {
	            if (!arguments.length) {
	                throw new TypeError("Matcher expected");
	            } else if (!isMatcher(m2)) {
	                m2 = match(m2);
	            }
	            var m1 = this;
	            var or = sinon.create(matcher);
	            or.test = function (actual) {
	                return m1.test(actual) || m2.test(actual);
	            };
	            or.message = m1.message + ".or(" + m2.message + ")";
	            return or;
	        };
	
	        matcher.and = function (m2) {
	            if (!arguments.length) {
	                throw new TypeError("Matcher expected");
	            } else if (!isMatcher(m2)) {
	                m2 = match(m2);
	            }
	            var m1 = this;
	            var and = sinon.create(matcher);
	            and.test = function (actual) {
	                return m1.test(actual) && m2.test(actual);
	            };
	            and.message = m1.message + ".and(" + m2.message + ")";
	            return and;
	        };
	
	        match.isMatcher = isMatcher;
	
	        match.any = match(function () {
	            return true;
	        }, "any");
	
	        match.defined = match(function (actual) {
	            return actual !== null && actual !== undefined;
	        }, "defined");
	
	        match.truthy = match(function (actual) {
	            return !!actual;
	        }, "truthy");
	
	        match.falsy = match(function (actual) {
	            return !actual;
	        }, "falsy");
	
	        match.same = function (expectation) {
	            return match(function (actual) {
	                return expectation === actual;
	            }, "same(" + expectation + ")");
	        };
	
	        match.typeOf = function (type) {
	            assertType(type, "string", "type");
	            return match(function (actual) {
	                return sinon.typeOf(actual) === type;
	            }, "typeOf(\"" + type + "\")");
	        };
	
	        match.instanceOf = function (type) {
	            assertType(type, "function", "type");
	            return match(function (actual) {
	                return actual instanceof type;
	            }, "instanceOf(" + sinon.functionName(type) + ")");
	        };
	
	        function createPropertyMatcher(propertyTest, messagePrefix) {
	            return function (property, value) {
	                assertType(property, "string", "property");
	                var onlyProperty = arguments.length === 1;
	                var message = messagePrefix + "(\"" + property + "\"";
	                if (!onlyProperty) {
	                    message += ", " + value;
	                }
	                message += ")";
	                return match(function (actual) {
	                    if (actual === undefined || actual === null ||
	                            !propertyTest(actual, property)) {
	                        return false;
	                    }
	                    return onlyProperty || sinon.deepEqual(value, actual[property]);
	                }, message);
	            };
	        }
	
	        match.has = createPropertyMatcher(function (actual, property) {
	            if (typeof actual === "object") {
	                return property in actual;
	            }
	            return actual[property] !== undefined;
	        }, "has");
	
	        match.hasOwn = createPropertyMatcher(function (actual, property) {
	            return actual.hasOwnProperty(property);
	        }, "hasOwn");
	
	        match.bool = match.typeOf("boolean");
	        match.number = match.typeOf("number");
	        match.string = match.typeOf("string");
	        match.object = match.typeOf("object");
	        match.func = match.typeOf("function");
	        match.array = match.typeOf("array");
	        match.regexp = match.typeOf("regexp");
	        match.date = match.typeOf("date");
	
	        sinon.match = match;
	        return match;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./typeOf");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	/**
	 * Format functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	(function (sinonGlobal, formatio) {
	    
	    function makeApi(sinon) {
	        function valueFormatter(value) {
	            return "" + value;
	        }
	
	        function getFormatioFormatter() {
	            var formatter = formatio.configure({
	                    quoteStrings: false,
	                    limitChildrenCount: 250
	                });
	
	            function format() {
	                return formatter.ascii.apply(formatter, arguments);
	            }
	
	            return format;
	        }
	
	        function getNodeFormatter() {
	            try {
	                var util = require("util");
	            } catch (e) {
	                /* Node, but no util module - would be very old, but better safe than sorry */
	            }
	
	            function format(v) {
	                var isObjectWithNativeToString = typeof v === "object" && v.toString === Object.prototype.toString;
	                return isObjectWithNativeToString ? util.inspect(v) : v;
	            }
	
	            return util ? format : valueFormatter;
	        }
	
	        var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	        var formatter;
	
	        if (isNode) {
	            try {
	                formatio = require("formatio");
	            }
	            catch (e) {} // eslint-disable-line no-empty
	        }
	
	        if (formatio) {
	            formatter = getFormatioFormatter();
	        } else if (isNode) {
	            formatter = getNodeFormatter();
	        } else {
	            formatter = valueFormatter;
	        }
	
	        sinon.format = formatter;
	        return sinon.format;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon, // eslint-disable-line no-undef
	    typeof formatio === "object" && formatio // eslint-disable-line no-undef
	));
	
	/**
	  * @depend util/core.js
	  * @depend match.js
	  * @depend format.js
	  */
	/**
	  * Spy calls
	  *
	  * @author Christian Johansen (christian@cjohansen.no)
	  * @author Maximilian Antoni (mail@maxantoni.de)
	  * @license BSD
	  *
	  * Copyright (c) 2010-2013 Christian Johansen
	  * Copyright (c) 2013 Maximilian Antoni
	  */
	(function (sinonGlobal) {
	    
	    var slice = Array.prototype.slice;
	
	    function makeApi(sinon) {
	        function throwYieldError(proxy, text, args) {
	            var msg = sinon.functionName(proxy) + text;
	            if (args.length) {
	                msg += " Received [" + slice.call(args).join(", ") + "]";
	            }
	            throw new Error(msg);
	        }
	
	        var callProto = {
	            calledOn: function calledOn(thisValue) {
	                if (sinon.match && sinon.match.isMatcher(thisValue)) {
	                    return thisValue.test(this.thisValue);
	                }
	                return this.thisValue === thisValue;
	            },
	
	            calledWith: function calledWith() {
	                var l = arguments.length;
	                if (l > this.args.length) {
	                    return false;
	                }
	                for (var i = 0; i < l; i += 1) {
	                    if (!sinon.deepEqual(arguments[i], this.args[i])) {
	                        return false;
	                    }
	                }
	
	                return true;
	            },
	
	            calledWithMatch: function calledWithMatch() {
	                var l = arguments.length;
	                if (l > this.args.length) {
	                    return false;
	                }
	                for (var i = 0; i < l; i += 1) {
	                    var actual = this.args[i];
	                    var expectation = arguments[i];
	                    if (!sinon.match || !sinon.match(expectation).test(actual)) {
	                        return false;
	                    }
	                }
	                return true;
	            },
	
	            calledWithExactly: function calledWithExactly() {
	                return arguments.length === this.args.length &&
	                    this.calledWith.apply(this, arguments);
	            },
	
	            notCalledWith: function notCalledWith() {
	                return !this.calledWith.apply(this, arguments);
	            },
	
	            notCalledWithMatch: function notCalledWithMatch() {
	                return !this.calledWithMatch.apply(this, arguments);
	            },
	
	            returned: function returned(value) {
	                return sinon.deepEqual(value, this.returnValue);
	            },
	
	            threw: function threw(error) {
	                if (typeof error === "undefined" || !this.exception) {
	                    return !!this.exception;
	                }
	
	                return this.exception === error || this.exception.name === error;
	            },
	
	            calledWithNew: function calledWithNew() {
	                return this.proxy.prototype && this.thisValue instanceof this.proxy;
	            },
	
	            calledBefore: function (other) {
	                return this.callId < other.callId;
	            },
	
	            calledAfter: function (other) {
	                return this.callId > other.callId;
	            },
	
	            callArg: function (pos) {
	                this.args[pos]();
	            },
	
	            callArgOn: function (pos, thisValue) {
	                this.args[pos].apply(thisValue);
	            },
	
	            callArgWith: function (pos) {
	                this.callArgOnWith.apply(this, [pos, null].concat(slice.call(arguments, 1)));
	            },
	
	            callArgOnWith: function (pos, thisValue) {
	                var args = slice.call(arguments, 2);
	                this.args[pos].apply(thisValue, args);
	            },
	
	            "yield": function () {
	                this.yieldOn.apply(this, [null].concat(slice.call(arguments, 0)));
	            },
	
	            yieldOn: function (thisValue) {
	                var args = this.args;
	                for (var i = 0, l = args.length; i < l; ++i) {
	                    if (typeof args[i] === "function") {
	                        args[i].apply(thisValue, slice.call(arguments, 1));
	                        return;
	                    }
	                }
	                throwYieldError(this.proxy, " cannot yield since no callback was passed.", args);
	            },
	
	            yieldTo: function (prop) {
	                this.yieldToOn.apply(this, [prop, null].concat(slice.call(arguments, 1)));
	            },
	
	            yieldToOn: function (prop, thisValue) {
	                var args = this.args;
	                for (var i = 0, l = args.length; i < l; ++i) {
	                    if (args[i] && typeof args[i][prop] === "function") {
	                        args[i][prop].apply(thisValue, slice.call(arguments, 2));
	                        return;
	                    }
	                }
	                throwYieldError(this.proxy, " cannot yield to '" + prop +
	                    "' since no callback was passed.", args);
	            },
	
	            getStackFrames: function () {
	                // Omit the error message and the two top stack frames in sinon itself:
	                return this.stack && this.stack.split("\n").slice(3);
	            },
	
	            toString: function () {
	                var callStr = this.proxy ? this.proxy.toString() + "(" : "";
	                var args = [];
	
	                if (!this.args) {
	                    return ":(";
	                }
	
	                for (var i = 0, l = this.args.length; i < l; ++i) {
	                    args.push(sinon.format(this.args[i]));
	                }
	
	                callStr = callStr + args.join(", ") + ")";
	
	                if (typeof this.returnValue !== "undefined") {
	                    callStr += " => " + sinon.format(this.returnValue);
	                }
	
	                if (this.exception) {
	                    callStr += " !" + this.exception.name;
	
	                    if (this.exception.message) {
	                        callStr += "(" + this.exception.message + ")";
	                    }
	                }
	                if (this.stack) {
	                    callStr += this.getStackFrames()[0].replace(/^\s*(?:at\s+|@)?/, " at ");
	
	                }
	
	                return callStr;
	            }
	        };
	
	        callProto.invokeCallback = callProto.yield;
	
	        function createSpyCall(spy, thisValue, args, returnValue, exception, id, stack) {
	            if (typeof id !== "number") {
	                throw new TypeError("Call id is not a number");
	            }
	            var proxyCall = sinon.create(callProto);
	            proxyCall.proxy = spy;
	            proxyCall.thisValue = thisValue;
	            proxyCall.args = args;
	            proxyCall.returnValue = returnValue;
	            proxyCall.exception = exception;
	            proxyCall.callId = id;
	            proxyCall.stack = stack;
	
	            return proxyCall;
	        }
	        createSpyCall.toString = callProto.toString; // used by mocks
	
	        sinon.spyCall = createSpyCall;
	        return createSpyCall;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./match");
	        require("./format");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	  * @depend times_in_words.js
	  * @depend util/core.js
	  * @depend extend.js
	  * @depend call.js
	  * @depend format.js
	  */
	/**
	  * Spy functions
	  *
	  * @author Christian Johansen (christian@cjohansen.no)
	  * @license BSD
	  *
	  * Copyright (c) 2010-2013 Christian Johansen
	  */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var push = Array.prototype.push;
	        var slice = Array.prototype.slice;
	        var callId = 0;
	
	        function spy(object, property, types) {
	            if (!property && typeof object === "function") {
	                return spy.create(object);
	            }
	
	            if (!object && !property) {
	                return spy.create(function () { });
	            }
	
	            if (types) {
	                var methodDesc = sinon.getPropertyDescriptor(object, property);
	                for (var i = 0; i < types.length; i++) {
	                    methodDesc[types[i]] = spy.create(methodDesc[types[i]]);
	                }
	                return sinon.wrapMethod(object, property, methodDesc);
	            }
	
	            return sinon.wrapMethod(object, property, spy.create(object[property]));
	        }
	
	        function matchingFake(fakes, args, strict) {
	            if (!fakes) {
	                return undefined;
	            }
	
	            for (var i = 0, l = fakes.length; i < l; i++) {
	                if (fakes[i].matches(args, strict)) {
	                    return fakes[i];
	                }
	            }
	        }
	
	        function incrementCallCount() {
	            this.called = true;
	            this.callCount += 1;
	            this.notCalled = false;
	            this.calledOnce = this.callCount === 1;
	            this.calledTwice = this.callCount === 2;
	            this.calledThrice = this.callCount === 3;
	        }
	
	        function createCallProperties() {
	            this.firstCall = this.getCall(0);
	            this.secondCall = this.getCall(1);
	            this.thirdCall = this.getCall(2);
	            this.lastCall = this.getCall(this.callCount - 1);
	        }
	
	        var vars = "a,b,c,d,e,f,g,h,i,j,k,l";
	        function createProxy(func, proxyLength) {
	            // Retain the function length:
	            var p;
	            if (proxyLength) {
	                eval("p = (function proxy(" + vars.substring(0, proxyLength * 2 - 1) + // eslint-disable-line no-eval
	                    ") { return p.invoke(func, this, slice.call(arguments)); });");
	            } else {
	                p = function proxy() {
	                    return p.invoke(func, this, slice.call(arguments));
	                };
	            }
	            p.isSinonProxy = true;
	            return p;
	        }
	
	        var uuid = 0;
	
	        // Public API
	        var spyApi = {
	            reset: function () {
	                if (this.invoking) {
	                    var err = new Error("Cannot reset Sinon function while invoking it. " +
	                                        "Move the call to .reset outside of the callback.");
	                    err.name = "InvalidResetException";
	                    throw err;
	                }
	
	                this.called = false;
	                this.notCalled = true;
	                this.calledOnce = false;
	                this.calledTwice = false;
	                this.calledThrice = false;
	                this.callCount = 0;
	                this.firstCall = null;
	                this.secondCall = null;
	                this.thirdCall = null;
	                this.lastCall = null;
	                this.args = [];
	                this.returnValues = [];
	                this.thisValues = [];
	                this.exceptions = [];
	                this.callIds = [];
	                this.stacks = [];
	                if (this.fakes) {
	                    for (var i = 0; i < this.fakes.length; i++) {
	                        this.fakes[i].reset();
	                    }
	                }
	
	                return this;
	            },
	
	            create: function create(func, spyLength) {
	                var name;
	
	                if (typeof func !== "function") {
	                    func = function () { };
	                } else {
	                    name = sinon.functionName(func);
	                }
	
	                if (!spyLength) {
	                    spyLength = func.length;
	                }
	
	                var proxy = createProxy(func, spyLength);
	
	                sinon.extend(proxy, spy);
	                delete proxy.create;
	                sinon.extend(proxy, func);
	
	                proxy.reset();
	                proxy.prototype = func.prototype;
	                proxy.displayName = name || "spy";
	                proxy.toString = sinon.functionToString;
	                proxy.instantiateFake = sinon.spy.create;
	                proxy.id = "spy#" + uuid++;
	
	                return proxy;
	            },
	
	            invoke: function invoke(func, thisValue, args) {
	                var matching = matchingFake(this.fakes, args);
	                var exception, returnValue;
	
	                incrementCallCount.call(this);
	                push.call(this.thisValues, thisValue);
	                push.call(this.args, args);
	                push.call(this.callIds, callId++);
	
	                // Make call properties available from within the spied function:
	                createCallProperties.call(this);
	
	                try {
	                    this.invoking = true;
	
	                    if (matching) {
	                        returnValue = matching.invoke(func, thisValue, args);
	                    } else {
	                        returnValue = (this.func || func).apply(thisValue, args);
	                    }
	
	                    var thisCall = this.getCall(this.callCount - 1);
	                    if (thisCall.calledWithNew() && typeof returnValue !== "object") {
	                        returnValue = thisValue;
	                    }
	                } catch (e) {
	                    exception = e;
	                } finally {
	                    delete this.invoking;
	                }
	
	                push.call(this.exceptions, exception);
	                push.call(this.returnValues, returnValue);
	                push.call(this.stacks, new Error().stack);
	
	                // Make return value and exception available in the calls:
	                createCallProperties.call(this);
	
	                if (exception !== undefined) {
	                    throw exception;
	                }
	
	                return returnValue;
	            },
	
	            named: function named(name) {
	                this.displayName = name;
	                return this;
	            },
	
	            getCall: function getCall(i) {
	                if (i < 0 || i >= this.callCount) {
	                    return null;
	                }
	
	                return sinon.spyCall(this, this.thisValues[i], this.args[i],
	                                        this.returnValues[i], this.exceptions[i],
	                                        this.callIds[i], this.stacks[i]);
	            },
	
	            getCalls: function () {
	                var calls = [];
	                var i;
	
	                for (i = 0; i < this.callCount; i++) {
	                    calls.push(this.getCall(i));
	                }
	
	                return calls;
	            },
	
	            calledBefore: function calledBefore(spyFn) {
	                if (!this.called) {
	                    return false;
	                }
	
	                if (!spyFn.called) {
	                    return true;
	                }
	
	                return this.callIds[0] < spyFn.callIds[spyFn.callIds.length - 1];
	            },
	
	            calledAfter: function calledAfter(spyFn) {
	                if (!this.called || !spyFn.called) {
	                    return false;
	                }
	
	                return this.callIds[this.callCount - 1] > spyFn.callIds[spyFn.callCount - 1];
	            },
	
	            withArgs: function () {
	                var args = slice.call(arguments);
	
	                if (this.fakes) {
	                    var match = matchingFake(this.fakes, args, true);
	
	                    if (match) {
	                        return match;
	                    }
	                } else {
	                    this.fakes = [];
	                }
	
	                var original = this;
	                var fake = this.instantiateFake();
	                fake.matchingAguments = args;
	                fake.parent = this;
	                push.call(this.fakes, fake);
	
	                fake.withArgs = function () {
	                    return original.withArgs.apply(original, arguments);
	                };
	
	                for (var i = 0; i < this.args.length; i++) {
	                    if (fake.matches(this.args[i])) {
	                        incrementCallCount.call(fake);
	                        push.call(fake.thisValues, this.thisValues[i]);
	                        push.call(fake.args, this.args[i]);
	                        push.call(fake.returnValues, this.returnValues[i]);
	                        push.call(fake.exceptions, this.exceptions[i]);
	                        push.call(fake.callIds, this.callIds[i]);
	                    }
	                }
	                createCallProperties.call(fake);
	
	                return fake;
	            },
	
	            matches: function (args, strict) {
	                var margs = this.matchingAguments;
	
	                if (margs.length <= args.length &&
	                    sinon.deepEqual(margs, args.slice(0, margs.length))) {
	                    return !strict || margs.length === args.length;
	                }
	            },
	
	            printf: function (format) {
	                var spyInstance = this;
	                var args = slice.call(arguments, 1);
	                var formatter;
	
	                return (format || "").replace(/%(.)/g, function (match, specifyer) {
	                    formatter = spyApi.formatters[specifyer];
	
	                    if (typeof formatter === "function") {
	                        return formatter.call(null, spyInstance, args);
	                    } else if (!isNaN(parseInt(specifyer, 10))) {
	                        return sinon.format(args[specifyer - 1]);
	                    }
	
	                    return "%" + specifyer;
	                });
	            }
	        };
	
	        function delegateToCalls(method, matchAny, actual, notCalled) {
	            spyApi[method] = function () {
	                if (!this.called) {
	                    if (notCalled) {
	                        return notCalled.apply(this, arguments);
	                    }
	                    return false;
	                }
	
	                var currentCall;
	                var matches = 0;
	
	                for (var i = 0, l = this.callCount; i < l; i += 1) {
	                    currentCall = this.getCall(i);
	
	                    if (currentCall[actual || method].apply(currentCall, arguments)) {
	                        matches += 1;
	
	                        if (matchAny) {
	                            return true;
	                        }
	                    }
	                }
	
	                return matches === this.callCount;
	            };
	        }
	
	        delegateToCalls("calledOn", true);
	        delegateToCalls("alwaysCalledOn", false, "calledOn");
	        delegateToCalls("calledWith", true);
	        delegateToCalls("calledWithMatch", true);
	        delegateToCalls("alwaysCalledWith", false, "calledWith");
	        delegateToCalls("alwaysCalledWithMatch", false, "calledWithMatch");
	        delegateToCalls("calledWithExactly", true);
	        delegateToCalls("alwaysCalledWithExactly", false, "calledWithExactly");
	        delegateToCalls("neverCalledWith", false, "notCalledWith", function () {
	            return true;
	        });
	        delegateToCalls("neverCalledWithMatch", false, "notCalledWithMatch", function () {
	            return true;
	        });
	        delegateToCalls("threw", true);
	        delegateToCalls("alwaysThrew", false, "threw");
	        delegateToCalls("returned", true);
	        delegateToCalls("alwaysReturned", false, "returned");
	        delegateToCalls("calledWithNew", true);
	        delegateToCalls("alwaysCalledWithNew", false, "calledWithNew");
	        delegateToCalls("callArg", false, "callArgWith", function () {
	            throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
	        });
	        spyApi.callArgWith = spyApi.callArg;
	        delegateToCalls("callArgOn", false, "callArgOnWith", function () {
	            throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
	        });
	        spyApi.callArgOnWith = spyApi.callArgOn;
	        delegateToCalls("yield", false, "yield", function () {
	            throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
	        });
	        // "invokeCallback" is an alias for "yield" since "yield" is invalid in strict mode.
	        spyApi.invokeCallback = spyApi.yield;
	        delegateToCalls("yieldOn", false, "yieldOn", function () {
	            throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
	        });
	        delegateToCalls("yieldTo", false, "yieldTo", function (property) {
	            throw new Error(this.toString() + " cannot yield to '" + property +
	                "' since it was not yet invoked.");
	        });
	        delegateToCalls("yieldToOn", false, "yieldToOn", function (property) {
	            throw new Error(this.toString() + " cannot yield to '" + property +
	                "' since it was not yet invoked.");
	        });
	
	        spyApi.formatters = {
	            c: function (spyInstance) {
	                return sinon.timesInWords(spyInstance.callCount);
	            },
	
	            n: function (spyInstance) {
	                return spyInstance.toString();
	            },
	
	            C: function (spyInstance) {
	                var calls = [];
	
	                for (var i = 0, l = spyInstance.callCount; i < l; ++i) {
	                    var stringifiedCall = "    " + spyInstance.getCall(i).toString();
	                    if (/\n/.test(calls[i - 1])) {
	                        stringifiedCall = "\n" + stringifiedCall;
	                    }
	                    push.call(calls, stringifiedCall);
	                }
	
	                return calls.length > 0 ? "\n" + calls.join("\n") : "";
	            },
	
	            t: function (spyInstance) {
	                var objects = [];
	
	                for (var i = 0, l = spyInstance.callCount; i < l; ++i) {
	                    push.call(objects, sinon.format(spyInstance.thisValues[i]));
	                }
	
	                return objects.join(", ");
	            },
	
	            "*": function (spyInstance, args) {
	                var formatted = [];
	
	                for (var i = 0, l = args.length; i < l; ++i) {
	                    push.call(formatted, sinon.format(args[i]));
	                }
	
	                return formatted.join(", ");
	            }
	        };
	
	        sinon.extend(spy, spyApi);
	
	        spy.spyCall = sinon.spyCall;
	        sinon.spy = spy;
	
	        return spy;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./call");
	        require("./extend");
	        require("./times_in_words");
	        require("./format");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend extend.js
	 */
	/**
	 * Stub behavior
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @author Tim Fischbach (mail@timfischbach.de)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    var slice = Array.prototype.slice;
	    var join = Array.prototype.join;
	    var useLeftMostCallback = -1;
	    var useRightMostCallback = -2;
	
	    var nextTick = (function () {
	        if (typeof process === "object" && typeof process.nextTick === "function") {
	            return process.nextTick;
	        }
	
	        if (typeof setImmediate === "function") {
	            return setImmediate;
	        }
	
	        return function (callback) {
	            setTimeout(callback, 0);
	        };
	    })();
	
	    function throwsException(error, message) {
	        if (typeof error === "string") {
	            this.exception = new Error(message || "");
	            this.exception.name = error;
	        } else if (!error) {
	            this.exception = new Error("Error");
	        } else {
	            this.exception = error;
	        }
	
	        return this;
	    }
	
	    function getCallback(behavior, args) {
	        var callArgAt = behavior.callArgAt;
	
	        if (callArgAt >= 0) {
	            return args[callArgAt];
	        }
	
	        var argumentList;
	
	        if (callArgAt === useLeftMostCallback) {
	            argumentList = args;
	        }
	
	        if (callArgAt === useRightMostCallback) {
	            argumentList = slice.call(args).reverse();
	        }
	
	        var callArgProp = behavior.callArgProp;
	
	        for (var i = 0, l = argumentList.length; i < l; ++i) {
	            if (!callArgProp && typeof argumentList[i] === "function") {
	                return argumentList[i];
	            }
	
	            if (callArgProp && argumentList[i] &&
	                typeof argumentList[i][callArgProp] === "function") {
	                return argumentList[i][callArgProp];
	            }
	        }
	
	        return null;
	    }
	
	    function makeApi(sinon) {
	        function getCallbackError(behavior, func, args) {
	            if (behavior.callArgAt < 0) {
	                var msg;
	
	                if (behavior.callArgProp) {
	                    msg = sinon.functionName(behavior.stub) +
	                        " expected to yield to '" + behavior.callArgProp +
	                        "', but no object with such a property was passed.";
	                } else {
	                    msg = sinon.functionName(behavior.stub) +
	                        " expected to yield, but no callback was passed.";
	                }
	
	                if (args.length > 0) {
	                    msg += " Received [" + join.call(args, ", ") + "]";
	                }
	
	                return msg;
	            }
	
	            return "argument at index " + behavior.callArgAt + " is not a function: " + func;
	        }
	
	        function callCallback(behavior, args) {
	            if (typeof behavior.callArgAt === "number") {
	                var func = getCallback(behavior, args);
	
	                if (typeof func !== "function") {
	                    throw new TypeError(getCallbackError(behavior, func, args));
	                }
	
	                if (behavior.callbackAsync) {
	                    nextTick(function () {
	                        func.apply(behavior.callbackContext, behavior.callbackArguments);
	                    });
	                } else {
	                    func.apply(behavior.callbackContext, behavior.callbackArguments);
	                }
	            }
	        }
	
	        var proto = {
	            create: function create(stub) {
	                var behavior = sinon.extend({}, sinon.behavior);
	                delete behavior.create;
	                behavior.stub = stub;
	
	                return behavior;
	            },
	
	            isPresent: function isPresent() {
	                return (typeof this.callArgAt === "number" ||
	                        this.exception ||
	                        typeof this.returnArgAt === "number" ||
	                        this.returnThis ||
	                        this.returnValueDefined);
	            },
	
	            invoke: function invoke(context, args) {
	                callCallback(this, args);
	
	                if (this.exception) {
	                    throw this.exception;
	                } else if (typeof this.returnArgAt === "number") {
	                    return args[this.returnArgAt];
	                } else if (this.returnThis) {
	                    return context;
	                }
	
	                return this.returnValue;
	            },
	
	            onCall: function onCall(index) {
	                return this.stub.onCall(index);
	            },
	
	            onFirstCall: function onFirstCall() {
	                return this.stub.onFirstCall();
	            },
	
	            onSecondCall: function onSecondCall() {
	                return this.stub.onSecondCall();
	            },
	
	            onThirdCall: function onThirdCall() {
	                return this.stub.onThirdCall();
	            },
	
	            withArgs: function withArgs(/* arguments */) {
	                throw new Error(
	                    "Defining a stub by invoking \"stub.onCall(...).withArgs(...)\" " +
	                    "is not supported. Use \"stub.withArgs(...).onCall(...)\" " +
	                    "to define sequential behavior for calls with certain arguments."
	                );
	            },
	
	            callsArg: function callsArg(pos) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = [];
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            callsArgOn: function callsArgOn(pos, context) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = [];
	                this.callbackContext = context;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            callsArgWith: function callsArgWith(pos) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = slice.call(arguments, 1);
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            callsArgOnWith: function callsArgWith(pos, context) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = slice.call(arguments, 2);
	                this.callbackContext = context;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yields: function () {
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 0);
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsRight: function () {
	                this.callArgAt = useRightMostCallback;
	                this.callbackArguments = slice.call(arguments, 0);
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsOn: function (context) {
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 1);
	                this.callbackContext = context;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsTo: function (prop) {
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 1);
	                this.callbackContext = undefined;
	                this.callArgProp = prop;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsToOn: function (prop, context) {
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 2);
	                this.callbackContext = context;
	                this.callArgProp = prop;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            throws: throwsException,
	            throwsException: throwsException,
	
	            returns: function returns(value) {
	                this.returnValue = value;
	                this.returnValueDefined = true;
	                this.exception = undefined;
	
	                return this;
	            },
	
	            returnsArg: function returnsArg(pos) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	
	                this.returnArgAt = pos;
	
	                return this;
	            },
	
	            returnsThis: function returnsThis() {
	                this.returnThis = true;
	
	                return this;
	            }
	        };
	
	        function createAsyncVersion(syncFnName) {
	            return function () {
	                var result = this[syncFnName].apply(this, arguments);
	                this.callbackAsync = true;
	                return result;
	            };
	        }
	
	        // create asynchronous versions of callsArg* and yields* methods
	        for (var method in proto) {
	            // need to avoid creating anotherasync versions of the newly added async methods
	            if (proto.hasOwnProperty(method) && method.match(/^(callsArg|yields)/) && !method.match(/Async/)) {
	                proto[method + "Async"] = createAsyncVersion(method);
	            }
	        }
	
	        sinon.behavior = proto;
	        return proto;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./extend");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function walkInternal(obj, iterator, context, originalObj, seen) {
	            var proto, prop;
	
	            if (typeof Object.getOwnPropertyNames !== "function") {
	                // We explicitly want to enumerate through all of the prototype's properties
	                // in this case, therefore we deliberately leave out an own property check.
	                /* eslint-disable guard-for-in */
	                for (prop in obj) {
	                    iterator.call(context, obj[prop], prop, obj);
	                }
	                /* eslint-enable guard-for-in */
	
	                return;
	            }
	
	            Object.getOwnPropertyNames(obj).forEach(function (k) {
	                if (!seen[k]) {
	                    seen[k] = true;
	                    var target = typeof Object.getOwnPropertyDescriptor(obj, k).get === "function" ?
	                        originalObj : obj;
	                    iterator.call(context, target[k], k, target);
	                }
	            });
	
	            proto = Object.getPrototypeOf(obj);
	            if (proto) {
	                walkInternal(proto, iterator, context, originalObj, seen);
	            }
	        }
	
	        /* Public: walks the prototype chain of an object and iterates over every own property
	         * name encountered. The iterator is called in the same fashion that Array.prototype.forEach
	         * works, where it is passed the value, key, and own object as the 1st, 2nd, and 3rd positional
	         * argument, respectively. In cases where Object.getOwnPropertyNames is not available, walk will
	         * default to using a simple for..in loop.
	         *
	         * obj - The object to walk the prototype chain for.
	         * iterator - The function to be called on each pass of the walk.
	         * context - (Optional) When given, the iterator will be called with this object as the receiver.
	         */
	        function walk(obj, iterator, context) {
	            return walkInternal(obj, iterator, context, obj, {});
	        }
	
	        sinon.walk = walk;
	        return sinon.walk;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend extend.js
	 * @depend spy.js
	 * @depend behavior.js
	 * @depend walk.js
	 */
	/**
	 * Stub functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function stub(object, property, func) {
	            if (!!func && typeof func !== "function" && typeof func !== "object") {
	                throw new TypeError("Custom stub should be a function or a property descriptor");
	            }
	
	            var wrapper;
	
	            if (func) {
	                if (typeof func === "function") {
	                    wrapper = sinon.spy && sinon.spy.create ? sinon.spy.create(func) : func;
	                } else {
	                    wrapper = func;
	                    if (sinon.spy && sinon.spy.create) {
	                        var types = sinon.objectKeys(wrapper);
	                        for (var i = 0; i < types.length; i++) {
	                            wrapper[types[i]] = sinon.spy.create(wrapper[types[i]]);
	                        }
	                    }
	                }
	            } else {
	                var stubLength = 0;
	                if (typeof object === "object" && typeof object[property] === "function") {
	                    stubLength = object[property].length;
	                }
	                wrapper = stub.create(stubLength);
	            }
	
	            if (!object && typeof property === "undefined") {
	                return sinon.stub.create();
	            }
	
	            if (typeof property === "undefined" && typeof object === "object") {
	                sinon.walk(object || {}, function (value, prop, propOwner) {
	                    // we don't want to stub things like toString(), valueOf(), etc. so we only stub if the object
	                    // is not Object.prototype
	                    if (
	                        propOwner !== Object.prototype &&
	                        prop !== "constructor" &&
	                        typeof sinon.getPropertyDescriptor(propOwner, prop).value === "function"
	                    ) {
	                        stub(object, prop);
	                    }
	                });
	
	                return object;
	            }
	
	            return sinon.wrapMethod(object, property, wrapper);
	        }
	
	
	        /*eslint-disable no-use-before-define*/
	        function getParentBehaviour(stubInstance) {
	            return (stubInstance.parent && getCurrentBehavior(stubInstance.parent));
	        }
	
	        function getDefaultBehavior(stubInstance) {
	            return stubInstance.defaultBehavior ||
	                    getParentBehaviour(stubInstance) ||
	                    sinon.behavior.create(stubInstance);
	        }
	
	        function getCurrentBehavior(stubInstance) {
	            var behavior = stubInstance.behaviors[stubInstance.callCount - 1];
	            return behavior && behavior.isPresent() ? behavior : getDefaultBehavior(stubInstance);
	        }
	        /*eslint-enable no-use-before-define*/
	
	        var uuid = 0;
	
	        var proto = {
	            create: function create(stubLength) {
	                var functionStub = function () {
	                    return getCurrentBehavior(functionStub).invoke(this, arguments);
	                };
	
	                functionStub.id = "stub#" + uuid++;
	                var orig = functionStub;
	                functionStub = sinon.spy.create(functionStub, stubLength);
	                functionStub.func = orig;
	
	                sinon.extend(functionStub, stub);
	                functionStub.instantiateFake = sinon.stub.create;
	                functionStub.displayName = "stub";
	                functionStub.toString = sinon.functionToString;
	
	                functionStub.defaultBehavior = null;
	                functionStub.behaviors = [];
	
	                return functionStub;
	            },
	
	            resetBehavior: function () {
	                var i;
	
	                this.defaultBehavior = null;
	                this.behaviors = [];
	
	                delete this.returnValue;
	                delete this.returnArgAt;
	                this.returnThis = false;
	
	                if (this.fakes) {
	                    for (i = 0; i < this.fakes.length; i++) {
	                        this.fakes[i].resetBehavior();
	                    }
	                }
	            },
	
	            onCall: function onCall(index) {
	                if (!this.behaviors[index]) {
	                    this.behaviors[index] = sinon.behavior.create(this);
	                }
	
	                return this.behaviors[index];
	            },
	
	            onFirstCall: function onFirstCall() {
	                return this.onCall(0);
	            },
	
	            onSecondCall: function onSecondCall() {
	                return this.onCall(1);
	            },
	
	            onThirdCall: function onThirdCall() {
	                return this.onCall(2);
	            }
	        };
	
	        function createBehavior(behaviorMethod) {
	            return function () {
	                this.defaultBehavior = this.defaultBehavior || sinon.behavior.create(this);
	                this.defaultBehavior[behaviorMethod].apply(this.defaultBehavior, arguments);
	                return this;
	            };
	        }
	
	        for (var method in sinon.behavior) {
	            if (sinon.behavior.hasOwnProperty(method) &&
	                !proto.hasOwnProperty(method) &&
	                method !== "create" &&
	                method !== "withArgs" &&
	                method !== "invoke") {
	                proto[method] = createBehavior(method);
	            }
	        }
	
	        sinon.extend(stub, proto);
	        sinon.stub = stub;
	
	        return stub;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./behavior");
	        require("./spy");
	        require("./extend");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend times_in_words.js
	 * @depend util/core.js
	 * @depend call.js
	 * @depend extend.js
	 * @depend match.js
	 * @depend spy.js
	 * @depend stub.js
	 * @depend format.js
	 */
	/**
	 * Mock functions.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var push = [].push;
	        var match = sinon.match;
	
	        function mock(object) {
	            // if (typeof console !== undefined && console.warn) {
	            //     console.warn("mock will be removed from Sinon.JS v2.0");
	            // }
	
	            if (!object) {
	                return sinon.expectation.create("Anonymous mock");
	            }
	
	            return mock.create(object);
	        }
	
	        function each(collection, callback) {
	            if (!collection) {
	                return;
	            }
	
	            for (var i = 0, l = collection.length; i < l; i += 1) {
	                callback(collection[i]);
	            }
	        }
	
	        function arrayEquals(arr1, arr2, compareLength) {
	            if (compareLength && (arr1.length !== arr2.length)) {
	                return false;
	            }
	
	            for (var i = 0, l = arr1.length; i < l; i++) {
	                if (!sinon.deepEqual(arr1[i], arr2[i])) {
	                    return false;
	                }
	            }
	            return true;
	        }
	
	        sinon.extend(mock, {
	            create: function create(object) {
	                if (!object) {
	                    throw new TypeError("object is null");
	                }
	
	                var mockObject = sinon.extend({}, mock);
	                mockObject.object = object;
	                delete mockObject.create;
	
	                return mockObject;
	            },
	
	            expects: function expects(method) {
	                if (!method) {
	                    throw new TypeError("method is falsy");
	                }
	
	                if (!this.expectations) {
	                    this.expectations = {};
	                    this.proxies = [];
	                }
	
	                if (!this.expectations[method]) {
	                    this.expectations[method] = [];
	                    var mockObject = this;
	
	                    sinon.wrapMethod(this.object, method, function () {
	                        return mockObject.invokeMethod(method, this, arguments);
	                    });
	
	                    push.call(this.proxies, method);
	                }
	
	                var expectation = sinon.expectation.create(method);
	                push.call(this.expectations[method], expectation);
	
	                return expectation;
	            },
	
	            restore: function restore() {
	                var object = this.object;
	
	                each(this.proxies, function (proxy) {
	                    if (typeof object[proxy].restore === "function") {
	                        object[proxy].restore();
	                    }
	                });
	            },
	
	            verify: function verify() {
	                var expectations = this.expectations || {};
	                var messages = [];
	                var met = [];
	
	                each(this.proxies, function (proxy) {
	                    each(expectations[proxy], function (expectation) {
	                        if (!expectation.met()) {
	                            push.call(messages, expectation.toString());
	                        } else {
	                            push.call(met, expectation.toString());
	                        }
	                    });
	                });
	
	                this.restore();
	
	                if (messages.length > 0) {
	                    sinon.expectation.fail(messages.concat(met).join("\n"));
	                } else if (met.length > 0) {
	                    sinon.expectation.pass(messages.concat(met).join("\n"));
	                }
	
	                return true;
	            },
	
	            invokeMethod: function invokeMethod(method, thisValue, args) {
	                var expectations = this.expectations && this.expectations[method] ? this.expectations[method] : [];
	                var expectationsWithMatchingArgs = [];
	                var currentArgs = args || [];
	                var i, available;
	
	                for (i = 0; i < expectations.length; i += 1) {
	                    var expectedArgs = expectations[i].expectedArguments || [];
	                    if (arrayEquals(expectedArgs, currentArgs, expectations[i].expectsExactArgCount)) {
	                        expectationsWithMatchingArgs.push(expectations[i]);
	                    }
	                }
	
	                for (i = 0; i < expectationsWithMatchingArgs.length; i += 1) {
	                    if (!expectationsWithMatchingArgs[i].met() &&
	                        expectationsWithMatchingArgs[i].allowsCall(thisValue, args)) {
	                        return expectationsWithMatchingArgs[i].apply(thisValue, args);
	                    }
	                }
	
	                var messages = [];
	                var exhausted = 0;
	
	                for (i = 0; i < expectationsWithMatchingArgs.length; i += 1) {
	                    if (expectationsWithMatchingArgs[i].allowsCall(thisValue, args)) {
	                        available = available || expectationsWithMatchingArgs[i];
	                    } else {
	                        exhausted += 1;
	                    }
	                }
	
	                if (available && exhausted === 0) {
	                    return available.apply(thisValue, args);
	                }
	
	                for (i = 0; i < expectations.length; i += 1) {
	                    push.call(messages, "    " + expectations[i].toString());
	                }
	
	                messages.unshift("Unexpected call: " + sinon.spyCall.toString.call({
	                    proxy: method,
	                    args: args
	                }));
	
	                sinon.expectation.fail(messages.join("\n"));
	            }
	        });
	
	        var times = sinon.timesInWords;
	        var slice = Array.prototype.slice;
	
	        function callCountInWords(callCount) {
	            if (callCount === 0) {
	                return "never called";
	            }
	
	            return "called " + times(callCount);
	        }
	
	        function expectedCallCountInWords(expectation) {
	            var min = expectation.minCalls;
	            var max = expectation.maxCalls;
	
	            if (typeof min === "number" && typeof max === "number") {
	                var str = times(min);
	
	                if (min !== max) {
	                    str = "at least " + str + " and at most " + times(max);
	                }
	
	                return str;
	            }
	
	            if (typeof min === "number") {
	                return "at least " + times(min);
	            }
	
	            return "at most " + times(max);
	        }
	
	        function receivedMinCalls(expectation) {
	            var hasMinLimit = typeof expectation.minCalls === "number";
	            return !hasMinLimit || expectation.callCount >= expectation.minCalls;
	        }
	
	        function receivedMaxCalls(expectation) {
	            if (typeof expectation.maxCalls !== "number") {
	                return false;
	            }
	
	            return expectation.callCount === expectation.maxCalls;
	        }
	
	        function verifyMatcher(possibleMatcher, arg) {
	            var isMatcher = match && match.isMatcher(possibleMatcher);
	
	            return isMatcher && possibleMatcher.test(arg) || true;
	        }
	
	        sinon.expectation = {
	            minCalls: 1,
	            maxCalls: 1,
	
	            create: function create(methodName) {
	                var expectation = sinon.extend(sinon.stub.create(), sinon.expectation);
	                delete expectation.create;
	                expectation.method = methodName;
	
	                return expectation;
	            },
	
	            invoke: function invoke(func, thisValue, args) {
	                this.verifyCallAllowed(thisValue, args);
	
	                return sinon.spy.invoke.apply(this, arguments);
	            },
	
	            atLeast: function atLeast(num) {
	                if (typeof num !== "number") {
	                    throw new TypeError("'" + num + "' is not number");
	                }
	
	                if (!this.limitsSet) {
	                    this.maxCalls = null;
	                    this.limitsSet = true;
	                }
	
	                this.minCalls = num;
	
	                return this;
	            },
	
	            atMost: function atMost(num) {
	                if (typeof num !== "number") {
	                    throw new TypeError("'" + num + "' is not number");
	                }
	
	                if (!this.limitsSet) {
	                    this.minCalls = null;
	                    this.limitsSet = true;
	                }
	
	                this.maxCalls = num;
	
	                return this;
	            },
	
	            never: function never() {
	                return this.exactly(0);
	            },
	
	            once: function once() {
	                return this.exactly(1);
	            },
	
	            twice: function twice() {
	                return this.exactly(2);
	            },
	
	            thrice: function thrice() {
	                return this.exactly(3);
	            },
	
	            exactly: function exactly(num) {
	                if (typeof num !== "number") {
	                    throw new TypeError("'" + num + "' is not a number");
	                }
	
	                this.atLeast(num);
	                return this.atMost(num);
	            },
	
	            met: function met() {
	                return !this.failed && receivedMinCalls(this);
	            },
	
	            verifyCallAllowed: function verifyCallAllowed(thisValue, args) {
	                if (receivedMaxCalls(this)) {
	                    this.failed = true;
	                    sinon.expectation.fail(this.method + " already called " + times(this.maxCalls));
	                }
	
	                if ("expectedThis" in this && this.expectedThis !== thisValue) {
	                    sinon.expectation.fail(this.method + " called with " + thisValue + " as thisValue, expected " +
	                        this.expectedThis);
	                }
	
	                if (!("expectedArguments" in this)) {
	                    return;
	                }
	
	                if (!args) {
	                    sinon.expectation.fail(this.method + " received no arguments, expected " +
	                        sinon.format(this.expectedArguments));
	                }
	
	                if (args.length < this.expectedArguments.length) {
	                    sinon.expectation.fail(this.method + " received too few arguments (" + sinon.format(args) +
	                        "), expected " + sinon.format(this.expectedArguments));
	                }
	
	                if (this.expectsExactArgCount &&
	                    args.length !== this.expectedArguments.length) {
	                    sinon.expectation.fail(this.method + " received too many arguments (" + sinon.format(args) +
	                        "), expected " + sinon.format(this.expectedArguments));
	                }
	
	                for (var i = 0, l = this.expectedArguments.length; i < l; i += 1) {
	
	                    if (!verifyMatcher(this.expectedArguments[i], args[i])) {
	                        sinon.expectation.fail(this.method + " received wrong arguments " + sinon.format(args) +
	                            ", didn't match " + this.expectedArguments.toString());
	                    }
	
	                    if (!sinon.deepEqual(this.expectedArguments[i], args[i])) {
	                        sinon.expectation.fail(this.method + " received wrong arguments " + sinon.format(args) +
	                            ", expected " + sinon.format(this.expectedArguments));
	                    }
	                }
	            },
	
	            allowsCall: function allowsCall(thisValue, args) {
	                if (this.met() && receivedMaxCalls(this)) {
	                    return false;
	                }
	
	                if ("expectedThis" in this && this.expectedThis !== thisValue) {
	                    return false;
	                }
	
	                if (!("expectedArguments" in this)) {
	                    return true;
	                }
	
	                args = args || [];
	
	                if (args.length < this.expectedArguments.length) {
	                    return false;
	                }
	
	                if (this.expectsExactArgCount &&
	                    args.length !== this.expectedArguments.length) {
	                    return false;
	                }
	
	                for (var i = 0, l = this.expectedArguments.length; i < l; i += 1) {
	                    if (!verifyMatcher(this.expectedArguments[i], args[i])) {
	                        return false;
	                    }
	
	                    if (!sinon.deepEqual(this.expectedArguments[i], args[i])) {
	                        return false;
	                    }
	                }
	
	                return true;
	            },
	
	            withArgs: function withArgs() {
	                this.expectedArguments = slice.call(arguments);
	                return this;
	            },
	
	            withExactArgs: function withExactArgs() {
	                this.withArgs.apply(this, arguments);
	                this.expectsExactArgCount = true;
	                return this;
	            },
	
	            on: function on(thisValue) {
	                this.expectedThis = thisValue;
	                return this;
	            },
	
	            toString: function () {
	                var args = (this.expectedArguments || []).slice();
	
	                if (!this.expectsExactArgCount) {
	                    push.call(args, "[...]");
	                }
	
	                var callStr = sinon.spyCall.toString.call({
	                    proxy: this.method || "anonymous mock expectation",
	                    args: args
	                });
	
	                var message = callStr.replace(", [...", "[, ...") + " " +
	                    expectedCallCountInWords(this);
	
	                if (this.met()) {
	                    return "Expectation met: " + message;
	                }
	
	                return "Expected " + message + " (" +
	                    callCountInWords(this.callCount) + ")";
	            },
	
	            verify: function verify() {
	                if (!this.met()) {
	                    sinon.expectation.fail(this.toString());
	                } else {
	                    sinon.expectation.pass(this.toString());
	                }
	
	                return true;
	            },
	
	            pass: function pass(message) {
	                sinon.assert.pass(message);
	            },
	
	            fail: function fail(message) {
	                var exception = new Error(message);
	                exception.name = "ExpectationError";
	
	                throw exception;
	            }
	        };
	
	        sinon.mock = mock;
	        return mock;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./times_in_words");
	        require("./call");
	        require("./extend");
	        require("./match");
	        require("./spy");
	        require("./stub");
	        require("./format");
	
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend spy.js
	 * @depend stub.js
	 * @depend mock.js
	 */
	/**
	 * Collections of stubs, spies and mocks.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    var push = [].push;
	    var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	    function getFakes(fakeCollection) {
	        if (!fakeCollection.fakes) {
	            fakeCollection.fakes = [];
	        }
	
	        return fakeCollection.fakes;
	    }
	
	    function each(fakeCollection, method) {
	        var fakes = getFakes(fakeCollection);
	
	        for (var i = 0, l = fakes.length; i < l; i += 1) {
	            if (typeof fakes[i][method] === "function") {
	                fakes[i][method]();
	            }
	        }
	    }
	
	    function compact(fakeCollection) {
	        var fakes = getFakes(fakeCollection);
	        var i = 0;
	        while (i < fakes.length) {
	            fakes.splice(i, 1);
	        }
	    }
	
	    function makeApi(sinon) {
	        var collection = {
	            verify: function resolve() {
	                each(this, "verify");
	            },
	
	            restore: function restore() {
	                each(this, "restore");
	                compact(this);
	            },
	
	            reset: function restore() {
	                each(this, "reset");
	            },
	
	            verifyAndRestore: function verifyAndRestore() {
	                var exception;
	
	                try {
	                    this.verify();
	                } catch (e) {
	                    exception = e;
	                }
	
	                this.restore();
	
	                if (exception) {
	                    throw exception;
	                }
	            },
	
	            add: function add(fake) {
	                push.call(getFakes(this), fake);
	                return fake;
	            },
	
	            spy: function spy() {
	                return this.add(sinon.spy.apply(sinon, arguments));
	            },
	
	            stub: function stub(object, property, value) {
	                if (property) {
	                    var original = object[property];
	
	                    if (typeof original !== "function") {
	                        if (!hasOwnProperty.call(object, property)) {
	                            throw new TypeError("Cannot stub non-existent own property " + property);
	                        }
	
	                        object[property] = value;
	
	                        return this.add({
	                            restore: function () {
	                                object[property] = original;
	                            }
	                        });
	                    }
	                }
	                if (!property && !!object && typeof object === "object") {
	                    var stubbedObj = sinon.stub.apply(sinon, arguments);
	
	                    for (var prop in stubbedObj) {
	                        if (typeof stubbedObj[prop] === "function") {
	                            this.add(stubbedObj[prop]);
	                        }
	                    }
	
	                    return stubbedObj;
	                }
	
	                return this.add(sinon.stub.apply(sinon, arguments));
	            },
	
	            mock: function mock() {
	                return this.add(sinon.mock.apply(sinon, arguments));
	            },
	
	            inject: function inject(obj) {
	                var col = this;
	
	                obj.spy = function () {
	                    return col.spy.apply(col, arguments);
	                };
	
	                obj.stub = function () {
	                    return col.stub.apply(col, arguments);
	                };
	
	                obj.mock = function () {
	                    return col.mock.apply(col, arguments);
	                };
	
	                return obj;
	            }
	        };
	
	        sinon.collection = collection;
	        return collection;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./mock");
	        require("./spy");
	        require("./stub");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * Fake timer API
	 * setTimeout
	 * setInterval
	 * clearTimeout
	 * clearInterval
	 * tick
	 * reset
	 * Date
	 *
	 * Inspired by jsUnitMockTimeOut from JsUnit
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function () {
	    
	    function makeApi(s, lol) {
	        /*global lolex */
	        var llx = typeof lolex !== "undefined" ? lolex : lol;
	
	        s.useFakeTimers = function () {
	            var now;
	            var methods = Array.prototype.slice.call(arguments);
	
	            if (typeof methods[0] === "string") {
	                now = 0;
	            } else {
	                now = methods.shift();
	            }
	
	            var clock = llx.install(now || 0, methods);
	            clock.restore = clock.uninstall;
	            return clock;
	        };
	
	        s.clock = {
	            create: function (now) {
	                return llx.createClock(now);
	            }
	        };
	
	        s.timers = {
	            setTimeout: setTimeout,
	            clearTimeout: clearTimeout,
	            setImmediate: (typeof setImmediate !== "undefined" ? setImmediate : undefined),
	            clearImmediate: (typeof clearImmediate !== "undefined" ? clearImmediate : undefined),
	            setInterval: setInterval,
	            clearInterval: clearInterval,
	            Date: Date
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, epxorts, module, lolex) {
	        var core = require("./core");
	        makeApi(core, lolex);
	        module.exports = core;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module, require("lolex"));
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * Minimal Event interface implementation
	 *
	 * Original implementation by Sven Fuchs: https://gist.github.com/995028
	 * Modifications and tests by Christian Johansen.
	 *
	 * @author Sven Fuchs (svenfuchs@artweb-design.de)
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2011 Sven Fuchs, Christian Johansen
	 */
	if (typeof sinon === "undefined") {
	    this.sinon = {};
	}
	
	(function () {
	    
	    var push = [].push;
	
	    function makeApi(sinon) {
	        sinon.Event = function Event(type, bubbles, cancelable, target) {
	            this.initEvent(type, bubbles, cancelable, target);
	        };
	
	        sinon.Event.prototype = {
	            initEvent: function (type, bubbles, cancelable, target) {
	                this.type = type;
	                this.bubbles = bubbles;
	                this.cancelable = cancelable;
	                this.target = target;
	            },
	
	            stopPropagation: function () {},
	
	            preventDefault: function () {
	                this.defaultPrevented = true;
	            }
	        };
	
	        sinon.ProgressEvent = function ProgressEvent(type, progressEventRaw, target) {
	            this.initEvent(type, false, false, target);
	            this.loaded = typeof progressEventRaw.loaded === "number" ? progressEventRaw.loaded : null;
	            this.total = typeof progressEventRaw.total === "number" ? progressEventRaw.total : null;
	            this.lengthComputable = !!progressEventRaw.total;
	        };
	
	        sinon.ProgressEvent.prototype = new sinon.Event();
	
	        sinon.ProgressEvent.prototype.constructor = sinon.ProgressEvent;
	
	        sinon.CustomEvent = function CustomEvent(type, customData, target) {
	            this.initEvent(type, false, false, target);
	            this.detail = customData.detail || null;
	        };
	
	        sinon.CustomEvent.prototype = new sinon.Event();
	
	        sinon.CustomEvent.prototype.constructor = sinon.CustomEvent;
	
	        sinon.EventTarget = {
	            addEventListener: function addEventListener(event, listener) {
	                this.eventListeners = this.eventListeners || {};
	                this.eventListeners[event] = this.eventListeners[event] || [];
	                push.call(this.eventListeners[event], listener);
	            },
	
	            removeEventListener: function removeEventListener(event, listener) {
	                var listeners = this.eventListeners && this.eventListeners[event] || [];
	
	                for (var i = 0, l = listeners.length; i < l; ++i) {
	                    if (listeners[i] === listener) {
	                        return listeners.splice(i, 1);
	                    }
	                }
	            },
	
	            dispatchEvent: function dispatchEvent(event) {
	                var type = event.type;
	                var listeners = this.eventListeners && this.eventListeners[type] || [];
	
	                for (var i = 0; i < listeners.length; i++) {
	                    if (typeof listeners[i] === "function") {
	                        listeners[i].call(this, event);
	                    } else {
	                        listeners[i].handleEvent(event);
	                    }
	                }
	
	                return !!event.defaultPrevented;
	            }
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require) {
	        var sinon = require("./core");
	        makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * @depend util/core.js
	 */
	/**
	 * Logs errors
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    // cache a reference to setTimeout, so that our reference won't be stubbed out
	    // when using fake timers and errors will still get logged
	    // https://github.com/cjohansen/Sinon.JS/issues/381
	    var realSetTimeout = setTimeout;
	
	    function makeApi(sinon) {
	
	        function log() {}
	
	        function logError(label, err) {
	            var msg = label + " threw exception: ";
	
	            function throwLoggedError() {
	                err.message = msg + err.message;
	                throw err;
	            }
	
	            sinon.log(msg + "[" + err.name + "] " + err.message);
	
	            if (err.stack) {
	                sinon.log(err.stack);
	            }
	
	            if (logError.useImmediateExceptions) {
	                throwLoggedError();
	            } else {
	                logError.setTimeout(throwLoggedError, 0);
	            }
	        }
	
	        // When set to true, any errors logged will be thrown immediately;
	        // If set to false, the errors will be thrown in separate execution frame.
	        logError.useImmediateExceptions = false;
	
	        // wrap realSetTimeout with something we can stub in tests
	        logError.setTimeout = function (func, timeout) {
	            realSetTimeout(func, timeout);
	        };
	
	        var exports = {};
	        exports.log = sinon.log = log;
	        exports.logError = sinon.logError = logError;
	
	        return exports;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend core.js
	 * @depend ../extend.js
	 * @depend event.js
	 * @depend ../log_error.js
	 */
	/**
	 * Fake XDomainRequest object
	 */
	
	/**
	 * Returns the global to prevent assigning values to 'this' when this is undefined.
	 * This can occur when files are interpreted by node in strict mode.
	 * @private
	 */
	function getGlobal() {
	    
	    return typeof window !== "undefined" ? window : global;
	}
	
	if (typeof sinon === "undefined") {
	    if (typeof this === "undefined") {
	        getGlobal().sinon = {};
	    } else {
	        this.sinon = {};
	    }
	}
	
	// wrapper for global
	(function (global) {
	    
	    var xdr = { XDomainRequest: global.XDomainRequest };
	    xdr.GlobalXDomainRequest = global.XDomainRequest;
	    xdr.supportsXDR = typeof xdr.GlobalXDomainRequest !== "undefined";
	    xdr.workingXDR = xdr.supportsXDR ? xdr.GlobalXDomainRequest : false;
	
	    function makeApi(sinon) {
	        sinon.xdr = xdr;
	
	        function FakeXDomainRequest() {
	            this.readyState = FakeXDomainRequest.UNSENT;
	            this.requestBody = null;
	            this.requestHeaders = {};
	            this.status = 0;
	            this.timeout = null;
	
	            if (typeof FakeXDomainRequest.onCreate === "function") {
	                FakeXDomainRequest.onCreate(this);
	            }
	        }
	
	        function verifyState(x) {
	            if (x.readyState !== FakeXDomainRequest.OPENED) {
	                throw new Error("INVALID_STATE_ERR");
	            }
	
	            if (x.sendFlag) {
	                throw new Error("INVALID_STATE_ERR");
	            }
	        }
	
	        function verifyRequestSent(x) {
	            if (x.readyState === FakeXDomainRequest.UNSENT) {
	                throw new Error("Request not sent");
	            }
	            if (x.readyState === FakeXDomainRequest.DONE) {
	                throw new Error("Request done");
	            }
	        }
	
	        function verifyResponseBodyType(body) {
	            if (typeof body !== "string") {
	                var error = new Error("Attempted to respond to fake XDomainRequest with " +
	                                    body + ", which is not a string.");
	                error.name = "InvalidBodyException";
	                throw error;
	            }
	        }
	
	        sinon.extend(FakeXDomainRequest.prototype, sinon.EventTarget, {
	            open: function open(method, url) {
	                this.method = method;
	                this.url = url;
	
	                this.responseText = null;
	                this.sendFlag = false;
	
	                this.readyStateChange(FakeXDomainRequest.OPENED);
	            },
	
	            readyStateChange: function readyStateChange(state) {
	                this.readyState = state;
	                var eventName = "";
	                switch (this.readyState) {
	                case FakeXDomainRequest.UNSENT:
	                    break;
	                case FakeXDomainRequest.OPENED:
	                    break;
	                case FakeXDomainRequest.LOADING:
	                    if (this.sendFlag) {
	                        //raise the progress event
	                        eventName = "onprogress";
	                    }
	                    break;
	                case FakeXDomainRequest.DONE:
	                    if (this.isTimeout) {
	                        eventName = "ontimeout";
	                    } else if (this.errorFlag || (this.status < 200 || this.status > 299)) {
	                        eventName = "onerror";
	                    } else {
	                        eventName = "onload";
	                    }
	                    break;
	                }
	
	                // raising event (if defined)
	                if (eventName) {
	                    if (typeof this[eventName] === "function") {
	                        try {
	                            this[eventName]();
	                        } catch (e) {
	                            sinon.logError("Fake XHR " + eventName + " handler", e);
	                        }
	                    }
	                }
	            },
	
	            send: function send(data) {
	                verifyState(this);
	
	                if (!/^(get|head)$/i.test(this.method)) {
	                    this.requestBody = data;
	                }
	                this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
	
	                this.errorFlag = false;
	                this.sendFlag = true;
	                this.readyStateChange(FakeXDomainRequest.OPENED);
	
	                if (typeof this.onSend === "function") {
	                    this.onSend(this);
	                }
	            },
	
	            abort: function abort() {
	                this.aborted = true;
	                this.responseText = null;
	                this.errorFlag = true;
	
	                if (this.readyState > sinon.FakeXDomainRequest.UNSENT && this.sendFlag) {
	                    this.readyStateChange(sinon.FakeXDomainRequest.DONE);
	                    this.sendFlag = false;
	                }
	            },
	
	            setResponseBody: function setResponseBody(body) {
	                verifyRequestSent(this);
	                verifyResponseBodyType(body);
	
	                var chunkSize = this.chunkSize || 10;
	                var index = 0;
	                this.responseText = "";
	
	                do {
	                    this.readyStateChange(FakeXDomainRequest.LOADING);
	                    this.responseText += body.substring(index, index + chunkSize);
	                    index += chunkSize;
	                } while (index < body.length);
	
	                this.readyStateChange(FakeXDomainRequest.DONE);
	            },
	
	            respond: function respond(status, contentType, body) {
	                // content-type ignored, since XDomainRequest does not carry this
	                // we keep the same syntax for respond(...) as for FakeXMLHttpRequest to ease
	                // test integration across browsers
	                this.status = typeof status === "number" ? status : 200;
	                this.setResponseBody(body || "");
	            },
	
	            simulatetimeout: function simulatetimeout() {
	                this.status = 0;
	                this.isTimeout = true;
	                // Access to this should actually throw an error
	                this.responseText = undefined;
	                this.readyStateChange(FakeXDomainRequest.DONE);
	            }
	        });
	
	        sinon.extend(FakeXDomainRequest, {
	            UNSENT: 0,
	            OPENED: 1,
	            LOADING: 3,
	            DONE: 4
	        });
	
	        sinon.useFakeXDomainRequest = function useFakeXDomainRequest() {
	            sinon.FakeXDomainRequest.restore = function restore(keepOnCreate) {
	                if (xdr.supportsXDR) {
	                    global.XDomainRequest = xdr.GlobalXDomainRequest;
	                }
	
	                delete sinon.FakeXDomainRequest.restore;
	
	                if (keepOnCreate !== true) {
	                    delete sinon.FakeXDomainRequest.onCreate;
	                }
	            };
	            if (xdr.supportsXDR) {
	                global.XDomainRequest = sinon.FakeXDomainRequest;
	            }
	            return sinon.FakeXDomainRequest;
	        };
	
	        sinon.FakeXDomainRequest = FakeXDomainRequest;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./core");
	        require("../extend");
	        require("./event");
	        require("../log_error");
	        makeApi(sinon);
	        module.exports = sinon;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	})(typeof global !== "undefined" ? global : self);
	
	/**
	 * @depend core.js
	 * @depend ../extend.js
	 * @depend event.js
	 * @depend ../log_error.js
	 */
	/**
	 * Fake XMLHttpRequest object
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal, global) {
	    
	    function getWorkingXHR(globalScope) {
	        var supportsXHR = typeof globalScope.XMLHttpRequest !== "undefined";
	        if (supportsXHR) {
	            return globalScope.XMLHttpRequest;
	        }
	
	        var supportsActiveX = typeof globalScope.ActiveXObject !== "undefined";
	        if (supportsActiveX) {
	            return function () {
	                return new globalScope.ActiveXObject("MSXML2.XMLHTTP.3.0");
	            };
	        }
	
	        return false;
	    }
	
	    var supportsProgress = typeof ProgressEvent !== "undefined";
	    var supportsCustomEvent = typeof CustomEvent !== "undefined";
	    var supportsFormData = typeof FormData !== "undefined";
	    var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
	    var supportsBlob = (function () {
	        try {
	            return !!new Blob();
	        } catch (e) {
	            return false;
	        }
	    })();
	    var sinonXhr = { XMLHttpRequest: global.XMLHttpRequest };
	    sinonXhr.GlobalXMLHttpRequest = global.XMLHttpRequest;
	    sinonXhr.GlobalActiveXObject = global.ActiveXObject;
	    sinonXhr.supportsActiveX = typeof sinonXhr.GlobalActiveXObject !== "undefined";
	    sinonXhr.supportsXHR = typeof sinonXhr.GlobalXMLHttpRequest !== "undefined";
	    sinonXhr.workingXHR = getWorkingXHR(global);
	    sinonXhr.supportsCORS = sinonXhr.supportsXHR && "withCredentials" in (new sinonXhr.GlobalXMLHttpRequest());
	
	    var unsafeHeaders = {
	        "Accept-Charset": true,
	        "Accept-Encoding": true,
	        Connection: true,
	        "Content-Length": true,
	        Cookie: true,
	        Cookie2: true,
	        "Content-Transfer-Encoding": true,
	        Date: true,
	        Expect: true,
	        Host: true,
	        "Keep-Alive": true,
	        Referer: true,
	        TE: true,
	        Trailer: true,
	        "Transfer-Encoding": true,
	        Upgrade: true,
	        "User-Agent": true,
	        Via: true
	    };
	
	    // An upload object is created for each
	    // FakeXMLHttpRequest and allows upload
	    // events to be simulated using uploadProgress
	    // and uploadError.
	    function UploadProgress() {
	        this.eventListeners = {
	            abort: [],
	            error: [],
	            load: [],
	            loadend: [],
	            progress: []
	        };
	    }
	
	    UploadProgress.prototype.addEventListener = function addEventListener(event, listener) {
	        this.eventListeners[event].push(listener);
	    };
	
	    UploadProgress.prototype.removeEventListener = function removeEventListener(event, listener) {
	        var listeners = this.eventListeners[event] || [];
	
	        for (var i = 0, l = listeners.length; i < l; ++i) {
	            if (listeners[i] === listener) {
	                return listeners.splice(i, 1);
	            }
	        }
	    };
	
	    UploadProgress.prototype.dispatchEvent = function dispatchEvent(event) {
	        var listeners = this.eventListeners[event.type] || [];
	
	        for (var i = 0, listener; (listener = listeners[i]) != null; i++) {
	            listener(event);
	        }
	    };
	
	    // Note that for FakeXMLHttpRequest to work pre ES5
	    // we lose some of the alignment with the spec.
	    // To ensure as close a match as possible,
	    // set responseType before calling open, send or respond;
	    function FakeXMLHttpRequest() {
	        this.readyState = FakeXMLHttpRequest.UNSENT;
	        this.requestHeaders = {};
	        this.requestBody = null;
	        this.status = 0;
	        this.statusText = "";
	        this.upload = new UploadProgress();
	        this.responseType = "";
	        this.response = "";
	        if (sinonXhr.supportsCORS) {
	            this.withCredentials = false;
	        }
	
	        var xhr = this;
	        var events = ["loadstart", "load", "abort", "error", "loadend"];
	
	        function addEventListener(eventName) {
	            xhr.addEventListener(eventName, function (event) {
	                var listener = xhr["on" + eventName];
	
	                if (listener && typeof listener === "function") {
	                    listener.call(this, event);
	                }
	            });
	        }
	
	        for (var i = events.length - 1; i >= 0; i--) {
	            addEventListener(events[i]);
	        }
	
	        if (typeof FakeXMLHttpRequest.onCreate === "function") {
	            FakeXMLHttpRequest.onCreate(this);
	        }
	    }
	
	    function verifyState(xhr) {
	        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
	            throw new Error("INVALID_STATE_ERR");
	        }
	
	        if (xhr.sendFlag) {
	            throw new Error("INVALID_STATE_ERR");
	        }
	    }
	
	    function getHeader(headers, header) {
	        header = header.toLowerCase();
	
	        for (var h in headers) {
	            if (h.toLowerCase() === header) {
	                return h;
	            }
	        }
	
	        return null;
	    }
	
	    // filtering to enable a white-list version of Sinon FakeXhr,
	    // where whitelisted requests are passed through to real XHR
	    function each(collection, callback) {
	        if (!collection) {
	            return;
	        }
	
	        for (var i = 0, l = collection.length; i < l; i += 1) {
	            callback(collection[i]);
	        }
	    }
	    function some(collection, callback) {
	        for (var index = 0; index < collection.length; index++) {
	            if (callback(collection[index]) === true) {
	                return true;
	            }
	        }
	        return false;
	    }
	    // largest arity in XHR is 5 - XHR#open
	    var apply = function (obj, method, args) {
	        switch (args.length) {
	        case 0: return obj[method]();
	        case 1: return obj[method](args[0]);
	        case 2: return obj[method](args[0], args[1]);
	        case 3: return obj[method](args[0], args[1], args[2]);
	        case 4: return obj[method](args[0], args[1], args[2], args[3]);
	        case 5: return obj[method](args[0], args[1], args[2], args[3], args[4]);
	        }
	    };
	
	    FakeXMLHttpRequest.filters = [];
	    FakeXMLHttpRequest.addFilter = function addFilter(fn) {
	        this.filters.push(fn);
	    };
	    var IE6Re = /MSIE 6/;
	    FakeXMLHttpRequest.defake = function defake(fakeXhr, xhrArgs) {
	        var xhr = new sinonXhr.workingXHR(); // eslint-disable-line new-cap
	
	        each([
	            "open",
	            "setRequestHeader",
	            "send",
	            "abort",
	            "getResponseHeader",
	            "getAllResponseHeaders",
	            "addEventListener",
	            "overrideMimeType",
	            "removeEventListener"
	        ], function (method) {
	            fakeXhr[method] = function () {
	                return apply(xhr, method, arguments);
	            };
	        });
	
	        var copyAttrs = function (args) {
	            each(args, function (attr) {
	                try {
	                    fakeXhr[attr] = xhr[attr];
	                } catch (e) {
	                    if (!IE6Re.test(navigator.userAgent)) {
	                        throw e;
	                    }
	                }
	            });
	        };
	
	        var stateChange = function stateChange() {
	            fakeXhr.readyState = xhr.readyState;
	            if (xhr.readyState >= FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                copyAttrs(["status", "statusText"]);
	            }
	            if (xhr.readyState >= FakeXMLHttpRequest.LOADING) {
	                copyAttrs(["responseText", "response"]);
	            }
	            if (xhr.readyState === FakeXMLHttpRequest.DONE) {
	                copyAttrs(["responseXML"]);
	            }
	            if (fakeXhr.onreadystatechange) {
	                fakeXhr.onreadystatechange.call(fakeXhr, { target: fakeXhr });
	            }
	        };
	
	        if (xhr.addEventListener) {
	            for (var event in fakeXhr.eventListeners) {
	                if (fakeXhr.eventListeners.hasOwnProperty(event)) {
	
	                    /*eslint-disable no-loop-func*/
	                    each(fakeXhr.eventListeners[event], function (handler) {
	                        xhr.addEventListener(event, handler);
	                    });
	                    /*eslint-enable no-loop-func*/
	                }
	            }
	            xhr.addEventListener("readystatechange", stateChange);
	        } else {
	            xhr.onreadystatechange = stateChange;
	        }
	        apply(xhr, "open", xhrArgs);
	    };
	    FakeXMLHttpRequest.useFilters = false;
	
	    function verifyRequestOpened(xhr) {
	        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
	            throw new Error("INVALID_STATE_ERR - " + xhr.readyState);
	        }
	    }
	
	    function verifyRequestSent(xhr) {
	        if (xhr.readyState === FakeXMLHttpRequest.DONE) {
	            throw new Error("Request done");
	        }
	    }
	
	    function verifyHeadersReceived(xhr) {
	        if (xhr.async && xhr.readyState !== FakeXMLHttpRequest.HEADERS_RECEIVED) {
	            throw new Error("No headers received");
	        }
	    }
	
	    function verifyResponseBodyType(body) {
	        if (typeof body !== "string") {
	            var error = new Error("Attempted to respond to fake XMLHttpRequest with " +
	                                 body + ", which is not a string.");
	            error.name = "InvalidBodyException";
	            throw error;
	        }
	    }
	
	    function convertToArrayBuffer(body) {
	        var buffer = new ArrayBuffer(body.length);
	        var view = new Uint8Array(buffer);
	        for (var i = 0; i < body.length; i++) {
	            var charCode = body.charCodeAt(i);
	            if (charCode >= 256) {
	                throw new TypeError("arraybuffer or blob responseTypes require binary string, " +
	                                    "invalid character " + body[i] + " found.");
	            }
	            view[i] = charCode;
	        }
	        return buffer;
	    }
	
	    function isXmlContentType(contentType) {
	        return !contentType || /(text\/xml)|(application\/xml)|(\+xml)/.test(contentType);
	    }
	
	    function convertResponseBody(responseType, contentType, body) {
	        if (responseType === "" || responseType === "text") {
	            return body;
	        } else if (supportsArrayBuffer && responseType === "arraybuffer") {
	            return convertToArrayBuffer(body);
	        } else if (responseType === "json") {
	            try {
	                return JSON.parse(body);
	            } catch (e) {
	                // Return parsing failure as null
	                return null;
	            }
	        } else if (supportsBlob && responseType === "blob") {
	            var blobOptions = {};
	            if (contentType) {
	                blobOptions.type = contentType;
	            }
	            return new Blob([convertToArrayBuffer(body)], blobOptions);
	        } else if (responseType === "document") {
	            if (isXmlContentType(contentType)) {
	                return FakeXMLHttpRequest.parseXML(body);
	            }
	            return null;
	        }
	        throw new Error("Invalid responseType " + responseType);
	    }
	
	    function clearResponse(xhr) {
	        if (xhr.responseType === "" || xhr.responseType === "text") {
	            xhr.response = xhr.responseText = "";
	        } else {
	            xhr.response = xhr.responseText = null;
	        }
	        xhr.responseXML = null;
	    }
	
	    FakeXMLHttpRequest.parseXML = function parseXML(text) {
	        // Treat empty string as parsing failure
	        if (text !== "") {
	            try {
	                if (typeof DOMParser !== "undefined") {
	                    var parser = new DOMParser();
	                    return parser.parseFromString(text, "text/xml");
	                }
	                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
	                xmlDoc.async = "false";
	                xmlDoc.loadXML(text);
	                return xmlDoc;
	            } catch (e) {
	                // Unable to parse XML - no biggie
	            }
	        }
	
	        return null;
	    };
	
	    FakeXMLHttpRequest.statusCodes = {
	        100: "Continue",
	        101: "Switching Protocols",
	        200: "OK",
	        201: "Created",
	        202: "Accepted",
	        203: "Non-Authoritative Information",
	        204: "No Content",
	        205: "Reset Content",
	        206: "Partial Content",
	        207: "Multi-Status",
	        300: "Multiple Choice",
	        301: "Moved Permanently",
	        302: "Found",
	        303: "See Other",
	        304: "Not Modified",
	        305: "Use Proxy",
	        307: "Temporary Redirect",
	        400: "Bad Request",
	        401: "Unauthorized",
	        402: "Payment Required",
	        403: "Forbidden",
	        404: "Not Found",
	        405: "Method Not Allowed",
	        406: "Not Acceptable",
	        407: "Proxy Authentication Required",
	        408: "Request Timeout",
	        409: "Conflict",
	        410: "Gone",
	        411: "Length Required",
	        412: "Precondition Failed",
	        413: "Request Entity Too Large",
	        414: "Request-URI Too Long",
	        415: "Unsupported Media Type",
	        416: "Requested Range Not Satisfiable",
	        417: "Expectation Failed",
	        422: "Unprocessable Entity",
	        500: "Internal Server Error",
	        501: "Not Implemented",
	        502: "Bad Gateway",
	        503: "Service Unavailable",
	        504: "Gateway Timeout",
	        505: "HTTP Version Not Supported"
	    };
	
	    function makeApi(sinon) {
	        sinon.xhr = sinonXhr;
	
	        sinon.extend(FakeXMLHttpRequest.prototype, sinon.EventTarget, {
	            async: true,
	
	            open: function open(method, url, async, username, password) {
	                this.method = method;
	                this.url = url;
	                this.async = typeof async === "boolean" ? async : true;
	                this.username = username;
	                this.password = password;
	                clearResponse(this);
	                this.requestHeaders = {};
	                this.sendFlag = false;
	
	                if (FakeXMLHttpRequest.useFilters === true) {
	                    var xhrArgs = arguments;
	                    var defake = some(FakeXMLHttpRequest.filters, function (filter) {
	                        return filter.apply(this, xhrArgs);
	                    });
	                    if (defake) {
	                        return FakeXMLHttpRequest.defake(this, arguments);
	                    }
	                }
	                this.readyStateChange(FakeXMLHttpRequest.OPENED);
	            },
	
	            readyStateChange: function readyStateChange(state) {
	                this.readyState = state;
	
	                var readyStateChangeEvent = new sinon.Event("readystatechange", false, false, this);
	                var event, progress;
	
	                if (typeof this.onreadystatechange === "function") {
	                    try {
	                        this.onreadystatechange(readyStateChangeEvent);
	                    } catch (e) {
	                        sinon.logError("Fake XHR onreadystatechange handler", e);
	                    }
	                }
	
	                if (this.readyState === FakeXMLHttpRequest.DONE) {
	                    // ensure loaded and total are numbers
	                    progress = {
	                      loaded: this.progress || 0,
	                      total: this.progress || 0
	                    };
	
	                    if (this.status === 0) {
	                        event = this.aborted ? "abort" : "error";
	                    }
	                    else {
	                        event = "load";
	                    }
	
	                    if (supportsProgress) {
	                        this.upload.dispatchEvent(new sinon.ProgressEvent("progress", progress, this));
	                        this.upload.dispatchEvent(new sinon.ProgressEvent(event, progress, this));
	                        this.upload.dispatchEvent(new sinon.ProgressEvent("loadend", progress, this));
	                    }
	
	                    this.dispatchEvent(new sinon.ProgressEvent("progress", progress, this));
	                    this.dispatchEvent(new sinon.ProgressEvent(event, progress, this));
	                    this.dispatchEvent(new sinon.ProgressEvent("loadend", progress, this));
	                }
	
	                this.dispatchEvent(readyStateChangeEvent);
	            },
	
	            setRequestHeader: function setRequestHeader(header, value) {
	                verifyState(this);
	
	                if (unsafeHeaders[header] || /^(Sec-|Proxy-)/.test(header)) {
	                    throw new Error("Refused to set unsafe header \"" + header + "\"");
	                }
	
	                if (this.requestHeaders[header]) {
	                    this.requestHeaders[header] += "," + value;
	                } else {
	                    this.requestHeaders[header] = value;
	                }
	            },
	
	            // Helps testing
	            setResponseHeaders: function setResponseHeaders(headers) {
	                verifyRequestOpened(this);
	                this.responseHeaders = {};
	
	                for (var header in headers) {
	                    if (headers.hasOwnProperty(header)) {
	                        this.responseHeaders[header] = headers[header];
	                    }
	                }
	
	                if (this.async) {
	                    this.readyStateChange(FakeXMLHttpRequest.HEADERS_RECEIVED);
	                } else {
	                    this.readyState = FakeXMLHttpRequest.HEADERS_RECEIVED;
	                }
	            },
	
	            // Currently treats ALL data as a DOMString (i.e. no Document)
	            send: function send(data) {
	                verifyState(this);
	
	                if (!/^(get|head)$/i.test(this.method)) {
	                    var contentType = getHeader(this.requestHeaders, "Content-Type");
	                    if (this.requestHeaders[contentType]) {
	                        var value = this.requestHeaders[contentType].split(";");
	                        this.requestHeaders[contentType] = value[0] + ";charset=utf-8";
	                    } else if (supportsFormData && !(data instanceof FormData)) {
	                        this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
	                    }
	
	                    this.requestBody = data;
	                }
	
	                this.errorFlag = false;
	                this.sendFlag = this.async;
	                clearResponse(this);
	                this.readyStateChange(FakeXMLHttpRequest.OPENED);
	
	                if (typeof this.onSend === "function") {
	                    this.onSend(this);
	                }
	
	                this.dispatchEvent(new sinon.Event("loadstart", false, false, this));
	            },
	
	            abort: function abort() {
	                this.aborted = true;
	                clearResponse(this);
	                this.errorFlag = true;
	                this.requestHeaders = {};
	                this.responseHeaders = {};
	
	                if (this.readyState > FakeXMLHttpRequest.UNSENT && this.sendFlag) {
	                    this.readyStateChange(FakeXMLHttpRequest.DONE);
	                    this.sendFlag = false;
	                }
	
	                this.readyState = FakeXMLHttpRequest.UNSENT;
	            },
	
	            error: function error() {
	                clearResponse(this);
	                this.errorFlag = true;
	                this.requestHeaders = {};
	                this.responseHeaders = {};
	
	                this.readyStateChange(FakeXMLHttpRequest.DONE);
	            },
	
	            getResponseHeader: function getResponseHeader(header) {
	                if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                    return null;
	                }
	
	                if (/^Set-Cookie2?$/i.test(header)) {
	                    return null;
	                }
	
	                header = getHeader(this.responseHeaders, header);
	
	                return this.responseHeaders[header] || null;
	            },
	
	            getAllResponseHeaders: function getAllResponseHeaders() {
	                if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                    return "";
	                }
	
	                var headers = "";
	
	                for (var header in this.responseHeaders) {
	                    if (this.responseHeaders.hasOwnProperty(header) &&
	                        !/^Set-Cookie2?$/i.test(header)) {
	                        headers += header + ": " + this.responseHeaders[header] + "\r\n";
	                    }
	                }
	
	                return headers;
	            },
	
	            setResponseBody: function setResponseBody(body) {
	                verifyRequestSent(this);
	                verifyHeadersReceived(this);
	                verifyResponseBodyType(body);
	                var contentType = this.getResponseHeader("Content-Type");
	
	                var isTextResponse = this.responseType === "" || this.responseType === "text";
	                clearResponse(this);
	                if (this.async) {
	                    var chunkSize = this.chunkSize || 10;
	                    var index = 0;
	
	                    do {
	                        this.readyStateChange(FakeXMLHttpRequest.LOADING);
	
	                        if (isTextResponse) {
	                            this.responseText = this.response += body.substring(index, index + chunkSize);
	                        }
	                        index += chunkSize;
	                    } while (index < body.length);
	                }
	
	                this.response = convertResponseBody(this.responseType, contentType, body);
	                if (isTextResponse) {
	                    this.responseText = this.response;
	                }
	
	                if (this.responseType === "document") {
	                    this.responseXML = this.response;
	                } else if (this.responseType === "" && isXmlContentType(contentType)) {
	                    this.responseXML = FakeXMLHttpRequest.parseXML(this.responseText);
	                }
	                this.progress = body.length;
	                this.readyStateChange(FakeXMLHttpRequest.DONE);
	            },
	
	            respond: function respond(status, headers, body) {
	                this.status = typeof status === "number" ? status : 200;
	                this.statusText = FakeXMLHttpRequest.statusCodes[this.status];
	                this.setResponseHeaders(headers || {});
	                this.setResponseBody(body || "");
	            },
	
	            uploadProgress: function uploadProgress(progressEventRaw) {
	                if (supportsProgress) {
	                    this.upload.dispatchEvent(new sinon.ProgressEvent("progress", progressEventRaw));
	                }
	            },
	
	            downloadProgress: function downloadProgress(progressEventRaw) {
	                if (supportsProgress) {
	                    this.dispatchEvent(new sinon.ProgressEvent("progress", progressEventRaw));
	                }
	            },
	
	            uploadError: function uploadError(error) {
	                if (supportsCustomEvent) {
	                    this.upload.dispatchEvent(new sinon.CustomEvent("error", {detail: error}));
	                }
	            }
	        });
	
	        sinon.extend(FakeXMLHttpRequest, {
	            UNSENT: 0,
	            OPENED: 1,
	            HEADERS_RECEIVED: 2,
	            LOADING: 3,
	            DONE: 4
	        });
	
	        sinon.useFakeXMLHttpRequest = function () {
	            FakeXMLHttpRequest.restore = function restore(keepOnCreate) {
	                if (sinonXhr.supportsXHR) {
	                    global.XMLHttpRequest = sinonXhr.GlobalXMLHttpRequest;
	                }
	
	                if (sinonXhr.supportsActiveX) {
	                    global.ActiveXObject = sinonXhr.GlobalActiveXObject;
	                }
	
	                delete FakeXMLHttpRequest.restore;
	
	                if (keepOnCreate !== true) {
	                    delete FakeXMLHttpRequest.onCreate;
	                }
	            };
	            if (sinonXhr.supportsXHR) {
	                global.XMLHttpRequest = FakeXMLHttpRequest;
	            }
	
	            if (sinonXhr.supportsActiveX) {
	                global.ActiveXObject = function ActiveXObject(objId) {
	                    if (objId === "Microsoft.XMLHTTP" || /^Msxml2\.XMLHTTP/i.test(objId)) {
	
	                        return new FakeXMLHttpRequest();
	                    }
	
	                    return new sinonXhr.GlobalActiveXObject(objId);
	                };
	            }
	
	            return FakeXMLHttpRequest;
	        };
	
	        sinon.FakeXMLHttpRequest = FakeXMLHttpRequest;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./core");
	        require("../extend");
	        require("./event");
	        require("../log_error");
	        makeApi(sinon);
	        module.exports = sinon;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon, // eslint-disable-line no-undef
	    typeof global !== "undefined" ? global : self
	));
	
	/**
	 * @depend fake_xdomain_request.js
	 * @depend fake_xml_http_request.js
	 * @depend ../format.js
	 * @depend ../log_error.js
	 */
	/**
	 * The Sinon "server" mimics a web server that receives requests from
	 * sinon.FakeXMLHttpRequest and provides an API to respond to those requests,
	 * both synchronously and asynchronously. To respond synchronuously, canned
	 * answers have to be provided upfront.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function () {
	    
	    var push = [].push;
	
	    function responseArray(handler) {
	        var response = handler;
	
	        if (Object.prototype.toString.call(handler) !== "[object Array]") {
	            response = [200, {}, handler];
	        }
	
	        if (typeof response[2] !== "string") {
	            throw new TypeError("Fake server response body should be string, but was " +
	                                typeof response[2]);
	        }
	
	        return response;
	    }
	
	    var wloc = typeof window !== "undefined" ? window.location : {};
	    var rCurrLoc = new RegExp("^" + wloc.protocol + "//" + wloc.host);
	
	    function matchOne(response, reqMethod, reqUrl) {
	        var rmeth = response.method;
	        var matchMethod = !rmeth || rmeth.toLowerCase() === reqMethod.toLowerCase();
	        var url = response.url;
	        var matchUrl = !url || url === reqUrl || (typeof url.test === "function" && url.test(reqUrl));
	
	        return matchMethod && matchUrl;
	    }
	
	    function match(response, request) {
	        var requestUrl = request.url;
	
	        if (!/^https?:\/\//.test(requestUrl) || rCurrLoc.test(requestUrl)) {
	            requestUrl = requestUrl.replace(rCurrLoc, "");
	        }
	
	        if (matchOne(response, this.getHTTPMethod(request), requestUrl)) {
	            if (typeof response.response === "function") {
	                var ru = response.url;
	                var args = [request].concat(ru && typeof ru.exec === "function" ? ru.exec(requestUrl).slice(1) : []);
	                return response.response.apply(response, args);
	            }
	
	            return true;
	        }
	
	        return false;
	    }
	
	    function makeApi(sinon) {
	        sinon.fakeServer = {
	            create: function (config) {
	                var server = sinon.create(this);
	                server.configure(config);
	                if (!sinon.xhr.supportsCORS) {
	                    this.xhr = sinon.useFakeXDomainRequest();
	                } else {
	                    this.xhr = sinon.useFakeXMLHttpRequest();
	                }
	                server.requests = [];
	
	                this.xhr.onCreate = function (xhrObj) {
	                    server.addRequest(xhrObj);
	                };
	
	                return server;
	            },
	            configure: function (config) {
	                var whitelist = {
	                    "autoRespond": true,
	                    "autoRespondAfter": true,
	                    "respondImmediately": true,
	                    "fakeHTTPMethods": true
	                };
	                var setting;
	
	                config = config || {};
	                for (setting in config) {
	                    if (whitelist.hasOwnProperty(setting) && config.hasOwnProperty(setting)) {
	                        this[setting] = config[setting];
	                    }
	                }
	            },
	            addRequest: function addRequest(xhrObj) {
	                var server = this;
	                push.call(this.requests, xhrObj);
	
	                xhrObj.onSend = function () {
	                    server.handleRequest(this);
	
	                    if (server.respondImmediately) {
	                        server.respond();
	                    } else if (server.autoRespond && !server.responding) {
	                        setTimeout(function () {
	                            server.responding = false;
	                            server.respond();
	                        }, server.autoRespondAfter || 10);
	
	                        server.responding = true;
	                    }
	                };
	            },
	
	            getHTTPMethod: function getHTTPMethod(request) {
	                if (this.fakeHTTPMethods && /post/i.test(request.method)) {
	                    var matches = (request.requestBody || "").match(/_method=([^\b;]+)/);
	                    return matches ? matches[1] : request.method;
	                }
	
	                return request.method;
	            },
	
	            handleRequest: function handleRequest(xhr) {
	                if (xhr.async) {
	                    if (!this.queue) {
	                        this.queue = [];
	                    }
	
	                    push.call(this.queue, xhr);
	                } else {
	                    this.processRequest(xhr);
	                }
	            },
	
	            log: function log(response, request) {
	                var str;
	
	                str = "Request:\n" + sinon.format(request) + "\n\n";
	                str += "Response:\n" + sinon.format(response) + "\n\n";
	
	                sinon.log(str);
	            },
	
	            respondWith: function respondWith(method, url, body) {
	                if (arguments.length === 1 && typeof method !== "function") {
	                    this.response = responseArray(method);
	                    return;
	                }
	
	                if (!this.responses) {
	                    this.responses = [];
	                }
	
	                if (arguments.length === 1) {
	                    body = method;
	                    url = method = null;
	                }
	
	                if (arguments.length === 2) {
	                    body = url;
	                    url = method;
	                    method = null;
	                }
	
	                push.call(this.responses, {
	                    method: method,
	                    url: url,
	                    response: typeof body === "function" ? body : responseArray(body)
	                });
	            },
	
	            respond: function respond() {
	                if (arguments.length > 0) {
	                    this.respondWith.apply(this, arguments);
	                }
	
	                var queue = this.queue || [];
	                var requests = queue.splice(0, queue.length);
	
	                for (var i = 0; i < requests.length; i++) {
	                    this.processRequest(requests[i]);
	                }
	            },
	
	            processRequest: function processRequest(request) {
	                try {
	                    if (request.aborted) {
	                        return;
	                    }
	
	                    var response = this.response || [404, {}, ""];
	
	                    if (this.responses) {
	                        for (var l = this.responses.length, i = l - 1; i >= 0; i--) {
	                            if (match.call(this, this.responses[i], request)) {
	                                response = this.responses[i].response;
	                                break;
	                            }
	                        }
	                    }
	
	                    if (request.readyState !== 4) {
	                        this.log(response, request);
	
	                        request.respond(response[0], response[1], response[2]);
	                    }
	                } catch (e) {
	                    sinon.logError("Fake server request processing", e);
	                }
	            },
	
	            restore: function restore() {
	                return this.xhr.restore && this.xhr.restore.apply(this.xhr, arguments);
	            }
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./core");
	        require("./fake_xdomain_request");
	        require("./fake_xml_http_request");
	        require("../format");
	        makeApi(sinon);
	        module.exports = sinon;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * @depend fake_server.js
	 * @depend fake_timers.js
	 */
	/**
	 * Add-on for sinon.fakeServer that automatically handles a fake timer along with
	 * the FakeXMLHttpRequest. The direct inspiration for this add-on is jQuery
	 * 1.3.x, which does not use xhr object's onreadystatehandler at all - instead,
	 * it polls the object for completion with setInterval. Dispite the direct
	 * motivation, there is nothing jQuery-specific in this file, so it can be used
	 * in any environment where the ajax implementation depends on setInterval or
	 * setTimeout.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function () {
	    
	    function makeApi(sinon) {
	        function Server() {}
	        Server.prototype = sinon.fakeServer;
	
	        sinon.fakeServerWithClock = new Server();
	
	        sinon.fakeServerWithClock.addRequest = function addRequest(xhr) {
	            if (xhr.async) {
	                if (typeof setTimeout.clock === "object") {
	                    this.clock = setTimeout.clock;
	                } else {
	                    this.clock = sinon.useFakeTimers();
	                    this.resetClock = true;
	                }
	
	                if (!this.longestTimeout) {
	                    var clockSetTimeout = this.clock.setTimeout;
	                    var clockSetInterval = this.clock.setInterval;
	                    var server = this;
	
	                    this.clock.setTimeout = function (fn, timeout) {
	                        server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);
	
	                        return clockSetTimeout.apply(this, arguments);
	                    };
	
	                    this.clock.setInterval = function (fn, timeout) {
	                        server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);
	
	                        return clockSetInterval.apply(this, arguments);
	                    };
	                }
	            }
	
	            return sinon.fakeServer.addRequest.call(this, xhr);
	        };
	
	        sinon.fakeServerWithClock.respond = function respond() {
	            var returnVal = sinon.fakeServer.respond.apply(this, arguments);
	
	            if (this.clock) {
	                this.clock.tick(this.longestTimeout || 0);
	                this.longestTimeout = 0;
	
	                if (this.resetClock) {
	                    this.clock.restore();
	                    this.resetClock = false;
	                }
	            }
	
	            return returnVal;
	        };
	
	        sinon.fakeServerWithClock.restore = function restore() {
	            if (this.clock) {
	                this.clock.restore();
	            }
	
	            return sinon.fakeServer.restore.apply(this, arguments);
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require) {
	        var sinon = require("./core");
	        require("./fake_server");
	        require("./fake_timers");
	        makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * @depend util/core.js
	 * @depend extend.js
	 * @depend collection.js
	 * @depend util/fake_timers.js
	 * @depend util/fake_server_with_clock.js
	 */
	/**
	 * Manages fake collections as well as fake utilities such as Sinon's
	 * timers and fake XHR implementation in one convenient object.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var push = [].push;
	
	        function exposeValue(sandbox, config, key, value) {
	            if (!value) {
	                return;
	            }
	
	            if (config.injectInto && !(key in config.injectInto)) {
	                config.injectInto[key] = value;
	                sandbox.injectedKeys.push(key);
	            } else {
	                push.call(sandbox.args, value);
	            }
	        }
	
	        function prepareSandboxFromConfig(config) {
	            var sandbox = sinon.create(sinon.sandbox);
	
	            if (config.useFakeServer) {
	                if (typeof config.useFakeServer === "object") {
	                    sandbox.serverPrototype = config.useFakeServer;
	                }
	
	                sandbox.useFakeServer();
	            }
	
	            if (config.useFakeTimers) {
	                if (typeof config.useFakeTimers === "object") {
	                    sandbox.useFakeTimers.apply(sandbox, config.useFakeTimers);
	                } else {
	                    sandbox.useFakeTimers();
	                }
	            }
	
	            return sandbox;
	        }
	
	        sinon.sandbox = sinon.extend(sinon.create(sinon.collection), {
	            useFakeTimers: function useFakeTimers() {
	                this.clock = sinon.useFakeTimers.apply(sinon, arguments);
	
	                return this.add(this.clock);
	            },
	
	            serverPrototype: sinon.fakeServer,
	
	            useFakeServer: function useFakeServer() {
	                var proto = this.serverPrototype || sinon.fakeServer;
	
	                if (!proto || !proto.create) {
	                    return null;
	                }
	
	                this.server = proto.create();
	                return this.add(this.server);
	            },
	
	            inject: function (obj) {
	                sinon.collection.inject.call(this, obj);
	
	                if (this.clock) {
	                    obj.clock = this.clock;
	                }
	
	                if (this.server) {
	                    obj.server = this.server;
	                    obj.requests = this.server.requests;
	                }
	
	                obj.match = sinon.match;
	
	                return obj;
	            },
	
	            restore: function () {
	                if (arguments.length) {
	                    throw new Error("sandbox.restore() does not take any parameters. Perhaps you meant stub.restore()");
	                }
	
	                sinon.collection.restore.apply(this, arguments);
	                this.restoreContext();
	            },
	
	            restoreContext: function () {
	                if (this.injectedKeys) {
	                    for (var i = 0, j = this.injectedKeys.length; i < j; i++) {
	                        delete this.injectInto[this.injectedKeys[i]];
	                    }
	                    this.injectedKeys = [];
	                }
	            },
	
	            create: function (config) {
	                if (!config) {
	                    return sinon.create(sinon.sandbox);
	                }
	
	                var sandbox = prepareSandboxFromConfig(config);
	                sandbox.args = sandbox.args || [];
	                sandbox.injectedKeys = [];
	                sandbox.injectInto = config.injectInto;
	                var prop,
	                    value;
	                var exposed = sandbox.inject({});
	
	                if (config.properties) {
	                    for (var i = 0, l = config.properties.length; i < l; i++) {
	                        prop = config.properties[i];
	                        value = exposed[prop] || prop === "sandbox" && sandbox;
	                        exposeValue(sandbox, config, prop, value);
	                    }
	                } else {
	                    exposeValue(sandbox, config, "sandbox", value);
	                }
	
	                return sandbox;
	            },
	
	            match: sinon.match
	        });
	
	        sinon.sandbox.useFakeXMLHttpRequest = sinon.sandbox.useFakeServer;
	
	        return sinon.sandbox;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./extend");
	        require("./util/fake_server_with_clock");
	        require("./util/fake_timers");
	        require("./collection");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend sandbox.js
	 */
	/**
	 * Test function, sandboxes fakes
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var slice = Array.prototype.slice;
	
	        function test(callback) {
	            var type = typeof callback;
	
	            if (type !== "function") {
	                throw new TypeError("sinon.test needs to wrap a test function, got " + type);
	            }
	
	            function sinonSandboxedTest() {
	                var config = sinon.getConfig(sinon.config);
	                config.injectInto = config.injectIntoThis && this || config.injectInto;
	                var sandbox = sinon.sandbox.create(config);
	                var args = slice.call(arguments);
	                var oldDone = args.length && args[args.length - 1];
	                var exception, result;
	
	                if (typeof oldDone === "function") {
	                    args[args.length - 1] = function sinonDone(res) {
	                        if (res) {
	                            sandbox.restore();
	                        } else {
	                            sandbox.verifyAndRestore();
	                        }
	                        oldDone(res);
	                    };
	                }
	
	                try {
	                    result = callback.apply(this, args.concat(sandbox.args));
	                } catch (e) {
	                    exception = e;
	                }
	
	                if (typeof exception !== "undefined") {
	                    sandbox.restore();
	                    throw exception;
	                } else if (typeof oldDone !== "function") {
	                    sandbox.verifyAndRestore();
	                }
	
	                return result;
	            }
	
	            if (callback.length) {
	                return function sinonAsyncSandboxedTest(done) { // eslint-disable-line no-unused-vars
	                    return sinonSandboxedTest.apply(this, arguments);
	                };
	            }
	
	            return sinonSandboxedTest;
	        }
	
	        test.config = {
	            injectIntoThis: true,
	            injectInto: null,
	            properties: ["spy", "stub", "mock", "clock", "server", "requests"],
	            useFakeTimers: true,
	            useFakeServer: true
	        };
	
	        sinon.test = test;
	        return test;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./sandbox");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	    } else if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(typeof sinon === "object" && sinon || null)); // eslint-disable-line no-undef
	
	/**
	 * @depend util/core.js
	 * @depend test.js
	 */
	/**
	 * Test case, sandboxes all test functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function createTest(property, setUp, tearDown) {
	        return function () {
	            if (setUp) {
	                setUp.apply(this, arguments);
	            }
	
	            var exception, result;
	
	            try {
	                result = property.apply(this, arguments);
	            } catch (e) {
	                exception = e;
	            }
	
	            if (tearDown) {
	                tearDown.apply(this, arguments);
	            }
	
	            if (exception) {
	                throw exception;
	            }
	
	            return result;
	        };
	    }
	
	    function makeApi(sinon) {
	        function testCase(tests, prefix) {
	            if (!tests || typeof tests !== "object") {
	                throw new TypeError("sinon.testCase needs an object with test functions");
	            }
	
	            prefix = prefix || "test";
	            var rPrefix = new RegExp("^" + prefix);
	            var methods = {};
	            var setUp = tests.setUp;
	            var tearDown = tests.tearDown;
	            var testName,
	                property,
	                method;
	
	            for (testName in tests) {
	                if (tests.hasOwnProperty(testName) && !/^(setUp|tearDown)$/.test(testName)) {
	                    property = tests[testName];
	
	                    if (typeof property === "function" && rPrefix.test(testName)) {
	                        method = property;
	
	                        if (setUp || tearDown) {
	                            method = createTest(property, setUp, tearDown);
	                        }
	
	                        methods[testName] = sinon.test(method);
	                    } else {
	                        methods[testName] = tests[testName];
	                    }
	                }
	            }
	
	            return methods;
	        }
	
	        sinon.testCase = testCase;
	        return testCase;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./test");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend times_in_words.js
	 * @depend util/core.js
	 * @depend match.js
	 * @depend format.js
	 */
	/**
	 * Assertions matching the test spy retrieval interface.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal, global) {
	    
	    var slice = Array.prototype.slice;
	
	    function makeApi(sinon) {
	        var assert;
	
	        function verifyIsStub() {
	            var method;
	
	            for (var i = 0, l = arguments.length; i < l; ++i) {
	                method = arguments[i];
	
	                if (!method) {
	                    assert.fail("fake is not a spy");
	                }
	
	                if (method.proxy && method.proxy.isSinonProxy) {
	                    verifyIsStub(method.proxy);
	                } else {
	                    if (typeof method !== "function") {
	                        assert.fail(method + " is not a function");
	                    }
	
	                    if (typeof method.getCall !== "function") {
	                        assert.fail(method + " is not stubbed");
	                    }
	                }
	
	            }
	        }
	
	        function verifyIsValidAssertion(assertionMethod, assertionArgs) {
	            switch (assertionMethod) {
	                case "notCalled":
	                case "called":
	                case "calledOnce":
	                case "calledTwice":
	                case "calledThrice":
	                    if (assertionArgs.length !== 0) {
	                        assert.fail(assertionMethod +
	                                    " takes 1 argument but was called with " +
	                                    (assertionArgs.length + 1) + " arguments");
	                    }
	                    break;
	                default:
	                    break;
	            }
	        }
	
	        function failAssertion(object, msg) {
	            object = object || global;
	            var failMethod = object.fail || assert.fail;
	            failMethod.call(object, msg);
	        }
	
	        function mirrorPropAsAssertion(name, method, message) {
	            if (arguments.length === 2) {
	                message = method;
	                method = name;
	            }
	
	            assert[name] = function (fake) {
	                verifyIsStub(fake);
	
	                var args = slice.call(arguments, 1);
	                verifyIsValidAssertion(name, args);
	
	                var failed = false;
	
	                if (typeof method === "function") {
	                    failed = !method(fake);
	                } else {
	                    failed = typeof fake[method] === "function" ?
	                        !fake[method].apply(fake, args) : !fake[method];
	                }
	
	                if (failed) {
	                    failAssertion(this, (fake.printf || fake.proxy.printf).apply(fake, [message].concat(args)));
	                } else {
	                    assert.pass(name);
	                }
	            };
	        }
	
	        function exposedName(prefix, prop) {
	            return !prefix || /^fail/.test(prop) ? prop :
	                prefix + prop.slice(0, 1).toUpperCase() + prop.slice(1);
	        }
	
	        assert = {
	            failException: "AssertError",
	
	            fail: function fail(message) {
	                var error = new Error(message);
	                error.name = this.failException || assert.failException;
	
	                throw error;
	            },
	
	            pass: function pass() {},
	
	            callOrder: function assertCallOrder() {
	                verifyIsStub.apply(null, arguments);
	                var expected = "";
	                var actual = "";
	
	                if (!sinon.calledInOrder(arguments)) {
	                    try {
	                        expected = [].join.call(arguments, ", ");
	                        var calls = slice.call(arguments);
	                        var i = calls.length;
	                        while (i) {
	                            if (!calls[--i].called) {
	                                calls.splice(i, 1);
	                            }
	                        }
	                        actual = sinon.orderByFirstCall(calls).join(", ");
	                    } catch (e) {
	                        // If this fails, we'll just fall back to the blank string
	                    }
	
	                    failAssertion(this, "expected " + expected + " to be " +
	                                "called in order but were called as " + actual);
	                } else {
	                    assert.pass("callOrder");
	                }
	            },
	
	            callCount: function assertCallCount(method, count) {
	                verifyIsStub(method);
	
	                if (method.callCount !== count) {
	                    var msg = "expected %n to be called " + sinon.timesInWords(count) +
	                        " but was called %c%C";
	                    failAssertion(this, method.printf(msg));
	                } else {
	                    assert.pass("callCount");
	                }
	            },
	
	            expose: function expose(target, options) {
	                if (!target) {
	                    throw new TypeError("target is null or undefined");
	                }
	
	                var o = options || {};
	                var prefix = typeof o.prefix === "undefined" && "assert" || o.prefix;
	                var includeFail = typeof o.includeFail === "undefined" || !!o.includeFail;
	
	                for (var method in this) {
	                    if (method !== "expose" && (includeFail || !/^(fail)/.test(method))) {
	                        target[exposedName(prefix, method)] = this[method];
	                    }
	                }
	
	                return target;
	            },
	
	            match: function match(actual, expectation) {
	                var matcher = sinon.match(expectation);
	                if (matcher.test(actual)) {
	                    assert.pass("match");
	                } else {
	                    var formatted = [
	                        "expected value to match",
	                        "    expected = " + sinon.format(expectation),
	                        "    actual = " + sinon.format(actual)
	                    ];
	
	                    failAssertion(this, formatted.join("\n"));
	                }
	            }
	        };
	
	        mirrorPropAsAssertion("called", "expected %n to have been called at least once but was never called");
	        mirrorPropAsAssertion("notCalled", function (spy) {
	            return !spy.called;
	        }, "expected %n to not have been called but was called %c%C");
	        mirrorPropAsAssertion("calledOnce", "expected %n to be called once but was called %c%C");
	        mirrorPropAsAssertion("calledTwice", "expected %n to be called twice but was called %c%C");
	        mirrorPropAsAssertion("calledThrice", "expected %n to be called thrice but was called %c%C");
	        mirrorPropAsAssertion("calledOn", "expected %n to be called with %1 as this but was called with %t");
	        mirrorPropAsAssertion(
	            "alwaysCalledOn",
	            "expected %n to always be called with %1 as this but was called with %t"
	        );
	        mirrorPropAsAssertion("calledWithNew", "expected %n to be called with new");
	        mirrorPropAsAssertion("alwaysCalledWithNew", "expected %n to always be called with new");
	        mirrorPropAsAssertion("calledWith", "expected %n to be called with arguments %*%C");
	        mirrorPropAsAssertion("calledWithMatch", "expected %n to be called with match %*%C");
	        mirrorPropAsAssertion("alwaysCalledWith", "expected %n to always be called with arguments %*%C");
	        mirrorPropAsAssertion("alwaysCalledWithMatch", "expected %n to always be called with match %*%C");
	        mirrorPropAsAssertion("calledWithExactly", "expected %n to be called with exact arguments %*%C");
	        mirrorPropAsAssertion("alwaysCalledWithExactly", "expected %n to always be called with exact arguments %*%C");
	        mirrorPropAsAssertion("neverCalledWith", "expected %n to never be called with arguments %*%C");
	        mirrorPropAsAssertion("neverCalledWithMatch", "expected %n to never be called with match %*%C");
	        mirrorPropAsAssertion("threw", "%n did not throw exception%C");
	        mirrorPropAsAssertion("alwaysThrew", "%n did not always throw exception%C");
	
	        sinon.assert = assert;
	        return assert;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./match");
	        require("./format");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon, // eslint-disable-line no-undef
	    typeof global !== "undefined" ? global : self
	));
	
	  return sinon;
	}));


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(28));
	__export(__webpack_require__(29));
	//# sourceMappingURL=index.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var wire_1 = __webpack_require__(29);
	var REFUSE_PROPOSAL = {};
	exports.REFUSE_PROPOSAL = REFUSE_PROPOSAL;
	var nextId = 1;
	var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
	function init(adapters) {
	    var allReceives = [];
	    var allReadies = [];
	    var allPostRenders = [];
	    var allNextActions = [];
	    var createRootWire = (adapters && adapters.rootWire) || wire_1.defaultWireCreator();
	    var createComponentWire = (adapters && adapters.componentWire) || wire_1.defaultWireCreator();
	    var rootWire = createRootWire("meiosis_" + (nextId++));
	    var componentWire = createComponentWire();
	    var propose = componentWire.emit;
	    var rootModel = null;
	    var initialModelCount = 0;
	    var createComponent = function (config) {
	        if (!config || (!config.actions &&
	            !config.nextAction &&
	            !config.initialModel &&
	            !config.ready &&
	            !config.receive &&
	            !config.view &&
	            !config.postRender &&
	            !config.setup)) {
	            throw new Error("Please specify a config when calling createComponent.");
	        }
	        if (rootModel === null) {
	            var startingModel = {};
	            rootModel = startingModel;
	        }
	        var initialModel = config.initialModel;
	        var initialModelError = false;
	        if (typeof initialModel === "function") {
	            rootModel = initialModel(rootModel);
	            initialModelError = initialModelCount > 0;
	        }
	        else if (initialModel) {
	            rootModel = initialModel;
	            initialModelCount++;
	            initialModelError = initialModelCount > 1;
	        }
	        if (initialModelError) {
	            throw new Error("When more than one initialModel is used, they must all be functions.");
	        }
	        var actions = config.actions ? config.actions(propose) : propose;
	        var setup = config.setup;
	        if (setup) {
	            setup(actions);
	        }
	        var receive = config.receive;
	        if (receive) {
	            allReceives.push(receive);
	        }
	        var ready = config.ready;
	        if (ready) {
	            allReadies.push(function () { return ready(actions); });
	        }
	        var postRender = config.postRender;
	        if (postRender) {
	            allPostRenders.push(postRender);
	        }
	        var nextAction = config.nextAction;
	        if (nextAction) {
	            allNextActions.push(function (model, proposal) { return nextAction(model, proposal, actions); });
	        }
	        return function (model) {
	            return config.view ? config.view(model, actions) : undefined;
	        };
	    };
	    var run = function (render, rootComponent) {
	        componentWire.listen(function (proposal) {
	            var accepted = true;
	            for (var i = 0; i < allReceives.length; i++) {
	                var receive = allReceives[i];
	                var received = receive(rootModel, proposal);
	                if (received === REFUSE_PROPOSAL) {
	                    accepted = false;
	                    break;
	                }
	                else {
	                    rootModel = received;
	                }
	            }
	            ;
	            if (accepted) {
	                rootWire.emit(rootModel);
	                allNextActions.forEach(function (nextAction) { return nextAction(rootModel, proposal); });
	            }
	        });
	        var renderRoot_ = function (model) {
	            var result = render(model, rootComponent, propose);
	            allPostRenders.forEach(function (postRender) { return postRender(model); });
	            return result;
	        };
	        renderRoot_.initialModel = rootModel;
	        var renderRoot = renderRoot_;
	        rootWire.listen(renderRoot);
	        rootWire.emit(rootModel);
	        allReadies.forEach(function (ready) { return ready(); });
	        var devtool = window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"];
	        if (devtool) {
	            var initialModel_1 = copy(rootModel);
	            var bufferedReceives_1 = [];
	            var devtoolInitialized_1 = false;
	            createComponent({
	                receive: function (model, proposal) {
	                    if (devtoolInitialized_1) {
	                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
	                    }
	                    else {
	                        bufferedReceives_1.push({ model: copy(model), proposal: proposal });
	                    }
	                    return model;
	                }
	            });
	            window.addEventListener("message", function (evt) {
	                if (evt.data.type === "MEIOSIS_RENDER_ROOT") {
	                    renderRoot(evt.data.model);
	                }
	                else if (evt.data.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
	                    window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: initialModel_1 }, "*");
	                    devtoolInitialized_1 = true;
	                    for (var i = 0; i < bufferedReceives_1.length; i++) {
	                        var _a = bufferedReceives_1[i], model = _a.model, proposal = _a.proposal;
	                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
	                    }
	                }
	            });
	        }
	        return renderRoot;
	    };
	    return {
	        createComponent: createComponent,
	        run: run
	    };
	}
	exports.init = init;
	var instance = init();
	var createComponent = instance.createComponent;
	exports.createComponent = createComponent;
	var run = instance.run;
	exports.run = run;
	//# sourceMappingURL=meiosis.js.map

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	var wires = {};
	var nextWireId = 1;
	function defaultWireCreator() {
	    var createWire = function () {
	        var listener = null;
	        var listen = function (lstnr) { return listener = lstnr; };
	        var emit = function (proposal) { return listener(proposal); };
	        return { emit: emit, listen: listen };
	    };
	    return function (wireName) {
	        var name = wireName;
	        if (!name) {
	            name = "wire_" + nextWireId;
	            nextWireId++;
	        }
	        var theWire = wires[name];
	        if (!theWire) {
	            theWire = createWire();
	            wires[name] = theWire;
	        }
	        return theWire;
	    };
	}
	exports.defaultWireCreator = defaultWireCreator;
	;
	//# sourceMappingURL=wire.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
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
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
	
		var _meiosisInferno = __webpack_require__(1);
	
		Object.keys(_meiosisInferno).forEach(function (key) {
		  if (key === "default" || key === "__esModule") return;
		  Object.defineProperty(exports, key, {
		    enumerable: true,
		    get: function get() {
		      return _meiosisInferno[key];
		    }
		  });
		});
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
	
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.renderer = undefined;
	
		var _infernoDom = __webpack_require__(2);
	
		var _meiosisRender = __webpack_require__(3);
	
		var intoElement = function intoElement(element) {
		  return function (model, rootComponent) {
		    return (0, _infernoDom.render)(rootComponent(model), element);
		  };
		};
		var renderer = function renderer() {
		  return (0, _meiosisRender.meiosisRender)(intoElement);
		};
	
		exports.renderer = renderer;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = __webpack_require__(31);
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		function __export(m) {
		    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
		}
		__export(__webpack_require__(4));
		//# sourceMappingURL=index.js.map
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		"use strict";
		function meiosisRender(intoElement) {
		    var intoId = function (doc, id) {
		        return intoElement(doc.getElementById(id));
		    };
		    var intoSelector = function (doc, selector) {
		        return intoElement(doc.querySelector(selector));
		    };
		    var intoViewIds = function (doc) { return function (model, rootComponent) {
		        var views = rootComponent(model);
		        var _loop_1 = function(id) {
		            var component = function (model) { return views[id]; };
		            intoElement(doc.getElementById(id))(model, component);
		        };
		        for (var id in views) {
		            _loop_1(id);
		        }
		    }; };
		    return {
		        intoElement: intoElement,
		        intoId: intoId,
		        intoSelector: intoSelector,
		        intoViewIds: intoViewIds
		    };
		}
		exports.meiosisRender = meiosisRender;
		//# sourceMappingURL=meiosis-render.js.map
	
	/***/ }
	/******/ ]);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(32);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno-dom v0.7.27
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.InfernoDOM = factory());
	}(this, (function () { 'use strict';
	
	function addChildrenToProps(children, props) {
		if (!isNullOrUndefined(children)) {
			var isChildrenArray = isArray(children);
			if (isChildrenArray && children.length > 0 || !isChildrenArray) {
				if (props) {
					props = Object.assign({}, props, { children: children });
				} else {
					props = {
						children: children
					};
				}
			}
		}
		return props;
	}
	
	var NO_RENDER = 'NO_RENDER';
	
	// Runs only once in applications lifetime
	var isBrowser = typeof window !== 'undefined' && window.document;
	
	function isArray(obj) {
		return obj instanceof Array;
	}
	
	function isStatefulComponent(obj) {
		return obj.prototype && obj.prototype.render !== undefined;
	}
	
	function isStringOrNumber(obj) {
		return isString(obj) || isNumber(obj);
	}
	
	function isNullOrUndefined(obj) {
		return isUndefined(obj) || isNull(obj);
	}
	
	function isInvalidNode(obj) {
		return isNull(obj) || obj === false || obj === true || isUndefined(obj);
	}
	
	function isFunction(obj) {
		return typeof obj === 'function';
	}
	
	function isString(obj) {
		return typeof obj === 'string';
	}
	
	function isNumber(obj) {
		return typeof obj === 'number';
	}
	
	function isNull(obj) {
		return obj === null;
	}
	
	function isTrue(obj) {
		return obj === true;
	}
	
	function isUndefined(obj) {
		return obj === undefined;
	}
	
	function deepScanChildrenForNode(children, node) {
		if (!isInvalidNode(children)) {
			if (isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i];
	
					if (!isInvalidNode(child)) {
						if (child === node) {
							return true;
						} else if (child.children) {
							return deepScanChildrenForNode(child.children, node);
						}
					}
				}
			} else {
				if (children === node) {
					return true;
				} else if (children.children) {
					return deepScanChildrenForNode(children.children, node);
				}
			}
		}
		return false;
	}
	
	function getRefInstance$1(node, instance) {
		var children = instance.props.children;
	
		if (deepScanChildrenForNode(children, node)) {
			return getRefInstance$1(node, instance._parentComponent);
		}
		return instance;
	}
	
	var recyclingEnabled = true;
	
	function recycle(node, bp, lifecycle, context, instance) {
		if (bp !== undefined) {
			var pool = bp.pool;
			var recycledNode = pool.pop();
	
			if (!isNullOrUndefined(recycledNode)) {
				patch(recycledNode, node, null, lifecycle, context, instance, bp.isSVG);
				return node.dom;
			}
		}
		return null;
	}
	
	function pool(node) {
		var bp = node.bp;
	
		if (!isNullOrUndefined(bp)) {
			bp.pool.push(node);
			return true;
		}
		return false;
	}
	
	function unmount(input, parentDom) {
		if (isVList(input)) {
			unmountVList(input, parentDom, true);
		} else if (isVNode(input)) {
			unmountVNode(input, parentDom, false);
		}
	}
	
	function unmountVList(vList, parentDom, removePointer) {
		var items = vList.items;
		var itemsLength = items.length;
		var pointer = vList.pointer;
	
		if (itemsLength > 0) {
			for (var i = 0; i < itemsLength; i++) {
				var item = items[i];
	
				if (isVList(item)) {
					unmountVList(item, parentDom, true);
				} else {
					if (parentDom) {
						removeChild(parentDom, item.dom);
					}
					unmount(item, null);
				}
			}
		}
		if (parentDom && removePointer) {
			removeChild(parentDom, pointer);
		}
	}
	
	function unmountVNode(node, parentDom, shallow) {
		var instance = node.instance;
		var instanceHooks = null;
		var instanceChildren = null;
	
		if (!isNullOrUndefined(instance)) {
			instanceHooks = instance.hooks;
			instanceChildren = instance.children;
	
			if (instance.render !== undefined) {
				instance.componentWillUnmount();
				instance._unmounted = true;
				componentToDOMNodeMap.delete(instance);
				!shallow && unmount(instance._lastNode, null);
			}
		}
		var hooks = node.hooks || instanceHooks;
	
		if (!isNullOrUndefined(hooks)) {
			if (!isNullOrUndefined(hooks.willDetach)) {
				hooks.willDetach(node.dom);
			}
			if (!isNullOrUndefined(hooks.componentWillUnmount)) {
				hooks.componentWillUnmount(node.dom, hooks);
			}
		}
		var children = (isNullOrUndefined(instance) ? node.children : null) || instanceChildren;
	
		if (!isNullOrUndefined(children)) {
			if (isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					unmount(children[i], null);
				}
			} else {
				unmount(children, null);
			}
		}
	}
	
	function VText(text) {
		this.text = text;
		this.dom = null;
	}
	
	function VPlaceholder() {
		this.placeholder = true;
		this.dom = null;
	}
	
	function VList(items) {
		this.dom = null;
		this.pointer = null;
		this.items = items;
	}
	
	function createVText(text) {
		return new VText(text);
	}
	
	function createVPlaceholder() {
		return new VPlaceholder();
	}
	
	function createVList(items) {
		return new VList(items);
	}
	
	function constructDefaults(string, object, value) {
		/* eslint no-return-assign: 0 */
		string.split(',').forEach(function (i) { return object[i] = value; });
	}
	
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xmlNS = 'http://www.w3.org/XML/1998/namespace';
	var strictProps = {};
	var booleanProps = {};
	var namespaces = {};
	var isUnitlessNumber = {};
	
	constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
	constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
	constructDefaults('volume,value', strictProps, true);
	constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,selected,readonly,multiple,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate', booleanProps, true);
	constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);
	
	function isVText(o) {
		return o.text !== undefined;
	}
	
	function isVPlaceholder(o) {
		return o.placeholder === true;
	}
	
	function isVList(o) {
		return o.items !== undefined;
	}
	
	function isVNode(o) {
		return o.tag !== undefined || o.bp !== undefined;
	}
	
	function insertOrAppend(parentDom, newNode, nextNode) {
		if (isNullOrUndefined(nextNode)) {
			parentDom.appendChild(newNode);
		} else {
			parentDom.insertBefore(newNode, nextNode);
		}
	}
	
	function replaceVListWithNode(parentDom, vList, dom) {
		var pointer = vList.pointer;
	
		unmountVList(vList, parentDom, false);
		replaceNode(parentDom, dom, pointer);
	}
	
	function documentCreateElement(tag, isSVG) {
		var dom;
	
		if (isSVG === true) {
			dom = document.createElementNS('http://www.w3.org/2000/svg', tag);
		} else {
			dom = document.createElement(tag);
		}
		return dom;
	}
	
	function appendText(text, parentDom, singleChild) {
		if (parentDom === null) {
			return document.createTextNode(text);
		} else {
			if (singleChild) {
				if (text !== '') {
					parentDom.textContent = text;
					return parentDom.firstChild;
				} else {
					var textNode = document.createTextNode('');
	
					parentDom.appendChild(textNode);
					return textNode;
				}
			} else {
				var textNode$1 = document.createTextNode(text);
	
				parentDom.appendChild(textNode$1);
				return textNode$1;
			}
		}
	}
	
	function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG) {
		var lastInstance = null;
		var instanceLastNode = lastNode._lastNode;
	
		if (!isNullOrUndefined(instanceLastNode)) {
			lastInstance = lastNode;
			lastNode = instanceLastNode;
		}
		unmount(lastNode, false);
		var dom = mount(nextNode, null, lifecycle, context, instance, isSVG);
	
		nextNode.dom = dom;
		replaceNode(parentDom, dom, lastNode.dom);
		if (lastInstance !== null) {
			lastInstance._lastNode = nextNode;
		}
	}
	
	function replaceNode(parentDom, nextDom, lastDom) {
		parentDom.replaceChild(nextDom, lastDom);
	}
	
	function normalise(object) {
		if (isStringOrNumber(object)) {
			return createVText(object);
		} else if (isInvalidNode(object)) {
			return createVPlaceholder();
		} else if (isArray(object)) {
			return createVList(object);
		}
		return object;
	}
	
	function normaliseChild(children, i) {
		var child = children[i];
	
		return children[i] = normalise(child);
	}
	
	function remove(node, parentDom) {
		if (isVList(node)) {
			return unmount(node, parentDom);
		}
		var dom = node.dom;
		if (dom === parentDom) {
			dom.innerHTML = '';
		} else {
			removeChild(parentDom, dom);
			if (recyclingEnabled) {
				pool(node);
			}
		}
		unmount(node, false);
	}
	
	function removeChild(parentDom, dom) {
		parentDom.removeChild(dom);
	}
	
	function removeEvents(events, lastEventKeys, dom) {
		var eventKeys = lastEventKeys || Object.keys(events);
	
		for (var i = 0; i < eventKeys.length; i++) {
			var event = eventKeys[i];
	
			dom[event] = null;
		}
	}
	
	// TODO: for node we need to check if document is valid
	function getActiveNode() {
		return document.activeElement;
	}
	
	function removeAllChildren(dom, children) {
		if (recyclingEnabled) {
			var childrenLength = children.length;
	
			if (childrenLength > 5) {
				for (var i = 0; i < childrenLength; i++) {
					var child = children[i];
	
					if (!isInvalidNode(child)) {
						pool(child);
					}
				}
			}
		}
		dom.textContent = '';
	}
	
	function resetActiveNode(activeNode) {
		if (activeNode !== null && activeNode !== document.body && document.activeElement !== activeNode) {
			activeNode.focus(); // TODO: verify are we doing new focus event, if user has focus listener this might trigger it
		}
	}
	
	function isKeyed(lastChildren, nextChildren) {
		if (lastChildren.complex) {
			return false;
		}
		return nextChildren.length && !isNullOrUndefined(nextChildren[0]) && !isNullOrUndefined(nextChildren[0].key)
			&& lastChildren.length && !isNullOrUndefined(lastChildren[0]) && !isNullOrUndefined(lastChildren[0].key);
	}
	
	function selectOptionValueIfNeeded(vdom, values) {
		if (vdom.tag !== 'option') {
			for (var i = 0, len = vdom.children.length; i < len; i++) {
				selectOptionValueIfNeeded(vdom.children[i], values);
			}
			// NOTE! Has to be a return here to catch optGroup elements
			return;
		}
	
		var value = vdom.attrs && vdom.attrs.value;
	
		if (values[value]) {
			vdom.attrs = vdom.attrs || {};
			vdom.attrs.selected = 'selected';
			vdom.dom.selected = true;
		} else {
			vdom.dom.selected = false;
		}
	}
	
	function selectValue(vdom) {
		var value = vdom.attrs && vdom.attrs.value;
	
		var values = {};
		if (isArray(value)) {
			for (var i = 0, len = value.length; i < len; i++) {
				values[value[i]] = value[i];
			}
		} else {
			values[value] = value;
		}
		for (var i$1 = 0, len$1 = vdom.children.length; i$1 < len$1; i$1++) {
			selectOptionValueIfNeeded(vdom.children[i$1], values);
		}
	
		if (vdom.attrs && vdom.attrs[value]) {
			delete vdom.attrs.value; // TODO! Avoid deletion here. Set to null or undef. Not sure what you want to usev
		}
	}
	
	function handleAttachedHooks(hooks, lifecycle, dom) {
		if (!isNullOrUndefined(hooks.created)) {
			hooks.created(dom);
		}
		if (!isNullOrUndefined(hooks.attached)) {
			lifecycle.addListener(function () {
				hooks.attached(dom);
			});
		}
	}
	
	function setValueProperty(nextNode) {
		var value = nextNode.attrs.value;
		if (!isNullOrUndefined(value)) {
			nextNode.dom.value = value;
		}
	}
	
	function setFormElementProperties(nextTag, nextNode) {
		if (nextTag === 'input' && nextNode.attrs) {
			var inputType = nextNode.attrs.type;
			if (inputType === 'text') {
				setValueProperty(nextNode);
			} else if (inputType === 'checkbox' || inputType === 'radio') {
				var checked = nextNode.attrs.checked;
				nextNode.dom.checked = !!checked;
			}
		} else if (nextTag === 'textarea') {
			setValueProperty(nextNode);
		}
	}
	
	function mount(input, parentDom, lifecycle, context, instance, isSVG) {
		if (isVPlaceholder(input)) {
			return mountVPlaceholder(input, parentDom);
		} else if (isVText(input)) {
			return mountVText(input, parentDom);
		} else if (isVList(input)) {
			return mountVList(input, parentDom, lifecycle, context, instance, isSVG);
		} else if (isVNode(input)) {
			return mountVNode$1(input, parentDom, lifecycle, context, instance, isSVG);
		} else {
			var normalisedInput = normalise(input);
	
			if (input !== normalisedInput) {
				return mount(normalisedInput, parentDom, lifecycle, context, instance, isSVG);
			} else {
				throw new Error(("Inferno Error: invalid object \"" + (typeof input) + "\" passed to mount()"));
			}
		}
	}
	
	function mountVNode$1(vNode, parentDom, lifecycle, context, instance, isSVG) {
		var bp = vNode.bp;
	
		if (isUndefined(bp)) {
			return mountVNodeWithoutBlueprint(vNode, parentDom, lifecycle, context, instance, isSVG);
		} else {
			if (recyclingEnabled) {
				var dom = recycle(vNode, bp, lifecycle, context, instance);
	
				if (!isNull(dom)) {
					if (!isNull(parentDom)) {
						parentDom.appendChild(dom);
					}
					return dom;
				}
			}
			return mountVNodeWithBlueprint(vNode, bp, parentDom, lifecycle, context, instance);
		}
	}
	
	function mountVList(vList, parentDom, lifecycle, context, instance, isSVG) {
		var items = vList.items;
		var pointer = document.createTextNode('');
		var dom = document.createDocumentFragment();
	
		mountArrayChildren(items, dom, lifecycle, context, instance, isSVG);
		vList.pointer = pointer;
		vList.dom = dom;
		dom.appendChild(pointer);
		if (parentDom) {
			insertOrAppend(parentDom, dom);
		}
		return dom;
	}
	
	function mountVText(vText, parentDom) {
		var dom = document.createTextNode(vText.text);
	
		vText.dom = dom;
		if (parentDom) {
			insertOrAppend(parentDom, dom);
		}
		return dom;
	}
	
	function mountVPlaceholder(vPlaceholder, parentDom) {
		var dom = document.createTextNode('');
	
		vPlaceholder.dom = dom;
		if (parentDom) {
			insertOrAppend(parentDom, dom);
		}
		return dom;
	}
	
	function handleSelects(node) {
		if (node.tag === 'select') {
			selectValue(node);
		}
	}
	
	function mountBlueprintAttrs(node, bp, dom, instance) {
		handleSelects(node);
		var attrs = node.attrs;
	
		if (isNull(bp.attrKeys)) {
			var newKeys = Object.keys(attrs);
			bp.attrKeys = bp.attrKeys ? bp.attrKeys.concat(newKeys) : newKeys;
		}
		var attrKeys = bp.attrKeys;
	
		mountAttributes(node, attrs, attrKeys, dom, instance);
	}
	
	function mountBlueprintEvents(node, bp, dom) {
		var events = node.events;
	
		if (isNull(bp.eventKeys)) {
			bp.eventKeys = Object.keys(events);
		}
		var eventKeys = bp.eventKeys;
	
		mountEvents(events, eventKeys, dom);
	}
	
	function mountVNodeWithBlueprint(node, bp, parentDom, lifecycle, context, instance) {
		var tag = node.tag;
	
		if (isTrue(bp.isComponent)) {
			return mountComponent(node, tag, node.attrs || {}, node.hooks, node.children, instance, parentDom, lifecycle, context);
		}
		var dom = documentCreateElement(bp.tag, bp.isSVG);
	
		node.dom = dom;
		if (isTrue(bp.hasHooks)) {
			handleAttachedHooks(node.hooks, lifecycle, dom);
		}
		if (isTrue(bp.lazy)) {
			handleLazyAttached(node, lifecycle, dom);
		}
		var children = node.children;
		// bp.childrenType:
		// 0: no children
		// 1: text node
		// 2: single child
		// 3: multiple children
		// 4: multiple children (keyed)
		// 5: variable children (defaults to no optimisation)
	
		switch (bp.childrenType) {
			case 1:
				appendText(children, dom, true);
				break;
			case 2:
				mount(node.children, dom, lifecycle, context, instance, bp.isSVG);
				break;
			case 3:
				mountArrayChildren(children, dom, lifecycle, context, instance, bp.isSVG);
				break;
			case 4:
				for (var i = 0; i < children.length; i++) {
					mount(children[i], dom, lifecycle, context, instance, bp.isSVG);
				}
				break;
			case 5:
				mountChildren(node, children, dom, lifecycle, context, instance, bp.isSVG);
				break;
			default:
				break;
		}
	
		if (isTrue(bp.hasAttrs)) {
			mountBlueprintAttrs(node, bp, dom, instance);
		}
		if (isTrue(bp.hasClassName)) {
			dom.className = node.className;
		}
		if (isTrue(bp.hasStyle)) {
			patchStyle(null, node.style, dom);
		}
		if (isTrue(bp.hasEvents)) {
			mountBlueprintEvents(node, bp, dom);
		}
		if (!isNull(parentDom)) {
			parentDom.appendChild(dom);
		}
		return dom;
	}
	
	function mountVNodeWithoutBlueprint(node, parentDom, lifecycle, context, instance, isSVG) {
		var tag = node.tag;
	
		if (isFunction(tag)) {
			return mountComponent(node, tag, node.attrs || {}, node.hooks, node.children, instance, parentDom, lifecycle, context);
		}
		if (!isString(tag) || tag === '') {
			throw Error('Inferno Error: Expected function or string for element tag type');
		}
		if (tag === 'svg') {
			isSVG = true;
		}
		var dom = documentCreateElement(tag, isSVG);
		var children = node.children;
		var attrs = node.attrs;
		var events = node.events;
		var hooks = node.hooks;
		var className = node.className;
		var style = node.style;
	
		node.dom = dom;
		if (!isNullOrUndefined(hooks)) {
			handleAttachedHooks(hooks, lifecycle, dom);
		}
		if (!isInvalidNode(children)) {
			mountChildren(node, children, dom, lifecycle, context, instance, isSVG);
		}
		if (!isNullOrUndefined(attrs)) {
			handleSelects(node);
			mountAttributes(node, attrs, Object.keys(attrs), dom, instance);
		}
		if (!isNullOrUndefined(className)) {
			dom.className = className;
		}
		if (!isNullOrUndefined(style)) {
			patchStyle(null, style, dom);
		}
		if (!isNullOrUndefined(events)) {
			mountEvents(events, Object.keys(events), dom);
		}
		if (!isNull(parentDom)) {
			parentDom.appendChild(dom);
		}
		return dom;
	}
	
	function mountArrayChildren(children, parentDom, lifecycle, context, instance, isSVG) {
		children.complex = false;
		for (var i = 0; i < children.length; i++) {
			var child = normaliseChild(children, i);
	
			if (isVText(child)) {
				mountVText(child, parentDom);
				children.complex = true;
			} else if (isVPlaceholder(child)) {
				mountVPlaceholder(child, parentDom);
				children.complex = true;
			} else if (isVList(child)) {
				mountVList(child, parentDom, lifecycle, context, instance, isSVG);
				children.complex = true;
			} else {
				mount(child, parentDom, lifecycle, context, instance, isSVG);
			}
		}
	}
	
	function mountChildren(node, children, parentDom, lifecycle, context, instance, isSVG) {
		if (isArray(children)) {
			mountArrayChildren(children, parentDom, lifecycle, context, instance, isSVG);
		} else if (isStringOrNumber(children)) {
			appendText(children, parentDom, true);
		} else if (!isInvalidNode(children)) {
			mount(children, parentDom, lifecycle, context, instance, isSVG);
		}
	}
	
	function mountRef(instance, value, refValue) {
		if (!isInvalidNode(instance) && isString(value)) {
			instance.refs[value] = refValue;
		}
	}
	
	function mountEvents(events, eventKeys, dom) {
		for (var i = 0; i < eventKeys.length; i++) {
			var event = eventKeys[i];
	
			dom[event] = events[event];
		}
	}
	
	function mountComponent(parentNode, Component, props, hooks, children, lastInstance, parentDom, lifecycle, context) {
		props = addChildrenToProps(children, props);
	
		var dom;
		if (isStatefulComponent(Component)) {
			var instance = new Component(props, context);
	
			instance._patch = patch;
			instance._componentToDOMNodeMap = componentToDOMNodeMap;
			if (!isNullOrUndefined(lastInstance) && props.ref) {
				mountRef(lastInstance, props.ref, instance);
			}
			var childContext = instance.getChildContext();
	
			if (!isNullOrUndefined(childContext)) {
				context = Object.assign({}, context, childContext);
			}
			instance.context = context;
			instance._unmounted = false;
			instance._parentNode = parentNode;
			if (lastInstance) {
				instance._parentComponent = lastInstance;
			}
			instance._pendingSetState = true;
			instance.componentWillMount();
			var node = instance.render();
	
			if (isInvalidNode(node)) {
				node = createVPlaceholder();
			}
			instance._pendingSetState = false;
			dom = mount(node, null, lifecycle, context, instance, false);
			instance._lastNode = node;
			instance.componentDidMount();
			if (parentDom !== null && !isInvalidNode(dom)) {
				parentDom.appendChild(dom);
			}
			componentToDOMNodeMap.set(instance, dom);
			parentNode.dom = dom;
			parentNode.instance = instance;
		} else {
			if (!isNullOrUndefined(hooks)) {
				if (!isNullOrUndefined(hooks.componentWillMount)) {
					hooks.componentWillMount(null, props);
				}
				if (!isNullOrUndefined(hooks.componentDidMount)) {
					lifecycle.addListener(function () {
						hooks.componentDidMount(dom, props);
					});
				}
			}
	
			/* eslint new-cap: 0 */
			var node$1 = Component(props, context);
	
			if (isInvalidNode(node$1)) {
				node$1 = createVPlaceholder();
			}
			dom = mount(node$1, null, lifecycle, context, null, false);
	
			parentNode.instance = node$1;
	
			if (parentDom !== null && !isInvalidNode(dom)) {
				parentDom.appendChild(dom);
			}
			parentNode.dom = dom;
		}
		return dom;
	}
	
	function mountAttributes(node, attrs, attrKeys, dom, instance) {
		for (var i = 0; i < attrKeys.length; i++) {
			var attr = attrKeys[i];
	
			if (attr === 'ref') {
				mountRef(getRefInstance$1(node, instance), attrs[attr], dom);
			} else {
				patchAttribute(attr, null, attrs[attr], dom);
			}
		}
	}
	
	function patch(lastInput, nextInput, parentDom, lifecycle, context, instance, isSVG) {
		if (lastInput !== nextInput) {
			if (isInvalidNode(lastInput)) {
				mount(nextInput, parentDom, lifecycle, context, instance, isSVG);
			} else if (isInvalidNode(nextInput)) {
				remove(lastInput, parentDom);
			} else if (isStringOrNumber(lastInput)) {
				if (isStringOrNumber(nextInput)) {
					parentDom.firstChild.nodeValue = nextInput;
				} else {
					var dom = mount(nextInput, null, lifecycle, context, instance, isSVG);
	
					nextInput.dom = dom;
					replaceNode(parentDom, dom, parentDom.firstChild);
				}
			} else if (isStringOrNumber(nextInput)) {
				replaceNode(parentDom, document.createTextNode(nextInput), lastInput.dom);
			} else {
				if (isVList(nextInput)) {
					if (isVList(lastInput)) {
						patchVList(lastInput, nextInput, parentDom, lifecycle, context, instance, isSVG);
					} else {
						replaceNode(parentDom, mountVList(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
						unmount(lastInput, null);
					}
				} else if (isVList(lastInput)) {
					replaceVListWithNode(parentDom, lastInput, mount(nextInput, null, lifecycle, context, instance, isSVG));
				} else if (isVPlaceholder(nextInput)) {
					if (isVPlaceholder(lastInput)) {
						patchVFragment(lastInput, nextInput);
					} else {
						replaceNode(parentDom, mountVPlaceholder(nextInput, null), lastInput.dom);
						unmount(lastInput, null);
					}
				} else if (isVPlaceholder(lastInput)) {
					replaceNode(parentDom, mount(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
				} else if (isVText(nextInput)) {
					if (isVText(lastInput)) {
						patchVText(lastInput, nextInput);
					} else {
						replaceNode(parentDom, mountVText(nextInput, null), lastInput.dom);
						unmount(lastInput, null);
					}
				} else if (isVText(lastInput)) {
					replaceNode(parentDom, mount(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
				} else if (isVNode(nextInput)) {
					if (isVNode(lastInput)) {
						patchVNode(lastInput, nextInput, parentDom, lifecycle, context, instance, isSVG, false);
					} else {
						replaceNode(parentDom, mountVNode(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
						unmount(lastInput, null);
					}
				} else if (isVNode(lastInput)) {
					replaceNode(parentDom, mount(nextInput, null, lifecycle, context, instance, isSVG), lastInput.dom);
					unmount(lastInput, null);
				} else {
					return patch(lastInput, normalise(nextInput), parentDom, lifecycle, context, instance, isSVG);
				}
			}
		}
		return nextInput;
	}
	
	function patchTextNode(dom, lastChildren, nextChildren) {
		if (isStringOrNumber(lastChildren) && lastChildren !== '') {
			dom.firstChild.nodeValue = nextChildren;
		} else {
			dom.textContent = nextChildren;
		}
	}
	
	function patchRef(instance, lastValue, nextValue, dom) {
		if (instance) {
			if (isString(lastValue)) {
				delete instance.refs[lastValue];
			}
			if (isString(nextValue)) {
				instance.refs[nextValue] = dom;
			}
		}
	}
	
	function patchChildren(lastNode, nextNode, dom, lifecycle, context, instance, isSVG) {
		var nextChildren = nextNode.children;
		var lastChildren = lastNode.children;
	
		if (lastChildren === nextChildren) {
			return;
		}
		if (isInvalidNode(lastChildren)) {
			if (isStringOrNumber(nextChildren)) {
				patchTextNode(dom, lastChildren, nextChildren);
			} else if (!isInvalidNode(nextChildren)) {
				if (isArray(nextChildren)) {
					mountArrayChildren(nextChildren, dom, lifecycle, context, instance, isSVG);
				} else {
					mount(nextChildren, dom, lifecycle, context, instance, isSVG);
				}
			}
		} else {
			if (isInvalidNode(nextChildren)) {
				removeAllChildren(dom, lastChildren);
			} else {
				if (isArray(lastChildren)) {
					if (isArray(nextChildren)) {
						nextChildren.complex = lastChildren.complex;
						if (isKeyed(lastChildren, nextChildren)) {
							patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, null);
						} else {
							patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, null);
						}
					} else {
						patchNonKeyedChildren(lastChildren, [nextChildren], dom, lifecycle, context, instance, isSVG, null);
					}
				} else {
					if (isArray(nextChildren)) {
						var lastChild = lastChildren;
	
						if (isStringOrNumber(lastChildren)) {
							lastChild = createVText(lastChild);
							lastChild.dom = dom.firstChild;
						}
						patchNonKeyedChildren([lastChild], nextChildren, dom, lifecycle, context, instance, isSVG, null);
					} else if (isStringOrNumber(nextChildren)) {
						patchTextNode(dom, lastChildren, nextChildren);
					} else if (isStringOrNumber(lastChildren)) {
						patch(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG);
					} else {
						patchVNode(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, false);
					}
				}
			}
		}
	}
	
	function patchVNode(lastVNode, nextVNode, parentDom, lifecycle, context, instance, isSVG, skipLazyCheck) {
		var lastBp = lastVNode.bp;
		var nextBp = nextVNode.bp;
	
		if (lastBp === undefined || nextBp === undefined) {
			patchVNodeWithoutBlueprint(lastVNode, nextVNode, parentDom, lifecycle, context, instance, isSVG);
		} else {
			patchVNodeWithBlueprint(lastVNode, nextVNode, lastBp, nextBp, parentDom, lifecycle, context, instance, skipLazyCheck);
		}
	}
	
	function patchVNodeWithBlueprint(lastVNode, nextVNode, lastBp, nextBp, parentDom, lifecycle, context, instance, skipLazyCheck) {
		var nextHooks;
	
		if (nextBp.hasHooks === true) {
			nextHooks = nextVNode.hooks;
			if (nextHooks && !isNullOrUndefined(nextHooks.willUpdate)) {
				nextHooks.willUpdate(lastVNode.dom);
			}
		}
		var nextTag = nextVNode.tag || nextBp.tag;
		var lastTag = lastVNode.tag || lastBp.tag;
	
		if (lastTag !== nextTag) {
			if (lastBp && lastBp.isComponent === true) {
				var lastNodeInstance = lastVNode.instance;
	
				if (nextBp.isComponent === true) {
					replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, instance, false);
				} else if (isStatefulComponent(lastTag)) {
					unmountVNode(lastVNode, null, true);
					var lastNode = lastNodeInstance._lastNode;
					patchVNodeWithBlueprint(lastNode, nextVNode, lastNode.bp, nextBp, parentDom, lifecycle, context, instance, nextBp.isSVG);
				} else {
					unmountVNode(lastVNode, null, true);
					patchVNodeWithBlueprint(lastNodeInstance, nextVNode, lastNodeInstance.bp, nextBp, parentDom, lifecycle, context, instance, nextBp.isSVG);
				}
			} else {
				replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, instance, nextBp.isSVG);
			}
		} else if (isNullOrUndefined(lastTag)) {
			nextVNode.dom = lastVNode.dom;
		} else {
			if (lastBp && lastBp.isComponent === true) {
				if (nextBp.isComponent === true) {
					var instance$1 = lastVNode.instance;
	
					if (!isNullOrUndefined(instance$1) && instance$1._unmounted) {
						var newDom = mountComponent(nextVNode, lastTag, nextVNode.attrs || {}, nextVNode.hooks, nextVNode.children, instance$1, parentDom, lifecycle, context);
						if (parentDom !== null) {
							replaceNode(parentDom, newDom, lastVNode.dom);
						}
					} else {
						nextVNode.instance = instance$1;
						nextVNode.dom = lastVNode.dom;
						patchComponent(true, nextVNode, nextVNode.tag, lastBp, nextBp, instance$1, lastVNode.attrs || {}, nextVNode.attrs || {}, nextVNode.hooks, lastVNode.children, nextVNode.children, parentDom, lifecycle, context);
					}
				}
			} else {
				var dom = lastVNode.dom;
				var lastChildrenType = lastBp.childrenType;
				var nextChildrenType = nextBp.childrenType;
				nextVNode.dom = dom;
	
				if (nextBp.lazy === true && skipLazyCheck === false) {
					var clipData = lastVNode.clipData;
	
					if (lifecycle.scrollY === null) {
						lifecycle.refresh();
					}
	
					nextVNode.clipData = clipData;
					if (clipData.pending === true || clipData.top - lifecycle.scrollY > lifecycle.screenHeight) {
						if (setClipNode(clipData, dom, lastVNode, nextVNode, parentDom, lifecycle, context, instance, lastBp.isSVG)) {
							return;
						}
					}
					if (clipData.bottom < lifecycle.scrollY) {
						if (setClipNode(clipData, dom, lastVNode, nextVNode, parentDom, lifecycle, context, instance, lastBp.isSVG)) {
							return;
						}
					}
				}
	
				if (lastChildrenType > 0 || nextChildrenType > 0) {
					if (nextChildrenType === 5 || lastChildrenType === 5) {
						patchChildren(lastVNode, nextVNode, dom, lifecycle, context, instance);
					} else {
						var lastChildren = lastVNode.children;
						var nextChildren = nextVNode.children;
	
						if (lastChildrenType === 0 || isInvalidNode(lastChildren)) {
							if (nextChildrenType > 2) {
								mountArrayChildren(nextChildren, dom, lifecycle, context, instance);
							} else {
								mount(nextChildren, dom, lifecycle, context, instance);
							}
						} else if (nextChildrenType === 0 || isInvalidNode(nextChildren)) {
							if (lastChildrenType > 2) {
								removeAllChildren(dom, lastChildren);
							} else {
								remove(lastChildren, dom);
							}
						} else {
							if (lastChildren !== nextChildren) {
								if (lastChildrenType === 4 && nextChildrenType === 4) {
									patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, nextBp.isSVG, null);
								} else if (lastChildrenType === 2 && nextChildrenType === 2) {
									patch(lastChildren, nextChildren, dom, lifecycle, context, instance, true, nextBp.isSVG);
								} else if (lastChildrenType === 1 && nextChildrenType === 1) {
									patchTextNode(dom, lastChildren, nextChildren);
								} else {
									patchChildren(lastVNode, nextVNode, dom, lifecycle, context, instance, nextBp.isSVG);
								}
							}
						}
					}
				}
				if (lastBp.hasAttrs === true || nextBp.hasAttrs === true) {
					patchAttributes(lastVNode, nextVNode, lastBp.attrKeys, nextBp.attrKeys, dom, instance);
				}
				if (lastBp.hasEvents === true || nextBp.hasEvents === true) {
					patchEvents(lastVNode.events, nextVNode.events, lastBp.eventKeys, nextBp.eventKeys, dom);
				}
				if (lastBp.hasClassName === true || nextBp.hasClassName === true) {
					var nextClassName = nextVNode.className;
	
					if (lastVNode.className !== nextClassName) {
						if (isNullOrUndefined(nextClassName)) {
							dom.removeAttribute('class');
						} else {
							dom.className = nextClassName;
						}
					}
				}
				if (lastBp.hasStyle === true || nextBp.hasStyle === true) {
					var nextStyle = nextVNode.style;
					var lastStyle = lastVNode.style;
	
					if (lastStyle !== nextStyle) {
						patchStyle(lastStyle, nextStyle, dom);
					}
				}
				if (nextBp.hasHooks === true && !isNullOrUndefined(nextHooks.didUpdate)) {
					nextHooks.didUpdate(dom);
				}
				setFormElementProperties(nextTag, nextVNode);
			}
		}
	}
	
	function patchVNodeWithoutBlueprint(lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG) {
		var nextHooks = nextNode.hooks;
		var nextHooksDefined = !isNullOrUndefined(nextHooks);
	
		if (nextHooksDefined && !isNullOrUndefined(nextHooks.willUpdate)) {
			nextHooks.willUpdate(lastNode.dom);
		}
		var nextTag = nextNode.tag || ((isNullOrUndefined(nextNode.bp)) ? null : nextNode.bp.tag);
		var lastTag = lastNode.tag || ((isNullOrUndefined(lastNode.bp)) ? null : lastNode.bp.tag);
	
		if (nextTag === 'svg') {
			isSVG = true;
		}
		if (lastTag !== nextTag) {
			var lastNodeInstance = lastNode.instance;
	
			if (isFunction(lastTag)) {
				if (isFunction(nextTag)) {
					replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG);
				} else if (isStatefulComponent(lastTag)) {
					unmountVNode(lastNode, null, true);
					patchVNodeWithoutBlueprint(lastNodeInstance._lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG);
				} else {
					unmountVNode(lastNode, null, true);
					patchVNodeWithoutBlueprint(lastNodeInstance, nextNode, parentDom, lifecycle, context, instance, isSVG);
				}
			} else {
				replaceWithNewNode(lastNodeInstance || lastNode, nextNode, parentDom, lifecycle, context, instance, isSVG);
			}
		} else if (isNullOrUndefined(lastTag)) {
			nextNode.dom = lastNode.dom;
		} else {
			if (isFunction(lastTag)) {
				if (isFunction(nextTag)) {
					var instance$1 = lastNode._instance;
	
					if (!isNullOrUndefined(instance$1) && instance$1._unmounted) {
						var newDom = mountComponent(nextNode, lastTag, nextNode.attrs || {}, nextNode.hooks, nextNode.children, instance$1, parentDom, lifecycle, context);
						if (parentDom !== null) {
							replaceNode(parentDom, newDom, lastNode.dom);
						}
					} else {
						nextNode.instance = lastNode.instance;
						nextNode.dom = lastNode.dom;
						patchComponent(false, nextNode, nextNode.tag, null, null, nextNode.instance, lastNode.attrs || {}, nextNode.attrs || {}, nextNode.hooks, lastNode.children, nextNode.children, parentDom, lifecycle, context);
					}
				}
			} else {
				var dom = lastNode.dom;
				var nextClassName = nextNode.className;
				var nextStyle = nextNode.style;
	
				nextNode.dom = dom;
	
				patchChildren(lastNode, nextNode, dom, lifecycle, context, instance, isSVG);
				patchAttributes(lastNode, nextNode, null, null, dom, instance);
				patchEvents(lastNode.events, nextNode.events, null, null, dom);
	
				if (lastNode.className !== nextClassName) {
					if (isNullOrUndefined(nextClassName)) {
						dom.removeAttribute('class');
					} else {
						dom.className = nextClassName;
					}
				}
				if (lastNode.style !== nextStyle) {
					patchStyle(lastNode.style, nextStyle, dom);
				}
				if (nextHooksDefined && !isNullOrUndefined(nextHooks.didUpdate)) {
					nextHooks.didUpdate(dom);
				}
				setFormElementProperties(nextTag, nextNode);
			}
		}
	}
	
	function patchAttributes(lastNode, nextNode, lastAttrKeys, nextAttrKeys, dom, instance) {
		if (lastNode.tag === 'select') {
			selectValue(nextNode);
		}
		var nextAttrs = nextNode.attrs;
		var lastAttrs = lastNode.attrs;
		var nextAttrsIsUndef = isNullOrUndefined(nextAttrs);
		var lastAttrsIsNotUndef = !isNullOrUndefined(lastAttrs);
	
		if (!nextAttrsIsUndef) {
			var nextAttrsKeys = nextAttrKeys || Object.keys(nextAttrs);
			var attrKeysLength = nextAttrsKeys.length;
	
			for (var i = 0; i < attrKeysLength; i++) {
				var attr = nextAttrsKeys[i];
				var lastAttrVal = lastAttrsIsNotUndef && lastAttrs[attr];
				var nextAttrVal = nextAttrs[attr];
	
				if (lastAttrVal !== nextAttrVal) {
					if (attr === 'ref') {
						patchRef(instance, lastAttrVal, nextAttrVal, dom);
					} else {
						patchAttribute(attr, lastAttrVal, nextAttrVal, dom);
					}
				}
			}
		}
		if (lastAttrsIsNotUndef) {
			var lastAttrsKeys = lastAttrKeys || Object.keys(lastAttrs);
			var attrKeysLength$1 = lastAttrsKeys.length;
	
			for (var i$1 = 0; i$1 < attrKeysLength$1; i$1++) {
				var attr$1 = lastAttrsKeys[i$1];
	
				if (nextAttrsIsUndef || isNullOrUndefined(nextAttrs[attr$1])) {
					if (attr$1 === 'ref') {
						patchRef(getRefInstance(node, instance), lastAttrs[attr$1], null, dom);
					} else {
						dom.removeAttribute(attr$1);
					}
				}
			}
		}
	}
	
	
	function patchStyle(lastAttrValue, nextAttrValue, dom) {
		if (isString(nextAttrValue)) {
			dom.style.cssText = nextAttrValue;
		} else if (isNullOrUndefined(lastAttrValue)) {
			if (!isNullOrUndefined(nextAttrValue)) {
				var styleKeys = Object.keys(nextAttrValue);
	
				for (var i = 0; i < styleKeys.length; i++) {
					var style = styleKeys[i];
					var value = nextAttrValue[style];
	
					if (isNumber(value) && !isUnitlessNumber[style]) {
						dom.style[style] = value + 'px';
					} else {
						dom.style[style] = value;
					}
				}
			}
		} else if (isNullOrUndefined(nextAttrValue)) {
			dom.removeAttribute('style');
		} else {
			var styleKeys$1 = Object.keys(nextAttrValue);
	
			for (var i$1 = 0; i$1 < styleKeys$1.length; i$1++) {
				var style$1 = styleKeys$1[i$1];
				var value$1 = nextAttrValue[style$1];
	
				if (isNumber(value$1) && !isUnitlessNumber[style$1]) {
					dom.style[style$1] = value$1 + 'px';
				} else {
					dom.style[style$1] = value$1;
				}
			}
			var lastStyleKeys = Object.keys(lastAttrValue);
	
			for (var i$2 = 0; i$2 < lastStyleKeys.length; i$2++) {
				var style$2 = lastStyleKeys[i$2];
				if (isNullOrUndefined(nextAttrValue[style$2])) {
					dom.style[style$2] = '';
				}
			}
		}
	}
	
	function patchEvents(lastEvents, nextEvents, _lastEventKeys, _nextEventKeys, dom) {
		var nextEventsDefined = !isNullOrUndefined(nextEvents);
		var lastEventsDefined = !isNullOrUndefined(lastEvents);
		var lastEventKeys;
	
		if (lastEventsDefined) {
			lastEventKeys = _lastEventKeys || Object.keys(lastEvents);
		}
		if (nextEventsDefined) {
			var nextEventKeys = _nextEventKeys || Object.keys(nextEvents);
	
			if (lastEventsDefined) {
				for (var i = 0; i < nextEventKeys.length; i++) {
					var event = nextEventKeys[i];
					var lastEvent = lastEvents[event];
					var nextEvent = nextEvents[event];
	
					if (lastEvent !== nextEvent) {
						dom[event] = nextEvent;
					}
				}
				for (var i$1 = 0; i$1 < lastEventKeys.length; i$1++) {
					var event$1 = lastEventKeys[i$1];
	
					if (isNullOrUndefined(nextEvents[event$1])) {
						dom[event$1] = null;
					}
				}
			} else {
				mountEvents(nextEvents, nextEventKeys, dom);
			}
		} else if (lastEventsDefined) {
			removeEvents(lastEvents, lastEventKeys, dom);
		}
	}
	
	function patchAttribute(attrName, lastAttrValue, nextAttrValue, dom) {
		if (attrName === 'dangerouslySetInnerHTML') {
			var lastHtml = lastAttrValue && lastAttrValue.__html;
			var nextHtml = nextAttrValue && nextAttrValue.__html;
	
			if (isNullOrUndefined(nextHtml)) {
				throw new Error('Inferno Error: dangerouslySetInnerHTML requires an object with a __html propety containing the innerHTML content');
			}
			if (lastHtml !== nextHtml) {
				dom.innerHTML = nextHtml;
			}
		} else if (attrName === 'eventData') {
			dom.eventData = nextAttrValue;
		} else if (strictProps[attrName]) {
			dom[attrName] = nextAttrValue === null ? '' : nextAttrValue;
		} else {
			if (booleanProps[attrName]) {
				dom[attrName] = nextAttrValue ? true : false;
			} else {
				var ns = namespaces[attrName];
	
				if (nextAttrValue === false || isNullOrUndefined(nextAttrValue)) {
					if (ns !== undefined) {
						dom.removeAttributeNS(ns, attrName);
					} else {
						dom.removeAttribute(attrName);
					}
				} else {
					if (ns !== undefined) {
						dom.setAttributeNS(ns, attrName, nextAttrValue === true ? attrName : nextAttrValue);
					} else {
						dom.setAttribute(attrName, nextAttrValue === true ? attrName : nextAttrValue);
					}
				}
			}
		}
	}
	
	function patchComponent(hasBlueprint, lastNode, Component, lastBp, nextBp, instance, lastProps, nextProps, nextHooks, lastChildren, nextChildren, parentDom, lifecycle, context) {
		nextProps = addChildrenToProps(nextChildren, nextProps);
	
		if (isStatefulComponent(Component)) {
			var prevProps = instance.props;
			var prevState = instance.state;
			var nextState = instance.state;
	
			var childContext = instance.getChildContext();
			if (!isNullOrUndefined(childContext)) {
				context = Object.assign({}, context, childContext);
			}
			instance.context = context;
			var nextNode = instance._updateComponent(prevState, nextState, prevProps, nextProps);
	
			if (nextNode === NO_RENDER) {
				nextNode = instance._lastNode;
			} else if (isNullOrUndefined(nextNode)) {
				nextNode = createVPlaceholder();
			}
			patch(instance._lastNode, nextNode, parentDom, lifecycle, context, instance, null, false);
			lastNode.dom = nextNode.dom;
			instance._lastNode = nextNode;
			instance.componentDidUpdate(prevProps, prevState);
			componentToDOMNodeMap.set(instance, nextNode.dom);
		} else {
			var shouldUpdate = true;
			var nextHooksDefined = (hasBlueprint && nextBp.hasHooks === true) || !isNullOrUndefined(nextHooks);
	
			lastProps = addChildrenToProps(lastChildren, lastProps);
			if (nextHooksDefined && !isNullOrUndefined(nextHooks.componentShouldUpdate)) {
				shouldUpdate = nextHooks.componentShouldUpdate(lastNode.dom, lastProps, nextProps);
			}
			if (shouldUpdate !== false) {
				if (nextHooksDefined && !isNullOrUndefined(nextHooks.componentWillUpdate)) {
					nextHooks.componentWillUpdate(lastNode.dom, lastProps, nextProps);
				}
				var nextNode$1 = Component(nextProps, context);
	
				if (isInvalidNode(nextNode$1)) {
					nextNode$1 = createVPlaceholder();
				}
				nextNode$1.dom = lastNode.dom;
				patch(instance, nextNode$1, parentDom, lifecycle, context, null, null, false);
				lastNode.instance = nextNode$1;
				if (nextHooksDefined && !isNullOrUndefined(nextHooks.componentDidUpdate)) {
					nextHooks.componentDidUpdate(lastNode.dom, lastProps, nextProps);
				}
			}
		}
	}
	
	function patchVList(lastVList, nextVList, parentDom, lifecycle, context, instance, isSVG) {
		var lastItems = lastVList.items;
		var nextItems = nextVList.items;
		var pointer = lastVList.pointer;
	
		nextVList.dom = lastVList.dom;
		nextVList.pointer = pointer;
		if (!lastItems !== nextItems) {
			if (isKeyed(lastItems, nextItems)) {
				patchKeyedChildren(lastItems, nextItems, parentDom, lifecycle, context, instance, isSVG, nextVList);
			} else {
				patchNonKeyedChildren(lastItems, nextItems, parentDom, lifecycle, context, instance, isSVG, nextVList);
			}
		}
	}
	
	function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, parentVList) {
		var lastChildrenLength = lastChildren.length;
		var nextChildrenLength = nextChildren.length;
		var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
		var i = 0;
	
		for (; i < commonLength; i++) {
			var lastChild = lastChildren[i];
			var nextChild = normaliseChild(nextChildren, i);
	
			patch(lastChild, nextChild, dom, lifecycle, context, instance, isSVG);
		}
		if (lastChildrenLength < nextChildrenLength) {
			for (i = commonLength; i < nextChildrenLength; i++) {
				var child = normaliseChild(nextChildren, i);
	
				insertOrAppend(dom, mount(child, null, lifecycle, context, instance, isSVG), parentVList && parentVList.pointer);
			}
		} else if (lastChildrenLength > nextChildrenLength) {
			for (i = commonLength; i < lastChildrenLength; i++) {
				remove(lastChildren[i], dom);
			}
		}
	}
	
	function patchVFragment(lastVFragment, nextVFragment) {
		nextVFragment.dom = lastVFragment.dom;
	}
	
	function patchVText(lastVText, nextVText) {
		var nextText = nextVText.text;
		var dom = lastVText.dom;
	
		nextVText.dom = dom;
		if (lastVText.text !== nextText) {
			dom.nodeValue = nextText;
		}
	}
	
	function patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, instance, isSVG, parentVList) {
		var lastChildrenLength = lastChildren.length;
		var nextChildrenLength = nextChildren.length;
		var lastEndIndex = lastChildrenLength - 1;
		var nextEndIndex = nextChildrenLength - 1;
		var lastStartIndex = 0;
		var nextStartIndex = 0;
		var lastStartNode = null;
		var nextStartNode = null;
		var nextEndNode = null;
		var lastEndNode = null;
		var nextNode;
	
		while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
			nextStartNode = nextChildren[nextStartIndex];
			lastStartNode = lastChildren[lastStartIndex];
	
			if (nextStartNode.key !== lastStartNode.key) {
				break;
			}
			patchVNode(lastStartNode, nextStartNode, dom, lifecycle, context, instance, isSVG, false);
			nextStartIndex++;
			lastStartIndex++;
		}
		while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
			nextEndNode = nextChildren[nextEndIndex];
			lastEndNode = lastChildren[lastEndIndex];
	
			if (nextEndNode.key !== lastEndNode.key) {
				break;
			}
			patchVNode(lastEndNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
			nextEndIndex--;
			lastEndIndex--;
		}
		while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
			nextEndNode = nextChildren[nextEndIndex];
			lastStartNode = lastChildren[lastStartIndex];
	
			if (nextEndNode.key !== lastStartNode.key) {
				break;
			}
			nextNode = (nextEndIndex + 1 < nextChildrenLength) ? nextChildren[nextEndIndex + 1].dom : null;
			patchVNode(lastStartNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
			insertOrAppend(dom, nextEndNode.dom, nextNode);
			nextEndIndex--;
			lastStartIndex++;
		}
		while (lastStartIndex <= lastEndIndex && nextStartIndex <= nextEndIndex) {
			nextStartNode = nextChildren[nextStartIndex];
			lastEndNode = lastChildren[lastEndIndex];
	
			if (nextStartNode.key !== lastEndNode.key) {
				break;
			}
			nextNode = lastChildren[lastStartIndex].dom;
			patchVNode(lastEndNode, nextStartNode, dom, lifecycle, context, instance, isSVG, false);
			insertOrAppend(dom, nextStartNode.dom, nextNode);
			nextStartIndex++;
			lastEndIndex--;
		}
	
		if (lastStartIndex > lastEndIndex) {
			if (nextStartIndex <= nextEndIndex) {
				nextNode = (nextEndIndex + 1 < nextChildrenLength) ? nextChildren[nextEndIndex + 1].dom : parentVList && parentVList.pointer;
				for (; nextStartIndex <= nextEndIndex; nextStartIndex++) {
					insertOrAppend(dom, mount(nextChildren[nextStartIndex], null, lifecycle, context, instance, isSVG), nextNode);
				}
			}
		} else if (nextStartIndex > nextEndIndex) {
			while (lastStartIndex <= lastEndIndex) {
				remove(lastChildren[lastStartIndex++], dom);
			}
		} else {
			var aLength = lastEndIndex - lastStartIndex + 1;
			var bLength = nextEndIndex - nextStartIndex + 1;
			var sources = new Array(bLength);
	
			// Mark all nodes as inserted.
			var i;
			for (i = 0; i < bLength; i++) {
				sources[i] = -1;
			}
			var moved = false;
			var removeOffset = 0;
			var lastTarget = 0;
			var index;
			var removed = true;
			var k = 0;
	
			if ((bLength <= 4) || (aLength * bLength <= 16)) {
				for (i = lastStartIndex; i <= lastEndIndex; i++) {
					removed = true;
					lastEndNode = lastChildren[i];
					if (k < bLength) {
						for (index = nextStartIndex; index <= nextEndIndex; index++) {
							nextEndNode = nextChildren[index];
							if (lastEndNode.key === nextEndNode.key) {
								sources[index - nextStartIndex] = i;
	
								if (lastTarget > index) {
									moved = true;
								} else {
									lastTarget = index;
								}
								patchVNode(lastEndNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
								k++;
								removed = false;
								break;
							}
						}
					}
					if (removed) {
						remove(lastEndNode, dom);
						removeOffset++;
					}
				}
			} else {
				var prevItemsMap = new Map();
	
				for (i = nextStartIndex; i <= nextEndIndex; i++) {
					prevItemsMap.set(nextChildren[i].key, i);
				}
				for (i = lastStartIndex; i <= lastEndIndex; i++) {
					removed = true;
					lastEndNode = lastChildren[i];
	
					if (k < nextChildrenLength) {
						index = prevItemsMap.get(lastEndNode.key);
	
						if (index !== undefined) {
							nextEndNode = nextChildren[index];
							sources[index - nextStartIndex] = i;
							if (lastTarget > index) {
								moved = true;
							} else {
								lastTarget = index;
							}
							patchVNode(lastEndNode, nextEndNode, dom, lifecycle, context, instance, isSVG, false);
							k++;
							removed = false;
						}
					}
					if (removed) {
						remove(lastEndNode, dom);
						removeOffset++;
					}
				}
			}
	
			var pos;
			if (moved) {
				var seq = lis_algorithm(sources);
				index = seq.length - 1;
				for (i = bLength - 1; i >= 0; i--) {
					if (sources[i] === -1) {
						pos = i + nextStartIndex;
						nextNode = (pos + 1 < nextChildrenLength) ? nextChildren[pos + 1].dom : parentVList && parentVList.pointer;
						insertOrAppend(dom, mount(nextChildren[pos], null, lifecycle, context, instance, isSVG), nextNode);
					} else {
						if (index < 0 || i !== seq[index]) {
							pos = i + nextStartIndex;
							nextNode = (pos + 1 < nextChildrenLength) ? nextChildren[pos + 1].dom : parentVList && parentVList.pointer;
							insertOrAppend(dom, nextChildren[pos].dom, nextNode);
						} else {
							index--;
						}
					}
				}
			} else if (aLength - removeOffset !== bLength) {
				for (i = bLength - 1; i >= 0; i--) {
					if (sources[i] === -1) {
						pos = i + nextStartIndex;
						nextNode = (pos + 1 < nextChildrenLength) ? nextChildren[pos + 1].dom : parentVList && parentVList.pointer;
						insertOrAppend(dom, mount(nextChildren[pos], null, lifecycle, context, instance, isSVG), nextNode);
					}
				}
			}
		}
	}
	
	// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
	function lis_algorithm(a) {
		var p = a.slice(0);
		var result = [];
		result.push(0);
		var i;
		var j;
		var u;
		var v;
		var c;
	
		for (i = 0; i < a.length; i++) {
			if (a[i] === -1) {
				continue;
			}
	
			j = result[result.length - 1];
			if (a[j] < a[i]) {
				p[i] = j;
				result.push(i);
				continue;
			}
	
			u = 0;
			v = result.length - 1;
	
			while (u < v) {
				c = ((u + v) / 2) | 0;
				if (a[result[c]] < a[i]) {
					u = c + 1;
				} else {
					v = c;
				}
			}
	
			if (a[i] < a[result[u]]) {
				if (u > 0) {
					p[i] = result[u - 1];
				}
				result[u] = i;
			}
		}
	
		u = result.length;
		v = result[u - 1];
	
		while (u-- > 0) {
			result[u] = v;
			v = p[v];
		}
	
		return result;
	}
	
	var screenWidth = isBrowser && window.screen.width;
	var screenHeight = isBrowser && window.screen.height;
	var scrollX = 0;
	var scrollY = 0;
	var lastScrollTime = 0;
	
	if (isBrowser) {
		window.onscroll = function () {
			scrollX = window.scrollX;
			scrollY = window.scrollY;
			lastScrollTime = performance.now();
		};
	
		window.resize = function () {
			scrollX = window.scrollX;
			scrollY = window.scrollY;
			screenWidth = window.screen.width;
			screenHeight = window.screen.height;
			lastScrollTime = performance.now();
		};
	}
	
	function Lifecycle() {
		this._listeners = [];
		this.scrollX = null;
		this.scrollY = null;
		this.screenHeight = screenHeight;
		this.screenWidth = screenWidth;
	}
	
	Lifecycle.prototype = {
		refresh: function refresh() {
			this.scrollX = isBrowser && window.scrollX;
			this.scrollY = isBrowser && window.scrollY;
		},
		addListener: function addListener(callback) {
			this._listeners.push(callback);
		},
		trigger: function trigger() {
			var this$1 = this;
	
			for (var i = 0; i < this._listeners.length; i++) {
				this$1._listeners[i]();
			}
		}
	};
	
	function handleLazyAttached(node, lifecycle, dom) {
		lifecycle.addListener(function () {
			var rect = dom.getBoundingClientRect();
	
			if (lifecycle.scrollY === null) {
				lifecycle.refresh();
			}
			node.clipData = {
				top: rect.top + lifecycle.scrollY,
				left: rect.left + lifecycle.scrollX,
				bottom: rect.bottom + lifecycle.scrollY,
				right: rect.right + lifecycle.scrollX,
				pending: false
			};
		});
	}
	
	function hydrateChild(child, childNodes, counter, parentDom, lifecycle, context, instance) {
		var domNode = childNodes[counter.i];
	
		if (isVText(child)) {
			var text = child.text;
	
			child.dom = domNode;
			if (domNode.nodeType === 3 && text !== '') {
				domNode.nodeValue = text;
			} else {
				var newDomNode = mountVText(text);
	
				replaceNode(parentDom, newDomNode, domNode);
				childNodes.splice(childNodes.indexOf(domNode), 1, newDomNode);
				child.dom = newDomNode;
			}
		} else if (isVPlaceholder(child)) {
			child.dom = domNode;
		} else if (isVList(child)) {
			var items = child.items;
	
			// this doesn't really matter, as it won't be used again, but it's what it should be given the purpose of VList
			child.dom = document.createDocumentFragment();
			for (var i = 0; i < items.length; i++) {
				var rebuild = hydrateChild(normaliseChild(items, i), childNodes, counter, parentDom, lifecycle, context, instance);
	
				if (rebuild) {
					return true;
				}
			}
			// at the end of every VList, there should be a "pointer". It's an empty TextNode used for tracking the VList
			var pointer = childNodes[counter.i++];
	
			if (pointer && pointer.nodeType === 3) {
				child.pointer = pointer;
			} else {
				// there is a problem, we need to rebuild this tree
				return true;
			}
		} else {
			var rebuild$1 = hydrateNode(child, domNode, parentDom, lifecycle, context, instance, false);
	
			if (rebuild$1) {
				return true;
			}
		}
		counter.i++;
	}
	
	function getChildNodesWithoutComments(domNode) {
		var childNodes = [];
		var rawChildNodes = domNode.childNodes;
		var length = rawChildNodes.length;
		var i = 0;
	
		while (i < length) {
			var rawChild = rawChildNodes[i];
	
			if (rawChild.nodeType === 8) {
				if (rawChild.data === '!') {
					var placeholder = document.createTextNode('');
	
					domNode.replaceChild(placeholder, rawChild);
					childNodes.push(placeholder);
					i++;
				} else {
					domNode.removeChild(rawChild);
					length--;
				}
			} else {
				childNodes.push(rawChild);
				i++;
			}
		}
		return childNodes;
	}
	
	function hydrateComponent(node, Component, props, hooks, children, domNode, parentDom, lifecycle, context, lastInstance, isRoot) {
		props = addChildrenToProps(children, props);
	
		if (isStatefulComponent(Component)) {
			var instance = node.instance = new Component(props);
	
			instance._patch = patch;
			if (!isNullOrUndefined(lastInstance) && props.ref) {
				mountRef(lastInstance, props.ref, instance);
			}
			var childContext = instance.getChildContext();
	
			if (!isNullOrUndefined(childContext)) {
				context = Object.assign({}, context, childContext);
			}
			instance.context = context;
			instance._unmounted = false;
			instance._parentNode = node;
			if (lastInstance) {
				instance._parentComponent = lastInstance;
			}
			instance._pendingSetState = true;
			instance.componentWillMount();
			var nextNode = instance.render();
	
			instance._pendingSetState = false;
			if (isInvalidNode(nextNode)) {
				nextNode = createVPlaceholder();
			}
			hydrateNode(nextNode, domNode, parentDom, lifecycle, context, instance, isRoot);
			instance._lastNode = nextNode;
			instance.componentDidMount();
	
		} else {
			var instance$1 = node.instance = Component(props);
	
			if (!isNullOrUndefined(hooks)) {
				if (!isNullOrUndefined(hooks.componentWillMount)) {
					hooks.componentWillMount(null, props);
				}
				if (!isNullOrUndefined(hooks.componentDidMount)) {
					lifecycle.addListener(function () {
						hooks.componentDidMount(domNode, props);
					});
				}
			}
			return hydrateNode(instance$1, domNode, parentDom, lifecycle, context, instance$1, isRoot);
		}
	}
	
	function hydrateNode(node, domNode, parentDom, lifecycle, context, instance, isRoot) {
		var bp = node.bp;
		var tag = node.tag || bp.tag;
	
		if (isFunction(tag)) {
			node.dom = domNode;
			hydrateComponent(node, tag, node.attrs || {}, node.hooks, node.children, domNode, parentDom, lifecycle, context, instance, isRoot);
		} else {
			if (
				domNode.nodeType !== 1 ||
				tag !== domNode.tagName.toLowerCase()
			) {
				// TODO remake node
			} else {
				node.dom = domNode;
				var hooks = node.hooks;
	
				if ((bp && bp.hasHooks === true) || !isNullOrUndefined(hooks)) {
					handleAttachedHooks(hooks, lifecycle, domNode);
				}
				var children = node.children;
	
				if (!isNullOrUndefined(children)) {
					if (isStringOrNumber(children)) {
						if (domNode.textContent !== children) {
							domNode.textContent = children;
						}
					} else {
						var childNodes = getChildNodesWithoutComments(domNode);
						var counter = { i: 0 };
						var rebuild = false;
	
						if (isArray(children)) {
							for (var i = 0; i < children.length; i++) {
								rebuild = hydrateChild(normaliseChild(children, i), childNodes, counter, domNode, lifecycle, context, instance);
	
								if (rebuild) {
									break;
								}
							}
						} else {
							if (childNodes.length === 1) {
								rebuild = hydrateChild(children, childNodes, counter, domNode, lifecycle, context, instance);
							} else {
								rebuild = true;
							}
						}
	
						if (rebuild) {
							// TODO scrap children and rebuild again
						}
					}
				}
				var className = node.className;
				var style = node.style;
	
				if (!isNullOrUndefined(className)) {
					domNode.className = className;
				}
				if (!isNullOrUndefined(style)) {
					patchStyle(null, style, domNode);
				}
				if (bp && bp.hasAttrs === true) {
					mountBlueprintAttrs(node, bp, domNode, instance);
				} else {
					var attrs = node.attrs;
	
					if (!isNullOrUndefined(attrs)) {
						handleSelects(node);
						mountAttributes(node, attrs, Object.keys(attrs), domNode, instance);
					}
				}
				if (bp && bp.hasEvents === true) {
					mountBlueprintEvents(node, bp, domNode);
				} else {
					var events = node.events;
	
					if (!isNullOrUndefined(events)) {
						mountEvents(events, Object.keys(events), domNode);
					}
				}
			}
		}
	}
	var documetBody = isBrowser ? document.body : null;
	
	function hydrate(node, parentDom, lifecycle) {
		if (parentDom && parentDom.nodeType === 1) {
			var rootNode = parentDom.querySelector('[data-infernoroot]');
	
			if (rootNode && rootNode.parentNode === parentDom) {
				hydrateNode(node, rootNode, parentDom, lifecycle, {}, true);
				return true;
			}
		}
		// clear parentDom, unless it's document.body
		if (parentDom !== documetBody) {
			parentDom.textContent = '';
		} else {
			console.warn('Inferno Warning: rendering to the "document.body" is dangerous! Use a dedicated container element instead.');
		}
		return false;
	}
	
	var roots = new Map();
	var componentToDOMNodeMap = new Map();
	
	function findDOMNode(domNode) {
		return componentToDOMNodeMap.get(domNode) || null;
	}
	
	function render(input, parentDom) {
		var root = roots.get(parentDom);
		var lifecycle = new Lifecycle();
	
		if (isUndefined(root)) {
			if (!isInvalidNode(input)) {
				if (!hydrate(input, parentDom, lifecycle)) {
					mount(input, parentDom, lifecycle, {}, null, false);
				}
				lifecycle.trigger();
				roots.set(parentDom, { input: input });
			}
		} else {
			var activeNode = getActiveNode();
			var nextInput = patch(root.input, input, parentDom, lifecycle, {}, null, false);
	
			lifecycle.trigger();
			if (isNull(input)) {
				roots.delete(parentDom);
			}
			root.input = nextInput;
			resetActiveNode(activeNode);
		}
	}
	
	var index = {
		render: render,
		findDOMNode: findDOMNode,
		mount: mount,
		patch: patch,
		unmount: unmount
	};
	
	return index;
	
	})));

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var _meiosisTracer = __webpack_require__(1);
		
		module.exports = _meiosisTracer.meiosisTracer;
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.meiosisTracer = undefined;
		
		var _model = __webpack_require__(2);
		
		var _view = __webpack_require__(3);
		
		var _receive = __webpack_require__(5);
		
		var _receive2 = _interopRequireDefault(_receive);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var tracerModel = _model.initialModel;
		
		var meiosisTracer = function meiosisTracer(createComponent, renderRoot, selector, horizontal) {
		  var receiver = (0, _receive2.default)(tracerModel, _view.proposalView);
		  createComponent({
		    receive: receiver
		  });
		  (0, _view.initialView)(selector, renderRoot, tracerModel, horizontal);
		  receiver(renderRoot.initialModel, "initialModel");
		
		  return { reset: function reset() {
		      return (0, _view.reset)(tracerModel);
		    } };
		};
		
		exports.meiosisTracer = meiosisTracer;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var initialModel = {
		  tracerStates: [],
		  tracerIndex: 0
		};
		
		exports.initialModel = initialModel;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.reset = exports.proposalView = exports.initialView = undefined;
		
		var _jsonFormat = __webpack_require__(4);
		
		var _jsonFormat2 = _interopRequireDefault(_jsonFormat);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var jsonFormatConfig = {
		  type: "space",
		  size: 2
		};
		
		var tracerContainerId = "tracerContainer";
		var tracerId = "tracerSlider";
		var tracerToggleId = "tracerToggle";
		var tracerResetId = "tracerReset";
		var tracerIndexId = "tracerIndex";
		var tracerModelId = "tracerModel";
		var tracerProposalId = "tracerProposal";
		
		var proposalView = function proposalView(_ref, tracerModel) {
		  var model = _ref.model;
		  var proposal = _ref.proposal;
		
		  var tracer = document.getElementById(tracerId);
		  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
		  tracer.value = String(tracerModel.tracerIndex);
		
		  var tracerIndex = document.getElementById(tracerIndexId);
		  tracerIndex.innerHTML = String(tracerModel.tracerIndex);
		
		  var tracerModelEl = document.getElementById(tracerModelId);
		  tracerModelEl.value = (0, _jsonFormat2.default)(model, jsonFormatConfig);
		
		  var tracerProposalEl = document.getElementById(tracerProposalId);
		  tracerProposalEl.value = (0, _jsonFormat2.default)(proposal, jsonFormatConfig);
		};
		
		var onSliderChange = function onSliderChange(renderRoot, tracerModel) {
		  return function (evt) {
		    var index = parseInt(evt.target.value, 10);
		    var snapshot = tracerModel.tracerStates[index];
		    renderRoot(snapshot.model);
		    tracerModel.tracerIndex = index;
		    proposalView(snapshot, tracerModel);
		  };
		};
		
		var onModelChange = function onModelChange(renderRoot) {
		  return function (evt) {
		    try {
		      var model = JSON.parse(evt.target.value);
		      renderRoot(model);
		    } catch (err) {
		      // ignore invalid JSON
		    }
		  };
		};
		
		var onToggle = function onToggle(tracerContainer) {
		  return function (evt) {
		    var button = evt.target;
		
		    if (tracerContainer.style.display === "none") {
		      tracerContainer.style.display = "block";
		      button.innerHTML = "Hide";
		    } else {
		      tracerContainer.style.display = "none";
		      button.innerHTML = "Show";
		    }
		  };
		};
		
		var onReset = function onReset(tracerModel) {
		  return function () {
		    reset(tracerModel);
		  };
		};
		
		var reset = function reset(tracerModel) {
		  tracerModel.tracerStates.length = 0;
		  tracerModel.tracerIndex = 0;
		  proposalView({ model: {}, proposal: {} }, tracerModel);
		};
		
		var initialView = function initialView(selector, renderRoot, tracerModel, horizontal) {
		  var target = document.querySelector(selector);
		
		  if (target) {
		    var modelRows = horizontal ? "5" : "20";
		    var divStyle = horizontal ? " style='float: left'" : "";
		
		    var viewHtml = "<div style='text-align: right'><button id='" + tracerToggleId + "'>Hide</button></div>" + "<div id='" + tracerContainerId + "'>" + "<div style='text-align: right'><button id='" + tracerResetId + "'>Reset</button></div>" + "<input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<div" + divStyle + "><div>Proposal:</div>" + "<textarea id='" + tracerProposalId + "' rows='5' cols='40'></textarea></div>" + "<div" + divStyle + "><div>Model: (you can type into this box)</div>" + "<textarea id='" + tracerModelId + "' rows='" + modelRows + "' cols='40'></textarea></div></div>";
		
		    target.innerHTML = viewHtml;
		
		    var tracerContainer = document.getElementById(tracerContainerId);
		
		    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderRoot, tracerModel));
		    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
		    document.getElementById(tracerToggleId).addEventListener("click", onToggle(tracerContainer));
		    document.getElementById(tracerResetId).addEventListener("click", onReset(tracerModel));
		  }
		};
		
		exports.initialView = initialView;
		exports.proposalView = proposalView;
		exports.reset = reset;
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		/*
		  change for npm modules.
		  by Luiz Estácio.
		
		  json-format v.1.1
		  http://github.com/phoboslab/json-format
		
		  Released under MIT license:
		  http://www.opensource.org/licenses/mit-license.php
		*/
		var p = [],
		  indentConfig = {
		    tab: { char: '\t', size: 1 },
		    space: { char: ' ', size: 4 }
		  },
		  configDefault = {
		    type: 'tab'
		  },
		  push = function( m ) { return '\\' + p.push( m ) + '\\'; },
		  pop = function( m, i ) { return p[i-1] },
		  tabs = function( count, indentType) { return new Array( count + 1 ).join( indentType ); };
		
		function JSONFormat ( json, indentType ) {
		  p = [];
		  var out = "",
		      indent = 0;
		
		  // Extract backslashes and strings
		  json = json
		    .replace( /\\./g, push )
		    .replace( /(".*?"|'.*?')/g, push )
		    .replace( /\s+/, '' );    
		
		  // Indent and insert newlines
		  for( var i = 0; i < json.length; i++ ) {
		    var c = json.charAt(i);
		
		    switch(c) {
		      case '{':
		      case '[':
		        out += c + "\n" + tabs(++indent, indentType);
		        break;
		      case '}':
		      case ']':
		        out += "\n" + tabs(--indent, indentType) + c;
		        break;
		      case ',':
		        out += ",\n" + tabs(indent, indentType);
		        break;
		      case ':':
		        out += ": ";
		        break;
		      default:
		        out += c;
		        break;      
		    }         
		  }
		
		  // Strip whitespace from numeric arrays and put backslashes 
		  // and strings back in
		  out = out
		    .replace( /\[[\d,\s]+?\]/g, function(m){ return m.replace(/\s/g,''); } )
		    .replace( /\\(\d+)\\/g, pop ) // strings
		    .replace( /\\(\d+)\\/g, pop ); // backslashes in strings
		
		  return out;
		};
		
		module.exports = function(json, config){
		  config = config || configDefault;
		  var indent = indentConfig[config.type];
		
		  if ( indent == null ) {
		    throw new Error('Unrecognized ident type: "' + config.type + '"');
		  }
		  var indentType = new Array((config.size || indent.size) + 1).join(indent.char);
		  return JSONFormat(JSON.stringify(json), indentType);
		}
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var receive = function receive(tracerModel, view) {
		  return function (model, proposal) {
		    var modelCopy = JSON.parse(JSON.stringify(model));
		    var modelAndProposal = { model: modelCopy, proposal: proposal };
		    tracerModel.tracerStates.push(modelAndProposal);
		    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
		
		    view(modelAndProposal, tracerModel);
		
		    return model;
		  };
		};
		
		exports.default = receive;
	
	/***/ }
	/******/ ]);
	//# sourceMappingURL=meiosis-tracer.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var createNestedComponent = function createNestedComponent(path, config, params) {
	    return (0, _ramda.compose)(_meiosis.createComponent, (0, _nestComponent2.default)(path), config)(params);
	  };
	
	  var todoFormParams = { services: _services2.default, view: _viewInferno4.default };
	  var todoFormObj = (0, _main2.default)(todoFormParams);
	
	  var todoForm = (0, _meiosis.createComponent)((0, _nestComponent2.default)("store.form")(todoFormObj.config));
	  var todoList = createNestedComponent("store.list", _main4.default, { ActionForm: todoFormObj.Action, services: _services2.default, view: _viewInferno6.default });
	
	  return (0, _meiosis.createComponent)({
	    view: (0, _viewInferno2.default)(todoForm, todoList)
	  });
	};
	
	var _meiosis = __webpack_require__(27);
	
	var _ramda = __webpack_require__(35);
	
	var _nestComponent = __webpack_require__(36);
	
	var _nestComponent2 = _interopRequireDefault(_nestComponent);
	
	var _viewInferno = __webpack_require__(38);
	
	var _viewInferno2 = _interopRequireDefault(_viewInferno);
	
	var _services = __webpack_require__(41);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _viewInferno3 = __webpack_require__(69);
	
	var _viewInferno4 = _interopRequireDefault(_viewInferno3);
	
	var _main = __webpack_require__(71);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _viewInferno5 = __webpack_require__(80);
	
	var _viewInferno6 = _interopRequireDefault(_viewInferno5);
	
	var _main3 = __webpack_require__(82);
	
	var _main4 = _interopRequireDefault(_main3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	//  Ramda v0.22.1
	//  https://github.com/ramda/ramda
	//  (c) 2013-2016 Scott Sauyet, Michael Hurley, and David Chambers
	//  Ramda may be freely distributed under the MIT license.
	
	;(function() {
	
	  'use strict';
	
	  /**
	     * A special placeholder value used to specify "gaps" within curried functions,
	     * allowing partial application of any combination of arguments, regardless of
	     * their positions.
	     *
	     * If `g` is a curried ternary function and `_` is `R.__`, the following are
	     * equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2, _)(1, 3)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @constant
	     * @memberOf R
	     * @since v0.6.0
	     * @category Function
	     * @example
	     *
	     *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
	     *      greet('Alice'); //=> 'Hello, Alice!'
	     */
	    var __ = { '@@functional/placeholder': true };
	
	    /* eslint-disable no-unused-vars */
	    var _arity = function _arity(n, fn) {
	        /* eslint-disable no-unused-vars */
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.apply(this, arguments);
	            };
	        case 1:
	            return function (a0) {
	                return fn.apply(this, arguments);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.apply(this, arguments);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.apply(this, arguments);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.apply(this, arguments);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.apply(this, arguments);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.apply(this, arguments);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.apply(this, arguments);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.apply(this, arguments);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.apply(this, arguments);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.apply(this, arguments);
	            };
	        default:
	            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	        }
	    };
	
	    var _arrayFromIterator = function _arrayFromIterator(iter) {
	        var list = [];
	        var next;
	        while (!(next = iter.next()).done) {
	            list.push(next.value);
	        }
	        return list;
	    };
	
	    var _arrayOf = function _arrayOf() {
	        return Array.prototype.slice.call(arguments);
	    };
	
	    var _cloneRegExp = function _cloneRegExp(pattern) {
	        return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
	    };
	
	    var _complement = function _complement(f) {
	        return function () {
	            return !f.apply(this, arguments);
	        };
	    };
	
	    /**
	     * Private `concat` function to merge two array-like objects.
	     *
	     * @private
	     * @param {Array|Arguments} [set1=[]] An array-like object.
	     * @param {Array|Arguments} [set2=[]] An array-like object.
	     * @return {Array} A new, merged array.
	     * @example
	     *
	     *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     */
	    var _concat = function _concat(set1, set2) {
	        set1 = set1 || [];
	        set2 = set2 || [];
	        var idx;
	        var len1 = set1.length;
	        var len2 = set2.length;
	        var result = [];
	        idx = 0;
	        while (idx < len1) {
	            result[result.length] = set1[idx];
	            idx += 1;
	        }
	        idx = 0;
	        while (idx < len2) {
	            result[result.length] = set2[idx];
	            idx += 1;
	        }
	        return result;
	    };
	
	    var _containsWith = function _containsWith(pred, x, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (pred(x, list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    };
	
	    var _filter = function _filter(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        while (idx < len) {
	            if (fn(list[idx])) {
	                result[result.length] = list[idx];
	            }
	            idx += 1;
	        }
	        return result;
	    };
	
	    var _forceReduced = function _forceReduced(x) {
	        return {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };
	
	    // String(x => x) evaluates to "x => x", so the pattern may not match.
	    var _functionName = function _functionName(f) {
	        // String(x => x) evaluates to "x => x", so the pattern may not match.
	        var match = String(f).match(/^function (\w*)/);
	        return match == null ? '' : match[1];
	    };
	
	    var _has = function _has(prop, obj) {
	        return Object.prototype.hasOwnProperty.call(obj, prop);
	    };
	
	    var _identity = function _identity(x) {
	        return x;
	    };
	
	    var _isArguments = function () {
	        var toString = Object.prototype.toString;
	        return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
	            return toString.call(x) === '[object Arguments]';
	        } : function _isArguments(x) {
	            return _has('callee', x);
	        };
	    }();
	
	    /**
	     * Tests whether or not an object is an array.
	     *
	     * @private
	     * @param {*} val The object to test.
	     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	     * @example
	     *
	     *      _isArray([]); //=> true
	     *      _isArray(null); //=> false
	     *      _isArray({}); //=> false
	     */
	    var _isArray = Array.isArray || function _isArray(val) {
	        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
	    };
	
	    var _isFunction = function _isFunction(x) {
	        return Object.prototype.toString.call(x) === '[object Function]';
	    };
	
	    /**
	     * Determine if the passed argument is an integer.
	     *
	     * @private
	     * @param {*} n
	     * @category Type
	     * @return {Boolean}
	     */
	    var _isInteger = Number.isInteger || function _isInteger(n) {
	        return n << 0 === n;
	    };
	
	    var _isNumber = function _isNumber(x) {
	        return Object.prototype.toString.call(x) === '[object Number]';
	    };
	
	    var _isObject = function _isObject(x) {
	        return Object.prototype.toString.call(x) === '[object Object]';
	    };
	
	    var _isPlaceholder = function _isPlaceholder(a) {
	        return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
	    };
	
	    var _isRegExp = function _isRegExp(x) {
	        return Object.prototype.toString.call(x) === '[object RegExp]';
	    };
	
	    var _isString = function _isString(x) {
	        return Object.prototype.toString.call(x) === '[object String]';
	    };
	
	    var _isTransformer = function _isTransformer(obj) {
	        return typeof obj['@@transducer/step'] === 'function';
	    };
	
	    var _map = function _map(fn, functor) {
	        var idx = 0;
	        var len = functor.length;
	        var result = Array(len);
	        while (idx < len) {
	            result[idx] = fn(functor[idx]);
	            idx += 1;
	        }
	        return result;
	    };
	
	    // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	    var _objectAssign = function _objectAssign(target) {
	        if (target == null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	        var output = Object(target);
	        var idx = 1;
	        var length = arguments.length;
	        while (idx < length) {
	            var source = arguments[idx];
	            if (source != null) {
	                for (var nextKey in source) {
	                    if (_has(nextKey, source)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	            idx += 1;
	        }
	        return output;
	    };
	
	    var _of = function _of(x) {
	        return [x];
	    };
	
	    var _pipe = function _pipe(f, g) {
	        return function () {
	            return g.call(this, f.apply(this, arguments));
	        };
	    };
	
	    var _pipeP = function _pipeP(f, g) {
	        return function () {
	            var ctx = this;
	            return f.apply(ctx, arguments).then(function (x) {
	                return g.call(ctx, x);
	            });
	        };
	    };
	
	    // \b matches word boundary; [\b] matches backspace
	    var _quote = function _quote(s) {
	        var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b')    // \b matches word boundary; [\b] matches backspace
	    .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
	        return '"' + escaped.replace(/"/g, '\\"') + '"';
	    };
	
	    var _reduced = function _reduced(x) {
	        return x && x['@@transducer/reduced'] ? x : {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };
	
	    /**
	     * An optimized, private array `slice` implementation.
	     *
	     * @private
	     * @param {Arguments|Array} args The array or arguments object to consider.
	     * @param {Number} [from=0] The array index to slice from, inclusive.
	     * @param {Number} [to=args.length] The array index to slice to, exclusive.
	     * @return {Array} A new, sliced array.
	     * @example
	     *
	     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	     *
	     *      var firstThreeArgs = function(a, b, c, d) {
	     *        return _slice(arguments, 0, 3);
	     *      };
	     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	     */
	    var _slice = function _slice(args, from, to) {
	        switch (arguments.length) {
	        case 1:
	            return _slice(args, 0, args.length);
	        case 2:
	            return _slice(args, from, args.length);
	        default:
	            var list = [];
	            var idx = 0;
	            var len = Math.max(0, Math.min(args.length, to) - from);
	            while (idx < len) {
	                list[idx] = args[from + idx];
	                idx += 1;
	            }
	            return list;
	        }
	    };
	
	    /**
	     * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
	     */
	    var _toISOString = function () {
	        var pad = function pad(n) {
	            return (n < 10 ? '0' : '') + n;
	        };
	        return typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
	            return d.toISOString();
	        } : function _toISOString(d) {
	            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
	        };
	    }();
	
	    var _xfBase = {
	        init: function () {
	            return this.xf['@@transducer/init']();
	        },
	        result: function (result) {
	            return this.xf['@@transducer/result'](result);
	        }
	    };
	
	    var _xwrap = function () {
	        function XWrap(fn) {
	            this.f = fn;
	        }
	        XWrap.prototype['@@transducer/init'] = function () {
	            throw new Error('init not implemented on XWrap');
	        };
	        XWrap.prototype['@@transducer/result'] = function (acc) {
	            return acc;
	        };
	        XWrap.prototype['@@transducer/step'] = function (acc, x) {
	            return this.f(acc, x);
	        };
	        return function _xwrap(fn) {
	            return new XWrap(fn);
	        };
	    }();
	
	    var _aperture = function _aperture(n, list) {
	        var idx = 0;
	        var limit = list.length - (n - 1);
	        var acc = new Array(limit >= 0 ? limit : 0);
	        while (idx < limit) {
	            acc[idx] = _slice(list, idx, idx + n);
	            idx += 1;
	        }
	        return acc;
	    };
	
	    var _assign = typeof Object.assign === 'function' ? Object.assign : _objectAssign;
	
	    /**
	     * Similar to hasMethod, this checks whether a function has a [methodname]
	     * function. If it isn't an array it will execute that function otherwise it
	     * will default to the ramda implementation.
	     *
	     * @private
	     * @param {Function} fn ramda implemtation
	     * @param {String} methodname property to check for a custom implementation
	     * @return {Object} Whatever the return value of the method is.
	     */
	    var _checkForMethod = function _checkForMethod(methodname, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	        };
	    };
	
	    /**
	     * Optimized internal one-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry1 = function _curry1(fn) {
	        return function f1(a) {
	            if (arguments.length === 0 || _isPlaceholder(a)) {
	                return f1;
	            } else {
	                return fn.apply(this, arguments);
	            }
	        };
	    };
	
	    /**
	     * Optimized internal two-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry2 = function _curry2(fn) {
	        return function f2(a, b) {
	            switch (arguments.length) {
	            case 0:
	                return f2;
	            case 1:
	                return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
	                    return fn(a, _b);
	                });
	            default:
	                return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
	                    return fn(_a, b);
	                }) : _isPlaceholder(b) ? _curry1(function (_b) {
	                    return fn(a, _b);
	                }) : fn(a, b);
	            }
	        };
	    };
	
	    /**
	     * Optimized internal three-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry3 = function _curry3(fn) {
	        return function f3(a, b, c) {
	            switch (arguments.length) {
	            case 0:
	                return f3;
	            case 1:
	                return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                });
	            case 2:
	                return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
	                    return fn(_a, b, _c);
	                }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                }) : _curry1(function (_c) {
	                    return fn(a, b, _c);
	                });
	            default:
	                return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
	                    return fn(_a, _b, c);
	                }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
	                    return fn(_a, b, _c);
	                }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                }) : _isPlaceholder(a) ? _curry1(function (_a) {
	                    return fn(_a, b, c);
	                }) : _isPlaceholder(b) ? _curry1(function (_b) {
	                    return fn(a, _b, c);
	                }) : _isPlaceholder(c) ? _curry1(function (_c) {
	                    return fn(a, b, _c);
	                }) : fn(a, b, c);
	            }
	        };
	    };
	
	    /**
	     * Internal curryN function.
	     *
	     * @private
	     * @category Function
	     * @param {Number} length The arity of the curried function.
	     * @param {Array} received An array of arguments received thus far.
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curryN = function _curryN(length, received, fn) {
	        return function () {
	            var combined = [];
	            var argsIdx = 0;
	            var left = length;
	            var combinedIdx = 0;
	            while (combinedIdx < received.length || argsIdx < arguments.length) {
	                var result;
	                if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
	                    result = received[combinedIdx];
	                } else {
	                    result = arguments[argsIdx];
	                    argsIdx += 1;
	                }
	                combined[combinedIdx] = result;
	                if (!_isPlaceholder(result)) {
	                    left -= 1;
	                }
	                combinedIdx += 1;
	            }
	            return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
	        };
	    };
	
	    /**
	     * Returns a function that dispatches with different strategies based on the
	     * object in list position (last argument). If it is an array, executes [fn].
	     * Otherwise, if it has a function with [methodname], it will execute that
	     * function (functor case). Otherwise, if it is a transformer, uses transducer
	     * [xf] to return a new transformer (transducer case). Otherwise, it will
	     * default to executing [fn].
	     *
	     * @private
	     * @param {String} methodname property to check for a custom implementation
	     * @param {Function} xf transducer to initialize if object is transformer
	     * @param {Function} fn default ramda implementation
	     * @return {Function} A function that dispatches on object in list position
	     */
	    var _dispatchable = function _dispatchable(methodname, xf, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            if (!_isArray(obj)) {
	                var args = _slice(arguments, 0, length - 1);
	                if (typeof obj[methodname] === 'function') {
	                    return obj[methodname].apply(obj, args);
	                }
	                if (_isTransformer(obj)) {
	                    var transducer = xf.apply(null, args);
	                    return transducer(obj);
	                }
	            }
	            return fn.apply(this, arguments);
	        };
	    };
	
	    var _dropLastWhile = function dropLastWhile(pred, list) {
	        var idx = list.length - 1;
	        while (idx >= 0 && pred(list[idx])) {
	            idx -= 1;
	        }
	        return _slice(list, 0, idx + 1);
	    };
	
	    var _xall = function () {
	        function XAll(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.all = true;
	        }
	        XAll.prototype['@@transducer/init'] = _xfBase.init;
	        XAll.prototype['@@transducer/result'] = function (result) {
	            if (this.all) {
	                result = this.xf['@@transducer/step'](result, true);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAll.prototype['@@transducer/step'] = function (result, input) {
	            if (!this.f(input)) {
	                this.all = false;
	                result = _reduced(this.xf['@@transducer/step'](result, false));
	            }
	            return result;
	        };
	        return _curry2(function _xall(f, xf) {
	            return new XAll(f, xf);
	        });
	    }();
	
	    var _xany = function () {
	        function XAny(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.any = false;
	        }
	        XAny.prototype['@@transducer/init'] = _xfBase.init;
	        XAny.prototype['@@transducer/result'] = function (result) {
	            if (!this.any) {
	                result = this.xf['@@transducer/step'](result, false);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAny.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.any = true;
	                result = _reduced(this.xf['@@transducer/step'](result, true));
	            }
	            return result;
	        };
	        return _curry2(function _xany(f, xf) {
	            return new XAny(f, xf);
	        });
	    }();
	
	    var _xaperture = function () {
	        function XAperture(n, xf) {
	            this.xf = xf;
	            this.pos = 0;
	            this.full = false;
	            this.acc = new Array(n);
	        }
	        XAperture.prototype['@@transducer/init'] = _xfBase.init;
	        XAperture.prototype['@@transducer/result'] = function (result) {
	            this.acc = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XAperture.prototype['@@transducer/step'] = function (result, input) {
	            this.store(input);
	            return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
	        };
	        XAperture.prototype.store = function (input) {
	            this.acc[this.pos] = input;
	            this.pos += 1;
	            if (this.pos === this.acc.length) {
	                this.pos = 0;
	                this.full = true;
	            }
	        };
	        XAperture.prototype.getCopy = function () {
	            return _concat(_slice(this.acc, this.pos), _slice(this.acc, 0, this.pos));
	        };
	        return _curry2(function _xaperture(n, xf) {
	            return new XAperture(n, xf);
	        });
	    }();
	
	    var _xdrop = function () {
	        function XDrop(n, xf) {
	            this.xf = xf;
	            this.n = n;
	        }
	        XDrop.prototype['@@transducer/init'] = _xfBase.init;
	        XDrop.prototype['@@transducer/result'] = _xfBase.result;
	        XDrop.prototype['@@transducer/step'] = function (result, input) {
	            if (this.n > 0) {
	                this.n -= 1;
	                return result;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdrop(n, xf) {
	            return new XDrop(n, xf);
	        });
	    }();
	
	    var _xdropLast = function () {
	        function XDropLast(n, xf) {
	            this.xf = xf;
	            this.pos = 0;
	            this.full = false;
	            this.acc = new Array(n);
	        }
	        XDropLast.prototype['@@transducer/init'] = _xfBase.init;
	        XDropLast.prototype['@@transducer/result'] = function (result) {
	            this.acc = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropLast.prototype['@@transducer/step'] = function (result, input) {
	            if (this.full) {
	                result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
	            }
	            this.store(input);
	            return result;
	        };
	        XDropLast.prototype.store = function (input) {
	            this.acc[this.pos] = input;
	            this.pos += 1;
	            if (this.pos === this.acc.length) {
	                this.pos = 0;
	                this.full = true;
	            }
	        };
	        return _curry2(function _xdropLast(n, xf) {
	            return new XDropLast(n, xf);
	        });
	    }();
	
	    var _xdropRepeatsWith = function () {
	        function XDropRepeatsWith(pred, xf) {
	            this.xf = xf;
	            this.pred = pred;
	            this.lastValue = undefined;
	            this.seenFirstValue = false;
	        }
	        XDropRepeatsWith.prototype['@@transducer/init'] = function () {
	            return this.xf['@@transducer/init']();
	        };
	        XDropRepeatsWith.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
	            var sameAsLast = false;
	            if (!this.seenFirstValue) {
	                this.seenFirstValue = true;
	            } else if (this.pred(this.lastValue, input)) {
	                sameAsLast = true;
	            }
	            this.lastValue = input;
	            return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropRepeatsWith(pred, xf) {
	            return new XDropRepeatsWith(pred, xf);
	        });
	    }();
	
	    var _xdropWhile = function () {
	        function XDropWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XDropWhile.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f) {
	                if (this.f(input)) {
	                    return result;
	                }
	                this.f = null;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropWhile(f, xf) {
	            return new XDropWhile(f, xf);
	        });
	    }();
	
	    var _xfilter = function () {
	        function XFilter(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFilter.prototype['@@transducer/init'] = _xfBase.init;
	        XFilter.prototype['@@transducer/result'] = _xfBase.result;
	        XFilter.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
	        };
	        return _curry2(function _xfilter(f, xf) {
	            return new XFilter(f, xf);
	        });
	    }();
	
	    var _xfind = function () {
	        function XFind(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.found = false;
	        }
	        XFind.prototype['@@transducer/init'] = _xfBase.init;
	        XFind.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, void 0);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFind.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, input));
	            }
	            return result;
	        };
	        return _curry2(function _xfind(f, xf) {
	            return new XFind(f, xf);
	        });
	    }();
	
	    var _xfindIndex = function () {
	        function XFindIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.found = false;
	        }
	        XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindIndex.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, -1);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFindIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, this.idx));
	            }
	            return result;
	        };
	        return _curry2(function _xfindIndex(f, xf) {
	            return new XFindIndex(f, xf);
	        });
	    }();
	
	    var _xfindLast = function () {
	        function XFindLast(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFindLast.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLast.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
	        };
	        XFindLast.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.last = input;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLast(f, xf) {
	            return new XFindLast(f, xf);
	        });
	    }();
	
	    var _xfindLastIndex = function () {
	        function XFindLastIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.lastIdx = -1;
	        }
	        XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLastIndex.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
	        };
	        XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.lastIdx = this.idx;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLastIndex(f, xf) {
	            return new XFindLastIndex(f, xf);
	        });
	    }();
	
	    var _xmap = function () {
	        function XMap(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XMap.prototype['@@transducer/init'] = _xfBase.init;
	        XMap.prototype['@@transducer/result'] = _xfBase.result;
	        XMap.prototype['@@transducer/step'] = function (result, input) {
	            return this.xf['@@transducer/step'](result, this.f(input));
	        };
	        return _curry2(function _xmap(f, xf) {
	            return new XMap(f, xf);
	        });
	    }();
	
	    var _xreduceBy = function () {
	        function XReduceBy(valueFn, valueAcc, keyFn, xf) {
	            this.valueFn = valueFn;
	            this.valueAcc = valueAcc;
	            this.keyFn = keyFn;
	            this.xf = xf;
	            this.inputs = {};
	        }
	        XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
	        XReduceBy.prototype['@@transducer/result'] = function (result) {
	            var key;
	            for (key in this.inputs) {
	                if (_has(key, this.inputs)) {
	                    result = this.xf['@@transducer/step'](result, this.inputs[key]);
	                    if (result['@@transducer/reduced']) {
	                        result = result['@@transducer/value'];
	                        break;
	                    }
	                }
	            }
	            this.inputs = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XReduceBy.prototype['@@transducer/step'] = function (result, input) {
	            var key = this.keyFn(input);
	            this.inputs[key] = this.inputs[key] || [
	                key,
	                this.valueAcc
	            ];
	            this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
	            return result;
	        };
	        return _curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
	            return new XReduceBy(valueFn, valueAcc, keyFn, xf);
	        });
	    }();
	
	    var _xtake = function () {
	        function XTake(n, xf) {
	            this.xf = xf;
	            this.n = n;
	            this.i = 0;
	        }
	        XTake.prototype['@@transducer/init'] = _xfBase.init;
	        XTake.prototype['@@transducer/result'] = _xfBase.result;
	        XTake.prototype['@@transducer/step'] = function (result, input) {
	            this.i += 1;
	            var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
	            return this.i >= this.n ? _reduced(ret) : ret;
	        };
	        return _curry2(function _xtake(n, xf) {
	            return new XTake(n, xf);
	        });
	    }();
	
	    var _xtakeWhile = function () {
	        function XTakeWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
	        };
	        return _curry2(function _xtakeWhile(f, xf) {
	            return new XTakeWhile(f, xf);
	        });
	    }();
	
	    /**
	     * Adds two values.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Number}
	     * @see R.subtract
	     * @example
	     *
	     *      R.add(2, 3);       //=>  5
	     *      R.add(7)(10);      //=> 17
	     */
	    var add = _curry2(function add(a, b) {
	        return Number(a) + Number(b);
	    });
	
	    /**
	     * Applies a function to the value at the given index of an array, returning a
	     * new copy of the array with the element at the given index replaced with the
	     * result of the function application.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig (a -> a) -> Number -> [a] -> [a]
	     * @param {Function} fn The function to apply.
	     * @param {Number} idx The index.
	     * @param {Array|Arguments} list An array-like object whose value
	     *        at the supplied index will be replaced.
	     * @return {Array} A copy of the supplied array-like object with
	     *         the element at index `idx` replaced with the value
	     *         returned by applying `fn` to the existing element.
	     * @see R.update
	     * @example
	     *
	     *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var adjust = _curry3(function adjust(fn, idx, list) {
	        if (idx >= list.length || idx < -list.length) {
	            return list;
	        }
	        var start = idx < 0 ? list.length : 0;
	        var _idx = start + idx;
	        var _list = _concat(list);
	        _list[_idx] = fn(list[_idx]);
	        return _list;
	    });
	
	    /**
	     * Returns `true` if all elements of the list match the predicate, `false` if
	     * there are any that don't.
	     *
	     * Dispatches to the `all` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
	     *         otherwise.
	     * @see R.any, R.none, R.transduce
	     * @example
	     *
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      var lessThan3 = R.flip(R.lt)(3);
	     *      R.all(lessThan2)([1, 2]); //=> false
	     *      R.all(lessThan3)([1, 2]); //=> true
	     */
	    var all = _curry2(_dispatchable('all', _xall, function all(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (!fn(list[idx])) {
	                return false;
	            }
	            idx += 1;
	        }
	        return true;
	    }));
	
	    /**
	     * Returns a function that always returns the given value. Note that for
	     * non-primitives the value returned is a reference to the original value.
	     *
	     * This function is known as `const`, `constant`, or `K` (for K combinator) in
	     * other languages and libraries.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig a -> (* -> a)
	     * @param {*} val The value to wrap in a function
	     * @return {Function} A Function :: * -> val.
	     * @example
	     *
	     *      var t = R.always('Tee');
	     *      t(); //=> 'Tee'
	     */
	    var always = _curry1(function always(val) {
	        return function () {
	            return val;
	        };
	    });
	
	    /**
	     * Returns `true` if both arguments are `true`; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {Boolean} a A boolean value
	     * @param {Boolean} b A boolean value
	     * @return {Boolean} `true` if both arguments are `true`, `false` otherwise
	     * @see R.both
	     * @example
	     *
	     *      R.and(true, true); //=> true
	     *      R.and(true, false); //=> false
	     *      R.and(false, true); //=> false
	     *      R.and(false, false); //=> false
	     */
	    var and = _curry2(function and(a, b) {
	        return a && b;
	    });
	
	    /**
	     * Returns `true` if at least one of elements of the list match the predicate,
	     * `false` otherwise.
	     *
	     * Dispatches to the `any` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
	     *         otherwise.
	     * @see R.all, R.none, R.transduce
	     * @example
	     *
	     *      var lessThan0 = R.flip(R.lt)(0);
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      R.any(lessThan0)([1, 2]); //=> false
	     *      R.any(lessThan2)([1, 2]); //=> true
	     */
	    var any = _curry2(_dispatchable('any', _xany, function any(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (fn(list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    }));
	
	    /**
	     * Returns a new list, composed of n-tuples of consecutive elements If `n` is
	     * greater than the length of the list, an empty list is returned.
	     *
	     * Dispatches to the `aperture` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig Number -> [a] -> [[a]]
	     * @param {Number} n The size of the tuples to create
	     * @param {Array} list The list to split into `n`-tuples
	     * @return {Array} The new list.
	     * @see R.transduce
	     * @example
	     *
	     *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
	     *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
	     *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
	     */
	    var aperture = _curry2(_dispatchable('aperture', _xaperture, _aperture));
	
	    /**
	     * Returns a new list containing the contents of the given list, followed by
	     * the given element.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The element to add to the end of the new list.
	     * @param {Array} list The list whose contents will be added to the beginning of the output
	     *        list.
	     * @return {Array} A new list containing the contents of the old list followed by `el`.
	     * @see R.prepend
	     * @example
	     *
	     *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
	     *      R.append('tests', []); //=> ['tests']
	     *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
	     */
	    var append = _curry2(function append(el, list) {
	        return _concat(list, [el]);
	    });
	
	    /**
	     * Applies function `fn` to the argument list `args`. This is useful for
	     * creating a fixed-arity function from a variadic function. `fn` should be a
	     * bound function if context is significant.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig (*... -> a) -> [*] -> a
	     * @param {Function} fn
	     * @param {Array} args
	     * @return {*}
	     * @see R.call, R.unapply
	     * @example
	     *
	     *      var nums = [1, 2, 3, -99, 42, 6, 7];
	     *      R.apply(Math.max, nums); //=> 42
	     */
	    var apply = _curry2(function apply(fn, args) {
	        return fn.apply(this, args);
	    });
	
	    /**
	     * Makes a shallow clone of an object, setting or overriding the specified
	     * property with the given value. Note that this copies and flattens prototype
	     * properties onto the new object as well. All non-primitive properties are
	     * copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig String -> a -> {k: v} -> {k: v}
	     * @param {String} prop the property name to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except for the specified property.
	     * @see R.dissoc
	     * @example
	     *
	     *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
	     */
	    var assoc = _curry3(function assoc(prop, val, obj) {
	        var result = {};
	        for (var p in obj) {
	            result[p] = obj[p];
	        }
	        result[prop] = val;
	        return result;
	    });
	
	    /**
	     * Makes a shallow clone of an object, setting or overriding the nodes required
	     * to create the given path, and placing the specific value at the tail end of
	     * that path. Note that this copies and flattens prototype properties onto the
	     * new object as well. All non-primitive properties are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig [String] -> a -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except along the specified path.
	     * @see R.dissocPath
	     * @example
	     *
	     *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
	     */
	    var assocPath = _curry3(function assocPath(path, val, obj) {
	        switch (path.length) {
	        case 0:
	            return val;
	        case 1:
	            return assoc(path[0], val, obj);
	        default:
	            return assoc(path[0], assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
	        }
	    });
	
	    /**
	     * Creates a function that is bound to a context.
	     * Note: `R.bind` does not provide the additional argument-binding capabilities of
	     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Function
	     * @category Object
	     * @sig (* -> *) -> {*} -> (* -> *)
	     * @param {Function} fn The function to bind to context
	     * @param {Object} thisObj The context to bind `fn` to
	     * @return {Function} A function that will execute in the context of `thisObj`.
	     * @see R.partial
	     * @example
	     *
	     *      var log = R.bind(console.log, console);
	     *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
	     *      // logs {a: 2}
	     */
	    var bind = _curry2(function bind(fn, thisObj) {
	        return _arity(fn.length, function () {
	            return fn.apply(thisObj, arguments);
	        });
	    });
	
	    /**
	     * Restricts a number to be within a range.
	     *
	     * Also works for other ordered types such as Strings and Dates.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a -> a
	     * @param {Number} minimum number
	     * @param {Number} maximum number
	     * @param {Number} value to be clamped
	     * @return {Number} Returns the clamped value
	     * @example
	     *
	     *      R.clamp(1, 10, -1) // => 1
	     *      R.clamp(1, 10, 11) // => 10
	     *      R.clamp(1, 10, 4)  // => 4
	     */
	    var clamp = _curry3(function clamp(min, max, value) {
	        if (min > max) {
	            throw new Error('min must not be greater than max in clamp(min, max, value)');
	        }
	        return value < min ? min : value > max ? max : value;
	    });
	
	    /**
	     * Makes a comparator function out of a function that reports whether the first
	     * element is less than the second.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a, b -> Boolean) -> (a, b -> Number)
	     * @param {Function} pred A predicate function of arity two.
	     * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`.
	     * @example
	     *
	     *      var cmp = R.comparator((a, b) => a.age < b.age);
	     *      var people = [
	     *        // ...
	     *      ];
	     *      R.sort(cmp, people);
	     */
	    var comparator = _curry1(function comparator(pred) {
	        return function (a, b) {
	            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
	        };
	    });
	
	    /**
	     * Returns a curried equivalent of the provided function, with the specified
	     * arity. The curried function has two unusual capabilities. First, its
	     * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	     * following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	     * following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @since v0.5.0
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curry
	     * @example
	     *
	     *      var sumArgs = (...args) => R.sum(args);
	     *
	     *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curryN = _curry2(function curryN(length, fn) {
	        if (length === 1) {
	            return _curry1(fn);
	        }
	        return _arity(length, _curryN(length, [], fn));
	    });
	
	    /**
	     * Decrements its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @see R.inc
	     * @example
	     *
	     *      R.dec(42); //=> 41
	     */
	    var dec = add(-1);
	
	    /**
	     * Returns the second argument if it is not `null`, `undefined` or `NaN`
	     * otherwise the first argument is returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Logic
	     * @sig a -> b -> a | b
	     * @param {a} val The default value.
	     * @param {b} val The value to return if it is not null or undefined
	     * @return {*} The the second value or the default value
	     * @example
	     *
	     *      var defaultTo42 = R.defaultTo(42);
	     *
	     *      defaultTo42(null);  //=> 42
	     *      defaultTo42(undefined);  //=> 42
	     *      defaultTo42('Ramda');  //=> 'Ramda'
	     *      defaultTo42(parseInt('string')); //=> 42
	     */
	    var defaultTo = _curry2(function defaultTo(d, v) {
	        return v == null || v !== v ? d : v;
	    });
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not
	     * contained in the second list. Duplication is determined according to the
	     * value returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
	     * @example
	     *
	     *      var cmp = (x, y) => x.a === y.a;
	     *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
	     *      var l2 = [{a: 3}, {a: 4}];
	     *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
	     */
	    var differenceWith = _curry3(function differenceWith(pred, first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        while (idx < firstLen) {
	            if (!_containsWith(pred, first[idx], second) && !_containsWith(pred, first[idx], out)) {
	                out.push(first[idx]);
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new object that does not contain a `prop` property.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Object
	     * @sig String -> {k: v} -> {k: v}
	     * @param {String} prop the name of the property to dissociate
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original but without the specified property
	     * @see R.assoc
	     * @example
	     *
	     *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
	     */
	    var dissoc = _curry2(function dissoc(prop, obj) {
	        var result = {};
	        for (var p in obj) {
	            if (p !== prop) {
	                result[p] = obj[p];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Makes a shallow clone of an object, omitting the property at the given path.
	     * Note that this copies and flattens prototype properties onto the new object
	     * as well. All non-primitive properties are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.11.0
	     * @category Object
	     * @sig [String] -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object without the property at path
	     * @see R.assocPath
	     * @example
	     *
	     *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
	     */
	    var dissocPath = _curry2(function dissocPath(path, obj) {
	        switch (path.length) {
	        case 0:
	            return obj;
	        case 1:
	            return dissoc(path[0], obj);
	        default:
	            var head = path[0];
	            var tail = _slice(path, 1);
	            return obj[head] == null ? obj : assoc(head, dissocPath(tail, obj[head]), obj);
	        }
	    });
	
	    /**
	     * Divides two numbers. Equivalent to `a / b`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a / b`.
	     * @see R.multiply
	     * @example
	     *
	     *      R.divide(71, 100); //=> 0.71
	     *
	     *      var half = R.divide(R.__, 2);
	     *      half(42); //=> 21
	     *
	     *      var reciprocal = R.divide(1);
	     *      reciprocal(4);   //=> 0.25
	     */
	    var divide = _curry2(function divide(a, b) {
	        return a / b;
	    });
	
	    /**
	     * Returns a new list excluding the leading elements of a given list which
	     * satisfy the supplied predicate function. It passes each value to the supplied
	     * predicate function, skipping elements while the predicate function returns
	     * `true`. The predicate function is applied to one argument: *(value)*.
	     *
	     * Dispatches to the `dropWhile` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.takeWhile, R.transduce, R.addIndex
	     * @example
	     *
	     *      var lteTwo = x => x <= 2;
	     *
	     *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
	     */
	    var dropWhile = _curry2(_dispatchable('dropWhile', _xdropWhile, function dropWhile(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len && pred(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, idx);
	    }));
	
	    /**
	     * Returns the empty value of its argument's type. Ramda defines the empty
	     * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
	     * types are supported if they define `<Type>.empty` and/or
	     * `<Type>.prototype.empty`.
	     *
	     * Dispatches to the `empty` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig a -> a
	     * @param {*} x
	     * @return {*}
	     * @example
	     *
	     *      R.empty(Just(42));      //=> Nothing()
	     *      R.empty([1, 2, 3]);     //=> []
	     *      R.empty('unicorns');    //=> ''
	     *      R.empty({x: 1, y: 2});  //=> {}
	     */
	    // else
	    var empty = _curry1(function empty(x) {
	        return x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
	            return arguments;
	        }() : // else
	        void 0;
	    });
	
	    /**
	     * Creates a new object by recursively evolving a shallow copy of `object`,
	     * according to the `transformation` functions. All non-primitive properties
	     * are copied by reference.
	     *
	     * A `transformation` function will not be invoked if its corresponding key
	     * does not exist in the evolved object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {k: (v -> v)} -> {k: v} -> {k: v}
	     * @param {Object} transformations The object specifying transformation functions to apply
	     *        to the object.
	     * @param {Object} object The object to be transformed.
	     * @return {Object} The transformed object.
	     * @example
	     *
	     *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
	     *      var transformations = {
	     *        firstName: R.trim,
	     *        lastName: R.trim, // Will not get invoked.
	     *        data: {elapsed: R.add(1), remaining: R.add(-1)}
	     *      };
	     *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
	     */
	    var evolve = _curry2(function evolve(transformations, object) {
	        var result = {};
	        var transformation, key, type;
	        for (key in object) {
	            transformation = transformations[key];
	            type = typeof transformation;
	            result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
	        }
	        return result;
	    });
	
	    /**
	     * Returns the first element of the list which matches the predicate, or
	     * `undefined` if no element matches.
	     *
	     * Dispatches to the `find` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     *        desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
	     *      R.find(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var find = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx += 1;
	        }
	    }));
	
	    /**
	     * Returns the index of the first element of the list which matches the
	     * predicate, or `-1` if no element matches.
	     *
	     * Dispatches to the `findIndex` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
	     *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findIndex = _curry2(_dispatchable('findIndex', _xfindIndex, function findIndex(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    }));
	
	    /**
	     * Returns the last element of the list which matches the predicate, or
	     * `undefined` if no element matches.
	     *
	     * Dispatches to the `findLast` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
	     *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var findLast = _curry2(_dispatchable('findLast', _xfindLast, function findLast(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx -= 1;
	        }
	    }));
	
	    /**
	     * Returns the index of the last element of the list which matches the
	     * predicate, or `-1` if no element matches.
	     *
	     * Dispatches to the `findLastIndex` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
	     *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findLastIndex = _curry2(_dispatchable('findLastIndex', _xfindLastIndex, function findLastIndex(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx -= 1;
	        }
	        return -1;
	    }));
	
	    /**
	     * Iterate over an input `list`, calling a provided function `fn` for each
	     * element in the list.
	     *
	     * `fn` receives one argument: *(value)*.
	     *
	     * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.forEach` method. For more
	     * details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
	     *
	     * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
	     * the original array. In some libraries this function is named `each`.
	     *
	     * Dispatches to the `forEach` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> *) -> [a] -> [a]
	     * @param {Function} fn The function to invoke. Receives one argument, `value`.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} The original list.
	     * @see R.addIndex
	     * @example
	     *
	     *      var printXPlusFive = x => console.log(x + 5);
	     *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
	     *      // logs 6
	     *      // logs 7
	     *      // logs 8
	     */
	    var forEach = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
	        var len = list.length;
	        var idx = 0;
	        while (idx < len) {
	            fn(list[idx]);
	            idx += 1;
	        }
	        return list;
	    }));
	
	    /**
	     * Creates a new object from a list key-value pairs. If a key appears in
	     * multiple pairs, the rightmost pair is included in the object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [[k,v]] -> {k: v}
	     * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
	     * @return {Object} The object made by pairing up `keys` and `values`.
	     * @see R.toPairs, R.pair
	     * @example
	     *
	     *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
	     */
	    var fromPairs = _curry1(function fromPairs(pairs) {
	        var result = {};
	        var idx = 0;
	        while (idx < pairs.length) {
	            result[pairs[idx][0]] = pairs[idx][1];
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Takes a list and returns a list of lists where each sublist's elements are
	     * all "equal" according to the provided equality function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.21.0
	     * @category List
	     * @sig ((a, a) → Boolean) → [a] → [[a]]
	     * @param {Function} fn Function for determining whether two given (adjacent)
	     *        elements should be in the same group
	     * @param {Array} list The array to group. Also accepts a string, which will be
	     *        treated as a list of characters.
	     * @return {List} A list that contains sublists of equal elements,
	     *         whose concatenations are equal to the original list.
	     * @example
	     *
	     * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
	     * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
	     *
	     * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
	     * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
	     *
	     * R.groupWith(R.eqBy(isVowel), 'aestiou')
	     * //=> ['ae', 'st', 'iou']
	     */
	    var groupWith = _curry2(function (fn, list) {
	        var res = [];
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            var nextidx = idx + 1;
	            while (nextidx < len && fn(list[idx], list[nextidx])) {
	                nextidx += 1;
	            }
	            res.push(list.slice(idx, nextidx));
	            idx = nextidx;
	        }
	        return res;
	    });
	
	    /**
	     * Returns `true` if the first argument is greater than the second; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @see R.lt
	     * @example
	     *
	     *      R.gt(2, 1); //=> true
	     *      R.gt(2, 2); //=> false
	     *      R.gt(2, 3); //=> false
	     *      R.gt('a', 'z'); //=> false
	     *      R.gt('z', 'a'); //=> true
	     */
	    var gt = _curry2(function gt(a, b) {
	        return a > b;
	    });
	
	    /**
	     * Returns `true` if the first argument is greater than or equal to the second;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean}
	     * @see R.lte
	     * @example
	     *
	     *      R.gte(2, 1); //=> true
	     *      R.gte(2, 2); //=> true
	     *      R.gte(2, 3); //=> false
	     *      R.gte('a', 'z'); //=> false
	     *      R.gte('z', 'a'); //=> true
	     */
	    var gte = _curry2(function gte(a, b) {
	        return a >= b;
	    });
	
	    /**
	     * Returns whether or not an object has an own property with the specified name
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      var hasName = R.has('name');
	     *      hasName({name: 'alice'});   //=> true
	     *      hasName({name: 'bob'});     //=> true
	     *      hasName({});                //=> false
	     *
	     *      var point = {x: 0, y: 0};
	     *      var pointHas = R.has(R.__, point);
	     *      pointHas('x');  //=> true
	     *      pointHas('y');  //=> true
	     *      pointHas('z');  //=> false
	     */
	    var has = _curry2(_has);
	
	    /**
	     * Returns whether or not an object or its prototype chain has a property with
	     * the specified name
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      function Rectangle(width, height) {
	     *        this.width = width;
	     *        this.height = height;
	     *      }
	     *      Rectangle.prototype.area = function() {
	     *        return this.width * this.height;
	     *      };
	     *
	     *      var square = new Rectangle(2, 2);
	     *      R.hasIn('width', square);  //=> true
	     *      R.hasIn('area', square);  //=> true
	     */
	    var hasIn = _curry2(function hasIn(prop, obj) {
	        return prop in obj;
	    });
	
	    /**
	     * Returns true if its arguments are identical, false otherwise. Values are
	     * identical if they reference the same memory. `NaN` is identical to `NaN`;
	     * `0` and `-0` are not identical.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Relation
	     * @sig a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      var o = {};
	     *      R.identical(o, o); //=> true
	     *      R.identical(1, 1); //=> true
	     *      R.identical(1, '1'); //=> false
	     *      R.identical([], []); //=> false
	     *      R.identical(0, -0); //=> false
	     *      R.identical(NaN, NaN); //=> true
	     */
	    // SameValue algorithm
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Step 6.a: NaN == NaN
	    var identical = _curry2(function identical(a, b) {
	        // SameValue algorithm
	        if (a === b) {
	            // Steps 1-5, 7-10
	            // Steps 6.b-6.e: +0 != -0
	            return a !== 0 || 1 / a === 1 / b;
	        } else {
	            // Step 6.a: NaN == NaN
	            return a !== a && b !== b;
	        }
	    });
	
	    /**
	     * A function that does nothing but return the parameter supplied to it. Good
	     * as a default or placeholder function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig a -> a
	     * @param {*} x The value to return.
	     * @return {*} The input value, `x`.
	     * @example
	     *
	     *      R.identity(1); //=> 1
	     *
	     *      var obj = {};
	     *      R.identity(obj) === obj; //=> true
	     */
	    var identity = _curry1(_identity);
	
	    /**
	     * Creates a function that will process either the `onTrue` or the `onFalse`
	     * function depending upon the result of the `condition` predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
	     * @param {Function} condition A predicate function
	     * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
	     * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
	     * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
	     *                    function depending upon the result of the `condition` predicate.
	     * @see R.unless, R.when
	     * @example
	     *
	     *      var incCount = R.ifElse(
	     *        R.has('count'),
	     *        R.over(R.lensProp('count'), R.inc),
	     *        R.assoc('count', 1)
	     *      );
	     *      incCount({});           //=> { count: 1 }
	     *      incCount({ count: 1 }); //=> { count: 2 }
	     */
	    var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
	        return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
	            return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
	        });
	    });
	
	    /**
	     * Increments its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @see R.dec
	     * @example
	     *
	     *      R.inc(42); //=> 43
	     */
	    var inc = add(1);
	
	    /**
	     * Inserts the supplied element into the list, at index `index`. _Note that
	     * this is not destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.2
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} index The position to insert the element
	     * @param {*} elt The element to insert into the Array
	     * @param {Array} list The list to insert into
	     * @return {Array} A new Array with `elt` inserted at `index`.
	     * @example
	     *
	     *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
	     */
	    var insert = _curry3(function insert(idx, elt, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        var result = _slice(list);
	        result.splice(idx, 0, elt);
	        return result;
	    });
	
	    /**
	     * Inserts the sub-list into the list, at index `index`. _Note that this is not
	     * destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig Number -> [a] -> [a] -> [a]
	     * @param {Number} index The position to insert the sub-list
	     * @param {Array} elts The sub-list to insert into the Array
	     * @param {Array} list The list to insert the sub-list into
	     * @return {Array} A new Array with `elts` inserted starting at `index`.
	     * @example
	     *
	     *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
	     */
	    var insertAll = _curry3(function insertAll(idx, elts, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
	    });
	
	    /**
	     * Creates a new list with the separator interposed between elements.
	     *
	     * Dispatches to the `intersperse` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} separator The element to add to the list.
	     * @param {Array} list The list to be interposed.
	     * @return {Array} The new list.
	     * @example
	     *
	     *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
	     */
	    var intersperse = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
	        var out = [];
	        var idx = 0;
	        var length = list.length;
	        while (idx < length) {
	            if (idx === length - 1) {
	                out.push(list[idx]);
	            } else {
	                out.push(list[idx], separator);
	            }
	            idx += 1;
	        }
	        return out;
	    }));
	
	    /**
	     * See if an object (`val`) is an instance of the supplied constructor. This
	     * function will check up the inheritance chain, if any.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Type
	     * @sig (* -> {*}) -> a -> Boolean
	     * @param {Object} ctor A constructor
	     * @param {*} val The value to test
	     * @return {Boolean}
	     * @example
	     *
	     *      R.is(Object, {}); //=> true
	     *      R.is(Number, 1); //=> true
	     *      R.is(Object, 1); //=> false
	     *      R.is(String, 's'); //=> true
	     *      R.is(String, new String('')); //=> true
	     *      R.is(Object, new String('')); //=> true
	     *      R.is(Object, 's'); //=> false
	     *      R.is(Number, {}); //=> false
	     */
	    var is = _curry2(function is(Ctor, val) {
	        return val != null && val.constructor === Ctor || val instanceof Ctor;
	    });
	
	    /**
	     * Tests whether or not an object is similar to an array.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.5.0
	     * @category Type
	     * @category List
	     * @sig * -> Boolean
	     * @param {*} x The object to test.
	     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	     * @example
	     *
	     *      R.isArrayLike([]); //=> true
	     *      R.isArrayLike(true); //=> false
	     *      R.isArrayLike({}); //=> false
	     *      R.isArrayLike({length: 10}); //=> false
	     *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	     */
	    var isArrayLike = _curry1(function isArrayLike(x) {
	        if (_isArray(x)) {
	            return true;
	        }
	        if (!x) {
	            return false;
	        }
	        if (typeof x !== 'object') {
	            return false;
	        }
	        if (_isString(x)) {
	            return false;
	        }
	        if (x.nodeType === 1) {
	            return !!x.length;
	        }
	        if (x.length === 0) {
	            return true;
	        }
	        if (x.length > 0) {
	            return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	        }
	        return false;
	    });
	
	    /**
	     * Checks if the input value is `null` or `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Type
	     * @sig * -> Boolean
	     * @param {*} x The value to test.
	     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
	     * @example
	     *
	     *      R.isNil(null); //=> true
	     *      R.isNil(undefined); //=> true
	     *      R.isNil(0); //=> false
	     *      R.isNil([]); //=> false
	     */
	    var isNil = _curry1(function isNil(x) {
	        return x == null;
	    });
	
	    /**
	     * Returns a list containing the names of all the enumerable own properties of
	     * the supplied object.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own properties.
	     * @example
	     *
	     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
	     */
	    // cover IE < 9 keys issues
	    // Safari bug
	    var keys = function () {
	        // cover IE < 9 keys issues
	        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	        var nonEnumerableProps = [
	            'constructor',
	            'valueOf',
	            'isPrototypeOf',
	            'toString',
	            'propertyIsEnumerable',
	            'hasOwnProperty',
	            'toLocaleString'
	        ];
	        // Safari bug
	        var hasArgsEnumBug = function () {
	            'use strict';
	            return arguments.propertyIsEnumerable('length');
	        }();
	        var contains = function contains(list, item) {
	            var idx = 0;
	            while (idx < list.length) {
	                if (list[idx] === item) {
	                    return true;
	                }
	                idx += 1;
	            }
	            return false;
	        };
	        return typeof Object.keys === 'function' && !hasArgsEnumBug ? _curry1(function keys(obj) {
	            return Object(obj) !== obj ? [] : Object.keys(obj);
	        }) : _curry1(function keys(obj) {
	            if (Object(obj) !== obj) {
	                return [];
	            }
	            var prop, nIdx;
	            var ks = [];
	            var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
	            for (prop in obj) {
	                if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
	                    ks[ks.length] = prop;
	                }
	            }
	            if (hasEnumBug) {
	                nIdx = nonEnumerableProps.length - 1;
	                while (nIdx >= 0) {
	                    prop = nonEnumerableProps[nIdx];
	                    if (_has(prop, obj) && !contains(ks, prop)) {
	                        ks[ks.length] = prop;
	                    }
	                    nIdx -= 1;
	                }
	            }
	            return ks;
	        });
	    }();
	
	    /**
	     * Returns a list containing the names of all the properties of the supplied
	     * object, including prototype properties.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.keysIn(f); //=> ['x', 'y']
	     */
	    var keysIn = _curry1(function keysIn(obj) {
	        var prop;
	        var ks = [];
	        for (prop in obj) {
	            ks[ks.length] = prop;
	        }
	        return ks;
	    });
	
	    /**
	     * Returns the number of elements in the array by returning `list.length`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [a] -> Number
	     * @param {Array} list The array to inspect.
	     * @return {Number} The length of the array.
	     * @example
	     *
	     *      R.length([]); //=> 0
	     *      R.length([1, 2, 3]); //=> 3
	     */
	    var length = _curry1(function length(list) {
	        return list != null && _isNumber(list.length) ? list.length : NaN;
	    });
	
	    /**
	     * Returns `true` if the first argument is less than the second; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @see R.gt
	     * @example
	     *
	     *      R.lt(2, 1); //=> false
	     *      R.lt(2, 2); //=> false
	     *      R.lt(2, 3); //=> true
	     *      R.lt('a', 'z'); //=> true
	     *      R.lt('z', 'a'); //=> false
	     */
	    var lt = _curry2(function lt(a, b) {
	        return a < b;
	    });
	
	    /**
	     * Returns `true` if the first argument is less than or equal to the second;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean}
	     * @see R.gte
	     * @example
	     *
	     *      R.lte(2, 1); //=> false
	     *      R.lte(2, 2); //=> true
	     *      R.lte(2, 3); //=> true
	     *      R.lte('a', 'z'); //=> true
	     *      R.lte('z', 'a'); //=> false
	     */
	    var lte = _curry2(function lte(a, b) {
	        return a <= b;
	    });
	
	    /**
	     * The mapAccum function behaves like a combination of map and reduce; it
	     * applies a function to each element of a list, passing an accumulating
	     * parameter from left to right, and returning a final value of this
	     * accumulator together with the new list.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should
	     * return a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var appender = (a, b) => [a + b, a + b];
	     *
	     *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
	     */
	    var mapAccum = _curry3(function mapAccum(fn, acc, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        var tuple = [acc];
	        while (idx < len) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx += 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });
	
	    /**
	     * The mapAccumRight function behaves like a combination of map and reduce; it
	     * applies a function to each element of a list, passing an accumulating
	     * parameter from right to left, and returning a final value of this
	     * accumulator together with the new list.
	     *
	     * Similar to `mapAccum`, except moves through the input list from the right to
	     * the left.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should
	     * return a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var append = (a, b) => [a + b, a + b];
	     *
	     *      R.mapAccumRight(append, 0, digits); //=> ['04321', ['04321', '0432', '043', '04']]
	     */
	    var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
	        var idx = list.length - 1;
	        var result = [];
	        var tuple = [acc];
	        while (idx >= 0) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx -= 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });
	
	    /**
	     * Tests a regular expression against a String. Note that this function will
	     * return an empty array when there are no matches. This differs from
	     * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
	     * which returns `null` when there are no matches.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category String
	     * @sig RegExp -> String -> [String | Undefined]
	     * @param {RegExp} rx A regular expression.
	     * @param {String} str The string to match against
	     * @return {Array} The list of matches or empty array.
	     * @see R.test
	     * @example
	     *
	     *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
	     *      R.match(/a/, 'b'); //=> []
	     *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
	     */
	    var match = _curry2(function match(rx, str) {
	        return str.match(rx) || [];
	    });
	
	    /**
	     * mathMod behaves like the modulo operator should mathematically, unlike the
	     * `%` operator (and by extension, R.modulo). So while "-17 % 5" is -2,
	     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
	     * when the modulus is zero or negative.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} m The dividend.
	     * @param {Number} p the modulus.
	     * @return {Number} The result of `b mod a`.
	     * @example
	     *
	     *      R.mathMod(-17, 5);  //=> 3
	     *      R.mathMod(17, 5);   //=> 2
	     *      R.mathMod(17, -5);  //=> NaN
	     *      R.mathMod(17, 0);   //=> NaN
	     *      R.mathMod(17.2, 5); //=> NaN
	     *      R.mathMod(17, 5.3); //=> NaN
	     *
	     *      var clock = R.mathMod(R.__, 12);
	     *      clock(15); //=> 3
	     *      clock(24); //=> 0
	     *
	     *      var seventeenMod = R.mathMod(17);
	     *      seventeenMod(3);  //=> 2
	     *      seventeenMod(4);  //=> 1
	     *      seventeenMod(10); //=> 7
	     */
	    var mathMod = _curry2(function mathMod(m, p) {
	        if (!_isInteger(m)) {
	            return NaN;
	        }
	        if (!_isInteger(p) || p < 1) {
	            return NaN;
	        }
	        return (m % p + p) % p;
	    });
	
	    /**
	     * Returns the larger of its two arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.maxBy, R.min
	     * @example
	     *
	     *      R.max(789, 123); //=> 789
	     *      R.max('a', 'b'); //=> 'b'
	     */
	    var max = _curry2(function max(a, b) {
	        return b > a ? b : a;
	    });
	
	    /**
	     * Takes a function and two values, and returns whichever value produces the
	     * larger result when passed to the provided function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> a -> a -> a
	     * @param {Function} f
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.max, R.minBy
	     * @example
	     *
	     *      //  square :: Number -> Number
	     *      var square = n => n * n;
	     *
	     *      R.maxBy(square, -3, 2); //=> -3
	     *
	     *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
	     *      R.reduce(R.maxBy(square), 0, []); //=> 0
	     */
	    var maxBy = _curry3(function maxBy(f, a, b) {
	        return f(b) > f(a) ? b : a;
	    });
	
	    /**
	     * Create a new object with the own properties of the first object merged with
	     * the own properties of the second object. If a key exists in both objects,
	     * the value from the second object will be used.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> {k: v} -> {k: v}
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.mergeWith, R.mergeWithKey
	     * @example
	     *
	     *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	     *      //=> { 'name': 'fred', 'age': 40 }
	     *
	     *      var resetToDefault = R.merge(R.__, {x: 0});
	     *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
	     */
	    var merge = _curry2(function merge(l, r) {
	        return _assign({}, l, r);
	    });
	
	    /**
	     * Merges a list of objects together into one object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig [{k: v}] -> {k: v}
	     * @param {Array} list An array of objects
	     * @return {Object} A merged object.
	     * @see R.reduce
	     * @example
	     *
	     *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
	     *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
	     */
	    var mergeAll = _curry1(function mergeAll(list) {
	        return _assign.apply(null, [{}].concat(list));
	    });
	
	    /**
	     * Creates a new object with the own properties of the two provided objects. If
	     * a key exists in both objects, the provided function is applied to the key
	     * and the values associated with the key in each object, with the result being
	     * used as the value associated with the key in the returned object. The key
	     * will be excluded from the returned object if the resulting value is
	     * `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @sig (String -> a -> a -> a) -> {a} -> {a} -> {a}
	     * @param {Function} fn
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.merge, R.mergeWith
	     * @example
	     *
	     *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
	     *      R.mergeWithKey(concatValues,
	     *                     { a: true, thing: 'foo', values: [10, 20] },
	     *                     { b: true, thing: 'bar', values: [15, 35] });
	     *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
	     */
	    var mergeWithKey = _curry3(function mergeWithKey(fn, l, r) {
	        var result = {};
	        var k;
	        for (k in l) {
	            if (_has(k, l)) {
	                result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
	            }
	        }
	        for (k in r) {
	            if (_has(k, r) && !_has(k, result)) {
	                result[k] = r[k];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Returns the smaller of its two arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.minBy, R.max
	     * @example
	     *
	     *      R.min(789, 123); //=> 123
	     *      R.min('a', 'b'); //=> 'a'
	     */
	    var min = _curry2(function min(a, b) {
	        return b < a ? b : a;
	    });
	
	    /**
	     * Takes a function and two values, and returns whichever value produces the
	     * smaller result when passed to the provided function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> a -> a -> a
	     * @param {Function} f
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.min, R.maxBy
	     * @example
	     *
	     *      //  square :: Number -> Number
	     *      var square = n => n * n;
	     *
	     *      R.minBy(square, -3, 2); //=> 2
	     *
	     *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
	     *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
	     */
	    var minBy = _curry3(function minBy(f, a, b) {
	        return f(b) < f(a) ? b : a;
	    });
	
	    /**
	     * Divides the first parameter by the second and returns the remainder. Note
	     * that this function preserves the JavaScript-style behavior for modulo. For
	     * mathematical modulo see `mathMod`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The value to the divide.
	     * @param {Number} b The pseudo-modulus
	     * @return {Number} The result of `b % a`.
	     * @see R.mathMod
	     * @example
	     *
	     *      R.modulo(17, 3); //=> 2
	     *      // JS behavior:
	     *      R.modulo(-17, 3); //=> -2
	     *      R.modulo(17, -3); //=> 2
	     *
	     *      var isOdd = R.modulo(R.__, 2);
	     *      isOdd(42); //=> 0
	     *      isOdd(21); //=> 1
	     */
	    var modulo = _curry2(function modulo(a, b) {
	        return a % b;
	    });
	
	    /**
	     * Multiplies two numbers. Equivalent to `a * b` but curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a * b`.
	     * @see R.divide
	     * @example
	     *
	     *      var double = R.multiply(2);
	     *      var triple = R.multiply(3);
	     *      double(3);       //=>  6
	     *      triple(4);       //=> 12
	     *      R.multiply(2, 5);  //=> 10
	     */
	    var multiply = _curry2(function multiply(a, b) {
	        return a * b;
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly `n` parameters. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} n The desired arity of the new function.
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity `n`.
	     * @example
	     *
	     *      var takesTwoArgs = (a, b) => [a, b];
	     *
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.nAry(1, takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only `n` arguments are passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var nAry = _curry2(function nAry(n, fn) {
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.call(this);
	            };
	        case 1:
	            return function (a0) {
	                return fn.call(this, a0);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.call(this, a0, a1);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.call(this, a0, a1, a2);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.call(this, a0, a1, a2, a3);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.call(this, a0, a1, a2, a3, a4);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
	            };
	        default:
	            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
	        }
	    });
	
	    /**
	     * Negates its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @example
	     *
	     *      R.negate(42); //=> -42
	     */
	    var negate = _curry1(function negate(n) {
	        return -n;
	    });
	
	    /**
	     * Returns `true` if no elements of the list match the predicate, `false`
	     * otherwise.
	     *
	     * Dispatches to the `any` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
	     * @see R.all, R.any
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *
	     *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
	     *      R.none(isEven, [1, 3, 5, 7, 8, 11]); //=> false
	     */
	    var none = _curry2(_complement(_dispatchable('any', _xany, any)));
	
	    /**
	     * A function that returns the `!` of its argument. It will return `true` when
	     * passed false-y value, and `false` when passed a truth-y one.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> Boolean
	     * @param {*} a any value
	     * @return {Boolean} the logical inverse of passed argument.
	     * @see R.complement
	     * @example
	     *
	     *      R.not(true); //=> false
	     *      R.not(false); //=> true
	     *      R.not(0); //=> true
	     *      R.not(1); //=> false
	     */
	    var not = _curry1(function not(a) {
	        return !a;
	    });
	
	    /**
	     * Returns the nth element of the given list or string. If n is negative the
	     * element at index length + n is returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> a | Undefined
	     * @sig Number -> String -> String
	     * @param {Number} offset
	     * @param {*} list
	     * @return {*}
	     * @example
	     *
	     *      var list = ['foo', 'bar', 'baz', 'quux'];
	     *      R.nth(1, list); //=> 'bar'
	     *      R.nth(-1, list); //=> 'quux'
	     *      R.nth(-99, list); //=> undefined
	     *
	     *      R.nth(2, 'abc'); //=> 'c'
	     *      R.nth(3, 'abc'); //=> ''
	     */
	    var nth = _curry2(function nth(offset, list) {
	        var idx = offset < 0 ? list.length + offset : offset;
	        return _isString(list) ? list.charAt(idx) : list[idx];
	    });
	
	    /**
	     * Returns a function which returns its nth argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig Number -> *... -> *
	     * @param {Number} n
	     * @return {Function}
	     * @example
	     *
	     *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
	     *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
	     */
	    var nthArg = _curry1(function nthArg(n) {
	        var arity = n < 0 ? 1 : n + 1;
	        return curryN(arity, function () {
	            return nth(n, arguments);
	        });
	    });
	
	    /**
	     * Creates an object containing a single key:value pair.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Object
	     * @sig String -> a -> {String:a}
	     * @param {String} key
	     * @param {*} val
	     * @return {Object}
	     * @see R.pair
	     * @example
	     *
	     *      var matchPhrases = R.compose(
	     *        R.objOf('must'),
	     *        R.map(R.objOf('match_phrase'))
	     *      );
	     *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
	     */
	    var objOf = _curry2(function objOf(key, val) {
	        var obj = {};
	        obj[key] = val;
	        return obj;
	    });
	
	    /**
	     * Returns a singleton array containing the value provided.
	     *
	     * Note this `of` is different from the ES6 `of`; See
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig a -> [a]
	     * @param {*} x any value
	     * @return {Array} An array wrapping `x`.
	     * @example
	     *
	     *      R.of(null); //=> [null]
	     *      R.of([42]); //=> [[42]]
	     */
	    var of = _curry1(_of);
	
	    /**
	     * Accepts a function `fn` and returns a function that guards invocation of
	     * `fn` such that `fn` can only ever be called once, no matter how many times
	     * the returned function is invoked. The first value calculated is returned in
	     * subsequent invocations.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a... -> b) -> (a... -> b)
	     * @param {Function} fn The function to wrap in a call-only-once wrapper.
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      var addOneOnce = R.once(x => x + 1);
	     *      addOneOnce(10); //=> 11
	     *      addOneOnce(addOneOnce(50)); //=> 11
	     */
	    var once = _curry1(function once(fn) {
	        var called = false;
	        var result;
	        return _arity(fn.length, function () {
	            if (called) {
	                return result;
	            }
	            called = true;
	            result = fn.apply(this, arguments);
	            return result;
	        });
	    });
	
	    /**
	     * Returns `true` if one or both of its arguments are `true`. Returns `false`
	     * if both arguments are `false`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {Boolean} a A boolean value
	     * @param {Boolean} b A boolean value
	     * @return {Boolean} `true` if one or both arguments are `true`, `false` otherwise
	     * @see R.either
	     * @example
	     *
	     *      R.or(true, true); //=> true
	     *      R.or(true, false); //=> true
	     *      R.or(false, true); //=> true
	     *      R.or(false, false); //=> false
	     */
	    var or = _curry2(function or(a, b) {
	        return a || b;
	    });
	
	    /**
	     * Returns the result of "setting" the portion of the given data structure
	     * focused by the given lens to the result of applying the given function to
	     * the focused value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> (a -> a) -> s -> s
	     * @param {Lens} lens
	     * @param {*} v
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *
	     *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
	     */
	    // `Identity` is a functor that holds a single value, where `map` simply
	    // transforms the held value with the provided function.
	    // The value returned by the getter function is first transformed with `f`,
	    // then set as the value of an `Identity`. This is then mapped over with the
	    // setter function of the lens.
	    var over = function () {
	        // `Identity` is a functor that holds a single value, where `map` simply
	        // transforms the held value with the provided function.
	        var Identity = function (x) {
	            return {
	                value: x,
	                map: function (f) {
	                    return Identity(f(x));
	                }
	            };
	        };
	        return _curry3(function over(lens, f, x) {
	            // The value returned by the getter function is first transformed with `f`,
	            // then set as the value of an `Identity`. This is then mapped over with the
	            // setter function of the lens.
	            return lens(function (y) {
	                return Identity(f(y));
	            })(x).value;
	        });
	    }();
	
	    /**
	     * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category List
	     * @sig a -> b -> (a,b)
	     * @param {*} fst
	     * @param {*} snd
	     * @return {Array}
	     * @see R.objOf, R.of
	     * @example
	     *
	     *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
	     */
	    var pair = _curry2(function pair(fst, snd) {
	        return [
	            fst,
	            snd
	        ];
	    });
	
	    /**
	     * Retrieve the value at a given path.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig [String] -> {k: v} -> v | Undefined
	     * @param {Array} path The path to use.
	     * @param {Object} obj The object to retrieve the nested property from.
	     * @return {*} The data at `path`.
	     * @see R.prop
	     * @example
	     *
	     *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
	     *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
	     */
	    var path = _curry2(function path(paths, obj) {
	        var val = obj;
	        var idx = 0;
	        while (idx < paths.length) {
	            if (val == null) {
	                return;
	            }
	            val = val[paths[idx]];
	            idx += 1;
	        }
	        return val;
	    });
	
	    /**
	     * If the given, non-null object has a value at the given path, returns the
	     * value at that path. Otherwise returns the provided default value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Object
	     * @sig a -> [String] -> Object -> a
	     * @param {*} d The default value.
	     * @param {Array} p The path to use.
	     * @param {Object} obj The object to retrieve the nested property from.
	     * @return {*} The data at `path` of the supplied object or the default value.
	     * @example
	     *
	     *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
	     *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
	     */
	    var pathOr = _curry3(function pathOr(d, p, obj) {
	        return defaultTo(d, path(p, obj));
	    });
	
	    /**
	     * Returns `true` if the specified object property at given path satisfies the
	     * given predicate; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Logic
	     * @sig (a -> Boolean) -> [String] -> Object -> Boolean
	     * @param {Function} pred
	     * @param {Array} propPath
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.propSatisfies, R.path
	     * @example
	     *
	     *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
	     */
	    var pathSatisfies = _curry3(function pathSatisfies(pred, propPath, obj) {
	        return propPath.length > 0 && pred(path(propPath, obj));
	    });
	
	    /**
	     * Returns a partial copy of an object containing only the keys specified. If
	     * the key does not exist, the property is ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @see R.omit, R.props
	     * @example
	     *
	     *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
	     */
	    var pick = _curry2(function pick(names, obj) {
	        var result = {};
	        var idx = 0;
	        while (idx < names.length) {
	            if (names[idx] in obj) {
	                result[names[idx]] = obj[names[idx]];
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Similar to `pick` except that this one includes a `key: undefined` pair for
	     * properties that don't exist.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @see R.pick
	     * @example
	     *
	     *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
	     */
	    var pickAll = _curry2(function pickAll(names, obj) {
	        var result = {};
	        var idx = 0;
	        var len = names.length;
	        while (idx < len) {
	            var name = names[idx];
	            result[name] = obj[name];
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a partial copy of an object containing only the keys that satisfy
	     * the supplied predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
	     * @param {Function} pred A predicate to determine whether or not a key
	     *        should be included on the output object.
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties that satisfy `pred`
	     *         on it.
	     * @see R.pick, R.filter
	     * @example
	     *
	     *      var isUpperCase = (val, key) => key.toUpperCase() === key;
	     *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
	     */
	    var pickBy = _curry2(function pickBy(test, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (test(obj[prop], prop, obj)) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new list with the given element at the front, followed by the
	     * contents of the list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The item to add to the head of the output list.
	     * @param {Array} list The array to add to the tail of the output list.
	     * @return {Array} A new array.
	     * @see R.append
	     * @example
	     *
	     *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
	     */
	    var prepend = _curry2(function prepend(el, list) {
	        return _concat([el], list);
	    });
	
	    /**
	     * Returns a function that when supplied an object returns the indicated
	     * property of that object, if it exists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig s -> {s: a} -> a | Undefined
	     * @param {String} p The property name
	     * @param {Object} obj The object to query
	     * @return {*} The value at `obj.p`.
	     * @see R.path
	     * @example
	     *
	     *      R.prop('x', {x: 100}); //=> 100
	     *      R.prop('x', {}); //=> undefined
	     */
	    var prop = _curry2(function prop(p, obj) {
	        return obj[p];
	    });
	
	    /**
	     * Returns `true` if the specified object property is of the given type;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Type
	     * @sig Type -> String -> Object -> Boolean
	     * @param {Function} type
	     * @param {String} name
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.is, R.propSatisfies
	     * @example
	     *
	     *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
	     *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
	     *      R.propIs(Number, 'x', {});            //=> false
	     */
	    var propIs = _curry3(function propIs(type, name, obj) {
	        return is(type, obj[name]);
	    });
	
	    /**
	     * If the given, non-null object has an own property with the specified name,
	     * returns the value of that property. Otherwise returns the provided default
	     * value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Object
	     * @sig a -> String -> Object -> a
	     * @param {*} val The default value.
	     * @param {String} p The name of the property to return.
	     * @param {Object} obj The object to query.
	     * @return {*} The value of given property of the supplied object or the default value.
	     * @example
	     *
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var favorite = R.prop('favoriteLibrary');
	     *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
	     *
	     *      favorite(alice);  //=> undefined
	     *      favoriteWithDefault(alice);  //=> 'Ramda'
	     */
	    var propOr = _curry3(function propOr(val, p, obj) {
	        return obj != null && _has(p, obj) ? obj[p] : val;
	    });
	
	    /**
	     * Returns `true` if the specified object property satisfies the given
	     * predicate; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Logic
	     * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
	     * @param {Function} pred
	     * @param {String} name
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.propEq, R.propIs
	     * @example
	     *
	     *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
	     */
	    var propSatisfies = _curry3(function propSatisfies(pred, name, obj) {
	        return pred(obj[name]);
	    });
	
	    /**
	     * Acts as multiple `prop`: array of keys in, array of values out. Preserves
	     * order.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> [v]
	     * @param {Array} ps The property names to fetch
	     * @param {Object} obj The object to query
	     * @return {Array} The corresponding values or partially applied function.
	     * @example
	     *
	     *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
	     *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
	     *
	     *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
	     *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
	     */
	    var props = _curry2(function props(ps, obj) {
	        var len = ps.length;
	        var out = [];
	        var idx = 0;
	        while (idx < len) {
	            out[idx] = obj[ps[idx]];
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> Number -> [Number]
	     * @param {Number} from The first number in the list.
	     * @param {Number} to One more than the last number in the list.
	     * @return {Array} The list of numbers in tthe set `[a, b)`.
	     * @example
	     *
	     *      R.range(1, 5);    //=> [1, 2, 3, 4]
	     *      R.range(50, 53);  //=> [50, 51, 52]
	     */
	    var range = _curry2(function range(from, to) {
	        if (!(_isNumber(from) && _isNumber(to))) {
	            throw new TypeError('Both arguments to range must be numbers');
	        }
	        var result = [];
	        var n = from;
	        while (n < to) {
	            result.push(n);
	            n += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a single item by iterating through the list, successively calling
	     * the iterator function and passing it an accumulator value and the current
	     * value from the array, and then passing the result to the next call.
	     *
	     * Similar to `reduce`, except moves through the input list from the right to
	     * the left.
	     *
	     * The iterator function receives two values: *(acc, value)*
	     *
	     * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.reduce` method. For more details
	     * on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
	     *      var flattenPairs = (acc, pair) => acc.concat(pair);
	     *
	     *      R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
	     */
	    var reduceRight = _curry3(function reduceRight(fn, acc, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            acc = fn(acc, list[idx]);
	            idx -= 1;
	        }
	        return acc;
	    });
	
	    /**
	     * Returns a value wrapped to indicate that it is the final value of the reduce
	     * and transduce functions. The returned value should be considered a black
	     * box: the internal structure is not guaranteed to be stable.
	     *
	     * Note: this optimization is unavailable to functions not explicitly listed
	     * above. For instance, it is not currently supported by reduceRight.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category List
	     * @sig a -> *
	     * @param {*} x The final value of the reduce.
	     * @return {*} The wrapped value.
	     * @see R.reduce, R.transduce
	     * @example
	     *
	     *      R.reduce(
	     *        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
	     *        0,
	     *        [1, 2, 3, 4, 5]) // 10
	     */
	    var reduced = _curry1(_reduced);
	
	    /**
	     * Removes the sub-list of `list` starting at index `start` and containing
	     * `count` elements. _Note that this is not destructive_: it returns a copy of
	     * the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.2
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @param {Number} start The position to start removing elements
	     * @param {Number} count The number of elements to remove
	     * @param {Array} list The list to remove from
	     * @return {Array} A new Array with `count` elements from `start` removed.
	     * @example
	     *
	     *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
	     */
	    var remove = _curry3(function remove(start, count, list) {
	        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
	    });
	
	    /**
	     * Replace a substring or regex match in a string with a replacement.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category String
	     * @sig RegExp|String -> String -> String -> String
	     * @param {RegExp|String} pattern A regular expression or a substring to match.
	     * @param {String} replacement The string to replace the matches with.
	     * @param {String} str The String to do the search and replacement in.
	     * @return {String} The result.
	     * @example
	     *
	     *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *
	     *      // Use the "g" (global) flag to replace all occurrences:
	     *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
	     */
	    var replace = _curry3(function replace(regex, replacement, str) {
	        return str.replace(regex, replacement);
	    });
	
	    /**
	     * Returns a new list or string with the elements or characters in reverse
	     * order.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {Array|String} list
	     * @return {Array|String}
	     * @example
	     *
	     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	     *      R.reverse([1, 2]);     //=> [2, 1]
	     *      R.reverse([1]);        //=> [1]
	     *      R.reverse([]);         //=> []
	     *
	     *      R.reverse('abc');      //=> 'cba'
	     *      R.reverse('ab');       //=> 'ba'
	     *      R.reverse('a');        //=> 'a'
	     *      R.reverse('');         //=> ''
	     */
	    var reverse = _curry1(function reverse(list) {
	        return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
	    });
	
	    /**
	     * Scan is similar to reduce, but returns a list of successively reduced values
	     * from the left
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> [a]
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} A list of all intermediately reduced values.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
	     */
	    var scan = _curry3(function scan(fn, acc, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [acc];
	        while (idx < len) {
	            acc = fn(acc, list[idx]);
	            result[idx + 1] = acc;
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns the result of "setting" the portion of the given data structure
	     * focused by the given lens to the given value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> a -> s -> s
	     * @param {Lens} lens
	     * @param {*} v
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
	     *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
	     */
	    var set = _curry3(function set(lens, v, x) {
	        return over(lens, always(v), x);
	    });
	
	    /**
	     * Returns the elements of the given list or string (or object with a `slice`
	     * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	     *
	     * Dispatches to the `slice` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @sig Number -> Number -> String -> String
	     * @param {Number} fromIndex The start index (inclusive).
	     * @param {Number} toIndex The end index (exclusive).
	     * @param {*} list
	     * @return {*}
	     * @example
	     *
	     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	     */
	    var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	        return Array.prototype.slice.call(list, fromIndex, toIndex);
	    }));
	
	    /**
	     * Returns a copy of the list, sorted according to the comparator function,
	     * which should accept two values at a time and return a negative number if the
	     * first value is smaller, a positive number if it's larger, and zero if they
	     * are equal. Please note that this is a **copy** of the list. It does not
	     * modify the original.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,a -> Number) -> [a] -> [a]
	     * @param {Function} comparator A sorting function :: a -> b -> Int
	     * @param {Array} list The list to sort
	     * @return {Array} a new array with its elements sorted by the comparator function.
	     * @example
	     *
	     *      var diff = function(a, b) { return a - b; };
	     *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
	     */
	    var sort = _curry2(function sort(comparator, list) {
	        return _slice(list).sort(comparator);
	    });
	
	    /**
	     * Sorts the list according to the supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> [a] -> [a]
	     * @param {Function} fn
	     * @param {Array} list The list to sort.
	     * @return {Array} A new list sorted by the keys generated by `fn`.
	     * @example
	     *
	     *      var sortByFirstItem = R.sortBy(R.prop(0));
	     *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
	     *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
	     *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var bob = {
	     *        name: 'Bob',
	     *        age: -10
	     *      };
	     *      var clara = {
	     *        name: 'clara',
	     *        age: 314.159
	     *      };
	     *      var people = [clara, bob, alice];
	     *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
	     */
	    var sortBy = _curry2(function sortBy(fn, list) {
	        return _slice(list).sort(function (a, b) {
	            var aa = fn(a);
	            var bb = fn(b);
	            return aa < bb ? -1 : aa > bb ? 1 : 0;
	        });
	    });
	
	    /**
	     * Splits a given list or string at a given index.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig Number -> [a] -> [[a], [a]]
	     * @sig Number -> String -> [String, String]
	     * @param {Number} index The index where the array/string is split.
	     * @param {Array|String} array The array/string to be split.
	     * @return {Array}
	     * @example
	     *
	     *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
	     *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
	     *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
	     */
	    var splitAt = _curry2(function splitAt(index, array) {
	        return [
	            slice(0, index, array),
	            slice(index, length(array), array)
	        ];
	    });
	
	    /**
	     * Splits a collection into slices of the specified length.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [[a]]
	     * @sig Number -> String -> [String]
	     * @param {Number} n
	     * @param {Array} list
	     * @return {Array}
	     * @example
	     *
	     *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
	     *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
	     */
	    var splitEvery = _curry2(function splitEvery(n, list) {
	        if (n <= 0) {
	            throw new Error('First argument to splitEvery must be a positive integer');
	        }
	        var result = [];
	        var idx = 0;
	        while (idx < list.length) {
	            result.push(slice(idx, idx += n, list));
	        }
	        return result;
	    });
	
	    /**
	     * Takes a list and a predicate and returns a pair of lists with the following properties:
	     *
	     *  - the result of concatenating the two output lists is equivalent to the input list;
	     *  - none of the elements of the first output list satisfies the predicate; and
	     *  - if the second output list is non-empty, its first element satisfies the predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [[a], [a]]
	     * @param {Function} pred The predicate that determines where the array is split.
	     * @param {Array} list The array to be split.
	     * @return {Array}
	     * @example
	     *
	     *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
	     */
	    var splitWhen = _curry2(function splitWhen(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        var prefix = [];
	        while (idx < len && !pred(list[idx])) {
	            prefix.push(list[idx]);
	            idx += 1;
	        }
	        return [
	            prefix,
	            _slice(list, idx)
	        ];
	    });
	
	    /**
	     * Subtracts its second argument from its first argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a - b`.
	     * @see R.add
	     * @example
	     *
	     *      R.subtract(10, 8); //=> 2
	     *
	     *      var minus5 = R.subtract(R.__, 5);
	     *      minus5(17); //=> 12
	     *
	     *      var complementaryAngle = R.subtract(90);
	     *      complementaryAngle(30); //=> 60
	     *      complementaryAngle(72); //=> 18
	     */
	    var subtract = _curry2(function subtract(a, b) {
	        return Number(a) - Number(b);
	    });
	
	    /**
	     * Returns all but the first element of the given list or string (or object
	     * with a `tail` method).
	     *
	     * Dispatches to the `slice` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.head, R.init, R.last
	     * @example
	     *
	     *      R.tail([1, 2, 3]);  //=> [2, 3]
	     *      R.tail([1, 2]);     //=> [2]
	     *      R.tail([1]);        //=> []
	     *      R.tail([]);         //=> []
	     *
	     *      R.tail('abc');  //=> 'bc'
	     *      R.tail('ab');   //=> 'b'
	     *      R.tail('a');    //=> ''
	     *      R.tail('');     //=> ''
	     */
	    var tail = _checkForMethod('tail', slice(1, Infinity));
	
	    /**
	     * Returns the first `n` elements of the given list, string, or
	     * transducer/transformer (or object with a `take` method).
	     *
	     * Dispatches to the `take` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n
	     * @param {*} list
	     * @return {*}
	     * @see R.drop
	     * @example
	     *
	     *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
	     *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	     *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(3, 'ramda');               //=> 'ram'
	     *
	     *      var personnel = [
	     *        'Dave Brubeck',
	     *        'Paul Desmond',
	     *        'Eugene Wright',
	     *        'Joe Morello',
	     *        'Gerry Mulligan',
	     *        'Bob Bates',
	     *        'Joe Dodge',
	     *        'Ron Crotty'
	     *      ];
	     *
	     *      var takeFive = R.take(5);
	     *      takeFive(personnel);
	     *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
	     */
	    var take = _curry2(_dispatchable('take', _xtake, function take(n, xs) {
	        return slice(0, n < 0 ? Infinity : n, xs);
	    }));
	
	    /**
	     * Returns a new list containing the last `n` elements of a given list, passing
	     * each value to the supplied predicate function, and terminating when the
	     * predicate function returns `false`. Excludes the element that caused the
	     * predicate function to fail. The predicate function is passed one argument:
	     * *(value)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.dropLastWhile, R.addIndex
	     * @example
	     *
	     *      var isNotOne = x => x !== 1;
	     *
	     *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
	     */
	    var takeLastWhile = _curry2(function takeLastWhile(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0 && fn(list[idx])) {
	            idx -= 1;
	        }
	        return _slice(list, idx + 1, Infinity);
	    });
	
	    /**
	     * Returns a new list containing the first `n` elements of a given list,
	     * passing each value to the supplied predicate function, and terminating when
	     * the predicate function returns `false`. Excludes the element that caused the
	     * predicate function to fail. The predicate function is passed one argument:
	     * *(value)*.
	     *
	     * Dispatches to the `takeWhile` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.dropWhile, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isNotFour = x => x !== 4;
	     *
	     *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
	     */
	    var takeWhile = _curry2(_dispatchable('takeWhile', _xtakeWhile, function takeWhile(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len && fn(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, 0, idx);
	    }));
	
	    /**
	     * Runs the given function with the supplied object, then returns the object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a -> *) -> a -> a
	     * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
	     * @param {*} x
	     * @return {*} `x`.
	     * @example
	     *
	     *      var sayX = x => console.log('x is ' + x);
	     *      R.tap(sayX, 100); //=> 100
	     *      // logs 'x is 100'
	     */
	    var tap = _curry2(function tap(fn, x) {
	        fn(x);
	        return x;
	    });
	
	    /**
	     * Calls an input function `n` times, returning an array containing the results
	     * of those function calls.
	     *
	     * `fn` is passed one argument: The current value of `n`, which begins at `0`
	     * and is gradually incremented to `n - 1`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.3
	     * @category List
	     * @sig (Number -> a) -> Number -> [a]
	     * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
	     * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
	     * @return {Array} An array containing the return values of all calls to `fn`.
	     * @example
	     *
	     *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
	     */
	    var times = _curry2(function times(fn, n) {
	        var len = Number(n);
	        var idx = 0;
	        var list;
	        if (len < 0 || isNaN(len)) {
	            throw new RangeError('n must be a non-negative number');
	        }
	        list = new Array(len);
	        while (idx < len) {
	            list[idx] = fn(idx);
	            idx += 1;
	        }
	        return list;
	    });
	
	    /**
	     * Converts an object into an array of key, value arrays. Only the object's
	     * own properties are used.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own properties.
	     * @see R.fromPairs
	     * @example
	     *
	     *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
	     */
	    var toPairs = _curry1(function toPairs(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            if (_has(prop, obj)) {
	                pairs[pairs.length] = [
	                    prop,
	                    obj[prop]
	                ];
	            }
	        }
	        return pairs;
	    });
	
	    /**
	     * Converts an object into an array of key, value arrays. The object's own
	     * properties and prototype properties are used. Note that the order of the
	     * output array is not guaranteed to be consistent across different JS
	     * platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own
	     *         and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
	     */
	    var toPairsIn = _curry1(function toPairsIn(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            pairs[pairs.length] = [
	                prop,
	                obj[prop]
	            ];
	        }
	        return pairs;
	    });
	
	    /**
	     * Transposes the rows and columns of a 2D list.
	     * When passed a list of `n` lists of length `x`,
	     * returns a list of `x` lists of length `n`.
	     *
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig [[a]] -> [[a]]
	     * @param {Array} list A 2D list
	     * @return {Array} A 2D list
	     * @example
	     *
	     *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
	     *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
	     *
	     * If some of the rows are shorter than the following rows, their elements are skipped:
	     *
	     *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
	     */
	    var transpose = _curry1(function transpose(outerlist) {
	        var i = 0;
	        var result = [];
	        while (i < outerlist.length) {
	            var innerlist = outerlist[i];
	            var j = 0;
	            while (j < innerlist.length) {
	                if (typeof result[j] === 'undefined') {
	                    result[j] = [];
	                }
	                result[j].push(innerlist[j]);
	                j += 1;
	            }
	            i += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Removes (strips) whitespace from both ends of the string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to trim.
	     * @return {String} Trimmed version of `str`.
	     * @example
	     *
	     *      R.trim('   xyz  '); //=> 'xyz'
	     *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
	     */
	    var trim = function () {
	        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
	        var zeroWidth = '\u200B';
	        var hasProtoTrim = typeof String.prototype.trim === 'function';
	        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
	            return _curry1(function trim(str) {
	                var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
	                var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
	                return str.replace(beginRx, '').replace(endRx, '');
	            });
	        } else {
	            return _curry1(function trim(str) {
	                return str.trim();
	            });
	        }
	    }();
	
	    /**
	     * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
	     * function evaluates the `tryer`; if it does not throw, it simply returns the
	     * result. If the `tryer` *does* throw, the returned function evaluates the
	     * `catcher` function and returns its result. Note that for effective
	     * composition with this function, both the `tryer` and `catcher` functions
	     * must return the same type of results.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Function
	     * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
	     * @param {Function} tryer The function that may throw.
	     * @param {Function} catcher The function that will be evaluated if `tryer` throws.
	     * @return {Function} A new function that will catch exceptions and send then to the catcher.
	     * @example
	     *
	     *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
	     *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
	     */
	    var tryCatch = _curry2(function _tryCatch(tryer, catcher) {
	        return _arity(tryer.length, function () {
	            try {
	                return tryer.apply(this, arguments);
	            } catch (e) {
	                return catcher.apply(this, _concat([e], arguments));
	            }
	        });
	    });
	
	    /**
	     * Gives a single-word string description of the (native) type of a value,
	     * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
	     * attempt to distinguish user Object types any further, reporting them all as
	     * 'Object'.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Type
	     * @sig (* -> {*}) -> String
	     * @param {*} val The value to test
	     * @return {String}
	     * @example
	     *
	     *      R.type({}); //=> "Object"
	     *      R.type(1); //=> "Number"
	     *      R.type(false); //=> "Boolean"
	     *      R.type('s'); //=> "String"
	     *      R.type(null); //=> "Null"
	     *      R.type([]); //=> "Array"
	     *      R.type(/[A-z]/); //=> "RegExp"
	     */
	    var type = _curry1(function type(val) {
	        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
	    });
	
	    /**
	     * Takes a function `fn`, which takes a single array argument, and returns a
	     * function which:
	     *
	     *   - takes any number of positional arguments;
	     *   - passes these arguments to `fn` as an array; and
	     *   - returns the result.
	     *
	     * In other words, R.unapply derives a variadic function from a function which
	     * takes an array. R.unapply is the inverse of R.apply.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Function
	     * @sig ([*...] -> a) -> (*... -> a)
	     * @param {Function} fn
	     * @return {Function}
	     * @see R.apply
	     * @example
	     *
	     *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
	     */
	    var unapply = _curry1(function unapply(fn) {
	        return function () {
	            return fn(_slice(arguments));
	        };
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly 1 parameter. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Function
	     * @sig (* -> b) -> (a -> b)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 1.
	     * @example
	     *
	     *      var takesTwoArgs = function(a, b) {
	     *        return [a, b];
	     *      };
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.unary(takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only 1 argument is passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var unary = _curry1(function unary(fn) {
	        return nAry(1, fn);
	    });
	
	    /**
	     * Returns a function of arity `n` from a (manually) curried function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Function
	     * @sig Number -> (a -> b) -> (a -> c)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to uncurry.
	     * @return {Function} A new function.
	     * @see R.curry
	     * @example
	     *
	     *      var addFour = a => b => c => d => a + b + c + d;
	     *
	     *      var uncurriedAddFour = R.uncurryN(4, addFour);
	     *      uncurriedAddFour(1, 2, 3, 4); //=> 10
	     */
	    var uncurryN = _curry2(function uncurryN(depth, fn) {
	        return curryN(depth, function () {
	            var currentDepth = 1;
	            var value = fn;
	            var idx = 0;
	            var endIdx;
	            while (currentDepth <= depth && typeof value === 'function') {
	                endIdx = currentDepth === depth ? arguments.length : idx + value.length;
	                value = value.apply(this, _slice(arguments, idx, endIdx));
	                currentDepth += 1;
	                idx = endIdx;
	            }
	            return value;
	        });
	    });
	
	    /**
	     * Builds a list from a seed value. Accepts an iterator function, which returns
	     * either false to stop iteration or an array of length 2 containing the value
	     * to add to the resulting list and the seed to be used in the next call to the
	     * iterator function.
	     *
	     * The iterator function receives one argument: *(seed)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (a -> [b]) -> * -> [b]
	     * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
	     *        either false to quit iteration or an array of length two to proceed. The element
	     *        at index 0 of this array will be added to the resulting array, and the element
	     *        at index 1 will be passed to the next call to `fn`.
	     * @param {*} seed The seed value.
	     * @return {Array} The final list.
	     * @example
	     *
	     *      var f = n => n > 50 ? false : [-n, n + 10];
	     *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
	     */
	    var unfold = _curry2(function unfold(fn, seed) {
	        var pair = fn(seed);
	        var result = [];
	        while (pair && pair.length) {
	            result[result.length] = pair[0];
	            pair = fn(pair[1]);
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list, based upon the value returned by applying the supplied predicate to
	     * two list elements. Prefers the first item if two items compare equal based
	     * on the predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      var strEq = R.eqBy(String);
	     *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
	     *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
	     *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
	     *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
	     */
	    var uniqWith = _curry2(function uniqWith(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        var item;
	        while (idx < len) {
	            item = list[idx];
	            if (!_containsWith(pred, item, result)) {
	                result[result.length] = item;
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Tests the final argument by passing it to the given predicate function. If
	     * the predicate is not satisfied, the function will return the result of
	     * calling the `whenFalseFn` function with the same argument. If the predicate
	     * is satisfied, the argument is returned as is.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred        A predicate function
	     * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
	     *                               to a falsy value.
	     * @param {*}        x           An object to test with the `pred` function and
	     *                               pass to `whenFalseFn` if necessary.
	     * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
	     * @see R.ifElse, R.when
	     * @example
	     *
	     *      // coerceArray :: (a|[a]) -> [a]
	     *      var coerceArray = R.unless(R.isArrayLike, R.of);
	     *      coerceArray([1, 2, 3]); //=> [1, 2, 3]
	     *      coerceArray(1);         //=> [1]
	     */
	    var unless = _curry3(function unless(pred, whenFalseFn, x) {
	        return pred(x) ? x : whenFalseFn(x);
	    });
	
	    /**
	     * Takes a predicate, a transformation function, and an initial value,
	     * and returns a value of the same type as the initial value.
	     * It does so by applying the transformation until the predicate is satisfied,
	     * at which point it returns the satisfactory value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred A predicate function
	     * @param {Function} fn The iterator function
	     * @param {*} init Initial value
	     * @return {*} Final value that satisfies predicate
	     * @example
	     *
	     *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
	     */
	    var until = _curry3(function until(pred, fn, init) {
	        var val = init;
	        while (!pred(val)) {
	            val = fn(val);
	        }
	        return val;
	    });
	
	    /**
	     * Returns a new copy of the array with the element at the provided index
	     * replaced with the given value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} idx The index to update.
	     * @param {*} x The value to exist at the given index of the returned array.
	     * @param {Array|Arguments} list The source array-like object to be updated.
	     * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
	     * @see R.adjust
	     * @example
	     *
	     *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var update = _curry3(function update(idx, x, list) {
	        return adjust(always(x), idx, list);
	    });
	
	    /**
	     * Accepts a function `fn` and a list of transformer functions and returns a
	     * new curried function. When the new function is invoked, it calls the
	     * function `fn` with parameters consisting of the result of calling each
	     * supplied handler on successive arguments to the new function.
	     *
	     * If more arguments are passed to the returned function than transformer
	     * functions, those arguments are passed directly to `fn` as additional
	     * parameters. If you expect additional arguments that don't need to be
	     * transformed, although you can ignore them, it's best to pass an identity
	     * function so that the new function reports the correct arity.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
	     * @param {Function} fn The function to wrap.
	     * @param {Array} transformers A list of transformer functions
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
	     *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
	     *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
	     *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
	     */
	    var useWith = _curry2(function useWith(fn, transformers) {
	        return curryN(transformers.length, function () {
	            var args = [];
	            var idx = 0;
	            while (idx < transformers.length) {
	                args.push(transformers[idx].call(this, arguments[idx]));
	                idx += 1;
	            }
	            return fn.apply(this, args.concat(_slice(arguments, transformers.length)));
	        });
	    });
	
	    /**
	     * Returns a list of all the enumerable own properties of the supplied object.
	     * Note that the order of the output array is not guaranteed across different
	     * JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own properties.
	     * @example
	     *
	     *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
	     */
	    var values = _curry1(function values(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var vals = [];
	        var idx = 0;
	        while (idx < len) {
	            vals[idx] = obj[props[idx]];
	            idx += 1;
	        }
	        return vals;
	    });
	
	    /**
	     * Returns a list of all the properties, including prototype properties, of the
	     * supplied object.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.valuesIn(f); //=> ['X', 'Y']
	     */
	    var valuesIn = _curry1(function valuesIn(obj) {
	        var prop;
	        var vs = [];
	        for (prop in obj) {
	            vs[vs.length] = obj[prop];
	        }
	        return vs;
	    });
	
	    /**
	     * Returns a "view" of the given data structure, determined by the given lens.
	     * The lens's focus determines which portion of the data structure is visible.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> s -> a
	     * @param {Lens} lens
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.view(xLens, {x: 1, y: 2});  //=> 1
	     *      R.view(xLens, {x: 4, y: 2});  //=> 4
	     */
	    // `Const` is a functor that effectively ignores the function given to `map`.
	    // Using `Const` effectively ignores the setter function of the `lens`,
	    // leaving the value returned by the getter function unmodified.
	    var view = function () {
	        // `Const` is a functor that effectively ignores the function given to `map`.
	        var Const = function (x) {
	            return {
	                value: x,
	                map: function () {
	                    return this;
	                }
	            };
	        };
	        return _curry2(function view(lens, x) {
	            // Using `Const` effectively ignores the setter function of the `lens`,
	            // leaving the value returned by the getter function unmodified.
	            return lens(Const)(x).value;
	        });
	    }();
	
	    /**
	     * Tests the final argument by passing it to the given predicate function. If
	     * the predicate is satisfied, the function will return the result of calling
	     * the `whenTrueFn` function with the same argument. If the predicate is not
	     * satisfied, the argument is returned as is.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred       A predicate function
	     * @param {Function} whenTrueFn A function to invoke when the `condition`
	     *                              evaluates to a truthy value.
	     * @param {*}        x          An object to test with the `pred` function and
	     *                              pass to `whenTrueFn` if necessary.
	     * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
	     * @see R.ifElse, R.unless
	     * @example
	     *
	     *      // truncate :: String -> String
	     *      var truncate = R.when(
	     *        R.propSatisfies(R.gt(R.__, 10), 'length'),
	     *        R.pipe(R.take(10), R.append('…'), R.join(''))
	     *      );
	     *      truncate('12345');         //=> '12345'
	     *      truncate('0123456789ABC'); //=> '0123456789…'
	     */
	    var when = _curry3(function when(pred, whenTrueFn, x) {
	        return pred(x) ? whenTrueFn(x) : x;
	    });
	
	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec. Each of the spec's own properties must be a predicate function.
	     * Each predicate is applied to the value of the corresponding property of the
	     * test object. `where` returns true if all the predicates return true, false
	     * otherwise.
	     *
	     * `where` is well suited to declaratively expressing constraints for other
	     * functions such as `filter` and `find`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category Object
	     * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = where({
	     *        a: equals('foo'),
	     *        b: complement(equals('bar')),
	     *        x: gt(__, 10),
	     *        y: lt(__, 20)
	     *      });
	     *
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
	     *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
	     */
	    var where = _curry2(function where(spec, testObj) {
	        for (var prop in spec) {
	            if (_has(prop, spec) && !spec[prop](testObj[prop])) {
	                return false;
	            }
	        }
	        return true;
	    });
	
	    /**
	     * Wrap a function inside another to allow you to make adjustments to the
	     * parameters, or do other processing either before the internal function is
	     * called or with its results.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a... -> b) -> ((a... -> b) -> a... -> c) -> (a... -> c)
	     * @param {Function} fn The function to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @return {Function} The wrapped function.
	     * @deprecated since v0.22.0
	     * @example
	     *
	     *      var greet = name => 'Hello ' + name;
	     *
	     *      var shoutedGreet = R.wrap(greet, (gr, name) => gr(name).toUpperCase());
	     *
	     *      shoutedGreet("Kathy"); //=> "HELLO KATHY"
	     *
	     *      var shortenedGreet = R.wrap(greet, function(gr, name) {
	     *        return gr(name.substring(0, 3));
	     *      });
	     *      shortenedGreet("Robert"); //=> "Hello Rob"
	     */
	    var wrap = _curry2(function wrap(fn, wrapper) {
	        return curryN(fn.length, function () {
	            return wrapper.apply(this, _concat([fn], arguments));
	        });
	    });
	
	    /**
	     * Creates a new list out of the two supplied by creating each possible pair
	     * from the lists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The list made by combining each possible pair from
	     *         `as` and `bs` into pairs (`[a, b]`).
	     * @example
	     *
	     *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
	     */
	    // = xprodWith(prepend); (takes about 3 times as long...)
	    var xprod = _curry2(function xprod(a, b) {
	        // = xprodWith(prepend); (takes about 3 times as long...)
	        var idx = 0;
	        var ilen = a.length;
	        var j;
	        var jlen = b.length;
	        var result = [];
	        while (idx < ilen) {
	            j = 0;
	            while (j < jlen) {
	                result[result.length] = [
	                    a[idx],
	                    b[j]
	                ];
	                j += 1;
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Creates a new list out of the two supplied by pairing up equally-positioned
	     * items from both lists. The returned list is truncated to the length of the
	     * shorter of the two input lists.
	     * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
	     * @example
	     *
	     *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
	     */
	    var zip = _curry2(function zip(a, b) {
	        var rv = [];
	        var idx = 0;
	        var len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = [
	                a[idx],
	                b[idx]
	            ];
	            idx += 1;
	        }
	        return rv;
	    });
	
	    /**
	     * Creates a new object out of a list of keys and a list of values.
	     * Key/value pairing is truncated to the length of the shorter of the two lists.
	     * Note: `zipObj` is equivalent to `pipe(zipWith(pair), fromPairs)`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [String] -> [*] -> {String: *}
	     * @param {Array} keys The array that will be properties on the output object.
	     * @param {Array} values The list of values on the output object.
	     * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
	     * @example
	     *
	     *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
	     */
	    var zipObj = _curry2(function zipObj(keys, values) {
	        var idx = 0;
	        var len = Math.min(keys.length, values.length);
	        var out = {};
	        while (idx < len) {
	            out[keys[idx]] = values[idx];
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Creates a new list out of the two supplied by applying the function to each
	     * equally-positioned pair in the lists. The returned list is truncated to the
	     * length of the shorter of the two input lists.
	     *
	     * @function
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,b -> c) -> [a] -> [b] -> [c]
	     * @param {Function} fn The function used to combine the two elements into one value.
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
	     *         using `fn`.
	     * @example
	     *
	     *      var f = (x, y) => {
	     *        // ...
	     *      };
	     *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
	     *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
	     */
	    var zipWith = _curry3(function zipWith(fn, a, b) {
	        var rv = [];
	        var idx = 0;
	        var len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = fn(a[idx], b[idx]);
	            idx += 1;
	        }
	        return rv;
	    });
	
	    /**
	     * A function that always returns `false`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig * -> Boolean
	     * @param {*}
	     * @return {Boolean}
	     * @see R.always, R.T
	     * @example
	     *
	     *      R.F(); //=> false
	     */
	    var F = always(false);
	
	    /**
	     * A function that always returns `true`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig * -> Boolean
	     * @param {*}
	     * @return {Boolean}
	     * @see R.always, R.F
	     * @example
	     *
	     *      R.T(); //=> true
	     */
	    var T = always(true);
	
	    /**
	     * Copies an object.
	     *
	     * @private
	     * @param {*} value The value to be copied
	     * @param {Array} refFrom Array containing the source references
	     * @param {Array} refTo Array containing the copied source references
	     * @param {Boolean} deep Whether or not to perform deep cloning.
	     * @return {*} The copied value.
	     */
	    var _clone = function _clone(value, refFrom, refTo, deep) {
	        var copy = function copy(copiedValue) {
	            var len = refFrom.length;
	            var idx = 0;
	            while (idx < len) {
	                if (value === refFrom[idx]) {
	                    return refTo[idx];
	                }
	                idx += 1;
	            }
	            refFrom[idx + 1] = value;
	            refTo[idx + 1] = copiedValue;
	            for (var key in value) {
	                copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
	            }
	            return copiedValue;
	        };
	        switch (type(value)) {
	        case 'Object':
	            return copy({});
	        case 'Array':
	            return copy([]);
	        case 'Date':
	            return new Date(value.valueOf());
	        case 'RegExp':
	            return _cloneRegExp(value);
	        default:
	            return value;
	        }
	    };
	
	    var _createPartialApplicator = function _createPartialApplicator(concat) {
	        return _curry2(function (fn, args) {
	            return _arity(Math.max(0, fn.length - args.length), function () {
	                return fn.apply(this, concat(args, arguments));
	            });
	        });
	    };
	
	    var _dropLast = function dropLast(n, xs) {
	        return take(n < xs.length ? xs.length - n : 0, xs);
	    };
	
	    // Values of other types are only equal if identical.
	    var _equals = function _equals(a, b, stackA, stackB) {
	        if (identical(a, b)) {
	            return true;
	        }
	        if (type(a) !== type(b)) {
	            return false;
	        }
	        if (a == null || b == null) {
	            return false;
	        }
	        if (typeof a.equals === 'function' || typeof b.equals === 'function') {
	            return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
	        }
	        switch (type(a)) {
	        case 'Arguments':
	        case 'Array':
	        case 'Object':
	            if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
	                return a === b;
	            }
	            break;
	        case 'Boolean':
	        case 'Number':
	        case 'String':
	            if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
	                return false;
	            }
	            break;
	        case 'Date':
	            if (!identical(a.valueOf(), b.valueOf())) {
	                return false;
	            }
	            break;
	        case 'Error':
	            return a.name === b.name && a.message === b.message;
	        case 'RegExp':
	            if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
	                return false;
	            }
	            break;
	        case 'Map':
	        case 'Set':
	            if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
	                return false;
	            }
	            break;
	        case 'Int8Array':
	        case 'Uint8Array':
	        case 'Uint8ClampedArray':
	        case 'Int16Array':
	        case 'Uint16Array':
	        case 'Int32Array':
	        case 'Uint32Array':
	        case 'Float32Array':
	        case 'Float64Array':
	            break;
	        case 'ArrayBuffer':
	            break;
	        default:
	            // Values of other types are only equal if identical.
	            return false;
	        }
	        var keysA = keys(a);
	        if (keysA.length !== keys(b).length) {
	            return false;
	        }
	        var idx = stackA.length - 1;
	        while (idx >= 0) {
	            if (stackA[idx] === a) {
	                return stackB[idx] === b;
	            }
	            idx -= 1;
	        }
	        stackA.push(a);
	        stackB.push(b);
	        idx = keysA.length - 1;
	        while (idx >= 0) {
	            var key = keysA[idx];
	            if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
	                return false;
	            }
	            idx -= 1;
	        }
	        stackA.pop();
	        stackB.pop();
	        return true;
	    };
	
	    /**
	     * `_makeFlat` is a helper function that returns a one-level or fully recursive
	     * function based on the flag passed in.
	     *
	     * @private
	     */
	    var _makeFlat = function _makeFlat(recursive) {
	        return function flatt(list) {
	            var value, jlen, j;
	            var result = [];
	            var idx = 0;
	            var ilen = list.length;
	            while (idx < ilen) {
	                if (isArrayLike(list[idx])) {
	                    value = recursive ? flatt(list[idx]) : list[idx];
	                    j = 0;
	                    jlen = value.length;
	                    while (j < jlen) {
	                        result[result.length] = value[j];
	                        j += 1;
	                    }
	                } else {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	            return result;
	        };
	    };
	
	    var _reduce = function () {
	        function _arrayReduce(xf, acc, list) {
	            var idx = 0;
	            var len = list.length;
	            while (idx < len) {
	                acc = xf['@@transducer/step'](acc, list[idx]);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                idx += 1;
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _iterableReduce(xf, acc, iter) {
	            var step = iter.next();
	            while (!step.done) {
	                acc = xf['@@transducer/step'](acc, step.value);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                step = iter.next();
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _methodReduce(xf, acc, obj) {
	            return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	        }
	        var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
	        return function _reduce(fn, acc, list) {
	            if (typeof fn === 'function') {
	                fn = _xwrap(fn);
	            }
	            if (isArrayLike(list)) {
	                return _arrayReduce(fn, acc, list);
	            }
	            if (typeof list.reduce === 'function') {
	                return _methodReduce(fn, acc, list);
	            }
	            if (list[symIterator] != null) {
	                return _iterableReduce(fn, acc, list[symIterator]());
	            }
	            if (typeof list.next === 'function') {
	                return _iterableReduce(fn, acc, list);
	            }
	            throw new TypeError('reduce: list must be array or iterable');
	        };
	    }();
	
	    var _stepCat = function () {
	        var _stepCatArray = {
	            '@@transducer/init': Array,
	            '@@transducer/step': function (xs, x) {
	                xs.push(x);
	                return xs;
	            },
	            '@@transducer/result': _identity
	        };
	        var _stepCatString = {
	            '@@transducer/init': String,
	            '@@transducer/step': function (a, b) {
	                return a + b;
	            },
	            '@@transducer/result': _identity
	        };
	        var _stepCatObject = {
	            '@@transducer/init': Object,
	            '@@transducer/step': function (result, input) {
	                return _assign(result, isArrayLike(input) ? objOf(input[0], input[1]) : input);
	            },
	            '@@transducer/result': _identity
	        };
	        return function _stepCat(obj) {
	            if (_isTransformer(obj)) {
	                return obj;
	            }
	            if (isArrayLike(obj)) {
	                return _stepCatArray;
	            }
	            if (typeof obj === 'string') {
	                return _stepCatString;
	            }
	            if (typeof obj === 'object') {
	                return _stepCatObject;
	            }
	            throw new Error('Cannot create transformer for ' + obj);
	        };
	    }();
	
	    var _xdropLastWhile = function () {
	        function XDropLastWhile(fn, xf) {
	            this.f = fn;
	            this.retained = [];
	            this.xf = xf;
	        }
	        XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XDropLastWhile.prototype['@@transducer/result'] = function (result) {
	            this.retained = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.retain(result, input) : this.flush(result, input);
	        };
	        XDropLastWhile.prototype.flush = function (result, input) {
	            result = _reduce(this.xf['@@transducer/step'], result, this.retained);
	            this.retained = [];
	            return this.xf['@@transducer/step'](result, input);
	        };
	        XDropLastWhile.prototype.retain = function (result, input) {
	            this.retained.push(input);
	            return result;
	        };
	        return _curry2(function _xdropLastWhile(fn, xf) {
	            return new XDropLastWhile(fn, xf);
	        });
	    }();
	
	    /**
	     * Creates a new list iteration function from an existing one by adding two new
	     * parameters to its callback function: the current index, and the entire list.
	     *
	     * This would turn, for instance, Ramda's simple `map` function into one that
	     * more closely resembles `Array.prototype.map`. Note that this will only work
	     * for functions in which the iteration callback function is the first
	     * parameter, and where the list is the last parameter. (This latter might be
	     * unimportant if the list parameter is not used.)
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Function
	     * @category List
	     * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
	     * @param {Function} fn A list iteration function that does not pass index or list to its callback
	     * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
	     * @example
	     *
	     *      var mapIndexed = R.addIndex(R.map);
	     *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
	     *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
	     */
	    var addIndex = _curry1(function addIndex(fn) {
	        return curryN(fn.length, function () {
	            var idx = 0;
	            var origFn = arguments[0];
	            var list = arguments[arguments.length - 1];
	            var args = _slice(arguments);
	            args[0] = function () {
	                var result = origFn.apply(this, _concat(arguments, [
	                    idx,
	                    list
	                ]));
	                idx += 1;
	                return result;
	            };
	            return fn.apply(this, args);
	        });
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly 2 parameters. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Function
	     * @sig (* -> c) -> (a, b -> c)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 2.
	     * @example
	     *
	     *      var takesThreeArgs = function(a, b, c) {
	     *        return [a, b, c];
	     *      };
	     *      takesThreeArgs.length; //=> 3
	     *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      var takesTwoArgs = R.binary(takesThreeArgs);
	     *      takesTwoArgs.length; //=> 2
	     *      // Only 2 arguments are passed to the wrapped function
	     *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
	     */
	    var binary = _curry1(function binary(fn) {
	        return nAry(2, fn);
	    });
	
	    /**
	     * Creates a deep copy of the value which may contain (nested) `Array`s and
	     * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are not
	     * copied, but assigned by their reference.
	     *
	     * Dispatches to a `clone` method if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {*} -> {*}
	     * @param {*} value The object or array to clone
	     * @return {*} A new object or array.
	     * @example
	     *
	     *      var objects = [{}, {}, {}];
	     *      var objectsClone = R.clone(objects);
	     *      objects[0] === objectsClone[0]; //=> false
	     */
	    var clone = _curry1(function clone(value) {
	        return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
	    });
	
	    /**
	     * Returns a curried equivalent of the provided function. The curried function
	     * has two unusual capabilities. First, its arguments needn't be provided one
	     * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
	     * following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	     * following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (* -> a) -> (* -> a)
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curryN
	     * @example
	     *
	     *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
	     *
	     *      var curriedAddFourNumbers = R.curry(addFourNumbers);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curry = _curry1(function curry(fn) {
	        return curryN(fn.length, fn);
	    });
	
	    /**
	     * Returns all but the first `n` elements of the given list, string, or
	     * transducer/transformer (or object with a `drop` method).
	     *
	     * Dispatches to the `drop` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n
	     * @param {*} list
	     * @return {*}
	     * @see R.take, R.transduce
	     * @example
	     *
	     *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
	     *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
	     *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(3, 'ramda');               //=> 'da'
	     */
	    var drop = _curry2(_dispatchable('drop', _xdrop, function drop(n, xs) {
	        return slice(Math.max(0, n), Infinity, xs);
	    }));
	
	    /**
	     * Returns a list containing all but the last `n` elements of the given `list`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n The number of elements of `xs` to skip.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @see R.takeLast
	     * @example
	     *
	     *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	     *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
	     *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
	     *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
	     *      R.dropLast(3, 'ramda');               //=> 'ra'
	     */
	    var dropLast = _curry2(_dispatchable('dropLast', _xdropLast, _dropLast));
	
	    /**
	     * Returns a new list excluding all the tailing elements of a given list which
	     * satisfy the supplied predicate function. It passes each value from the right
	     * to the supplied predicate function, skipping elements while the predicate
	     * function returns `true`. The predicate function is applied to one argument:
	     * *(value)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.takeLastWhile, R.addIndex
	     * @example
	     *
	     *      var lteThree = x => x <= 3;
	     *
	     *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
	     */
	    var dropLastWhile = _curry2(_dispatchable('dropLastWhile', _xdropLastWhile, _dropLastWhile));
	
	    /**
	     * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
	     * cyclical data structures.
	     *
	     * Dispatches symmetrically to the `equals` methods of both arguments, if
	     * present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Relation
	     * @sig a -> b -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      R.equals(1, 1); //=> true
	     *      R.equals(1, '1'); //=> false
	     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
	     *
	     *      var a = {}; a.v = a;
	     *      var b = {}; b.v = b;
	     *      R.equals(a, b); //=> true
	     */
	    var equals = _curry2(function equals(a, b) {
	        return _equals(a, b, [], []);
	    });
	
	    /**
	     * Takes a predicate and a "filterable", and returns a new filterable of the
	     * same type containing the members of the given filterable which satisfy the
	     * given predicate.
	     *
	     * Dispatches to the `filter` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> f a
	     * @param {Function} pred
	     * @param {Array} filterable
	     * @return {Array}
	     * @see R.reject, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *
	     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
	     *
	     *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	     */
	    // else
	    var filter = _curry2(_dispatchable('filter', _xfilter, function (pred, filterable) {
	        return _isObject(filterable) ? _reduce(function (acc, key) {
	            if (pred(filterable[key])) {
	                acc[key] = filterable[key];
	            }
	            return acc;
	        }, {}, keys(filterable)) : // else
	        _filter(pred, filterable);
	    }));
	
	    /**
	     * Returns a new list by pulling every item out of it (and all its sub-arrays)
	     * and putting them in a new array, depth-first.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b]
	     * @param {Array} list The array to consider.
	     * @return {Array} The flattened list.
	     * @see R.unnest
	     * @example
	     *
	     *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
	     *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	     */
	    var flatten = _curry1(_makeFlat(true));
	
	    /**
	     * Returns a new function much like the supplied one, except that the first two
	     * arguments' order is reversed.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
	     * @param {Function} fn The function to invoke with its first two parameters reversed.
	     * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
	     * @example
	     *
	     *      var mergeThree = (a, b, c) => [].concat(a, b, c);
	     *
	     *      mergeThree(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
	     */
	    var flip = _curry1(function flip(fn) {
	        return curry(function (a, b) {
	            var args = _slice(arguments);
	            args[0] = b;
	            args[1] = a;
	            return fn.apply(this, args);
	        });
	    });
	
	    /**
	     * Returns the first element of the given list or string. In some libraries
	     * this function is named `first`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> a | Undefined
	     * @sig String -> String
	     * @param {Array|String} list
	     * @return {*}
	     * @see R.tail, R.init, R.last
	     * @example
	     *
	     *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
	     *      R.head([]); //=> undefined
	     *
	     *      R.head('abc'); //=> 'a'
	     *      R.head(''); //=> ''
	     */
	    var head = nth(0);
	
	    /**
	     * Returns all but the last element of the given list or string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.last, R.head, R.tail
	     * @example
	     *
	     *      R.init([1, 2, 3]);  //=> [1, 2]
	     *      R.init([1, 2]);     //=> [1]
	     *      R.init([1]);        //=> []
	     *      R.init([]);         //=> []
	     *
	     *      R.init('abc');  //=> 'ab'
	     *      R.init('ab');   //=> 'a'
	     *      R.init('a');    //=> ''
	     *      R.init('');     //=> ''
	     */
	    var init = slice(0, -1);
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those
	     * elements common to both lists. Duplication is determined according to the
	     * value returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate function that determines whether
	     *        the two supplied elements are equal.
	     * @param {Array} list1 One list of items to compare
	     * @param {Array} list2 A second list of items to compare
	     * @return {Array} A new list containing those elements common to both lists.
	     * @see R.intersection
	     * @example
	     *
	     *      var buffaloSpringfield = [
	     *        {id: 824, name: 'Richie Furay'},
	     *        {id: 956, name: 'Dewey Martin'},
	     *        {id: 313, name: 'Bruce Palmer'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *      var csny = [
	     *        {id: 204, name: 'David Crosby'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 539, name: 'Graham Nash'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *
	     *      R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield, csny);
	     *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
	     */
	    var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
	        var lookupList, filteredList;
	        if (list1.length > list2.length) {
	            lookupList = list1;
	            filteredList = list2;
	        } else {
	            lookupList = list2;
	            filteredList = list1;
	        }
	        var results = [];
	        var idx = 0;
	        while (idx < filteredList.length) {
	            if (_containsWith(pred, filteredList[idx], lookupList)) {
	                results[results.length] = filteredList[idx];
	            }
	            idx += 1;
	        }
	        return uniqWith(pred, results);
	    });
	
	    /**
	     * Transforms the items of the list with the transducer and appends the
	     * transformed items to the accumulator using an appropriate iterator function
	     * based on the accumulator type.
	     *
	     * The accumulator can be an array, string, object or a transformer. Iterated
	     * items will be appended to arrays and concatenated to strings. Objects will
	     * be merged directly or 2-item arrays will be merged as key, value pairs.
	     *
	     * The accumulator can also be a transformer object that provides a 2-arity
	     * reducing iterator function, step, 0-arity initial value function, init, and
	     * 1-arity result extraction function result. The step function is used as the
	     * iterator function in reduce. The result function is used to convert the
	     * final accumulator into the return type and in most cases is R.identity. The
	     * init function is used to provide the initial accumulator.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig a -> (b -> b) -> [c] -> a
	     * @param {*} acc The initial accumulator value.
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.into([], transducer, numbers); //=> [2, 3]
	     *
	     *      var intoArray = R.into([]);
	     *      intoArray(transducer, numbers); //=> [2, 3]
	     */
	    var into = _curry3(function into(acc, xf, list) {
	        return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
	    });
	
	    /**
	     * Same as R.invertObj, however this accounts for objects with duplicate values
	     * by putting the values into an array.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {s: x} -> {x: [ s, ... ]}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object with keys
	     * in an array.
	     * @example
	     *
	     *      var raceResultsByFirstName = {
	     *        first: 'alice',
	     *        second: 'jake',
	     *        third: 'alice',
	     *      };
	     *      R.invert(raceResultsByFirstName);
	     *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
	     */
	    var invert = _curry1(function invert(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            var val = obj[key];
	            var list = _has(val, out) ? out[val] : out[val] = [];
	            list[list.length] = key;
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new object with the keys of the given object as values, and the
	     * values of the given object, which are coerced to strings, as keys. Note
	     * that the last key found is preferred when handling the same value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {s: x} -> {x: s}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object
	     * @example
	     *
	     *      var raceResults = {
	     *        first: 'alice',
	     *        second: 'jake'
	     *      };
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': 'first', 'jake':'second' }
	     *
	     *      // Alternatively:
	     *      var raceResults = ['alice', 'jake'];
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': '0', 'jake':'1' }
	     */
	    var invertObj = _curry1(function invertObj(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            out[obj[key]] = key;
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns `true` if the given value is its type's empty value; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig a -> Boolean
	     * @param {*} x
	     * @return {Boolean}
	     * @see R.empty
	     * @example
	     *
	     *      R.isEmpty([1, 2, 3]);   //=> false
	     *      R.isEmpty([]);          //=> true
	     *      R.isEmpty('');          //=> true
	     *      R.isEmpty(null);        //=> false
	     *      R.isEmpty({});          //=> true
	     *      R.isEmpty({length: 0}); //=> false
	     */
	    var isEmpty = _curry1(function isEmpty(x) {
	        return x != null && equals(x, empty(x));
	    });
	
	    /**
	     * Returns the last element of the given list or string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig [a] -> a | Undefined
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.init, R.head, R.tail
	     * @example
	     *
	     *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
	     *      R.last([]); //=> undefined
	     *
	     *      R.last('abc'); //=> 'c'
	     *      R.last(''); //=> ''
	     */
	    var last = nth(-1);
	
	    /**
	     * Returns the position of the last occurrence of an item in an array, or -1 if
	     * the item is not included in the array. `R.equals` is used to determine
	     * equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     * @see R.indexOf
	     * @example
	     *
	     *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
	     *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
	     */
	    var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
	        if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
	            return xs.lastIndexOf(target);
	        } else {
	            var idx = xs.length - 1;
	            while (idx >= 0) {
	                if (equals(xs[idx], target)) {
	                    return idx;
	                }
	                idx -= 1;
	            }
	            return -1;
	        }
	    });
	
	    /**
	     * Takes a function and
	     * a [functor](https://github.com/fantasyland/fantasy-land#functor),
	     * applies the function to each of the functor's values, and returns
	     * a functor of the same shape.
	     *
	     * Ramda provides suitable `map` implementations for `Array` and `Object`,
	     * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
	     *
	     * Dispatches to the `map` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * Also treats functions as functors and will compose them together.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Functor f => (a -> b) -> f a -> f b
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {Array} list The list to be iterated over.
	     * @return {Array} The new list.
	     * @see R.transduce, R.addIndex
	     * @example
	     *
	     *      var double = x => x * 2;
	     *
	     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	     *
	     *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
	     */
	    var map = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
	        switch (Object.prototype.toString.call(functor)) {
	        case '[object Function]':
	            return curryN(functor.length, function () {
	                return fn.call(this, functor.apply(this, arguments));
	            });
	        case '[object Object]':
	            return _reduce(function (acc, key) {
	                acc[key] = fn(functor[key]);
	                return acc;
	            }, {}, keys(functor));
	        default:
	            return _map(fn, functor);
	        }
	    }));
	
	    /**
	     * An Object-specific version of `map`. The function is applied to three
	     * arguments: *(value, key, obj)*. If only the value is significant, use
	     * `map` instead.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig ((*, String, Object) -> *) -> Object -> Object
	     * @param {Function} fn
	     * @param {Object} obj
	     * @return {Object}
	     * @see R.map
	     * @example
	     *
	     *      var values = { x: 1, y: 2, z: 3 };
	     *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
	     *
	     *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
	     */
	    var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
	        return _reduce(function (acc, key) {
	            acc[key] = fn(obj[key], key, obj);
	            return acc;
	        }, {}, keys(obj));
	    });
	
	    /**
	     * Creates a new object with the own properties of the two provided objects. If
	     * a key exists in both objects, the provided function is applied to the values
	     * associated with the key in each object, with the result being used as the
	     * value associated with the key in the returned object. The key will be
	     * excluded from the returned object if the resulting value is `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @sig (a -> a -> a) -> {a} -> {a} -> {a}
	     * @param {Function} fn
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.merge, R.mergeWithKey
	     * @example
	     *
	     *      R.mergeWith(R.concat,
	     *                  { a: true, values: [10, 20] },
	     *                  { b: true, values: [15, 35] });
	     *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
	     */
	    var mergeWith = _curry3(function mergeWith(fn, l, r) {
	        return mergeWithKey(function (_, _l, _r) {
	            return fn(_l, _r);
	        }, l, r);
	    });
	
	    /**
	     * Takes a function `f` and a list of arguments, and returns a function `g`.
	     * When applied, `g` returns the result of applying `f` to the arguments
	     * provided initially followed by the arguments provided to `g`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
	     * @param {Function} f
	     * @param {Array} args
	     * @return {Function}
	     * @see R.partialRight
	     * @example
	     *
	     *      var multiply = (a, b) => a * b;
	     *      var double = R.partial(multiply, [2]);
	     *      double(2); //=> 4
	     *
	     *      var greet = (salutation, title, firstName, lastName) =>
	     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *
	     *      var sayHello = R.partial(greet, ['Hello']);
	     *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
	     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partial = _createPartialApplicator(_concat);
	
	    /**
	     * Takes a function `f` and a list of arguments, and returns a function `g`.
	     * When applied, `g` returns the result of applying `f` to the arguments
	     * provided to `g` followed by the arguments provided initially.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
	     * @param {Function} f
	     * @param {Array} args
	     * @return {Function}
	     * @see R.partial
	     * @example
	     *
	     *      var greet = (salutation, title, firstName, lastName) =>
	     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *
	     *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
	     *
	     *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partialRight = _createPartialApplicator(flip(_concat));
	
	    /**
	     * Determines whether a nested path on an object has a specific value, in
	     * `R.equals` terms. Most likely used to filter a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Relation
	     * @sig [String] -> * -> {String: *} -> Boolean
	     * @param {Array} path The path of the nested property to use
	     * @param {*} val The value to compare the nested property with
	     * @param {Object} obj The object to check the nested property in
	     * @return {Boolean} `true` if the value equals the nested object property,
	     *         `false` otherwise.
	     * @example
	     *
	     *      var user1 = { address: { zipCode: 90210 } };
	     *      var user2 = { address: { zipCode: 55555 } };
	     *      var user3 = { name: 'Bob' };
	     *      var users = [ user1, user2, user3 ];
	     *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
	     *      R.filter(isFamous, users); //=> [ user1 ]
	     */
	    var pathEq = _curry3(function pathEq(_path, val, obj) {
	        return equals(path(_path, obj), val);
	    });
	
	    /**
	     * Returns a new list by plucking the same named property off all objects in
	     * the list supplied.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig k -> [{k: v}] -> [v]
	     * @param {Number|String} key The key name to pluck off of each object.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of values for the given key.
	     * @see R.props
	     * @example
	     *
	     *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
	     *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
	     */
	    var pluck = _curry2(function pluck(p, list) {
	        return map(prop(p), list);
	    });
	
	    /**
	     * Reasonable analog to SQL `select` statement.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @category Relation
	     * @sig [k] -> [{k: v}] -> [{k: v}]
	     * @param {Array} props The property names to project
	     * @param {Array} objs The objects to query
	     * @return {Array} An array of objects with just the `props` properties.
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
	     *      var kids = [abby, fred];
	     *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
	     */
	    // passing `identity` gives correct arity
	    var project = useWith(_map, [
	        pickAll,
	        identity
	    ]);
	
	    /**
	     * Returns `true` if the specified object property is equal, in `R.equals`
	     * terms, to the given value; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig String -> a -> Object -> Boolean
	     * @param {String} name
	     * @param {*} val
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.equals, R.propSatisfies
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
	     *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
	     *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
	     *      var kids = [abby, fred, rusty, alois];
	     *      var hasBrownHair = R.propEq('hair', 'brown');
	     *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
	     */
	    var propEq = _curry3(function propEq(name, val, obj) {
	        return equals(val, obj[name]);
	    });
	
	    /**
	     * Returns a single item by iterating through the list, successively calling
	     * the iterator function and passing it an accumulator value and the current
	     * value from the array, and then passing the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*. It may use
	     * `R.reduced` to shortcut the iteration.
	     *
	     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.reduce` method. For more details
	     * on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	     *
	     * Dispatches to the `reduce` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig ((a, b) -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduced, R.addIndex
	     * @example
	     *
	     *      var numbers = [1, 2, 3];
	     *      var plus = (a, b) => a + b;
	     *
	     *      R.reduce(plus, 10, numbers); //=> 16
	     */
	    var reduce = _curry3(_reduce);
	
	    /**
	     * Groups the elements of the list according to the result of calling
	     * the String-returning function `keyFn` on each element and reduces the elements
	     * of each group to a single value via the reducer function `valueFn`.
	     *
	     * This function is basically a more general `groupBy` function.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category List
	     * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
	     * @param {Function} valueFn The function that reduces the elements of each group to a single
	     *        value. Receives two values, accumulator for a particular group and the current element.
	     * @param {*} acc The (initial) accumulator value for each group.
	     * @param {Function} keyFn The function that maps the list's element into a key.
	     * @param {Array} list The array to group.
	     * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
	     *         `valueFn` for elements which produced that key when passed to `keyFn`.
	     * @see R.groupBy, R.reduce
	     * @example
	     *
	     *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
	     *      var namesByGrade = reduceToNamesBy(function(student) {
	     *        var score = student.score;
	     *        return score < 65 ? 'F' :
	     *               score < 70 ? 'D' :
	     *               score < 80 ? 'C' :
	     *               score < 90 ? 'B' : 'A';
	     *      });
	     *      var students = [{name: 'Lucy', score: 92},
	     *                      {name: 'Drew', score: 85},
	     *                      // ...
	     *                      {name: 'Bart', score: 62}];
	     *      namesByGrade(students);
	     *      // {
	     *      //   'A': ['Lucy'],
	     *      //   'B': ['Drew']
	     *      //   // ...,
	     *      //   'F': ['Bart']
	     *      // }
	     */
	    var reduceBy = _curryN(4, [], _dispatchable('reduceBy', _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
	        return _reduce(function (acc, elt) {
	            var key = keyFn(elt);
	            acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
	            return acc;
	        }, {}, list);
	    }));
	
	    /**
	     * Like `reduce`, `reduceWhile` returns a single item by iterating through
	     * the list, successively calling the iterator function. `reduceWhile` also
	     * takes a predicate that is evaluated before each step. If the predicate returns
	     * `false`, it "short-circuits" the iteration and returns the current value
	     * of the accumulator.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.22.0
	     * @category List
	     * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
	     * @param {Function} pred The predicate. It is passed the accumulator and the
	     *        current element.
	     * @param {Function} fn The iterator function. Receives two values, the
	     *        accumulator and the current element.
	     * @param {*} a The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduce, R.reduced
	     * @example
	     *
	     *      var isOdd = (acc, x) => x % 2 === 1;
	     *      var xs = [1, 3, 5, 60, 777, 800];
	     *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
	     *
	     *      var ys = [2, 4, 6]
	     *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
	     */
	    var reduceWhile = _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
	        return _reduce(function (acc, x) {
	            return pred(acc, x) ? fn(acc, x) : _reduced(acc);
	        }, a, list);
	    });
	
	    /**
	     * The complement of `filter`.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> f a
	     * @param {Function} pred
	     * @param {Array} filterable
	     * @return {Array}
	     * @see R.filter, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isOdd = (n) => n % 2 === 1;
	     *
	     *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
	     *
	     *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	     */
	    var reject = _curry2(function reject(pred, filterable) {
	        return filter(_complement(pred), filterable);
	    });
	
	    /**
	     * Returns a fixed list of size `n` containing a specified identical value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig a -> n -> [a]
	     * @param {*} value The value to repeat.
	     * @param {Number} n The desired size of the output list.
	     * @return {Array} A new array containing `n` `value`s.
	     * @example
	     *
	     *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
	     *
	     *      var obj = {};
	     *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
	     *      repeatedObjs[0] === repeatedObjs[1]; //=> true
	     */
	    var repeat = _curry2(function repeat(value, n) {
	        return times(always(value), n);
	    });
	
	    /**
	     * Adds together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The sum of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.sum([2,4,6,8,100,1]); //=> 121
	     */
	    var sum = reduce(add, 0);
	
	    /**
	     * Returns a new list containing the last `n` elements of the given list.
	     * If `n > list.length`, returns a list of `list.length` elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n The number of elements to return.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @see R.dropLast
	     * @example
	     *
	     *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
	     *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
	     *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.takeLast(3, 'ramda');               //=> 'mda'
	     */
	    var takeLast = _curry2(function takeLast(n, xs) {
	        return drop(n >= 0 ? xs.length - n : 0, xs);
	    });
	
	    /**
	     * Initializes a transducer using supplied iterator function. Returns a single
	     * item by iterating through the list, successively calling the transformed
	     * iterator function and passing it an accumulator value and the current value
	     * from the array, and then passing the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*. It will be
	     * wrapped as a transformer to initialize the transducer. A transformer can be
	     * passed directly in place of an iterator function. In both cases, iteration
	     * may be stopped early with the `R.reduced` function.
	     *
	     * A transducer is a function that accepts a transformer and returns a
	     * transformer and can be composed directly.
	     *
	     * A transformer is an an object that provides a 2-arity reducing iterator
	     * function, step, 0-arity initial value function, init, and 1-arity result
	     * extraction function, result. The step function is used as the iterator
	     * function in reduce. The result function is used to convert the final
	     * accumulator into the return type and in most cases is R.identity. The init
	     * function can be used to provide an initial accumulator, but is ignored by
	     * transduce.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array. Wrapped as transformer, if necessary, and used to
	     *        initialize the transducer
	     * @param {*} acc The initial accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduce, R.reduced, R.into
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
	     */
	    var transduce = curryN(4, function transduce(xf, fn, acc, list) {
	        return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
	    });
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the elements
	     * of each list. Duplication is determined according to the value returned by
	     * applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @see R.union
	     * @example
	     *
	     *      var l1 = [{a: 1}, {a: 2}];
	     *      var l2 = [{a: 1}, {a: 4}];
	     *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
	     */
	    var unionWith = _curry3(function unionWith(pred, list1, list2) {
	        return uniqWith(pred, _concat(list1, list2));
	    });
	
	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec, false otherwise. An object satisfies the spec if, for each of the
	     * spec's own properties, accessing that property of the object gives the same
	     * value (in `R.equals` terms) as accessing that property of the spec.
	     *
	     * `whereEq` is a specialization of [`where`](#where).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @sig {String: *} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @see R.where
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = R.whereEq({a: 1, b: 2});
	     *
	     *      pred({a: 1});              //=> false
	     *      pred({a: 1, b: 2});        //=> true
	     *      pred({a: 1, b: 2, c: 3});  //=> true
	     *      pred({a: 1, b: 1});        //=> false
	     */
	    var whereEq = _curry2(function whereEq(spec, testObj) {
	        return where(map(equals, spec), testObj);
	    });
	
	    var _flatCat = function () {
	        var preservingReduced = function (xf) {
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return xf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    var ret = xf['@@transducer/step'](result, input);
	                    return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
	                }
	            };
	        };
	        return function _xcat(xf) {
	            var rxf = preservingReduced(xf);
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return rxf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
	                }
	            };
	        };
	    }();
	
	    // Array.prototype.indexOf doesn't exist below IE9
	    // manually crawl the list to distinguish between +0 and -0
	    // NaN
	    // non-zero numbers can utilise Set
	    // all these types can utilise Set
	    // null can utilise Set
	    // anything else not covered above, defer to R.equals
	    var _indexOf = function _indexOf(list, a, idx) {
	        var inf, item;
	        // Array.prototype.indexOf doesn't exist below IE9
	        if (typeof list.indexOf === 'function') {
	            switch (typeof a) {
	            case 'number':
	                if (a === 0) {
	                    // manually crawl the list to distinguish between +0 and -0
	                    inf = 1 / a;
	                    while (idx < list.length) {
	                        item = list[idx];
	                        if (item === 0 && 1 / item === inf) {
	                            return idx;
	                        }
	                        idx += 1;
	                    }
	                    return -1;
	                } else if (a !== a) {
	                    // NaN
	                    while (idx < list.length) {
	                        item = list[idx];
	                        if (typeof item === 'number' && item !== item) {
	                            return idx;
	                        }
	                        idx += 1;
	                    }
	                    return -1;
	                }
	                // non-zero numbers can utilise Set
	                return list.indexOf(a, idx);
	            // all these types can utilise Set
	            case 'string':
	            case 'boolean':
	            case 'function':
	            case 'undefined':
	                return list.indexOf(a, idx);
	            case 'object':
	                if (a === null) {
	                    // null can utilise Set
	                    return list.indexOf(a, idx);
	                }
	            }
	        }
	        // anything else not covered above, defer to R.equals
	        while (idx < list.length) {
	            if (equals(list[idx], a)) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    };
	
	    var _xchain = _curry2(function _xchain(f, xf) {
	        return map(f, _flatCat(xf));
	    });
	
	    /**
	     * Takes a list of predicates and returns a predicate that returns true for a
	     * given list of arguments if every one of the provided predicates is satisfied
	     * by those arguments.
	     *
	     * The function returned is a curried function whose arity matches that of the
	     * highest-arity predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} preds
	     * @return {Function}
	     * @see R.anyPass
	     * @example
	     *
	     *      var isQueen = R.propEq('rank', 'Q');
	     *      var isSpade = R.propEq('suit', '♠︎');
	     *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
	     *
	     *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
	     *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
	     */
	    var allPass = _curry1(function allPass(preds) {
	        return curryN(reduce(max, 0, pluck('length', preds)), function () {
	            var idx = 0;
	            var len = preds.length;
	            while (idx < len) {
	                if (!preds[idx].apply(this, arguments)) {
	                    return false;
	                }
	                idx += 1;
	            }
	            return true;
	        });
	    });
	
	    /**
	     * Takes a list of predicates and returns a predicate that returns true for a
	     * given list of arguments if at least one of the provided predicates is
	     * satisfied by those arguments.
	     *
	     * The function returned is a curried function whose arity matches that of the
	     * highest-arity predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} preds
	     * @return {Function}
	     * @see R.allPass
	     * @example
	     *
	     *      var gte = R.anyPass([R.gt, R.equals]);
	     *
	     *      gte(3, 2); //=> true
	     *      gte(2, 2); //=> true
	     *      gte(2, 3); //=> false
	     */
	    var anyPass = _curry1(function anyPass(preds) {
	        return curryN(reduce(max, 0, pluck('length', preds)), function () {
	            var idx = 0;
	            var len = preds.length;
	            while (idx < len) {
	                if (preds[idx].apply(this, arguments)) {
	                    return true;
	                }
	                idx += 1;
	            }
	            return false;
	        });
	    });
	
	    /**
	     * ap applies a list of functions to a list of values.
	     *
	     * Dispatches to the `ap` method of the second argument, if present. Also
	     * treats curried functions as applicatives.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig [a -> b] -> [a] -> [b]
	     * @sig Apply f => f (a -> b) -> f a -> f b
	     * @param {Array} fns An array of functions
	     * @param {Array} vs An array of values
	     * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
	     * @example
	     *
	     *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
	     */
	    // else
	    var ap = _curry2(function ap(applicative, fn) {
	        return typeof applicative.ap === 'function' ? applicative.ap(fn) : typeof applicative === 'function' ? function (x) {
	            return applicative(x)(fn(x));
	        } : // else
	        _reduce(function (acc, f) {
	            return _concat(acc, map(f, fn));
	        }, [], applicative);
	    });
	
	    /**
	     * Given a spec object recursively mapping properties to functions, creates a
	     * function producing an object of the same structure, by mapping each property
	     * to the result of calling its associated function with the supplied arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Function
	     * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
	     * @param {Object} spec an object recursively mapping properties to functions for
	     *        producing the values for these properties.
	     * @return {Function} A function that returns an object of the same structure
	     * as `spec', with each property set to the value returned by calling its
	     * associated function with the supplied arguments.
	     * @see R.converge, R.juxt
	     * @example
	     *
	     *      var getMetrics = R.applySpec({
	     *                                      sum: R.add,
	     *                                      nested: { mul: R.multiply }
	     *                                   });
	     *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
	     */
	    var applySpec = _curry1(function applySpec(spec) {
	        spec = map(function (v) {
	            return typeof v == 'function' ? v : applySpec(v);
	        }, spec);
	        return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
	            var args = arguments;
	            return map(function (f) {
	                return apply(f, args);
	            }, spec);
	        });
	    });
	
	    /**
	     * Returns the result of calling its first argument with the remaining
	     * arguments. This is occasionally useful as a converging function for
	     * `R.converge`: the left branch can produce a function while the right branch
	     * produces a value to be passed to that function as an argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig (*... -> a),*... -> a
	     * @param {Function} fn The function to apply to the remaining arguments.
	     * @param {...*} args Any number of positional arguments.
	     * @return {*}
	     * @see R.apply
	     * @example
	     *
	     *      var indentN = R.pipe(R.times(R.always(' ')),
	     *                           R.join(''),
	     *                           R.replace(/^(?!$)/gm));
	     *
	     *      var format = R.converge(R.call, [
	     *                                  R.pipe(R.prop('indent'), indentN),
	     *                                  R.prop('value')
	     *                              ]);
	     *
	     *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
	     */
	    var call = curry(function call(fn) {
	        return fn.apply(this, _slice(arguments, 1));
	    });
	
	    /**
	     * `chain` maps a function over a list and concatenates the results. `chain`
	     * is also known as `flatMap` in some libraries
	     *
	     * Dispatches to the `chain` method of the second argument, if present,
	     * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig Chain m => (a -> m b) -> m a -> m b
	     * @param {Function} fn
	     * @param {Array} list
	     * @return {Array}
	     * @example
	     *
	     *      var duplicate = n => [n, n];
	     *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
	     */
	    var chain = _curry2(_dispatchable('chain', _xchain, function chain(fn, monad) {
	        if (typeof monad === 'function') {
	            return function () {
	                return monad.call(this, fn.apply(this, arguments)).apply(this, arguments);
	            };
	        }
	        return _makeFlat(false)(map(fn, monad));
	    }));
	
	    /**
	     * Returns a function, `fn`, which encapsulates if/else-if/else logic.
	     * `R.cond` takes a list of [predicate, transform] pairs. All of the arguments
	     * to `fn` are applied to each of the predicates in turn until one returns a
	     * "truthy" value, at which point `fn` returns the result of applying its
	     * arguments to the corresponding transformer. If none of the predicates
	     * matches, `fn` returns undefined.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Logic
	     * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
	     * @param {Array} pairs
	     * @return {Function}
	     * @example
	     *
	     *      var fn = R.cond([
	     *        [R.equals(0),   R.always('water freezes at 0°C')],
	     *        [R.equals(100), R.always('water boils at 100°C')],
	     *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
	     *      ]);
	     *      fn(0); //=> 'water freezes at 0°C'
	     *      fn(50); //=> 'nothing special happens at 50°C'
	     *      fn(100); //=> 'water boils at 100°C'
	     */
	    var cond = _curry1(function cond(pairs) {
	        var arity = reduce(max, 0, map(function (pair) {
	            return pair[0].length;
	        }, pairs));
	        return _arity(arity, function () {
	            var idx = 0;
	            while (idx < pairs.length) {
	                if (pairs[idx][0].apply(this, arguments)) {
	                    return pairs[idx][1].apply(this, arguments);
	                }
	                idx += 1;
	            }
	        });
	    });
	
	    /**
	     * Wraps a constructor function inside a curried function that can be called
	     * with the same arguments and returns the same type. The arity of the function
	     * returned is specified to allow using variadic constructor functions.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Function
	     * @sig Number -> (* -> {*}) -> (* -> {*})
	     * @param {Number} n The arity of the constructor function.
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Variadic constructor function
	     *      var Widget = () => {
	     *        this.children = Array.prototype.slice.call(arguments);
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.constructN(1, Widget), allConfigs); // a list of Widgets
	     */
	    var constructN = _curry2(function constructN(n, Fn) {
	        if (n > 10) {
	            throw new Error('Constructor with greater than ten arguments');
	        }
	        if (n === 0) {
	            return function () {
	                return new Fn();
	            };
	        }
	        return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
	            switch (arguments.length) {
	            case 1:
	                return new Fn($0);
	            case 2:
	                return new Fn($0, $1);
	            case 3:
	                return new Fn($0, $1, $2);
	            case 4:
	                return new Fn($0, $1, $2, $3);
	            case 5:
	                return new Fn($0, $1, $2, $3, $4);
	            case 6:
	                return new Fn($0, $1, $2, $3, $4, $5);
	            case 7:
	                return new Fn($0, $1, $2, $3, $4, $5, $6);
	            case 8:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
	            case 9:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
	            case 10:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
	            }
	        }));
	    });
	
	    /**
	     * Accepts a converging function and a list of branching functions and returns
	     * a new function. When invoked, this new function is applied to some
	     * arguments, each branching function is applied to those same arguments. The
	     * results of each branching function are passed as arguments to the converging
	     * function to produce the return value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.2
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> [(a -> b -> ... -> x1), (a -> b -> ... -> x2), ...] -> (a -> b -> ... -> z)
	     * @param {Function} after A function. `after` will be invoked with the return values of
	     *        `fn1` and `fn2` as its arguments.
	     * @param {Array} functions A list of functions.
	     * @return {Function} A new function.
	     * @example
	     *
	     *      var add = (a, b) => a + b;
	     *      var multiply = (a, b) => a * b;
	     *      var subtract = (a, b) => a - b;
	     *
	     *      //≅ multiply( add(1, 2), subtract(1, 2) );
	     *      R.converge(multiply, [add, subtract])(1, 2); //=> -3
	     *
	     *      var add3 = (a, b, c) => a + b + c;
	     *      R.converge(add3, [multiply, add, subtract])(1, 2); //=> 4
	     */
	    var converge = _curry2(function converge(after, fns) {
	        return curryN(reduce(max, 0, pluck('length', fns)), function () {
	            var args = arguments;
	            var context = this;
	            return after.apply(context, _map(function (fn) {
	                return fn.apply(context, args);
	            }, fns));
	        });
	    });
	
	    /**
	     * Counts the elements of a list according to how many match each value of a
	     * key generated by the supplied function. Returns an object mapping the keys
	     * produced by `fn` to the number of occurrences in the list. Note that all
	     * keys are coerced to strings because of how JavaScript objects work.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> String) -> [a] -> {*}
	     * @param {Function} fn The function used to map values to keys.
	     * @param {Array} list The list to count elements from.
	     * @return {Object} An object mapping keys to number of occurrences in the list.
	     * @example
	     *
	     *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
	     *      var letters = R.split('', 'abcABCaaaBBc');
	     *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
	     *      R.countBy(R.toLower)(letters);   //=> {'a': 5, 'b': 4, 'c': 3}
	     */
	    var countBy = reduceBy(function (acc, elem) {
	        return acc + 1;
	    }, 0);
	
	    /**
	     * Returns a new list without any consecutively repeating elements. Equality is
	     * determined by applying the supplied predicate two consecutive elements. The
	     * first element in a series of equal element is the one being preserved.
	     *
	     * Dispatches to the `dropRepeatsWith` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @see R.transduce
	     * @example
	     *
	     *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
	     *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
	     */
	    var dropRepeatsWith = _curry2(_dispatchable('dropRepeatsWith', _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
	        var result = [];
	        var idx = 1;
	        var len = list.length;
	        if (len !== 0) {
	            result[0] = list[0];
	            while (idx < len) {
	                if (!pred(last(result), list[idx])) {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	        }
	        return result;
	    }));
	
	    /**
	     * Takes a function and two values in its domain and returns `true` if the
	     * values map to the same value in the codomain; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Relation
	     * @sig (a -> b) -> a -> a -> Boolean
	     * @param {Function} f
	     * @param {*} x
	     * @param {*} y
	     * @return {Boolean}
	     * @example
	     *
	     *      R.eqBy(Math.abs, 5, -5); //=> true
	     */
	    var eqBy = _curry3(function eqBy(f, x, y) {
	        return equals(f(x), f(y));
	    });
	
	    /**
	     * Reports whether two objects have the same value, in `R.equals` terms, for
	     * the specified property. Useful as a curried predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig k -> {k: v} -> {k: v} -> Boolean
	     * @param {String} prop The name of the property to compare
	     * @param {Object} obj1
	     * @param {Object} obj2
	     * @return {Boolean}
	     *
	     * @example
	     *
	     *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
	     *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
	     *      R.eqProps('a', o1, o2); //=> false
	     *      R.eqProps('c', o1, o2); //=> true
	     */
	    var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
	        return equals(obj1[prop], obj2[prop]);
	    });
	
	    /**
	     * Splits a list into sub-lists stored in an object, based on the result of
	     * calling a String-returning function on each element, and grouping the
	     * results according to values returned.
	     *
	     * Dispatches to the `groupBy` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> String) -> [a] -> {String: [a]}
	     * @param {Function} fn Function :: a -> String
	     * @param {Array} list The array to group
	     * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
	     *         that produced that key when passed to `fn`.
	     * @see R.transduce
	     * @example
	     *
	     *      var byGrade = R.groupBy(function(student) {
	     *        var score = student.score;
	     *        return score < 65 ? 'F' :
	     *               score < 70 ? 'D' :
	     *               score < 80 ? 'C' :
	     *               score < 90 ? 'B' : 'A';
	     *      });
	     *      var students = [{name: 'Abby', score: 84},
	     *                      {name: 'Eddy', score: 58},
	     *                      // ...
	     *                      {name: 'Jack', score: 69}];
	     *      byGrade(students);
	     *      // {
	     *      //   'A': [{name: 'Dianne', score: 99}],
	     *      //   'B': [{name: 'Abby', score: 84}]
	     *      //   // ...,
	     *      //   'F': [{name: 'Eddy', score: 58}]
	     *      // }
	     */
	    var groupBy = _curry2(_checkForMethod('groupBy', reduceBy(function (acc, item) {
	        if (acc == null) {
	            acc = [];
	        }
	        acc.push(item);
	        return acc;
	    }, null)));
	
	    /**
	     * Given a function that generates a key, turns a list of objects into an
	     * object indexing the objects by the given key. Note that if multiple
	     * objects generate the same value for the indexing key only the last value
	     * will be included in the generated object.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
	     * @param {Function} fn Function :: a -> String
	     * @param {Array} array The array of objects to index
	     * @return {Object} An object indexing each array element by the given property.
	     * @example
	     *
	     *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
	     *      R.indexBy(R.prop('id'), list);
	     *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
	     */
	    var indexBy = reduceBy(function (acc, elem) {
	        return elem;
	    }, null);
	
	    /**
	     * Returns the position of the first occurrence of an item in an array, or -1
	     * if the item is not included in the array. `R.equals` is used to determine
	     * equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     * @see R.lastIndexOf
	     * @example
	     *
	     *      R.indexOf(3, [1,2,3,4]); //=> 2
	     *      R.indexOf(10, [1,2,3,4]); //=> -1
	     */
	    var indexOf = _curry2(function indexOf(target, xs) {
	        return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
	    });
	
	    /**
	     * juxt applies a list of functions to a list of values.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Function
	     * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
	     * @param {Array} fns An array of functions
	     * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
	     * @see R.applySpec
	     * @example
	     *
	     *      var getRange = R.juxt([Math.min, Math.max]);
	     *      getRange(3, 4, 9, -3); //=> [-3, 9]
	     */
	    var juxt = _curry1(function juxt(fns) {
	        return converge(_arrayOf, fns);
	    });
	
	    /**
	     * Returns a lens for the given getter and setter functions. The getter "gets"
	     * the value of the focus; the setter "sets" the value of the focus. The setter
	     * should not mutate the data structure.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
	     * @param {Function} getter
	     * @param {Function} setter
	     * @return {Lens}
	     * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
	     *
	     *      R.view(xLens, {x: 1, y: 2});            //=> 1
	     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
	     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
	     */
	    var lens = _curry2(function lens(getter, setter) {
	        return function (toFunctorFn) {
	            return function (target) {
	                return map(function (focus) {
	                    return setter(focus, target);
	                }, toFunctorFn(getter(target)));
	            };
	        };
	    });
	
	    /**
	     * Returns a lens whose focus is the specified index.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Number -> Lens s a
	     * @param {Number} n
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *
	     *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
	     *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
	     *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
	     */
	    var lensIndex = _curry1(function lensIndex(n) {
	        return lens(nth(n), update(n));
	    });
	
	    /**
	     * Returns a lens whose focus is the specified path.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig [String] -> Lens s a
	     * @param {Array} path The path to use.
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var xyLens = R.lensPath(['x', 'y']);
	     *
	     *      R.view(xyLens, {x: {y: 2, z: 3}});            //=> 2
	     *      R.set(xyLens, 4, {x: {y: 2, z: 3}});          //=> {x: {y: 4, z: 3}}
	     *      R.over(xyLens, R.negate, {x: {y: 2, z: 3}});  //=> {x: {y: -2, z: 3}}
	     */
	    var lensPath = _curry1(function lensPath(p) {
	        return lens(path(p), assocPath(p));
	    });
	
	    /**
	     * Returns a lens whose focus is the specified property.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig String -> Lens s a
	     * @param {String} k
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.view(xLens, {x: 1, y: 2});            //=> 1
	     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
	     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
	     */
	    var lensProp = _curry1(function lensProp(k) {
	        return lens(prop(k), assoc(k));
	    });
	
	    /**
	     * "lifts" a function to be the specified arity, so that it may "map over" that
	     * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig Number -> (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The lifted function.
	     * @see R.lift, R.ap
	     * @example
	     *
	     *      var madd3 = R.liftN(3, R.curryN(3, (...args) => R.sum(args)));
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     */
	    var liftN = _curry2(function liftN(arity, fn) {
	        var lifted = curryN(arity, fn);
	        return curryN(arity, function () {
	            return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
	        });
	    });
	
	    /**
	     * Returns the mean of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.mean([2, 7, 9]); //=> 6
	     *      R.mean([]); //=> NaN
	     */
	    var mean = _curry1(function mean(list) {
	        return sum(list) / list.length;
	    });
	
	    /**
	     * Returns the median of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.median([2, 9, 7]); //=> 7
	     *      R.median([7, 2, 10, 9]); //=> 8
	     *      R.median([]); //=> NaN
	     */
	    var median = _curry1(function median(list) {
	        var len = list.length;
	        if (len === 0) {
	            return NaN;
	        }
	        var width = 2 - len % 2;
	        var idx = (len - width) / 2;
	        return mean(_slice(list).sort(function (a, b) {
	            return a < b ? -1 : a > b ? 1 : 0;
	        }).slice(idx, idx + width));
	    });
	
	    /**
	     * Takes a predicate and a list or other "filterable" object and returns the
	     * pair of filterable objects of the same type of elements which do and do not
	     * satisfy, the predicate, respectively.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
	     * @param {Function} pred A predicate to determine which side the element belongs to.
	     * @param {Array} filterable the list (or other filterable) to partition.
	     * @return {Array} An array, containing first the subset of elements that satisfy the
	     *         predicate, and second the subset of elements that do not satisfy.
	     * @see R.filter, R.reject
	     * @example
	     *
	     *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
	     *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
	     *
	     *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
	     *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
	     */
	    var partition = juxt([
	        filter,
	        reject
	    ]);
	
	    /**
	     * Performs left-to-right function composition. The leftmost function may have
	     * any arity; the remaining functions must be unary.
	     *
	     * In some libraries this function is named `sequence`.
	     *
	     * **Note:** The result of pipe is not automatically curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.compose
	     * @example
	     *
	     *      var f = R.pipe(Math.pow, R.negate, R.inc);
	     *
	     *      f(3, 4); // -(3^4) + 1
	     */
	    var pipe = function pipe() {
	        if (arguments.length === 0) {
	            throw new Error('pipe requires at least one argument');
	        }
	        return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
	    };
	
	    /**
	     * Performs left-to-right composition of one or more Promise-returning
	     * functions. The leftmost function may have any arity; the remaining functions
	     * must be unary.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.composeP
	     * @example
	     *
	     *      //  followersForUser :: String -> Promise [User]
	     *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
	     */
	    var pipeP = function pipeP() {
	        if (arguments.length === 0) {
	            throw new Error('pipeP requires at least one argument');
	        }
	        return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
	    };
	
	    /**
	     * Multiplies together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The product of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.product([2,4,6,8,100,1]); //=> 38400
	     */
	    var product = reduce(multiply, 1);
	
	    /**
	     * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
	     * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
	     * Applicative of Traversable.
	     *
	     * Dispatches to the `sequence` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
	     * @param {Function} of
	     * @param {*} traversable
	     * @return {*}
	     * @see R.traverse
	     * @example
	     *
	     *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
	     *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
	     *
	     *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
	     *      R.sequence(R.of, Nothing());       //=> [Nothing()]
	     */
	    var sequence = _curry2(function sequence(of, traversable) {
	        return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (acc, x) {
	            return ap(map(prepend, x), acc);
	        }, of([]), traversable);
	    });
	
	    /**
	     * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
	     * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
	     * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
	     * into an Applicative of Traversable.
	     *
	     * Dispatches to the `sequence` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
	     * @param {Function} of
	     * @param {Function} f
	     * @param {*} traversable
	     * @return {*}
	     * @see R.sequence
	     * @example
	     *
	     *      // Returns `Nothing` if the given divisor is `0`
	     *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
	     *
	     *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
	     *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
	     */
	    var traverse = _curry3(function traverse(of, f, traversable) {
	        return sequence(of, map(f, traversable));
	    });
	
	    /**
	     * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
	     * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig Chain c => c (c a) -> c a
	     * @param {*} list
	     * @return {*}
	     * @see R.flatten, R.chain
	     * @example
	     *
	     *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
	     *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
	     */
	    var unnest = chain(_identity);
	
	    var _contains = function _contains(a, list) {
	        return _indexOf(list, a, 0) >= 0;
	    };
	
	    //  mapPairs :: (Object, [String]) -> [String]
	    var _toString = function _toString(x, seen) {
	        var recur = function recur(y) {
	            var xs = seen.concat([x]);
	            return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
	        };
	        //  mapPairs :: (Object, [String]) -> [String]
	        var mapPairs = function (obj, keys) {
	            return _map(function (k) {
	                return _quote(k) + ': ' + recur(obj[k]);
	            }, keys.slice().sort());
	        };
	        switch (Object.prototype.toString.call(x)) {
	        case '[object Arguments]':
	            return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
	        case '[object Array]':
	            return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
	                return /^\d+$/.test(k);
	            }, keys(x)))).join(', ') + ']';
	        case '[object Boolean]':
	            return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
	        case '[object Date]':
	            return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
	        case '[object Null]':
	            return 'null';
	        case '[object Number]':
	            return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
	        case '[object String]':
	            return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
	        case '[object Undefined]':
	            return 'undefined';
	        default:
	            if (typeof x.toString === 'function') {
	                var repr = x.toString();
	                if (repr !== '[object Object]') {
	                    return repr;
	                }
	            }
	            return '{' + mapPairs(x, keys(x)).join(', ') + '}';
	        }
	    };
	
	    /**
	     * Performs right-to-left function composition. The rightmost function may have
	     * any arity; the remaining functions must be unary.
	     *
	     * **Note:** The result of compose is not automatically curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.pipe
	     * @example
	     *
	     *      var f = R.compose(R.inc, R.negate, Math.pow);
	     *
	     *      f(3, 4); // -(3^4) + 1
	     */
	    var compose = function compose() {
	        if (arguments.length === 0) {
	            throw new Error('compose requires at least one argument');
	        }
	        return pipe.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Returns the right-to-left Kleisli composition of the provided functions,
	     * each of which must return a value of a type supported by [`chain`](#chain).
	     *
	     * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Function
	     * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (m a -> m z)
	     * @param {...Function}
	     * @return {Function}
	     * @see R.pipeK
	     * @example
	     *
	     *      //  parseJson :: String -> Maybe *
	     *      //  get :: String -> Object -> Maybe *
	     *
	     *      //  getStateCode :: Maybe String -> Maybe String
	     *      var getStateCode = R.composeK(
	     *        R.compose(Maybe.of, R.toUpper),
	     *        get('state'),
	     *        get('address'),
	     *        get('user'),
	     *        parseJson
	     *      );
	     *
	     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
	     *      //=> Just('NY')
	     *      getStateCode(Maybe.of('[Invalid JSON]'));
	     *      //=> Nothing()
	     */
	    var composeK = function composeK() {
	        return compose.apply(this, prepend(identity, map(chain, arguments)));
	    };
	
	    /**
	     * Performs right-to-left composition of one or more Promise-returning
	     * functions. The rightmost function may have any arity; the remaining
	     * functions must be unary.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.pipeP
	     * @example
	     *
	     *      //  followersForUser :: String -> Promise [User]
	     *      var followersForUser = R.composeP(db.getFollowers, db.getUserById);
	     */
	    var composeP = function composeP() {
	        if (arguments.length === 0) {
	            throw new Error('composeP requires at least one argument');
	        }
	        return pipeP.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Wraps a constructor function inside a curried function that can be called
	     * with the same arguments and returns the same type.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (* -> {*}) -> (* -> {*})
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Constructor function
	     *      var Widget = config => {
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.construct(Widget), allConfigs); // a list of Widgets
	     */
	    var construct = _curry1(function construct(Fn) {
	        return constructN(Fn.length, Fn);
	    });
	
	    /**
	     * Returns `true` if the specified value is equal, in `R.equals` terms, to at
	     * least one element of the given list; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Boolean
	     * @param {Object} a The item to compare against.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the item is in the list, `false` otherwise.
	     * @see R.any
	     * @example
	     *
	     *      R.contains(3, [1, 2, 3]); //=> true
	     *      R.contains(4, [1, 2, 3]); //=> false
	     *      R.contains([42], [[42]]); //=> true
	     */
	    var contains = _curry2(_contains);
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not
	     * contained in the second list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith
	     * @example
	     *
	     *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
	     *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
	     */
	    var difference = _curry2(function difference(first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        while (idx < firstLen) {
	            if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
	                out[out.length] = first[idx];
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new list without any consecutively repeating elements. `R.equals`
	     * is used to determine equality.
	     *
	     * Dispatches to the `dropRepeats` method of the first argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @see R.transduce
	     * @example
	     *
	     *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
	     */
	    var dropRepeats = _curry1(_dispatchable('dropRepeats', _xdropRepeatsWith(equals), dropRepeatsWith(equals)));
	
	    /**
	     * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
	     * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The lifted function.
	     * @see R.liftN
	     * @example
	     *
	     *      var madd3 = R.lift(R.curry((a, b, c) => a + b + c));
	     *
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     *
	     *      var madd5 = R.lift(R.curry((a, b, c, d, e) => a + b + c + d + e));
	     *
	     *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
	     */
	    var lift = _curry1(function lift(fn) {
	        return liftN(fn.length, fn);
	    });
	
	    /**
	     * Returns a partial copy of an object omitting the keys specified.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [String] -> {String: *} -> {String: *}
	     * @param {Array} names an array of String property names to omit from the new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with properties from `names` not on it.
	     * @see R.pick
	     * @example
	     *
	     *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
	     */
	    var omit = _curry2(function omit(names, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (!_contains(prop, names)) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Returns the left-to-right Kleisli composition of the provided functions,
	     * each of which must return a value of a type supported by [`chain`](#chain).
	     *
	     * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Function
	     * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (m a -> m z)
	     * @param {...Function}
	     * @return {Function}
	     * @see R.composeK
	     * @example
	     *
	     *      //  parseJson :: String -> Maybe *
	     *      //  get :: String -> Object -> Maybe *
	     *
	     *      //  getStateCode :: Maybe String -> Maybe String
	     *      var getStateCode = R.pipeK(
	     *        parseJson,
	     *        get('user'),
	     *        get('address'),
	     *        get('state'),
	     *        R.compose(Maybe.of, R.toUpper)
	     *      );
	     *
	     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
	     *      //=> Just('NY')
	     *      getStateCode(Maybe.of('[Invalid JSON]'));
	     *      //=> Nothing()
	     */
	    var pipeK = function pipeK() {
	        return composeK.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Returns the string representation of the given value. `eval`'ing the output
	     * should result in a value equivalent to the input value. Many of the built-in
	     * `toString` methods do not satisfy this requirement.
	     *
	     * If the given value is an `[object Object]` with a `toString` method other
	     * than `Object.prototype.toString`, this method is invoked with no arguments
	     * to produce the return value. This means user-defined constructor functions
	     * can provide a suitable `toString` method. For example:
	     *
	     *     function Point(x, y) {
	     *       this.x = x;
	     *       this.y = y;
	     *     }
	     *
	     *     Point.prototype.toString = function() {
	     *       return 'new Point(' + this.x + ', ' + this.y + ')';
	     *     };
	     *
	     *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category String
	     * @sig * -> String
	     * @param {*} val
	     * @return {String}
	     * @example
	     *
	     *      R.toString(42); //=> '42'
	     *      R.toString('abc'); //=> '"abc"'
	     *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
	     *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
	     *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
	     */
	    var toString = _curry1(function toString(val) {
	        return _toString(val, []);
	    });
	
	    /**
	     * Returns a new list without values in the first argument.
	     * `R.equals` is used to determine equality.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig [a] -> [a] -> [a]
	     * @param {Array} list1 The values to be removed from `list2`.
	     * @param {Array} list2 The array to remove values from.
	     * @return {Array} The new array without values in `list1`.
	     * @see R.transduce
	     * @example
	     *
	     *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
	     */
	    var without = _curry2(function (xs, list) {
	        return reject(flip(_contains)(xs), list);
	    });
	
	    // A simple Set type that honours R.equals semantics
	    /* globals Set */
	    // until we figure out why jsdoc chokes on this
	    // @param item The item to add to the Set
	    // @returns {boolean} true if the item did not exist prior, otherwise false
	    //
	    //
	    // @param item The item to check for existence in the Set
	    // @returns {boolean} true if the item exists in the Set, otherwise false
	    //
	    //
	    // Combines the logic for checking whether an item is a member of the set and
	    // for adding a new item to the set.
	    //
	    // @param item       The item to check or add to the Set instance.
	    // @param shouldAdd  If true, the item will be added to the set if it doesn't
	    //                   already exist.
	    // @param set        The set instance to check or add to.
	    // @return {boolean} true if the item already existed, otherwise false.
	    //
	    // distinguish between +0 and -0
	    // these types can all utilise the native Set
	    // set._items['boolean'] holds a two element array
	    // representing [ falseExists, trueExists ]
	    // compare functions for reference equality
	    /* falls through */
	    // reduce the search size of heterogeneous sets by creating buckets
	    // for each type.
	    // scan through all previously applied items
	    var _Set = function () {
	        function _Set() {
	            /* globals Set */
	            this._nativeSet = typeof Set === 'function' ? new Set() : null;
	            this._items = {};
	        }
	        // until we figure out why jsdoc chokes on this
	        // @param item The item to add to the Set
	        // @returns {boolean} true if the item did not exist prior, otherwise false
	        //
	        _Set.prototype.add = function (item) {
	            return !hasOrAdd(item, true, this);
	        };
	        //
	        // @param item The item to check for existence in the Set
	        // @returns {boolean} true if the item exists in the Set, otherwise false
	        //
	        _Set.prototype.has = function (item) {
	            return hasOrAdd(item, false, this);
	        };
	        //
	        // Combines the logic for checking whether an item is a member of the set and
	        // for adding a new item to the set.
	        //
	        // @param item       The item to check or add to the Set instance.
	        // @param shouldAdd  If true, the item will be added to the set if it doesn't
	        //                   already exist.
	        // @param set        The set instance to check or add to.
	        // @return {boolean} true if the item already existed, otherwise false.
	        //
	        function hasOrAdd(item, shouldAdd, set) {
	            var type = typeof item;
	            var prevSize, newSize;
	            switch (type) {
	            case 'string':
	            case 'number':
	                // distinguish between +0 and -0
	                if (item === 0 && 1 / item === -Infinity) {
	                    if (set._items['-0']) {
	                        return true;
	                    } else {
	                        if (shouldAdd) {
	                            set._items['-0'] = true;
	                        }
	                        return false;
	                    }
	                }
	                // these types can all utilise the native Set
	                if (set._nativeSet !== null) {
	                    if (shouldAdd) {
	                        prevSize = set._nativeSet.size;
	                        set._nativeSet.add(item);
	                        newSize = set._nativeSet.size;
	                        return newSize === prevSize;
	                    } else {
	                        return set._nativeSet.has(item);
	                    }
	                } else {
	                    if (!(type in set._items)) {
	                        if (shouldAdd) {
	                            set._items[type] = {};
	                            set._items[type][item] = true;
	                        }
	                        return false;
	                    } else if (item in set._items[type]) {
	                        return true;
	                    } else {
	                        if (shouldAdd) {
	                            set._items[type][item] = true;
	                        }
	                        return false;
	                    }
	                }
	            case 'boolean':
	                // set._items['boolean'] holds a two element array
	                // representing [ falseExists, trueExists ]
	                if (type in set._items) {
	                    var bIdx = item ? 1 : 0;
	                    if (set._items[type][bIdx]) {
	                        return true;
	                    } else {
	                        if (shouldAdd) {
	                            set._items[type][bIdx] = true;
	                        }
	                        return false;
	                    }
	                } else {
	                    if (shouldAdd) {
	                        set._items[type] = item ? [
	                            false,
	                            true
	                        ] : [
	                            true,
	                            false
	                        ];
	                    }
	                    return false;
	                }
	            case 'function':
	                // compare functions for reference equality
	                if (set._nativeSet !== null) {
	                    if (shouldAdd) {
	                        prevSize = set._nativeSet.size;
	                        set._nativeSet.add(item);
	                        newSize = set._nativeSet.size;
	                        return newSize > prevSize;
	                    } else {
	                        return set._nativeSet.has(item);
	                    }
	                } else {
	                    if (!(type in set._items)) {
	                        if (shouldAdd) {
	                            set._items[type] = [item];
	                        }
	                        return false;
	                    }
	                    if (!_contains(item, set._items[type])) {
	                        if (shouldAdd) {
	                            set._items[type].push(item);
	                        }
	                        return false;
	                    }
	                    return true;
	                }
	            case 'undefined':
	                if (set._items[type]) {
	                    return true;
	                } else {
	                    if (shouldAdd) {
	                        set._items[type] = true;
	                    }
	                    return false;
	                }
	            case 'object':
	                if (item === null) {
	                    if (!set._items['null']) {
	                        if (shouldAdd) {
	                            set._items['null'] = true;
	                        }
	                        return false;
	                    }
	                    return true;
	                }
	            /* falls through */
	            default:
	                // reduce the search size of heterogeneous sets by creating buckets
	                // for each type.
	                type = Object.prototype.toString.call(item);
	                if (!(type in set._items)) {
	                    if (shouldAdd) {
	                        set._items[type] = [item];
	                    }
	                    return false;
	                }
	                // scan through all previously applied items
	                if (!_contains(item, set._items[type])) {
	                    if (shouldAdd) {
	                        set._items[type].push(item);
	                    }
	                    return false;
	                }
	                return true;
	            }
	        }
	        return _Set;
	    }();
	
	    /**
	     * A function wrapping calls to the two functions in an `&&` operation,
	     * returning the result of the first function if it is false-y and the result
	     * of the second function otherwise. Note that this is short-circuited,
	     * meaning that the second function will not be invoked if the first returns a
	     * false-y value.
	     *
	     * In addition to functions, `R.both` also accepts any fantasy-land compatible
	     * applicative functor.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
	     * @see R.and
	     * @example
	     *
	     *      var gt10 = x => x > 10;
	     *      var even = x => x % 2 === 0;
	     *      var f = R.both(gt10, even);
	     *      f(100); //=> true
	     *      f(101); //=> false
	     */
	    var both = _curry2(function both(f, g) {
	        return _isFunction(f) ? function _both() {
	            return f.apply(this, arguments) && g.apply(this, arguments);
	        } : lift(and)(f, g);
	    });
	
	    /**
	     * Takes a function `f` and returns a function `g` such that:
	     *
	     *   - applying `g` to zero or more arguments will give __true__ if applying
	     *     the same arguments to `f` gives a logical __false__ value; and
	     *
	     *   - applying `g` to zero or more arguments will give __false__ if applying
	     *     the same arguments to `f` gives a logical __true__ value.
	     *
	     * `R.complement` will work on all other functors as well.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> *) -> (*... -> Boolean)
	     * @param {Function} f
	     * @return {Function}
	     * @see R.not
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *      var isOdd = R.complement(isEven);
	     *      isOdd(21); //=> true
	     *      isOdd(42); //=> false
	     */
	    var complement = lift(not);
	
	    /**
	     * Returns the result of concatenating the given lists or strings.
	     *
	     * Note: `R.concat` expects both arguments to be of the same type,
	     * unlike the native `Array.prototype.concat` method. It will throw
	     * an error if you `concat` an Array with a non-Array value.
	     *
	     * Dispatches to the `concat` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a] -> [a]
	     * @sig String -> String -> String
	     * @param {Array|String} a
	     * @param {Array|String} b
	     * @return {Array|String}
	     *
	     * @example
	     *
	     *      R.concat([], []); //=> []
	     *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     *      R.concat('ABC', 'DEF'); // 'ABCDEF'
	     */
	    var concat = _curry2(function concat(a, b) {
	        if (a == null || !_isFunction(a.concat)) {
	            throw new TypeError(toString(a) + ' does not have a method named "concat"');
	        }
	        if (_isArray(a) && !_isArray(b)) {
	            throw new TypeError(toString(b) + ' is not an array');
	        }
	        return a.concat(b);
	    });
	
	    /**
	     * A function wrapping calls to the two functions in an `||` operation,
	     * returning the result of the first function if it is truth-y and the result
	     * of the second function otherwise. Note that this is short-circuited,
	     * meaning that the second function will not be invoked if the first returns a
	     * truth-y value.
	     *
	     * In addition to functions, `R.either` also accepts any fantasy-land compatible
	     * applicative functor.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
	     * @see R.or
	     * @example
	     *
	     *      var gt10 = x => x > 10;
	     *      var even = x => x % 2 === 0;
	     *      var f = R.either(gt10, even);
	     *      f(101); //=> true
	     *      f(8); //=> true
	     */
	    var either = _curry2(function either(f, g) {
	        return _isFunction(f) ? function _either() {
	            return f.apply(this, arguments) || g.apply(this, arguments);
	        } : lift(or)(f, g);
	    });
	
	    /**
	     * Turns a named method with a specified arity into a function that can be
	     * called directly supplied with arguments and a target object.
	     *
	     * The returned function is curried and accepts `arity + 1` parameters where
	     * the final parameter is the target object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
	     * @param {Number} arity Number of arguments the returned function should take
	     *        before the target object.
	     * @param {String} method Name of the method to call.
	     * @return {Function} A new curried function.
	     * @example
	     *
	     *      var sliceFrom = R.invoker(1, 'slice');
	     *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
	     *      var sliceFrom6 = R.invoker(2, 'slice')(6);
	     *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
	     */
	    var invoker = _curry2(function invoker(arity, method) {
	        return curryN(arity + 1, function () {
	            var target = arguments[arity];
	            if (target != null && _isFunction(target[method])) {
	                return target[method].apply(target, _slice(arguments, 0, arity));
	            }
	            throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
	        });
	    });
	
	    /**
	     * Returns a string made by inserting the `separator` between each element and
	     * concatenating all the elements into a single string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig String -> [a] -> String
	     * @param {Number|String} separator The string used to separate the elements.
	     * @param {Array} xs The elements to join into a string.
	     * @return {String} str The string made by concatenating `xs` with `separator`.
	     * @see R.split
	     * @example
	     *
	     *      var spacer = R.join(' ');
	     *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
	     *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
	     */
	    var join = invoker(1, 'join');
	
	    /**
	     * Creates a new function that, when invoked, caches the result of calling `fn`
	     * for a given argument set and returns the result. Subsequent calls to the
	     * memoized `fn` with the same argument set will not result in an additional
	     * call to `fn`; instead, the cached result for that set of arguments will be
	     * returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (*... -> a) -> (*... -> a)
	     * @param {Function} fn The function to memoize.
	     * @return {Function} Memoized version of `fn`.
	     * @example
	     *
	     *      var count = 0;
	     *      var factorial = R.memoize(n => {
	     *        count += 1;
	     *        return R.product(R.range(1, n + 1));
	     *      });
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      count; //=> 1
	     */
	    var memoize = _curry1(function memoize(fn) {
	        var cache = {};
	        return _arity(fn.length, function () {
	            var key = toString(arguments);
	            if (!_has(key, cache)) {
	                cache[key] = fn.apply(this, arguments);
	            }
	            return cache[key];
	        });
	    });
	
	    /**
	     * Splits a string into an array of strings based on the given
	     * separator.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category String
	     * @sig (String | RegExp) -> String -> [String]
	     * @param {String|RegExp} sep The pattern.
	     * @param {String} str The string to separate into an array.
	     * @return {Array} The array of strings from `str` separated by `str`.
	     * @see R.join
	     * @example
	     *
	     *      var pathComponents = R.split('/');
	     *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
	     *
	     *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
	     */
	    var split = invoker(1, 'split');
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements contained in the first or
	     * second list, but not both.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` or `list2`, but not both.
	     * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
	     * @example
	     *
	     *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
	     *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
	     */
	    var symmetricDifference = _curry2(function symmetricDifference(list1, list2) {
	        return concat(difference(list1, list2), difference(list2, list1));
	    });
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements contained in the first or
	     * second list, but not both. Duplication is determined according to the value
	     * returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [a] -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` or `list2`, but not both.
	     * @see R.symmetricDifference, R.difference, R.differenceWith
	     * @example
	     *
	     *      var eqA = R.eqBy(R.prop('a'));
	     *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
	     *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
	     *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
	     */
	    var symmetricDifferenceWith = _curry3(function symmetricDifferenceWith(pred, list1, list2) {
	        return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
	    });
	
	    /**
	     * Determines whether a given string matches a given regular expression.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category String
	     * @sig RegExp -> String -> Boolean
	     * @param {RegExp} pattern
	     * @param {String} str
	     * @return {Boolean}
	     * @see R.match
	     * @example
	     *
	     *      R.test(/^x/, 'xyz'); //=> true
	     *      R.test(/^y/, 'xyz'); //=> false
	     */
	    var test = _curry2(function test(pattern, str) {
	        if (!_isRegExp(pattern)) {
	            throw new TypeError('\u2018test\u2019 requires a value of type RegExp as its first argument; received ' + toString(pattern));
	        }
	        return _cloneRegExp(pattern).test(str);
	    });
	
	    /**
	     * The lower case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to lower case.
	     * @return {String} The lower case version of `str`.
	     * @see R.toUpper
	     * @example
	     *
	     *      R.toLower('XYZ'); //=> 'xyz'
	     */
	    var toLower = invoker(0, 'toLowerCase');
	
	    /**
	     * The upper case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to upper case.
	     * @return {String} The upper case version of `str`.
	     * @see R.toLower
	     * @example
	     *
	     *      R.toUpper('abc'); //=> 'ABC'
	     */
	    var toUpper = invoker(0, 'toUpperCase');
	
	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list, based upon the value returned by applying the supplied function to
	     * each list element. Prefers the first item if the supplied function produces
	     * the same value on two items. `R.equals` is used for comparison.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> b) -> [a] -> [a]
	     * @param {Function} fn A function used to produce a value to use during comparisons.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
	     */
	    var uniqBy = _curry2(function uniqBy(fn, list) {
	        var set = new _Set();
	        var result = [];
	        var idx = 0;
	        var appliedItem, item;
	        while (idx < list.length) {
	            item = list[idx];
	            appliedItem = fn(item);
	            if (set.add(appliedItem)) {
	                result.push(item);
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list. `R.equals` is used to determine equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
	     *      R.uniq([1, '1']);     //=> [1, '1']
	     *      R.uniq([[42], [42]]); //=> [[42]]
	     */
	    var uniq = uniqBy(identity);
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those
	     * elements common to both lists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The list of elements found in both `list1` and `list2`.
	     * @see R.intersectionWith
	     * @example
	     *
	     *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
	     */
	    var intersection = _curry2(function intersection(list1, list2) {
	        var lookupList, filteredList;
	        if (list1.length > list2.length) {
	            lookupList = list1;
	            filteredList = list2;
	        } else {
	            lookupList = list2;
	            filteredList = list1;
	        }
	        return uniq(_filter(flip(_contains)(lookupList), filteredList));
	    });
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the elements
	     * of each list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @example
	     *
	     *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
	     */
	    var union = _curry2(compose(uniq, _concat));
	
	    var R = {
	        F: F,
	        T: T,
	        __: __,
	        add: add,
	        addIndex: addIndex,
	        adjust: adjust,
	        all: all,
	        allPass: allPass,
	        always: always,
	        and: and,
	        any: any,
	        anyPass: anyPass,
	        ap: ap,
	        aperture: aperture,
	        append: append,
	        apply: apply,
	        applySpec: applySpec,
	        assoc: assoc,
	        assocPath: assocPath,
	        binary: binary,
	        bind: bind,
	        both: both,
	        call: call,
	        chain: chain,
	        clamp: clamp,
	        clone: clone,
	        comparator: comparator,
	        complement: complement,
	        compose: compose,
	        composeK: composeK,
	        composeP: composeP,
	        concat: concat,
	        cond: cond,
	        construct: construct,
	        constructN: constructN,
	        contains: contains,
	        converge: converge,
	        countBy: countBy,
	        curry: curry,
	        curryN: curryN,
	        dec: dec,
	        defaultTo: defaultTo,
	        difference: difference,
	        differenceWith: differenceWith,
	        dissoc: dissoc,
	        dissocPath: dissocPath,
	        divide: divide,
	        drop: drop,
	        dropLast: dropLast,
	        dropLastWhile: dropLastWhile,
	        dropRepeats: dropRepeats,
	        dropRepeatsWith: dropRepeatsWith,
	        dropWhile: dropWhile,
	        either: either,
	        empty: empty,
	        eqBy: eqBy,
	        eqProps: eqProps,
	        equals: equals,
	        evolve: evolve,
	        filter: filter,
	        find: find,
	        findIndex: findIndex,
	        findLast: findLast,
	        findLastIndex: findLastIndex,
	        flatten: flatten,
	        flip: flip,
	        forEach: forEach,
	        fromPairs: fromPairs,
	        groupBy: groupBy,
	        groupWith: groupWith,
	        gt: gt,
	        gte: gte,
	        has: has,
	        hasIn: hasIn,
	        head: head,
	        identical: identical,
	        identity: identity,
	        ifElse: ifElse,
	        inc: inc,
	        indexBy: indexBy,
	        indexOf: indexOf,
	        init: init,
	        insert: insert,
	        insertAll: insertAll,
	        intersection: intersection,
	        intersectionWith: intersectionWith,
	        intersperse: intersperse,
	        into: into,
	        invert: invert,
	        invertObj: invertObj,
	        invoker: invoker,
	        is: is,
	        isArrayLike: isArrayLike,
	        isEmpty: isEmpty,
	        isNil: isNil,
	        join: join,
	        juxt: juxt,
	        keys: keys,
	        keysIn: keysIn,
	        last: last,
	        lastIndexOf: lastIndexOf,
	        length: length,
	        lens: lens,
	        lensIndex: lensIndex,
	        lensPath: lensPath,
	        lensProp: lensProp,
	        lift: lift,
	        liftN: liftN,
	        lt: lt,
	        lte: lte,
	        map: map,
	        mapAccum: mapAccum,
	        mapAccumRight: mapAccumRight,
	        mapObjIndexed: mapObjIndexed,
	        match: match,
	        mathMod: mathMod,
	        max: max,
	        maxBy: maxBy,
	        mean: mean,
	        median: median,
	        memoize: memoize,
	        merge: merge,
	        mergeAll: mergeAll,
	        mergeWith: mergeWith,
	        mergeWithKey: mergeWithKey,
	        min: min,
	        minBy: minBy,
	        modulo: modulo,
	        multiply: multiply,
	        nAry: nAry,
	        negate: negate,
	        none: none,
	        not: not,
	        nth: nth,
	        nthArg: nthArg,
	        objOf: objOf,
	        of: of,
	        omit: omit,
	        once: once,
	        or: or,
	        over: over,
	        pair: pair,
	        partial: partial,
	        partialRight: partialRight,
	        partition: partition,
	        path: path,
	        pathEq: pathEq,
	        pathOr: pathOr,
	        pathSatisfies: pathSatisfies,
	        pick: pick,
	        pickAll: pickAll,
	        pickBy: pickBy,
	        pipe: pipe,
	        pipeK: pipeK,
	        pipeP: pipeP,
	        pluck: pluck,
	        prepend: prepend,
	        product: product,
	        project: project,
	        prop: prop,
	        propEq: propEq,
	        propIs: propIs,
	        propOr: propOr,
	        propSatisfies: propSatisfies,
	        props: props,
	        range: range,
	        reduce: reduce,
	        reduceBy: reduceBy,
	        reduceRight: reduceRight,
	        reduceWhile: reduceWhile,
	        reduced: reduced,
	        reject: reject,
	        remove: remove,
	        repeat: repeat,
	        replace: replace,
	        reverse: reverse,
	        scan: scan,
	        sequence: sequence,
	        set: set,
	        slice: slice,
	        sort: sort,
	        sortBy: sortBy,
	        split: split,
	        splitAt: splitAt,
	        splitEvery: splitEvery,
	        splitWhen: splitWhen,
	        subtract: subtract,
	        sum: sum,
	        symmetricDifference: symmetricDifference,
	        symmetricDifferenceWith: symmetricDifferenceWith,
	        tail: tail,
	        take: take,
	        takeLast: takeLast,
	        takeLastWhile: takeLastWhile,
	        takeWhile: takeWhile,
	        tap: tap,
	        test: test,
	        times: times,
	        toLower: toLower,
	        toPairs: toPairs,
	        toPairsIn: toPairsIn,
	        toString: toString,
	        toUpper: toUpper,
	        transduce: transduce,
	        transpose: transpose,
	        traverse: traverse,
	        trim: trim,
	        tryCatch: tryCatch,
	        type: type,
	        unapply: unapply,
	        unary: unary,
	        uncurryN: uncurryN,
	        unfold: unfold,
	        union: union,
	        unionWith: unionWith,
	        uniq: uniq,
	        uniqBy: uniqBy,
	        uniqWith: uniqWith,
	        unless: unless,
	        unnest: unnest,
	        until: until,
	        update: update,
	        useWith: useWith,
	        values: values,
	        valuesIn: valuesIn,
	        view: view,
	        when: when,
	        where: where,
	        whereEq: whereEq,
	        without: without,
	        wrap: wrap,
	        xprod: xprod,
	        zip: zip,
	        zipObj: zipObj,
	        zipWith: zipWith
	    };
	  /* eslint-env amd */
	
	  /* TEST_ENTRY_POINT */
	
	  if (true) {
	    module.exports = R;
	  } else if (typeof define === 'function' && define.amd) {
	    define(function() { return R; });
	  } else {
	    this.R = R;
	  }
	
	}.call(this));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _objectPath = __webpack_require__(37);
	
	var _objectPath2 = _interopRequireDefault(_objectPath);
	
	var _ramda = __webpack_require__(35);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var nestComponent = function nestComponent(path) {
	  return function (config) {
	    return {
	      initialModel: config.initialModel ? function (model) {
	        _objectPath2.default.set(model, path, (0, _ramda.merge)(_objectPath2.default.get(model, path), config.initialModel({})));
	        return model;
	      } : null,
	      receive: config.receive ? function (model, proposal) {
	        _objectPath2.default.set(model, path, config.receive(_objectPath2.default.get(model, path), proposal));
	        return model;
	      } : null,
	      view: config.view,
	      actions: config.actions,
	      setup: config.setup,
	      postRender: config.postRender ? function (model) {
	        return config.postRender(_objectPath2.default.get(model, path));
	      } : null,
	      ready: config.ready,
	      nextAction: config.nextAction ? function (model, proposal, actions) {
	        return config.nextAction(_objectPath2.default.get(model, path), proposal, actions);
	      } : null
	    };
	  };
	};
	
	exports.default = nestComponent;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
	  'use strict';
	
	  /*istanbul ignore next:cant test*/
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(this, function(){
	  'use strict';
	
	  var toStr = Object.prototype.toString;
	  function hasOwnProperty(obj, prop) {
	    if(obj == null) {
	      return false
	    }
	    //to handle objects with null prototypes (too edge case?)
	    return Object.prototype.hasOwnProperty.call(obj, prop)
	  }
	
	  function isEmpty(value){
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	        return true;
	    } else if (typeof value !== 'string') {
	        for (var i in value) {
	            if (hasOwnProperty(value, i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	  }
	
	  function toString(type){
	    return toStr.call(type);
	  }
	
	  function isObject(obj){
	    return typeof obj === 'object' && toString(obj) === "[object Object]";
	  }
	
	  var isArray = Array.isArray || function(obj){
	    /*istanbul ignore next:cant test*/
	    return toStr.call(obj) === '[object Array]';
	  }
	
	  function isBoolean(obj){
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }
	
	  function getKey(key){
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }
	
	  function factory(options) {
	    options = options || {}
	
	    var objectPath = function(obj) {
	      return Object.keys(objectPath).reduce(function(proxy, prop) {
	        if(prop === 'create') {
	          return proxy;
	        }
	
	        /*istanbul ignore else*/
	        if (typeof objectPath[prop] === 'function') {
	          proxy[prop] = objectPath[prop].bind(objectPath, obj);
	        }
	
	        return proxy;
	      }, {});
	    };
	
	    function getShallowProperty(obj, prop) {
	      if (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop)) {
	        return obj[prop];
	      }
	    }
	
	    function set(obj, path, value, doNotReplace){
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (typeof path === 'string') {
	        return set(obj, path.split('.').map(getKey), value, doNotReplace);
	      }
	      var currentPath = path[0];
	      var currentValue = getShallowProperty(obj, currentPath);
	      if (path.length === 1) {
	        if (currentValue === void 0 || !doNotReplace) {
	          obj[currentPath] = value;
	        }
	        return currentValue;
	      }
	
	      if (currentValue === void 0) {
	        //check if we assume an array
	        if(typeof path[1] === 'number') {
	          obj[currentPath] = [];
	        } else {
	          obj[currentPath] = {};
	        }
	      }
	
	      return set(obj[currentPath], path.slice(1), value, doNotReplace);
	    }
	
	    objectPath.has = function (obj, path) {
	      if (typeof path === 'number') {
	        path = [path];
	      } else if (typeof path === 'string') {
	        path = path.split('.');
	      }
	
	      if (!path || path.length === 0) {
	        return !!obj;
	      }
	
	      for (var i = 0; i < path.length; i++) {
	        var j = getKey(path[i]);
	
	        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
	          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
	          obj = obj[j];
	        } else {
	          return false;
	        }
	      }
	
	      return true;
	    };
	
	    objectPath.ensureExists = function (obj, path, value){
	      return set(obj, path, value, true);
	    };
	
	    objectPath.set = function (obj, path, value, doNotReplace){
	      return set(obj, path, value, doNotReplace);
	    };
	
	    objectPath.insert = function (obj, path, value, at){
	      var arr = objectPath.get(obj, path);
	      at = ~~at;
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }
	      arr.splice(at, 0, value);
	    };
	
	    objectPath.empty = function(obj, path) {
	      if (isEmpty(path)) {
	        return void 0;
	      }
	      if (obj == null) {
	        return void 0;
	      }
	
	      var value, i;
	      if (!(value = objectPath.get(obj, path))) {
	        return void 0;
	      }
	
	      if (typeof value === 'string') {
	        return objectPath.set(obj, path, '');
	      } else if (isBoolean(value)) {
	        return objectPath.set(obj, path, false);
	      } else if (typeof value === 'number') {
	        return objectPath.set(obj, path, 0);
	      } else if (isArray(value)) {
	        value.length = 0;
	      } else if (isObject(value)) {
	        for (i in value) {
	          if (hasOwnProperty(value, i)) {
	            delete value[i];
	          }
	        }
	      } else {
	        return objectPath.set(obj, path, null);
	      }
	    };
	
	    objectPath.push = function (obj, path /*, values */){
	      var arr = objectPath.get(obj, path);
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }
	
	      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	    };
	
	    objectPath.coalesce = function (obj, paths, defaultValue) {
	      var value;
	
	      for (var i = 0, len = paths.length; i < len; i++) {
	        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	          return value;
	        }
	      }
	
	      return defaultValue;
	    };
	
	    objectPath.get = function (obj, path, defaultValue){
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (obj == null) {
	        return defaultValue;
	      }
	      if (typeof path === 'string') {
	        return objectPath.get(obj, path.split('.'), defaultValue);
	      }
	
	      var currentPath = getKey(path[0]);
	      var nextObj = getShallowProperty(obj, currentPath)
	      if (nextObj === void 0) {
	        return defaultValue;
	      }
	
	      if (path.length === 1) {
	        return nextObj;
	      }
	
	      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	    };
	
	    objectPath.del = function del(obj, path) {
	      if (typeof path === 'number') {
	        path = [path];
	      }
	
	      if (obj == null) {
	        return obj;
	      }
	
	      if (isEmpty(path)) {
	        return obj;
	      }
	      if(typeof path === 'string') {
	        return objectPath.del(obj, path.split('.'));
	      }
	
	      var currentPath = getKey(path[0]);
	      var currentVal = getShallowProperty(obj, currentPath);
	      if(currentVal == null) {
	        return currentVal;
	      }
	
	      if(path.length === 1) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      } else {
	        if (obj[currentPath] !== void 0) {
	          return objectPath.del(obj[currentPath], path.slice(1));
	        }
	      }
	
	      return obj;
	    }
	
	    return objectPath;
	  }
	
	  var mod = factory();
	  mod.create = factory;
	  mod.withInheritedProps = factory({includeInheritedProps: true})
	  return mod;
	});


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inferno = __webpack_require__(39);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bp2 = _inferno2.default.createBlueprint({
	  tag: "div",
	  className: "col-md-4",
	  children: {
	    arg: 0
	  }
	});
	
	var bp1 = _inferno2.default.createBlueprint({
	  tag: "div",
	  className: "row",
	  children: {
	    arg: 0
	  }
	});
	
	var bp0 = _inferno2.default.createBlueprint({
	  tag: "div",
	  children: {
	    arg: 0
	  }
	});
	
	var view = function view(todoForm, todoList) {
	  return function (model) {
	    return bp0([bp1(bp2(todoForm(model.store.form))), todoList(model.store.list)]);
	  };
	};
	
	exports.default = view;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(40);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno v0.7.27
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Inferno = factory());
	}(this, (function () { 'use strict';
	
	// Runs only once in applications lifetime
	var isBrowser = typeof window !== 'undefined' && window.document;
	
	function isNullOrUndefined(obj) {
		return isUndefined(obj) || isNull(obj);
	}
	
	function isAttrAnEvent$1(attr) {
		return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
	}
	
	function isNull(obj) {
		return obj === null;
	}
	
	function isUndefined(obj) {
		return obj === undefined;
	}
	
	function VNode(blueprint) {
		this.bp = blueprint;
		this.dom = null;
		this.instance = null;
		this.tag = null;
		this.children = null;
		this.style = null;
		this.className = null;
		this.attrs = null;
		this.events = null;
		this.hooks = null;
		this.key = null;
		this.clipData = null;
	}
	
	VNode.prototype = {
		setAttrs: function setAttrs(attrs) {
			this.attrs = attrs;
			return this;
		},
		setTag: function setTag(tag) {
			this.tag = tag;
			return this;
		},
		setStyle: function setStyle(style) {
			this.style = style;
			return this;
		},
		setClassName: function setClassName(className) {
			this.className = className;
			return this;
		},
		setChildren: function setChildren(children) {
			this.children = children;
			return this;
		},
		setHooks: function setHooks(hooks) {
			this.hooks = hooks;
			return this;
		},
		setEvents: function setEvents(events) {
			this.events = events;
			return this;
		},
		setKey: function setKey(key) {
			this.key = key;
			return this;
		}
	};
	
	function createVNode(bp) {
		return new VNode(bp);
	}
	
	function isAttrAnEvent(attr) {
		return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
	}
	
	function isAttrAHook(hook) {
		return hook === 'onCreated'
			|| hook === 'onAttached'
			|| hook === 'onWillDetach'
			|| hook === 'onWillUpdate'
			|| hook === 'onDidUpdate';
	}
	
	function isAttrAComponentHook(hook) {
		return hook === 'onComponentWillMount'
			|| hook === 'onComponentDidMount'
			|| hook === 'onComponentWillUnmount'
			|| hook === 'onComponentShouldUpdate'
			|| hook === 'onComponentWillUpdate'
			|| hook === 'onComponentDidUpdate';
	}
	
	
	function createBlueprint(shape, childrenType) {
		var tag = shape.tag || null;
		var tagIsDynamic = tag && tag.arg !== undefined ? true : false;
	
		var children = isNullOrUndefined(shape.children) ? null : shape.children;
		var childrenIsDynamic = children && children.arg !== undefined ? true : false;
	
		var attrs = shape.attrs || null;
		var attrsIsDynamic = attrs && attrs.arg !== undefined ? true : false;
	
		var hooks = shape.hooks || null;
		var hooksIsDynamic = hooks && hooks.arg !== undefined ? true : false;
	
		var events = shape.events || null;
		var eventsIsDynamic = events && events.arg !== undefined ? true : false;
	
		var key = shape.key === undefined ? null : shape.key;
		var keyIsDynamic = !isNullOrUndefined(key) && !isNullOrUndefined(key.arg);
	
		var style = shape.style || null;
		var styleIsDynamic = style && style.arg !== undefined ? true : false;
	
		var className = shape.className === undefined ? null : shape.className;
		var classNameIsDynamic = className && className.arg !== undefined ? true : false;
	
		var spread = shape.spread === undefined ? null : shape.spread;
		var hasSpread = shape.spread !== undefined;
	
		var blueprint = {
			lazy: shape.lazy || false,
			dom: null,
			pool: [],
			tag: tagIsDynamic ? null : tag,
			className: className !== '' && className ? className : null,
			style: style !== '' && style ? style : null,
			isComponent: tagIsDynamic,
			hasAttrs: attrsIsDynamic || (attrs ? true : false),
			hasHooks: hooksIsDynamic,
			hasEvents: eventsIsDynamic,
			hasStyle: styleIsDynamic || (style !== '' && style ? true : false),
			hasClassName: classNameIsDynamic || (className !== '' && className ? true : false),
			childrenType: childrenType === undefined ? (children ? 5 : 0) : childrenType,
			attrKeys: null,
			eventKeys: null,
			isSVG: shape.isSVG || false
		};
	
		return function () {
			var vNode = new VNode(blueprint);
	
			if (tagIsDynamic === true) {
				vNode.tag = arguments[tag.arg];
			}
			if (childrenIsDynamic === true) {
				vNode.children = arguments[children.arg];
			}
			if (hasSpread) {
				var _spread = arguments[spread.arg];
				var attrs$1;
				var events$1;
				var hooks$1;
				var attrKeys = [];
				var eventKeys = [];
	
				for (var prop in _spread) {
					var value = _spread[prop];
	
					if (prop === 'className' || (prop === 'class' && !blueprint.isSVG)) {
						vNode.className = value;
						blueprint.hasClassName = true;
					} else if (prop === 'style') {
						vNode.style = value;
						blueprint.hasStyle = true;
					} else if (prop === 'key') {
						vNode.key = value;
					} else if (isAttrAHook(prop) || isAttrAComponentHook(prop)) {
						if (!hooks$1) {
							hooks$1 = {};
						}
						hooks$1[prop[2].toLowerCase() + prop.substring(3)] = value;
					} else if (isAttrAnEvent(prop)) {
						if (!events$1) {
							events$1 = {};
						}
						eventKeys.push(prop.toLowerCase());
						events$1[prop.toLowerCase()] = value;
					} else if (prop === 'children') {
						vNode.children = value;
						blueprint.childrenType = blueprint.childrenType || 5;
					} else {
						if (!attrs$1) {
							attrs$1 = {};
						}
						attrKeys.push(prop);
						attrs$1[prop] = value;
					}
				}
				if (attrs$1) {
					vNode.attrs = attrs$1;
					blueprint.attrKeys = attrKeys;
					blueprint.hasAttrs = true;
				}
				if (events$1) {
					vNode.events = events$1;
					blueprint.eventKeys = eventKeys;
					blueprint.hasEvents = true;
				}
				if (hooks$1) {
					vNode.hooks = hooks$1;
					blueprint.hasHooks = true;
				}
			} else {
				if (attrsIsDynamic === true) {
					vNode.attrs = arguments[attrs.arg];
				} else {
					vNode.attrs = attrs;
				}
				if (hooksIsDynamic === true) {
					vNode.hooks = arguments[hooks.arg];
				}
				if (eventsIsDynamic === true) {
					vNode.events = arguments[events.arg];
				}
				if (keyIsDynamic === true) {
					vNode.key = arguments[key.arg];
				} else {
					vNode.key = key;
				}
				if (styleIsDynamic === true) {
					vNode.style = arguments[style.arg];
				} else {
					vNode.style = blueprint.style;
				}
				if (classNameIsDynamic === true) {
					vNode.className = arguments[className.arg];
				} else {
					vNode.className = blueprint.className;
				}
			}
			return vNode;
		};
	}
	
	function VText(text) {
		this.text = text;
		this.dom = null;
	}
	
	function createVText(text) {
		return new VText(text);
	}
	
	// Copy of the util from dom/util, otherwise it makes massive bundles
	function documentCreateElement(tag, isSVG) {
		var dom;
	
		if (isSVG === true) {
			dom = document.createElementNS('http://www.w3.org/2000/svg', tag);
		} else {
			dom = document.createElement(tag);
		}
		return dom;
	}
	
	function createUniversalElement(tag, attrs, isSVG) {
		if (isBrowser) {
			var dom = documentCreateElement(tag, isSVG);
			if (attrs) {
				createStaticAttributes(attrs, dom);
			}
			return dom;
		}
		return null;
	}
	
	function createStaticAttributes(attrs, dom) {
		var attrKeys = Object.keys(attrs);
	
		for (var i = 0; i < attrKeys.length; i++) {
			var attr = attrKeys[i];
			var value = attrs[attr];
	
			if (attr === 'className') {
				dom.className = value;
			} else {
				if (value === true) {
					dom.setAttribute(attr, attr);
				} else if (!isNullOrUndefined(value) && value !== false && !isAttrAnEvent$1(attr)) {
					dom.setAttribute(attr, value);
				}
			}
		}
	}
	
	var index = {
		createBlueprint: createBlueprint,
		createVNode: createVNode,
		createVText: createVText,
		universal: {
			createElement: createUniversalElement
		}
	};
	
	return index;
	
	})));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _data = __webpack_require__(42);
	
	var _ramda = __webpack_require__(35);
	
	var _ajaxAxios = __webpack_require__(44);
	
	var _ajaxAxios2 = _interopRequireDefault(_ajaxAxios);
	
	var _todoUrl = __webpack_require__(68);
	
	var _todoUrl2 = _interopRequireDefault(_todoUrl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var intoModel = function intoModel(todos) {
	  return { todos: todos, message: "" };
	};
	
	// loadTodosHttp : Task Http.Error Model
	var loadTodosHttp = _ajaxAxios2.default.getJSON(_todoUrl2.default.get).then(intoModel);
	
	// deleteTodoHttp : Number -> Task Http.Error Number
	var deleteTodoHttp = function deleteTodoHttp(todoId) {
	  return _ajaxAxios2.default.deleteJSON(_todoUrl2.default.delete(todoId)).then((0, _ramda.always)(todoId));
	};
	
	// errorMessage : Http.Error -> Task Never Model
	var errorMessage = (0, _ramda.always)({ todos: [], message: "An error occurred." });
	
	// loadTodos : Task Never Model
	var loadTodos = loadTodosHttp.catch(errorMessage);
	
	// nothingTask : Http.Error -> Task Never (Maybe Number)
	var nothingTask = (0, _ramda.always)((0, _data.Nothing)());
	
	// deleteTodo : Number -> Task Never (Maybe Number)
	var deleteTodo = function deleteTodo(todoId) {
	  return deleteTodoHttp(todoId).then(_data.Just).catch(nothingTask);
	};
	
	// saveTodoHttp : Todo -> Task Http.Error Todo
	var saveTodoHttp = function saveTodoHttp(todo) {
	  return _ajaxAxios2.default.postJSON(_todoUrl2.default.save, todo);
	};
	
	// saveTodo : Todo -> Task Never (Maybe Todo)
	var saveTodo = function saveTodo(todo) {
	  return saveTodoHttp(todo).then(_data.Just).catch(nothingTask);
	};
	
	var services = { loadTodos: loadTodos, deleteTodo: deleteTodo, saveTodo: saveTodo };
	
	exports.default = services;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
	//
	// Permission is hereby granted, free of charge, to any person
	// obtaining a copy of this software and associated documentation files
	// (the "Software"), to deal in the Software without restriction,
	// including without limitation the rights to use, copy, modify, merge,
	// publish, distribute, sublicense, and/or sell copies of the Software,
	// and to permit persons to whom the Software is furnished to do so,
	// subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be
	// included in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = __webpack_require__(43)

/***/ },
/* 43 */
/***/ function(module, exports) {

	// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
	//
	// Permission is hereby granted, free of charge, to any person
	// obtaining a copy of this software and associated documentation files
	// (the "Software"), to deal in the Software without restriction,
	// including without limitation the rights to use, copy, modify, merge,
	// publish, distribute, sublicense, and/or sell copies of the Software,
	// and to permit persons to whom the Software is furnished to do so,
	// subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be
	// included in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	/**
	 * @module lib/maybe
	 */
	module.exports = Maybe
	
	// -- Aliases ----------------------------------------------------------
	var clone         = Object.create
	var unimplemented = function(){ throw new Error('Not implemented.') }
	var noop          = function(){ return this                         }
	
	// -- Implementation ---------------------------------------------------
	
	/**
	 * A structure for values that may not be present, or computations that may
	 * fail. `Maybe(a)` explicitly models the effects that are implicit in
	 * `Nullable` types, thus has none of the problems associated with
	 * `null` or `undefined` — like `NullPointerExceptions`.
	 *
	 * The class models two different cases:
	 *
	 *  + `Just a` — represents a `Maybe(a)` that contains a value. `a` may
	 *     be any value, including `null` or `undefined`.
	 *
	 *  + `Nothing` — represents a `Maybe(a)` that has no values. Or a
	 *     failure that needs no additional information.
	 *
	 * Common uses of this structure includes modelling values that may or may
	 * not be present in a collection, thus instead of needing a
	 * `collection.has(a)`, the `collection.get(a)` operation gives you all
	 * the information you need — `collection.get(a).is-nothing` being
	 * equivalent to `collection.has(a)`; Similarly the same reasoning may
	 * be applied to computations that may fail to provide a value, e.g.:
	 * `collection.find(predicate)` can safely return a `Maybe(a)` instance,
	 * even if the collection contains nullable values.
	 *
	 * Furthermore, the values of `Maybe(a)` can be combined and manipulated
	 * by using the expressive monadic operations. This allows safely
	 * sequencing operations that may fail, and safely composing values that
	 * you don't know whether they're present or not, failing early
	 * (returning a `Nothing`) if any of the operations fail.
	 *
	 * If one wants to store additional information about failures, the
	 * [Either][] and [Validation][] structures provide such a capability, and
	 * should be used instead of the `Maybe(a)` structure.
	 *
	 * [Either]: https://github.com/folktale/data.either
	 * [Validation]: https://github.com/folktale/data.validation
	 *
	 *
	 * @class
	 */
	function Maybe() {}
	
	// The case for successful values
	Just.prototype = clone(Maybe.prototype)
	function Just(a){
	  this.value = a
	}
	
	// The case for failure values
	Nothing.prototype = clone(Maybe.prototype)
	function Nothing(){}
	
	
	// -- Constructors -----------------------------------------------------
	
	/**
	 * Constructs a new `Maybe[α]` structure with an absent value. Commonly used
	 * to represent a failure.
	 *
	 * @summary Void → Maybe[α]
	 */
	Maybe.Nothing = function() {
	  return new Nothing
	}
	Maybe.prototype.Nothing = Maybe.Nothing
	
	/**
	 * Constructs a new `Maybe[α]` structure that holds the single value
	 * `α`. Commonly used to represent a success.
	 *
	 * `α` can be any value, including `null`, `undefined` or another
	 * `Maybe[α]` structure.
	 *
	 * @summary α → Maybe[α]
	 */
	Maybe.Just = function(a) {
	  return new Just(a)
	}
	Maybe.prototype.Just = Maybe.Just
	
	
	// -- Conversions ------------------------------------------------------
	
	/**
	 * Constructs a new `Maybe[α]` structure from a nullable type.
	 *
	 * If the value is either `null` or `undefined`, this function returns a
	 * `Nothing`, otherwise the value is wrapped in a `Just(α)`.
	 *
	 * @summary α → Maybe[α]
	 */
	Maybe.fromNullable = function(a) {
	  return a != null?       new Just(a)
	  :      /* otherwise */  new Nothing
	}
	Maybe.prototype.fromNullable = Maybe.fromNullable
	
	/**
	 * Constructs a new `Maybe[β]` structure from an `Either[α, β]` type.
	 *
	 * The left side of the `Either` becomes `Nothing`, and the right side
	 * is wrapped in a `Just(β)`.
	 *
	 * @summary Either[α, β] → Maybe[β]
	 */
	Maybe.fromEither = function(a) {
	  return a.fold(Maybe.Nothing, Maybe.Just)
	}
	Maybe.prototype.fromEither = Maybe.fromEither
	
	/**
	 * Constructs a new `Maybe[β]` structure from a `Validation[α, β]` type.
	 *
	 * The failure side of the `Validation` becomes `Nothing`, and the right
	 * side is wrapped in a `Just(β)`.
	 *
	 * @method
	 * @summary Validation[α, β] → Maybe[β]
	 */
	Maybe.fromValidation           = Maybe.fromEither
	Maybe.prototype.fromValidation = Maybe.fromEither
	
	
	// -- Predicates -------------------------------------------------------
	
	/**
	 * True if the `Maybe[α]` structure contains a failure (i.e.: `Nothing`).
	 *
	 * @summary Boolean
	 */
	Maybe.prototype.isNothing   = false
	Nothing.prototype.isNothing = true
	
	
	/**
	 * True if the `Maybe[α]` structure contains a single value (i.e.: `Just(α)`).
	 *
	 * @summary Boolean
	 */
	Maybe.prototype.isJust = false
	Just.prototype.isJust  = true
	
	
	// -- Applicative ------------------------------------------------------
	
	/**
	 * Creates a new `Maybe[α]` structure holding the single value `α`.
	 *
	 * `α` can be any value, including `null`, `undefined`, or another
	 * `Maybe[α]` structure.
	 *
	 * @summary α → Maybe[α]
	 */
	Maybe.of = function(a) {
	  return new Just(a)
	}
	Maybe.prototype.of = Maybe.of
	
	
	/**
	 * Applies the function inside the `Maybe[α]` structure to another
	 * applicative type.
	 *
	 * The `Maybe[α]` structure should contain a function value, otherwise a
	 * `TypeError` is thrown.
	 *
	 * @method
	 * @summary (@Maybe[α → β], f:Applicative[_]) => f[α] → f[β]
	 */
	Maybe.prototype.ap = unimplemented
	
	Nothing.prototype.ap = noop
	
	Just.prototype.ap = function(b) {
	  return b.map(this.value)
	}
	
	
	
	
	// -- Functor ----------------------------------------------------------
	
	/**
	 * Transforms the value of the `Maybe[α]` structure using a regular unary
	 * function.
	 *
	 * @method
	 * @summary @Maybe[α] => (α → β) → Maybe[β]
	 */
	Maybe.prototype.map   = unimplemented
	Nothing.prototype.map = noop
	
	Just.prototype.map = function(f) {
	  return this.of(f(this.value))
	}
	
	
	// -- Chain ------------------------------------------------------------
	
	/**
	 * Transforms the value of the `Maybe[α]` structure using an unary function
	 * to monads.
	 *
	 * @method
	 * @summary (@Maybe[α], m:Monad[_]) => (α → m[β]) → m[β]
	 */
	Maybe.prototype.chain   = unimplemented
	Nothing.prototype.chain = noop
	
	Just.prototype.chain = function(f) {
	  return f(this.value)
	}
	
	
	// -- Show -------------------------------------------------------------
	
	/**
	 * Returns a textual representation of the `Maybe[α]` structure.
	 *
	 * @method
	 * @summary @Maybe[α] => Void → String
	 */
	Maybe.prototype.toString = unimplemented
	
	Nothing.prototype.toString = function() {
	  return 'Maybe.Nothing'
	}
	
	Just.prototype.toString = function() {
	  return 'Maybe.Just(' + this.value + ')'
	}
	
	
	// -- Eq ---------------------------------------------------------------
	
	/**
	 * Tests if a `Maybe[α]` structure is equal to another `Maybe[α]` structure.
	 *
	 * @method
	 * @summary @Maybe[α] => Maybe[α] → Boolean
	 */
	Maybe.prototype.isEqual = unimplemented
	
	Nothing.prototype.isEqual = function(b) {
	  return b.isNothing
	}
	
	Just.prototype.isEqual = function(b) {
	  return b.isJust
	  &&     b.value === this.value
	}
	
	
	// -- Extracting and recovering ----------------------------------------
	
	/**
	 * Extracts the value out of the `Maybe[α]` structure, if it
	 * exists. Otherwise throws a `TypeError`.
	 *
	 * @method
	 * @summary @Maybe[α] => Void → a,      :: partial, throws
	 * @see {@link module:lib/maybe~Maybe#getOrElse} — A getter that can handle failures
	 * @throws {TypeError} if the structure has no value (`Nothing`).
	 */
	Maybe.prototype.get = unimplemented
	
	Nothing.prototype.get = function() {
	  throw new TypeError("Can't extract the value of a Nothing.")
	}
	
	Just.prototype.get = function() {
	  return this.value
	}
	
	
	/**
	 * Extracts the value out of the `Maybe[α]` structure. If there is no value,
	 * returns the given default.
	 *
	 * @method
	 * @summary @Maybe[α] => α → α
	 */
	Maybe.prototype.getOrElse = unimplemented
	
	Nothing.prototype.getOrElse = function(a) {
	  return a
	}
	
	Just.prototype.getOrElse = function(_) {
	  return this.value
	}
	
	
	/**
	 * Transforms a failure into a new `Maybe[α]` structure. Does nothing if the
	 * structure already contains a value.
	 *
	 * @method
	 * @summary @Maybe[α] => (Void → Maybe[α]) → Maybe[α]
	 */
	Maybe.prototype.orElse = unimplemented
	
	Nothing.prototype.orElse = function(f) {
	  return f()
	}
	
	Just.prototype.orElse = function(_) {
	  return this
	}
	
	
	/**
	 * Catamorphism.
	 * 
	 * @method
	 * @summary @Maybe[α] => { Nothing: Void → β, Just: α → β } → β
	 */
	Maybe.prototype.cata = unimplemented
	
	Nothing.prototype.cata = function(pattern) {
	  return pattern.Nothing()
	}
	
	Just.prototype.cata = function(pattern) {
	  return pattern.Just(this.value);
	}
	
	
	/**
	 * JSON serialisation
	 *
	 * @method
	 * @summary @Maybe[α] => Void → Object
	 */
	Maybe.prototype.toJSON = unimplemented
	
	Nothing.prototype.toJSON = function() {
	  return { '#type': 'folktale:Maybe.Nothing' }
	}
	
	Just.prototype.toJSON = function() {
	  return { '#type': 'folktale:Maybe.Just'
	         , value: this.value }
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _axios = __webpack_require__(45);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _ramda = __webpack_require__(35);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ajaxPromise = function ajaxPromise(options) {
	  return (0, _axios2.default)(options).then((0, _ramda.prop)("data"));
	};
	
	var ajax = {
	  getJSON: function getJSON(url) {
	    return ajaxPromise({
	      url: url
	    });
	  },
	
	  postJSON: function postJSON(url, body) {
	    return ajaxPromise({
	      method: "POST",
	      url: url,
	      data: JSON.stringify(body)
	    });
	  },
	
	  deleteJSON: function deleteJSON(url) {
	    return ajaxPromise({
	      method: "DELETE",
	      url: url
	    });
	  }
	};
	
	exports.default = ajax;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(46);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	var bind = __webpack_require__(48);
	var Axios = __webpack_require__(49);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance();
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return createInstance(defaultConfig);
	};
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(67);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(48);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(50);
	var utils = __webpack_require__(47);
	var InterceptorManager = __webpack_require__(52);
	var dispatchRequest = __webpack_require__(53);
	var isAbsoluteURL = __webpack_require__(65);
	var combineURLs = __webpack_require__(66);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 */
	function Axios(defaultConfig) {
	  this.defaults = utils.merge(defaults, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	var normalizeHeaderName = __webpack_require__(51);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	module.exports = {
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(47);
	var transformData = __webpack_require__(55);
	
	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter;
	
	  if (typeof config.adapter === 'function') {
	    // For custom adapter support
	    adapter = config.adapter;
	  } else if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(56);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(56);
	  }
	
	  return Promise.resolve(config)
	    // Wrap synchronous adapter errors and pass configuration
	    .then(adapter)
	    .then(function onFulfilled(response) {
	      // Transform response data
	      response.data = transformData(
	        response.data,
	        response.headers,
	        config.transformResponse
	      );
	
	      return response;
	    }, function onRejected(error) {
	      // Transform response data
	      if (error && error.response) {
	        error.response.data = transformData(
	          error.response.data,
	          error.response.headers,
	          config.transformResponse
	        );
	      }
	
	      return Promise.reject(error);
	    });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ },
/* 54 */
/***/ function(module, exports) {

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
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(47);
	var settle = __webpack_require__(57);
	var buildURL = __webpack_require__(60);
	var parseHeaders = __webpack_require__(61);
	var isURLSameOrigin = __webpack_require__(62);
	var createError = __webpack_require__(58);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(63);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      if (request.status === 0) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(64);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(58);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(59);
	
	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(47);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var todoUrl = {
	  get: "/todoList",
	  save: "/api/saveTodo",
	  delete: function _delete(todoId) {
	    return "/api/deleteTodo/" + String(todoId);
	  }
	};
	
	exports.default = todoUrl;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inferno = __webpack_require__(39);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _formSerialize = __webpack_require__(70);
	
	var _formSerialize2 = _interopRequireDefault(_formSerialize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bp0 = _inferno2.default.createBlueprint({
	  tag: "input",
	  className: "form-control",
	  attrs: {
	    arg: 0
	  },
	  events: {
	    arg: 1
	  }
	});
	
	var bp2 = _inferno2.default.createBlueprint({
	  tag: "span",
	  className: "help-block",
	  children: {
	    arg: 0
	  }
	});
	
	var bp1 = _inferno2.default.createBlueprint({
	  tag: "span",
	  className: "has-error",
	  children: {
	    arg: 0
	  }
	});
	
	var bp4 = _inferno2.default.createBlueprint({
	  tag: "label",
	  attrs: {
	    arg: 0
	  },
	  children: {
	    arg: 1
	  }
	});
	
	var bp3 = _inferno2.default.createBlueprint({
	  tag: "div",
	  className: "form-group",
	  children: {
	    arg: 0
	  }
	});
	
	var bp9 = _inferno2.default.createBlueprint({
	  tag: "button",
	  className: "btn btn-danger btn-xs",
	  events: {
	    arg: 0
	  },
	  children: {
	    arg: 1
	  }
	});
	
	var bp8 = _inferno2.default.createBlueprint({
	  tag: "button",
	  className: "btn btn-primary btn-xs",
	  events: {
	    arg: 0
	  },
	  children: {
	    arg: 1
	  }
	});
	
	var bp7 = _inferno2.default.createBlueprint({
	  tag: "div",
	  children: {
	    arg: 0
	  }
	});
	
	var bp6 = _inferno2.default.createBlueprint({
	  tag: "input",
	  attrs: {
	    arg: 0
	  }
	});
	
	var bp5 = _inferno2.default.createBlueprint({
	  tag: "form",
	  children: {
	    arg: 0
	  }
	});
	
	var view = function view(model, actions) {
	  var getTodo = function getTodo(evt) {
	    return (0, _formSerialize2.default)(evt.target.form, { hash: true, empty: true });
	  };
	
	  var onChangeText = function onChangeText(evt) {
	    return actions.editingTodo(getTodo(evt));
	  };
	
	  var onSave = function onSave(evt) {
	    evt.preventDefault();
	    actions.saveTodo(model.todo);
	  };
	
	  var onCancel = function onCancel(evt) {
	    evt.preventDefault();
	    actions.clearForm();
	  };
	
	  var inputField = function inputField(name, value) {
	    return bp0({
	      type: "text",
	      id: name,
	      name: name,
	      value: value
	    }, {
	      onkeyup: onChangeText
	    });
	  };
	
	  var errorMessage = function errorMessage(error) {
	    return error ? bp1(bp2(error)) : null;
	  };
	
	  var inputDiv = function inputDiv(field, label) {
	    return bp3([bp4({
	      htmlFor: field
	    }, label), inputField(field, model.todo[field]), errorMessage(model.validationErrors[field])]);
	  };
	
	  return bp5([bp6({
	    type: "hidden",
	    name: "id",
	    value: model.todo.id
	  }), inputDiv("priority", "Priority:"), inputDiv("description", "Description:"), bp7([bp8({
	    onclick: onSave
	  }, "Save"), bp9({
	    onclick: onCancel
	  }, "Cancel")])]);
	};
	
	exports.default = view;

/***/ },
/* 70 */
/***/ function(module, exports) {

	// get successful control from form and assemble into object
	// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2
	
	// types which indicate a submit action and are not successful controls
	// these will be ignored
	var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;
	
	// node names which could be successful controls
	var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;
	
	// Matches bracket notation.
	var brackets = /(\[[^\[\]]*\])/g;
	
	// serializes form fields
	// @param form MUST be an HTMLForm element
	// @param options is an optional argument to configure the serialization. Default output
	// with no options specified is a url encoded string
	//    - hash: [true | false] Configure the output type. If true, the output will
	//    be a js object.
	//    - serializer: [function] Optional serializer function to override the default one.
	//    The function takes 3 arguments (result, key, value) and should return new result
	//    hash and url encoded str serializers are provided with this module
	//    - disabled: [true | false]. If true serialize disabled fields.
	//    - empty: [true | false]. If true serialize empty fields
	function serialize(form, options) {
	    if (typeof options != 'object') {
	        options = { hash: !!options };
	    }
	    else if (options.hash === undefined) {
	        options.hash = true;
	    }
	
	    var result = (options.hash) ? {} : '';
	    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);
	
	    var elements = form && form.elements ? form.elements : [];
	
	    //Object store each radio and set if it's empty or not
	    var radio_store = Object.create(null);
	
	    for (var i=0 ; i<elements.length ; ++i) {
	        var element = elements[i];
	
	        // ingore disabled fields
	        if ((!options.disabled && element.disabled) || !element.name) {
	            continue;
	        }
	        // ignore anyhting that is not considered a success field
	        if (!k_r_success_contrls.test(element.nodeName) ||
	            k_r_submitter.test(element.type)) {
	            continue;
	        }
	
	        var key = element.name;
	        var val = element.value;
	
	        // we can't just use element.value for checkboxes cause some browsers lie to us
	        // they say "on" for value when the box isn't checked
	        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
	            val = undefined;
	        }
	
	        // If we want empty elements
	        if (options.empty) {
	            // for checkbox
	            if (element.type === 'checkbox' && !element.checked) {
	                val = '';
	            }
	
	            // for radio
	            if (element.type === 'radio') {
	                if (!radio_store[element.name] && !element.checked) {
	                    radio_store[element.name] = false;
	                }
	                else if (element.checked) {
	                    radio_store[element.name] = true;
	                }
	            }
	
	            // if options empty is true, continue only if its radio
	            if (!val && element.type == 'radio') {
	                continue;
	            }
	        }
	        else {
	            // value-less fields are ignored unless options.empty is true
	            if (!val) {
	                continue;
	            }
	        }
	
	        // multi select boxes
	        if (element.type === 'select-multiple') {
	            val = [];
	
	            var selectOptions = element.options;
	            var isSelectedOptions = false;
	            for (var j=0 ; j<selectOptions.length ; ++j) {
	                var option = selectOptions[j];
	                var allowedEmpty = options.empty && !option.value;
	                var hasValue = (option.value || allowedEmpty);
	                if (option.selected && hasValue) {
	                    isSelectedOptions = true;
	
	                    // If using a hash serializer be sure to add the
	                    // correct notation for an array in the multi-select
	                    // context. Here the name attribute on the select element
	                    // might be missing the trailing bracket pair. Both names
	                    // "foo" and "foo[]" should be arrays.
	                    if (options.hash && key.slice(key.length - 2) !== '[]') {
	                        result = serializer(result, key + '[]', option.value);
	                    }
	                    else {
	                        result = serializer(result, key, option.value);
	                    }
	                }
	            }
	
	            // Serialize if no selected options and options.empty is true
	            if (!isSelectedOptions && options.empty) {
	                result = serializer(result, key, '');
	            }
	
	            continue;
	        }
	
	        result = serializer(result, key, val);
	    }
	
	    // Check for all empty radio buttons and serialize them with key=""
	    if (options.empty) {
	        for (var key in radio_store) {
	            if (!radio_store[key]) {
	                result = serializer(result, key, '');
	            }
	        }
	    }
	
	    return result;
	}
	
	function parse_keys(string) {
	    var keys = [];
	    var prefix = /^([^\[\]]*)/;
	    var children = new RegExp(brackets);
	    var match = prefix.exec(string);
	
	    if (match[1]) {
	        keys.push(match[1]);
	    }
	
	    while ((match = children.exec(string)) !== null) {
	        keys.push(match[1]);
	    }
	
	    return keys;
	}
	
	function hash_assign(result, keys, value) {
	    if (keys.length === 0) {
	        result = value;
	        return result;
	    }
	
	    var key = keys.shift();
	    var between = key.match(/^\[(.+?)\]$/);
	
	    if (key === '[]') {
	        result = result || [];
	
	        if (Array.isArray(result)) {
	            result.push(hash_assign(null, keys, value));
	        }
	        else {
	            // This might be the result of bad name attributes like "[][foo]",
	            // in this case the original `result` object will already be
	            // assigned to an object literal. Rather than coerce the object to
	            // an array, or cause an exception the attribute "_values" is
	            // assigned as an array.
	            result._values = result._values || [];
	            result._values.push(hash_assign(null, keys, value));
	        }
	
	        return result;
	    }
	
	    // Key is an attribute name and can be assigned directly.
	    if (!between) {
	        result[key] = hash_assign(result[key], keys, value);
	    }
	    else {
	        var string = between[1];
	        // +var converts the variable into a number
	        // better than parseInt because it doesn't truncate away trailing
	        // letters and actually fails if whole thing is not a number
	        var index = +string;
	
	        // If the characters between the brackets is not a number it is an
	        // attribute name and can be assigned directly.
	        if (isNaN(index)) {
	            result = result || {};
	            result[string] = hash_assign(result[string], keys, value);
	        }
	        else {
	            result = result || [];
	            result[index] = hash_assign(result[index], keys, value);
	        }
	    }
	
	    return result;
	}
	
	// Object/hash encoding serializer.
	function hash_serializer(result, key, value) {
	    var matches = key.match(brackets);
	
	    // Has brackets? Use the recursive assignment function to walk the keys,
	    // construct any missing objects in the result tree and make the assignment
	    // at the end of the chain.
	    if (matches) {
	        var keys = parse_keys(key);
	        hash_assign(result, keys, value);
	    }
	    else {
	        // Non bracket notation can make assignments directly.
	        var existing = result[key];
	
	        // If the value has been assigned already (for instance when a radio and
	        // a checkbox have the same name attribute) convert the previous value
	        // into an array before pushing into it.
	        //
	        // NOTE: If this requirement were removed all hash creation and
	        // assignment could go through `hash_assign`.
	        if (existing) {
	            if (!Array.isArray(existing)) {
	                result[key] = [ existing ];
	            }
	
	            result[key].push(value);
	        }
	        else {
	            result[key] = value;
	        }
	    }
	
	    return result;
	}
	
	// urlform encoding serializer
	function str_serialize(result, key, value) {
	    // encode newlines as \r\n cause the html spec says so
	    value = value.replace(/(\r)?\n/g, '\r\n');
	    value = encodeURIComponent(value);
	
	    // spaces should be '+' rather than '%20'.
	    value = value.replace(/%20/g, '+');
	    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
	}
	
	module.exports = serialize;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _model = __webpack_require__(72);
	
	var _actions = __webpack_require__(73);
	
	var _receive = __webpack_require__(74);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	var _nextAction = __webpack_require__(79);
	
	var _nextAction2 = _interopRequireDefault(_nextAction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var todoFormConfig = function todoFormConfig(_ref) {
	  var services = _ref.services;
	  var view = _ref.view;
	  var setup = _ref.setup;
	
	  return {
	    Action: _actions.Action,
	    config: {
	      initialModel: _model.initialModel,
	      actions: (0, _actions.createActions)(services),
	      receive: _receive2.default,
	      nextAction: _nextAction2.default,
	      view: view,
	      setup: setup
	    }
	  };
	};
	
	exports.default = todoFormConfig;

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var emptyTodo = function emptyTodo() {
	  return {
	    id: "",
	    priority: "",
	    description: ""
	  };
	};
	
	var initialModel = function initialModel(model) {
	  return Object.assign(model, {
	    todo: emptyTodo(),
	    validationErrors: {}
	  });
	};
	
	exports.initialModel = initialModel;
	exports.emptyTodo = emptyTodo;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createActions = exports.Action = undefined;
	
	var _unionType = __webpack_require__(2);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Action = (0, _unionType2.default)({
	  EditTodo: [Object],
	  EditingTodo: [Object],
	  ClearForm: [],
	  ValidateTodo: [Object],
	  RequestSaveTodo: [],
	  SavedTodo: [Object]
	});
	
	var createActions = function createActions(services) {
	  return function (propose) {
	    return {
	      editTodo: function editTodo(todo) {
	        return propose(Action.EditTodo(todo));
	      },
	
	      editingTodo: function editingTodo(todo) {
	        return propose(Action.EditingTodo(todo));
	      },
	
	      saveTodo: function saveTodo(todo) {
	        propose(Action.ValidateTodo(todo));
	      },
	
	      requestSaveTodo: function requestSaveTodo(todo) {
	        propose(Action.RequestSaveTodo());
	        services.saveTodo(todo).then(function (savedTodo) {
	          return propose(Action.SavedTodo(savedTodo));
	        });
	      },
	
	      clearForm: function clearForm() {
	        return propose(Action.ClearForm());
	      }
	    };
	  };
	};
	
	exports.Action = Action;
	exports.createActions = createActions;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ramda = __webpack_require__(35);
	
	var _model = __webpack_require__(72);
	
	var _validation = __webpack_require__(75);
	
	var _validation2 = _interopRequireDefault(_validation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var receive = function receive(model, proposal) {
	  var modelUpdate = proposal.case({
	    EditTodo: function EditTodo(todo) {
	      return { todo: todo, validationErrors: {} };
	    },
	    EditingTodo: function EditingTodo(todo) {
	      return { todo: todo };
	    },
	    ValidateTodo: function ValidateTodo(todo) {
	      return { validationErrors: (0, _validation2.default)(todo) };
	    },
	    ClearForm: function ClearForm() {
	      return { todo: (0, _model.emptyTodo)(), validationErrors: {} };
	    },
	
	    _: function _() {
	      return null;
	    }
	  });
	
	  if (modelUpdate) {
	    return (0, _ramda.merge)(model, modelUpdate);
	  }
	  return model;
	};
	
	exports.default = receive;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (model) {
	  return (0, _validate2.default)(model, validationSpec) || {};
	};
	
	var _validate = __webpack_require__(76);
	
	var _validate2 = _interopRequireDefault(_validate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validationSpec = {
	  id: {
	    numericality: {
	      onlyInteger: true,
	      greaterThan: 0
	    }
	  },
	  description: {
	    presence: true,
	    length: {
	      maximum: 50
	    }
	  },
	  priority: {
	    presence: true,
	    numericality: {
	      onlyInteger: true,
	      greaterThan: 0,
	      lessThanOrEqualTo: 10
	    }
	  }
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * validate.js 0.10.0
	 *
	 * (c) 2013-2016 Nicklas Ansman, 2013 Wrapp
	 * Validate.js may be freely distributed under the MIT license.
	 * For all details and documentation:
	 * http://validatejs.org/
	 */
	
	(function(exports, module, define) {
	  "use strict";
	
	  // The main function that calls the validators specified by the constraints.
	  // The options are the following:
	  //   - format (string) - An option that controls how the returned value is formatted
	  //     * flat - Returns a flat array of just the error messages
	  //     * grouped - Returns the messages grouped by attribute (default)
	  //     * detailed - Returns an array of the raw validation data
	  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
	  //
	  // Please note that the options are also passed to each validator.
	  var validate = function(attributes, constraints, options) {
	    options = v.extend({}, v.options, options);
	
	    var results = v.runValidations(attributes, constraints, options)
	      , attr
	      , validator;
	
	    for (attr in results) {
	      for (validator in results[attr]) {
	        if (v.isPromise(results[attr][validator])) {
	          throw new Error("Use validate.async if you want support for promises");
	        }
	      }
	    }
	    return validate.processValidationResults(results, options);
	  };
	
	  var v = validate;
	
	  // Copies over attributes from one or more sources to a single destination.
	  // Very much similar to underscore's extend.
	  // The first argument is the target object and the remaining arguments will be
	  // used as sources.
	  v.extend = function(obj) {
	    [].slice.call(arguments, 1).forEach(function(source) {
	      for (var attr in source) {
	        obj[attr] = source[attr];
	      }
	    });
	    return obj;
	  };
	
	  v.extend(validate, {
	    // This is the version of the library as a semver.
	    // The toString function will allow it to be coerced into a string
	    version: {
	      major: 0,
	      minor: 10,
	      patch: 0,
	      metadata: null,
	      toString: function() {
	        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
	        if (!v.isEmpty(v.version.metadata)) {
	          version += "+" + v.version.metadata;
	        }
	        return version;
	      }
	    },
	
	    // Below is the dependencies that are used in validate.js
	
	    // The constructor of the Promise implementation.
	    // If you are using Q.js, RSVP or any other A+ compatible implementation
	    // override this attribute to be the constructor of that promise.
	    // Since jQuery promises aren't A+ compatible they won't work.
	    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */ null,
	
	    EMPTY_STRING_REGEXP: /^\s*$/,
	
	    // Runs the validators specified by the constraints object.
	    // Will return an array of the format:
	    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
	    runValidations: function(attributes, constraints, options) {
	      var results = []
	        , attr
	        , validatorName
	        , value
	        , validators
	        , validator
	        , validatorOptions
	        , error;
	
	      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
	        attributes = v.collectFormValues(attributes);
	      }
	
	      // Loops through each constraints, finds the correct validator and run it.
	      for (attr in constraints) {
	        value = v.getDeepObjectValue(attributes, attr);
	        // This allows the constraints for an attribute to be a function.
	        // The function will be called with the value, attribute name, the complete dict of
	        // attributes as well as the options and constraints passed in.
	        // This is useful when you want to have different
	        // validations depending on the attribute value.
	        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);
	
	        for (validatorName in validators) {
	          validator = v.validators[validatorName];
	
	          if (!validator) {
	            error = v.format("Unknown validator %{name}", {name: validatorName});
	            throw new Error(error);
	          }
	
	          validatorOptions = validators[validatorName];
	          // This allows the options to be a function. The function will be
	          // called with the value, attribute name, the complete dict of
	          // attributes as well as the options and constraints passed in.
	          // This is useful when you want to have different
	          // validations depending on the attribute value.
	          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
	          if (!validatorOptions) {
	            continue;
	          }
	          results.push({
	            attribute: attr,
	            value: value,
	            validator: validatorName,
	            globalOptions: options,
	            attributes: attributes,
	            options: validatorOptions,
	            error: validator.call(validator,
	                value,
	                validatorOptions,
	                attr,
	                attributes,
	                options)
	          });
	        }
	      }
	
	      return results;
	    },
	
	    // Takes the output from runValidations and converts it to the correct
	    // output format.
	    processValidationResults: function(errors, options) {
	      var attr;
	
	      errors = v.pruneEmptyErrors(errors, options);
	      errors = v.expandMultipleErrors(errors, options);
	      errors = v.convertErrorMessages(errors, options);
	
	      switch (options.format || "grouped") {
	        case "detailed":
	          // Do nothing more to the errors
	          break;
	
	        case "flat":
	          errors = v.flattenErrorsToArray(errors);
	          break;
	
	        case "grouped":
	          errors = v.groupErrorsByAttribute(errors);
	          for (attr in errors) {
	            errors[attr] = v.flattenErrorsToArray(errors[attr]);
	          }
	          break;
	
	        default:
	          throw new Error(v.format("Unknown format %{format}", options));
	      }
	
	      return v.isEmpty(errors) ? undefined : errors;
	    },
	
	    // Runs the validations with support for promises.
	    // This function will return a promise that is settled when all the
	    // validation promises have been completed.
	    // It can be called even if no validations returned a promise.
	    async: function(attributes, constraints, options) {
	      options = v.extend({}, v.async.options, options);
	
	      var WrapErrors = options.wrapErrors || function(errors) {
	        return errors;
	      };
	
	      // Removes unknown attributes
	      if (options.cleanAttributes !== false) {
	        attributes = v.cleanAttributes(attributes, constraints);
	      }
	
	      var results = v.runValidations(attributes, constraints, options);
	
	      return new v.Promise(function(resolve, reject) {
	        v.waitForResults(results).then(function() {
	          var errors = v.processValidationResults(results, options);
	          if (errors) {
	            reject(new WrapErrors(errors, options, attributes, constraints));
	          } else {
	            resolve(attributes);
	          }
	        }, function(err) {
	          reject(err);
	        });
	      });
	    },
	
	    single: function(value, constraints, options) {
	      options = v.extend({}, v.single.options, options, {
	        format: "flat",
	        fullMessages: false
	      });
	      return v({single: value}, {single: constraints}, options);
	    },
	
	    // Returns a promise that is resolved when all promises in the results array
	    // are settled. The promise returned from this function is always resolved,
	    // never rejected.
	    // This function modifies the input argument, it replaces the promises
	    // with the value returned from the promise.
	    waitForResults: function(results) {
	      // Create a sequence of all the results starting with a resolved promise.
	      return results.reduce(function(memo, result) {
	        // If this result isn't a promise skip it in the sequence.
	        if (!v.isPromise(result.error)) {
	          return memo;
	        }
	
	        return memo.then(function() {
	          return result.error.then(
	            function(error) {
	              result.error = error || null;
	            },
	            function(error) {
	              if (error instanceof Error) {
	                throw error;
	              }
	              v.error("Rejecting promises with the result is deprecated. Please use the resolve callback instead.");
	              result.error = error;
	            }
	          );
	        });
	      }, new v.Promise(function(r) { r(); })); // A resolved promise
	    },
	
	    // If the given argument is a call: function the and: function return the value
	    // otherwise just return the value. Additional arguments will be passed as
	    // arguments to the function.
	    // Example:
	    // ```
	    // result('foo') // 'foo'
	    // result(Math.max, 1, 2) // 2
	    // ```
	    result: function(value) {
	      var args = [].slice.call(arguments, 1);
	      if (typeof value === 'function') {
	        value = value.apply(null, args);
	      }
	      return value;
	    },
	
	    // Checks if the value is a number. This function does not consider NaN a
	    // number like many other `isNumber` functions do.
	    isNumber: function(value) {
	      return typeof value === 'number' && !isNaN(value);
	    },
	
	    // Returns false if the object is not a function
	    isFunction: function(value) {
	      return typeof value === 'function';
	    },
	
	    // A simple check to verify that the value is an integer. Uses `isNumber`
	    // and a simple modulo check.
	    isInteger: function(value) {
	      return v.isNumber(value) && value % 1 === 0;
	    },
	
	    // Checks if the value is a boolean
	    isBoolean: function(value) {
	      return typeof value === 'boolean';
	    },
	
	    // Uses the `Object` function to check if the given argument is an object.
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	
	    // Simply checks if the object is an instance of a date
	    isDate: function(obj) {
	      return obj instanceof Date;
	    },
	
	    // Returns false if the object is `null` of `undefined`
	    isDefined: function(obj) {
	      return obj !== null && obj !== undefined;
	    },
	
	    // Checks if the given argument is a promise. Anything with a `then`
	    // function is considered a promise.
	    isPromise: function(p) {
	      return !!p && v.isFunction(p.then);
	    },
	
	    isJqueryElement: function(o) {
	      return o && v.isString(o.jquery);
	    },
	
	    isDomElement: function(o) {
	      if (!o) {
	        return false;
	      }
	
	      if (!o.querySelectorAll || !o.querySelector) {
	        return false;
	      }
	
	      if (v.isObject(document) && o === document) {
	        return true;
	      }
	
	      // http://stackoverflow.com/a/384380/699304
	      /* istanbul ignore else */
	      if (typeof HTMLElement === "object") {
	        return o instanceof HTMLElement;
	      } else {
	        return o &&
	          typeof o === "object" &&
	          o !== null &&
	          o.nodeType === 1 &&
	          typeof o.nodeName === "string";
	      }
	    },
	
	    isEmpty: function(value) {
	      var attr;
	
	      // Null and undefined are empty
	      if (!v.isDefined(value)) {
	        return true;
	      }
	
	      // functions are non empty
	      if (v.isFunction(value)) {
	        return false;
	      }
	
	      // Whitespace only strings are empty
	      if (v.isString(value)) {
	        return v.EMPTY_STRING_REGEXP.test(value);
	      }
	
	      // For arrays we use the length property
	      if (v.isArray(value)) {
	        return value.length === 0;
	      }
	
	      // Dates have no attributes but aren't empty
	      if (v.isDate(value)) {
	        return false;
	      }
	
	      // If we find at least one property we consider it non empty
	      if (v.isObject(value)) {
	        for (attr in value) {
	          return false;
	        }
	        return true;
	      }
	
	      return false;
	    },
	
	    // Formats the specified strings with the given values like so:
	    // ```
	    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
	    // ```
	    // If you want to write %{...} without having it replaced simply
	    // prefix it with % like this `Foo: %%{foo}` and it will be returned
	    // as `"Foo: %{foo}"`
	    format: v.extend(function(str, vals) {
	      if (!v.isString(str)) {
	        return str;
	      }
	      return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
	        if (m1 === '%') {
	          return "%{" + m2 + "}";
	        } else {
	          return String(vals[m2]);
	        }
	      });
	    }, {
	      // Finds %{key} style patterns in the given string
	      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
	    }),
	
	    // "Prettifies" the given string.
	    // Prettifying means replacing [.\_-] with spaces as well as splitting
	    // camel case words.
	    prettify: function(str) {
	      if (v.isNumber(str)) {
	        // If there are more than 2 decimals round it to two
	        if ((str * 100) % 1 === 0) {
	          return "" + str;
	        } else {
	          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
	        }
	      }
	
	      if (v.isArray(str)) {
	        return str.map(function(s) { return v.prettify(s); }).join(", ");
	      }
	
	      if (v.isObject(str)) {
	        return str.toString();
	      }
	
	      // Ensure the string is actually a string
	      str = "" + str;
	
	      return str
	        // Splits keys separated by periods
	        .replace(/([^\s])\.([^\s])/g, '$1 $2')
	        // Removes backslashes
	        .replace(/\\+/g, '')
	        // Replaces - and - with space
	        .replace(/[_-]/g, ' ')
	        // Splits camel cased words
	        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
	          return "" + m1 + " " + m2.toLowerCase();
	        })
	        .toLowerCase();
	    },
	
	    stringifyValue: function(value) {
	      return v.prettify(value);
	    },
	
	    isString: function(value) {
	      return typeof value === 'string';
	    },
	
	    isArray: function(value) {
	      return {}.toString.call(value) === '[object Array]';
	    },
	
	    // Checks if the object is a hash, which is equivalent to an object that
	    // is neither an array nor a function.
	    isHash: function(value) {
	      return v.isObject(value) && !v.isArray(value) && !v.isFunction(value);
	    },
	
	    contains: function(obj, value) {
	      if (!v.isDefined(obj)) {
	        return false;
	      }
	      if (v.isArray(obj)) {
	        return obj.indexOf(value) !== -1;
	      }
	      return value in obj;
	    },
	
	    unique: function(array) {
	      if (!v.isArray(array)) {
	        return array;
	      }
	      return array.filter(function(el, index, array) {
	        return array.indexOf(el) == index;
	      });
	    },
	
	    forEachKeyInKeypath: function(object, keypath, callback) {
	      if (!v.isString(keypath)) {
	        return undefined;
	      }
	
	      var key = ""
	        , i
	        , escape = false;
	
	      for (i = 0; i < keypath.length; ++i) {
	        switch (keypath[i]) {
	          case '.':
	            if (escape) {
	              escape = false;
	              key += '.';
	            } else {
	              object = callback(object, key, false);
	              key = "";
	            }
	            break;
	
	          case '\\':
	            if (escape) {
	              escape = false;
	              key += '\\';
	            } else {
	              escape = true;
	            }
	            break;
	
	          default:
	            escape = false;
	            key += keypath[i];
	            break;
	        }
	      }
	
	      return callback(object, key, true);
	    },
	
	    getDeepObjectValue: function(obj, keypath) {
	      if (!v.isObject(obj)) {
	        return undefined;
	      }
	
	      return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
	        if (v.isObject(obj)) {
	          return obj[key];
	        }
	      });
	    },
	
	    // This returns an object with all the values of the form.
	    // It uses the input name as key and the value as value
	    // So for example this:
	    // <input type="text" name="email" value="foo@bar.com" />
	    // would return:
	    // {email: "foo@bar.com"}
	    collectFormValues: function(form, options) {
	      var values = {}
	        , i
	        , input
	        , inputs
	        , value;
	
	      if (v.isJqueryElement(form)) {
	        form = form[0];
	      }
	
	      if (!form) {
	        return values;
	      }
	
	      options = options || {};
	
	      inputs = form.querySelectorAll("input[name], textarea[name]");
	      for (i = 0; i < inputs.length; ++i) {
	        input = inputs.item(i);
	
	        if (v.isDefined(input.getAttribute("data-ignored"))) {
	          continue;
	        }
	
	        value = v.sanitizeFormValue(input.value, options);
	        if (input.type === "number") {
	          value = value ? +value : null;
	        } else if (input.type === "checkbox") {
	          if (input.attributes.value) {
	            if (!input.checked) {
	              value = values[input.name] || null;
	            }
	          } else {
	            value = input.checked;
	          }
	        } else if (input.type === "radio") {
	          if (!input.checked) {
	            value = values[input.name] || null;
	          }
	        }
	        values[input.name] = value;
	      }
	
	      inputs = form.querySelectorAll("select[name]");
	      for (i = 0; i < inputs.length; ++i) {
	        input = inputs.item(i);
	        value = v.sanitizeFormValue(input.options[input.selectedIndex].value, options);
	        values[input.name] = value;
	      }
	
	      return values;
	    },
	
	    sanitizeFormValue: function(value, options) {
	      if (options.trim && v.isString(value)) {
	        value = value.trim();
	      }
	
	      if (options.nullify !== false && value === "") {
	        return null;
	      }
	      return value;
	    },
	
	    capitalize: function(str) {
	      if (!v.isString(str)) {
	        return str;
	      }
	      return str[0].toUpperCase() + str.slice(1);
	    },
	
	    // Remove all errors who's error attribute is empty (null or undefined)
	    pruneEmptyErrors: function(errors) {
	      return errors.filter(function(error) {
	        return !v.isEmpty(error.error);
	      });
	    },
	
	    // In
	    // [{error: ["err1", "err2"], ...}]
	    // Out
	    // [{error: "err1", ...}, {error: "err2", ...}]
	    //
	    // All attributes in an error with multiple messages are duplicated
	    // when expanding the errors.
	    expandMultipleErrors: function(errors) {
	      var ret = [];
	      errors.forEach(function(error) {
	        // Removes errors without a message
	        if (v.isArray(error.error)) {
	          error.error.forEach(function(msg) {
	            ret.push(v.extend({}, error, {error: msg}));
	          });
	        } else {
	          ret.push(error);
	        }
	      });
	      return ret;
	    },
	
	    // Converts the error mesages by prepending the attribute name unless the
	    // message is prefixed by ^
	    convertErrorMessages: function(errors, options) {
	      options = options || {};
	
	      var ret = [];
	      errors.forEach(function(errorInfo) {
	        var error = v.result(errorInfo.error,
	            errorInfo.value,
	            errorInfo.attribute,
	            errorInfo.options,
	            errorInfo.attributes,
	            errorInfo.globalOptions);
	
	        if (!v.isString(error)) {
	          ret.push(errorInfo);
	          return;
	        }
	
	        if (error[0] === '^') {
	          error = error.slice(1);
	        } else if (options.fullMessages !== false) {
	          error = v.capitalize(v.prettify(errorInfo.attribute)) + " " + error;
	        }
	        error = error.replace(/\\\^/g, "^");
	        error = v.format(error, {value: v.stringifyValue(errorInfo.value)});
	        ret.push(v.extend({}, errorInfo, {error: error}));
	      });
	      return ret;
	    },
	
	    // In:
	    // [{attribute: "<attributeName>", ...}]
	    // Out:
	    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
	    groupErrorsByAttribute: function(errors) {
	      var ret = {};
	      errors.forEach(function(error) {
	        var list = ret[error.attribute];
	        if (list) {
	          list.push(error);
	        } else {
	          ret[error.attribute] = [error];
	        }
	      });
	      return ret;
	    },
	
	    // In:
	    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
	    // Out:
	    // ["<message 1>", "<message 2>"]
	    flattenErrorsToArray: function(errors) {
	      return errors.map(function(error) { return error.error; });
	    },
	
	    cleanAttributes: function(attributes, whitelist) {
	      function whitelistCreator(obj, key, last) {
	        if (v.isObject(obj[key])) {
	          return obj[key];
	        }
	        return (obj[key] = last ? true : {});
	      }
	
	      function buildObjectWhitelist(whitelist) {
	        var ow = {}
	          , lastObject
	          , attr;
	        for (attr in whitelist) {
	          if (!whitelist[attr]) {
	            continue;
	          }
	          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
	        }
	        return ow;
	      }
	
	      function cleanRecursive(attributes, whitelist) {
	        if (!v.isObject(attributes)) {
	          return attributes;
	        }
	
	        var ret = v.extend({}, attributes)
	          , w
	          , attribute;
	
	        for (attribute in attributes) {
	          w = whitelist[attribute];
	
	          if (v.isObject(w)) {
	            ret[attribute] = cleanRecursive(ret[attribute], w);
	          } else if (!w) {
	            delete ret[attribute];
	          }
	        }
	        return ret;
	      }
	
	      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
	        return {};
	      }
	
	      whitelist = buildObjectWhitelist(whitelist);
	      return cleanRecursive(attributes, whitelist);
	    },
	
	    exposeModule: function(validate, root, exports, module, define) {
	      if (exports) {
	        if (module && module.exports) {
	          exports = module.exports = validate;
	        }
	        exports.validate = validate;
	      } else {
	        root.validate = validate;
	        if (validate.isFunction(define) && define.amd) {
	          define([], function () { return validate; });
	        }
	      }
	    },
	
	    warn: function(msg) {
	      if (typeof console !== "undefined" && console.warn) {
	        console.warn("[validate.js] " + msg);
	      }
	    },
	
	    error: function(msg) {
	      if (typeof console !== "undefined" && console.error) {
	        console.error("[validate.js] " + msg);
	      }
	    }
	  });
	
	  validate.validators = {
	    // Presence validates that the value isn't empty
	    presence: function(value, options) {
	      options = v.extend({}, this.options, options);
	      if (v.isEmpty(value)) {
	        return options.message || this.message || "can't be blank";
	      }
	    },
	    length: function(value, options, attribute) {
	      // Empty values are allowed
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var is = options.is
	        , maximum = options.maximum
	        , minimum = options.minimum
	        , tokenizer = options.tokenizer || function(val) { return val; }
	        , err
	        , errors = [];
	
	      value = tokenizer(value);
	      var length = value.length;
	      if(!v.isNumber(length)) {
	        v.error(v.format("Attribute %{attr} has a non numeric value for `length`", {attr: attribute}));
	        return options.message || this.notValid || "has an incorrect length";
	      }
	
	      // Is checks
	      if (v.isNumber(is) && length !== is) {
	        err = options.wrongLength ||
	          this.wrongLength ||
	          "is the wrong length (should be %{count} characters)";
	        errors.push(v.format(err, {count: is}));
	      }
	
	      if (v.isNumber(minimum) && length < minimum) {
	        err = options.tooShort ||
	          this.tooShort ||
	          "is too short (minimum is %{count} characters)";
	        errors.push(v.format(err, {count: minimum}));
	      }
	
	      if (v.isNumber(maximum) && length > maximum) {
	        err = options.tooLong ||
	          this.tooLong ||
	          "is too long (maximum is %{count} characters)";
	        errors.push(v.format(err, {count: maximum}));
	      }
	
	      if (errors.length > 0) {
	        return options.message || errors;
	      }
	    },
	    numericality: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var errors = []
	        , name
	        , count
	        , checks = {
	            greaterThan:          function(v, c) { return v > c; },
	            greaterThanOrEqualTo: function(v, c) { return v >= c; },
	            equalTo:              function(v, c) { return v === c; },
	            lessThan:             function(v, c) { return v < c; },
	            lessThanOrEqualTo:    function(v, c) { return v <= c; },
	            divisibleBy:          function(v, c) { return v % c === 0; }
	          };
	
	      // Strict will check that it is a valid looking number
	      if (v.isString(value) && options.strict) {
	        var pattern = "^(0|[1-9]\\d*)";
	        if (!options.onlyInteger) {
	          pattern += "(\\.\\d+)?";
	        }
	        pattern += "$";
	
	        if (!(new RegExp(pattern).test(value))) {
	          return options.message || options.notValid || this.notValid || "must be a valid number";
	        }
	      }
	
	      // Coerce the value to a number unless we're being strict.
	      if (options.noStrings !== true && v.isString(value)) {
	        value = +value;
	      }
	
	      // If it's not a number we shouldn't continue since it will compare it.
	      if (!v.isNumber(value)) {
	        return options.message || options.notValid || this.notValid || "is not a number";
	      }
	
	      // Same logic as above, sort of. Don't bother with comparisons if this
	      // doesn't pass.
	      if (options.onlyInteger && !v.isInteger(value)) {
	        return options.message || options.notInteger || this.notInteger  || "must be an integer";
	      }
	
	      for (name in checks) {
	        count = options[name];
	        if (v.isNumber(count) && !checks[name](value, count)) {
	          // This picks the default message if specified
	          // For example the greaterThan check uses the message from
	          // this.notGreaterThan so we capitalize the name and prepend "not"
	          var key = "not" + v.capitalize(name);
	          var msg = options[key] || this[key] || "must be %{type} %{count}";
	
	          errors.push(v.format(msg, {
	            count: count,
	            type: v.prettify(name)
	          }));
	        }
	      }
	
	      if (options.odd && value % 2 !== 1) {
	        errors.push(options.notOdd || this.notOdd || "must be odd");
	      }
	      if (options.even && value % 2 !== 0) {
	        errors.push(options.notEven || this.notEven || "must be even");
	      }
	
	      if (errors.length) {
	        return options.message || errors;
	      }
	    },
	    datetime: v.extend(function(value, options) {
	      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
	        throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
	      }
	
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var err
	        , errors = []
	        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
	        , latest = options.latest ? this.parse(options.latest, options) : NaN;
	
	      value = this.parse(value, options);
	
	      // 86400000 is the number of seconds in a day, this is used to remove
	      // the time from the date
	      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
	        err = options.notValid ||
	          options.message ||
	          this.notValid ||
	          "must be a valid date";
	        return v.format(err, {value: arguments[0]});
	      }
	
	      if (!isNaN(earliest) && value < earliest) {
	        err = options.tooEarly ||
	          options.message ||
	          this.tooEarly ||
	          "must be no earlier than %{date}";
	        err = v.format(err, {
	          value: this.format(value, options),
	          date: this.format(earliest, options)
	        });
	        errors.push(err);
	      }
	
	      if (!isNaN(latest) && value > latest) {
	        err = options.tooLate ||
	          options.message ||
	          this.tooLate ||
	          "must be no later than %{date}";
	        err = v.format(err, {
	          date: this.format(latest, options),
	          value: this.format(value, options)
	        });
	        errors.push(err);
	      }
	
	      if (errors.length) {
	        return v.unique(errors);
	      }
	    }, {
	      parse: null,
	      format: null
	    }),
	    date: function(value, options) {
	      options = v.extend({}, options, {dateOnly: true});
	      return v.validators.datetime.call(v.validators.datetime, value, options);
	    },
	    format: function(value, options) {
	      if (v.isString(options) || (options instanceof RegExp)) {
	        options = {pattern: options};
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var message = options.message || this.message || "is invalid"
	        , pattern = options.pattern
	        , match;
	
	      // Empty values are allowed
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }
	
	      if (v.isString(pattern)) {
	        pattern = new RegExp(options.pattern, options.flags);
	      }
	      match = pattern.exec(value);
	      if (!match || match[0].length != value.length) {
	        return message;
	      }
	    },
	    inclusion: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message ||
	        this.message ||
	        "^%{value} is not included in the list";
	      return v.format(message, {value: value});
	    },
	    exclusion: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (!v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message || this.message || "^%{value} is restricted";
	      return v.format(message, {value: value});
	    },
	    email: v.extend(function(value, options) {
	      options = v.extend({}, this.options, options);
	      var message = options.message || this.message || "is not a valid email";
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }
	      if (!this.PATTERN.exec(value)) {
	        return message;
	      }
	    }, {
	      PATTERN: /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
	    }),
	    equality: function(value, options, attribute, attributes) {
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      if (v.isString(options)) {
	        options = {attribute: options};
	      }
	      options = v.extend({}, this.options, options);
	      var message = options.message ||
	        this.message ||
	        "is not equal to %{attribute}";
	
	      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
	        throw new Error("The attribute must be a non empty string");
	      }
	
	      var otherValue = v.getDeepObjectValue(attributes, options.attribute)
	        , comparator = options.comparator || function(v1, v2) {
	          return v1 === v2;
	        };
	
	      if (!comparator(value, otherValue, options, attribute, attributes)) {
	        return v.format(message, {attribute: v.prettify(options.attribute)});
	      }
	    },
	
	    // A URL validator that is used to validate URLs with the ability to
	    // restrict schemes and some domains.
	    url: function(value, options) {
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var message = options.message || this.message || "is not a valid url"
	        , schemes = options.schemes || this.schemes || ['http', 'https']
	        , allowLocal = options.allowLocal || this.allowLocal || false;
	
	      if (!v.isString(value)) {
	        return message;
	      }
	
	      // https://gist.github.com/dperini/729294
	      var regex =
	        "^" +
	          // schemes
	          "(?:(?:" + schemes.join("|") + "):\\/\\/)" +
	          // credentials
	          "(?:\\S+(?::\\S*)?@)?";
	
	      regex += "(?:";
	
	      var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
	
	      // This ia a special case for the localhost hostname
	      if (allowLocal) {
	        tld += "?";
	      } else {
	        // private & local addresses
	        regex +=
	          "(?!10(?:\\.\\d{1,3}){3})" +
	          "(?!127(?:\\.\\d{1,3}){3})" +
	          "(?!169\\.254(?:\\.\\d{1,3}){2})" +
	          "(?!192\\.168(?:\\.\\d{1,3}){2})" +
	          "(?!172" +
	          "\\.(?:1[6-9]|2\\d|3[0-1])" +
	          "(?:\\.\\d{1,3})" +
	          "{2})";
	      }
	
	      var hostname =
	          "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
	          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
	          tld + ")";
	
	      // reserved addresses
	      regex +=
	          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
	          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
	          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
	        "|" +
	          hostname +
	          // port number
	          "(?::\\d{2,5})?" +
	          // path
	          "(?:\\/[^\\s]*)?" +
	        "$";
	
	      var PATTERN = new RegExp(regex, 'i');
	      if (!PATTERN.exec(value)) {
	        return message;
	      }
	    }
	  };
	
	  validate.exposeModule(validate, this, exports, module, __webpack_require__(78));
	}).call(this,
	         true ? /* istanbul ignore next */ exports : null,
	         true ? /* istanbul ignore next */ module : null,
	        __webpack_require__(78));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(77)(module)))

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 79 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nextAction = function nextAction(model, proposal, actions) {
	  proposal.case({
	    ValidateTodo: function ValidateTodo(todo) {
	      if (Object.keys(model.validationErrors).length === 0) {
	        actions.requestSaveTodo(todo);
	      }
	    },
	    SavedTodo: function SavedTodo() {
	      return actions.clearForm();
	    },
	    _: function _() {}
	  });
	};
	
	exports.default = nextAction;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inferno = __webpack_require__(39);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _viewInferno = __webpack_require__(81);
	
	var _viewInferno2 = _interopRequireDefault(_viewInferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bp9 = _inferno2.default.createBlueprint({
	  tag: "tbody",
	  children: {
	    arg: 0
	  }
	});
	
	var bp8 = _inferno2.default.createBlueprint({
	  tag: "th",
	  children: {
	    arg: 0
	  }
	});
	
	var bp7 = _inferno2.default.createBlueprint({
	  tag: "th",
	  children: {
	    arg: 0
	  }
	});
	
	var bp6 = _inferno2.default.createBlueprint({
	  tag: "th",
	  children: {
	    arg: 0
	  }
	});
	
	var bp5 = _inferno2.default.createBlueprint({
	  tag: "tr",
	  children: {
	    arg: 0
	  }
	});
	
	var bp4 = _inferno2.default.createBlueprint({
	  tag: "thead",
	  children: {
	    arg: 0
	  }
	});
	
	var bp3 = _inferno2.default.createBlueprint({
	  tag: "table",
	  className: "table table-bordered table-striped table-hover",
	  children: {
	    arg: 0
	  }
	});
	
	var bp2 = _inferno2.default.createBlueprint({
	  tag: "div",
	  children: {
	    arg: 0
	  }
	});
	
	var bp1 = _inferno2.default.createBlueprint({
	  tag: "div",
	  className: "col-md-8",
	  children: {
	    arg: 0
	  }
	});
	
	var bp0 = _inferno2.default.createBlueprint({
	  tag: "div",
	  className: "row",
	  children: {
	    arg: 0
	  }
	});
	
	var view = function view(model, actions) {
	  var renderTodo = (0, _viewInferno2.default)(actions);
	
	  return bp0(bp1([bp2(["Todo List: ", model.message]), bp3([bp4(bp5([bp6("Priority"), bp7("Description"), bp8("Action")])), bp9(model.todos.map(renderTodo))])]));
	};
	
	exports.default = view;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _inferno = __webpack_require__(39);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bp5 = _inferno2.default.createBlueprint({
	  tag: "button",
	  className: "btn btn-danger btn-xs",
	  events: {
	    arg: 0
	  },
	  children: {
	    arg: 1
	  }
	});
	
	var bp4 = _inferno2.default.createBlueprint({
	  tag: "button",
	  className: "btn btn-primary btn-xs",
	  events: {
	    arg: 0
	  },
	  children: {
	    arg: 1
	  }
	});
	
	var bp3 = _inferno2.default.createBlueprint({
	  tag: "td",
	  children: {
	    arg: 0
	  }
	});
	
	var bp2 = _inferno2.default.createBlueprint({
	  tag: "td",
	  children: {
	    arg: 0
	  }
	});
	
	var bp1 = _inferno2.default.createBlueprint({
	  tag: "td",
	  children: {
	    arg: 0
	  }
	});
	
	var bp0 = _inferno2.default.createBlueprint({
	  tag: "tr",
	  key: {
	    arg: 0
	  },
	  children: {
	    arg: 1
	  }
	});
	
	var view = function view(actions) {
	  return function (todo) {
	    var onEdit = function onEdit(todo) {
	      return function (evt) {
	        evt.preventDefault();
	        actions.editTodo(todo);
	      };
	    };
	
	    var onDelete = function onDelete(todo) {
	      return function (evt) {
	        evt.preventDefault();
	        actions.deleteTodo(todo.id);
	      };
	    };
	
	    return bp0(todo.id, [bp1(todo.priority), bp2(todo.description), bp3([bp4({
	      onclick: onEdit(todo)
	    }, "Edit"), bp5({
	      onclick: onDelete(todo)
	    }, "Delete")])]);
	  };
	};
	
	exports.default = view;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _model = __webpack_require__(83);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _actions = __webpack_require__(84);
	
	var _receive = __webpack_require__(85);
	
	var _receive2 = _interopRequireDefault(_receive);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var todoListConfig = function todoListConfig(_ref) {
	  var ActionForm = _ref.ActionForm;
	  var services = _ref.services;
	  var view = _ref.view;
	  var setup = _ref.setup;
	  return {
	    initialModel: _model2.default,
	    actions: (0, _actions.createActions)(ActionForm, services),
	    receive: _receive2.default,
	    view: view,
	    setup: setup,
	    ready: function ready(actions) {
	      return actions.loadList();
	    }
	  };
	};
	
	exports.default = todoListConfig;

/***/ },
/* 83 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initialModel = function initialModel(model) {
	  return Object.assign(model, {
	    todos: [],
	    message: "Initializing..."
	  });
	};
	
	exports.default = initialModel;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createActions = exports.Action = undefined;
	
	var _unionType = __webpack_require__(2);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Action = (0, _unionType2.default)({
	  RequestLoadList: [],
	  LoadedList: [Object],
	  RequestDeleteTodo: [],
	  DeletedTodo: [Object]
	});
	
	var createActions = function createActions(ActionForm, services) {
	  return function (propose) {
	    return {
	      loadList: function loadList() {
	        propose(Action.RequestLoadList());
	        services.loadTodos.then(function (model) {
	          return propose(Action.LoadedList(model));
	        });
	      },
	
	      editTodo: function editTodo(todo) {
	        return propose(ActionForm.EditTodo(todo));
	      },
	
	      deleteTodo: function deleteTodo(id) {
	        propose(Action.RequestDeleteTodo());
	        services.deleteTodo(id).then(function (maybeTodoId) {
	          return propose(Action.DeletedTodo(maybeTodoId));
	        });
	      }
	    };
	  };
	};
	
	exports.Action = Action;
	exports.createActions = createActions;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ramda = __webpack_require__(35);
	
	var updateTodos = function updateTodos(todos, todo) {
	  var index = (0, _ramda.findIndex)((0, _ramda.propEq)("id", todo.id))(todos);
	  return index >= 0 ? (0, _ramda.set)((0, _ramda.lensIndex)(index), todo, todos) : (0, _ramda.append)(todo, todos);
	};
	
	var receive = function receive(model, proposal) {
	  var modelUpdate = proposal.case({
	    RequestLoadList: function RequestLoadList() {
	      return { message: "Loading, please wait..." };
	    },
	    LoadedList: _ramda.identity,
	    RequestSaveTodo: function RequestSaveTodo() {
	      return { message: "Saving, please wait..." };
	    },
	
	    SavedTodo: function SavedTodo(savedTodo) {
	      return savedTodo.map(function (todo) {
	        return updateTodos(model.todos, todo);
	      }).map(function (todos) {
	        return { todos: todos, message: "" };
	      }).getOrElse({ message: "An error occurred when saving a Todo." });
	    },
	
	    RequestDeleteTodo: function RequestDeleteTodo() {
	      return { message: "Deleting, please wait..." };
	    },
	    DeletedTodo: function DeletedTodo(maybeTodoId) {
	      return maybeTodoId.map(function (todoId) {
	        return { todos: (0, _ramda.filter)((0, _ramda.complement)((0, _ramda.propEq)("id", todoId)), model.todos), message: "" };
	      }).getOrElse({ todos: model.todos, message: "An error occured when deleting a Todo." });
	    },
	
	    _: function _() {
	      return null;
	    }
	  });
	
	  if (modelUpdate) {
	    return (0, _ramda.merge)(model, modelUpdate);
	  }
	  return model;
	};
	
	exports.default = receive;

/***/ }
/******/ ]);
//# sourceMappingURL=generated-inferno-app.js.map