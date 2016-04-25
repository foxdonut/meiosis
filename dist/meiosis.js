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
	var meiosis_1 = __webpack_require__(1);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = meiosis_1.meiosis;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var merge_1 = __webpack_require__(2);
	var wire_1 = __webpack_require__(3);
	var meiosis = function (adapters) {
	    var allReceivers = [];
	    var wire = adapters.wire || wire_1.defaultWire;
	    var rootWire = wire("meiosis");
	    var merge = adapters.merge || merge_1.defaultMerge;
	    var rootModel = {};
	    var createComponent = function (config) {
	        if (!config || !config.view) {
	            throw new Error("At a minimum, you need to specify a view to create a component.");
	        }
	        rootModel = merge(rootModel, config.initialModel || {});
	        var componentWire = wire();
	        var next = componentWire.emit;
	        var nextAction = { next: next };
	        var actions = config.actions ? merge(nextAction, config.actions(next)) : nextAction;
	        var receivers = config.receivers;
	        if (receivers && Array === receivers.constructor) {
	            Array.prototype.push.apply(allReceivers, receivers);
	        }
	        componentWire.listen(function (update) {
	            var updateTr = config.transform ? config.transform(rootModel, update) : update;
	            allReceivers.forEach(function (receiver) {
	                rootModel = receiver(rootModel, updateTr);
	                return rootModel;
	            });
	            rootWire.emit(rootModel);
	            if (config.chain) {
	                config.chain(update, actions);
	            }
	        });
	        return function (props) { props.actions = actions; return config.view(props); };
	    };
	    var run = function (root) {
	        if (allReceivers.length === 0) {
	            allReceivers.push(merge);
	        }
	        var renderRoot = function (model) { adapters.render(root({ model: model })); };
	        rootWire.listen(renderRoot);
	        rootWire.emit(rootModel);
	        return renderRoot;
	    };
	    return { createComponent: createComponent, run: run };
	};
	exports.meiosis = meiosis;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var defaultMerge = function (target, source) {
	    if (target === undefined || target === null) {
	        throw new TypeError("Cannot convert undefined or null to object");
	    }
	    var output = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	        var source_1 = arguments[index];
	        if (source_1 !== undefined && source_1 !== null) {
	            for (var nextKey in source_1) {
	                if (source_1.hasOwnProperty(nextKey)) {
	                    output[nextKey] = source_1[nextKey];
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
	var defaultWire = (function () {
	    var wires = {};
	    var nextWireId = 1;
	    var createWire = function () {
	        var listener = null;
	        var listen = function (lstnr) { return listener = lstnr; };
	        var emit = function (data) { return listener(data); };
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
	})();
	exports.defaultWire = defaultWire;


/***/ }
/******/ ]);