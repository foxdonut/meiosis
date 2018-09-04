(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["meiosisTracer"] = factory();
	else
		root["meiosisTracer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rowsId = exports.rowsId = "tracerRows";
var colsId = exports.colsId = "tracerCols";
var streamContainerId = exports.streamContainerId = "tracerStreamContainer";
var settingsContainerId = exports.settingsContainerId = "tracerSettingsContainer";
var hideTracerId = exports.hideTracerId = "tracerHide";
var showTracerId = exports.showTracerId = "tracerShow";
var autoId = exports.autoId = "traceAutoSend";

var streamId = exports.streamId = function streamId(index) {
  return "tracerStreamBox_ " + index;
};
var hiddenStreamId = exports.hiddenStreamId = function hiddenStreamId(index) {
  return "tracerStreamBoxHidden_" + index;
};
var hideStreamId = exports.hideStreamId = function hideStreamId(index) {
  return "tracerStreamHide_" + index;
};
var showStreamId = exports.showStreamId = function showStreamId(index) {
  return "tracerStreamShow_" + index;
};
var modelId = exports.modelId = function modelId(index) {
  return "tracerModel_" + index;
};
var sliderId = exports.sliderId = function sliderId(index) {
  return "tracerSlider_" + index;
};
var stepBackId = exports.stepBackId = function stepBackId(index) {
  return "tracerStepBack_" + index;
};
var stepForwardId = exports.stepForwardId = function stepForwardId(index) {
  return "tracerStepForward_" + index;
};
var sliderValueId = exports.sliderValueId = function sliderValueId(index) {
  return "tracerSliderValue_" + index;
};
var sendId = exports.sendId = function sendId(index) {
  return "tracerSend_" + index;
};
var resetId = exports.resetId = function resetId(index) {
  return "tracerReset_" + index;
};
var histId = exports.histId = function histId(index) {
  return "tracerAccumulateHistory_" + index;
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _meiosisTracer = __webpack_require__(/*! ./meiosis-tracer */ "./src/meiosis-tracer.js");

module.exports = _meiosisTracer.meiosisTracer;

/***/ }),

/***/ "./src/meiosis-tracer.js":
/*!*******************************!*\
  !*** ./src/meiosis-tracer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meiosisTracer = undefined;

var _trace = __webpack_require__(/*! ./trace */ "./src/trace.js");

var _tracer = __webpack_require__(/*! ./tracer */ "./src/tracer.js");

var meiosisTracer = exports.meiosisTracer = function meiosisTracer(params) {
  if (params.streams != null) {
    (0, _trace.trace)(params);
  }
  if (params.selector != null) {
    return (0, _tracer.tracer)(params);
  }
};

/***/ }),

/***/ "./src/settingsView.js":
/*!*****************************!*\
  !*** ./src/settingsView.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeResizeChangeDirection = exports.settingsView = undefined;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var settingsView = exports.settingsView = function settingsView(_ref) {
  var element = _ref.element,
      listeners = _ref.listeners,
      direction = _ref.direction,
      rows = _ref.rows,
      cols = _ref.cols,
      autoSend = _ref.autoSend;

  element.innerHTML = "<div id='" + C.settingsContainerId + "'>" + "<label title='Align in a row'>" + "<input type='radio' name='direction' value='row' " + (direction === "row" ? "checked" : "") + " />" + "Row " + "</label>" + "<label title='Align in a column'>" + "<input type='radio' name='direction' value='column' " + (direction === "column" ? "checked" : "") + " />" + "Col " + "</label>" + "<label title='Toggle auto-send'>" + "<input id='" + C.autoId + "' type='checkbox' " + (autoSend ? "checked" : "") + " />" + "Auto " + "</label> " + "<input title='Number of rows' id='" + C.rowsId + "' type='text' size='2'" + " value='" + rows + "'/>" + "<span> &times; </span> " + "<input title='Number of columns' id='" + C.colsId + "' type='text' size='2'" + " value='" + cols + "'/>" + "<button id='" + C.hideTracerId + "'>Hide</button>" + "</div>" + "<button id='" + C.showTracerId + "' style='display:none'>Show</button>";

  document.getElementById(C.hideTracerId).addEventListener("click", function (_evt) {
    listeners.onHideTracer();
  });

  document.getElementById(C.showTracerId).addEventListener("click", function (_evt) {
    listeners.onShowTracer();
  });

  document.getElementById(C.rowsId).addEventListener("input", function (evt) {
    listeners.onRowsColsChange(parseInt(evt.target.value, 10), parseInt(document.getElementById(C.colsId).value, 10));
  });

  document.getElementById(C.colsId).addEventListener("input", function (evt) {
    listeners.onRowsColsChange(parseInt(document.getElementById(C.rowsId).value, 10), parseInt(evt.target.value, 10));
  });

  var radios = document.querySelectorAll("input[name='direction']");
  for (var i = 0, t = radios.length; i < t; i++) {
    radios[i].addEventListener("change", function (evt) {
      if (evt.target.checked) {
        listeners.onDirectionChange(evt.target.value);
      }
    });
  }

  document.getElementById(C.autoId).addEventListener("change", function (evt) {
    listeners.onAutoChange(evt.target.checked);
  });
};

var initializeResizeChangeDirection = exports.initializeResizeChangeDirection = function initializeResizeChangeDirection(listeners, direction) {
  var directionAccordingToWindowSize = function directionAccordingToWindowSize() {
    var dir = window.innerWidth > window.innerHeight ? "row" : "column";
    var radios = document.querySelectorAll("input[name='direction']");
    for (var i = 0, t = radios.length; i < t; i++) {
      radios[i].checked = radios[i].value === dir;
    }
    listeners.onDirectionChange(dir);
  };

  if (direction === "auto") {
    window.addEventListener("resize", directionAccordingToWindowSize);
  }

  if (direction === "row" || direction === "column") {
    listeners.onDirectionChange(direction);
  } else {
    directionAccordingToWindowSize();
  }
};

/***/ }),

/***/ "./src/streamView.js":
/*!***************************!*\
  !*** ./src/streamView.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamView = undefined;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var streamView = exports.streamView = function streamView(_ref) {
  var element = _ref.element,
      index = _ref.index,
      listeners = _ref.listeners,
      _ref$label = _ref.label,
      label = _ref$label === undefined ? "" : _ref$label,
      rows = _ref.rows,
      cols = _ref.cols,
      _ref$hist = _ref.hist,
      hist = _ref$hist === undefined ? true : _ref$hist,
      _ref$hide = _ref.hide,
      hide = _ref$hide === undefined ? false : _ref$hide;

  var streamBoxStyle = "padding:8px;border:1px solid gray";

  element.innerHTML = "<div id='" + C.streamId(index) + "' style='" + streamBoxStyle + "'>" + "<div>" + "<span>" + label + " </span>" + "<label title='Toggle accumulate history'>" + "<input id='" + C.histId(index) + "' type='checkbox' " + (hist ? "checked" : "") + " />" + " Hist " + "</label>" + "<button id='" + C.hideStreamId(index) + "'>Hide</button>" + "</div>" + "<textarea id='" + C.modelId(index) + "' rows='" + rows + "' cols='" + cols + "'>" + "</textarea>" + "<div>" + "<input id='" + C.sliderId(index) + "' type='range' min='0' max='0' value='0'" + " style='width: 100%' />" + "<button id='" + C.stepBackId(index) + "'>&lt</button> " + "<button id='" + C.stepForwardId(index) + "'>&gt</button> " + "<span id='" + C.sliderValueId(index) + "'>-1</span> " + "<button id='" + C.sendId(index) + "'>Send</button> " + "<button id='" + C.resetId(index) + "'>Reset</button> " + "</div>" + "</div>" + "<div id='" + C.hiddenStreamId(index) + "' style='display:none'>" + "<span>" + label + " </span>" + "<button id='" + C.showStreamId(index) + "'>Show</button>" + "</div>";

  document.getElementById(C.sliderId(index)).addEventListener("input", function (evt) {
    listeners.onSliderChange(parseInt(evt.target.value, 10));
  });

  var stepBack = document.getElementById(C.stepBackId(index));
  stepBack.addEventListener("click", function (_evt) {
    listeners.onStepBack();
  });
  stepBack.disabled = true;

  var stepForward = document.getElementById(C.stepForwardId(index));
  stepForward.addEventListener("click", function (_evt) {
    listeners.onStepForward();
  });
  stepForward.disabled = true;

  document.getElementById(C.sendId(index)).addEventListener("click", function (_evt) {
    listeners.onSend(document.getElementById(C.modelId(index)).value);
  });

  document.getElementById(C.resetId(index)).addEventListener("click", function (_evt) {
    listeners.onReset();
  });

  var hideStream = function hideStream(index) {
    document.getElementById(C.streamId(index)).style = "display:none";
    document.getElementById(C.hiddenStreamId(index)).style = streamBoxStyle;
  };

  document.getElementById(C.hideStreamId(index)).addEventListener("click", function (_evt) {
    return hideStream(index);
  });

  document.getElementById(C.showStreamId(index)).addEventListener("click", function (_evt) {
    document.getElementById(C.hiddenStreamId(index)).style = "display:none";
    document.getElementById(C.streamId(index)).style = streamBoxStyle;
  });

  document.getElementById(C.histId(index)).addEventListener("change", function (evt) {
    listeners.onHistChange(index, evt.target.checked);
  });

  if (hide) {
    hideStream(index);
  }
};

/***/ }),

/***/ "./src/trace.js":
/*!**********************!*\
  !*** ./src/trace.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isMeiosisTracerOn = function isMeiosisTracerOn() {
  return window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
};

/*
Changes to a stream are sent to the tracer.

Stream values received from the tracer are pushed onto the stream.

They are either sent back or not according to the flag issued by the tracer:
- When auto-sent using the slider, do not send values back.
- When sent using the Send button, send values back; they can either be added
  to the history or not, according to a checkbox.

Messages:

- MEIOSIS_TRACER_INIT: received from the UI to initialize
- MEIOSIS_PING: sent to the UI in case we missed the INIT message, asks the UI to send INIT
- MEIOSIS_STREAM_OPTIONS: sent to the UI to initialize streams and options
- MEIOSIS_STREAM_VALUE: sent to the UI to indicate a new stream value
- MEIOSIS_TRIGGER_STREAM_VALUE: received from the UI to push a value onto a stream

Parameters:

- streams:              [ ]      // each item either a stream, or
    { stream, label, hist, hide, stringify, parse, listen, emit }
- stringify (optional): Function // default is obj => JSON.stringify(obj, null, 4)
- parse (optional):     Function // default is str => JSON.parse(str)
- listen (optional):    Function // default is (stream, fn) => stream.map(fn)
- emit (optional):      Function // default is (stream, value) => stream(value)
*/
var trace = exports.trace = function trace(_ref) {
  var _ref$streams = _ref.streams,
      streams = _ref$streams === undefined ? [] : _ref$streams,
      _ref$stringify = _ref.stringify,
      stringify = _ref$stringify === undefined ? function (obj) {
    return JSON.stringify(obj, null, 4);
  } : _ref$stringify,
      _ref$parse = _ref.parse,
      parse = _ref$parse === undefined ? function (str) {
    return JSON.parse(str);
  } : _ref$parse,
      _ref$listen = _ref.listen,
      listen = _ref$listen === undefined ? function (stream, fn) {
    return stream.map(fn);
  } : _ref$listen,
      _ref$emit = _ref.emit,
      emit = _ref$emit === undefined ? function (stream, value) {
    return stream(value);
  } : _ref$emit;

  if (!isMeiosisTracerOn()) {
    return;
  }
  var bufferedStreamValues = [];
  var devtoolInitialized = false;

  var streamObjs = [];

  for (var i = 0, t = streams.length; i < t; i++) {
    var defaultLabel = "Stream " + i;
    if (streams[i].stream) {
      streams[i].label = streams[i].label || defaultLabel;
      streamObjs.push(streams[i]);
    } else {
      streamObjs.push({ stream: streams[i], label: defaultLabel });
    }
  }

  streamObjs.forEach(function (_ref2, index) {
    var stream = _ref2.stream;

    listen(stream, function (value) {
      var data = { type: "MEIOSIS_STREAM_VALUE", index: index, value: stringify(value) };

      if (devtoolInitialized) {
        window.postMessage(data, "*");
      } else {
        bufferedStreamValues.push(data);
      }
    });
  });

  window.addEventListener("message", function (evt) {
    if (evt.data.type === "MEIOSIS_TRACER_INIT") {
      var streamOpts = [];
      streamObjs.forEach(function (streamObj) {
        var streamOpt = {};
        Object.keys(streamObj).forEach(function (key) {
          if (key !== "stream") {
            streamOpt[key] = streamObj[key];
          }
        });
        streamOpts.push(streamOpt);
      });
      window.postMessage({ type: "MEIOSIS_STREAM_OPTIONS", value: streamOpts }, "*");
      devtoolInitialized = true;
      bufferedStreamValues.forEach(function (data) {
        return window.postMessage(data, "*");
      });
      bufferedStreamValues.length = 0;
    } else if (evt.data.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
      var _evt$data = evt.data,
          index = _evt$data.index,
          value = _evt$data.value;

      emit(streamObjs[index].stream, parse(value));
    }
  });

  // Send ping in case tracer was already loaded and we missed the MEIOSIS_TRACER_INIT message.
  window.postMessage({ type: "MEIOSIS_PING" }, "*");
};

/***/ }),

/***/ "./src/tracer.js":
/*!***********************!*\
  !*** ./src/tracer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tracer = undefined;

var _streamView = __webpack_require__(/*! ./streamView */ "./src/streamView.js");

var _updateView = __webpack_require__(/*! ./updateView */ "./src/updateView.js");

var _settingsView = __webpack_require__(/*! ./settingsView */ "./src/settingsView.js");

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true;

var tracer = exports.tracer = function tracer(_ref) {
  var selector = _ref.selector,
      sendTracerInit = _ref.sendTracerInit,
      triggerStreamValue = _ref.triggerStreamValue,
      _ref$direction = _ref.direction,
      direction = _ref$direction === undefined ? "column" : _ref$direction,
      _ref$rows = _ref.rows,
      rows = _ref$rows === undefined ? 15 : _ref$rows,
      _ref$cols = _ref.cols,
      cols = _ref$cols === undefined ? 50 : _ref$cols,
      _ref$autoSend = _ref.autoSend,
      autoSend = _ref$autoSend === undefined ? true : _ref$autoSend;

  var target = document.querySelector(selector);

  if (!target) {
    return;
  }

  var states = [];
  var accumulateHistory = [];
  var containerStyle = null;

  if (sendTracerInit == null) {
    sendTracerInit = function sendTracerInit() {
      window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");
    };
  }

  if (triggerStreamValue == null) {
    triggerStreamValue = function triggerStreamValue(index, value) {
      window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", index: index, value: value }, "*");
    };
  }

  var receiveStreamOptions = function receiveStreamOptions(streamOptions) {
    if (target.lastChild) {
      return;
    }
    var settingsListeners = {
      onHideTracer: function onHideTracer() {
        var container = document.getElementById(C.streamContainerId);
        containerStyle = container.style;
        container.style = "display:none";

        document.getElementById(C.settingsContainerId).style = "display:none";
        document.getElementById(C.showTracerId).style = "";
      },
      onShowTracer: function onShowTracer() {
        document.getElementById(C.streamContainerId).style = containerStyle;

        document.getElementById(C.settingsContainerId).style = "";
        document.getElementById(C.showTracerId).style = "display:none";
      },
      onRowsColsChange: function onRowsColsChange(rows, cols) {
        for (var i = 0; i < streamOptions.length; i++) {
          var textarea = document.getElementById(C.modelId(i));
          textarea.rows = rows;
          textarea.cols = cols;
        }
      },
      onDirectionChange: function onDirectionChange(direction) {
        document.getElementById(C.streamContainerId).style = "display:flex;flex-direction:" + direction;
      },
      onAutoChange: function onAutoChange(auto) {
        autoSend = auto;
      }
    };
    var settings = document.createElement("div");
    target.append(settings);
    (0, _settingsView.settingsView)({ element: settings, listeners: settingsListeners, direction: direction,
      rows: rows, cols: cols, autoSend: autoSend });

    var container = document.createElement("div");
    container.id = C.streamContainerId;
    container.style = "display:flex;flex-direction:column";
    target.append(container);

    var sendStreamValue = function sendStreamValue(index, model) {
      if (autoSend) {
        accumulateHistory[index] = false;
        document.getElementById(C.histId(index)).checked = false;
        triggerStreamValue(index, model);
      }
    };

    var _loop = function _loop(index) {
      var _streamOptions$index = streamOptions[index],
          label = _streamOptions$index.label,
          hist = _streamOptions$index.hist,
          hide = _streamOptions$index.hide;

      states.push({ history: [], value: -1 });
      accumulateHistory.push(hist === false ? false : true);

      var listeners = {
        onSliderChange: function onSliderChange(value) {
          var state = states[index];
          var model = state.history[value];
          state.value = value;

          (0, _updateView.updateView)({ index: index, model: model, value: value });
          sendStreamValue(index, model);
        },
        onStepBack: function onStepBack() {
          var state = states[index];
          state.value = state.value - 1;
          var model = state.history[state.value];

          (0, _updateView.updateView)({ index: index, model: model, value: state.value });
          sendStreamValue(index, model);
        },
        onStepForward: function onStepForward() {
          var state = states[index];
          state.value = state.value + 1;
          var model = state.history[state.value];

          (0, _updateView.updateView)({ index: index, model: model, value: state.value });
          sendStreamValue(index, model);
        },
        onSend: function onSend(value) {
          triggerStreamValue(index, value);
        },
        onReset: function onReset() {
          var state = states[index];
          state.history.length = 0;
          state.value = -1;

          (0, _updateView.updateView)({ index: index, model: "", value: state.value, max: state.value });
        },
        onHistChange: function onHistChange(index, hist) {
          accumulateHistory[index] = hist;
        }
      };

      var element = document.createElement("div");
      element.style = "flex-grow:1";
      container.append(element);

      (0, _streamView.streamView)({ element: element, index: index, listeners: listeners, label: label, rows: rows, cols: cols, hist: hist, hide: hide });
    };

    for (var index = 0; index < streamOptions.length; index++) {
      _loop(index);
    }

    (0, _settingsView.initializeResizeChangeDirection)(settingsListeners, direction);
  };

  var receiveStreamValue = function receiveStreamValue(index, model) {
    if (accumulateHistory[index]) {
      var state = states[index];

      if (state.history.length > 0) {
        state.history.length = state.value + 1;
      }
      state.history.push(model);
      state.value = state.history.length - 1;

      (0, _updateView.updateView)({ index: index, model: model, value: state.value, max: state.history.length - 1 });
    }
  };

  var reset = function reset() {
    return null;
  };

  window.addEventListener("message", function (evt) {
    if (evt.data.type === "MEIOSIS_STREAM_OPTIONS") {
      receiveStreamOptions(evt.data.value);
    } else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      receiveStreamValue(evt.data.index, evt.data.value);
    }
  });

  sendTracerInit();

  return {
    receiveStreamOptions: receiveStreamOptions,
    receiveStreamValue: receiveStreamValue,
    reset: reset
  };
};

/***/ }),

/***/ "./src/updateView.js":
/*!***************************!*\
  !*** ./src/updateView.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateView = undefined;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateView = exports.updateView = function updateView(_ref) {
  var index = _ref.index,
      model = _ref.model,
      value = _ref.value,
      max = _ref.max;

  document.getElementById(C.modelId(index)).value = model;

  if (max != null) {
    document.getElementById(C.sliderId(index)).max = max;
  }

  document.getElementById(C.sliderId(index)).value = value;
  document.getElementById(C.sliderValueId(index)).innerHTML = value;

  document.getElementById(C.stepBackId(index)).disabled = value <= 0;
  document.getElementById(C.stepForwardId(index)).disabled = value == document.getElementById(C.sliderId(index)).max;
};

/***/ })

/******/ });
});
//# sourceMappingURL=meiosis-tracer.js.map