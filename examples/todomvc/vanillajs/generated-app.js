/******/ (function(modules) { // webpackBootstrap
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisVanillaJs, runapp) {
	      return root.vanillaJsApp = factory(meiosisVanillaJs, runapp);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.vanillaJsApp = factory(require("meiosis-vanillajs"), require("./runapp"));
	  } else {
	    root.vanillaJsApp = factory(root.meiosisVanillaJs, root.runapp);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisVanillaJs, runapp) {
	  runapp(meiosisVanillaJs);
	});

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
	//# sourceMappingURL=meiosis-vanillajs.js.map

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(8), __webpack_require__(9), __webpack_require__(16), __webpack_require__(83)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, meiosisTracer, Type, rootComponent, todoStorage) {
	      return root.runapp = factory(meiosis, meiosisTracer, Type, rootComponent, todoStorage);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.runapp = factory(require("meiosis"), require("meiosis-tracer"), require("union-type"), require("./root/component"), require("../common/store"));
	  } else {
	    root.runapp = factory(root.meiosis, root.meiosisTracer, root.unionType, root.rootComponent, root.todoStorage);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, meiosisTracer, Type, rootComponent, todoStorage) {
	  return function (meiosisRender) {
	    Type.check = false;
	
	    var root = rootComponent(todoStorage);
	    var renderRoot = meiosis.run(meiosisRender.renderer().intoId(document, "app"), root);
	    meiosisTracer(meiosis.createComponent, renderRoot, "#tracer");
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	//# sourceMappingURL=index.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var wire_1 = __webpack_require__(7);
	var REFUSE_PROPOSAL = {};
	exports.REFUSE_PROPOSAL = REFUSE_PROPOSAL;
	var nextId = 1;
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
	    var createComponent = function (config) {
	        if (!config || (!config.actions &&
	            !config.nextAction &&
	            !config.initialModel &&
	            !config.ready &&
	            !config.receive &&
	            !config.view)) {
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
	    };
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
	            var result = render(model, rootComponent, propose);
	            allPostRenders.forEach(function (postRender) { return postRender(); });
	            return result;
	        };
	        renderRoot_.initialModel = rootModel;
	        var renderRoot = renderRoot_;
	        rootWire.listen(renderRoot);
	        rootWire.emit(rootModel);
	        allReadies.forEach(function (ready) { return ready(); });
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
	//# sourceMappingURL=meiosis.js.map

/***/ },
/* 7 */
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
	//# sourceMappingURL=wire.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
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
		
		var _meiosisTracer = __webpack_require__(1);
		
		module.exports = _meiosisTracer.meiosisTracer;
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.meiosisTracer = undefined;
		
		var _model = __webpack_require__(2);
		
		var _view = __webpack_require__(3);
		
		var _receive = __webpack_require__(5);
		
		var _receive2 = _interopRequireDefault(_receive);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var tracerModel = _model.initialModel;
		
		var meiosisTracer = function meiosisTracer(createComponent, renderRoot, selector) {
		  var receiver = (0, _receive2.default)(tracerModel, _view.proposalView);
		  createComponent({
		    receive: receiver
		  });
		  (0, _view.initialView)(selector, renderRoot, tracerModel);
		  receiver(renderRoot.initialModel, "initialModel");
		};
		
		exports.meiosisTracer = meiosisTracer;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var initialModel = {
		  tracerStates: [],
		  tracerIndex: 0
		};
		
		exports.initialModel = initialModel;
	
	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.proposalView = exports.initialView = undefined;
		
		var _jsonFormat = __webpack_require__(4);
		
		var _jsonFormat2 = _interopRequireDefault(_jsonFormat);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		var jsonFormatConfig = {
		  type: "space",
		  size: 2
		};
		
		var tracerId = "tracerSlider";
		var tracerIndexId = "tracerIndex";
		var tracerModelId = "tracerModel";
		var tracerProposalId = "tracerProposal";
		
		var proposalView = function proposalView(_ref, tracerModel) {
		  var model = _ref.model;
		  var proposal = _ref.proposal;
		
		  var tracer = document.getElementById(tracerId);
		  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
		  tracer.value = String(tracerModel.tracerIndex);
		
		  var tracerIndex = document.getElementById(tracerIndexId);
		  tracerIndex.innerHTML = String(tracerModel.tracerIndex);
		
		  var tracerModelEl = document.getElementById(tracerModelId);
		  tracerModelEl.value = (0, _jsonFormat2.default)(model, jsonFormatConfig);
		
		  var tracerProposalEl = document.getElementById(tracerProposalId);
		  tracerProposalEl.value = (0, _jsonFormat2.default)(proposal, jsonFormatConfig);
		};
		
		var onSliderChange = function onSliderChange(renderRoot, tracerModel) {
		  return function (evt) {
		    var index = parseInt(evt.target.value, 10);
		    var snapshot = tracerModel.tracerStates[index];
		    renderRoot(snapshot.model);
		    tracerModel.tracerIndex = index;
		    proposalView(snapshot, tracerModel);
		  };
		};
		
		var onModelChange = function onModelChange(renderRoot) {
		  return function (evt) {
		    try {
		      var model = JSON.parse(evt.target.value);
		      renderRoot(model);
		    } catch (err) {
		      // ignore invalid JSON
		    }
		  };
		};
		
		var initialView = function initialView(selector, renderRoot, tracerModel) {
		  var target = document.querySelector(selector);
		
		  if (target) {
		    var viewHtml = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<textarea id='" + tracerProposalId + "' rows='5' cols='40' style='display: block'></textarea>" + "<textarea id='" + tracerModelId + "' rows='20' cols='40' style='display: block'></textarea></div>";
		
		    target.innerHTML = viewHtml;
		    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderRoot, tracerModel));
		    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
		  }
		};
		
		exports.initialView = initialView;
		exports.proposalView = proposalView;
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		/*
		  change for npm modules.
		  by Luiz Estácio.
		
		  json-format v.1.1
		  http://github.com/phoboslab/json-format
		
		  Released under MIT license:
		  http://www.opensource.org/licenses/mit-license.php
		*/
		var p = [],
		  indentConfig = {
		    tab: { char: '\t', size: 1 },
		    space: { char: ' ', size: 4 }
		  },
		  configDefault = {
		    type: 'tab'
		  },
		  push = function( m ) { return '\\' + p.push( m ) + '\\'; },
		  pop = function( m, i ) { return p[i-1] },
		  tabs = function( count, indentType) { return new Array( count + 1 ).join( indentType ); };
		
		function JSONFormat ( json, indentType ) {
		  p = [];
		  var out = "",
		      indent = 0;
		
		  // Extract backslashes and strings
		  json = json
		    .replace( /\\./g, push )
		    .replace( /(".*?"|'.*?')/g, push )
		    .replace( /\s+/, '' );    
		
		  // Indent and insert newlines
		  for( var i = 0; i < json.length; i++ ) {
		    var c = json.charAt(i);
		
		    switch(c) {
		      case '{':
		      case '[':
		        out += c + "\n" + tabs(++indent, indentType);
		        break;
		      case '}':
		      case ']':
		        out += "\n" + tabs(--indent, indentType) + c;
		        break;
		      case ',':
		        out += ",\n" + tabs(indent, indentType);
		        break;
		      case ':':
		        out += ": ";
		        break;
		      default:
		        out += c;
		        break;      
		    }         
		  }
		
		  // Strip whitespace from numeric arrays and put backslashes 
		  // and strings back in
		  out = out
		    .replace( /\[[\d,\s]+?\]/g, function(m){ return m.replace(/\s/g,''); } )
		    .replace( /\\(\d+)\\/g, pop ) // strings
		    .replace( /\\(\d+)\\/g, pop ); // backslashes in strings
		
		  return out;
		};
		
		module.exports = function(json, config){
		  config = config || configDefault;
		  var indent = indentConfig[config.type];
		
		  if ( indent == null ) {
		    throw new Error('Unrecognized ident type: "' + config.type + '"');
		  }
		  var indentType = new Array((config.size || indent.size) + 1).join(indent.char);
		  return JSONFormat(JSON.stringify(json), indentType);
		}
	
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		var receive = function receive(tracerModel, view) {
		  return function (model, proposal) {
		    var modelCopy = JSON.parse(JSON.stringify(model));
		    var modelAndProposal = { model: modelCopy, proposal: proposal };
		    tracerModel.tracerStates.push(modelAndProposal);
		    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
		
		    view(modelAndProposal, tracerModel);
		
		    return model;
		  };
		};
		
		exports.default = receive;
	
	/***/ }
	/******/ ]);
	//# sourceMappingURL=meiosis-tracer.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var curryN = __webpack_require__(10);
	
	var isString = function(s) { return typeof s === 'string'; };
	var isNumber = function(n) { return typeof n === 'number'; };
	var isBoolean = function(b) { return typeof b === 'boolean'; };
	var isObject = function(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	};
	var isFunction = function(f) { return typeof f === 'function'; };
	var isArray = Array.isArray || function(a) { return 'length' in a; };
	
	var mapConstrToFn = function(group, constr) {
	  return constr === String    ? isString
	       : constr === Number    ? isNumber
	       : constr === Boolean   ? isBoolean
	       : constr === Object    ? isObject
	       : constr === Array     ? isArray
	       : constr === Function  ? isFunction
	       : constr === undefined ? group
	                              : constr;
	};
	
	var numToStr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
	
	var validate = function(group, validators, name, args) {
	  var validator, v, i;
	  for (i = 0; i < args.length; ++i) {
	    v = args[i];
	    validator = mapConstrToFn(group, validators[i]);
	    if (Type.check === true &&
	        (validator.prototype === undefined || !validator.prototype.isPrototypeOf(v)) &&
	        (typeof validator !== 'function' || !validator(v))) {
	      throw new TypeError('wrong value ' + v + ' passed to location ' + numToStr[i] + ' in ' + name);
	    }
	  }
	};
	
	function valueToArray(value) {
	  var i, arr = [];
	  for (i = 0; i < value._keys.length; ++i) {
	    arr.push(value[value._keys[i]]);
	  }
	  return arr;
	}
	
	function extractValues(keys, obj) {
	  var arr = [], i;
	  for (i = 0; i < keys.length; ++i) arr[i] = obj[keys[i]];
	  return arr;
	}
	
	function constructor(group, name, fields) {
	  var validators, keys = Object.keys(fields), i;
	  if (isArray(fields)) {
	    validators = fields;
	  } else {
	    validators = extractValues(keys, fields);
	  }
	  function construct() {
	    var val = Object.create(group.prototype), i;
	    val._keys = keys;
	    val._name = name;
	    if (Type.check === true) {
	      validate(group, validators, name, arguments);
	    }
	    for (i = 0; i < arguments.length; ++i) {
	      val[keys[i]] = arguments[i];
	    }
	    return val;
	  }
	  group[name] = curryN(keys.length, construct);
	  if (keys !== undefined) {
	    group[name+'Of'] = function(obj) {
	      return construct.apply(undefined, extractValues(keys, obj));
	    };
	  }
	}
	
	function rawCase(type, cases, value, arg) {
	  var wildcard = false;
	  var handler = cases[value._name];
	  if (handler === undefined) {
	    handler = cases['_'];
	    wildcard = true;
	  }
	  if (Type.check === true) {
	    if (!type.prototype.isPrototypeOf(value)) {
	      throw new TypeError('wrong type passed to case');
	    } else if (handler === undefined) {
	      throw new Error('non-exhaustive patterns in a function');
	    }
	  }
	  var args = wildcard === true ? [arg]
	           : arg !== undefined ? valueToArray(value).concat([arg])
	           : valueToArray(value);
	  return handler.apply(undefined, args);
	}
	
	var typeCase = curryN(3, rawCase);
	var caseOn = curryN(4, rawCase);
	
	function createIterator() {
	  return {
	    idx: 0,
	    val: this,
	    next: function() {
	      var keys = this.val._keys;
	      return this.idx === keys.length
	        ? {done: true}
	        : {value: this.val[keys[this.idx++]]};
	    }
	  };
	}
	
	function Type(desc) {
	  var key, res, obj = {};
	  obj.prototype = {};
	  obj.prototype[Symbol ? Symbol.iterator : '@@iterator'] = createIterator;
	  obj.case = typeCase(obj);
	  obj.caseOn = caseOn(obj);
	  for (key in desc) {
	    res = constructor(obj, key, desc[key]);
	  }
	  return obj;
	}
	
	Type.check = true;
	
	module.exports = Type;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(11);
	var _curry1 = __webpack_require__(12);
	var _curry2 = __webpack_require__(14);
	var _curryN = __webpack_require__(15);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the specified
	 * arity. The curried function has two unusual capabilities. First, its
	 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	 * following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(13);
	
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(12);
	var _isPlaceholder = __webpack_require__(13);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2
	             : _curry1(function(_b) { return fn(a, _b); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
	             : fn(a, b);
	    }
	  };
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(11);
	var _isPlaceholder = __webpack_require__(13);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @param {Array} received An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (!_isPlaceholder(received[combinedIdx]) ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (!_isPlaceholder(result)) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined)
	                     : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoModel, rootView, todoappComponent) {
	      return root.todoappComponent = factory(meiosis, todoModel, rootView, todoappComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.rootComponent = factory(require("meiosis"), require("../../common/root/model"), require("./view"), require("../todoapp/component"));
	  } else {
	    root.rootComponent = factory(root.meiosis, root.todoModel, root.rootView, root.todoappComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoModel, rootView, todoappComponent) {
	  return function (todoStorage) {
	    var todoapp = todoappComponent(todoStorage);
	
	    return meiosis.createComponent({
	      initialModel: todoModel(todoStorage),
	      view: rootView(todoapp)
	    });
	  };
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoModel = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoModel = factory();
	  } else {
	    root.todoModel = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (todoStorage) {
	    return {
	      todos: todoStorage.loadAll(),
	      newTodo: "",
	      editTodo: {},
	      filter: "all"
	    };
	  };
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.rootView = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.rootView = factory();
	  } else {
	    root.rootView = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  var info = "<footer class='info'>" + "  <p>Double-click to edit a todo</p>" + "  <p>Meiosis - VanillaJs - Created by <a href='http://twitter.com/foxdonut00'>foxdonut00</a></p>" + "  <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>" + "</footer>";
	
	  return function (todoapp) {
	    return function (model) {
	      return "<div>" + todoapp(model) + info + "</div>";
	    };
	  };
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(20), __webpack_require__(21), __webpack_require__(27), __webpack_require__(52)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoappView, headerComponent, mainComponent, footerComponent) {
	      return root.todoappComponent = factory(meiosis, todoappView, headerComponent, mainComponent, footerComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoappComponent = factory(require("meiosis"), require("./view"), require("../header/component"), require("../main/component"), require("../footer/component"));
	  } else {
	    root.todoappComponent = factory(root.meiosis, root.todoappView, root.headerComponent, root.mainComponent, root.footerComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoappView, headerComponent, mainComponent, footerComponent) {
	  var viewModel = function viewModel(model) {
	    var viewModel = model;
	    var by = model.filter;
	    var completed = by === "completed";
	
	    var filterBy = by && by !== "all" ? function (todo) {
	      return !!todo.completed === completed;
	    } : function () {
	      return true;
	    };
	    viewModel.filteredTodos = model.todos.filter(filterBy);
	
	    var notCompleted = function notCompleted(todo) {
	      return !todo.completed;
	    };
	    var itemsLeft = viewModel.filteredTodos.filter(notCompleted).length;
	    viewModel.itemsLeftText = viewModel.filteredTodos.length > 0 ? String(itemsLeft) + " item" + (itemsLeft === 1 ? "" : "s") + " left" : "";
	    viewModel.clearCompleted = viewModel.filteredTodos.length - itemsLeft > 0;
	
	    viewModel.allSelected = model.filter === "all";
	    viewModel.activeSelected = model.filter === "active";
	    viewModel.completedSelected = model.filter === "completed";
	
	    return viewModel;
	  };
	
	  return function (todoStorage) {
	    var header = headerComponent(todoStorage);
	    var main = mainComponent(todoStorage);
	    var footer = footerComponent(todoStorage);
	
	    var _view = todoappView(header, main, footer);
	
	    return meiosis.createComponent({
	      view: function view(model) {
	        return _view(viewModel(model));
	      }
	    });
	  };
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoappView = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoappView = factory();
	  } else {
	    root.todoappView = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (header, main, footer) {
	    return function (model) {
	      return "<section class='todoapp'>" + header(model) + main(model) + footer(model) + "</section>";
	    };
	  };
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(22), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, headerActions, headerReceive, headerView, headerReady) {
	      return root.headerComponent = factory(meiosis, headerActions, headerReceive, headerView, headerReady);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerComponent = factory(require("meiosis"), require("../../common/header/actions"), require("../../common/header/receive"), require("./view"), require("./ready"));
	  } else {
	    root.headerComponent = factory(root.meiosis, root.headerActions, root.headerReceive, root.headerView, root.headerReady);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, headerActions, headerReceive, headerView, headerReady) {
	  return function (todoStorage) {
	    return meiosis.createComponent({
	      actions: headerActions,
	      view: headerView,
	      receive: headerReceive(todoStorage),
	      ready: headerReady // only jquery and vanillajs need ready
	    });
	  };
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (headerActionTypes) {
	      return root.headerActions = factory(headerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerActions = factory(require("./actionTypes"));
	  } else {
	    root.headerActions = factory(root.headerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (HeaderAction) {
	  return function (propose) {
	    var actions = {
	      newTodo: function newTodo(title) {
	        propose(HeaderAction.NewTodo(title));
	      },
	      saveTodo: function saveTodo(title) {
	        propose(HeaderAction.SaveNewTodo(title));
	      },
	      clearNewTodo: function clearNewTodo() {
	        propose(HeaderAction.ClearNewTodo());
	      }
	    };
	
	    var ENTER_KEY = 13;
	
	    actions.events = {
	      onNewTodoKeyUp: function onNewTodoKeyUp(evt) {
	        if (evt.keyCode === ENTER_KEY) {
	          actions.saveTodo(evt.target.value);
	        } else {
	          actions.newTodo(evt.target.value);
	        }
	      },
	      onNewTodoKeyUpEnterOnly: function onNewTodoKeyUpEnterOnly(evt) {
	        if (evt.keyCode === ENTER_KEY || evt.which === ENTER_KEY) {
	          actions.saveTodo(evt.target.value);
	        }
	      },
	      onNewTodoChange: function onNewTodoChange(evt) {
	        actions.newTodo(evt.target.value);
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.headerActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerActionTypes = factory(require("union-type"));
	  } else {
	    root.headerActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    NewTodo: [String],
	    SaveNewTodo: [String],
	    ClearNewTodo: []
	  });
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, headerActionTypes) {
	      return root.headerReceive = factory(meiosis, headerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerReceive = factory(require("meiosis"), require("./actionTypes"));
	  } else {
	    root.headerReceive = factory(root.meiosis, root.headerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, HeaderAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      return HeaderAction.case({
	        NewTodo: function NewTodo(title) {
	          model.newTodo = title;
	          return model;
	        },
	        SaveNewTodo: function SaveNewTodo(title) {
	          title = title.trim();
	
	          if (title) {
	            model.todos = todoStorage.saveTodo({ title: title });
	            model.newTodo = "";
	            return model;
	          } else {
	            return meiosis.REFUSE_PROPOSAL;
	          }
	        },
	        ClearNewTodo: function ClearNewTodo() {
	          model.newTodo = "";
	          return model;
	        },
	        _: function _() {
	          return model;
	        }
	      }, proposal);
	    };
	  };
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.headerView = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerView = factory();
	  } else {
	    root.headerView = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function () {
	    return "<header class='header'>" + "<h1>todos</h1>" + "<input class='new-todo' placeholder='What needs to be done?' autofocus>" + "</header>";
	  };
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require, document*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisVanillaJs) {
	      return root.headerReady = factory(meiosisVanillaJs);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.headerReady = factory(require("meiosis-vanillajs"));
	  } else {
	    root.headerReady = factory(root.meiosisVanillaJs);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisVanillaJs) {
	  var renderer = meiosisVanillaJs.renderer();
	  var ENTER_KEY = 13;
	  var root = document.getElementById("app");
	
	  return function (actions) {
	    renderer.delegate(root, "input.new-todo", "keypress", function (evt) {
	      if (evt.keyCode === ENTER_KEY) {
	        actions.saveTodo(evt.target.value);
	      }
	    });
	  };
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(28), __webpack_require__(30), __webpack_require__(31), __webpack_require__(32), __webpack_require__(33), __webpack_require__(34), __webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, mainActions, mainState, mainDisplay, mainReceive, mainView, mainReady, todoItemComponent) {
	      return root.mainComponent = factory(meiosis, mainActions, mainState, mainDisplay, mainReceive, mainView, mainReady, todoItemComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainComponent = factory(require("meiosis"), require("../../common/main/actions"), require("../../common/main/state"), require("../../common/main/display"), require("../../common/main/receive"), require("./view"), require("./ready"), require("../todoItem/component"));
	  } else {
	    root.mainComponent = factory(root.meiosis, root.mainActions, root.mainState, root.mainDisplay, root.mainReceive, root.mainView, root.mainReady, root.todoItemComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, mainActions, mainState, mainDisplay, mainReceive, mainView, mainReady, todoItemComponent) {
	  return function (todoStorage) {
	    var todoItem = todoItemComponent(todoStorage);
	
	    return meiosis.createComponent({
	      actions: mainActions,
	      view: mainDisplay(mainState, mainView(todoItem)),
	      receive: mainReceive(todoStorage),
	      ready: mainReady // only jquery and vanillajs need ready
	    });
	  };
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function (mainActionTypes) {
	      return root.mainActions = factory(mainActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainActions = factory(require("./actionTypes"));
	  } else {
	    root.mainActions = factory(root.mainActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (MainAction) {
	  return function (propose) {
	    var actions = {
	      setAllCompleted: function setAllCompleted(completed) {
	        propose(MainAction.SetAllCompleted(completed));
	      }
	    };
	
	    actions.events = {
	      onToggleAllTodos: function onToggleAllTodos(evt) {
	        actions.setAllCompleted(evt.target.checked);
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.mainActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainActionTypes = factory(require("union-type"));
	  } else {
	    root.mainActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    SetAllCompleted: [Boolean]
	  });
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.mainState = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainState = factory();
	  } else {
	    root.mainState = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return {
	    allCompleted: function allCompleted(model) {
	      var result = true;
	
	      for (var i = 0, t = model.filteredTodos.length; i < t; i++) {
	        if (!model.filteredTodos[i].completed) {
	          result = false;
	          break;
	        }
	      }
	      return result;
	    }
	  };
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.mainDisplay = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainDisplay = factory();
	  } else {
	    root.mainDisplay = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  var viewModel = function viewModel(state, model) {
	    var viewModel = model;
	
	    viewModel.allCompleted = state.allCompleted(model);
	
	    return viewModel;
	  };
	
	  return function (state, view) {
	    return function (model, actions) {
	      return view(viewModel(state, model), actions);
	    };
	  };
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function (mainActionTypes) {
	      return root.mainReceive = factory(mainActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainReceive = factory(require("./actionTypes"));
	  } else {
	    root.mainReceive = factory(root.mainActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (MainAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      return MainAction.case({
	        SetAllCompleted: function SetAllCompleted(completed) {
	          model.todos = todoStorage.setAllCompleted(completed);
	          return model;
	        },
	        _: function _() {
	          return model;
	        }
	      }, proposal);
	    };
	  };
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.mainView = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainView = factory();
	  } else {
	    root.mainView = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (todoItemComponent) {
	    return function (model) {
	      var checked = model.allCompleted ? "checked" : "";
	
	      return "<section class='main'>" + "<input class='toggle-all' type='checkbox' " + checked + ">" + "<label for='toggle-all'>Mark all as complete</label>" + "<ul class='todo-list'>" + model.filteredTodos.map(todoItemComponent(model)).join("") + "</ul>" + "</section>";
	    };
	  };
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require, document*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisVanillaJs) {
	      return root.mainReady = factory(meiosisVanillaJs);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.mainReady = factory(require("meiosis-vanillajs"));
	  } else {
	    root.mainReady = factory(root.meiosisVanillaJs);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisVanillaJs) {
	  var renderer = meiosisVanillaJs.renderer();
	  var root = document.getElementById("app");
	
	  return function (actions) {
	    renderer.delegate(root, "input.toggle-all", "change", actions.events.onToggleAllTodos);
	  };
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(36), __webpack_require__(38), __webpack_require__(39), __webpack_require__(41), __webpack_require__(42), __webpack_require__(43), __webpack_require__(44)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoItemActions, todoItemState, todoItemDisplay, todoItemView, todoItemReceive, todoItemReady, todoEditComponent) {
	      return root.todoItemComponent = factory(meiosis, todoItemActions, todoItemState, todoItemDisplay, todoItemView, todoItemReceive, todoItemReady, todoEditComponent);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemComponent = factory(require("meiosis"), require("../../common/todoItem/actions"), require("../../common/todoItem/state"), require("../../common/todoItem/display"), require("./view"), require("../../common/todoItem/receive"), require("./ready"), require("../todoEdit/component"));
	  } else {
	    root.todoItemComponent = factory(root.meiosis, root.todoItemActions, root.todoItemState, root.todoItemDisplay, root.todoItemView, root.todoItemReceive, root.todoItemReady, root.todoEditComponent);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoItemActions, todoItemState, todoItemDisplay, todoItemView, todoItemReceive, todoItemReady, todoEditComponent) {
	  return function (todoStorage) {
	    var todoEdit = todoEditComponent(todoStorage);
	
	    return meiosis.createComponent({
	      actions: todoItemActions,
	      view: todoItemDisplay(todoItemState, todoItemView(todoEdit)),
	      receive: todoItemReceive(todoStorage),
	      ready: todoItemReady // only jquery and vanillajs need ready
	    });
	  };
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(37)], __WEBPACK_AMD_DEFINE_RESULT__ = function (todoItemActionTypes) {
	      return root.todoItemActions = factory(todoItemActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemActions = factory(require("./actionTypes"));
	  } else {
	    root.todoItemActions = factory(root.todoItemActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (ItemAction) {
	  return function (propose) {
	    var actions = {
	      setCompleted: function setCompleted(todoId, completed) {
	        propose(ItemAction.SetCompleted(todoId, completed));
	      },
	      editTodo: function editTodo(todo) {
	        propose(ItemAction.EditTodo(todo));
	      },
	      deleteTodoId: function deleteTodoId(todoId) {
	        propose(ItemAction.DeleteTodo(todoId));
	      }
	    };
	
	    actions.events = {
	      onToggleTodo: function onToggleTodo(todoId) {
	        return function (evt) {
	          actions.setCompleted(todoId, evt.target.checked);
	        };
	      },
	      onEditTodo: function onEditTodo(todo) {
	        return function (_evt) {
	          actions.editTodo(todo);
	        };
	      },
	      onDestroyTodo: function onDestroyTodo(todoId) {
	        return function (_evt) {
	          actions.deleteTodoId(todoId);
	        };
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.todoItemActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemActionTypes = factory(require("union-type"));
	  } else {
	    root.todoItemActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    SetCompleted: [Number, Boolean],
	    EditTodo: [Object],
	    DeleteTodo: [Number]
	  });
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoItemState = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemState = factory();
	  } else {
	    root.todoItemState = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return {
	    editing: function editing(model, todo) {
	      return todo.id === model.editTodo.id;
	    }
	  };
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(40)], __WEBPACK_AMD_DEFINE_RESULT__ = function (classnames) {
	      return root.todoItemDisplay = factory(classnames);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemDisplay = factory(require("classnames"));
	  } else {
	    root.todoItemDisplay = factory(root.classNames);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (classnames) {
	  var getTodoClasses = function getTodoClasses(state, model, todo) {
	    return classnames({
	      "completed": todo.completed,
	      "editing": state.editing(model, todo)
	    });
	  };
	
	  return function (state, view) {
	    return function (model, actions) {
	      return function (todo) {
	        var todoClasses = getTodoClasses(state, model, todo);
	        return view({ model: model, todo: todo, todoClasses: todoClasses }, actions);
	      };
	    };
	  };
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoItemView = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemView = factory();
	  } else {
	    root.todoItemView = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (todoEditComponent) {
	    return function (model) {
	      var todo = model.todo;
	
	      var dataId = " data-id='" + todo.id + "'";
	      var checked = todo.completed ? " checked" : "";
	
	      return "<li class='" + model.todoClasses + " '>" + "<div class='view'>" + "<input" + dataId + " class='toggle' type='checkbox'" + checked + ">" + "<label" + dataId + ">" + todo.title + "</label>" + "<button" + dataId + " class='destroy'></button>" + "</div>" + todoEditComponent(model) + "</li>";
	    };
	  };
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(37)], __WEBPACK_AMD_DEFINE_RESULT__ = function (todoItemActionTypes) {
	      return root.todoItemReceive = factory(todoItemActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemReceive = factory(require("./actionTypes"));
	  } else {
	    root.todoItemReceive = factory(root.todoItemActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (ItemAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      return ItemAction.case({
	        SetCompleted: function SetCompleted(todoId, completed) {
	          model.todos = todoStorage.setCompleted(todoId, completed);
	          return model;
	        },
	        EditTodo: function EditTodo(todo) {
	          model.editTodo = todo;
	          return model;
	        },
	        DeleteTodo: function DeleteTodo(todoId) {
	          model.todos = todoStorage.deleteTodoId(todoId);
	          return model;
	        },
	        _: function _() {
	          return model;
	        }
	      }, proposal);
	    };
	  };
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require, document*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisVanillaJs) {
	      return root.todoItemReady = factory(meiosisVanillaJs);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoItemReady = factory(require("meiosis-vanillajs"));
	  } else {
	    root.todoItemReady = factory(root.meiosisVanillaJs);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisVanillaJs) {
	  var renderer = meiosisVanillaJs.renderer();
	  var root = document.getElementById("app");
	
	  return function (actions) {
	    renderer.delegate(root, "input.toggle", "change", function (evt) {
	      var todoId = parseInt(evt.target.dataset.id, 10);
	      var completed = evt.target.checked;
	      actions.setCompleted(todoId, completed);
	    });
	
	    renderer.delegate(root, ".view label", "dblclick", function (evt) {
	      var todoId = parseInt(evt.target.dataset.id, 10);
	      var title = evt.target.innerHTML;
	      actions.editTodo({ title: title, id: todoId });
	    });
	
	    renderer.delegate(root, "button.destroy", "click", function (evt) {
	      var todoId = parseInt(evt.target.dataset.id, 10);
	      actions.deleteTodoId(todoId);
	    });
	  };
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(45), __webpack_require__(47), __webpack_require__(48), __webpack_require__(49), __webpack_require__(50), __webpack_require__(51), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoEditPostRender, todoEditReady, todoItemState) {
	      return root.todoEditComponent = factory(meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoEditPostRender, todoEditReady, todoItemState);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditComponent = factory(require("meiosis"), require("../../common/todoEdit/actions"), require("./view"), require("../../common/todoEdit/display"), require("../../common/todoEdit/receive"), require("../../common/todoEdit/postRender"), require("./ready"), require("../../common/todoItem/state"));
	  } else {
	    root.todoEditComponent = factory(root.meiosis, root.todoEditActions, root.todoEditView, root.todoEditDisplay, root.todoEditReceive, root.todoEditPostRender, root.todoEditReady, root.todoItemState);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoEditPostRender, todoEditReady, todoItemState) {
	  return function (todoStorage) {
	    return meiosis.createComponent({
	      actions: todoEditActions,
	      view: todoEditDisplay(todoItemState, todoEditView),
	      receive: todoEditReceive(todoStorage),
	      postRender: todoEditPostRender, // only jquery and vanillajs need postRender
	      ready: todoEditReady // only jquery and vanillajs need ready
	    });
	  };
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(46)], __WEBPACK_AMD_DEFINE_RESULT__ = function (todoEditActionTypes) {
	      return root.todoEditActions = factory(todoEditActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditActions = factory(require("./actionTypes"));
	  } else {
	    root.todoEditActions = factory(root.todoEditActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (EditAction) {
	  return function (propose) {
	    var actions = {
	      editingTodo: function editingTodo(title, id) {
	        propose(EditAction.EditingTodo({ title: title, id: id }));
	      },
	      saveTodo: function saveTodo(title, id) {
	        propose(EditAction.SaveTodo({ title: title, id: id }));
	      },
	      clearEdit: function clearEdit() {
	        propose(EditAction.ClearEdit());
	      }
	    };
	
	    var ENTER_KEY = 13;
	    var ESCAPE_KEY = 27;
	
	    actions.events = {
	      onEditKeyUp: function onEditKeyUp(todoId) {
	        return function (evt) {
	          if (evt.keyCode === ESCAPE_KEY || evt.which === ESCAPE_KEY) {
	            actions.clearEdit();
	          } else if (evt.keyCode === ENTER_KEY || evt.which === ENTER_KEY) {
	            actions.saveTodo(evt.target.value, todoId);
	          }
	        };
	      },
	      onEditChange: function onEditChange(todoId) {
	        return function (evt) {
	          actions.editingTodo(evt.target.value, todoId);
	        };
	      },
	      onEditBlur: function onEditBlur(todoId) {
	        return function (evt) {
	          actions.saveTodo(evt.target.value, todoId);
	        };
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.todoEditActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditActionTypes = factory(require("union-type"));
	  } else {
	    root.todoEditActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    EditingTodo: [Object],
	    SaveTodo: [Object],
	    ClearEdit: []
	  });
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoEditView = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditView = factory();
	  } else {
	    root.todoEditView = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return {
	    todoEdit: function todoEdit(todo) {
	      var dataId = " data-id='" + todo.id + "'";
	      return "<input" + dataId + " type='text' class='edit' value='" + todo.title + "'/>";
	    },
	
	    noTodoInput: function noTodoInput() {
	      return "";
	    }
	  };
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoEditDisplay = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditDisplay = factory();
	  } else {
	    root.todoEditDisplay = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (state, view) {
	    return function (model, actions) {
	      return state.editing(model.model, model.todo) ? view.todoEdit(model.model.editTodo, actions) : view.noTodoInput();
	    };
	  };
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(46)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, todoEditActionTypes) {
	      return root.todoEditReceive = factory(meiosis, todoEditActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditReceive = factory(require("meiosis"), require("./actionTypes"));
	  } else {
	    root.todoEditReceive = factory(root.meiosis, root.todoEditActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, EditAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      return EditAction.case({
	        EditingTodo: function EditingTodo(todo) {
	          model.editTodo = todo;
	          return model;
	        },
	        SaveTodo: function SaveTodo(todo) {
	          var editing = todo.id === model.editTodo.id;
	          todo.title = todo.title.trim();
	
	          if (editing && todo.title) {
	            model.todos = todoStorage.saveTodo(todo);
	            model.editTodo = {};
	            return model;
	          } else {
	            return meiosis.REFUSE_PROPOSAL;
	          }
	        },
	        ClearEdit: function ClearEdit() {
	          model.editTodo = {};
	          return model;
	        },
	        _: function _() {
	          return model;
	        }
	      }, proposal);
	    };
	  };
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoEditPostRender = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditPostRender = factory();
	  } else {
	    root.todoEditPostRender = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  return function (_view) {
	    var input = document.getElementById("app").querySelector("input.edit");
	
	    if (input) {
	      input.focus();
	      input.selectionStart = input.value.length;
	    }
	  };
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require, document*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosisVanillaJs) {
	      return root.todoEditReady = factory(meiosisVanillaJs);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoEditReady = factory(require("meiosis-vanillajs"));
	  } else {
	    root.todoEditReady = factory(root.meiosisVanillaJs);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosisVanillaJs) {
	  var renderer = meiosisVanillaJs.renderer();
	  var ENTER_KEY = 13;
	  var ESCAPE_KEY = 27;
	  var root = document.getElementById("app");
	
	  return function (actions) {
	    renderer.delegate(root, "input.edit", "keyup", function (evt) {
	      var todoId = parseInt(evt.target.dataset.id, 10);
	
	      if (evt.keyCode === ESCAPE_KEY) {
	        actions.clearEdit(todoId);
	      } else if (evt.keyCode === ENTER_KEY) {
	        actions.saveTodo(evt.target.value, todoId);
	      }
	    });
	
	    renderer.delegate(root, "input.edit", "blur", function (evt) {
	      var todoId = parseInt(evt.target.dataset.id, 10);
	      actions.saveTodo(evt.target.value, todoId);
	    });
	  };
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(53), __webpack_require__(55), __webpack_require__(56), __webpack_require__(57)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, footerActions, footerView, footerReceive, footerReady) {
	      return root.footerComponent = factory(meiosis, footerActions, footerView, footerReceive, footerReady);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerComponent = factory(require("meiosis"), require("../../common/footer/actions"), require("./view"), require("../../common/footer/receive"), require("./ready"));
	  } else {
	    root.footerComponent = factory(root.meiosis, root.footerActions, root.footerView, root.footerReceive, root.footerReady);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, footerActions, footerView, footerReceive, footerReady) {
	  return function (todoStorage) {
	    return meiosis.createComponent({
	      actions: footerActions,
	      view: footerView,
	      receive: footerReceive(todoStorage),
	      ready: footerReady
	    });
	  };
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(54)], __WEBPACK_AMD_DEFINE_RESULT__ = function (footerActionTypes) {
	      return root.footerActions = factory(footerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerActions = factory(require("./actionTypes"));
	  } else {
	    root.footerActions = factory(root.footerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (FooterAction) {
	  return function (propose) {
	    var actions = {
	      clearCompleted: function clearCompleted() {
	        propose(FooterAction.ClearCompleted());
	      },
	      filter: function filter(by) {
	        propose(FooterAction.Filter(by));
	      }
	    };
	
	    actions.events = {
	      onClearCompleted: function onClearCompleted(_evt) {
	        actions.clearCompleted();
	      }
	    };
	
	    return actions;
	  };
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Type) {
	      return root.footerActionTypes = factory(Type);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerActionTypes = factory(require("union-type"));
	  } else {
	    root.footerActionTypes = factory(root.unionType);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (Type) {
	  return Type({
	    ClearCompleted: [],
	    Filter: [String]
	  });
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(40)], __WEBPACK_AMD_DEFINE_RESULT__ = function (classnames) {
	      return root.footerView = factory(classnames);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerView = factory(require("classnames"));
	  } else {
	    root.footerView = factory(root.classNames);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (classnames) {
	  return function (model) {
	    var clearCompleted = model.clearCompleted ? "<button class='clear-completed'>Clear completed</button>" : "";
	
	    return "<footer class='footer'>" + "<span class='todo-count'>" + model.itemsLeftText + "</span>" + "<ul class='filters'>" + "<li><a href='#/' class='" + classnames({ selected: model.allSelected }) + "'>All</a></li>" + "<li><a href='#/active' class='" + classnames({ selected: model.activeSelected }) + "'>Active</a></li>" + "<li><a href='#/completed' class='" + classnames({ selected: model.completedSelected }) + "'>Completed</a></li>" + "</ul>" + clearCompleted + "</footer>";
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(54)], __WEBPACK_AMD_DEFINE_RESULT__ = function (meiosis, footerActionTypes) {
	      return root.footerReceive = factory(meiosis, footerActionTypes);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerReceive = factory(require("meiosis"), require("./actionTypes"));
	  } else {
	    root.footerReceive = factory(root.meiosis, root.footerActionTypes);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (meiosis, FooterAction) {
	  return function (todoStorage) {
	    return function (model, proposal) {
	      return FooterAction.case({
	        ClearCompleted: function ClearCompleted() {
	          model.todos = todoStorage.clearCompleted();
	          return model;
	        },
	        Filter: function Filter(by) {
	          if (by === model.filter) {
	            return meiosis.REFUSE_PROPOSAL;
	          }
	          model.todos = todoStorage.loadAll();
	          model.filter = by;
	          return model;
	        },
	        _: function _() {
	          return model;
	        }
	      }, proposal);
	    };
	  };
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require, document*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (History, meiosisVanillaJs) {
	      return root.footerReady = factory(History, meiosisVanillaJs);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.footerReady = factory(require("history"), require("meiosis-vanillajs"));
	  } else {
	    root.footerReady = factory(root.History, root.meiosisVanillaJs);
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function (History, meiosisVanillaJs) {
	  var renderer = meiosisVanillaJs.renderer();
	  var root = document.getElementById("app");
	
	  return function (actions) {
	    var history = History.createHistory();
	
	    history.listen(function (location) {
	      var route = location.hash.split("/")[1] || "all";
	      actions.filter(route);
	    });
	
	    renderer.delegate(root, "button.clear-completed", "click", function () {
	      actions.clearCompleted();
	    });
	  };
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.locationsAreEqual = exports.Actions = exports.useQueries = exports.useBeforeUnload = exports.useBasename = exports.createMemoryHistory = exports.createHashHistory = exports.createHistory = undefined;
	
	var _LocationUtils = __webpack_require__(59);
	
	Object.defineProperty(exports, 'locationsAreEqual', {
	  enumerable: true,
	  get: function get() {
	    return _LocationUtils.locationsAreEqual;
	  }
	});
	
	var _createBrowserHistory = __webpack_require__(65);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _createHashHistory2 = __webpack_require__(74);
	
	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);
	
	var _createMemoryHistory2 = __webpack_require__(76);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	var _useBasename2 = __webpack_require__(77);
	
	var _useBasename3 = _interopRequireDefault(_useBasename2);
	
	var _useBeforeUnload2 = __webpack_require__(78);
	
	var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);
	
	var _useQueries2 = __webpack_require__(79);
	
	var _useQueries3 = _interopRequireDefault(_useQueries2);
	
	var _Actions2 = __webpack_require__(64);
	
	var _Actions3 = _interopRequireDefault(_Actions2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.createHistory = _createBrowserHistory2.default;
	exports.createHashHistory = _createHashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;
	exports.useBasename = _useBasename3.default;
	exports.useBeforeUnload = _useBeforeUnload3.default;
	exports.useQueries = _useQueries3.default;
	exports.Actions = _Actions3.default;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(61);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PathUtils = __webpack_require__(62);
	
	var _Actions = __webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createQuery = exports.createQuery = function createQuery(props) {
	  return _extends(Object.create(null), props);
	};
	
	var createLocation = exports.createLocation = function createLocation() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;
	
	  var pathname = object.pathname || '/';
	  var search = object.search || '';
	  var hash = object.hash || '';
	  var state = object.state;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	};
	
	var isDate = function isDate(object) {
	  return Object.prototype.toString.call(object) === '[object Date]';
	};
	
	var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
	  if (a === b) return true;
	
	  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);
	
	  if (typeofA !== typeofB) return false;
	
	  !(typeofA !== 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;
	
	  // Not the same object, but same type.
	  if (typeofA === 'object') {
	    !!(isDate(a) && isDate(b)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;
	
	    if (!Array.isArray(a)) return Object.keys(a).every(function (key) {
	      return statesAreEqual(a[key], b[key]);
	    });
	
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return statesAreEqual(item, b[index]);
	    });
	  }
	
	  // All other serializable types (string, number, boolean)
	  // should be strict equal.
	  return false;
	};
	
	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.key === b.key &&
	  // a.action === b.action && // Different action !== location change.
	  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 60 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = exports.isAbsolutePath = undefined;
	
	var _warning = __webpack_require__(63);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isAbsolutePath = exports.isAbsolutePath = function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	};
	
	var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
	  var _parsePath = parsePath(path);
	
	  var pathname = _parsePath.pathname;
	  var search = _parsePath.search;
	  var hash = _parsePath.hash;
	
	
	  return createPath({
	    pathname: pathname,
	    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
	    hash: hash
	  });
	};
	
	var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
	  var _parsePath2 = parsePath(path);
	
	  var pathname = _parsePath2.pathname;
	  var search = _parsePath2.search;
	  var hash = _parsePath2.hash;
	
	
	  return createPath({
	    pathname: pathname,
	    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
	      return prefix === '?' ? prefix : suffix;
	    }),
	    hash: hash
	  });
	};
	
	var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
	  var _parsePath3 = parsePath(path);
	
	  var search = _parsePath3.search;
	
	  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
	  return match && match[1];
	};
	
	var extractPath = function extractPath(string) {
	  var match = string.match(/^(https?:)?\/\/[^\/]*/);
	  return match == null ? string : string.substring(match[0].length);
	};
	
	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';
	
	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	};
	
	var createPath = exports.createPath = function createPath(location) {
	  if (location == null || typeof location === 'string') return location;
	
	  var basename = location.basename;
	  var pathname = location.pathname;
	  var search = location.search;
	  var hash = location.hash;
	
	  var path = (basename || '') + pathname;
	
	  if (search && search !== '?') path += search;
	
	  if (hash) path += hash;
	
	  return path;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	var PUSH = exports.PUSH = 'PUSH';
	
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = exports.REPLACE = 'REPLACE';
	
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = exports.POP = 'POP';

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(61);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(66);
	
	var _BrowserProtocol = __webpack_require__(67);
	
	var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);
	
	var _RefreshProtocol = __webpack_require__(70);
	
	var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);
	
	var _DOMUtils = __webpack_require__(68);
	
	var _createHistory = __webpack_require__(71);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve clean URLs. You can force this
	 * behavior using { forceRefresh: true } in options.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;
	
	  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
	  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;
	
	  var getUserConfirmation = Protocol.getUserConfirmation;
	  var getCurrentLocation = Protocol.getCurrentLocation;
	  var pushLocation = Protocol.pushLocation;
	  var replaceLocation = Protocol.replaceLocation;
	  var go = Protocol.go;
	
	
	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));
	
	  var listenerCount = 0,
	      stopListener = void 0;
	
	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);
	
	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopListener();
	    };
	  };
	
	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };
	
	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen
	  });
	};
	
	exports.default = createBrowserHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;
	
	var _LocationUtils = __webpack_require__(59);
	
	var _DOMUtils = __webpack_require__(68);
	
	var _DOMStateStorage = __webpack_require__(69);
	
	var _PathUtils = __webpack_require__(62);
	
	/* eslint-disable no-alert */
	
	
	var PopStateEvent = 'popstate';
	
	var _createLocation = function _createLocation(historyState) {
	  var key = historyState && historyState.key;
	
	  return (0, _LocationUtils.createLocation)({
	    pathname: window.location.pathname,
	    search: window.location.search,
	    hash: window.location.hash,
	    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
	  }, undefined, key);
	};
	
	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  var historyState = void 0;
	  try {
	    historyState = window.history.state || {};
	  } catch (error) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/mjackson/history/pull/289
	    historyState = {};
	  }
	
	  return _createLocation(historyState);
	};
	
	var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
	  return callback(window.confirm(message));
	};
	
	var startListener = exports.startListener = function startListener(listener) {
	  var handlePopState = function handlePopState(event) {
	    if (event.state !== undefined) // Ignore extraneous popstate events in WebKit
	      listener(_createLocation(event.state));
	  };
	
	  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);
	
	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);
	  };
	};
	
	var updateLocation = function updateLocation(location, updateState) {
	  var state = location.state;
	  var key = location.key;
	
	
	  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);
	
	  updateState({ key: key }, (0, _PathUtils.createPath)(location));
	};
	
	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.pushState(state, null, path);
	  });
	};
	
	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.replaceState(state, null, path);
	  });
	};
	
	var go = exports.go = function go(n) {
	  if (n) window.history.go(n);
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};
	
	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;
	
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
	
	  return window.history && 'pushState' in window.history;
	};
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.readState = exports.saveState = undefined;
	
	var _warning = __webpack_require__(63);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR']; /* eslint-disable no-empty */
	
	
	var SecurityError = 'SecurityError';
	var KeyPrefix = '@@History/';
	
	var createKey = function createKey(key) {
	  return KeyPrefix + key;
	};
	
	var saveState = exports.saveState = function saveState(key, state) {
	  if (!window.sessionStorage) {
	    // Session storage is not available or hidden.
	    // sessionStorage is undefined in Internet Explorer when served via file protocol.
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;
	    return;
	  }
	
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;
	
	      return;
	    }
	
	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;
	
	      return;
	    }
	
	    throw error;
	  }
	};
	
	var readState = exports.readState = function readState(key) {
	  var json = void 0;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;
	
	      return undefined;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return undefined;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;
	
	var _BrowserProtocol = __webpack_require__(67);
	
	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});
	
	var _LocationUtils = __webpack_require__(59);
	
	var _PathUtils = __webpack_require__(62);
	
	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  return (0, _LocationUtils.createLocation)(window.location);
	};
	
	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  window.location.href = (0, _PathUtils.createPath)(location);
	  return false; // Don't update location
	};
	
	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  window.location.replace((0, _PathUtils.createPath)(location));
	  return false; // Don't update location
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _AsyncUtils = __webpack_require__(72);
	
	var _PathUtils = __webpack_require__(62);
	
	var _runTransitionHook = __webpack_require__(73);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _Actions = __webpack_require__(64);
	
	var _LocationUtils = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var createHistory = function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var getUserConfirmation = options.getUserConfirmation;
	  var pushLocation = options.pushLocation;
	  var replaceLocation = options.replaceLocation;
	  var go = options.go;
	  var keyLength = options.keyLength;
	
	
	  var currentLocation = void 0;
	  var pendingLocation = void 0;
	  var beforeListeners = [];
	  var listeners = [];
	  var allKeys = [];
	
	  var getCurrentIndex = function getCurrentIndex() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);
	
	    if (currentLocation) return allKeys.indexOf(currentLocation.key);
	
	    return -1;
	  };
	
	  var updateLocation = function updateLocation(nextLocation) {
	    currentLocation = nextLocation;
	
	    var currentIndex = getCurrentIndex();
	
	    if (currentLocation.action === _Actions.PUSH) {
	      allKeys = [].concat(_toConsumableArray(allKeys.slice(0, currentIndex + 1)), [currentLocation.key]);
	    } else if (currentLocation.action === _Actions.REPLACE) {
	      allKeys[currentIndex] = currentLocation.key;
	    }
	
	    listeners.forEach(function (listener) {
	      return listener(currentLocation);
	    });
	  };
	
	  var listenBefore = function listenBefore(listener) {
	    beforeListeners.push(listener);
	
	    return function () {
	      return beforeListeners = beforeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };
	
	  var listen = function listen(listener) {
	    listeners.push(listener);
	
	    return function () {
	      return listeners = listeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };
	
	  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
	    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
	      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
	        return result != null ? done(result) : next();
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          return callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  };
	
	  var transitionTo = function transitionTo(nextLocation) {
	    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation
	
	      pendingLocation = null;
	
	      if (ok) {
	        // Treat PUSH to same path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = (0, _PathUtils.createPath)(currentLocation);
	          var nextPath = (0, _PathUtils.createPath)(nextLocation);
	
	          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (nextLocation.action === _Actions.POP) {
	          updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.PUSH) {
	          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.REPLACE) {
	          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
	        }
	      } else if (currentLocation && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(currentLocation.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
	      }
	    });
	  };
	
	  var push = function push(input) {
	    return transitionTo(createLocation(input, _Actions.PUSH));
	  };
	
	  var replace = function replace(input) {
	    return transitionTo(createLocation(input, _Actions.REPLACE));
	  };
	
	  var goBack = function goBack() {
	    return go(-1);
	  };
	
	  var goForward = function goForward() {
	    return go(1);
	  };
	
	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength || 6);
	  };
	
	  var createHref = function createHref(location) {
	    return (0, _PathUtils.createPath)(location);
	  };
	
	  var createLocation = function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	    return (0, _LocationUtils.createLocation)(location, action, key);
	  };
	
	  return {
	    getCurrentLocation: getCurrentLocation,
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: _PathUtils.createPath,
	    createHref: createHref,
	    createLocation: createLocation
	  };
	};
	
	exports.default = createHistory;

/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var isSync = false,
	      hasNext = false,
	      doneArgs = void 0;
	
	  var done = function done() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    isDone = true;
	
	    if (isSync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = args;
	      return;
	    }
	
	    callback.apply(undefined, args);
	  };
	
	  var next = function next() {
	    if (isDone) return;
	
	    hasNext = true;
	
	    if (isSync) return; // Iterate instead of recursing if possible.
	
	    isSync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work(currentTurn++, next, done);
	    }
	
	    isSync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(undefined, _toConsumableArray(doneArgs));
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  };
	
	  next();
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _warning = __webpack_require__(63);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var runTransitionHook = function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
	  }
	};
	
	exports.default = runTransitionHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _warning = __webpack_require__(63);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(61);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(66);
	
	var _DOMUtils = __webpack_require__(68);
	
	var _HashProtocol = __webpack_require__(75);
	
	var HashProtocol = _interopRequireWildcard(_HashProtocol);
	
	var _createHistory = __webpack_require__(71);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DefaultQueryKey = '_k';
	
	var createHashHistory = function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;
	
	  var queryKey = options.queryKey;
	
	
	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(queryKey !== false, 'Using { queryKey: false } no longer works. Instead, just don\'t ' + 'use location state if you don\'t want a key in your URL query string') : void 0;
	
	  if (typeof queryKey !== 'string') queryKey = DefaultQueryKey;
	
	  var getUserConfirmation = HashProtocol.getUserConfirmation;
	
	
	  var getCurrentLocation = function getCurrentLocation() {
	    return HashProtocol.getCurrentLocation(queryKey);
	  };
	
	  var pushLocation = function pushLocation(location) {
	    return HashProtocol.pushLocation(location, queryKey);
	  };
	
	  var replaceLocation = function replaceLocation(location) {
	    return HashProtocol.replaceLocation(location, queryKey);
	  };
	
	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: HashProtocol.go
	  }));
	
	  var listenerCount = 0,
	      stopListener = void 0;
	
	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = HashProtocol.startListener(history.transitionTo, queryKey);
	
	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopListener();
	    };
	  };
	
	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };
	
	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };
	
	  var goIsSupportedWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();
	
	  var go = function go(n) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;
	
	    history.go(n);
	  };
	
	  var createHref = function createHref(path) {
	    return '#' + history.createHref(path);
	  };
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    go: go,
	    createHref: createHref
	  });
	};
	
	exports.default = createHashHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;
	
	var _BrowserProtocol = __webpack_require__(67);
	
	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});
	
	var _warning = __webpack_require__(63);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _LocationUtils = __webpack_require__(59);
	
	var _DOMUtils = __webpack_require__(68);
	
	var _DOMStateStorage = __webpack_require__(69);
	
	var _PathUtils = __webpack_require__(62);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HashChangeEvent = 'hashchange';
	
	var getHashPath = function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var index = href.indexOf('#');
	  return index === -1 ? '' : href.substring(index + 1);
	};
	
	var pushHashPath = function pushHashPath(path) {
	  return window.location.hash = path;
	};
	
	var replaceHashPath = function replaceHashPath(path) {
	  var i = window.location.href.indexOf('#');
	
	  window.location.replace(window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path);
	};
	
	var ensureSlash = function ensureSlash() {
	  var path = getHashPath();
	
	  if ((0, _PathUtils.isAbsolutePath)(path)) return true;
	
	  replaceHashPath('/' + path);
	
	  return false;
	};
	
	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation(queryKey) {
	  var path = getHashPath();
	  var key = (0, _PathUtils.getQueryStringValueFromPath)(path, queryKey);
	
	  var state = void 0;
	  if (key) {
	    path = (0, _PathUtils.stripQueryStringValueFromPath)(path, queryKey);
	    state = (0, _DOMStateStorage.readState)(key);
	  }
	
	  var init = (0, _PathUtils.parsePath)(path);
	  init.state = state;
	
	  return (0, _LocationUtils.createLocation)(init, undefined, key);
	};
	
	var prevLocation = void 0;
	
	var startListener = exports.startListener = function startListener(listener, queryKey) {
	  var handleHashChange = function handleHashChange() {
	    if (!ensureSlash()) return; // Hash path must always begin with a /
	
	    var currentLocation = getCurrentLocation(queryKey);
	
	    if (prevLocation && currentLocation.key && prevLocation.key === currentLocation.key) return; // Ignore extraneous hashchange events
	
	    prevLocation = currentLocation;
	
	    listener(currentLocation);
	  };
	
	  ensureSlash();
	  (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
	
	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	  };
	};
	
	var updateLocation = function updateLocation(location, queryKey, updateHash) {
	  var state = location.state;
	  var key = location.key;
	
	  var path = (0, _PathUtils.createPath)(location);
	
	  if (state !== undefined) {
	    path = (0, _PathUtils.addQueryStringValueToPath)(path, queryKey, key);
	    (0, _DOMStateStorage.saveState)(key, state);
	  }
	
	  prevLocation = location;
	
	  updateHash(path);
	};
	
	var pushLocation = exports.pushLocation = function pushLocation(location, queryKey) {
	  return updateLocation(location, queryKey, function (path) {
	    if (getHashPath() !== path) {
	      pushHashPath(path);
	    } else {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'You cannot PUSH the same path using hash history') : void 0;
	    }
	  });
	};
	
	var replaceLocation = exports.replaceLocation = function replaceLocation(location, queryKey) {
	  return updateLocation(location, queryKey, function (path) {
	    if (getHashPath() !== path) replaceHashPath(path);
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _warning = __webpack_require__(63);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(61);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _LocationUtils = __webpack_require__(59);
	
	var _PathUtils = __webpack_require__(62);
	
	var _createHistory = __webpack_require__(71);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	var _Actions = __webpack_require__(64);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createStateStorage = function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	};
	
	var createMemoryHistory = function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var getCurrentLocation = function getCurrentLocation() {
	    var entry = entries[current];
	    var path = (0, _PathUtils.createPath)(entry);
	
	    var key = void 0,
	        state = void 0;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    }
	
	    var init = (0, _PathUtils.parsePath)(path);
	
	    return (0, _LocationUtils.createLocation)(_extends({}, init, { state: state }), undefined, key);
	  };
	
	  var canGo = function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  };
	
	  var go = function go(n) {
	    if (!n) return;
	
	    if (!canGo(n)) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Cannot go(%s) there is not enough history', n) : void 0;
	
	      return;
	    }
	
	    current += n;
	    var currentLocation = getCurrentLocation();
	
	    // Change action to POP
	    history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	  };
	
	  var pushLocation = function pushLocation(location) {
	    current += 1;
	
	    if (current < entries.length) entries.splice(current);
	
	    entries.push(location);
	
	    saveState(location.key, location.state);
	  };
	
	  var replaceLocation = function replaceLocation(location) {
	    entries[current] = location;
	    saveState(location.key, location.state);
	  };
	
	  var history = (0, _createHistory2.default)(_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    return (0, _LocationUtils.createLocation)(entry);
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : (0, _invariant2.default)(false) : void 0;
	  }
	
	  var storage = createStateStorage(entries);
	
	  var saveState = function saveState(key, state) {
	    return storage[key] = state;
	  };
	
	  var readState = function readState(key) {
	    return storage[key];
	  };
	
	  return history;
	};
	
	exports.default = createMemoryHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _runTransitionHook = __webpack_require__(73);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _PathUtils = __webpack_require__(62);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var useBasename = function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	    var basename = options.basename;
	
	
	    var addBasename = function addBasename(location) {
	      if (!location) return location;
	
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    };
	
	    var prependBasename = function prependBasename(location) {
	      if (!basename) return location;
	
	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var pname = object.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    };
	
	    // Override all read methods with basename-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return addBasename(history.getCurrentLocation());
	    };
	
	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, addBasename(location), callback);
	      });
	    };
	
	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(addBasename(location));
	      });
	    };
	
	    // Override all write methods with basename-aware versions.
	    var push = function push(location) {
	      return history.push(prependBasename(location));
	    };
	
	    var replace = function replace(location) {
	      return history.replace(prependBasename(location));
	    };
	
	    var createPath = function createPath(location) {
	      return history.createPath(prependBasename(location));
	    };
	
	    var createHref = function createHref(location) {
	      return history.createHref(prependBasename(location));
	    };
	
	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    };
	
	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};
	
	exports.default = useBasename;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(61);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _DOMUtils = __webpack_require__(68);
	
	var _ExecutionEnvironment = __webpack_require__(66);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var startListener = function startListener(getPromptMessage) {
	  var handleBeforeUnload = function handleBeforeUnload(event) {
	    var message = getPromptMessage();
	
	    if (typeof message === 'string') {
	      (event || window.event).returnValue = message;
	      return message;
	    }
	
	    return undefined;
	  };
	
	  (0, _DOMUtils.addEventListener)(window, 'beforeunload', handleBeforeUnload);
	
	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, 'beforeunload', handleBeforeUnload);
	  };
	};
	
	/**
	 * Returns a new createHistory function that can be used to create
	 * history objects that know how to use the beforeunload event in web
	 * browsers to cancel navigation.
	 */
	var useBeforeUnload = function useBeforeUnload(createHistory) {
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'useBeforeUnload only works in DOM environments') : (0, _invariant2.default)(false) : void 0;
	
	  return function (options) {
	    var history = createHistory(options);
	
	    var listeners = [];
	    var stopListener = void 0;
	
	    var getPromptMessage = function getPromptMessage() {
	      var message = void 0;
	      for (var i = 0, len = listeners.length; message == null && i < len; ++i) {
	        message = listeners[i].call();
	      }return message;
	    };
	
	    var listenBeforeUnload = function listenBeforeUnload(listener) {
	      if (listeners.push(listener) === 1) stopListener = startListener(getPromptMessage);
	
	      return function () {
	        listeners = listeners.filter(function (item) {
	          return item !== listener;
	        });
	
	        if (listeners.length === 0 && stopListener) {
	          stopListener();
	          stopListener = null;
	        }
	      };
	    };
	
	    return _extends({}, history, {
	      listenBeforeUnload: listenBeforeUnload
	    });
	  };
	};
	
	exports.default = useBeforeUnload;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _queryString = __webpack_require__(80);
	
	var _runTransitionHook = __webpack_require__(73);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _LocationUtils = __webpack_require__(59);
	
	var _PathUtils = __webpack_require__(62);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultStringifyQuery = function defaultStringifyQuery(query) {
	  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
	};
	
	var defaultParseQueryString = _queryString.parse;
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	var useQueries = function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    var decodeQuery = function decodeQuery(location) {
	      if (!location) return location;
	
	      if (location.query == null) location.query = parseQueryString(location.search.substring(1));
	
	      return location;
	    };
	
	    var encodeQuery = function encodeQuery(location, query) {
	      if (query == null) return location;
	
	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var queryString = stringifyQuery(query);
	      var search = queryString ? '?' + queryString : '';
	
	      return _extends({}, object, {
	        search: search
	      });
	    };
	
	    // Override all read methods with query-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return decodeQuery(history.getCurrentLocation());
	    };
	
	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, decodeQuery(location), callback);
	      });
	    };
	
	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(decodeQuery(location));
	      });
	    };
	
	    // Override all write methods with query-aware versions.
	    var push = function push(location) {
	      return history.push(encodeQuery(location, location.query));
	    };
	
	    var replace = function replace(location) {
	      return history.replace(encodeQuery(location, location.query));
	    };
	
	    var createPath = function createPath(location) {
	      return history.createPath(encodeQuery(location, location.query));
	    };
	
	    var createHref = function createHref(location) {
	      return history.createHref(encodeQuery(location, location.query));
	    };
	
	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var newLocation = history.createLocation.apply(history, [encodeQuery(location, location.query)].concat(args));
	
	      if (location.query) newLocation.query = (0, _LocationUtils.createQuery)(location.query);
	
	      return decodeQuery(newLocation);
	    };
	
	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};
	
	exports.default = useQueries;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(81);
	var objectAssign = __webpack_require__(82);
	
	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}
	
		return value;
	}
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);
	
		if (typeof str !== 'string') {
			return ret;
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return ret;
		}
	
		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});
	
		return ret;
	};
	
	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};
	
		opts = objectAssign(defaults, opts);
	
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return encode(key, opts);
			}
	
			if (Array.isArray(val)) {
				var result = [];
	
				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}
	
					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});
	
				return result.join('&');
			}
	
			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*global define, exports, module, require*/
	
	// This boilerplate is to support running this code with either, just the browser, or RequireJS,
	// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
	// Meiosis. It is for convenience to be able to run the example with your preferred module system.
	(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return root.todoStorage = factory();
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
	    module.exports = root.todoStorage = factory();
	  } else {
	    root.todoStorage = factory();
	  }
	})(undefined || window, // ^^ the code above is boilerplate. the "real" code starts below. vv
	
	function () {
	  var STORAGE_KEY = "meiosis-todomvc";
	
	  var findIndex = function findIndex(todos, todoId) {
	    var index = -1;
	
	    for (var i = 0, t = todos.length; i < t; i++) {
	      if (todos[i].id === todoId) {
	        index = i;
	        break;
	      }
	    }
	    return index;
	  };
	
	  var replaceTodoAtIndex = function replaceTodoAtIndex(todos, todo, index) {
	    return todos.slice(0, index).concat([todo]).concat(todos.slice(index + 1));
	  };
	
	  var deleteTodoAtIndex = function deleteTodoAtIndex(todos, index) {
	    return todos.slice(0, index).concat(todos.slice(index + 1));
	  };
	
	  var todoStorage = {
	    loadAll: function loadAll() {
	      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	    },
	    saveAll: function saveAll(todos) {
	      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	      return todos;
	    },
	    saveTodo: function saveTodo(todo) {
	      var todos = this.loadAll();
	      var id = parseInt(todo.id, 10);
	
	      if (id > 0) {
	        var index = findIndex(todos, id);
	        todo.completed = todos[index].completed;
	        todos = replaceTodoAtIndex(todos, todo, index);
	      } else {
	        todos = todos.concat([{ title: todo.title, id: new Date().getTime(), completed: false }]);
	      }
	      return this.saveAll(todos);
	    },
	    deleteTodoId: function deleteTodoId(todoId) {
	      var todos = this.loadAll();
	      var index = findIndex(todos, todoId);
	
	      if (index >= 0) {
	        todos = deleteTodoAtIndex(todos, index);
	        this.saveAll(todos);
	      }
	      return todos;
	    },
	    setCompleted: function setCompleted(id, completed) {
	      var todos = this.loadAll();
	      var index = findIndex(todos, id);
	
	      if (index >= 0) {
	        var todo = todos[index];
	        todo.completed = completed;
	        todos = replaceTodoAtIndex(todos, todo, index);
	        this.saveAll(todos);
	      }
	      return todos;
	    },
	    setAllCompleted: function setAllCompleted(completed) {
	      var todos = this.loadAll();
	      todos.forEach(function (todo) {
	        todo.completed = completed;
	      });
	      this.saveAll(todos);
	      return todos;
	    },
	    clearCompleted: function clearCompleted() {
	      var todos = this.loadAll();
	      var updatedTodos = [];
	
	      for (var i = 0, t = todos.length; i < t; i++) {
	        if (!todos[i].completed) {
	          updatedTodos.push(todos[i]);
	        }
	      }
	      return this.saveAll(updatedTodos);
	    }
	  };
	
	  return todoStorage;
	});

/***/ }
/******/ ]);
//# sourceMappingURL=generated-app.js.map