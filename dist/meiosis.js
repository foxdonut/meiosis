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
	var nextId = 1;
	var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
	function newInstance() {
	    var allInitialModels = [];
	    var allStates = [];
	    var allReceives = [];
	    var allReadies = [];
	    var allPostRenders = [];
	    var allNextActions = [];
	    var createRootWire = wire_1.defaultWireCreator();
	    var createComponentWire = wire_1.defaultWireCreator();
	    var rootWire = createRootWire("meiosis_" + (nextId++));
	    var componentWire = createComponentWire();
	    var propose = componentWire.emit;
	    function createComponent(config) {
	        if (!config || (!config.actions &&
	            !config.nextAction &&
	            !config.initialModel &&
	            !config.ready &&
	            !config.receive &&
	            !config.state &&
	            !config.view &&
	            !config.postRender)) {
	            throw new Error("Please specify a config when calling createComponent.");
	        }
	        var initialModel = config.initialModel;
	        if (initialModel) {
	            if (typeof initialModel !== "function") {
	                throw new Error("initialModel in createComponent must be a function. You can pass the root initialModel object to the run function.");
	            }
	            allInitialModels.push(initialModel);
	        }
	        var state = config.state;
	        if (state) {
	            allStates.push(state);
	        }
	        var hasActions = !!config.actions;
	        var actions = hasActions ? config.actions(propose) : null;
	        var actionsOrPropose = hasActions ? actions : propose;
	        var receive = config.receive;
	        if (receive) {
	            allReceives.push(receive);
	        }
	        var ready = config.ready;
	        if (ready) {
	            allReadies.push(function () { return ready(actionsOrPropose); });
	        }
	        var postRender = config.postRender;
	        if (postRender) {
	            allPostRenders.push(postRender);
	        }
	        var nextAction = config.nextAction;
	        if (nextAction) {
	            allNextActions.push(function (model, proposal) {
	                var context = { model: model, proposal: proposal };
	                if (hasActions) {
	                    context.actions = actions;
	                }
	                else {
	                    context.propose = propose;
	                }
	                nextAction(context);
	            });
	        }
	        return function (state) {
	            return config.view ? config.view(state, actionsOrPropose) : undefined;
	        };
	    }
	    ;
	    var run = function (runConfig) {
	        var rootModel = runConfig.initialModel || {};
	        allInitialModels.forEach(function (initialModel) { return rootModel = initialModel(rootModel); });
	        var rootState = runConfig.state || (function (model) { return model; });
	        allStates.forEach(function (stateFunction) {
	            var prevState = rootState;
	            rootState = function (model, state) { return stateFunction(model, prevState(model)); };
	        });
	        componentWire.listen(function (proposal) {
	            for (var i = 0; i < allReceives.length; i++) {
	                var receive = allReceives[i];
	                var received = receive(rootModel, proposal);
	                rootModel = received;
	            }
	            ;
	            rootWire.emit(rootModel);
	            allNextActions.forEach(function (nextAction) { return nextAction(rootModel, proposal); });
	        });
	        var renderRoot_ = function (state) {
	            var result = runConfig.renderer(state, runConfig.rootComponent);
	            allPostRenders.forEach(function (postRender) { return postRender(state); });
	            return result;
	        };
	        renderRoot_.initialModel = rootModel;
	        renderRoot_.state = rootState;
	        var renderRoot = renderRoot_;
	        rootWire.listen(function (model) { return renderRoot(rootState(model)); });
	        rootWire.emit(rootModel);
	        allReadies.forEach(function (ready) { return ready(); });
	        var devtool = window && window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"];
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
	                    renderRoot(evt.data.state);
	                }
	                else if (evt.data.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
	                    window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: initialModel_1 }, "*");
	                    devtoolInitialized_1 = true;
	                    for (var i = 0; i < bufferedReceives_1.length; i++) {
	                        var _a = bufferedReceives_1[i], model = _a.model, proposal = _a.proposal;
	                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
	                    }
	                }
	                else if (evt.data.type === "MEIOSIS_REQUEST_STATE") {
	                    var state = renderRoot.state(evt.data.model);
	                    var ts = evt.data.ts;
	                    window.postMessage({ type: "MEIOSIS_STATE", state: state, ts: ts }, "*");
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
	exports.newInstance = newInstance;
	var instance = newInstance();
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