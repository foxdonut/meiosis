(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["meiosisTracer"] = factory();
	else
		root["meiosisTracer"] = factory();
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
	
	window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true;
	
	var meiosisTracer = function meiosisTracer(_ref) {
	  var selector = _ref.selector,
	      renderModel = _ref.renderModel,
	      horizontal = _ref.horizontal;
	
	  var receiveValues = (0, _receive.createReceiveValues)(_model.tracerModel, _view.tracerView);
	  renderModel = renderModel || function (model, sendValuesBack) {
	    window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model: model, sendValuesBack: sendValuesBack }, "*");
	  };
	  (0, _view.initialView)(selector, _model.tracerModel, renderModel, horizontal);
	
	  window.addEventListener("message", function (evt) {
	    if (evt.data.type === "MEIOSIS_VALUES") {
	      receiveValues(evt.data.values, evt.data.update);
	    }
	  });
	
	  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");
	
	  return {
	    receiveValues: receiveValues,
	    reset: function reset() {
	      return (0, _view.reset)(_model.tracerModel);
	    }
	  };
	};
	
	exports.meiosisTracer = meiosisTracer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var tracerModel = {
	  tracerStates: [],
	  tracerIndex: 0
	};
	
	exports.tracerModel = tracerModel;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.reset = exports.tracerView = exports.initialView = undefined;
	
	var _jsonFormat = __webpack_require__(4);
	
	var _jsonFormat2 = _interopRequireDefault(_jsonFormat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var jsonFormatConfig = {
	  type: "space",
	  size: 2
	};
	
	var tracerContainerId = "tracerContainer";
	var tracerId = "tracerSlider";
	var tracerToggleId = "tracerToggle";
	var tracerResetId = "tracerReset";
	var tracerIndexId = "tracerIndex";
	var tracerModelId = "tracerModel";
	var tracerStateId = "tracerState";
	var errorMessageId = "errorMessage";
	var errorMessage = null;
	
	var tracerView = function tracerView(values, tracerModel) {
	  var tracer = document.getElementById(tracerId);
	  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
	  tracer.value = String(tracerModel.tracerIndex);
	
	  var tracerIndex = document.getElementById(tracerIndexId);
	  tracerIndex.innerHTML = String(tracerModel.tracerIndex);
	
	  var tracerModelEl = document.getElementById(tracerModelId);
	  tracerModelEl.value = (0, _jsonFormat2.default)(values[0].value, jsonFormatConfig);
	
	  var tracerStateEl = document.getElementById(tracerStateId);
	  tracerStateEl.value = (0, _jsonFormat2.default)(values[values.length - 1].value, jsonFormatConfig);
	};
	
	var onSliderChange = function onSliderChange(renderModel, tracerModel) {
	  return function (evt) {
	    var index = parseInt(evt.target.value, 10);
	    var snapshot = tracerModel.tracerStates[index];
	    tracerModel.tracerIndex = index;
	    var model = snapshot[0].value;
	    renderModel(model, false);
	    tracerView(snapshot, tracerModel);
	  };
	};
	
	var onModelChange = function onModelChange(renderModel) {
	  return function (evt) {
	    try {
	      var model = JSON.parse(evt.target.value);
	      renderModel(model, true);
	      errorMessage.style.display = "none";
	    } catch (err) {
	      errorMessage.style.display = "block";
	    }
	  };
	};
	
	var onToggle = function onToggle(tracerContainer) {
	  return function (evt) {
	    var button = evt.target;
	
	    if (tracerContainer.style.display === "none") {
	      tracerContainer.style.display = "block";
	      button.innerHTML = "Hide";
	    } else {
	      tracerContainer.style.display = "none";
	      button.innerHTML = "Show";
	    }
	  };
	};
	
	var onReset = function onReset(tracerModel) {
	  return function () {
	    reset(tracerModel);
	  };
	};
	
	var reset = function reset(tracerModel) {
	  var snapshot = tracerModel.tracerStates[tracerModel.tracerStates.length - 1];
	  tracerModel.tracerStates.length = 1;
	  tracerModel.tracerStates[0] = snapshot;
	  tracerModel.tracerIndex = 0;
	  tracerView(snapshot, tracerModel);
	};
	
	var initialView = function initialView(selector, tracerModel, renderModel, horizontal) {
	  var target = document.querySelector(selector);
	
	  if (target) {
	    var divStyle = horizontal ? " style='float: left'" : "";
	
	    var viewHtml = "<div style='text-align: right'><button id='" + tracerToggleId + "'>Hide</button></div>" + "<div id='" + tracerContainerId + "'>" + "<div style='text-align: right'><button id='" + tracerResetId + "'>Reset</button></div>" + "<input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<div" + divStyle + "><div>Model: (you can type into this box)</div>" + "<textarea id='" + tracerModelId + "' rows='5' cols='40'></textarea>" + "<div id='" + errorMessageId + "' style='display: none'><span style='color:red'>Invalid JSON</span></div></div>" + "<div" + divStyle + "><div>State:</div>" + "<textarea id='" + tracerStateId + "' rows='5' cols='40'></textarea></div></div>";
	
	    target.innerHTML = viewHtml;
	
	    var tracerContainer = document.getElementById(tracerContainerId);
	    errorMessage = document.getElementById(errorMessageId);
	
	    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderModel, tracerModel));
	    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderModel));
	    document.getElementById(tracerToggleId).addEventListener("click", onToggle(tracerContainer));
	    document.getElementById(tracerResetId).addEventListener("click", onReset(tracerModel));
	  }
	};
	
	exports.initialView = initialView;
	exports.tracerView = tracerView;
	exports.reset = reset;

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
	var createReceiveValues = function createReceiveValues(tracerModel, view) {
	  return function (values, update) {
	    if (update) {
	      tracerModel.tracerStates.push(values);
	      tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
	    }
	    view(values, tracerModel);
	  };
	};
	
	exports.createReceiveValues = createReceiveValues;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=meiosis-tracer.js.map