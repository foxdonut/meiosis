(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["meiosis"] = factory();
	else
		root["meiosis"] = factory();
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
	__export(__webpack_require__(2));
	__export(__webpack_require__(3));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var merge_1 = __webpack_require__(2);
	var wire_1 = __webpack_require__(3);
	var REFUSE_UPDATE = {};
	exports.REFUSE_UPDATE = REFUSE_UPDATE;
	function init(adapters) {
	    var allReceiveUpdates = [];
	    var allReadies = [];
	    var allPostRenders = [];
	    var allNextUpdates = [];
	    var createRootWire = adapters.rootWire || wire_1.defaultWireCreator();
	    var createComponentWire = adapters.componentWire || wire_1.defaultWireCreator();
	    var rootWire = createRootWire("meiosis");
	    var componentWire = createComponentWire();
	    var sendUpdate = componentWire.emit;
	    var sendUpdateActions = { sendUpdate: sendUpdate };
	    var merge = adapters.merge || merge_1.defaultMerge;
	    var rootModel = null;
	    var createComponent = function (config) {
	        if (!config || (!config.actions &&
	            !config.nextUpdate &&
	            !config.initialModel &&
	            !config.ready &&
	            !config.receiveUpdate &&
	            !config.view)) {
	            throw new Error("Please specify a config when calling createComponent.");
	        }
	        var initialModel = config.initialModel || {};
	        rootModel = (rootModel === null) ? initialModel : merge(rootModel, initialModel);
	        var actions = config.actions ? merge(sendUpdateActions, config.actions(sendUpdate)) : sendUpdateActions;
	        var receiveUpdate = config.receiveUpdate;
	        if (receiveUpdate) {
	            allReceiveUpdates.push(receiveUpdate);
	        }
	        var ready = config.ready;
	        if (ready) {
	            allReadies.push(function () { return ready(actions); });
	        }
	        var postRender = config.postRender;
	        if (postRender) {
	            allPostRenders.push(postRender);
	        }
	        var nextUpdate = config.nextUpdate;
	        if (nextUpdate) {
	            allNextUpdates.push(function (model, update) { return nextUpdate(model, update, actions); });
	        }
	        return function (model) {
	            return config.view && config.view(model, actions) || undefined;
	        };
	    };
	    var run = function (root) {
	        if (allReceiveUpdates.length === 0) {
	            allReceiveUpdates.push(merge);
	        }
	        componentWire.listen(function (update) {
	            var accepted = true;
	            for (var i = 0; i < allReceiveUpdates.length; i++) {
	                var receiveUpdate = allReceiveUpdates[i];
	                var receivedUpdate = receiveUpdate(rootModel, update);
	                if (receivedUpdate === REFUSE_UPDATE) {
	                    accepted = false;
	                    break;
	                }
	                else {
	                    rootModel = receivedUpdate;
	                }
	            }
	            ;
	            if (accepted) {
	                rootWire.emit(rootModel);
	                allNextUpdates.forEach(function (nextUpdate) { return nextUpdate(rootModel, update); });
	            }
	        });
	        var renderRoot = function (model) {
	            var rootView = root(model);
	            adapters.render(rootView);
	            allPostRenders.forEach(function (postRender) { return postRender(rootView); });
	        };
	        rootWire.listen(renderRoot);
	        rootWire.emit(rootModel);
	        allReadies.forEach(function (ready) { return ready(); });
	        return renderRoot;
	    };
	    var meiosisInstance = {
	        createComponent: createComponent,
	        run: run
	    };
	    return meiosisInstance;
	}
	exports.init = init;
	;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var defaultMerge = function (target) {
	    var sources = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        sources[_i - 1] = arguments[_i];
	    }
	    if (target === undefined || target === null) {
	        throw new TypeError("Cannot convert undefined or null to object");
	    }
	    var output = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        if (source !== undefined && source !== null) {
	            for (var nextKey in source) {
	                if (source.hasOwnProperty(nextKey)) {
	                    output[nextKey] = source[nextKey];
	                }
	            }
	        }
	    }
	    return output;
	};
	exports.defaultMerge = defaultMerge;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function defaultWireCreator() {
	    var wires = {};
	    var nextWireId = 1;
	    var createWire = function () {
	        var listener = null;
	        var listen = function (lstnr) { return listener = lstnr; };
	        var emit = function (update) { return listener(update); };
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=meiosis.js.map