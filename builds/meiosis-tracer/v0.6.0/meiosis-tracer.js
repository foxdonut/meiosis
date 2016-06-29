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
	
	var _receive2 = _interopRequireDefault(_receive);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tracerModel = _model.initialModel;
	
	var meiosisTracer = function meiosisTracer(createComponent, renderRoot, selector) {
	  createComponent({
	    receive: (0, _receive2.default)(tracerModel, _view.proposalView)
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
/******/ ])
});
;
//# sourceMappingURL=meiosis-tracer.js.map