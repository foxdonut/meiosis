(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["meiosisReact"] = factory(require("ReactDOM"));
	else
		root["meiosisReact"] = factory(root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var react_dom_1 = __webpack_require__(2);
	var meiosis_render_1 = __webpack_require__(3);
	function intoElement(element) {
	    return function (model, rootComponent) {
	        return react_dom_1.render(rootComponent(model), element);
	    };
	}
	function renderer() {
	    return meiosis_render_1.meiosisRender(intoElement);
	}
	exports.renderer = renderer;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

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
/******/ ])
});
;
//# sourceMappingURL=meiosis-react.js.map