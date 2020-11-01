/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! namespace exports */
/*! export App [provided] [no usage info] [missing usage info prevents renaming] */
/*! export app [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => /* binding */ app,\n/* harmony export */   \"App\": () => /* binding */ App\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_nest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/nest */ \"./src/util/nest.js\");\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service */ \"./src/app/service.js\");\n/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../button */ \"./src/button/index.js\");\n/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../counter */ \"./src/counter/index.js\");\n/* harmony import */ var _random_gif__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../random-gif */ \"./src/random-gif/index.js\");\n/* harmony import */ var _random_gif_pair__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../random-gif-pair */ \"./src/random-gif-pair/index.js\");\n/* harmony import */ var _random_gif_pair_pair__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../random-gif-pair-pair */ \"./src/random-gif-pair-pair/index.js\");\n/* harmony import */ var _random_gif_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../random-gif-list */ \"./src/random-gif-list/index.js\");\n\n\n\n\n\n\n\n\n\nvar app = {\n  // Note: using the same initial state multiple times only works with immutability.\n  initial: {\n    events: {},\n    triggers: {},\n    button: _button__WEBPACK_IMPORTED_MODULE_3__.button.initial,\n    counter: _counter__WEBPACK_IMPORTED_MODULE_4__.counter.Initial({\n      label: \"Counter:\"\n    }),\n    randomGif1: _random_gif__WEBPACK_IMPORTED_MODULE_5__.randomGif.initial,\n    randomGif2: _random_gif__WEBPACK_IMPORTED_MODULE_5__.randomGif.initial,\n    randomGifPair: _random_gif_pair__WEBPACK_IMPORTED_MODULE_6__.randomGifPair.initial,\n    randomGifPairPair: _random_gif_pair_pair__WEBPACK_IMPORTED_MODULE_7__.randomGifPairPair.initial,\n    randomGifList: _random_gif_list__WEBPACK_IMPORTED_MODULE_8__.randomGifList.initial\n  },\n  Actions: function Actions(update) {\n    return Object.assign({}, _button__WEBPACK_IMPORTED_MODULE_3__.button.Actions(update), _random_gif__WEBPACK_IMPORTED_MODULE_5__.randomGif.Actions(update), _random_gif_list__WEBPACK_IMPORTED_MODULE_8__.randomGifList.Actions(update));\n  },\n  services: [_service__WEBPACK_IMPORTED_MODULE_2__.service, _counter__WEBPACK_IMPORTED_MODULE_4__.counter.service, _random_gif_list__WEBPACK_IMPORTED_MODULE_8__.randomGifList.service((0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"randomGifList\"))]\n};\nvar App = {\n  view: function view(_ref) {\n    var _ref$attrs = _ref.attrs,\n        state = _ref$attrs.state,\n        actions = _ref$attrs.actions;\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(_counter__WEBPACK_IMPORTED_MODULE_4__.Counter, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"counter\"),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.mt2\", \"Button:\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(_button__WEBPACK_IMPORTED_MODULE_3__.Button, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"button\"),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.mt2\", \"Random Gif:\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif__WEBPACK_IMPORTED_MODULE_5__.RandomGif, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"randomGif1\"),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.mt2\", \"Another Random Gif:\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif__WEBPACK_IMPORTED_MODULE_5__.RandomGif, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"randomGif2\"),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.mt2\", \"Random Gif Pair:\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif_pair__WEBPACK_IMPORTED_MODULE_6__.RandomGifPair, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"randomGifPair\"),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.mt2\", \"Random Gif Pair Pair:\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif_pair_pair__WEBPACK_IMPORTED_MODULE_7__.RandomGifPairPair, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"randomGifPairPair\"),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.mt2\", \"Random Gif List:\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif_list__WEBPACK_IMPORTED_MODULE_8__.RandomGifList, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"randomGifList\"),\n      actions: actions\n    }));\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/app/index.js?");

/***/ }),

/***/ "./src/app/service.js":
/*!****************************!*\
  !*** ./src/app/service.js ***!
  \****************************/
/*! namespace exports */
/*! export service [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"service\": () => /* binding */ service\n/* harmony export */ });\n// The app service is aware of other services and translates events into triggers for those\n// services. This allows for a single event to trigger multiple services. Each service then\n// acts upon its trigger and resets it.\n// In this example there is only one trigger, but we could put multiple triggers under\n// the \"triggers\" property.\nvar service = function service(state) {\n  if (state.events.newGifGenerated) {\n    return {\n      triggers: {\n        incrementCounter: true\n      },\n      events: {\n        newGifGenerated: undefined\n      }\n    };\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/app/service.js?");

/***/ }),

/***/ "./src/button/actions.js":
/*!*******************************!*\
  !*** ./src/button/actions.js ***!
  \*******************************/
/*! namespace exports */
/*! export Actions [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Actions\": () => /* binding */ Actions\n/* harmony export */ });\nvar Actions = function Actions(update) {\n  return {\n    buttonToggle: function buttonToggle(local) {\n      return update(local.patch({\n        active: function active(x) {\n          return !x;\n        }\n      }));\n    }\n  };\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/button/actions.js?");

/***/ }),

/***/ "./src/button/index.js":
/*!*****************************!*\
  !*** ./src/button/index.js ***!
  \*****************************/
/*! namespace exports */
/*! export Button [provided] [no usage info] [missing usage info prevents renaming] -> ./src/button/view.js .Button */
/*! export button [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"button\": () => /* binding */ button,\n/* harmony export */   \"Button\": () => /* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_2__.Button\n/* harmony export */ });\n/* harmony import */ var _initial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial */ \"./src/button/initial.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ \"./src/button/actions.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./src/button/view.js\");\n\n\nvar button = {\n  initial: _initial__WEBPACK_IMPORTED_MODULE_0__.initial,\n  Actions: _actions__WEBPACK_IMPORTED_MODULE_1__.Actions\n};\n\n\n//# sourceURL=webpack://random-gif-nested/./src/button/index.js?");

/***/ }),

/***/ "./src/button/initial.js":
/*!*******************************!*\
  !*** ./src/button/initial.js ***!
  \*******************************/
/*! namespace exports */
/*! export initial [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initial\": () => /* binding */ initial\n/* harmony export */ });\nvar initial = {\n  active: false\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/button/initial.js?");

/***/ }),

/***/ "./src/button/view.js":
/*!****************************!*\
  !*** ./src/button/view.js ***!
  \****************************/
/*! namespace exports */
/*! export Button [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Button\": () => /* binding */ Button\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/ui */ \"./src/util/ui.js\");\n\n\nvar Button = {\n  view: function view(_ref) {\n    var _ref$attrs = _ref.attrs,\n        state = _ref$attrs.state,\n        local = _ref$attrs.local,\n        actions = _ref$attrs.actions;\n    var bc = local.get(state).active ? \"green\" : \"red\";\n    var label = local.get(state).active ? \"Active\" : \"Inactive\";\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"button.bg-\" + bc + _util_ui__WEBPACK_IMPORTED_MODULE_1__.buttonStyle, {\n      onclick: function onclick() {\n        return actions.buttonToggle(local);\n      }\n    }, label);\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/button/view.js?");

/***/ }),

/***/ "./src/counter/index.js":
/*!******************************!*\
  !*** ./src/counter/index.js ***!
  \******************************/
/*! namespace exports */
/*! export Counter [provided] [no usage info] [missing usage info prevents renaming] -> ./src/counter/view.js .Counter */
/*! export counter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"counter\": () => /* binding */ counter,\n/* harmony export */   \"Counter\": () => /* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_2__.Counter\n/* harmony export */ });\n/* harmony import */ var _initial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial */ \"./src/counter/initial.js\");\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service */ \"./src/counter/service.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./src/counter/view.js\");\n\n\nvar counter = {\n  Initial: _initial__WEBPACK_IMPORTED_MODULE_0__.Initial,\n  service: _service__WEBPACK_IMPORTED_MODULE_1__.service\n};\n\n\n//# sourceURL=webpack://random-gif-nested/./src/counter/index.js?");

/***/ }),

/***/ "./src/counter/initial.js":
/*!********************************!*\
  !*** ./src/counter/initial.js ***!
  \********************************/
/*! namespace exports */
/*! export Initial [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Initial\": () => /* binding */ Initial\n/* harmony export */ });\nvar Initial = function Initial(_ref) {\n  var label = _ref.label;\n  return {\n    label: label,\n    value: 0\n  };\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/counter/initial.js?");

/***/ }),

/***/ "./src/counter/service.js":
/*!********************************!*\
  !*** ./src/counter/service.js ***!
  \********************************/
/*! namespace exports */
/*! export service [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"service\": () => /* binding */ service\n/* harmony export */ });\nvar service = function service(state) {\n  if (state.triggers.incrementCounter) {\n    var increment = state.counter.value > 3 && state.button.active ? 2 : 1;\n    return {\n      counter: {\n        value: function value(x) {\n          return x + increment;\n        }\n      },\n      triggers: {\n        incrementCounter: undefined\n      }\n    };\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/counter/service.js?");

/***/ }),

/***/ "./src/counter/view.js":
/*!*****************************!*\
  !*** ./src/counter/view.js ***!
  \*****************************/
/*! namespace exports */
/*! export Counter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Counter\": () => /* binding */ Counter\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Counter = {\n  view: function view(_ref) {\n    var _ref$attrs = _ref.attrs,\n        state = _ref$attrs.state,\n        local = _ref$attrs.local;\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div\", local.get(state).label + \" \" + local.get(state).value);\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/counter/view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mergerino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mergerino */ \"./node_modules/mergerino/dist/mergerino.min.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mithril/stream */ \"./node_modules/mithril/stream.js\");\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mithril_stream__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _util_meiosis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/meiosis */ \"./src/util/meiosis.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app */ \"./src/app/index.js\");\n/* harmony import */ var meiosis_tracer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! meiosis-tracer */ \"./node_modules/meiosis-tracer/lib/meiosis-tracer.js\");\n/* harmony import */ var meiosis_tracer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(meiosis_tracer__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n // Only for using Meiosis Tracer in development.\n\n\n\nvar _meiosis = (0,_util_meiosis__WEBPACK_IMPORTED_MODULE_3__.meiosis)({\n  stream: (mithril_stream__WEBPACK_IMPORTED_MODULE_2___default()),\n  merge: mergerino__WEBPACK_IMPORTED_MODULE_0__.default,\n  app: _app__WEBPACK_IMPORTED_MODULE_4__.app\n}),\n    states = _meiosis.states,\n    actions = _meiosis.actions; // Only for using Meiosis Tracer in development.\n\n\nmeiosis_tracer__WEBPACK_IMPORTED_MODULE_5___default()({\n  selector: \"#tracer\",\n  streams: [{\n    label: \"states\",\n    stream: states\n  }],\n  rows: 35\n});\nmithril__WEBPACK_IMPORTED_MODULE_1___default().mount(document.getElementById(\"app\"), {\n  view: function view() {\n    return mithril__WEBPACK_IMPORTED_MODULE_1___default()(_app__WEBPACK_IMPORTED_MODULE_4__.App, {\n      state: states(),\n      actions: actions\n    });\n  }\n});\nstates.map(function () {\n  return mithril__WEBPACK_IMPORTED_MODULE_1___default().redraw();\n});\n\n//# sourceURL=webpack://random-gif-nested/./src/index.js?");

/***/ }),

/***/ "./src/random-gif-list/actions.js":
/*!****************************************!*\
  !*** ./src/random-gif-list/actions.js ***!
  \****************************************/
/*! namespace exports */
/*! export Actions [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Actions\": () => /* binding */ Actions\n/* harmony export */ });\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/append.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/remove.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v1.js\");\n/* harmony import */ var _random_gif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../random-gif */ \"./src/random-gif/index.js\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar Actions = function Actions(update) {\n  return {\n    add: function add(local) {\n      var subId = (0,uuid__WEBPACK_IMPORTED_MODULE_1__.default)();\n      var randomGifState = _random_gif__WEBPACK_IMPORTED_MODULE_0__.randomGif.initial;\n      update(local.patch(_defineProperty({\n        randomGifIds: ramda__WEBPACK_IMPORTED_MODULE_2__.default(subId)\n      }, subId, randomGifState)));\n    },\n    remove: function remove(local, subId) {\n      update(local.patch(_defineProperty({\n        randomGifIds: function randomGifIds(list) {\n          return ramda__WEBPACK_IMPORTED_MODULE_3__.default(list.indexOf(subId), 1, list);\n        }\n      }, subId, undefined)));\n    }\n  };\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-list/actions.js?");

/***/ }),

/***/ "./src/random-gif-list/index.js":
/*!**************************************!*\
  !*** ./src/random-gif-list/index.js ***!
  \**************************************/
/*! namespace exports */
/*! export RandomGifList [provided] [no usage info] [missing usage info prevents renaming] -> ./src/random-gif-list/view.js .RandomGifList */
/*! export randomGifList [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomGifList\": () => /* binding */ randomGifList,\n/* harmony export */   \"RandomGifList\": () => /* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_3__.RandomGifList\n/* harmony export */ });\n/* harmony import */ var _initial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial */ \"./src/random-gif-list/initial.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ \"./src/random-gif-list/actions.js\");\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service */ \"./src/random-gif-list/service.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view */ \"./src/random-gif-list/view.js\");\n\n\n\nvar randomGifList = {\n  initial: _initial__WEBPACK_IMPORTED_MODULE_0__.initial,\n  Actions: _actions__WEBPACK_IMPORTED_MODULE_1__.Actions,\n  service: _service__WEBPACK_IMPORTED_MODULE_2__.service\n};\n\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-list/index.js?");

/***/ }),

/***/ "./src/random-gif-list/initial.js":
/*!****************************************!*\
  !*** ./src/random-gif-list/initial.js ***!
  \****************************************/
/*! namespace exports */
/*! export initial [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initial\": () => /* binding */ initial\n/* harmony export */ });\nvar initial = {\n  randomGifIds: []\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-list/initial.js?");

/***/ }),

/***/ "./src/random-gif-list/service.js":
/*!****************************************!*\
  !*** ./src/random-gif-list/service.js ***!
  \****************************************/
/*! namespace exports */
/*! export service [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"service\": () => /* binding */ service\n/* harmony export */ });\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/any.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/equals.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/map.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/path.js\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/prop.js\");\n\nvar service = function service(local) {\n  return function (state) {\n    var localState = local.get(state);\n    return local.patch({\n      hasGifs: ramda__WEBPACK_IMPORTED_MODULE_0__.default(ramda__WEBPACK_IMPORTED_MODULE_1__.default(\"Y\"), ramda__WEBPACK_IMPORTED_MODULE_2__.default(ramda__WEBPACK_IMPORTED_MODULE_3__.default([\"image\", \"value\", \"value\", \"case\"]), ramda__WEBPACK_IMPORTED_MODULE_2__.default(function (subId) {\n        return ramda__WEBPACK_IMPORTED_MODULE_4__.default(subId, localState);\n      }, localState.randomGifIds)))\n    });\n  };\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-list/service.js?");

/***/ }),

/***/ "./src/random-gif-list/view.js":
/*!*************************************!*\
  !*** ./src/random-gif-list/view.js ***!
  \*************************************/
/*! namespace exports */
/*! export RandomGifList [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RandomGifList\": () => /* binding */ RandomGifList\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _random_gif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../random-gif */ \"./src/random-gif/index.js\");\n/* harmony import */ var _util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/nest */ \"./src/util/nest.js\");\n/* harmony import */ var _util_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/ui */ \"./src/util/ui.js\");\n\n\n\n\nvar RandomGifItem = {\n  view: function view(_ref) {\n    var _ref$attrs = _ref.attrs,\n        state = _ref$attrs.state,\n        local = _ref$attrs.local,\n        actions = _ref$attrs.actions,\n        subId = _ref$attrs.subId;\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.dib.mr2\", {\n      key: subId\n    }, mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif__WEBPACK_IMPORTED_MODULE_1__.RandomGif, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_2__.nest)(subId, local),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"button.bg-red\" + _util_ui__WEBPACK_IMPORTED_MODULE_3__.buttonStyle, {\n      onclick: function onclick() {\n        return actions.remove(local, subId);\n      }\n    }, \"Remove\"));\n  }\n};\nvar RandomGifList = {\n  view: function view(_ref2) {\n    var _ref2$attrs = _ref2.attrs,\n        state = _ref2$attrs.state,\n        local = _ref2$attrs.local,\n        actions = _ref2$attrs.actions;\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.ba.b--blue.pa2.mt2\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div\", \"Has gifs: \", local.get(state).hasGifs ? \"Yes\" : \"No\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"button.bg-green\" + _util_ui__WEBPACK_IMPORTED_MODULE_3__.buttonStyle, {\n      onclick: function onclick() {\n        return actions.add(local);\n      }\n    }, \"Add\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"button.bg-red\" + _util_ui__WEBPACK_IMPORTED_MODULE_3__.buttonStyle, {\n      onclick: function onclick() {\n        return local.get(state).randomGifIds.map(function (subId) {\n          return actions.reset((0,_util_nest__WEBPACK_IMPORTED_MODULE_2__.nest)(subId, local));\n        });\n      }\n    }, \"Reset All\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div\", local.get(state).randomGifIds.map(function (subId) {\n      return mithril__WEBPACK_IMPORTED_MODULE_0___default()(RandomGifItem, {\n        state: state,\n        local: local,\n        actions: actions,\n        subId: subId\n      });\n    })));\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-list/view.js?");

/***/ }),

/***/ "./src/random-gif-pair-pair/index.js":
/*!*******************************************!*\
  !*** ./src/random-gif-pair-pair/index.js ***!
  \*******************************************/
/*! namespace exports */
/*! export RandomGifPairPair [provided] [no usage info] [missing usage info prevents renaming] -> ./src/random-gif-pair-pair/view.js .RandomGifPairPair */
/*! export randomGifPairPair [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomGifPairPair\": () => /* binding */ randomGifPairPair,\n/* harmony export */   \"RandomGifPairPair\": () => /* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_1__.RandomGifPairPair\n/* harmony export */ });\n/* harmony import */ var _initial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial */ \"./src/random-gif-pair-pair/initial.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/random-gif-pair-pair/view.js\");\n\nvar randomGifPairPair = {\n  initial: _initial__WEBPACK_IMPORTED_MODULE_0__.initial\n};\n\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-pair-pair/index.js?");

/***/ }),

/***/ "./src/random-gif-pair-pair/initial.js":
/*!*********************************************!*\
  !*** ./src/random-gif-pair-pair/initial.js ***!
  \*********************************************/
/*! namespace exports */
/*! export initial [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initial\": () => /* binding */ initial\n/* harmony export */ });\n/* harmony import */ var _random_gif_pair__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../random-gif-pair */ \"./src/random-gif-pair/index.js\");\n\nvar initial = {\n  one: _random_gif_pair__WEBPACK_IMPORTED_MODULE_0__.randomGifPair.initial,\n  two: _random_gif_pair__WEBPACK_IMPORTED_MODULE_0__.randomGifPair.initial\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-pair-pair/initial.js?");

/***/ }),

/***/ "./src/random-gif-pair-pair/view.js":
/*!******************************************!*\
  !*** ./src/random-gif-pair-pair/view.js ***!
  \******************************************/
/*! namespace exports */
/*! export RandomGifPairPair [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RandomGifPairPair\": () => /* binding */ RandomGifPairPair\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_nest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/nest */ \"./src/util/nest.js\");\n/* harmony import */ var _random_gif_pair__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../random-gif-pair */ \"./src/random-gif-pair/index.js\");\n\n\n\nvar RandomGifPairPair = {\n  view: function view(_ref) {\n    var _ref$attrs = _ref.attrs,\n        state = _ref$attrs.state,\n        local = _ref$attrs.local,\n        actions = _ref$attrs.actions;\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.ba.b--orange.pa2.mt2\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif_pair__WEBPACK_IMPORTED_MODULE_2__.RandomGifPair, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"one\", local),\n      actions: actions\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif_pair__WEBPACK_IMPORTED_MODULE_2__.RandomGifPair, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"two\", local),\n      actions: actions\n    }));\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-pair-pair/view.js?");

/***/ }),

/***/ "./src/random-gif-pair/index.js":
/*!**************************************!*\
  !*** ./src/random-gif-pair/index.js ***!
  \**************************************/
/*! namespace exports */
/*! export RandomGifPair [provided] [no usage info] [missing usage info prevents renaming] -> ./src/random-gif-pair/view.js .RandomGifPair */
/*! export randomGifPair [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomGifPair\": () => /* binding */ randomGifPair,\n/* harmony export */   \"RandomGifPair\": () => /* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_1__.RandomGifPair\n/* harmony export */ });\n/* harmony import */ var _initial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial */ \"./src/random-gif-pair/initial.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/random-gif-pair/view.js\");\n\nvar randomGifPair = {\n  initial: _initial__WEBPACK_IMPORTED_MODULE_0__.initial\n};\n\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-pair/index.js?");

/***/ }),

/***/ "./src/random-gif-pair/initial.js":
/*!****************************************!*\
  !*** ./src/random-gif-pair/initial.js ***!
  \****************************************/
/*! namespace exports */
/*! export initial [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initial\": () => /* binding */ initial\n/* harmony export */ });\n/* harmony import */ var _random_gif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../random-gif */ \"./src/random-gif/index.js\");\n\nvar initial = {\n  first: _random_gif__WEBPACK_IMPORTED_MODULE_0__.randomGif.initial,\n  second: _random_gif__WEBPACK_IMPORTED_MODULE_0__.randomGif.initial\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-pair/initial.js?");

/***/ }),

/***/ "./src/random-gif-pair/view.js":
/*!*************************************!*\
  !*** ./src/random-gif-pair/view.js ***!
  \*************************************/
/*! namespace exports */
/*! export RandomGifPair [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RandomGifPair\": () => /* binding */ RandomGifPair\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_nest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/nest */ \"./src/util/nest.js\");\n/* harmony import */ var _random_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../random-gif */ \"./src/random-gif/index.js\");\n\n\n\nvar RandomGifPair = {\n  view: function view(_ref) {\n    var _ref$attrs = _ref.attrs,\n        state = _ref$attrs.state,\n        local = _ref$attrs.local,\n        actions = _ref$attrs.actions;\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.ba.b--purple.pa2.mt2\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.dib\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif__WEBPACK_IMPORTED_MODULE_2__.RandomGif, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"first\", local),\n      actions: actions\n    })), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.dib.ml2\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(_random_gif__WEBPACK_IMPORTED_MODULE_2__.RandomGif, {\n      state: state,\n      local: (0,_util_nest__WEBPACK_IMPORTED_MODULE_1__.nest)(\"second\", local),\n      actions: actions\n    })));\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif-pair/view.js?");

/***/ }),

/***/ "./src/random-gif/actions.js":
/*!***********************************!*\
  !*** ./src/random-gif/actions.js ***!
  \***********************************/
/*! namespace exports */
/*! export Actions [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Actions\": () => /* binding */ Actions\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/random-gif/types.js\");\n\n\nvar gif_new_url = \"https://api.giphy.com/v1/gifs/random\";\nvar api_key = \"HMUbJEROIPi2Dodeq0thL28emz5CMCRX\"; // const api_key = \"dc6zaTOxFJmzC\"\n\nvar Actions = function Actions(update) {\n  return {\n    editTag: function editTag(local, tag) {\n      return update(local.patch({\n        tag: tag\n      }));\n    },\n    newGif: function newGif(local, state) {\n      update(local.patch({\n        image: _types__WEBPACK_IMPORTED_MODULE_1__.Loaded.N()\n      }));\n      mithril__WEBPACK_IMPORTED_MODULE_0___default().request({\n        url: gif_new_url,\n        params: {\n          api_key: api_key,\n          tag: local.get(state).tag\n        }\n      }).then(function (response) {\n        update([local.patch({\n          image: _types__WEBPACK_IMPORTED_MODULE_1__.Loaded.Y(_types__WEBPACK_IMPORTED_MODULE_1__.Success.Y(_types__WEBPACK_IMPORTED_MODULE_1__.Image.Y(response.data.image_url)))\n        }), {\n          events: {\n            newGifGenerated: true\n          }\n        }]);\n      })[\"catch\"](function () {\n        return update(local.patch({\n          image: _types__WEBPACK_IMPORTED_MODULE_1__.Loaded.Y(_types__WEBPACK_IMPORTED_MODULE_1__.Success.N())\n        }));\n      });\n    },\n    reset: function reset(local) {\n      return update(local.patch({\n        image: _types__WEBPACK_IMPORTED_MODULE_1__.Loaded.Y(_types__WEBPACK_IMPORTED_MODULE_1__.Success.Y(_types__WEBPACK_IMPORTED_MODULE_1__.Image.N()))\n      }));\n    }\n  };\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif/actions.js?");

/***/ }),

/***/ "./src/random-gif/index.js":
/*!*********************************!*\
  !*** ./src/random-gif/index.js ***!
  \*********************************/
/*! namespace exports */
/*! export RandomGif [provided] [no usage info] [missing usage info prevents renaming] -> ./src/random-gif/view.js .RandomGif */
/*! export randomGif [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"randomGif\": () => /* binding */ randomGif,\n/* harmony export */   \"RandomGif\": () => /* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_2__.RandomGif\n/* harmony export */ });\n/* harmony import */ var _initial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial */ \"./src/random-gif/initial.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ \"./src/random-gif/actions.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./src/random-gif/view.js\");\n\n\nvar randomGif = {\n  initial: _initial__WEBPACK_IMPORTED_MODULE_0__.initial,\n  Actions: _actions__WEBPACK_IMPORTED_MODULE_1__.Actions\n};\n\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif/index.js?");

/***/ }),

/***/ "./src/random-gif/initial.js":
/*!***********************************!*\
  !*** ./src/random-gif/initial.js ***!
  \***********************************/
/*! namespace exports */
/*! export initial [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initial\": () => /* binding */ initial\n/* harmony export */ });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/random-gif/types.js\");\n\nvar initial = {\n  image: _types__WEBPACK_IMPORTED_MODULE_0__.Loaded.Y(_types__WEBPACK_IMPORTED_MODULE_0__.Success.Y(_types__WEBPACK_IMPORTED_MODULE_0__.Image.N())),\n  tag: \"\"\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif/initial.js?");

/***/ }),

/***/ "./src/random-gif/types.js":
/*!*********************************!*\
  !*** ./src/random-gif/types.js ***!
  \*********************************/
/*! namespace exports */
/*! export Image [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Loaded [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Success [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Loaded\": () => /* binding */ Loaded,\n/* harmony export */   \"Success\": () => /* binding */ Success,\n/* harmony export */   \"Image\": () => /* binding */ Image\n/* harmony export */ });\n/* harmony import */ var static_sum_type_modules_yslashn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! static-sum-type/modules/yslashn */ \"./node_modules/static-sum-type/modules/yslashn/index.js\");\n/* harmony import */ var static_sum_type_modules_yslashn__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(static_sum_type_modules_yslashn__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Loaded = static_sum_type_modules_yslashn__WEBPACK_IMPORTED_MODULE_0___default().maybe(\"Loaded\");\nvar Success = static_sum_type_modules_yslashn__WEBPACK_IMPORTED_MODULE_0___default().maybe(\"Success\");\nvar Image = static_sum_type_modules_yslashn__WEBPACK_IMPORTED_MODULE_0___default().maybe(\"Image\");\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif/types.js?");

/***/ }),

/***/ "./src/random-gif/view.js":
/*!********************************!*\
  !*** ./src/random-gif/view.js ***!
  \********************************/
/*! namespace exports */
/*! export RandomGif [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RandomGif\": () => /* binding */ RandomGif\n/* harmony export */ });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/index.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ramda */ \"./node_modules/ramda/es/identity.js\");\n/* harmony import */ var static_sum_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! static-sum-type */ \"./node_modules/static-sum-type/modules/fold/index.js\");\n/* harmony import */ var static_sum_type__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(static_sum_type__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/random-gif/types.js\");\n/* harmony import */ var _util_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/ui */ \"./src/util/ui.js\");\n\n\n\n\n\nvar IMG_PREFIX = \"/examples/random-gif/images/\";\n\nvar imgsrc = function imgsrc(image) {\n  return (0,static_sum_type__WEBPACK_IMPORTED_MODULE_1__.fold)(_types__WEBPACK_IMPORTED_MODULE_2__.Loaded)({\n    N: function N() {\n      return IMG_PREFIX + \"loading.gif\";\n    },\n    Y: (0,static_sum_type__WEBPACK_IMPORTED_MODULE_1__.fold)(_types__WEBPACK_IMPORTED_MODULE_2__.Success)({\n      N: function N() {\n        return IMG_PREFIX + \"error.png\";\n      },\n      Y: (0,static_sum_type__WEBPACK_IMPORTED_MODULE_1__.fold)(_types__WEBPACK_IMPORTED_MODULE_2__.Image)({\n        N: function N() {\n          return IMG_PREFIX + \"blank.png\";\n        },\n        Y: ramda__WEBPACK_IMPORTED_MODULE_4__.default\n      })\n    })\n  })(image);\n};\n\nvar RandomGif = {\n  view: function view(_ref) {\n    var _ref$attrs = _ref.attrs,\n        state = _ref$attrs.state,\n        local = _ref$attrs.local,\n        actions = _ref$attrs.actions;\n    return mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.ba.b--green.pa2.mt2\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"span.mr2\", \"Tag:\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"input[type=text]\", {\n      value: local.get(state).tag,\n      onkeyup: function onkeyup(evt) {\n        return actions.editTag(local, evt.target.value);\n      }\n    }), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"button.bg-blue\" + _util_ui__WEBPACK_IMPORTED_MODULE_3__.buttonStyle, {\n      onclick: function onclick() {\n        return actions.newGif(local, state);\n      }\n    }, \"Random Gif\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"button.bg-red\" + _util_ui__WEBPACK_IMPORTED_MODULE_3__.buttonStyle, {\n      onclick: function onclick() {\n        return actions.reset(local);\n      }\n    }, \"Reset\"), mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"div.mt2\", mithril__WEBPACK_IMPORTED_MODULE_0___default()(\"img\", {\n      width: 200,\n      height: 200,\n      src: imgsrc(local.get(state).image)\n    })));\n  }\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/random-gif/view.js?");

/***/ }),

/***/ "./src/util/meiosis.js":
/*!*****************************!*\
  !*** ./src/util/meiosis.js ***!
  \*****************************/
/*! namespace exports */
/*! export meiosis [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"meiosis\": () => /* binding */ meiosis\n/* harmony export */ });\nvar meiosis = function meiosis(_ref) {\n  var stream = _ref.stream,\n      merge = _ref.merge,\n      app = _ref.app;\n  var update = stream();\n\n  var runServices = function runServices(startingState) {\n    return app.services.reduce(function (state, service) {\n      return merge(state, service(state));\n    }, startingState);\n  };\n\n  var states = stream.scan(function (state, patch) {\n    return runServices(merge(state, patch));\n  }, runServices(app.initial), update);\n  var actions = app.Actions(update, states);\n  return {\n    states: states,\n    update: update,\n    actions: actions\n  };\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/util/meiosis.js?");

/***/ }),

/***/ "./src/util/nest.js":
/*!**************************!*\
  !*** ./src/util/nest.js ***!
  \**************************/
/*! namespace exports */
/*! export nest [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"nest\": () => /* binding */ nest\n/* harmony export */ });\nfunction _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar _get = function get(object, path) {\n  return path.reduce(function (obj, key) {\n    return obj == undefined ? undefined : obj[key];\n  }, object);\n};\n\nvar set = function set() {\n  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  var _ref = arguments.length > 1 ? arguments[1] : undefined,\n      _ref2 = _toArray(_ref),\n      first = _ref2[0],\n      rest = _ref2.slice(1);\n\n  var value = arguments.length > 2 ? arguments[2] : undefined;\n  object[first] = rest.length ? set(object[first], rest, value) : value;\n  return object;\n};\n\nvar nestPatch = function nestPatch(path) {\n  return function (patch) {\n    return set({}, path, patch);\n  };\n};\n\nvar nest = function nest(path) {\n  var local = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {\n    path: []\n  };\n  var nestedPath = local.path.concat(path);\n  return {\n    get: function get(state) {\n      return _get(state, nestedPath);\n    },\n    patch: nestPatch(nestedPath),\n    path: nestedPath\n  };\n};\n\n//# sourceURL=webpack://random-gif-nested/./src/util/nest.js?");

/***/ }),

/***/ "./src/util/ui.js":
/*!************************!*\
  !*** ./src/util/ui.js ***!
  \************************/
/*! namespace exports */
/*! export buttonStyle [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"buttonStyle\": () => /* binding */ buttonStyle\n/* harmony export */ });\nvar buttonStyle = \".db.w4.mt2.pa2.white.br2\";\n\n//# sourceURL=webpack://random-gif-nested/./src/util/ui.js?");

/***/ }),

/***/ "./node_modules/meiosis-tracer/lib/meiosis-tracer.js":
/*!***********************************************************!*\
  !*** ./node_modules/meiosis-tracer/lib/meiosis-tracer.js ***!
  \***********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports=function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&\"object\"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,\"default\",{enumerable:!0,value:e}),2&n&&\"string\"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,\"a\",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p=\"\",t(t.s=0)}([function(e,n,t){\"use strict\";t.r(n);var o=function(e){var n=e.streams,t=void 0===n?[]:n,o=e.stringify,r=void 0===o?function(e){return JSON.stringify(e,null,4)}:o,a=e.parse,i=void 0===a?function(e){return JSON.parse(e)}:a,c=e.listen,d=void 0===c?function(e,n){return e.map(n)}:c,u=e.emit,l=void 0===u?function(e,n){return e(n)}:u;if(window&&window.__MEIOSIS_TRACER_GLOBAL_HOOK__){for(var s=[],m=!1,v=[],f=0,y=t.length;f<y;f++){var g=\"Stream \"+f;t[f].stream?(t[f].label=t[f].label||g,v.push(t[f])):v.push({stream:t[f],label:g})}v.forEach((function(e,n){var t=e.stream;d(t,(function(e){var t={type:\"MEIOSIS_STREAM_VALUE\",index:n,value:r(e)};m?window.postMessage(t,\"*\"):s.push(t)}))})),window.addEventListener(\"message\",(function(e){if(\"MEIOSIS_TRACER_INIT\"===e.data.type){var n=[];v.forEach((function(e){var t={};Object.keys(e).forEach((function(n){\"stream\"!==n&&(t[n]=e[n])})),n.push(t)})),window.postMessage({type:\"MEIOSIS_STREAM_OPTIONS\",value:n},\"*\"),m=!0,s.forEach((function(e){return window.postMessage(e,\"*\")})),s.length=0}else if(\"MEIOSIS_TRIGGER_STREAM_VALUE\"===e.data.type){var t=e.data,o=t.index,r=t.value;l(v[o].stream,i(r))}})),window.postMessage({type:\"MEIOSIS_PING\"},\"*\")}},r=function(e){return\"tracerStreamBox_ \"+e},a=function(e){return\"tracerStreamBoxHidden_\"+e},i=function(e){return\"tracerStreamHide_\"+e},c=function(e){return\"tracerStreamShow_\"+e},d=function(e){return\"tracerModel_\"+e},u=function(e){return\"tracerSlider_\"+e},l=function(e){return\"tracerStepBack_\"+e},s=function(e){return\"tracerStepForward_\"+e},m=function(e){return\"tracerSliderValue_\"+e},v=function(e){return\"tracerSend_\"+e},f=function(e){return\"tracerReset_\"+e},y=function(e){return\"tracerAccumulateHistory_\"+e},g=function(e){var n=e.index,t=e.model,o=e.value,r=e.max;document.getElementById(d(n)).value=t,null!=r&&(document.getElementById(u(n)).max=r),document.getElementById(u(n)).value=o,document.getElementById(m(n)).innerHTML=o,document.getElementById(l(n)).disabled=o<=0,document.getElementById(s(n)).disabled=o==document.getElementById(u(n)).max};window.__MEIOSIS_TRACER_GLOBAL_HOOK__=!0;var p=[],E=[],h=function(e){var n=e.selector,t=e.sendTracerInit,o=e.triggerStreamValue,h=e.direction,S=void 0===h?\"column\":h,I=e.theme,w=void 0===I?\"light\":I,b=e.rows,_=void 0===b?15:b,B=e.cols,x=void 0===B?50:B,C=e.autoSend,O=void 0===C||C,M=document.querySelector(n);if(M){M.classList.add(\"theme-\".concat(w));var L=null;null==t&&(t=function(){window.postMessage({type:\"MEIOSIS_TRACER_INIT\"},\"*\")}),null==o&&(o=function(e,n){window.postMessage({type:\"MEIOSIS_TRIGGER_STREAM_VALUE\",index:e,value:n},\"*\")});var R=function(e){if(!M.lastChild){var n={onHideTracer:function(){var e=document.getElementById(\"tracerStreamContainer\");L=e.style,e.style=\"display:none\",document.getElementById(\"tracerSettingsContainer\").style=\"display:none\",document.getElementById(\"tracerShow\").style=\"\"},onShowTracer:function(){document.getElementById(\"tracerStreamContainer\").style=L,document.getElementById(\"tracerSettingsContainer\").style=\"\",document.getElementById(\"tracerShow\").style=\"display:none\"},onRowsColsChange:function(n,t){for(var o=0;o<e.length;o++){var r=document.getElementById(d(o));r.rows=n,r.cols=t}},onDirectionChange:function(e){document.getElementById(\"tracerStreamContainer\").style=\"display:flex;flex-direction:\"+e},onAutoChange:function(e){O=e}},t=document.createElement(\"div\");M.append(t),function(e){var n=e.element,t=e.listeners,o=e.direction,r=e.rows,a=e.cols,i=e.autoSend;n.innerHTML=\"\\n    <div id='\".concat(\"tracerSettingsContainer\",\"'>\\n      <label title='Align in a row'>\\n        <input type='radio' name='direction' value='row'\\n          \").concat(\"row\"===o?\"checked\":\"\",\" />\\n        Row\\n      </label>\\n      <label title='Align in a column'>\\n        <input type='radio' name='direction' value='column'\\n          \").concat(\"column\"===o?\"checked\":\"\",\" />\\n        Col\\n      </label>\\n      <label title='Toggle auto-send'>\\n        <input id='\").concat(\"traceAutoSend\",\"' type='checkbox' \").concat(i?\"checked\":\"\",\" />\\n        Auto\\n      </label>\\n      <input title='Number of rows' id='\").concat(\"tracerRows\",\"' type='text' size='2'\\n        value='\").concat(r,\"'/>\\n      <span> &times; </span>\\n      <input title='Number of columns' id='\").concat(\"tracerCols\",\"' type='text' size='2'\\n        value='\").concat(a,\"'/>\\n      <button id='\").concat(\"tracerHide\",\"'>Hide</button>\\n      <span>v4.0.0</span>\\n    </div>\\n    <button id='\").concat(\"tracerShow\",\"' style='display:none'>Show</button>\\n  \"),document.getElementById(\"tracerHide\").addEventListener(\"click\",(function(e){t.onHideTracer()})),document.getElementById(\"tracerShow\").addEventListener(\"click\",(function(e){t.onShowTracer()})),document.getElementById(\"tracerRows\").addEventListener(\"input\",(function(e){t.onRowsColsChange(parseInt(e.target.value,10),parseInt(document.getElementById(\"tracerCols\").value,10))})),document.getElementById(\"tracerCols\").addEventListener(\"input\",(function(e){t.onRowsColsChange(parseInt(document.getElementById(\"tracerRows\").value,10),parseInt(e.target.value,10))}));for(var c=document.querySelectorAll(\"input[name='direction']\"),d=0,u=c.length;d<u;d++)c[d].addEventListener(\"change\",(function(e){e.target.checked&&t.onDirectionChange(e.target.value)}));document.getElementById(\"traceAutoSend\").addEventListener(\"change\",(function(e){t.onAutoChange(e.target.checked)}))}({element:t,listeners:n,direction:S,rows:_,cols:x,autoSend:O});var h=document.createElement(\"div\");h.id=\"tracerStreamContainer\",h.style=\"display:flex;flex-direction:column\",M.append(h);for(var I=function(e,n){O&&(E[e]=!1,document.getElementById(y(e)).checked=!1,o(e,n))},w=function(n){var t=e[n],S=t.label,w=t.hist,b=t.hide;p.push({history:[],value:-1}),E.push(!1!==w);var B={onSliderChange:function(e){var t=p[n],o=t.history[e];t.value=e,g({index:n,model:o,value:e}),I(n,o)},onStepBack:function(){var e=p[n];e.value=e.value-1;var t=e.history[e.value];g({index:n,model:t,value:e.value}),I(n,t)},onStepForward:function(){var e=p[n];e.value=e.value+1;var t=e.history[e.value];g({index:n,model:t,value:e.value}),I(n,t)},onSend:function(e){o(n,e)},onReset:function(){var e=p[n];e.history.length=0,e.value=-1,g({index:n,model:\"\",value:e.value,max:e.value})},onHistChange:function(e,n){E[e]=n}},C=document.createElement(\"div\");C.style=\"flex-grow:1\",h.append(C),function(e){var n=e.element,t=e.index,o=e.listeners,g=e.label,p=void 0===g?\"\":g,E=e.rows,h=e.cols,S=e.hist,I=void 0===S||S,w=e.hide,b=void 0!==w&&w,_=\"padding:8px;border:1px solid gray\";n.innerHTML=\"\\n    <div id='\".concat(r(t),\"' style='\").concat(_,\"'>\\n      <div>\\n        <span>\").concat(p,\"</span>\\n        <label title='Toggle accumulate history'>\\n          <input id='\").concat(y(t),\"' type='checkbox' \").concat(I?\"checked\":\"\",\" />\\n          Hist\\n        </label>\\n        <button id='\").concat(i(t),\"'>Hide</button>\\n      </div>\\n      <textarea id='\").concat(d(t),\"' rows='\").concat(E,\"' cols='\").concat(h,\"'>\\n      </textarea>\\n      <div>\\n        <input id='\").concat(u(t),\"' type='range' min='0' max='0' value='0'\\n          style='width: 100%' />\\n        <button id='\").concat(l(t),\"'>&lt</button>\\n        <button id='\").concat(s(t),\"'>&gt</button>\\n        <span id='\").concat(m(t),\"'>-1</span>\\n        <button id='\").concat(v(t),\"'>Send</button>\\n        <button id='\").concat(f(t),\"'>Reset</button>\\n      </div>\\n    </div>\\n    <div id='\").concat(a(t),\"' style='display:none'>\\n      <span>\").concat(p,\" </span>\\n      <button id='\").concat(c(t),\"'>Show</button>\\n    </div>\\n  \"),document.getElementById(u(t)).addEventListener(\"input\",(function(e){o.onSliderChange(parseInt(e.target.value,10))}));var B=document.getElementById(l(t));B.addEventListener(\"click\",(function(e){o.onStepBack()})),B.disabled=!0;var x=document.getElementById(s(t));x.addEventListener(\"click\",(function(e){o.onStepForward()})),x.disabled=!0,document.getElementById(v(t)).addEventListener(\"click\",(function(e){o.onSend(document.getElementById(d(t)).value)})),document.getElementById(f(t)).addEventListener(\"click\",(function(e){o.onReset()}));var C=function(e){document.getElementById(r(e)).style=\"display:none\",document.getElementById(a(e)).style=_};document.getElementById(i(t)).addEventListener(\"click\",(function(e){return C(t)})),document.getElementById(c(t)).addEventListener(\"click\",(function(e){document.getElementById(a(t)).style=\"display:none\",document.getElementById(r(t)).style=_})),document.getElementById(y(t)).addEventListener(\"change\",(function(e){o.onHistChange(t,e.target.checked)})),b&&C(t)}({element:C,index:n,listeners:B,label:S,rows:_,cols:x,hist:w,hide:b})},b=0;b<e.length;b++)w(b);!function(e,n){var t=function(){for(var n=window.innerWidth>window.innerHeight?\"row\":\"column\",t=document.querySelectorAll(\"input[name='direction']\"),o=0,r=t.length;o<r;o++)t[o].checked=t[o].value===n;e.onDirectionChange(n)};\"auto\"===n&&window.addEventListener(\"resize\",t),\"row\"===n||\"column\"===n?e.onDirectionChange(n):t()}(n,S)}},T=function(e,n){if(E[e]){var t=p[e];t.history.length>0&&(t.history.length=t.value+1),t.history.push(n),t.value=t.history.length-1,g({index:e,model:n,value:t.value,max:t.history.length-1})}};return window.addEventListener(\"message\",(function(e){\"MEIOSIS_STREAM_OPTIONS\"===e.data.type?R(e.data.value):\"MEIOSIS_STREAM_VALUE\"===e.data.type&&T(e.data.index,e.data.value)})),t(),{receiveStreamOptions:R,receiveStreamValue:T}}};n.default=function(e){if(null!=e.streams&&o(e),null!=e.selector)return h(e)}}]);\n//# sourceMappingURL=meiosis-tracer.js.map\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/meiosis-tracer/lib/meiosis-tracer.js?");

/***/ }),

/***/ "./node_modules/mergerino/dist/mergerino.min.js":
/*!******************************************************!*\
  !*** ./node_modules/mergerino/dist/mergerino.min.js ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst e=Object.assign||((e,t)=>(t&&Object.keys(t).forEach(o=>e[o]=t[o]),e)),t=(e,r,s)=>{const c=typeof s;if(s&&\"object\"===c)if(Array.isArray(s))for(const o of s)r=t(e,r,o);else for(const c of Object.keys(s)){const f=s[c];\"function\"==typeof f?r[c]=f(r[c],o):void 0===f?e&&!isNaN(c)?r.splice(c,1):delete r[c]:null===f||\"object\"!=typeof f||Array.isArray(f)?r[c]=f:\"object\"==typeof r[c]?r[c]=f===r[c]?f:o(r[c],f):r[c]=t(!1,{},f)}else\"function\"===c&&(r=s(r,o));return r},o=(o,...r)=>{const s=Array.isArray(o);return t(s,s?o.slice():e({},o),r)};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (o);\n//# sourceMappingURL=mergerino.min.js.map\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mergerino/dist/mergerino.min.js?");

/***/ }),

/***/ "./node_modules/mithril/api/mount-redraw.js":
/*!**************************************************!*\
  !*** ./node_modules/mithril/api/mount-redraw.js ***!
  \**************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Vnode = __webpack_require__(/*! ../render/vnode */ \"./node_modules/mithril/render/vnode.js\")\n\nmodule.exports = function(render, schedule, console) {\n\tvar subscriptions = []\n\tvar rendering = false\n\tvar pending = false\n\n\tfunction sync() {\n\t\tif (rendering) throw new Error(\"Nested m.redraw.sync() call\")\n\t\trendering = true\n\t\tfor (var i = 0; i < subscriptions.length; i += 2) {\n\t\t\ttry { render(subscriptions[i], Vnode(subscriptions[i + 1]), redraw) }\n\t\t\tcatch (e) { console.error(e) }\n\t\t}\n\t\trendering = false\n\t}\n\n\tfunction redraw() {\n\t\tif (!pending) {\n\t\t\tpending = true\n\t\t\tschedule(function() {\n\t\t\t\tpending = false\n\t\t\t\tsync()\n\t\t\t})\n\t\t}\n\t}\n\n\tredraw.sync = sync\n\n\tfunction mount(root, component) {\n\t\tif (component != null && component.view == null && typeof component !== \"function\") {\n\t\t\tthrow new TypeError(\"m.mount(element, component) expects a component, not a vnode\")\n\t\t}\n\n\t\tvar index = subscriptions.indexOf(root)\n\t\tif (index >= 0) {\n\t\t\tsubscriptions.splice(index, 2)\n\t\t\trender(root, [], redraw)\n\t\t}\n\n\t\tif (component != null) {\n\t\t\tsubscriptions.push(root, component)\n\t\t\trender(root, Vnode(component), redraw)\n\t\t}\n\t}\n\n\treturn {mount: mount, redraw: redraw}\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/api/mount-redraw.js?");

/***/ }),

/***/ "./node_modules/mithril/api/router.js":
/*!********************************************!*\
  !*** ./node_modules/mithril/api/router.js ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Vnode = __webpack_require__(/*! ../render/vnode */ \"./node_modules/mithril/render/vnode.js\")\nvar m = __webpack_require__(/*! ../render/hyperscript */ \"./node_modules/mithril/render/hyperscript.js\")\nvar Promise = __webpack_require__(/*! ../promise/promise */ \"./node_modules/mithril/promise/promise.js\")\n\nvar buildPathname = __webpack_require__(/*! ../pathname/build */ \"./node_modules/mithril/pathname/build.js\")\nvar parsePathname = __webpack_require__(/*! ../pathname/parse */ \"./node_modules/mithril/pathname/parse.js\")\nvar compileTemplate = __webpack_require__(/*! ../pathname/compileTemplate */ \"./node_modules/mithril/pathname/compileTemplate.js\")\nvar assign = __webpack_require__(/*! ../pathname/assign */ \"./node_modules/mithril/pathname/assign.js\")\n\nvar sentinel = {}\n\nmodule.exports = function($window, mountRedraw) {\n\tvar fireAsync\n\n\tfunction setPath(path, data, options) {\n\t\tpath = buildPathname(path, data)\n\t\tif (fireAsync != null) {\n\t\t\tfireAsync()\n\t\t\tvar state = options ? options.state : null\n\t\t\tvar title = options ? options.title : null\n\t\t\tif (options && options.replace) $window.history.replaceState(state, title, route.prefix + path)\n\t\t\telse $window.history.pushState(state, title, route.prefix + path)\n\t\t}\n\t\telse {\n\t\t\t$window.location.href = route.prefix + path\n\t\t}\n\t}\n\n\tvar currentResolver = sentinel, component, attrs, currentPath, lastUpdate\n\n\tvar SKIP = route.SKIP = {}\n\n\tfunction route(root, defaultRoute, routes) {\n\t\tif (root == null) throw new Error(\"Ensure the DOM element that was passed to `m.route` is not undefined\")\n\t\t// 0 = start\n\t\t// 1 = init\n\t\t// 2 = ready\n\t\tvar state = 0\n\n\t\tvar compiled = Object.keys(routes).map(function(route) {\n\t\t\tif (route[0] !== \"/\") throw new SyntaxError(\"Routes must start with a `/`\")\n\t\t\tif ((/:([^\\/\\.-]+)(\\.{3})?:/).test(route)) {\n\t\t\t\tthrow new SyntaxError(\"Route parameter names must be separated with either `/`, `.`, or `-`\")\n\t\t\t}\n\t\t\treturn {\n\t\t\t\troute: route,\n\t\t\t\tcomponent: routes[route],\n\t\t\t\tcheck: compileTemplate(route),\n\t\t\t}\n\t\t})\n\t\tvar callAsync = typeof setImmediate === \"function\" ? setImmediate : setTimeout\n\t\tvar p = Promise.resolve()\n\t\tvar scheduled = false\n\t\tvar onremove\n\n\t\tfireAsync = null\n\n\t\tif (defaultRoute != null) {\n\t\t\tvar defaultData = parsePathname(defaultRoute)\n\n\t\t\tif (!compiled.some(function (i) { return i.check(defaultData) })) {\n\t\t\t\tthrow new ReferenceError(\"Default route doesn't match any known routes\")\n\t\t\t}\n\t\t}\n\n\t\tfunction resolveRoute() {\n\t\t\tscheduled = false\n\t\t\t// Consider the pathname holistically. The prefix might even be invalid,\n\t\t\t// but that's not our problem.\n\t\t\tvar prefix = $window.location.hash\n\t\t\tif (route.prefix[0] !== \"#\") {\n\t\t\t\tprefix = $window.location.search + prefix\n\t\t\t\tif (route.prefix[0] !== \"?\") {\n\t\t\t\t\tprefix = $window.location.pathname + prefix\n\t\t\t\t\tif (prefix[0] !== \"/\") prefix = \"/\" + prefix\n\t\t\t\t}\n\t\t\t}\n\t\t\t// This seemingly useless `.concat()` speeds up the tests quite a bit,\n\t\t\t// since the representation is consistently a relatively poorly\n\t\t\t// optimized cons string.\n\t\t\tvar path = prefix.concat()\n\t\t\t\t.replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)\n\t\t\t\t.slice(route.prefix.length)\n\t\t\tvar data = parsePathname(path)\n\n\t\t\tassign(data.params, $window.history.state)\n\n\t\t\tfunction fail() {\n\t\t\t\tif (path === defaultRoute) throw new Error(\"Could not resolve default route \" + defaultRoute)\n\t\t\t\tsetPath(defaultRoute, null, {replace: true})\n\t\t\t}\n\n\t\t\tloop(0)\n\t\t\tfunction loop(i) {\n\t\t\t\t// 0 = init\n\t\t\t\t// 1 = scheduled\n\t\t\t\t// 2 = done\n\t\t\t\tfor (; i < compiled.length; i++) {\n\t\t\t\t\tif (compiled[i].check(data)) {\n\t\t\t\t\t\tvar payload = compiled[i].component\n\t\t\t\t\t\tvar matchedRoute = compiled[i].route\n\t\t\t\t\t\tvar localComp = payload\n\t\t\t\t\t\tvar update = lastUpdate = function(comp) {\n\t\t\t\t\t\t\tif (update !== lastUpdate) return\n\t\t\t\t\t\t\tif (comp === SKIP) return loop(i + 1)\n\t\t\t\t\t\t\tcomponent = comp != null && (typeof comp.view === \"function\" || typeof comp === \"function\")? comp : \"div\"\n\t\t\t\t\t\t\tattrs = data.params, currentPath = path, lastUpdate = null\n\t\t\t\t\t\t\tcurrentResolver = payload.render ? payload : null\n\t\t\t\t\t\t\tif (state === 2) mountRedraw.redraw()\n\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\tstate = 2\n\t\t\t\t\t\t\t\tmountRedraw.redraw.sync()\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\t// There's no understating how much I *wish* I could\n\t\t\t\t\t\t// use `async`/`await` here...\n\t\t\t\t\t\tif (payload.view || typeof payload === \"function\") {\n\t\t\t\t\t\t\tpayload = {}\n\t\t\t\t\t\t\tupdate(localComp)\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (payload.onmatch) {\n\t\t\t\t\t\t\tp.then(function () {\n\t\t\t\t\t\t\t\treturn payload.onmatch(data.params, path, matchedRoute)\n\t\t\t\t\t\t\t}).then(update, fail)\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse update(\"div\")\n\t\t\t\t\t\treturn\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfail()\n\t\t\t}\n\t\t}\n\n\t\t// Set it unconditionally so `m.route.set` and `m.route.Link` both work,\n\t\t// even if neither `pushState` nor `hashchange` are supported. It's\n\t\t// cleared if `hashchange` is used, since that makes it automatically\n\t\t// async.\n\t\tfireAsync = function() {\n\t\t\tif (!scheduled) {\n\t\t\t\tscheduled = true\n\t\t\t\tcallAsync(resolveRoute)\n\t\t\t}\n\t\t}\n\n\t\tif (typeof $window.history.pushState === \"function\") {\n\t\t\tonremove = function() {\n\t\t\t\t$window.removeEventListener(\"popstate\", fireAsync, false)\n\t\t\t}\n\t\t\t$window.addEventListener(\"popstate\", fireAsync, false)\n\t\t} else if (route.prefix[0] === \"#\") {\n\t\t\tfireAsync = null\n\t\t\tonremove = function() {\n\t\t\t\t$window.removeEventListener(\"hashchange\", resolveRoute, false)\n\t\t\t}\n\t\t\t$window.addEventListener(\"hashchange\", resolveRoute, false)\n\t\t}\n\n\t\treturn mountRedraw.mount(root, {\n\t\t\tonbeforeupdate: function() {\n\t\t\t\tstate = state ? 2 : 1\n\t\t\t\treturn !(!state || sentinel === currentResolver)\n\t\t\t},\n\t\t\toncreate: resolveRoute,\n\t\t\tonremove: onremove,\n\t\t\tview: function() {\n\t\t\t\tif (!state || sentinel === currentResolver) return\n\t\t\t\t// Wrap in a fragment to preserve existing key semantics\n\t\t\t\tvar vnode = [Vnode(component, attrs.key, attrs)]\n\t\t\t\tif (currentResolver) vnode = currentResolver.render(vnode[0])\n\t\t\t\treturn vnode\n\t\t\t},\n\t\t})\n\t}\n\troute.set = function(path, data, options) {\n\t\tif (lastUpdate != null) {\n\t\t\toptions = options || {}\n\t\t\toptions.replace = true\n\t\t}\n\t\tlastUpdate = null\n\t\tsetPath(path, data, options)\n\t}\n\troute.get = function() {return currentPath}\n\troute.prefix = \"#!\"\n\troute.Link = {\n\t\tview: function(vnode) {\n\t\t\tvar options = vnode.attrs.options\n\t\t\t// Remove these so they don't get overwritten\n\t\t\tvar attrs = {}, onclick, href\n\t\t\tassign(attrs, vnode.attrs)\n\t\t\t// The first two are internal, but the rest are magic attributes\n\t\t\t// that need censored to not screw up rendering.\n\t\t\tattrs.selector = attrs.options = attrs.key = attrs.oninit =\n\t\t\tattrs.oncreate = attrs.onbeforeupdate = attrs.onupdate =\n\t\t\tattrs.onbeforeremove = attrs.onremove = null\n\n\t\t\t// Do this now so we can get the most current `href` and `disabled`.\n\t\t\t// Those attributes may also be specified in the selector, and we\n\t\t\t// should honor that.\n\t\t\tvar child = m(vnode.attrs.selector || \"a\", attrs, vnode.children)\n\n\t\t\t// Let's provide a *right* way to disable a route link, rather than\n\t\t\t// letting people screw up accessibility on accident.\n\t\t\t//\n\t\t\t// The attribute is coerced so users don't get surprised over\n\t\t\t// `disabled: 0` resulting in a button that's somehow routable\n\t\t\t// despite being visibly disabled.\n\t\t\tif (child.attrs.disabled = Boolean(child.attrs.disabled)) {\n\t\t\t\tchild.attrs.href = null\n\t\t\t\tchild.attrs[\"aria-disabled\"] = \"true\"\n\t\t\t\t// If you *really* do want to do this on a disabled link, use\n\t\t\t\t// an `oncreate` hook to add it.\n\t\t\t\tchild.attrs.onclick = null\n\t\t\t} else {\n\t\t\t\tonclick = child.attrs.onclick\n\t\t\t\thref = child.attrs.href\n\t\t\t\tchild.attrs.href = route.prefix + href\n\t\t\t\tchild.attrs.onclick = function(e) {\n\t\t\t\t\tvar result\n\t\t\t\t\tif (typeof onclick === \"function\") {\n\t\t\t\t\t\tresult = onclick.call(e.currentTarget, e)\n\t\t\t\t\t} else if (onclick == null || typeof onclick !== \"object\") {\n\t\t\t\t\t\t// do nothing\n\t\t\t\t\t} else if (typeof onclick.handleEvent === \"function\") {\n\t\t\t\t\t\tonclick.handleEvent(e)\n\t\t\t\t\t}\n\n\t\t\t\t\t// Adapted from React Router's implementation:\n\t\t\t\t\t// https://github.com/ReactTraining/react-router/blob/520a0acd48ae1b066eb0b07d6d4d1790a1d02482/packages/react-router-dom/modules/Link.js\n\t\t\t\t\t//\n\t\t\t\t\t// Try to be flexible and intuitive in how we handle links.\n\t\t\t\t\t// Fun fact: links aren't as obvious to get right as you\n\t\t\t\t\t// would expect. There's a lot more valid ways to click a\n\t\t\t\t\t// link than this, and one might want to not simply click a\n\t\t\t\t\t// link, but right click or command-click it to copy the\n\t\t\t\t\t// link target, etc. Nope, this isn't just for blind people.\n\t\t\t\t\tif (\n\t\t\t\t\t\t// Skip if `onclick` prevented default\n\t\t\t\t\t\tresult !== false && !e.defaultPrevented &&\n\t\t\t\t\t\t// Ignore everything but left clicks\n\t\t\t\t\t\t(e.button === 0 || e.which === 0 || e.which === 1) &&\n\t\t\t\t\t\t// Let the browser handle `target=_blank`, etc.\n\t\t\t\t\t\t(!e.currentTarget.target || e.currentTarget.target === \"_self\") &&\n\t\t\t\t\t\t// No modifier keys\n\t\t\t\t\t\t!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey\n\t\t\t\t\t) {\n\t\t\t\t\t\te.preventDefault()\n\t\t\t\t\t\te.redraw = false\n\t\t\t\t\t\troute.set(href, null, options)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn child\n\t\t},\n\t}\n\troute.param = function(key) {\n\t\treturn attrs && key != null ? attrs[key] : attrs\n\t}\n\n\treturn route\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/api/router.js?");

/***/ }),

/***/ "./node_modules/mithril/hyperscript.js":
/*!*********************************************!*\
  !*** ./node_modules/mithril/hyperscript.js ***!
  \*********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar hyperscript = __webpack_require__(/*! ./render/hyperscript */ \"./node_modules/mithril/render/hyperscript.js\")\n\nhyperscript.trust = __webpack_require__(/*! ./render/trust */ \"./node_modules/mithril/render/trust.js\")\nhyperscript.fragment = __webpack_require__(/*! ./render/fragment */ \"./node_modules/mithril/render/fragment.js\")\n\nmodule.exports = hyperscript\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/hyperscript.js?");

/***/ }),

/***/ "./node_modules/mithril/index.js":
/*!***************************************!*\
  !*** ./node_modules/mithril/index.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar hyperscript = __webpack_require__(/*! ./hyperscript */ \"./node_modules/mithril/hyperscript.js\")\nvar request = __webpack_require__(/*! ./request */ \"./node_modules/mithril/request.js\")\nvar mountRedraw = __webpack_require__(/*! ./mount-redraw */ \"./node_modules/mithril/mount-redraw.js\")\n\nvar m = function m() { return hyperscript.apply(this, arguments) }\nm.m = hyperscript\nm.trust = hyperscript.trust\nm.fragment = hyperscript.fragment\nm.mount = mountRedraw.mount\nm.route = __webpack_require__(/*! ./route */ \"./node_modules/mithril/route.js\")\nm.render = __webpack_require__(/*! ./render */ \"./node_modules/mithril/render.js\")\nm.redraw = mountRedraw.redraw\nm.request = request.request\nm.jsonp = request.jsonp\nm.parseQueryString = __webpack_require__(/*! ./querystring/parse */ \"./node_modules/mithril/querystring/parse.js\")\nm.buildQueryString = __webpack_require__(/*! ./querystring/build */ \"./node_modules/mithril/querystring/build.js\")\nm.parsePathname = __webpack_require__(/*! ./pathname/parse */ \"./node_modules/mithril/pathname/parse.js\")\nm.buildPathname = __webpack_require__(/*! ./pathname/build */ \"./node_modules/mithril/pathname/build.js\")\nm.vnode = __webpack_require__(/*! ./render/vnode */ \"./node_modules/mithril/render/vnode.js\")\nm.PromisePolyfill = __webpack_require__(/*! ./promise/polyfill */ \"./node_modules/mithril/promise/polyfill.js\")\n\nmodule.exports = m\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/index.js?");

/***/ }),

/***/ "./node_modules/mithril/mount-redraw.js":
/*!**********************************************!*\
  !*** ./node_modules/mithril/mount-redraw.js ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar render = __webpack_require__(/*! ./render */ \"./node_modules/mithril/render.js\")\n\nmodule.exports = __webpack_require__(/*! ./api/mount-redraw */ \"./node_modules/mithril/api/mount-redraw.js\")(render, requestAnimationFrame, console)\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/mount-redraw.js?");

/***/ }),

/***/ "./node_modules/mithril/pathname/assign.js":
/*!*************************************************!*\
  !*** ./node_modules/mithril/pathname/assign.js ***!
  \*************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = Object.assign || function(target, source) {\n\tif(source) Object.keys(source).forEach(function(key) { target[key] = source[key] })\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/pathname/assign.js?");

/***/ }),

/***/ "./node_modules/mithril/pathname/build.js":
/*!************************************************!*\
  !*** ./node_modules/mithril/pathname/build.js ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar buildQueryString = __webpack_require__(/*! ../querystring/build */ \"./node_modules/mithril/querystring/build.js\")\nvar assign = __webpack_require__(/*! ./assign */ \"./node_modules/mithril/pathname/assign.js\")\n\n// Returns `path` from `template` + `params`\nmodule.exports = function(template, params) {\n\tif ((/:([^\\/\\.-]+)(\\.{3})?:/).test(template)) {\n\t\tthrow new SyntaxError(\"Template parameter names *must* be separated\")\n\t}\n\tif (params == null) return template\n\tvar queryIndex = template.indexOf(\"?\")\n\tvar hashIndex = template.indexOf(\"#\")\n\tvar queryEnd = hashIndex < 0 ? template.length : hashIndex\n\tvar pathEnd = queryIndex < 0 ? queryEnd : queryIndex\n\tvar path = template.slice(0, pathEnd)\n\tvar query = {}\n\n\tassign(query, params)\n\n\tvar resolved = path.replace(/:([^\\/\\.-]+)(\\.{3})?/g, function(m, key, variadic) {\n\t\tdelete query[key]\n\t\t// If no such parameter exists, don't interpolate it.\n\t\tif (params[key] == null) return m\n\t\t// Escape normal parameters, but not variadic ones.\n\t\treturn variadic ? params[key] : encodeURIComponent(String(params[key]))\n\t})\n\n\t// In case the template substitution adds new query/hash parameters.\n\tvar newQueryIndex = resolved.indexOf(\"?\")\n\tvar newHashIndex = resolved.indexOf(\"#\")\n\tvar newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex\n\tvar newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex\n\tvar result = resolved.slice(0, newPathEnd)\n\n\tif (queryIndex >= 0) result += template.slice(queryIndex, queryEnd)\n\tif (newQueryIndex >= 0) result += (queryIndex < 0 ? \"?\" : \"&\") + resolved.slice(newQueryIndex, newQueryEnd)\n\tvar querystring = buildQueryString(query)\n\tif (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? \"?\" : \"&\") + querystring\n\tif (hashIndex >= 0) result += template.slice(hashIndex)\n\tif (newHashIndex >= 0) result += (hashIndex < 0 ? \"\" : \"&\") + resolved.slice(newHashIndex)\n\treturn result\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/pathname/build.js?");

/***/ }),

/***/ "./node_modules/mithril/pathname/compileTemplate.js":
/*!**********************************************************!*\
  !*** ./node_modules/mithril/pathname/compileTemplate.js ***!
  \**********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar parsePathname = __webpack_require__(/*! ./parse */ \"./node_modules/mithril/pathname/parse.js\")\n\n// Compiles a template into a function that takes a resolved path (without query\n// strings) and returns an object containing the template parameters with their\n// parsed values. This expects the input of the compiled template to be the\n// output of `parsePathname`. Note that it does *not* remove query parameters\n// specified in the template.\nmodule.exports = function(template) {\n\tvar templateData = parsePathname(template)\n\tvar templateKeys = Object.keys(templateData.params)\n\tvar keys = []\n\tvar regexp = new RegExp(\"^\" + templateData.path.replace(\n\t\t// I escape literal text so people can use things like `:file.:ext` or\n\t\t// `:lang-:locale` in routes. This is all merged into one pass so I\n\t\t// don't also accidentally escape `-` and make it harder to detect it to\n\t\t// ban it from template parameters.\n\t\t/:([^\\/.-]+)(\\.{3}|\\.(?!\\.)|-)?|[\\\\^$*+.()|\\[\\]{}]/g,\n\t\tfunction(m, key, extra) {\n\t\t\tif (key == null) return \"\\\\\" + m\n\t\t\tkeys.push({k: key, r: extra === \"...\"})\n\t\t\tif (extra === \"...\") return \"(.*)\"\n\t\t\tif (extra === \".\") return \"([^/]+)\\\\.\"\n\t\t\treturn \"([^/]+)\" + (extra || \"\")\n\t\t}\n\t) + \"$\")\n\treturn function(data) {\n\t\t// First, check the params. Usually, there isn't any, and it's just\n\t\t// checking a static set.\n\t\tfor (var i = 0; i < templateKeys.length; i++) {\n\t\t\tif (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false\n\t\t}\n\t\t// If no interpolations exist, let's skip all the ceremony\n\t\tif (!keys.length) return regexp.test(data.path)\n\t\tvar values = regexp.exec(data.path)\n\t\tif (values == null) return false\n\t\tfor (var i = 0; i < keys.length; i++) {\n\t\t\tdata.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1])\n\t\t}\n\t\treturn true\n\t}\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/pathname/compileTemplate.js?");

/***/ }),

/***/ "./node_modules/mithril/pathname/parse.js":
/*!************************************************!*\
  !*** ./node_modules/mithril/pathname/parse.js ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar parseQueryString = __webpack_require__(/*! ../querystring/parse */ \"./node_modules/mithril/querystring/parse.js\")\n\n// Returns `{path, params}` from `url`\nmodule.exports = function(url) {\n\tvar queryIndex = url.indexOf(\"?\")\n\tvar hashIndex = url.indexOf(\"#\")\n\tvar queryEnd = hashIndex < 0 ? url.length : hashIndex\n\tvar pathEnd = queryIndex < 0 ? queryEnd : queryIndex\n\tvar path = url.slice(0, pathEnd).replace(/\\/{2,}/g, \"/\")\n\n\tif (!path) path = \"/\"\n\telse {\n\t\tif (path[0] !== \"/\") path = \"/\" + path\n\t\tif (path.length > 1 && path[path.length - 1] === \"/\") path = path.slice(0, -1)\n\t}\n\treturn {\n\t\tpath: path,\n\t\tparams: queryIndex < 0\n\t\t\t? {}\n\t\t\t: parseQueryString(url.slice(queryIndex + 1, queryEnd)),\n\t}\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/pathname/parse.js?");

/***/ }),

/***/ "./node_modules/mithril/promise/polyfill.js":
/*!**************************************************!*\
  !*** ./node_modules/mithril/promise/polyfill.js ***!
  \**************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("\n/** @constructor */\nvar PromisePolyfill = function(executor) {\n\tif (!(this instanceof PromisePolyfill)) throw new Error(\"Promise must be called with `new`\")\n\tif (typeof executor !== \"function\") throw new TypeError(\"executor must be a function\")\n\n\tvar self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)\n\tvar instance = self._instance = {resolvers: resolvers, rejectors: rejectors}\n\tvar callAsync = typeof setImmediate === \"function\" ? setImmediate : setTimeout\n\tfunction handler(list, shouldAbsorb) {\n\t\treturn function execute(value) {\n\t\t\tvar then\n\t\t\ttry {\n\t\t\t\tif (shouldAbsorb && value != null && (typeof value === \"object\" || typeof value === \"function\") && typeof (then = value.then) === \"function\") {\n\t\t\t\t\tif (value === self) throw new TypeError(\"Promise can't be resolved w/ itself\")\n\t\t\t\t\texecuteOnce(then.bind(value))\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tcallAsync(function() {\n\t\t\t\t\t\tif (!shouldAbsorb && list.length === 0) console.error(\"Possible unhandled promise rejection:\", value)\n\t\t\t\t\t\tfor (var i = 0; i < list.length; i++) list[i](value)\n\t\t\t\t\t\tresolvers.length = 0, rejectors.length = 0\n\t\t\t\t\t\tinstance.state = shouldAbsorb\n\t\t\t\t\t\tinstance.retry = function() {execute(value)}\n\t\t\t\t\t})\n\t\t\t\t}\n\t\t\t}\n\t\t\tcatch (e) {\n\t\t\t\trejectCurrent(e)\n\t\t\t}\n\t\t}\n\t}\n\tfunction executeOnce(then) {\n\t\tvar runs = 0\n\t\tfunction run(fn) {\n\t\t\treturn function(value) {\n\t\t\t\tif (runs++ > 0) return\n\t\t\t\tfn(value)\n\t\t\t}\n\t\t}\n\t\tvar onerror = run(rejectCurrent)\n\t\ttry {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}\n\t}\n\n\texecuteOnce(executor)\n}\nPromisePolyfill.prototype.then = function(onFulfilled, onRejection) {\n\tvar self = this, instance = self._instance\n\tfunction handle(callback, list, next, state) {\n\t\tlist.push(function(value) {\n\t\t\tif (typeof callback !== \"function\") next(value)\n\t\t\telse try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}\n\t\t})\n\t\tif (typeof instance.retry === \"function\" && state === instance.state) instance.retry()\n\t}\n\tvar resolveNext, rejectNext\n\tvar promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})\n\thandle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)\n\treturn promise\n}\nPromisePolyfill.prototype.catch = function(onRejection) {\n\treturn this.then(null, onRejection)\n}\nPromisePolyfill.prototype.finally = function(callback) {\n\treturn this.then(\n\t\tfunction(value) {\n\t\t\treturn PromisePolyfill.resolve(callback()).then(function() {\n\t\t\t\treturn value\n\t\t\t})\n\t\t},\n\t\tfunction(reason) {\n\t\t\treturn PromisePolyfill.resolve(callback()).then(function() {\n\t\t\t\treturn PromisePolyfill.reject(reason);\n\t\t\t})\n\t\t}\n\t)\n}\nPromisePolyfill.resolve = function(value) {\n\tif (value instanceof PromisePolyfill) return value\n\treturn new PromisePolyfill(function(resolve) {resolve(value)})\n}\nPromisePolyfill.reject = function(value) {\n\treturn new PromisePolyfill(function(resolve, reject) {reject(value)})\n}\nPromisePolyfill.all = function(list) {\n\treturn new PromisePolyfill(function(resolve, reject) {\n\t\tvar total = list.length, count = 0, values = []\n\t\tif (list.length === 0) resolve([])\n\t\telse for (var i = 0; i < list.length; i++) {\n\t\t\t(function(i) {\n\t\t\t\tfunction consume(value) {\n\t\t\t\t\tcount++\n\t\t\t\t\tvalues[i] = value\n\t\t\t\t\tif (count === total) resolve(values)\n\t\t\t\t}\n\t\t\t\tif (list[i] != null && (typeof list[i] === \"object\" || typeof list[i] === \"function\") && typeof list[i].then === \"function\") {\n\t\t\t\t\tlist[i].then(consume, reject)\n\t\t\t\t}\n\t\t\t\telse consume(list[i])\n\t\t\t})(i)\n\t\t}\n\t})\n}\nPromisePolyfill.race = function(list) {\n\treturn new PromisePolyfill(function(resolve, reject) {\n\t\tfor (var i = 0; i < list.length; i++) {\n\t\t\tlist[i].then(resolve, reject)\n\t\t}\n\t})\n}\n\nmodule.exports = PromisePolyfill\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/promise/polyfill.js?");

/***/ }),

/***/ "./node_modules/mithril/promise/promise.js":
/*!*************************************************!*\
  !*** ./node_modules/mithril/promise/promise.js ***!
  \*************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__, __webpack_require__.g, __webpack_require__.* */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar PromisePolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/mithril/promise/polyfill.js\")\n\nif (typeof window !== \"undefined\") {\n\tif (typeof window.Promise === \"undefined\") {\n\t\twindow.Promise = PromisePolyfill\n\t} else if (!window.Promise.prototype.finally) {\n\t\twindow.Promise.prototype.finally = PromisePolyfill.prototype.finally\n\t}\n\tmodule.exports = window.Promise\n} else if (typeof __webpack_require__.g !== \"undefined\") {\n\tif (typeof __webpack_require__.g.Promise === \"undefined\") {\n\t\t__webpack_require__.g.Promise = PromisePolyfill\n\t} else if (!__webpack_require__.g.Promise.prototype.finally) {\n\t\t__webpack_require__.g.Promise.prototype.finally = PromisePolyfill.prototype.finally\n\t}\n\tmodule.exports = __webpack_require__.g.Promise\n} else {\n\tmodule.exports = PromisePolyfill\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/promise/promise.js?");

/***/ }),

/***/ "./node_modules/mithril/querystring/build.js":
/*!***************************************************!*\
  !*** ./node_modules/mithril/querystring/build.js ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function(object) {\n\tif (Object.prototype.toString.call(object) !== \"[object Object]\") return \"\"\n\n\tvar args = []\n\tfor (var key in object) {\n\t\tdestructure(key, object[key])\n\t}\n\n\treturn args.join(\"&\")\n\n\tfunction destructure(key, value) {\n\t\tif (Array.isArray(value)) {\n\t\t\tfor (var i = 0; i < value.length; i++) {\n\t\t\t\tdestructure(key + \"[\" + i + \"]\", value[i])\n\t\t\t}\n\t\t}\n\t\telse if (Object.prototype.toString.call(value) === \"[object Object]\") {\n\t\t\tfor (var i in value) {\n\t\t\t\tdestructure(key + \"[\" + i + \"]\", value[i])\n\t\t\t}\n\t\t}\n\t\telse args.push(encodeURIComponent(key) + (value != null && value !== \"\" ? \"=\" + encodeURIComponent(value) : \"\"))\n\t}\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/querystring/build.js?");

/***/ }),

/***/ "./node_modules/mithril/querystring/parse.js":
/*!***************************************************!*\
  !*** ./node_modules/mithril/querystring/parse.js ***!
  \***************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function(string) {\n\tif (string === \"\" || string == null) return {}\n\tif (string.charAt(0) === \"?\") string = string.slice(1)\n\n\tvar entries = string.split(\"&\"), counters = {}, data = {}\n\tfor (var i = 0; i < entries.length; i++) {\n\t\tvar entry = entries[i].split(\"=\")\n\t\tvar key = decodeURIComponent(entry[0])\n\t\tvar value = entry.length === 2 ? decodeURIComponent(entry[1]) : \"\"\n\n\t\tif (value === \"true\") value = true\n\t\telse if (value === \"false\") value = false\n\n\t\tvar levels = key.split(/\\]\\[?|\\[/)\n\t\tvar cursor = data\n\t\tif (key.indexOf(\"[\") > -1) levels.pop()\n\t\tfor (var j = 0; j < levels.length; j++) {\n\t\t\tvar level = levels[j], nextLevel = levels[j + 1]\n\t\t\tvar isNumber = nextLevel == \"\" || !isNaN(parseInt(nextLevel, 10))\n\t\t\tif (level === \"\") {\n\t\t\t\tvar key = levels.slice(0, j).join()\n\t\t\t\tif (counters[key] == null) {\n\t\t\t\t\tcounters[key] = Array.isArray(cursor) ? cursor.length : 0\n\t\t\t\t}\n\t\t\t\tlevel = counters[key]++\n\t\t\t}\n\t\t\t// Disallow direct prototype pollution\n\t\t\telse if (level === \"__proto__\") break\n\t\t\tif (j === levels.length - 1) cursor[level] = value\n\t\t\telse {\n\t\t\t\t// Read own properties exclusively to disallow indirect\n\t\t\t\t// prototype pollution\n\t\t\t\tvar desc = Object.getOwnPropertyDescriptor(cursor, level)\n\t\t\t\tif (desc != null) desc = desc.value\n\t\t\t\tif (desc == null) cursor[level] = desc = isNumber ? [] : {}\n\t\t\t\tcursor = desc\n\t\t\t}\n\t\t}\n\t}\n\treturn data\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/querystring/parse.js?");

/***/ }),

/***/ "./node_modules/mithril/render.js":
/*!****************************************!*\
  !*** ./node_modules/mithril/render.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nmodule.exports = __webpack_require__(/*! ./render/render */ \"./node_modules/mithril/render/render.js\")(window)\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/render.js?");

/***/ }),

/***/ "./node_modules/mithril/render/fragment.js":
/*!*************************************************!*\
  !*** ./node_modules/mithril/render/fragment.js ***!
  \*************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Vnode = __webpack_require__(/*! ../render/vnode */ \"./node_modules/mithril/render/vnode.js\")\nvar hyperscriptVnode = __webpack_require__(/*! ./hyperscriptVnode */ \"./node_modules/mithril/render/hyperscriptVnode.js\")\n\nmodule.exports = function() {\n\tvar vnode = hyperscriptVnode.apply(0, arguments)\n\n\tvnode.tag = \"[\"\n\tvnode.children = Vnode.normalizeChildren(vnode.children)\n\treturn vnode\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/render/fragment.js?");

/***/ }),

/***/ "./node_modules/mithril/render/hyperscript.js":
/*!****************************************************!*\
  !*** ./node_modules/mithril/render/hyperscript.js ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Vnode = __webpack_require__(/*! ../render/vnode */ \"./node_modules/mithril/render/vnode.js\")\nvar hyperscriptVnode = __webpack_require__(/*! ./hyperscriptVnode */ \"./node_modules/mithril/render/hyperscriptVnode.js\")\n\nvar selectorParser = /(?:(^|#|\\.)([^#\\.\\[\\]]+))|(\\[(.+?)(?:\\s*=\\s*(\"|'|)((?:\\\\[\"'\\]]|.)*?)\\5)?\\])/g\nvar selectorCache = {}\nvar hasOwn = {}.hasOwnProperty\n\nfunction isEmpty(object) {\n\tfor (var key in object) if (hasOwn.call(object, key)) return false\n\treturn true\n}\n\nfunction compileSelector(selector) {\n\tvar match, tag = \"div\", classes = [], attrs = {}\n\twhile (match = selectorParser.exec(selector)) {\n\t\tvar type = match[1], value = match[2]\n\t\tif (type === \"\" && value !== \"\") tag = value\n\t\telse if (type === \"#\") attrs.id = value\n\t\telse if (type === \".\") classes.push(value)\n\t\telse if (match[3][0] === \"[\") {\n\t\t\tvar attrValue = match[6]\n\t\t\tif (attrValue) attrValue = attrValue.replace(/\\\\([\"'])/g, \"$1\").replace(/\\\\\\\\/g, \"\\\\\")\n\t\t\tif (match[4] === \"class\") classes.push(attrValue)\n\t\t\telse attrs[match[4]] = attrValue === \"\" ? attrValue : attrValue || true\n\t\t}\n\t}\n\tif (classes.length > 0) attrs.className = classes.join(\" \")\n\treturn selectorCache[selector] = {tag: tag, attrs: attrs}\n}\n\nfunction execSelector(state, vnode) {\n\tvar attrs = vnode.attrs\n\tvar children = Vnode.normalizeChildren(vnode.children)\n\tvar hasClass = hasOwn.call(attrs, \"class\")\n\tvar className = hasClass ? attrs.class : attrs.className\n\n\tvnode.tag = state.tag\n\tvnode.attrs = null\n\tvnode.children = undefined\n\n\tif (!isEmpty(state.attrs) && !isEmpty(attrs)) {\n\t\tvar newAttrs = {}\n\n\t\tfor (var key in attrs) {\n\t\t\tif (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key]\n\t\t}\n\n\t\tattrs = newAttrs\n\t}\n\n\tfor (var key in state.attrs) {\n\t\tif (hasOwn.call(state.attrs, key) && key !== \"className\" && !hasOwn.call(attrs, key)){\n\t\t\tattrs[key] = state.attrs[key]\n\t\t}\n\t}\n\tif (className != null || state.attrs.className != null) attrs.className =\n\t\tclassName != null\n\t\t\t? state.attrs.className != null\n\t\t\t\t? String(state.attrs.className) + \" \" + String(className)\n\t\t\t\t: className\n\t\t\t: state.attrs.className != null\n\t\t\t\t? state.attrs.className\n\t\t\t\t: null\n\n\tif (hasClass) attrs.class = null\n\n\tfor (var key in attrs) {\n\t\tif (hasOwn.call(attrs, key) && key !== \"key\") {\n\t\t\tvnode.attrs = attrs\n\t\t\tbreak\n\t\t}\n\t}\n\n\tif (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === \"#\") {\n\t\tvnode.text = children[0].children\n\t} else {\n\t\tvnode.children = children\n\t}\n\n\treturn vnode\n}\n\nfunction hyperscript(selector) {\n\tif (selector == null || typeof selector !== \"string\" && typeof selector !== \"function\" && typeof selector.view !== \"function\") {\n\t\tthrow Error(\"The selector must be either a string or a component.\");\n\t}\n\n\tvar vnode = hyperscriptVnode.apply(1, arguments)\n\n\tif (typeof selector === \"string\") {\n\t\tvnode.children = Vnode.normalizeChildren(vnode.children)\n\t\tif (selector !== \"[\") return execSelector(selectorCache[selector] || compileSelector(selector), vnode)\n\t}\n\n\tvnode.tag = selector\n\treturn vnode\n}\n\nmodule.exports = hyperscript\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/render/hyperscript.js?");

/***/ }),

/***/ "./node_modules/mithril/render/hyperscriptVnode.js":
/*!*********************************************************!*\
  !*** ./node_modules/mithril/render/hyperscriptVnode.js ***!
  \*********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Vnode = __webpack_require__(/*! ../render/vnode */ \"./node_modules/mithril/render/vnode.js\")\n\n// Call via `hyperscriptVnode.apply(startOffset, arguments)`\n//\n// The reason I do it this way, forwarding the arguments and passing the start\n// offset in `this`, is so I don't have to create a temporary array in a\n// performance-critical path.\n//\n// In native ES6, I'd instead add a final `...args` parameter to the\n// `hyperscript` and `fragment` factories and define this as\n// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But\n// ES5 (what Mithril requires thanks to IE support) doesn't give me that luxury,\n// and engines aren't nearly intelligent enough to do either of these:\n//\n// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to\n//    another function only to be indexed.\n// 2. Elide an `arguments` allocation when it's passed to any function other\n//    than `Function.prototype.apply` or `Reflect.apply`.\n//\n// In ES6, it'd probably look closer to this (I'd need to profile it, though):\n// module.exports = function(attrs, ...children) {\n//     if (attrs == null || typeof attrs === \"object\" && attrs.tag == null && !Array.isArray(attrs)) {\n//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]\n//     } else {\n//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]\n//         attrs = undefined\n//     }\n//\n//     if (attrs == null) attrs = {}\n//     return Vnode(\"\", attrs.key, attrs, children)\n// }\nmodule.exports = function() {\n\tvar attrs = arguments[this], start = this + 1, children\n\n\tif (attrs == null) {\n\t\tattrs = {}\n\t} else if (typeof attrs !== \"object\" || attrs.tag != null || Array.isArray(attrs)) {\n\t\tattrs = {}\n\t\tstart = this\n\t}\n\n\tif (arguments.length === start + 1) {\n\t\tchildren = arguments[start]\n\t\tif (!Array.isArray(children)) children = [children]\n\t} else {\n\t\tchildren = []\n\t\twhile (start < arguments.length) children.push(arguments[start++])\n\t}\n\n\treturn Vnode(\"\", attrs.key, attrs, children)\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/render/hyperscriptVnode.js?");

/***/ }),

/***/ "./node_modules/mithril/render/render.js":
/*!***********************************************!*\
  !*** ./node_modules/mithril/render/render.js ***!
  \***********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Vnode = __webpack_require__(/*! ../render/vnode */ \"./node_modules/mithril/render/vnode.js\")\n\nmodule.exports = function($window) {\n\tvar $doc = $window && $window.document\n\tvar currentRedraw\n\n\tvar nameSpace = {\n\t\tsvg: \"http://www.w3.org/2000/svg\",\n\t\tmath: \"http://www.w3.org/1998/Math/MathML\"\n\t}\n\n\tfunction getNameSpace(vnode) {\n\t\treturn vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]\n\t}\n\n\t//sanity check to discourage people from doing `vnode.state = ...`\n\tfunction checkState(vnode, original) {\n\t\tif (vnode.state !== original) throw new Error(\"`vnode.state` must not be modified\")\n\t}\n\n\t//Note: the hook is passed as the `this` argument to allow proxying the\n\t//arguments without requiring a full array allocation to do so. It also\n\t//takes advantage of the fact the current `vnode` is the first argument in\n\t//all lifecycle methods.\n\tfunction callHook(vnode) {\n\t\tvar original = vnode.state\n\t\ttry {\n\t\t\treturn this.apply(original, arguments)\n\t\t} finally {\n\t\t\tcheckState(vnode, original)\n\t\t}\n\t}\n\n\t// IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when\n\t// inside an iframe. Catch and swallow this error, and heavy-handidly return null.\n\tfunction activeElement() {\n\t\ttry {\n\t\t\treturn $doc.activeElement\n\t\t} catch (e) {\n\t\t\treturn null\n\t\t}\n\t}\n\t//create\n\tfunction createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {\n\t\tfor (var i = start; i < end; i++) {\n\t\t\tvar vnode = vnodes[i]\n\t\t\tif (vnode != null) {\n\t\t\t\tcreateNode(parent, vnode, hooks, ns, nextSibling)\n\t\t\t}\n\t\t}\n\t}\n\tfunction createNode(parent, vnode, hooks, ns, nextSibling) {\n\t\tvar tag = vnode.tag\n\t\tif (typeof tag === \"string\") {\n\t\t\tvnode.state = {}\n\t\t\tif (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)\n\t\t\tswitch (tag) {\n\t\t\t\tcase \"#\": createText(parent, vnode, nextSibling); break\n\t\t\t\tcase \"<\": createHTML(parent, vnode, ns, nextSibling); break\n\t\t\t\tcase \"[\": createFragment(parent, vnode, hooks, ns, nextSibling); break\n\t\t\t\tdefault: createElement(parent, vnode, hooks, ns, nextSibling)\n\t\t\t}\n\t\t}\n\t\telse createComponent(parent, vnode, hooks, ns, nextSibling)\n\t}\n\tfunction createText(parent, vnode, nextSibling) {\n\t\tvnode.dom = $doc.createTextNode(vnode.children)\n\t\tinsertNode(parent, vnode.dom, nextSibling)\n\t}\n\tvar possibleParents = {caption: \"table\", thead: \"table\", tbody: \"table\", tfoot: \"table\", tr: \"tbody\", th: \"tr\", td: \"tr\", colgroup: \"table\", col: \"colgroup\"}\n\tfunction createHTML(parent, vnode, ns, nextSibling) {\n\t\tvar match = vnode.children.match(/^\\s*?<(\\w+)/im) || []\n\t\t// not using the proper parent makes the child element(s) vanish.\n\t\t//     var div = document.createElement(\"div\")\n\t\t//     div.innerHTML = \"<td>i</td><td>j</td>\"\n\t\t//     console.log(div.innerHTML)\n\t\t// --> \"ij\", no <td> in sight.\n\t\tvar temp = $doc.createElement(possibleParents[match[1]] || \"div\")\n\t\tif (ns === \"http://www.w3.org/2000/svg\") {\n\t\t\ttemp.innerHTML = \"<svg xmlns=\\\"http://www.w3.org/2000/svg\\\">\" + vnode.children + \"</svg>\"\n\t\t\ttemp = temp.firstChild\n\t\t} else {\n\t\t\ttemp.innerHTML = vnode.children\n\t\t}\n\t\tvnode.dom = temp.firstChild\n\t\tvnode.domSize = temp.childNodes.length\n\t\t// Capture nodes to remove, so we don't confuse them.\n\t\tvnode.instance = []\n\t\tvar fragment = $doc.createDocumentFragment()\n\t\tvar child\n\t\twhile (child = temp.firstChild) {\n\t\t\tvnode.instance.push(child)\n\t\t\tfragment.appendChild(child)\n\t\t}\n\t\tinsertNode(parent, fragment, nextSibling)\n\t}\n\tfunction createFragment(parent, vnode, hooks, ns, nextSibling) {\n\t\tvar fragment = $doc.createDocumentFragment()\n\t\tif (vnode.children != null) {\n\t\t\tvar children = vnode.children\n\t\t\tcreateNodes(fragment, children, 0, children.length, hooks, null, ns)\n\t\t}\n\t\tvnode.dom = fragment.firstChild\n\t\tvnode.domSize = fragment.childNodes.length\n\t\tinsertNode(parent, fragment, nextSibling)\n\t}\n\tfunction createElement(parent, vnode, hooks, ns, nextSibling) {\n\t\tvar tag = vnode.tag\n\t\tvar attrs = vnode.attrs\n\t\tvar is = attrs && attrs.is\n\n\t\tns = getNameSpace(vnode) || ns\n\n\t\tvar element = ns ?\n\t\t\tis ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :\n\t\t\tis ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)\n\t\tvnode.dom = element\n\n\t\tif (attrs != null) {\n\t\t\tsetAttrs(vnode, attrs, ns)\n\t\t}\n\n\t\tinsertNode(parent, element, nextSibling)\n\n\t\tif (!maybeSetContentEditable(vnode)) {\n\t\t\tif (vnode.text != null) {\n\t\t\t\tif (vnode.text !== \"\") element.textContent = vnode.text\n\t\t\t\telse vnode.children = [Vnode(\"#\", undefined, undefined, vnode.text, undefined, undefined)]\n\t\t\t}\n\t\t\tif (vnode.children != null) {\n\t\t\t\tvar children = vnode.children\n\t\t\t\tcreateNodes(element, children, 0, children.length, hooks, null, ns)\n\t\t\t\tif (vnode.tag === \"select\" && attrs != null) setLateSelectAttrs(vnode, attrs)\n\t\t\t}\n\t\t}\n\t}\n\tfunction initComponent(vnode, hooks) {\n\t\tvar sentinel\n\t\tif (typeof vnode.tag.view === \"function\") {\n\t\t\tvnode.state = Object.create(vnode.tag)\n\t\t\tsentinel = vnode.state.view\n\t\t\tif (sentinel.$$reentrantLock$$ != null) return\n\t\t\tsentinel.$$reentrantLock$$ = true\n\t\t} else {\n\t\t\tvnode.state = void 0\n\t\t\tsentinel = vnode.tag\n\t\t\tif (sentinel.$$reentrantLock$$ != null) return\n\t\t\tsentinel.$$reentrantLock$$ = true\n\t\t\tvnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === \"function\") ? new vnode.tag(vnode) : vnode.tag(vnode)\n\t\t}\n\t\tinitLifecycle(vnode.state, vnode, hooks)\n\t\tif (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)\n\t\tvnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))\n\t\tif (vnode.instance === vnode) throw Error(\"A view cannot return the vnode it received as argument\")\n\t\tsentinel.$$reentrantLock$$ = null\n\t}\n\tfunction createComponent(parent, vnode, hooks, ns, nextSibling) {\n\t\tinitComponent(vnode, hooks)\n\t\tif (vnode.instance != null) {\n\t\t\tcreateNode(parent, vnode.instance, hooks, ns, nextSibling)\n\t\t\tvnode.dom = vnode.instance.dom\n\t\t\tvnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0\n\t\t}\n\t\telse {\n\t\t\tvnode.domSize = 0\n\t\t}\n\t}\n\n\t//update\n\t/**\n\t * @param {Element|Fragment} parent - the parent element\n\t * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for\n\t *                               this part of the tree\n\t * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.\n\t * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)\n\t * @param {Element | null} nextSibling - the next DOM node if we're dealing with a\n\t *                                       fragment that is not the last item in its\n\t *                                       parent\n\t * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any\n\t * @returns void\n\t */\n\t// This function diffs and patches lists of vnodes, both keyed and unkeyed.\n\t//\n\t// We will:\n\t//\n\t// 1. describe its general structure\n\t// 2. focus on the diff algorithm optimizations\n\t// 3. discuss DOM node operations.\n\n\t// ## Overview:\n\t//\n\t// The updateNodes() function:\n\t// - deals with trivial cases\n\t// - determines whether the lists are keyed or unkeyed based on the first non-null node\n\t//   of each list.\n\t// - diffs them and patches the DOM if needed (that's the brunt of the code)\n\t// - manages the leftovers: after diffing, are there:\n\t//   - old nodes left to remove?\n\t// \t - new nodes to insert?\n\t// \t deal with them!\n\t//\n\t// The lists are only iterated over once, with an exception for the nodes in `old` that\n\t// are visited in the fourth part of the diff and in the `removeNodes` loop.\n\n\t// ## Diffing\n\t//\n\t// Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837\n\t// may be good for context on longest increasing subsequence-based logic for moving nodes.\n\t//\n\t// In order to diff keyed lists, one has to\n\t//\n\t// 1) match nodes in both lists, per key, and update them accordingly\n\t// 2) create the nodes present in the new list, but absent in the old one\n\t// 3) remove the nodes present in the old list, but absent in the new one\n\t// 4) figure out what nodes in 1) to move in order to minimize the DOM operations.\n\t//\n\t// To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate\n\t// over the new list and for each new vnode, find the corresponding vnode in the old list using\n\t// the map.\n\t// 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new\n\t// and must be created.\n\t// For the removals, we actually remove the nodes that have been updated from the old list.\n\t// The nodes that remain in that list after 1) and 2) have been performed can be safely removed.\n\t// The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)\n\t// algorithm.\n\t//\n\t// the longest increasing subsequence is the list of nodes that can remain in place. Imagine going\n\t// from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices\n\t// corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would\n\t//  match the above lists, for example).\n\t//\n\t// In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We\n\t// can update those nodes without moving them, and only call `insertNode` on `4` and `5`.\n\t//\n\t// @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually\n\t// the longest increasing subsequence *of old nodes still present in the new list*).\n\t//\n\t// It is a general algorithm that is fireproof in all circumstances, but it requires the allocation\n\t// and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,\n\t// the `LIS` and a temporary one to create the LIS).\n\t//\n\t// So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of\n\t// the LIS and can be updated without moving them.\n\t//\n\t// If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with\n\t// the exception of the last node if the list is fully reversed).\n\t//\n\t// ## Finding the next sibling.\n\t//\n\t// `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.\n\t// When the list is being traversed top-down, at any index, the DOM nodes up to the previous\n\t// vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old\n\t// list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.\n\t//\n\t// In the other scenarios (swaps, upwards traversal, map-based diff),\n\t// the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the\n\t// bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node\n\t// as the next sibling (cached in the `nextSibling` variable).\n\n\n\t// ## DOM node moves\n\t//\n\t// In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,\n\t// this is not the case if the node moved (second and fourth part of the diff algo). We move\n\t// the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`\n\t// variable rather than fetching it using `getNextSibling()`.\n\t//\n\t// The fourth part of the diff currently inserts nodes unconditionally, leading to issues\n\t// like #1791 and #1999. We need to be smarter about those situations where adjascent old\n\t// nodes remain together in the new list in a way that isn't covered by parts one and\n\t// three of the diff algo.\n\n\tfunction updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {\n\t\tif (old === vnodes || old == null && vnodes == null) return\n\t\telse if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)\n\t\telse if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length)\n\t\telse {\n\t\t\tvar isOldKeyed = old[0] != null && old[0].key != null\n\t\t\tvar isKeyed = vnodes[0] != null && vnodes[0].key != null\n\t\t\tvar start = 0, oldStart = 0\n\t\t\tif (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) oldStart++\n\t\t\tif (!isKeyed) while (start < vnodes.length && vnodes[start] == null) start++\n\t\t\tif (isKeyed === null && isOldKeyed == null) return // both lists are full of nulls\n\t\t\tif (isOldKeyed !== isKeyed) {\n\t\t\t\tremoveNodes(parent, old, oldStart, old.length)\n\t\t\t\tcreateNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)\n\t\t\t} else if (!isKeyed) {\n\t\t\t\t// Don't index past the end of either list (causes deopts).\n\t\t\t\tvar commonLength = old.length < vnodes.length ? old.length : vnodes.length\n\t\t\t\t// Rewind if necessary to the first non-null index on either side.\n\t\t\t\t// We could alternatively either explicitly create or remove nodes when `start !== oldStart`\n\t\t\t\t// but that would be optimizing for sparse lists which are more rare than dense ones.\n\t\t\t\tstart = start < oldStart ? start : oldStart\n\t\t\t\tfor (; start < commonLength; start++) {\n\t\t\t\t\to = old[start]\n\t\t\t\t\tv = vnodes[start]\n\t\t\t\t\tif (o === v || o == null && v == null) continue\n\t\t\t\t\telse if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling))\n\t\t\t\t\telse if (v == null) removeNode(parent, o)\n\t\t\t\t\telse updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns)\n\t\t\t\t}\n\t\t\t\tif (old.length > commonLength) removeNodes(parent, old, start, old.length)\n\t\t\t\tif (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)\n\t\t\t} else {\n\t\t\t\t// keyed diff\n\t\t\t\tvar oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling\n\n\t\t\t\t// bottom-up\n\t\t\t\twhile (oldEnd >= oldStart && end >= start) {\n\t\t\t\t\toe = old[oldEnd]\n\t\t\t\t\tve = vnodes[end]\n\t\t\t\t\tif (oe.key !== ve.key) break\n\t\t\t\t\tif (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)\n\t\t\t\t\tif (ve.dom != null) nextSibling = ve.dom\n\t\t\t\t\toldEnd--, end--\n\t\t\t\t}\n\t\t\t\t// top-down\n\t\t\t\twhile (oldEnd >= oldStart && end >= start) {\n\t\t\t\t\to = old[oldStart]\n\t\t\t\t\tv = vnodes[start]\n\t\t\t\t\tif (o.key !== v.key) break\n\t\t\t\t\toldStart++, start++\n\t\t\t\t\tif (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns)\n\t\t\t\t}\n\t\t\t\t// swaps and list reversals\n\t\t\t\twhile (oldEnd >= oldStart && end >= start) {\n\t\t\t\t\tif (start === end) break\n\t\t\t\t\tif (o.key !== ve.key || oe.key !== v.key) break\n\t\t\t\t\ttopSibling = getNextSibling(old, oldStart, nextSibling)\n\t\t\t\t\tmoveNodes(parent, oe, topSibling)\n\t\t\t\t\tif (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns)\n\t\t\t\t\tif (++start <= --end) moveNodes(parent, o, nextSibling)\n\t\t\t\t\tif (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns)\n\t\t\t\t\tif (ve.dom != null) nextSibling = ve.dom\n\t\t\t\t\toldStart++; oldEnd--\n\t\t\t\t\toe = old[oldEnd]\n\t\t\t\t\tve = vnodes[end]\n\t\t\t\t\to = old[oldStart]\n\t\t\t\t\tv = vnodes[start]\n\t\t\t\t}\n\t\t\t\t// bottom up once again\n\t\t\t\twhile (oldEnd >= oldStart && end >= start) {\n\t\t\t\t\tif (oe.key !== ve.key) break\n\t\t\t\t\tif (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)\n\t\t\t\t\tif (ve.dom != null) nextSibling = ve.dom\n\t\t\t\t\toldEnd--, end--\n\t\t\t\t\toe = old[oldEnd]\n\t\t\t\t\tve = vnodes[end]\n\t\t\t\t}\n\t\t\t\tif (start > end) removeNodes(parent, old, oldStart, oldEnd + 1)\n\t\t\t\telse if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)\n\t\t\t\telse {\n\t\t\t\t\t// inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul\n\t\t\t\t\tvar originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li=0, i=0, pos = 2147483647, matched = 0, map, lisIndices\n\t\t\t\t\tfor (i = 0; i < vnodesLength; i++) oldIndices[i] = -1\n\t\t\t\t\tfor (i = end; i >= start; i--) {\n\t\t\t\t\t\tif (map == null) map = getKeyMap(old, oldStart, oldEnd + 1)\n\t\t\t\t\t\tve = vnodes[i]\n\t\t\t\t\t\tvar oldIndex = map[ve.key]\n\t\t\t\t\t\tif (oldIndex != null) {\n\t\t\t\t\t\t\tpos = (oldIndex < pos) ? oldIndex : -1 // becomes -1 if nodes were re-ordered\n\t\t\t\t\t\t\toldIndices[i-start] = oldIndex\n\t\t\t\t\t\t\toe = old[oldIndex]\n\t\t\t\t\t\t\told[oldIndex] = null\n\t\t\t\t\t\t\tif (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)\n\t\t\t\t\t\t\tif (ve.dom != null) nextSibling = ve.dom\n\t\t\t\t\t\t\tmatched++\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tnextSibling = originalNextSibling\n\t\t\t\t\tif (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1)\n\t\t\t\t\tif (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)\n\t\t\t\t\telse {\n\t\t\t\t\t\tif (pos === -1) {\n\t\t\t\t\t\t\t// the indices of the indices of the items that are part of the\n\t\t\t\t\t\t\t// longest increasing subsequence in the oldIndices list\n\t\t\t\t\t\t\tlisIndices = makeLisIndices(oldIndices)\n\t\t\t\t\t\t\tli = lisIndices.length - 1\n\t\t\t\t\t\t\tfor (i = end; i >= start; i--) {\n\t\t\t\t\t\t\t\tv = vnodes[i]\n\t\t\t\t\t\t\t\tif (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)\n\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\tif (lisIndices[li] === i - start) li--\n\t\t\t\t\t\t\t\t\telse moveNodes(parent, v, nextSibling)\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif (v.dom != null) nextSibling = vnodes[i].dom\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tfor (i = end; i >= start; i--) {\n\t\t\t\t\t\t\t\tv = vnodes[i]\n\t\t\t\t\t\t\t\tif (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)\n\t\t\t\t\t\t\t\tif (v.dom != null) nextSibling = vnodes[i].dom\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\tfunction updateNode(parent, old, vnode, hooks, nextSibling, ns) {\n\t\tvar oldTag = old.tag, tag = vnode.tag\n\t\tif (oldTag === tag) {\n\t\t\tvnode.state = old.state\n\t\t\tvnode.events = old.events\n\t\t\tif (shouldNotUpdate(vnode, old)) return\n\t\t\tif (typeof oldTag === \"string\") {\n\t\t\t\tif (vnode.attrs != null) {\n\t\t\t\t\tupdateLifecycle(vnode.attrs, vnode, hooks)\n\t\t\t\t}\n\t\t\t\tswitch (oldTag) {\n\t\t\t\t\tcase \"#\": updateText(old, vnode); break\n\t\t\t\t\tcase \"<\": updateHTML(parent, old, vnode, ns, nextSibling); break\n\t\t\t\t\tcase \"[\": updateFragment(parent, old, vnode, hooks, nextSibling, ns); break\n\t\t\t\t\tdefault: updateElement(old, vnode, hooks, ns)\n\t\t\t\t}\n\t\t\t}\n\t\t\telse updateComponent(parent, old, vnode, hooks, nextSibling, ns)\n\t\t}\n\t\telse {\n\t\t\tremoveNode(parent, old)\n\t\t\tcreateNode(parent, vnode, hooks, ns, nextSibling)\n\t\t}\n\t}\n\tfunction updateText(old, vnode) {\n\t\tif (old.children.toString() !== vnode.children.toString()) {\n\t\t\told.dom.nodeValue = vnode.children\n\t\t}\n\t\tvnode.dom = old.dom\n\t}\n\tfunction updateHTML(parent, old, vnode, ns, nextSibling) {\n\t\tif (old.children !== vnode.children) {\n\t\t\tremoveHTML(parent, old)\n\t\t\tcreateHTML(parent, vnode, ns, nextSibling)\n\t\t}\n\t\telse {\n\t\t\tvnode.dom = old.dom\n\t\t\tvnode.domSize = old.domSize\n\t\t\tvnode.instance = old.instance\n\t\t}\n\t}\n\tfunction updateFragment(parent, old, vnode, hooks, nextSibling, ns) {\n\t\tupdateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns)\n\t\tvar domSize = 0, children = vnode.children\n\t\tvnode.dom = null\n\t\tif (children != null) {\n\t\t\tfor (var i = 0; i < children.length; i++) {\n\t\t\t\tvar child = children[i]\n\t\t\t\tif (child != null && child.dom != null) {\n\t\t\t\t\tif (vnode.dom == null) vnode.dom = child.dom\n\t\t\t\t\tdomSize += child.domSize || 1\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (domSize !== 1) vnode.domSize = domSize\n\t\t}\n\t}\n\tfunction updateElement(old, vnode, hooks, ns) {\n\t\tvar element = vnode.dom = old.dom\n\t\tns = getNameSpace(vnode) || ns\n\n\t\tif (vnode.tag === \"textarea\") {\n\t\t\tif (vnode.attrs == null) vnode.attrs = {}\n\t\t\tif (vnode.text != null) {\n\t\t\t\tvnode.attrs.value = vnode.text //FIXME handle multiple children\n\t\t\t\tvnode.text = undefined\n\t\t\t}\n\t\t}\n\t\tupdateAttrs(vnode, old.attrs, vnode.attrs, ns)\n\t\tif (!maybeSetContentEditable(vnode)) {\n\t\t\tif (old.text != null && vnode.text != null && vnode.text !== \"\") {\n\t\t\t\tif (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text\n\t\t\t}\n\t\t\telse {\n\t\t\t\tif (old.text != null) old.children = [Vnode(\"#\", undefined, undefined, old.text, undefined, old.dom.firstChild)]\n\t\t\t\tif (vnode.text != null) vnode.children = [Vnode(\"#\", undefined, undefined, vnode.text, undefined, undefined)]\n\t\t\t\tupdateNodes(element, old.children, vnode.children, hooks, null, ns)\n\t\t\t}\n\t\t}\n\t}\n\tfunction updateComponent(parent, old, vnode, hooks, nextSibling, ns) {\n\t\tvnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))\n\t\tif (vnode.instance === vnode) throw Error(\"A view cannot return the vnode it received as argument\")\n\t\tupdateLifecycle(vnode.state, vnode, hooks)\n\t\tif (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)\n\t\tif (vnode.instance != null) {\n\t\t\tif (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)\n\t\t\telse updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns)\n\t\t\tvnode.dom = vnode.instance.dom\n\t\t\tvnode.domSize = vnode.instance.domSize\n\t\t}\n\t\telse if (old.instance != null) {\n\t\t\tremoveNode(parent, old.instance)\n\t\t\tvnode.dom = undefined\n\t\t\tvnode.domSize = 0\n\t\t}\n\t\telse {\n\t\t\tvnode.dom = old.dom\n\t\t\tvnode.domSize = old.domSize\n\t\t}\n\t}\n\tfunction getKeyMap(vnodes, start, end) {\n\t\tvar map = Object.create(null)\n\t\tfor (; start < end; start++) {\n\t\t\tvar vnode = vnodes[start]\n\t\t\tif (vnode != null) {\n\t\t\t\tvar key = vnode.key\n\t\t\t\tif (key != null) map[key] = start\n\t\t\t}\n\t\t}\n\t\treturn map\n\t}\n\t// Lifted from ivi https://github.com/ivijs/ivi/\n\t// takes a list of unique numbers (-1 is special and can\n\t// occur multiple times) and returns an array with the indices\n\t// of the items that are part of the longest increasing\n\t// subsequece\n\tvar lisTemp = []\n\tfunction makeLisIndices(a) {\n\t\tvar result = [0]\n\t\tvar u = 0, v = 0, i = 0\n\t\tvar il = lisTemp.length = a.length\n\t\tfor (var i = 0; i < il; i++) lisTemp[i] = a[i]\n\t\tfor (var i = 0; i < il; ++i) {\n\t\t\tif (a[i] === -1) continue\n\t\t\tvar j = result[result.length - 1]\n\t\t\tif (a[j] < a[i]) {\n\t\t\t\tlisTemp[i] = j\n\t\t\t\tresult.push(i)\n\t\t\t\tcontinue\n\t\t\t}\n\t\t\tu = 0\n\t\t\tv = result.length - 1\n\t\t\twhile (u < v) {\n\t\t\t\t// Fast integer average without overflow.\n\t\t\t\t// eslint-disable-next-line no-bitwise\n\t\t\t\tvar c = (u >>> 1) + (v >>> 1) + (u & v & 1)\n\t\t\t\tif (a[result[c]] < a[i]) {\n\t\t\t\t\tu = c + 1\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tv = c\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (a[i] < a[result[u]]) {\n\t\t\t\tif (u > 0) lisTemp[i] = result[u - 1]\n\t\t\t\tresult[u] = i\n\t\t\t}\n\t\t}\n\t\tu = result.length\n\t\tv = result[u - 1]\n\t\twhile (u-- > 0) {\n\t\t\tresult[u] = v\n\t\t\tv = lisTemp[v]\n\t\t}\n\t\tlisTemp.length = 0\n\t\treturn result\n\t}\n\n\tfunction getNextSibling(vnodes, i, nextSibling) {\n\t\tfor (; i < vnodes.length; i++) {\n\t\t\tif (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom\n\t\t}\n\t\treturn nextSibling\n\t}\n\n\t// This covers a really specific edge case:\n\t// - Parent node is keyed and contains child\n\t// - Child is removed, returns unresolved promise in `onbeforeremove`\n\t// - Parent node is moved in keyed diff\n\t// - Remaining children still need moved appropriately\n\t//\n\t// Ideally, I'd track removed nodes as well, but that introduces a lot more\n\t// complexity and I'm not exactly interested in doing that.\n\tfunction moveNodes(parent, vnode, nextSibling) {\n\t\tvar frag = $doc.createDocumentFragment()\n\t\tmoveChildToFrag(parent, frag, vnode)\n\t\tinsertNode(parent, frag, nextSibling)\n\t}\n\tfunction moveChildToFrag(parent, frag, vnode) {\n\t\t// Dodge the recursion overhead in a few of the most common cases.\n\t\twhile (vnode.dom != null && vnode.dom.parentNode === parent) {\n\t\t\tif (typeof vnode.tag !== \"string\") {\n\t\t\t\tvnode = vnode.instance\n\t\t\t\tif (vnode != null) continue\n\t\t\t} else if (vnode.tag === \"<\") {\n\t\t\t\tfor (var i = 0; i < vnode.instance.length; i++) {\n\t\t\t\t\tfrag.appendChild(vnode.instance[i])\n\t\t\t\t}\n\t\t\t} else if (vnode.tag !== \"[\") {\n\t\t\t\t// Don't recurse for text nodes *or* elements, just fragments\n\t\t\t\tfrag.appendChild(vnode.dom)\n\t\t\t} else if (vnode.children.length === 1) {\n\t\t\t\tvnode = vnode.children[0]\n\t\t\t\tif (vnode != null) continue\n\t\t\t} else {\n\t\t\t\tfor (var i = 0; i < vnode.children.length; i++) {\n\t\t\t\t\tvar child = vnode.children[i]\n\t\t\t\t\tif (child != null) moveChildToFrag(parent, frag, child)\n\t\t\t\t}\n\t\t\t}\n\t\t\tbreak\n\t\t}\n\t}\n\n\tfunction insertNode(parent, dom, nextSibling) {\n\t\tif (nextSibling != null) parent.insertBefore(dom, nextSibling)\n\t\telse parent.appendChild(dom)\n\t}\n\n\tfunction maybeSetContentEditable(vnode) {\n\t\tif (vnode.attrs == null || (\n\t\t\tvnode.attrs.contenteditable == null && // attribute\n\t\t\tvnode.attrs.contentEditable == null // property\n\t\t)) return false\n\t\tvar children = vnode.children\n\t\tif (children != null && children.length === 1 && children[0].tag === \"<\") {\n\t\t\tvar content = children[0].children\n\t\t\tif (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content\n\t\t}\n\t\telse if (vnode.text != null || children != null && children.length !== 0) throw new Error(\"Child node of a contenteditable must be trusted\")\n\t\treturn true\n\t}\n\n\t//remove\n\tfunction removeNodes(parent, vnodes, start, end) {\n\t\tfor (var i = start; i < end; i++) {\n\t\t\tvar vnode = vnodes[i]\n\t\t\tif (vnode != null) removeNode(parent, vnode)\n\t\t}\n\t}\n\tfunction removeNode(parent, vnode) {\n\t\tvar mask = 0\n\t\tvar original = vnode.state\n\t\tvar stateResult, attrsResult\n\t\tif (typeof vnode.tag !== \"string\" && typeof vnode.state.onbeforeremove === \"function\") {\n\t\t\tvar result = callHook.call(vnode.state.onbeforeremove, vnode)\n\t\t\tif (result != null && typeof result.then === \"function\") {\n\t\t\t\tmask = 1\n\t\t\t\tstateResult = result\n\t\t\t}\n\t\t}\n\t\tif (vnode.attrs && typeof vnode.attrs.onbeforeremove === \"function\") {\n\t\t\tvar result = callHook.call(vnode.attrs.onbeforeremove, vnode)\n\t\t\tif (result != null && typeof result.then === \"function\") {\n\t\t\t\t// eslint-disable-next-line no-bitwise\n\t\t\t\tmask |= 2\n\t\t\t\tattrsResult = result\n\t\t\t}\n\t\t}\n\t\tcheckState(vnode, original)\n\n\t\t// If we can, try to fast-path it and avoid all the overhead of awaiting\n\t\tif (!mask) {\n\t\t\tonremove(vnode)\n\t\t\tremoveChild(parent, vnode)\n\t\t} else {\n\t\t\tif (stateResult != null) {\n\t\t\t\tvar next = function () {\n\t\t\t\t\t// eslint-disable-next-line no-bitwise\n\t\t\t\t\tif (mask & 1) { mask &= 2; if (!mask) reallyRemove() }\n\t\t\t\t}\n\t\t\t\tstateResult.then(next, next)\n\t\t\t}\n\t\t\tif (attrsResult != null) {\n\t\t\t\tvar next = function () {\n\t\t\t\t\t// eslint-disable-next-line no-bitwise\n\t\t\t\t\tif (mask & 2) { mask &= 1; if (!mask) reallyRemove() }\n\t\t\t\t}\n\t\t\t\tattrsResult.then(next, next)\n\t\t\t}\n\t\t}\n\n\t\tfunction reallyRemove() {\n\t\t\tcheckState(vnode, original)\n\t\t\tonremove(vnode)\n\t\t\tremoveChild(parent, vnode)\n\t\t}\n\t}\n\tfunction removeHTML(parent, vnode) {\n\t\tfor (var i = 0; i < vnode.instance.length; i++) {\n\t\t\tparent.removeChild(vnode.instance[i])\n\t\t}\n\t}\n\tfunction removeChild(parent, vnode) {\n\t\t// Dodge the recursion overhead in a few of the most common cases.\n\t\twhile (vnode.dom != null && vnode.dom.parentNode === parent) {\n\t\t\tif (typeof vnode.tag !== \"string\") {\n\t\t\t\tvnode = vnode.instance\n\t\t\t\tif (vnode != null) continue\n\t\t\t} else if (vnode.tag === \"<\") {\n\t\t\t\tremoveHTML(parent, vnode)\n\t\t\t} else {\n\t\t\t\tif (vnode.tag !== \"[\") {\n\t\t\t\t\tparent.removeChild(vnode.dom)\n\t\t\t\t\tif (!Array.isArray(vnode.children)) break\n\t\t\t\t}\n\t\t\t\tif (vnode.children.length === 1) {\n\t\t\t\t\tvnode = vnode.children[0]\n\t\t\t\t\tif (vnode != null) continue\n\t\t\t\t} else {\n\t\t\t\t\tfor (var i = 0; i < vnode.children.length; i++) {\n\t\t\t\t\t\tvar child = vnode.children[i]\n\t\t\t\t\t\tif (child != null) removeChild(parent, child)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tbreak\n\t\t}\n\t}\n\tfunction onremove(vnode) {\n\t\tif (typeof vnode.tag !== \"string\" && typeof vnode.state.onremove === \"function\") callHook.call(vnode.state.onremove, vnode)\n\t\tif (vnode.attrs && typeof vnode.attrs.onremove === \"function\") callHook.call(vnode.attrs.onremove, vnode)\n\t\tif (typeof vnode.tag !== \"string\") {\n\t\t\tif (vnode.instance != null) onremove(vnode.instance)\n\t\t} else {\n\t\t\tvar children = vnode.children\n\t\t\tif (Array.isArray(children)) {\n\t\t\t\tfor (var i = 0; i < children.length; i++) {\n\t\t\t\t\tvar child = children[i]\n\t\t\t\t\tif (child != null) onremove(child)\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t//attrs\n\tfunction setAttrs(vnode, attrs, ns) {\n\t\tfor (var key in attrs) {\n\t\t\tsetAttr(vnode, key, null, attrs[key], ns)\n\t\t}\n\t}\n\tfunction setAttr(vnode, key, old, value, ns) {\n\t\tif (key === \"key\" || key === \"is\" || value == null || isLifecycleMethod(key) || (old === value && !isFormAttribute(vnode, key)) && typeof value !== \"object\") return\n\t\tif (key[0] === \"o\" && key[1] === \"n\") return updateEvent(vnode, key, value)\n\t\tif (key.slice(0, 6) === \"xlink:\") vnode.dom.setAttributeNS(\"http://www.w3.org/1999/xlink\", key.slice(6), value)\n\t\telse if (key === \"style\") updateStyle(vnode.dom, old, value)\n\t\telse if (hasPropertyKey(vnode, key, ns)) {\n\t\t\tif (key === \"value\") {\n\t\t\t\t// Only do the coercion if we're actually going to check the value.\n\t\t\t\t/* eslint-disable no-implicit-coercion */\n\t\t\t\t//setting input[value] to same value by typing on focused element moves cursor to end in Chrome\n\t\t\t\tif ((vnode.tag === \"input\" || vnode.tag === \"textarea\") && vnode.dom.value === \"\" + value && vnode.dom === activeElement()) return\n\t\t\t\t//setting select[value] to same value while having select open blinks select dropdown in Chrome\n\t\t\t\tif (vnode.tag === \"select\" && old !== null && vnode.dom.value === \"\" + value) return\n\t\t\t\t//setting option[value] to same value while having select open blinks select dropdown in Chrome\n\t\t\t\tif (vnode.tag === \"option\" && old !== null && vnode.dom.value === \"\" + value) return\n\t\t\t\t/* eslint-enable no-implicit-coercion */\n\t\t\t}\n\t\t\t// If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.\n\t\t\tif (vnode.tag === \"input\" && key === \"type\") vnode.dom.setAttribute(key, value)\n\t\t\telse vnode.dom[key] = value\n\t\t} else {\n\t\t\tif (typeof value === \"boolean\") {\n\t\t\t\tif (value) vnode.dom.setAttribute(key, \"\")\n\t\t\t\telse vnode.dom.removeAttribute(key)\n\t\t\t}\n\t\t\telse vnode.dom.setAttribute(key === \"className\" ? \"class\" : key, value)\n\t\t}\n\t}\n\tfunction removeAttr(vnode, key, old, ns) {\n\t\tif (key === \"key\" || key === \"is\" || old == null || isLifecycleMethod(key)) return\n\t\tif (key[0] === \"o\" && key[1] === \"n\" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined)\n\t\telse if (key === \"style\") updateStyle(vnode.dom, old, null)\n\t\telse if (\n\t\t\thasPropertyKey(vnode, key, ns)\n\t\t\t&& key !== \"className\"\n\t\t\t&& !(key === \"value\" && (\n\t\t\t\tvnode.tag === \"option\"\n\t\t\t\t|| vnode.tag === \"select\" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement()\n\t\t\t))\n\t\t\t&& !(vnode.tag === \"input\" && key === \"type\")\n\t\t) {\n\t\t\tvnode.dom[key] = null\n\t\t} else {\n\t\t\tvar nsLastIndex = key.indexOf(\":\")\n\t\t\tif (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1)\n\t\t\tif (old !== false) vnode.dom.removeAttribute(key === \"className\" ? \"class\" : key)\n\t\t}\n\t}\n\tfunction setLateSelectAttrs(vnode, attrs) {\n\t\tif (\"value\" in attrs) {\n\t\t\tif(attrs.value === null) {\n\t\t\t\tif (vnode.dom.selectedIndex !== -1) vnode.dom.value = null\n\t\t\t} else {\n\t\t\t\tvar normalized = \"\" + attrs.value // eslint-disable-line no-implicit-coercion\n\t\t\t\tif (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {\n\t\t\t\t\tvnode.dom.value = normalized\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tif (\"selectedIndex\" in attrs) setAttr(vnode, \"selectedIndex\", null, attrs.selectedIndex, undefined)\n\t}\n\tfunction updateAttrs(vnode, old, attrs, ns) {\n\t\tif (attrs != null) {\n\t\t\tfor (var key in attrs) {\n\t\t\t\tsetAttr(vnode, key, old && old[key], attrs[key], ns)\n\t\t\t}\n\t\t}\n\t\tvar val\n\t\tif (old != null) {\n\t\t\tfor (var key in old) {\n\t\t\t\tif (((val = old[key]) != null) && (attrs == null || attrs[key] == null)) {\n\t\t\t\t\tremoveAttr(vnode, key, val, ns)\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\tfunction isFormAttribute(vnode, attr) {\n\t\treturn attr === \"value\" || attr === \"checked\" || attr === \"selectedIndex\" || attr === \"selected\" && vnode.dom === activeElement() || vnode.tag === \"option\" && vnode.dom.parentNode === $doc.activeElement\n\t}\n\tfunction isLifecycleMethod(attr) {\n\t\treturn attr === \"oninit\" || attr === \"oncreate\" || attr === \"onupdate\" || attr === \"onremove\" || attr === \"onbeforeremove\" || attr === \"onbeforeupdate\"\n\t}\n\tfunction hasPropertyKey(vnode, key, ns) {\n\t\t// Filter out namespaced keys\n\t\treturn ns === undefined && (\n\t\t\t// If it's a custom element, just keep it.\n\t\t\tvnode.tag.indexOf(\"-\") > -1 || vnode.attrs != null && vnode.attrs.is ||\n\t\t\t// If it's a normal element, let's try to avoid a few browser bugs.\n\t\t\tkey !== \"href\" && key !== \"list\" && key !== \"form\" && key !== \"width\" && key !== \"height\"// && key !== \"type\"\n\t\t\t// Defer the property check until *after* we check everything.\n\t\t) && key in vnode.dom\n\t}\n\n\t//style\n\tvar uppercaseRegex = /[A-Z]/g\n\tfunction toLowerCase(capital) { return \"-\" + capital.toLowerCase() }\n\tfunction normalizeKey(key) {\n\t\treturn key[0] === \"-\" && key[1] === \"-\" ? key :\n\t\t\tkey === \"cssFloat\" ? \"float\" :\n\t\t\t\tkey.replace(uppercaseRegex, toLowerCase)\n\t}\n\tfunction updateStyle(element, old, style) {\n\t\tif (old === style) {\n\t\t\t// Styles are equivalent, do nothing.\n\t\t} else if (style == null) {\n\t\t\t// New style is missing, just clear it.\n\t\t\telement.style.cssText = \"\"\n\t\t} else if (typeof style !== \"object\") {\n\t\t\t// New style is a string, let engine deal with patching.\n\t\t\telement.style.cssText = style\n\t\t} else if (old == null || typeof old !== \"object\") {\n\t\t\t// `old` is missing or a string, `style` is an object.\n\t\t\telement.style.cssText = \"\"\n\t\t\t// Add new style properties\n\t\t\tfor (var key in style) {\n\t\t\t\tvar value = style[key]\n\t\t\t\tif (value != null) element.style.setProperty(normalizeKey(key), String(value))\n\t\t\t}\n\t\t} else {\n\t\t\t// Both old & new are (different) objects.\n\t\t\t// Update style properties that have changed\n\t\t\tfor (var key in style) {\n\t\t\t\tvar value = style[key]\n\t\t\t\tif (value != null && (value = String(value)) !== String(old[key])) {\n\t\t\t\t\telement.style.setProperty(normalizeKey(key), value)\n\t\t\t\t}\n\t\t\t}\n\t\t\t// Remove style properties that no longer exist\n\t\t\tfor (var key in old) {\n\t\t\t\tif (old[key] != null && style[key] == null) {\n\t\t\t\t\telement.style.removeProperty(normalizeKey(key))\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Here's an explanation of how this works:\n\t// 1. The event names are always (by design) prefixed by `on`.\n\t// 2. The EventListener interface accepts either a function or an object\n\t//    with a `handleEvent` method.\n\t// 3. The object does not inherit from `Object.prototype`, to avoid\n\t//    any potential interference with that (e.g. setters).\n\t// 4. The event name is remapped to the handler before calling it.\n\t// 5. In function-based event handlers, `ev.target === this`. We replicate\n\t//    that below.\n\t// 6. In function-based event handlers, `return false` prevents the default\n\t//    action and stops event propagation. We replicate that below.\n\tfunction EventDict() {\n\t\t// Save this, so the current redraw is correctly tracked.\n\t\tthis._ = currentRedraw\n\t}\n\tEventDict.prototype = Object.create(null)\n\tEventDict.prototype.handleEvent = function (ev) {\n\t\tvar handler = this[\"on\" + ev.type]\n\t\tvar result\n\t\tif (typeof handler === \"function\") result = handler.call(ev.currentTarget, ev)\n\t\telse if (typeof handler.handleEvent === \"function\") handler.handleEvent(ev)\n\t\tif (this._ && ev.redraw !== false) (0, this._)()\n\t\tif (result === false) {\n\t\t\tev.preventDefault()\n\t\t\tev.stopPropagation()\n\t\t}\n\t}\n\n\t//event\n\tfunction updateEvent(vnode, key, value) {\n\t\tif (vnode.events != null) {\n\t\t\tif (vnode.events[key] === value) return\n\t\t\tif (value != null && (typeof value === \"function\" || typeof value === \"object\")) {\n\t\t\t\tif (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false)\n\t\t\t\tvnode.events[key] = value\n\t\t\t} else {\n\t\t\t\tif (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false)\n\t\t\t\tvnode.events[key] = undefined\n\t\t\t}\n\t\t} else if (value != null && (typeof value === \"function\" || typeof value === \"object\")) {\n\t\t\tvnode.events = new EventDict()\n\t\t\tvnode.dom.addEventListener(key.slice(2), vnode.events, false)\n\t\t\tvnode.events[key] = value\n\t\t}\n\t}\n\n\t//lifecycle\n\tfunction initLifecycle(source, vnode, hooks) {\n\t\tif (typeof source.oninit === \"function\") callHook.call(source.oninit, vnode)\n\t\tif (typeof source.oncreate === \"function\") hooks.push(callHook.bind(source.oncreate, vnode))\n\t}\n\tfunction updateLifecycle(source, vnode, hooks) {\n\t\tif (typeof source.onupdate === \"function\") hooks.push(callHook.bind(source.onupdate, vnode))\n\t}\n\tfunction shouldNotUpdate(vnode, old) {\n\t\tdo {\n\t\t\tif (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === \"function\") {\n\t\t\t\tvar force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old)\n\t\t\t\tif (force !== undefined && !force) break\n\t\t\t}\n\t\t\tif (typeof vnode.tag !== \"string\" && typeof vnode.state.onbeforeupdate === \"function\") {\n\t\t\t\tvar force = callHook.call(vnode.state.onbeforeupdate, vnode, old)\n\t\t\t\tif (force !== undefined && !force) break\n\t\t\t}\n\t\t\treturn false\n\t\t} while (false); // eslint-disable-line no-constant-condition\n\t\tvnode.dom = old.dom\n\t\tvnode.domSize = old.domSize\n\t\tvnode.instance = old.instance\n\t\t// One would think having the actual latest attributes would be ideal,\n\t\t// but it doesn't let us properly diff based on our current internal\n\t\t// representation. We have to save not only the old DOM info, but also\n\t\t// the attributes used to create it, as we diff *that*, not against the\n\t\t// DOM directly (with a few exceptions in `setAttr`). And, of course, we\n\t\t// need to save the children and text as they are conceptually not\n\t\t// unlike special \"attributes\" internally.\n\t\tvnode.attrs = old.attrs\n\t\tvnode.children = old.children\n\t\tvnode.text = old.text\n\t\treturn true\n\t}\n\n\treturn function(dom, vnodes, redraw) {\n\t\tif (!dom) throw new TypeError(\"Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.\")\n\t\tvar hooks = []\n\t\tvar active = activeElement()\n\t\tvar namespace = dom.namespaceURI\n\n\t\t// First time rendering into a node clears it out\n\t\tif (dom.vnodes == null) dom.textContent = \"\"\n\n\t\tvnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes])\n\t\tvar prevRedraw = currentRedraw\n\t\ttry {\n\t\t\tcurrentRedraw = typeof redraw === \"function\" ? redraw : undefined\n\t\t\tupdateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === \"http://www.w3.org/1999/xhtml\" ? undefined : namespace)\n\t\t} finally {\n\t\t\tcurrentRedraw = prevRedraw\n\t\t}\n\t\tdom.vnodes = vnodes\n\t\t// `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement\n\t\tif (active != null && activeElement() !== active && typeof active.focus === \"function\") active.focus()\n\t\tfor (var i = 0; i < hooks.length; i++) hooks[i]()\n\t}\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/render/render.js?");

/***/ }),

/***/ "./node_modules/mithril/render/trust.js":
/*!**********************************************!*\
  !*** ./node_modules/mithril/render/trust.js ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Vnode = __webpack_require__(/*! ../render/vnode */ \"./node_modules/mithril/render/vnode.js\")\n\nmodule.exports = function(html) {\n\tif (html == null) html = \"\"\n\treturn Vnode(\"<\", undefined, undefined, html, undefined, undefined)\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/render/trust.js?");

/***/ }),

/***/ "./node_modules/mithril/render/vnode.js":
/*!**********************************************!*\
  !*** ./node_modules/mithril/render/vnode.js ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
eval("\n\nfunction Vnode(tag, key, attrs, children, text, dom) {\n\treturn {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: undefined, events: undefined, instance: undefined}\n}\nVnode.normalize = function(node) {\n\tif (Array.isArray(node)) return Vnode(\"[\", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)\n\tif (node == null || typeof node === \"boolean\") return null\n\tif (typeof node === \"object\") return node\n\treturn Vnode(\"#\", undefined, undefined, String(node), undefined, undefined)\n}\nVnode.normalizeChildren = function(input) {\n\tvar children = []\n\tif (input.length) {\n\t\tvar isKeyed = input[0] != null && input[0].key != null\n\t\t// Note: this is a *very* perf-sensitive check.\n\t\t// Fun fact: merging the loop like this is somehow faster than splitting\n\t\t// it, noticeably so.\n\t\tfor (var i = 1; i < input.length; i++) {\n\t\t\tif ((input[i] != null && input[i].key != null) !== isKeyed) {\n\t\t\t\tthrow new TypeError(\"Vnodes must either always have keys or never have keys!\")\n\t\t\t}\n\t\t}\n\t\tfor (var i = 0; i < input.length; i++) {\n\t\t\tchildren[i] = Vnode.normalize(input[i])\n\t\t}\n\t}\n\treturn children\n}\n\nmodule.exports = Vnode\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/render/vnode.js?");

/***/ }),

/***/ "./node_modules/mithril/request.js":
/*!*****************************************!*\
  !*** ./node_modules/mithril/request.js ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar PromisePolyfill = __webpack_require__(/*! ./promise/promise */ \"./node_modules/mithril/promise/promise.js\")\nvar mountRedraw = __webpack_require__(/*! ./mount-redraw */ \"./node_modules/mithril/mount-redraw.js\")\n\nmodule.exports = __webpack_require__(/*! ./request/request */ \"./node_modules/mithril/request/request.js\")(window, PromisePolyfill, mountRedraw.redraw)\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/request.js?");

/***/ }),

/***/ "./node_modules/mithril/request/request.js":
/*!*************************************************!*\
  !*** ./node_modules/mithril/request/request.js ***!
  \*************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar buildPathname = __webpack_require__(/*! ../pathname/build */ \"./node_modules/mithril/pathname/build.js\")\n\nmodule.exports = function($window, Promise, oncompletion) {\n\tvar callbackCount = 0\n\n\tfunction PromiseProxy(executor) {\n\t\treturn new Promise(executor)\n\t}\n\n\t// In case the global Promise is some userland library's where they rely on\n\t// `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or\n\t// similar. Let's *not* break them.\n\tPromiseProxy.prototype = Promise.prototype\n\tPromiseProxy.__proto__ = Promise // eslint-disable-line no-proto\n\n\tfunction makeRequest(factory) {\n\t\treturn function(url, args) {\n\t\t\tif (typeof url !== \"string\") { args = url; url = url.url }\n\t\t\telse if (args == null) args = {}\n\t\t\tvar promise = new Promise(function(resolve, reject) {\n\t\t\t\tfactory(buildPathname(url, args.params), args, function (data) {\n\t\t\t\t\tif (typeof args.type === \"function\") {\n\t\t\t\t\t\tif (Array.isArray(data)) {\n\t\t\t\t\t\t\tfor (var i = 0; i < data.length; i++) {\n\t\t\t\t\t\t\t\tdata[i] = new args.type(data[i])\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse data = new args.type(data)\n\t\t\t\t\t}\n\t\t\t\t\tresolve(data)\n\t\t\t\t}, reject)\n\t\t\t})\n\t\t\tif (args.background === true) return promise\n\t\t\tvar count = 0\n\t\t\tfunction complete() {\n\t\t\t\tif (--count === 0 && typeof oncompletion === \"function\") oncompletion()\n\t\t\t}\n\n\t\t\treturn wrap(promise)\n\n\t\t\tfunction wrap(promise) {\n\t\t\t\tvar then = promise.then\n\t\t\t\t// Set the constructor, so engines know to not await or resolve\n\t\t\t\t// this as a native promise. At the time of writing, this is\n\t\t\t\t// only necessary for V8, but their behavior is the correct\n\t\t\t\t// behavior per spec. See this spec issue for more details:\n\t\t\t\t// https://github.com/tc39/ecma262/issues/1577. Also, see the\n\t\t\t\t// corresponding comment in `request/tests/test-request.js` for\n\t\t\t\t// a bit more background on the issue at hand.\n\t\t\t\tpromise.constructor = PromiseProxy\n\t\t\t\tpromise.then = function() {\n\t\t\t\t\tcount++\n\t\t\t\t\tvar next = then.apply(promise, arguments)\n\t\t\t\t\tnext.then(complete, function(e) {\n\t\t\t\t\t\tcomplete()\n\t\t\t\t\t\tif (count === 0) throw e\n\t\t\t\t\t})\n\t\t\t\t\treturn wrap(next)\n\t\t\t\t}\n\t\t\t\treturn promise\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction hasHeader(args, name) {\n\t\tfor (var key in args.headers) {\n\t\t\tif ({}.hasOwnProperty.call(args.headers, key) && name.test(key)) return true\n\t\t}\n\t\treturn false\n\t}\n\n\treturn {\n\t\trequest: makeRequest(function(url, args, resolve, reject) {\n\t\t\tvar method = args.method != null ? args.method.toUpperCase() : \"GET\"\n\t\t\tvar body = args.body\n\t\t\tvar assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData)\n\t\t\tvar responseType = args.responseType || (typeof args.extract === \"function\" ? \"\" : \"json\")\n\n\t\t\tvar xhr = new $window.XMLHttpRequest(), aborted = false\n\t\t\tvar original = xhr, replacedAbort\n\t\t\tvar abort = xhr.abort\n\n\t\t\txhr.abort = function() {\n\t\t\t\taborted = true\n\t\t\t\tabort.call(this)\n\t\t\t}\n\n\t\t\txhr.open(method, url, args.async !== false, typeof args.user === \"string\" ? args.user : undefined, typeof args.password === \"string\" ? args.password : undefined)\n\n\t\t\tif (assumeJSON && body != null && !hasHeader(args, /^content-type$/i)) {\n\t\t\t\txhr.setRequestHeader(\"Content-Type\", \"application/json; charset=utf-8\")\n\t\t\t}\n\t\t\tif (typeof args.deserialize !== \"function\" && !hasHeader(args, /^accept$/i)) {\n\t\t\t\txhr.setRequestHeader(\"Accept\", \"application/json, text/*\")\n\t\t\t}\n\t\t\tif (args.withCredentials) xhr.withCredentials = args.withCredentials\n\t\t\tif (args.timeout) xhr.timeout = args.timeout\n\t\t\txhr.responseType = responseType\n\n\t\t\tfor (var key in args.headers) {\n\t\t\t\tif ({}.hasOwnProperty.call(args.headers, key)) {\n\t\t\t\t\txhr.setRequestHeader(key, args.headers[key])\n\t\t\t\t}\n\t\t\t}\n\n\t\t\txhr.onreadystatechange = function(ev) {\n\t\t\t\t// Don't throw errors on xhr.abort().\n\t\t\t\tif (aborted) return\n\n\t\t\t\tif (ev.target.readyState === 4) {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tvar success = (ev.target.status >= 200 && ev.target.status < 300) || ev.target.status === 304 || (/^file:\\/\\//i).test(url)\n\t\t\t\t\t\t// When the response type isn't \"\" or \"text\",\n\t\t\t\t\t\t// `xhr.responseText` is the wrong thing to use.\n\t\t\t\t\t\t// Browsers do the right thing and throw here, and we\n\t\t\t\t\t\t// should honor that and do the right thing by\n\t\t\t\t\t\t// preferring `xhr.response` where possible/practical.\n\t\t\t\t\t\tvar response = ev.target.response, message\n\n\t\t\t\t\t\tif (responseType === \"json\") {\n\t\t\t\t\t\t\t// For IE and Edge, which don't implement\n\t\t\t\t\t\t\t// `responseType: \"json\"`.\n\t\t\t\t\t\t\tif (!ev.target.responseType && typeof args.extract !== \"function\") response = JSON.parse(ev.target.responseText)\n\t\t\t\t\t\t} else if (!responseType || responseType === \"text\") {\n\t\t\t\t\t\t\t// Only use this default if it's text. If a parsed\n\t\t\t\t\t\t\t// document is needed on old IE and friends (all\n\t\t\t\t\t\t\t// unsupported), the user should use a custom\n\t\t\t\t\t\t\t// `config` instead. They're already using this at\n\t\t\t\t\t\t\t// their own risk.\n\t\t\t\t\t\t\tif (response == null) response = ev.target.responseText\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (typeof args.extract === \"function\") {\n\t\t\t\t\t\t\tresponse = args.extract(ev.target, args)\n\t\t\t\t\t\t\tsuccess = true\n\t\t\t\t\t\t} else if (typeof args.deserialize === \"function\") {\n\t\t\t\t\t\t\tresponse = args.deserialize(response)\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (success) resolve(response)\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\ttry { message = ev.target.responseText }\n\t\t\t\t\t\t\tcatch (e) { message = response }\n\t\t\t\t\t\t\tvar error = new Error(message)\n\t\t\t\t\t\t\terror.code = ev.target.status\n\t\t\t\t\t\t\terror.response = response\n\t\t\t\t\t\t\treject(error)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcatch (e) {\n\t\t\t\t\t\treject(e)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (typeof args.config === \"function\") {\n\t\t\t\txhr = args.config(xhr, args, url) || xhr\n\n\t\t\t\t// Propagate the `abort` to any replacement XHR as well.\n\t\t\t\tif (xhr !== original) {\n\t\t\t\t\treplacedAbort = xhr.abort\n\t\t\t\t\txhr.abort = function() {\n\t\t\t\t\t\taborted = true\n\t\t\t\t\t\treplacedAbort.call(this)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (body == null) xhr.send()\n\t\t\telse if (typeof args.serialize === \"function\") xhr.send(args.serialize(body))\n\t\t\telse if (body instanceof $window.FormData) xhr.send(body)\n\t\t\telse xhr.send(JSON.stringify(body))\n\t\t}),\n\t\tjsonp: makeRequest(function(url, args, resolve, reject) {\n\t\t\tvar callbackName = args.callbackName || \"_mithril_\" + Math.round(Math.random() * 1e16) + \"_\" + callbackCount++\n\t\t\tvar script = $window.document.createElement(\"script\")\n\t\t\t$window[callbackName] = function(data) {\n\t\t\t\tdelete $window[callbackName]\n\t\t\t\tscript.parentNode.removeChild(script)\n\t\t\t\tresolve(data)\n\t\t\t}\n\t\t\tscript.onerror = function() {\n\t\t\t\tdelete $window[callbackName]\n\t\t\t\tscript.parentNode.removeChild(script)\n\t\t\t\treject(new Error(\"JSONP request failed\"))\n\t\t\t}\n\t\t\tscript.src = url + (url.indexOf(\"?\") < 0 ? \"?\" : \"&\") +\n\t\t\t\tencodeURIComponent(args.callbackKey || \"callback\") + \"=\" +\n\t\t\t\tencodeURIComponent(callbackName)\n\t\t\t$window.document.documentElement.appendChild(script)\n\t\t}),\n\t}\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/request/request.js?");

/***/ }),

/***/ "./node_modules/mithril/route.js":
/*!***************************************!*\
  !*** ./node_modules/mithril/route.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar mountRedraw = __webpack_require__(/*! ./mount-redraw */ \"./node_modules/mithril/mount-redraw.js\")\n\nmodule.exports = __webpack_require__(/*! ./api/router */ \"./node_modules/mithril/api/router.js\")(window, mountRedraw)\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/route.js?");

/***/ }),

/***/ "./node_modules/mithril/stream.js":
/*!****************************************!*\
  !*** ./node_modules/mithril/stream.js ***!
  \****************************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] -> ./node_modules/mithril/stream/stream.js .__esModule */
/*! other exports [maybe provided (runtime-defined)] [no usage info] -> ./node_modules/mithril/stream/stream.js */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nmodule.exports = __webpack_require__(/*! ./stream/stream */ \"./node_modules/mithril/stream/stream.js\")\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/stream.js?");

/***/ }),

/***/ "./node_modules/mithril/stream/stream.js":
/*!***********************************************!*\
  !*** ./node_modules/mithril/stream/stream.js ***!
  \***********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("/* eslint-disable */\n;(function() {\n\"use strict\"\n/* eslint-enable */\nStream.SKIP = {}\nStream.lift = lift\nStream.scan = scan\nStream.merge = merge\nStream.combine = combine\nStream.scanMerge = scanMerge\nStream[\"fantasy-land/of\"] = Stream\n\nvar warnedHalt = false\nObject.defineProperty(Stream, \"HALT\", {\n\tget: function() {\n\t\twarnedHalt || console.log(\"HALT is deprecated and has been renamed to SKIP\");\n\t\twarnedHalt = true\n\t\treturn Stream.SKIP\n\t}\n})\n\nfunction Stream(value) {\n\tvar dependentStreams = []\n\tvar dependentFns = []\n\n\tfunction stream(v) {\n\t\tif (arguments.length && v !== Stream.SKIP) {\n\t\t\tvalue = v\n\t\t\tif (open(stream)) {\n\t\t\t\tstream._changing()\n\t\t\t\tstream._state = \"active\"\n\t\t\t\tdependentStreams.forEach(function(s, i) { s(dependentFns[i](value)) })\n\t\t\t}\n\t\t}\n\n\t\treturn value\n\t}\n\n\tstream.constructor = Stream\n\tstream._state = arguments.length && value !== Stream.SKIP ? \"active\" : \"pending\"\n\tstream._parents = []\n\n\tstream._changing = function() {\n\t\tif (open(stream)) stream._state = \"changing\"\n\t\tdependentStreams.forEach(function(s) {\n\t\t\ts._changing()\n\t\t})\n\t}\n\n\tstream._map = function(fn, ignoreInitial) {\n\t\tvar target = ignoreInitial ? Stream() : Stream(fn(value))\n\t\ttarget._parents.push(stream)\n\t\tdependentStreams.push(target)\n\t\tdependentFns.push(fn)\n\t\treturn target\n\t}\n\n\tstream.map = function(fn) {\n\t\treturn stream._map(fn, stream._state !== \"active\")\n\t}\n\n\tvar end\n\tfunction createEnd() {\n\t\tend = Stream()\n\t\tend.map(function(value) {\n\t\t\tif (value === true) {\n\t\t\t\tstream._parents.forEach(function (p) {p._unregisterChild(stream)})\n\t\t\t\tstream._state = \"ended\"\n\t\t\t\tstream._parents.length = dependentStreams.length = dependentFns.length = 0\n\t\t\t}\n\t\t\treturn value\n\t\t})\n\t\treturn end\n\t}\n\n\tstream.toJSON = function() { return value != null && typeof value.toJSON === \"function\" ? value.toJSON() : value }\n\n\tstream[\"fantasy-land/map\"] = stream.map\n\tstream[\"fantasy-land/ap\"] = function(x) { return combine(function(s1, s2) { return s1()(s2()) }, [x, stream]) }\n\n\tstream._unregisterChild = function(child) {\n\t\tvar childIndex = dependentStreams.indexOf(child)\n\t\tif (childIndex !== -1) {\n\t\t\tdependentStreams.splice(childIndex, 1)\n\t\t\tdependentFns.splice(childIndex, 1)\n\t\t}\n\t}\n\n\tObject.defineProperty(stream, \"end\", {\n\t\tget: function() { return end || createEnd() }\n\t})\n\n\treturn stream\n}\n\nfunction combine(fn, streams) {\n\tvar ready = streams.every(function(s) {\n\t\tif (s.constructor !== Stream)\n\t\t\tthrow new Error(\"Ensure that each item passed to stream.combine/stream.merge/lift is a stream\")\n\t\treturn s._state === \"active\"\n\t})\n\tvar stream = ready\n\t\t? Stream(fn.apply(null, streams.concat([streams])))\n\t\t: Stream()\n\n\tvar changed = []\n\n\tvar mappers = streams.map(function(s) {\n\t\treturn s._map(function(value) {\n\t\t\tchanged.push(s)\n\t\t\tif (ready || streams.every(function(s) { return s._state !== \"pending\" })) {\n\t\t\t\tready = true\n\t\t\t\tstream(fn.apply(null, streams.concat([changed])))\n\t\t\t\tchanged = []\n\t\t\t}\n\t\t\treturn value\n\t\t}, true)\n\t})\n\n\tvar endStream = stream.end.map(function(value) {\n\t\tif (value === true) {\n\t\t\tmappers.forEach(function(mapper) { mapper.end(true) })\n\t\t\tendStream.end(true)\n\t\t}\n\t\treturn undefined\n\t})\n\n\treturn stream\n}\n\nfunction merge(streams) {\n\treturn combine(function() { return streams.map(function(s) { return s() }) }, streams)\n}\n\nfunction scan(fn, acc, origin) {\n\tvar stream = origin.map(function(v) {\n\t\tvar next = fn(acc, v)\n\t\tif (next !== Stream.SKIP) acc = next\n\t\treturn next\n\t})\n\tstream(acc)\n\treturn stream\n}\n\nfunction scanMerge(tuples, seed) {\n\tvar streams = tuples.map(function(tuple) { return tuple[0] })\n\n\tvar stream = combine(function() {\n\t\tvar changed = arguments[arguments.length - 1]\n\t\tstreams.forEach(function(stream, i) {\n\t\t\tif (changed.indexOf(stream) > -1)\n\t\t\t\tseed = tuples[i][1](seed, stream())\n\t\t})\n\n\t\treturn seed\n\t}, streams)\n\n\tstream(seed)\n\n\treturn stream\n}\n\nfunction lift() {\n\tvar fn = arguments[0]\n\tvar streams = Array.prototype.slice.call(arguments, 1)\n\treturn merge(streams).map(function(streams) {\n\t\treturn fn.apply(undefined, streams)\n\t})\n}\n\nfunction open(s) {\n\treturn s._state === \"pending\" || s._state === \"active\" || s._state === \"changing\"\n}\n\nif (true) module[\"exports\"] = Stream\nelse {}\n\n}());\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/mithril/stream/stream.js?");

/***/ }),

/***/ "./node_modules/ramda/es/any.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/any.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_xany_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xany.js */ \"./node_modules/ramda/es/internal/_xany.js\");\n\n\n\n/**\n * Returns `true` if at least one of the elements of the list match the predicate,\n * `false` otherwise.\n *\n * Dispatches to the `any` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig (a -> Boolean) -> [a] -> Boolean\n * @param {Function} fn The predicate function.\n * @param {Array} list The array to consider.\n * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`\n *         otherwise.\n * @see R.all, R.none, R.transduce\n * @example\n *\n *      const lessThan0 = R.flip(R.lt)(0);\n *      const lessThan2 = R.flip(R.lt)(2);\n *      R.any(lessThan0)([1, 2]); //=> false\n *      R.any(lessThan2)([1, 2]); //=> true\n */\n\nvar any =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(\n/*#__PURE__*/\n(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__.default)(['any'], _internal_xany_js__WEBPACK_IMPORTED_MODULE_2__.default, function any(fn, list) {\n  var idx = 0;\n\n  while (idx < list.length) {\n    if (fn(list[idx])) {\n      return true;\n    }\n\n    idx += 1;\n  }\n\n  return false;\n}));\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (any);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/any.js?");

/***/ }),

/***/ "./node_modules/ramda/es/append.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/append.js ***!
  \*****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_concat.js */ \"./node_modules/ramda/es/internal/_concat.js\");\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Returns a new list containing the contents of the given list, followed by\n * the given element.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig a -> [a] -> [a]\n * @param {*} el The element to add to the end of the new list.\n * @param {Array} list The list of elements to add a new item to.\n *        list.\n * @return {Array} A new list containing the elements of the old list followed by `el`.\n * @see R.prepend\n * @example\n *\n *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']\n *      R.append('tests', []); //=> ['tests']\n *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]\n */\n\nvar append =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function append(el, list) {\n  return (0,_internal_concat_js__WEBPACK_IMPORTED_MODULE_1__.default)(list, [el]);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (append);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/append.js?");

/***/ }),

/***/ "./node_modules/ramda/es/bind.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/bind.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_arity.js */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n\n\n/**\n * Creates a function that is bound to a context.\n * Note: `R.bind` does not provide the additional argument-binding capabilities of\n * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).\n *\n * @func\n * @memberOf R\n * @since v0.6.0\n * @category Function\n * @category Object\n * @sig (* -> *) -> {*} -> (* -> *)\n * @param {Function} fn The function to bind to context\n * @param {Object} thisObj The context to bind `fn` to\n * @return {Function} A function that will execute in the context of `thisObj`.\n * @see R.partial\n * @example\n *\n *      const log = R.bind(console.log, console);\n *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}\n *      // logs {a: 2}\n * @symb R.bind(f, o)(a, b) = f.call(o, a, b)\n */\n\nvar bind =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function bind(fn, thisObj) {\n  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn.length, function () {\n    return fn.apply(thisObj, arguments);\n  });\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bind);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/bind.js?");

/***/ }),

/***/ "./node_modules/ramda/es/curryN.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/curryN.js ***!
  \*****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_arity.js */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_curryN.js */ \"./node_modules/ramda/es/internal/_curryN.js\");\n\n\n\n\n/**\n * Returns a curried equivalent of the provided function, with the specified\n * arity. The curried function has two unusual capabilities. First, its\n * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the\n * following are equivalent:\n *\n *   - `g(1)(2)(3)`\n *   - `g(1)(2, 3)`\n *   - `g(1, 2)(3)`\n *   - `g(1, 2, 3)`\n *\n * Secondly, the special placeholder value [`R.__`](#__) may be used to specify\n * \"gaps\", allowing partial application of any combination of arguments,\n * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),\n * the following are equivalent:\n *\n *   - `g(1, 2, 3)`\n *   - `g(_, 2, 3)(1)`\n *   - `g(_, _, 3)(1)(2)`\n *   - `g(_, _, 3)(1, 2)`\n *   - `g(_, 2)(1)(3)`\n *   - `g(_, 2)(1, 3)`\n *   - `g(_, 2)(_, 3)(1)`\n *\n * @func\n * @memberOf R\n * @since v0.5.0\n * @category Function\n * @sig Number -> (* -> a) -> (* -> a)\n * @param {Number} length The arity for the returned function.\n * @param {Function} fn The function to curry.\n * @return {Function} A new, curried function.\n * @see R.curry\n * @example\n *\n *      const sumArgs = (...args) => R.sum(args);\n *\n *      const curriedAddFourNumbers = R.curryN(4, sumArgs);\n *      const f = curriedAddFourNumbers(1, 2);\n *      const g = f(3);\n *      g(4); //=> 10\n */\n\nvar curryN =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function curryN(length, fn) {\n  if (length === 1) {\n    return (0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn);\n  }\n\n  return (0,_internal_arity_js__WEBPACK_IMPORTED_MODULE_2__.default)(length, (0,_internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__.default)(length, [], fn));\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (curryN);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/curryN.js?");

/***/ }),

/***/ "./node_modules/ramda/es/equals.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/equals.js ***!
  \*****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_equals.js */ \"./node_modules/ramda/es/internal/_equals.js\");\n\n\n/**\n * Returns `true` if its arguments are equivalent, `false` otherwise. Handles\n * cyclical data structures.\n *\n * Dispatches symmetrically to the `equals` methods of both arguments, if\n * present.\n *\n * @func\n * @memberOf R\n * @since v0.15.0\n * @category Relation\n * @sig a -> b -> Boolean\n * @param {*} a\n * @param {*} b\n * @return {Boolean}\n * @example\n *\n *      R.equals(1, 1); //=> true\n *      R.equals(1, '1'); //=> false\n *      R.equals([1, 2, 3], [1, 2, 3]); //=> true\n *\n *      const a = {}; a.v = a;\n *      const b = {}; b.v = b;\n *      R.equals(a, b); //=> true\n */\n\nvar equals =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function equals(a, b) {\n  return (0,_internal_equals_js__WEBPACK_IMPORTED_MODULE_1__.default)(a, b, [], []);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (equals);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/equals.js?");

/***/ }),

/***/ "./node_modules/ramda/es/identity.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/identity.js ***!
  \*******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_identity.js */ \"./node_modules/ramda/es/internal/_identity.js\");\n\n\n/**\n * A function that does nothing but return the parameter supplied to it. Good\n * as a default or placeholder function.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Function\n * @sig a -> a\n * @param {*} x The value to return.\n * @return {*} The input value, `x`.\n * @example\n *\n *      R.identity(1); //=> 1\n *\n *      const obj = {};\n *      R.identity(obj) === obj; //=> true\n * @symb R.identity(a) = a\n */\n\nvar identity =\n/*#__PURE__*/\n(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(_internal_identity_js__WEBPACK_IMPORTED_MODULE_1__.default);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (identity);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/identity.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arity.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arity.js ***!
  \**************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _arity\n/* harmony export */ });\nfunction _arity(n, fn) {\n  /* eslint-disable no-unused-vars */\n  switch (n) {\n    case 0:\n      return function () {\n        return fn.apply(this, arguments);\n      };\n\n    case 1:\n      return function (a0) {\n        return fn.apply(this, arguments);\n      };\n\n    case 2:\n      return function (a0, a1) {\n        return fn.apply(this, arguments);\n      };\n\n    case 3:\n      return function (a0, a1, a2) {\n        return fn.apply(this, arguments);\n      };\n\n    case 4:\n      return function (a0, a1, a2, a3) {\n        return fn.apply(this, arguments);\n      };\n\n    case 5:\n      return function (a0, a1, a2, a3, a4) {\n        return fn.apply(this, arguments);\n      };\n\n    case 6:\n      return function (a0, a1, a2, a3, a4, a5) {\n        return fn.apply(this, arguments);\n      };\n\n    case 7:\n      return function (a0, a1, a2, a3, a4, a5, a6) {\n        return fn.apply(this, arguments);\n      };\n\n    case 8:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7) {\n        return fn.apply(this, arguments);\n      };\n\n    case 9:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {\n        return fn.apply(this, arguments);\n      };\n\n    case 10:\n      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {\n        return fn.apply(this, arguments);\n      };\n\n    default:\n      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');\n  }\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_arity.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arrayFromIterator.js":
/*!**************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arrayFromIterator.js ***!
  \**************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _arrayFromIterator\n/* harmony export */ });\nfunction _arrayFromIterator(iter) {\n  var list = [];\n  var next;\n\n  while (!(next = iter.next()).done) {\n    list.push(next.value);\n  }\n\n  return list;\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_arrayFromIterator.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_concat.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_concat.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _concat\n/* harmony export */ });\n/**\n * Private `concat` function to merge two array-like objects.\n *\n * @private\n * @param {Array|Arguments} [set1=[]] An array-like object.\n * @param {Array|Arguments} [set2=[]] An array-like object.\n * @return {Array} A new, merged array.\n * @example\n *\n *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]\n */\nfunction _concat(set1, set2) {\n  set1 = set1 || [];\n  set2 = set2 || [];\n  var idx;\n  var len1 = set1.length;\n  var len2 = set2.length;\n  var result = [];\n  idx = 0;\n\n  while (idx < len1) {\n    result[result.length] = set1[idx];\n    idx += 1;\n  }\n\n  idx = 0;\n\n  while (idx < len2) {\n    result[result.length] = set2[idx];\n    idx += 1;\n  }\n\n  return result;\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_concat.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry1.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry1.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _curry1\n/* harmony export */ });\n/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n/**\n * Optimized internal one-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\nfunction _curry1(fn) {\n  return function f1(a) {\n    if (arguments.length === 0 || (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a)) {\n      return f1;\n    } else {\n      return fn.apply(this, arguments);\n    }\n  };\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_curry1.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry2.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry2.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _curry2\n/* harmony export */ });\n/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry1.js */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n\n/**\n * Optimized internal two-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\nfunction _curry2(fn) {\n  return function f2(a, b) {\n    switch (arguments.length) {\n      case 0:\n        return f2;\n\n      case 1:\n        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? f2 : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b) {\n          return fn(a, _b);\n        });\n\n      default:\n        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? f2 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a) {\n          return fn(_a, b);\n        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b) {\n          return fn(a, _b);\n        }) : fn(a, b);\n    }\n  };\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_curry2.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry3.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry3.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _curry3\n/* harmony export */ });\n/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_curry1.js */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n\n\n/**\n * Optimized internal three-arity curry function.\n *\n * @private\n * @category Function\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\nfunction _curry3(fn) {\n  return function f3(a, b, c) {\n    switch (arguments.length) {\n      case 0:\n        return f3;\n\n      case 1:\n        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? f3 : (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b, _c) {\n          return fn(a, _b, _c);\n        });\n\n      case 2:\n        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a, _c) {\n          return fn(_a, b, _c);\n        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b, _c) {\n          return fn(a, _b, _c);\n        }) : (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_c) {\n          return fn(a, b, _c);\n        });\n\n      default:\n        return (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? f3 : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a, _b) {\n          return fn(_a, _b, c);\n        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_a, _c) {\n          return fn(_a, b, _c);\n        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) && (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? (0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (_b, _c) {\n          return fn(a, _b, _c);\n        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(a) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_a) {\n          return fn(_a, b, c);\n        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(b) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_b) {\n          return fn(a, _b, c);\n        }) : (0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(c) ? (0,_curry1_js__WEBPACK_IMPORTED_MODULE_2__.default)(function (_c) {\n          return fn(a, b, _c);\n        }) : fn(a, b, c);\n    }\n  };\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_curry3.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curryN.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curryN.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _curryN\n/* harmony export */ });\n/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_arity.js */ \"./node_modules/ramda/es/internal/_arity.js\");\n/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ \"./node_modules/ramda/es/internal/_isPlaceholder.js\");\n\n\n/**\n * Internal curryN function.\n *\n * @private\n * @category Function\n * @param {Number} length The arity of the curried function.\n * @param {Array} received An array of arguments received thus far.\n * @param {Function} fn The function to curry.\n * @return {Function} The curried function.\n */\n\nfunction _curryN(length, received, fn) {\n  return function () {\n    var combined = [];\n    var argsIdx = 0;\n    var left = length;\n    var combinedIdx = 0;\n\n    while (combinedIdx < received.length || argsIdx < arguments.length) {\n      var result;\n\n      if (combinedIdx < received.length && (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(received[combinedIdx]) || argsIdx >= arguments.length)) {\n        result = received[combinedIdx];\n      } else {\n        result = arguments[argsIdx];\n        argsIdx += 1;\n      }\n\n      combined[combinedIdx] = result;\n\n      if (!(0,_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__.default)(result)) {\n        left -= 1;\n      }\n\n      combinedIdx += 1;\n    }\n\n    return left <= 0 ? fn.apply(this, combined) : (0,_arity_js__WEBPACK_IMPORTED_MODULE_1__.default)(left, _curryN(length, combined, fn));\n  };\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_curryN.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dispatchable.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dispatchable.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _dispatchable\n/* harmony export */ });\n/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _isTransformer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isTransformer.js */ \"./node_modules/ramda/es/internal/_isTransformer.js\");\n\n\n/**\n * Returns a function that dispatches with different strategies based on the\n * object in list position (last argument). If it is an array, executes [fn].\n * Otherwise, if it has a function with one of the given method names, it will\n * execute that function (functor case). Otherwise, if it is a transformer,\n * uses transducer [xf] to return a new transformer (transducer case).\n * Otherwise, it will default to executing [fn].\n *\n * @private\n * @param {Array} methodNames properties to check for a custom implementation\n * @param {Function} xf transducer to initialize if object is transformer\n * @param {Function} fn default ramda implementation\n * @return {Function} A function that dispatches on object in list position\n */\n\nfunction _dispatchable(methodNames, xf, fn) {\n  return function () {\n    if (arguments.length === 0) {\n      return fn();\n    }\n\n    var args = Array.prototype.slice.call(arguments, 0);\n    var obj = args.pop();\n\n    if (!(0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(obj)) {\n      var idx = 0;\n\n      while (idx < methodNames.length) {\n        if (typeof obj[methodNames[idx]] === 'function') {\n          return obj[methodNames[idx]].apply(obj, args);\n        }\n\n        idx += 1;\n      }\n\n      if ((0,_isTransformer_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj)) {\n        var transducer = xf.apply(null, args);\n        return transducer(obj);\n      }\n    }\n\n    return fn.apply(this, arguments);\n  };\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_dispatchable.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_equals.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_equals.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _equals\n/* harmony export */ });\n/* harmony import */ var _arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arrayFromIterator.js */ \"./node_modules/ramda/es/internal/_arrayFromIterator.js\");\n/* harmony import */ var _includesWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_includesWith.js */ \"./node_modules/ramda/es/internal/_includesWith.js\");\n/* harmony import */ var _functionName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_functionName.js */ \"./node_modules/ramda/es/internal/_functionName.js\");\n/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_has.js */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _objectIs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_objectIs.js */ \"./node_modules/ramda/es/internal/_objectIs.js\");\n/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../keys.js */ \"./node_modules/ramda/es/keys.js\");\n/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../type.js */ \"./node_modules/ramda/es/type.js\");\n\n\n\n\n\n\n\n/**\n * private _uniqContentEquals function.\n * That function is checking equality of 2 iterator contents with 2 assumptions\n * - iterators lengths are the same\n * - iterators values are unique\n *\n * false-positive result will be returned for comparision of, e.g.\n * - [1,2,3] and [1,2,3,4]\n * - [1,1,1] and [1,2,3]\n * */\n\nfunction _uniqContentEquals(aIterator, bIterator, stackA, stackB) {\n  var a = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__.default)(aIterator);\n\n  var b = (0,_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__.default)(bIterator);\n\n  function eq(_a, _b) {\n    return _equals(_a, _b, stackA.slice(), stackB.slice());\n  } // if *a* array contains any element that is not included in *b*\n\n\n  return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__.default)(function (b, aItem) {\n    return !(0,_includesWith_js__WEBPACK_IMPORTED_MODULE_1__.default)(eq, aItem, b);\n  }, b, a);\n}\n\nfunction _equals(a, b, stackA, stackB) {\n  if ((0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__.default)(a, b)) {\n    return true;\n  }\n\n  var typeA = (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.default)(a);\n\n  if (typeA !== (0,_type_js__WEBPACK_IMPORTED_MODULE_3__.default)(b)) {\n    return false;\n  }\n\n  if (a == null || b == null) {\n    return false;\n  }\n\n  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {\n    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);\n  }\n\n  if (typeof a.equals === 'function' || typeof b.equals === 'function') {\n    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);\n  }\n\n  switch (typeA) {\n    case 'Arguments':\n    case 'Array':\n    case 'Object':\n      if (typeof a.constructor === 'function' && (0,_functionName_js__WEBPACK_IMPORTED_MODULE_4__.default)(a.constructor) === 'Promise') {\n        return a === b;\n      }\n\n      break;\n\n    case 'Boolean':\n    case 'Number':\n    case 'String':\n      if (!(typeof a === typeof b && (0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__.default)(a.valueOf(), b.valueOf()))) {\n        return false;\n      }\n\n      break;\n\n    case 'Date':\n      if (!(0,_objectIs_js__WEBPACK_IMPORTED_MODULE_2__.default)(a.valueOf(), b.valueOf())) {\n        return false;\n      }\n\n      break;\n\n    case 'Error':\n      return a.name === b.name && a.message === b.message;\n\n    case 'RegExp':\n      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {\n        return false;\n      }\n\n      break;\n  }\n\n  var idx = stackA.length - 1;\n\n  while (idx >= 0) {\n    if (stackA[idx] === a) {\n      return stackB[idx] === b;\n    }\n\n    idx -= 1;\n  }\n\n  switch (typeA) {\n    case 'Map':\n      if (a.size !== b.size) {\n        return false;\n      }\n\n      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));\n\n    case 'Set':\n      if (a.size !== b.size) {\n        return false;\n      }\n\n      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));\n\n    case 'Arguments':\n    case 'Array':\n    case 'Object':\n    case 'Boolean':\n    case 'Number':\n    case 'String':\n    case 'Date':\n    case 'Error':\n    case 'RegExp':\n    case 'Int8Array':\n    case 'Uint8Array':\n    case 'Uint8ClampedArray':\n    case 'Int16Array':\n    case 'Uint16Array':\n    case 'Int32Array':\n    case 'Uint32Array':\n    case 'Float32Array':\n    case 'Float64Array':\n    case 'ArrayBuffer':\n      break;\n\n    default:\n      // Values of other types are only equal if identical.\n      return false;\n  }\n\n  var keysA = (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__.default)(a);\n\n  if (keysA.length !== (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__.default)(b).length) {\n    return false;\n  }\n\n  var extendedStackA = stackA.concat([a]);\n  var extendedStackB = stackB.concat([b]);\n  idx = keysA.length - 1;\n\n  while (idx >= 0) {\n    var key = keysA[idx];\n\n    if (!((0,_has_js__WEBPACK_IMPORTED_MODULE_6__.default)(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {\n      return false;\n    }\n\n    idx -= 1;\n  }\n\n  return true;\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_equals.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_functionName.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_functionName.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _functionName\n/* harmony export */ });\nfunction _functionName(f) {\n  // String(x => x) evaluates to \"x => x\", so the pattern may not match.\n  var match = String(f).match(/^function (\\w*)/);\n  return match == null ? '' : match[1];\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_functionName.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_has.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_has.js ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _has\n/* harmony export */ });\nfunction _has(prop, obj) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_has.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_identity.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_identity.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _identity\n/* harmony export */ });\nfunction _identity(x) {\n  return x;\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_identity.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_includesWith.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_includesWith.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _includesWith\n/* harmony export */ });\nfunction _includesWith(pred, x, list) {\n  var idx = 0;\n  var len = list.length;\n\n  while (idx < len) {\n    if (pred(x, list[idx])) {\n      return true;\n    }\n\n    idx += 1;\n  }\n\n  return false;\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_includesWith.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArguments.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArguments.js ***!
  \********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ \"./node_modules/ramda/es/internal/_has.js\");\n\nvar toString = Object.prototype.toString;\n\nvar _isArguments =\n/*#__PURE__*/\nfunction () {\n  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {\n    return toString.call(x) === '[object Arguments]';\n  } : function _isArguments(x) {\n    return (0,_has_js__WEBPACK_IMPORTED_MODULE_0__.default)('callee', x);\n  };\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArguments);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_isArguments.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArray.js ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/**\n * Tests whether or not an object is an array.\n *\n * @private\n * @param {*} val The object to test.\n * @return {Boolean} `true` if `val` is an array, `false` otherwise.\n * @example\n *\n *      _isArray([]); //=> true\n *      _isArray(null); //=> false\n *      _isArray({}); //=> false\n */\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Array.isArray || function _isArray(val) {\n  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';\n});\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_isArray.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArrayLike.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArrayLike.js ***!
  \********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArray.js */ \"./node_modules/ramda/es/internal/_isArray.js\");\n/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isString.js */ \"./node_modules/ramda/es/internal/_isString.js\");\n\n\n\n/**\n * Tests whether or not an object is similar to an array.\n *\n * @private\n * @category Type\n * @category List\n * @sig * -> Boolean\n * @param {*} x The object to test.\n * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.\n * @example\n *\n *      _isArrayLike([]); //=> true\n *      _isArrayLike(true); //=> false\n *      _isArrayLike({}); //=> false\n *      _isArrayLike({length: 10}); //=> false\n *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true\n */\n\nvar _isArrayLike =\n/*#__PURE__*/\n(0,_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function isArrayLike(x) {\n  if ((0,_isArray_js__WEBPACK_IMPORTED_MODULE_1__.default)(x)) {\n    return true;\n  }\n\n  if (!x) {\n    return false;\n  }\n\n  if (typeof x !== 'object') {\n    return false;\n  }\n\n  if ((0,_isString_js__WEBPACK_IMPORTED_MODULE_2__.default)(x)) {\n    return false;\n  }\n\n  if (x.nodeType === 1) {\n    return !!x.length;\n  }\n\n  if (x.length === 0) {\n    return true;\n  }\n\n  if (x.length > 0) {\n    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);\n  }\n\n  return false;\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_isArrayLike);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_isArrayLike.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isInteger.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isInteger.js ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/**\n * Determine if the passed argument is an integer.\n *\n * @private\n * @param {*} n\n * @category Type\n * @return {Boolean}\n */\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Number.isInteger || function _isInteger(n) {\n  return n << 0 === n;\n});\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_isInteger.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isPlaceholder.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isPlaceholder.js ***!
  \**********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _isPlaceholder\n/* harmony export */ });\nfunction _isPlaceholder(a) {\n  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_isPlaceholder.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isString.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _isString\n/* harmony export */ });\nfunction _isString(x) {\n  return Object.prototype.toString.call(x) === '[object String]';\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_isString.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isTransformer.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isTransformer.js ***!
  \**********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _isTransformer\n/* harmony export */ });\nfunction _isTransformer(obj) {\n  return obj != null && typeof obj['@@transducer/step'] === 'function';\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_isTransformer.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_map.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_map.js ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _map\n/* harmony export */ });\nfunction _map(fn, functor) {\n  var idx = 0;\n  var len = functor.length;\n  var result = Array(len);\n\n  while (idx < len) {\n    result[idx] = fn(functor[idx]);\n    idx += 1;\n  }\n\n  return result;\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_map.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_objectIs.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_objectIs.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\nfunction _objectIs(a, b) {\n  // SameValue algorithm\n  if (a === b) {\n    // Steps 1-5, 7-10\n    // Steps 6.b-6.e: +0 != -0\n    return a !== 0 || 1 / a === 1 / b;\n  } else {\n    // Step 6.a: NaN == NaN\n    return a !== a && b !== b;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeof Object.is === 'function' ? Object.is : _objectIs);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_objectIs.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduce.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduce.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _reduce\n/* harmony export */ });\n/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isArrayLike.js */ \"./node_modules/ramda/es/internal/_isArrayLike.js\");\n/* harmony import */ var _xwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xwrap.js */ \"./node_modules/ramda/es/internal/_xwrap.js\");\n/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bind.js */ \"./node_modules/ramda/es/bind.js\");\n\n\n\n\nfunction _arrayReduce(xf, acc, list) {\n  var idx = 0;\n  var len = list.length;\n\n  while (idx < len) {\n    acc = xf['@@transducer/step'](acc, list[idx]);\n\n    if (acc && acc['@@transducer/reduced']) {\n      acc = acc['@@transducer/value'];\n      break;\n    }\n\n    idx += 1;\n  }\n\n  return xf['@@transducer/result'](acc);\n}\n\nfunction _iterableReduce(xf, acc, iter) {\n  var step = iter.next();\n\n  while (!step.done) {\n    acc = xf['@@transducer/step'](acc, step.value);\n\n    if (acc && acc['@@transducer/reduced']) {\n      acc = acc['@@transducer/value'];\n      break;\n    }\n\n    step = iter.next();\n  }\n\n  return xf['@@transducer/result'](acc);\n}\n\nfunction _methodReduce(xf, acc, obj, methodName) {\n  return xf['@@transducer/result'](obj[methodName]((0,_bind_js__WEBPACK_IMPORTED_MODULE_0__.default)(xf['@@transducer/step'], xf), acc));\n}\n\nvar symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';\nfunction _reduce(fn, acc, list) {\n  if (typeof fn === 'function') {\n    fn = (0,_xwrap_js__WEBPACK_IMPORTED_MODULE_1__.default)(fn);\n  }\n\n  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__.default)(list)) {\n    return _arrayReduce(fn, acc, list);\n  }\n\n  if (typeof list['fantasy-land/reduce'] === 'function') {\n    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');\n  }\n\n  if (list[symIterator] != null) {\n    return _iterableReduce(fn, acc, list[symIterator]());\n  }\n\n  if (typeof list.next === 'function') {\n    return _iterableReduce(fn, acc, list);\n  }\n\n  if (typeof list.reduce === 'function') {\n    return _methodReduce(fn, acc, list, 'reduce');\n  }\n\n  throw new TypeError('reduce: list must be array or iterable');\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_reduce.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduced.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduced.js ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _reduced\n/* harmony export */ });\nfunction _reduced(x) {\n  return x && x['@@transducer/reduced'] ? x : {\n    '@@transducer/value': x,\n    '@@transducer/reduced': true\n  };\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_reduced.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xany.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xany.js ***!
  \*************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ \"./node_modules/ramda/es/internal/_reduced.js\");\n/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_xfBase.js */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\n\nvar XAny =\n/*#__PURE__*/\nfunction () {\n  function XAny(f, xf) {\n    this.xf = xf;\n    this.f = f;\n    this.any = false;\n  }\n\n  XAny.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__.default.init;\n\n  XAny.prototype['@@transducer/result'] = function (result) {\n    if (!this.any) {\n      result = this.xf['@@transducer/step'](result, false);\n    }\n\n    return this.xf['@@transducer/result'](result);\n  };\n\n  XAny.prototype['@@transducer/step'] = function (result, input) {\n    if (this.f(input)) {\n      this.any = true;\n      result = (0,_reduced_js__WEBPACK_IMPORTED_MODULE_1__.default)(this.xf['@@transducer/step'](result, true));\n    }\n\n    return result;\n  };\n\n  return XAny;\n}();\n\nvar _xany =\n/*#__PURE__*/\n(0,_curry2_js__WEBPACK_IMPORTED_MODULE_2__.default)(function _xany(f, xf) {\n  return new XAny(f, xf);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xany);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_xany.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfBase.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfBase.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  init: function () {\n    return this.xf['@@transducer/init']();\n  },\n  result: function (result) {\n    return this.xf['@@transducer/result'](result);\n  }\n});\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_xfBase.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xmap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xmap.js ***!
  \*************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_xfBase.js */ \"./node_modules/ramda/es/internal/_xfBase.js\");\n\n\n\nvar XMap =\n/*#__PURE__*/\nfunction () {\n  function XMap(f, xf) {\n    this.xf = xf;\n    this.f = f;\n  }\n\n  XMap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__.default.init;\n  XMap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_0__.default.result;\n\n  XMap.prototype['@@transducer/step'] = function (result, input) {\n    return this.xf['@@transducer/step'](result, this.f(input));\n  };\n\n  return XMap;\n}();\n\nvar _xmap =\n/*#__PURE__*/\n(0,_curry2_js__WEBPACK_IMPORTED_MODULE_1__.default)(function _xmap(f, xf) {\n  return new XMap(f, xf);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_xmap);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_xmap.js?");

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xwrap.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xwrap.js ***!
  \**************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ _xwrap\n/* harmony export */ });\nvar XWrap =\n/*#__PURE__*/\nfunction () {\n  function XWrap(fn) {\n    this.f = fn;\n  }\n\n  XWrap.prototype['@@transducer/init'] = function () {\n    throw new Error('init not implemented on XWrap');\n  };\n\n  XWrap.prototype['@@transducer/result'] = function (acc) {\n    return acc;\n  };\n\n  XWrap.prototype['@@transducer/step'] = function (acc, x) {\n    return this.f(acc, x);\n  };\n\n  return XWrap;\n}();\n\nfunction _xwrap(fn) {\n  return new XWrap(fn);\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/internal/_xwrap.js?");

/***/ }),

/***/ "./node_modules/ramda/es/keys.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/keys.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ \"./node_modules/ramda/es/internal/_curry1.js\");\n/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_has.js */ \"./node_modules/ramda/es/internal/_has.js\");\n/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArguments.js */ \"./node_modules/ramda/es/internal/_isArguments.js\");\n\n\n // cover IE < 9 keys issues\n\nvar hasEnumBug = !\n/*#__PURE__*/\n{\n  toString: null\n}.propertyIsEnumerable('toString');\nvar nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug\n\nvar hasArgsEnumBug =\n/*#__PURE__*/\nfunction () {\n  'use strict';\n\n  return arguments.propertyIsEnumerable('length');\n}();\n\nvar contains = function contains(list, item) {\n  var idx = 0;\n\n  while (idx < list.length) {\n    if (list[idx] === item) {\n      return true;\n    }\n\n    idx += 1;\n  }\n\n  return false;\n};\n/**\n * Returns a list containing the names of all the enumerable own properties of\n * the supplied object.\n * Note that the order of the output array is not guaranteed to be consistent\n * across different JS platforms.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @sig {k: v} -> [k]\n * @param {Object} obj The object to extract properties from\n * @return {Array} An array of the object's own properties.\n * @see R.keysIn, R.values\n * @example\n *\n *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']\n */\n\n\nvar keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?\n/*#__PURE__*/\n(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function keys(obj) {\n  return Object(obj) !== obj ? [] : Object.keys(obj);\n}) :\n/*#__PURE__*/\n(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function keys(obj) {\n  if (Object(obj) !== obj) {\n    return [];\n  }\n\n  var prop, nIdx;\n  var ks = [];\n\n  var checkArgsLength = hasArgsEnumBug && (0,_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__.default)(obj);\n\n  for (prop in obj) {\n    if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__.default)(prop, obj) && (!checkArgsLength || prop !== 'length')) {\n      ks[ks.length] = prop;\n    }\n  }\n\n  if (hasEnumBug) {\n    nIdx = nonEnumerableProps.length - 1;\n\n    while (nIdx >= 0) {\n      prop = nonEnumerableProps[nIdx];\n\n      if ((0,_internal_has_js__WEBPACK_IMPORTED_MODULE_2__.default)(prop, obj) && !contains(ks, prop)) {\n        ks[ks.length] = prop;\n      }\n\n      nIdx -= 1;\n    }\n  }\n\n  return ks;\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keys);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/keys.js?");

/***/ }),

/***/ "./node_modules/ramda/es/map.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/map.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ \"./node_modules/ramda/es/internal/_dispatchable.js\");\n/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/_map.js */ \"./node_modules/ramda/es/internal/_map.js\");\n/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce.js */ \"./node_modules/ramda/es/internal/_reduce.js\");\n/* harmony import */ var _internal_xmap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xmap.js */ \"./node_modules/ramda/es/internal/_xmap.js\");\n/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curryN.js */ \"./node_modules/ramda/es/curryN.js\");\n/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keys.js */ \"./node_modules/ramda/es/keys.js\");\n\n\n\n\n\n\n\n/**\n * Takes a function and\n * a [functor](https://github.com/fantasyland/fantasy-land#functor),\n * applies the function to each of the functor's values, and returns\n * a functor of the same shape.\n *\n * Ramda provides suitable `map` implementations for `Array` and `Object`,\n * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.\n *\n * Dispatches to the `map` method of the second argument, if present.\n *\n * Acts as a transducer if a transformer is given in list position.\n *\n * Also treats functions as functors and will compose them together.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Functor f => (a -> b) -> f a -> f b\n * @param {Function} fn The function to be called on every element of the input `list`.\n * @param {Array} list The list to be iterated over.\n * @return {Array} The new list.\n * @see R.transduce, R.addIndex\n * @example\n *\n *      const double = x => x * 2;\n *\n *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]\n *\n *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}\n * @symb R.map(f, [a, b]) = [f(a), f(b)]\n * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }\n * @symb R.map(f, functor_o) = functor_o.map(f)\n */\n\nvar map =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(\n/*#__PURE__*/\n(0,_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__.default)(['fantasy-land/map', 'map'], _internal_xmap_js__WEBPACK_IMPORTED_MODULE_2__.default, function map(fn, functor) {\n  switch (Object.prototype.toString.call(functor)) {\n    case '[object Function]':\n      return (0,_curryN_js__WEBPACK_IMPORTED_MODULE_3__.default)(functor.length, function () {\n        return fn.call(this, functor.apply(this, arguments));\n      });\n\n    case '[object Object]':\n      return (0,_internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__.default)(function (acc, key) {\n        acc[key] = fn(functor[key]);\n        return acc;\n      }, {}, (0,_keys_js__WEBPACK_IMPORTED_MODULE_5__.default)(functor));\n\n    default:\n      return (0,_internal_map_js__WEBPACK_IMPORTED_MODULE_6__.default)(fn, functor);\n  }\n}));\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (map);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/map.js?");

/***/ }),

/***/ "./node_modules/ramda/es/nth.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/nth.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString.js */ \"./node_modules/ramda/es/internal/_isString.js\");\n\n\n/**\n * Returns the nth element of the given list or string. If n is negative the\n * element at index length + n is returned.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category List\n * @sig Number -> [a] -> a | Undefined\n * @sig Number -> String -> String\n * @param {Number} offset\n * @param {*} list\n * @return {*}\n * @example\n *\n *      const list = ['foo', 'bar', 'baz', 'quux'];\n *      R.nth(1, list); //=> 'bar'\n *      R.nth(-1, list); //=> 'quux'\n *      R.nth(-99, list); //=> undefined\n *\n *      R.nth(2, 'abc'); //=> 'c'\n *      R.nth(3, 'abc'); //=> ''\n * @symb R.nth(-1, [a, b, c]) = c\n * @symb R.nth(0, [a, b, c]) = a\n * @symb R.nth(1, [a, b, c]) = b\n */\n\nvar nth =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function nth(offset, list) {\n  var idx = offset < 0 ? list.length + offset : offset;\n  return (0,_internal_isString_js__WEBPACK_IMPORTED_MODULE_1__.default)(list) ? list.charAt(idx) : list[idx];\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nth);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/nth.js?");

/***/ }),

/***/ "./node_modules/ramda/es/path.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/path.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paths.js */ \"./node_modules/ramda/es/paths.js\");\n\n\n/**\n * Retrieve the value at a given path.\n *\n * @func\n * @memberOf R\n * @since v0.2.0\n * @category Object\n * @typedefn Idx = String | Int\n * @sig [Idx] -> {a} -> a | Undefined\n * @param {Array} path The path to use.\n * @param {Object} obj The object to retrieve the nested property from.\n * @return {*} The data at `path`.\n * @see R.prop, R.nth\n * @example\n *\n *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2\n *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined\n *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1\n *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2\n */\n\nvar path =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function path(pathAr, obj) {\n  return (0,_paths_js__WEBPACK_IMPORTED_MODULE_1__.default)([pathAr], obj)[0];\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (path);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/path.js?");

/***/ }),

/***/ "./node_modules/ramda/es/paths.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/paths.js ***!
  \****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger.js */ \"./node_modules/ramda/es/internal/_isInteger.js\");\n/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ \"./node_modules/ramda/es/nth.js\");\n\n\n\n/**\n * Retrieves the values at given paths of an object.\n *\n * @func\n * @memberOf R\n * @since v0.27.1\n * @category Object\n * @typedefn Idx = [String | Int]\n * @sig [Idx] -> {a} -> [a | Undefined]\n * @param {Array} pathsArray The array of paths to be fetched.\n * @param {Object} obj The object to retrieve the nested properties from.\n * @return {Array} A list consisting of values at paths specified by \"pathsArray\".\n * @see R.path\n * @example\n *\n *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]\n *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]\n */\n\nvar paths =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function paths(pathsArray, obj) {\n  return pathsArray.map(function (paths) {\n    var val = obj;\n    var idx = 0;\n    var p;\n\n    while (idx < paths.length) {\n      if (val == null) {\n        return;\n      }\n\n      p = paths[idx];\n      val = (0,_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__.default)(p) ? (0,_nth_js__WEBPACK_IMPORTED_MODULE_2__.default)(p, val) : val[p];\n      idx += 1;\n    }\n\n    return val;\n  });\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paths);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/paths.js?");

/***/ }),

/***/ "./node_modules/ramda/es/prop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/prop.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ \"./node_modules/ramda/es/internal/_curry2.js\");\n/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ \"./node_modules/ramda/es/path.js\");\n\n\n/**\n * Returns a function that when supplied an object returns the indicated\n * property of that object, if it exists.\n *\n * @func\n * @memberOf R\n * @since v0.1.0\n * @category Object\n * @typedefn Idx = String | Int\n * @sig Idx -> {s: a} -> a | Undefined\n * @param {String|Number} p The property name or array index\n * @param {Object} obj The object to query\n * @return {*} The value at `obj.p`.\n * @see R.path, R.nth\n * @example\n *\n *      R.prop('x', {x: 100}); //=> 100\n *      R.prop('x', {}); //=> undefined\n *      R.prop(0, [100]); //=> 100\n *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4\n */\n\nvar prop =\n/*#__PURE__*/\n(0,_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__.default)(function prop(p, obj) {\n  return (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.default)([p], obj);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prop);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/prop.js?");

/***/ }),

/***/ "./node_modules/ramda/es/remove.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/remove.js ***!
  \*****************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ \"./node_modules/ramda/es/internal/_curry3.js\");\n\n/**\n * Removes the sub-list of `list` starting at index `start` and containing\n * `count` elements. _Note that this is not destructive_: it returns a copy of\n * the list with the changes.\n * <small>No lists have been harmed in the application of this function.</small>\n *\n * @func\n * @memberOf R\n * @since v0.2.2\n * @category List\n * @sig Number -> Number -> [a] -> [a]\n * @param {Number} start The position to start removing elements\n * @param {Number} count The number of elements to remove\n * @param {Array} list The list to remove from\n * @return {Array} A new Array with `count` elements from `start` removed.\n * @see R.without\n * @example\n *\n *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]\n */\n\nvar remove =\n/*#__PURE__*/\n(0,_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__.default)(function remove(start, count, list) {\n  var result = Array.prototype.slice.call(list, 0);\n  result.splice(start, count);\n  return result;\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (remove);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/remove.js?");

/***/ }),

/***/ "./node_modules/ramda/es/type.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/type.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ \"./node_modules/ramda/es/internal/_curry1.js\");\n\n/**\n * Gives a single-word string description of the (native) type of a value,\n * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not\n * attempt to distinguish user Object types any further, reporting them all as\n * 'Object'.\n *\n * @func\n * @memberOf R\n * @since v0.8.0\n * @category Type\n * @sig (* -> {*}) -> String\n * @param {*} val The value to test\n * @return {String}\n * @example\n *\n *      R.type({}); //=> \"Object\"\n *      R.type(1); //=> \"Number\"\n *      R.type(false); //=> \"Boolean\"\n *      R.type('s'); //=> \"String\"\n *      R.type(null); //=> \"Null\"\n *      R.type([]); //=> \"Array\"\n *      R.type(/[A-z]/); //=> \"RegExp\"\n *      R.type(() => {}); //=> \"Function\"\n *      R.type(undefined); //=> \"Undefined\"\n */\n\nvar type =\n/*#__PURE__*/\n(0,_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__.default)(function type(val) {\n  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (type);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/ramda/es/type.js?");

/***/ }),

/***/ "./node_modules/static-sum-type/modules/fold/index.js":
/*!************************************************************!*\
  !*** ./node_modules/static-sum-type/modules/fold/index.js ***!
  \************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, module */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var nFold = __webpack_require__(/*! ../yslashn/index.js */ \"./node_modules/static-sum-type/modules/yslashn/index.js\").nFold\nvar Skip = {\n  length: true\n  ,prototype: true\n  ,name: true\n}\n\nfunction assertValidType(context, T){\n    if( !(T != null && typeof T.name == 'string') ){\n        return handleError(\n            Err.NotAType({ context:context, T:T })\n        )\n    }\n}\n\nfunction assertValidCase(T, caseInstance){\n    if ( !(\n        caseInstance != null \n        && caseInstance.type == T.name \n        && caseInstance.case in T \n    )) {\n        return handleError(\n            Err.InstanceShapeInvalid({\n                x: caseInstance\n                ,T: T\n            })\n        )\n    }\n}\n\nfunction assertValidVisitor(o){\n    if( typeof o.visitor != 'function' ){\n        return handleError(\n            Err.VisitorNotAFunction({ context: o.context, visitor: o.visitor })\n        )\n    }\n}\n\nfunction I(a){\n    return a\n}\n\nfunction getCases(T){\n    return Object.getOwnPropertyNames(T)\n        .filter(function(o){\n            return o[0] == o[0].toUpperCase()\n        })\n        .filter(function(x){\n            return !(x in Skip)\n        })\n}\n\nfunction toString(x){\n  if( x == null ){\n    return 'null'\n  } else if( x.type && x.case ){\n    return x.case\n      +'('\n        + (\n          'value' in x\n          ? toString(x.value)\n          : ''\n        )\n\n      +')::'\n      +x.type\n  } else {\n    return x.toString()\n  }\n}\n\nvar StaticSumTypeError = nFold('StaticSumTypeError', [\n    'TooManyCases'\n    ,'TooFewCases'\n    ,'InstanceNull'\n    ,'InstanceWrongType'\n    ,'InstanceShapeInvalid'\n    ,'TooManyArguments'\n    ,'BifoldNotInferrable'\n    ,'NotACaseConstructor'\n    ,'VisitorNotAFunction'\n    ,'MapEmptyCase'\n    ,'NotAType'\n])\n\nvar ErrMessageCases =\n    { TooManyCases: function TooManyCases(o){\n        return (\n            [ 'Your case function must have exactly the same'\n            , ' keys as the type: '+o.T.name+'. '\n            , 'The following cases should not have been present:'\n            , o.extraKeys.join(', ')\n            ].join(' ')\n        )\n    }\n    ,BifoldNotInferrable: function(o){\n        return (\n            'You can only bifold when a Type\\'s case count=2'\n            +' but '+o.T.name+' has '+getCases(o.T).length+': '\n            + getCases(o.T).join(' | ')\n        )\n    }\n    ,TooFewCases: function TooFewCases(o){\n        return (\n            [ 'Your case function must have exactly the same'\n            , 'keys as the type: ' + o.T.name + '. The following keys were'\n            , 'missing:'\n            , o.missingKeys.join(', ')\n            ]\n        )\n        .join(' ')\n    }\n\n    ,InstanceNull: function InstanceNull(o){\n        return (\n            'Null is not a valid member of the type '+o.T.name\n        )\n    }\n\n    ,InstanceWrongType: function InstanceWrongType(o){\n        return (\n            [ toString(o.x)+' is not a valid member of the type'\n            , o.T.name\n            , 'which expects the following cases'\n            , getCases(o.T).join(' | ')\n            ]\n        )\n        .join(' ')\n    }\n\n    ,InstanceShapeInvalid: function InstanceShapeInvalid(o){\n        return [\n            toString(o.x)\n            , 'is not a valid Member of the type:'\n            , o.T.name+'. '\n            ,'Please review the definition of '+o.T.name\n        ]\n        .join(' ')\n    }\n\n    ,TooManyArguments: function TooManyArguments(args){\n        return 'fold accepts 1 argument at a time but received'\n            + ' '+args.length+'.'\n            + '  Received: '+Array.from(args).map(toString).join(' ')\n    }\n    ,NotACaseConstructor: function NotACaseConstructor(o){\n        return o.context + ' expected a function that returns a case object'\n            + ' but instead received '+toString(o.caseConstructor)\n    }\n    ,VisitorNotAFunction: function(o){\n        return o.context + ' expected a visitor function '\n            + ' but instead received '+toString(o.visitor)\n    }\n    ,MapEmptyCase: function(o){\n        return o.context + ' cannot map over a case that does not have a value:'\n            + ' ' +toString(o.instance)\n    }\n    ,NotAType: function(o){\n        return o.context + ' expected a Type ({ name: string ...caseNames })'\n            + ' but received '+toString(o.T)\n    }\n    }\n\n\nvar Err = StaticSumTypeError\n\nfunction handleError(err){\n\n    var e = new Error(err.case+': '+errMessage(err))\n    e.case = err\n    throw e\n}\n\nfunction fold(T){\n\n    if( arguments.length > 1 ){\n        return handleError(\n            Err.TooManyArguments(arguments)\n        )\n    } else {\n\n        return function devCata$T(cases){\n            if( arguments.length > 1 ){\n                return handleError(\n                    Err.TooManyArguments(arguments)\n                )\n            } else {\n\n                var caseKeys =\n                    getCases(cases)\n\n                var tKeys =\n                    getCases(T)\n\n\n                var xKeys = [\n                    [caseKeys, T]\n                    ,[tKeys, cases]\n                ]\n                .map(\n                    function(t){\n                        var xs = t[0]\n                        var index = t[1]\n                        return xs.filter(function(x){\n                            return !(x in index)\n                        })\n                    }\n                )\n\n                var extraKeys = xKeys[0]\n                var missingKeys = xKeys[1]\n\n                if( missingKeys.length > 0 ){\n                    return handleError(\n                        Err.TooFewCases({T:T, cases:cases, missingKeys: missingKeys})\n                    )\n                } else if (extraKeys.length > 0){\n                    return handleError(\n                        Err.TooManyCases({T:T, cases:cases, extraKeys:extraKeys})\n                    )\n                } else {\n                    return function(x){\n\n                        return (\n                            arguments.length > 1\n                            ? handleError(\n                                Err.TooManyArguments(arguments)\n                            )\n                            : x == null\n                                ? handleError(\n                                    Err.InstanceNull({\n                                        T:T, cases:cases, x:x\n                                    })\n                                )\n                            : x.type !== T.name\n                                ? handleError(\n                                    Err.InstanceWrongType({\n                                        T:T, cases:cases, x:x\n                                    })\n                                )\n                            : !( x.case in T )\n                                ? handleError(\n                                    Err.InstanceShapeInvalid({\n                                        T:T, cases:cases, x:x\n                                    })\n                                )\n                                : cases[x.case](x.value)\n                        )\n                    }\n                }\n            }\n        }\n\n    }\n}\n\nvar errMessage =\n    fold(StaticSumTypeError)(ErrMessageCases)\n\n\nfunction bifold(T){\n    var caseNames =\n        getCases(T)\n    \n    if( caseNames.length != 2 ){\n        return handleError(   \n            Err.BifoldNotInferrable({\n                T: T\n            })\n        )\n    }\n\n    return function bifold$T(fb, fa){\n\n        // reverse because its customary to fold the failure first\n        var ks = caseNames.slice().reverse()\n        var kb = ks[0]\n        var ka = ks[1]\n\n        var cases = {}\n        cases[ka] = fa\n        cases[kb] = fb\n        return fold (T) (cases)\n    }\n}\n\nfunction bimap(T){\n    return function bimap$T(fb, fa){\n        return function(Ta){\n            return bifold (T)(\n                function(b){ \n                    return { case: Ta.case, type: T.name, value: fb(b) }\n                }\n                ,function(a){ \n                    return { case: Ta.case, type: T.name, value: fa(a) }\n                } \n            )(Ta)\n        }\n    }\n}\n\nfunction map(T){\n    return function bimap$T(fa){\n        return bimap (T) (I, fa)\n    }\n}\n\n// mapCase ( Loaded.Y ) ( x => x * 100 )\nfunction mapCase(caseConstructor){\n\n    var f = foldCase (caseConstructor)\n    return function mapCase$caseConstructor(visitor){\n        var otherwise = {}\n        var g = f(otherwise, visitor)\n        return function mapCase$visitor(Ma){\n\n            var value = g(Ma)\n            \n            \n            if ( value == otherwise ){\n                return Ma\n            } else if ( 'value' in Ma ) {\n                return { case: Ma.case, value: value, type: Ma.type }\n            } else {\n                handleError(\n                    Err.MapEmptyCase({ context: mapCase.name, instance: Ma })\n                )\n            }\n        }\n    }\n}\n\n// mapCase ( Loaded.Y ) ( x => x * 100 )\nfunction foldCase(caseConstructor){\n    \n    var err = Err.NotACaseConstructor({\n        caseConstructor: caseConstructor\n        ,context: mapCase.name\n    })\n    \n    \n    if( typeof caseConstructor != 'function' ){\n        return handleError( err )\n    }\n    \n    var out = caseConstructor() || {}\n    var T = { name: out.name }\n\n    if ( !( typeof out.case == 'string' && typeof out.type == 'string') ){\n        return handleError( err )\n    }\n\n    return function foldCase$caseConstructor(otherwise, visitor){\n        assertValidVisitor({ context: foldCase.name, visitor: visitor })\n\n        return function foldCase$visitor(Ma){\n            if ( Ma == null ){\n                return handleError(\n                    Err.InstanceNull({ T:T })\n                )\n\n            } else if ( Ma.type != out.type ){\n    \n                var cases = {}\n                cases[out.case] = true\n                return handleError(\n                    Err.InstanceWrongType({\n                        T:T, cases:cases, x:Ma\n                    })\n                )\n            } else if (Ma.case != out.case ) {\n                return otherwise\n            } else {\n                return visitor ( Ma.value )\n            }\n        }\n    }\n}\n\n\nfunction chain(T){\n    \n    assertValidType('chain', T)\n\n    return function chain$T( f ){\n        \n        assertValidVisitor({ context: chain.name, visitor: f })\n\n        return function chain$f( Ma ){\n            \n            assertValidCase( T, Ma )\n\n            var Ma2 = 'value' in Ma \n                ? f( Ma.value )\n                : Ma\n\n            assertValidCase( T, Ma2 )\n\n            return Ma2\n        }\n    }\n}\n\nmodule.exports = {\n    fold: fold\n    ,bifold: bifold\n    ,bimap: bimap\n    ,map: map\n    ,chain: chain\n    ,mapCase: mapCase\n    ,foldCase: foldCase\n    ,errMessage: errMessage\n    ,StaticSumTypeError: StaticSumTypeError\n}\n\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/static-sum-type/modules/fold/index.js?");

/***/ }),

/***/ "./node_modules/static-sum-type/modules/yslashn/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/static-sum-type/modules/yslashn/index.js ***!
  \***************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("function either(type){\r\n\treturn {\r\n\t\tname: type\r\n\t\t,Y: function Y(value){\r\n\t\t\treturn { type: type, case: 'Y', value: value }\r\n\t\t}\r\n\t\t,N: function N(value){\r\n\t\t\treturn { type: type, case: 'N', value: value }\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction maybe(type){\r\n\treturn {\r\n\t\tname: type\r\n\t\t,Y: function Y(value){\r\n\t\t\treturn { type: type, case: 'Y', value: value }\r\n\t\t}\r\n\t\t,N: function N(){\r\n\t\t\treturn { type: type, case: 'N' }\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction nFold(type, cases){\r\n\treturn cases.reduce(function(p, k){\r\n\r\n\t\t// eslint-disable-next-line fp/no-mutation\r\n\t\tp[k] = function(value) {\r\n\t\t\treturn {\r\n\t\t\t\tcase: k\r\n\t\t\t\t,type: type\r\n\t\t\t\t,value: value\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn p\r\n\t}, { name: type })\r\n}\r\n\r\nmodule.exports = {\r\n\teither: either\r\n\t,maybe: maybe\r\n\t,nFold: nFold\r\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/static-sum-type/modules/yslashn/index.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ rng\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n// find the complete implementation of crypto (msCrypto) on IE11.\nvar getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  if (!getRandomValues) {\n    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.default)(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n // **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\n\nvar _clockseq; // Previous uuid creation time\n\n\nvar _lastMSecs = 0;\nvar _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details\n\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || new Array(16);\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n\n  if (node == null || clockseq == null) {\n    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n    }\n\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n\n\n  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)\n\n  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression\n\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n\n\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  } // Per 4.2.1.2 Throw error if too many uuids are requested\n\n\n  if (nsecs >= 10000) {\n    throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\");\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n\n  msecs += 12219292800000; // `time_low`\n\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff; // `time_mid`\n\n  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff; // `time_high_and_version`\n\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n\n  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n\n  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`\n\n  b[i++] = clockseq & 0xff; // `node`\n\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf || (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.default)(b);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/uuid/dist/esm-browser/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__.default.test(uuid);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://random-gif-nested/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;