(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("InfernoDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["InfernoDOM"], factory);
	else if(typeof exports === 'object')
		exports["meiosisInferno"] = factory(require("InfernoDOM"));
	else
		root["meiosisInferno"] = factory(root["InfernoDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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