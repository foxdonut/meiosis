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
/******/ 	return __webpack_require__(__webpack_require__.s = "./part-04/04/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process, global) {/*!\n * @overview es6-promise - a tiny implementation of Promises/A+.\n * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)\n * @license   Licensed under MIT license\n *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE\n * @version   v4.2.4+314e4831\n */\n\n(function (global, factory) {\n\t true ? module.exports = factory() :\n\tundefined;\n}(this, (function () { 'use strict';\n\nfunction objectOrFunction(x) {\n  var type = typeof x;\n  return x !== null && (type === 'object' || type === 'function');\n}\n\nfunction isFunction(x) {\n  return typeof x === 'function';\n}\n\n\n\nvar _isArray = void 0;\nif (Array.isArray) {\n  _isArray = Array.isArray;\n} else {\n  _isArray = function (x) {\n    return Object.prototype.toString.call(x) === '[object Array]';\n  };\n}\n\nvar isArray = _isArray;\n\nvar len = 0;\nvar vertxNext = void 0;\nvar customSchedulerFn = void 0;\n\nvar asap = function asap(callback, arg) {\n  queue[len] = callback;\n  queue[len + 1] = arg;\n  len += 2;\n  if (len === 2) {\n    // If len is 2, that means that we need to schedule an async flush.\n    // If additional callbacks are queued before the queue is flushed, they\n    // will be processed by this flush that we are scheduling.\n    if (customSchedulerFn) {\n      customSchedulerFn(flush);\n    } else {\n      scheduleFlush();\n    }\n  }\n};\n\nfunction setScheduler(scheduleFn) {\n  customSchedulerFn = scheduleFn;\n}\n\nfunction setAsap(asapFn) {\n  asap = asapFn;\n}\n\nvar browserWindow = typeof window !== 'undefined' ? window : undefined;\nvar browserGlobal = browserWindow || {};\nvar BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;\nvar isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';\n\n// test for web worker but not in IE10\nvar isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';\n\n// node\nfunction useNextTick() {\n  // node version 0.10.x displays a deprecation warning when nextTick is used recursively\n  // see https://github.com/cujojs/when/issues/410 for details\n  return function () {\n    return process.nextTick(flush);\n  };\n}\n\n// vertx\nfunction useVertxTimer() {\n  if (typeof vertxNext !== 'undefined') {\n    return function () {\n      vertxNext(flush);\n    };\n  }\n\n  return useSetTimeout();\n}\n\nfunction useMutationObserver() {\n  var iterations = 0;\n  var observer = new BrowserMutationObserver(flush);\n  var node = document.createTextNode('');\n  observer.observe(node, { characterData: true });\n\n  return function () {\n    node.data = iterations = ++iterations % 2;\n  };\n}\n\n// web worker\nfunction useMessageChannel() {\n  var channel = new MessageChannel();\n  channel.port1.onmessage = flush;\n  return function () {\n    return channel.port2.postMessage(0);\n  };\n}\n\nfunction useSetTimeout() {\n  // Store setTimeout reference so es6-promise will be unaffected by\n  // other code modifying setTimeout (like sinon.useFakeTimers())\n  var globalSetTimeout = setTimeout;\n  return function () {\n    return globalSetTimeout(flush, 1);\n  };\n}\n\nvar queue = new Array(1000);\nfunction flush() {\n  for (var i = 0; i < len; i += 2) {\n    var callback = queue[i];\n    var arg = queue[i + 1];\n\n    callback(arg);\n\n    queue[i] = undefined;\n    queue[i + 1] = undefined;\n  }\n\n  len = 0;\n}\n\nfunction attemptVertx() {\n  try {\n    var vertx = Function('return this')().require('vertx');\n    vertxNext = vertx.runOnLoop || vertx.runOnContext;\n    return useVertxTimer();\n  } catch (e) {\n    return useSetTimeout();\n  }\n}\n\nvar scheduleFlush = void 0;\n// Decide what async method to use to triggering processing of queued callbacks:\nif (isNode) {\n  scheduleFlush = useNextTick();\n} else if (BrowserMutationObserver) {\n  scheduleFlush = useMutationObserver();\n} else if (isWorker) {\n  scheduleFlush = useMessageChannel();\n} else if (browserWindow === undefined && \"function\" === 'function') {\n  scheduleFlush = attemptVertx();\n} else {\n  scheduleFlush = useSetTimeout();\n}\n\nfunction then(onFulfillment, onRejection) {\n  var parent = this;\n\n  var child = new this.constructor(noop);\n\n  if (child[PROMISE_ID] === undefined) {\n    makePromise(child);\n  }\n\n  var _state = parent._state;\n\n\n  if (_state) {\n    var callback = arguments[_state - 1];\n    asap(function () {\n      return invokeCallback(_state, child, callback, parent._result);\n    });\n  } else {\n    subscribe(parent, child, onFulfillment, onRejection);\n  }\n\n  return child;\n}\n\n/**\n  `Promise.resolve` returns a promise that will become resolved with the\n  passed `value`. It is shorthand for the following:\n\n  ```javascript\n  let promise = new Promise(function(resolve, reject){\n    resolve(1);\n  });\n\n  promise.then(function(value){\n    // value === 1\n  });\n  ```\n\n  Instead of writing the above, your code now simply becomes the following:\n\n  ```javascript\n  let promise = Promise.resolve(1);\n\n  promise.then(function(value){\n    // value === 1\n  });\n  ```\n\n  @method resolve\n  @static\n  @param {Any} value value that the returned promise will be resolved with\n  Useful for tooling.\n  @return {Promise} a promise that will become fulfilled with the given\n  `value`\n*/\nfunction resolve$1(object) {\n  /*jshint validthis:true */\n  var Constructor = this;\n\n  if (object && typeof object === 'object' && object.constructor === Constructor) {\n    return object;\n  }\n\n  var promise = new Constructor(noop);\n  resolve(promise, object);\n  return promise;\n}\n\nvar PROMISE_ID = Math.random().toString(36).substring(2);\n\nfunction noop() {}\n\nvar PENDING = void 0;\nvar FULFILLED = 1;\nvar REJECTED = 2;\n\nvar TRY_CATCH_ERROR = { error: null };\n\nfunction selfFulfillment() {\n  return new TypeError(\"You cannot resolve a promise with itself\");\n}\n\nfunction cannotReturnOwn() {\n  return new TypeError('A promises callback cannot return that same promise.');\n}\n\nfunction getThen(promise) {\n  try {\n    return promise.then;\n  } catch (error) {\n    TRY_CATCH_ERROR.error = error;\n    return TRY_CATCH_ERROR;\n  }\n}\n\nfunction tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {\n  try {\n    then$$1.call(value, fulfillmentHandler, rejectionHandler);\n  } catch (e) {\n    return e;\n  }\n}\n\nfunction handleForeignThenable(promise, thenable, then$$1) {\n  asap(function (promise) {\n    var sealed = false;\n    var error = tryThen(then$$1, thenable, function (value) {\n      if (sealed) {\n        return;\n      }\n      sealed = true;\n      if (thenable !== value) {\n        resolve(promise, value);\n      } else {\n        fulfill(promise, value);\n      }\n    }, function (reason) {\n      if (sealed) {\n        return;\n      }\n      sealed = true;\n\n      reject(promise, reason);\n    }, 'Settle: ' + (promise._label || ' unknown promise'));\n\n    if (!sealed && error) {\n      sealed = true;\n      reject(promise, error);\n    }\n  }, promise);\n}\n\nfunction handleOwnThenable(promise, thenable) {\n  if (thenable._state === FULFILLED) {\n    fulfill(promise, thenable._result);\n  } else if (thenable._state === REJECTED) {\n    reject(promise, thenable._result);\n  } else {\n    subscribe(thenable, undefined, function (value) {\n      return resolve(promise, value);\n    }, function (reason) {\n      return reject(promise, reason);\n    });\n  }\n}\n\nfunction handleMaybeThenable(promise, maybeThenable, then$$1) {\n  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {\n    handleOwnThenable(promise, maybeThenable);\n  } else {\n    if (then$$1 === TRY_CATCH_ERROR) {\n      reject(promise, TRY_CATCH_ERROR.error);\n      TRY_CATCH_ERROR.error = null;\n    } else if (then$$1 === undefined) {\n      fulfill(promise, maybeThenable);\n    } else if (isFunction(then$$1)) {\n      handleForeignThenable(promise, maybeThenable, then$$1);\n    } else {\n      fulfill(promise, maybeThenable);\n    }\n  }\n}\n\nfunction resolve(promise, value) {\n  if (promise === value) {\n    reject(promise, selfFulfillment());\n  } else if (objectOrFunction(value)) {\n    handleMaybeThenable(promise, value, getThen(value));\n  } else {\n    fulfill(promise, value);\n  }\n}\n\nfunction publishRejection(promise) {\n  if (promise._onerror) {\n    promise._onerror(promise._result);\n  }\n\n  publish(promise);\n}\n\nfunction fulfill(promise, value) {\n  if (promise._state !== PENDING) {\n    return;\n  }\n\n  promise._result = value;\n  promise._state = FULFILLED;\n\n  if (promise._subscribers.length !== 0) {\n    asap(publish, promise);\n  }\n}\n\nfunction reject(promise, reason) {\n  if (promise._state !== PENDING) {\n    return;\n  }\n  promise._state = REJECTED;\n  promise._result = reason;\n\n  asap(publishRejection, promise);\n}\n\nfunction subscribe(parent, child, onFulfillment, onRejection) {\n  var _subscribers = parent._subscribers;\n  var length = _subscribers.length;\n\n\n  parent._onerror = null;\n\n  _subscribers[length] = child;\n  _subscribers[length + FULFILLED] = onFulfillment;\n  _subscribers[length + REJECTED] = onRejection;\n\n  if (length === 0 && parent._state) {\n    asap(publish, parent);\n  }\n}\n\nfunction publish(promise) {\n  var subscribers = promise._subscribers;\n  var settled = promise._state;\n\n  if (subscribers.length === 0) {\n    return;\n  }\n\n  var child = void 0,\n      callback = void 0,\n      detail = promise._result;\n\n  for (var i = 0; i < subscribers.length; i += 3) {\n    child = subscribers[i];\n    callback = subscribers[i + settled];\n\n    if (child) {\n      invokeCallback(settled, child, callback, detail);\n    } else {\n      callback(detail);\n    }\n  }\n\n  promise._subscribers.length = 0;\n}\n\nfunction tryCatch(callback, detail) {\n  try {\n    return callback(detail);\n  } catch (e) {\n    TRY_CATCH_ERROR.error = e;\n    return TRY_CATCH_ERROR;\n  }\n}\n\nfunction invokeCallback(settled, promise, callback, detail) {\n  var hasCallback = isFunction(callback),\n      value = void 0,\n      error = void 0,\n      succeeded = void 0,\n      failed = void 0;\n\n  if (hasCallback) {\n    value = tryCatch(callback, detail);\n\n    if (value === TRY_CATCH_ERROR) {\n      failed = true;\n      error = value.error;\n      value.error = null;\n    } else {\n      succeeded = true;\n    }\n\n    if (promise === value) {\n      reject(promise, cannotReturnOwn());\n      return;\n    }\n  } else {\n    value = detail;\n    succeeded = true;\n  }\n\n  if (promise._state !== PENDING) {\n    // noop\n  } else if (hasCallback && succeeded) {\n    resolve(promise, value);\n  } else if (failed) {\n    reject(promise, error);\n  } else if (settled === FULFILLED) {\n    fulfill(promise, value);\n  } else if (settled === REJECTED) {\n    reject(promise, value);\n  }\n}\n\nfunction initializePromise(promise, resolver) {\n  try {\n    resolver(function resolvePromise(value) {\n      resolve(promise, value);\n    }, function rejectPromise(reason) {\n      reject(promise, reason);\n    });\n  } catch (e) {\n    reject(promise, e);\n  }\n}\n\nvar id = 0;\nfunction nextId() {\n  return id++;\n}\n\nfunction makePromise(promise) {\n  promise[PROMISE_ID] = id++;\n  promise._state = undefined;\n  promise._result = undefined;\n  promise._subscribers = [];\n}\n\nfunction validationError() {\n  return new Error('Array Methods must be provided an Array');\n}\n\nvar Enumerator = function () {\n  function Enumerator(Constructor, input) {\n    this._instanceConstructor = Constructor;\n    this.promise = new Constructor(noop);\n\n    if (!this.promise[PROMISE_ID]) {\n      makePromise(this.promise);\n    }\n\n    if (isArray(input)) {\n      this.length = input.length;\n      this._remaining = input.length;\n\n      this._result = new Array(this.length);\n\n      if (this.length === 0) {\n        fulfill(this.promise, this._result);\n      } else {\n        this.length = this.length || 0;\n        this._enumerate(input);\n        if (this._remaining === 0) {\n          fulfill(this.promise, this._result);\n        }\n      }\n    } else {\n      reject(this.promise, validationError());\n    }\n  }\n\n  Enumerator.prototype._enumerate = function _enumerate(input) {\n    for (var i = 0; this._state === PENDING && i < input.length; i++) {\n      this._eachEntry(input[i], i);\n    }\n  };\n\n  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {\n    var c = this._instanceConstructor;\n    var resolve$$1 = c.resolve;\n\n\n    if (resolve$$1 === resolve$1) {\n      var _then = getThen(entry);\n\n      if (_then === then && entry._state !== PENDING) {\n        this._settledAt(entry._state, i, entry._result);\n      } else if (typeof _then !== 'function') {\n        this._remaining--;\n        this._result[i] = entry;\n      } else if (c === Promise$1) {\n        var promise = new c(noop);\n        handleMaybeThenable(promise, entry, _then);\n        this._willSettleAt(promise, i);\n      } else {\n        this._willSettleAt(new c(function (resolve$$1) {\n          return resolve$$1(entry);\n        }), i);\n      }\n    } else {\n      this._willSettleAt(resolve$$1(entry), i);\n    }\n  };\n\n  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {\n    var promise = this.promise;\n\n\n    if (promise._state === PENDING) {\n      this._remaining--;\n\n      if (state === REJECTED) {\n        reject(promise, value);\n      } else {\n        this._result[i] = value;\n      }\n    }\n\n    if (this._remaining === 0) {\n      fulfill(promise, this._result);\n    }\n  };\n\n  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {\n    var enumerator = this;\n\n    subscribe(promise, undefined, function (value) {\n      return enumerator._settledAt(FULFILLED, i, value);\n    }, function (reason) {\n      return enumerator._settledAt(REJECTED, i, reason);\n    });\n  };\n\n  return Enumerator;\n}();\n\n/**\n  `Promise.all` accepts an array of promises, and returns a new promise which\n  is fulfilled with an array of fulfillment values for the passed promises, or\n  rejected with the reason of the first passed promise to be rejected. It casts all\n  elements of the passed iterable to promises as it runs this algorithm.\n\n  Example:\n\n  ```javascript\n  let promise1 = resolve(1);\n  let promise2 = resolve(2);\n  let promise3 = resolve(3);\n  let promises = [ promise1, promise2, promise3 ];\n\n  Promise.all(promises).then(function(array){\n    // The array here would be [ 1, 2, 3 ];\n  });\n  ```\n\n  If any of the `promises` given to `all` are rejected, the first promise\n  that is rejected will be given as an argument to the returned promises's\n  rejection handler. For example:\n\n  Example:\n\n  ```javascript\n  let promise1 = resolve(1);\n  let promise2 = reject(new Error(\"2\"));\n  let promise3 = reject(new Error(\"3\"));\n  let promises = [ promise1, promise2, promise3 ];\n\n  Promise.all(promises).then(function(array){\n    // Code here never runs because there are rejected promises!\n  }, function(error) {\n    // error.message === \"2\"\n  });\n  ```\n\n  @method all\n  @static\n  @param {Array} entries array of promises\n  @param {String} label optional string for labeling the promise.\n  Useful for tooling.\n  @return {Promise} promise that is fulfilled when all `promises` have been\n  fulfilled, or rejected if any of them become rejected.\n  @static\n*/\nfunction all(entries) {\n  return new Enumerator(this, entries).promise;\n}\n\n/**\n  `Promise.race` returns a new promise which is settled in the same way as the\n  first passed promise to settle.\n\n  Example:\n\n  ```javascript\n  let promise1 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      resolve('promise 1');\n    }, 200);\n  });\n\n  let promise2 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      resolve('promise 2');\n    }, 100);\n  });\n\n  Promise.race([promise1, promise2]).then(function(result){\n    // result === 'promise 2' because it was resolved before promise1\n    // was resolved.\n  });\n  ```\n\n  `Promise.race` is deterministic in that only the state of the first\n  settled promise matters. For example, even if other promises given to the\n  `promises` array argument are resolved, but the first settled promise has\n  become rejected before the other promises became fulfilled, the returned\n  promise will become rejected:\n\n  ```javascript\n  let promise1 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      resolve('promise 1');\n    }, 200);\n  });\n\n  let promise2 = new Promise(function(resolve, reject){\n    setTimeout(function(){\n      reject(new Error('promise 2'));\n    }, 100);\n  });\n\n  Promise.race([promise1, promise2]).then(function(result){\n    // Code here never runs\n  }, function(reason){\n    // reason.message === 'promise 2' because promise 2 became rejected before\n    // promise 1 became fulfilled\n  });\n  ```\n\n  An example real-world use case is implementing timeouts:\n\n  ```javascript\n  Promise.race([ajax('foo.json'), timeout(5000)])\n  ```\n\n  @method race\n  @static\n  @param {Array} promises array of promises to observe\n  Useful for tooling.\n  @return {Promise} a promise which settles in the same way as the first passed\n  promise to settle.\n*/\nfunction race(entries) {\n  /*jshint validthis:true */\n  var Constructor = this;\n\n  if (!isArray(entries)) {\n    return new Constructor(function (_, reject) {\n      return reject(new TypeError('You must pass an array to race.'));\n    });\n  } else {\n    return new Constructor(function (resolve, reject) {\n      var length = entries.length;\n      for (var i = 0; i < length; i++) {\n        Constructor.resolve(entries[i]).then(resolve, reject);\n      }\n    });\n  }\n}\n\n/**\n  `Promise.reject` returns a promise rejected with the passed `reason`.\n  It is shorthand for the following:\n\n  ```javascript\n  let promise = new Promise(function(resolve, reject){\n    reject(new Error('WHOOPS'));\n  });\n\n  promise.then(function(value){\n    // Code here doesn't run because the promise is rejected!\n  }, function(reason){\n    // reason.message === 'WHOOPS'\n  });\n  ```\n\n  Instead of writing the above, your code now simply becomes the following:\n\n  ```javascript\n  let promise = Promise.reject(new Error('WHOOPS'));\n\n  promise.then(function(value){\n    // Code here doesn't run because the promise is rejected!\n  }, function(reason){\n    // reason.message === 'WHOOPS'\n  });\n  ```\n\n  @method reject\n  @static\n  @param {Any} reason value that the returned promise will be rejected with.\n  Useful for tooling.\n  @return {Promise} a promise rejected with the given `reason`.\n*/\nfunction reject$1(reason) {\n  /*jshint validthis:true */\n  var Constructor = this;\n  var promise = new Constructor(noop);\n  reject(promise, reason);\n  return promise;\n}\n\nfunction needsResolver() {\n  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');\n}\n\nfunction needsNew() {\n  throw new TypeError(\"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.\");\n}\n\n/**\n  Promise objects represent the eventual result of an asynchronous operation. The\n  primary way of interacting with a promise is through its `then` method, which\n  registers callbacks to receive either a promise's eventual value or the reason\n  why the promise cannot be fulfilled.\n\n  Terminology\n  -----------\n\n  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.\n  - `thenable` is an object or function that defines a `then` method.\n  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).\n  - `exception` is a value that is thrown using the throw statement.\n  - `reason` is a value that indicates why a promise was rejected.\n  - `settled` the final resting state of a promise, fulfilled or rejected.\n\n  A promise can be in one of three states: pending, fulfilled, or rejected.\n\n  Promises that are fulfilled have a fulfillment value and are in the fulfilled\n  state.  Promises that are rejected have a rejection reason and are in the\n  rejected state.  A fulfillment value is never a thenable.\n\n  Promises can also be said to *resolve* a value.  If this value is also a\n  promise, then the original promise's settled state will match the value's\n  settled state.  So a promise that *resolves* a promise that rejects will\n  itself reject, and a promise that *resolves* a promise that fulfills will\n  itself fulfill.\n\n\n  Basic Usage:\n  ------------\n\n  ```js\n  let promise = new Promise(function(resolve, reject) {\n    // on success\n    resolve(value);\n\n    // on failure\n    reject(reason);\n  });\n\n  promise.then(function(value) {\n    // on fulfillment\n  }, function(reason) {\n    // on rejection\n  });\n  ```\n\n  Advanced Usage:\n  ---------------\n\n  Promises shine when abstracting away asynchronous interactions such as\n  `XMLHttpRequest`s.\n\n  ```js\n  function getJSON(url) {\n    return new Promise(function(resolve, reject){\n      let xhr = new XMLHttpRequest();\n\n      xhr.open('GET', url);\n      xhr.onreadystatechange = handler;\n      xhr.responseType = 'json';\n      xhr.setRequestHeader('Accept', 'application/json');\n      xhr.send();\n\n      function handler() {\n        if (this.readyState === this.DONE) {\n          if (this.status === 200) {\n            resolve(this.response);\n          } else {\n            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));\n          }\n        }\n      };\n    });\n  }\n\n  getJSON('/posts.json').then(function(json) {\n    // on fulfillment\n  }, function(reason) {\n    // on rejection\n  });\n  ```\n\n  Unlike callbacks, promises are great composable primitives.\n\n  ```js\n  Promise.all([\n    getJSON('/posts'),\n    getJSON('/comments')\n  ]).then(function(values){\n    values[0] // => postsJSON\n    values[1] // => commentsJSON\n\n    return values;\n  });\n  ```\n\n  @class Promise\n  @param {Function} resolver\n  Useful for tooling.\n  @constructor\n*/\n\nvar Promise$1 = function () {\n  function Promise(resolver) {\n    this[PROMISE_ID] = nextId();\n    this._result = this._state = undefined;\n    this._subscribers = [];\n\n    if (noop !== resolver) {\n      typeof resolver !== 'function' && needsResolver();\n      this instanceof Promise ? initializePromise(this, resolver) : needsNew();\n    }\n  }\n\n  /**\n  The primary way of interacting with a promise is through its `then` method,\n  which registers callbacks to receive either a promise's eventual value or the\n  reason why the promise cannot be fulfilled.\n   ```js\n  findUser().then(function(user){\n    // user is available\n  }, function(reason){\n    // user is unavailable, and you are given the reason why\n  });\n  ```\n   Chaining\n  --------\n   The return value of `then` is itself a promise.  This second, 'downstream'\n  promise is resolved with the return value of the first promise's fulfillment\n  or rejection handler, or rejected if the handler throws an exception.\n   ```js\n  findUser().then(function (user) {\n    return user.name;\n  }, function (reason) {\n    return 'default name';\n  }).then(function (userName) {\n    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it\n    // will be `'default name'`\n  });\n   findUser().then(function (user) {\n    throw new Error('Found user, but still unhappy');\n  }, function (reason) {\n    throw new Error('`findUser` rejected and we're unhappy');\n  }).then(function (value) {\n    // never reached\n  }, function (reason) {\n    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.\n    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.\n  });\n  ```\n  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.\n   ```js\n  findUser().then(function (user) {\n    throw new PedagogicalException('Upstream error');\n  }).then(function (value) {\n    // never reached\n  }).then(function (value) {\n    // never reached\n  }, function (reason) {\n    // The `PedgagocialException` is propagated all the way down to here\n  });\n  ```\n   Assimilation\n  ------------\n   Sometimes the value you want to propagate to a downstream promise can only be\n  retrieved asynchronously. This can be achieved by returning a promise in the\n  fulfillment or rejection handler. The downstream promise will then be pending\n  until the returned promise is settled. This is called *assimilation*.\n   ```js\n  findUser().then(function (user) {\n    return findCommentsByAuthor(user);\n  }).then(function (comments) {\n    // The user's comments are now available\n  });\n  ```\n   If the assimliated promise rejects, then the downstream promise will also reject.\n   ```js\n  findUser().then(function (user) {\n    return findCommentsByAuthor(user);\n  }).then(function (comments) {\n    // If `findCommentsByAuthor` fulfills, we'll have the value here\n  }, function (reason) {\n    // If `findCommentsByAuthor` rejects, we'll have the reason here\n  });\n  ```\n   Simple Example\n  --------------\n   Synchronous Example\n   ```javascript\n  let result;\n   try {\n    result = findResult();\n    // success\n  } catch(reason) {\n    // failure\n  }\n  ```\n   Errback Example\n   ```js\n  findResult(function(result, err){\n    if (err) {\n      // failure\n    } else {\n      // success\n    }\n  });\n  ```\n   Promise Example;\n   ```javascript\n  findResult().then(function(result){\n    // success\n  }, function(reason){\n    // failure\n  });\n  ```\n   Advanced Example\n  --------------\n   Synchronous Example\n   ```javascript\n  let author, books;\n   try {\n    author = findAuthor();\n    books  = findBooksByAuthor(author);\n    // success\n  } catch(reason) {\n    // failure\n  }\n  ```\n   Errback Example\n   ```js\n   function foundBooks(books) {\n   }\n   function failure(reason) {\n   }\n   findAuthor(function(author, err){\n    if (err) {\n      failure(err);\n      // failure\n    } else {\n      try {\n        findBoooksByAuthor(author, function(books, err) {\n          if (err) {\n            failure(err);\n          } else {\n            try {\n              foundBooks(books);\n            } catch(reason) {\n              failure(reason);\n            }\n          }\n        });\n      } catch(error) {\n        failure(err);\n      }\n      // success\n    }\n  });\n  ```\n   Promise Example;\n   ```javascript\n  findAuthor().\n    then(findBooksByAuthor).\n    then(function(books){\n      // found books\n  }).catch(function(reason){\n    // something went wrong\n  });\n  ```\n   @method then\n  @param {Function} onFulfilled\n  @param {Function} onRejected\n  Useful for tooling.\n  @return {Promise}\n  */\n\n  /**\n  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same\n  as the catch block of a try/catch statement.\n  ```js\n  function findAuthor(){\n  throw new Error('couldn't find that author');\n  }\n  // synchronous\n  try {\n  findAuthor();\n  } catch(reason) {\n  // something went wrong\n  }\n  // async with promises\n  findAuthor().catch(function(reason){\n  // something went wrong\n  });\n  ```\n  @method catch\n  @param {Function} onRejection\n  Useful for tooling.\n  @return {Promise}\n  */\n\n\n  Promise.prototype.catch = function _catch(onRejection) {\n    return this.then(null, onRejection);\n  };\n\n  /**\n    `finally` will be invoked regardless of the promise's fate just as native\n    try/catch/finally behaves\n  \n    Synchronous example:\n  \n    ```js\n    findAuthor() {\n      if (Math.random() > 0.5) {\n        throw new Error();\n      }\n      return new Author();\n    }\n  \n    try {\n      return findAuthor(); // succeed or fail\n    } catch(error) {\n      return findOtherAuther();\n    } finally {\n      // always runs\n      // doesn't affect the return value\n    }\n    ```\n  \n    Asynchronous example:\n  \n    ```js\n    findAuthor().catch(function(reason){\n      return findOtherAuther();\n    }).finally(function(){\n      // author was either found, or not\n    });\n    ```\n  \n    @method finally\n    @param {Function} callback\n    @return {Promise}\n  */\n\n\n  Promise.prototype.finally = function _finally(callback) {\n    var promise = this;\n    var constructor = promise.constructor;\n\n    return promise.then(function (value) {\n      return constructor.resolve(callback()).then(function () {\n        return value;\n      });\n    }, function (reason) {\n      return constructor.resolve(callback()).then(function () {\n        throw reason;\n      });\n    });\n  };\n\n  return Promise;\n}();\n\nPromise$1.prototype.then = then;\nPromise$1.all = all;\nPromise$1.race = race;\nPromise$1.resolve = resolve$1;\nPromise$1.reject = reject$1;\nPromise$1._setScheduler = setScheduler;\nPromise$1._setAsap = setAsap;\nPromise$1._asap = asap;\n\n/*global self*/\nfunction polyfill() {\n  var local = void 0;\n\n  if (typeof global !== 'undefined') {\n    local = global;\n  } else if (typeof self !== 'undefined') {\n    local = self;\n  } else {\n    try {\n      local = Function('return this')();\n    } catch (e) {\n      throw new Error('polyfill failed because global object is unavailable in this environment');\n    }\n  }\n\n  var P = local.Promise;\n\n  if (P) {\n    var promiseToString = null;\n    try {\n      promiseToString = Object.prototype.toString.call(P.resolve());\n    } catch (e) {\n      // silently ignored\n    }\n\n    if (promiseToString === '[object Promise]' && !P.cast) {\n      return;\n    }\n  }\n\n  local.Promise = Promise$1;\n}\n\n// Strange compat..\nPromise$1.polyfill = polyfill;\nPromise$1.Promise = Promise$1;\n\nreturn Promise$1;\n\n})));\n\n\n\n//# sourceMappingURL=es6-promise.map\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/es6-promise/dist/es6-promise.js?");

/***/ }),

/***/ "./node_modules/flyd/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/flyd/lib/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar curryN = __webpack_require__(/*! ramda/src/curryN */ \"./node_modules/ramda/src/curryN.js\");\n\n// Utility\nfunction isFunction(obj) {\n  return !!(obj && obj.constructor && obj.call && obj.apply);\n}\nfunction trueFn() { return true; }\n\n// Globals\nvar toUpdate = [];\nvar inStream;\nvar order = [];\nvar orderNextIdx = -1;\nvar flushing = false;\n\n/** @namespace */\nvar flyd = {}\n\n// /////////////////////////// API ///////////////////////////////// //\n\n/**\n * Creates a new stream\n *\n * __Signature__: `a -> Stream a`\n *\n * @name flyd.stream\n * @param {*} initialValue - (Optional) the initial value of the stream\n * @return {stream} the stream\n *\n * @example\n * var n = flyd.stream(1); // Stream with initial value `1`\n * var s = flyd.stream(); // Stream with no initial value\n */\nflyd.stream = function(initialValue) {\n  var endStream = createDependentStream([], trueFn);\n  var s = createStream();\n  s.end = endStream;\n  s.fnArgs = [];\n  endStream.listeners.push(s);\n  if (arguments.length > 0) s(initialValue);\n  return s;\n}\n// fantasy-land Applicative\nflyd.stream['fantasy-land/of'] = flyd.stream.of = flyd.stream;\n\n\n/**\n * Create a new dependent stream\n *\n * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`\n *\n * @name flyd.combine\n * @param {Function} fn - the function used to combine the streams\n * @param {Array<stream>} dependencies - the streams that this one depends on\n * @return {stream} the dependent stream\n *\n * @example\n * var n1 = flyd.stream(0);\n * var n2 = flyd.stream(0);\n * var max = flyd.combine(function(n1, n2, self, changed) {\n *   return n1() > n2() ? n1() : n2();\n * }, [n1, n2]);\n */\nflyd.combine = curryN(2, combine);\nfunction combine(fn, streams) {\n  var i, s, deps, depEndStreams;\n  var endStream = createDependentStream([], trueFn);\n  deps = []; depEndStreams = [];\n  for (i = 0; i < streams.length; ++i) {\n    if (streams[i] !== undefined) {\n      deps.push(streams[i]);\n      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);\n    }\n  }\n  s = createDependentStream(deps, fn);\n  s.depsChanged = [];\n  s.fnArgs = s.deps.concat([s, s.depsChanged]);\n  s.end = endStream;\n  endStream.listeners.push(s);\n  addListeners(depEndStreams, endStream);\n  endStream.deps = depEndStreams;\n  updateStream(s);\n  return s;\n}\n\n/**\n * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.\n *\n * __Signature__: `* -> Boolean`\n *\n * @name flyd.isStream\n * @param {*} value - the value to test\n * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise\n *\n * @example\n * var s = flyd.stream(1);\n * var n = 1;\n * flyd.isStream(s); //=> true\n * flyd.isStream(n); //=> false\n */\nflyd.isStream = function(stream) {\n  return isFunction(stream) && 'hasVal' in stream;\n}\n\n/**\n * Invokes the body (the function to calculate the value) of a dependent stream\n *\n * By default the body of a dependent stream is only called when all the streams\n * upon which it depends has a value. `immediate` can circumvent this behaviour.\n * It immediately invokes the body of a dependent stream.\n *\n * __Signature__: `Stream a -> Stream a`\n *\n * @name flyd.immediate\n * @param {stream} stream - the dependent stream\n * @return {stream} the same stream\n *\n * @example\n * var s = flyd.stream();\n * var hasItems = flyd.immediate(flyd.combine(function(s) {\n *   return s() !== undefined && s().length > 0;\n * }, [s]);\n * console.log(hasItems()); // logs `false`. Had `immediate` not been\n *                          // used `hasItems()` would've returned `undefined`\n * s([1]);\n * console.log(hasItems()); // logs `true`.\n * s([]);\n * console.log(hasItems()); // logs `false`.\n */\nflyd.immediate = function(s) {\n  if (s.depsMet === false) {\n    s.depsMet = true;\n    updateStream(s);\n  }\n  return s;\n}\n\n/**\n * Changes which `endsStream` should trigger the ending of `s`.\n *\n * __Signature__: `Stream a -> Stream b -> Stream b`\n *\n * @name flyd.endsOn\n * @param {stream} endStream - the stream to trigger the ending\n * @param {stream} stream - the stream to be ended by the endStream\n * @param {stream} the stream modified to be ended by endStream\n *\n * @example\n * var n = flyd.stream(1);\n * var killer = flyd.stream();\n * // `double` ends when `n` ends or when `killer` emits any value\n * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {\n *   return 2 * n();\n * }, [n]);\n*/\nflyd.endsOn = function(endS, s) {\n  detachDeps(s.end);\n  endS.listeners.push(s.end);\n  s.end.deps.push(endS);\n  return s;\n}\n\n/**\n * Map a stream\n *\n * Returns a new stream consisting of every value from `s` passed through\n * `fn`. I.e. `map` creates a new stream that listens to `s` and\n * applies `fn` to every new value.\n * __Signature__: `(a -> result) -> Stream a -> Stream result`\n *\n * @name flyd.map\n * @param {Function} fn - the function that produces the elements of the new stream\n * @param {stream} stream - the stream to map\n * @return {stream} a new stream with the mapped values\n *\n * @example\n * var numbers = flyd.stream(0);\n * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);\n */\n// Library functions use self callback to accept (null, undefined) update triggers.\nflyd.map = curryN(2, function(f, s) {\n  return combine(function(s, self) { self(f(s.val)); }, [s]);\n})\n\n/**\n * Chain a stream\n *\n * also known as flatMap\n *\n * Where `fn` returns a stream this function will flatten the resulting streams.\n * Every time `fn` is called the context of the returned stream will \"switch\" to that stream.\n *\n * __Signature__: `(a -> Stream b) -> Stream a -> Stream b`\n *\n * @name flyd.chain\n * @param {Function} fn - the function that produces the streams to be flattened\n * @param {stream} stream - the stream to map\n * @return {stream} a new stream with the mapped values\n *\n * @example\n * var filter = flyd.stream('who');\n * var items = flyd.chain(function(filter){\n *   return flyd.stream(findUsers(filter));\n * }, filter);\n */\nflyd.chain = curryN(2, chain);\n\n/**\n * Apply a stream\n *\n * Applies the value in `s2` to the function in `s1`.\n *\n * __Signature__: `Stream (a -> b) -> Stream a -> Stream b`\n *\n * @name flyd.ap\n * @param {stream} s1 - The value to be applied\n * @param {stream} s2 - The function expecting the value\n * @return {stream} a new stream with the mapped values\n *\n * @example\n * var add = stream(a => b => a + b)\n * var n1 = stream(1)\n * var n2 = stream(2)\n *\n * var added = flyd.ap(n2, flyd.ap(n1, add)) // stream(3)\n * // can also be written using pipe\n * var added_pipe = add\n *   .pipe(ap(n1))\n *   .pipe(ap(n2));\n * added_pipe() // 3\n */\nflyd.ap = curryN(2, ap);\n\n/**\n * Listen to stream events\n *\n * Similar to `map` except that the returned stream is empty. Use `on` for doing\n * side effects in reaction to stream changes. Use the returned stream only if you\n * need to manually end it.\n *\n * __Signature__: `(a -> result) -> Stream a -> Stream undefined`\n *\n * @name flyd.on\n * @param {Function} cb - the callback\n * @param {stream} stream - the stream\n * @return {stream} an empty stream (can be ended)\n */\nflyd.on = curryN(2, function(f, s) {\n  return combine(function(s) { f(s.val); }, [s]);\n})\n\n/**\n * Creates a new stream with the results of calling the function on every incoming\n * stream with and accumulator and the incoming value.\n *\n * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`\n *\n * @name flyd.scan\n * @param {Function} fn - the function to call\n * @param {*} val - the initial value of the accumulator\n * @param {stream} stream - the stream source\n * @return {stream} the new stream\n *\n * @example\n * var numbers = flyd.stream();\n * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);\n * numbers(2)(3)(5);\n * sum(); // 10\n */\nflyd.scan = curryN(3, function(f, acc, s) {\n  var ns = combine(function(s, self) {\n    self(acc = f(acc, s.val));\n  }, [s]);\n  if (!ns.hasVal) ns(acc);\n  return ns;\n});\n\n/**\n * Creates a new stream down which all values from both `stream1` and `stream2`\n * will be sent.\n *\n * __Signature__: `Stream a -> Stream a -> Stream a`\n *\n * @name flyd.merge\n * @param {stream} source1 - one stream to be merged\n * @param {stream} source2 - the other stream to be merged\n * @return {stream} a stream with the values from both sources\n *\n * @example\n * var btn1Clicks = flyd.stream();\n * button1Elm.addEventListener(btn1Clicks);\n * var btn2Clicks = flyd.stream();\n * button2Elm.addEventListener(btn2Clicks);\n * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);\n */\nflyd.merge = curryN(2, function(s1, s2) {\n  var s = flyd.immediate(combine(function(s1, s2, self, changed) {\n    if (changed[0]) {\n      self(changed[0]());\n    } else if (s1.hasVal) {\n      self(s1.val);\n    } else if (s2.hasVal) {\n      self(s2.val);\n    }\n  }, [s1, s2]));\n  flyd.endsOn(combine(function() {\n    return true;\n  }, [s1.end, s2.end]), s);\n  return s;\n});\n\n/**\n * Creates a new stream resulting from applying `transducer` to `stream`.\n *\n * __Signature__: `Transducer -> Stream a -> Stream b`\n *\n * @name flyd.transduce\n * @param {Transducer} xform - the transducer transformation\n * @param {stream} source - the stream source\n * @return {stream} the new stream\n *\n * @example\n * var t = require('transducers.js');\n *\n * var results = [];\n * var s1 = flyd.stream();\n * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());\n * var s2 = flyd.transduce(tx, s1);\n * flyd.combine(function(s2) { results.push(s2()); }, [s2]);\n * s1(1)(1)(2)(3)(3)(3)(4);\n * results; // => [2, 4, 6, 8]\n */\nflyd.transduce = curryN(2, function(xform, source) {\n  xform = xform(new StreamTransformer());\n  return combine(function(source, self) {\n    var res = xform['@@transducer/step'](undefined, source.val);\n    if (res && res['@@transducer/reduced'] === true) {\n      self.end(true);\n      return res['@@transducer/value'];\n    } else {\n      return res;\n    }\n  }, [source]);\n});\n\n/**\n * Returns `fn` curried to `n`. Use this function to curry functions exposed by\n * modules for Flyd.\n *\n * @name flyd.curryN\n * @function\n * @param {Integer} arity - the function arity\n * @param {Function} fn - the function to curry\n * @return {Function} the curried function\n *\n * @example\n * function add(x, y) { return x + y; };\n * var a = flyd.curryN(2, add);\n * a(2)(4) // => 6\n */\nflyd.curryN = curryN\n\n/**\n * Returns a new stream identical to the original except every\n * value will be passed through `f`.\n *\n * _Note:_ This function is included in order to support the fantasy land\n * specification.\n *\n * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`\n *\n * @name stream.map\n * @param {Function} function - the function to apply\n * @return {stream} a new stream with the values mapped\n *\n * @example\n * var numbers = flyd.stream(0);\n * var squaredNumbers = numbers.map(function(n) { return n*n; });\n */\nfunction boundMap(f) { return flyd.map(f, this); }\n\n/**\n * Returns the result of applying function `fn` to this stream\n *\n * __Signature__: Called bound to `Stream a`: `(a -> Stream b) -> Stream b`\n *\n * @name stream.pipe\n * @param {Function} fn - the function to apply\n * @return {stream} A new stream\n *\n * @example\n * var numbers = flyd.stream(0);\n * var squaredNumbers = numbers.pipe(flyd.map(function(n){ return n*n; }));\n */\nfunction operator_pipe(f) { return f(this) }\n\nfunction boundChain(f) {\n  return chain(f, this);\n}\n\nfunction chain(f, s) {\n  // Internal state to end flat map stream\n  var flatEnd = flyd.stream(1);\n  var internalEnded = flyd.on(function() {\n    var alive = flatEnd() - 1;\n    flatEnd(alive);\n    if (alive <= 0) {\n      flatEnd.end(true);\n    }\n  });\n\n  internalEnded(s.end);\n  var last = flyd.stream();\n  var flatStream = flyd.combine(function(s, own) {\n    last.end(true)\n    // Our fn stream makes streams\n    var newS = f(s());\n    flatEnd(flatEnd() + 1);\n    internalEnded(newS.end);\n\n    // Update self on call -- newS is never handed out so deps don't matter\n    last = flyd.map(own, newS);\n  }, [s]);\n\n  flyd.endsOn(flatEnd.end, flatStream);\n\n  return flatStream;\n}\n\nflyd.fromPromise = function fromPromise(p) {\n  var s = flyd.stream();\n  p.then(function(val) {\n    s(val);\n    s.end(true);\n  });\n  return s;\n}\n\n/* istanbul ignore next */\nflyd.flattenPromise = function flattenPromise(s) {\n  return combine(function(s, self) {\n    s().then(self);\n  }, [s])\n}\n\n\n/**\n * Returns a new stream which is the result of applying the\n * functions from `this` stream to the values in `stream` parameter.\n *\n * `this` stream must be a stream of functions.\n *\n * _Note:_ This function is included in order to support the fantasy land\n * specification.\n *\n * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`\n *\n * @name stream.ap\n * @param {stream} stream - the values stream\n * @return {stream} a new stream with the functions applied to values\n *\n * @example\n * var add = flyd.curryN(2, function(x, y) { return x + y; });\n * var numbers1 = flyd.stream();\n * var numbers2 = flyd.stream();\n * var addToNumbers1 = flyd.map(add, numbers1);\n * var added = addToNumbers1.ap(numbers2);\n */\nfunction ap(s2, s1) {\n  return combine(function(s1, s2, self) { self(s1.val(s2.val)); }, [s1, s2]);\n}\n\nfunction boundAp(s2) {\n  return ap(s2, this);\n}\n\n/**\n * @private\n */\nfunction fantasy_land_ap(s1) {\n  return ap(this, s1);\n}\n\n/**\n * Get a human readable view of a stream\n * @name stream.toString\n * @return {String} the stream string representation\n */\nfunction streamToString() {\n  return 'stream(' + this.val + ')';\n}\n\n/**\n * @name stream.end\n * @memberof stream\n * A stream that emits `true` when the stream ends. If `true` is pushed down the\n * stream the parent stream ends.\n */\n\n/**\n * @name stream.of\n * @function\n * @memberof stream\n * Returns a new stream with `value` as its initial value. It is identical to\n * calling `flyd.stream` with one argument.\n *\n * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`\n *\n * @param {*} value - the initial value\n * @return {stream} the new stream\n *\n * @example\n * var n = flyd.stream(1);\n * var m = n.of(1);\n */\n\n// /////////////////////////// PRIVATE ///////////////////////////////// //\n/**\n * @private\n * Create a stream with no dependencies and no value\n * @return {Function} a flyd stream\n */\nfunction createStream() {\n  function s(n) {\n    if (arguments.length === 0) return s.val\n    updateStreamValue(s, n)\n    return s\n  }\n  s.hasVal = false;\n  s.val = undefined;\n  s.vals = [];\n  s.listeners = [];\n  s.queued = false;\n  s.end = undefined;\n\n  // fantasy-land compatibility\n  s.ap = boundAp;\n  s['fantasy-land/map'] = s.map = boundMap;\n  s['fantasy-land/ap'] = fantasy_land_ap;\n  s['fantasy-land/of'] = s.of = flyd.stream;\n  s['fantasy-land/chain'] = s.chain = boundChain;\n\n  s.pipe = operator_pipe;\n\n  // According to the fantasy-land Applicative specification\n  // Given a value f, one can access its type representative via the constructor property:\n  // `f.constructor.of`\n  s.constructor = flyd.stream;\n\n  s.toJSON = function() {\n    return s.val;\n  }\n  s.toString = streamToString;\n  return s;\n}\n\n/**\n * @private\n * Create a dependent stream\n * @param {Array<stream>} dependencies - an array of the streams\n * @param {Function} fn - the function used to calculate the new stream value\n * from the dependencies\n * @return {stream} the created stream\n */\nfunction createDependentStream(deps, fn) {\n  var s = createStream();\n  s.fn = fn;\n  s.deps = deps;\n  s.depsMet = false;\n  s.depsChanged = deps.length > 0 ? [] : undefined;\n  s.shouldUpdate = false;\n  addListeners(deps, s);\n  return s;\n}\n\n/**\n * @private\n * Check if all the dependencies have values\n * @param {stream} stream - the stream to check depencencies from\n * @return {Boolean} `true` if all dependencies have vales, `false` otherwise\n */\nfunction initialDepsNotMet(stream) {\n  stream.depsMet = stream.deps.every(function(s) {\n    return s.hasVal;\n  });\n  return !stream.depsMet;\n}\n\n/**\n * @private\n * Update a dependent stream using its dependencies in an atomic way\n * @param {stream} stream - the stream to update\n */\nfunction updateStream(s) {\n  if ((s.depsMet !== true && initialDepsNotMet(s)) ||\n    (s.end !== undefined && s.end.val === true)) return;\n  if (inStream !== undefined) {\n    toUpdate.push(function() {\n      updateStream(s);\n    });\n    return;\n  }\n  inStream = s;\n  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;\n  var returnVal = s.fn.apply(s.fn, s.fnArgs);\n  if (returnVal !== undefined) {\n    s(returnVal);\n  }\n  inStream = undefined;\n  if (s.depsChanged !== undefined) s.depsChanged = [];\n  s.shouldUpdate = false;\n  if (flushing === false) flushUpdate();\n}\n\n/**\n * @private\n * Update the dependencies of a stream\n * @param {stream} stream\n */\nfunction updateDeps(s) {\n  var i, o, list\n  var listeners = s.listeners;\n  for (i = 0; i < listeners.length; ++i) {\n    list = listeners[i];\n    if (list.end === s) {\n      endStream(list);\n    } else {\n      if (list.depsChanged !== undefined) list.depsChanged.push(s);\n      list.shouldUpdate = true;\n      findDeps(list);\n    }\n  }\n  for (; orderNextIdx >= 0; --orderNextIdx) {\n    o = order[orderNextIdx];\n    if (o.shouldUpdate === true) updateStream(o);\n    o.queued = false;\n  }\n}\n\n/**\n * @private\n * Add stream dependencies to the global `order` queue.\n * @param {stream} stream\n * @see updateDeps\n */\nfunction findDeps(s) {\n  var i\n  var listeners = s.listeners;\n  if (s.queued === false) {\n    s.queued = true;\n    for (i = 0; i < listeners.length; ++i) {\n      findDeps(listeners[i]);\n    }\n    order[++orderNextIdx] = s;\n  }\n}\n\n/**\n * @private\n */\nfunction flushUpdate() {\n  flushing = true;\n  while (toUpdate.length > 0) {\n    var updater = toUpdate.shift();\n    updater();\n  }\n  flushing = false;\n}\n\n/**\n * @private\n * Push down a value into a stream\n * @param {stream} stream\n * @param {*} value\n */\nfunction updateStreamValue(s, n) {\n  /* istanbul ignore if  */\n  if (n !== undefined && n !== null && isFunction(n.then)) {\n    console.warn('flyd: Promise swallowing has been deprecated, please see https://github.com/paldepind/flyd#promises for more info');\n    n.then(s);\n    return;\n  }\n  s.val = n;\n  s.hasVal = true;\n  if (inStream === undefined) {\n    flushing = true;\n    updateDeps(s);\n    if (toUpdate.length > 0) flushUpdate(); else flushing = false;\n  } else if (inStream === s) {\n    markListeners(s, s.listeners);\n  } else {\n    toUpdate.push(function() {\n      updateStreamValue(s, n);\n    });\n  }\n}\n\n/**\n * @private\n */\nfunction markListeners(s, lists) {\n  var i, list;\n  for (i = 0; i < lists.length; ++i) {\n    list = lists[i];\n    if (list.end !== s) {\n      if (list.depsChanged !== undefined) {\n        list.depsChanged.push(s);\n      }\n      list.shouldUpdate = true;\n    } else {\n      endStream(list);\n    }\n  }\n}\n\n/**\n * @private\n * Add dependencies to a stream\n * @param {Array<stream>} dependencies\n * @param {stream} stream\n */\nfunction addListeners(deps, s) {\n  for (var i = 0; i < deps.length; ++i) {\n    deps[i].listeners.push(s);\n  }\n}\n\n/**\n * @private\n * Removes an stream from a dependency array\n * @param {stream} stream\n * @param {Array<stream>} dependencies\n */\nfunction removeListener(s, listeners) {\n  var idx = listeners.indexOf(s);\n  listeners[idx] = listeners[listeners.length - 1];\n  listeners.length--;\n}\n\n/**\n * @private\n * Detach a stream from its dependencies\n * @param {stream} stream\n */\nfunction detachDeps(s) {\n  for (var i = 0; i < s.deps.length; ++i) {\n    removeListener(s, s.deps[i].listeners);\n  }\n  s.deps.length = 0;\n}\n\n/**\n * @private\n * Ends a stream\n */\nfunction endStream(s) {\n  if (s.deps !== undefined) detachDeps(s);\n  if (s.end !== undefined) detachDeps(s.end);\n}\n\n/**\n * @private\n */\n/**\n * @private\n * transducer stream transformer\n */\nfunction StreamTransformer() { }\nStreamTransformer.prototype['@@transducer/init'] = function() { };\nStreamTransformer.prototype['@@transducer/result'] = function() { };\nStreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };\n\nmodule.exports = flyd;\n\n\n//# sourceURL=webpack:///./node_modules/flyd/lib/index.js?");

/***/ }),

/***/ "./node_modules/meiosis-tracer/lib/meiosis-tracer.js":
/*!***********************************************************!*\
  !*** ./node_modules/meiosis-tracer/lib/meiosis-tracer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,\"__esModule\",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,\"a\",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p=\"\",r(r.s=4)}([function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});t.createReceiveValues=function(e,t){return function(r,n){n&&(e.tracerStates.length>0&&(e.tracerStates.length=e.tracerIndex+1),e.tracerStates.push(r),e.tracerIndex=e.tracerStates.length-1),t(r,e)}}},function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var n=null,a=null,i=function(e,t){var r=document.getElementById(\"tracerSlider\");if(r.setAttribute(\"max\",String(t.tracerStates.length-1)),r.value=String(t.tracerIndex),document.getElementById(\"tracerIndex\").innerHTML=String(t.tracerIndex),document.getElementById(\"tracerModel\").value=JSON.stringify(e[0].value,null,4),0===document.querySelectorAll(\"div.dataStream\").length){for(var n=\"\",i=1,d=e.length;i<d;i++)n+=\"<div\"+a+\" class='dataStream'><textarea rows='5' cols='40'></textarea></div>\";document.getElementById(\"dataStreamContainer\").innerHTML=n}var o=document.querySelectorAll(\"div.dataStream textarea\");for(i=1,d=e.length;i<d;i++)o[i-1].value=JSON.stringify(e[i].value,null,4)},d=function(e){var t=e.tracerStates[0];e.tracerStates.length=0,e.tracerIndex=0,i(t,e)},o=function(e,t){var r=document.getElementById(e),n=r.getElementsByTagName(\"textarea\")[0],a=r.getElementsByTagName(\"input\")[0],i=r.getElementsByTagName(\"div\")[0];n.value=JSON.stringify(t.values[t.index],null,4),a.setAttribute(\"max\",String(t.values.length-1)),a.value=String(t.index),i.innerHTML=String(t.index)};t.initialView=function(e,t,r,o){var l=document.querySelector(e);if(l){a=o?\" style='float: left'\":\"\";var u=\"<div style='text-align: right'><button id='tracerToggle'>Hide</button></div><div id='tracerContainer'><div style='text-align: right'><button id='tracerReset'>Reset</button></div><div>Data streams:</div><input id='tracerSlider' type='range' min='0' max='\"+String(t.tracerStates.length-1)+\"' value='\"+String(t.tracerIndex)+\"' style='width: 100%'/><div id='tracerIndex'>\"+String(t.tracerIndex)+\"</div><div\"+a+\"><div>Model: (you can type into this box)</div><textarea id='tracerModel' rows='5' cols='40'></textarea><div id='errorMessage' style='display: none'><span style='color:red'>Invalid JSON</span></div></div><span id='dataStreamContainer'></span><span id='otherStreamContainer'></span></div>\";l.innerHTML=u;var s=document.getElementById(\"tracerContainer\");n=document.getElementById(\"errorMessage\"),document.getElementById(\"tracerSlider\").addEventListener(\"input\",function(e,t){return function(r){var n=parseInt(r.target.value,10),a=t.tracerStates[n];t.tracerIndex=n;var d=a[0].value;e(d,!1),i(a,t)}}(r,t)),document.getElementById(\"tracerModel\").addEventListener(\"keyup\",function(e){return function(t){try{var r=JSON.parse(t.target.value);e(r,!0),n.style.display=\"none\"}catch(e){n.style.display=\"block\"}}}(r)),document.getElementById(\"tracerToggle\").addEventListener(\"click\",function(e){return function(t){var r=t.target;\"none\"===e.style.display?(e.style.display=\"block\",r.innerHTML=\"Hide\"):(e.style.display=\"none\",r.innerHTML=\"Show\")}}(s)),document.getElementById(\"tracerReset\").addEventListener(\"click\",function(e){return function(){d(e)}}(t))}},t.tracerView=i,t.reset=d,t.initStreamIds=function(e,t,r){var i=\"<div>Other streams:</div>\";e.forEach(function(e){return i+=\"<div\"+a+\" class='otherStream' id='\"+e+\"'><input type='range' min='0' max='0' value='0' style='width: 100%'/><div>0</div><textarea rows='5' cols='40'></textarea><div><button>Trigger</button></div></div>\"}),document.getElementById(\"otherStreamContainer\").innerHTML=i,e.forEach(function(e){var a=document.getElementById(e);a.getElementsByTagName(\"input\")[0].addEventListener(\"input\",function(e,t){return function(r){var n=e[t],a=parseInt(r.target.value,10);n.index=a,o(t,n)}}(t,e));var i=a.getElementsByTagName(\"button\")[0],d=a.getElementsByTagName(\"textarea\")[0];i.addEventListener(\"click\",function(e,t,r){return function(){try{var a=JSON.parse(t.value);r(e,a),n.style.display=\"none\"}catch(e){n.style.display=\"block\"}}}(e,d,r))})},t.updateStreamValue=o},function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});t.tracerModel={tracerStates:[],tracerIndex:0,streams:{}}},function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0}),t.meiosisTracer=void 0;var n=r(2),a=r(1),i=r(0);window.__MEIOSIS_TRACER_GLOBAL_HOOK__=!0;t.meiosisTracer=function(e){var t=e.selector,r=e.renderModel,d=e.triggerStreamValue,o=e.horizontal;if(document.querySelector(t)){var l=(0,i.createReceiveValues)(n.tracerModel,a.tracerView);r=r||function(e,t){return window.postMessage({type:\"MEIOSIS_RENDER_MODEL\",model:e,sendValuesBack:t},\"*\")},(0,a.initialView)(t,n.tracerModel,r,o),d=d||function(e,t){return window.postMessage({type:\"MEIOSIS_TRIGGER_STREAM_VALUE\",streamId:e,value:t},\"*\")};var u=function(e){e.forEach(function(e){return n.tracerModel.streams[e]={index:0,values:[]}}),(0,a.initStreamIds)(e,n.tracerModel.streams,d)},s=function(e,t){var r=n.tracerModel.streams[e];r.values.push(t),r.index=r.values.length-1,(0,a.updateStreamValue)(e,r)};return window.addEventListener(\"message\",function(e){if(\"MEIOSIS_VALUES\"===e.data.type)l(e.data.values,e.data.update);else if(\"MEIOSIS_STREAM_IDS\"===e.data.type){var t=e.data.streamIds;u(t)}else\"MEIOSIS_STREAM_VALUE\"===e.data.type&&s(e.data.streamId,e.data.value)}),window.postMessage({type:\"MEIOSIS_TRACER_INIT\"},\"*\"),{receiveValues:l,initStreamIdModel:u,receiveStreamValue:s,reset:function(){return(0,a.reset)(n.tracerModel)}}}}},function(e,t,r){\"use strict\";var n=r(3);e.exports=n.meiosisTracer}]);\n//# sourceMappingURL=meiosis-tracer.js.map\n\n//# sourceURL=webpack:///./node_modules/meiosis-tracer/lib/meiosis-tracer.js?");

/***/ }),

/***/ "./node_modules/meiosis/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/meiosis/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./meiosis */ \"./node_modules/meiosis/lib/meiosis.js\"));\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./node_modules/meiosis/lib/index.js?");

/***/ }),

/***/ "./node_modules/meiosis/lib/meiosis.js":
/*!*********************************************!*\
  !*** ./node_modules/meiosis/lib/meiosis.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isMeiosisTracerOn() {\n    return window && window[\"__MEIOSIS_TRACER_GLOBAL_HOOK__\"];\n}\nexports.isMeiosisTracerOn = isMeiosisTracerOn;\nfunction trace(params) {\n    if (!params.update || !params.dataStreams) {\n        throw new Error(\"Please specify update and dataStreams.\");\n    }\n    if (isMeiosisTracerOn()) {\n        var toJS_1 = params.toJS || (function (model) { return JSON.parse(JSON.stringify(model)); });\n        var fromJS_1 = params.fromJS || (function (model) { return model; });\n        var toUpdate_1 = params.toUpdate || (function (model) { return function () { return model; }; });\n        var bufferedValues_1 = [];\n        var bufferedStreamValues_1 = [];\n        var devtoolInitialized_1 = false;\n        var sendValues_1 = true;\n        var liveChange_1 = true;\n        var lastStream = params.dataStreams[params.dataStreams.length - 1];\n        var otherStreamIds_1 = [];\n        var otherStreamsById_1 = {};\n        if (params.otherStreams && params.otherStreams.length) {\n            params.otherStreams.forEach(function (otherStream) {\n                var streamId = \"stream_\" + new Date().getTime();\n                otherStreamIds_1.push(streamId);\n                otherStreamsById_1[streamId] = otherStream;\n                otherStream.map(function (value) {\n                    var data = { type: \"MEIOSIS_STREAM_VALUE\", value: value, streamId: streamId };\n                    if (devtoolInitialized_1) {\n                        window.postMessage(data, \"*\");\n                    }\n                    else {\n                        bufferedStreamValues_1.push(data);\n                    }\n                });\n            });\n        }\n        window.addEventListener(\"message\", function (evt) {\n            if (evt.data.type === \"MEIOSIS_RENDER_MODEL\") {\n                sendValues_1 = evt.data.sendValuesBack;\n                liveChange_1 = false;\n                params.update(toUpdate_1(fromJS_1(evt.data.model)));\n            }\n            else if (evt.data.type === \"MEIOSIS_TRACER_INIT\") {\n                devtoolInitialized_1 = true;\n                if (otherStreamIds_1.length > 0) {\n                    window.postMessage({ type: \"MEIOSIS_STREAM_IDS\", streamIds: otherStreamIds_1 }, \"*\");\n                }\n                bufferedValues_1.forEach(function (values) { return window.postMessage({ type: \"MEIOSIS_VALUES\", values: values, update: true }, \"*\"); });\n                bufferedStreamValues_1.forEach(function (data) { return window.postMessage(data, \"*\"); });\n            }\n            else if (evt.data.type === \"MEIOSIS_TRIGGER_STREAM_VALUE\") {\n                var streamId = evt.data.streamId;\n                var value = evt.data.value;\n                otherStreamsById_1[streamId](value);\n            }\n        });\n        lastStream.map(function () {\n            if (sendValues_1 || liveChange_1) {\n                var values = params.dataStreams.map(function (stream) {\n                    return ({ value: toJS_1(stream()) });\n                });\n                if (devtoolInitialized_1) {\n                    window.postMessage({ type: \"MEIOSIS_VALUES\", values: values, update: true }, \"*\");\n                }\n                else {\n                    bufferedValues_1.push(values);\n                }\n            }\n            liveChange_1 = true;\n        });\n        window.postMessage({ type: \"MEIOSIS_PING\" }, \"*\");\n    }\n}\nexports.trace = trace;\n;\n//# sourceMappingURL=meiosis.js.map\n\n//# sourceURL=webpack:///./node_modules/meiosis/lib/meiosis.js?");

/***/ }),

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Expose `pathToRegexp`.\n */\nmodule.exports = pathToRegexp\nmodule.exports.parse = parse\nmodule.exports.compile = compile\nmodule.exports.tokensToFunction = tokensToFunction\nmodule.exports.tokensToRegExp = tokensToRegExp\n\n/**\n * Default configs.\n */\nvar DEFAULT_DELIMITER = '/'\nvar DEFAULT_DELIMITERS = './'\n\n/**\n * The main path matching regexp utility.\n *\n * @type {RegExp}\n */\nvar PATH_REGEXP = new RegExp([\n  // Match escaped characters that would otherwise appear in future matches.\n  // This allows the user to escape special characters that won't transform.\n  '(\\\\\\\\.)',\n  // Match Express-style parameters and un-named parameters with a prefix\n  // and optional suffixes. Matches appear as:\n  //\n  // \"/:test(\\\\d+)?\" => [\"/\", \"test\", \"\\d+\", undefined, \"?\"]\n  // \"/route(\\\\d+)\"  => [undefined, undefined, undefined, \"\\d+\", undefined]\n  '(?:\\\\:(\\\\w+)(?:\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))?|\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))([+*?])?'\n].join('|'), 'g')\n\n/**\n * Parse a string for the raw tokens.\n *\n * @param  {string}  str\n * @param  {Object=} options\n * @return {!Array}\n */\nfunction parse (str, options) {\n  var tokens = []\n  var key = 0\n  var index = 0\n  var path = ''\n  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER\n  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS\n  var pathEscaped = false\n  var res\n\n  while ((res = PATH_REGEXP.exec(str)) !== null) {\n    var m = res[0]\n    var escaped = res[1]\n    var offset = res.index\n    path += str.slice(index, offset)\n    index = offset + m.length\n\n    // Ignore already escaped sequences.\n    if (escaped) {\n      path += escaped[1]\n      pathEscaped = true\n      continue\n    }\n\n    var prev = ''\n    var next = str[index]\n    var name = res[2]\n    var capture = res[3]\n    var group = res[4]\n    var modifier = res[5]\n\n    if (!pathEscaped && path.length) {\n      var k = path.length - 1\n\n      if (delimiters.indexOf(path[k]) > -1) {\n        prev = path[k]\n        path = path.slice(0, k)\n      }\n    }\n\n    // Push the current path onto the tokens.\n    if (path) {\n      tokens.push(path)\n      path = ''\n      pathEscaped = false\n    }\n\n    var partial = prev !== '' && next !== undefined && next !== prev\n    var repeat = modifier === '+' || modifier === '*'\n    var optional = modifier === '?' || modifier === '*'\n    var delimiter = prev || defaultDelimiter\n    var pattern = capture || group\n\n    tokens.push({\n      name: name || key++,\n      prefix: prev,\n      delimiter: delimiter,\n      optional: optional,\n      repeat: repeat,\n      partial: partial,\n      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'\n    })\n  }\n\n  // Push any remaining characters.\n  if (path || index < str.length) {\n    tokens.push(path + str.substr(index))\n  }\n\n  return tokens\n}\n\n/**\n * Compile a string to a template function for the path.\n *\n * @param  {string}             str\n * @param  {Object=}            options\n * @return {!function(Object=, Object=)}\n */\nfunction compile (str, options) {\n  return tokensToFunction(parse(str, options))\n}\n\n/**\n * Expose a method for transforming tokens into the path function.\n */\nfunction tokensToFunction (tokens) {\n  // Compile all the tokens into regexps.\n  var matches = new Array(tokens.length)\n\n  // Compile all the patterns before compilation.\n  for (var i = 0; i < tokens.length; i++) {\n    if (typeof tokens[i] === 'object') {\n      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')\n    }\n  }\n\n  return function (data, options) {\n    var path = ''\n    var encode = (options && options.encode) || encodeURIComponent\n\n    for (var i = 0; i < tokens.length; i++) {\n      var token = tokens[i]\n\n      if (typeof token === 'string') {\n        path += token\n        continue\n      }\n\n      var value = data ? data[token.name] : undefined\n      var segment\n\n      if (Array.isArray(value)) {\n        if (!token.repeat) {\n          throw new TypeError('Expected \"' + token.name + '\" to not repeat, but got array')\n        }\n\n        if (value.length === 0) {\n          if (token.optional) continue\n\n          throw new TypeError('Expected \"' + token.name + '\" to not be empty')\n        }\n\n        for (var j = 0; j < value.length; j++) {\n          segment = encode(value[j], token)\n\n          if (!matches[i].test(segment)) {\n            throw new TypeError('Expected all \"' + token.name + '\" to match \"' + token.pattern + '\"')\n          }\n\n          path += (j === 0 ? token.prefix : token.delimiter) + segment\n        }\n\n        continue\n      }\n\n      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {\n        segment = encode(String(value), token)\n\n        if (!matches[i].test(segment)) {\n          throw new TypeError('Expected \"' + token.name + '\" to match \"' + token.pattern + '\", but got \"' + segment + '\"')\n        }\n\n        path += token.prefix + segment\n        continue\n      }\n\n      if (token.optional) {\n        // Prepend partial segment prefixes.\n        if (token.partial) path += token.prefix\n\n        continue\n      }\n\n      throw new TypeError('Expected \"' + token.name + '\" to be ' + (token.repeat ? 'an array' : 'a string'))\n    }\n\n    return path\n  }\n}\n\n/**\n * Escape a regular expression string.\n *\n * @param  {string} str\n * @return {string}\n */\nfunction escapeString (str) {\n  return str.replace(/([.+*?=^!:${}()[\\]|/\\\\])/g, '\\\\$1')\n}\n\n/**\n * Escape the capturing group by escaping special characters and meaning.\n *\n * @param  {string} group\n * @return {string}\n */\nfunction escapeGroup (group) {\n  return group.replace(/([=!:$/()])/g, '\\\\$1')\n}\n\n/**\n * Get the flags for a regexp from the options.\n *\n * @param  {Object} options\n * @return {string}\n */\nfunction flags (options) {\n  return options && options.sensitive ? '' : 'i'\n}\n\n/**\n * Pull out keys from a regexp.\n *\n * @param  {!RegExp} path\n * @param  {Array=}  keys\n * @return {!RegExp}\n */\nfunction regexpToRegexp (path, keys) {\n  if (!keys) return path\n\n  // Use a negative lookahead to match only capturing groups.\n  var groups = path.source.match(/\\((?!\\?)/g)\n\n  if (groups) {\n    for (var i = 0; i < groups.length; i++) {\n      keys.push({\n        name: i,\n        prefix: null,\n        delimiter: null,\n        optional: false,\n        repeat: false,\n        partial: false,\n        pattern: null\n      })\n    }\n  }\n\n  return path\n}\n\n/**\n * Transform an array into a regexp.\n *\n * @param  {!Array}  path\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\nfunction arrayToRegexp (path, keys, options) {\n  var parts = []\n\n  for (var i = 0; i < path.length; i++) {\n    parts.push(pathToRegexp(path[i], keys, options).source)\n  }\n\n  return new RegExp('(?:' + parts.join('|') + ')', flags(options))\n}\n\n/**\n * Create a path regexp from string input.\n *\n * @param  {string}  path\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\nfunction stringToRegexp (path, keys, options) {\n  return tokensToRegExp(parse(path, options), keys, options)\n}\n\n/**\n * Expose a function for taking tokens and returning a RegExp.\n *\n * @param  {!Array}  tokens\n * @param  {Array=}  keys\n * @param  {Object=} options\n * @return {!RegExp}\n */\nfunction tokensToRegExp (tokens, keys, options) {\n  options = options || {}\n\n  var strict = options.strict\n  var end = options.end !== false\n  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)\n  var delimiters = options.delimiters || DEFAULT_DELIMITERS\n  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')\n  var route = ''\n  var isEndDelimited = false\n\n  // Iterate over the tokens and create our regexp string.\n  for (var i = 0; i < tokens.length; i++) {\n    var token = tokens[i]\n\n    if (typeof token === 'string') {\n      route += escapeString(token)\n      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1\n    } else {\n      var prefix = escapeString(token.prefix)\n      var capture = token.repeat\n        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'\n        : token.pattern\n\n      if (keys) keys.push(token)\n\n      if (token.optional) {\n        if (token.partial) {\n          route += prefix + '(' + capture + ')?'\n        } else {\n          route += '(?:' + prefix + '(' + capture + '))?'\n        }\n      } else {\n        route += prefix + '(' + capture + ')'\n      }\n    }\n  }\n\n  if (end) {\n    if (!strict) route += '(?:' + delimiter + ')?'\n\n    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'\n  } else {\n    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'\n    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'\n  }\n\n  return new RegExp('^' + route, flags(options))\n}\n\n/**\n * Normalize the given path string, returning a regular expression.\n *\n * An empty array can be passed in for the keys, which will hold the\n * placeholder key descriptions. For example, using `/user/:id`, `keys` will\n * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.\n *\n * @param  {(string|RegExp|Array)} path\n * @param  {Array=}                keys\n * @param  {Object=}               options\n * @return {!RegExp}\n */\nfunction pathToRegexp (path, keys, options) {\n  if (path instanceof RegExp) {\n    return regexpToRegexp(path, keys)\n  }\n\n  if (Array.isArray(path)) {\n    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)\n  }\n\n  return stringToRegexp(/** @type {string} */ (path), keys, options)\n}\n\n\n//# sourceURL=webpack:///./node_modules/path-to-regexp/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/ramda/es/F.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/F.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _always__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./always */ \"./node_modules/ramda/es/always.js\");\n\n\n/**\n * A function that always returns `false`. Any passed in parameters are ignored.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Function\n * @sig * -> Boolean\n * @param {*}\n * @return {Boolean}\n * @see R.always, R.T\n * @example\n *\n *      R.F(); //=> false\n */\nvar F = /*#__PURE__*/Object(_always__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(false);\n/* harmony default export */ __webpack_exports__[\"default\"] = (F);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/F.js?");

/***/ }),

/***/ "./node_modules/ramda/es/T.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/T.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _always__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./always */ \"./node_modules/ramda/es/always.js\");\n\n\n/**\n * A function that always returns `true`. Any passed in parameters are ignored.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Function\n * @sig * -> Boolean\n * @param {*}\n * @return {Boolean}\n * @see R.always, R.F\n * @example\n *\n *      R.T(); //=> true\n */\nvar T = /*#__PURE__*/Object(_always__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(true);\n/* harmony default export */ __webpack_exports__[\"default\"] = (T);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/T.js?");

/***/ }),

/***/ "./node_modules/ramda/es/__.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/__.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * A special placeholder value used to specify \"gaps\" within curried functions,\n * allowing partial application of any combination of arguments, regardless of\n * their positions.\n *\n * If `g` is a curried ternary function and `_` is `R.__`, the following are\n * equivalent:\n *\n *   - `g(1, 2, 3)`\n *   - `g(_, 2, 3)(1)`\n *   - `g(_, _, 3)(1)(2)`\n *   - `g(_, _, 3)(1, 2)`\n *   - `g(_, 2, _)(1, 3)`\n *   - `g(_, 2)(1)(3)`\n *   - `g(_, 2)(1, 3)`\n *   - `g(_, 2)(_, 3)(1)`\n *\n * @constant\n * @memberOf R\n * @since v0.6.0\n * @category Function\n * @example\n *\n *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');\n *      greet('Alice'); //=> 'Hello, Alice!'\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ '@@functional/placeholder': true });\n\n//# sourceURL=webpack:///./node_modules/ramda/es/__.js?");

/***/ }),

/***/ "./node_modules/ramda/es/add.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/add.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Adds two values.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Math\n * @sig Number -> Number -> Number\n * @param {Number} a\n * @param {Number} b\n * @return {Number}\n * @see R.subtract\n * @example\n *\n *      R.add(2, 3);       //=>  5\n *      R.add(7)(10);      //=> 17\n */\nvar add = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function add(a, b) {\n  return Number(a) + Number(b);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (add);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/add.js?");

/***/ }),

/***/ "./node_modules/ramda/es/addIndex.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/addIndex.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n\n\n\n\n/**\n * Creates a new list iteration function from an existing one by adding two new\n * parameters to its callback function: the current index, and the entire list.\n *\n * This would turn, for instance, [`R.map`](#map) function into one that\n * more closely resembles `Array.prototype.map`. Note that this will only work\n * for functions in which the iteration callback function is the first\n * parameter, and where the list is the last parameter. (This latter might be\n * unimportant if the list parameter is not used.)\n *\n * @func\n * @memberOf R\n * @since v0.15.0\n * @category Function\n * @category List\n * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)\n * @param {Function} fn A list iteration function that does not pass index or list to its callback\n * @return {Function} An altered list iteration function that passes (item, index, list) to its callback\n * @example\n *\n *      var mapIndexed = R.addIndex(R.map);\n *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);\n *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']\n */\nvar addIndex = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function addIndex(fn) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(fn.length, function () {\n    var idx = 0;\n    var origFn = arguments[0];\n    var list = arguments[arguments.length - 1];\n    var args = Array.prototype.slice.call(arguments, 0);\n    args[0] = function () {\n      var result = origFn.apply(this, Object(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arguments, [idx, list]));\n      idx += 1;\n      return result;\n    };\n    return fn.apply(this, args);\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (addIndex);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/addIndex.js?");

/***/ }),

/***/ "./node_modules/ramda/es/adjust.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/adjust.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n\n/**\n * Applies a function to the value at the given index of an array, returning a\n * new copy of the array with the element at the given index replaced with the\n * result of the function application.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category List\n * @sig (a -> a) -> Number -> [a] -> [a]\n * @param {Function} fn The function to apply.\n * @param {Number} idx The index.\n * @param {Array|Arguments} list An array-like object whose value\n *        at the supplied index will be replaced.\n * @return {Array} A copy of the supplied array-like object with\n *         the element at index `idx` replaced with the value\n *         returned by applying `fn` to the existing element.\n * @see R.update\n * @example\n *\n *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]\n *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]\n * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]\n * @symb R.adjust(f, 0, [a, b]) = [f(a), b]\n */\nvar adjust = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function adjust(fn, idx, list) {\n  if (idx >= list.length || idx < -list.length) {\n    return list;\n  }\n  var start = idx < 0 ? list.length : 0;\n  var _idx = start + idx;\n  var _list = Object(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list);\n  _list[_idx] = fn(list[_idx]);\n  return _list;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (adjust);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/adjust.js?");

/***/ }),

/***/ "./node_modules/ramda/es/all.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/all.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xall */ \"./node_modules/ramda/es/internal/_xall.js\");\n\n\n\n\n/**\n * Returns `true` if all elements of the list match the predicate, `false` if\n * there are any that don't.\n *\n * Dispatches to the `all` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> Boolean\n * @param {Function} fn The predicate function.\n * @param {Array} list The array to consider.\n * @return {Boolean} `true` if the predicate is satisfied by every element, `false`\n *         otherwise.\n * @see R.any, R.none, R.transduce\n * @example\n *\n *      var equals3 = R.equals(3);\n *      R.all(equals3)([3, 3, 3, 3]); //=> true\n *      R.all(equals3)([3, 3, 1, 3]); //=> false\n */\nvar all = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['all'], _internal_xall__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function all(fn, list) {\n  var idx = 0;\n  while (idx < list.length) {\n    if (!fn(list[idx])) {\n      return false;\n    }\n    idx += 1;\n  }\n  return true;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (all);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/all.js?");

/***/ }),

/***/ "./node_modules/ramda/es/allPass.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/allPass.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./max */ \"./node_modules/ramda/es/max.js\");\n/* harmony import */ var _pluck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pluck */ \"./node_modules/ramda/es/pluck.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n\n\n\n\n\n\n/**\n * Takes a list of predicates and returns a predicate that returns true for a\n * given list of arguments if every one of the provided predicates is satisfied\n * by those arguments.\n *\n * The function returned is a curried function whose arity matches that of the\n * highest-arity predicate.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Logic\n * @sig [(*... -> Boolean)] -> (*... -> Boolean)\n * @param {Array} predicates An array of predicates to check\n * @return {Function} The combined predicate\n * @see R.anyPass\n * @example\n *\n *      var isQueen = R.propEq('rank', 'Q');\n *      var isSpade = R.propEq('suit', '♠︎');\n *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);\n *\n *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false\n *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true\n */\nvar allPass = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function allPass(preds) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_reduce__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_max__WEBPACK_IMPORTED_MODULE_2__[\"default\"], 0, Object(_pluck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('length', preds)), function () {\n    var idx = 0;\n    var len = preds.length;\n    while (idx < len) {\n      if (!preds[idx].apply(this, arguments)) {\n        return false;\n      }\n      idx += 1;\n    }\n    return true;\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (allPass);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/allPass.js?");

/***/ }),

/***/ "./node_modules/ramda/es/always.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/always.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Returns a function that always returns the given value. Note that for\n * non-primitives the value returned is a reference to the original value.\n *\n * This function is known as `const`, `constant`, or `K` (for K combinator) in\n * other languages and libraries.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig a -> (* -> a)\n * @param {*} val The value to wrap in a function\n * @return {Function} A Function :: * -> val.\n * @example\n *\n *      var t = R.always('Tee');\n *      t(); //=> 'Tee'\n */\nvar always = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function always(val) {\n  return function () {\n    return val;\n  };\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (always);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/always.js?");

/***/ }),

/***/ "./node_modules/ramda/es/and.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/and.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns `true` if both arguments are `true`; `false` otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Logic\n * @sig a -> b -> a | b\n * @param {Any} a\n * @param {Any} b\n * @return {Any} the first argument if it is falsy, otherwise the second argument.\n * @see R.both\n * @example\n *\n *      R.and(true, true); //=> true\n *      R.and(true, false); //=> false\n *      R.and(false, true); //=> false\n *      R.and(false, false); //=> false\n */\nvar and = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function and(a, b) {\n  return a && b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (and);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/and.js?");

/***/ }),

/***/ "./node_modules/ramda/es/any.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/any.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xany__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xany */ \"./node_modules/ramda/es/internal/_xany.js\");\n\n\n\n\n/**\n * Returns `true` if at least one of elements of the list match the predicate,\n * `false` otherwise.\n *\n * Dispatches to the `any` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> Boolean\n * @param {Function} fn The predicate function.\n * @param {Array} list The array to consider.\n * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`\n *         otherwise.\n * @see R.all, R.none, R.transduce\n * @example\n *\n *      var lessThan0 = R.flip(R.lt)(0);\n *      var lessThan2 = R.flip(R.lt)(2);\n *      R.any(lessThan0)([1, 2]); //=> false\n *      R.any(lessThan2)([1, 2]); //=> true\n */\nvar any = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['any'], _internal_xany__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function any(fn, list) {\n  var idx = 0;\n  while (idx < list.length) {\n    if (fn(list[idx])) {\n      return true;\n    }\n    idx += 1;\n  }\n  return false;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (any);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/any.js?");

/***/ }),

/***/ "./node_modules/ramda/es/anyPass.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/anyPass.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./max */ \"./node_modules/ramda/es/max.js\");\n/* harmony import */ var _pluck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pluck */ \"./node_modules/ramda/es/pluck.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n\n\n\n\n\n\n/**\n * Takes a list of predicates and returns a predicate that returns true for a\n * given list of arguments if at least one of the provided predicates is\n * satisfied by those arguments.\n *\n * The function returned is a curried function whose arity matches that of the\n * highest-arity predicate.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Logic\n * @sig [(*... -> Boolean)] -> (*... -> Boolean)\n * @param {Array} predicates An array of predicates to check\n * @return {Function} The combined predicate\n * @see R.allPass\n * @example\n *\n *      var isClub = R.propEq('suit', '♣');\n *      var isSpade = R.propEq('suit', '♠');\n *      var isBlackCard = R.anyPass([isClub, isSpade]);\n *\n *      isBlackCard({rank: '10', suit: '♣'}); //=> true\n *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true\n *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false\n */\nvar anyPass = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function anyPass(preds) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_reduce__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_max__WEBPACK_IMPORTED_MODULE_2__[\"default\"], 0, Object(_pluck__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('length', preds)), function () {\n    var idx = 0;\n    var len = preds.length;\n    while (idx < len) {\n      if (preds[idx].apply(this, arguments)) {\n        return true;\n      }\n      idx += 1;\n    }\n    return false;\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (anyPass);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/anyPass.js?");

/***/ }),

/***/ "./node_modules/ramda/es/ap.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/ap.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n\n\n\n\n\n/**\n * ap applies a list of functions to a list of values.\n *\n * Dispatches to the `ap` method of the second argument, if present. Also\n * treats curried functions as applicatives.\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category Function\n * @sig [a -> b] -> [a] -> [b]\n * @sig Apply f => f (a -> b) -> f a -> f b\n * @sig (a -> b -> c) -> (a -> b) -> (a -> c)\n * @param {*} applyF\n * @param {*} applyX\n * @return {*}\n * @example\n *\n *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]\n *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> [\"tasty pizza\", \"tasty salad\", \"PIZZA\", \"SALAD\"]\n *\n *      // R.ap can also be used as S combinator\n *      // when only two functions are passed\n *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'\n * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]\n */\nvar ap = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function ap(applyF, applyX) {\n  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {\n    return applyF(x)(applyX(x));\n  } :\n  // else\n  Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function (acc, f) {\n    return Object(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(acc, Object(_map__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(f, applyX));\n  }, [], applyF);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (ap);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/ap.js?");

/***/ }),

/***/ "./node_modules/ramda/es/aperture.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/aperture.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_aperture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_aperture */ \"./node_modules/ramda/es/internal/_aperture.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xaperture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xaperture */ \"./node_modules/ramda/es/internal/_xaperture.js\");\n\n\n\n\n\n/**\n * Returns a new list, composed of n-tuples of consecutive elements. If `n` is\n * greater than the length of the list, an empty list is returned.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category List\n * @sig Number -> [a] -> [[a]]\n * @param {Number} n The size of the tuples to create\n * @param {Array} list The list to split into `n`-length tuples\n * @return {Array} The resulting list of `n`-length tuples\n * @see R.transduce\n * @example\n *\n *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]\n *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]\n *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []\n */\nvar aperture = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_2__[\"default\"])([], _internal_xaperture__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _internal_aperture__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (aperture);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/aperture.js?");

/***/ }),

/***/ "./node_modules/ramda/es/append.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/append.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Returns a new list containing the contents of the given list, followed by\n * the given element.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig a -> [a] -> [a]\n * @param {*} el The element to add to the end of the new list.\n * @param {Array} list The list of elements to add a new item to.\n *        list.\n * @return {Array} A new list containing the elements of the old list followed by `el`.\n * @see R.prepend\n * @example\n *\n *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']\n *      R.append('tests', []); //=> ['tests']\n *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]\n */\nvar append = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function append(el, list) {\n  return Object(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list, [el]);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (append);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/append.js?");

/***/ }),

/***/ "./node_modules/ramda/es/apply.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/apply.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Applies function `fn` to the argument list `args`. This is useful for\n * creating a fixed-arity function from a variadic function. `fn` should be a\n * bound function if context is significant.\n *\n * @func\n * @memberOf R\n * @since v0.7.0\n * @category Function\n * @sig (*... -> a) -> [*] -> a\n * @param {Function} fn The function which will be called with `args`\n * @param {Array} args The arguments to call `fn` with\n * @return {*} result The result, equivalent to `fn(...args)`\n * @see R.call, R.unapply\n * @example\n *\n *      var nums = [1, 2, 3, -99, 42, 6, 7];\n *      R.apply(Math.max, nums); //=> 42\n * @symb R.apply(f, [a, b, c]) = f(a, b, c)\n */\nvar apply = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function apply(fn, args) {\n  return fn.apply(this, args);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (apply);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/apply.js?");

/***/ }),

/***/ "./node_modules/ramda/es/applySpec.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/applySpec.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apply */ \"./node_modules/ramda/es/apply.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./max */ \"./node_modules/ramda/es/max.js\");\n/* harmony import */ var _pluck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pluck */ \"./node_modules/ramda/es/pluck.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n/* harmony import */ var _values__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./values */ \"./node_modules/ramda/es/values.js\");\n\n\n\n\n\n\n\n\n\n/**\n * Given a spec object recursively mapping properties to functions, creates a\n * function producing an object of the same structure, by mapping each property\n * to the result of calling its associated function with the supplied arguments.\n *\n * @func\n * @memberOf R\n * @since v0.20.0\n * @category Function\n * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})\n * @param {Object} spec an object recursively mapping properties to functions for\n *        producing the values for these properties.\n * @return {Function} A function that returns an object of the same structure\n * as `spec', with each property set to the value returned by calling its\n * associated function with the supplied arguments.\n * @see R.converge, R.juxt\n * @example\n *\n *      var getMetrics = R.applySpec({\n *        sum: R.add,\n *        nested: { mul: R.multiply }\n *      });\n *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }\n * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }\n */\nvar applySpec = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function applySpec(spec) {\n  spec = Object(_map__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(function (v) {\n    return typeof v == 'function' ? v : applySpec(v);\n  }, spec);\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_reduce__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(_max__WEBPACK_IMPORTED_MODULE_4__[\"default\"], 0, Object(_pluck__WEBPACK_IMPORTED_MODULE_5__[\"default\"])('length', Object(_values__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(spec))), function () {\n    var args = arguments;\n    return Object(_map__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(function (f) {\n      return Object(_apply__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(f, args);\n    }, spec);\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (applySpec);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/applySpec.js?");

/***/ }),

/***/ "./node_modules/ramda/es/applyTo.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/applyTo.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n* Takes a value and applies a function to it.\n*\n* This function is also known as the `thrush` combinator.\n*\n* @func\n* @memberOf R\n * @since v0.25.0\n* @category Function\n* @sig a -> (a -> b) -> b\n* @param {*} x The value\n* @param {Function} f The function to apply\n* @return {*} The result of applying `f` to `x`\n* @example\n*\n*      var t42 = R.applyTo(42);\n*      t42(R.identity); //=> 42\n*      t42(R.add(1)); //=> 43\n*/\nvar applyTo = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function applyTo(x, f) {\n  return f(x);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (applyTo);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/applyTo.js?");

/***/ }),

/***/ "./node_modules/ramda/es/ascend.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/ascend.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Makes an ascending comparator function out of a function that returns a value\n * that can be compared with `<` and `>`.\n *\n * @func\n * @memberOf R\n * @since v0.23.0\n * @category Function\n * @sig Ord b => (a -> b) -> a -> a -> Number\n * @param {Function} fn A function of arity one that returns a value that can be compared\n * @param {*} a The first item to be compared.\n * @param {*} b The second item to be compared.\n * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`\n * @see R.descend\n * @example\n *\n *      var byAge = R.ascend(R.prop('age'));\n *      var people = [\n *        // ...\n *      ];\n *      var peopleByYoungestFirst = R.sort(byAge, people);\n */\nvar ascend = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function ascend(fn, a, b) {\n  var aa = fn(a);\n  var bb = fn(b);\n  return aa < bb ? -1 : aa > bb ? 1 : 0;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (ascend);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/ascend.js?");

/***/ }),

/***/ "./node_modules/ramda/es/assoc.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/assoc.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Makes a shallow clone of an object, setting or overriding the specified\n * property with the given value. Note that this copies and flattens prototype\n * properties onto the new object as well. All non-primitive properties are\n * copied by reference.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Object\n * @sig String -> a -> {k: v} -> {k: v}\n * @param {String} prop The property name to set\n * @param {*} val The new value\n * @param {Object} obj The object to clone\n * @return {Object} A new object equivalent to the original except for the changed property.\n * @see R.dissoc\n * @example\n *\n *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}\n */\nvar assoc = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function assoc(prop, val, obj) {\n  var result = {};\n  for (var p in obj) {\n    result[p] = obj[p];\n  }\n  result[prop] = val;\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (assoc);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/assoc.js?");

/***/ }),

/***/ "./node_modules/ramda/es/assocPath.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/assocPath.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _internal_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _internal_isInteger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isInteger */ \"./node_modules/ramda/es/internal/_isInteger.js\");\n/* harmony import */ var _assoc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assoc */ \"./node_modules/ramda/es/assoc.js\");\n/* harmony import */ var _isNil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isNil */ \"./node_modules/ramda/es/isNil.js\");\n\n\n\n\n\n\n\n/**\n * Makes a shallow clone of an object, setting or overriding the nodes required\n * to create the given path, and placing the specific value at the tail end of\n * that path. Note that this copies and flattens prototype properties onto the\n * new object as well. All non-primitive properties are copied by reference.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Object\n * @typedefn Idx = String | Int\n * @sig [Idx] -> a -> {a} -> {a}\n * @param {Array} path the path to set\n * @param {*} val The new value\n * @param {Object} obj The object to clone\n * @return {Object} A new object equivalent to the original except along the specified path.\n * @see R.dissocPath\n * @example\n *\n *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}\n *\n *      // Any missing or non-object keys in path will be overridden\n *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}\n */\nvar assocPath = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function assocPath(path, val, obj) {\n  if (path.length === 0) {\n    return val;\n  }\n  var idx = path[0];\n  if (path.length > 1) {\n    var nextObj = !Object(_isNil__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(obj) && Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(idx, obj) ? obj[idx] : Object(_internal_isInteger__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(path[1]) ? [] : {};\n    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);\n  }\n  if (Object(_internal_isInteger__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(idx) && Object(_internal_isArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(obj)) {\n    var arr = [].concat(obj);\n    arr[idx] = val;\n    return arr;\n  } else {\n    return Object(_assoc__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(idx, val, obj);\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (assocPath);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/assocPath.js?");

/***/ }),

/***/ "./node_modules/ramda/es/binary.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/binary.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _nAry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nAry */ \"./node_modules/ramda/es/nAry.js\");\n\n\n\n/**\n * Wraps a function of any arity (including nullary) in a function that accepts\n * exactly 2 parameters. Any extraneous parameters will not be passed to the\n * supplied function.\n *\n * @func\n * @memberOf R\n * @since v0.2.0\n * @category Function\n * @sig (* -> c) -> (a, b -> c)\n * @param {Function} fn The function to wrap.\n * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of\n *         arity 2.\n * @see R.nAry, R.unary\n * @example\n *\n *      var takesThreeArgs = function(a, b, c) {\n *        return [a, b, c];\n *      };\n *      takesThreeArgs.length; //=> 3\n *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]\n *\n *      var takesTwoArgs = R.binary(takesThreeArgs);\n *      takesTwoArgs.length; //=> 2\n *      // Only 2 arguments are passed to the wrapped function\n *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]\n * @symb R.binary(f)(a, b, c) = f(a, b)\n */\nvar binary = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function binary(fn) {\n  return Object(_nAry__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(2, fn);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (binary);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/binary.js?");

/***/ }),

/***/ "./node_modules/ramda/es/bind.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/bind.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Creates a function that is bound to a context.\n * Note: `R.bind` does not provide the additional argument-binding capabilities of\n * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).\n *\n * @func\n * @memberOf R\n * @since v0.6.0\n * @category Function\n * @category Object\n * @sig (* -> *) -> {*} -> (* -> *)\n * @param {Function} fn The function to bind to context\n * @param {Object} thisObj The context to bind `fn` to\n * @return {Function} A function that will execute in the context of `thisObj`.\n * @see R.partial\n * @example\n *\n *      var log = R.bind(console.log, console);\n *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}\n *      // logs {a: 2}\n * @symb R.bind(f, o)(a, b) = f.call(o, a, b)\n */\nvar bind = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function bind(fn, thisObj) {\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fn.length, function () {\n    return fn.apply(thisObj, arguments);\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (bind);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/bind.js?");

/***/ }),

/***/ "./node_modules/ramda/es/both.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/both.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction */ \"./node_modules/ramda/es/internal/_isFunction.js\");\n/* harmony import */ var _and__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./and */ \"./node_modules/ramda/es/and.js\");\n/* harmony import */ var _lift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lift */ \"./node_modules/ramda/es/lift.js\");\n\n\n\n\n\n/**\n * A function which calls the two provided functions and returns the `&&`\n * of the results.\n * It returns the result of the first function if it is false-y and the result\n * of the second function otherwise. Note that this is short-circuited,\n * meaning that the second function will not be invoked if the first returns a\n * false-y value.\n *\n * In addition to functions, `R.both` also accepts any fantasy-land compatible\n * applicative functor.\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category Logic\n * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)\n * @param {Function} f A predicate\n * @param {Function} g Another predicate\n * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.\n * @see R.and\n * @example\n *\n *      var gt10 = R.gt(R.__, 10)\n *      var lt20 = R.lt(R.__, 20)\n *      var f = R.both(gt10, lt20);\n *      f(15); //=> true\n *      f(30); //=> false\n */\nvar both = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function both(f, g) {\n  return Object(_internal_isFunction__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(f) ? function _both() {\n    return f.apply(this, arguments) && g.apply(this, arguments);\n  } : Object(_lift__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_and__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(f, g);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (both);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/both.js?");

/***/ }),

/***/ "./node_modules/ramda/es/call.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/call.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./curry */ \"./node_modules/ramda/es/curry.js\");\n\n\n/**\n * Returns the result of calling its first argument with the remaining\n * arguments. This is occasionally useful as a converging function for\n * [`R.converge`](#converge): the first branch can produce a function while the\n * remaining branches produce values to be passed to that function as its\n * arguments.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Function\n * @sig (*... -> a),*... -> a\n * @param {Function} fn The function to apply to the remaining arguments.\n * @param {...*} args Any number of positional arguments.\n * @return {*}\n * @see R.apply\n * @example\n *\n *      R.call(R.add, 1, 2); //=> 3\n *\n *      var indentN = R.pipe(R.repeat(' '),\n *                           R.join(''),\n *                           R.replace(/^(?!$)/gm));\n *\n *      var format = R.converge(R.call, [\n *                                  R.pipe(R.prop('indent'), indentN),\n *                                  R.prop('value')\n *                              ]);\n *\n *      format({indent: 2, value: 'foo\\nbar\\nbaz\\n'}); //=> '  foo\\n  bar\\n  baz\\n'\n * @symb R.call(f, a, b) = f(a, b)\n */\nvar call = /*#__PURE__*/Object(_curry__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function call(fn) {\n  return fn.apply(this, Array.prototype.slice.call(arguments, 1));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (call);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/call.js?");

/***/ }),

/***/ "./node_modules/ramda/es/chain.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/chain.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_makeFlat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_makeFlat */ \"./node_modules/ramda/es/internal/_makeFlat.js\");\n/* harmony import */ var _internal_xchain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xchain */ \"./node_modules/ramda/es/internal/_xchain.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n\n\n\n\n\n\n/**\n * `chain` maps a function over a list and concatenates the results. `chain`\n * is also known as `flatMap` in some libraries\n *\n * Dispatches to the `chain` method of the second argument, if present,\n * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category List\n * @sig Chain m => (a -> m b) -> m a -> m b\n * @param {Function} fn The function to map with\n * @param {Array} list The list to map over\n * @return {Array} The result of flat-mapping `list` with `fn`\n * @example\n *\n *      var duplicate = n => [n, n];\n *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]\n *\n *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]\n */\nvar chain = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['fantasy-land/chain', 'chain'], _internal_xchain__WEBPACK_IMPORTED_MODULE_3__[\"default\"], function chain(fn, monad) {\n  if (typeof monad === 'function') {\n    return function (x) {\n      return fn(monad(x))(x);\n    };\n  }\n  return Object(_internal_makeFlat__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(false)(Object(_map__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(fn, monad));\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (chain);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/chain.js?");

/***/ }),

/***/ "./node_modules/ramda/es/clamp.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/clamp.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Restricts a number to be within a range.\n *\n * Also works for other ordered types such as Strings and Dates.\n *\n * @func\n * @memberOf R\n * @since v0.20.0\n * @category Relation\n * @sig Ord a => a -> a -> a -> a\n * @param {Number} minimum The lower limit of the clamp (inclusive)\n * @param {Number} maximum The upper limit of the clamp (inclusive)\n * @param {Number} value Value to be clamped\n * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise\n * @example\n *\n *      R.clamp(1, 10, -5) // => 1\n *      R.clamp(1, 10, 15) // => 10\n *      R.clamp(1, 10, 4)  // => 4\n */\nvar clamp = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function clamp(min, max, value) {\n  if (min > max) {\n    throw new Error('min must not be greater than max in clamp(min, max, value)');\n  }\n  return value < min ? min : value > max ? max : value;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (clamp);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/clamp.js?");

/***/ }),

/***/ "./node_modules/ramda/es/clone.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/clone.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone */ \"./node_modules/ramda/es/internal/_clone.js\");\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n\n/**\n * Creates a deep copy of the value which may contain (nested) `Array`s and\n * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are\n * assigned by reference rather than copied\n *\n * Dispatches to a `clone` method if present.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig {*} -> {*}\n * @param {*} value The object or array to clone\n * @return {*} A deeply cloned copy of `val`\n * @example\n *\n *      var objects = [{}, {}, {}];\n *      var objectsClone = R.clone(objects);\n *      objects === objectsClone; //=> false\n *      objects[0] === objectsClone[0]; //=> false\n */\nvar clone = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function clone(value) {\n  return value != null && typeof value.clone === 'function' ? value.clone() : Object(_internal_clone__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value, [], [], true);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (clone);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/clone.js?");

/***/ }),

/***/ "./node_modules/ramda/es/comparator.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/comparator.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Makes a comparator function out of a function that reports whether the first\n * element is less than the second.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)\n * @param {Function} pred A predicate function of arity two which will return `true` if the first argument\n * is less than the second, `false` otherwise\n * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`\n * @example\n *\n *      var byAge = R.comparator((a, b) => a.age < b.age);\n *      var people = [\n *        // ...\n *      ];\n *      var peopleByIncreasingAge = R.sort(byAge, people);\n */\nvar comparator = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function comparator(pred) {\n  return function (a, b) {\n    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;\n  };\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (comparator);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/comparator.js?");

/***/ }),

/***/ "./node_modules/ramda/es/complement.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/complement.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lift */ \"./node_modules/ramda/es/lift.js\");\n/* harmony import */ var _not__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./not */ \"./node_modules/ramda/es/not.js\");\n\n\n\n/**\n * Takes a function `f` and returns a function `g` such that if called with the same arguments\n * when `f` returns a \"truthy\" value, `g` returns `false` and when `f` returns a \"falsy\" value `g` returns `true`.\n *\n * `R.complement` may be applied to any functor\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category Logic\n * @sig (*... -> *) -> (*... -> Boolean)\n * @param {Function} f\n * @return {Function}\n * @see R.not\n * @example\n *\n *      var isNotNil = R.complement(R.isNil);\n *      isNil(null); //=> true\n *      isNotNil(null); //=> false\n *      isNil(7); //=> false\n *      isNotNil(7); //=> true\n */\nvar complement = /*#__PURE__*/Object(_lift__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_not__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (complement);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/complement.js?");

/***/ }),

/***/ "./node_modules/ramda/es/compose.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/compose.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return compose; });\n/* harmony import */ var _pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe */ \"./node_modules/ramda/es/pipe.js\");\n/* harmony import */ var _reverse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse */ \"./node_modules/ramda/es/reverse.js\");\n\n\n\n/**\n * Performs right-to-left function composition. The rightmost function may have\n * any arity; the remaining functions must be unary.\n *\n * **Note:** The result of compose is not automatically curried.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)\n * @param {...Function} ...functions The functions to compose\n * @return {Function}\n * @see R.pipe\n * @example\n *\n *      var classyGreeting = (firstName, lastName) => \"The name's \" + lastName + \", \" + firstName + \" \" + lastName\n *      var yellGreeting = R.compose(R.toUpper, classyGreeting);\n *      yellGreeting('James', 'Bond'); //=> \"THE NAME'S BOND, JAMES BOND\"\n *\n *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7\n *\n * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))\n */\nfunction compose() {\n  if (arguments.length === 0) {\n    throw new Error('compose requires at least one argument');\n  }\n  return _pipe__WEBPACK_IMPORTED_MODULE_0__[\"default\"].apply(this, Object(_reverse__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arguments));\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/compose.js?");

/***/ }),

/***/ "./node_modules/ramda/es/composeK.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/composeK.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return composeK; });\n/* harmony import */ var _chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chain */ \"./node_modules/ramda/es/chain.js\");\n/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose */ \"./node_modules/ramda/es/compose.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n\n\n\n\n/**\n * Returns the right-to-left Kleisli composition of the provided functions,\n * each of which must return a value of a type supported by [`chain`](#chain).\n *\n * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category Function\n * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)\n * @param {...Function} ...functions The functions to compose\n * @return {Function}\n * @see R.pipeK\n * @example\n *\n *       //  get :: String -> Object -> Maybe *\n *       var get = R.curry((propName, obj) => Maybe(obj[propName]))\n *\n *       //  getStateCode :: Maybe String -> Maybe String\n *       var getStateCode = R.composeK(\n *         R.compose(Maybe.of, R.toUpper),\n *         get('state'),\n *         get('address'),\n *         get('user'),\n *       );\n *       getStateCode({\"user\":{\"address\":{\"state\":\"ny\"}}}); //=> Maybe.Just(\"NY\")\n *       getStateCode({}); //=> Maybe.Nothing()\n * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))\n */\nfunction composeK() {\n  if (arguments.length === 0) {\n    throw new Error('composeK requires at least one argument');\n  }\n  var init = Array.prototype.slice.call(arguments);\n  var last = init.pop();\n  return Object(_compose__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_compose__WEBPACK_IMPORTED_MODULE_1__[\"default\"].apply(this, Object(_map__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_chain__WEBPACK_IMPORTED_MODULE_0__[\"default\"], init)), last);\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/composeK.js?");

/***/ }),

/***/ "./node_modules/ramda/es/composeP.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/composeP.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return composeP; });\n/* harmony import */ var _pipeP__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipeP */ \"./node_modules/ramda/es/pipeP.js\");\n/* harmony import */ var _reverse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse */ \"./node_modules/ramda/es/reverse.js\");\n\n\n\n/**\n * Performs right-to-left composition of one or more Promise-returning\n * functions. The rightmost function may have any arity; the remaining\n * functions must be unary.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category Function\n * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)\n * @param {...Function} functions The functions to compose\n * @return {Function}\n * @see R.pipeP\n * @example\n *\n *      var db = {\n *        users: {\n *          JOE: {\n *            name: 'Joe',\n *            followers: ['STEVE', 'SUZY']\n *          }\n *        }\n *      }\n *\n *      // We'll pretend to do a db lookup which returns a promise\n *      var lookupUser = (userId) => Promise.resolve(db.users[userId])\n *      var lookupFollowers = (user) => Promise.resolve(user.followers)\n *      lookupUser('JOE').then(lookupFollowers)\n *\n *      //  followersForUser :: String -> Promise [UserId]\n *      var followersForUser = R.composeP(lookupFollowers, lookupUser);\n *      followersForUser('JOE').then(followers => console.log('Followers:', followers))\n *      // Followers: [\"STEVE\",\"SUZY\"]\n */\nfunction composeP() {\n  if (arguments.length === 0) {\n    throw new Error('composeP requires at least one argument');\n  }\n  return _pipeP__WEBPACK_IMPORTED_MODULE_0__[\"default\"].apply(this, Object(_reverse__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arguments));\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/composeP.js?");

/***/ }),

/***/ "./node_modules/ramda/es/concat.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/concat.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _internal_isFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isFunction */ \"./node_modules/ramda/es/internal/_isFunction.js\");\n/* harmony import */ var _internal_isString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isString */ \"./node_modules/ramda/es/internal/_isString.js\");\n/* harmony import */ var _toString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toString */ \"./node_modules/ramda/es/toString.js\");\n\n\n\n\n\n\n/**\n * Returns the result of concatenating the given lists or strings.\n *\n * Note: `R.concat` expects both arguments to be of the same type,\n * unlike the native `Array.prototype.concat` method. It will throw\n * an error if you `concat` an Array with a non-Array value.\n *\n * Dispatches to the `concat` method of the first argument, if present.\n * Can also concatenate two members of a [fantasy-land\n * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [a] -> [a]\n * @sig String -> String -> String\n * @param {Array|String} firstList The first list\n * @param {Array|String} secondList The second list\n * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of\n * `secondList`.\n *\n * @example\n *\n *      R.concat('ABC', 'DEF'); // 'ABCDEF'\n *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]\n *      R.concat([], []); //=> []\n */\nvar concat = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function concat(a, b) {\n  if (Object(_internal_isArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(a)) {\n    if (Object(_internal_isArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(b)) {\n      return a.concat(b);\n    }\n    throw new TypeError(Object(_toString__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(b) + ' is not an array');\n  }\n  if (Object(_internal_isString__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(a)) {\n    if (Object(_internal_isString__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(b)) {\n      return a + b;\n    }\n    throw new TypeError(Object(_toString__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(b) + ' is not a string');\n  }\n  if (a != null && Object(_internal_isFunction__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a['fantasy-land/concat'])) {\n    return a['fantasy-land/concat'](b);\n  }\n  if (a != null && Object(_internal_isFunction__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a.concat)) {\n    return a.concat(b);\n  }\n  throw new TypeError(Object(_toString__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(a) + ' does not have a method named \"concat\" or \"fantasy-land/concat\"');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (concat);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/concat.js?");

/***/ }),

/***/ "./node_modules/ramda/es/cond.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/cond.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max */ \"./node_modules/ramda/es/max.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n\n\n\n\n\n\n/**\n * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.\n * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments\n * to `fn` are applied to each of the predicates in turn until one returns a\n * \"truthy\" value, at which point `fn` returns the result of applying its\n * arguments to the corresponding transformer. If none of the predicates\n * matches, `fn` returns undefined.\n *\n * @func\n * @memberOf R\n * @since v0.6.0\n * @category Logic\n * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)\n * @param {Array} pairs A list of [predicate, transformer]\n * @return {Function}\n * @example\n *\n *      var fn = R.cond([\n *        [R.equals(0),   R.always('water freezes at 0°C')],\n *        [R.equals(100), R.always('water boils at 100°C')],\n *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']\n *      ]);\n *      fn(0); //=> 'water freezes at 0°C'\n *      fn(50); //=> 'nothing special happens at 50°C'\n *      fn(100); //=> 'water boils at 100°C'\n */\nvar cond = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function cond(pairs) {\n  var arity = Object(_reduce__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_max__WEBPACK_IMPORTED_MODULE_3__[\"default\"], 0, Object(_map__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function (pair) {\n    return pair[0].length;\n  }, pairs));\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arity, function () {\n    var idx = 0;\n    while (idx < pairs.length) {\n      if (pairs[idx][0].apply(this, arguments)) {\n        return pairs[idx][1].apply(this, arguments);\n      }\n      idx += 1;\n    }\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (cond);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/cond.js?");

/***/ }),

/***/ "./node_modules/ramda/es/construct.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/construct.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _constructN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructN */ \"./node_modules/ramda/es/constructN.js\");\n\n\n\n/**\n * Wraps a constructor function inside a curried function that can be called\n * with the same arguments and returns the same type.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig (* -> {*}) -> (* -> {*})\n * @param {Function} fn The constructor function to wrap.\n * @return {Function} A wrapped, curried constructor function.\n * @see R.invoker\n * @example\n *\n *      // Constructor function\n *      function Animal(kind) {\n *        this.kind = kind;\n *      };\n *      Animal.prototype.sighting = function() {\n *        return \"It's a \" + this.kind + \"!\";\n *      }\n *\n *      var AnimalConstructor = R.construct(Animal)\n *\n *      // Notice we no longer need the 'new' keyword:\n *      AnimalConstructor('Pig'); //=> {\"kind\": \"Pig\", \"sighting\": function (){...}};\n *\n *      var animalTypes = [\"Lion\", \"Tiger\", \"Bear\"];\n *      var animalSighting = R.invoker(0, 'sighting');\n *      var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);\n *      R.map(sightNewAnimal, animalTypes); //=> [\"It's a Lion!\", \"It's a Tiger!\", \"It's a Bear!\"]\n */\nvar construct = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function construct(Fn) {\n  return Object(_constructN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Fn.length, Fn);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (construct);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/construct.js?");

/***/ }),

/***/ "./node_modules/ramda/es/constructN.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/constructN.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _curry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curry */ \"./node_modules/ramda/es/curry.js\");\n/* harmony import */ var _nAry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nAry */ \"./node_modules/ramda/es/nAry.js\");\n\n\n\n\n/**\n * Wraps a constructor function inside a curried function that can be called\n * with the same arguments and returns the same type. The arity of the function\n * returned is specified to allow using variadic constructor functions.\n *\n * @func\n * @memberOf R\n * @since v0.4.0\n * @category Function\n * @sig Number -> (* -> {*}) -> (* -> {*})\n * @param {Number} n The arity of the constructor function.\n * @param {Function} Fn The constructor function to wrap.\n * @return {Function} A wrapped, curried constructor function.\n * @example\n *\n *      // Variadic Constructor function\n *      function Salad() {\n *        this.ingredients = arguments;\n *      }\n *\n *      Salad.prototype.recipe = function() {\n *        var instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);\n *        return R.join('\\n', instructions);\n *      };\n *\n *      var ThreeLayerSalad = R.constructN(3, Salad);\n *\n *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.\n *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');\n *\n *      console.log(salad.recipe());\n *      // Add a dollop of Mayonnaise\n *      // Add a dollop of Potato Chips\n *      // Add a dollop of Ketchup\n */\nvar constructN = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function constructN(n, Fn) {\n  if (n > 10) {\n    throw new Error('Constructor with greater than ten arguments');\n  }\n  if (n === 0) {\n    return function () {\n      return new Fn();\n    };\n  }\n  return Object(_curry__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_nAry__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {\n    switch (arguments.length) {\n      case 1:\n        return new Fn($0);\n      case 2:\n        return new Fn($0, $1);\n      case 3:\n        return new Fn($0, $1, $2);\n      case 4:\n        return new Fn($0, $1, $2, $3);\n      case 5:\n        return new Fn($0, $1, $2, $3, $4);\n      case 6:\n        return new Fn($0, $1, $2, $3, $4, $5);\n      case 7:\n        return new Fn($0, $1, $2, $3, $4, $5, $6);\n      case 8:\n        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);\n      case 9:\n        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);\n      case 10:\n        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);\n    }\n  }));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (constructN);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/constructN.js?");

/***/ }),

/***/ "./node_modules/ramda/es/contains.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/contains.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_contains */ \"./node_modules/ramda/es/internal/_contains.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Returns `true` if the specified value is equal, in [`R.equals`](#equals)\n * terms, to at least one element of the given list; `false` otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig a -> [a] -> Boolean\n * @param {Object} a The item to compare against.\n * @param {Array} list The array to consider.\n * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.\n * @see R.any\n * @example\n *\n *      R.contains(3, [1, 2, 3]); //=> true\n *      R.contains(4, [1, 2, 3]); //=> false\n *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true\n *      R.contains([42], [[42]]); //=> true\n */\nvar contains = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_internal_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (contains);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/contains.js?");

/***/ }),

/***/ "./node_modules/ramda/es/converge.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/converge.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_map */ \"./node_modules/ramda/es/internal/_map.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max */ \"./node_modules/ramda/es/max.js\");\n/* harmony import */ var _pluck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluck */ \"./node_modules/ramda/es/pluck.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n\n\n\n\n\n\n\n/**\n * Accepts a converging function and a list of branching functions and returns\n * a new function. When invoked, this new function is applied to some\n * arguments, each branching function is applied to those same arguments. The\n * results of each branching function are passed as arguments to the converging\n * function to produce the return value.\n *\n * @func\n * @memberOf R\n * @since v0.4.2\n * @category Function\n * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)\n * @param {Function} after A function. `after` will be invoked with the return values of\n *        `fn1` and `fn2` as its arguments.\n * @param {Array} functions A list of functions.\n * @return {Function} A new function.\n * @see R.useWith\n * @example\n *\n *      var average = R.converge(R.divide, [R.sum, R.length])\n *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4\n *\n *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])\n *      strangeConcat(\"Yodel\") //=> \"YODELyodel\"\n *\n * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))\n */\nvar converge = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function converge(after, fns) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_reduce__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(_max__WEBPACK_IMPORTED_MODULE_3__[\"default\"], 0, Object(_pluck__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('length', fns)), function () {\n    var args = arguments;\n    var context = this;\n    return after.apply(context, Object(_internal_map__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (fn) {\n      return fn.apply(context, args);\n    }, fns));\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (converge);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/converge.js?");

/***/ }),

/***/ "./node_modules/ramda/es/countBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/countBy.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reduceBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduceBy */ \"./node_modules/ramda/es/reduceBy.js\");\n\n\n/**\n * Counts the elements of a list according to how many match each value of a\n * key generated by the supplied function. Returns an object mapping the keys\n * produced by `fn` to the number of occurrences in the list. Note that all\n * keys are coerced to strings because of how JavaScript objects work.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig (a -> String) -> [a] -> {*}\n * @param {Function} fn The function used to map values to keys.\n * @param {Array} list The list to count elements from.\n * @return {Object} An object mapping keys to number of occurrences in the list.\n * @example\n *\n *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];\n *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}\n *\n *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];\n *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}\n */\nvar countBy = /*#__PURE__*/Object(_reduceBy__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (acc, elem) {\n  return acc + 1;\n}, 0);\n/* harmony default export */ __webpack_exports__[\"default\"] = (countBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/countBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/curry.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/curry.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n\n\n\n/**\n * Returns a curried equivalent of the provided function. The curried function\n * has two unusual capabilities. First, its arguments needn't be provided one\n * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the\n * following are equivalent:\n *\n *   - `g(1)(2)(3)`\n *   - `g(1)(2, 3)`\n *   - `g(1, 2)(3)`\n *   - `g(1, 2, 3)`\n *\n * Secondly, the special placeholder value [`R.__`](#__) may be used to specify\n * \"gaps\", allowing partial application of any combination of arguments,\n * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),\n * the following are equivalent:\n *\n *   - `g(1, 2, 3)`\n *   - `g(_, 2, 3)(1)`\n *   - `g(_, _, 3)(1)(2)`\n *   - `g(_, _, 3)(1, 2)`\n *   - `g(_, 2)(1)(3)`\n *   - `g(_, 2)(1, 3)`\n *   - `g(_, 2)(_, 3)(1)`\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig (* -> a) -> (* -> a)\n * @param {Function} fn The function to curry.\n * @return {Function} A new, curried function.\n * @see R.curryN\n * @example\n *\n *      var addFourNumbers = (a, b, c, d) => a + b + c + d;\n *\n *      var curriedAddFourNumbers = R.curry(addFourNumbers);\n *      var f = curriedAddFourNumbers(1, 2);\n *      var g = f(3);\n *      g(4); //=> 10\n */\nvar curry = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function curry(fn) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(fn.length, fn);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (curry);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/curry.js?");

/***/ }),

/***/ "./node_modules/ramda/es/curryN.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/curryN.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_curryN__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_curryN */ \"./node_modules/ramda/es/internal/_curryN.js\");\n\n\n\n\n\n/**\n * Returns a curried equivalent of the provided function, with the specified\n * arity. The curried function has two unusual capabilities. First, its\n * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the\n * following are equivalent:\n *\n *   - `g(1)(2)(3)`\n *   - `g(1)(2, 3)`\n *   - `g(1, 2)(3)`\n *   - `g(1, 2, 3)`\n *\n * Secondly, the special placeholder value [`R.__`](#__) may be used to specify\n * \"gaps\", allowing partial application of any combination of arguments,\n * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),\n * the following are equivalent:\n *\n *   - `g(1, 2, 3)`\n *   - `g(_, 2, 3)(1)`\n *   - `g(_, _, 3)(1)(2)`\n *   - `g(_, _, 3)(1, 2)`\n *   - `g(_, 2)(1)(3)`\n *   - `g(_, 2)(1, 3)`\n *   - `g(_, 2)(_, 3)(1)`\n *\n * @func\n * @memberOf R\n * @since v0.5.0\n * @category Function\n * @sig Number -> (* -> a) -> (* -> a)\n * @param {Number} length The arity for the returned function.\n * @param {Function} fn The function to curry.\n * @return {Function} A new, curried function.\n * @see R.curry\n * @example\n *\n *      var sumArgs = (...args) => R.sum(args);\n *\n *      var curriedAddFourNumbers = R.curryN(4, sumArgs);\n *      var f = curriedAddFourNumbers(1, 2);\n *      var g = f(3);\n *      g(4); //=> 10\n */\nvar curryN = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function curryN(length, fn) {\n  if (length === 1) {\n    return Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(fn);\n  }\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length, Object(_internal_curryN__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(length, [], fn));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (curryN);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/curryN.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dec.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/dec.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add */ \"./node_modules/ramda/es/add.js\");\n\n\n/**\n * Decrements its argument.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Math\n * @sig Number -> Number\n * @param {Number} n\n * @return {Number} n - 1\n * @see R.inc\n * @example\n *\n *      R.dec(42); //=> 41\n */\nvar dec = /*#__PURE__*/Object(_add__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(-1);\n/* harmony default export */ __webpack_exports__[\"default\"] = (dec);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dec.js?");

/***/ }),

/***/ "./node_modules/ramda/es/defaultTo.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/defaultTo.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns the second argument if it is not `null`, `undefined` or `NaN`;\n * otherwise the first argument is returned.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category Logic\n * @sig a -> b -> a | b\n * @param {a} default The default value.\n * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.\n * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value\n * @example\n *\n *      var defaultTo42 = R.defaultTo(42);\n *\n *      defaultTo42(null);  //=> 42\n *      defaultTo42(undefined);  //=> 42\n *      defaultTo42('Ramda');  //=> 'Ramda'\n *      // parseInt('string') results in NaN\n *      defaultTo42(parseInt('string')); //=> 42\n */\nvar defaultTo = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function defaultTo(d, v) {\n  return v == null || v !== v ? d : v;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (defaultTo);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/defaultTo.js?");

/***/ }),

/***/ "./node_modules/ramda/es/descend.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/descend.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Makes a descending comparator function out of a function that returns a value\n * that can be compared with `<` and `>`.\n *\n * @func\n * @memberOf R\n * @since v0.23.0\n * @category Function\n * @sig Ord b => (a -> b) -> a -> a -> Number\n * @param {Function} fn A function of arity one that returns a value that can be compared\n * @param {*} a The first item to be compared.\n * @param {*} b The second item to be compared.\n * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`\n * @see R.ascend\n * @example\n *\n *      var byAge = R.descend(R.prop('age'));\n *      var people = [\n *        // ...\n *      ];\n *      var peopleByOldestFirst = R.sort(byAge, people);\n */\nvar descend = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function descend(fn, a, b) {\n  var aa = fn(a);\n  var bb = fn(b);\n  return aa > bb ? -1 : aa < bb ? 1 : 0;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (descend);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/descend.js?");

/***/ }),

/***/ "./node_modules/ramda/es/difference.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/difference.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_contains */ \"./node_modules/ramda/es/internal/_contains.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Finds the set (i.e. no duplicates) of all elements in the first list not\n * contained in the second list. Objects and Arrays are compared in terms of\n * value equality, not reference equality.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig [*] -> [*] -> [*]\n * @param {Array} list1 The first list.\n * @param {Array} list2 The second list.\n * @return {Array} The elements in `list1` that are not in `list2`.\n * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without\n * @example\n *\n *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]\n *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]\n *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]\n */\nvar difference = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function difference(first, second) {\n  var out = [];\n  var idx = 0;\n  var firstLen = first.length;\n  while (idx < firstLen) {\n    if (!Object(_internal_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(first[idx], second) && !Object(_internal_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(first[idx], out)) {\n      out[out.length] = first[idx];\n    }\n    idx += 1;\n  }\n  return out;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (difference);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/difference.js?");

/***/ }),

/***/ "./node_modules/ramda/es/differenceWith.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/differenceWith.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_containsWith__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_containsWith */ \"./node_modules/ramda/es/internal/_containsWith.js\");\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n\n/**\n * Finds the set (i.e. no duplicates) of all elements in the first list not\n * contained in the second list. Duplication is determined according to the\n * value returned by applying the supplied predicate to two list elements.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]\n * @param {Function} pred A predicate used to test whether two items are equal.\n * @param {Array} list1 The first list.\n * @param {Array} list2 The second list.\n * @return {Array} The elements in `list1` that are not in `list2`.\n * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith\n * @example\n *\n *      var cmp = (x, y) => x.a === y.a;\n *      var l1 = [{a: 1}, {a: 2}, {a: 3}];\n *      var l2 = [{a: 3}, {a: 4}];\n *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]\n */\nvar differenceWith = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function differenceWith(pred, first, second) {\n  var out = [];\n  var idx = 0;\n  var firstLen = first.length;\n  while (idx < firstLen) {\n    if (!Object(_internal_containsWith__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(pred, first[idx], second) && !Object(_internal_containsWith__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(pred, first[idx], out)) {\n      out.push(first[idx]);\n    }\n    idx += 1;\n  }\n  return out;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (differenceWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/differenceWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dissoc.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/dissoc.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns a new object that does not contain a `prop` property.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category Object\n * @sig String -> {k: v} -> {k: v}\n * @param {String} prop The name of the property to dissociate\n * @param {Object} obj The object to clone\n * @return {Object} A new object equivalent to the original but without the specified property\n * @see R.assoc\n * @example\n *\n *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}\n */\nvar dissoc = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function dissoc(prop, obj) {\n  var result = {};\n  for (var p in obj) {\n    result[p] = obj[p];\n  }\n  delete result[prop];\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (dissoc);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dissoc.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dissocPath.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/dissocPath.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isInteger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger */ \"./node_modules/ramda/es/internal/_isInteger.js\");\n/* harmony import */ var _assoc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assoc */ \"./node_modules/ramda/es/assoc.js\");\n/* harmony import */ var _dissoc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dissoc */ \"./node_modules/ramda/es/dissoc.js\");\n/* harmony import */ var _remove__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./remove */ \"./node_modules/ramda/es/remove.js\");\n/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./update */ \"./node_modules/ramda/es/update.js\");\n\n\n\n\n\n\n\n/**\n * Makes a shallow clone of an object, omitting the property at the given path.\n * Note that this copies and flattens prototype properties onto the new object\n * as well. All non-primitive properties are copied by reference.\n *\n * @func\n * @memberOf R\n * @since v0.11.0\n * @category Object\n * @typedefn Idx = String | Int\n * @sig [Idx] -> {k: v} -> {k: v}\n * @param {Array} path The path to the value to omit\n * @param {Object} obj The object to clone\n * @return {Object} A new object without the property at path\n * @see R.assocPath\n * @example\n *\n *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}\n */\nvar dissocPath = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function dissocPath(path, obj) {\n  switch (path.length) {\n    case 0:\n      return obj;\n    case 1:\n      return Object(_internal_isInteger__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(path[0]) ? Object(_remove__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(path[0], 1, obj) : Object(_dissoc__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(path[0], obj);\n    default:\n      var head = path[0];\n      var tail = Array.prototype.slice.call(path, 1);\n      if (obj[head] == null) {\n        return obj;\n      } else if (Object(_internal_isInteger__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(path[0])) {\n        return Object(_update__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(head, dissocPath(tail, obj[head]), obj);\n      } else {\n        return Object(_assoc__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(head, dissocPath(tail, obj[head]), obj);\n      }\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (dissocPath);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dissocPath.js?");

/***/ }),

/***/ "./node_modules/ramda/es/divide.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/divide.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Divides two numbers. Equivalent to `a / b`.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Math\n * @sig Number -> Number -> Number\n * @param {Number} a The first value.\n * @param {Number} b The second value.\n * @return {Number} The result of `a / b`.\n * @see R.multiply\n * @example\n *\n *      R.divide(71, 100); //=> 0.71\n *\n *      var half = R.divide(R.__, 2);\n *      half(42); //=> 21\n *\n *      var reciprocal = R.divide(1);\n *      reciprocal(4);   //=> 0.25\n */\nvar divide = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function divide(a, b) {\n  return a / b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (divide);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/divide.js?");

/***/ }),

/***/ "./node_modules/ramda/es/drop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/drop.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xdrop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdrop */ \"./node_modules/ramda/es/internal/_xdrop.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n\n\n/**\n * Returns all but the first `n` elements of the given list, string, or\n * transducer/transformer (or object with a `drop` method).\n *\n * Dispatches to the `drop` method of the second argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Number -> [a] -> [a]\n * @sig Number -> String -> String\n * @param {Number} n\n * @param {*} list\n * @return {*} A copy of list without the first `n` elements\n * @see R.take, R.transduce, R.dropLast, R.dropWhile\n * @example\n *\n *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']\n *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']\n *      R.drop(3, ['foo', 'bar', 'baz']); //=> []\n *      R.drop(4, ['foo', 'bar', 'baz']); //=> []\n *      R.drop(3, 'ramda');               //=> 'da'\n */\nvar drop = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['drop'], _internal_xdrop__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function drop(n, xs) {\n  return Object(_slice__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Math.max(0, n), Infinity, xs);\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (drop);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/drop.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dropLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/dropLast.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_dropLast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dropLast */ \"./node_modules/ramda/es/internal/_dropLast.js\");\n/* harmony import */ var _internal_xdropLast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xdropLast */ \"./node_modules/ramda/es/internal/_xdropLast.js\");\n\n\n\n\n\n/**\n * Returns a list containing all but the last `n` elements of the given `list`.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category List\n * @sig Number -> [a] -> [a]\n * @sig Number -> String -> String\n * @param {Number} n The number of elements of `list` to skip.\n * @param {Array} list The list of elements to consider.\n * @return {Array} A copy of the list with only the first `list.length - n` elements\n * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile\n * @example\n *\n *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']\n *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']\n *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []\n *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []\n *      R.dropLast(3, 'ramda');               //=> 'ra'\n */\nvar dropLast = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xdropLast__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _internal_dropLast__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (dropLast);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dropLast.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dropLastWhile.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/dropLastWhile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_dropLastWhile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dropLastWhile */ \"./node_modules/ramda/es/internal/_dropLastWhile.js\");\n/* harmony import */ var _internal_xdropLastWhile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xdropLastWhile */ \"./node_modules/ramda/es/internal/_xdropLastWhile.js\");\n\n\n\n\n\n/**\n * Returns a new list excluding all the tailing elements of a given list which\n * satisfy the supplied predicate function. It passes each value from the right\n * to the supplied predicate function, skipping elements until the predicate\n * function returns a `falsy` value. The predicate function is applied to one argument:\n * *(value)*.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> [a]\n * @sig (a -> Boolean) -> String -> String\n * @param {Function} predicate The function to be called on each element\n * @param {Array} xs The collection to iterate over.\n * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.\n * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile\n * @example\n *\n *      var lteThree = x => x <= 3;\n *\n *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]\n *\n *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'\n */\nvar dropLastWhile = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xdropLastWhile__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _internal_dropLastWhile__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (dropLastWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dropLastWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dropRepeats.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/dropRepeats.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xdropRepeatsWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropRepeatsWith */ \"./node_modules/ramda/es/internal/_xdropRepeatsWith.js\");\n/* harmony import */ var _dropRepeatsWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropRepeatsWith */ \"./node_modules/ramda/es/dropRepeatsWith.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n\n\n\n\n\n\n/**\n * Returns a new list without any consecutively repeating elements.\n * [`R.equals`](#equals) is used to determine equality.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category List\n * @sig [a] -> [a]\n * @param {Array} list The array to consider.\n * @return {Array} `list` without repeating elements.\n * @see R.transduce\n * @example\n *\n *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]\n */\nvar dropRepeats = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], /*#__PURE__*/Object(_internal_xdropRepeatsWith__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_equals__WEBPACK_IMPORTED_MODULE_4__[\"default\"]), /*#__PURE__*/Object(_dropRepeatsWith__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_equals__WEBPACK_IMPORTED_MODULE_4__[\"default\"])));\n/* harmony default export */ __webpack_exports__[\"default\"] = (dropRepeats);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dropRepeats.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dropRepeatsWith.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/dropRepeatsWith.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xdropRepeatsWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropRepeatsWith */ \"./node_modules/ramda/es/internal/_xdropRepeatsWith.js\");\n/* harmony import */ var _last__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./last */ \"./node_modules/ramda/es/last.js\");\n\n\n\n\n\n/**\n * Returns a new list without any consecutively repeating elements. Equality is\n * determined by applying the supplied predicate to each pair of consecutive elements. The\n * first element in a series of equal elements will be preserved.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category List\n * @sig ((a, a) -> Boolean) -> [a] -> [a]\n * @param {Function} pred A predicate used to test whether two items are equal.\n * @param {Array} list The array to consider.\n * @return {Array} `list` without repeating elements.\n * @see R.transduce\n * @example\n *\n *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];\n *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]\n */\nvar dropRepeatsWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xdropRepeatsWith__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function dropRepeatsWith(pred, list) {\n  var result = [];\n  var idx = 1;\n  var len = list.length;\n  if (len !== 0) {\n    result[0] = list[0];\n    while (idx < len) {\n      if (!pred(Object(_last__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(result), list[idx])) {\n        result[result.length] = list[idx];\n      }\n      idx += 1;\n    }\n  }\n  return result;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (dropRepeatsWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dropRepeatsWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/dropWhile.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/dropWhile.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xdropWhile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropWhile */ \"./node_modules/ramda/es/internal/_xdropWhile.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n\n\n/**\n * Returns a new list excluding the leading elements of a given list which\n * satisfy the supplied predicate function. It passes each value to the supplied\n * predicate function, skipping elements while the predicate function returns\n * `true`. The predicate function is applied to one argument: *(value)*.\n *\n * Dispatches to the `dropWhile` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> [a]\n * @sig (a -> Boolean) -> String -> String\n * @param {Function} fn The function called per iteration.\n * @param {Array} xs The collection to iterate over.\n * @return {Array} A new array.\n * @see R.takeWhile, R.transduce, R.addIndex\n * @example\n *\n *      var lteTwo = x => x <= 2;\n *\n *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]\n *\n *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'\n */\nvar dropWhile = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['dropWhile'], _internal_xdropWhile__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function dropWhile(pred, xs) {\n  var idx = 0;\n  var len = xs.length;\n  while (idx < len && pred(xs[idx])) {\n    idx += 1;\n  }\n  return Object(_slice__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(idx, Infinity, xs);\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (dropWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/dropWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/either.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/either.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction */ \"./node_modules/ramda/es/internal/_isFunction.js\");\n/* harmony import */ var _lift__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lift */ \"./node_modules/ramda/es/lift.js\");\n/* harmony import */ var _or__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./or */ \"./node_modules/ramda/es/or.js\");\n\n\n\n\n\n/**\n * A function wrapping calls to the two functions in an `||` operation,\n * returning the result of the first function if it is truth-y and the result\n * of the second function otherwise. Note that this is short-circuited,\n * meaning that the second function will not be invoked if the first returns a\n * truth-y value.\n *\n * In addition to functions, `R.either` also accepts any fantasy-land compatible\n * applicative functor.\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category Logic\n * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)\n * @param {Function} f a predicate\n * @param {Function} g another predicate\n * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.\n * @see R.or\n * @example\n *\n *      var gt10 = x => x > 10;\n *      var even = x => x % 2 === 0;\n *      var f = R.either(gt10, even);\n *      f(101); //=> true\n *      f(8); //=> true\n */\nvar either = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function either(f, g) {\n  return Object(_internal_isFunction__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(f) ? function _either() {\n    return f.apply(this, arguments) || g.apply(this, arguments);\n  } : Object(_lift__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_or__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(f, g);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (either);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/either.js?");

/***/ }),

/***/ "./node_modules/ramda/es/empty.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/empty.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_isArguments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArguments */ \"./node_modules/ramda/es/internal/_isArguments.js\");\n/* harmony import */ var _internal_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _internal_isObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isObject */ \"./node_modules/ramda/es/internal/_isObject.js\");\n/* harmony import */ var _internal_isString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_isString */ \"./node_modules/ramda/es/internal/_isString.js\");\n\n\n\n\n\n\n/**\n * Returns the empty value of its argument's type. Ramda defines the empty\n * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other\n * types are supported if they define `<Type>.empty`,\n * `<Type>.prototype.empty` or implement the\n * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).\n *\n * Dispatches to the `empty` method of the first argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category Function\n * @sig a -> a\n * @param {*} x\n * @return {*}\n * @example\n *\n *      R.empty(Just(42));      //=> Nothing()\n *      R.empty([1, 2, 3]);     //=> []\n *      R.empty('unicorns');    //=> ''\n *      R.empty({x: 1, y: 2});  //=> {}\n */\nvar empty = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function empty(x) {\n  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : Object(_internal_isArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(x) ? [] : Object(_internal_isString__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(x) ? '' : Object(_internal_isObject__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(x) ? {} : Object(_internal_isArguments__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(x) ? function () {\n    return arguments;\n  }() :\n  // else\n  void 0;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (empty);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/empty.js?");

/***/ }),

/***/ "./node_modules/ramda/es/endsWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/endsWith.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n/* harmony import */ var _takeLast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./takeLast */ \"./node_modules/ramda/es/takeLast.js\");\n\n\n\n\n/**\n * Checks if a list ends with the provided values\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category List\n * @sig [a] -> Boolean\n * @sig String -> Boolean\n * @param {*} suffix\n * @param {*} list\n * @return {Boolean}\n * @example\n *\n *      R.endsWith('c', 'abc')                //=> true\n *      R.endsWith('b', 'abc')                //=> false\n *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true\n *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false\n */\nvar endsWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (suffix, list) {\n  return Object(_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_takeLast__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(suffix.length, list), suffix);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (endsWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/endsWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/eqBy.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/eqBy.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n\n\n\n/**\n * Takes a function and two values in its domain and returns `true` if the\n * values map to the same value in the codomain; `false` otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.18.0\n * @category Relation\n * @sig (a -> b) -> a -> a -> Boolean\n * @param {Function} f\n * @param {*} x\n * @param {*} y\n * @return {Boolean}\n * @example\n *\n *      R.eqBy(Math.abs, 5, -5); //=> true\n */\nvar eqBy = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function eqBy(f, x, y) {\n  return Object(_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(f(x), f(y));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (eqBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/eqBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/eqProps.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/eqProps.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n\n\n\n/**\n * Reports whether two objects have the same value, in [`R.equals`](#equals)\n * terms, for the specified property. Useful as a curried predicate.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig k -> {k: v} -> {k: v} -> Boolean\n * @param {String} prop The name of the property to compare\n * @param {Object} obj1\n * @param {Object} obj2\n * @return {Boolean}\n *\n * @example\n *\n *      var o1 = { a: 1, b: 2, c: 3, d: 4 };\n *      var o2 = { a: 10, b: 20, c: 3, d: 40 };\n *      R.eqProps('a', o1, o2); //=> false\n *      R.eqProps('c', o1, o2); //=> true\n */\nvar eqProps = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function eqProps(prop, obj1, obj2) {\n  return Object(_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(obj1[prop], obj2[prop]);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (eqProps);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/eqProps.js?");

/***/ }),

/***/ "./node_modules/ramda/es/equals.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/equals.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_equals */ \"./node_modules/ramda/es/internal/_equals.js\");\n\n\n\n/**\n * Returns `true` if its arguments are equivalent, `false` otherwise. Handles\n * cyclical data structures.\n *\n * Dispatches symmetrically to the `equals` methods of both arguments, if\n * present.\n *\n * @func\n * @memberOf R\n * @since v0.15.0\n * @category Relation\n * @sig a -> b -> Boolean\n * @param {*} a\n * @param {*} b\n * @return {Boolean}\n * @example\n *\n *      R.equals(1, 1); //=> true\n *      R.equals(1, '1'); //=> false\n *      R.equals([1, 2, 3], [1, 2, 3]); //=> true\n *\n *      var a = {}; a.v = a;\n *      var b = {}; b.v = b;\n *      R.equals(a, b); //=> true\n */\nvar equals = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function equals(a, b) {\n  return Object(_internal_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(a, b, [], []);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (equals);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/equals.js?");

/***/ }),

/***/ "./node_modules/ramda/es/evolve.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/evolve.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Creates a new object by recursively evolving a shallow copy of `object`,\n * according to the `transformation` functions. All non-primitive properties\n * are copied by reference.\n *\n * A `transformation` function will not be invoked if its corresponding key\n * does not exist in the evolved object.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Object\n * @sig {k: (v -> v)} -> {k: v} -> {k: v}\n * @param {Object} transformations The object specifying transformation functions to apply\n *        to the object.\n * @param {Object} object The object to be transformed.\n * @return {Object} The transformed object.\n * @example\n *\n *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};\n *      var transformations = {\n *        firstName: R.trim,\n *        lastName: R.trim, // Will not get invoked.\n *        data: {elapsed: R.add(1), remaining: R.add(-1)}\n *      };\n *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}\n */\nvar evolve = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function evolve(transformations, object) {\n  var result = {};\n  var transformation, key, type;\n  for (key in object) {\n    transformation = transformations[key];\n    type = typeof transformation;\n    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (evolve);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/evolve.js?");

/***/ }),

/***/ "./node_modules/ramda/es/filter.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/filter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter */ \"./node_modules/ramda/es/internal/_filter.js\");\n/* harmony import */ var _internal_isObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isObject */ \"./node_modules/ramda/es/internal/_isObject.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _internal_xfilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_xfilter */ \"./node_modules/ramda/es/internal/_xfilter.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n\n\n\n\n\n/**\n * Takes a predicate and a `Filterable`, and returns a new filterable of the\n * same type containing the members of the given filterable which satisfy the\n * given predicate. Filterable objects include plain objects or any object\n * that has a filter method such as `Array`.\n *\n * Dispatches to the `filter` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Filterable f => (a -> Boolean) -> f a -> f a\n * @param {Function} pred\n * @param {Array} filterable\n * @return {Array} Filterable\n * @see R.reject, R.transduce, R.addIndex\n * @example\n *\n *      var isEven = n => n % 2 === 0;\n *\n *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]\n *\n *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}\n */\nvar filter = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['filter'], _internal_xfilter__WEBPACK_IMPORTED_MODULE_5__[\"default\"], function (pred, filterable) {\n  return Object(_internal_isObject__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(filterable) ? Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(function (acc, key) {\n    if (pred(filterable[key])) {\n      acc[key] = filterable[key];\n    }\n    return acc;\n  }, {}, Object(_keys__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(filterable)) :\n  // else\n  Object(_internal_filter__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(pred, filterable);\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (filter);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/filter.js?");

/***/ }),

/***/ "./node_modules/ramda/es/find.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/find.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xfind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfind */ \"./node_modules/ramda/es/internal/_xfind.js\");\n\n\n\n\n/**\n * Returns the first element of the list which matches the predicate, or\n * `undefined` if no element matches.\n *\n * Dispatches to the `find` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> a | undefined\n * @param {Function} fn The predicate function used to determine if the element is the\n *        desired one.\n * @param {Array} list The array to consider.\n * @return {Object} The element found, or `undefined`.\n * @see R.transduce\n * @example\n *\n *      var xs = [{a: 1}, {a: 2}, {a: 3}];\n *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}\n *      R.find(R.propEq('a', 4))(xs); //=> undefined\n */\nvar find = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['find'], _internal_xfind__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function find(fn, list) {\n  var idx = 0;\n  var len = list.length;\n  while (idx < len) {\n    if (fn(list[idx])) {\n      return list[idx];\n    }\n    idx += 1;\n  }\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (find);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/find.js?");

/***/ }),

/***/ "./node_modules/ramda/es/findIndex.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/findIndex.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xfindIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindIndex */ \"./node_modules/ramda/es/internal/_xfindIndex.js\");\n\n\n\n\n/**\n * Returns the index of the first element of the list which matches the\n * predicate, or `-1` if no element matches.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.1\n * @category List\n * @sig (a -> Boolean) -> [a] -> Number\n * @param {Function} fn The predicate function used to determine if the element is the\n * desired one.\n * @param {Array} list The array to consider.\n * @return {Number} The index of the element found, or `-1`.\n * @see R.transduce\n * @example\n *\n *      var xs = [{a: 1}, {a: 2}, {a: 3}];\n *      R.findIndex(R.propEq('a', 2))(xs); //=> 1\n *      R.findIndex(R.propEq('a', 4))(xs); //=> -1\n */\nvar findIndex = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xfindIndex__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function findIndex(fn, list) {\n  var idx = 0;\n  var len = list.length;\n  while (idx < len) {\n    if (fn(list[idx])) {\n      return idx;\n    }\n    idx += 1;\n  }\n  return -1;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (findIndex);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/findIndex.js?");

/***/ }),

/***/ "./node_modules/ramda/es/findLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/findLast.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xfindLast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindLast */ \"./node_modules/ramda/es/internal/_xfindLast.js\");\n\n\n\n\n/**\n * Returns the last element of the list which matches the predicate, or\n * `undefined` if no element matches.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.1\n * @category List\n * @sig (a -> Boolean) -> [a] -> a | undefined\n * @param {Function} fn The predicate function used to determine if the element is the\n * desired one.\n * @param {Array} list The array to consider.\n * @return {Object} The element found, or `undefined`.\n * @see R.transduce\n * @example\n *\n *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];\n *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}\n *      R.findLast(R.propEq('a', 4))(xs); //=> undefined\n */\nvar findLast = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xfindLast__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function findLast(fn, list) {\n  var idx = list.length - 1;\n  while (idx >= 0) {\n    if (fn(list[idx])) {\n      return list[idx];\n    }\n    idx -= 1;\n  }\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (findLast);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/findLast.js?");

/***/ }),

/***/ "./node_modules/ramda/es/findLastIndex.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/findLastIndex.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xfindLastIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindLastIndex */ \"./node_modules/ramda/es/internal/_xfindLastIndex.js\");\n\n\n\n\n/**\n * Returns the index of the last element of the list which matches the\n * predicate, or `-1` if no element matches.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.1\n * @category List\n * @sig (a -> Boolean) -> [a] -> Number\n * @param {Function} fn The predicate function used to determine if the element is the\n * desired one.\n * @param {Array} list The array to consider.\n * @return {Number} The index of the element found, or `-1`.\n * @see R.transduce\n * @example\n *\n *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];\n *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1\n *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1\n */\nvar findLastIndex = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xfindLastIndex__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function findLastIndex(fn, list) {\n  var idx = list.length - 1;\n  while (idx >= 0) {\n    if (fn(list[idx])) {\n      return idx;\n    }\n    idx -= 1;\n  }\n  return -1;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (findLastIndex);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/findLastIndex.js?");

/***/ }),

/***/ "./node_modules/ramda/es/flatten.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/flatten.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_makeFlat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_makeFlat */ \"./node_modules/ramda/es/internal/_makeFlat.js\");\n\n\n\n/**\n * Returns a new list by pulling every item out of it (and all its sub-arrays)\n * and putting them in a new array, depth-first.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [b]\n * @param {Array} list The array to consider.\n * @return {Array} The flattened list.\n * @see R.unnest\n * @example\n *\n *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);\n *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]\n */\nvar flatten = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_makeFlat__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(true));\n/* harmony default export */ __webpack_exports__[\"default\"] = (flatten);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/flatten.js?");

/***/ }),

/***/ "./node_modules/ramda/es/flip.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/flip.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n\n\n\n/**\n * Returns a new function much like the supplied one, except that the first two\n * arguments' order is reversed.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)\n * @param {Function} fn The function to invoke with its first two parameters reversed.\n * @return {*} The result of invoking `fn` with its first two parameters' order reversed.\n * @example\n *\n *      var mergeThree = (a, b, c) => [].concat(a, b, c);\n *\n *      mergeThree(1, 2, 3); //=> [1, 2, 3]\n *\n *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]\n * @symb R.flip(f)(a, b, c) = f(b, a, c)\n */\nvar flip = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function flip(fn) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(fn.length, function (a, b) {\n    var args = Array.prototype.slice.call(arguments, 0);\n    args[0] = b;\n    args[1] = a;\n    return fn.apply(this, args);\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (flip);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/flip.js?");

/***/ }),

/***/ "./node_modules/ramda/es/forEach.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/forEach.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod */ \"./node_modules/ramda/es/internal/_checkForMethod.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Iterate over an input `list`, calling a provided function `fn` for each\n * element in the list.\n *\n * `fn` receives one argument: *(value)*.\n *\n * Note: `R.forEach` does not skip deleted or unassigned indices (sparse\n * arrays), unlike the native `Array.prototype.forEach` method. For more\n * details on this behavior, see:\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description\n *\n * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns\n * the original array. In some libraries this function is named `each`.\n *\n * Dispatches to the `forEach` method of the second argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.1.1\n * @category List\n * @sig (a -> *) -> [a] -> [a]\n * @param {Function} fn The function to invoke. Receives one argument, `value`.\n * @param {Array} list The list to iterate over.\n * @return {Array} The original list.\n * @see R.addIndex\n * @example\n *\n *      var printXPlusFive = x => console.log(x + 5);\n *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]\n *      // logs 6\n *      // logs 7\n *      // logs 8\n * @symb R.forEach(f, [a, b, c]) = [a, b, c]\n */\nvar forEach = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('forEach', function forEach(fn, list) {\n  var len = list.length;\n  var idx = 0;\n  while (idx < len) {\n    fn(list[idx]);\n    idx += 1;\n  }\n  return list;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (forEach);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/forEach.js?");

/***/ }),

/***/ "./node_modules/ramda/es/forEachObjIndexed.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/forEachObjIndexed.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n/**\n * Iterate over an input `object`, calling a provided function `fn` for each\n * key and value in the object.\n *\n * `fn` receives three argument: *(value, key, obj)*.\n *\n * @func\n * @memberOf R\n * @since v0.23.0\n * @category Object\n * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a\n * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.\n * @param {Object} obj The object to iterate over.\n * @return {Object} The original object.\n * @example\n *\n *      var printKeyConcatValue = (value, key) => console.log(key + ':' + value);\n *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}\n *      // logs x:1\n *      // logs y:2\n * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}\n */\nvar forEachObjIndexed = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function forEachObjIndexed(fn, obj) {\n  var keyList = Object(_keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(obj);\n  var idx = 0;\n  while (idx < keyList.length) {\n    var key = keyList[idx];\n    fn(obj[key], key, obj);\n    idx += 1;\n  }\n  return obj;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (forEachObjIndexed);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/forEachObjIndexed.js?");

/***/ }),

/***/ "./node_modules/ramda/es/fromPairs.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/fromPairs.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Creates a new object from a list key-value pairs. If a key appears in\n * multiple pairs, the rightmost pair is included in the object.\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category List\n * @sig [[k,v]] -> {k: v}\n * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.\n * @return {Object} The object made by pairing up `keys` and `values`.\n * @see R.toPairs, R.pair\n * @example\n *\n *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}\n */\nvar fromPairs = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function fromPairs(pairs) {\n  var result = {};\n  var idx = 0;\n  while (idx < pairs.length) {\n    result[pairs[idx][0]] = pairs[idx][1];\n    idx += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (fromPairs);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/fromPairs.js?");

/***/ }),

/***/ "./node_modules/ramda/es/groupBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/groupBy.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod */ \"./node_modules/ramda/es/internal/_checkForMethod.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduceBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduceBy */ \"./node_modules/ramda/es/reduceBy.js\");\n\n\n\n\n/**\n * Splits a list into sub-lists stored in an object, based on the result of\n * calling a String-returning function on each element, and grouping the\n * results according to values returned.\n *\n * Dispatches to the `groupBy` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig (a -> String) -> [a] -> {String: [a]}\n * @param {Function} fn Function :: a -> String\n * @param {Array} list The array to group\n * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements\n *         that produced that key when passed to `fn`.\n * @see R.transduce\n * @example\n *\n *      var byGrade = R.groupBy(function(student) {\n *        var score = student.score;\n *        return score < 65 ? 'F' :\n *               score < 70 ? 'D' :\n *               score < 80 ? 'C' :\n *               score < 90 ? 'B' : 'A';\n *      });\n *      var students = [{name: 'Abby', score: 84},\n *                      {name: 'Eddy', score: 58},\n *                      // ...\n *                      {name: 'Jack', score: 69}];\n *      byGrade(students);\n *      // {\n *      //   'A': [{name: 'Dianne', score: 99}],\n *      //   'B': [{name: 'Abby', score: 84}]\n *      //   // ...,\n *      //   'F': [{name: 'Eddy', score: 58}]\n *      // }\n */\nvar groupBy = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('groupBy', /*#__PURE__*/Object(_reduceBy__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function (acc, item) {\n  if (acc == null) {\n    acc = [];\n  }\n  acc.push(item);\n  return acc;\n}, null)));\n/* harmony default export */ __webpack_exports__[\"default\"] = (groupBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/groupBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/groupWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/groupWith.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Takes a list and returns a list of lists where each sublist's elements are\n * all satisfied pairwise comparison according to the provided function.\n * Only adjacent elements are passed to the comparison function.\n *\n * @func\n * @memberOf R\n * @since v0.21.0\n * @category List\n * @sig ((a, a) → Boolean) → [a] → [[a]]\n * @param {Function} fn Function for determining whether two given (adjacent)\n *        elements should be in the same group\n * @param {Array} list The array to group. Also accepts a string, which will be\n *        treated as a list of characters.\n * @return {List} A list that contains sublists of elements,\n *         whose concatenations are equal to the original list.\n * @example\n *\n * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])\n * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]\n *\n * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])\n * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]\n *\n * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])\n * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]\n *\n * R.groupWith(R.eqBy(isVowel), 'aestiou')\n * //=> ['ae', 'st', 'iou']\n */\nvar groupWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (fn, list) {\n  var res = [];\n  var idx = 0;\n  var len = list.length;\n  while (idx < len) {\n    var nextidx = idx + 1;\n    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {\n      nextidx += 1;\n    }\n    res.push(list.slice(idx, nextidx));\n    idx = nextidx;\n  }\n  return res;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (groupWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/groupWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/gt.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/gt.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns `true` if the first argument is greater than the second; `false`\n * otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord a => a -> a -> Boolean\n * @param {*} a\n * @param {*} b\n * @return {Boolean}\n * @see R.lt\n * @example\n *\n *      R.gt(2, 1); //=> true\n *      R.gt(2, 2); //=> false\n *      R.gt(2, 3); //=> false\n *      R.gt('a', 'z'); //=> false\n *      R.gt('z', 'a'); //=> true\n */\nvar gt = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function gt(a, b) {\n  return a > b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (gt);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/gt.js?");

/***/ }),

/***/ "./node_modules/ramda/es/gte.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/gte.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns `true` if the first argument is greater than or equal to the second;\n * `false` otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord a => a -> a -> Boolean\n * @param {Number} a\n * @param {Number} b\n * @return {Boolean}\n * @see R.lte\n * @example\n *\n *      R.gte(2, 1); //=> true\n *      R.gte(2, 2); //=> true\n *      R.gte(2, 3); //=> false\n *      R.gte('a', 'z'); //=> false\n *      R.gte('z', 'a'); //=> true\n */\nvar gte = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function gte(a, b) {\n  return a >= b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (gte);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/gte.js?");

/***/ }),

/***/ "./node_modules/ramda/es/has.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/has.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\n\n/**\n * Returns whether or not an object has an own property with the specified name\n *\n * @func\n * @memberOf R\n * @since v0.7.0\n * @category Object\n * @sig s -> {s: x} -> Boolean\n * @param {String} prop The name of the property to check for.\n * @param {Object} obj The object to query.\n * @return {Boolean} Whether the property exists.\n * @example\n *\n *      var hasName = R.has('name');\n *      hasName({name: 'alice'});   //=> true\n *      hasName({name: 'bob'});     //=> true\n *      hasName({});                //=> false\n *\n *      var point = {x: 0, y: 0};\n *      var pointHas = R.has(R.__, point);\n *      pointHas('x');  //=> true\n *      pointHas('y');  //=> true\n *      pointHas('z');  //=> false\n */\nvar has = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (has);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/has.js?");

/***/ }),

/***/ "./node_modules/ramda/es/hasIn.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/hasIn.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns whether or not an object or its prototype chain has a property with\n * the specified name\n *\n * @func\n * @memberOf R\n * @since v0.7.0\n * @category Object\n * @sig s -> {s: x} -> Boolean\n * @param {String} prop The name of the property to check for.\n * @param {Object} obj The object to query.\n * @return {Boolean} Whether the property exists.\n * @example\n *\n *      function Rectangle(width, height) {\n *        this.width = width;\n *        this.height = height;\n *      }\n *      Rectangle.prototype.area = function() {\n *        return this.width * this.height;\n *      };\n *\n *      var square = new Rectangle(2, 2);\n *      R.hasIn('width', square);  //=> true\n *      R.hasIn('area', square);  //=> true\n */\nvar hasIn = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function hasIn(prop, obj) {\n  return prop in obj;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (hasIn);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/hasIn.js?");

/***/ }),

/***/ "./node_modules/ramda/es/head.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/head.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nth */ \"./node_modules/ramda/es/nth.js\");\n\n\n/**\n * Returns the first element of the given list or string. In some libraries\n * this function is named `first`.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> a | Undefined\n * @sig String -> String\n * @param {Array|String} list\n * @return {*}\n * @see R.tail, R.init, R.last\n * @example\n *\n *      R.head(['fi', 'fo', 'fum']); //=> 'fi'\n *      R.head([]); //=> undefined\n *\n *      R.head('abc'); //=> 'a'\n *      R.head(''); //=> ''\n */\nvar head = /*#__PURE__*/Object(_nth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0);\n/* harmony default export */ __webpack_exports__[\"default\"] = (head);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/head.js?");

/***/ }),

/***/ "./node_modules/ramda/es/identical.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/identical.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns true if its arguments are identical, false otherwise. Values are\n * identical if they reference the same memory. `NaN` is identical to `NaN`;\n * `0` and `-0` are not identical.\n *\n * @func\n * @memberOf R\n * @since v0.15.0\n * @category Relation\n * @sig a -> a -> Boolean\n * @param {*} a\n * @param {*} b\n * @return {Boolean}\n * @example\n *\n *      var o = {};\n *      R.identical(o, o); //=> true\n *      R.identical(1, 1); //=> true\n *      R.identical(1, '1'); //=> false\n *      R.identical([], []); //=> false\n *      R.identical(0, -0); //=> false\n *      R.identical(NaN, NaN); //=> true\n */\nvar identical = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function identical(a, b) {\n  // SameValue algorithm\n  if (a === b) {\n    // Steps 1-5, 7-10\n    // Steps 6.b-6.e: +0 != -0\n    return a !== 0 || 1 / a === 1 / b;\n  } else {\n    // Step 6.a: NaN == NaN\n    return a !== a && b !== b;\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (identical);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/identical.js?");

/***/ }),

/***/ "./node_modules/ramda/es/identity.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/identity.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_identity */ \"./node_modules/ramda/es/internal/_identity.js\");\n\n\n\n/**\n * A function that does nothing but return the parameter supplied to it. Good\n * as a default or placeholder function.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig a -> a\n * @param {*} x The value to return.\n * @return {*} The input value, `x`.\n * @example\n *\n *      R.identity(1); //=> 1\n *\n *      var obj = {};\n *      R.identity(obj) === obj; //=> true\n * @symb R.identity(a) = a\n */\nvar identity = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_internal_identity__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (identity);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/identity.js?");

/***/ }),

/***/ "./node_modules/ramda/es/ifElse.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/ifElse.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n\n\n\n/**\n * Creates a function that will process either the `onTrue` or the `onFalse`\n * function depending upon the result of the `condition` predicate.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Logic\n * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)\n * @param {Function} condition A predicate function\n * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.\n * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.\n * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`\n *                    function depending upon the result of the `condition` predicate.\n * @see R.unless, R.when\n * @example\n *\n *      var incCount = R.ifElse(\n *        R.has('count'),\n *        R.over(R.lensProp('count'), R.inc),\n *        R.assoc('count', 1)\n *      );\n *      incCount({});           //=> { count: 1 }\n *      incCount({ count: 1 }); //=> { count: 2 }\n */\nvar ifElse = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function ifElse(condition, onTrue, onFalse) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {\n    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (ifElse);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/ifElse.js?");

/***/ }),

/***/ "./node_modules/ramda/es/inc.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/inc.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add */ \"./node_modules/ramda/es/add.js\");\n\n\n/**\n * Increments its argument.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Math\n * @sig Number -> Number\n * @param {Number} n\n * @return {Number} n + 1\n * @see R.dec\n * @example\n *\n *      R.inc(42); //=> 43\n */\nvar inc = /*#__PURE__*/Object(_add__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1);\n/* harmony default export */ __webpack_exports__[\"default\"] = (inc);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/inc.js?");

/***/ }),

/***/ "./node_modules/ramda/es/index.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/index.js ***!
  \****************************************/
/*! exports provided: F, T, __, add, addIndex, adjust, all, allPass, always, and, any, anyPass, ap, aperture, append, apply, applySpec, applyTo, ascend, assoc, assocPath, binary, bind, both, call, chain, clamp, clone, comparator, complement, compose, composeK, composeP, concat, cond, construct, constructN, contains, converge, countBy, curry, curryN, dec, defaultTo, descend, difference, differenceWith, dissoc, dissocPath, divide, drop, dropLast, dropLastWhile, dropRepeats, dropRepeatsWith, dropWhile, either, empty, endsWith, eqBy, eqProps, equals, evolve, filter, find, findIndex, findLast, findLastIndex, flatten, flip, forEach, forEachObjIndexed, fromPairs, groupBy, groupWith, gt, gte, has, hasIn, head, identical, identity, ifElse, inc, indexBy, indexOf, init, innerJoin, insert, insertAll, intersection, intersperse, into, invert, invertObj, invoker, is, isEmpty, isNil, join, juxt, keys, keysIn, last, lastIndexOf, length, lens, lensIndex, lensPath, lensProp, lift, liftN, lt, lte, map, mapAccum, mapAccumRight, mapObjIndexed, match, mathMod, max, maxBy, mean, median, memoize, memoizeWith, merge, mergeAll, mergeDeepLeft, mergeDeepRight, mergeDeepWith, mergeDeepWithKey, mergeWith, mergeWithKey, min, minBy, modulo, multiply, nAry, negate, none, not, nth, nthArg, o, objOf, of, omit, once, or, over, pair, partial, partialRight, partition, path, pathEq, pathOr, pathSatisfies, pick, pickAll, pickBy, pipe, pipeK, pipeP, pluck, prepend, product, project, prop, propEq, propIs, propOr, propSatisfies, props, range, reduce, reduceBy, reduceRight, reduceWhile, reduced, reject, remove, repeat, replace, reverse, scan, sequence, set, slice, sort, sortBy, sortWith, split, splitAt, splitEvery, splitWhen, startsWith, subtract, sum, symmetricDifference, symmetricDifferenceWith, tail, take, takeLast, takeLastWhile, takeWhile, tap, test, times, toLower, toPairs, toPairsIn, toString, toUpper, transduce, transpose, traverse, trim, tryCatch, type, unapply, unary, uncurryN, unfold, union, unionWith, uniq, uniqBy, uniqWith, unless, unnest, until, update, useWith, values, valuesIn, view, when, where, whereEq, without, xprod, zip, zipObj, zipWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _F__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./F */ \"./node_modules/ramda/es/F.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"F\", function() { return _F__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _T__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./T */ \"./node_modules/ramda/es/T.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return _T__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./__ */ \"./node_modules/ramda/es/__.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__\", function() { return ___WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add */ \"./node_modules/ramda/es/add.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return _add__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _addIndex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addIndex */ \"./node_modules/ramda/es/addIndex.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"addIndex\", function() { return _addIndex__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _adjust__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./adjust */ \"./node_modules/ramda/es/adjust.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"adjust\", function() { return _adjust__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _all__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./all */ \"./node_modules/ramda/es/all.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"all\", function() { return _all__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _allPass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./allPass */ \"./node_modules/ramda/es/allPass.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allPass\", function() { return _allPass__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _always__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./always */ \"./node_modules/ramda/es/always.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"always\", function() { return _always__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _and__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./and */ \"./node_modules/ramda/es/and.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"and\", function() { return _and__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _any__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./any */ \"./node_modules/ramda/es/any.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"any\", function() { return _any__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _anyPass__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./anyPass */ \"./node_modules/ramda/es/anyPass.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"anyPass\", function() { return _anyPass__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _ap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ap */ \"./node_modules/ramda/es/ap.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ap\", function() { return _ap__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _aperture__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./aperture */ \"./node_modules/ramda/es/aperture.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"aperture\", function() { return _aperture__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n/* harmony import */ var _append__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./append */ \"./node_modules/ramda/es/append.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"append\", function() { return _append__WEBPACK_IMPORTED_MODULE_14__[\"default\"]; });\n\n/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./apply */ \"./node_modules/ramda/es/apply.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"apply\", function() { return _apply__WEBPACK_IMPORTED_MODULE_15__[\"default\"]; });\n\n/* harmony import */ var _applySpec__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./applySpec */ \"./node_modules/ramda/es/applySpec.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"applySpec\", function() { return _applySpec__WEBPACK_IMPORTED_MODULE_16__[\"default\"]; });\n\n/* harmony import */ var _applyTo__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./applyTo */ \"./node_modules/ramda/es/applyTo.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"applyTo\", function() { return _applyTo__WEBPACK_IMPORTED_MODULE_17__[\"default\"]; });\n\n/* harmony import */ var _ascend__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ascend */ \"./node_modules/ramda/es/ascend.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ascend\", function() { return _ascend__WEBPACK_IMPORTED_MODULE_18__[\"default\"]; });\n\n/* harmony import */ var _assoc__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./assoc */ \"./node_modules/ramda/es/assoc.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"assoc\", function() { return _assoc__WEBPACK_IMPORTED_MODULE_19__[\"default\"]; });\n\n/* harmony import */ var _assocPath__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./assocPath */ \"./node_modules/ramda/es/assocPath.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"assocPath\", function() { return _assocPath__WEBPACK_IMPORTED_MODULE_20__[\"default\"]; });\n\n/* harmony import */ var _binary__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./binary */ \"./node_modules/ramda/es/binary.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"binary\", function() { return _binary__WEBPACK_IMPORTED_MODULE_21__[\"default\"]; });\n\n/* harmony import */ var _bind__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./bind */ \"./node_modules/ramda/es/bind.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"bind\", function() { return _bind__WEBPACK_IMPORTED_MODULE_22__[\"default\"]; });\n\n/* harmony import */ var _both__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./both */ \"./node_modules/ramda/es/both.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"both\", function() { return _both__WEBPACK_IMPORTED_MODULE_23__[\"default\"]; });\n\n/* harmony import */ var _call__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./call */ \"./node_modules/ramda/es/call.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"call\", function() { return _call__WEBPACK_IMPORTED_MODULE_24__[\"default\"]; });\n\n/* harmony import */ var _chain__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./chain */ \"./node_modules/ramda/es/chain.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"chain\", function() { return _chain__WEBPACK_IMPORTED_MODULE_25__[\"default\"]; });\n\n/* harmony import */ var _clamp__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./clamp */ \"./node_modules/ramda/es/clamp.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"clamp\", function() { return _clamp__WEBPACK_IMPORTED_MODULE_26__[\"default\"]; });\n\n/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./clone */ \"./node_modules/ramda/es/clone.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"clone\", function() { return _clone__WEBPACK_IMPORTED_MODULE_27__[\"default\"]; });\n\n/* harmony import */ var _comparator__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./comparator */ \"./node_modules/ramda/es/comparator.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"comparator\", function() { return _comparator__WEBPACK_IMPORTED_MODULE_28__[\"default\"]; });\n\n/* harmony import */ var _complement__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./complement */ \"./node_modules/ramda/es/complement.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"complement\", function() { return _complement__WEBPACK_IMPORTED_MODULE_29__[\"default\"]; });\n\n/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./compose */ \"./node_modules/ramda/es/compose.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"compose\", function() { return _compose__WEBPACK_IMPORTED_MODULE_30__[\"default\"]; });\n\n/* harmony import */ var _composeK__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./composeK */ \"./node_modules/ramda/es/composeK.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"composeK\", function() { return _composeK__WEBPACK_IMPORTED_MODULE_31__[\"default\"]; });\n\n/* harmony import */ var _composeP__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./composeP */ \"./node_modules/ramda/es/composeP.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"composeP\", function() { return _composeP__WEBPACK_IMPORTED_MODULE_32__[\"default\"]; });\n\n/* harmony import */ var _concat__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./concat */ \"./node_modules/ramda/es/concat.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"concat\", function() { return _concat__WEBPACK_IMPORTED_MODULE_33__[\"default\"]; });\n\n/* harmony import */ var _cond__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./cond */ \"./node_modules/ramda/es/cond.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cond\", function() { return _cond__WEBPACK_IMPORTED_MODULE_34__[\"default\"]; });\n\n/* harmony import */ var _construct__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./construct */ \"./node_modules/ramda/es/construct.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"construct\", function() { return _construct__WEBPACK_IMPORTED_MODULE_35__[\"default\"]; });\n\n/* harmony import */ var _constructN__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./constructN */ \"./node_modules/ramda/es/constructN.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"constructN\", function() { return _constructN__WEBPACK_IMPORTED_MODULE_36__[\"default\"]; });\n\n/* harmony import */ var _contains__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./contains */ \"./node_modules/ramda/es/contains.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"contains\", function() { return _contains__WEBPACK_IMPORTED_MODULE_37__[\"default\"]; });\n\n/* harmony import */ var _converge__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./converge */ \"./node_modules/ramda/es/converge.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"converge\", function() { return _converge__WEBPACK_IMPORTED_MODULE_38__[\"default\"]; });\n\n/* harmony import */ var _countBy__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./countBy */ \"./node_modules/ramda/es/countBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"countBy\", function() { return _countBy__WEBPACK_IMPORTED_MODULE_39__[\"default\"]; });\n\n/* harmony import */ var _curry__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./curry */ \"./node_modules/ramda/es/curry.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"curry\", function() { return _curry__WEBPACK_IMPORTED_MODULE_40__[\"default\"]; });\n\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"curryN\", function() { return _curryN__WEBPACK_IMPORTED_MODULE_41__[\"default\"]; });\n\n/* harmony import */ var _dec__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./dec */ \"./node_modules/ramda/es/dec.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dec\", function() { return _dec__WEBPACK_IMPORTED_MODULE_42__[\"default\"]; });\n\n/* harmony import */ var _defaultTo__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./defaultTo */ \"./node_modules/ramda/es/defaultTo.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"defaultTo\", function() { return _defaultTo__WEBPACK_IMPORTED_MODULE_43__[\"default\"]; });\n\n/* harmony import */ var _descend__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./descend */ \"./node_modules/ramda/es/descend.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"descend\", function() { return _descend__WEBPACK_IMPORTED_MODULE_44__[\"default\"]; });\n\n/* harmony import */ var _difference__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./difference */ \"./node_modules/ramda/es/difference.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"difference\", function() { return _difference__WEBPACK_IMPORTED_MODULE_45__[\"default\"]; });\n\n/* harmony import */ var _differenceWith__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./differenceWith */ \"./node_modules/ramda/es/differenceWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"differenceWith\", function() { return _differenceWith__WEBPACK_IMPORTED_MODULE_46__[\"default\"]; });\n\n/* harmony import */ var _dissoc__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./dissoc */ \"./node_modules/ramda/es/dissoc.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dissoc\", function() { return _dissoc__WEBPACK_IMPORTED_MODULE_47__[\"default\"]; });\n\n/* harmony import */ var _dissocPath__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./dissocPath */ \"./node_modules/ramda/es/dissocPath.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dissocPath\", function() { return _dissocPath__WEBPACK_IMPORTED_MODULE_48__[\"default\"]; });\n\n/* harmony import */ var _divide__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./divide */ \"./node_modules/ramda/es/divide.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"divide\", function() { return _divide__WEBPACK_IMPORTED_MODULE_49__[\"default\"]; });\n\n/* harmony import */ var _drop__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./drop */ \"./node_modules/ramda/es/drop.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"drop\", function() { return _drop__WEBPACK_IMPORTED_MODULE_50__[\"default\"]; });\n\n/* harmony import */ var _dropLast__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./dropLast */ \"./node_modules/ramda/es/dropLast.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dropLast\", function() { return _dropLast__WEBPACK_IMPORTED_MODULE_51__[\"default\"]; });\n\n/* harmony import */ var _dropLastWhile__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./dropLastWhile */ \"./node_modules/ramda/es/dropLastWhile.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dropLastWhile\", function() { return _dropLastWhile__WEBPACK_IMPORTED_MODULE_52__[\"default\"]; });\n\n/* harmony import */ var _dropRepeats__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./dropRepeats */ \"./node_modules/ramda/es/dropRepeats.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dropRepeats\", function() { return _dropRepeats__WEBPACK_IMPORTED_MODULE_53__[\"default\"]; });\n\n/* harmony import */ var _dropRepeatsWith__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./dropRepeatsWith */ \"./node_modules/ramda/es/dropRepeatsWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dropRepeatsWith\", function() { return _dropRepeatsWith__WEBPACK_IMPORTED_MODULE_54__[\"default\"]; });\n\n/* harmony import */ var _dropWhile__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./dropWhile */ \"./node_modules/ramda/es/dropWhile.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dropWhile\", function() { return _dropWhile__WEBPACK_IMPORTED_MODULE_55__[\"default\"]; });\n\n/* harmony import */ var _either__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./either */ \"./node_modules/ramda/es/either.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"either\", function() { return _either__WEBPACK_IMPORTED_MODULE_56__[\"default\"]; });\n\n/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./empty */ \"./node_modules/ramda/es/empty.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"empty\", function() { return _empty__WEBPACK_IMPORTED_MODULE_57__[\"default\"]; });\n\n/* harmony import */ var _endsWith__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./endsWith */ \"./node_modules/ramda/es/endsWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"endsWith\", function() { return _endsWith__WEBPACK_IMPORTED_MODULE_58__[\"default\"]; });\n\n/* harmony import */ var _eqBy__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./eqBy */ \"./node_modules/ramda/es/eqBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"eqBy\", function() { return _eqBy__WEBPACK_IMPORTED_MODULE_59__[\"default\"]; });\n\n/* harmony import */ var _eqProps__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./eqProps */ \"./node_modules/ramda/es/eqProps.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"eqProps\", function() { return _eqProps__WEBPACK_IMPORTED_MODULE_60__[\"default\"]; });\n\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"equals\", function() { return _equals__WEBPACK_IMPORTED_MODULE_61__[\"default\"]; });\n\n/* harmony import */ var _evolve__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./evolve */ \"./node_modules/ramda/es/evolve.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"evolve\", function() { return _evolve__WEBPACK_IMPORTED_MODULE_62__[\"default\"]; });\n\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./filter */ \"./node_modules/ramda/es/filter.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"filter\", function() { return _filter__WEBPACK_IMPORTED_MODULE_63__[\"default\"]; });\n\n/* harmony import */ var _find__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./find */ \"./node_modules/ramda/es/find.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"find\", function() { return _find__WEBPACK_IMPORTED_MODULE_64__[\"default\"]; });\n\n/* harmony import */ var _findIndex__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./findIndex */ \"./node_modules/ramda/es/findIndex.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"findIndex\", function() { return _findIndex__WEBPACK_IMPORTED_MODULE_65__[\"default\"]; });\n\n/* harmony import */ var _findLast__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./findLast */ \"./node_modules/ramda/es/findLast.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"findLast\", function() { return _findLast__WEBPACK_IMPORTED_MODULE_66__[\"default\"]; });\n\n/* harmony import */ var _findLastIndex__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./findLastIndex */ \"./node_modules/ramda/es/findLastIndex.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"findLastIndex\", function() { return _findLastIndex__WEBPACK_IMPORTED_MODULE_67__[\"default\"]; });\n\n/* harmony import */ var _flatten__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./flatten */ \"./node_modules/ramda/es/flatten.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"flatten\", function() { return _flatten__WEBPACK_IMPORTED_MODULE_68__[\"default\"]; });\n\n/* harmony import */ var _flip__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./flip */ \"./node_modules/ramda/es/flip.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"flip\", function() { return _flip__WEBPACK_IMPORTED_MODULE_69__[\"default\"]; });\n\n/* harmony import */ var _forEach__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./forEach */ \"./node_modules/ramda/es/forEach.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"forEach\", function() { return _forEach__WEBPACK_IMPORTED_MODULE_70__[\"default\"]; });\n\n/* harmony import */ var _forEachObjIndexed__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./forEachObjIndexed */ \"./node_modules/ramda/es/forEachObjIndexed.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"forEachObjIndexed\", function() { return _forEachObjIndexed__WEBPACK_IMPORTED_MODULE_71__[\"default\"]; });\n\n/* harmony import */ var _fromPairs__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./fromPairs */ \"./node_modules/ramda/es/fromPairs.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fromPairs\", function() { return _fromPairs__WEBPACK_IMPORTED_MODULE_72__[\"default\"]; });\n\n/* harmony import */ var _groupBy__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./groupBy */ \"./node_modules/ramda/es/groupBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"groupBy\", function() { return _groupBy__WEBPACK_IMPORTED_MODULE_73__[\"default\"]; });\n\n/* harmony import */ var _groupWith__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./groupWith */ \"./node_modules/ramda/es/groupWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"groupWith\", function() { return _groupWith__WEBPACK_IMPORTED_MODULE_74__[\"default\"]; });\n\n/* harmony import */ var _gt__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./gt */ \"./node_modules/ramda/es/gt.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"gt\", function() { return _gt__WEBPACK_IMPORTED_MODULE_75__[\"default\"]; });\n\n/* harmony import */ var _gte__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./gte */ \"./node_modules/ramda/es/gte.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"gte\", function() { return _gte__WEBPACK_IMPORTED_MODULE_76__[\"default\"]; });\n\n/* harmony import */ var _has__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./has */ \"./node_modules/ramda/es/has.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"has\", function() { return _has__WEBPACK_IMPORTED_MODULE_77__[\"default\"]; });\n\n/* harmony import */ var _hasIn__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./hasIn */ \"./node_modules/ramda/es/hasIn.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hasIn\", function() { return _hasIn__WEBPACK_IMPORTED_MODULE_78__[\"default\"]; });\n\n/* harmony import */ var _head__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./head */ \"./node_modules/ramda/es/head.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"head\", function() { return _head__WEBPACK_IMPORTED_MODULE_79__[\"default\"]; });\n\n/* harmony import */ var _identical__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./identical */ \"./node_modules/ramda/es/identical.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"identical\", function() { return _identical__WEBPACK_IMPORTED_MODULE_80__[\"default\"]; });\n\n/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./identity */ \"./node_modules/ramda/es/identity.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"identity\", function() { return _identity__WEBPACK_IMPORTED_MODULE_81__[\"default\"]; });\n\n/* harmony import */ var _ifElse__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./ifElse */ \"./node_modules/ramda/es/ifElse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ifElse\", function() { return _ifElse__WEBPACK_IMPORTED_MODULE_82__[\"default\"]; });\n\n/* harmony import */ var _inc__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./inc */ \"./node_modules/ramda/es/inc.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"inc\", function() { return _inc__WEBPACK_IMPORTED_MODULE_83__[\"default\"]; });\n\n/* harmony import */ var _indexBy__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./indexBy */ \"./node_modules/ramda/es/indexBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"indexBy\", function() { return _indexBy__WEBPACK_IMPORTED_MODULE_84__[\"default\"]; });\n\n/* harmony import */ var _indexOf__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./indexOf */ \"./node_modules/ramda/es/indexOf.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"indexOf\", function() { return _indexOf__WEBPACK_IMPORTED_MODULE_85__[\"default\"]; });\n\n/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./init */ \"./node_modules/ramda/es/init.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return _init__WEBPACK_IMPORTED_MODULE_86__[\"default\"]; });\n\n/* harmony import */ var _innerJoin__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./innerJoin */ \"./node_modules/ramda/es/innerJoin.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"innerJoin\", function() { return _innerJoin__WEBPACK_IMPORTED_MODULE_87__[\"default\"]; });\n\n/* harmony import */ var _insert__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./insert */ \"./node_modules/ramda/es/insert.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"insert\", function() { return _insert__WEBPACK_IMPORTED_MODULE_88__[\"default\"]; });\n\n/* harmony import */ var _insertAll__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./insertAll */ \"./node_modules/ramda/es/insertAll.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"insertAll\", function() { return _insertAll__WEBPACK_IMPORTED_MODULE_89__[\"default\"]; });\n\n/* harmony import */ var _intersection__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./intersection */ \"./node_modules/ramda/es/intersection.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"intersection\", function() { return _intersection__WEBPACK_IMPORTED_MODULE_90__[\"default\"]; });\n\n/* harmony import */ var _intersperse__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./intersperse */ \"./node_modules/ramda/es/intersperse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"intersperse\", function() { return _intersperse__WEBPACK_IMPORTED_MODULE_91__[\"default\"]; });\n\n/* harmony import */ var _into__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./into */ \"./node_modules/ramda/es/into.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"into\", function() { return _into__WEBPACK_IMPORTED_MODULE_92__[\"default\"]; });\n\n/* harmony import */ var _invert__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./invert */ \"./node_modules/ramda/es/invert.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"invert\", function() { return _invert__WEBPACK_IMPORTED_MODULE_93__[\"default\"]; });\n\n/* harmony import */ var _invertObj__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./invertObj */ \"./node_modules/ramda/es/invertObj.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"invertObj\", function() { return _invertObj__WEBPACK_IMPORTED_MODULE_94__[\"default\"]; });\n\n/* harmony import */ var _invoker__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./invoker */ \"./node_modules/ramda/es/invoker.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"invoker\", function() { return _invoker__WEBPACK_IMPORTED_MODULE_95__[\"default\"]; });\n\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./is */ \"./node_modules/ramda/es/is.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"is\", function() { return _is__WEBPACK_IMPORTED_MODULE_96__[\"default\"]; });\n\n/* harmony import */ var _isEmpty__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./isEmpty */ \"./node_modules/ramda/es/isEmpty.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isEmpty\", function() { return _isEmpty__WEBPACK_IMPORTED_MODULE_97__[\"default\"]; });\n\n/* harmony import */ var _isNil__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./isNil */ \"./node_modules/ramda/es/isNil.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isNil\", function() { return _isNil__WEBPACK_IMPORTED_MODULE_98__[\"default\"]; });\n\n/* harmony import */ var _join__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./join */ \"./node_modules/ramda/es/join.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"join\", function() { return _join__WEBPACK_IMPORTED_MODULE_99__[\"default\"]; });\n\n/* harmony import */ var _juxt__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./juxt */ \"./node_modules/ramda/es/juxt.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"juxt\", function() { return _juxt__WEBPACK_IMPORTED_MODULE_100__[\"default\"]; });\n\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"keys\", function() { return _keys__WEBPACK_IMPORTED_MODULE_101__[\"default\"]; });\n\n/* harmony import */ var _keysIn__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./keysIn */ \"./node_modules/ramda/es/keysIn.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"keysIn\", function() { return _keysIn__WEBPACK_IMPORTED_MODULE_102__[\"default\"]; });\n\n/* harmony import */ var _last__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./last */ \"./node_modules/ramda/es/last.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"last\", function() { return _last__WEBPACK_IMPORTED_MODULE_103__[\"default\"]; });\n\n/* harmony import */ var _lastIndexOf__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./lastIndexOf */ \"./node_modules/ramda/es/lastIndexOf.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lastIndexOf\", function() { return _lastIndexOf__WEBPACK_IMPORTED_MODULE_104__[\"default\"]; });\n\n/* harmony import */ var _length__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./length */ \"./node_modules/ramda/es/length.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"length\", function() { return _length__WEBPACK_IMPORTED_MODULE_105__[\"default\"]; });\n\n/* harmony import */ var _lens__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./lens */ \"./node_modules/ramda/es/lens.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lens\", function() { return _lens__WEBPACK_IMPORTED_MODULE_106__[\"default\"]; });\n\n/* harmony import */ var _lensIndex__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./lensIndex */ \"./node_modules/ramda/es/lensIndex.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lensIndex\", function() { return _lensIndex__WEBPACK_IMPORTED_MODULE_107__[\"default\"]; });\n\n/* harmony import */ var _lensPath__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./lensPath */ \"./node_modules/ramda/es/lensPath.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lensPath\", function() { return _lensPath__WEBPACK_IMPORTED_MODULE_108__[\"default\"]; });\n\n/* harmony import */ var _lensProp__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./lensProp */ \"./node_modules/ramda/es/lensProp.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lensProp\", function() { return _lensProp__WEBPACK_IMPORTED_MODULE_109__[\"default\"]; });\n\n/* harmony import */ var _lift__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./lift */ \"./node_modules/ramda/es/lift.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lift\", function() { return _lift__WEBPACK_IMPORTED_MODULE_110__[\"default\"]; });\n\n/* harmony import */ var _liftN__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./liftN */ \"./node_modules/ramda/es/liftN.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"liftN\", function() { return _liftN__WEBPACK_IMPORTED_MODULE_111__[\"default\"]; });\n\n/* harmony import */ var _lt__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./lt */ \"./node_modules/ramda/es/lt.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lt\", function() { return _lt__WEBPACK_IMPORTED_MODULE_112__[\"default\"]; });\n\n/* harmony import */ var _lte__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./lte */ \"./node_modules/ramda/es/lte.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"lte\", function() { return _lte__WEBPACK_IMPORTED_MODULE_113__[\"default\"]; });\n\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"map\", function() { return _map__WEBPACK_IMPORTED_MODULE_114__[\"default\"]; });\n\n/* harmony import */ var _mapAccum__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./mapAccum */ \"./node_modules/ramda/es/mapAccum.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mapAccum\", function() { return _mapAccum__WEBPACK_IMPORTED_MODULE_115__[\"default\"]; });\n\n/* harmony import */ var _mapAccumRight__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./mapAccumRight */ \"./node_modules/ramda/es/mapAccumRight.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mapAccumRight\", function() { return _mapAccumRight__WEBPACK_IMPORTED_MODULE_116__[\"default\"]; });\n\n/* harmony import */ var _mapObjIndexed__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./mapObjIndexed */ \"./node_modules/ramda/es/mapObjIndexed.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mapObjIndexed\", function() { return _mapObjIndexed__WEBPACK_IMPORTED_MODULE_117__[\"default\"]; });\n\n/* harmony import */ var _match__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./match */ \"./node_modules/ramda/es/match.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"match\", function() { return _match__WEBPACK_IMPORTED_MODULE_118__[\"default\"]; });\n\n/* harmony import */ var _mathMod__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./mathMod */ \"./node_modules/ramda/es/mathMod.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mathMod\", function() { return _mathMod__WEBPACK_IMPORTED_MODULE_119__[\"default\"]; });\n\n/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./max */ \"./node_modules/ramda/es/max.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"max\", function() { return _max__WEBPACK_IMPORTED_MODULE_120__[\"default\"]; });\n\n/* harmony import */ var _maxBy__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./maxBy */ \"./node_modules/ramda/es/maxBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"maxBy\", function() { return _maxBy__WEBPACK_IMPORTED_MODULE_121__[\"default\"]; });\n\n/* harmony import */ var _mean__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./mean */ \"./node_modules/ramda/es/mean.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mean\", function() { return _mean__WEBPACK_IMPORTED_MODULE_122__[\"default\"]; });\n\n/* harmony import */ var _median__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./median */ \"./node_modules/ramda/es/median.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"median\", function() { return _median__WEBPACK_IMPORTED_MODULE_123__[\"default\"]; });\n\n/* harmony import */ var _memoize__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./memoize */ \"./node_modules/ramda/es/memoize.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"memoize\", function() { return _memoize__WEBPACK_IMPORTED_MODULE_124__[\"default\"]; });\n\n/* harmony import */ var _memoizeWith__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./memoizeWith */ \"./node_modules/ramda/es/memoizeWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"memoizeWith\", function() { return _memoizeWith__WEBPACK_IMPORTED_MODULE_125__[\"default\"]; });\n\n/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./merge */ \"./node_modules/ramda/es/merge.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"merge\", function() { return _merge__WEBPACK_IMPORTED_MODULE_126__[\"default\"]; });\n\n/* harmony import */ var _mergeAll__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./mergeAll */ \"./node_modules/ramda/es/mergeAll.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mergeAll\", function() { return _mergeAll__WEBPACK_IMPORTED_MODULE_127__[\"default\"]; });\n\n/* harmony import */ var _mergeDeepLeft__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./mergeDeepLeft */ \"./node_modules/ramda/es/mergeDeepLeft.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mergeDeepLeft\", function() { return _mergeDeepLeft__WEBPACK_IMPORTED_MODULE_128__[\"default\"]; });\n\n/* harmony import */ var _mergeDeepRight__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./mergeDeepRight */ \"./node_modules/ramda/es/mergeDeepRight.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mergeDeepRight\", function() { return _mergeDeepRight__WEBPACK_IMPORTED_MODULE_129__[\"default\"]; });\n\n/* harmony import */ var _mergeDeepWith__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./mergeDeepWith */ \"./node_modules/ramda/es/mergeDeepWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mergeDeepWith\", function() { return _mergeDeepWith__WEBPACK_IMPORTED_MODULE_130__[\"default\"]; });\n\n/* harmony import */ var _mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./mergeDeepWithKey */ \"./node_modules/ramda/es/mergeDeepWithKey.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mergeDeepWithKey\", function() { return _mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_131__[\"default\"]; });\n\n/* harmony import */ var _mergeWith__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./mergeWith */ \"./node_modules/ramda/es/mergeWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mergeWith\", function() { return _mergeWith__WEBPACK_IMPORTED_MODULE_132__[\"default\"]; });\n\n/* harmony import */ var _mergeWithKey__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./mergeWithKey */ \"./node_modules/ramda/es/mergeWithKey.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mergeWithKey\", function() { return _mergeWithKey__WEBPACK_IMPORTED_MODULE_133__[\"default\"]; });\n\n/* harmony import */ var _min__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./min */ \"./node_modules/ramda/es/min.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"min\", function() { return _min__WEBPACK_IMPORTED_MODULE_134__[\"default\"]; });\n\n/* harmony import */ var _minBy__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./minBy */ \"./node_modules/ramda/es/minBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"minBy\", function() { return _minBy__WEBPACK_IMPORTED_MODULE_135__[\"default\"]; });\n\n/* harmony import */ var _modulo__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./modulo */ \"./node_modules/ramda/es/modulo.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"modulo\", function() { return _modulo__WEBPACK_IMPORTED_MODULE_136__[\"default\"]; });\n\n/* harmony import */ var _multiply__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./multiply */ \"./node_modules/ramda/es/multiply.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"multiply\", function() { return _multiply__WEBPACK_IMPORTED_MODULE_137__[\"default\"]; });\n\n/* harmony import */ var _nAry__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./nAry */ \"./node_modules/ramda/es/nAry.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"nAry\", function() { return _nAry__WEBPACK_IMPORTED_MODULE_138__[\"default\"]; });\n\n/* harmony import */ var _negate__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./negate */ \"./node_modules/ramda/es/negate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"negate\", function() { return _negate__WEBPACK_IMPORTED_MODULE_139__[\"default\"]; });\n\n/* harmony import */ var _none__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./none */ \"./node_modules/ramda/es/none.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"none\", function() { return _none__WEBPACK_IMPORTED_MODULE_140__[\"default\"]; });\n\n/* harmony import */ var _not__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./not */ \"./node_modules/ramda/es/not.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"not\", function() { return _not__WEBPACK_IMPORTED_MODULE_141__[\"default\"]; });\n\n/* harmony import */ var _nth__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./nth */ \"./node_modules/ramda/es/nth.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"nth\", function() { return _nth__WEBPACK_IMPORTED_MODULE_142__[\"default\"]; });\n\n/* harmony import */ var _nthArg__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./nthArg */ \"./node_modules/ramda/es/nthArg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"nthArg\", function() { return _nthArg__WEBPACK_IMPORTED_MODULE_143__[\"default\"]; });\n\n/* harmony import */ var _o__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./o */ \"./node_modules/ramda/es/o.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"o\", function() { return _o__WEBPACK_IMPORTED_MODULE_144__[\"default\"]; });\n\n/* harmony import */ var _objOf__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(/*! ./objOf */ \"./node_modules/ramda/es/objOf.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"objOf\", function() { return _objOf__WEBPACK_IMPORTED_MODULE_145__[\"default\"]; });\n\n/* harmony import */ var _of__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(/*! ./of */ \"./node_modules/ramda/es/of.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"of\", function() { return _of__WEBPACK_IMPORTED_MODULE_146__[\"default\"]; });\n\n/* harmony import */ var _omit__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(/*! ./omit */ \"./node_modules/ramda/es/omit.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"omit\", function() { return _omit__WEBPACK_IMPORTED_MODULE_147__[\"default\"]; });\n\n/* harmony import */ var _once__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(/*! ./once */ \"./node_modules/ramda/es/once.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"once\", function() { return _once__WEBPACK_IMPORTED_MODULE_148__[\"default\"]; });\n\n/* harmony import */ var _or__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(/*! ./or */ \"./node_modules/ramda/es/or.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"or\", function() { return _or__WEBPACK_IMPORTED_MODULE_149__[\"default\"]; });\n\n/* harmony import */ var _over__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(/*! ./over */ \"./node_modules/ramda/es/over.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"over\", function() { return _over__WEBPACK_IMPORTED_MODULE_150__[\"default\"]; });\n\n/* harmony import */ var _pair__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(/*! ./pair */ \"./node_modules/ramda/es/pair.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pair\", function() { return _pair__WEBPACK_IMPORTED_MODULE_151__[\"default\"]; });\n\n/* harmony import */ var _partial__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(/*! ./partial */ \"./node_modules/ramda/es/partial.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"partial\", function() { return _partial__WEBPACK_IMPORTED_MODULE_152__[\"default\"]; });\n\n/* harmony import */ var _partialRight__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(/*! ./partialRight */ \"./node_modules/ramda/es/partialRight.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"partialRight\", function() { return _partialRight__WEBPACK_IMPORTED_MODULE_153__[\"default\"]; });\n\n/* harmony import */ var _partition__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(/*! ./partition */ \"./node_modules/ramda/es/partition.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"partition\", function() { return _partition__WEBPACK_IMPORTED_MODULE_154__[\"default\"]; });\n\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(/*! ./path */ \"./node_modules/ramda/es/path.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"path\", function() { return _path__WEBPACK_IMPORTED_MODULE_155__[\"default\"]; });\n\n/* harmony import */ var _pathEq__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(/*! ./pathEq */ \"./node_modules/ramda/es/pathEq.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pathEq\", function() { return _pathEq__WEBPACK_IMPORTED_MODULE_156__[\"default\"]; });\n\n/* harmony import */ var _pathOr__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(/*! ./pathOr */ \"./node_modules/ramda/es/pathOr.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pathOr\", function() { return _pathOr__WEBPACK_IMPORTED_MODULE_157__[\"default\"]; });\n\n/* harmony import */ var _pathSatisfies__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(/*! ./pathSatisfies */ \"./node_modules/ramda/es/pathSatisfies.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pathSatisfies\", function() { return _pathSatisfies__WEBPACK_IMPORTED_MODULE_158__[\"default\"]; });\n\n/* harmony import */ var _pick__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(/*! ./pick */ \"./node_modules/ramda/es/pick.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pick\", function() { return _pick__WEBPACK_IMPORTED_MODULE_159__[\"default\"]; });\n\n/* harmony import */ var _pickAll__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(/*! ./pickAll */ \"./node_modules/ramda/es/pickAll.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pickAll\", function() { return _pickAll__WEBPACK_IMPORTED_MODULE_160__[\"default\"]; });\n\n/* harmony import */ var _pickBy__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(/*! ./pickBy */ \"./node_modules/ramda/es/pickBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pickBy\", function() { return _pickBy__WEBPACK_IMPORTED_MODULE_161__[\"default\"]; });\n\n/* harmony import */ var _pipe__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(/*! ./pipe */ \"./node_modules/ramda/es/pipe.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pipe\", function() { return _pipe__WEBPACK_IMPORTED_MODULE_162__[\"default\"]; });\n\n/* harmony import */ var _pipeK__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(/*! ./pipeK */ \"./node_modules/ramda/es/pipeK.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pipeK\", function() { return _pipeK__WEBPACK_IMPORTED_MODULE_163__[\"default\"]; });\n\n/* harmony import */ var _pipeP__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(/*! ./pipeP */ \"./node_modules/ramda/es/pipeP.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pipeP\", function() { return _pipeP__WEBPACK_IMPORTED_MODULE_164__[\"default\"]; });\n\n/* harmony import */ var _pluck__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(/*! ./pluck */ \"./node_modules/ramda/es/pluck.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pluck\", function() { return _pluck__WEBPACK_IMPORTED_MODULE_165__[\"default\"]; });\n\n/* harmony import */ var _prepend__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(/*! ./prepend */ \"./node_modules/ramda/es/prepend.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"prepend\", function() { return _prepend__WEBPACK_IMPORTED_MODULE_166__[\"default\"]; });\n\n/* harmony import */ var _product__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(/*! ./product */ \"./node_modules/ramda/es/product.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"product\", function() { return _product__WEBPACK_IMPORTED_MODULE_167__[\"default\"]; });\n\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(/*! ./project */ \"./node_modules/ramda/es/project.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"project\", function() { return _project__WEBPACK_IMPORTED_MODULE_168__[\"default\"]; });\n\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(/*! ./prop */ \"./node_modules/ramda/es/prop.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"prop\", function() { return _prop__WEBPACK_IMPORTED_MODULE_169__[\"default\"]; });\n\n/* harmony import */ var _propEq__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(/*! ./propEq */ \"./node_modules/ramda/es/propEq.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"propEq\", function() { return _propEq__WEBPACK_IMPORTED_MODULE_170__[\"default\"]; });\n\n/* harmony import */ var _propIs__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(/*! ./propIs */ \"./node_modules/ramda/es/propIs.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"propIs\", function() { return _propIs__WEBPACK_IMPORTED_MODULE_171__[\"default\"]; });\n\n/* harmony import */ var _propOr__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(/*! ./propOr */ \"./node_modules/ramda/es/propOr.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"propOr\", function() { return _propOr__WEBPACK_IMPORTED_MODULE_172__[\"default\"]; });\n\n/* harmony import */ var _propSatisfies__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(/*! ./propSatisfies */ \"./node_modules/ramda/es/propSatisfies.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"propSatisfies\", function() { return _propSatisfies__WEBPACK_IMPORTED_MODULE_173__[\"default\"]; });\n\n/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(/*! ./props */ \"./node_modules/ramda/es/props.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"props\", function() { return _props__WEBPACK_IMPORTED_MODULE_174__[\"default\"]; });\n\n/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(/*! ./range */ \"./node_modules/ramda/es/range.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"range\", function() { return _range__WEBPACK_IMPORTED_MODULE_175__[\"default\"]; });\n\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reduce\", function() { return _reduce__WEBPACK_IMPORTED_MODULE_176__[\"default\"]; });\n\n/* harmony import */ var _reduceBy__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(/*! ./reduceBy */ \"./node_modules/ramda/es/reduceBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reduceBy\", function() { return _reduceBy__WEBPACK_IMPORTED_MODULE_177__[\"default\"]; });\n\n/* harmony import */ var _reduceRight__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__(/*! ./reduceRight */ \"./node_modules/ramda/es/reduceRight.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reduceRight\", function() { return _reduceRight__WEBPACK_IMPORTED_MODULE_178__[\"default\"]; });\n\n/* harmony import */ var _reduceWhile__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__(/*! ./reduceWhile */ \"./node_modules/ramda/es/reduceWhile.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reduceWhile\", function() { return _reduceWhile__WEBPACK_IMPORTED_MODULE_179__[\"default\"]; });\n\n/* harmony import */ var _reduced__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__(/*! ./reduced */ \"./node_modules/ramda/es/reduced.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reduced\", function() { return _reduced__WEBPACK_IMPORTED_MODULE_180__[\"default\"]; });\n\n/* harmony import */ var _reject__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__(/*! ./reject */ \"./node_modules/ramda/es/reject.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reject\", function() { return _reject__WEBPACK_IMPORTED_MODULE_181__[\"default\"]; });\n\n/* harmony import */ var _remove__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__(/*! ./remove */ \"./node_modules/ramda/es/remove.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return _remove__WEBPACK_IMPORTED_MODULE_182__[\"default\"]; });\n\n/* harmony import */ var _repeat__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__(/*! ./repeat */ \"./node_modules/ramda/es/repeat.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"repeat\", function() { return _repeat__WEBPACK_IMPORTED_MODULE_183__[\"default\"]; });\n\n/* harmony import */ var _replace__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__(/*! ./replace */ \"./node_modules/ramda/es/replace.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"replace\", function() { return _replace__WEBPACK_IMPORTED_MODULE_184__[\"default\"]; });\n\n/* harmony import */ var _reverse__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__(/*! ./reverse */ \"./node_modules/ramda/es/reverse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reverse\", function() { return _reverse__WEBPACK_IMPORTED_MODULE_185__[\"default\"]; });\n\n/* harmony import */ var _scan__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__(/*! ./scan */ \"./node_modules/ramda/es/scan.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"scan\", function() { return _scan__WEBPACK_IMPORTED_MODULE_186__[\"default\"]; });\n\n/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__(/*! ./sequence */ \"./node_modules/ramda/es/sequence.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"sequence\", function() { return _sequence__WEBPACK_IMPORTED_MODULE_187__[\"default\"]; });\n\n/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__(/*! ./set */ \"./node_modules/ramda/es/set.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return _set__WEBPACK_IMPORTED_MODULE_188__[\"default\"]; });\n\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"slice\", function() { return _slice__WEBPACK_IMPORTED_MODULE_189__[\"default\"]; });\n\n/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__(/*! ./sort */ \"./node_modules/ramda/es/sort.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"sort\", function() { return _sort__WEBPACK_IMPORTED_MODULE_190__[\"default\"]; });\n\n/* harmony import */ var _sortBy__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__(/*! ./sortBy */ \"./node_modules/ramda/es/sortBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"sortBy\", function() { return _sortBy__WEBPACK_IMPORTED_MODULE_191__[\"default\"]; });\n\n/* harmony import */ var _sortWith__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__(/*! ./sortWith */ \"./node_modules/ramda/es/sortWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"sortWith\", function() { return _sortWith__WEBPACK_IMPORTED_MODULE_192__[\"default\"]; });\n\n/* harmony import */ var _split__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__(/*! ./split */ \"./node_modules/ramda/es/split.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"split\", function() { return _split__WEBPACK_IMPORTED_MODULE_193__[\"default\"]; });\n\n/* harmony import */ var _splitAt__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__(/*! ./splitAt */ \"./node_modules/ramda/es/splitAt.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"splitAt\", function() { return _splitAt__WEBPACK_IMPORTED_MODULE_194__[\"default\"]; });\n\n/* harmony import */ var _splitEvery__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__(/*! ./splitEvery */ \"./node_modules/ramda/es/splitEvery.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"splitEvery\", function() { return _splitEvery__WEBPACK_IMPORTED_MODULE_195__[\"default\"]; });\n\n/* harmony import */ var _splitWhen__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__(/*! ./splitWhen */ \"./node_modules/ramda/es/splitWhen.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"splitWhen\", function() { return _splitWhen__WEBPACK_IMPORTED_MODULE_196__[\"default\"]; });\n\n/* harmony import */ var _startsWith__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__(/*! ./startsWith */ \"./node_modules/ramda/es/startsWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"startsWith\", function() { return _startsWith__WEBPACK_IMPORTED_MODULE_197__[\"default\"]; });\n\n/* harmony import */ var _subtract__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__(/*! ./subtract */ \"./node_modules/ramda/es/subtract.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"subtract\", function() { return _subtract__WEBPACK_IMPORTED_MODULE_198__[\"default\"]; });\n\n/* harmony import */ var _sum__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__(/*! ./sum */ \"./node_modules/ramda/es/sum.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"sum\", function() { return _sum__WEBPACK_IMPORTED_MODULE_199__[\"default\"]; });\n\n/* harmony import */ var _symmetricDifference__WEBPACK_IMPORTED_MODULE_200__ = __webpack_require__(/*! ./symmetricDifference */ \"./node_modules/ramda/es/symmetricDifference.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"symmetricDifference\", function() { return _symmetricDifference__WEBPACK_IMPORTED_MODULE_200__[\"default\"]; });\n\n/* harmony import */ var _symmetricDifferenceWith__WEBPACK_IMPORTED_MODULE_201__ = __webpack_require__(/*! ./symmetricDifferenceWith */ \"./node_modules/ramda/es/symmetricDifferenceWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"symmetricDifferenceWith\", function() { return _symmetricDifferenceWith__WEBPACK_IMPORTED_MODULE_201__[\"default\"]; });\n\n/* harmony import */ var _tail__WEBPACK_IMPORTED_MODULE_202__ = __webpack_require__(/*! ./tail */ \"./node_modules/ramda/es/tail.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"tail\", function() { return _tail__WEBPACK_IMPORTED_MODULE_202__[\"default\"]; });\n\n/* harmony import */ var _take__WEBPACK_IMPORTED_MODULE_203__ = __webpack_require__(/*! ./take */ \"./node_modules/ramda/es/take.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"take\", function() { return _take__WEBPACK_IMPORTED_MODULE_203__[\"default\"]; });\n\n/* harmony import */ var _takeLast__WEBPACK_IMPORTED_MODULE_204__ = __webpack_require__(/*! ./takeLast */ \"./node_modules/ramda/es/takeLast.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"takeLast\", function() { return _takeLast__WEBPACK_IMPORTED_MODULE_204__[\"default\"]; });\n\n/* harmony import */ var _takeLastWhile__WEBPACK_IMPORTED_MODULE_205__ = __webpack_require__(/*! ./takeLastWhile */ \"./node_modules/ramda/es/takeLastWhile.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"takeLastWhile\", function() { return _takeLastWhile__WEBPACK_IMPORTED_MODULE_205__[\"default\"]; });\n\n/* harmony import */ var _takeWhile__WEBPACK_IMPORTED_MODULE_206__ = __webpack_require__(/*! ./takeWhile */ \"./node_modules/ramda/es/takeWhile.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"takeWhile\", function() { return _takeWhile__WEBPACK_IMPORTED_MODULE_206__[\"default\"]; });\n\n/* harmony import */ var _tap__WEBPACK_IMPORTED_MODULE_207__ = __webpack_require__(/*! ./tap */ \"./node_modules/ramda/es/tap.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"tap\", function() { return _tap__WEBPACK_IMPORTED_MODULE_207__[\"default\"]; });\n\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_208__ = __webpack_require__(/*! ./test */ \"./node_modules/ramda/es/test.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"test\", function() { return _test__WEBPACK_IMPORTED_MODULE_208__[\"default\"]; });\n\n/* harmony import */ var _times__WEBPACK_IMPORTED_MODULE_209__ = __webpack_require__(/*! ./times */ \"./node_modules/ramda/es/times.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"times\", function() { return _times__WEBPACK_IMPORTED_MODULE_209__[\"default\"]; });\n\n/* harmony import */ var _toLower__WEBPACK_IMPORTED_MODULE_210__ = __webpack_require__(/*! ./toLower */ \"./node_modules/ramda/es/toLower.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"toLower\", function() { return _toLower__WEBPACK_IMPORTED_MODULE_210__[\"default\"]; });\n\n/* harmony import */ var _toPairs__WEBPACK_IMPORTED_MODULE_211__ = __webpack_require__(/*! ./toPairs */ \"./node_modules/ramda/es/toPairs.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"toPairs\", function() { return _toPairs__WEBPACK_IMPORTED_MODULE_211__[\"default\"]; });\n\n/* harmony import */ var _toPairsIn__WEBPACK_IMPORTED_MODULE_212__ = __webpack_require__(/*! ./toPairsIn */ \"./node_modules/ramda/es/toPairsIn.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"toPairsIn\", function() { return _toPairsIn__WEBPACK_IMPORTED_MODULE_212__[\"default\"]; });\n\n/* harmony import */ var _toString__WEBPACK_IMPORTED_MODULE_213__ = __webpack_require__(/*! ./toString */ \"./node_modules/ramda/es/toString.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"toString\", function() { return _toString__WEBPACK_IMPORTED_MODULE_213__[\"default\"]; });\n\n/* harmony import */ var _toUpper__WEBPACK_IMPORTED_MODULE_214__ = __webpack_require__(/*! ./toUpper */ \"./node_modules/ramda/es/toUpper.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"toUpper\", function() { return _toUpper__WEBPACK_IMPORTED_MODULE_214__[\"default\"]; });\n\n/* harmony import */ var _transduce__WEBPACK_IMPORTED_MODULE_215__ = __webpack_require__(/*! ./transduce */ \"./node_modules/ramda/es/transduce.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"transduce\", function() { return _transduce__WEBPACK_IMPORTED_MODULE_215__[\"default\"]; });\n\n/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_216__ = __webpack_require__(/*! ./transpose */ \"./node_modules/ramda/es/transpose.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"transpose\", function() { return _transpose__WEBPACK_IMPORTED_MODULE_216__[\"default\"]; });\n\n/* harmony import */ var _traverse__WEBPACK_IMPORTED_MODULE_217__ = __webpack_require__(/*! ./traverse */ \"./node_modules/ramda/es/traverse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"traverse\", function() { return _traverse__WEBPACK_IMPORTED_MODULE_217__[\"default\"]; });\n\n/* harmony import */ var _trim__WEBPACK_IMPORTED_MODULE_218__ = __webpack_require__(/*! ./trim */ \"./node_modules/ramda/es/trim.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"trim\", function() { return _trim__WEBPACK_IMPORTED_MODULE_218__[\"default\"]; });\n\n/* harmony import */ var _tryCatch__WEBPACK_IMPORTED_MODULE_219__ = __webpack_require__(/*! ./tryCatch */ \"./node_modules/ramda/es/tryCatch.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"tryCatch\", function() { return _tryCatch__WEBPACK_IMPORTED_MODULE_219__[\"default\"]; });\n\n/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_220__ = __webpack_require__(/*! ./type */ \"./node_modules/ramda/es/type.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"type\", function() { return _type__WEBPACK_IMPORTED_MODULE_220__[\"default\"]; });\n\n/* harmony import */ var _unapply__WEBPACK_IMPORTED_MODULE_221__ = __webpack_require__(/*! ./unapply */ \"./node_modules/ramda/es/unapply.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unapply\", function() { return _unapply__WEBPACK_IMPORTED_MODULE_221__[\"default\"]; });\n\n/* harmony import */ var _unary__WEBPACK_IMPORTED_MODULE_222__ = __webpack_require__(/*! ./unary */ \"./node_modules/ramda/es/unary.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unary\", function() { return _unary__WEBPACK_IMPORTED_MODULE_222__[\"default\"]; });\n\n/* harmony import */ var _uncurryN__WEBPACK_IMPORTED_MODULE_223__ = __webpack_require__(/*! ./uncurryN */ \"./node_modules/ramda/es/uncurryN.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"uncurryN\", function() { return _uncurryN__WEBPACK_IMPORTED_MODULE_223__[\"default\"]; });\n\n/* harmony import */ var _unfold__WEBPACK_IMPORTED_MODULE_224__ = __webpack_require__(/*! ./unfold */ \"./node_modules/ramda/es/unfold.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unfold\", function() { return _unfold__WEBPACK_IMPORTED_MODULE_224__[\"default\"]; });\n\n/* harmony import */ var _union__WEBPACK_IMPORTED_MODULE_225__ = __webpack_require__(/*! ./union */ \"./node_modules/ramda/es/union.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"union\", function() { return _union__WEBPACK_IMPORTED_MODULE_225__[\"default\"]; });\n\n/* harmony import */ var _unionWith__WEBPACK_IMPORTED_MODULE_226__ = __webpack_require__(/*! ./unionWith */ \"./node_modules/ramda/es/unionWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unionWith\", function() { return _unionWith__WEBPACK_IMPORTED_MODULE_226__[\"default\"]; });\n\n/* harmony import */ var _uniq__WEBPACK_IMPORTED_MODULE_227__ = __webpack_require__(/*! ./uniq */ \"./node_modules/ramda/es/uniq.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"uniq\", function() { return _uniq__WEBPACK_IMPORTED_MODULE_227__[\"default\"]; });\n\n/* harmony import */ var _uniqBy__WEBPACK_IMPORTED_MODULE_228__ = __webpack_require__(/*! ./uniqBy */ \"./node_modules/ramda/es/uniqBy.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"uniqBy\", function() { return _uniqBy__WEBPACK_IMPORTED_MODULE_228__[\"default\"]; });\n\n/* harmony import */ var _uniqWith__WEBPACK_IMPORTED_MODULE_229__ = __webpack_require__(/*! ./uniqWith */ \"./node_modules/ramda/es/uniqWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"uniqWith\", function() { return _uniqWith__WEBPACK_IMPORTED_MODULE_229__[\"default\"]; });\n\n/* harmony import */ var _unless__WEBPACK_IMPORTED_MODULE_230__ = __webpack_require__(/*! ./unless */ \"./node_modules/ramda/es/unless.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unless\", function() { return _unless__WEBPACK_IMPORTED_MODULE_230__[\"default\"]; });\n\n/* harmony import */ var _unnest__WEBPACK_IMPORTED_MODULE_231__ = __webpack_require__(/*! ./unnest */ \"./node_modules/ramda/es/unnest.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unnest\", function() { return _unnest__WEBPACK_IMPORTED_MODULE_231__[\"default\"]; });\n\n/* harmony import */ var _until__WEBPACK_IMPORTED_MODULE_232__ = __webpack_require__(/*! ./until */ \"./node_modules/ramda/es/until.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"until\", function() { return _until__WEBPACK_IMPORTED_MODULE_232__[\"default\"]; });\n\n/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_233__ = __webpack_require__(/*! ./update */ \"./node_modules/ramda/es/update.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return _update__WEBPACK_IMPORTED_MODULE_233__[\"default\"]; });\n\n/* harmony import */ var _useWith__WEBPACK_IMPORTED_MODULE_234__ = __webpack_require__(/*! ./useWith */ \"./node_modules/ramda/es/useWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"useWith\", function() { return _useWith__WEBPACK_IMPORTED_MODULE_234__[\"default\"]; });\n\n/* harmony import */ var _values__WEBPACK_IMPORTED_MODULE_235__ = __webpack_require__(/*! ./values */ \"./node_modules/ramda/es/values.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"values\", function() { return _values__WEBPACK_IMPORTED_MODULE_235__[\"default\"]; });\n\n/* harmony import */ var _valuesIn__WEBPACK_IMPORTED_MODULE_236__ = __webpack_require__(/*! ./valuesIn */ \"./node_modules/ramda/es/valuesIn.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"valuesIn\", function() { return _valuesIn__WEBPACK_IMPORTED_MODULE_236__[\"default\"]; });\n\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_237__ = __webpack_require__(/*! ./view */ \"./node_modules/ramda/es/view.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"view\", function() { return _view__WEBPACK_IMPORTED_MODULE_237__[\"default\"]; });\n\n/* harmony import */ var _when__WEBPACK_IMPORTED_MODULE_238__ = __webpack_require__(/*! ./when */ \"./node_modules/ramda/es/when.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"when\", function() { return _when__WEBPACK_IMPORTED_MODULE_238__[\"default\"]; });\n\n/* harmony import */ var _where__WEBPACK_IMPORTED_MODULE_239__ = __webpack_require__(/*! ./where */ \"./node_modules/ramda/es/where.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"where\", function() { return _where__WEBPACK_IMPORTED_MODULE_239__[\"default\"]; });\n\n/* harmony import */ var _whereEq__WEBPACK_IMPORTED_MODULE_240__ = __webpack_require__(/*! ./whereEq */ \"./node_modules/ramda/es/whereEq.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"whereEq\", function() { return _whereEq__WEBPACK_IMPORTED_MODULE_240__[\"default\"]; });\n\n/* harmony import */ var _without__WEBPACK_IMPORTED_MODULE_241__ = __webpack_require__(/*! ./without */ \"./node_modules/ramda/es/without.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"without\", function() { return _without__WEBPACK_IMPORTED_MODULE_241__[\"default\"]; });\n\n/* harmony import */ var _xprod__WEBPACK_IMPORTED_MODULE_242__ = __webpack_require__(/*! ./xprod */ \"./node_modules/ramda/es/xprod.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"xprod\", function() { return _xprod__WEBPACK_IMPORTED_MODULE_242__[\"default\"]; });\n\n/* harmony import */ var _zip__WEBPACK_IMPORTED_MODULE_243__ = __webpack_require__(/*! ./zip */ \"./node_modules/ramda/es/zip.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"zip\", function() { return _zip__WEBPACK_IMPORTED_MODULE_243__[\"default\"]; });\n\n/* harmony import */ var _zipObj__WEBPACK_IMPORTED_MODULE_244__ = __webpack_require__(/*! ./zipObj */ \"./node_modules/ramda/es/zipObj.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"zipObj\", function() { return _zipObj__WEBPACK_IMPORTED_MODULE_244__[\"default\"]; });\n\n/* harmony import */ var _zipWith__WEBPACK_IMPORTED_MODULE_245__ = __webpack_require__(/*! ./zipWith */ \"./node_modules/ramda/es/zipWith.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"zipWith\", function() { return _zipWith__WEBPACK_IMPORTED_MODULE_245__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./node_modules/ramda/es/index.js?");

/***/ }),

/***/ "./node_modules/ramda/es/indexBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/indexBy.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reduceBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduceBy */ \"./node_modules/ramda/es/reduceBy.js\");\n\n\n/**\n * Given a function that generates a key, turns a list of objects into an\n * object indexing the objects by the given key. Note that if multiple\n * objects generate the same value for the indexing key only the last value\n * will be included in the generated object.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category List\n * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}\n * @param {Function} fn Function :: a -> String\n * @param {Array} array The array of objects to index\n * @return {Object} An object indexing each array element by the given property.\n * @example\n *\n *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];\n *      R.indexBy(R.prop('id'), list);\n *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}\n */\nvar indexBy = /*#__PURE__*/Object(_reduceBy__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (acc, elem) {\n  return elem;\n}, null);\n/* harmony default export */ __webpack_exports__[\"default\"] = (indexBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/indexBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/indexOf.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/indexOf.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_indexOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_indexOf */ \"./node_modules/ramda/es/internal/_indexOf.js\");\n/* harmony import */ var _internal_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n\n\n\n\n/**\n * Returns the position of the first occurrence of an item in an array, or -1\n * if the item is not included in the array. [`R.equals`](#equals) is used to\n * determine equality.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig a -> [a] -> Number\n * @param {*} target The item to find.\n * @param {Array} xs The array to search in.\n * @return {Number} the index of the target, or -1 if the target is not found.\n * @see R.lastIndexOf\n * @example\n *\n *      R.indexOf(3, [1,2,3,4]); //=> 2\n *      R.indexOf(10, [1,2,3,4]); //=> -1\n */\nvar indexOf = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function indexOf(target, xs) {\n  return typeof xs.indexOf === 'function' && !Object(_internal_isArray__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(xs) ? xs.indexOf(target) : Object(_internal_indexOf__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(xs, target, 0);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (indexOf);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/indexOf.js?");

/***/ }),

/***/ "./node_modules/ramda/es/init.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/init.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n/**\n * Returns all but the last element of the given list or string.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category List\n * @sig [a] -> [a]\n * @sig String -> String\n * @param {*} list\n * @return {*}\n * @see R.last, R.head, R.tail\n * @example\n *\n *      R.init([1, 2, 3]);  //=> [1, 2]\n *      R.init([1, 2]);     //=> [1]\n *      R.init([1]);        //=> []\n *      R.init([]);         //=> []\n *\n *      R.init('abc');  //=> 'ab'\n *      R.init('ab');   //=> 'a'\n *      R.init('a');    //=> ''\n *      R.init('');     //=> ''\n */\nvar init = /*#__PURE__*/Object(_slice__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, -1);\n/* harmony default export */ __webpack_exports__[\"default\"] = (init);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/init.js?");

/***/ }),

/***/ "./node_modules/ramda/es/innerJoin.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/innerJoin.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_containsWith__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_containsWith */ \"./node_modules/ramda/es/internal/_containsWith.js\");\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _internal_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter */ \"./node_modules/ramda/es/internal/_filter.js\");\n\n\n\n\n/**\n * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list\n * `xs'` comprising each of the elements of `xs` which is equal to one or more\n * elements of `ys` according to `pred`.\n *\n * `pred` must be a binary function expecting an element from each list.\n *\n * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should\n * not be significant, but since `xs'` is ordered the implementation guarantees\n * that its values are in the same order as they appear in `xs`. Duplicates are\n * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category Relation\n * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]\n * @param {Function} pred\n * @param {Array} xs\n * @param {Array} ys\n * @return {Array}\n * @see R.intersection\n * @example\n *\n *      R.innerJoin(\n *        (record, id) => record.id === id,\n *        [{id: 824, name: 'Richie Furay'},\n *         {id: 956, name: 'Dewey Martin'},\n *         {id: 313, name: 'Bruce Palmer'},\n *         {id: 456, name: 'Stephen Stills'},\n *         {id: 177, name: 'Neil Young'}],\n *        [177, 456, 999]\n *      );\n *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]\n */\nvar innerJoin = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function innerJoin(pred, xs, ys) {\n  return Object(_internal_filter__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function (x) {\n    return Object(_internal_containsWith__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(pred, x, ys);\n  }, xs);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (innerJoin);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/innerJoin.js?");

/***/ }),

/***/ "./node_modules/ramda/es/insert.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/insert.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Inserts the supplied element into the list, at the specified `index`. _Note that\n\n * this is not destructive_: it returns a copy of the list with the changes.\n * <small>No lists have been harmed in the application of this function.</small>\n *\n * @func\n * @memberOf R\n * @since v0.2.2\n * @category List\n * @sig Number -> a -> [a] -> [a]\n * @param {Number} index The position to insert the element\n * @param {*} elt The element to insert into the Array\n * @param {Array} list The list to insert into\n * @return {Array} A new Array with `elt` inserted at `index`.\n * @example\n *\n *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]\n */\nvar insert = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function insert(idx, elt, list) {\n  idx = idx < list.length && idx >= 0 ? idx : list.length;\n  var result = Array.prototype.slice.call(list, 0);\n  result.splice(idx, 0, elt);\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (insert);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/insert.js?");

/***/ }),

/***/ "./node_modules/ramda/es/insertAll.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/insertAll.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Inserts the sub-list into the list, at the specified `index`. _Note that this is not\n * destructive_: it returns a copy of the list with the changes.\n * <small>No lists have been harmed in the application of this function.</small>\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category List\n * @sig Number -> [a] -> [a] -> [a]\n * @param {Number} index The position to insert the sub-list\n * @param {Array} elts The sub-list to insert into the Array\n * @param {Array} list The list to insert the sub-list into\n * @return {Array} A new Array with `elts` inserted starting at `index`.\n * @example\n *\n *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]\n */\nvar insertAll = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function insertAll(idx, elts, list) {\n  idx = idx < list.length && idx >= 0 ? idx : list.length;\n  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (insertAll);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/insertAll.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_Set.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_Set.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_contains */ \"./node_modules/ramda/es/internal/_contains.js\");\n\n\nvar _Set = /*#__PURE__*/function () {\n  function _Set() {\n    /* globals Set */\n    this._nativeSet = typeof Set === 'function' ? new Set() : null;\n    this._items = {};\n  }\n\n  // until we figure out why jsdoc chokes on this\n  // @param item The item to add to the Set\n  // @returns {boolean} true if the item did not exist prior, otherwise false\n  //\n  _Set.prototype.add = function (item) {\n    return !hasOrAdd(item, true, this);\n  };\n\n  //\n  // @param item The item to check for existence in the Set\n  // @returns {boolean} true if the item exists in the Set, otherwise false\n  //\n  _Set.prototype.has = function (item) {\n    return hasOrAdd(item, false, this);\n  };\n\n  //\n  // Combines the logic for checking whether an item is a member of the set and\n  // for adding a new item to the set.\n  //\n  // @param item       The item to check or add to the Set instance.\n  // @param shouldAdd  If true, the item will be added to the set if it doesn't\n  //                   already exist.\n  // @param set        The set instance to check or add to.\n  // @return {boolean} true if the item already existed, otherwise false.\n  //\n  return _Set;\n}();\n\nfunction hasOrAdd(item, shouldAdd, set) {\n  var type = typeof item;\n  var prevSize, newSize;\n  switch (type) {\n    case 'string':\n    case 'number':\n      // distinguish between +0 and -0\n      if (item === 0 && 1 / item === -Infinity) {\n        if (set._items['-0']) {\n          return true;\n        } else {\n          if (shouldAdd) {\n            set._items['-0'] = true;\n          }\n          return false;\n        }\n      }\n      // these types can all utilise the native Set\n      if (set._nativeSet !== null) {\n        if (shouldAdd) {\n          prevSize = set._nativeSet.size;\n          set._nativeSet.add(item);\n          newSize = set._nativeSet.size;\n          return newSize === prevSize;\n        } else {\n          return set._nativeSet.has(item);\n        }\n      } else {\n        if (!(type in set._items)) {\n          if (shouldAdd) {\n            set._items[type] = {};\n            set._items[type][item] = true;\n          }\n          return false;\n        } else if (item in set._items[type]) {\n          return true;\n        } else {\n          if (shouldAdd) {\n            set._items[type][item] = true;\n          }\n          return false;\n        }\n      }\n\n    case 'boolean':\n      // set._items['boolean'] holds a two element array\n      // representing [ falseExists, trueExists ]\n      if (type in set._items) {\n        var bIdx = item ? 1 : 0;\n        if (set._items[type][bIdx]) {\n          return true;\n        } else {\n          if (shouldAdd) {\n            set._items[type][bIdx] = true;\n          }\n          return false;\n        }\n      } else {\n        if (shouldAdd) {\n          set._items[type] = item ? [false, true] : [true, false];\n        }\n        return false;\n      }\n\n    case 'function':\n      // compare functions for reference equality\n      if (set._nativeSet !== null) {\n        if (shouldAdd) {\n          prevSize = set._nativeSet.size;\n          set._nativeSet.add(item);\n          newSize = set._nativeSet.size;\n          return newSize === prevSize;\n        } else {\n          return set._nativeSet.has(item);\n        }\n      } else {\n        if (!(type in set._items)) {\n          if (shouldAdd) {\n            set._items[type] = [item];\n          }\n          return false;\n        }\n        if (!Object(_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(item, set._items[type])) {\n          if (shouldAdd) {\n            set._items[type].push(item);\n          }\n          return false;\n        }\n        return true;\n      }\n\n    case 'undefined':\n      if (set._items[type]) {\n        return true;\n      } else {\n        if (shouldAdd) {\n          set._items[type] = true;\n        }\n        return false;\n      }\n\n    case 'object':\n      if (item === null) {\n        if (!set._items['null']) {\n          if (shouldAdd) {\n            set._items['null'] = true;\n          }\n          return false;\n        }\n        return true;\n      }\n    /* falls through */\n    default:\n      // reduce the search size of heterogeneous sets by creating buckets\n      // for each type.\n      type = Object.prototype.toString.call(item);\n      if (!(type in set._items)) {\n        if (shouldAdd) {\n          set._items[type] = [item];\n        }\n        return false;\n      }\n      // scan through all previously applied items\n      if (!Object(_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(item, set._items[type])) {\n        if (shouldAdd) {\n          set._items[type].push(item);\n        }\n        return false;\n      }\n      return true;\n  }\n}\n\n// A simple Set type that honours R.equals semantics\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Set);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_Set.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_aperture.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_aperture.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _aperture; });\nfunction _aperture(n, list) {\n  var idx = 0;\n  var limit = list.length - (n - 1);\n  var acc = new Array(limit >= 0 ? limit : 0);\n  while (idx < limit) {\n    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);\n    idx += 1;\n  }\n  return acc;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_aperture.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arity.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arity.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _arity; });\nfunction _arity(n, fn) {\n  /* eslint-disable no-unused-vars */\n  switch (n) {\n    case 0:\n      return function () {\n        return fn.apply(this, arguments);\n      };\n    case 1:\n      return function (a0) {\n        return fn.apply(this, arguments);\n      };\n    case 2:\n      return function (a0, a1) {\n        return fn.apply(this, arguments);\n      };\n    case 3:\n      return function (a0, a1, a2) {\n        return fn.apply(this, arguments);\n      };\n    case 4:\n      return function (a0, a1, a2, a3) {\n        return fn.apply(this, arguments);\n      };\n    case 5:\n      return function (a0, a1, a2, a3, a4) {\n        return fn.apply(this, arguments);\n      };\n    case 6:\n      return function (a0, a1, a2, a3, a4, a5) {\n        return fn.apply(this, arguments);\n      };\n    case 7:\n      return function (a0, a1, a2, a3, a4, a5, a6) {\n        return fn.apply(this, arguments);\n      };\n    case 8:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7) {\n        return fn.apply(this, arguments);\n      };\n    case 9:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {\n        return fn.apply(this, arguments);\n      };\n    case 10:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {\n        return fn.apply(this, arguments);\n      };\n    default:\n      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_arity.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arrayFromIterator.js":
/*!**************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arrayFromIterator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _arrayFromIterator; });\nfunction _arrayFromIterator(iter) {\n  var list = [];\n  var next;\n  while (!(next = iter.next()).done) {\n    list.push(next.value);\n  }\n  return list;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_arrayFromIterator.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_assign.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_assign.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objectAssign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_objectAssign */ \"./node_modules/ramda/es/internal/_objectAssign.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (typeof Object.assign === 'function' ? Object.assign : _objectAssign__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_assign.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_checkForMethod.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_checkForMethod.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _checkForMethod; });\n/* harmony import */ var _isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n\n\n/**\n * This checks whether a function has a [methodname] function. If it isn't an\n * array it will execute that function otherwise it will default to the ramda\n * implementation.\n *\n * @private\n * @param {Function} fn ramda implemtation\n * @param {String} methodname property to check for a custom implementation\n * @return {Object} Whatever the return value of the method is.\n */\nfunction _checkForMethod(methodname, fn) {\n  return function () {\n    var length = arguments.length;\n    if (length === 0) {\n      return fn();\n    }\n    var obj = arguments[length - 1];\n    return Object(_isArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_checkForMethod.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_clone.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_clone.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _clone; });\n/* harmony import */ var _cloneRegExp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cloneRegExp */ \"./node_modules/ramda/es/internal/_cloneRegExp.js\");\n/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type */ \"./node_modules/ramda/es/type.js\");\n\n\n\n/**\n * Copies an object.\n *\n * @private\n * @param {*} value The value to be copied\n * @param {Array} refFrom Array containing the source references\n * @param {Array} refTo Array containing the copied source references\n * @param {Boolean} deep Whether or not to perform deep cloning.\n * @return {*} The copied value.\n */\nfunction _clone(value, refFrom, refTo, deep) {\n  var copy = function copy(copiedValue) {\n    var len = refFrom.length;\n    var idx = 0;\n    while (idx < len) {\n      if (value === refFrom[idx]) {\n        return refTo[idx];\n      }\n      idx += 1;\n    }\n    refFrom[idx + 1] = value;\n    refTo[idx + 1] = copiedValue;\n    for (var key in value) {\n      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];\n    }\n    return copiedValue;\n  };\n  switch (Object(_type__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value)) {\n    case 'Object':\n      return copy({});\n    case 'Array':\n      return copy([]);\n    case 'Date':\n      return new Date(value.valueOf());\n    case 'RegExp':\n      return Object(_cloneRegExp__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value);\n    default:\n      return value;\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_clone.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_cloneRegExp.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_cloneRegExp.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _cloneRegExp; });\nfunction _cloneRegExp(pattern) {\n                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_cloneRegExp.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_complement.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_complement.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _complement; });\nfunction _complement(f) {\n  return function () {\n    return !f.apply(this, arguments);\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_complement.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_concat.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_concat.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _concat; });\n/**\n * Private `concat` function to merge two array-like objects.\n *\n * @private\n * @param {Array|Arguments} [set1=[]] An array-like object.\n * @param {Array|Arguments} [set2=[]] An array-like object.\n * @return {Array} A new, merged array.\n * @example\n *\n *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]\n */\nfunction _concat(set1, set2) {\n  set1 = set1 || [];\n  set2 = set2 || [];\n  var idx;\n  var len1 = set1.length;\n  var len2 = set2.length;\n  var result = [];\n\n  idx = 0;\n  while (idx < len1) {\n    result[result.length] = set1[idx];\n    idx += 1;\n  }\n  idx = 0;\n  while (idx < len2) {\n    result[result.length] = set2[idx];\n    idx += 1;\n  }\n  return result;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_concat.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_contains.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_contains.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _contains; });\n/* harmony import */ var _indexOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_indexOf */ \"./node_modules/ramda/es/internal/_indexOf.js\");\n\n\nfunction _contains(a, list) {\n  return Object(_indexOf__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list, a, 0) >= 0;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_contains.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_containsWith.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_containsWith.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _containsWith; });\nfunction _containsWith(pred, x, list) {\n  var idx = 0;\n  var len = list.length;\n\n  while (idx < len) {\n    if (pred(x, list[idx])) {\n      return true;\n    }\n    idx += 1;\n  }\n  return false;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_containsWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_createPartialApplicator.js":
/*!********************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_createPartialApplicator.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _createPartialApplicator; });\n/* harmony import */ var _arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\nfunction _createPartialApplicator(concat) {\n  return Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (fn, args) {\n    return Object(_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Math.max(0, fn.length - args.length), function () {\n      return fn.apply(this, concat(args, arguments));\n    });\n  });\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_createPartialApplicator.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry1.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry1.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _curry1; });\n/* harmony import */ var _isPlaceholder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n\n/**\n * Optimized internal one-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nfunction _curry1(fn) {\n  return function f1(a) {\n    if (arguments.length === 0 || Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a)) {\n      return f1;\n    } else {\n      return fn.apply(this, arguments);\n    }\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_curry1.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry2.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry2.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _curry2; });\n/* harmony import */ var _curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _isPlaceholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n\n\n/**\n * Optimized internal two-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nfunction _curry2(fn) {\n  return function f2(a, b) {\n    switch (arguments.length) {\n      case 0:\n        return f2;\n      case 1:\n        return Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(a) ? f2 : Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (_b) {\n          return fn(a, _b);\n        });\n      default:\n        return Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(a) && Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(b) ? f2 : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(a) ? Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (_a) {\n          return fn(_a, b);\n        }) : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(b) ? Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (_b) {\n          return fn(a, _b);\n        }) : fn(a, b);\n    }\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_curry2.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry3.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry3.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _curry3; });\n/* harmony import */ var _curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _isPlaceholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n\n\n\n/**\n * Optimized internal three-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nfunction _curry3(fn) {\n  return function f3(a, b, c) {\n    switch (arguments.length) {\n      case 0:\n        return f3;\n      case 1:\n        return Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a) ? f3 : Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (_b, _c) {\n          return fn(a, _b, _c);\n        });\n      case 2:\n        return Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a) && Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(b) ? f3 : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a) ? Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (_a, _c) {\n          return fn(_a, b, _c);\n        }) : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(b) ? Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (_b, _c) {\n          return fn(a, _b, _c);\n        }) : Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (_c) {\n          return fn(a, b, _c);\n        });\n      default:\n        return Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a) && Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(b) && Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(c) ? f3 : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a) && Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(b) ? Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (_a, _b) {\n          return fn(_a, _b, c);\n        }) : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a) && Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(c) ? Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (_a, _c) {\n          return fn(_a, b, _c);\n        }) : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(b) && Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(c) ? Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (_b, _c) {\n          return fn(a, _b, _c);\n        }) : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a) ? Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (_a) {\n          return fn(_a, b, c);\n        }) : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(b) ? Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (_b) {\n          return fn(a, _b, c);\n        }) : Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(c) ? Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (_c) {\n          return fn(a, b, _c);\n        }) : fn(a, b, c);\n    }\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_curry3.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curryN.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curryN.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _curryN; });\n/* harmony import */ var _arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _isPlaceholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n\n\n/**\n * Internal curryN function.\n *\n * @private\n * @category Function\n * @param {Number} length The arity of the curried function.\n * @param {Array} received An array of arguments received thus far.\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nfunction _curryN(length, received, fn) {\n  return function () {\n    var combined = [];\n    var argsIdx = 0;\n    var left = length;\n    var combinedIdx = 0;\n    while (combinedIdx < received.length || argsIdx < arguments.length) {\n      var result;\n      if (combinedIdx < received.length && (!Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(received[combinedIdx]) || argsIdx >= arguments.length)) {\n        result = received[combinedIdx];\n      } else {\n        result = arguments[argsIdx];\n        argsIdx += 1;\n      }\n      combined[combinedIdx] = result;\n      if (!Object(_isPlaceholder__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(result)) {\n        left -= 1;\n      }\n      combinedIdx += 1;\n    }\n    return left <= 0 ? fn.apply(this, combined) : Object(_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(left, _curryN(length, combined, fn));\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_curryN.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dispatchable.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dispatchable.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _dispatchable; });\n/* harmony import */ var _isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _isTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isTransformer */ \"./node_modules/ramda/es/internal/_isTransformer.js\");\n\n\n\n/**\n * Returns a function that dispatches with different strategies based on the\n * object in list position (last argument). If it is an array, executes [fn].\n * Otherwise, if it has a function with one of the given method names, it will\n * execute that function (functor case). Otherwise, if it is a transformer,\n * uses transducer [xf] to return a new transformer (transducer case).\n * Otherwise, it will default to executing [fn].\n *\n * @private\n * @param {Array} methodNames properties to check for a custom implementation\n * @param {Function} xf transducer to initialize if object is transformer\n * @param {Function} fn default ramda implementation\n * @return {Function} A function that dispatches on object in list position\n */\nfunction _dispatchable(methodNames, xf, fn) {\n  return function () {\n    if (arguments.length === 0) {\n      return fn();\n    }\n    var args = Array.prototype.slice.call(arguments, 0);\n    var obj = args.pop();\n    if (!Object(_isArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(obj)) {\n      var idx = 0;\n      while (idx < methodNames.length) {\n        if (typeof obj[methodNames[idx]] === 'function') {\n          return obj[methodNames[idx]].apply(obj, args);\n        }\n        idx += 1;\n      }\n      if (Object(_isTransformer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(obj)) {\n        var transducer = xf.apply(null, args);\n        return transducer(obj);\n      }\n    }\n    return fn.apply(this, arguments);\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_dispatchable.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dropLast.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dropLast.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return dropLast; });\n/* harmony import */ var _take__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../take */ \"./node_modules/ramda/es/take.js\");\n\n\nfunction dropLast(n, xs) {\n  return Object(_take__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(n < xs.length ? xs.length - n : 0, xs);\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_dropLast.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dropLastWhile.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dropLastWhile.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return dropLastWhile; });\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slice */ \"./node_modules/ramda/es/slice.js\");\n\n\nfunction dropLastWhile(pred, xs) {\n  var idx = xs.length - 1;\n  while (idx >= 0 && pred(xs[idx])) {\n    idx -= 1;\n  }\n  return Object(_slice__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, idx + 1, xs);\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_dropLastWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_equals.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_equals.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _equals; });\n/* harmony import */ var _arrayFromIterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arrayFromIterator */ \"./node_modules/ramda/es/internal/_arrayFromIterator.js\");\n/* harmony import */ var _containsWith__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_containsWith */ \"./node_modules/ramda/es/internal/_containsWith.js\");\n/* harmony import */ var _functionName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_functionName */ \"./node_modules/ramda/es/internal/_functionName.js\");\n/* harmony import */ var _has__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_has */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _identical__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../identical */ \"./node_modules/ramda/es/identical.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../keys */ \"./node_modules/ramda/es/keys.js\");\n/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../type */ \"./node_modules/ramda/es/type.js\");\n\n\n\n\n\n\n\n\n/**\n * private _uniqContentEquals function.\n * That function is checking equality of 2 iterator contents with 2 assumptions\n * - iterators lengths are the same\n * - iterators values are unique\n *\n * false-positive result will be returned for comparision of, e.g.\n * - [1,2,3] and [1,2,3,4]\n * - [1,1,1] and [1,2,3]\n * */\n\nfunction _uniqContentEquals(aIterator, bIterator, stackA, stackB) {\n  var a = Object(_arrayFromIterator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(aIterator);\n  var b = Object(_arrayFromIterator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(bIterator);\n\n  function eq(_a, _b) {\n    return _equals(_a, _b, stackA.slice(), stackB.slice());\n  }\n\n  // if *a* array contains any element that is not included in *b*\n  return !Object(_containsWith__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (b, aItem) {\n    return !Object(_containsWith__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(eq, aItem, b);\n  }, b, a);\n}\n\nfunction _equals(a, b, stackA, stackB) {\n  if (Object(_identical__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(a, b)) {\n    return true;\n  }\n\n  var typeA = Object(_type__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(a);\n\n  if (typeA !== Object(_type__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(b)) {\n    return false;\n  }\n\n  if (a == null || b == null) {\n    return false;\n  }\n\n  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {\n    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);\n  }\n\n  if (typeof a.equals === 'function' || typeof b.equals === 'function') {\n    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);\n  }\n\n  switch (typeA) {\n    case 'Arguments':\n    case 'Array':\n    case 'Object':\n      if (typeof a.constructor === 'function' && Object(_functionName__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(a.constructor) === 'Promise') {\n        return a === b;\n      }\n      break;\n    case 'Boolean':\n    case 'Number':\n    case 'String':\n      if (!(typeof a === typeof b && Object(_identical__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(a.valueOf(), b.valueOf()))) {\n        return false;\n      }\n      break;\n    case 'Date':\n      if (!Object(_identical__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(a.valueOf(), b.valueOf())) {\n        return false;\n      }\n      break;\n    case 'Error':\n      return a.name === b.name && a.message === b.message;\n    case 'RegExp':\n      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {\n        return false;\n      }\n      break;\n  }\n\n  var idx = stackA.length - 1;\n  while (idx >= 0) {\n    if (stackA[idx] === a) {\n      return stackB[idx] === b;\n    }\n    idx -= 1;\n  }\n\n  switch (typeA) {\n    case 'Map':\n      if (a.size !== b.size) {\n        return false;\n      }\n\n      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));\n    case 'Set':\n      if (a.size !== b.size) {\n        return false;\n      }\n\n      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));\n    case 'Arguments':\n    case 'Array':\n    case 'Object':\n    case 'Boolean':\n    case 'Number':\n    case 'String':\n    case 'Date':\n    case 'Error':\n    case 'RegExp':\n    case 'Int8Array':\n    case 'Uint8Array':\n    case 'Uint8ClampedArray':\n    case 'Int16Array':\n    case 'Uint16Array':\n    case 'Int32Array':\n    case 'Uint32Array':\n    case 'Float32Array':\n    case 'Float64Array':\n    case 'ArrayBuffer':\n      break;\n    default:\n      // Values of other types are only equal if identical.\n      return false;\n  }\n\n  var keysA = Object(_keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(a);\n  if (keysA.length !== Object(_keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(b).length) {\n    return false;\n  }\n\n  var extendedStackA = stackA.concat([a]);\n  var extendedStackB = stackB.concat([b]);\n\n  idx = keysA.length - 1;\n  while (idx >= 0) {\n    var key = keysA[idx];\n    if (!(Object(_has__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {\n      return false;\n    }\n    idx -= 1;\n  }\n  return true;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_equals.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_filter.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_filter.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _filter; });\nfunction _filter(fn, list) {\n  var idx = 0;\n  var len = list.length;\n  var result = [];\n\n  while (idx < len) {\n    if (fn(list[idx])) {\n      result[result.length] = list[idx];\n    }\n    idx += 1;\n  }\n  return result;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_filter.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_flatCat.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_flatCat.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _forceReduced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_forceReduced */ \"./node_modules/ramda/es/internal/_forceReduced.js\");\n/* harmony import */ var _isArrayLike__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike */ \"./node_modules/ramda/es/internal/_isArrayLike.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\n\nvar preservingReduced = function (xf) {\n  return {\n    '@@transducer/init': _xfBase__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init,\n    '@@transducer/result': function (result) {\n      return xf['@@transducer/result'](result);\n    },\n    '@@transducer/step': function (result, input) {\n      var ret = xf['@@transducer/step'](result, input);\n      return ret['@@transducer/reduced'] ? Object(_forceReduced__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(ret) : ret;\n    }\n  };\n};\n\nvar _flatCat = function _xcat(xf) {\n  var rxf = preservingReduced(xf);\n  return {\n    '@@transducer/init': _xfBase__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init,\n    '@@transducer/result': function (result) {\n      return rxf['@@transducer/result'](result);\n    },\n    '@@transducer/step': function (result, input) {\n      return !Object(_isArrayLike__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(input) ? Object(_reduce__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(rxf, result, [input]) : Object(_reduce__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(rxf, result, input);\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_flatCat);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_flatCat.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_forceReduced.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_forceReduced.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _forceReduced; });\nfunction _forceReduced(x) {\n  return {\n    '@@transducer/value': x,\n    '@@transducer/reduced': true\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_forceReduced.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_functionName.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_functionName.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _functionName; });\nfunction _functionName(f) {\n  // String(x => x) evaluates to \"x => x\", so the pattern may not match.\n  var match = String(f).match(/^function (\\w*)/);\n  return match == null ? '' : match[1];\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_functionName.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_has.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_has.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _has; });\nfunction _has(prop, obj) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_has.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_identity.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_identity.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _identity; });\nfunction _identity(x) {\n  return x;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_identity.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_indexOf.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_indexOf.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _indexOf; });\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../equals */ \"./node_modules/ramda/es/equals.js\");\n\n\nfunction _indexOf(list, a, idx) {\n  var inf, item;\n  // Array.prototype.indexOf doesn't exist below IE9\n  if (typeof list.indexOf === 'function') {\n    switch (typeof a) {\n      case 'number':\n        if (a === 0) {\n          // manually crawl the list to distinguish between +0 and -0\n          inf = 1 / a;\n          while (idx < list.length) {\n            item = list[idx];\n            if (item === 0 && 1 / item === inf) {\n              return idx;\n            }\n            idx += 1;\n          }\n          return -1;\n        } else if (a !== a) {\n          // NaN\n          while (idx < list.length) {\n            item = list[idx];\n            if (typeof item === 'number' && item !== item) {\n              return idx;\n            }\n            idx += 1;\n          }\n          return -1;\n        }\n        // non-zero numbers can utilise Set\n        return list.indexOf(a, idx);\n\n      // all these types can utilise Set\n      case 'string':\n      case 'boolean':\n      case 'function':\n      case 'undefined':\n        return list.indexOf(a, idx);\n\n      case 'object':\n        if (a === null) {\n          // null can utilise Set\n          return list.indexOf(a, idx);\n        }\n    }\n  }\n  // anything else not covered above, defer to R.equals\n  while (idx < list.length) {\n    if (Object(_equals__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list[idx], a)) {\n      return idx;\n    }\n    idx += 1;\n  }\n  return -1;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_indexOf.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArguments.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArguments.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\nvar toString = Object.prototype.toString;\nvar _isArguments = function () {\n  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {\n    return toString.call(x) === '[object Arguments]';\n  } : function _isArguments(x) {\n    return Object(_has__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('callee', x);\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_isArguments);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isArguments.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArray.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Tests whether or not an object is an array.\n *\n * @private\n * @param {*} val The object to test.\n * @return {Boolean} `true` if `val` is an array, `false` otherwise.\n * @example\n *\n *      _isArray([]); //=> true\n *      _isArray(null); //=> false\n *      _isArray({}); //=> false\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (Array.isArray || function _isArray(val) {\n  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';\n});\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isArray.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArrayLike.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArrayLike.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _isString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isString */ \"./node_modules/ramda/es/internal/_isString.js\");\n\n\n\n\n/**\n * Tests whether or not an object is similar to an array.\n *\n * @private\n * @category Type\n * @category List\n * @sig * -> Boolean\n * @param {*} x The object to test.\n * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.\n * @example\n *\n *      _isArrayLike([]); //=> true\n *      _isArrayLike(true); //=> false\n *      _isArrayLike({}); //=> false\n *      _isArrayLike({length: 10}); //=> false\n *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true\n */\nvar _isArrayLike = /*#__PURE__*/Object(_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function isArrayLike(x) {\n  if (Object(_isArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(x)) {\n    return true;\n  }\n  if (!x) {\n    return false;\n  }\n  if (typeof x !== 'object') {\n    return false;\n  }\n  if (Object(_isString__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(x)) {\n    return false;\n  }\n  if (x.nodeType === 1) {\n    return !!x.length;\n  }\n  if (x.length === 0) {\n    return true;\n  }\n  if (x.length > 0) {\n    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);\n  }\n  return false;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_isArrayLike);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isArrayLike.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isFunction.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _isFunction; });\nfunction _isFunction(x) {\n  return Object.prototype.toString.call(x) === '[object Function]';\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isFunction.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isInteger.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isInteger.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Determine if the passed argument is an integer.\n *\n * @private\n * @param {*} n\n * @category Type\n * @return {Boolean}\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = (Number.isInteger || function _isInteger(n) {\n  return n << 0 === n;\n});\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isInteger.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isNumber.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isNumber.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _isNumber; });\nfunction _isNumber(x) {\n  return Object.prototype.toString.call(x) === '[object Number]';\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isNumber.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isObject.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _isObject; });\nfunction _isObject(x) {\n  return Object.prototype.toString.call(x) === '[object Object]';\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isObject.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isPlaceholder.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isPlaceholder.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _isPlaceholder; });\nfunction _isPlaceholder(a) {\n       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isPlaceholder.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isRegExp.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isRegExp.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _isRegExp; });\nfunction _isRegExp(x) {\n  return Object.prototype.toString.call(x) === '[object RegExp]';\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isRegExp.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isString.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _isString; });\nfunction _isString(x) {\n  return Object.prototype.toString.call(x) === '[object String]';\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isString.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isTransformer.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isTransformer.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _isTransformer; });\nfunction _isTransformer(obj) {\n  return typeof obj['@@transducer/step'] === 'function';\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_isTransformer.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_makeFlat.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_makeFlat.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _makeFlat; });\n/* harmony import */ var _isArrayLike__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike */ \"./node_modules/ramda/es/internal/_isArrayLike.js\");\n\n\n/**\n * `_makeFlat` is a helper function that returns a one-level or fully recursive\n * function based on the flag passed in.\n *\n * @private\n */\nfunction _makeFlat(recursive) {\n  return function flatt(list) {\n    var value, jlen, j;\n    var result = [];\n    var idx = 0;\n    var ilen = list.length;\n\n    while (idx < ilen) {\n      if (Object(_isArrayLike__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list[idx])) {\n        value = recursive ? flatt(list[idx]) : list[idx];\n        j = 0;\n        jlen = value.length;\n        while (j < jlen) {\n          result[result.length] = value[j];\n          j += 1;\n        }\n      } else {\n        result[result.length] = list[idx];\n      }\n      idx += 1;\n    }\n    return result;\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_makeFlat.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_map.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_map.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _map; });\nfunction _map(fn, functor) {\n  var idx = 0;\n  var len = functor.length;\n  var result = Array(len);\n  while (idx < len) {\n    result[idx] = fn(functor[idx]);\n    idx += 1;\n  }\n  return result;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_map.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_objectAssign.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_objectAssign.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _objectAssign; });\n/* harmony import */ var _has__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\n// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign\nfunction _objectAssign(target) {\n  if (target == null) {\n    throw new TypeError('Cannot convert undefined or null to object');\n  }\n\n  var output = Object(target);\n  var idx = 1;\n  var length = arguments.length;\n  while (idx < length) {\n    var source = arguments[idx];\n    if (source != null) {\n      for (var nextKey in source) {\n        if (Object(_has__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(nextKey, source)) {\n          output[nextKey] = source[nextKey];\n        }\n      }\n    }\n    idx += 1;\n  }\n  return output;\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_objectAssign.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_of.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/internal/_of.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _of; });\nfunction _of(x) {\n  return [x];\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_of.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_pipe.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_pipe.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _pipe; });\nfunction _pipe(f, g) {\n  return function () {\n    return g.call(this, f.apply(this, arguments));\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_pipe.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_pipeP.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_pipeP.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _pipeP; });\nfunction _pipeP(f, g) {\n  return function () {\n    var ctx = this;\n    return f.apply(ctx, arguments).then(function (x) {\n      return g.call(ctx, x);\n    });\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_pipeP.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_quote.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_quote.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _quote; });\nfunction _quote(s) {\n  var escaped = s.replace(/\\\\/g, '\\\\\\\\').replace(/[\\b]/g, '\\\\b') // \\b matches word boundary; [\\b] matches backspace\n  .replace(/\\f/g, '\\\\f').replace(/\\n/g, '\\\\n').replace(/\\r/g, '\\\\r').replace(/\\t/g, '\\\\t').replace(/\\v/g, '\\\\v').replace(/\\0/g, '\\\\0');\n\n  return '\"' + escaped.replace(/\"/g, '\\\\\"') + '\"';\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_quote.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduce.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduce.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _reduce; });\n/* harmony import */ var _isArrayLike__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike */ \"./node_modules/ramda/es/internal/_isArrayLike.js\");\n/* harmony import */ var _xwrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xwrap */ \"./node_modules/ramda/es/internal/_xwrap.js\");\n/* harmony import */ var _bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bind */ \"./node_modules/ramda/es/bind.js\");\n\n\n\n\nfunction _arrayReduce(xf, acc, list) {\n  var idx = 0;\n  var len = list.length;\n  while (idx < len) {\n    acc = xf['@@transducer/step'](acc, list[idx]);\n    if (acc && acc['@@transducer/reduced']) {\n      acc = acc['@@transducer/value'];\n      break;\n    }\n    idx += 1;\n  }\n  return xf['@@transducer/result'](acc);\n}\n\nfunction _iterableReduce(xf, acc, iter) {\n  var step = iter.next();\n  while (!step.done) {\n    acc = xf['@@transducer/step'](acc, step.value);\n    if (acc && acc['@@transducer/reduced']) {\n      acc = acc['@@transducer/value'];\n      break;\n    }\n    step = iter.next();\n  }\n  return xf['@@transducer/result'](acc);\n}\n\nfunction _methodReduce(xf, acc, obj, methodName) {\n  return xf['@@transducer/result'](obj[methodName](Object(_bind__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(xf['@@transducer/step'], xf), acc));\n}\n\nvar symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';\n\nfunction _reduce(fn, acc, list) {\n  if (typeof fn === 'function') {\n    fn = Object(_xwrap__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(fn);\n  }\n  if (Object(_isArrayLike__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list)) {\n    return _arrayReduce(fn, acc, list);\n  }\n  if (typeof list['fantasy-land/reduce'] === 'function') {\n    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');\n  }\n  if (list[symIterator] != null) {\n    return _iterableReduce(fn, acc, list[symIterator]());\n  }\n  if (typeof list.next === 'function') {\n    return _iterableReduce(fn, acc, list);\n  }\n  if (typeof list.reduce === 'function') {\n    return _methodReduce(fn, acc, list, 'reduce');\n  }\n\n  throw new TypeError('reduce: list must be array or iterable');\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_reduce.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduced.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduced.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _reduced; });\nfunction _reduced(x) {\n  return x && x['@@transducer/reduced'] ? x : {\n    '@@transducer/value': x,\n    '@@transducer/reduced': true\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_reduced.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_stepCat.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_stepCat.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _stepCat; });\n/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_assign */ \"./node_modules/ramda/es/internal/_assign.js\");\n/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_identity */ \"./node_modules/ramda/es/internal/_identity.js\");\n/* harmony import */ var _isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isArrayLike */ \"./node_modules/ramda/es/internal/_isArrayLike.js\");\n/* harmony import */ var _isTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_isTransformer */ \"./node_modules/ramda/es/internal/_isTransformer.js\");\n/* harmony import */ var _objOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objOf */ \"./node_modules/ramda/es/objOf.js\");\n\n\n\n\n\n\nvar _stepCatArray = {\n  '@@transducer/init': Array,\n  '@@transducer/step': function (xs, x) {\n    xs.push(x);\n    return xs;\n  },\n  '@@transducer/result': _identity__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n};\nvar _stepCatString = {\n  '@@transducer/init': String,\n  '@@transducer/step': function (a, b) {\n    return a + b;\n  },\n  '@@transducer/result': _identity__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n};\nvar _stepCatObject = {\n  '@@transducer/init': Object,\n  '@@transducer/step': function (result, input) {\n    return Object(_assign__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(result, Object(_isArrayLike__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(input) ? Object(_objOf__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(input[0], input[1]) : input);\n  },\n  '@@transducer/result': _identity__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n};\n\nfunction _stepCat(obj) {\n  if (Object(_isTransformer__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(obj)) {\n    return obj;\n  }\n  if (Object(_isArrayLike__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(obj)) {\n    return _stepCatArray;\n  }\n  if (typeof obj === 'string') {\n    return _stepCatString;\n  }\n  if (typeof obj === 'object') {\n    return _stepCatObject;\n  }\n  throw new Error('Cannot create transformer for ' + obj);\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_stepCat.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toISOString.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toISOString.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.\n */\nvar pad = function pad(n) {\n  return (n < 10 ? '0' : '') + n;\n};\n\nvar _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {\n  return d.toISOString();\n} : function _toISOString(d) {\n  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_toISOString);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_toISOString.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toString.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _toString; });\n/* harmony import */ var _contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_contains */ \"./node_modules/ramda/es/internal/_contains.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_map */ \"./node_modules/ramda/es/internal/_map.js\");\n/* harmony import */ var _quote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_quote */ \"./node_modules/ramda/es/internal/_quote.js\");\n/* harmony import */ var _toISOString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_toISOString */ \"./node_modules/ramda/es/internal/_toISOString.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../keys */ \"./node_modules/ramda/es/keys.js\");\n/* harmony import */ var _reject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reject */ \"./node_modules/ramda/es/reject.js\");\n\n\n\n\n\n\n\nfunction _toString(x, seen) {\n  var recur = function recur(y) {\n    var xs = seen.concat([x]);\n    return Object(_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(y, xs) ? '<Circular>' : _toString(y, xs);\n  };\n\n  //  mapPairs :: (Object, [String]) -> [String]\n  var mapPairs = function (obj, keys) {\n    return Object(_map__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (k) {\n      return Object(_quote__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(k) + ': ' + recur(obj[k]);\n    }, keys.slice().sort());\n  };\n\n  switch (Object.prototype.toString.call(x)) {\n    case '[object Arguments]':\n      return '(function() { return arguments; }(' + Object(_map__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(recur, x).join(', ') + '))';\n    case '[object Array]':\n      return '[' + Object(_map__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(recur, x).concat(mapPairs(x, Object(_reject__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(function (k) {\n        return (/^\\d+$/.test(k)\n        );\n      }, Object(_keys__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(x)))).join(', ') + ']';\n    case '[object Boolean]':\n      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();\n    case '[object Date]':\n      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : Object(_quote__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_toISOString__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(x))) + ')';\n    case '[object Null]':\n      return 'null';\n    case '[object Number]':\n      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);\n    case '[object String]':\n      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : Object(_quote__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(x);\n    case '[object Undefined]':\n      return 'undefined';\n    default:\n      if (typeof x.toString === 'function') {\n        var repr = x.toString();\n        if (repr !== '[object Object]') {\n          return repr;\n        }\n      }\n      return '{' + mapPairs(x, Object(_keys__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(x)).join(', ') + '}';\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_toString.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xall.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xall.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XAll = /*#__PURE__*/function () {\n  function XAll(f, xf) {\n    this.xf = xf;\n    this.f = f;\n    this.all = true;\n  }\n  XAll.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XAll.prototype['@@transducer/result'] = function (result) {\n    if (this.all) {\n      result = this.xf['@@transducer/step'](result, true);\n    }\n    return this.xf['@@transducer/result'](result);\n  };\n  XAll.prototype['@@transducer/step'] = function (result, input) {\n    if (!this.f(input)) {\n      this.all = false;\n      result = Object(_reduced__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.xf['@@transducer/step'](result, false));\n    }\n    return result;\n  };\n\n  return XAll;\n}();\n\nvar _xall = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xall(f, xf) {\n  return new XAll(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xall);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xall.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xany.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xany.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XAny = /*#__PURE__*/function () {\n  function XAny(f, xf) {\n    this.xf = xf;\n    this.f = f;\n    this.any = false;\n  }\n  XAny.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XAny.prototype['@@transducer/result'] = function (result) {\n    if (!this.any) {\n      result = this.xf['@@transducer/step'](result, false);\n    }\n    return this.xf['@@transducer/result'](result);\n  };\n  XAny.prototype['@@transducer/step'] = function (result, input) {\n    if (this.f(input)) {\n      this.any = true;\n      result = Object(_reduced__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.xf['@@transducer/step'](result, true));\n    }\n    return result;\n  };\n\n  return XAny;\n}();\n\nvar _xany = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xany(f, xf) {\n  return new XAny(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xany);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xany.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xaperture.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xaperture.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XAperture = /*#__PURE__*/function () {\n  function XAperture(n, xf) {\n    this.xf = xf;\n    this.pos = 0;\n    this.full = false;\n    this.acc = new Array(n);\n  }\n  XAperture.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XAperture.prototype['@@transducer/result'] = function (result) {\n    this.acc = null;\n    return this.xf['@@transducer/result'](result);\n  };\n  XAperture.prototype['@@transducer/step'] = function (result, input) {\n    this.store(input);\n    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;\n  };\n  XAperture.prototype.store = function (input) {\n    this.acc[this.pos] = input;\n    this.pos += 1;\n    if (this.pos === this.acc.length) {\n      this.pos = 0;\n      this.full = true;\n    }\n  };\n  XAperture.prototype.getCopy = function () {\n    return Object(_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));\n  };\n\n  return XAperture;\n}();\n\nvar _xaperture = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function _xaperture(n, xf) {\n  return new XAperture(n, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xaperture);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xaperture.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xchain.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xchain.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _flatCat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_flatCat */ \"./node_modules/ramda/es/internal/_flatCat.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../map */ \"./node_modules/ramda/es/map.js\");\n\n\n\n\nvar _xchain = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xchain(f, xf) {\n  return Object(_map__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(f, Object(_flatCat__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(xf));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xchain);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xchain.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdrop.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdrop.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XDrop = /*#__PURE__*/function () {\n  function XDrop(n, xf) {\n    this.xf = xf;\n    this.n = n;\n  }\n  XDrop.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XDrop.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].result;\n  XDrop.prototype['@@transducer/step'] = function (result, input) {\n    if (this.n > 0) {\n      this.n -= 1;\n      return result;\n    }\n    return this.xf['@@transducer/step'](result, input);\n  };\n\n  return XDrop;\n}();\n\nvar _xdrop = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xdrop(n, xf) {\n  return new XDrop(n, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xdrop);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xdrop.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropLast.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropLast.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XDropLast = /*#__PURE__*/function () {\n  function XDropLast(n, xf) {\n    this.xf = xf;\n    this.pos = 0;\n    this.full = false;\n    this.acc = new Array(n);\n  }\n  XDropLast.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XDropLast.prototype['@@transducer/result'] = function (result) {\n    this.acc = null;\n    return this.xf['@@transducer/result'](result);\n  };\n  XDropLast.prototype['@@transducer/step'] = function (result, input) {\n    if (this.full) {\n      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);\n    }\n    this.store(input);\n    return result;\n  };\n  XDropLast.prototype.store = function (input) {\n    this.acc[this.pos] = input;\n    this.pos += 1;\n    if (this.pos === this.acc.length) {\n      this.pos = 0;\n      this.full = true;\n    }\n  };\n\n  return XDropLast;\n}();\n\nvar _xdropLast = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xdropLast(n, xf) {\n  return new XDropLast(n, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xdropLast);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xdropLast.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropLastWhile.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropLastWhile.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XDropLastWhile = /*#__PURE__*/function () {\n  function XDropLastWhile(fn, xf) {\n    this.f = fn;\n    this.retained = [];\n    this.xf = xf;\n  }\n  XDropLastWhile.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XDropLastWhile.prototype['@@transducer/result'] = function (result) {\n    this.retained = null;\n    return this.xf['@@transducer/result'](result);\n  };\n  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {\n    return this.f(input) ? this.retain(result, input) : this.flush(result, input);\n  };\n  XDropLastWhile.prototype.flush = function (result, input) {\n    result = Object(_reduce__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.xf['@@transducer/step'], result, this.retained);\n    this.retained = [];\n    return this.xf['@@transducer/step'](result, input);\n  };\n  XDropLastWhile.prototype.retain = function (result, input) {\n    this.retained.push(input);\n    return result;\n  };\n\n  return XDropLastWhile;\n}();\n\nvar _xdropLastWhile = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xdropLastWhile(fn, xf) {\n  return new XDropLastWhile(fn, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xdropLastWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xdropLastWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropRepeatsWith.js":
/*!*************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropRepeatsWith.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XDropRepeatsWith = /*#__PURE__*/function () {\n  function XDropRepeatsWith(pred, xf) {\n    this.xf = xf;\n    this.pred = pred;\n    this.lastValue = undefined;\n    this.seenFirstValue = false;\n  }\n\n  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].result;\n  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {\n    var sameAsLast = false;\n    if (!this.seenFirstValue) {\n      this.seenFirstValue = true;\n    } else if (this.pred(this.lastValue, input)) {\n      sameAsLast = true;\n    }\n    this.lastValue = input;\n    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);\n  };\n\n  return XDropRepeatsWith;\n}();\n\nvar _xdropRepeatsWith = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xdropRepeatsWith(pred, xf) {\n  return new XDropRepeatsWith(pred, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xdropRepeatsWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xdropRepeatsWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropWhile.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropWhile.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XDropWhile = /*#__PURE__*/function () {\n  function XDropWhile(f, xf) {\n    this.xf = xf;\n    this.f = f;\n  }\n  XDropWhile.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XDropWhile.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].result;\n  XDropWhile.prototype['@@transducer/step'] = function (result, input) {\n    if (this.f) {\n      if (this.f(input)) {\n        return result;\n      }\n      this.f = null;\n    }\n    return this.xf['@@transducer/step'](result, input);\n  };\n\n  return XDropWhile;\n}();\n\nvar _xdropWhile = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xdropWhile(f, xf) {\n  return new XDropWhile(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xdropWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xdropWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfBase.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfBase.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: function () {\n    return this.xf['@@transducer/init']();\n  },\n  result: function (result) {\n    return this.xf['@@transducer/result'](result);\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xfBase.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfilter.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfilter.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XFilter = /*#__PURE__*/function () {\n  function XFilter(f, xf) {\n    this.xf = xf;\n    this.f = f;\n  }\n  XFilter.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XFilter.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].result;\n  XFilter.prototype['@@transducer/step'] = function (result, input) {\n    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;\n  };\n\n  return XFilter;\n}();\n\nvar _xfilter = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xfilter(f, xf) {\n  return new XFilter(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xfilter);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xfilter.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfind.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfind.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XFind = /*#__PURE__*/function () {\n  function XFind(f, xf) {\n    this.xf = xf;\n    this.f = f;\n    this.found = false;\n  }\n  XFind.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XFind.prototype['@@transducer/result'] = function (result) {\n    if (!this.found) {\n      result = this.xf['@@transducer/step'](result, void 0);\n    }\n    return this.xf['@@transducer/result'](result);\n  };\n  XFind.prototype['@@transducer/step'] = function (result, input) {\n    if (this.f(input)) {\n      this.found = true;\n      result = Object(_reduced__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.xf['@@transducer/step'](result, input));\n    }\n    return result;\n  };\n\n  return XFind;\n}();\n\nvar _xfind = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xfind(f, xf) {\n  return new XFind(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xfind);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xfind.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindIndex.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindIndex.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XFindIndex = /*#__PURE__*/function () {\n  function XFindIndex(f, xf) {\n    this.xf = xf;\n    this.f = f;\n    this.idx = -1;\n    this.found = false;\n  }\n  XFindIndex.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XFindIndex.prototype['@@transducer/result'] = function (result) {\n    if (!this.found) {\n      result = this.xf['@@transducer/step'](result, -1);\n    }\n    return this.xf['@@transducer/result'](result);\n  };\n  XFindIndex.prototype['@@transducer/step'] = function (result, input) {\n    this.idx += 1;\n    if (this.f(input)) {\n      this.found = true;\n      result = Object(_reduced__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.xf['@@transducer/step'](result, this.idx));\n    }\n    return result;\n  };\n\n  return XFindIndex;\n}();\n\nvar _xfindIndex = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xfindIndex(f, xf) {\n  return new XFindIndex(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xfindIndex);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xfindIndex.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindLast.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindLast.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XFindLast = /*#__PURE__*/function () {\n  function XFindLast(f, xf) {\n    this.xf = xf;\n    this.f = f;\n  }\n  XFindLast.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XFindLast.prototype['@@transducer/result'] = function (result) {\n    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));\n  };\n  XFindLast.prototype['@@transducer/step'] = function (result, input) {\n    if (this.f(input)) {\n      this.last = input;\n    }\n    return result;\n  };\n\n  return XFindLast;\n}();\n\nvar _xfindLast = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xfindLast(f, xf) {\n  return new XFindLast(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xfindLast);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xfindLast.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindLastIndex.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindLastIndex.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XFindLastIndex = /*#__PURE__*/function () {\n  function XFindLastIndex(f, xf) {\n    this.xf = xf;\n    this.f = f;\n    this.idx = -1;\n    this.lastIdx = -1;\n  }\n  XFindLastIndex.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XFindLastIndex.prototype['@@transducer/result'] = function (result) {\n    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));\n  };\n  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {\n    this.idx += 1;\n    if (this.f(input)) {\n      this.lastIdx = this.idx;\n    }\n    return result;\n  };\n\n  return XFindLastIndex;\n}();\n\nvar _xfindLastIndex = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xfindLastIndex(f, xf) {\n  return new XFindLastIndex(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xfindLastIndex);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xfindLastIndex.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xmap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xmap.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XMap = /*#__PURE__*/function () {\n  function XMap(f, xf) {\n    this.xf = xf;\n    this.f = f;\n  }\n  XMap.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XMap.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].result;\n  XMap.prototype['@@transducer/step'] = function (result, input) {\n    return this.xf['@@transducer/step'](result, this.f(input));\n  };\n\n  return XMap;\n}();\n\nvar _xmap = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xmap(f, xf) {\n  return new XMap(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xmap);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xmap.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xreduceBy.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xreduceBy.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curryN */ \"./node_modules/ramda/es/internal/_curryN.js\");\n/* harmony import */ var _has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_has */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XReduceBy = /*#__PURE__*/function () {\n  function XReduceBy(valueFn, valueAcc, keyFn, xf) {\n    this.valueFn = valueFn;\n    this.valueAcc = valueAcc;\n    this.keyFn = keyFn;\n    this.xf = xf;\n    this.inputs = {};\n  }\n  XReduceBy.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XReduceBy.prototype['@@transducer/result'] = function (result) {\n    var key;\n    for (key in this.inputs) {\n      if (Object(_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(key, this.inputs)) {\n        result = this.xf['@@transducer/step'](result, this.inputs[key]);\n        if (result['@@transducer/reduced']) {\n          result = result['@@transducer/value'];\n          break;\n        }\n      }\n    }\n    this.inputs = null;\n    return this.xf['@@transducer/result'](result);\n  };\n  XReduceBy.prototype['@@transducer/step'] = function (result, input) {\n    var key = this.keyFn(input);\n    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];\n    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);\n    return result;\n  };\n\n  return XReduceBy;\n}();\n\nvar _xreduceBy = /*#__PURE__*/Object(_curryN__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {\n  return new XReduceBy(valueFn, valueAcc, keyFn, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xreduceBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xreduceBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtake.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtake.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XTake = /*#__PURE__*/function () {\n  function XTake(n, xf) {\n    this.xf = xf;\n    this.n = n;\n    this.i = 0;\n  }\n  XTake.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XTake.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].result;\n  XTake.prototype['@@transducer/step'] = function (result, input) {\n    this.i += 1;\n    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);\n    return this.n >= 0 && this.i >= this.n ? Object(_reduced__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(ret) : ret;\n  };\n\n  return XTake;\n}();\n\nvar _xtake = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xtake(n, xf) {\n  return new XTake(n, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xtake);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xtake.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtakeWhile.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtakeWhile.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XTakeWhile = /*#__PURE__*/function () {\n  function XTakeWhile(f, xf) {\n    this.xf = xf;\n    this.f = f;\n  }\n  XTakeWhile.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init;\n  XTakeWhile.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_2__[\"default\"].result;\n  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {\n    return this.f(input) ? this.xf['@@transducer/step'](result, input) : Object(_reduced__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(result);\n  };\n\n  return XTakeWhile;\n}();\n\nvar _xtakeWhile = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xtakeWhile(f, xf) {\n  return new XTakeWhile(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xtakeWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xtakeWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtap.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XTap = /*#__PURE__*/function () {\n  function XTap(f, xf) {\n    this.xf = xf;\n    this.f = f;\n  }\n  XTap.prototype['@@transducer/init'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init;\n  XTap.prototype['@@transducer/result'] = _xfBase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].result;\n  XTap.prototype['@@transducer/step'] = function (result, input) {\n    this.f(input);\n    return this.xf['@@transducer/step'](result, input);\n  };\n\n  return XTap;\n}();\n\nvar _xtap = /*#__PURE__*/Object(_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function _xtap(f, xf) {\n  return new XTap(f, xf);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_xtap);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xtap.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xwrap.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xwrap.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _xwrap; });\nvar XWrap = /*#__PURE__*/function () {\n  function XWrap(fn) {\n    this.f = fn;\n  }\n  XWrap.prototype['@@transducer/init'] = function () {\n    throw new Error('init not implemented on XWrap');\n  };\n  XWrap.prototype['@@transducer/result'] = function (acc) {\n    return acc;\n  };\n  XWrap.prototype['@@transducer/step'] = function (acc, x) {\n    return this.f(acc, x);\n  };\n\n  return XWrap;\n}();\n\nfunction _xwrap(fn) {\n  return new XWrap(fn);\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/internal/_xwrap.js?");

/***/ }),

/***/ "./node_modules/ramda/es/intersection.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/intersection.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_contains */ \"./node_modules/ramda/es/internal/_contains.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter */ \"./node_modules/ramda/es/internal/_filter.js\");\n/* harmony import */ var _flip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flip */ \"./node_modules/ramda/es/flip.js\");\n/* harmony import */ var _uniq__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uniq */ \"./node_modules/ramda/es/uniq.js\");\n\n\n\n\n\n\n/**\n * Combines two lists into a set (i.e. no duplicates) composed of those\n * elements common to both lists.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig [*] -> [*] -> [*]\n * @param {Array} list1 The first list.\n * @param {Array} list2 The second list.\n * @return {Array} The list of elements found in both `list1` and `list2`.\n * @see R.innerJoin\n * @example\n *\n *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]\n */\nvar intersection = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function intersection(list1, list2) {\n  var lookupList, filteredList;\n  if (list1.length > list2.length) {\n    lookupList = list1;\n    filteredList = list2;\n  } else {\n    lookupList = list2;\n    filteredList = list1;\n  }\n  return Object(_uniq__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Object(_internal_filter__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_flip__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_internal_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(lookupList), filteredList));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (intersection);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/intersection.js?");

/***/ }),

/***/ "./node_modules/ramda/es/intersperse.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/intersperse.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod */ \"./node_modules/ramda/es/internal/_checkForMethod.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Creates a new list with the separator interposed between elements.\n *\n * Dispatches to the `intersperse` method of the second argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category List\n * @sig a -> [a] -> [a]\n * @param {*} separator The element to add to the list.\n * @param {Array} list The list to be interposed.\n * @return {Array} The new list.\n * @example\n *\n *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']\n */\nvar intersperse = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('intersperse', function intersperse(separator, list) {\n  var out = [];\n  var idx = 0;\n  var length = list.length;\n  while (idx < length) {\n    if (idx === length - 1) {\n      out.push(list[idx]);\n    } else {\n      out.push(list[idx], separator);\n    }\n    idx += 1;\n  }\n  return out;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (intersperse);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/intersperse.js?");

/***/ }),

/***/ "./node_modules/ramda/es/into.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/into.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone */ \"./node_modules/ramda/es/internal/_clone.js\");\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _internal_isTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isTransformer */ \"./node_modules/ramda/es/internal/_isTransformer.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _internal_stepCat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_stepCat */ \"./node_modules/ramda/es/internal/_stepCat.js\");\n\n\n\n\n\n\n/**\n * Transforms the items of the list with the transducer and appends the\n * transformed items to the accumulator using an appropriate iterator function\n * based on the accumulator type.\n *\n * The accumulator can be an array, string, object or a transformer. Iterated\n * items will be appended to arrays and concatenated to strings. Objects will\n * be merged directly or 2-item arrays will be merged as key, value pairs.\n *\n * The accumulator can also be a transformer object that provides a 2-arity\n * reducing iterator function, step, 0-arity initial value function, init, and\n * 1-arity result extraction function result. The step function is used as the\n * iterator function in reduce. The result function is used to convert the\n * final accumulator into the return type and in most cases is R.identity. The\n * init function is used to provide the initial accumulator.\n *\n * The iteration is performed with [`R.reduce`](#reduce) after initializing the\n * transducer.\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category List\n * @sig a -> (b -> b) -> [c] -> a\n * @param {*} acc The initial accumulator value.\n * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.\n * @param {Array} list The list to iterate over.\n * @return {*} The final, accumulated value.\n * @example\n *\n *      var numbers = [1, 2, 3, 4];\n *      var transducer = R.compose(R.map(R.add(1)), R.take(2));\n *\n *      R.into([], transducer, numbers); //=> [2, 3]\n *\n *      var intoArray = R.into([]);\n *      intoArray(transducer, numbers); //=> [2, 3]\n */\nvar into = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function into(acc, xf, list) {\n  return Object(_internal_isTransformer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(acc) ? Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(xf(acc), acc['@@transducer/init'](), list) : Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(xf(Object(_internal_stepCat__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(acc)), Object(_internal_clone__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(acc, [], [], false), list);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (into);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/into.js?");

/***/ }),

/***/ "./node_modules/ramda/es/invert.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/invert.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n\n/**\n * Same as [`R.invertObj`](#invertObj), however this accounts for objects with\n * duplicate values by putting the values into an array.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Object\n * @sig {s: x} -> {x: [ s, ... ]}\n * @param {Object} obj The object or array to invert\n * @return {Object} out A new object with keys in an array.\n * @see R.invertObj\n * @example\n *\n *      var raceResultsByFirstName = {\n *        first: 'alice',\n *        second: 'jake',\n *        third: 'alice',\n *      };\n *      R.invert(raceResultsByFirstName);\n *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }\n */\nvar invert = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function invert(obj) {\n  var props = Object(_keys__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(obj);\n  var len = props.length;\n  var idx = 0;\n  var out = {};\n\n  while (idx < len) {\n    var key = props[idx];\n    var val = obj[key];\n    var list = Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(val, out) ? out[val] : out[val] = [];\n    list[list.length] = key;\n    idx += 1;\n  }\n  return out;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (invert);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/invert.js?");

/***/ }),

/***/ "./node_modules/ramda/es/invertObj.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/invertObj.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n/**\n * Returns a new object with the keys of the given object as values, and the\n * values of the given object, which are coerced to strings, as keys. Note\n * that the last key found is preferred when handling the same value.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Object\n * @sig {s: x} -> {x: s}\n * @param {Object} obj The object or array to invert\n * @return {Object} out A new object\n * @see R.invert\n * @example\n *\n *      var raceResults = {\n *        first: 'alice',\n *        second: 'jake'\n *      };\n *      R.invertObj(raceResults);\n *      //=> { 'alice': 'first', 'jake':'second' }\n *\n *      // Alternatively:\n *      var raceResults = ['alice', 'jake'];\n *      R.invertObj(raceResults);\n *      //=> { 'alice': '0', 'jake':'1' }\n */\nvar invertObj = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function invertObj(obj) {\n  var props = Object(_keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(obj);\n  var len = props.length;\n  var idx = 0;\n  var out = {};\n\n  while (idx < len) {\n    var key = props[idx];\n    out[obj[key]] = key;\n    idx += 1;\n  }\n  return out;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (invertObj);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/invertObj.js?");

/***/ }),

/***/ "./node_modules/ramda/es/invoker.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/invoker.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction */ \"./node_modules/ramda/es/internal/_isFunction.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _toString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toString */ \"./node_modules/ramda/es/toString.js\");\n\n\n\n\n\n/**\n * Turns a named method with a specified arity into a function that can be\n * called directly supplied with arguments and a target object.\n *\n * The returned function is curried and accepts `arity + 1` parameters where\n * the final parameter is the target object.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)\n * @param {Number} arity Number of arguments the returned function should take\n *        before the target object.\n * @param {String} method Name of the method to call.\n * @return {Function} A new curried function.\n * @see R.construct\n * @example\n *\n *      var sliceFrom = R.invoker(1, 'slice');\n *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'\n *      var sliceFrom6 = R.invoker(2, 'slice')(6);\n *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'\n * @symb R.invoker(0, 'method')(o) = o['method']()\n * @symb R.invoker(1, 'method')(a, o) = o['method'](a)\n * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)\n */\nvar invoker = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function invoker(arity, method) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(arity + 1, function () {\n    var target = arguments[arity];\n    if (target != null && Object(_internal_isFunction__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(target[method])) {\n      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));\n    }\n    throw new TypeError(Object(_toString__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(target) + ' does not have a method named \"' + method + '\"');\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (invoker);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/invoker.js?");

/***/ }),

/***/ "./node_modules/ramda/es/is.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/is.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * See if an object (`val`) is an instance of the supplied constructor. This\n * function will check up the inheritance chain, if any.\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category Type\n * @sig (* -> {*}) -> a -> Boolean\n * @param {Object} ctor A constructor\n * @param {*} val The value to test\n * @return {Boolean}\n * @example\n *\n *      R.is(Object, {}); //=> true\n *      R.is(Number, 1); //=> true\n *      R.is(Object, 1); //=> false\n *      R.is(String, 's'); //=> true\n *      R.is(String, new String('')); //=> true\n *      R.is(Object, new String('')); //=> true\n *      R.is(Object, 's'); //=> false\n *      R.is(Number, {}); //=> false\n */\nvar is = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function is(Ctor, val) {\n  return val != null && val.constructor === Ctor || val instanceof Ctor;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (is);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/is.js?");

/***/ }),

/***/ "./node_modules/ramda/es/isEmpty.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/isEmpty.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty */ \"./node_modules/ramda/es/empty.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n\n\n\n\n/**\n * Returns `true` if the given value is its type's empty value; `false`\n * otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Logic\n * @sig a -> Boolean\n * @param {*} x\n * @return {Boolean}\n * @see R.empty\n * @example\n *\n *      R.isEmpty([1, 2, 3]);   //=> false\n *      R.isEmpty([]);          //=> true\n *      R.isEmpty('');          //=> true\n *      R.isEmpty(null);        //=> false\n *      R.isEmpty({});          //=> true\n *      R.isEmpty({length: 0}); //=> false\n */\nvar isEmpty = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function isEmpty(x) {\n  return x != null && Object(_equals__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(x, Object(_empty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(x));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (isEmpty);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/isEmpty.js?");

/***/ }),

/***/ "./node_modules/ramda/es/isNil.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/isNil.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Checks if the input value is `null` or `undefined`.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Type\n * @sig * -> Boolean\n * @param {*} x The value to test.\n * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.\n * @example\n *\n *      R.isNil(null); //=> true\n *      R.isNil(undefined); //=> true\n *      R.isNil(0); //=> false\n *      R.isNil([]); //=> false\n */\nvar isNil = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function isNil(x) {\n  return x == null;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (isNil);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/isNil.js?");

/***/ }),

/***/ "./node_modules/ramda/es/join.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/join.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _invoker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker */ \"./node_modules/ramda/es/invoker.js\");\n\n\n/**\n * Returns a string made by inserting the `separator` between each element and\n * concatenating all the elements into a single string.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig String -> [a] -> String\n * @param {Number|String} separator The string used to separate the elements.\n * @param {Array} xs The elements to join into a string.\n * @return {String} str The string made by concatenating `xs` with `separator`.\n * @see R.split\n * @example\n *\n *      var spacer = R.join(' ');\n *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'\n *      R.join('|', [1, 2, 3]);    //=> '1|2|3'\n */\nvar join = /*#__PURE__*/Object(_invoker__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, 'join');\n/* harmony default export */ __webpack_exports__[\"default\"] = (join);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/join.js?");

/***/ }),

/***/ "./node_modules/ramda/es/juxt.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/juxt.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _converge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./converge */ \"./node_modules/ramda/es/converge.js\");\n\n\n\n/**\n * juxt applies a list of functions to a list of values.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category Function\n * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])\n * @param {Array} fns An array of functions\n * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.\n * @see R.applySpec\n * @example\n *\n *      var getRange = R.juxt([Math.min, Math.max]);\n *      getRange(3, 4, 9, -3); //=> [-3, 9]\n * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]\n */\nvar juxt = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function juxt(fns) {\n  return Object(_converge__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function () {\n    return Array.prototype.slice.call(arguments, 0);\n  }, fns);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (juxt);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/juxt.js?");

/***/ }),

/***/ "./node_modules/ramda/es/keys.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/keys.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _internal_isArguments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArguments */ \"./node_modules/ramda/es/internal/_isArguments.js\");\n\n\n\n\n// cover IE < 9 keys issues\nvar hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');\nvar nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];\n// Safari bug\nvar hasArgsEnumBug = /*#__PURE__*/function () {\n  'use strict';\n\n  return arguments.propertyIsEnumerable('length');\n}();\n\nvar contains = function contains(list, item) {\n  var idx = 0;\n  while (idx < list.length) {\n    if (list[idx] === item) {\n      return true;\n    }\n    idx += 1;\n  }\n  return false;\n};\n\n/**\n * Returns a list containing the names of all the enumerable own properties of\n * the supplied object.\n * Note that the order of the output array is not guaranteed to be consistent\n * across different JS platforms.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig {k: v} -> [k]\n * @param {Object} obj The object to extract properties from\n * @return {Array} An array of the object's own properties.\n * @see R.keysIn, R.values\n * @example\n *\n *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']\n */\nvar _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {\n  return Object(obj) !== obj ? [] : Object.keys(obj);\n} : function keys(obj) {\n  if (Object(obj) !== obj) {\n    return [];\n  }\n  var prop, nIdx;\n  var ks = [];\n  var checkArgsLength = hasArgsEnumBug && Object(_internal_isArguments__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(obj);\n  for (prop in obj) {\n    if (Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(prop, obj) && (!checkArgsLength || prop !== 'length')) {\n      ks[ks.length] = prop;\n    }\n  }\n  if (hasEnumBug) {\n    nIdx = nonEnumerableProps.length - 1;\n    while (nIdx >= 0) {\n      prop = nonEnumerableProps[nIdx];\n      if (Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(prop, obj) && !contains(ks, prop)) {\n        ks[ks.length] = prop;\n      }\n      nIdx -= 1;\n    }\n  }\n  return ks;\n};\nvar keys = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_keys);\n/* harmony default export */ __webpack_exports__[\"default\"] = (keys);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/keys.js?");

/***/ }),

/***/ "./node_modules/ramda/es/keysIn.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/keysIn.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Returns a list containing the names of all the properties of the supplied\n * object, including prototype properties.\n * Note that the order of the output array is not guaranteed to be consistent\n * across different JS platforms.\n *\n * @func\n * @memberOf R\n * @since v0.2.0\n * @category Object\n * @sig {k: v} -> [k]\n * @param {Object} obj The object to extract properties from\n * @return {Array} An array of the object's own and prototype properties.\n * @see R.keys, R.valuesIn\n * @example\n *\n *      var F = function() { this.x = 'X'; };\n *      F.prototype.y = 'Y';\n *      var f = new F();\n *      R.keysIn(f); //=> ['x', 'y']\n */\nvar keysIn = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function keysIn(obj) {\n  var prop;\n  var ks = [];\n  for (prop in obj) {\n    ks[ks.length] = prop;\n  }\n  return ks;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (keysIn);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/keysIn.js?");

/***/ }),

/***/ "./node_modules/ramda/es/last.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/last.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _nth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nth */ \"./node_modules/ramda/es/nth.js\");\n\n\n/**\n * Returns the last element of the given list or string.\n *\n * @func\n * @memberOf R\n * @since v0.1.4\n * @category List\n * @sig [a] -> a | Undefined\n * @sig String -> String\n * @param {*} list\n * @return {*}\n * @see R.init, R.head, R.tail\n * @example\n *\n *      R.last(['fi', 'fo', 'fum']); //=> 'fum'\n *      R.last([]); //=> undefined\n *\n *      R.last('abc'); //=> 'c'\n *      R.last(''); //=> ''\n */\nvar last = /*#__PURE__*/Object(_nth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(-1);\n/* harmony default export */ __webpack_exports__[\"default\"] = (last);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/last.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lastIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/lastIndexOf.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n\n\n\n\n/**\n * Returns the position of the last occurrence of an item in an array, or -1 if\n * the item is not included in the array. [`R.equals`](#equals) is used to\n * determine equality.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig a -> [a] -> Number\n * @param {*} target The item to find.\n * @param {Array} xs The array to search in.\n * @return {Number} the index of the target, or -1 if the target is not found.\n * @see R.indexOf\n * @example\n *\n *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6\n *      R.lastIndexOf(10, [1,2,3,4]); //=> -1\n */\nvar lastIndexOf = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lastIndexOf(target, xs) {\n  if (typeof xs.lastIndexOf === 'function' && !Object(_internal_isArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(xs)) {\n    return xs.lastIndexOf(target);\n  } else {\n    var idx = xs.length - 1;\n    while (idx >= 0) {\n      if (Object(_equals__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(xs[idx], target)) {\n        return idx;\n      }\n      idx -= 1;\n    }\n    return -1;\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lastIndexOf);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lastIndexOf.js?");

/***/ }),

/***/ "./node_modules/ramda/es/length.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/length.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_isNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isNumber */ \"./node_modules/ramda/es/internal/_isNumber.js\");\n\n\n\n/**\n * Returns the number of elements in the array by returning `list.length`.\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category List\n * @sig [a] -> Number\n * @param {Array} list The array to inspect.\n * @return {Number} The length of the array.\n * @example\n *\n *      R.length([]); //=> 0\n *      R.length([1, 2, 3]); //=> 3\n */\nvar length = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function length(list) {\n  return list != null && Object(_internal_isNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(list.length) ? list.length : NaN;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (length);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/length.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lens.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/lens.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n\n\n\n/**\n * Returns a lens for the given getter and setter functions. The getter \"gets\"\n * the value of the focus; the setter \"sets\" the value of the focus. The setter\n * should not mutate the data structure.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Object\n * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s\n * @sig (s -> a) -> ((a, s) -> s) -> Lens s a\n * @param {Function} getter\n * @param {Function} setter\n * @return {Lens}\n * @see R.view, R.set, R.over, R.lensIndex, R.lensProp\n * @example\n *\n *      var xLens = R.lens(R.prop('x'), R.assoc('x'));\n *\n *      R.view(xLens, {x: 1, y: 2});            //=> 1\n *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}\n *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}\n */\nvar lens = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lens(getter, setter) {\n  return function (toFunctorFn) {\n    return function (target) {\n      return Object(_map__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (focus) {\n        return setter(focus, target);\n      }, toFunctorFn(getter(target)));\n    };\n  };\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lens);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lens.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lensIndex.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/lensIndex.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _lens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lens */ \"./node_modules/ramda/es/lens.js\");\n/* harmony import */ var _nth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth */ \"./node_modules/ramda/es/nth.js\");\n/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update */ \"./node_modules/ramda/es/update.js\");\n\n\n\n\n\n/**\n * Returns a lens whose focus is the specified index.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category Object\n * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s\n * @sig Number -> Lens s a\n * @param {Number} n\n * @return {Lens}\n * @see R.view, R.set, R.over\n * @example\n *\n *      var headLens = R.lensIndex(0);\n *\n *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'\n *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']\n *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']\n */\nvar lensIndex = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lensIndex(n) {\n  return Object(_lens__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_nth__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(n), Object(_update__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(n));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lensIndex);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lensIndex.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lensPath.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/lensPath.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _assocPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assocPath */ \"./node_modules/ramda/es/assocPath.js\");\n/* harmony import */ var _lens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lens */ \"./node_modules/ramda/es/lens.js\");\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./path */ \"./node_modules/ramda/es/path.js\");\n\n\n\n\n\n/**\n * Returns a lens whose focus is the specified path.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category Object\n * @typedefn Idx = String | Int\n * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s\n * @sig [Idx] -> Lens s a\n * @param {Array} path The path to use.\n * @return {Lens}\n * @see R.view, R.set, R.over\n * @example\n *\n *      var xHeadYLens = R.lensPath(['x', 0, 'y']);\n *\n *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});\n *      //=> 2\n *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});\n *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}\n *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});\n *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}\n */\nvar lensPath = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lensPath(p) {\n  return Object(_lens__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_path__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(p), Object(_assocPath__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(p));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lensPath);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lensPath.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lensProp.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/lensProp.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _assoc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assoc */ \"./node_modules/ramda/es/assoc.js\");\n/* harmony import */ var _lens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lens */ \"./node_modules/ramda/es/lens.js\");\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prop */ \"./node_modules/ramda/es/prop.js\");\n\n\n\n\n\n/**\n * Returns a lens whose focus is the specified property.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category Object\n * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s\n * @sig String -> Lens s a\n * @param {String} k\n * @return {Lens}\n * @see R.view, R.set, R.over\n * @example\n *\n *      var xLens = R.lensProp('x');\n *\n *      R.view(xLens, {x: 1, y: 2});            //=> 1\n *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}\n *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}\n */\nvar lensProp = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lensProp(k) {\n  return Object(_lens__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_prop__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(k), Object(_assoc__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(k));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lensProp);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lensProp.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lift.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/lift.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _liftN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liftN */ \"./node_modules/ramda/es/liftN.js\");\n\n\n\n/**\n * \"lifts\" a function of arity > 1 so that it may \"map over\" a list, Function or other\n * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).\n *\n * @func\n * @memberOf R\n * @since v0.7.0\n * @category Function\n * @sig (*... -> *) -> ([*]... -> [*])\n * @param {Function} fn The function to lift into higher context\n * @return {Function} The lifted function.\n * @see R.liftN\n * @example\n *\n *      var madd3 = R.lift((a, b, c) => a + b + c);\n *\n *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]\n *\n *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);\n *\n *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]\n */\nvar lift = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lift(fn) {\n  return Object(_liftN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(fn.length, fn);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lift);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lift.js?");

/***/ }),

/***/ "./node_modules/ramda/es/liftN.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/liftN.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _ap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ap */ \"./node_modules/ramda/es/ap.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n\n\n\n\n\n\n/**\n * \"lifts\" a function to be the specified arity, so that it may \"map over\" that\n * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).\n *\n * @func\n * @memberOf R\n * @since v0.7.0\n * @category Function\n * @sig Number -> (*... -> *) -> ([*]... -> [*])\n * @param {Function} fn The function to lift into higher context\n * @return {Function} The lifted function.\n * @see R.lift, R.ap\n * @example\n *\n *      var madd3 = R.liftN(3, (...args) => R.sum(args));\n *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]\n */\nvar liftN = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function liftN(arity, fn) {\n  var lifted = Object(_curryN__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(arity, fn);\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(arity, function () {\n    return Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_ap__WEBPACK_IMPORTED_MODULE_2__[\"default\"], Object(_map__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (liftN);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/liftN.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lt.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/lt.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns `true` if the first argument is less than the second; `false`\n * otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord a => a -> a -> Boolean\n * @param {*} a\n * @param {*} b\n * @return {Boolean}\n * @see R.gt\n * @example\n *\n *      R.lt(2, 1); //=> false\n *      R.lt(2, 2); //=> false\n *      R.lt(2, 3); //=> true\n *      R.lt('a', 'z'); //=> true\n *      R.lt('z', 'a'); //=> false\n */\nvar lt = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lt(a, b) {\n  return a < b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lt);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lt.js?");

/***/ }),

/***/ "./node_modules/ramda/es/lte.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/lte.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns `true` if the first argument is less than or equal to the second;\n * `false` otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord a => a -> a -> Boolean\n * @param {Number} a\n * @param {Number} b\n * @return {Boolean}\n * @see R.gte\n * @example\n *\n *      R.lte(2, 1); //=> false\n *      R.lte(2, 2); //=> true\n *      R.lte(2, 3); //=> true\n *      R.lte('a', 'z'); //=> true\n *      R.lte('z', 'a'); //=> false\n */\nvar lte = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function lte(a, b) {\n  return a <= b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (lte);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/lte.js?");

/***/ }),

/***/ "./node_modules/ramda/es/map.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/map.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_map */ \"./node_modules/ramda/es/internal/_map.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _internal_xmap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_xmap */ \"./node_modules/ramda/es/internal/_xmap.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n\n\n\n\n\n/**\n * Takes a function and\n * a [functor](https://github.com/fantasyland/fantasy-land#functor),\n * applies the function to each of the functor's values, and returns\n * a functor of the same shape.\n *\n * Ramda provides suitable `map` implementations for `Array` and `Object`,\n * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.\n *\n * Dispatches to the `map` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * Also treats functions as functors and will compose them together.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Functor f => (a -> b) -> f a -> f b\n * @param {Function} fn The function to be called on every element of the input `list`.\n * @param {Array} list The list to be iterated over.\n * @return {Array} The new list.\n * @see R.transduce, R.addIndex\n * @example\n *\n *      var double = x => x * 2;\n *\n *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]\n *\n *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}\n * @symb R.map(f, [a, b]) = [f(a), f(b)]\n * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }\n * @symb R.map(f, functor_o) = functor_o.map(f)\n */\nvar map = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['fantasy-land/map', 'map'], _internal_xmap__WEBPACK_IMPORTED_MODULE_4__[\"default\"], function map(fn, functor) {\n  switch (Object.prototype.toString.call(functor)) {\n    case '[object Function]':\n      return Object(_curryN__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(functor.length, function () {\n        return fn.call(this, functor.apply(this, arguments));\n      });\n    case '[object Object]':\n      return Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(function (acc, key) {\n        acc[key] = fn(functor[key]);\n        return acc;\n      }, {}, Object(_keys__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(functor));\n    default:\n      return Object(_internal_map__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(fn, functor);\n  }\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (map);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/map.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mapAccum.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/mapAccum.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * The `mapAccum` function behaves like a combination of map and reduce; it\n * applies a function to each element of a list, passing an accumulating\n * parameter from left to right, and returning a final value of this\n * accumulator together with the new list.\n *\n * The iterator function receives two arguments, *acc* and *value*, and should\n * return a tuple *[acc, value]*.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category List\n * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])\n * @param {Function} fn The function to be called on every element of the input `list`.\n * @param {*} acc The accumulator value.\n * @param {Array} list The list to iterate over.\n * @return {*} The final, accumulated value.\n * @see R.addIndex, R.mapAccumRight\n * @example\n *\n *      var digits = ['1', '2', '3', '4'];\n *      var appender = (a, b) => [a + b, a + b];\n *\n *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]\n * @symb R.mapAccum(f, a, [b, c, d]) = [\n *   f(f(f(a, b)[0], c)[0], d)[0],\n *   [\n *     f(a, b)[1],\n *     f(f(a, b)[0], c)[1],\n *     f(f(f(a, b)[0], c)[0], d)[1]\n *   ]\n * ]\n */\nvar mapAccum = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mapAccum(fn, acc, list) {\n  var idx = 0;\n  var len = list.length;\n  var result = [];\n  var tuple = [acc];\n  while (idx < len) {\n    tuple = fn(tuple[0], list[idx]);\n    result[idx] = tuple[1];\n    idx += 1;\n  }\n  return [tuple[0], result];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mapAccum);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mapAccum.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mapAccumRight.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mapAccumRight.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * The `mapAccumRight` function behaves like a combination of map and reduce; it\n * applies a function to each element of a list, passing an accumulating\n * parameter from right to left, and returning a final value of this\n * accumulator together with the new list.\n *\n * Similar to [`mapAccum`](#mapAccum), except moves through the input list from\n * the right to the left.\n *\n * The iterator function receives two arguments, *value* and *acc*, and should\n * return a tuple *[value, acc]*.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category List\n * @sig ((x, acc) -> (y, acc)) -> acc -> [x] -> ([y], acc)\n * @param {Function} fn The function to be called on every element of the input `list`.\n * @param {*} acc The accumulator value.\n * @param {Array} list The list to iterate over.\n * @return {*} The final, accumulated value.\n * @see R.addIndex, R.mapAccum\n * @example\n *\n *      var digits = ['1', '2', '3', '4'];\n *      var append = (a, b) => [a + b, a + b];\n *\n *      R.mapAccumRight(append, 5, digits); //=> [['12345', '2345', '345', '45'], '12345']\n * @symb R.mapAccumRight(f, a, [b, c, d]) = [\n *   [\n *     f(b, f(c, f(d, a)[0])[0])[1],\n *     f(c, f(d, a)[0])[1],\n *     f(d, a)[1],\n *   ]\n *   f(b, f(c, f(d, a)[0])[0])[0],\n * ]\n */\nvar mapAccumRight = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mapAccumRight(fn, acc, list) {\n  var idx = list.length - 1;\n  var result = [];\n  var tuple = [acc];\n  while (idx >= 0) {\n    tuple = fn(list[idx], tuple[0]);\n    result[idx] = tuple[1];\n    idx -= 1;\n  }\n  return [result, tuple[0]];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mapAccumRight);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mapAccumRight.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mapObjIndexed.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mapObjIndexed.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n\n/**\n * An Object-specific version of [`map`](#map). The function is applied to three\n * arguments: *(value, key, obj)*. If only the value is significant, use\n * [`map`](#map) instead.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Object\n * @sig ((*, String, Object) -> *) -> Object -> Object\n * @param {Function} fn\n * @param {Object} obj\n * @return {Object}\n * @see R.map\n * @example\n *\n *      var values = { x: 1, y: 2, z: 3 };\n *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);\n *\n *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }\n */\nvar mapObjIndexed = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mapObjIndexed(fn, obj) {\n  return Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (acc, key) {\n    acc[key] = fn(obj[key], key, obj);\n    return acc;\n  }, {}, Object(_keys__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(obj));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mapObjIndexed);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mapObjIndexed.js?");

/***/ }),

/***/ "./node_modules/ramda/es/match.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/match.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Tests a regular expression against a String. Note that this function will\n * return an empty array when there are no matches. This differs from\n * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)\n * which returns `null` when there are no matches.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category String\n * @sig RegExp -> String -> [String | Undefined]\n * @param {RegExp} rx A regular expression.\n * @param {String} str The string to match against\n * @return {Array} The list of matches or empty array.\n * @see R.test\n * @example\n *\n *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']\n *      R.match(/a/, 'b'); //=> []\n *      R.match(/a/, null); //=> TypeError: null does not have a method named \"match\"\n */\nvar match = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function match(rx, str) {\n  return str.match(rx) || [];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (match);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/match.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mathMod.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/mathMod.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isInteger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger */ \"./node_modules/ramda/es/internal/_isInteger.js\");\n\n\n\n/**\n * `mathMod` behaves like the modulo operator should mathematically, unlike the\n * `%` operator (and by extension, [`R.modulo`](#modulo)). So while\n * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer\n * arguments, and returns NaN when the modulus is zero or negative.\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category Math\n * @sig Number -> Number -> Number\n * @param {Number} m The dividend.\n * @param {Number} p the modulus.\n * @return {Number} The result of `b mod a`.\n * @see R.modulo\n * @example\n *\n *      R.mathMod(-17, 5);  //=> 3\n *      R.mathMod(17, 5);   //=> 2\n *      R.mathMod(17, -5);  //=> NaN\n *      R.mathMod(17, 0);   //=> NaN\n *      R.mathMod(17.2, 5); //=> NaN\n *      R.mathMod(17, 5.3); //=> NaN\n *\n *      var clock = R.mathMod(R.__, 12);\n *      clock(15); //=> 3\n *      clock(24); //=> 0\n *\n *      var seventeenMod = R.mathMod(17);\n *      seventeenMod(3);  //=> 2\n *      seventeenMod(4);  //=> 1\n *      seventeenMod(10); //=> 7\n */\nvar mathMod = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mathMod(m, p) {\n  if (!Object(_internal_isInteger__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(m)) {\n    return NaN;\n  }\n  if (!Object(_internal_isInteger__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(p) || p < 1) {\n    return NaN;\n  }\n  return (m % p + p) % p;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mathMod);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mathMod.js?");

/***/ }),

/***/ "./node_modules/ramda/es/max.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/max.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns the larger of its two arguments.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord a => a -> a -> a\n * @param {*} a\n * @param {*} b\n * @return {*}\n * @see R.maxBy, R.min\n * @example\n *\n *      R.max(789, 123); //=> 789\n *      R.max('a', 'b'); //=> 'b'\n */\nvar max = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function max(a, b) {\n  return b > a ? b : a;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (max);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/max.js?");

/***/ }),

/***/ "./node_modules/ramda/es/maxBy.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/maxBy.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Takes a function and two values, and returns whichever value produces the\n * larger result when passed to the provided function.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Relation\n * @sig Ord b => (a -> b) -> a -> a -> a\n * @param {Function} f\n * @param {*} a\n * @param {*} b\n * @return {*}\n * @see R.max, R.minBy\n * @example\n *\n *      //  square :: Number -> Number\n *      var square = n => n * n;\n *\n *      R.maxBy(square, -3, 2); //=> -3\n *\n *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5\n *      R.reduce(R.maxBy(square), 0, []); //=> 0\n */\nvar maxBy = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function maxBy(f, a, b) {\n  return f(b) > f(a) ? b : a;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (maxBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/maxBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mean.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/mean.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _sum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sum */ \"./node_modules/ramda/es/sum.js\");\n\n\n\n/**\n * Returns the mean of the given list of numbers.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category Math\n * @sig [Number] -> Number\n * @param {Array} list\n * @return {Number}\n * @see R.median\n * @example\n *\n *      R.mean([2, 7, 9]); //=> 6\n *      R.mean([]); //=> NaN\n */\nvar mean = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mean(list) {\n  return Object(_sum__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(list) / list.length;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mean);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mean.js?");

/***/ }),

/***/ "./node_modules/ramda/es/median.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/median.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _mean__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mean */ \"./node_modules/ramda/es/mean.js\");\n\n\n\n/**\n * Returns the median of the given list of numbers.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category Math\n * @sig [Number] -> Number\n * @param {Array} list\n * @return {Number}\n * @see R.mean\n * @example\n *\n *      R.median([2, 9, 7]); //=> 7\n *      R.median([7, 2, 10, 9]); //=> 8\n *      R.median([]); //=> NaN\n */\nvar median = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function median(list) {\n  var len = list.length;\n  if (len === 0) {\n    return NaN;\n  }\n  var width = 2 - len % 2;\n  var idx = (len - width) / 2;\n  return Object(_mean__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Array.prototype.slice.call(list, 0).sort(function (a, b) {\n    return a < b ? -1 : a > b ? 1 : 0;\n  }).slice(idx, idx + width));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (median);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/median.js?");

/***/ }),

/***/ "./node_modules/ramda/es/memoize.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/memoize.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _memoizeWith__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memoizeWith */ \"./node_modules/ramda/es/memoizeWith.js\");\n/* harmony import */ var _toString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toString */ \"./node_modules/ramda/es/toString.js\");\n\n\n\n/**\n * Creates a new function that, when invoked, caches the result of calling `fn`\n * for a given argument set and returns the result. Subsequent calls to the\n * memoized `fn` with the same argument set will not result in an additional\n * call to `fn`; instead, the cached result for that set of arguments will be\n * returned.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig (*... -> a) -> (*... -> a)\n * @param {Function} fn The function to memoize.\n * @return {Function} Memoized version of `fn`.\n * @see R.memoizeWith\n * @deprecated since v0.25.0\n * @example\n *\n *      let count = 0;\n *      const factorial = R.memoize(n => {\n *        count += 1;\n *        return R.product(R.range(1, n + 1));\n *      });\n *      factorial(5); //=> 120\n *      factorial(5); //=> 120\n *      factorial(5); //=> 120\n *      count; //=> 1\n */\nvar memoize = /*#__PURE__*/Object(_memoizeWith__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n  return Object(_toString__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arguments);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (memoize);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/memoize.js?");

/***/ }),

/***/ "./node_modules/ramda/es/memoizeWith.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/memoizeWith.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\n\n\n/**\n * A customisable version of [`R.memoize`](#memoize). `memoizeWith` takes an\n * additional function that will be applied to a given argument set and used to\n * create the cache key under which the results of the function to be memoized\n * will be stored. Care must be taken when implementing key generation to avoid\n * clashes that may overwrite previous entries erroneously.\n *\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category Function\n * @sig (*... -> String) -> (*... -> a) -> (*... -> a)\n * @param {Function} fn The function to generate the cache key.\n * @param {Function} fn The function to memoize.\n * @return {Function} Memoized version of `fn`.\n * @see R.memoize\n * @example\n *\n *      let count = 0;\n *      const factorial = R.memoizeWith(R.identity, n => {\n *        count += 1;\n *        return R.product(R.range(1, n + 1));\n *      });\n *      factorial(5); //=> 120\n *      factorial(5); //=> 120\n *      factorial(5); //=> 120\n *      count; //=> 1\n */\nvar memoizeWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function memoizeWith(mFn, fn) {\n  var cache = {};\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fn.length, function () {\n    var key = mFn.apply(this, arguments);\n    if (!Object(_internal_has__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(key, cache)) {\n      cache[key] = fn.apply(this, arguments);\n    }\n    return cache[key];\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (memoizeWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/memoizeWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/merge.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/merge.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_assign */ \"./node_modules/ramda/es/internal/_assign.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Create a new object with the own properties of the first object merged with\n * the own properties of the second object. If a key exists in both objects,\n * the value from the second object will be used.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig {k: v} -> {k: v} -> {k: v}\n * @param {Object} l\n * @param {Object} r\n * @return {Object}\n * @see R.mergeDeepRight, R.mergeWith, R.mergeWithKey\n * @example\n *\n *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });\n *      //=> { 'name': 'fred', 'age': 40 }\n *\n *      var resetToDefault = R.merge(R.__, {x: 0});\n *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}\n * @symb R.merge({ x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: 5, z: 3 }\n */\nvar merge = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function merge(l, r) {\n  return Object(_internal_assign__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, l, r);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (merge);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/merge.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mergeAll.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/mergeAll.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_assign */ \"./node_modules/ramda/es/internal/_assign.js\");\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n\n/**\n * Merges a list of objects together into one object.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category List\n * @sig [{k: v}] -> {k: v}\n * @param {Array} list An array of objects\n * @return {Object} A merged object.\n * @see R.reduce\n * @example\n *\n *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}\n *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}\n * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }\n */\nvar mergeAll = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function mergeAll(list) {\n  return _internal_assign__WEBPACK_IMPORTED_MODULE_0__[\"default\"].apply(null, [{}].concat(list));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mergeAll);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mergeAll.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepLeft.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepLeft.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey */ \"./node_modules/ramda/es/mergeDeepWithKey.js\");\n\n\n\n/**\n * Creates a new object with the own properties of the first object merged with\n * the own properties of the second object. If a key exists in both objects:\n * - and both values are objects, the two values will be recursively merged\n * - otherwise the value from the first object will be used.\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category Object\n * @sig {a} -> {a} -> {a}\n * @param {Object} lObj\n * @param {Object} rObj\n * @return {Object}\n * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey\n * @example\n *\n *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},\n *                      { age: 40, contact: { email: 'baa@example.com' }});\n *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}\n */\nvar mergeDeepLeft = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mergeDeepLeft(lObj, rObj) {\n  return Object(_mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (k, lVal, rVal) {\n    return lVal;\n  }, lObj, rObj);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mergeDeepLeft);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mergeDeepLeft.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepRight.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepRight.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey */ \"./node_modules/ramda/es/mergeDeepWithKey.js\");\n\n\n\n/**\n * Creates a new object with the own properties of the first object merged with\n * the own properties of the second object. If a key exists in both objects:\n * - and both values are objects, the two values will be recursively merged\n * - otherwise the value from the second object will be used.\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category Object\n * @sig {a} -> {a} -> {a}\n * @param {Object} lObj\n * @param {Object} rObj\n * @return {Object}\n * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey\n * @example\n *\n *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},\n *                       { age: 40, contact: { email: 'baa@example.com' }});\n *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}\n */\nvar mergeDeepRight = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mergeDeepRight(lObj, rObj) {\n  return Object(_mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (k, lVal, rVal) {\n    return rVal;\n  }, lObj, rObj);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mergeDeepRight);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mergeDeepRight.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepWith.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepWith.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey */ \"./node_modules/ramda/es/mergeDeepWithKey.js\");\n\n\n\n/**\n * Creates a new object with the own properties of the two provided objects.\n * If a key exists in both objects:\n * - and both associated values are also objects then the values will be\n *   recursively merged.\n * - otherwise the provided function is applied to associated values using the\n *   resulting value as the new value associated with the key.\n * If a key only exists in one object, the value will be associated with the key\n * of the resulting object.\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category Object\n * @sig ((a, a) -> a) -> {a} -> {a} -> {a}\n * @param {Function} fn\n * @param {Object} lObj\n * @param {Object} rObj\n * @return {Object}\n * @see R.mergeWith, R.mergeDeep, R.mergeDeepWithKey\n * @example\n *\n *      R.mergeDeepWith(R.concat,\n *                      { a: true, c: { values: [10, 20] }},\n *                      { b: true, c: { values: [15, 35] }});\n *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}\n */\nvar mergeDeepWith = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mergeDeepWith(fn, lObj, rObj) {\n  return Object(_mergeDeepWithKey__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (k, lVal, rVal) {\n    return fn(lVal, rVal);\n  }, lObj, rObj);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mergeDeepWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mergeDeepWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepWithKey.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepWithKey.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _internal_isObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isObject */ \"./node_modules/ramda/es/internal/_isObject.js\");\n/* harmony import */ var _mergeWithKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeWithKey */ \"./node_modules/ramda/es/mergeWithKey.js\");\n\n\n\n\n/**\n * Creates a new object with the own properties of the two provided objects.\n * If a key exists in both objects:\n * - and both associated values are also objects then the values will be\n *   recursively merged.\n * - otherwise the provided function is applied to the key and associated values\n *   using the resulting value as the new value associated with the key.\n * If a key only exists in one object, the value will be associated with the key\n * of the resulting object.\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category Object\n * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}\n * @param {Function} fn\n * @param {Object} lObj\n * @param {Object} rObj\n * @return {Object}\n * @see R.mergeWithKey, R.mergeDeep, R.mergeDeepWith\n * @example\n *\n *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r\n *      R.mergeDeepWithKey(concatValues,\n *                         { a: true, c: { thing: 'foo', values: [10, 20] }},\n *                         { b: true, c: { thing: 'bar', values: [15, 35] }});\n *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}\n */\nvar mergeDeepWithKey = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mergeDeepWithKey(fn, lObj, rObj) {\n  return Object(_mergeWithKey__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function (k, lVal, rVal) {\n    if (Object(_internal_isObject__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(lVal) && Object(_internal_isObject__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rVal)) {\n      return mergeDeepWithKey(fn, lVal, rVal);\n    } else {\n      return fn(k, lVal, rVal);\n    }\n  }, lObj, rObj);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mergeDeepWithKey);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mergeDeepWithKey.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mergeWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/mergeWith.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _mergeWithKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeWithKey */ \"./node_modules/ramda/es/mergeWithKey.js\");\n\n\n\n/**\n * Creates a new object with the own properties of the two provided objects. If\n * a key exists in both objects, the provided function is applied to the values\n * associated with the key in each object, with the result being used as the\n * value associated with the key in the returned object.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category Object\n * @sig ((a, a) -> a) -> {a} -> {a} -> {a}\n * @param {Function} fn\n * @param {Object} l\n * @param {Object} r\n * @return {Object}\n * @see R.mergeDeepWith, R.merge, R.mergeWithKey\n * @example\n *\n *      R.mergeWith(R.concat,\n *                  { a: true, values: [10, 20] },\n *                  { b: true, values: [15, 35] });\n *      //=> { a: true, b: true, values: [10, 20, 15, 35] }\n */\nvar mergeWith = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mergeWith(fn, l, r) {\n  return Object(_mergeWithKey__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (_, _l, _r) {\n    return fn(_l, _r);\n  }, l, r);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mergeWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mergeWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/mergeWithKey.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/mergeWithKey.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\n\n/**\n * Creates a new object with the own properties of the two provided objects. If\n * a key exists in both objects, the provided function is applied to the key\n * and the values associated with the key in each object, with the result being\n * used as the value associated with the key in the returned object.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category Object\n * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}\n * @param {Function} fn\n * @param {Object} l\n * @param {Object} r\n * @return {Object}\n * @see R.mergeDeepWithKey, R.merge, R.mergeWith\n * @example\n *\n *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r\n *      R.mergeWithKey(concatValues,\n *                     { a: true, thing: 'foo', values: [10, 20] },\n *                     { b: true, thing: 'bar', values: [15, 35] });\n *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }\n * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }\n */\nvar mergeWithKey = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function mergeWithKey(fn, l, r) {\n  var result = {};\n  var k;\n\n  for (k in l) {\n    if (Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(k, l)) {\n      result[k] = Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(k, r) ? fn(k, l[k], r[k]) : l[k];\n    }\n  }\n\n  for (k in r) {\n    if (Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(k, r) && !Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(k, result)) {\n      result[k] = r[k];\n    }\n  }\n\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mergeWithKey);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/mergeWithKey.js?");

/***/ }),

/***/ "./node_modules/ramda/es/min.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/min.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns the smaller of its two arguments.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord a => a -> a -> a\n * @param {*} a\n * @param {*} b\n * @return {*}\n * @see R.minBy, R.max\n * @example\n *\n *      R.min(789, 123); //=> 123\n *      R.min('a', 'b'); //=> 'a'\n */\nvar min = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function min(a, b) {\n  return b < a ? b : a;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (min);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/min.js?");

/***/ }),

/***/ "./node_modules/ramda/es/minBy.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/minBy.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Takes a function and two values, and returns whichever value produces the\n * smaller result when passed to the provided function.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Relation\n * @sig Ord b => (a -> b) -> a -> a -> a\n * @param {Function} f\n * @param {*} a\n * @param {*} b\n * @return {*}\n * @see R.min, R.maxBy\n * @example\n *\n *      //  square :: Number -> Number\n *      var square = n => n * n;\n *\n *      R.minBy(square, -3, 2); //=> 2\n *\n *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1\n *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity\n */\nvar minBy = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function minBy(f, a, b) {\n  return f(b) < f(a) ? b : a;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (minBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/minBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/modulo.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/modulo.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Divides the first parameter by the second and returns the remainder. Note\n * that this function preserves the JavaScript-style behavior for modulo. For\n * mathematical modulo see [`mathMod`](#mathMod).\n *\n * @func\n * @memberOf R\n * @since v0.1.1\n * @category Math\n * @sig Number -> Number -> Number\n * @param {Number} a The value to the divide.\n * @param {Number} b The pseudo-modulus\n * @return {Number} The result of `b % a`.\n * @see R.mathMod\n * @example\n *\n *      R.modulo(17, 3); //=> 2\n *      // JS behavior:\n *      R.modulo(-17, 3); //=> -2\n *      R.modulo(17, -3); //=> 2\n *\n *      var isOdd = R.modulo(R.__, 2);\n *      isOdd(42); //=> 0\n *      isOdd(21); //=> 1\n */\nvar modulo = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function modulo(a, b) {\n  return a % b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (modulo);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/modulo.js?");

/***/ }),

/***/ "./node_modules/ramda/es/multiply.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/multiply.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Multiplies two numbers. Equivalent to `a * b` but curried.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Math\n * @sig Number -> Number -> Number\n * @param {Number} a The first value.\n * @param {Number} b The second value.\n * @return {Number} The result of `a * b`.\n * @see R.divide\n * @example\n *\n *      var double = R.multiply(2);\n *      var triple = R.multiply(3);\n *      double(3);       //=>  6\n *      triple(4);       //=> 12\n *      R.multiply(2, 5);  //=> 10\n */\nvar multiply = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function multiply(a, b) {\n  return a * b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (multiply);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/multiply.js?");

/***/ }),

/***/ "./node_modules/ramda/es/nAry.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/nAry.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Wraps a function of any arity (including nullary) in a function that accepts\n * exactly `n` parameters. Any extraneous parameters will not be passed to the\n * supplied function.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig Number -> (* -> a) -> (* -> a)\n * @param {Number} n The desired arity of the new function.\n * @param {Function} fn The function to wrap.\n * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of\n *         arity `n`.\n * @see R.binary, R.unary\n * @example\n *\n *      var takesTwoArgs = (a, b) => [a, b];\n *\n *      takesTwoArgs.length; //=> 2\n *      takesTwoArgs(1, 2); //=> [1, 2]\n *\n *      var takesOneArg = R.nAry(1, takesTwoArgs);\n *      takesOneArg.length; //=> 1\n *      // Only `n` arguments are passed to the wrapped function\n *      takesOneArg(1, 2); //=> [1, undefined]\n * @symb R.nAry(0, f)(a, b) = f()\n * @symb R.nAry(1, f)(a, b) = f(a)\n * @symb R.nAry(2, f)(a, b) = f(a, b)\n */\nvar nAry = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function nAry(n, fn) {\n  switch (n) {\n    case 0:\n      return function () {\n        return fn.call(this);\n      };\n    case 1:\n      return function (a0) {\n        return fn.call(this, a0);\n      };\n    case 2:\n      return function (a0, a1) {\n        return fn.call(this, a0, a1);\n      };\n    case 3:\n      return function (a0, a1, a2) {\n        return fn.call(this, a0, a1, a2);\n      };\n    case 4:\n      return function (a0, a1, a2, a3) {\n        return fn.call(this, a0, a1, a2, a3);\n      };\n    case 5:\n      return function (a0, a1, a2, a3, a4) {\n        return fn.call(this, a0, a1, a2, a3, a4);\n      };\n    case 6:\n      return function (a0, a1, a2, a3, a4, a5) {\n        return fn.call(this, a0, a1, a2, a3, a4, a5);\n      };\n    case 7:\n      return function (a0, a1, a2, a3, a4, a5, a6) {\n        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);\n      };\n    case 8:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7) {\n        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);\n      };\n    case 9:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {\n        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);\n      };\n    case 10:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {\n        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);\n      };\n    default:\n      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (nAry);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/nAry.js?");

/***/ }),

/***/ "./node_modules/ramda/es/negate.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/negate.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Negates its argument.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Math\n * @sig Number -> Number\n * @param {Number} n\n * @return {Number}\n * @example\n *\n *      R.negate(42); //=> -42\n */\nvar negate = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function negate(n) {\n  return -n;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (negate);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/negate.js?");

/***/ }),

/***/ "./node_modules/ramda/es/none.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/none.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_complement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_complement */ \"./node_modules/ramda/es/internal/_complement.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xany__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xany */ \"./node_modules/ramda/es/internal/_xany.js\");\n/* harmony import */ var _any__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./any */ \"./node_modules/ramda/es/any.js\");\n\n\n\n\n\n\n/**\n * Returns `true` if no elements of the list match the predicate, `false`\n * otherwise.\n *\n * Dispatches to the `any` method of the second argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> Boolean\n * @param {Function} fn The predicate function.\n * @param {Array} list The array to consider.\n * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.\n * @see R.all, R.any\n * @example\n *\n *      var isEven = n => n % 2 === 0;\n *      var isOdd = n => n % 2 === 1;\n *\n *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true\n *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false\n */\nvar none = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_internal_complement__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(['any'], _internal_xany__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _any__WEBPACK_IMPORTED_MODULE_4__[\"default\"])));\n/* harmony default export */ __webpack_exports__[\"default\"] = (none);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/none.js?");

/***/ }),

/***/ "./node_modules/ramda/es/not.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/not.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * A function that returns the `!` of its argument. It will return `true` when\n * passed false-y value, and `false` when passed a truth-y one.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Logic\n * @sig * -> Boolean\n * @param {*} a any value\n * @return {Boolean} the logical inverse of passed argument.\n * @see R.complement\n * @example\n *\n *      R.not(true); //=> false\n *      R.not(false); //=> true\n *      R.not(0); //=> true\n *      R.not(1); //=> false\n */\nvar not = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function not(a) {\n  return !a;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (not);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/not.js?");

/***/ }),

/***/ "./node_modules/ramda/es/nth.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/nth.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString */ \"./node_modules/ramda/es/internal/_isString.js\");\n\n\n\n/**\n * Returns the nth element of the given list or string. If n is negative the\n * element at index length + n is returned.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Number -> [a] -> a | Undefined\n * @sig Number -> String -> String\n * @param {Number} offset\n * @param {*} list\n * @return {*}\n * @example\n *\n *      var list = ['foo', 'bar', 'baz', 'quux'];\n *      R.nth(1, list); //=> 'bar'\n *      R.nth(-1, list); //=> 'quux'\n *      R.nth(-99, list); //=> undefined\n *\n *      R.nth(2, 'abc'); //=> 'c'\n *      R.nth(3, 'abc'); //=> ''\n * @symb R.nth(-1, [a, b, c]) = c\n * @symb R.nth(0, [a, b, c]) = a\n * @symb R.nth(1, [a, b, c]) = b\n */\nvar nth = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function nth(offset, list) {\n  var idx = offset < 0 ? list.length + offset : offset;\n  return Object(_internal_isString__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(list) ? list.charAt(idx) : list[idx];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (nth);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/nth.js?");

/***/ }),

/***/ "./node_modules/ramda/es/nthArg.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/nthArg.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _nth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth */ \"./node_modules/ramda/es/nth.js\");\n\n\n\n\n/**\n * Returns a function which returns its nth argument.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category Function\n * @sig Number -> *... -> *\n * @param {Number} n\n * @return {Function}\n * @example\n *\n *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'\n *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'\n * @symb R.nthArg(-1)(a, b, c) = c\n * @symb R.nthArg(0)(a, b, c) = a\n * @symb R.nthArg(1)(a, b, c) = b\n */\nvar nthArg = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function nthArg(n) {\n  var arity = n < 0 ? 1 : n + 1;\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arity, function () {\n    return Object(_nth__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(n, arguments);\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (nthArg);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/nthArg.js?");

/***/ }),

/***/ "./node_modules/ramda/es/o.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/o.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * `o` is a curried composition function that returns a unary function.\n * Like [`compose`](#compose), `o` performs right-to-left function composition.\n * Unlike [`compose`](#compose), the rightmost function passed to `o` will be\n * invoked with only one argument.\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category Function\n * @sig (b -> c) -> (a -> b) -> a -> c\n * @param {Function} f\n * @param {Function} g\n * @return {Function}\n * @see R.compose, R.pipe\n * @example\n *\n *      var classyGreeting = name => \"The name's \" + name.last + \", \" + name.first + \" \" + name.last\n *      var yellGreeting = R.o(R.toUpper, classyGreeting);\n *      yellGreeting({first: 'James', last: 'Bond'}); //=> \"THE NAME'S BOND, JAMES BOND\"\n *\n *      R.o(R.multiply(10), R.add(10))(-4) //=> 60\n *\n * @symb R.o(f, g, x) = f(g(x))\n */\nvar o = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function o(f, g, x) {\n  return f(g(x));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (o);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/o.js?");

/***/ }),

/***/ "./node_modules/ramda/es/objOf.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/objOf.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Creates an object containing a single key:value pair.\n *\n * @func\n * @memberOf R\n * @since v0.18.0\n * @category Object\n * @sig String -> a -> {String:a}\n * @param {String} key\n * @param {*} val\n * @return {Object}\n * @see R.pair\n * @example\n *\n *      var matchPhrases = R.compose(\n *        R.objOf('must'),\n *        R.map(R.objOf('match_phrase'))\n *      );\n *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}\n */\nvar objOf = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function objOf(key, val) {\n  var obj = {};\n  obj[key] = val;\n  return obj;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (objOf);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/objOf.js?");

/***/ }),

/***/ "./node_modules/ramda/es/of.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/of.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_of */ \"./node_modules/ramda/es/internal/_of.js\");\n\n\n\n/**\n * Returns a singleton array containing the value provided.\n *\n * Note this `of` is different from the ES6 `of`; See\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category Function\n * @sig a -> [a]\n * @param {*} x any value\n * @return {Array} An array wrapping `x`.\n * @example\n *\n *      R.of(null); //=> [null]\n *      R.of([42]); //=> [[42]]\n */\nvar of = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_internal_of__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (of);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/of.js?");

/***/ }),

/***/ "./node_modules/ramda/es/omit.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/omit.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns a partial copy of an object omitting the keys specified.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig [String] -> {String: *} -> {String: *}\n * @param {Array} names an array of String property names to omit from the new object\n * @param {Object} obj The object to copy from\n * @return {Object} A new object with properties from `names` not on it.\n * @see R.pick\n * @example\n *\n *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}\n */\nvar omit = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function omit(names, obj) {\n  var result = {};\n  var index = {};\n  var idx = 0;\n  var len = names.length;\n\n  while (idx < len) {\n    index[names[idx]] = 1;\n    idx += 1;\n  }\n\n  for (var prop in obj) {\n    if (!index.hasOwnProperty(prop)) {\n      result[prop] = obj[prop];\n    }\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (omit);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/omit.js?");

/***/ }),

/***/ "./node_modules/ramda/es/once.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/once.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n\n/**\n * Accepts a function `fn` and returns a function that guards invocation of\n * `fn` such that `fn` can only ever be called once, no matter how many times\n * the returned function is invoked. The first value calculated is returned in\n * subsequent invocations.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig (a... -> b) -> (a... -> b)\n * @param {Function} fn The function to wrap in a call-only-once wrapper.\n * @return {Function} The wrapped function.\n * @example\n *\n *      var addOneOnce = R.once(x => x + 1);\n *      addOneOnce(10); //=> 11\n *      addOneOnce(addOneOnce(50)); //=> 11\n */\nvar once = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function once(fn) {\n  var called = false;\n  var result;\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fn.length, function () {\n    if (called) {\n      return result;\n    }\n    called = true;\n    result = fn.apply(this, arguments);\n    return result;\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (once);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/once.js?");

/***/ }),

/***/ "./node_modules/ramda/es/or.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/or.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns `true` if one or both of its arguments are `true`. Returns `false`\n * if both arguments are `false`.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Logic\n * @sig a -> b -> a | b\n * @param {Any} a\n * @param {Any} b\n * @return {Any} the first argument if truthy, otherwise the second argument.\n * @see R.either\n * @example\n *\n *      R.or(true, true); //=> true\n *      R.or(true, false); //=> true\n *      R.or(false, true); //=> true\n *      R.or(false, false); //=> false\n */\nvar or = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function or(a, b) {\n  return a || b;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (or);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/or.js?");

/***/ }),

/***/ "./node_modules/ramda/es/over.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/over.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n// `Identity` is a functor that holds a single value, where `map` simply\n// transforms the held value with the provided function.\nvar Identity = function (x) {\n  return { value: x, map: function (f) {\n      return Identity(f(x));\n    } };\n};\n\n/**\n * Returns the result of \"setting\" the portion of the given data structure\n * focused by the given lens to the result of applying the given function to\n * the focused value.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category Object\n * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s\n * @sig Lens s a -> (a -> a) -> s -> s\n * @param {Lens} lens\n * @param {*} v\n * @param {*} x\n * @return {*}\n * @see R.prop, R.lensIndex, R.lensProp\n * @example\n *\n *      var headLens = R.lensIndex(0);\n *\n *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']\n */\nvar over = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function over(lens, f, x) {\n  // The value returned by the getter function is first transformed with `f`,\n  // then set as the value of an `Identity`. This is then mapped over with the\n  // setter function of the lens.\n  return lens(function (y) {\n    return Identity(f(y));\n  })(x).value;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (over);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/over.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pair.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pair.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.\n *\n * @func\n * @memberOf R\n * @since v0.18.0\n * @category List\n * @sig a -> b -> (a,b)\n * @param {*} fst\n * @param {*} snd\n * @return {Array}\n * @see R.objOf, R.of\n * @example\n *\n *      R.pair('foo', 'bar'); //=> ['foo', 'bar']\n */\nvar pair = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pair(fst, snd) {\n  return [fst, snd];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pair);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pair.js?");

/***/ }),

/***/ "./node_modules/ramda/es/partial.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/partial.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_createPartialApplicator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_createPartialApplicator */ \"./node_modules/ramda/es/internal/_createPartialApplicator.js\");\n\n\n\n/**\n * Takes a function `f` and a list of arguments, and returns a function `g`.\n * When applied, `g` returns the result of applying `f` to the arguments\n * provided initially followed by the arguments provided to `g`.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category Function\n * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)\n * @param {Function} f\n * @param {Array} args\n * @return {Function}\n * @see R.partialRight\n * @example\n *\n *      var multiply2 = (a, b) => a * b;\n *      var double = R.partial(multiply2, [2]);\n *      double(2); //=> 4\n *\n *      var greet = (salutation, title, firstName, lastName) =>\n *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';\n *\n *      var sayHello = R.partial(greet, ['Hello']);\n *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);\n *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'\n * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)\n */\nvar partial = /*#__PURE__*/Object(_internal_createPartialApplicator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (partial);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/partial.js?");

/***/ }),

/***/ "./node_modules/ramda/es/partialRight.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/partialRight.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_createPartialApplicator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_createPartialApplicator */ \"./node_modules/ramda/es/internal/_createPartialApplicator.js\");\n/* harmony import */ var _flip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flip */ \"./node_modules/ramda/es/flip.js\");\n\n\n\n\n/**\n * Takes a function `f` and a list of arguments, and returns a function `g`.\n * When applied, `g` returns the result of applying `f` to the arguments\n * provided to `g` followed by the arguments provided initially.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category Function\n * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)\n * @param {Function} f\n * @param {Array} args\n * @return {Function}\n * @see R.partial\n * @example\n *\n *      var greet = (salutation, title, firstName, lastName) =>\n *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';\n *\n *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);\n *\n *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'\n * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)\n */\nvar partialRight = /*#__PURE__*/Object(_internal_createPartialApplicator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_flip__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (partialRight);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/partialRight.js?");

/***/ }),

/***/ "./node_modules/ramda/es/partition.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/partition.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter */ \"./node_modules/ramda/es/filter.js\");\n/* harmony import */ var _juxt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./juxt */ \"./node_modules/ramda/es/juxt.js\");\n/* harmony import */ var _reject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reject */ \"./node_modules/ramda/es/reject.js\");\n\n\n\n\n/**\n * Takes a predicate and a list or other `Filterable` object and returns the\n * pair of filterable objects of the same type of elements which do and do not\n * satisfy, the predicate, respectively. Filterable objects include plain objects or any object\n * that has a filter method such as `Array`.\n *\n * @func\n * @memberOf R\n * @since v0.1.4\n * @category List\n * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]\n * @param {Function} pred A predicate to determine which side the element belongs to.\n * @param {Array} filterable the list (or other filterable) to partition.\n * @return {Array} An array, containing first the subset of elements that satisfy the\n *         predicate, and second the subset of elements that do not satisfy.\n * @see R.filter, R.reject\n * @example\n *\n *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);\n *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]\n *\n *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });\n *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]\n */\nvar partition = /*#__PURE__*/Object(_juxt__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([_filter__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _reject__WEBPACK_IMPORTED_MODULE_2__[\"default\"]]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (partition);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/partition.js?");

/***/ }),

/***/ "./node_modules/ramda/es/path.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/path.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Retrieve the value at a given path.\n *\n * @func\n * @memberOf R\n * @since v0.2.0\n * @category Object\n * @typedefn Idx = String | Int\n * @sig [Idx] -> {a} -> a | Undefined\n * @param {Array} path The path to use.\n * @param {Object} obj The object to retrieve the nested property from.\n * @return {*} The data at `path`.\n * @see R.prop\n * @example\n *\n *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2\n *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined\n */\nvar path = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function path(paths, obj) {\n  var val = obj;\n  var idx = 0;\n  while (idx < paths.length) {\n    if (val == null) {\n      return;\n    }\n    val = val[paths[idx]];\n    idx += 1;\n  }\n  return val;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (path);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/path.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pathEq.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pathEq.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path */ \"./node_modules/ramda/es/path.js\");\n\n\n\n\n/**\n * Determines whether a nested path on an object has a specific value, in\n * [`R.equals`](#equals) terms. Most likely used to filter a list.\n *\n * @func\n * @memberOf R\n * @since v0.7.0\n * @category Relation\n * @typedefn Idx = String | Int\n * @sig [Idx] -> a -> {a} -> Boolean\n * @param {Array} path The path of the nested property to use\n * @param {*} val The value to compare the nested property with\n * @param {Object} obj The object to check the nested property in\n * @return {Boolean} `true` if the value equals the nested object property,\n *         `false` otherwise.\n * @example\n *\n *      var user1 = { address: { zipCode: 90210 } };\n *      var user2 = { address: { zipCode: 55555 } };\n *      var user3 = { name: 'Bob' };\n *      var users = [ user1, user2, user3 ];\n *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);\n *      R.filter(isFamous, users); //=> [ user1 ]\n */\nvar pathEq = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pathEq(_path, val, obj) {\n  return Object(_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_path__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_path, obj), val);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pathEq);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pathEq.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pathOr.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pathOr.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _defaultTo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultTo */ \"./node_modules/ramda/es/defaultTo.js\");\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path */ \"./node_modules/ramda/es/path.js\");\n\n\n\n\n/**\n * If the given, non-null object has a value at the given path, returns the\n * value at that path. Otherwise returns the provided default value.\n *\n * @func\n * @memberOf R\n * @since v0.18.0\n * @category Object\n * @typedefn Idx = String | Int\n * @sig a -> [Idx] -> {a} -> a\n * @param {*} d The default value.\n * @param {Array} p The path to use.\n * @param {Object} obj The object to retrieve the nested property from.\n * @return {*} The data at `path` of the supplied object or the default value.\n * @example\n *\n *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2\n *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> \"N/A\"\n */\nvar pathOr = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pathOr(d, p, obj) {\n  return Object(_defaultTo__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(d, Object(_path__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(p, obj));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pathOr);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pathOr.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pathSatisfies.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/pathSatisfies.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path */ \"./node_modules/ramda/es/path.js\");\n\n\n\n/**\n * Returns `true` if the specified object property at given path satisfies the\n * given predicate; `false` otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category Logic\n * @typedefn Idx = String | Int\n * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean\n * @param {Function} pred\n * @param {Array} propPath\n * @param {*} obj\n * @return {Boolean}\n * @see R.propSatisfies, R.path\n * @example\n *\n *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true\n */\nvar pathSatisfies = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pathSatisfies(pred, propPath, obj) {\n  return propPath.length > 0 && pred(Object(_path__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(propPath, obj));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pathSatisfies);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pathSatisfies.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pick.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pick.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns a partial copy of an object containing only the keys specified. If\n * the key does not exist, the property is ignored.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig [k] -> {k: v} -> {k: v}\n * @param {Array} names an array of String property names to copy onto a new object\n * @param {Object} obj The object to copy from\n * @return {Object} A new object with only properties from `names` on it.\n * @see R.omit, R.props\n * @example\n *\n *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}\n *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}\n */\nvar pick = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pick(names, obj) {\n  var result = {};\n  var idx = 0;\n  while (idx < names.length) {\n    if (names[idx] in obj) {\n      result[names[idx]] = obj[names[idx]];\n    }\n    idx += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pick);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pick.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pickAll.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/pickAll.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Similar to `pick` except that this one includes a `key: undefined` pair for\n * properties that don't exist.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig [k] -> {k: v} -> {k: v}\n * @param {Array} names an array of String property names to copy onto a new object\n * @param {Object} obj The object to copy from\n * @return {Object} A new object with only properties from `names` on it.\n * @see R.pick\n * @example\n *\n *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}\n *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}\n */\nvar pickAll = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pickAll(names, obj) {\n  var result = {};\n  var idx = 0;\n  var len = names.length;\n  while (idx < len) {\n    var name = names[idx];\n    result[name] = obj[name];\n    idx += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pickAll);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pickAll.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pickBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pickBy.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns a partial copy of an object containing only the keys that satisfy\n * the supplied predicate.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Object\n * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}\n * @param {Function} pred A predicate to determine whether or not a key\n *        should be included on the output object.\n * @param {Object} obj The object to copy from\n * @return {Object} A new object with only properties that satisfy `pred`\n *         on it.\n * @see R.pick, R.filter\n * @example\n *\n *      var isUpperCase = (val, key) => key.toUpperCase() === key;\n *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}\n */\nvar pickBy = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pickBy(test, obj) {\n  var result = {};\n  for (var prop in obj) {\n    if (test(obj[prop], prop, obj)) {\n      result[prop] = obj[prop];\n    }\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pickBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pickBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pipe.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pipe.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return pipe; });\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_pipe */ \"./node_modules/ramda/es/internal/_pipe.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n/* harmony import */ var _tail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tail */ \"./node_modules/ramda/es/tail.js\");\n\n\n\n\n\n/**\n * Performs left-to-right function composition. The leftmost function may have\n * any arity; the remaining functions must be unary.\n *\n * In some libraries this function is named `sequence`.\n *\n * **Note:** The result of pipe is not automatically curried.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)\n * @param {...Function} functions\n * @return {Function}\n * @see R.compose\n * @example\n *\n *      var f = R.pipe(Math.pow, R.negate, R.inc);\n *\n *      f(3, 4); // -(3^4) + 1\n * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))\n */\nfunction pipe() {\n  if (arguments.length === 0) {\n    throw new Error('pipe requires at least one argument');\n  }\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arguments[0].length, Object(_reduce__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_internal_pipe__WEBPACK_IMPORTED_MODULE_1__[\"default\"], arguments[0], Object(_tail__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(arguments)));\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pipe.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pipeK.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pipeK.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return pipeK; });\n/* harmony import */ var _composeK__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./composeK */ \"./node_modules/ramda/es/composeK.js\");\n/* harmony import */ var _reverse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse */ \"./node_modules/ramda/es/reverse.js\");\n\n\n\n/**\n * Returns the left-to-right Kleisli composition of the provided functions,\n * each of which must return a value of a type supported by [`chain`](#chain).\n *\n * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category Function\n * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)\n * @param {...Function}\n * @return {Function}\n * @see R.composeK\n * @example\n *\n *      //  parseJson :: String -> Maybe *\n *      //  get :: String -> Object -> Maybe *\n *\n *      //  getStateCode :: Maybe String -> Maybe String\n *      var getStateCode = R.pipeK(\n *        parseJson,\n *        get('user'),\n *        get('address'),\n *        get('state'),\n *        R.compose(Maybe.of, R.toUpper)\n *      );\n *\n *      getStateCode('{\"user\":{\"address\":{\"state\":\"ny\"}}}');\n *      //=> Just('NY')\n *      getStateCode('[Invalid JSON]');\n *      //=> Nothing()\n * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))\n */\nfunction pipeK() {\n  if (arguments.length === 0) {\n    throw new Error('pipeK requires at least one argument');\n  }\n  return _composeK__WEBPACK_IMPORTED_MODULE_0__[\"default\"].apply(this, Object(_reverse__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arguments));\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pipeK.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pipeP.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pipeP.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return pipeP; });\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_pipeP__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_pipeP */ \"./node_modules/ramda/es/internal/_pipeP.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n/* harmony import */ var _tail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tail */ \"./node_modules/ramda/es/tail.js\");\n\n\n\n\n\n/**\n * Performs left-to-right composition of one or more Promise-returning\n * functions. The leftmost function may have any arity; the remaining functions\n * must be unary.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category Function\n * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)\n * @param {...Function} functions\n * @return {Function}\n * @see R.composeP\n * @example\n *\n *      //  followersForUser :: String -> Promise [User]\n *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);\n */\nfunction pipeP() {\n  if (arguments.length === 0) {\n    throw new Error('pipeP requires at least one argument');\n  }\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arguments[0].length, Object(_reduce__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_internal_pipeP__WEBPACK_IMPORTED_MODULE_1__[\"default\"], arguments[0], Object(_tail__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(arguments)));\n}\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pipeP.js?");

/***/ }),

/***/ "./node_modules/ramda/es/pluck.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pluck.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prop */ \"./node_modules/ramda/es/prop.js\");\n\n\n\n\n/**\n * Returns a new list by plucking the same named property off all objects in\n * the list supplied.\n *\n * `pluck` will work on\n * any [functor](https://github.com/fantasyland/fantasy-land#functor) in\n * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Functor f => k -> f {k: v} -> f v\n * @param {Number|String} key The key name to pluck off of each object.\n * @param {Array} f The array or functor to consider.\n * @return {Array} The list of values for the given key.\n * @see R.props\n * @example\n *\n *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]\n *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]\n *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}\n * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]\n * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]\n */\nvar pluck = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function pluck(p, list) {\n  return Object(_map__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_prop__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(p), list);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (pluck);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/pluck.js?");

/***/ }),

/***/ "./node_modules/ramda/es/prepend.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/prepend.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Returns a new list with the given element at the front, followed by the\n * contents of the list.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig a -> [a] -> [a]\n * @param {*} el The item to add to the head of the output list.\n * @param {Array} list The array to add to the tail of the output list.\n * @return {Array} A new array.\n * @see R.append\n * @example\n *\n *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']\n */\nvar prepend = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function prepend(el, list) {\n  return Object(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([el], list);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (prepend);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/prepend.js?");

/***/ }),

/***/ "./node_modules/ramda/es/product.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/product.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _multiply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multiply */ \"./node_modules/ramda/es/multiply.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n\n\n\n/**\n * Multiplies together all the elements of a list.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Math\n * @sig [Number] -> Number\n * @param {Array} list An array of numbers\n * @return {Number} The product of all the numbers in the list.\n * @see R.reduce\n * @example\n *\n *      R.product([2,4,6,8,100,1]); //=> 38400\n */\nvar product = /*#__PURE__*/Object(_reduce__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_multiply__WEBPACK_IMPORTED_MODULE_0__[\"default\"], 1);\n/* harmony default export */ __webpack_exports__[\"default\"] = (product);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/product.js?");

/***/ }),

/***/ "./node_modules/ramda/es/project.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/project.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_map */ \"./node_modules/ramda/es/internal/_map.js\");\n/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identity */ \"./node_modules/ramda/es/identity.js\");\n/* harmony import */ var _pickAll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pickAll */ \"./node_modules/ramda/es/pickAll.js\");\n/* harmony import */ var _useWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useWith */ \"./node_modules/ramda/es/useWith.js\");\n\n\n\n\n\n/**\n * Reasonable analog to SQL `select` statement.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @category Relation\n * @sig [k] -> [{k: v}] -> [{k: v}]\n * @param {Array} props The property names to project\n * @param {Array} objs The objects to query\n * @return {Array} An array of objects with just the `props` properties.\n * @example\n *\n *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};\n *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};\n *      var kids = [abby, fred];\n *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]\n */\nvar project = /*#__PURE__*/Object(_useWith__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_internal_map__WEBPACK_IMPORTED_MODULE_0__[\"default\"], [_pickAll__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _identity__WEBPACK_IMPORTED_MODULE_1__[\"default\"]]); // passing `identity` gives correct arity\n/* harmony default export */ __webpack_exports__[\"default\"] = (project);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/project.js?");

/***/ }),

/***/ "./node_modules/ramda/es/prop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/prop.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path */ \"./node_modules/ramda/es/path.js\");\n\n\n\n/**\n * Returns a function that when supplied an object returns the indicated\n * property of that object, if it exists.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig s -> {s: a} -> a | Undefined\n * @param {String} p The property name\n * @param {Object} obj The object to query\n * @return {*} The value at `obj.p`.\n * @see R.path\n * @example\n *\n *      R.prop('x', {x: 100}); //=> 100\n *      R.prop('x', {}); //=> undefined\n */\n\nvar prop = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function prop(p, obj) {\n  return Object(_path__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([p], obj);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (prop);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/prop.js?");

/***/ }),

/***/ "./node_modules/ramda/es/propEq.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propEq.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n\n\n\n/**\n * Returns `true` if the specified object property is equal, in\n * [`R.equals`](#equals) terms, to the given value; `false` otherwise.\n * You can test multiple properties with [`R.where`](#where).\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig String -> a -> Object -> Boolean\n * @param {String} name\n * @param {*} val\n * @param {*} obj\n * @return {Boolean}\n * @see R.whereEq, R.propSatisfies, R.equals\n * @example\n *\n *      var abby = {name: 'Abby', age: 7, hair: 'blond'};\n *      var fred = {name: 'Fred', age: 12, hair: 'brown'};\n *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};\n *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};\n *      var kids = [abby, fred, rusty, alois];\n *      var hasBrownHair = R.propEq('hair', 'brown');\n *      R.filter(hasBrownHair, kids); //=> [fred, rusty]\n */\nvar propEq = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function propEq(name, val, obj) {\n  return Object(_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(val, obj[name]);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (propEq);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/propEq.js?");

/***/ }),

/***/ "./node_modules/ramda/es/propIs.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propIs.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ \"./node_modules/ramda/es/is.js\");\n\n\n\n/**\n * Returns `true` if the specified object property is of the given type;\n * `false` otherwise.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category Type\n * @sig Type -> String -> Object -> Boolean\n * @param {Function} type\n * @param {String} name\n * @param {*} obj\n * @return {Boolean}\n * @see R.is, R.propSatisfies\n * @example\n *\n *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true\n *      R.propIs(Number, 'x', {x: 'foo'});    //=> false\n *      R.propIs(Number, 'x', {});            //=> false\n */\nvar propIs = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function propIs(type, name, obj) {\n  return Object(_is__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(type, obj[name]);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (propIs);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/propIs.js?");

/***/ }),

/***/ "./node_modules/ramda/es/propOr.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propOr.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\n\n/**\n * If the given, non-null object has an own property with the specified name,\n * returns the value of that property. Otherwise returns the provided default\n * value.\n *\n * @func\n * @memberOf R\n * @since v0.6.0\n * @category Object\n * @sig a -> String -> Object -> a\n * @param {*} val The default value.\n * @param {String} p The name of the property to return.\n * @param {Object} obj The object to query.\n * @return {*} The value of given property of the supplied object or the default value.\n * @example\n *\n *      var alice = {\n *        name: 'ALICE',\n *        age: 101\n *      };\n *      var favorite = R.prop('favoriteLibrary');\n *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');\n *\n *      favorite(alice);  //=> undefined\n *      favoriteWithDefault(alice);  //=> 'Ramda'\n */\nvar propOr = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function propOr(val, p, obj) {\n  return obj != null && Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(p, obj) ? obj[p] : val;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (propOr);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/propOr.js?");

/***/ }),

/***/ "./node_modules/ramda/es/propSatisfies.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/propSatisfies.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Returns `true` if the specified object property satisfies the given\n * predicate; `false` otherwise. You can test multiple properties with\n * [`R.where`](#where).\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category Logic\n * @sig (a -> Boolean) -> String -> {String: a} -> Boolean\n * @param {Function} pred\n * @param {String} name\n * @param {*} obj\n * @return {Boolean}\n * @see R.where, R.propEq, R.propIs\n * @example\n *\n *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true\n */\nvar propSatisfies = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function propSatisfies(pred, name, obj) {\n  return pred(obj[name]);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (propSatisfies);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/propSatisfies.js?");

/***/ }),

/***/ "./node_modules/ramda/es/props.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/props.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Acts as multiple `prop`: array of keys in, array of values out. Preserves\n * order.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig [k] -> {k: v} -> [v]\n * @param {Array} ps The property names to fetch\n * @param {Object} obj The object to query\n * @return {Array} The corresponding values or partially applied function.\n * @example\n *\n *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]\n *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]\n *\n *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));\n *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'\n */\nvar props = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function props(ps, obj) {\n  var len = ps.length;\n  var out = [];\n  var idx = 0;\n\n  while (idx < len) {\n    out[idx] = obj[ps[idx]];\n    idx += 1;\n  }\n\n  return out;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (props);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/props.js?");

/***/ }),

/***/ "./node_modules/ramda/es/range.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/range.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isNumber */ \"./node_modules/ramda/es/internal/_isNumber.js\");\n\n\n\n/**\n * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Number -> Number -> [Number]\n * @param {Number} from The first number in the list.\n * @param {Number} to One more than the last number in the list.\n * @return {Array} The list of numbers in tthe set `[a, b)`.\n * @example\n *\n *      R.range(1, 5);    //=> [1, 2, 3, 4]\n *      R.range(50, 53);  //=> [50, 51, 52]\n */\nvar range = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function range(from, to) {\n  if (!(Object(_internal_isNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(from) && Object(_internal_isNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(to))) {\n    throw new TypeError('Both arguments to range must be numbers');\n  }\n  var result = [];\n  var n = from;\n  while (n < to) {\n    result.push(n);\n    n += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (range);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/range.js?");

/***/ }),

/***/ "./node_modules/ramda/es/reduce.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reduce.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n\n\n\n/**\n * Returns a single item by iterating through the list, successively calling\n * the iterator function and passing it an accumulator value and the current\n * value from the array, and then passing the result to the next call.\n *\n * The iterator function receives two values: *(acc, value)*. It may use\n * [`R.reduced`](#reduced) to shortcut the iteration.\n *\n * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function\n * is *(value, acc)*.\n *\n * Note: `R.reduce` does not skip deleted or unassigned indices (sparse\n * arrays), unlike the native `Array.prototype.reduce` method. For more details\n * on this behavior, see:\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description\n *\n * Dispatches to the `reduce` method of the third argument, if present. When\n * doing so, it is up to the user to handle the [`R.reduced`](#reduced)\n * shortcuting, as this is not implemented by `reduce`.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig ((a, b) -> a) -> a -> [b] -> a\n * @param {Function} fn The iterator function. Receives two values, the accumulator and the\n *        current element from the array.\n * @param {*} acc The accumulator value.\n * @param {Array} list The list to iterate over.\n * @return {*} The final, accumulated value.\n * @see R.reduced, R.addIndex, R.reduceRight\n * @example\n *\n *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10\n *      //          -               -10\n *      //         / \\              / \\\n *      //        -   4           -6   4\n *      //       / \\              / \\\n *      //      -   3   ==>     -3   3\n *      //     / \\              / \\\n *      //    -   2           -1   2\n *      //   / \\              / \\\n *      //  0   1            0   1\n *\n * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)\n */\nvar reduce = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_internal_reduce__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (reduce);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/reduce.js?");

/***/ }),

/***/ "./node_modules/ramda/es/reduceBy.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/reduceBy.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curryN__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curryN */ \"./node_modules/ramda/es/internal/_curryN.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _internal_xreduceBy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_xreduceBy */ \"./node_modules/ramda/es/internal/_xreduceBy.js\");\n\n\n\n\n\n\n/**\n * Groups the elements of the list according to the result of calling\n * the String-returning function `keyFn` on each element and reduces the elements\n * of each group to a single value via the reducer function `valueFn`.\n *\n * This function is basically a more general [`groupBy`](#groupBy) function.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.20.0\n * @category List\n * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}\n * @param {Function} valueFn The function that reduces the elements of each group to a single\n *        value. Receives two values, accumulator for a particular group and the current element.\n * @param {*} acc The (initial) accumulator value for each group.\n * @param {Function} keyFn The function that maps the list's element into a key.\n * @param {Array} list The array to group.\n * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of\n *         `valueFn` for elements which produced that key when passed to `keyFn`.\n * @see R.groupBy, R.reduce\n * @example\n *\n *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);\n *      var namesByGrade = reduceToNamesBy(function(student) {\n *        var score = student.score;\n *        return score < 65 ? 'F' :\n *               score < 70 ? 'D' :\n *               score < 80 ? 'C' :\n *               score < 90 ? 'B' : 'A';\n *      });\n *      var students = [{name: 'Lucy', score: 92},\n *                      {name: 'Drew', score: 85},\n *                      // ...\n *                      {name: 'Bart', score: 62}];\n *      namesByGrade(students);\n *      // {\n *      //   'A': ['Lucy'],\n *      //   'B': ['Drew']\n *      //   // ...,\n *      //   'F': ['Bart']\n *      // }\n */\nvar reduceBy = /*#__PURE__*/Object(_internal_curryN__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(4, [], /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xreduceBy__WEBPACK_IMPORTED_MODULE_4__[\"default\"], function reduceBy(valueFn, valueAcc, keyFn, list) {\n  return Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(function (acc, elt) {\n    var key = keyFn(elt);\n    acc[key] = valueFn(Object(_internal_has__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(key, acc) ? acc[key] : valueAcc, elt);\n    return acc;\n  }, {}, list);\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (reduceBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/reduceBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/reduceRight.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/reduceRight.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Returns a single item by iterating through the list, successively calling\n * the iterator function and passing it an accumulator value and the current\n * value from the array, and then passing the result to the next call.\n *\n * Similar to [`reduce`](#reduce), except moves through the input list from the\n * right to the left.\n *\n * The iterator function receives two values: *(value, acc)*, while the arguments'\n * order of `reduce`'s iterator function is *(acc, value)*.\n *\n * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse\n * arrays), unlike the native `Array.prototype.reduceRight` method. For more details\n * on this behavior, see:\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig ((a, b) -> b) -> b -> [a] -> b\n * @param {Function} fn The iterator function. Receives two values, the current element from the array\n *        and the accumulator.\n * @param {*} acc The accumulator value.\n * @param {Array} list The list to iterate over.\n * @return {*} The final, accumulated value.\n * @see R.reduce, R.addIndex\n * @example\n *\n *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2\n *      //    -               -2\n *      //   / \\              / \\\n *      //  1   -            1   3\n *      //     / \\              / \\\n *      //    2   -     ==>    2  -1\n *      //       / \\              / \\\n *      //      3   -            3   4\n *      //         / \\              / \\\n *      //        4   0            4   0\n *\n * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))\n */\nvar reduceRight = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function reduceRight(fn, acc, list) {\n  var idx = list.length - 1;\n  while (idx >= 0) {\n    acc = fn(list[idx], acc);\n    idx -= 1;\n  }\n  return acc;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (reduceRight);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/reduceRight.js?");

/***/ }),

/***/ "./node_modules/ramda/es/reduceWhile.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/reduceWhile.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curryN__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curryN */ \"./node_modules/ramda/es/internal/_curryN.js\");\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _internal_reduced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n\n\n\n\n/**\n * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating\n * through the list, successively calling the iterator function. `reduceWhile`\n * also takes a predicate that is evaluated before each step. If the predicate\n * returns `false`, it \"short-circuits\" the iteration and returns the current\n * value of the accumulator.\n *\n * @func\n * @memberOf R\n * @since v0.22.0\n * @category List\n * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a\n * @param {Function} pred The predicate. It is passed the accumulator and the\n *        current element.\n * @param {Function} fn The iterator function. Receives two values, the\n *        accumulator and the current element.\n * @param {*} a The accumulator value.\n * @param {Array} list The list to iterate over.\n * @return {*} The final, accumulated value.\n * @see R.reduce, R.reduced\n * @example\n *\n *      var isOdd = (acc, x) => x % 2 === 1;\n *      var xs = [1, 3, 5, 60, 777, 800];\n *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9\n *\n *      var ys = [2, 4, 6]\n *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111\n */\nvar reduceWhile = /*#__PURE__*/Object(_internal_curryN__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(4, [], function _reduceWhile(pred, fn, a, list) {\n  return Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (acc, x) {\n    return pred(acc, x) ? fn(acc, x) : Object(_internal_reduced__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(acc);\n  }, a, list);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (reduceWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/reduceWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/reduced.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/reduced.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_reduced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduced */ \"./node_modules/ramda/es/internal/_reduced.js\");\n\n\n\n/**\n * Returns a value wrapped to indicate that it is the final value of the reduce\n * and transduce functions. The returned value should be considered a black\n * box: the internal structure is not guaranteed to be stable.\n *\n * Note: this optimization is unavailable to functions not explicitly listed\n * above. For instance, it is not currently supported by\n * [`reduceRight`](#reduceRight).\n *\n * @func\n * @memberOf R\n * @since v0.15.0\n * @category List\n * @sig a -> *\n * @param {*} x The final value of the reduce.\n * @return {*} The wrapped value.\n * @see R.reduce, R.transduce\n * @example\n *\n *     R.reduce(\n *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),\n *       [],\n *       [1, 2, 3, 4, 5]) // [1, 2, 3]\n */\nvar reduced = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_internal_reduced__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (reduced);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/reduced.js?");

/***/ }),

/***/ "./node_modules/ramda/es/reject.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reject.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_complement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_complement */ \"./node_modules/ramda/es/internal/_complement.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter */ \"./node_modules/ramda/es/filter.js\");\n\n\n\n\n/**\n * The complement of [`filter`](#filter).\n *\n * Acts as a transducer if a transformer is given in list position. Filterable\n * objects include plain objects or any object that has a filter method such\n * as `Array`.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Filterable f => (a -> Boolean) -> f a -> f a\n * @param {Function} pred\n * @param {Array} filterable\n * @return {Array}\n * @see R.filter, R.transduce, R.addIndex\n * @example\n *\n *      var isOdd = (n) => n % 2 === 1;\n *\n *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]\n *\n *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}\n */\nvar reject = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function reject(pred, filterable) {\n  return Object(_filter__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_internal_complement__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(pred), filterable);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (reject);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/reject.js?");

/***/ }),

/***/ "./node_modules/ramda/es/remove.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/remove.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Removes the sub-list of `list` starting at index `start` and containing\n * `count` elements. _Note that this is not destructive_: it returns a copy of\n * the list with the changes.\n * <small>No lists have been harmed in the application of this function.</small>\n *\n * @func\n * @memberOf R\n * @since v0.2.2\n * @category List\n * @sig Number -> Number -> [a] -> [a]\n * @param {Number} start The position to start removing elements\n * @param {Number} count The number of elements to remove\n * @param {Array} list The list to remove from\n * @return {Array} A new Array with `count` elements from `start` removed.\n * @example\n *\n *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]\n */\nvar remove = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function remove(start, count, list) {\n  var result = Array.prototype.slice.call(list, 0);\n  result.splice(start, count);\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (remove);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/remove.js?");

/***/ }),

/***/ "./node_modules/ramda/es/repeat.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/repeat.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _always__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./always */ \"./node_modules/ramda/es/always.js\");\n/* harmony import */ var _times__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./times */ \"./node_modules/ramda/es/times.js\");\n\n\n\n\n/**\n * Returns a fixed list of size `n` containing a specified identical value.\n *\n * @func\n * @memberOf R\n * @since v0.1.1\n * @category List\n * @sig a -> n -> [a]\n * @param {*} value The value to repeat.\n * @param {Number} n The desired size of the output list.\n * @return {Array} A new array containing `n` `value`s.\n * @see R.times\n * @example\n *\n *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']\n *\n *      var obj = {};\n *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]\n *      repeatedObjs[0] === repeatedObjs[1]; //=> true\n * @symb R.repeat(a, 0) = []\n * @symb R.repeat(a, 1) = [a]\n * @symb R.repeat(a, 2) = [a, a]\n */\nvar repeat = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function repeat(value, n) {\n  return Object(_times__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_always__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(value), n);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (repeat);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/repeat.js?");

/***/ }),

/***/ "./node_modules/ramda/es/replace.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/replace.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Replace a substring or regex match in a string with a replacement.\n *\n * @func\n * @memberOf R\n * @since v0.7.0\n * @category String\n * @sig RegExp|String -> String -> String -> String\n * @param {RegExp|String} pattern A regular expression or a substring to match.\n * @param {String} replacement The string to replace the matches with.\n * @param {String} str The String to do the search and replacement in.\n * @return {String} The result.\n * @example\n *\n *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'\n *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'\n *\n *      // Use the \"g\" (global) flag to replace all occurrences:\n *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'\n */\nvar replace = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function replace(regex, replacement, str) {\n  return str.replace(regex, replacement);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (replace);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/replace.js?");

/***/ }),

/***/ "./node_modules/ramda/es/reverse.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/reverse.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_isString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString */ \"./node_modules/ramda/es/internal/_isString.js\");\n\n\n\n/**\n * Returns a new list or string with the elements or characters in reverse\n * order.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [a]\n * @sig String -> String\n * @param {Array|String} list\n * @return {Array|String}\n * @example\n *\n *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]\n *      R.reverse([1, 2]);     //=> [2, 1]\n *      R.reverse([1]);        //=> [1]\n *      R.reverse([]);         //=> []\n *\n *      R.reverse('abc');      //=> 'cba'\n *      R.reverse('ab');       //=> 'ba'\n *      R.reverse('a');        //=> 'a'\n *      R.reverse('');         //=> ''\n */\nvar reverse = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function reverse(list) {\n  return Object(_internal_isString__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (reverse);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/reverse.js?");

/***/ }),

/***/ "./node_modules/ramda/es/scan.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/scan.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Scan is similar to [`reduce`](#reduce), but returns a list of successively\n * reduced values from the left\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category List\n * @sig ((a, b) -> a) -> a -> [b] -> [a]\n * @param {Function} fn The iterator function. Receives two values, the accumulator and the\n *        current element from the array\n * @param {*} acc The accumulator value.\n * @param {Array} list The list to iterate over.\n * @return {Array} A list of all intermediately reduced values.\n * @see R.reduce\n * @example\n *\n *      var numbers = [1, 2, 3, 4];\n *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]\n * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]\n */\nvar scan = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function scan(fn, acc, list) {\n  var idx = 0;\n  var len = list.length;\n  var result = [acc];\n  while (idx < len) {\n    acc = fn(acc, list[idx]);\n    result[idx + 1] = acc;\n    idx += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (scan);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/scan.js?");

/***/ }),

/***/ "./node_modules/ramda/es/sequence.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/sequence.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _ap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ap */ \"./node_modules/ramda/es/ap.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n/* harmony import */ var _prepend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prepend */ \"./node_modules/ramda/es/prepend.js\");\n/* harmony import */ var _reduceRight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduceRight */ \"./node_modules/ramda/es/reduceRight.js\");\n\n\n\n\n\n\n/**\n * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)\n * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an\n * Applicative of Traversable.\n *\n * Dispatches to the `sequence` method of the second argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category List\n * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)\n * @param {Function} of\n * @param {*} traversable\n * @return {*}\n * @see R.traverse\n * @example\n *\n *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])\n *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()\n *\n *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]\n *      R.sequence(R.of, Nothing());       //=> [Nothing()]\n */\nvar sequence = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function sequence(of, traversable) {\n  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : Object(_reduceRight__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(function (x, acc) {\n    return Object(_ap__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_map__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_prepend__WEBPACK_IMPORTED_MODULE_3__[\"default\"], x), acc);\n  }, of([]), traversable);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (sequence);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/sequence.js?");

/***/ }),

/***/ "./node_modules/ramda/es/set.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/set.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _always__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./always */ \"./node_modules/ramda/es/always.js\");\n/* harmony import */ var _over__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./over */ \"./node_modules/ramda/es/over.js\");\n\n\n\n\n/**\n * Returns the result of \"setting\" the portion of the given data structure\n * focused by the given lens to the given value.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category Object\n * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s\n * @sig Lens s a -> a -> s -> s\n * @param {Lens} lens\n * @param {*} v\n * @param {*} x\n * @return {*}\n * @see R.prop, R.lensIndex, R.lensProp\n * @example\n *\n *      var xLens = R.lensProp('x');\n *\n *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}\n *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}\n */\nvar set = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function set(lens, v, x) {\n  return Object(_over__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(lens, Object(_always__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(v), x);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (set);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/set.js?");

/***/ }),

/***/ "./node_modules/ramda/es/slice.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/slice.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod */ \"./node_modules/ramda/es/internal/_checkForMethod.js\");\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n\n/**\n * Returns the elements of the given list or string (or object with a `slice`\n * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).\n *\n * Dispatches to the `slice` method of the third argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.1.4\n * @category List\n * @sig Number -> Number -> [a] -> [a]\n * @sig Number -> Number -> String -> String\n * @param {Number} fromIndex The start index (inclusive).\n * @param {Number} toIndex The end index (exclusive).\n * @param {*} list\n * @return {*}\n * @example\n *\n *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']\n *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']\n *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']\n *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']\n *      R.slice(0, 3, 'ramda');                     //=> 'ram'\n */\nvar slice = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('slice', function slice(fromIndex, toIndex, list) {\n  return Array.prototype.slice.call(list, fromIndex, toIndex);\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (slice);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/slice.js?");

/***/ }),

/***/ "./node_modules/ramda/es/sort.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/sort.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns a copy of the list, sorted according to the comparator function,\n * which should accept two values at a time and return a negative number if the\n * first value is smaller, a positive number if it's larger, and zero if they\n * are equal. Please note that this is a **copy** of the list. It does not\n * modify the original.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig ((a, a) -> Number) -> [a] -> [a]\n * @param {Function} comparator A sorting function :: a -> b -> Int\n * @param {Array} list The list to sort\n * @return {Array} a new array with its elements sorted by the comparator function.\n * @example\n *\n *      var diff = function(a, b) { return a - b; };\n *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]\n */\nvar sort = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function sort(comparator, list) {\n  return Array.prototype.slice.call(list, 0).sort(comparator);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (sort);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/sort.js?");

/***/ }),

/***/ "./node_modules/ramda/es/sortBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/sortBy.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Sorts the list according to the supplied function.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig Ord b => (a -> b) -> [a] -> [a]\n * @param {Function} fn\n * @param {Array} list The list to sort.\n * @return {Array} A new list sorted by the keys generated by `fn`.\n * @example\n *\n *      var sortByFirstItem = R.sortBy(R.prop(0));\n *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));\n *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];\n *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]\n *      var alice = {\n *        name: 'ALICE',\n *        age: 101\n *      };\n *      var bob = {\n *        name: 'Bob',\n *        age: -10\n *      };\n *      var clara = {\n *        name: 'clara',\n *        age: 314.159\n *      };\n *      var people = [clara, bob, alice];\n *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]\n */\nvar sortBy = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function sortBy(fn, list) {\n  return Array.prototype.slice.call(list, 0).sort(function (a, b) {\n    var aa = fn(a);\n    var bb = fn(b);\n    return aa < bb ? -1 : aa > bb ? 1 : 0;\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (sortBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/sortBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/sortWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/sortWith.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Sorts a list according to a list of comparators.\n *\n * @func\n * @memberOf R\n * @since v0.23.0\n * @category Relation\n * @sig [(a, a) -> Number] -> [a] -> [a]\n * @param {Array} functions A list of comparator functions.\n * @param {Array} list The list to sort.\n * @return {Array} A new list sorted according to the comarator functions.\n * @example\n *\n *      var alice = {\n *        name: 'alice',\n *        age: 40\n *      };\n *      var bob = {\n *        name: 'bob',\n *        age: 30\n *      };\n *      var clara = {\n *        name: 'clara',\n *        age: 40\n *      };\n *      var people = [clara, bob, alice];\n *      var ageNameSort = R.sortWith([\n *        R.descend(R.prop('age')),\n *        R.ascend(R.prop('name'))\n *      ]);\n *      ageNameSort(people); //=> [alice, clara, bob]\n */\nvar sortWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function sortWith(fns, list) {\n  return Array.prototype.slice.call(list, 0).sort(function (a, b) {\n    var result = 0;\n    var i = 0;\n    while (result === 0 && i < fns.length) {\n      result = fns[i](a, b);\n      i += 1;\n    }\n    return result;\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (sortWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/sortWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/split.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/split.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _invoker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker */ \"./node_modules/ramda/es/invoker.js\");\n\n\n/**\n * Splits a string into an array of strings based on the given\n * separator.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category String\n * @sig (String | RegExp) -> String -> [String]\n * @param {String|RegExp} sep The pattern.\n * @param {String} str The string to separate into an array.\n * @return {Array} The array of strings from `str` separated by `str`.\n * @see R.join\n * @example\n *\n *      var pathComponents = R.split('/');\n *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']\n *\n *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']\n */\nvar split = /*#__PURE__*/Object(_invoker__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, 'split');\n/* harmony default export */ __webpack_exports__[\"default\"] = (split);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/split.js?");

/***/ }),

/***/ "./node_modules/ramda/es/splitAt.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/splitAt.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _length__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./length */ \"./node_modules/ramda/es/length.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n\n/**\n * Splits a given list or string at a given index.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category List\n * @sig Number -> [a] -> [[a], [a]]\n * @sig Number -> String -> [String, String]\n * @param {Number} index The index where the array/string is split.\n * @param {Array|String} array The array/string to be split.\n * @return {Array}\n * @example\n *\n *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]\n *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']\n *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']\n */\nvar splitAt = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function splitAt(index, array) {\n  return [Object(_slice__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(0, index, array), Object(_slice__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(index, Object(_length__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(array), array)];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (splitAt);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/splitAt.js?");

/***/ }),

/***/ "./node_modules/ramda/es/splitEvery.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/splitEvery.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n/**\n * Splits a collection into slices of the specified length.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category List\n * @sig Number -> [a] -> [[a]]\n * @sig Number -> String -> [String]\n * @param {Number} n\n * @param {Array} list\n * @return {Array}\n * @example\n *\n *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]\n *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']\n */\nvar splitEvery = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function splitEvery(n, list) {\n  if (n <= 0) {\n    throw new Error('First argument to splitEvery must be a positive integer');\n  }\n  var result = [];\n  var idx = 0;\n  while (idx < list.length) {\n    result.push(Object(_slice__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(idx, idx += n, list));\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (splitEvery);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/splitEvery.js?");

/***/ }),

/***/ "./node_modules/ramda/es/splitWhen.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/splitWhen.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Takes a list and a predicate and returns a pair of lists with the following properties:\n *\n *  - the result of concatenating the two output lists is equivalent to the input list;\n *  - none of the elements of the first output list satisfies the predicate; and\n *  - if the second output list is non-empty, its first element satisfies the predicate.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> [[a], [a]]\n * @param {Function} pred The predicate that determines where the array is split.\n * @param {Array} list The array to be split.\n * @return {Array}\n * @example\n *\n *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]\n */\nvar splitWhen = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function splitWhen(pred, list) {\n  var idx = 0;\n  var len = list.length;\n  var prefix = [];\n\n  while (idx < len && !pred(list[idx])) {\n    prefix.push(list[idx]);\n    idx += 1;\n  }\n\n  return [prefix, Array.prototype.slice.call(list, idx)];\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (splitWhen);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/splitWhen.js?");

/***/ }),

/***/ "./node_modules/ramda/es/startsWith.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/startsWith.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n/* harmony import */ var _take__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./take */ \"./node_modules/ramda/es/take.js\");\n\n\n\n\n/**\n * Checks if a list starts with the provided values\n *\n * @func\n * @memberOf R\n * @since v0.24.0\n * @category List\n * @sig [a] -> Boolean\n * @sig String -> Boolean\n * @param {*} prefix\n * @param {*} list\n * @return {Boolean}\n * @example\n *\n *      R.startsWith('a', 'abc')                //=> true\n *      R.startsWith('b', 'abc')                //=> false\n *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true\n *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false\n */\nvar startsWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function (prefix, list) {\n  return Object(_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_take__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(prefix.length, list), prefix);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (startsWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/startsWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/subtract.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/subtract.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Subtracts its second argument from its first argument.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Math\n * @sig Number -> Number -> Number\n * @param {Number} a The first value.\n * @param {Number} b The second value.\n * @return {Number} The result of `a - b`.\n * @see R.add\n * @example\n *\n *      R.subtract(10, 8); //=> 2\n *\n *      var minus5 = R.subtract(R.__, 5);\n *      minus5(17); //=> 12\n *\n *      var complementaryAngle = R.subtract(90);\n *      complementaryAngle(30); //=> 60\n *      complementaryAngle(72); //=> 18\n */\nvar subtract = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function subtract(a, b) {\n  return Number(a) - Number(b);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (subtract);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/subtract.js?");

/***/ }),

/***/ "./node_modules/ramda/es/sum.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/sum.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add */ \"./node_modules/ramda/es/add.js\");\n/* harmony import */ var _reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce */ \"./node_modules/ramda/es/reduce.js\");\n\n\n\n/**\n * Adds together all the elements of a list.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Math\n * @sig [Number] -> Number\n * @param {Array} list An array of numbers\n * @return {Number} The sum of all the numbers in the list.\n * @see R.reduce\n * @example\n *\n *      R.sum([2,4,6,8,100,1]); //=> 121\n */\nvar sum = /*#__PURE__*/Object(_reduce__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_add__WEBPACK_IMPORTED_MODULE_0__[\"default\"], 0);\n/* harmony default export */ __webpack_exports__[\"default\"] = (sum);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/sum.js?");

/***/ }),

/***/ "./node_modules/ramda/es/symmetricDifference.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/symmetricDifference.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concat */ \"./node_modules/ramda/es/concat.js\");\n/* harmony import */ var _difference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./difference */ \"./node_modules/ramda/es/difference.js\");\n\n\n\n\n/**\n * Finds the set (i.e. no duplicates) of all elements contained in the first or\n * second list, but not both.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category Relation\n * @sig [*] -> [*] -> [*]\n * @param {Array} list1 The first list.\n * @param {Array} list2 The second list.\n * @return {Array} The elements in `list1` or `list2`, but not both.\n * @see R.symmetricDifferenceWith, R.difference, R.differenceWith\n * @example\n *\n *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]\n *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]\n */\nvar symmetricDifference = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function symmetricDifference(list1, list2) {\n  return Object(_concat__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_difference__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(list1, list2), Object(_difference__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(list2, list1));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (symmetricDifference);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/symmetricDifference.js?");

/***/ }),

/***/ "./node_modules/ramda/es/symmetricDifferenceWith.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/symmetricDifferenceWith.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concat */ \"./node_modules/ramda/es/concat.js\");\n/* harmony import */ var _differenceWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./differenceWith */ \"./node_modules/ramda/es/differenceWith.js\");\n\n\n\n\n/**\n * Finds the set (i.e. no duplicates) of all elements contained in the first or\n * second list, but not both. Duplication is determined according to the value\n * returned by applying the supplied predicate to two list elements.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category Relation\n * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]\n * @param {Function} pred A predicate used to test whether two items are equal.\n * @param {Array} list1 The first list.\n * @param {Array} list2 The second list.\n * @return {Array} The elements in `list1` or `list2`, but not both.\n * @see R.symmetricDifference, R.difference, R.differenceWith\n * @example\n *\n *      var eqA = R.eqBy(R.prop('a'));\n *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];\n *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];\n *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]\n */\nvar symmetricDifferenceWith = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function symmetricDifferenceWith(pred, list1, list2) {\n  return Object(_concat__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_differenceWith__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(pred, list1, list2), Object(_differenceWith__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(pred, list2, list1));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (symmetricDifferenceWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/symmetricDifferenceWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/tail.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/tail.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod */ \"./node_modules/ramda/es/internal/_checkForMethod.js\");\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n\n/**\n * Returns all but the first element of the given list or string (or object\n * with a `tail` method).\n *\n * Dispatches to the `slice` method of the first argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [a]\n * @sig String -> String\n * @param {*} list\n * @return {*}\n * @see R.head, R.init, R.last\n * @example\n *\n *      R.tail([1, 2, 3]);  //=> [2, 3]\n *      R.tail([1, 2]);     //=> [2]\n *      R.tail([1]);        //=> []\n *      R.tail([]);         //=> []\n *\n *      R.tail('abc');  //=> 'bc'\n *      R.tail('ab');   //=> 'b'\n *      R.tail('a');    //=> ''\n *      R.tail('');     //=> ''\n */\nvar tail = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_internal_checkForMethod__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('tail', /*#__PURE__*/Object(_slice__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(1, Infinity)));\n/* harmony default export */ __webpack_exports__[\"default\"] = (tail);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/tail.js?");

/***/ }),

/***/ "./node_modules/ramda/es/take.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/take.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xtake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtake */ \"./node_modules/ramda/es/internal/_xtake.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n\n\n/**\n * Returns the first `n` elements of the given list, string, or\n * transducer/transformer (or object with a `take` method).\n *\n * Dispatches to the `take` method of the second argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Number -> [a] -> [a]\n * @sig Number -> String -> String\n * @param {Number} n\n * @param {*} list\n * @return {*}\n * @see R.drop\n * @example\n *\n *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']\n *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']\n *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']\n *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']\n *      R.take(3, 'ramda');               //=> 'ram'\n *\n *      var personnel = [\n *        'Dave Brubeck',\n *        'Paul Desmond',\n *        'Eugene Wright',\n *        'Joe Morello',\n *        'Gerry Mulligan',\n *        'Bob Bates',\n *        'Joe Dodge',\n *        'Ron Crotty'\n *      ];\n *\n *      var takeFive = R.take(5);\n *      takeFive(personnel);\n *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']\n * @symb R.take(-1, [a, b]) = [a, b]\n * @symb R.take(0, [a, b]) = []\n * @symb R.take(1, [a, b]) = [a]\n * @symb R.take(2, [a, b]) = [a, b]\n */\nvar take = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['take'], _internal_xtake__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function take(n, xs) {\n  return Object(_slice__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(0, n < 0 ? Infinity : n, xs);\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (take);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/take.js?");

/***/ }),

/***/ "./node_modules/ramda/es/takeLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/takeLast.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _drop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop */ \"./node_modules/ramda/es/drop.js\");\n\n\n\n/**\n * Returns a new list containing the last `n` elements of the given list.\n * If `n > list.length`, returns a list of `list.length` elements.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category List\n * @sig Number -> [a] -> [a]\n * @sig Number -> String -> String\n * @param {Number} n The number of elements to return.\n * @param {Array} xs The collection to consider.\n * @return {Array}\n * @see R.dropLast\n * @example\n *\n *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']\n *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']\n *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']\n *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']\n *      R.takeLast(3, 'ramda');               //=> 'mda'\n */\nvar takeLast = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function takeLast(n, xs) {\n  return Object(_drop__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(n >= 0 ? xs.length - n : 0, xs);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (takeLast);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/takeLast.js?");

/***/ }),

/***/ "./node_modules/ramda/es/takeLastWhile.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/takeLastWhile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n/**\n * Returns a new list containing the last `n` elements of a given list, passing\n * each value to the supplied predicate function, and terminating when the\n * predicate function returns `false`. Excludes the element that caused the\n * predicate function to fail. The predicate function is passed one argument:\n * *(value)*.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> [a]\n * @sig (a -> Boolean) -> String -> String\n * @param {Function} fn The function called per iteration.\n * @param {Array} xs The collection to iterate over.\n * @return {Array} A new array.\n * @see R.dropLastWhile, R.addIndex\n * @example\n *\n *      var isNotOne = x => x !== 1;\n *\n *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]\n *\n *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'\n */\nvar takeLastWhile = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function takeLastWhile(fn, xs) {\n  var idx = xs.length - 1;\n  while (idx >= 0 && fn(xs[idx])) {\n    idx -= 1;\n  }\n  return Object(_slice__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(idx + 1, Infinity, xs);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (takeLastWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/takeLastWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/takeWhile.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/takeWhile.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xtakeWhile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtakeWhile */ \"./node_modules/ramda/es/internal/_xtakeWhile.js\");\n/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice */ \"./node_modules/ramda/es/slice.js\");\n\n\n\n\n\n/**\n * Returns a new list containing the first `n` elements of a given list,\n * passing each value to the supplied predicate function, and terminating when\n * the predicate function returns `false`. Excludes the element that caused the\n * predicate function to fail. The predicate function is passed one argument:\n * *(value)*.\n *\n * Dispatches to the `takeWhile` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> [a]\n * @sig (a -> Boolean) -> String -> String\n * @param {Function} fn The function called per iteration.\n * @param {Array} xs The collection to iterate over.\n * @return {Array} A new array.\n * @see R.dropWhile, R.transduce, R.addIndex\n * @example\n *\n *      var isNotFour = x => x !== 4;\n *\n *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]\n *\n *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'\n */\nvar takeWhile = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(['takeWhile'], _internal_xtakeWhile__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function takeWhile(fn, xs) {\n  var idx = 0;\n  var len = xs.length;\n  while (idx < len && fn(xs[idx])) {\n    idx += 1;\n  }\n  return Object(_slice__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(0, idx, xs);\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (takeWhile);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/takeWhile.js?");

/***/ }),

/***/ "./node_modules/ramda/es/tap.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/tap.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xtap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtap */ \"./node_modules/ramda/es/internal/_xtap.js\");\n\n\n\n\n/**\n * Runs the given function with the supplied object, then returns the object.\n *\n * Acts as a transducer if a transformer is given as second parameter.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig (a -> *) -> a -> a\n * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.\n * @param {*} x\n * @return {*} `x`.\n * @example\n *\n *      var sayX = x => console.log('x is ' + x);\n *      R.tap(sayX, 100); //=> 100\n *      // logs 'x is 100'\n * @symb R.tap(f, a) = a\n */\nvar tap = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/Object(_internal_dispatchable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([], _internal_xtap__WEBPACK_IMPORTED_MODULE_2__[\"default\"], function tap(fn, x) {\n  fn(x);\n  return x;\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (tap);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/tap.js?");

/***/ }),

/***/ "./node_modules/ramda/es/test.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/test.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_cloneRegExp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_cloneRegExp */ \"./node_modules/ramda/es/internal/_cloneRegExp.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isRegExp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isRegExp */ \"./node_modules/ramda/es/internal/_isRegExp.js\");\n/* harmony import */ var _toString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toString */ \"./node_modules/ramda/es/toString.js\");\n\n\n\n\n\n/**\n * Determines whether a given string matches a given regular expression.\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category String\n * @sig RegExp -> String -> Boolean\n * @param {RegExp} pattern\n * @param {String} str\n * @return {Boolean}\n * @see R.match\n * @example\n *\n *      R.test(/^x/, 'xyz'); //=> true\n *      R.test(/^y/, 'xyz'); //=> false\n */\nvar test = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function test(pattern, str) {\n  if (!Object(_internal_isRegExp__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(pattern)) {\n    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + Object(_toString__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(pattern));\n  }\n  return Object(_internal_cloneRegExp__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(pattern).test(str);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (test);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/test.js?");

/***/ }),

/***/ "./node_modules/ramda/es/times.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/times.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Calls an input function `n` times, returning an array containing the results\n * of those function calls.\n *\n * `fn` is passed one argument: The current value of `n`, which begins at `0`\n * and is gradually incremented to `n - 1`.\n *\n * @func\n * @memberOf R\n * @since v0.2.3\n * @category List\n * @sig (Number -> a) -> Number -> [a]\n * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.\n * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.\n * @return {Array} An array containing the return values of all calls to `fn`.\n * @see R.repeat\n * @example\n *\n *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]\n * @symb R.times(f, 0) = []\n * @symb R.times(f, 1) = [f(0)]\n * @symb R.times(f, 2) = [f(0), f(1)]\n */\nvar times = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function times(fn, n) {\n  var len = Number(n);\n  var idx = 0;\n  var list;\n\n  if (len < 0 || isNaN(len)) {\n    throw new RangeError('n must be a non-negative number');\n  }\n  list = new Array(len);\n  while (idx < len) {\n    list[idx] = fn(idx);\n    idx += 1;\n  }\n  return list;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (times);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/times.js?");

/***/ }),

/***/ "./node_modules/ramda/es/toLower.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toLower.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _invoker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker */ \"./node_modules/ramda/es/invoker.js\");\n\n\n/**\n * The lower case version of a string.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category String\n * @sig String -> String\n * @param {String} str The string to lower case.\n * @return {String} The lower case version of `str`.\n * @see R.toUpper\n * @example\n *\n *      R.toLower('XYZ'); //=> 'xyz'\n */\nvar toLower = /*#__PURE__*/Object(_invoker__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, 'toLowerCase');\n/* harmony default export */ __webpack_exports__[\"default\"] = (toLower);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/toLower.js?");

/***/ }),

/***/ "./node_modules/ramda/es/toPairs.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toPairs.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\n\n/**\n * Converts an object into an array of key, value arrays. Only the object's\n * own properties are used.\n * Note that the order of the output array is not guaranteed to be consistent\n * across different JS platforms.\n *\n * @func\n * @memberOf R\n * @since v0.4.0\n * @category Object\n * @sig {String: *} -> [[String,*]]\n * @param {Object} obj The object to extract from\n * @return {Array} An array of key, value arrays from the object's own properties.\n * @see R.fromPairs\n * @example\n *\n *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]\n */\nvar toPairs = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function toPairs(obj) {\n  var pairs = [];\n  for (var prop in obj) {\n    if (Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(prop, obj)) {\n      pairs[pairs.length] = [prop, obj[prop]];\n    }\n  }\n  return pairs;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (toPairs);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/toPairs.js?");

/***/ }),

/***/ "./node_modules/ramda/es/toPairsIn.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/toPairsIn.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Converts an object into an array of key, value arrays. The object's own\n * properties and prototype properties are used. Note that the order of the\n * output array is not guaranteed to be consistent across different JS\n * platforms.\n *\n * @func\n * @memberOf R\n * @since v0.4.0\n * @category Object\n * @sig {String: *} -> [[String,*]]\n * @param {Object} obj The object to extract from\n * @return {Array} An array of key, value arrays from the object's own\n *         and prototype properties.\n * @example\n *\n *      var F = function() { this.x = 'X'; };\n *      F.prototype.y = 'Y';\n *      var f = new F();\n *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]\n */\nvar toPairsIn = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function toPairsIn(obj) {\n  var pairs = [];\n  for (var prop in obj) {\n    pairs[pairs.length] = [prop, obj[prop]];\n  }\n  return pairs;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (toPairsIn);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/toPairsIn.js?");

/***/ }),

/***/ "./node_modules/ramda/es/toString.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/toString.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_toString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_toString */ \"./node_modules/ramda/es/internal/_toString.js\");\n\n\n\n/**\n * Returns the string representation of the given value. `eval`'ing the output\n * should result in a value equivalent to the input value. Many of the built-in\n * `toString` methods do not satisfy this requirement.\n *\n * If the given value is an `[object Object]` with a `toString` method other\n * than `Object.prototype.toString`, this method is invoked with no arguments\n * to produce the return value. This means user-defined constructor functions\n * can provide a suitable `toString` method. For example:\n *\n *     function Point(x, y) {\n *       this.x = x;\n *       this.y = y;\n *     }\n *\n *     Point.prototype.toString = function() {\n *       return 'new Point(' + this.x + ', ' + this.y + ')';\n *     };\n *\n *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category String\n * @sig * -> String\n * @param {*} val\n * @return {String}\n * @example\n *\n *      R.toString(42); //=> '42'\n *      R.toString('abc'); //=> '\"abc\"'\n *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'\n *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{\"bar\": 2, \"baz\": 3, \"foo\": 1}'\n *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date(\"2001-02-03T04:05:06.000Z\")'\n */\nvar toString = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function toString(val) {\n  return Object(_internal_toString__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(val, []);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (toString);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/toString.js?");

/***/ }),

/***/ "./node_modules/ramda/es/toUpper.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toUpper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _invoker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker */ \"./node_modules/ramda/es/invoker.js\");\n\n\n/**\n * The upper case version of a string.\n *\n * @func\n * @memberOf R\n * @since v0.9.0\n * @category String\n * @sig String -> String\n * @param {String} str The string to upper case.\n * @return {String} The upper case version of `str`.\n * @see R.toLower\n * @example\n *\n *      R.toUpper('abc'); //=> 'ABC'\n */\nvar toUpper = /*#__PURE__*/Object(_invoker__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0, 'toUpperCase');\n/* harmony default export */ __webpack_exports__[\"default\"] = (toUpper);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/toUpper.js?");

/***/ }),

/***/ "./node_modules/ramda/es/transduce.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/transduce.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_reduce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_reduce */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _internal_xwrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_xwrap */ \"./node_modules/ramda/es/internal/_xwrap.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n\n\n\n\n/**\n * Initializes a transducer using supplied iterator function. Returns a single\n * item by iterating through the list, successively calling the transformed\n * iterator function and passing it an accumulator value and the current value\n * from the array, and then passing the result to the next call.\n *\n * The iterator function receives two values: *(acc, value)*. It will be\n * wrapped as a transformer to initialize the transducer. A transformer can be\n * passed directly in place of an iterator function. In both cases, iteration\n * may be stopped early with the [`R.reduced`](#reduced) function.\n *\n * A transducer is a function that accepts a transformer and returns a\n * transformer and can be composed directly.\n *\n * A transformer is an an object that provides a 2-arity reducing iterator\n * function, step, 0-arity initial value function, init, and 1-arity result\n * extraction function, result. The step function is used as the iterator\n * function in reduce. The result function is used to convert the final\n * accumulator into the return type and in most cases is\n * [`R.identity`](#identity). The init function can be used to provide an\n * initial accumulator, but is ignored by transduce.\n *\n * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.\n *\n * @func\n * @memberOf R\n * @since v0.12.0\n * @category List\n * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a\n * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.\n * @param {Function} fn The iterator function. Receives two values, the accumulator and the\n *        current element from the array. Wrapped as transformer, if necessary, and used to\n *        initialize the transducer\n * @param {*} acc The initial accumulator value.\n * @param {Array} list The list to iterate over.\n * @return {*} The final, accumulated value.\n * @see R.reduce, R.reduced, R.into\n * @example\n *\n *      var numbers = [1, 2, 3, 4];\n *      var transducer = R.compose(R.map(R.add(1)), R.take(2));\n *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]\n *\n *      var isOdd = (x) => x % 2 === 1;\n *      var firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));\n *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]\n */\nvar transduce = /*#__PURE__*/Object(_curryN__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(4, function transduce(xf, fn, acc, list) {\n  return Object(_internal_reduce__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(xf(typeof fn === 'function' ? Object(_internal_xwrap__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(fn) : fn), acc, list);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (transduce);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/transduce.js?");

/***/ }),

/***/ "./node_modules/ramda/es/transpose.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/transpose.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Transposes the rows and columns of a 2D list.\n * When passed a list of `n` lists of length `x`,\n * returns a list of `x` lists of length `n`.\n *\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category List\n * @sig [[a]] -> [[a]]\n * @param {Array} list A 2D list\n * @return {Array} A 2D list\n * @example\n *\n *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]\n *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]\n *\n *      // If some of the rows are shorter than the following rows, their elements are skipped:\n *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]\n * @symb R.transpose([[a], [b], [c]]) = [a, b, c]\n * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]\n * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]\n */\nvar transpose = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function transpose(outerlist) {\n  var i = 0;\n  var result = [];\n  while (i < outerlist.length) {\n    var innerlist = outerlist[i];\n    var j = 0;\n    while (j < innerlist.length) {\n      if (typeof result[j] === 'undefined') {\n        result[j] = [];\n      }\n      result[j].push(innerlist[j]);\n      j += 1;\n    }\n    i += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (transpose);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/transpose.js?");

/***/ }),

/***/ "./node_modules/ramda/es/traverse.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/traverse.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n/* harmony import */ var _sequence__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sequence */ \"./node_modules/ramda/es/sequence.js\");\n\n\n\n\n/**\n * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning\n * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),\n * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative\n * into an Applicative of Traversable.\n *\n * Dispatches to the `traverse` method of the third argument, if present.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category List\n * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)\n * @param {Function} of\n * @param {Function} f\n * @param {*} traversable\n * @return {*}\n * @see R.sequence\n * @example\n *\n *      // Returns `Nothing` if the given divisor is `0`\n *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)\n *\n *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])\n *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing\n */\nvar traverse = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function traverse(of, f, traversable) {\n  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : Object(_sequence__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(of, Object(_map__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(f, traversable));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (traverse);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/traverse.js?");

/***/ }),

/***/ "./node_modules/ramda/es/trim.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/trim.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\nvar ws = '\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003' + '\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028' + '\\u2029\\uFEFF';\nvar zeroWidth = '\\u200b';\nvar hasProtoTrim = typeof String.prototype.trim === 'function';\n/**\n * Removes (strips) whitespace from both ends of the string.\n *\n * @func\n * @memberOf R\n * @since v0.6.0\n * @category String\n * @sig String -> String\n * @param {String} str The string to trim.\n * @return {String} Trimmed version of `str`.\n * @example\n *\n *      R.trim('   xyz  '); //=> 'xyz'\n *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']\n */\nvar _trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? function trim(str) {\n  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');\n  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');\n  return str.replace(beginRx, '').replace(endRx, '');\n} : function trim(str) {\n  return str.trim();\n};\nvar trim = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_trim);\n/* harmony default export */ __webpack_exports__[\"default\"] = (trim);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/trim.js?");

/***/ }),

/***/ "./node_modules/ramda/es/tryCatch.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/tryCatch.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_arity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n\n/**\n * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned\n * function evaluates the `tryer`; if it does not throw, it simply returns the\n * result. If the `tryer` *does* throw, the returned function evaluates the\n * `catcher` function and returns its result. Note that for effective\n * composition with this function, both the `tryer` and `catcher` functions\n * must return the same type of results.\n *\n * @func\n * @memberOf R\n * @since v0.20.0\n * @category Function\n * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)\n * @param {Function} tryer The function that may throw.\n * @param {Function} catcher The function that will be evaluated if `tryer` throws.\n * @return {Function} A new function that will catch exceptions and send then to the catcher.\n * @example\n *\n *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true\n *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false\n */\nvar tryCatch = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(function _tryCatch(tryer, catcher) {\n  return Object(_internal_arity__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(tryer.length, function () {\n    try {\n      return tryer.apply(this, arguments);\n    } catch (e) {\n      return catcher.apply(this, Object(_internal_concat__WEBPACK_IMPORTED_MODULE_1__[\"default\"])([e], arguments));\n    }\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (tryCatch);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/tryCatch.js?");

/***/ }),

/***/ "./node_modules/ramda/es/type.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/type.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Gives a single-word string description of the (native) type of a value,\n * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not\n * attempt to distinguish user Object types any further, reporting them all as\n * 'Object'.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Type\n * @sig (* -> {*}) -> String\n * @param {*} val The value to test\n * @return {String}\n * @example\n *\n *      R.type({}); //=> \"Object\"\n *      R.type(1); //=> \"Number\"\n *      R.type(false); //=> \"Boolean\"\n *      R.type('s'); //=> \"String\"\n *      R.type(null); //=> \"Null\"\n *      R.type([]); //=> \"Array\"\n *      R.type(/[A-z]/); //=> \"RegExp\"\n *      R.type(() => {}); //=> \"Function\"\n *      R.type(undefined); //=> \"Undefined\"\n */\nvar type = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function type(val) {\n  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (type);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/type.js?");

/***/ }),

/***/ "./node_modules/ramda/es/unapply.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/unapply.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Takes a function `fn`, which takes a single array argument, and returns a\n * function which:\n *\n *   - takes any number of positional arguments;\n *   - passes these arguments to `fn` as an array; and\n *   - returns the result.\n *\n * In other words, `R.unapply` derives a variadic function from a function which\n * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Function\n * @sig ([*...] -> a) -> (*... -> a)\n * @param {Function} fn\n * @return {Function}\n * @see R.apply\n * @example\n *\n *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'\n * @symb R.unapply(f)(a, b) = f([a, b])\n */\nvar unapply = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function unapply(fn) {\n  return function () {\n    return fn(Array.prototype.slice.call(arguments, 0));\n  };\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (unapply);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/unapply.js?");

/***/ }),

/***/ "./node_modules/ramda/es/unary.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/unary.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _nAry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nAry */ \"./node_modules/ramda/es/nAry.js\");\n\n\n\n/**\n * Wraps a function of any arity (including nullary) in a function that accepts\n * exactly 1 parameter. Any extraneous parameters will not be passed to the\n * supplied function.\n *\n * @func\n * @memberOf R\n * @since v0.2.0\n * @category Function\n * @sig (* -> b) -> (a -> b)\n * @param {Function} fn The function to wrap.\n * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of\n *         arity 1.\n * @see R.binary, R.nAry\n * @example\n *\n *      var takesTwoArgs = function(a, b) {\n *        return [a, b];\n *      };\n *      takesTwoArgs.length; //=> 2\n *      takesTwoArgs(1, 2); //=> [1, 2]\n *\n *      var takesOneArg = R.unary(takesTwoArgs);\n *      takesOneArg.length; //=> 1\n *      // Only 1 argument is passed to the wrapped function\n *      takesOneArg(1, 2); //=> [1, undefined]\n * @symb R.unary(f)(a, b, c) = f(a)\n */\nvar unary = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function unary(fn) {\n  return Object(_nAry__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(1, fn);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (unary);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/unary.js?");

/***/ }),

/***/ "./node_modules/ramda/es/uncurryN.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/uncurryN.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n\n\n\n/**\n * Returns a function of arity `n` from a (manually) curried function.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category Function\n * @sig Number -> (a -> b) -> (a -> c)\n * @param {Number} length The arity for the returned function.\n * @param {Function} fn The function to uncurry.\n * @return {Function} A new function.\n * @see R.curry\n * @example\n *\n *      var addFour = a => b => c => d => a + b + c + d;\n *\n *      var uncurriedAddFour = R.uncurryN(4, addFour);\n *      uncurriedAddFour(1, 2, 3, 4); //=> 10\n */\nvar uncurryN = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function uncurryN(depth, fn) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(depth, function () {\n    var currentDepth = 1;\n    var value = fn;\n    var idx = 0;\n    var endIdx;\n    while (currentDepth <= depth && typeof value === 'function') {\n      endIdx = currentDepth === depth ? arguments.length : idx + value.length;\n      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));\n      currentDepth += 1;\n      idx = endIdx;\n    }\n    return value;\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (uncurryN);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/uncurryN.js?");

/***/ }),

/***/ "./node_modules/ramda/es/unfold.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unfold.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Builds a list from a seed value. Accepts an iterator function, which returns\n * either false to stop iteration or an array of length 2 containing the value\n * to add to the resulting list and the seed to be used in the next call to the\n * iterator function.\n *\n * The iterator function receives one argument: *(seed)*.\n *\n * @func\n * @memberOf R\n * @since v0.10.0\n * @category List\n * @sig (a -> [b]) -> * -> [b]\n * @param {Function} fn The iterator function. receives one argument, `seed`, and returns\n *        either false to quit iteration or an array of length two to proceed. The element\n *        at index 0 of this array will be added to the resulting array, and the element\n *        at index 1 will be passed to the next call to `fn`.\n * @param {*} seed The seed value.\n * @return {Array} The final list.\n * @example\n *\n *      var f = n => n > 50 ? false : [-n, n + 10];\n *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]\n * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]\n */\nvar unfold = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function unfold(fn, seed) {\n  var pair = fn(seed);\n  var result = [];\n  while (pair && pair.length) {\n    result[result.length] = pair[0];\n    pair = fn(pair[1]);\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (unfold);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/unfold.js?");

/***/ }),

/***/ "./node_modules/ramda/es/union.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/union.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compose */ \"./node_modules/ramda/es/compose.js\");\n/* harmony import */ var _uniq__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uniq */ \"./node_modules/ramda/es/uniq.js\");\n\n\n\n\n\n/**\n * Combines two lists into a set (i.e. no duplicates) composed of the elements\n * of each list.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig [*] -> [*] -> [*]\n * @param {Array} as The first list.\n * @param {Array} bs The second list.\n * @return {Array} The first and second lists concatenated, with\n *         duplicates removed.\n * @example\n *\n *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]\n */\nvar union = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/Object(_compose__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_uniq__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ __webpack_exports__[\"default\"] = (union);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/union.js?");

/***/ }),

/***/ "./node_modules/ramda/es/unionWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/unionWith.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _uniqWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uniqWith */ \"./node_modules/ramda/es/uniqWith.js\");\n\n\n\n\n/**\n * Combines two lists into a set (i.e. no duplicates) composed of the elements\n * of each list. Duplication is determined according to the value returned by\n * applying the supplied predicate to two list elements.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Relation\n * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]\n * @param {Function} pred A predicate used to test whether two items are equal.\n * @param {Array} list1 The first list.\n * @param {Array} list2 The second list.\n * @return {Array} The first and second lists concatenated, with\n *         duplicates removed.\n * @see R.union\n * @example\n *\n *      var l1 = [{a: 1}, {a: 2}];\n *      var l2 = [{a: 1}, {a: 4}];\n *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]\n */\nvar unionWith = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function unionWith(pred, list1, list2) {\n  return Object(_uniqWith__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(pred, Object(_internal_concat__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(list1, list2));\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (unionWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/unionWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/uniq.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/uniq.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ \"./node_modules/ramda/es/identity.js\");\n/* harmony import */ var _uniqBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uniqBy */ \"./node_modules/ramda/es/uniqBy.js\");\n\n\n\n/**\n * Returns a new list containing only one copy of each element in the original\n * list. [`R.equals`](#equals) is used to determine equality.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [a]\n * @param {Array} list The array to consider.\n * @return {Array} The list of unique items.\n * @example\n *\n *      R.uniq([1, 1, 2, 1]); //=> [1, 2]\n *      R.uniq([1, '1']);     //=> [1, '1']\n *      R.uniq([[42], [42]]); //=> [[42]]\n */\nvar uniq = /*#__PURE__*/Object(_uniqBy__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_identity__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (uniq);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/uniq.js?");

/***/ }),

/***/ "./node_modules/ramda/es/uniqBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/uniqBy.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_Set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_Set */ \"./node_modules/ramda/es/internal/_Set.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Returns a new list containing only one copy of each element in the original\n * list, based upon the value returned by applying the supplied function to\n * each list element. Prefers the first item if the supplied function produces\n * the same value on two items. [`R.equals`](#equals) is used for comparison.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category List\n * @sig (a -> b) -> [a] -> [a]\n * @param {Function} fn A function used to produce a value to use during comparisons.\n * @param {Array} list The array to consider.\n * @return {Array} The list of unique items.\n * @example\n *\n *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]\n */\nvar uniqBy = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function uniqBy(fn, list) {\n  var set = new _internal_Set__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  var result = [];\n  var idx = 0;\n  var appliedItem, item;\n\n  while (idx < list.length) {\n    item = list[idx];\n    appliedItem = fn(item);\n    if (set.add(appliedItem)) {\n      result.push(item);\n    }\n    idx += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (uniqBy);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/uniqBy.js?");

/***/ }),

/***/ "./node_modules/ramda/es/uniqWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/uniqWith.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_containsWith__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_containsWith */ \"./node_modules/ramda/es/internal/_containsWith.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n\n/**\n * Returns a new list containing only one copy of each element in the original\n * list, based upon the value returned by applying the supplied predicate to\n * two list elements. Prefers the first item if two items compare equal based\n * on the predicate.\n *\n * @func\n * @memberOf R\n * @since v0.2.0\n * @category List\n * @sig ((a, a) -> Boolean) -> [a] -> [a]\n * @param {Function} pred A predicate used to test whether two items are equal.\n * @param {Array} list The array to consider.\n * @return {Array} The list of unique items.\n * @example\n *\n *      var strEq = R.eqBy(String);\n *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]\n *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]\n *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]\n *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']\n */\nvar uniqWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function uniqWith(pred, list) {\n  var idx = 0;\n  var len = list.length;\n  var result = [];\n  var item;\n  while (idx < len) {\n    item = list[idx];\n    if (!Object(_internal_containsWith__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(pred, item, result)) {\n      result[result.length] = item;\n    }\n    idx += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (uniqWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/uniqWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/unless.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unless.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Tests the final argument by passing it to the given predicate function. If\n * the predicate is not satisfied, the function will return the result of\n * calling the `whenFalseFn` function with the same argument. If the predicate\n * is satisfied, the argument is returned as is.\n *\n * @func\n * @memberOf R\n * @since v0.18.0\n * @category Logic\n * @sig (a -> Boolean) -> (a -> a) -> a -> a\n * @param {Function} pred        A predicate function\n * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates\n *                               to a falsy value.\n * @param {*}        x           An object to test with the `pred` function and\n *                               pass to `whenFalseFn` if necessary.\n * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.\n * @see R.ifElse, R.when\n * @example\n *\n *      let safeInc = R.unless(R.isNil, R.inc);\n *      safeInc(null); //=> null\n *      safeInc(1); //=> 2\n */\nvar unless = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function unless(pred, whenFalseFn, x) {\n  return pred(x) ? x : whenFalseFn(x);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (unless);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/unless.js?");

/***/ }),

/***/ "./node_modules/ramda/es/unnest.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unnest.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_identity */ \"./node_modules/ramda/es/internal/_identity.js\");\n/* harmony import */ var _chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chain */ \"./node_modules/ramda/es/chain.js\");\n\n\n\n/**\n * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from\n * any [Chain](https://github.com/fantasyland/fantasy-land#chain).\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category List\n * @sig Chain c => c (c a) -> c a\n * @param {*} list\n * @return {*}\n * @see R.flatten, R.chain\n * @example\n *\n *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]\n *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]\n */\nvar unnest = /*#__PURE__*/Object(_chain__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_internal_identity__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (unnest);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/unnest.js?");

/***/ }),

/***/ "./node_modules/ramda/es/until.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/until.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Takes a predicate, a transformation function, and an initial value,\n * and returns a value of the same type as the initial value.\n * It does so by applying the transformation until the predicate is satisfied,\n * at which point it returns the satisfactory value.\n *\n * @func\n * @memberOf R\n * @since v0.20.0\n * @category Logic\n * @sig (a -> Boolean) -> (a -> a) -> a -> a\n * @param {Function} pred A predicate function\n * @param {Function} fn The iterator function\n * @param {*} init Initial value\n * @return {*} Final value that satisfies predicate\n * @example\n *\n *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128\n */\nvar until = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function until(pred, fn, init) {\n  var val = init;\n  while (!pred(val)) {\n    val = fn(val);\n  }\n  return val;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (until);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/until.js?");

/***/ }),

/***/ "./node_modules/ramda/es/update.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/update.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n/* harmony import */ var _adjust__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adjust */ \"./node_modules/ramda/es/adjust.js\");\n/* harmony import */ var _always__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./always */ \"./node_modules/ramda/es/always.js\");\n\n\n\n\n/**\n * Returns a new copy of the array with the element at the provided index\n * replaced with the given value.\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category List\n * @sig Number -> a -> [a] -> [a]\n * @param {Number} idx The index to update.\n * @param {*} x The value to exist at the given index of the returned array.\n * @param {Array|Arguments} list The source array-like object to be updated.\n * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.\n * @see R.adjust\n * @example\n *\n *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]\n *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]\n * @symb R.update(-1, a, [b, c]) = [b, a]\n * @symb R.update(0, a, [b, c]) = [a, c]\n * @symb R.update(1, a, [b, c]) = [b, a]\n */\nvar update = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function update(idx, x, list) {\n  return Object(_adjust__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_always__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(x), idx, list);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (update);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/update.js?");

/***/ }),

/***/ "./node_modules/ramda/es/useWith.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/useWith.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _curryN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN */ \"./node_modules/ramda/es/curryN.js\");\n\n\n\n/**\n * Accepts a function `fn` and a list of transformer functions and returns a\n * new curried function. When the new function is invoked, it calls the\n * function `fn` with parameters consisting of the result of calling each\n * supplied handler on successive arguments to the new function.\n *\n * If more arguments are passed to the returned function than transformer\n * functions, those arguments are passed directly to `fn` as additional\n * parameters. If you expect additional arguments that don't need to be\n * transformed, although you can ignore them, it's best to pass an identity\n * function so that the new function reports the correct arity.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)\n * @param {Function} fn The function to wrap.\n * @param {Array} transformers A list of transformer functions\n * @return {Function} The wrapped function.\n * @see R.converge\n * @example\n *\n *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81\n *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81\n *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32\n *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32\n * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))\n */\nvar useWith = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function useWith(fn, transformers) {\n  return Object(_curryN__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(transformers.length, function () {\n    var args = [];\n    var idx = 0;\n    while (idx < transformers.length) {\n      args.push(transformers[idx].call(this, arguments[idx]));\n      idx += 1;\n    }\n    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (useWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/useWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/values.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/values.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n/**\n * Returns a list of all the enumerable own properties of the supplied object.\n * Note that the order of the output array is not guaranteed across different\n * JS platforms.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig {k: v} -> [v]\n * @param {Object} obj The object to extract values from\n * @return {Array} An array of the values of the object's own properties.\n * @see R.valuesIn, R.keys\n * @example\n *\n *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]\n */\nvar values = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function values(obj) {\n  var props = Object(_keys__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(obj);\n  var len = props.length;\n  var vals = [];\n  var idx = 0;\n  while (idx < len) {\n    vals[idx] = obj[props[idx]];\n    idx += 1;\n  }\n  return vals;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (values);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/values.js?");

/***/ }),

/***/ "./node_modules/ramda/es/valuesIn.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/valuesIn.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n\n/**\n * Returns a list of all the properties, including prototype properties, of the\n * supplied object.\n * Note that the order of the output array is not guaranteed to be consistent\n * across different JS platforms.\n *\n * @func\n * @memberOf R\n * @since v0.2.0\n * @category Object\n * @sig {k: v} -> [v]\n * @param {Object} obj The object to extract values from\n * @return {Array} An array of the values of the object's own and prototype properties.\n * @see R.values, R.keysIn\n * @example\n *\n *      var F = function() { this.x = 'X'; };\n *      F.prototype.y = 'Y';\n *      var f = new F();\n *      R.valuesIn(f); //=> ['X', 'Y']\n */\nvar valuesIn = /*#__PURE__*/Object(_internal_curry1__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function valuesIn(obj) {\n  var prop;\n  var vs = [];\n  for (prop in obj) {\n    vs[vs.length] = obj[prop];\n  }\n  return vs;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (valuesIn);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/valuesIn.js?");

/***/ }),

/***/ "./node_modules/ramda/es/view.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/view.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n// `Const` is a functor that effectively ignores the function given to `map`.\nvar Const = function (x) {\n  return { value: x, 'fantasy-land/map': function () {\n      return this;\n    } };\n};\n\n/**\n * Returns a \"view\" of the given data structure, determined by the given lens.\n * The lens's focus determines which portion of the data structure is visible.\n *\n * @func\n * @memberOf R\n * @since v0.16.0\n * @category Object\n * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s\n * @sig Lens s a -> s -> a\n * @param {Lens} lens\n * @param {*} x\n * @return {*}\n * @see R.prop, R.lensIndex, R.lensProp\n * @example\n *\n *      var xLens = R.lensProp('x');\n *\n *      R.view(xLens, {x: 1, y: 2});  //=> 1\n *      R.view(xLens, {x: 4, y: 2});  //=> 4\n */\nvar view = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function view(lens, x) {\n  // Using `Const` effectively ignores the setter function of the `lens`,\n  // leaving the value returned by the getter function unmodified.\n  return lens(Const)(x).value;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (view);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/view.js?");

/***/ }),

/***/ "./node_modules/ramda/es/when.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/when.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Tests the final argument by passing it to the given predicate function. If\n * the predicate is satisfied, the function will return the result of calling\n * the `whenTrueFn` function with the same argument. If the predicate is not\n * satisfied, the argument is returned as is.\n *\n * @func\n * @memberOf R\n * @since v0.18.0\n * @category Logic\n * @sig (a -> Boolean) -> (a -> a) -> a -> a\n * @param {Function} pred       A predicate function\n * @param {Function} whenTrueFn A function to invoke when the `condition`\n *                              evaluates to a truthy value.\n * @param {*}        x          An object to test with the `pred` function and\n *                              pass to `whenTrueFn` if necessary.\n * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.\n * @see R.ifElse, R.unless\n * @example\n *\n *      // truncate :: String -> String\n *      var truncate = R.when(\n *        R.propSatisfies(R.gt(R.__, 10), 'length'),\n *        R.pipe(R.take(10), R.append('…'), R.join(''))\n *      );\n *      truncate('12345');         //=> '12345'\n *      truncate('0123456789ABC'); //=> '0123456789…'\n */\nvar when = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function when(pred, whenTrueFn, x) {\n  return pred(x) ? whenTrueFn(x) : x;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (when);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/when.js?");

/***/ }),

/***/ "./node_modules/ramda/es/where.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/where.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_has__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has */ \"./node_modules/ramda/es/internal/_has.js\");\n\n\n\n/**\n * Takes a spec object and a test object; returns true if the test satisfies\n * the spec. Each of the spec's own properties must be a predicate function.\n * Each predicate is applied to the value of the corresponding property of the\n * test object. `where` returns true if all the predicates return true, false\n * otherwise.\n *\n * `where` is well suited to declaratively expressing constraints for other\n * functions such as [`filter`](#filter) and [`find`](#find).\n *\n * @func\n * @memberOf R\n * @since v0.1.1\n * @category Object\n * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean\n * @param {Object} spec\n * @param {Object} testObj\n * @return {Boolean}\n * @see R.propSatisfies, R.whereEq\n * @example\n *\n *      // pred :: Object -> Boolean\n *      var pred = R.where({\n *        a: R.equals('foo'),\n *        b: R.complement(R.equals('bar')),\n *        x: R.gt(R.__, 10),\n *        y: R.lt(R.__, 20)\n *      });\n *\n *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true\n *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false\n *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false\n *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false\n *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false\n */\nvar where = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function where(spec, testObj) {\n  for (var prop in spec) {\n    if (Object(_internal_has__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(prop, spec) && !spec[prop](testObj[prop])) {\n      return false;\n    }\n  }\n  return true;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (where);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/where.js?");

/***/ }),

/***/ "./node_modules/ramda/es/whereEq.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/whereEq.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals */ \"./node_modules/ramda/es/equals.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ \"./node_modules/ramda/es/map.js\");\n/* harmony import */ var _where__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./where */ \"./node_modules/ramda/es/where.js\");\n\n\n\n\n\n/**\n * Takes a spec object and a test object; returns true if the test satisfies\n * the spec, false otherwise. An object satisfies the spec if, for each of the\n * spec's own properties, accessing that property of the object gives the same\n * value (in [`R.equals`](#equals) terms) as accessing that property of the\n * spec.\n *\n * `whereEq` is a specialization of [`where`](#where).\n *\n * @func\n * @memberOf R\n * @since v0.14.0\n * @category Object\n * @sig {String: *} -> {String: *} -> Boolean\n * @param {Object} spec\n * @param {Object} testObj\n * @return {Boolean}\n * @see R.propEq, R.where\n * @example\n *\n *      // pred :: Object -> Boolean\n *      var pred = R.whereEq({a: 1, b: 2});\n *\n *      pred({a: 1});              //=> false\n *      pred({a: 1, b: 2});        //=> true\n *      pred({a: 1, b: 2, c: 3});  //=> true\n *      pred({a: 1, b: 1});        //=> false\n */\nvar whereEq = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function whereEq(spec, testObj) {\n  return Object(_where__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Object(_map__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_equals__WEBPACK_IMPORTED_MODULE_1__[\"default\"], spec), testObj);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (whereEq);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/whereEq.js?");

/***/ }),

/***/ "./node_modules/ramda/es/without.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/without.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_contains__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_contains */ \"./node_modules/ramda/es/internal/_contains.js\");\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _flip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flip */ \"./node_modules/ramda/es/flip.js\");\n/* harmony import */ var _reject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reject */ \"./node_modules/ramda/es/reject.js\");\n\n\n\n\n\n/**\n * Returns a new list without values in the first argument.\n * [`R.equals`](#equals) is used to determine equality.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.19.0\n * @category List\n * @sig [a] -> [a] -> [a]\n * @param {Array} list1 The values to be removed from `list2`.\n * @param {Array} list2 The array to remove values from.\n * @return {Array} The new array without values in `list1`.\n * @see R.transduce, R.difference\n * @example\n *\n *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]\n */\nvar without = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (xs, list) {\n  return Object(_reject__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Object(_flip__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_internal_contains__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(xs), list);\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (without);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/without.js?");

/***/ }),

/***/ "./node_modules/ramda/es/xprod.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/xprod.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Creates a new list out of the two supplied by creating each possible pair\n * from the lists.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [b] -> [[a,b]]\n * @param {Array} as The first list.\n * @param {Array} bs The second list.\n * @return {Array} The list made by combining each possible pair from\n *         `as` and `bs` into pairs (`[a, b]`).\n * @example\n *\n *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]\n * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]\n */\nvar xprod = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function xprod(a, b) {\n  // = xprodWith(prepend); (takes about 3 times as long...)\n  var idx = 0;\n  var ilen = a.length;\n  var j;\n  var jlen = b.length;\n  var result = [];\n  while (idx < ilen) {\n    j = 0;\n    while (j < jlen) {\n      result[result.length] = [a[idx], b[j]];\n      j += 1;\n    }\n    idx += 1;\n  }\n  return result;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (xprod);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/xprod.js?");

/***/ }),

/***/ "./node_modules/ramda/es/zip.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/zip.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Creates a new list out of the two supplied by pairing up equally-positioned\n * items from both lists. The returned list is truncated to the length of the\n * shorter of the two input lists.\n * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig [a] -> [b] -> [[a,b]]\n * @param {Array} list1 The first array to consider.\n * @param {Array} list2 The second array to consider.\n * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.\n * @example\n *\n *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]\n * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]\n */\nvar zip = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function zip(a, b) {\n  var rv = [];\n  var idx = 0;\n  var len = Math.min(a.length, b.length);\n  while (idx < len) {\n    rv[idx] = [a[idx], b[idx]];\n    idx += 1;\n  }\n  return rv;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (zip);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/zip.js?");

/***/ }),

/***/ "./node_modules/ramda/es/zipObj.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/zipObj.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Creates a new object out of a list of keys and a list of values.\n * Key/value pairing is truncated to the length of the shorter of the two lists.\n * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.\n *\n * @func\n * @memberOf R\n * @since v0.3.0\n * @category List\n * @sig [String] -> [*] -> {String: *}\n * @param {Array} keys The array that will be properties on the output object.\n * @param {Array} values The list of values on the output object.\n * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.\n * @example\n *\n *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}\n */\nvar zipObj = /*#__PURE__*/Object(_internal_curry2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function zipObj(keys, values) {\n  var idx = 0;\n  var len = Math.min(keys.length, values.length);\n  var out = {};\n  while (idx < len) {\n    out[keys[idx]] = values[idx];\n    idx += 1;\n  }\n  return out;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (zipObj);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/zipObj.js?");

/***/ }),

/***/ "./node_modules/ramda/es/zipWith.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/zipWith.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _internal_curry3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3 */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n\n/**\n * Creates a new list out of the two supplied by applying the function to each\n * equally-positioned pair in the lists. The returned list is truncated to the\n * length of the shorter of the two input lists.\n *\n * @function\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig ((a, b) -> c) -> [a] -> [b] -> [c]\n * @param {Function} fn The function used to combine the two elements into one value.\n * @param {Array} list1 The first array to consider.\n * @param {Array} list2 The second array to consider.\n * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`\n *         using `fn`.\n * @example\n *\n *      var f = (x, y) => {\n *        // ...\n *      };\n *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);\n *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]\n * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]\n */\nvar zipWith = /*#__PURE__*/Object(_internal_curry3__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function zipWith(fn, a, b) {\n  var rv = [];\n  var idx = 0;\n  var len = Math.min(a.length, b.length);\n  while (idx < len) {\n    rv[idx] = fn(a[idx], b[idx]);\n    idx += 1;\n  }\n  return rv;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (zipWith);\n\n//# sourceURL=webpack:///./node_modules/ramda/es/zipWith.js?");

/***/ }),

/***/ "./node_modules/ramda/src/curryN.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/curryN.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ \"./node_modules/ramda/src/internal/_arity.js\");\n\nvar _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ \"./node_modules/ramda/src/internal/_curry1.js\");\n\nvar _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/ramda/src/internal/_curry2.js\");\n\nvar _curryN = /*#__PURE__*/__webpack_require__(/*! ./internal/_curryN */ \"./node_modules/ramda/src/internal/_curryN.js\");\n\n/**\n * Returns a curried equivalent of the provided function, with the specified\n * arity. The curried function has two unusual capabilities. First, its\n * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the\n * following are equivalent:\n *\n *   - `g(1)(2)(3)`\n *   - `g(1)(2, 3)`\n *   - `g(1, 2)(3)`\n *   - `g(1, 2, 3)`\n *\n * Secondly, the special placeholder value [`R.__`](#__) may be used to specify\n * \"gaps\", allowing partial application of any combination of arguments,\n * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),\n * the following are equivalent:\n *\n *   - `g(1, 2, 3)`\n *   - `g(_, 2, 3)(1)`\n *   - `g(_, _, 3)(1)(2)`\n *   - `g(_, _, 3)(1, 2)`\n *   - `g(_, 2)(1)(3)`\n *   - `g(_, 2)(1, 3)`\n *   - `g(_, 2)(_, 3)(1)`\n *\n * @func\n * @memberOf R\n * @since v0.5.0\n * @category Function\n * @sig Number -> (* -> a) -> (* -> a)\n * @param {Number} length The arity for the returned function.\n * @param {Function} fn The function to curry.\n * @return {Function} A new, curried function.\n * @see R.curry\n * @example\n *\n *      var sumArgs = (...args) => R.sum(args);\n *\n *      var curriedAddFourNumbers = R.curryN(4, sumArgs);\n *      var f = curriedAddFourNumbers(1, 2);\n *      var g = f(3);\n *      g(4); //=> 10\n */\n\n\nvar curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {\n  if (length === 1) {\n    return _curry1(fn);\n  }\n  return _arity(length, _curryN(length, [], fn));\n});\nmodule.exports = curryN;\n\n//# sourceURL=webpack:///./node_modules/ramda/src/curryN.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_arity.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_arity.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arity(n, fn) {\n  /* eslint-disable no-unused-vars */\n  switch (n) {\n    case 0:\n      return function () {\n        return fn.apply(this, arguments);\n      };\n    case 1:\n      return function (a0) {\n        return fn.apply(this, arguments);\n      };\n    case 2:\n      return function (a0, a1) {\n        return fn.apply(this, arguments);\n      };\n    case 3:\n      return function (a0, a1, a2) {\n        return fn.apply(this, arguments);\n      };\n    case 4:\n      return function (a0, a1, a2, a3) {\n        return fn.apply(this, arguments);\n      };\n    case 5:\n      return function (a0, a1, a2, a3, a4) {\n        return fn.apply(this, arguments);\n      };\n    case 6:\n      return function (a0, a1, a2, a3, a4, a5) {\n        return fn.apply(this, arguments);\n      };\n    case 7:\n      return function (a0, a1, a2, a3, a4, a5, a6) {\n        return fn.apply(this, arguments);\n      };\n    case 8:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7) {\n        return fn.apply(this, arguments);\n      };\n    case 9:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {\n        return fn.apply(this, arguments);\n      };\n    case 10:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {\n        return fn.apply(this, arguments);\n      };\n    default:\n      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');\n  }\n}\nmodule.exports = _arity;\n\n//# sourceURL=webpack:///./node_modules/ramda/src/internal/_arity.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry1.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry1.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n/**\n * Optimized internal one-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\n\nfunction _curry1(fn) {\n  return function f1(a) {\n    if (arguments.length === 0 || _isPlaceholder(a)) {\n      return f1;\n    } else {\n      return fn.apply(this, arguments);\n    }\n  };\n}\nmodule.exports = _curry1;\n\n//# sourceURL=webpack:///./node_modules/ramda/src/internal/_curry1.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry2.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry2.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ \"./node_modules/ramda/src/internal/_curry1.js\");\n\nvar _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n/**\n * Optimized internal two-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\n\nfunction _curry2(fn) {\n  return function f2(a, b) {\n    switch (arguments.length) {\n      case 0:\n        return f2;\n      case 1:\n        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {\n          return fn(a, _b);\n        });\n      default:\n        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {\n          return fn(_a, b);\n        }) : _isPlaceholder(b) ? _curry1(function (_b) {\n          return fn(a, _b);\n        }) : fn(a, b);\n    }\n  };\n}\nmodule.exports = _curry2;\n\n//# sourceURL=webpack:///./node_modules/ramda/src/internal/_curry2.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curryN.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curryN.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _arity = /*#__PURE__*/__webpack_require__(/*! ./_arity */ \"./node_modules/ramda/src/internal/_arity.js\");\n\nvar _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ \"./node_modules/ramda/src/internal/_isPlaceholder.js\");\n\n/**\n * Internal curryN function.\n *\n * @private\n * @category Function\n * @param {Number} length The arity of the curried function.\n * @param {Array} received An array of arguments received thus far.\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\n\nfunction _curryN(length, received, fn) {\n  return function () {\n    var combined = [];\n    var argsIdx = 0;\n    var left = length;\n    var combinedIdx = 0;\n    while (combinedIdx < received.length || argsIdx < arguments.length) {\n      var result;\n      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {\n        result = received[combinedIdx];\n      } else {\n        result = arguments[argsIdx];\n        argsIdx += 1;\n      }\n      combined[combinedIdx] = result;\n      if (!_isPlaceholder(result)) {\n        left -= 1;\n      }\n      combinedIdx += 1;\n    }\n    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));\n  };\n}\nmodule.exports = _curryN;\n\n//# sourceURL=webpack:///./node_modules/ramda/src/internal/_curryN.js?");

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isPlaceholder.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isPlaceholder.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _isPlaceholder(a) {\n       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;\n}\nmodule.exports = _isPlaceholder;\n\n//# sourceURL=webpack:///./node_modules/ramda/src/internal/_isPlaceholder.js?");

/***/ }),

/***/ "./node_modules/universal-router/generateUrls/module.js":
/*!**************************************************************!*\
  !*** ./node_modules/universal-router/generateUrls/module.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./node_modules/universal-router/module.js\");\n/*! Universal Router | MIT License | https://www.kriasoft.com/universal-router/ */\n\n\n\nvar pathToRegexp = ___WEBPACK_IMPORTED_MODULE_0__[\"default\"].pathToRegexp;\nvar cache = new Map();\n\nfunction cacheRoutes(routesByName, route, routes) {\n  if (routesByName.has(route.name)) {\n    throw new Error(\"Route \\\"\" + route.name + \"\\\" already exists\");\n  }\n\n  if (route.name) {\n    routesByName.set(route.name, route);\n  }\n\n  if (routes) {\n    for (var i = 0; i < routes.length; i++) {\n      var childRoute = routes[i];\n      childRoute.parent = route;\n      cacheRoutes(routesByName, childRoute, childRoute.children);\n    }\n  }\n}\n\nfunction generateUrls(router, options) {\n  if (options === void 0) {\n    options = {};\n  }\n\n  if (!(router instanceof ___WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n    throw new TypeError('An instance of UniversalRouter is expected');\n  }\n\n  router.routesByName = router.routesByName || new Map();\n  return function (routeName, params) {\n    var route = router.routesByName.get(routeName);\n\n    if (!route) {\n      router.routesByName.clear();\n      cacheRoutes(router.routesByName, router.root, router.root.children);\n      route = router.routesByName.get(routeName);\n\n      if (!route) {\n        throw new Error(\"Route \\\"\" + routeName + \"\\\" not found\");\n      }\n    }\n\n    var regexp = cache.get(route.fullPath);\n\n    if (!regexp) {\n      var fullPath = '';\n      var rt = route;\n\n      while (rt) {\n        var path = Array.isArray(rt.path) ? rt.path[0] : rt.path;\n\n        if (path) {\n          fullPath = path + fullPath;\n        }\n\n        rt = rt.parent;\n      }\n\n      var tokens = pathToRegexp.parse(fullPath);\n      var toPath = pathToRegexp.tokensToFunction(tokens);\n      var keys = Object.create(null);\n\n      for (var i = 0; i < tokens.length; i++) {\n        if (typeof tokens[i] !== 'string') {\n          keys[tokens[i].name] = true;\n        }\n      }\n\n      regexp = {\n        toPath: toPath,\n        keys: keys\n      };\n      cache.set(fullPath, regexp);\n      route.fullPath = fullPath;\n    }\n\n    var url = router.baseUrl + regexp.toPath(params, options) || '/';\n\n    if (options.stringifyQueryParams && params) {\n      var queryParams = {};\n\n      var _keys = Object.keys(params);\n\n      for (var _i = 0; _i < _keys.length; _i++) {\n        var key = _keys[_i];\n\n        if (!regexp.keys[key]) {\n          queryParams[key] = params[key];\n        }\n      }\n\n      var query = options.stringifyQueryParams(queryParams);\n\n      if (query) {\n        url += query.charAt(0) === '?' ? query : \"?\" + query;\n      }\n    }\n\n    return url;\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (generateUrls);\n//# sourceMappingURL=module.js.map\n\n\n//# sourceURL=webpack:///./node_modules/universal-router/generateUrls/module.js?");

/***/ }),

/***/ "./node_modules/universal-router/module.js":
/*!*************************************************!*\
  !*** ./node_modules/universal-router/module.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path-to-regexp */ \"./node_modules/path-to-regexp/index.js\");\n/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_0__);\n/*! Universal Router | MIT License | https://www.kriasoft.com/universal-router/ */\n\n\n\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar cache = new Map();\n\nfunction decodeParam(val) {\n  try {\n    return decodeURIComponent(val);\n  } catch (err) {\n    return val;\n  }\n}\n\nfunction matchPath(route, pathname, parentKeys, parentParams) {\n  var end = !route.children;\n  var cacheKey = (route.path || '') + \"|\" + end;\n  var regexp = cache.get(cacheKey);\n\n  if (!regexp) {\n    var keys = [];\n    regexp = {\n      keys: keys,\n      pattern: path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default()(route.path || '', keys, {\n        end: end\n      })\n    };\n    cache.set(cacheKey, regexp);\n  }\n\n  var m = regexp.pattern.exec(pathname);\n\n  if (!m) {\n    return null;\n  }\n\n  var path = m[0];\n  var params = Object.assign({}, parentParams);\n\n  for (var i = 1; i < m.length; i++) {\n    var key = regexp.keys[i - 1];\n    var prop = key.name;\n    var value = m[i];\n\n    if (value !== undefined || !hasOwnProperty.call(params, prop)) {\n      if (key.repeat) {\n        params[prop] = value ? value.split(key.delimiter).map(decodeParam) : [];\n      } else {\n        params[prop] = value ? decodeParam(value) : value;\n      }\n    }\n  }\n\n  return {\n    path: !end && path.charAt(path.length - 1) === '/' ? path.substr(1) : path,\n    keys: parentKeys.concat(regexp.keys),\n    params: params\n  };\n}\n\nfunction matchRoute(route, baseUrl, pathname, parentKeys, parentParams) {\n  var match;\n  var childMatches;\n  var childIndex = 0;\n  return {\n    next: function next(routeToSkip) {\n      if (route === routeToSkip) {\n        return {\n          done: true\n        };\n      }\n\n      if (!match) {\n        match = matchPath(route, pathname, parentKeys, parentParams);\n\n        if (match) {\n          return {\n            done: false,\n            value: {\n              route: route,\n              baseUrl: baseUrl,\n              path: match.path,\n              keys: match.keys,\n              params: match.params\n            }\n          };\n        }\n      }\n\n      if (match && route.children) {\n        while (childIndex < route.children.length) {\n          if (!childMatches) {\n            var childRoute = route.children[childIndex];\n            childRoute.parent = route;\n            childMatches = matchRoute(childRoute, baseUrl + match.path, pathname.substr(match.path.length), match.keys, match.params);\n          }\n\n          var childMatch = childMatches.next(routeToSkip);\n\n          if (!childMatch.done) {\n            return {\n              done: false,\n              value: childMatch.value\n            };\n          }\n\n          childMatches = null;\n          childIndex++;\n        }\n      }\n\n      return {\n        done: true\n      };\n    }\n  };\n}\n\nfunction resolveRoute(context, params) {\n  if (typeof context.route.action === 'function') {\n    return context.route.action(context, params);\n  }\n\n  return undefined;\n}\n\nfunction isChildRoute(parentRoute, childRoute) {\n  var route = childRoute;\n\n  while (route) {\n    route = route.parent;\n\n    if (route === parentRoute) {\n      return true;\n    }\n  }\n\n  return false;\n}\n\nvar UniversalRouter = function () {\n  function UniversalRouter(routes, options) {\n    if (options === void 0) {\n      options = {};\n    }\n\n    if (Object(routes) !== routes) {\n      throw new TypeError('Invalid routes');\n    }\n\n    this.baseUrl = options.baseUrl || '';\n    this.errorHandler = options.errorHandler;\n    this.resolveRoute = options.resolveRoute || resolveRoute;\n    this.context = Object.assign({\n      router: this\n    }, options.context);\n    this.root = Array.isArray(routes) ? {\n      path: '',\n      children: routes,\n      parent: null\n    } : routes;\n    this.root.parent = null;\n  }\n\n  var _proto = UniversalRouter.prototype;\n\n  _proto.resolve = function resolve(pathnameOrContext) {\n    var _this = this;\n\n    var context = Object.assign({}, this.context, typeof pathnameOrContext === 'string' ? {\n      pathname: pathnameOrContext\n    } : pathnameOrContext);\n    var match = matchRoute(this.root, this.baseUrl, context.pathname.substr(this.baseUrl.length), [], null);\n    var resolve = this.resolveRoute;\n    var matches = null;\n    var nextMatches = null;\n    var currentContext = context;\n\n    function next(resume, parent, prevResult) {\n      if (parent === void 0) {\n        parent = matches.value.route;\n      }\n\n      var routeToSkip = prevResult === null && matches.value.route;\n      matches = nextMatches || match.next(routeToSkip);\n      nextMatches = null;\n\n      if (!resume) {\n        if (matches.done || !isChildRoute(parent, matches.value.route)) {\n          nextMatches = matches;\n          return Promise.resolve(null);\n        }\n      }\n\n      if (matches.done) {\n        var error = new Error('Page not found');\n        error.context = context;\n        error.code = 404;\n        return Promise.reject(error);\n      }\n\n      currentContext = Object.assign({}, context, matches.value);\n      return Promise.resolve(resolve(currentContext, matches.value.params)).then(function (result) {\n        if (result !== null && result !== undefined) {\n          return result;\n        }\n\n        return next(resume, parent, result);\n      });\n    }\n\n    context.next = next;\n    return Promise.resolve().then(function () {\n      return next(true, _this.root);\n    }).catch(function (error) {\n      error.context = error.context || currentContext;\n      error.code = error.code || 500;\n\n      if (_this.errorHandler) {\n        return _this.errorHandler(error);\n      }\n\n      throw error;\n    });\n  };\n\n  return UniversalRouter;\n}();\n\nUniversalRouter.pathToRegexp = path_to_regexp__WEBPACK_IMPORTED_MODULE_0___default.a;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (UniversalRouter);\n//# sourceMappingURL=module.js.map\n\n\n//# sourceURL=webpack:///./node_modules/universal-router/module.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  return bth[buf[i++]] + bth[buf[i++]] +\n          bth[buf[i++]] + bth[buf[i++]] + '-' +\n          bth[buf[i++]] + bth[buf[i++]] + '-' +\n          bth[buf[i++]] + bth[buf[i++]] + '-' +\n          bth[buf[i++]] + bth[buf[i++]] + '-' +\n          bth[buf[i++]] + bth[buf[i++]] +\n          bth[buf[i++]] + bth[buf[i++]] +\n          bth[buf[i++]] + bth[buf[i++]];\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\nvar _clockseq;\n\n// Previous uuid creation time\nvar _lastMSecs = 0;\nvar _lastNSecs = 0;\n\n// See https://github.com/broofa/node-uuid for API details\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || [];\n\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;\n\n  // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n  if (node == null || clockseq == null) {\n    var seedBytes = rng();\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [\n        seedBytes[0] | 0x01,\n        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]\n      ];\n    }\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  }\n\n  // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();\n\n  // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;\n\n  // Time since last uuid creation (in msecs)\n  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;\n\n  // Per 4.2.1.2, Bump clockseq on clock regression\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  }\n\n  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  }\n\n  // Per 4.2.1.2 Throw error if too many uuids are requested\n  if (nsecs >= 10000) {\n    throw new Error('uuid.v1(): Can\\'t create more than 10M uuids/sec');\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq;\n\n  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n  msecs += 12219292800000;\n\n  // `time_low`\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff;\n\n  // `time_mid`\n  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff;\n\n  // `time_high_and_version`\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n  b[i++] = tmh >>> 16 & 0xff;\n\n  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n  b[i++] = clockseq >>> 8 | 0x80;\n\n  // `clock_seq_low`\n  b[i++] = clockseq & 0xff;\n\n  // `node`\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf ? buf : bytesToUuid(b);\n}\n\nmodule.exports = v1;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v1.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./part-04/04/app.jsx":
/*!****************************!*\
  !*** ./part-04/04/app.jsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createApp = exports.createAppModel = undefined;\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nvar _homePage = __webpack_require__(/*! ./homePage */ \"./part-04/04/homePage.jsx\");\n\nvar _beerListPage = __webpack_require__(/*! ./beerListPage */ \"./part-04/04/beerListPage.jsx\");\n\nvar _beerDetailsPage = __webpack_require__(/*! ./beerDetailsPage */ \"./part-04/04/beerDetailsPage.jsx\");\n\nvar _breweryListPage = __webpack_require__(/*! ./breweryListPage */ \"./part-04/04/breweryListPage.jsx\");\n\nvar _breweryDetailsPage = __webpack_require__(/*! ./breweryDetailsPage */ \"./part-04/04/breweryDetailsPage.jsx\");\n\nvar _breweryBeerListPage = __webpack_require__(/*! ./breweryBeerListPage */ \"./part-04/04/breweryBeerListPage.jsx\");\n\nvar _breweryBeerDetailsPage = __webpack_require__(/*! ./breweryBeerDetailsPage */ \"./part-04/04/breweryBeerDetailsPage.jsx\");\n\nvar _pleaseWait = __webpack_require__(/*! ./pleaseWait */ \"./part-04/04/pleaseWait.jsx\");\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar createAppModel = exports.createAppModel = function createAppModel() {\n  return {\n    page: Object.assign({ params: {} }, _navigation.pages.home)\n  };\n};\n\nvar createApp = exports.createApp = function createApp(update, navigation, router) {\n  var _pageMap;\n\n  var homePage = (0, _homePage.createHomePage)(update);\n  var beerListPage = (0, _beerListPage.createBeerListPage)({\n    beerDetails: function beerDetails(beerId) {\n      return function (_evt) {\n        return navigation.navigateToBeerDetails({ beerId: beerId });\n      };\n    }\n  }, router);\n  var beerDetailsPage = (0, _beerDetailsPage.createBeerDetailsPage)(update, navigation, router);\n  var breweryListPage = (0, _breweryListPage.createBreweryListPage)(update, navigation, router);\n  var breweryDetailsPage = (0, _breweryDetailsPage.createBreweryDetailsPage)(update, navigation, router);\n  var breweryBeerListPage = (0, _breweryBeerListPage.createBreweryBeerListPage)(update, navigation, router);\n  var breweryBeerDetailsPage = (0, _breweryBeerDetailsPage.createBreweryBeerDetailsPage)(update, navigation, router);\n\n  var pageMap = (_pageMap = {}, _defineProperty(_pageMap, _navigation.pages.home.id, homePage), _defineProperty(_pageMap, _navigation.pages.beerList.id, beerListPage), _defineProperty(_pageMap, _navigation.pages.beerDetails.id, beerDetailsPage), _defineProperty(_pageMap, _navigation.pages.breweryList.id, breweryListPage), _defineProperty(_pageMap, _navigation.pages.breweryDetails.id, breweryDetailsPage), _defineProperty(_pageMap, _navigation.pages.breweryBeerList.id, breweryBeerListPage), _defineProperty(_pageMap, _navigation.pages.breweryBeerDetails.id, breweryBeerDetailsPage), _pageMap);\n\n  var pleaseWait = (0, _pleaseWait.createPleaseWait)();\n\n  return {\n    view: function view(model) {\n      var currentPageId = pageMap[model.page.id] ? model.page.id : _navigation.pages.home.id;\n      var component = pageMap[currentPageId];\n      var currentTab = model.page.tab;\n      var isActive = function isActive(tab) {\n        return tab === currentTab ? \"active\" : \"\";\n      };\n\n      return React.createElement(\n        \"div\",\n        null,\n        React.createElement(\n          \"nav\",\n          { className: \"navbar navbar-default\" },\n          React.createElement(\n            \"ul\",\n            { className: \"nav navbar-nav\" },\n            React.createElement(\n              \"li\",\n              { className: isActive(_navigation.pages.home.tab) },\n              React.createElement(\n                \"a\",\n                { href: router.getLink(_navigation.pages.home.id) },\n                \"Home\"\n              )\n            ),\n            React.createElement(\n              \"li\",\n              { className: isActive(_navigation.pages.beerList.tab) },\n              React.createElement(\n                \"a\",\n                { href: router.getLink(_navigation.pages.beerList.id) },\n                \"Beer\"\n              )\n            ),\n            React.createElement(\n              \"li\",\n              { className: isActive(_navigation.pages.breweryList.tab) },\n              React.createElement(\n                \"a\",\n                { href: router.getLink(_navigation.pages.breweryList.id) },\n                \"Brewery\"\n              )\n            ),\n            React.createElement(\n              \"li\",\n              { className: \"btn\" },\n              React.createElement(\n                \"button\",\n                { className: \"btn btn-default\",\n                  onClick: function onClick(_evt) {\n                    return navigation.navigateToHome();\n                  } },\n                \"Home\"\n              )\n            ),\n            React.createElement(\n              \"li\",\n              { className: \"btn\" },\n              React.createElement(\n                \"button\",\n                { className: \"btn btn-default\",\n                  onClick: function onClick(_evt) {\n                    return navigation.navigateToBeerList();\n                  } },\n                \"Beer\"\n              )\n            ),\n            React.createElement(\n              \"li\",\n              { className: \"btn\" },\n              React.createElement(\n                \"button\",\n                { className: \"btn btn-default\",\n                  onClick: function onClick(_evt) {\n                    return navigation.navigateToBreweryList();\n                  } },\n                \"Brewery\"\n              )\n            )\n          )\n        ),\n        model.operationInProgress ? pleaseWait.view() : component.view(model)\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/app.jsx?");

/***/ }),

/***/ "./part-04/04/backToBeerList.jsx":
/*!***************************************!*\
  !*** ./part-04/04/backToBeerList.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBackToBeerList = undefined;\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nvar createBackToBeerList = exports.createBackToBeerList = function createBackToBeerList(actions, router) {\n  return {\n    view: function view(_model) {\n      return React.createElement(\n        \"div\",\n        null,\n        React.createElement(\n          \"div\",\n          null,\n          React.createElement(\n            \"a\",\n            { href: router.getLink(_navigation.pages.beerList.id) },\n            \"Back to beer list\"\n          )\n        ),\n        React.createElement(\n          \"div\",\n          null,\n          React.createElement(\n            \"button\",\n            { className: \"btn btn-default btn-xs\",\n              onClick: actions.navigateToBeerList },\n            \"Back to beer list\"\n          )\n        )\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/backToBeerList.jsx?");

/***/ }),

/***/ "./part-04/04/beerDetails.jsx":
/*!************************************!*\
  !*** ./part-04/04/beerDetails.jsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar createBeerDetails = exports.createBeerDetails = function createBeerDetails() {\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"p\",\n        null,\n        \"Details of beer \",\n        model.page.params.beerId\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/beerDetails.jsx?");

/***/ }),

/***/ "./part-04/04/beerDetailsPage.jsx":
/*!****************************************!*\
  !*** ./part-04/04/beerDetailsPage.jsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBeerDetailsPage = undefined;\n\nvar _beerDetails = __webpack_require__(/*! ./beerDetails */ \"./part-04/04/beerDetails.jsx\");\n\nvar _backToBeerList = __webpack_require__(/*! ./backToBeerList */ \"./part-04/04/backToBeerList.jsx\");\n\nvar createBeerDetailsPage = exports.createBeerDetailsPage = function createBeerDetailsPage(update, navigation, router) {\n  var actions = {\n    navigateToBeerList: function navigateToBeerList() {\n      return navigation.navigateToBeerList();\n    }\n  };\n\n  var beerDetails = (0, _beerDetails.createBeerDetails)();\n  var backToBeerList = (0, _backToBeerList.createBackToBeerList)(actions, router);\n\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"div\",\n        null,\n        beerDetails.view(model),\n        backToBeerList.view(model)\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/beerDetailsPage.jsx?");

/***/ }),

/***/ "./part-04/04/beerList.jsx":
/*!*********************************!*\
  !*** ./part-04/04/beerList.jsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar createBeerList = exports.createBeerList = function createBeerList(actions, beerListLink) {\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"div\",\n        null,\n        React.createElement(\n          \"p\",\n          null,\n          \"Beer List\"\n        ),\n        React.createElement(\n          \"ul\",\n          null,\n          model.beerList.map(function (beer) {\n            return React.createElement(\n              \"li\",\n              { key: beer.id },\n              React.createElement(\n                \"a\",\n                { href: beerListLink(beer.id) },\n                beer.title\n              ),\n              \" \",\n              React.createElement(\n                \"button\",\n                { className: \"btn btn-default btn-xs\",\n                  onClick: actions.beerDetails(beer.id) },\n                beer.title\n              )\n            );\n          })\n        )\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/beerList.jsx?");

/***/ }),

/***/ "./part-04/04/beerListPage.jsx":
/*!*************************************!*\
  !*** ./part-04/04/beerListPage.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBeerListPage = undefined;\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nvar _beerList = __webpack_require__(/*! ./beerList */ \"./part-04/04/beerList.jsx\");\n\nvar createBeerListPage = exports.createBeerListPage = function createBeerListPage(actions, router) {\n  var beerList = (0, _beerList.createBeerList)(actions, function (beerId) {\n    return router.getLink(_navigation.pages.beerDetails.id, { beerId: beerId });\n  });\n\n  return {\n    view: function view(model) {\n      return beerList.view(model);\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/beerListPage.jsx?");

/***/ }),

/***/ "./part-04/04/breweryBeerDetailsPage.jsx":
/*!***********************************************!*\
  !*** ./part-04/04/breweryBeerDetailsPage.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBreweryBeerDetailsPage = undefined;\n\nvar _breweryBeerListPage = __webpack_require__(/*! ./breweryBeerListPage */ \"./part-04/04/breweryBeerListPage.jsx\");\n\nvar createBreweryBeerDetailsPage = exports.createBreweryBeerDetailsPage = function createBreweryBeerDetailsPage(update, navigation, router) {\n  var breweryBeerListPage = (0, _breweryBeerListPage.createBreweryBeerListPage)(update, navigation, router);\n\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"div\",\n        null,\n        breweryBeerListPage.view(model),\n        \"Details of beer \",\n        model.page.params.beerId\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/breweryBeerDetailsPage.jsx?");

/***/ }),

/***/ "./part-04/04/breweryBeerListPage.jsx":
/*!********************************************!*\
  !*** ./part-04/04/breweryBeerListPage.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBreweryBeerListPage = undefined;\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nvar _breweryDetailsPage = __webpack_require__(/*! ./breweryDetailsPage */ \"./part-04/04/breweryDetailsPage.jsx\");\n\nvar _beerList = __webpack_require__(/*! ./beerList */ \"./part-04/04/beerList.jsx\");\n\nvar createBreweryBeerListPage = exports.createBreweryBeerListPage = function createBreweryBeerListPage(update, navigation, router) {\n  var breweryDetailsPage = (0, _breweryDetailsPage.createBreweryDetailsPage)(update, navigation, router);\n\n  return {\n    view: function view(model) {\n      var beerList = (0, _beerList.createBeerList)({ beerDetails: function beerDetails(beerId) {\n          return function (_evt) {\n            return navigation.navigateToBreweryBeerDetails({\n              breweryId: model.brewery.id,\n              beerId: beerId\n            });\n          };\n        }\n      }, function (beerId) {\n        return router.getLink(_navigation.pages.breweryBeerDetails.id, { breweryId: model.brewery.id, beerId: beerId });\n      });\n\n      return React.createElement(\n        \"div\",\n        null,\n        breweryDetailsPage.view(model),\n        beerList.view(model.brewery)\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/breweryBeerListPage.jsx?");

/***/ }),

/***/ "./part-04/04/breweryDetails.jsx":
/*!***************************************!*\
  !*** ./part-04/04/breweryDetails.jsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar createBreweryDetails = exports.createBreweryDetails = function createBreweryDetails() {\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"p\",\n        null,\n        \"Details of brewery \",\n        model.brewery.id\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/breweryDetails.jsx?");

/***/ }),

/***/ "./part-04/04/breweryDetailsPage.jsx":
/*!*******************************************!*\
  !*** ./part-04/04/breweryDetailsPage.jsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBreweryDetailsPage = undefined;\n\nvar _breweryListPage = __webpack_require__(/*! ./breweryListPage */ \"./part-04/04/breweryListPage.jsx\");\n\nvar _breweryDetails = __webpack_require__(/*! ./breweryDetails */ \"./part-04/04/breweryDetails.jsx\");\n\nvar _loadBeerList = __webpack_require__(/*! ./loadBeerList */ \"./part-04/04/loadBeerList.jsx\");\n\nvar createBreweryDetailsPage = exports.createBreweryDetailsPage = function createBreweryDetailsPage(update, navigation, router) {\n  var breweryListPage = (0, _breweryListPage.createBreweryListPage)(update, navigation, router);\n  var breweryDetails = (0, _breweryDetails.createBreweryDetails)();\n  var loadBeerList = (0, _loadBeerList.createLoadBeerList)({\n    loadBeerList: function loadBeerList(params) {\n      return function (_evt) {\n        return navigation.navigateToBreweryBeerList(params);\n      };\n    } //FIXME\n  }, router);\n\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"div\",\n        null,\n        breweryListPage.view(model),\n        breweryDetails.view(model),\n        loadBeerList.view(model)\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/breweryDetailsPage.jsx?");

/***/ }),

/***/ "./part-04/04/breweryList.jsx":
/*!************************************!*\
  !*** ./part-04/04/breweryList.jsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBreweryList = undefined;\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nvar createBreweryList = exports.createBreweryList = function createBreweryList(actions, router) {\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"ul\",\n        null,\n        model.breweryList.map(function (brewery) {\n          return React.createElement(\n            \"li\",\n            { key: brewery.id },\n            React.createElement(\n              \"a\",\n              { href: router.getLink(_navigation.pages.breweryDetails.id, { breweryId: brewery.id })\n              },\n              brewery.title\n            ),\n            \" \",\n            React.createElement(\n              \"button\",\n              { className: \"btn btn-default btn-xs\",\n                onClick: actions.breweryDetails({ breweryId: brewery.id }) },\n              brewery.title\n            )\n          );\n        })\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/breweryList.jsx?");

/***/ }),

/***/ "./part-04/04/breweryListPage.jsx":
/*!****************************************!*\
  !*** ./part-04/04/breweryListPage.jsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createBreweryListPage = undefined;\n\nvar _breweryList = __webpack_require__(/*! ./breweryList */ \"./part-04/04/breweryList.jsx\");\n\nvar createBreweryListPage = exports.createBreweryListPage = function createBreweryListPage(update, navigation, router) {\n  var actions = {\n    breweryDetails: function breweryDetails(params) {\n      return function (_evt) {\n        return navigation.navigateToBreweryDetails(params);\n      };\n    }\n  };\n\n  var breweryList = (0, _breweryList.createBreweryList)(actions, router);\n\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"div\",\n        null,\n        React.createElement(\n          \"p\",\n          null,\n          \"Breweries\"\n        ),\n        breweryList.view(model)\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/breweryListPage.jsx?");

/***/ }),

/***/ "./part-04/04/homePage.jsx":
/*!*********************************!*\
  !*** ./part-04/04/homePage.jsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar createHomePage = exports.createHomePage = function createHomePage(_update) {\n  return {\n    view: function view(_model) {\n      return React.createElement(\n        \"div\",\n        null,\n        \"Home\"\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/homePage.jsx?");

/***/ }),

/***/ "./part-04/04/index.js":
/*!*****************************!*\
  !*** ./part-04/04/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _flyd = __webpack_require__(/*! flyd */ \"./node_modules/flyd/lib/index.js\");\n\nvar _flyd2 = _interopRequireDefault(_flyd);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nvar _app = __webpack_require__(/*! ./app */ \"./part-04/04/app.jsx\");\n\nvar _router = __webpack_require__(/*! ./router */ \"./part-04/04/router.js\");\n\nvar _meiosis = __webpack_require__(/*! meiosis */ \"./node_modules/meiosis/lib/index.js\");\n\nvar _meiosisTracer = __webpack_require__(/*! meiosis-tracer */ \"./node_modules/meiosis-tracer/lib/meiosis-tracer.js\");\n\nvar _meiosisTracer2 = _interopRequireDefault(_meiosisTracer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Meiosis Setup\nvar update = _flyd2.default.stream();\nvar models = _flyd2.default.scan(function (model, modelUpdate) {\n  return modelUpdate(model);\n}, (0, _app.createAppModel)(), update);\n\nvar withLatestModel = _flyd2.default.stream();\nwithLatestModel.map(function (fn) {\n  return fn(models());\n});\n\nvar navigation = (0, _navigation.createNavigation)(update, withLatestModel);\nvar router = (0, _router.createRouter)(navigation);\nvar app = (0, _app.createApp)(update, navigation, router);\n\n// Rendering\nvar element = document.getElementById(\"app\");\nmodels.map(function (model) {\n  return _reactDom2.default.render(app.view(model), element);\n});\n\n// Resolve initial route\nrouter.resolveRoute();\n// Route sync\nmodels.map(router.routeSync);\n\n// Only for using Meiosis Tracer in development.\n\n(0, _meiosis.trace)({ update: update, dataStreams: [models] });\n(0, _meiosisTracer2.default)({ selector: \"#tracer\" });\n\n//# sourceURL=webpack:///./part-04/04/index.js?");

/***/ }),

/***/ "./part-04/04/loadBeerList.jsx":
/*!*************************************!*\
  !*** ./part-04/04/loadBeerList.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createLoadBeerList = undefined;\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nvar createLoadBeerList = exports.createLoadBeerList = function createLoadBeerList(actions, router) {\n  return {\n    view: function view(model) {\n      return React.createElement(\n        \"div\",\n        null,\n        React.createElement(\n          \"a\",\n          { href: router.getLink(_navigation.pages.breweryBeerList.id, { breweryId: model.brewery.id })\n          },\n          \"Load beer list\"\n        ),\n        \" \",\n        React.createElement(\n          \"button\",\n          { className: \"btn btn-default btn-xs\",\n            onClick: actions.loadBeerList({ breweryId: model.brewery.id }) },\n          \"Load beer list\"\n        )\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/loadBeerList.jsx?");

/***/ }),

/***/ "./part-04/04/navigation.js":
/*!**********************************!*\
  !*** ./part-04/04/navigation.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createNavigation = exports.pages = undefined;\n\nvar _ramda = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/index.js\");\n\nvar R = _interopRequireWildcard(_ramda);\n\nvar _v = __webpack_require__(/*! uuid/v1 */ \"./node_modules/uuid/v1.js\");\n\nvar _v2 = _interopRequireDefault(_v);\n\nvar _services = __webpack_require__(/*! ./services */ \"./part-04/04/services.js\");\n\nvar _transforms = __webpack_require__(/*! ./transforms */ \"./part-04/04/transforms.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar pages = exports.pages = {\n  home: {\n    id: \"HomePage\",\n    tab: \"Home\"\n  },\n  beerList: {\n    id: \"BeerListPage\",\n    tab: \"Beer\"\n  },\n  beerDetails: {\n    id: \"BeerDetailsPage\",\n    tab: \"Beer\"\n  },\n  breweryList: {\n    id: \"BreweryListPage\",\n    tab: \"Brewery\"\n  },\n  breweryDetails: {\n    id: \"BreweryDetailsPage\",\n    tab: \"Brewery\"\n  },\n  breweryBeerList: {\n    id: \"BreweryBeerListPage\",\n    tab: \"Brewery\"\n  },\n  breweryBeerDetails: {\n    id: \"BreweryBeerDetailsPage\",\n    tab: \"Brewery\"\n  }\n};\n\nvar createNavigation = exports.createNavigation = function createNavigation(update, withLatestModel) {\n  var services = (0, _services.createServices)();\n\n  var navigateToBeerList = function navigateToBeerList() {\n    return withLatestModel(function (model) {\n      if (model.beerList) {\n        update(_transforms.transforms.navigate(pages.beerList));\n      } else {\n        var uuid = (0, _v2.default)();\n        update(R.pipe(_transforms.transforms.uuid(uuid), _transforms.transforms.pleaseWaitBegin));\n\n        services.loadBeerList().then(function (beerList) {\n          return withLatestModel(function (model) {\n            if (model.uuid === uuid) {\n              update(R.pipe(_transforms.transforms.beerList(beerList), _transforms.transforms.navigate(pages.beerList), _transforms.transforms.pleaseWaitEnd));\n            }\n          });\n        });\n      }\n    });\n  };\n\n  var navigateToBreweryList = function navigateToBreweryList(params) {\n    return withLatestModel(function (model) {\n      if (model.breweryList) {\n        update(_transforms.transforms.navigate(pages.breweryList, params));\n      } else {\n        var uuid = (0, _v2.default)();\n        update(R.pipe(_transforms.transforms.uuid(uuid), _transforms.transforms.pleaseWaitBegin));\n\n        services.loadBreweryList().then(function (breweryList) {\n          return withLatestModel(function (model) {\n            if (model.uuid === uuid) {\n              update(R.pipe(_transforms.transforms.breweryList(breweryList), _transforms.transforms.navigate(pages.breweryList, params), _transforms.transforms.pleaseWaitEnd));\n            }\n          });\n        });\n      }\n    });\n  };\n\n  var trBreweryList = function trBreweryList(breweryList) {\n    return R.pipe(_transforms.transforms.breweryList(breweryList), _transforms.transforms.pleaseWaitEnd);\n  };\n\n  var trBrewery = function trBrewery(params) {\n    return R.pipe(_transforms.transforms.brewery(params), _transforms.transforms.navigate(pages.breweryDetails, params));\n  };\n\n  var navigateToBreweryDetails = function navigateToBreweryDetails(params) {\n    return withLatestModel(function (model) {\n      R.applyTo(model, R.ifElse(R.has(\"breweryList\"), R.partial(update, [trBrewery(params)]), function () {\n        update(_transforms.transforms.pleaseWaitBegin);\n\n        services.loadBreweryList().then(R.pipe(trBreweryList, R.o(trBrewery(params)), update));\n      }));\n    });\n  };\n\n  var navigateToBreweryBeerList = function navigateToBreweryBeerList(params) {\n    return withLatestModel(function (model) {\n      if (model.breweryList && model.brewery.id === params.breweryId && model.brewery.beerList) {\n        update(_transforms.transforms.navigate(pages.breweryBeerList, params));\n      } else {\n        update(_transforms.transforms.pleaseWaitBegin);\n\n        Promise.all([services.loadBreweryList(), services.loadBeerList(params.breweryId)]).then(function (values) {\n          var breweryList = values[0];\n          var beerList = values[1];\n\n          update(R.pipe(_transforms.transforms.breweryList(breweryList), _transforms.transforms.brewery(params), _transforms.transforms.breweryBeerList(params, beerList), _transforms.transforms.navigate(pages.breweryBeerList, params), _transforms.transforms.pleaseWaitEnd));\n        });\n      }\n    });\n  };\n\n  var navigateToBreweryBeerDetails = function navigateToBreweryBeerDetails(params) {\n    return withLatestModel(function (model) {\n      if (model.breweryList && model.brewery.id === params.breweryId && model.brewery.beerList) {\n        update(_transforms.transforms.navigate(pages.breweryBeerDetails, params));\n      } else {\n        update(_transforms.transforms.pleaseWaitBegin);\n\n        Promise.all([services.loadBreweryList(), services.loadBeerList(params.breweryId)]).then(function (values) {\n          var breweryList = values[0];\n          var beerList = values[1];\n\n          update(R.pipe(_transforms.transforms.breweryList(breweryList), _transforms.transforms.brewery(params), _transforms.transforms.breweryBeerList(params, beerList), _transforms.transforms.navigate(pages.breweryBeerDetails, params), _transforms.transforms.pleaseWaitEnd));\n        });\n      }\n    });\n  };\n\n  var navigateTo = function navigateTo(page) {\n    return function (params) {\n      return update(_transforms.transforms.navigate(page, params));\n    };\n  };\n\n  return {\n    navigateToHome: navigateTo(pages.home),\n    navigateToBeerList: navigateToBeerList,\n    navigateToBeerDetails: navigateTo(pages.beerDetails),\n    navigateToBreweryList: navigateToBreweryList,\n    navigateToBreweryDetails: navigateToBreweryDetails,\n    navigateToBreweryBeerList: navigateToBreweryBeerList,\n    navigateToBreweryBeerDetails: navigateToBreweryBeerDetails\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/navigation.js?");

/***/ }),

/***/ "./part-04/04/pleaseWait.jsx":
/*!***********************************!*\
  !*** ./part-04/04/pleaseWait.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar createPleaseWait = exports.createPleaseWait = function createPleaseWait() {\n  return {\n    view: function view() {\n      return React.createElement(\n        \"h2\",\n        null,\n        \"Loading, please wait...\"\n      );\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/pleaseWait.jsx?");

/***/ }),

/***/ "./part-04/04/router.js":
/*!******************************!*\
  !*** ./part-04/04/router.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createRouter = undefined;\n\nvar _universalRouter = __webpack_require__(/*! universal-router */ \"./node_modules/universal-router/module.js\");\n\nvar _universalRouter2 = _interopRequireDefault(_universalRouter);\n\nvar _generateUrls = __webpack_require__(/*! universal-router/generateUrls */ \"./node_modules/universal-router/generateUrls/module.js\");\n\nvar _generateUrls2 = _interopRequireDefault(_generateUrls);\n\nvar _navigation = __webpack_require__(/*! ./navigation */ \"./part-04/04/navigation.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar createRouter = exports.createRouter = function createRouter(navigation) {\n  var wrap = function wrap(action) {\n    return function (ctx) {\n      action(ctx.params);\n      return true;\n    };\n  };\n\n  var routes = [{ path: \"/\",\n    name: _navigation.pages.home.id,\n    action: wrap(navigation.navigateToHome)\n  }, { path: \"/beerList\",\n    children: [{ path: \"\",\n      name: _navigation.pages.beerList.id,\n      action: wrap(navigation.navigateToBeerList)\n    }, { path: \"/:beerId\",\n      name: _navigation.pages.beerDetails.id,\n      action: wrap(navigation.navigateToBeerDetails)\n    }]\n  }, { path: \"/breweryList\",\n    children: [{ path: \"\",\n      name: _navigation.pages.breweryList.id,\n      action: wrap(navigation.navigateToBreweryList)\n    }, { path: \"/:breweryId\",\n      children: [{ path: \"\",\n        name: _navigation.pages.breweryDetails.id,\n        action: wrap(navigation.navigateToBreweryDetails)\n      }, { path: \"/beerList\",\n        children: [{ path: \"\",\n          name: _navigation.pages.breweryBeerList.id,\n          action: wrap(navigation.navigateToBreweryBeerList)\n        }, { path: \"/:beerId\",\n          name: _navigation.pages.breweryBeerDetails.id,\n          action: wrap(navigation.navigateToBreweryBeerDetails)\n        }]\n      }]\n    }]\n  }];\n\n  var router = new _universalRouter2.default(routes);\n\n  var resolveRoute = function resolveRoute() {\n    var route = document.location.hash.substring(1);\n    router.resolve(route);\n  };\n\n  window.onpopstate = resolveRoute;\n\n  var urlGenerator = (0, _generateUrls2.default)(router);\n  var getLink = function getLink(id, params) {\n    return \"#\" + urlGenerator(id, params);\n  };\n\n  var routeSync = function routeSync(model) {\n    var link = getLink(model.page.id, model.page.params || {});\n    if (document.location.hash.substring(1) !== link) {\n      window.history.pushState({}, \"\", link);\n    }\n  };\n\n  return { resolveRoute: resolveRoute, routeSync: routeSync, getLink: getLink };\n};\n\n//# sourceURL=webpack:///./part-04/04/router.js?");

/***/ }),

/***/ "./part-04/04/services.js":
/*!********************************!*\
  !*** ./part-04/04/services.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createServices = undefined;\n\nvar _es6Promise = __webpack_require__(/*! es6-promise */ \"./node_modules/es6-promise/dist/es6-promise.js\");\n\nvar beerList = [{ id: \"br1\", title: \"Beer 1\" }, { id: \"br2\", title: \"Beer 2\" }, { id: \"br3\", title: \"Beer 3\" }, { id: \"br4\", title: \"Beer 4\" }];\n\nvar breweryList = [{ id: \"brw1\", title: \"Brewery 1\" }, { id: \"brw2\", title: \"Brewery 2\" }];\n\nvar breweryBeerList = {\n  brw1: [beerList[0], beerList[1]],\n  brw2: [beerList[2], beerList[3]]\n};\n\nvar createServices = exports.createServices = function createServices() {\n  return {\n    loadBeerList: function loadBeerList(breweryId) {\n      return new _es6Promise.Promise(function (resolve) {\n        var delay = 2000;\n\n        setTimeout(function () {\n          resolve(breweryId ? breweryBeerList[breweryId] : beerList);\n        }, delay);\n      });\n    },\n    loadBreweryList: function loadBreweryList() {\n      return new _es6Promise.Promise(function (resolve) {\n        var delay = 4000;\n\n        setTimeout(function () {\n          return resolve(breweryList);\n        }, delay);\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack:///./part-04/04/services.js?");

/***/ }),

/***/ "./part-04/04/transforms.js":
/*!**********************************!*\
  !*** ./part-04/04/transforms.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.transforms = undefined;\n\nvar _ramda = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/index.js\");\n\nvar navigate = function navigate(page) {\n  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return function (model) {\n    return Object.assign(model, { page: Object.assign({ params: params }, page) });\n  };\n};\n\nvar transforms = {\n  pleaseWaitBegin: (0, _ramda.assoc)(\"operationInProgress\", true),\n\n  pleaseWaitEnd: (0, _ramda.assoc)(\"operationInProgress\", false),\n\n  uuid: function uuid(_uuid) {\n    return (0, _ramda.assoc)(\"uuid\", _uuid);\n  },\n\n  navigate: navigate,\n\n  navigateTo: function navigateTo(page) {\n    return function (params) {\n      return navigate(page, params);\n    };\n  },\n\n  beerList: function beerList(_beerList) {\n    return function (model) {\n      return Object.assign(model, { beerList: _beerList });\n    };\n  },\n\n  brewery: function brewery(params) {\n    return function (model) {\n      return Object.assign(model, { brewery: { id: params.breweryId } });\n    };\n  },\n\n  breweryList: function breweryList(_breweryList) {\n    return function (model) {\n      return Object.assign(model, { breweryList: _breweryList });\n    };\n  },\n\n  breweryBeerList: function breweryBeerList(params, beerList) {\n    return function (model) {\n      return Object.assign(model, { brewery: { id: params.breweryId, beerList: beerList } });\n    };\n  }\n};\nexports.transforms = transforms;\n\n//# sourceURL=webpack:///./part-04/04/transforms.js?");

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