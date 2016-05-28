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
	
	var _receiveUpdate = __webpack_require__(5);
	
	var _receiveUpdate2 = _interopRequireDefault(_receiveUpdate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tracerModel = _model.initialModel;
	
	var meiosisTracer = function meiosisTracer(createComponent, renderRoot, selector) {
	  createComponent({
	    receiveUpdate: (0, _receiveUpdate2.default)(tracerModel, _view.updateView)
	  });
	  (0, _view.initialView)(selector, renderRoot, tracerModel);
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
	exports.updateView = exports.initialView = undefined;
	
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
	var tracerUpdateId = "tracerUpdate";
	
	var updateView = function updateView(_ref, tracerModel) {
	  var model = _ref.model;
	  var update = _ref.update;
	
	  var tracer = document.getElementById(tracerId);
	  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
	  tracer.value = String(tracerModel.tracerIndex);
	
	  var tracerIndex = document.getElementById(tracerIndexId);
	  tracerIndex.innerHTML = String(tracerModel.tracerIndex);
	
	  var tracerModelEl = document.getElementById(tracerModelId);
	  tracerModelEl.value = (0, _jsonFormat2.default)(model, jsonFormatConfig);
	
	  var tracerUpdateEl = document.getElementById(tracerUpdateId);
	  tracerUpdateEl.value = (0, _jsonFormat2.default)(update, jsonFormatConfig);
	};
	
	var onSliderChange = function onSliderChange(renderRoot, tracerModel) {
	  return function (evt) {
	    var index = parseInt(evt.target.value, 10);
	    var snapshot = tracerModel.tracerStates[index];
	    renderRoot(snapshot.model);
	    tracerModel.tracerIndex = index;
	    updateView(snapshot, tracerModel);
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
	    var viewHtml = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<textarea id='" + tracerUpdateId + "' rows='5' cols='40' style='display: block'></textarea>" + "<textarea id='" + tracerModelId + "' rows='20' cols='40' style='display: block'></textarea></div>";
	
	    target.innerHTML = viewHtml;
	    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderRoot, tracerModel));
	    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
	  }
	};
	
	exports.initialView = initialView;
	exports.updateView = updateView;

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
	var receiveUpdate = function receiveUpdate(tracerModel, view) {
	  return function (model, update) {
	    var modelCopy = JSON.parse(JSON.stringify(model));
	    var modelAndUpdate = { model: modelCopy, update: update };
	    tracerModel.tracerStates.push(modelAndUpdate);
	    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
	
	    view(modelAndUpdate, tracerModel);
	
	    return model;
	  };
	};
	
	exports.default = receiveUpdate;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=meiosis-tracer.js.map