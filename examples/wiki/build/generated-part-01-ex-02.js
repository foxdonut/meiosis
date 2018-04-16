/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./part-01/index-02.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./part-01/index-02.jsx":
/*!******************************!*\
  !*** ./part-01/index-02.jsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _flyd = __webpack_require__(/*! flyd */ \"./part-01/node_modules/flyd/lib/index.js\");\n\nvar _flyd2 = _interopRequireDefault(_flyd);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar initialModel = {\n  value: 20\n};\n\nvar createActions = function createActions(update) {\n  return {\n    increase: function increase() {\n      return update(function (model) {\n        model.value = model.value + 1;\n        return model;\n      });\n    }\n  };\n};\n\nvar createView = function createView(actions) {\n  return function (model) {\n    return _react2.default.createElement(\n      \"div\",\n      null,\n      _react2.default.createElement(\n        \"span\",\n        null,\n        \"Temperature: \",\n        model.value,\n        \"\\xB0C \"\n      ),\n      _react2.default.createElement(\n        \"button\",\n        { className: \"btn btn-default\", onClick: actions.increase },\n        \"Increase\"\n      )\n    );\n  };\n};\n\nvar update = _flyd2.default.stream();\nvar applyUpdate = function applyUpdate(model, modelUpdate) {\n  return modelUpdate(model);\n};\nvar models = _flyd2.default.scan(applyUpdate, initialModel, update);\n\nvar view = createView(createActions(update));\nvar element = document.getElementById(\"app\");\nmodels.map(function (model) {\n  return _reactDom2.default.render(view(model), element);\n});\n\n//# sourceURL=webpack:///./part-01/index-02.jsx?");

/***/ }),

/***/ "./part-01/node_modules/flyd/lib/index.js":
/*!************************************************!*\
  !*** ./part-01/node_modules/flyd/lib/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar curryN = __webpack_require__(/*! ramda/src/curryN */ \"./part-01/node_modules/ramda/src/curryN.js\");\n\n// Utility\nfunction isFunction(obj) {\n  return !!(obj && obj.constructor && obj.call && obj.apply);\n}\nfunction trueFn() { return true; }\n\n// Globals\nvar toUpdate = [];\nvar inStream;\nvar order = [];\nvar orderNextIdx = -1;\nvar flushing = false;\n\n/** @namespace */\nvar flyd = {}\n\n// /////////////////////////// API ///////////////////////////////// //\n\n/**\n * Creates a new stream\n *\n * __Signature__: `a -> Stream a`\n *\n * @name flyd.stream\n * @param {*} initialValue - (Optional) the initial value of the stream\n * @return {stream} the stream\n *\n * @example\n * var n = flyd.stream(1); // Stream with initial value `1`\n * var s = flyd.stream(); // Stream with no initial value\n */\nflyd.stream = function(initialValue) {\n  var endStream = createDependentStream([], trueFn);\n  var s = createStream();\n  s.end = endStream;\n  s.fnArgs = [];\n  endStream.listeners.push(s);\n  s.toJSON = function() {\n    return s();\n  };\n  if (arguments.length > 0) s(initialValue);\n  return s;\n}\n\n/**\n * Create a new dependent stream\n *\n * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`\n *\n * @name flyd.combine\n * @param {Function} fn - the function used to combine the streams\n * @param {Array<stream>} dependencies - the streams that this one depends on\n * @return {stream} the dependent stream\n *\n * @example\n * var n1 = flyd.stream(0);\n * var n2 = flyd.stream(0);\n * var max = flyd.combine(function(n1, n2, self, changed) {\n *   return n1() > n2() ? n1() : n2();\n * }, [n1, n2]);\n */\nflyd.combine = curryN(2, combine);\nfunction combine(fn, streams) {\n  var i, s, deps, depEndStreams;\n  var endStream = createDependentStream([], trueFn);\n  deps = []; depEndStreams = [];\n  for (i = 0; i < streams.length; ++i) {\n    if (streams[i] !== undefined) {\n      deps.push(streams[i]);\n      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);\n    }\n  }\n  s = createDependentStream(deps, fn);\n  s.depsChanged = [];\n  s.fnArgs = s.deps.concat([s, s.depsChanged]);\n  s.end = endStream;\n  endStream.listeners.push(s);\n  addListeners(depEndStreams, endStream);\n  endStream.deps = depEndStreams;\n  updateStream(s);\n  return s;\n}\n\n/**\n * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.\n *\n * __Signature__: `* -> Boolean`\n *\n * @name flyd.isStream\n * @param {*} value - the value to test\n * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise\n *\n * @example\n * var s = flyd.stream(1);\n * var n = 1;\n * flyd.isStream(s); //=> true\n * flyd.isStream(n); //=> false\n */\nflyd.isStream = function(stream) {\n  return isFunction(stream) && 'hasVal' in stream;\n}\n\n/**\n * Invokes the body (the function to calculate the value) of a dependent stream\n *\n * By default the body of a dependent stream is only called when all the streams\n * upon which it depends has a value. `immediate` can circumvent this behaviour.\n * It immediately invokes the body of a dependent stream.\n *\n * __Signature__: `Stream a -> Stream a`\n *\n * @name flyd.immediate\n * @param {stream} stream - the dependent stream\n * @return {stream} the same stream\n *\n * @example\n * var s = flyd.stream();\n * var hasItems = flyd.immediate(flyd.combine(function(s) {\n *   return s() !== undefined && s().length > 0;\n * }, [s]);\n * console.log(hasItems()); // logs `false`. Had `immediate` not been\n *                          // used `hasItems()` would've returned `undefined`\n * s([1]);\n * console.log(hasItems()); // logs `true`.\n * s([]);\n * console.log(hasItems()); // logs `false`.\n */\nflyd.immediate = function(s) {\n  if (s.depsMet === false) {\n    s.depsMet = true;\n    updateStream(s);\n  }\n  return s;\n}\n\n/**\n * Changes which `endsStream` should trigger the ending of `s`.\n *\n * __Signature__: `Stream a -> Stream b -> Stream b`\n *\n * @name flyd.endsOn\n * @param {stream} endStream - the stream to trigger the ending\n * @param {stream} stream - the stream to be ended by the endStream\n * @param {stream} the stream modified to be ended by endStream\n *\n * @example\n * var n = flyd.stream(1);\n * var killer = flyd.stream();\n * // `double` ends when `n` ends or when `killer` emits any value\n * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {\n *   return 2 * n();\n * }, [n]);\n*/\nflyd.endsOn = function(endS, s) {\n  detachDeps(s.end);\n  endS.listeners.push(s.end);\n  s.end.deps.push(endS);\n  return s;\n}\n\n/**\n * Map a stream\n *\n * Returns a new stream consisting of every value from `s` passed through\n * `fn`. I.e. `map` creates a new stream that listens to `s` and\n * applies `fn` to every new value.\n * __Signature__: `(a -> result) -> Stream a -> Stream result`\n *\n * @name flyd.map\n * @param {Function} fn - the function that produces the elements of the new stream\n * @param {stream} stream - the stream to map\n * @return {stream} a new stream with the mapped values\n *\n * @example\n * var numbers = flyd.stream(0);\n * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);\n */\n// Library functions use self callback to accept (null, undefined) update triggers.\nflyd.map = curryN(2, function(f, s) {\n  return combine(function(s, self) { self(f(s.val)); }, [s]);\n})\n\n/**\n * Listen to stream events\n *\n * Similar to `map` except that the returned stream is empty. Use `on` for doing\n * side effects in reaction to stream changes. Use the returned stream only if you\n * need to manually end it.\n *\n * __Signature__: `(a -> result) -> Stream a -> Stream undefined`\n *\n * @name flyd.on\n * @param {Function} cb - the callback\n * @param {stream} stream - the stream\n * @return {stream} an empty stream (can be ended)\n */\nflyd.on = curryN(2, function(f, s) {\n  return combine(function(s) { f(s.val); }, [s]);\n})\n\n/**\n * Creates a new stream with the results of calling the function on every incoming\n * stream with and accumulator and the incoming value.\n *\n * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`\n *\n * @name flyd.scan\n * @param {Function} fn - the function to call\n * @param {*} val - the initial value of the accumulator\n * @param {stream} stream - the stream source\n * @return {stream} the new stream\n *\n * @example\n * var numbers = flyd.stream();\n * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);\n * numbers(2)(3)(5);\n * sum(); // 10\n */\nflyd.scan = curryN(3, function(f, acc, s) {\n  var ns = combine(function(s, self) {\n    self(acc = f(acc, s.val));\n  }, [s]);\n  if (!ns.hasVal) ns(acc);\n  return ns;\n});\n\n/**\n * Creates a new stream down which all values from both `stream1` and `stream2`\n * will be sent.\n *\n * __Signature__: `Stream a -> Stream a -> Stream a`\n *\n * @name flyd.merge\n * @param {stream} source1 - one stream to be merged\n * @param {stream} source2 - the other stream to be merged\n * @return {stream} a stream with the values from both sources\n *\n * @example\n * var btn1Clicks = flyd.stream();\n * button1Elm.addEventListener(btn1Clicks);\n * var btn2Clicks = flyd.stream();\n * button2Elm.addEventListener(btn2Clicks);\n * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);\n */\nflyd.merge = curryN(2, function(s1, s2) {\n  var s = flyd.immediate(combine(function(s1, s2, self, changed) {\n    if (changed[0]) {\n      self(changed[0]());\n    } else if (s1.hasVal) {\n      self(s1.val);\n    } else if (s2.hasVal) {\n      self(s2.val);\n    }\n  }, [s1, s2]));\n  flyd.endsOn(combine(function() {\n    return true;\n  }, [s1.end, s2.end]), s);\n  return s;\n});\n\n/**\n * Creates a new stream resulting from applying `transducer` to `stream`.\n *\n * __Signature__: `Transducer -> Stream a -> Stream b`\n *\n * @name flyd.transduce\n * @param {Transducer} xform - the transducer transformation\n * @param {stream} source - the stream source\n * @return {stream} the new stream\n *\n * @example\n * var t = require('transducers.js');\n *\n * var results = [];\n * var s1 = flyd.stream();\n * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());\n * var s2 = flyd.transduce(tx, s1);\n * flyd.combine(function(s2) { results.push(s2()); }, [s2]);\n * s1(1)(1)(2)(3)(3)(3)(4);\n * results; // => [2, 4, 6, 8]\n */\nflyd.transduce = curryN(2, function(xform, source) {\n  xform = xform(new StreamTransformer());\n  return combine(function(source, self) {\n    var res = xform['@@transducer/step'](undefined, source.val);\n    if (res && res['@@transducer/reduced'] === true) {\n      self.end(true);\n      return res['@@transducer/value'];\n    } else {\n      return res;\n    }\n  }, [source]);\n});\n\n/**\n * Returns `fn` curried to `n`. Use this function to curry functions exposed by\n * modules for Flyd.\n *\n * @name flyd.curryN\n * @function\n * @param {Integer} arity - the function arity\n * @param {Function} fn - the function to curry\n * @return {Function} the curried function\n *\n * @example\n * function add(x, y) { return x + y; };\n * var a = flyd.curryN(2, add);\n * a(2)(4) // => 6\n */\nflyd.curryN = curryN\n\n/**\n * Returns a new stream identical to the original except every\n * value will be passed through `f`.\n *\n * _Note:_ This function is included in order to support the fantasy land\n * specification.\n *\n * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`\n *\n * @name stream.map\n * @param {Function} function - the function to apply\n * @return {stream} a new stream with the values mapped\n *\n * @example\n * var numbers = flyd.stream(0);\n * var squaredNumbers = numbers.map(function(n) { return n*n; });\n */\nfunction boundMap(f) { return flyd.map(f, this); }\n\n/**\n * Returns a new stream which is the result of applying the\n * functions from `this` stream to the values in `stream` parameter.\n *\n * `this` stream must be a stream of functions.\n *\n * _Note:_ This function is included in order to support the fantasy land\n * specification.\n *\n * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`\n *\n * @name stream.ap\n * @param {stream} stream - the values stream\n * @return {stream} a new stream with the functions applied to values\n *\n * @example\n * var add = flyd.curryN(2, function(x, y) { return x + y; });\n * var numbers1 = flyd.stream();\n * var numbers2 = flyd.stream();\n * var addToNumbers1 = flyd.map(add, numbers1);\n * var added = addToNumbers1.ap(numbers2);\n */\nfunction ap(s2) {\n  var s1 = this;\n  return combine(function(s1, s2, self) { self(s1.val(s2.val)); }, [s1, s2]);\n}\n\n/**\n * Get a human readable view of a stream\n * @name stream.toString\n * @return {String} the stream string representation\n */\nfunction streamToString() {\n  return 'stream(' + this.val + ')';\n}\n\n/**\n * @name stream.end\n * @memberof stream\n * A stream that emits `true` when the stream ends. If `true` is pushed down the\n * stream the parent stream ends.\n */\n\n/**\n * @name stream.of\n * @function\n * @memberof stream\n * Returns a new stream with `value` as its initial value. It is identical to\n * calling `flyd.stream` with one argument.\n *\n * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`\n *\n * @param {*} value - the initial value\n * @return {stream} the new stream\n *\n * @example\n * var n = flyd.stream(1);\n * var m = n.of(1);\n */\n\n// /////////////////////////// PRIVATE ///////////////////////////////// //\n/**\n * @private\n * Create a stream with no dependencies and no value\n * @return {Function} a flyd stream\n */\nfunction createStream() {\n  function s(n) {\n    if (arguments.length === 0) return s.val\n    updateStreamValue(s, n)\n    return s\n  }\n  s.hasVal = false;\n  s.val = undefined;\n  s.vals = [];\n  s.listeners = [];\n  s.queued = false;\n  s.end = undefined;\n  s.map = boundMap;\n  s.ap = ap;\n  s.of = flyd.stream;\n  s.toString = streamToString;\n  return s;\n}\n\n/**\n * @private\n * Create a dependent stream\n * @param {Array<stream>} dependencies - an array of the streams\n * @param {Function} fn - the function used to calculate the new stream value\n * from the dependencies\n * @return {stream} the created stream\n */\nfunction createDependentStream(deps, fn) {\n  var s = createStream();\n  s.fn = fn;\n  s.deps = deps;\n  s.depsMet = false;\n  s.depsChanged = deps.length > 0 ? [] : undefined;\n  s.shouldUpdate = false;\n  addListeners(deps, s);\n  return s;\n}\n\n/**\n * @private\n * Check if all the dependencies have values\n * @param {stream} stream - the stream to check depencencies from\n * @return {Boolean} `true` if all dependencies have vales, `false` otherwise\n */\nfunction initialDepsNotMet(stream) {\n  stream.depsMet = stream.deps.every(function(s) {\n    return s.hasVal;\n  });\n  return !stream.depsMet;\n}\n\n/**\n * @private\n * Update a dependent stream using its dependencies in an atomic way\n * @param {stream} stream - the stream to update\n */\nfunction updateStream(s) {\n  if ((s.depsMet !== true && initialDepsNotMet(s)) ||\n      (s.end !== undefined && s.end.val === true)) return;\n  if (inStream !== undefined) {\n    toUpdate.push(s);\n    return;\n  }\n  inStream = s;\n  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;\n  var returnVal = s.fn.apply(s.fn, s.fnArgs);\n  if (returnVal !== undefined) {\n    s(returnVal);\n  }\n  inStream = undefined;\n  if (s.depsChanged !== undefined) s.depsChanged = [];\n  s.shouldUpdate = false;\n  if (flushing === false) flushUpdate();\n}\n\n/**\n * @private\n * Update the dependencies of a stream\n * @param {stream} stream\n */\nfunction updateDeps(s) {\n  var i, o, list\n  var listeners = s.listeners;\n  for (i = 0; i < listeners.length; ++i) {\n    list = listeners[i];\n    if (list.end === s) {\n      endStream(list);\n    } else {\n      if (list.depsChanged !== undefined) list.depsChanged.push(s);\n      list.shouldUpdate = true;\n      findDeps(list);\n    }\n  }\n  for (; orderNextIdx >= 0; --orderNextIdx) {\n    o = order[orderNextIdx];\n    if (o.shouldUpdate === true) updateStream(o);\n    o.queued = false;\n  }\n}\n\n/**\n * @private\n * Add stream dependencies to the global `order` queue.\n * @param {stream} stream\n * @see updateDeps\n */\nfunction findDeps(s) {\n  var i\n  var listeners = s.listeners;\n  if (s.queued === false) {\n    s.queued = true;\n    for (i = 0; i < listeners.length; ++i) {\n      findDeps(listeners[i]);\n    }\n    order[++orderNextIdx] = s;\n  }\n}\n\n/**\n * @private\n */\nfunction flushUpdate() {\n  flushing = true;\n  while (toUpdate.length > 0) {\n    var s = toUpdate.shift();\n    if (s.vals.length > 0) s.val = s.vals.shift();\n    updateDeps(s);\n  }\n  flushing = false;\n}\n\n/**\n * @private\n * Push down a value into a stream\n * @param {stream} stream\n * @param {*} value\n */\nfunction updateStreamValue(s, n) {\n  if (n !== undefined && n !== null && isFunction(n.then)) {\n    n.then(s);\n    return;\n  }\n  s.val = n;\n  s.hasVal = true;\n  if (inStream === undefined) {\n    flushing = true;\n    updateDeps(s);\n    if (toUpdate.length > 0) flushUpdate(); else flushing = false;\n  } else if (inStream === s) {\n    markListeners(s, s.listeners);\n  } else {\n    s.vals.push(n);\n    toUpdate.push(s);\n  }\n}\n\n/**\n * @private\n */\nfunction markListeners(s, lists) {\n  var i, list;\n  for (i = 0; i < lists.length; ++i) {\n    list = lists[i];\n    if (list.end !== s) {\n      if (list.depsChanged !== undefined) {\n        list.depsChanged.push(s);\n      }\n      list.shouldUpdate = true;\n    } else {\n      endStream(list);\n    }\n  }\n}\n\n/**\n * @private\n * Add dependencies to a stream\n * @param {Array<stream>} dependencies\n * @param {stream} stream\n */\nfunction addListeners(deps, s) {\n  for (var i = 0; i < deps.length; ++i) {\n    deps[i].listeners.push(s);\n  }\n}\n\n/**\n * @private\n * Removes an stream from a dependency array\n * @param {stream} stream\n * @param {Array<stream>} dependencies\n */\nfunction removeListener(s, listeners) {\n  var idx = listeners.indexOf(s);\n  listeners[idx] = listeners[listeners.length - 1];\n  listeners.length--;\n}\n\n/**\n * @private\n * Detach a stream from its dependencies\n * @param {stream} stream\n */\nfunction detachDeps(s) {\n  for (var i = 0; i < s.deps.length; ++i) {\n    removeListener(s, s.deps[i].listeners);\n  }\n  s.deps.length = 0;\n}\n\n/**\n * @private\n * Ends a stream\n */\nfunction endStream(s) {\n  if (s.deps !== undefined) detachDeps(s);\n  if (s.end !== undefined) detachDeps(s.end);\n}\n\n/**\n * @private\n * transducer stream transformer\n */\nfunction StreamTransformer() { }\nStreamTransformer.prototype['@@transducer/init'] = function() { };\nStreamTransformer.prototype['@@transducer/result'] = function() { };\nStreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };\n\nmodule.exports = flyd;\n\n\n//# sourceURL=webpack:///./part-01/node_modules/flyd/lib/index.js?");

/***/ }),

/***/ "./part-01/node_modules/ramda/src/curryN.js":
/*!**************************************************!*\
  !*** ./part-01/node_modules/ramda/src/curryN.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _arity = __webpack_require__(/*! ./internal/_arity */ \"./part-01/node_modules/ramda/src/internal/_arity.js\");\nvar _curry1 = __webpack_require__(/*! ./internal/_curry1 */ \"./part-01/node_modules/ramda/src/internal/_curry1.js\");\nvar _curry2 = __webpack_require__(/*! ./internal/_curry2 */ \"./part-01/node_modules/ramda/src/internal/_curry2.js\");\nvar _curryN = __webpack_require__(/*! ./internal/_curryN */ \"./part-01/node_modules/ramda/src/internal/_curryN.js\");\n\n\n/**\n * Returns a curried equivalent of the provided function, with the specified\n * arity. The curried function has two unusual capabilities. First, its\n * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the\n * following are equivalent:\n *\n *   - `g(1)(2)(3)`\n *   - `g(1)(2, 3)`\n *   - `g(1, 2)(3)`\n *   - `g(1, 2, 3)`\n *\n * Secondly, the special placeholder value `R.__` may be used to specify\n * \"gaps\", allowing partial application of any combination of arguments,\n * regardless of their positions. If `g` is as above and `_` is `R.__`, the\n * following are equivalent:\n *\n *   - `g(1, 2, 3)`\n *   - `g(_, 2, 3)(1)`\n *   - `g(_, _, 3)(1)(2)`\n *   - `g(_, _, 3)(1, 2)`\n *   - `g(_, 2)(1)(3)`\n *   - `g(_, 2)(1, 3)`\n *   - `g(_, 2)(_, 3)(1)`\n *\n * @func\n * @memberOf R\n * @since v0.5.0\n * @category Function\n * @sig Number -> (* -> a) -> (* -> a)\n * @param {Number} length The arity for the returned function.\n * @param {Function} fn The function to curry.\n * @return {Function} A new, curried function.\n * @see R.curry\n * @example\n *\n *      var sumArgs = (...args) => R.sum(args);\n *\n *      var curriedAddFourNumbers = R.curryN(4, sumArgs);\n *      var f = curriedAddFourNumbers(1, 2);\n *      var g = f(3);\n *      g(4); //=> 10\n */\nmodule.exports = _curry2(function curryN(length, fn) {\n  if (length === 1) {\n    return _curry1(fn);\n  }\n  return _arity(length, _curryN(length, [], fn));\n});\n\n\n//# sourceURL=webpack:///./part-01/node_modules/ramda/src/curryN.js?");

/***/ }),

/***/ "./part-01/node_modules/ramda/src/internal/_arity.js":
/*!***********************************************************!*\
  !*** ./part-01/node_modules/ramda/src/internal/_arity.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function _arity(n, fn) {\n  /* eslint-disable no-unused-vars */\n  switch (n) {\n    case 0: return function() { return fn.apply(this, arguments); };\n    case 1: return function(a0) { return fn.apply(this, arguments); };\n    case 2: return function(a0, a1) { return fn.apply(this, arguments); };\n    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };\n    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };\n    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };\n    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };\n    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };\n    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };\n    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };\n    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };\n    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');\n  }\n};\n\n\n//# sourceURL=webpack:///./part-01/node_modules/ramda/src/internal/_arity.js?");

/***/ }),

/***/ "./part-01/node_modules/ramda/src/internal/_curry1.js":
/*!************************************************************!*\
  !*** ./part-01/node_modules/ramda/src/internal/_curry1.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _isPlaceholder = __webpack_require__(/*! ./_isPlaceholder */ \"./part-01/node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n\n/**\n * Optimized internal one-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nmodule.exports = function _curry1(fn) {\n  return function f1(a) {\n    if (arguments.length === 0 || _isPlaceholder(a)) {\n      return f1;\n    } else {\n      return fn.apply(this, arguments);\n    }\n  };\n};\n\n\n//# sourceURL=webpack:///./part-01/node_modules/ramda/src/internal/_curry1.js?");

/***/ }),

/***/ "./part-01/node_modules/ramda/src/internal/_curry2.js":
/*!************************************************************!*\
  !*** ./part-01/node_modules/ramda/src/internal/_curry2.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry1 = __webpack_require__(/*! ./_curry1 */ \"./part-01/node_modules/ramda/src/internal/_curry1.js\");\nvar _isPlaceholder = __webpack_require__(/*! ./_isPlaceholder */ \"./part-01/node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n\n/**\n * Optimized internal two-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nmodule.exports = function _curry2(fn) {\n  return function f2(a, b) {\n    switch (arguments.length) {\n      case 0:\n        return f2;\n      case 1:\n        return _isPlaceholder(a) ? f2\n             : _curry1(function(_b) { return fn(a, _b); });\n      default:\n        return _isPlaceholder(a) && _isPlaceholder(b) ? f2\n             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })\n             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })\n             : fn(a, b);\n    }\n  };\n};\n\n\n//# sourceURL=webpack:///./part-01/node_modules/ramda/src/internal/_curry2.js?");

/***/ }),

/***/ "./part-01/node_modules/ramda/src/internal/_curryN.js":
/*!************************************************************!*\
  !*** ./part-01/node_modules/ramda/src/internal/_curryN.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _arity = __webpack_require__(/*! ./_arity */ \"./part-01/node_modules/ramda/src/internal/_arity.js\");\nvar _isPlaceholder = __webpack_require__(/*! ./_isPlaceholder */ \"./part-01/node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n\n/**\n * Internal curryN function.\n *\n * @private\n * @category Function\n * @param {Number} length The arity of the curried function.\n * @param {Array} received An array of arguments received thus far.\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nmodule.exports = function _curryN(length, received, fn) {\n  return function() {\n    var combined = [];\n    var argsIdx = 0;\n    var left = length;\n    var combinedIdx = 0;\n    while (combinedIdx < received.length || argsIdx < arguments.length) {\n      var result;\n      if (combinedIdx < received.length &&\n          (!_isPlaceholder(received[combinedIdx]) ||\n           argsIdx >= arguments.length)) {\n        result = received[combinedIdx];\n      } else {\n        result = arguments[argsIdx];\n        argsIdx += 1;\n      }\n      combined[combinedIdx] = result;\n      if (!_isPlaceholder(result)) {\n        left -= 1;\n      }\n      combinedIdx += 1;\n    }\n    return left <= 0 ? fn.apply(this, combined)\n                     : _arity(left, _curryN(length, combined, fn));\n  };\n};\n\n\n//# sourceURL=webpack:///./part-01/node_modules/ramda/src/internal/_curryN.js?");

/***/ }),

/***/ "./part-01/node_modules/ramda/src/internal/_isPlaceholder.js":
/*!*******************************************************************!*\
  !*** ./part-01/node_modules/ramda/src/internal/_isPlaceholder.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function _isPlaceholder(a) {\n  return a != null &&\n         typeof a === 'object' &&\n         a['@@functional/placeholder'] === true;\n};\n\n\n//# sourceURL=webpack:///./part-01/node_modules/ramda/src/internal/_isPlaceholder.js?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });