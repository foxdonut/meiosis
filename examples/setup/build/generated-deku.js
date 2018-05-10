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
/******/ 	return __webpack_require__(__webpack_require__.s = "./deku/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./common/handler.js":
/*!***************************!*\
  !*** ./common/handler.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar wrap = exports.wrap = function wrap(fn) {\n  var args = Array.from(arguments).slice(1);\n\n  return function (_evt) {\n    if (fn) {\n      fn.apply(null, args);\n    }\n  };\n};\n\nvar safe = exports.safe = function safe(fn) {\n  if (fn) {\n    return fn;\n  }\n  return function (_evt) {};\n};\n\n//# sourceURL=webpack:///./common/handler.js?");

/***/ }),

/***/ "./common/index.js":
/*!*************************!*\
  !*** ./common/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.setup = undefined;\n\nvar _flyd = __webpack_require__(/*! flyd */ \"./node_modules/flyd/lib/index.js\");\n\nvar _flyd2 = _interopRequireDefault(_flyd);\n\nvar _temperature = __webpack_require__(/*! ./temperature */ \"./common/temperature/index.js\");\n\nvar _meiosis = __webpack_require__(/*! meiosis */ \"./node_modules/meiosis/lib/index.js\");\n\nvar _meiosisTracer = __webpack_require__(/*! meiosis-tracer */ \"./node_modules/meiosis-tracer/lib/meiosis-tracer.js\");\n\nvar _meiosisTracer2 = _interopRequireDefault(_meiosisTracer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Only for using Meiosis Tracer in development.\nvar setup = exports.setup = function setup(render) {\n  var update = _flyd2.default.stream();\n  var temperature = (0, _temperature.createTemperature)(update);\n  var models = _flyd2.default.scan(function (model, func) {\n    return func(model);\n  }, temperature.model(), update);\n\n  var element = document.getElementById(\"app\");\n  models.map(function (model) {\n    return render(temperature.view(model), element);\n  });\n\n  // Only for using Meiosis Tracer in development.\n  (0, _meiosis.trace)({ update: update, dataStreams: [models] });\n  (0, _meiosisTracer2.default)({ selector: \"#tracer\" });\n\n  return { models: models, view: temperature.view, render: render, element: element };\n};\n\n//# sourceURL=webpack:///./common/index.js?");

/***/ }),

/***/ "./common/jsx.js":
/*!***********************!*\
  !*** ./common/jsx.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar jsx = exports.jsx = function jsx(propMap) {\n  return function (h) {\n    return function (type, props) {\n      var args = [type, props];\n      if (props) {\n        Object.keys(propMap).forEach(function (fromProp) {\n          if (props[fromProp]) {\n            var toProp = propMap[fromProp];\n            props[toProp] = props[fromProp];\n            delete props[fromProp];\n          }\n        });\n      }\n      var rest = [];\n      for (var i = 2; i < arguments.length; i++) {\n        rest.push(arguments[i]);\n      }\n      args.push(rest);\n      return h.apply(null, args);\n    };\n  };\n};\n\n//# sourceURL=webpack:///./common/jsx.js?");

/***/ }),

/***/ "./common/temperature/actions.js":
/*!***************************************!*\
  !*** ./common/temperature/actions.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar createActions = exports.createActions = function createActions(update) {\n  return {\n    togglePrecipitations: function togglePrecipitations(evt) {\n      return update(function (model) {\n        model.precipitations = evt.target.checked;\n        return model;\n      });\n    },\n\n    changePrecipitation: function changePrecipitation(evt) {\n      return update(function (model) {\n        model.precipitation = evt.target.value;\n        return model;\n      });\n    },\n\n    editDate: function editDate(evt) {\n      return update(function (model) {\n        model.date = evt.target.value;\n        return model;\n      });\n    },\n\n    increase: function increase(amount) {\n      return update(function (model) {\n        model.value = model.value + amount;\n        return model;\n      });\n    },\n\n    changeUnits: function changeUnits() {\n      return update(function (model) {\n        if (model.units === \"C\") {\n          model.units = \"F\";\n          model.value = Math.round(model.value * 9 / 5 + 32);\n        } else {\n          model.units = \"C\";\n          model.value = Math.round((model.value - 32) / 9 * 5);\n        }\n        return model;\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack:///./common/temperature/actions.js?");

/***/ }),

/***/ "./common/temperature/index.js":
/*!*************************************!*\
  !*** ./common/temperature/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createTemperature = undefined;\n\nvar _actions = __webpack_require__(/*! ./actions */ \"./common/temperature/actions.js\");\n\nvar _view = __webpack_require__(/*! ./view */ \"./common/temperature/view.jsx\");\n\nvar createTemperature = exports.createTemperature = function createTemperature(update) {\n  return {\n    model: function model() {\n      return {\n        precipitations: false,\n        precipitation: null,\n        date: \"\",\n        value: 20,\n        units: \"C\"\n      };\n    },\n\n    view: (0, _view.createView)((0, _actions.createActions)(update))\n  };\n};\n\n//# sourceURL=webpack:///./common/temperature/index.js?");

/***/ }),

/***/ "./common/temperature/view.jsx":
/*!*************************************!*\
  !*** ./common/temperature/view.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createView = undefined;\n\nvar _handler = __webpack_require__(/*! ../handler */ \"./common/handler.js\");\n\nvar precipitationOption = function precipitationOption(_ref) {\n  var model = _ref.model,\n      actions = _ref.actions,\n      id = _ref.id,\n      value = _ref.value,\n      label = _ref.label;\n  return jsx(\n    \"span\",\n    null,\n    jsx(\"input\", { type: \"radio\", id: id, name: \"precipitation\", value: value,\n      checked: model.precipitation === value,\n      onClick: (0, _handler.safe)(actions.changePrecipitation) }),\n    jsx(\n      \"label\",\n      { htmlFor: id },\n      label\n    )\n  );\n};\n\nvar createView = exports.createView = function createView(actions) {\n  return function (model) {\n    return jsx(\n      \"div\",\n      null,\n      jsx(\n        \"div\",\n        null,\n        jsx(\"input\", { type: \"checkbox\", checked: model.precipitations,\n          onClick: (0, _handler.safe)(actions.togglePrecipitations), id: \"precipitations\" }),\n        jsx(\n          \"label\",\n          { htmlFor: \"precipitations\" },\n          \"Precipitations\"\n        )\n      ),\n      jsx(\n        \"div\",\n        null,\n        precipitationOption({ model: model, actions: actions, id: \"rain\", value: \"RAIN\", label: \"Rain\" }),\n        precipitationOption({ model: model, actions: actions, id: \"snow\", value: \"SNOW\", label: \"Snow\" }),\n        precipitationOption({ model: model, actions: actions, id: \"sleet\", value: \"SLEET\", label: \"Sleet\" })\n      ),\n      jsx(\n        \"div\",\n        null,\n        \"Date:\",\n        jsx(\"input\", { type: \"text\", size: \"10\", value: model.date, onInput: (0, _handler.safe)(actions.editDate) })\n      ),\n      jsx(\n        \"span\",\n        null,\n        \"Temperature: \"\n      ),\n      jsx(\n        \"span\",\n        { className: \"tempValue\" },\n        model.value\n      ),\n      \"\\xB0\",\n      jsx(\n        \"span\",\n        { className: \"tempUnits\" },\n        model.units\n      ),\n      jsx(\n        \"div\",\n        null,\n        jsx(\n          \"button\",\n          { className: \"btn btn-default increase\", onClick: (0, _handler.wrap)(actions.increase, 1) },\n          \"Increase\"\n        ),\n        jsx(\n          \"button\",\n          { className: \"btn btn-default decrease\", onClick: (0, _handler.wrap)(actions.increase, -1) },\n          \"Decrease\"\n        )\n      ),\n      jsx(\n        \"div\",\n        null,\n        jsx(\n          \"button\",\n          { className: \"btn btn-primary changeUnits\", onClick: (0, _handler.safe)(actions.changeUnits) },\n          \"Change Units\"\n        )\n      )\n    );\n  };\n};\n\n//# sourceURL=webpack:///./common/temperature/view.jsx?");

/***/ }),

/***/ "./deku/index.js":
/*!***********************!*\
  !*** ./deku/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _setup = __webpack_require__(/*! ./setup */ \"./deku/setup.js\");\n\n(0, _setup.setupApp)();\n\n//# sourceURL=webpack:///./deku/index.js?");

/***/ }),

/***/ "./deku/setup.js":
/*!***********************!*\
  !*** ./deku/setup.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.setupApp = exports.setupRender = undefined;\n\nvar _deku = __webpack_require__(/*! deku */ \"./node_modules/deku/lib/index.js\");\n\nvar _common = __webpack_require__(/*! ../common */ \"./common/index.js\");\n\nvar _jsx = __webpack_require__(/*! ../common/jsx */ \"./common/jsx.js\");\n\nvar jsxDeku = (0, _jsx.jsx)({\n  \"className\": \"class\",\n  \"htmlFor\": \"for\"\n});\n\nvar setupRender = exports.setupRender = function setupRender() {\n  global.jsx = jsxDeku(_deku.element);\n  var render = null;\n\n  return function (view, el) {\n    if (!render) {\n      render = (0, _deku.createApp)(el);\n    }\n    render(view);\n  };\n};\n\nvar setupApp = exports.setupApp = function setupApp() {\n  return (0, _common.setup)(setupRender());\n};\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./deku/setup.js?");

/***/ }),

/***/ "./node_modules/bit-vector/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/bit-vector/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * Use typed arrays if we can\n */\n\nvar FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;\n\n/**\n * Bit vector\n */\n\nfunction createBv(sizeInBits) {\n  return new FastArray(Math.ceil(sizeInBits / 32));\n}\n\nfunction setBit(v, idx) {\n  var r = idx % 32;\n  var pos = (idx - r) / 32;\n\n  v[pos] |= 1 << r;\n}\n\nfunction clearBit(v, idx) {\n  var r = idx % 32;\n  var pos = (idx - r) / 32;\n\n  v[pos] &= ~(1 << r);\n}\n\nfunction getBit(v, idx) {\n  var r = idx % 32;\n  var pos = (idx - r) / 32;\n\n  return !!(v[pos] & 1 << r);\n}\n\n/**\n * Exports\n */\n\nexports.createBv = createBv;\nexports.setBit = setBit;\nexports.clearBit = clearBit;\nexports.getBit = getBit;\n\n//# sourceURL=webpack:///./node_modules/bit-vector/lib/index.js?");

/***/ }),

/***/ "./node_modules/deku/lib/app/index.js":
/*!********************************************!*\
  !*** ./node_modules/deku/lib/app/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.create = create;\n\nvar _dom = __webpack_require__(/*! ../dom */ \"./node_modules/deku/lib/dom/index.js\");\n\nvar dom = _interopRequireWildcard(_dom);\n\nvar _diff = __webpack_require__(/*! ../diff */ \"./node_modules/deku/lib/diff/index.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n/**\n * Create a DOM renderer using a container element. Everything will be rendered\n * inside of that container. Returns a function that accepts new state that can\n * replace what is currently rendered.\n */\n\nfunction create(container, dispatch) {\n  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];\n\n  var oldVnode = null;\n  var node = null;\n  var rootId = options.id || '0';\n\n  if (container && container.childNodes.length > 0) {\n    container.innerHTML = '';\n  }\n\n  var update = function update(newVnode, context) {\n    var changes = (0, _diff.diffNode)(oldVnode, newVnode, rootId);\n    node = changes.reduce(dom.update(dispatch, context), node);\n    oldVnode = newVnode;\n    return node;\n  };\n\n  var create = function create(vnode, context) {\n    node = dom.create(vnode, rootId, dispatch, context);\n    if (container) container.appendChild(node);\n    oldVnode = vnode;\n    return node;\n  };\n\n  return function (vnode) {\n    var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];\n\n    return node !== null ? update(vnode, context) : create(vnode, context);\n  };\n}\n\n//# sourceURL=webpack:///./node_modules/deku/lib/app/index.js?");

/***/ }),

/***/ "./node_modules/deku/lib/diff/index.js":
/*!*********************************************!*\
  !*** ./node_modules/deku/lib/diff/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Actions = undefined;\nexports.diffAttributes = diffAttributes;\nexports.diffChildren = diffChildren;\nexports.diffNode = diffNode;\n\nvar _element = __webpack_require__(/*! ../element */ \"./node_modules/deku/lib/element/index.js\");\n\nvar _dift = __webpack_require__(/*! dift */ \"./node_modules/dift/lib/index.js\");\n\nvar diffActions = _interopRequireWildcard(_dift);\n\nvar _unionType = __webpack_require__(/*! union-type */ \"./node_modules/union-type/union-type.js\");\n\nvar _unionType2 = _interopRequireDefault(_unionType);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar Any = function Any() {\n  return true;\n};\nvar Path = function Path() {\n  return String;\n};\n\n/**\n * Patch actions\n */\n\nvar Actions = exports.Actions = (0, _unionType2.default)({\n  setAttribute: [String, Any, Any],\n  removeAttribute: [String, Any],\n  insertChild: [Any, Number, Path],\n  removeChild: [Number],\n  updateChild: [Number, Array],\n  updateChildren: [Array],\n  insertBefore: [Number],\n  replaceNode: [Any, Any, Path],\n  removeNode: [Any],\n  sameNode: [],\n  updateThunk: [Any, Any, Path]\n});\n\n/**\n * Diff two attribute objects and return an array of actions that represent\n * changes to transform the old object into the new one.\n */\n\nfunction diffAttributes(previous, next) {\n  var setAttribute = Actions.setAttribute;\n  var removeAttribute = Actions.removeAttribute;\n\n  var changes = [];\n  var pAttrs = previous.attributes;\n  var nAttrs = next.attributes;\n\n  for (var name in nAttrs) {\n    if (nAttrs[name] !== pAttrs[name]) {\n      changes.push(setAttribute(name, nAttrs[name], pAttrs[name]));\n    }\n  }\n\n  for (var name in pAttrs) {\n    if (!(name in nAttrs)) {\n      changes.push(removeAttribute(name, pAttrs[name]));\n    }\n  }\n\n  return changes;\n}\n\n/**\n * Compare two arrays of virtual nodes and return an array of actions\n * to transform the left into the right. A starting path is supplied that use\n * recursively to build up unique paths for each node.\n */\n\nfunction diffChildren(previous, next, parentPath) {\n  var insertChild = Actions.insertChild;\n  var updateChild = Actions.updateChild;\n  var removeChild = Actions.removeChild;\n  var insertBefore = Actions.insertBefore;\n  var updateChildren = Actions.updateChildren;\n  var CREATE = diffActions.CREATE;\n  var UPDATE = diffActions.UPDATE;\n  var MOVE = diffActions.MOVE;\n  var REMOVE = diffActions.REMOVE;\n\n  var previousChildren = (0, _element.groupByKey)(previous.children);\n  var nextChildren = (0, _element.groupByKey)(next.children);\n  var key = function key(a) {\n    return a.key;\n  };\n  var changes = [];\n\n  function effect(type, prev, next, pos) {\n    var nextPath = next ? (0, _element.createPath)(parentPath, next.key == null ? next.index : next.key) : null;\n    switch (type) {\n      case CREATE:\n        {\n          changes.push(insertChild(next.item, pos, nextPath));\n          break;\n        }\n      case UPDATE:\n        {\n          var actions = diffNode(prev.item, next.item, nextPath);\n          if (actions.length > 0) {\n            changes.push(updateChild(prev.index, actions));\n          }\n          break;\n        }\n      case MOVE:\n        {\n          var actions = diffNode(prev.item, next.item, nextPath);\n          actions.push(insertBefore(pos));\n          changes.push(updateChild(prev.index, actions));\n          break;\n        }\n      case REMOVE:\n        {\n          changes.push(removeChild(prev.index));\n          break;\n        }\n    }\n  }\n\n  (0, diffActions.default)(previousChildren, nextChildren, effect, key);\n\n  return updateChildren(changes);\n}\n\n/**\n * Compare two virtual nodes and return an array of changes to turn the left\n * into the right.\n */\n\nfunction diffNode(prev, next, path) {\n  var changes = [];\n  var replaceNode = Actions.replaceNode;\n  var setAttribute = Actions.setAttribute;\n  var sameNode = Actions.sameNode;\n  var removeNode = Actions.removeNode;\n  var updateThunk = Actions.updateThunk;\n\n  // No left node to compare it to\n  // TODO: This should just return a createNode action\n\n  if (prev === null || prev === undefined) {\n    throw new Error('Left node must not be null or undefined');\n  }\n\n  // Bail out and skip updating this whole sub-tree\n  if (prev === next) {\n    changes.push(sameNode());\n    return changes;\n  }\n\n  // Remove\n  if (prev != null && next == null) {\n    changes.push(removeNode(prev));\n    return changes;\n  }\n\n  // Replace\n  if (prev.type !== next.type) {\n    changes.push(replaceNode(prev, next, path));\n    return changes;\n  }\n\n  // Text\n  if ((0, _element.isText)(next)) {\n    if (prev.nodeValue !== next.nodeValue) {\n      changes.push(setAttribute('nodeValue', next.nodeValue, prev.nodeValue));\n    }\n    return changes;\n  }\n\n  // Thunk\n  if ((0, _element.isThunk)(next)) {\n    if ((0, _element.isSameThunk)(prev, next)) {\n      changes.push(updateThunk(prev, next, path));\n    } else {\n      changes.push(replaceNode(prev, next, path));\n    }\n    return changes;\n  }\n\n  // Empty\n  if ((0, _element.isEmpty)(next)) {\n    return changes;\n  }\n\n  changes = diffAttributes(prev, next);\n  changes.push(diffChildren(prev, next, path));\n\n  return changes;\n}\n\n//# sourceURL=webpack:///./node_modules/deku/lib/diff/index.js?");

/***/ }),

/***/ "./node_modules/deku/lib/dom/create.js":
/*!*********************************************!*\
  !*** ./node_modules/deku/lib/dom/create.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = createElement;\n\nvar _element = __webpack_require__(/*! ../element */ \"./node_modules/deku/lib/element/index.js\");\n\nvar _setAttribute = __webpack_require__(/*! ./setAttribute */ \"./node_modules/deku/lib/dom/setAttribute.js\");\n\nvar _svg = __webpack_require__(/*! ./svg */ \"./node_modules/deku/lib/dom/svg.js\");\n\nvar _svg2 = _interopRequireDefault(_svg);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar cache = {};\n\n/**\n * Create a real DOM element from a virtual element, recursively looping down.\n * When it finds custom elements it will render them, cache them, and keep going,\n * so they are treated like any other native element.\n */\n\nfunction createElement(vnode, path, dispatch, context) {\n  if ((0, _element.isText)(vnode)) {\n    var value = typeof vnode.nodeValue === 'string' || typeof vnode.nodeValue === 'number' ? vnode.nodeValue : '';\n    return document.createTextNode(value);\n  }\n\n  if ((0, _element.isEmpty)(vnode)) {\n    return document.createElement('noscript');\n  }\n\n  if ((0, _element.isThunk)(vnode)) {\n    var props = vnode.props;\n    var component = vnode.component;\n    var children = vnode.children;\n    var onCreate = component.onCreate;\n\n    var render = typeof component === 'function' ? component : component.render;\n    var model = {\n      children: children,\n      props: props,\n      path: path,\n      dispatch: dispatch,\n      context: context\n    };\n    var output = render(model);\n    var _DOMElement = createElement(output, (0, _element.createPath)(path, output.key || '0'), dispatch, context);\n    if (onCreate) onCreate(model);\n    vnode.state = {\n      vnode: output,\n      model: model\n    };\n    return _DOMElement;\n  }\n\n  var cached = cache[vnode.type];\n\n  if (typeof cached === 'undefined') {\n    cached = cache[vnode.type] = _svg2.default.isElement(vnode.type) ? document.createElementNS(_svg2.default.namespace, vnode.type) : document.createElement(vnode.type);\n  }\n\n  var DOMElement = cached.cloneNode(false);\n\n  for (var name in vnode.attributes) {\n    (0, _setAttribute.setAttribute)(DOMElement, name, vnode.attributes[name]);\n  }\n\n  vnode.children.forEach(function (node, index) {\n    if (node === null || node === undefined) {\n      return;\n    }\n    var child = createElement(node, (0, _element.createPath)(path, node.key || index), dispatch, context);\n    DOMElement.appendChild(child);\n  });\n\n  return DOMElement;\n}\n\n//# sourceURL=webpack:///./node_modules/deku/lib/dom/create.js?");

/***/ }),

/***/ "./node_modules/deku/lib/dom/events.js":
/*!*********************************************!*\
  !*** ./node_modules/deku/lib/dom/events.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * Special attributes that map to DOM events.\n */\n\nexports.default = {\n  onAbort: 'abort',\n  onAnimationStart: 'animationstart',\n  onAnimationIteration: 'animationiteration',\n  onAnimationEnd: 'animationend',\n  onBlur: 'blur',\n  onCanPlay: 'canplay',\n  onCanPlayThrough: 'canplaythrough',\n  onChange: 'change',\n  onClick: 'click',\n  onContextMenu: 'contextmenu',\n  onCopy: 'copy',\n  onCut: 'cut',\n  onDoubleClick: 'dblclick',\n  onDrag: 'drag',\n  onDragEnd: 'dragend',\n  onDragEnter: 'dragenter',\n  onDragExit: 'dragexit',\n  onDragLeave: 'dragleave',\n  onDragOver: 'dragover',\n  onDragStart: 'dragstart',\n  onDrop: 'drop',\n  onDurationChange: 'durationchange',\n  onEmptied: 'emptied',\n  onEncrypted: 'encrypted',\n  onEnded: 'ended',\n  onError: 'error',\n  onFocus: 'focus',\n  onInput: 'input',\n  onInvalid: 'invalid',\n  onKeyDown: 'keydown',\n  onKeyPress: 'keypress',\n  onKeyUp: 'keyup',\n  onLoad: 'load',\n  onLoadedData: 'loadeddata',\n  onLoadedMetadata: 'loadedmetadata',\n  onLoadStart: 'loadstart',\n  onPause: 'pause',\n  onPlay: 'play',\n  onPlaying: 'playing',\n  onProgress: 'progress',\n  onMouseDown: 'mousedown',\n  onMouseEnter: 'mouseenter',\n  onMouseLeave: 'mouseleave',\n  onMouseMove: 'mousemove',\n  onMouseOut: 'mouseout',\n  onMouseOver: 'mouseover',\n  onMouseUp: 'mouseup',\n  onPaste: 'paste',\n  onRateChange: 'ratechange',\n  onReset: 'reset',\n  onScroll: 'scroll',\n  onSeeked: 'seeked',\n  onSeeking: 'seeking',\n  onSubmit: 'submit',\n  onStalled: 'stalled',\n  onSuspend: 'suspend',\n  onTimeUpdate: 'timeupdate',\n  onTransitionEnd: 'transitionend',\n  onTouchCancel: 'touchcancel',\n  onTouchEnd: 'touchend',\n  onTouchMove: 'touchmove',\n  onTouchStart: 'touchstart',\n  onVolumeChange: 'volumechange',\n  onWaiting: 'waiting',\n  onWheel: 'wheel'\n};\n\n//# sourceURL=webpack:///./node_modules/deku/lib/dom/events.js?");

/***/ }),

/***/ "./node_modules/deku/lib/dom/index.js":
/*!********************************************!*\
  !*** ./node_modules/deku/lib/dom/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.update = exports.create = undefined;\n\nvar _create = __webpack_require__(/*! ./create */ \"./node_modules/deku/lib/dom/create.js\");\n\nvar _create2 = _interopRequireDefault(_create);\n\nvar _update = __webpack_require__(/*! ./update */ \"./node_modules/deku/lib/dom/update.js\");\n\nvar _update2 = _interopRequireDefault(_update);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.create = _create2.default;\nexports.update = _update2.default;\n\n//# sourceURL=webpack:///./node_modules/deku/lib/dom/index.js?");

/***/ }),

/***/ "./node_modules/deku/lib/dom/setAttribute.js":
/*!***************************************************!*\
  !*** ./node_modules/deku/lib/dom/setAttribute.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.removeAttribute = removeAttribute;\nexports.setAttribute = setAttribute;\n\nvar _svgAttributeNamespace = __webpack_require__(/*! svg-attribute-namespace */ \"./node_modules/svg-attribute-namespace/index.js\");\n\nvar _svgAttributeNamespace2 = _interopRequireDefault(_svgAttributeNamespace);\n\nvar _element = __webpack_require__(/*! ../element */ \"./node_modules/deku/lib/element/index.js\");\n\nvar _indexOf = __webpack_require__(/*! index-of */ \"./node_modules/index-of/index.js\");\n\nvar _indexOf2 = _interopRequireDefault(_indexOf);\n\nvar _setify = __webpack_require__(/*! setify */ \"./node_modules/setify/index.js\");\n\nvar _setify2 = _interopRequireDefault(_setify);\n\nvar _events = __webpack_require__(/*! ./events */ \"./node_modules/deku/lib/dom/events.js\");\n\nvar _events2 = _interopRequireDefault(_events);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction removeAttribute(DOMElement, name, previousValue) {\n  var eventType = _events2.default[name];\n  if (eventType) {\n    if (typeof previousValue === 'function') {\n      DOMElement.removeEventListener(eventType, previousValue);\n    }\n    return;\n  }\n  switch (name) {\n    case 'checked':\n    case 'disabled':\n    case 'selected':\n      DOMElement[name] = false;\n      break;\n    case 'innerHTML':\n    case 'nodeValue':\n      DOMElement.innerHTML = '';\n      break;\n    case 'value':\n      DOMElement.value = '';\n      break;\n    default:\n      DOMElement.removeAttribute(name);\n      break;\n  }\n}\n\nfunction setAttribute(DOMElement, name, value, previousValue) {\n  var eventType = _events2.default[name];\n  if (value === previousValue) {\n    return;\n  }\n  if (eventType) {\n    if (typeof previousValue === 'function') {\n      DOMElement.removeEventListener(eventType, previousValue);\n    }\n    DOMElement.addEventListener(eventType, value);\n    return;\n  }\n  if (!(0, _element.isValidAttribute)(value)) {\n    removeAttribute(DOMElement, name, previousValue);\n    return;\n  }\n  switch (name) {\n    case 'checked':\n    case 'disabled':\n    case 'innerHTML':\n    case 'nodeValue':\n      DOMElement[name] = value;\n      break;\n    case 'selected':\n      DOMElement.selected = value;\n      // Fix for IE/Safari where select is not correctly selected on change\n      if (DOMElement.tagName === 'OPTION' && DOMElement.parentNode) {\n        var select = DOMElement.parentNode;\n        select.selectedIndex = (0, _indexOf2.default)(select.options, DOMElement);\n      }\n      break;\n    case 'value':\n      (0, _setify2.default)(DOMElement, value);\n      break;\n    default:\n      DOMElement.setAttributeNS((0, _svgAttributeNamespace2.default)(name), name, value);\n      break;\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/deku/lib/dom/setAttribute.js?");

/***/ }),

/***/ "./node_modules/deku/lib/dom/svg.js":
/*!******************************************!*\
  !*** ./node_modules/deku/lib/dom/svg.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _isSvgElement = __webpack_require__(/*! is-svg-element */ \"./node_modules/is-svg-element/index.js\");\n\nvar namespace = 'http://www.w3.org/2000/svg';\n\nexports.default = {\n  isElement: _isSvgElement.isElement,\n  namespace: namespace\n};\n\n//# sourceURL=webpack:///./node_modules/deku/lib/dom/svg.js?");

/***/ }),

/***/ "./node_modules/deku/lib/dom/update.js":
/*!*********************************************!*\
  !*** ./node_modules/deku/lib/dom/update.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.insertAtIndex = undefined;\nexports.default = patch;\n\nvar _setAttribute2 = __webpack_require__(/*! ./setAttribute */ \"./node_modules/deku/lib/dom/setAttribute.js\");\n\nvar _element = __webpack_require__(/*! ../element */ \"./node_modules/deku/lib/element/index.js\");\n\nvar _create = __webpack_require__(/*! ./create */ \"./node_modules/deku/lib/dom/create.js\");\n\nvar _create2 = _interopRequireDefault(_create);\n\nvar _diff = __webpack_require__(/*! ../diff */ \"./node_modules/deku/lib/diff/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Modify a DOM element given an array of actions. A context can be set\n * that will be used to render any custom elements.\n */\n\nfunction patch(dispatch, context) {\n  return function (DOMElement, action) {\n    _diff.Actions.case({\n      setAttribute: function setAttribute(name, value, previousValue) {\n        (0, _setAttribute2.setAttribute)(DOMElement, name, value, previousValue);\n      },\n      removeAttribute: function removeAttribute(name, previousValue) {\n        (0, _setAttribute2.removeAttribute)(DOMElement, name, previousValue);\n      },\n      insertBefore: function insertBefore(index) {\n        insertAtIndex(DOMElement.parentNode, index, DOMElement);\n      },\n      sameNode: function sameNode() {},\n      updateChildren: function updateChildren(changes) {\n        // Create a clone of the children so we can reference them later\n        // using their original position even if they move around\n        var childNodes = Array.prototype.slice.apply(DOMElement.childNodes);\n\n        changes.forEach(function (change) {\n          _diff.Actions.case({\n            insertChild: function insertChild(vnode, index, path) {\n              insertAtIndex(DOMElement, index, (0, _create2.default)(vnode, path, dispatch, context));\n            },\n            removeChild: function removeChild(index) {\n              DOMElement.removeChild(childNodes[index]);\n            },\n            updateChild: function updateChild(index, actions) {\n              var update = patch(dispatch, context);\n              actions.forEach(function (action) {\n                return update(childNodes[index], action);\n              });\n            }\n          }, change);\n        });\n      },\n      updateThunk: function updateThunk(prev, next, path) {\n        var props = next.props;\n        var children = next.children;\n        var component = next.component;\n        var onUpdate = component.onUpdate;\n\n        var render = typeof component === 'function' ? component : component.render;\n        var prevNode = prev.state.vnode;\n        var model = {\n          children: children,\n          props: props,\n          path: path,\n          dispatch: dispatch,\n          context: context\n        };\n        var nextNode = render(model);\n        var changes = (0, _diff.diffNode)(prevNode, nextNode, (0, _element.createPath)(path, '0'));\n        DOMElement = changes.reduce(patch(dispatch, context), DOMElement);\n        if (onUpdate) onUpdate(model);\n        next.state = {\n          vnode: nextNode,\n          model: model\n        };\n      },\n      replaceNode: function replaceNode(prev, next, path) {\n        var newEl = (0, _create2.default)(next, path, dispatch, context);\n        var parentEl = DOMElement.parentNode;\n        if (parentEl) parentEl.replaceChild(newEl, DOMElement);\n        DOMElement = newEl;\n        removeThunks(prev);\n      },\n      removeNode: function removeNode(prev) {\n        removeThunks(prev);\n        DOMElement.parentNode.removeChild(DOMElement);\n        DOMElement = null;\n      }\n    }, action);\n\n    return DOMElement;\n  };\n}\n\n/**\n * Recursively remove all thunks\n */\n\nfunction removeThunks(vnode) {\n  while ((0, _element.isThunk)(vnode)) {\n    var _vnode = vnode;\n    var component = _vnode.component;\n    var state = _vnode.state;\n    var onRemove = component.onRemove;\n    var model = state.model;\n\n    if (onRemove) onRemove(model);\n    vnode = state.vnode;\n  }\n\n  if (vnode.children) {\n    for (var i = 0; i < vnode.children.length; i++) {\n      removeThunks(vnode.children[i]);\n    }\n  }\n}\n\n/**\n * Slightly nicer insertBefore\n */\n\nvar insertAtIndex = exports.insertAtIndex = function insertAtIndex(parent, index, el) {\n  var target = parent.childNodes[index];\n  if (target) {\n    parent.insertBefore(el, target);\n  } else {\n    parent.appendChild(el);\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/deku/lib/dom/update.js?");

/***/ }),

/***/ "./node_modules/deku/lib/element/index.js":
/*!************************************************!*\
  !*** ./node_modules/deku/lib/element/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.create = create;\nexports.createTextElement = createTextElement;\nexports.createEmptyElement = createEmptyElement;\nexports.createThunkElement = createThunkElement;\nexports.isValidAttribute = isValidAttribute;\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _typeof(obj) { return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; }\n\n/**\n * This function lets us create virtual nodes using a simple\n * syntax. It is compatible with JSX transforms so you can use\n * JSX to write nodes that will compile to this function.\n *\n * let node = element('div', { id: 'foo' }, [\n *   element('a', { href: 'http://google.com' },\n *     element('span', {}, 'Google'),\n *     element('b', {}, 'Link')\n *   )\n * ])\n */\n\nfunction create(type, attributes) {\n  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  if (!type) throw new TypeError('element() needs a type.');\n\n  attributes = attributes || {};\n  children = (children || []).reduce(reduceChildren, []);\n\n  var key = typeof attributes.key === 'string' || typeof attributes.key === 'number' ? attributes.key : undefined;\n\n  delete attributes.key;\n\n  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' || typeof type === 'function') {\n    return createThunkElement(type, key, attributes, children);\n  }\n\n  return {\n    attributes: attributes,\n    children: children,\n    type: type,\n    key: key\n  };\n}\n\n/**\n * Cleans up the array of child elements.\n * - Flattens nested arrays\n * - Converts raw strings and numbers into vnodes\n * - Filters out undefined elements\n */\n\nfunction reduceChildren(children, vnode) {\n  if (typeof vnode === 'string' || typeof vnode === 'number') {\n    children.push(createTextElement(vnode));\n  } else if (vnode === null) {\n    children.push(createEmptyElement());\n  } else if (Array.isArray(vnode)) {\n    children = [].concat(_toConsumableArray(children), _toConsumableArray(vnode.reduce(reduceChildren, [])));\n  } else if (typeof vnode === 'undefined') {\n    throw new Error('vnode can\\'t be undefined. Did you mean to use null?');\n  } else {\n    children.push(vnode);\n  }\n  return children;\n}\n\n/**\n * Text nodes are stored as objects to keep things simple\n */\n\nfunction createTextElement(text) {\n  return {\n    type: '#text',\n    nodeValue: text\n  };\n}\n\n/**\n * Text nodes are stored as objects to keep things simple\n */\n\nfunction createEmptyElement() {\n  return {\n    type: '#empty'\n  };\n}\n\n/**\n * Lazily-rendered virtual nodes\n */\n\nfunction createThunkElement(component, key, props, children) {\n  return {\n    type: '#thunk',\n    children: children,\n    props: props,\n    component: component,\n    key: key\n  };\n}\n\n/**\n * Is a vnode a thunk?\n */\n\nvar isThunk = exports.isThunk = function isThunk(node) {\n  return node.type === '#thunk';\n};\n\n/**\n * Is a vnode a text node?\n */\n\nvar isText = exports.isText = function isText(node) {\n  return node.type === '#text';\n};\n\n/**\n * Is a vnode an empty placeholder?\n */\n\nvar isEmpty = exports.isEmpty = function isEmpty(node) {\n  return node.type === '#empty';\n};\n\n/**\n * Determine if two virtual nodes are the same type\n */\n\nvar isSameThunk = exports.isSameThunk = function isSameThunk(left, right) {\n  return isThunk(left) && isThunk(right) && left.component === right.component;\n};\n\n/**\n * Group an array of virtual elements by their key, using index as a fallback.\n */\n\nvar groupByKey = exports.groupByKey = function groupByKey(children) {\n  return children.reduce(function (acc, child, i) {\n    if (child != null && child !== false) {\n      acc.push({\n        key: String(child.key || i),\n        item: child,\n        index: i\n      });\n    }\n    return acc;\n  }, []);\n};\n\n/**\n * Check if an attribute should be rendered into the DOM.\n */\n\nfunction isValidAttribute(value) {\n  if (typeof value === 'boolean') return value;\n  if (typeof value === 'function') return false;\n  if (value === '') return true;\n  if (value === undefined) return false;\n  if (value === null) return false;\n  return true;\n}\n\n/**\n * Create a node path, eg. (23,5,2,4) => '23.5.2.4'\n */\n\nvar createPath = exports.createPath = function createPath() {\n  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n    args[_key2] = arguments[_key2];\n  }\n\n  return args.join('.');\n};\n\n//# sourceURL=webpack:///./node_modules/deku/lib/element/index.js?");

/***/ }),

/***/ "./node_modules/deku/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/deku/lib/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.h = exports.dom = exports.diff = exports.vnode = exports.string = exports.element = exports.createApp = undefined;\n\nvar _diff = __webpack_require__(/*! ./diff */ \"./node_modules/deku/lib/diff/index.js\");\n\nvar diff = _interopRequireWildcard(_diff);\n\nvar _element = __webpack_require__(/*! ./element */ \"./node_modules/deku/lib/element/index.js\");\n\nvar vnode = _interopRequireWildcard(_element);\n\nvar _string = __webpack_require__(/*! ./string */ \"./node_modules/deku/lib/string/index.js\");\n\nvar string = _interopRequireWildcard(_string);\n\nvar _dom = __webpack_require__(/*! ./dom */ \"./node_modules/deku/lib/dom/index.js\");\n\nvar dom = _interopRequireWildcard(_dom);\n\nvar _app = __webpack_require__(/*! ./app */ \"./node_modules/deku/lib/app/index.js\");\n\nvar app = _interopRequireWildcard(_app);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar element = vnode.create;\nvar h = vnode.create;\nvar createApp = app.create;\n\nexports.createApp = createApp;\nexports.element = element;\nexports.string = string;\nexports.vnode = vnode;\nexports.diff = diff;\nexports.dom = dom;\nexports.h = h;\n\n//# sourceURL=webpack:///./node_modules/deku/lib/index.js?");

/***/ }),

/***/ "./node_modules/deku/lib/string/index.js":
/*!***********************************************!*\
  !*** ./node_modules/deku/lib/string/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.render = undefined;\n\nvar _renderString = __webpack_require__(/*! ./renderString */ \"./node_modules/deku/lib/string/renderString.js\");\n\nvar render = _renderString.renderString;\n\nexports.render = render;\n\n//# sourceURL=webpack:///./node_modules/deku/lib/string/index.js?");

/***/ }),

/***/ "./node_modules/deku/lib/string/renderString.js":
/*!******************************************************!*\
  !*** ./node_modules/deku/lib/string/renderString.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.renderString = renderString;\n\nvar _element = __webpack_require__(/*! ../element */ \"./node_modules/deku/lib/element/index.js\");\n\n/**\n * Turn an object of key/value pairs into a HTML attribute string. This\n * function is responsible for what attributes are allowed to be rendered and\n * should handle any other special cases specific to deku.\n */\n\nfunction attributesToString(attributes) {\n  var str = '';\n  for (var name in attributes) {\n    var value = attributes[name];\n    if (name === 'innerHTML') continue;\n    if ((0, _element.isValidAttribute)(value)) str += ' ' + name + '=\"' + attributes[name] + '\"';\n  }\n  return str;\n}\n\n/**\n * Render a virtual element to a string. You can pass in an option state context\n * object that will be given to all components.\n */\n\nfunction renderString(element, context) {\n  var path = arguments.length <= 2 || arguments[2] === undefined ? '0' : arguments[2];\n\n  if ((0, _element.isText)(element)) {\n    return element.nodeValue;\n  }\n\n  if ((0, _element.isEmpty)(element)) {\n    return '<noscript></noscript>';\n  }\n\n  if ((0, _element.isThunk)(element)) {\n    var props = element.props;\n    var component = element.component;\n    var _children = element.children;\n    var render = component.render;\n\n    var output = render({\n      children: _children,\n      props: props,\n      path: path,\n      context: context\n    });\n    return renderString(output, context, path);\n  }\n\n  var attributes = element.attributes;\n  var type = element.type;\n  var children = element.children;\n\n  var innerHTML = attributes.innerHTML;\n  var str = '<' + type + attributesToString(attributes) + '>';\n\n  if (innerHTML) {\n    str += innerHTML;\n  } else {\n    str += children.map(function (child, i) {\n      return renderString(child, context, path + '.' + (child.key == null ? i : child.key));\n    }).join('');\n  }\n\n  str += '</' + type + '>';\n  return str;\n}\n\n//# sourceURL=webpack:///./node_modules/deku/lib/string/renderString.js?");

/***/ }),

/***/ "./node_modules/dift/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/dift/lib/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;\n\nvar _bitVector = __webpack_require__(/*! bit-vector */ \"./node_modules/bit-vector/lib/index.js\");\n\n/**\n * Actions\n */\n\nvar CREATE = 0; /**\n                 * Imports\n                 */\n\nvar UPDATE = 1;\nvar MOVE = 2;\nvar REMOVE = 3;\n\n/**\n * dift\n */\n\nfunction dift(prev, next, effect, key) {\n  var pStartIdx = 0;\n  var nStartIdx = 0;\n  var pEndIdx = prev.length - 1;\n  var nEndIdx = next.length - 1;\n  var pStartItem = prev[pStartIdx];\n  var nStartItem = next[nStartIdx];\n\n  // List head is the same\n  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {\n    effect(UPDATE, pStartItem, nStartItem, nStartIdx);\n    pStartItem = prev[++pStartIdx];\n    nStartItem = next[++nStartIdx];\n  }\n\n  // The above case is orders of magnitude more common than the others, so fast-path it\n  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {\n    return;\n  }\n\n  var pEndItem = prev[pEndIdx];\n  var nEndItem = next[nEndIdx];\n  var movedFromFront = 0;\n\n  // Reversed\n  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {\n    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);\n    pStartItem = prev[++pStartIdx];\n    nEndItem = next[--nEndIdx];\n    ++movedFromFront;\n  }\n\n  // Reversed the other way (in case of e.g. reverse and append)\n  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {\n    effect(MOVE, pEndItem, nStartItem, nStartIdx);\n    pEndItem = prev[--pEndIdx];\n    nStartItem = next[++nStartIdx];\n    --movedFromFront;\n  }\n\n  // List tail is the same\n  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {\n    effect(UPDATE, pEndItem, nEndItem, nEndIdx);\n    pEndItem = prev[--pEndIdx];\n    nEndItem = next[--nEndIdx];\n  }\n\n  if (pStartIdx > pEndIdx) {\n    while (nStartIdx <= nEndIdx) {\n      effect(CREATE, null, nStartItem, nStartIdx);\n      nStartItem = next[++nStartIdx];\n    }\n\n    return;\n  }\n\n  if (nStartIdx > nEndIdx) {\n    while (pStartIdx <= pEndIdx) {\n      effect(REMOVE, pStartItem);\n      pStartItem = prev[++pStartIdx];\n    }\n\n    return;\n  }\n\n  var created = 0;\n  var pivotDest = null;\n  var pivotIdx = pStartIdx - movedFromFront;\n  var keepBase = pStartIdx;\n  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);\n\n  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);\n\n  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {\n    var oldIdx = prevMap[key(nStartItem)];\n\n    if (isUndefined(oldIdx)) {\n      effect(CREATE, null, nStartItem, pivotIdx++);\n      ++created;\n    } else if (pStartIdx !== oldIdx) {\n      (0, _bitVector.setBit)(keep, oldIdx - keepBase);\n      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);\n    } else {\n      pivotDest = nStartIdx;\n    }\n  }\n\n  if (pivotDest !== null) {\n    (0, _bitVector.setBit)(keep, 0);\n    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);\n  }\n\n  // If there are no creations, then you have to\n  // remove exactly max(prevLen - nextLen, 0) elements in this\n  // diff. You have to remove one more for each element\n  // that was created. This means once we have\n  // removed that many, we can stop.\n  var necessaryRemovals = prev.length - next.length + created;\n  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {\n    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {\n      effect(REMOVE, pStartItem);\n      ++removals;\n    }\n  }\n\n  function equal(a, b) {\n    return key(a) === key(b);\n  }\n}\n\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\nfunction keyMap(items, start, end, key) {\n  var map = {};\n\n  for (var i = start; i < end; ++i) {\n    map[key(items[i])] = i;\n  }\n\n  return map;\n}\n\n/**\n * Exports\n */\n\nexports.default = dift;\nexports.CREATE = CREATE;\nexports.UPDATE = UPDATE;\nexports.MOVE = MOVE;\nexports.REMOVE = REMOVE;\n\n//# sourceURL=webpack:///./node_modules/dift/lib/index.js?");

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

/***/ "./node_modules/index-of/index.js":
/*!****************************************!*\
  !*** ./node_modules/index-of/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * index-of <https://github.com/jonschlinkert/index-of>\n *\n * Copyright (c) 2014-2015 Jon Schlinkert.\n * Licensed under the MIT license.\n */\n\n\n\nmodule.exports = function indexOf(arr, ele, start) {\n  start = start || 0;\n  var idx = -1;\n\n  if (arr == null) return idx;\n  var len = arr.length;\n  var i = start < 0\n    ? (len + start)\n    : start;\n\n  if (i >= arr.length) {\n    return -1;\n  }\n\n  while (i < len) {\n    if (arr[i] === ele) {\n      return i;\n    }\n    i++;\n  }\n\n  return -1;\n};\n\n\n//# sourceURL=webpack:///./node_modules/index-of/index.js?");

/***/ }),

/***/ "./node_modules/is-svg-element/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-svg-element/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Supported SVG elements\n *\n * @type {Array}\n */\n\nexports.elements = {\n  'animate': true,\n  'circle': true,\n  'defs': true,\n  'ellipse': true,\n  'g': true,\n  'line': true,\n  'linearGradient': true,\n  'mask': true,\n  'path': true,\n  'pattern': true,\n  'polygon': true,\n  'polyline': true,\n  'radialGradient': true,\n  'rect': true,\n  'stop': true,\n  'svg': true,\n  'text': true,\n  'tspan': true\n}\n\n/**\n * Is element's namespace SVG?\n *\n * @param {String} name\n */\n\nexports.isElement = function (name) {\n  return name in exports.elements\n}\n\n\n//# sourceURL=webpack:///./node_modules/is-svg-element/index.js?");

/***/ }),

/***/ "./node_modules/meiosis-tracer/lib/meiosis-tracer.js":
/*!***********************************************************!*\
  !*** ./node_modules/meiosis-tracer/lib/meiosis-tracer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,\"__esModule\",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,\"a\",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p=\"\",r(r.s=4)}([function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});t.createReceiveValues=function(e,t){return function(r,n){n&&(e.tracerStates.length>0&&(e.tracerStates.length=e.tracerIndex+1),e.tracerStates.push(r),e.tracerIndex=e.tracerStates.length-1),t(r,e)}}},function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var n=null,a=null,i=function(e,t){var r=document.getElementById(\"tracerSlider\");if(r.setAttribute(\"max\",String(t.tracerStates.length-1)),r.value=String(t.tracerIndex),document.getElementById(\"tracerStepBack\").disabled=0===t.tracerIndex,document.getElementById(\"tracerStepForward\").disabled=t.tracerIndex===t.tracerStates.length-1,document.getElementById(\"tracerIndex\").innerHTML=String(t.tracerIndex),document.getElementById(\"tracerModel\").value=JSON.stringify(e[0].value,null,4),0===document.querySelectorAll(\"div.dataStream\").length){for(var n=\"\",i=1,d=e.length;i<d;i++)n+=\"<div\"+a+\" class='dataStream'><textarea rows='5' cols='40'></textarea></div>\";document.getElementById(\"dataStreamContainer\").innerHTML=n}var c=document.querySelectorAll(\"div.dataStream textarea\");for(i=1,d=e.length;i<d;i++)c[i-1].value=JSON.stringify(e[i].value,null,4)},d=function(e,t){return function(r){var n=parseInt(r.target.value,10),a=t.tracerStates[n];t.tracerIndex=n;var d=a[0].value;e(d,!1),i(a,t)}},c=function(e){var t=e.tracerStates[0];e.tracerStates.length=0,e.tracerIndex=0,i(t,e)},o=function(e,t){var r=document.getElementById(e),n=r.getElementsByTagName(\"textarea\")[0],a=r.getElementsByTagName(\"input\")[0],i=r.getElementsByTagName(\"div\")[0];n.value=JSON.stringify(t.values[t.index],null,4),a.setAttribute(\"max\",String(t.values.length-1)),a.value=String(t.index),i.innerHTML=String(t.index)};t.initialView=function(e,t,r,i){var o=document.querySelector(e);if(o){a=i?\" style='float: left'\":\"\";var l=\"<div style='text-align: right'><button id='tracerToggle'>Hide</button></div><div id='tracerContainer'><div style='text-align: right'><button id='tracerReset'>Reset</button></div><div>Data streams:</div><input id='tracerSlider' type='range' min='0' max='\"+String(t.tracerStates.length-1)+\"' value='\"+String(t.tracerIndex)+\"' style='width: 100%'/><button id='tracerStepBack'>&lt;</button> <button id='tracerStepForward'>&gt;</button> <span id='tracerIndex'>\"+String(t.tracerIndex)+\"</span><div\"+a+\"><div>Model: (you can type into this box)</div><textarea id='tracerModel' rows='5' cols='40'></textarea><div id='errorMessage' style='display: none'><span style='color:red'>Invalid JSON</span></div></div><span id='dataStreamContainer'></span><span id='otherStreamContainer'></span></div>\";o.innerHTML=l;var u=document.getElementById(\"tracerContainer\");n=document.getElementById(\"errorMessage\"),document.getElementById(\"tracerSlider\").addEventListener(\"input\",d(r,t)),document.getElementById(\"tracerModel\").addEventListener(\"keyup\",function(e){return function(t){try{var r=JSON.parse(t.target.value);e(r,!0),n.style.display=\"none\"}catch(e){n.style.display=\"block\"}}}(r)),document.getElementById(\"tracerToggle\").addEventListener(\"click\",function(e){return function(t){var r=t.target;\"none\"===e.style.display?(e.style.display=\"block\",r.innerHTML=\"Hide\"):(e.style.display=\"none\",r.innerHTML=\"Show\")}}(u)),document.getElementById(\"tracerReset\").addEventListener(\"click\",function(e){return function(){c(e)}}(t)),document.getElementById(\"tracerStepBack\").addEventListener(\"click\",function(){d(r,t)({target:{value:Math.max(0,t.tracerIndex-1)}})}),document.getElementById(\"tracerStepForward\").addEventListener(\"click\",function(){d(r,t)({target:{value:Math.min(t.tracerStates.length-1,t.tracerIndex+1)}})})}},t.tracerView=i,t.reset=c,t.initStreamIds=function(e,t,r){var i=\"<div>Other streams:</div>\";e.forEach(function(e){return i+=\"<div\"+a+\" class='otherStream' id='\"+e+\"'><input type='range' min='0' max='0' value='0' style='width: 100%'/><div>0</div><textarea rows='5' cols='40'></textarea><div><button>Trigger</button></div></div>\"}),document.getElementById(\"otherStreamContainer\").innerHTML=i,e.forEach(function(e){var a=document.getElementById(e);a.getElementsByTagName(\"input\")[0].addEventListener(\"input\",function(e,t){return function(r){var n=e[t],a=parseInt(r.target.value,10);n.index=a,o(t,n)}}(t,e));var i=a.getElementsByTagName(\"button\")[0],d=a.getElementsByTagName(\"textarea\")[0];i.addEventListener(\"click\",function(e,t,r){return function(){try{var a=JSON.parse(t.value);r(e,a),n.style.display=\"none\"}catch(e){n.style.display=\"block\"}}}(e,d,r))})},t.updateStreamValue=o},function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});t.tracerModel={tracerStates:[],tracerIndex:0,streams:{}}},function(e,t,r){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0}),t.meiosisTracer=void 0;var n=r(2),a=r(1),i=r(0);window.__MEIOSIS_TRACER_GLOBAL_HOOK__=!0;t.meiosisTracer=function(e){var t=e.selector,r=e.renderModel,d=e.triggerStreamValue,c=e.horizontal;if(document.querySelector(t)){var o=(0,i.createReceiveValues)(n.tracerModel,a.tracerView);r=r||function(e,t){return window.postMessage({type:\"MEIOSIS_RENDER_MODEL\",model:e,sendValuesBack:t},\"*\")},(0,a.initialView)(t,n.tracerModel,r,c),d=d||function(e,t){return window.postMessage({type:\"MEIOSIS_TRIGGER_STREAM_VALUE\",streamId:e,value:t},\"*\")};var l=function(e){e.forEach(function(e){return n.tracerModel.streams[e]={index:0,values:[]}}),(0,a.initStreamIds)(e,n.tracerModel.streams,d)},u=function(e,t){var r=n.tracerModel.streams[e];r.values.push(t),r.index=r.values.length-1,(0,a.updateStreamValue)(e,r)};return window.addEventListener(\"message\",function(e){if(\"MEIOSIS_VALUES\"===e.data.type)o(e.data.values,e.data.update);else if(\"MEIOSIS_STREAM_IDS\"===e.data.type){var t=e.data.streamIds;l(t)}else\"MEIOSIS_STREAM_VALUE\"===e.data.type&&u(e.data.streamId,e.data.value)}),window.postMessage({type:\"MEIOSIS_TRACER_INIT\"},\"*\"),{receiveValues:o,initStreamIdModel:l,receiveStreamValue:u,reset:function(){return(0,a.reset)(n.tracerModel)}}}}},function(e,t,r){\"use strict\";var n=r(3);e.exports=n.meiosisTracer}]);\n//# sourceMappingURL=meiosis-tracer.js.map\n\n//# sourceURL=webpack:///./node_modules/meiosis-tracer/lib/meiosis-tracer.js?");

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

/***/ "./node_modules/natural-selection/index.js":
/*!*************************************************!*\
  !*** ./node_modules/natural-selection/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var supportedTypes = ['text', 'search', 'tel', 'url', 'password'];\n\nmodule.exports = function(element){\n    return !!(element.setSelectionRange && ~supportedTypes.indexOf(element.type));\n};\n\n\n//# sourceURL=webpack:///./node_modules/natural-selection/index.js?");

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

/***/ "./node_modules/setify/index.js":
/*!**************************************!*\
  !*** ./node_modules/setify/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var naturalSelection = __webpack_require__(/*! natural-selection */ \"./node_modules/natural-selection/index.js\");\n\nmodule.exports = function(element, value){\n    var canSet = naturalSelection(element) && element === document.activeElement;\n\n    if (canSet) {\n        var start = element.selectionStart,\n            end = element.selectionEnd;\n\n        element.value = value;\n        element.setSelectionRange(start, end);\n    } else {\n        element.value = value;\n    }\n};\n\n\n//# sourceURL=webpack:///./node_modules/setify/index.js?");

/***/ }),

/***/ "./node_modules/svg-attribute-namespace/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/svg-attribute-namespace/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = module.exports['default'] = SvgAttributeNamespace\n\n/*\n * Supported SVG attribute namespaces by prefix.\n *\n * References:\n * - http://www.w3.org/TR/SVGTiny12/attributeTable.html\n * - http://www.w3.org/TR/SVG/attindex.html\n * - http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-ElSetAttrNS\n */\n\nvar namespaces = module.exports.namespaces = {\n  ev: 'http://www.w3.org/2001/xml-events',\n  xlink: 'http://www.w3.org/1999/xlink',\n  xml: 'http://www.w3.org/XML/1998/namespace',\n  xmlns: 'http://www.w3.org/2000/xmlns/'\n}\n\n/**\n * Get namespace of svg attribute\n *\n * @param {String} attributeName\n * @return {String} namespace\n */\n\nfunction SvgAttributeNamespace (attributeName) {\n  // if no prefix separator in attributeName, then no namespace\n  if (attributeName.indexOf(':') === -1) return null\n\n  // get prefix from attributeName\n  var prefix = attributeName.split(':', 1)[0]\n\n  // if prefix in supported prefixes\n  if (namespaces.hasOwnProperty(prefix)) {\n    // then namespace of prefix\n    return namespaces[prefix]\n  } else {\n    // else unsupported prefix\n    throw new Error('svg-attribute-namespace: prefix \"' + prefix + '\" is not supported by SVG.')\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/svg-attribute-namespace/index.js?");

/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/arity.js":
/*!*****************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/arity.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry2 = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js\");\n\n\n/**\n * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`\n * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,\n * functions produced by `arity` will pass all provided arguments to the wrapped function.\n *\n * @func\n * @memberOf R\n * @sig (Number, (* -> *)) -> (* -> *)\n * @category Function\n * @param {Number} n The desired arity of the returned function.\n * @param {Function} fn The function to wrap.\n * @return {Function} A new function wrapping `fn`. The new function is\n *         guaranteed to be of arity `n`.\n * @deprecated since v0.15.0\n * @example\n *\n *      var takesTwoArgs = function(a, b) {\n *        return [a, b];\n *      };\n *      takesTwoArgs.length; //=> 2\n *      takesTwoArgs(1, 2); //=> [1, 2]\n *\n *      var takesOneArg = R.arity(1, takesTwoArgs);\n *      takesOneArg.length; //=> 1\n *      // All arguments are passed through to the wrapped function\n *      takesOneArg(1, 2); //=> [1, 2]\n */\nmodule.exports = _curry2(function(n, fn) {\n  // jshint unused:vars\n  switch (n) {\n    case 0: return function() {return fn.apply(this, arguments);};\n    case 1: return function(a0) {return fn.apply(this, arguments);};\n    case 2: return function(a0, a1) {return fn.apply(this, arguments);};\n    case 3: return function(a0, a1, a2) {return fn.apply(this, arguments);};\n    case 4: return function(a0, a1, a2, a3) {return fn.apply(this, arguments);};\n    case 5: return function(a0, a1, a2, a3, a4) {return fn.apply(this, arguments);};\n    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.apply(this, arguments);};\n    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.apply(this, arguments);};\n    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.apply(this, arguments);};\n    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.apply(this, arguments);};\n    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.apply(this, arguments);};\n    default: throw new Error('First argument to arity must be a non-negative integer no greater than ten');\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/union-type/node_modules/ramda/src/arity.js?");

/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/curryN.js":
/*!******************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/curryN.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry2 = __webpack_require__(/*! ./internal/_curry2 */ \"./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js\");\nvar _curryN = __webpack_require__(/*! ./internal/_curryN */ \"./node_modules/union-type/node_modules/ramda/src/internal/_curryN.js\");\nvar arity = __webpack_require__(/*! ./arity */ \"./node_modules/union-type/node_modules/ramda/src/arity.js\");\n\n\n/**\n * Returns a curried equivalent of the provided function, with the\n * specified arity. The curried function has two unusual capabilities.\n * First, its arguments needn't be provided one at a time. If `g` is\n * `R.curryN(3, f)`, the following are equivalent:\n *\n *   - `g(1)(2)(3)`\n *   - `g(1)(2, 3)`\n *   - `g(1, 2)(3)`\n *   - `g(1, 2, 3)`\n *\n * Secondly, the special placeholder value `R.__` may be used to specify\n * \"gaps\", allowing partial application of any combination of arguments,\n * regardless of their positions. If `g` is as above and `_` is `R.__`,\n * the following are equivalent:\n *\n *   - `g(1, 2, 3)`\n *   - `g(_, 2, 3)(1)`\n *   - `g(_, _, 3)(1)(2)`\n *   - `g(_, _, 3)(1, 2)`\n *   - `g(_, 2)(1)(3)`\n *   - `g(_, 2)(1, 3)`\n *   - `g(_, 2)(_, 3)(1)`\n *\n * @func\n * @memberOf R\n * @category Function\n * @sig Number -> (* -> a) -> (* -> a)\n * @param {Number} length The arity for the returned function.\n * @param {Function} fn The function to curry.\n * @return {Function} A new, curried function.\n * @see R.curry\n * @example\n *\n *      var addFourNumbers = function() {\n *        return R.sum([].slice.call(arguments, 0, 4));\n *      };\n *\n *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);\n *      var f = curriedAddFourNumbers(1, 2);\n *      var g = f(3);\n *      g(4); //=> 10\n */\nmodule.exports = _curry2(function curryN(length, fn) {\n  return arity(length, _curryN(length, [], fn));\n});\n\n\n//# sourceURL=webpack:///./node_modules/union-type/node_modules/ramda/src/curryN.js?");

/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Optimized internal two-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nmodule.exports = function _curry1(fn) {\n  return function f1(a) {\n    if (arguments.length === 0) {\n      return f1;\n    } else if (a != null && a['@@functional/placeholder'] === true) {\n      return f1;\n    } else {\n      return fn(a);\n    }\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js?");

/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _curry1 = __webpack_require__(/*! ./_curry1 */ \"./node_modules/union-type/node_modules/ramda/src/internal/_curry1.js\");\n\n\n/**\n * Optimized internal two-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\nmodule.exports = function _curry2(fn) {\n  return function f2(a, b) {\n    var n = arguments.length;\n    if (n === 0) {\n      return f2;\n    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {\n      return f2;\n    } else if (n === 1) {\n      return _curry1(function(b) { return fn(a, b); });\n    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&\n                          b != null && b['@@functional/placeholder'] === true) {\n      return f2;\n    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {\n      return _curry1(function(a) { return fn(a, b); });\n    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {\n      return _curry1(function(b) { return fn(a, b); });\n    } else {\n      return fn(a, b);\n    }\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/union-type/node_modules/ramda/src/internal/_curry2.js?");

/***/ }),

/***/ "./node_modules/union-type/node_modules/ramda/src/internal/_curryN.js":
/*!****************************************************************************!*\
  !*** ./node_modules/union-type/node_modules/ramda/src/internal/_curryN.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arity = __webpack_require__(/*! ../arity */ \"./node_modules/union-type/node_modules/ramda/src/arity.js\");\n\n\n/**\n * Internal curryN function.\n *\n * @private\n * @category Function\n * @param {Number} length The arity of the curried function.\n * @return {array} An array of arguments received thus far.\n * @param {Function} fn The function to curry.\n */\nmodule.exports = function _curryN(length, received, fn) {\n  return function() {\n    var combined = [];\n    var argsIdx = 0;\n    var left = length;\n    var combinedIdx = 0;\n    while (combinedIdx < received.length || argsIdx < arguments.length) {\n      var result;\n      if (combinedIdx < received.length &&\n          (received[combinedIdx] == null ||\n           received[combinedIdx]['@@functional/placeholder'] !== true ||\n           argsIdx >= arguments.length)) {\n        result = received[combinedIdx];\n      } else {\n        result = arguments[argsIdx];\n        argsIdx += 1;\n      }\n      combined[combinedIdx] = result;\n      if (result == null || result['@@functional/placeholder'] !== true) {\n        left -= 1;\n      }\n      combinedIdx += 1;\n    }\n    return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/union-type/node_modules/ramda/src/internal/_curryN.js?");

/***/ }),

/***/ "./node_modules/union-type/union-type.js":
/*!***********************************************!*\
  !*** ./node_modules/union-type/union-type.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var curryN = __webpack_require__(/*! ramda/src/curryN */ \"./node_modules/union-type/node_modules/ramda/src/curryN.js\");\n\nfunction isString(s) { return typeof s === 'string'; }\nfunction isNumber(n) { return typeof n === 'number'; }\nfunction isObject(value) {\n  var type = typeof value;\n  return !!value && (type == 'object' || type == 'function');\n}\nfunction isFunction(f) { return typeof f === 'function'; }\nvar isArray = Array.isArray || function(a) { return 'length' in a; };\n\nvar mapConstrToFn = curryN(2, function(group, constr) {\n  return constr === String    ? isString\n       : constr === Number    ? isNumber\n       : constr === Object    ? isObject\n       : constr === Array     ? isArray\n       : constr === Function  ? isFunction\n       : constr === undefined ? group\n                              : constr;\n});\n\nfunction Constructor(group, name, validators) {\n  validators = validators.map(mapConstrToFn(group));\n  var constructor = curryN(validators.length, function() {\n    var val = [], v, validator;\n    for (var i = 0; i < arguments.length; ++i) {\n      v = arguments[i];\n      validator = validators[i];\n      if ((typeof validator === 'function' && validator(v)) ||\n          (v !== undefined && v !== null && v.of === validator)) {\n        val[i] = arguments[i];\n      } else {\n        throw new TypeError('wrong value ' + v + ' passed to location ' + i + ' in ' + name);\n      }\n    }\n    val.of = group;\n    val.name = name;\n    return val;\n  });\n  return constructor;\n}\n\nfunction rawCase(type, cases, action, arg) {\n  if (type !== action.of) throw new TypeError('wrong type passed to case');\n  var name = action.name in cases ? action.name\n           : '_' in cases         ? '_'\n                                  : undefined;\n  if (name === undefined) {\n    throw new Error('unhandled value passed to case');\n  } else {\n    return cases[name].apply(undefined, arg !== undefined ? action.concat([arg]) : action);\n  }\n}\n\nvar typeCase = curryN(3, rawCase);\nvar caseOn = curryN(4, rawCase);\n\nfunction Type(desc) {\n  var obj = {};\n  for (var key in desc) {\n    obj[key] = Constructor(obj, key, desc[key]);\n  }\n  obj.case = typeCase(obj);\n  obj.caseOn = caseOn(obj);\n  return obj;\n}\n\nmodule.exports = Type;\n\n\n//# sourceURL=webpack:///./node_modules/union-type/union-type.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ })

/******/ });