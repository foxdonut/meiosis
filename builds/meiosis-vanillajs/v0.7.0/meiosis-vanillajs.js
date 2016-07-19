(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["meiosisVanillaJs"] = factory();
	else
		root["meiosisVanillaJs"] = factory();
})(this, function() {
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
	var meiosis_render_1 = __webpack_require__(2);
	function intoElement(element) {
	    return function (model, rootComponent) {
	        element.innerHTML = rootComponent(model);
	        return element;
	    };
	}
	function on(target, type, handler, useCapture) {
	    target.addEventListener(type, handler, !!useCapture);
	}
	function dispatchEvent(target, selector, handler) {
	    return function (evt) {
	        var targetElement = evt.target;
	        var potentialElements = target.querySelectorAll(selector);
	        var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
	        if (hasMatch) {
	            handler.call(targetElement, evt);
	        }
	    };
	}
	;
	function delegate(target, selector, type, handler) {
	    on(target, type, dispatchEvent(target, selector, handler), type === "blur" || type === "focus");
	}
	function meiosisVanillaJsRender() {
	    return meiosis_render_1.meiosisRender(intoElement);
	}
	function renderer() {
	    var render = meiosisVanillaJsRender();
	    render.on = on;
	    render.delegate = delegate;
	    return render;
	}
	exports.renderer = renderer;
	;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));
	//# sourceMappingURL=index.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function meiosisRender(intoElement) {
	    var intoId = function (doc, id) {
	        return intoElement(doc.getElementById(id));
	    };
	    var intoSelector = function (doc, selector) {
	        return intoElement(doc.querySelector(selector));
	    };
	    return {
	        intoElement: intoElement,
	        intoId: intoId,
	        intoSelector: intoSelector
	    };
	}
	exports.meiosisRender = meiosisRender;
	//# sourceMappingURL=meiosis-render.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=meiosis-vanillajs.js.map