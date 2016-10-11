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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var wire_1 = __webpack_require__(2);
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
	    function createComponent(config) {
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
	    }
	    ;
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
	            var result = render(model, rootComponent);
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


/***/ },
/* 2 */
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=meiosis.js.map