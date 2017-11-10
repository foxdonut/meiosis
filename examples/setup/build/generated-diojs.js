/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createActions = exports.createActions = function createActions(update) {
  return {
    togglePrecipitations: function togglePrecipitations(evt) {
      return update(function (model) {
        model.precipitations = evt.target.checked;
        return model;
      });
    },

    changePrecipitation: function changePrecipitation(evt) {
      return update(function (model) {
        model.precipitation = evt.target.value;
        return model;
      });
    },

    editDate: function editDate(evt) {
      return update(function (model) {
        model.date = evt.target.value;
        return model;
      });
    },

    increase: function increase(amount) {
      return update(function (model) {
        model.value = model.value + amount;
        return model;
      });
    },

    changeUnits: function changeUnits() {
      return update(function (model) {
        if (model.units === "C") {
          model.units = "F";
          model.value = Math.round(model.value * 9 / 5 + 32);
        } else {
          model.units = "C";
          model.value = Math.round((model.value - 32) / 9 * 5);
        }
        return model;
      });
    }
  };
};

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createView = undefined;

var _handler = __webpack_require__(12);

var precipitationOption = function precipitationOption(_ref) {
  var model = _ref.model,
      actions = _ref.actions,
      id = _ref.id,
      value = _ref.value,
      label = _ref.label;
  return jsx(
    "span",
    null,
    jsx("input", { type: "radio", id: id, name: "precipitation", value: value,
      checked: model.precipitation === value,
      onClick: (0, _handler.safe)(actions.changePrecipitation) }),
    jsx(
      "label",
      { htmlFor: id },
      label
    )
  );
};

var createView = exports.createView = function createView(actions) {
  return function (model) {
    return jsx(
      "div",
      null,
      jsx(
        "div",
        null,
        jsx("input", { type: "checkbox", checked: model.precipitations,
          onClick: (0, _handler.safe)(actions.togglePrecipitations), id: "precipitations" }),
        jsx(
          "label",
          { htmlFor: "precipitations" },
          "Precipitations"
        )
      ),
      jsx(
        "div",
        null,
        precipitationOption({ model: model, actions: actions, id: "rain", value: "RAIN", label: "Rain" }),
        precipitationOption({ model: model, actions: actions, id: "snow", value: "SNOW", label: "Snow" }),
        precipitationOption({ model: model, actions: actions, id: "sleet", value: "SLEET", label: "Sleet" })
      ),
      jsx(
        "div",
        null,
        "Date:",
        jsx("input", { type: "text", size: "10", value: model.date, onInput: (0, _handler.safe)(actions.editDate) })
      ),
      jsx(
        "span",
        null,
        "Temperature: "
      ),
      jsx(
        "span",
        { className: "tempValue" },
        model.value
      ),
      "\xB0",
      jsx(
        "span",
        { className: "tempUnits" },
        model.units
      ),
      jsx(
        "div",
        null,
        jsx(
          "button",
          { className: "btn btn-default increase", onClick: (0, _handler.wrap)(actions.increase, 1) },
          "Increase"
        ),
        jsx(
          "button",
          { className: "btn btn-default decrease", onClick: (0, _handler.wrap)(actions.increase, -1) },
          "Decrease"
        )
      ),
      jsx(
        "div",
        null,
        jsx(
          "button",
          { className: "btn btn-primary changeUnits", onClick: (0, _handler.safe)(actions.changeUnits) },
          "Change Units"
        )
      )
    );
  };
};

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var wrap = exports.wrap = function wrap(fn) {
  var args = Array.from(arguments).slice(1);

  return function (_evt) {
    if (fn) {
      fn.apply(null, args);
    }
  };
};

var safe = exports.safe = function safe(fn) {
  if (fn) {
    return fn;
  }
  return function (_evt) {};
};

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(14));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isMeiosisTracerOn() {
    return window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
}
exports.isMeiosisTracerOn = isMeiosisTracerOn;
function trace(params) {
    if (!params.update || !params.dataStreams) {
        throw new Error("Please specify update and dataStreams.");
    }
    if (isMeiosisTracerOn()) {
        var toJS_1 = params.toJS || (function (model) { return JSON.parse(JSON.stringify(model)); });
        var fromJS_1 = params.fromJS || (function (model) { return model; });
        var bufferedValues_1 = [];
        var bufferedStreamValues_1 = [];
        var devtoolInitialized_1 = false;
        var sendValues_1 = true;
        var liveChange_1 = true;
        var lastStream = params.dataStreams[params.dataStreams.length - 1];
        var otherStreamIds_1 = [];
        var otherStreamsById_1 = {};
        if (params.otherStreams && params.otherStreams.length) {
            params.otherStreams.forEach(function (otherStream) {
                var streamId = "stream_" + new Date().getTime();
                otherStreamIds_1.push(streamId);
                otherStreamsById_1[streamId] = otherStream;
                otherStream.map(function (value) {
                    var data = { type: "MEIOSIS_STREAM_VALUE", value: value, streamId: streamId };
                    if (devtoolInitialized_1) {
                        window.postMessage(data, "*");
                    }
                    else {
                        bufferedStreamValues_1.push(data);
                    }
                });
            });
        }
        window.addEventListener("message", function (evt) {
            if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
                sendValues_1 = evt.data.sendValuesBack;
                liveChange_1 = false;
                params.update(function () { return fromJS_1(evt.data.model); });
            }
            else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
                devtoolInitialized_1 = true;
                if (otherStreamIds_1.length > 0) {
                    window.postMessage({ type: "MEIOSIS_STREAM_IDS", streamIds: otherStreamIds_1 }, "*");
                }
                bufferedValues_1.forEach(function (values) { return window.postMessage({ type: "MEIOSIS_VALUES", values: values, update: true }, "*"); });
                bufferedStreamValues_1.forEach(function (data) { return window.postMessage(data, "*"); });
            }
            else if (evt.data.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
                var streamId = evt.data.streamId;
                var value = evt.data.value;
                otherStreamsById_1[streamId](value);
            }
        });
        lastStream.map(function () {
            if (sendValues_1 || liveChange_1) {
                var values = params.dataStreams.map(function (stream) {
                    return ({ value: toJS_1(stream()) });
                });
                if (devtoolInitialized_1) {
                    window.postMessage({ type: "MEIOSIS_VALUES", values: values, update: true }, "*");
                }
                else {
                    bufferedValues_1.push(values);
                }
            }
            liveChange_1 = true;
        });
        window.postMessage({ type: "MEIOSIS_PING" }, "*");
    }
}
exports.trace = trace;
;
//# sourceMappingURL=meiosis.js.map

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _meiosisTracer = __webpack_require__(1);

/*
1. Live change
- receive values from meiosis with update=true. This will add to the tracer's history
  and increase the slider max.
- re-render the tracer view with update=true.

2. Time-travel change
- send MEIOSIS_RENDER_MODEL with sendValuesBack=false
- we already have the values in the snapshot, so don't need anything back
- re-render the tracer view with update=false.

3. Typing in model textarea
- send MEIOSIS_RENDER_MODEL with sendValuesBack=true. The tracer needs to get
  the computed values from the other streams.
- receive values from meiosis with update=false so this will not add to the tracer's history.
- re-render the tracer view with update=false.
*/

module.exports = _meiosisTracer.meiosisTracer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
      triggerStreamValue = _ref.triggerStreamValue,
      horizontal = _ref.horizontal;

  var target = document.querySelector(selector);

  if (!target) {
    return;
  }

  var receiveValues = (0, _receive.createReceiveValues)(_model.tracerModel, _view.tracerView);

  renderModel = renderModel || function (model, sendValuesBack) {
    return window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model: model, sendValuesBack: sendValuesBack }, "*");
  };

  (0, _view.initialView)(selector, _model.tracerModel, renderModel, horizontal);

  triggerStreamValue = triggerStreamValue || function (streamId, value) {
    return window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", streamId: streamId, value: value }, "*");
  };

  var initStreamIdModel = function initStreamIdModel(streamIds) {
    streamIds.forEach(function (streamId) {
      return _model.tracerModel.streams[streamId] = { index: 0, values: [] };
    });
    (0, _view.initStreamIds)(streamIds, _model.tracerModel.streams, triggerStreamValue);
  };

  var receiveStreamValue = function receiveStreamValue(streamId, value) {
    var streamState = _model.tracerModel.streams[streamId];

    streamState.values.push(value);
    streamState.index = streamState.values.length - 1;

    (0, _view.updateStreamValue)(streamId, streamState);
  };

  window.addEventListener("message", function (evt) {
    if (evt.data.type === "MEIOSIS_VALUES") {
      receiveValues(evt.data.values, evt.data.update);
    } else if (evt.data.type === "MEIOSIS_STREAM_IDS") {
      var streamIds = evt.data.streamIds;
      initStreamIdModel(streamIds);
    } else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      receiveStreamValue(evt.data.streamId, evt.data.value);
    }
  });

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");

  return {
    receiveValues: receiveValues,
    initStreamIdModel: initStreamIdModel,
    receiveStreamValue: receiveStreamValue,
    reset: function reset() {
      return (0, _view.reset)(_model.tracerModel);
    }
  };
};

exports.meiosisTracer = meiosisTracer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tracerModel = {
  tracerStates: [],
  tracerIndex: 0,
  streams: {} // id: { index: N, values: [] }
};

exports.tracerModel = tracerModel;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStreamValue = exports.initStreamIds = exports.reset = exports.tracerView = exports.initialView = undefined;

var _jsonFormat = __webpack_require__(4);

var _jsonFormat2 = _interopRequireDefault(_jsonFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonFormatConfig = {
  type: "space",
  size: 2
};

var tracerContainerId = "tracerContainer";
var dataStreamContainerId = "dataStreamContainer";
var otherStreamContainerId = "otherStreamContainer";
var tracerId = "tracerSlider";
var tracerToggleId = "tracerToggle";
var tracerResetId = "tracerReset";
var tracerIndexId = "tracerIndex";
var tracerModelId = "tracerModel";
var errorMessageId = "errorMessage";
var errorMessage = null;
var divStyle = null;

var tracerView = function tracerView(values, tracerModel) {
  var tracer = document.getElementById(tracerId);
  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
  tracer.value = String(tracerModel.tracerIndex);

  var tracerIndex = document.getElementById(tracerIndexId);
  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

  var tracerModelEl = document.getElementById(tracerModelId);
  tracerModelEl.value = (0, _jsonFormat2.default)(values[0].value, jsonFormatConfig);

  var streamValueDivs = document.querySelectorAll("div.dataStream");

  if (streamValueDivs.length === 0) {
    var streamValueDivsMarkup = "";

    for (var i = 1, t = values.length; i < t; i++) {
      streamValueDivsMarkup += "<div" + divStyle + " class='dataStream'>" + "<textarea rows='5' cols='40'></textarea>" + "</div>";
    }
    document.getElementById(dataStreamContainerId).innerHTML = streamValueDivsMarkup;
  }

  var streamTextareas = document.querySelectorAll("div.dataStream textarea");

  for (i = 1, t = values.length; i < t; i++) {
    streamTextareas[i - 1].value = (0, _jsonFormat2.default)(values[i].value, jsonFormatConfig);
  }
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

var onStreamSliderChange = function onStreamSliderChange(streamModel, streamId) {
  return function (evt) {
    var streamState = streamModel[streamId];
    var index = parseInt(evt.target.value, 10);

    streamState.index = index;

    updateStreamValue(streamId, streamState);
  };
};

var onStreamValueChange = function onStreamValueChange(streamId, textarea, triggerStreamValue) {
  return function () {
    try {
      var value = JSON.parse(textarea.value);
      triggerStreamValue(streamId, value);
      errorMessage.style.display = "none";
    } catch (err) {
      errorMessage.style.display = "block";
    }
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
  var snapshot = tracerModel.tracerStates[0];
  tracerModel.tracerStates.length = 0;
  tracerModel.tracerIndex = 0;
  tracerView(snapshot, tracerModel);
};

var initialView = function initialView(selector, tracerModel, renderModel, horizontal) {
  var target = document.querySelector(selector);

  if (target) {
    divStyle = horizontal ? " style='float: left'" : "";

    var viewHtml = "<div style='text-align: right'><button id='" + tracerToggleId + "'>Hide</button></div>" + "<div id='" + tracerContainerId + "'>" + "<div style='text-align: right'><button id='" + tracerResetId + "'>Reset</button></div>" + "<div>Data streams:</div>" + "<input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) + "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" + "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" + "<div" + divStyle + ">" + "<div>Model: (you can type into this box)</div>" + "<textarea id='" + tracerModelId + "' rows='5' cols='40'></textarea>" + "<div id='" + errorMessageId + "' style='display: none'><span style='color:red'>Invalid JSON</span></div>" + "</div>" + "<span id='" + dataStreamContainerId + "'></span>" + "<span id='" + otherStreamContainerId + "'></span>" + "</div>";

    target.innerHTML = viewHtml;

    var tracerContainer = document.getElementById(tracerContainerId);
    errorMessage = document.getElementById(errorMessageId);

    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderModel, tracerModel));
    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderModel));
    document.getElementById(tracerToggleId).addEventListener("click", onToggle(tracerContainer));
    document.getElementById(tracerResetId).addEventListener("click", onReset(tracerModel));
  }
};

var initStreamIds = function initStreamIds(streamIds, streamModel, triggerStreamValue) {
  var streamValueDivsMarkup = "<div>Other streams:</div>";

  streamIds.forEach(function (streamId) {
    return streamValueDivsMarkup += "<div" + divStyle + " class='otherStream' id='" + streamId + "'>" + "<input type='range' min='0' max='0' value='0' style='width: 100%'/>" + "<div>0</div>" + "<textarea rows='5' cols='40'></textarea>" + "<div><button>Trigger</button></div>" + "</div>";
  });
  document.getElementById(otherStreamContainerId).innerHTML = streamValueDivsMarkup;

  streamIds.forEach(function (streamId) {
    var container = document.getElementById(streamId);

    var input = container.getElementsByTagName("input")[0];
    input.addEventListener("input", onStreamSliderChange(streamModel, streamId));

    var button = container.getElementsByTagName("button")[0];
    var textarea = container.getElementsByTagName("textarea")[0];
    button.addEventListener("click", onStreamValueChange(streamId, textarea, triggerStreamValue));
  });
};

var updateStreamValue = function updateStreamValue(streamId, streamState) {
  var container = document.getElementById(streamId);
  var textarea = container.getElementsByTagName("textarea")[0];
  var input = container.getElementsByTagName("input")[0];
  var div = container.getElementsByTagName("div")[0];

  textarea.value = (0, _jsonFormat2.default)(streamState.values[streamState.index], jsonFormatConfig);
  input.setAttribute("max", String(streamState.values.length - 1));
  input.value = String(streamState.index);
  div.innerHTML = String(streamState.index);
};

exports.initialView = initialView;
exports.tracerView = tracerView;
exports.reset = reset;
exports.initStreamIds = initStreamIds;
exports.updateStreamValue = updateStreamValue;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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
    throw new Error('Unrecognized indent type: "' + config.type + '"');
  }
  var indentType = new Array((config.size || indent.size) + 1).join(indent.char);
  return JSONFormat(JSON.stringify(json), indentType);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createReceiveValues = function createReceiveValues(tracerModel, view) {
  return function (values, update) {
    if (update) {
      if (tracerModel.tracerStates.length > 0) {
        tracerModel.tracerStates.length = tracerModel.tracerIndex + 1;
      }
      tracerModel.tracerStates.push(values);
      tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
    }
    view(values, tracerModel);
  };
};

exports.createReceiveValues = createReceiveValues;

/***/ })
/******/ ]);
//# sourceMappingURL=meiosis-tracer.js.map

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

var _isPlaceholder = __webpack_require__(0);


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


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = undefined;

var _flyd = __webpack_require__(5);

var _flyd2 = _interopRequireDefault(_flyd);

var _temperature = __webpack_require__(9);

var _meiosis = __webpack_require__(13);

var _meiosisTracer = __webpack_require__(15);

var _meiosisTracer2 = _interopRequireDefault(_meiosisTracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Only for using Meiosis Tracer in development.
var setup = exports.setup = function setup(render) {
  var update = _flyd2.default.stream();
  var temperature = (0, _temperature.createTemperature)(update);
  var initialModel = temperature.model();
  var applyUpdate = function applyUpdate(model, modelUpdate) {
    return modelUpdate(model);
  };
  var models = _flyd2.default.scan(applyUpdate, initialModel, update);

  var element = document.getElementById("app");
  models.map(function (model) {
    return render(temperature.view(model), element);
  });

  // Only for using Meiosis Tracer in development.
  (0, _meiosis.trace)({ update: update, dataStreams: [models] });
  (0, _meiosisTracer2.default)({ selector: "#tracer" });

  return { models: models, view: temperature.view, render: render, element: element };
};

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curryN = __webpack_require__(6);

// Utility
function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}
function trueFn() { return true; }

// Globals
var toUpdate = [];
var inStream;
var order = [];
var orderNextIdx = -1;
var flushing = false;

/** @namespace */
var flyd = {}

// /////////////////////////// API ///////////////////////////////// //

/**
 * Creates a new stream
 *
 * __Signature__: `a -> Stream a`
 *
 * @name flyd.stream
 * @param {*} initialValue - (Optional) the initial value of the stream
 * @return {stream} the stream
 *
 * @example
 * var n = flyd.stream(1); // Stream with initial value `1`
 * var s = flyd.stream(); // Stream with no initial value
 */
flyd.stream = function(initialValue) {
  var endStream = createDependentStream([], trueFn);
  var s = createStream();
  s.end = endStream;
  s.fnArgs = [];
  endStream.listeners.push(s);
  s.toJSON = function() {
    return s();
  };
  if (arguments.length > 0) s(initialValue);
  return s;
}

/**
 * Create a new dependent stream
 *
 * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`
 *
 * @name flyd.combine
 * @param {Function} fn - the function used to combine the streams
 * @param {Array<stream>} dependencies - the streams that this one depends on
 * @return {stream} the dependent stream
 *
 * @example
 * var n1 = flyd.stream(0);
 * var n2 = flyd.stream(0);
 * var max = flyd.combine(function(n1, n2, self, changed) {
 *   return n1() > n2() ? n1() : n2();
 * }, [n1, n2]);
 */
flyd.combine = curryN(2, combine);
function combine(fn, streams) {
  var i, s, deps, depEndStreams;
  var endStream = createDependentStream([], trueFn);
  deps = []; depEndStreams = [];
  for (i = 0; i < streams.length; ++i) {
    if (streams[i] !== undefined) {
      deps.push(streams[i]);
      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
    }
  }
  s = createDependentStream(deps, fn);
  s.depsChanged = [];
  s.fnArgs = s.deps.concat([s, s.depsChanged]);
  s.end = endStream;
  endStream.listeners.push(s);
  addListeners(depEndStreams, endStream);
  endStream.deps = depEndStreams;
  updateStream(s);
  return s;
}

/**
 * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.
 *
 * __Signature__: `* -> Boolean`
 *
 * @name flyd.isStream
 * @param {*} value - the value to test
 * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise
 *
 * @example
 * var s = flyd.stream(1);
 * var n = 1;
 * flyd.isStream(s); //=> true
 * flyd.isStream(n); //=> false
 */
flyd.isStream = function(stream) {
  return isFunction(stream) && 'hasVal' in stream;
}

/**
 * Invokes the body (the function to calculate the value) of a dependent stream
 *
 * By default the body of a dependent stream is only called when all the streams
 * upon which it depends has a value. `immediate` can circumvent this behaviour.
 * It immediately invokes the body of a dependent stream.
 *
 * __Signature__: `Stream a -> Stream a`
 *
 * @name flyd.immediate
 * @param {stream} stream - the dependent stream
 * @return {stream} the same stream
 *
 * @example
 * var s = flyd.stream();
 * var hasItems = flyd.immediate(flyd.combine(function(s) {
 *   return s() !== undefined && s().length > 0;
 * }, [s]);
 * console.log(hasItems()); // logs `false`. Had `immediate` not been
 *                          // used `hasItems()` would've returned `undefined`
 * s([1]);
 * console.log(hasItems()); // logs `true`.
 * s([]);
 * console.log(hasItems()); // logs `false`.
 */
flyd.immediate = function(s) {
  if (s.depsMet === false) {
    s.depsMet = true;
    updateStream(s);
  }
  return s;
}

/**
 * Changes which `endsStream` should trigger the ending of `s`.
 *
 * __Signature__: `Stream a -> Stream b -> Stream b`
 *
 * @name flyd.endsOn
 * @param {stream} endStream - the stream to trigger the ending
 * @param {stream} stream - the stream to be ended by the endStream
 * @param {stream} the stream modified to be ended by endStream
 *
 * @example
 * var n = flyd.stream(1);
 * var killer = flyd.stream();
 * // `double` ends when `n` ends or when `killer` emits any value
 * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {
 *   return 2 * n();
 * }, [n]);
*/
flyd.endsOn = function(endS, s) {
  detachDeps(s.end);
  endS.listeners.push(s.end);
  s.end.deps.push(endS);
  return s;
}

/**
 * Map a stream
 *
 * Returns a new stream consisting of every value from `s` passed through
 * `fn`. I.e. `map` creates a new stream that listens to `s` and
 * applies `fn` to every new value.
 * __Signature__: `(a -> result) -> Stream a -> Stream result`
 *
 * @name flyd.map
 * @param {Function} fn - the function that produces the elements of the new stream
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);
 */
// Library functions use self callback to accept (null, undefined) update triggers.
flyd.map = curryN(2, function(f, s) {
  return combine(function(s, self) { self(f(s.val)); }, [s]);
})

/**
 * Listen to stream events
 *
 * Similar to `map` except that the returned stream is empty. Use `on` for doing
 * side effects in reaction to stream changes. Use the returned stream only if you
 * need to manually end it.
 *
 * __Signature__: `(a -> result) -> Stream a -> Stream undefined`
 *
 * @name flyd.on
 * @param {Function} cb - the callback
 * @param {stream} stream - the stream
 * @return {stream} an empty stream (can be ended)
 */
flyd.on = curryN(2, function(f, s) {
  return combine(function(s) { f(s.val); }, [s]);
})

/**
 * Creates a new stream with the results of calling the function on every incoming
 * stream with and accumulator and the incoming value.
 *
 * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`
 *
 * @name flyd.scan
 * @param {Function} fn - the function to call
 * @param {*} val - the initial value of the accumulator
 * @param {stream} stream - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var numbers = flyd.stream();
 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
 * numbers(2)(3)(5);
 * sum(); // 10
 */
flyd.scan = curryN(3, function(f, acc, s) {
  var ns = combine(function(s, self) {
    self(acc = f(acc, s.val));
  }, [s]);
  if (!ns.hasVal) ns(acc);
  return ns;
});

/**
 * Creates a new stream down which all values from both `stream1` and `stream2`
 * will be sent.
 *
 * __Signature__: `Stream a -> Stream a -> Stream a`
 *
 * @name flyd.merge
 * @param {stream} source1 - one stream to be merged
 * @param {stream} source2 - the other stream to be merged
 * @return {stream} a stream with the values from both sources
 *
 * @example
 * var btn1Clicks = flyd.stream();
 * button1Elm.addEventListener(btn1Clicks);
 * var btn2Clicks = flyd.stream();
 * button2Elm.addEventListener(btn2Clicks);
 * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
 */
flyd.merge = curryN(2, function(s1, s2) {
  var s = flyd.immediate(combine(function(s1, s2, self, changed) {
    if (changed[0]) {
      self(changed[0]());
    } else if (s1.hasVal) {
      self(s1.val);
    } else if (s2.hasVal) {
      self(s2.val);
    }
  }, [s1, s2]));
  flyd.endsOn(combine(function() {
    return true;
  }, [s1.end, s2.end]), s);
  return s;
});

/**
 * Creates a new stream resulting from applying `transducer` to `stream`.
 *
 * __Signature__: `Transducer -> Stream a -> Stream b`
 *
 * @name flyd.transduce
 * @param {Transducer} xform - the transducer transformation
 * @param {stream} source - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var t = require('transducers.js');
 *
 * var results = [];
 * var s1 = flyd.stream();
 * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());
 * var s2 = flyd.transduce(tx, s1);
 * flyd.combine(function(s2) { results.push(s2()); }, [s2]);
 * s1(1)(1)(2)(3)(3)(3)(4);
 * results; // => [2, 4, 6, 8]
 */
flyd.transduce = curryN(2, function(xform, source) {
  xform = xform(new StreamTransformer());
  return combine(function(source, self) {
    var res = xform['@@transducer/step'](undefined, source.val);
    if (res && res['@@transducer/reduced'] === true) {
      self.end(true);
      return res['@@transducer/value'];
    } else {
      return res;
    }
  }, [source]);
});

/**
 * Returns `fn` curried to `n`. Use this function to curry functions exposed by
 * modules for Flyd.
 *
 * @name flyd.curryN
 * @function
 * @param {Integer} arity - the function arity
 * @param {Function} fn - the function to curry
 * @return {Function} the curried function
 *
 * @example
 * function add(x, y) { return x + y; };
 * var a = flyd.curryN(2, add);
 * a(2)(4) // => 6
 */
flyd.curryN = curryN

/**
 * Returns a new stream identical to the original except every
 * value will be passed through `f`.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`
 *
 * @name stream.map
 * @param {Function} function - the function to apply
 * @return {stream} a new stream with the values mapped
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.map(function(n) { return n*n; });
 */
function boundMap(f) { return flyd.map(f, this); }

/**
 * Returns a new stream which is the result of applying the
 * functions from `this` stream to the values in `stream` parameter.
 *
 * `this` stream must be a stream of functions.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`
 *
 * @name stream.ap
 * @param {stream} stream - the values stream
 * @return {stream} a new stream with the functions applied to values
 *
 * @example
 * var add = flyd.curryN(2, function(x, y) { return x + y; });
 * var numbers1 = flyd.stream();
 * var numbers2 = flyd.stream();
 * var addToNumbers1 = flyd.map(add, numbers1);
 * var added = addToNumbers1.ap(numbers2);
 */
function ap(s2) {
  var s1 = this;
  return combine(function(s1, s2, self) { self(s1.val(s2.val)); }, [s1, s2]);
}

/**
 * Get a human readable view of a stream
 * @name stream.toString
 * @return {String} the stream string representation
 */
function streamToString() {
  return 'stream(' + this.val + ')';
}

/**
 * @name stream.end
 * @memberof stream
 * A stream that emits `true` when the stream ends. If `true` is pushed down the
 * stream the parent stream ends.
 */

/**
 * @name stream.of
 * @function
 * @memberof stream
 * Returns a new stream with `value` as its initial value. It is identical to
 * calling `flyd.stream` with one argument.
 *
 * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`
 *
 * @param {*} value - the initial value
 * @return {stream} the new stream
 *
 * @example
 * var n = flyd.stream(1);
 * var m = n.of(1);
 */

// /////////////////////////// PRIVATE ///////////////////////////////// //
/**
 * @private
 * Create a stream with no dependencies and no value
 * @return {Function} a flyd stream
 */
function createStream() {
  function s(n) {
    if (arguments.length === 0) return s.val
    updateStreamValue(s, n)
    return s
  }
  s.hasVal = false;
  s.val = undefined;
  s.vals = [];
  s.listeners = [];
  s.queued = false;
  s.end = undefined;
  s.map = boundMap;
  s.ap = ap;
  s.of = flyd.stream;
  s.toString = streamToString;
  return s;
}

/**
 * @private
 * Create a dependent stream
 * @param {Array<stream>} dependencies - an array of the streams
 * @param {Function} fn - the function used to calculate the new stream value
 * from the dependencies
 * @return {stream} the created stream
 */
function createDependentStream(deps, fn) {
  var s = createStream();
  s.fn = fn;
  s.deps = deps;
  s.depsMet = false;
  s.depsChanged = deps.length > 0 ? [] : undefined;
  s.shouldUpdate = false;
  addListeners(deps, s);
  return s;
}

/**
 * @private
 * Check if all the dependencies have values
 * @param {stream} stream - the stream to check depencencies from
 * @return {Boolean} `true` if all dependencies have vales, `false` otherwise
 */
function initialDepsNotMet(stream) {
  stream.depsMet = stream.deps.every(function(s) {
    return s.hasVal;
  });
  return !stream.depsMet;
}

/**
 * @private
 * Update a dependent stream using its dependencies in an atomic way
 * @param {stream} stream - the stream to update
 */
function updateStream(s) {
  if ((s.depsMet !== true && initialDepsNotMet(s)) ||
      (s.end !== undefined && s.end.val === true)) return;
  if (inStream !== undefined) {
    toUpdate.push(s);
    return;
  }
  inStream = s;
  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
  var returnVal = s.fn.apply(s.fn, s.fnArgs);
  if (returnVal !== undefined) {
    s(returnVal);
  }
  inStream = undefined;
  if (s.depsChanged !== undefined) s.depsChanged = [];
  s.shouldUpdate = false;
  if (flushing === false) flushUpdate();
}

/**
 * @private
 * Update the dependencies of a stream
 * @param {stream} stream
 */
function updateDeps(s) {
  var i, o, list
  var listeners = s.listeners;
  for (i = 0; i < listeners.length; ++i) {
    list = listeners[i];
    if (list.end === s) {
      endStream(list);
    } else {
      if (list.depsChanged !== undefined) list.depsChanged.push(s);
      list.shouldUpdate = true;
      findDeps(list);
    }
  }
  for (; orderNextIdx >= 0; --orderNextIdx) {
    o = order[orderNextIdx];
    if (o.shouldUpdate === true) updateStream(o);
    o.queued = false;
  }
}

/**
 * @private
 * Add stream dependencies to the global `order` queue.
 * @param {stream} stream
 * @see updateDeps
 */
function findDeps(s) {
  var i
  var listeners = s.listeners;
  if (s.queued === false) {
    s.queued = true;
    for (i = 0; i < listeners.length; ++i) {
      findDeps(listeners[i]);
    }
    order[++orderNextIdx] = s;
  }
}

/**
 * @private
 */
function flushUpdate() {
  flushing = true;
  while (toUpdate.length > 0) {
    var s = toUpdate.shift();
    if (s.vals.length > 0) s.val = s.vals.shift();
    updateDeps(s);
  }
  flushing = false;
}

/**
 * @private
 * Push down a value into a stream
 * @param {stream} stream
 * @param {*} value
 */
function updateStreamValue(s, n) {
  if (n !== undefined && n !== null && isFunction(n.then)) {
    n.then(s);
    return;
  }
  s.val = n;
  s.hasVal = true;
  if (inStream === undefined) {
    flushing = true;
    updateDeps(s);
    if (toUpdate.length > 0) flushUpdate(); else flushing = false;
  } else if (inStream === s) {
    markListeners(s, s.listeners);
  } else {
    s.vals.push(n);
    toUpdate.push(s);
  }
}

/**
 * @private
 */
function markListeners(s, lists) {
  var i, list;
  for (i = 0; i < lists.length; ++i) {
    list = lists[i];
    if (list.end !== s) {
      if (list.depsChanged !== undefined) {
        list.depsChanged.push(s);
      }
      list.shouldUpdate = true;
    } else {
      endStream(list);
    }
  }
}

/**
 * @private
 * Add dependencies to a stream
 * @param {Array<stream>} dependencies
 * @param {stream} stream
 */
function addListeners(deps, s) {
  for (var i = 0; i < deps.length; ++i) {
    deps[i].listeners.push(s);
  }
}

/**
 * @private
 * Removes an stream from a dependency array
 * @param {stream} stream
 * @param {Array<stream>} dependencies
 */
function removeListener(s, listeners) {
  var idx = listeners.indexOf(s);
  listeners[idx] = listeners[listeners.length - 1];
  listeners.length--;
}

/**
 * @private
 * Detach a stream from its dependencies
 * @param {stream} stream
 */
function detachDeps(s) {
  for (var i = 0; i < s.deps.length; ++i) {
    removeListener(s, s.deps[i].listeners);
  }
  s.deps.length = 0;
}

/**
 * @private
 * Ends a stream
 */
function endStream(s) {
  if (s.deps !== undefined) detachDeps(s);
  if (s.end !== undefined) detachDeps(s.end);
}

/**
 * @private
 * transducer stream transformer
 */
function StreamTransformer() { }
StreamTransformer.prototype['@@transducer/init'] = function() { };
StreamTransformer.prototype['@@transducer/result'] = function() { };
StreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };

module.exports = flyd;


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(1);
var _curry1 = __webpack_require__(2);
var _curry2 = __webpack_require__(7);
var _curryN = __webpack_require__(8);


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


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _setup = __webpack_require__(68);

(0, _setup.setupApp)();

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupApp = exports.setupRender = undefined;

var _dio = __webpack_require__(69);

var _common = __webpack_require__(4);

var setupRender = exports.setupRender = function setupRender() {
  global.jsx = _dio.h;
  return _dio.render;
};

var setupApp = exports.setupApp = function setupApp() {
  return (0, _common.setup)(setupRender());
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! DIO 8.0.3 @license MIT */

;(function (global) {/* eslint-disable */'use strict'
function factory (window, __require__) {

	var version = '8.0.3'
	
	var SharedElementPromise = -3
	var SharedElementFragment = -2
	var SharedElementPortal = -1
	var SharedElementIntermediate = 0
	var SharedElementComponent = 1
	var SharedElementNode = 2
	var SharedElementText = 3
	var SharedElementEmpty = 4
	
	var SharedReferenceRemove = -1
	var SharedReferenceAssign = 0
	var SharedReferenceDispatch = 1
	var SharedReferenceReplace = 2
	
	var SharedComponentForceUpdate = 0
	var SharedComponentPropsUpdate = 1
	var SharedComponentStateUpdate = 2
	
	var SharedMountQuery = 0
	var SharedMountCommit = 1
	var SharedMountRemove = 2
	var SharedMountAppend = 3
	var SharedMountInsert = 4
	
	var SharedWorkMounting = -2
	var SharedWorkProcessing = -1
	var SharedWorkIntermediate = 0
	var SharedWorkIdle = 1
	
	var SharedErrorPassive = -2
	var SharedErrorActive = -1
	
	var SharedPropsMount = 1
	var SharedPropsUpdate = 2
	
	var SharedSiblingPrevious = 'prev'
	var SharedSiblingNext = 'next'
	
	var SharedSiteCallback = 'callback'
	var SharedSiteRender = 'render'
	var SharedSiteElement = 'element'
	var SharedSiteConstructor = 'constructor'
	var SharedSiteAsync = 'async'
	var SharedSiteSetState = 'setState'
	var SharedSiteFindDOMNode = 'findDOMNode'
	
	var SharedTypeKey = '.'
	var SharedTypeEmpty = '#empty'
	var SharedTypeText = '#text'
	var SharedTypeFragment = '#fragment'
	
	var SharedComponentWillMount = 'componentWillMount'
	var SharedComponentDidMount = 'componentDidMount'
	var SharedComponentWillReceiveProps = 'componentWillReceiveProps'
	var SharedComponentShouldUpdate = 'shouldComponentUpdate'
	var SharedComponentWillUpdate = 'componentWillUpdate'
	var SharedComponentDidUpdate = 'componentDidUpdate'
	var SharedComponentWillUnmount = 'componentWillUnmount'
	var SharedComponentDidCatch = 'componentDidCatch'
	var SharedGetChildContext = 'getChildContext'
	var SharedGetInitialState = 'getInitialState'
	
	/**
	 * @constructor
	 */
	function List () {
		this.next = this
		this.prev = this
		this.length = 0
	}
	List.prototype = {
		/**
		 * @param {Object} node
		 * @param {Object} before
		 * @return {Object}
		 */
		insert: function insert (node, before) {
			node.next = before
			node.prev = before.prev
			before.prev.next = node
			before.prev = node
			this.length++
	
			return node
		},
		/**
		 * @param {Object} node
		 * @return {Object}
		 */
		remove: function remove (node) {
			if (this.length === 0)
				return node
	
			node.next.prev = node.prev
			node.prev.next = node.next
			this.length--
	
			return node
		},
		/**
		 * @param {function} callback
		 */
		forEach: function forEach (callback) {
			for (var i = 0, node = this; i < this.length; ++i)
				callback(node = node.next, i)
		}
	}
	
	/**
	 * @constructor
	 */
	function WeakHash () {
		this.hash = ''
	}
	WeakHash.prototype = {
		/**
		 * @param {*} key
		 * @param {*} value
		 */
		set: function set (key, value) {
			key[this.hash] = value
		},
		/**
		 * @param {*} key
		 * @return {*}
		 */
		get: function get (key) {
			return key[this.hash]
		},
		/**
		 * @param {*} key
		 * @return {boolean}
		 */
		has: function has (key) {
			return this.hash in key
		}
	}
	
	/**
	 * @return {void}
	 */
	function noop () {}
	
	/**
	 * @param {Object} object
	 * @param {Object} primary
	 */
	function merge (object, primary) {
		for (var key in primary)
			object[key] = primary[key]
	
		return object
	}
	
	/**
	 * @param {Object} object
	 * @param {Object} primary
	 * @param {Object} secondary
	 * @return {Object}
	 */
	function assign (object, primary, secondary) {
		for (var key in primary)
			object[key] = primary[key]
	
		for (var key in secondary)
			object[key] = secondary[key]
	
		return object
	}
	
	/**
	 * @param {Array} array
	 * @param {Array} output
	 * @return {Array}
	 */
	function flatten (array, output) {
		for (var i = 0; i < array.length; ++i)
			if (isArray(array[i]))
				flatten(array[i], output)
			else
				output.push(array[i])
	
		return output
	}
	
	/**
	 * @param {Iterable} iterable
	 * @param {function} callback
	 */
	function each (iterable, callback) {
		if (iterable.forEach)
			return iterable.forEach(callback)
	
		var value = iterable.next()
		var index = 0
	
		while (!value.done) {
			index = callback(value.value, index)
			value = iterable.next(value.value)
		}
	}
	
	/**
	 * @param {string} from
	 * @param {string} message
	 */
	function invariant (from, message) {
		throw new Error('#'+from+'(...): '+message+'.')
	}
	
	/**
	 * @param {Object} a
	 * @param {Object} b
	 * @return {boolean}
	 */
	function compare (a, b) {
		for (var key in a)
			if (!hasOwnProperty.call(b, key))
				return true
	
		for (var key in b)
			if (!is(a[key], b[key]))
				return true
	
		return false
	}
	
	/**
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */
	function is (a, b) {
		if (a === b)
			return a !== 0 || 1/a === 1/b
		else
			return a !== a && b !== b
	}
	
	var Promise = window.Promise || {}
	var WeakMap = window.WeakMap || WeakHash
	var Symbol = window.Symbol || function (d) { return 'Symbol('+d+')' }
	var requestAnimationFrame = window.requestAnimationFrame || function (c) { setTimeout(c, 16) }
	var defineProperty = Object.defineProperty
	var defineProperties = Object.defineProperties
	var hasOwnProperty = Object.hasOwnProperty
	var isArray = Array.isArray
	var SymbolIterator = Symbol.iterator || '@@iterator'
	var SymbolError = Symbol('Error')
	var SymbolElement = Symbol('Element')
	var SymbolComponent = Symbol('Component')
	var DOMMap = new WeakMap()
	
	/**
	 * @constructor
	 * @param {number} id
	 */
	function Element (id) {
		this.id = id
		this.work = SharedWorkIdle
		this.active = false
		this.xmlns = ''
		this.key = null
		this.ref = null
		this.type = null
		this.props = null
		this.state = null
		this.children = null
		this.owner = null
		this.instance = null
		this.event = null
		this.DOM = null
		this.context = null
		this.parent = null
		this.host = null
		this.next = null
		this.prev = null
	}
	
	/**
	 * @param {Element} element
	 * @return {Element}
	 */
	function createElementImmutable (snapshot) {
		var element = new Element(snapshot.id)
	
		element.type = snapshot.type
		element.props = snapshot.props
		element.xmlns = snapshot.xmlns
		element.key = snapshot.key
		element.ref = snapshot.ref
		element.children = snapshot.children
	
		return element
	}
	
	/**
	 * @return {Element}
	 */
	function createElementIntermediate () {
		return new Element(SharedElementIntermediate)
	}
	
	/**
	 * @param {*} content
	 * @param {*} key
	 * @return {Element}
	 */
	function createElementText (content, key) {
		var element = new Element(SharedElementText)
	
		element.type = SharedTypeText
		element.key = SharedTypeKey + key
		element.children = content + ''
	
		return element
	}
	
	/**
	 * @param {*} key
	 * @return {Element}
	 */
	function createElementEmpty (key) {
		var element = new Element(SharedElementEmpty)
	
		element.type = SharedTypeEmpty
		element.key = SharedTypeKey + key
		element.children = ''
	
		return element
	}
	
	/**
	 * @param {(Element|Array)} fragment
	 * @return {Element}
	 */
	function createElementFragment (iterable) {
		var element = new Element(SharedElementFragment)
		var children = new List()
		var i = 0
	
		element.type = SharedTypeFragment
		element.children = children
	
		if (isValidElement(iterable))
			setElementChildren(children, iterable, i)
		else
			for (; i < iterable.length; ++i)
				setElementChildren(children, iterable[i], i)
	
		setElementBoundary(children)
	
		return element
	}
	
	/**
	 * @param {Iterable} iterable
	 * @param {Element} element
	 */
	function createElementIterable (iterable) {
		return createElementFragment(childrenArray(iterable))
	}
	
	/**
	 * @param {*} element
	 * @param {*} key
	 * @return {Element?}
	 */
	function createElementUnknown (element, key) {
		switch (element.constructor) {
			case Boolean:
				return createElementEmpty(key)
			case Date:
				return createElementText(element, key)
			case Promise:
			case Function:
				return createElement(element)
		}
	
		if (typeof element.next === 'function')
			return createElementIterable(element)
		if (typeof element[SymbolIterator] === 'function')
			return createElementUnknown(element[SymbolIterator](), key)
		if (typeof element === 'function')
			return createElementUnknown(element(), key)
	
		invariant(SharedSiteRender, 'Invalid element [object ' + getDisplayName(element) + ']')
	}
	
	/**
	 * @param {Element} element
	 * @return {boolean}
	 */
	function isValidElement (element) {
		return element instanceof Element
	}
	
	/**
	 * @param {Element} element
	 * @param {Object=} props
	 * @param {...} children
	 * @return {Element}
	 */
	function cloneElement () {
		return createElement.apply(null, arguments)
	}
	
	/**
	 * @param {(Element|Array)} element
	 * @param {Object} container
	 * @param {(string|number|Symbol)=} key
	 * @return {Element}
	 */
	function createPortal (element, container, key) {
		var portal = new Element(SharedElementPortal)
		var children = portal.children = new List()
	
		setElementChildren(children, element, 0)
		setElementBoundary(children)
	
		portal.type = container
	
		if (key != null)
			portal.key = key
	
		return portal
	}
	
	/**
	 * @param {(string|function|Promise)} type
	 * @param {Object?=} properties
	 * @param {...} children
	 * @return {Element}
	 */
	function createElement (type, properties) {
		var props = properties
		var i = props != null ? 1 : 2
		var size = 0
		var index = 0
		var id = typeof type !== 'function' ? SharedElementNode : SharedElementComponent
		var length = arguments.length
		var element = new Element(id)
		var children = id !== SharedElementComponent ? new List() : null
	
		if (i === 1)
			switch (props.constructor) {
				case Object:
					if (props[SymbolIterator] === undefined) {
						if (props.key !== undefined)
							element.key = props.key
	
						if (props.ref !== undefined)
							element.ref = props.ref
	
						if (id !== SharedElementComponent) {
							if (props.xmlns !== undefined)
								element.xmlns = props.xmlns
	
							if (props.children !== undefined)
								props.children = void (index = setElementChildren(children, props.children, index))
						}
	
						i++
						break
					}
				default:
					props = {}
			}
		else
			props = {}
	
		if ((size = length - i) > 0) {
			if (id !== SharedElementComponent)
				for (; i < length; ++i)
					index = setElementChildren(children, arguments[i], index)
			else {
				if (size > 1)
					for (children = []; i < length; ++i)
						children.push(arguments[i])
				else
					children = arguments[i]
	
				props.children = children
			}
		}
	
		switch ((element.type = type).constructor) {
			case Function:
				if (type.defaultProps)
					props = getDefaultProps(element, type, type.defaultProps, props)
			case String:
				break
			case Element:
				props = assign({}, type.props, (element.id = type.id, props))
				element.type = type.type
				break
			case Promise:
				element.id = SharedElementPromise
				setElementBoundary(children)
		}
	
		element.props = props
		element.children = children
	
		return element
	}
	
	/**
	 * @param {List} children
	 * @param {*} element
	 * @param {number} index
	 */
	function setElementChildren (children, element, index) {
		if (element != null)
			switch (element.constructor) {
				case Element:
					if (element.key === null)
						element.key = SharedTypeKey + index
	
					children.insert(element.active === false ? element : createElementImmutable(element), children)
					break
				case Array:
					for (var i = 0; i < element.length; ++i)
						setElementChildren(children, element[i], index + i)
	
					return index + i
				case String:
				case Number:
					children.insert(createElementText(element, index), children)
					break
				default:
					return setElementChildren(children, createElementUnknown(element, index), index)
			}
		else
			children.insert(createElementEmpty(index), children)
	
		return index + 1
	}
	
	/**
	 * @param {List} children
	 */
	function setElementBoundary (children) {
		children.insert(createElementEmpty(SharedTypeKey), children.next)
		children.insert(createElementEmpty(SharedTypeKey), children)
	}
	
	/**
	 * @param {Element} element
	 * @param {function} type
	 * @param {(Object|function)} defaultProps
	 * @param {Object} props
	 */
	function getDefaultProps (element, type, defaultProps, props) {
		if (typeof defaultProps !== 'function')
			return assign({}, defaultProps, props)
	
		Object.defineProperty(type, 'defaultProps', {
			value: getDefaultProps(element, type, getLifecycleCallback(element, defaultProps), props)
		})
	
		return type.defaultProps
	}
	
	/**
	 * @param {(function|string)} type
	 * @return {string}
	 */
	function getDisplayName (type) {
		switch (typeof type) {
			case 'function':
				return getDisplayName(type.displayName || type.name)
			case 'string':
				if (type)
					return type
			default:
				return (type && type.constructor.name) || 'anonymous'
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 * @param {string} direction
	 * @return {Element}
	 */
	function getElementSibling (element, parent, direction) {
		if (isValidElement(element[direction]))
			if (element[direction].id === SharedElementPortal)
				return getElementSibling(element[direction], parent, direction)
			else
				return element[direction]
	
		if (element.host && getElementDescription(element.host) === element)
			return getElementSibling(element.host, parent, direction)
	
		if (parent.id < SharedElementIntermediate)
			return getElementSibling(parent, parent.parent, direction)
	
		return createElementIntermediate()
	}
	
	/**
	 * @param {Element} element
	 * @param {Element}
	 */
	function getElementParent (element) {
		if (element.id < SharedElementPortal)
			return getElementParent(element.parent)
	
		return element
	}
	
	/**
	 * @param {Element} element
	 * @param {string} direction
	 * @return {Element}
	 */
	function getElementBoundary (element, direction) {
		if (element.id < SharedElementIntermediate)
			return getElementBoundary(element.children[direction])
	
		return element
	}
	
	/**
	 * @param {Element} element
	 * @return {Element}
	 */
	function getElementDescription (element) {
		if (element.id === SharedElementComponent)
			return getElementDescription(element.children)
	
		return element
	}
	
	/**
	 * @param {*} element
	 * @return {Element}
	 */
	function getElementDefinition (element) {
		if (element == null)
			return createElementEmpty(SharedTypeKey)
	
		switch (element.constructor) {
			case Element:
				return element
			case Array:
				return createElementFragment(element)
			case String:
			case Number:
				return createElementText(element, SharedTypeKey)
			default:
				return createElementUnknown(element, SharedTypeKey)
		}
	}
	
	/**
	 * @constructor
	 * @param {Object?} props
	 * @param {Object?} context
	 */
	function Component (props, context) {
		this.refs = null
		this.state = null
		this.props = props
		this.context = context
	}
	/**
	 * @type {Object}
	 */
	var ComponentPrototype = {
		forceUpdate: {value: forceUpdate},
		setState: {value: setState}
	}
	
	/**
	 * @param {Object?} props
	 * @param {Object?} context
	 */
	function PureComponent (props, context) {
		Component.call(this, props, context)
	}
	PureComponent.prototype = Object.create(createComponent(Component.prototype), {
		shouldComponentUpdate: {value: shouldComponentUpdate}
	})
	
	/**
	 * @param {Object} prototype
	 * @return {Object}
	 */
	function createComponent (prototype) {
		defineProperty(defineProperties(prototype, ComponentPrototype), SymbolComponent, {value: SymbolComponent})
	
		if (!hasOwnProperty.call(prototype, SharedSiteRender))
			defineProperty(prototype, SharedSiteRender, {value: noop, writable: true})
	
		return prototype
	}
	
	/**
	 * @param {Object} props
	 * @param {Object} state
	 * @return {boolean}
	 */
	function shouldComponentUpdate (props, state) {
		return compare(this.props, props) || compare(this.state, state)
	}
	
	/**
	 * @param {(Object|function)} state
	 * @param {function?} callback
	 */
	function setState (state, callback) {
		enqueueStateUpdate(getComponentElement(this), this, state, callback)
	}
	
	/**
	 * @param {function} callback
	 */
	function forceUpdate (callback) {
		enqueueComponentUpdate(getComponentElement(this), this, callback, SharedComponentForceUpdate)
	}
	
	/**
	 * @param {Element} element
	 */
	function mountComponentElement (element) {
		var owner = element.type
		var context = element.context || {}
		var prototype = owner.prototype
		var instance
		var children
	
		if (prototype && prototype.render) {
			if (prototype[SymbolComponent] !== SymbolComponent)
				createComponent(prototype)
	
			instance = owner = getComponentInstance(element, owner)
		} else {
			instance = new Component()
			instance.render = owner
		}
	
		element.owner = owner
		element.instance = instance
		element.context = context
	
		instance[SymbolElement] = element
		instance.refs = {}
		instance.props = element.props
		instance.context = context
	
		if (owner[SharedGetInitialState])
			if (element.state = instance.state = getLifecycleData(element, SharedGetInitialState))
				if (element.state.constructor === Promise) {
					if (element.work === SharedWorkMounting)
						enqueueStatePromise(element, instance, instance.state)
	
					children = null
				}
	
		if (!instance.state)
			instance.state = {}
	
		if (owner[SharedComponentWillMount] && element.work !== SharedWorkIdle)
			getLifecycleMount(element, SharedComponentWillMount)
	
		if (children !== null)
			children = getComponentChildren(element, instance)
		else
			children = getElementDefinition(children)
	
		if (owner[SharedGetChildContext])
			element.context = getComponentContext(element)
	
		return element.children = children
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 * @param {number} signature
	 */
	function updateComponent (element, snapshot, signature) {
		switch (element.work) {
			case SharedWorkProcessing:
				requestAnimationFrame(enqueuePendingUpdate(element, snapshot, signature))
			case SharedWorkIntermediate:
				return
		}
	
		element.work = SharedWorkIntermediate
	
		var instance = element.instance
		var owner = element.owner
		var nextContext = instance.context
		var prevProps = element.props
		var nextProps = snapshot.props
		var tempState = element.state
		var prevState = instance.state
		var nextState = signature === SharedComponentStateUpdate ? assign({}, prevState, tempState) : prevState
	
		if (owner[SharedGetChildContext])
			merge(element.context, getComponentContext(element))
	
		switch (signature) {
			case SharedComponentForceUpdate:
				break
			case SharedComponentPropsUpdate:
				if (owner[SharedComponentWillReceiveProps])
					getLifecycleUpdate(element, SharedComponentWillReceiveProps, nextProps, nextContext)
			case SharedComponentStateUpdate:
				if (owner[SharedComponentShouldUpdate])
					if (!getLifecycleUpdate(element, SharedComponentShouldUpdate, nextProps, nextState, nextContext))
						return void (element.work = SharedWorkIdle)
		}
	
		element.work = SharedWorkProcessing
	
		if (tempState !== element.state)
			merge(nextState, element.state)
	
		if (owner[SharedComponentWillUpdate])
			getLifecycleUpdate(element, SharedComponentWillUpdate, nextProps, nextState, nextContext)
	
		if (signature === SharedComponentPropsUpdate)
			instance.props = element.props = nextProps
	
		if (signature === SharedComponentStateUpdate)
			instance.state = nextState
	
		reconcileElement(element.children, getComponentChildren(element, instance))
	
		if (owner[SharedComponentDidUpdate])
			getLifecycleUpdate(element, SharedComponentDidUpdate, prevProps, prevState, nextContext)
	
		if (element.ref !== snapshot.ref)
			commitReference(element, snapshot.ref, SharedReferenceReplace)
	
		element.work = SharedWorkIdle
	}
	
	/**
	 * @param {Element} element
	 */
	function unmountComponentElement (element) {
		if ((element.state = null, element.owner[SharedComponentWillUnmount]))
			element.state = getLifecycleMount(element, SharedComponentWillUnmount)
	}
	
	/**
	 * @param {Element} element
	 * @param {Component} instance
	 * @param {function?} callback
	 * @param {number} signature
	 */
	function enqueueComponentUpdate (element, instance, callback, signature) {
		if (!element)
			return void requestAnimationFrame(function () {
				enqueueComponentUpdate(getComponentElement(instance), instance, callback, signature)
			})
	
		if (element.work === SharedWorkProcessing)
			return void requestAnimationFrame(function () {
				enqueueComponentUpdate(element, instance, callback, signature)
			})
	
		if (!element.active)
			instance.state = assign({}, instance.state, element.state)
		else if (element.id === SharedElementComponent)
			updateComponent(element, element, signature)
	
		if (callback)
			enqueueStateCallback(element, instance, callback)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 * @param {number} signature
	 */
	function enqueuePendingUpdate (element, snapshot, signature) {
		return function () {
			updateComponent(element, snapshot, signature)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {Component} instance
	 * @param {(Object|function)} state
	 * @param {function?} callback
	 */
	function enqueueStateUpdate (element, instance, state, callback) {
		if (!state)
			return
	
		if (!element)
			return void requestAnimationFrame(function () {
				enqueueStateUpdate(instance[SymbolElement], instance, state, callback)
			})
	
		switch (state.constructor) {
			case Promise:
				return enqueueStatePromise(element, instance, state, callback)
			case Function:
				return enqueueStateUpdate(element, instance, enqueueStateCallback(element, instance, state), callback)
			default:
				element.state = state
		}
	
		enqueueComponentUpdate(element, instance, callback, SharedComponentStateUpdate)
	}
	
	/**
	 * @param {Element} element
	 * @param {Component} instance
	 * @param {Promise} state
	 * @param {function?} callback
	 */
	function enqueueStatePromise (element, instance, state, callback) {
		state.then(function (value) {
			requestAnimationFrame(function () {
				enqueueStateUpdate(element, instance, value, callback)
			})
		}).catch(function (err) {
			invokeErrorBoundary(element, err, SharedSiteAsync+':'+SharedSiteSetState, SharedErrorActive)
		})
	}
	
	/**
	 * @param {Element} element
	 * @param {Component} instance
	 * @param {function} callback
	 */
	function enqueueStateCallback (element, instance, callback) {
		try {
			if (typeof callback === 'function')
				return callback.call(instance, instance.state, instance.props, instance.context)
		} catch (err) {
			invokeErrorBoundary(element, err, SharedSiteSetState+':'+SharedSiteCallback, SharedErrorActive)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {function} owner
	 * @return {Component}
	 */
	function getComponentInstance (element, owner) {
		try {
			return new owner(element.props, element.context)
		} catch (err) {
			invokeErrorBoundary(element, err, SharedSiteConstructor, SharedErrorActive)
		}
	
		return new Component()
	}
	
	/**
	 * @param {Element} element
	 * @param {Component} instance
	 * @return {Element}
	 */
	function getComponentChildren (element, instance) {
		try {
			return getElementDefinition(instance.render(instance.props, instance.state, element.context))
		} catch (err) {
			return getElementDefinition(invokeErrorBoundary(element, err, SharedSiteRender, SharedErrorActive))
		}
	}
	
	/**
	 * @param {Component} instance
	 * @return {Element?}
	 */
	function getComponentElement (instance) {
		return instance[SymbolElement]
	}
	
	/**
	 * @param {Element} element
	 * @return {Object?}
	 */
	function getComponentContext (element) {
		return getLifecycleData(element, SharedGetChildContext) || element.context
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 */
	function getLifecycleData (element, name) {
		try {
			return element.owner[name].call(
				element.instance,
				element.instance.props,
				element.instance.state,
				element.instance.context
			)
		} catch (err) {
			invokeErrorBoundary(element, err, name, SharedErrorActive)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 */
	function getLifecycleMount (element, name) {
		try {
			var state = element.owner[name].call(element.instance, element.active && getDOMNode(element))
	
			if (name !== SharedComponentWillUnmount)
				getLifecycleReturn(element, state)
			else if (state && state.constructor === Promise)
				return state
		} catch (err) {
			invokeErrorBoundary(element, err, name, SharedErrorActive)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 * @param {Object} props
	 * @param {Object} state
	 * @param {Object} context
	 */
	function getLifecycleUpdate (element, name, props, state, context) {
		try {
			var state = element.owner[name].call(element.instance, props, state, context)
	
			if (name === SharedComponentShouldUpdate)
				return state
	
			getLifecycleReturn(element, state)
		} catch (err) {
			invokeErrorBoundary(element, err, name, SharedErrorActive)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 * @param {Error} error
	 * @param {Object} info
	 */
	function getLifecycleBoundary (element, name, error, info) {
		try {
			getLifecycleReturn(element, element.owner[name].call(element.instance, error, info))
		} catch (err) {
			invokeErrorBoundary(element.host, err, SharedComponentDidCatch, SharedErrorActive)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {Object?} state
	 */
	function getLifecycleReturn (element, state) {
		switch (typeof state) {
			case 'object':
			case 'function':
				enqueueStateUpdate(element, element.instance, state)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {function} callback
	 * @param {*} first
	 * @param {*} second
	 * @param {*} third
	 */
	function getLifecycleCallback (element, callback, first, second, third) {
		try {
			if (typeof callback === 'function')
				return callback.call(element.instance, first, second, third)
		} catch (err) {
			invokeErrorBoundary(element, err, SharedSiteCallback, SharedErrorPassive)
		}
	}
	
	/**
	 * @param {(Component|Node)?} value
	 * @param {*} key
	 * @param {Element} element
	 */
	function setComponentReference (value, key, element) {
		if (key !== element.ref)
			delete this.refs[element.ref]
	
		this.refs[key] = value
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} sibling
	 * @param {Element} host
	 * @param {number} operation
	 * @param {number} signature
	 */
	function commitChildren (element, sibling, host, operation, signature) {
		var children = element.children
		var length = children.length
		var next = children.next
	
		while (length-- > 0) {
			commitMount(next, sibling, element, host, operation, signature)
			next = next.next
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} sibling
	 * @param {Element} parent
	 * @param {Element} host
	 * @param {number} operation
	 * @param {number} signature
	 */
	function commitMount (element, sibling, parent, host, operation, signature) {
		element.host = host
		element.parent = parent
		element.context = host.context
	
		switch (element.id) {
			case SharedElementComponent:
				element.work = SharedWorkMounting
	
				commitMount(mountComponentElement(element), sibling, parent, element, operation, signature)
				commitCreate(element)
	
				element.work = SharedWorkIdle
	
				if (element.ref)
					commitReference(element, element.ref, SharedReferenceDispatch)
	
				if (element.owner[SharedComponentDidMount])
					getLifecycleMount(element, SharedComponentDidMount)
	
				return
			case SharedElementPromise:
				commitWillReconcile(element, element)
			case SharedElementPortal:
			case SharedElementFragment:
				setDOMNode(element, element.id !== SharedElementPortal ? getDOMNode(parent) : getDOMPortal(element))
				commitChildren(element, sibling, host, operation, signature)
				commitCreate(element)
				return
			case SharedElementNode:
				element.xmlns = getDOMType(element, parent.xmlns)
			default:
				switch (signature) {
					case SharedMountQuery:
						if (commitQuery(element, parent))
							break
					default:
						commitCreate(element)
	
						if (operation === SharedMountAppend)
							commitAppend(element, parent)
						else
							commitInsert(element, sibling, parent)
				}
	
				if (element.id !== SharedElementNode)
					return
		}
	
		commitChildren(element, sibling, host, SharedMountAppend, signature)
		commitProperties(element, getDOMProps(element), SharedPropsMount)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 * @param {number} signature
	 */
	function commitDismount (element, parent, signature) {
		switch (element.id) {
			case SharedElementComponent:
				commitDismount(element.children, parent, -signature)
				unmountComponentElement(element)
			case SharedElementText:
			case SharedElementEmpty:
				break
			case SharedElementPortal:
				if (signature < SharedElementIntermediate && parent.id > SharedElementIntermediate)
					commitRemove(element, parent)
			default:
				var children = element.children
				var length = children.length
	
				while (length-- > 0)
					commitDismount(children = children.next, element, -signature)
		}
	
		if (element.ref)
			commitReference(element, element.ref, SharedReferenceRemove)
	
		element.active = false
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 * @param {number} signature
	 */
	function commitUnmount (element, parent, signature) {
		if (signature > SharedElementIntermediate)
			commitDismount(element, parent, signature)
	
		if (element.id !== SharedElementComponent)
			return commitRemove(element, parent)
	
		if (element.state)
			return element.state = void element.state
				.then(commitWillUnmount(element, parent, element, SharedErrorPassive))
				.catch(commitWillUnmount(element, parent, element, SharedErrorActive))
	
		commitUnmount(element.children, parent, SharedElementIntermediate)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 * @param {Element} host
	 * @param {number} signature
	 * @return {function}
	 */
	function commitWillUnmount (element, parent, host, signature) {
		if (element.id === SharedElementComponent)
			return commitWillUnmount(element.children, parent, merge({}, host), signature)
	
		setDOMNode(element, getDOMNode(host))
	
		return function (err) {
			commitUnmount(element, parent, SharedMountRemove)
	
			if (signature === SharedErrorActive)
				invokeErrorBoundary(element.host, err, SharedSiteAsync+':'+SharedComponentWillUnmount, signature)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 */
	function commitWillReconcile (element, snapshot) {
		snapshot.type.then(function (value) {
			if (element.active)
				reconcileChildren(element, createElementFragment(getElementDefinition(value)))
		}).catch(function (err) {
			invokeErrorBoundary(element, err, SharedSiteAsync+':'+SharedSiteRender, SharedErrorActive)
		})
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 * @param {Element} parent
	 * @param {Element} host
	 */
	function commitReplace (element, snapshot, parent, host) {
		commitMount(snapshot, element, parent, host, SharedMountInsert, SharedMountCommit)
		commitUnmount(element, parent, SharedMountRemove)
	
		for (var key in snapshot)
			switch (key) {
				case 'DOM':
					merge(element[key], snapshot[key])
				case SharedSiblingNext:
				case SharedSiblingPrevious:
					break
				default:
					element[key] = snapshot[key]
			}
	}
	
	/**
	 * @param {Element} element
	 * @param {(function|string)?} callback
	 * @param {number} signature
	 * @param {*} key
	 */
	function commitReference (element, callback, signature, key) {
		switch (typeof callback) {
			case 'string':
				if (signature === SharedReferenceRemove)
					return commitReference(element, setComponentReference, SharedReferenceRemove, callback)
				else
					return commitReference(element, setComponentReference, SharedReferenceDispatch, callback)
			case 'function':
				switch (signature) {
					case SharedReferenceRemove:
						return getLifecycleCallback(element.host, callback, element.ref = null, key, element)
					case SharedReferenceAssign:
						element.ref = callback
					case SharedReferenceDispatch:
						return getLifecycleCallback(element.host, callback, element.instance || getDOMNode(element), key, element)
					case SharedReferenceReplace:
						commitReference(element, callback, SharedReferenceRemove, key)
						commitReference(element, callback, SharedReferenceAssign, key)
				}
				break
			default:
				commitReference(element, element.ref || noop, SharedReferenceRemove, key)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} type
	 * @param {(function|EventListener)} callback
	 */
	function commitEvent (element, type, callback) {
		if (!element.event)
			element.event = {}
	
		if (!element.event[type])
			setDOMEvent(element, type)
	
		element.event[type] = callback
	}
	
	/**
	 * @param {Element} element
	 * @param {number} props
	 * @param {number} signature
	 */
	function commitProperties (element, props, signature) {
		for (var key in props)
			switch (key) {
				case 'ref':
					commitReference(element, props[key], signature)
				case 'key':
				case 'xmlns':
				case 'children':
					break
				default:
					if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110)
						commitEvent(element, key.substring(2).toLowerCase(), props[key])
					else
						setDOMProperties(element, key, props[key], element.xmlns)
			}
	}
	
	/**
	 * @param {Element} element
	 */
	function commitCreate (element) {
		try {
			switch (element.active = true, element.id) {
				case SharedElementNode:
					return setDOMNode(element, createDOMElement(element))
				case SharedElementText:
					return setDOMNode(element, createDOMText(element))
				case SharedElementEmpty:
					return setDOMNode(element, createDOMEmpty(element))
				case SharedElementComponent:
					element.DOM = element.children.DOM
				case SharedElementPortal:
					break
				default:
					element.DOM = getElementBoundary(element, SharedSiblingNext).DOM
			}
		} catch (err) {
			return commitCreate(commitRebase(element, invokeErrorBoundary(element, err, SharedSiteElement, SharedErrorActive)))
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 * @param {Element}
	 */
	function commitRebase (element, snapshot) {
		return assign(element, snapshot, {
			key: element.key,
			prev: element.prev,
			next: element.next,
			host: element.host,
			parent: element.parent
		})
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 * @return {boolean}
	 */
	function commitQuery (element, parent) {
		setDOMNode(
			element,
			getDOMQuery(
				element,
				parent,
				getElementSibling(element, parent, SharedSiblingPrevious),
				getElementSibling(element, parent, SharedSiblingNext)
			)
		)
	
		return element.active = !!getDOMNode(element)
	}
	
	/**
	 * @param {Element} element
	 * @param {string} value
	 */
	function commitValue (element, value) {
		setDOMValue(element, value)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 */
	function commitRemove (element, parent) {
		if (parent.id < SharedElementPortal)
			return commitRemove(element, getElementParent(parent))
	
		if (element.id > SharedElementIntermediate)
			removeDOMNode(element, parent)
		else
			element.children.forEach(function (children) {
				commitRemove(getElementDescription(children), element)
			})
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} sibling
	 * @param {Element} parent
	 */
	function commitInsert (element, sibling, parent) {
		if (parent.id < SharedElementIntermediate)
			if (parent.id < SharedElementPortal)
				return commitInsert(element, sibling, getElementParent(parent))
			else if (parent !== sibling.parent)
				if (!parent.active)
					return commitAppend(element, parent)
				else
					return
	
		switch (sibling.id) {
			case SharedElementComponent:
				return commitInsert(element, getElementDescription(sibling), parent)
			case SharedElementPortal:
				return commitInsert(element, getElementSibling(sibling, parent, SharedSiblingNext), parent)
			case SharedElementIntermediate:
				return commitAppend(element, parent)
		}
	
		switch (element.id) {
			case SharedElementNode:
			case SharedElementText:
			case SharedElementEmpty:
				return insertDOMNode(element, sibling, parent)
			case SharedElementComponent:
				return commitInsert(getElementDescription(element), sibling, parent)
		}
	
		element.children.forEach(function (children) {
			commitInsert(getElementDescription(children), sibling, element)
		})
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 */
	function commitAppend (element, parent) {
		if (parent.id < SharedElementIntermediate)
			if (parent.active)
				return commitInsert(element, getElementBoundary(parent, SharedSiblingPrevious), parent)
			else if (parent.id < SharedElementPortal)
				return commitAppend(element, getElementParent(parent))
	
		switch (element.id) {
			case SharedElementNode:
			case SharedElementText:
			case SharedElementEmpty:
				return appendDOMNode(element, parent)
			case SharedElementComponent:
				return commitAppend(getElementDescription(element), parent)
		}
	
		element.children.forEach(function (children) {
			commitAppend(getElementDescription(children), element)
		})
	}
	
	/**
	 * @param {Object} prevObject
	 * @param {Object} nextObject
	 * @return {Object?}
	 */
	function reconcileObject (prevObject, nextObject) {
		if (prevObject === nextObject)
			return
	
		var length = 0
		var delta = {}
	
		for (var key in prevObject)
			if (!hasOwnProperty.call(nextObject, key))
				delta[(++length, key)] = null
	
		for (var key in nextObject) {
			var next = nextObject[key]
			var prev = prevObject[key]
	
			if (next !== prev)
				if (typeof next !== 'object' || next === null)
					delta[(++length, key)] = next
				else if (next = reconcileObject(prev || {}, next))
					delta[(++length, key)] = next
		}
	
		if (length > 0)
			return delta
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 */
	function reconcileProperties (element, snapshot) {
		commitProperties(element, reconcileObject(element.props, element.props = snapshot.props), SharedPropsUpdate)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 */
	function reconcileElement (element, snapshot) {
		if (element.id === SharedElementPromise && snapshot.id === SharedElementPromise)
			return commitWillReconcile(element, snapshot)
	
		if (element.key !== snapshot.key || element.type !== snapshot.type)
			return commitReplace(element, snapshot, element.parent, element.host)
	
		switch (element.id) {
			case SharedElementPortal:
			case SharedElementFragment:
				return reconcileChildren(element, snapshot)
			case SharedElementComponent:
				return updateComponent(element, snapshot, SharedComponentPropsUpdate)
			case SharedElementText:
				if (element.children !== snapshot.children)
					commitValue(element, element.children = snapshot.children)
				break
			case SharedElementNode:
				reconcileChildren(element, snapshot)
				reconcileProperties(element, snapshot)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 */
	function reconcileChildren (element, snapshot) {
		var signature = SharedMountAppend
		var host = element.host
		var children = element.children
		var siblings = snapshot.children
		var oldLength = children.length
		var newLength = siblings.length
	
		if (oldLength + newLength === 0)
			return
	
		var oldPos = 0
		var newPos = 0
		var oldEnd = oldLength - 1
		var newEnd = newLength - 1
		var oldHead = children.next
		var newHead = siblings.next
		var oldTail = children.prev
		var newTail = siblings.prev
	
		// step 1, prefix/suffix
		outer: while (true) {
			while (oldHead.key === newHead.key) {
				reconcileElement(oldHead, newHead)
				++oldPos
				++newPos
	
				if (oldPos > oldEnd || newPos > newEnd)
					break outer
	
				oldHead = oldHead.next
				newHead = newHead.next
			}
			while (oldTail.key === newTail.key) {
				reconcileElement(oldTail, newTail)
				--oldEnd
				--newEnd
	
				if (oldPos > oldEnd || newPos > newEnd)
					break outer
	
				oldTail = oldTail.prev
				newTail = newTail.prev
			}
			break
		}
	
		// step 2, insert/append/remove
		if (oldPos > oldEnd++) {
			if (newPos <= newEnd++) {
				if (newEnd < newLength)
					signature = SharedMountInsert
				else if ((oldTail = children, oldLength > 0))
					newHead = newHead.next
	
				while (newPos++ < newEnd) {
					newHead = (oldHead = newHead).next
					commitMount(children.insert(oldHead, oldTail), oldTail, element, host, signature, SharedMountCommit)
				}
			}
		} else if (newPos > newEnd++) {
			if (newEnd === newLength && newLength > 0)
				oldHead = oldHead.next
	
			while (oldPos++ < oldEnd) {
				oldHead = (newHead = oldHead).next
				commitUnmount(children.remove(newHead), element, SharedMountRemove)
			}
		} else {
			reconcileSiblings(element, host, children, oldHead, newHead, oldPos, newPos, oldEnd, newEnd)
		}
	}
	
	/**
	 * @param  {Element} element
	 * @param  {Element} host
	 * @param  {List} children
	 * @param  {Element} oldHead
	 * @param  {Element} newHead
	 * @param  {number} oldPos
	 * @param  {number} newPos
	 * @param  {number} oldEnd
	 * @param  {number} newEnd
	 */
	function reconcileSiblings (element, host, children, oldHead, newHead, oldPos, newPos, oldEnd, newEnd) {
		var oldIndex = oldPos
		var newIndex = newPos
		var oldChild = oldHead
		var newChild = newHead
		var oldNext = oldHead
		var newNext = newHead
		var newHash = ''
		var oldSize = 0
		var oldPool = {}
	
		// step 3, hashmap
		while (oldIndex < oldEnd)
			if (oldChild.key !== newChild.key) {
				oldPool[oldChild.key] = oldChild
				oldChild = oldChild.next
				++oldSize
				++oldIndex
			} else {
				reconcileElement(oldChild, newChild)
				oldChild = oldChild.next
				newChild = newChild.next
				++oldIndex
				++newIndex
			}
	
		// step 4, insert/append
		while (newIndex++ < newEnd) {
			newHash = newChild.key
			newNext = newChild.next
			oldNext = oldPool[newHash]
	
			if (oldNext) {
				if (oldChild === children)
					commitAppend(children.insert(children.remove(oldNext), oldChild), element)
				else
					commitInsert(children.insert(children.remove(oldNext), oldChild), oldChild, element)
	
				reconcileElement(oldNext, newChild)
	
				delete oldPool[(--oldSize, newHash)]
			} else if (oldChild === children)
				commitMount(children.insert(newChild, oldChild), newChild, element, host, SharedMountAppend, SharedMountCommit)
			else
				commitMount(children.insert(newChild, oldChild), oldChild, element, host, SharedMountInsert, SharedMountCommit)
	
			newChild = newNext
		}
	
		// step 5, remove
		if (oldSize > 0)
			for (newHash in oldPool)
				commitUnmount(children.remove(oldPool[newHash]), element, SharedMountRemove)
	}
	
	/**
	 * @param {Event}
	 */
	function handleEvent (event) {
		try {
			var type = event.type
			var element = this
			var callback = element.event[type]
			var host = element.host
			var instance = host.instance
			var props
			var state
			var context
			var value
	
			if (!callback)
				return
	
			if (instance) {
				props = instance.props
				state = instance.state
				context = instance.context
			}
	
			if (typeof callback === 'function')
				value = callback.call(instance, event, props, state, context)
			else if (typeof callback.handleEvent === 'function')
				value = callback.handleEvent(event, props, state, context)
	
			if (value && instance)
				getLifecycleReturn(host, value)
		} catch (err) {
			invokeErrorBoundary(host, err, 'on'+type+':'+getDisplayName(callback.handleEvent || callback), SharedErrorPassive)
		}
	}
	
	defineProperty(Element.prototype, 'handleEvent', {value: handleEvent})
	
	/**
	 * @param {Element} element
	 * @param {*} err
	 * @param {string} from
	 * @param {number} signature
	 * @param {Element}
	 */
	function invokeErrorBoundary (element, err, from, signature) {
		return getElementDefinition(getErrorElement(element, getErrorException(element, err, from), from, signature))
	}
	
	/**
	 * @param {Element} element
	 * @param {Error} error
	 * @param {string} from
	 * @param {number} signature
	 * @return {Element?}
	 */
	function getErrorElement (element, error, from, signature) {
		if (signature === SharedErrorPassive)
			return reportErrorException(error)
	
		var host = element.host
		var owner = element.owner
		var instance = element.instance
		var caught = instance && !instance[SymbolError] && owner && owner[SharedComponentDidCatch]
	
		requestAnimationFrame(function () {
			if (element.active)
				recoverErrorBoundary(element, getElementDefinition(null))
		})
	
		if (caught) {
			element.work = SharedWorkProcessing
			getLifecycleBoundary(element, SharedComponentDidCatch, error, instance[SymbolError] = error)
			element.work = SharedWorkIdle
		}
	
		if (!caught && isValidElement(host) && element.id !== SharedElementIntermediate)
			return getErrorElement(host, error, from, signature)
	
		return getErrorElement(element, error, from, SharedErrorPassive)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 */
	function recoverErrorBoundary (element, snapshot) {
		reconcileElement(element.id === SharedElementComponent ? element.children : element, snapshot)
	}
	
	/**
	 * @param {Error} error
	 */
	function reportErrorException (error) {
		if (!error.defaultPrevented)
			console.error(error.inspect())
	}
	
	/**
	 * @param {*} value
	 * @return {Object}
	 */
	function getErrorDescription (value) {
		return {enumerable: true, configurable: true, value: value}
	}
	
	/**
	 * @param {Element} element
	 * @param {Error} error
	 * @param {string} from
	 */
	function getErrorException (element, error, from) {
		if (!(error instanceof Error))
			return getErrorException(element, new Error(error), from)
	
		var componentStack = ''
		var tabs = '    '
		var host = element
	
		while (host && host.type) {
			componentStack += tabs + '<' + getDisplayName(host.type) + '>\n'
			tabs += '  '
			host = host.host
		}
	
		var errorMessage = 'The above error occurred in `\n' + componentStack + '` from "' + from + '"'
		var errorStack = error.stack + '\n\n' + errorMessage
	
		return defineProperties(error, {
			errorLocation: getErrorDescription(from),
			errorStack: getErrorDescription(errorStack),
			errorMessage: getErrorDescription(errorMessage),
			componentStack: getErrorDescription(componentStack),
			defaultPrevented: getErrorDescription(false),
			preventDefault: getErrorDescription(function () {
				return !!defineProperty(error, 'defaultPrevented', getErrorDescription(true))
			}),
			inspect: getErrorDescription(function () {
				return errorStack
			})
		})
	}
	
	/**
	 * @type {Object}
	 */
	var Children = {
		toArray: childrenArray,
		forEach: childrenEach,
		count: childrenCount,
		only: childrenOnly,
		map: childrenMap
	}
	
	/**
	 * @param {*} children
	 * @return {Array}
	 */
	function childrenArray (children) {
		var array = []
	
		if (children == null)
			return array
		else if (isValidElement(children) || typeof children !== 'object')
			return [children]
		else if (isArray(children))
			return flatten(children, array)
		else if (typeof children.next === 'function' || typeof children.forEach === 'function')
			each(children, function (element) {
				return array.push(element)
			})
		else if (typeof children[SymbolIterator] === 'function')
			return childrenArray(children[SymbolIterator]())
		else
			array.push(children)
	
		return flatten(array, [])
	}
	
	/**
	 * @param {*} children
	 * @param {function} callback
	 * @param {*} thisArg
	 */
	function childrenEach (children, callback, thisArg) {
		if (children != null)
			childrenArray(children).forEach(callback, thisArg)
	}
	
	/**
	 * @param {*} children
	 * @param {function} callback
	 * @return {Array}
	 */
	function childrenMap (children, callback, thisArg) {
		if (children != null)
			return childrenArray(children).map(callback, thisArg)
	
		return children
	}
	
	/**
	 * @param {*} children
	 * @return {number}
	 */
	function childrenCount (children) {
		return childrenArray(children).length
	}
	
	/**
	 * @param {*} children
	 * @return {Element}
	 */
	function childrenOnly (children) {
		if (isValidElement(children))
			return children
	
		invariant('Children.only', 'Expected to receive a single element')
	}
	
	/**
	 * @param {*} element
	 * @param {Node} container
	 * @param {function=} callback
	 */
	function render (element, container, callback) {
		if (!container)
			return render(element, getDOMDocument(), callback)
	
		if (DOMMap.has(container))
			update(DOMMap.get(container), getElementDefinition(element), callback)
		else
			mount(element, createElementIntermediate(), container, callback, SharedMountCommit)
	}
	
	/**
	 * @param {*} element
	 * @param {Node} container
	 * @param {function=} callback
	 */
	function hydrate (element, container, callback) {
		if (!container)
			return hydrate(element, getDOMDocument(), callback)
	
		mount(element, createElementIntermediate(), container, callback, SharedMountQuery)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} snapshot
	 * @param {Element} callback
	 */
	function update (element, snapshot, callback) {
		reconcileElement(element, snapshot)
	
		if (callback)
			getLifecycleCallback(element, callback)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 * @param {Node} container
	 * @param {function} callback
	 * @param {number} signature
	 */
	function mount (element, parent, container, callback, signature) {
		if (!isValidElement(element))
			return mount(getElementDefinition(element), parent, container, callback, signature)
	
		if (!isValidDOMNode(container))
			invariant(SharedSiteRender, 'Target container is not a DOM element')
	
		DOMMap.set(container, element)
	
		setDOMNode(parent, container)
	
		if (signature === SharedMountCommit)
			setDOMContent(parent)
	
		commitMount(element, element, parent, parent, SharedMountAppend, signature)
	
		if (callback)
			getLifecycleCallback(element, callback)
	}
	
	/**
	 * @param {Node} container
	 * @return {boolean}
	 */
	function unmountComponentAtNode (container) {
		return DOMMap.has(container) && !render(null, container)
	}
	
	/**
	 * @param {(Component|Element|Node|Event)} element
	 * @return {Node}
	 */
	function findDOMNode (element) {
		if (!element)
			invariant(SharedSiteFindDOMNode, 'Expected to receive a component')
	
		if (isValidElement(getComponentElement(element)))
			return findDOMNode(getComponentElement(element))
	
		if (isValidElement(element) && element.active)
			return getDOMNode(element)
	
		if (isValidDOMEvent(element))
			return getDOMTarget(element)
	
		if (isValidDOMNode(element))
			return element
	
		invariant(SharedSiteFindDOMNode, 'Called on an unmounted component')
	}
	
	/**
	 * @param {Element} element
	 * @param {Node} node
	 */
	function setDOMNode (element, node) {
		element.DOM = {node: node}
	}
	
	/**
	 * @param {Element} element
	 */
	function setDOMContent (element) {
		getDOMNode(element).textContent = ''
	}
	
	/**
	 * @param {Element} element
	 * @param {string} value
	 */
	function setDOMValue (element, value) {
		getDOMNode(element).nodeValue = value
	}
	
	/**
	 * @param {(EventListener|Element)} element
	 * @param {string} type
	 */
	function setDOMEvent (element, type) {
		getDOMNode(element).addEventListener(type, element, false)
	}
	
	/**
	 * @param {Element} element
	 * @param {Object} props
	 */
	function setDOMStyle (element, props) {
		for (var name in props) {
			var value = props[name]
	
			if (name.indexOf('-') < 0)
				getDOMNode(element).style[name] = value !== false && value !== undefined ? value : ''
			else
				getDOMNode(element).style.setProperty(name, value)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 * @param {*} value
	 */
	function setDOMProperty (element, name, value) {
		switch (value) {
			case null:
			case false:
			case undefined:
				return setDOMAttribute(element, name, value, getDOMNode(element)[name] = '')
			default:
				getDOMNode(element)[name] = value
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 * @param {*} value
	 * @param {string} xmlns
	 */
	function setDOMAttribute (element, name, value, xmlns) {
		switch (value) {
			case null:
			case false:
			case undefined:
				if (xmlns)
					getDOMNode(element).removeAttributeNS(xmlns, name)
	
				return getDOMNode(element).removeAttribute(name)
			case true:
				return setDOMAttribute(element, name, '', xmlns)
			default:
				if (!xmlns)
					getDOMNode(element).setAttribute(name, value)
				else
					getDOMNode(element).setAttributeNS(xmlns, name, value)
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 * @param {*} value
	 * @param {string} xmlns
	 */
	function setDOMProperties (element, name, value, xmlns) {
		switch (name) {
			case 'className':
				if (!xmlns && value)
					return setDOMProperty(element, name, value)
			case 'class':
				return setDOMAttribute(element, 'class', value, '')
			case 'style':
				if (typeof value === 'object')
					return setDOMStyle(element, value)
				break
			case 'xlink:href':
				return setDOMAttribute(element, name, value, 'http://www.w3.org/1999/xlink')
			case 'innerHTML':
				return setDOMInnerHTML(element, name, value ? value : '', [])
			case 'dangerouslySetInnerHTML':
				return setDOMProperties(element, 'innerHTML', value && value.__html, xmlns)
			case 'acceptCharset':
				return setDOMProperties(element, 'accept-charset', value, xmlns)
			case 'httpEquiv':
				return setDOMProperties(element, 'http-equiv', value, xmlns)
			case 'tabIndex':
				return setDOMProperties(element, name.toLowerCase(), value, xmlns)
			case 'autofocus':
			case 'autoFocus':
				return getDOMNode(element)[value ? 'focus' : 'blur']()
			case 'width':
			case 'height':
				if (element.type === 'img')
					break
			default:
				if (!xmlns && name in getDOMNode(element))
					return setDOMProperty(element, name, value)
		}
	
		switch (typeof value) {
			case 'object':
			case 'function':
				return setDOMProperty(element, name, value)
			default:
				setDOMAttribute(element, name, value, '')
		}
	}
	
	/**
	 * @param {Element} element
	 * @param {string} name
	 * @param {string} value
	 * @param {Array} nodes
	 */
	function setDOMInnerHTML (element, name, value, nodes) {
		if (getDOMNode(element)[name])
			element.children.forEach(function (children) {
				nodes.push(getDOMNode(children))
			})
	
		if (getDOMNode(element)[name] = value)
			nodes.push.apply(nodes, getDOMNode(element).childNodes)
	
		nodes.forEach(function (node) {
			getDOMNode(element).appendChild(node)
		})
	}
	
	/**
	 * @return {Node}
	 */
	function getDOMDocument () {
		return document.documentElement
	}
	
	/**
	 * @param {Event} event
	 * @return {Node}
	 */
	function getDOMTarget (event) {
		return event.currentTarget
	}
	
	/**
	 * @param {Element} element
	 * @param {string} xmlns
	 */
	function getDOMType (element, xmlns) {
		switch (element.type) {
			case 'svg':
				return 'http://www.w3.org/2000/svg'
			case 'math':
				return 'http://www.w3.org/1998/Math/MathML'
			case 'foreignObject':
				return ''
		}
	
		return xmlns
	}
	
	/**
	 * @param {Element} element
	 * @return {Object}
	 */
	function getDOMProps (element) {
		switch (element.type) {
			case 'input':
				return merge({type: null, step: null, min: null, max: null}, element.props)
			default:
				return element.props
		}
	}
	
	/**
	 * @param {Element} element
	 * @return {Node}
	 */
	function getDOMNode (element) {
		return element.DOM.node
	}
	
	/**
	 * @param {Element} element
	 * @return {Node}
	 */
	function getDOMPortal (element) {
		if (typeof element.type === 'string')
			return getDOMDocument().querySelector(element.type)
	
		if (isValidDOMNode(element.type))
			return element.type
	
		return getDOMDocument()
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 * @param {Element} previous
	 * @param {Element} next
	 */
	function getDOMQuery (element, parent, previous, next) {
		var id = element.id
		var type = id > SharedElementNode ? '#text' : element.type.toLowerCase()
		var props = element.props
		var children = element.children
		var length = children.length
		var target = previous.active ? getDOMNode(previous).nextSibling : getDOMNode(parent).firstChild
		var sibling = target
		var node = null
	
		while (target) {
			if (target.nodeName.toLowerCase() === type) {
				if (id > SharedElementNode) {
					if (next.id > SharedElementNode)
						target.splitText(length)
	
					if (target.nodeValue !== children)
						target.nodeValue = children
				} else if (length === 0 && target.firstChild) {
					target.textContent = ''
				}
	
				if (parent.id === SharedElementPortal)
					getDOMPortal(parent).appendChild(target)
	
				node = target
				type = null
	
				if (!(target = target.nextSibling) || next.type)
					break
			}
	
			if (id > SharedElementNode && length === 0) {
				target.parentNode.insertBefore((node = createDOMText(element)), target)
	
				if (!next.type)
					type = null
				else
					break
			}
	
			target = (sibling = target).nextSibling
			sibling.parentNode.removeChild(sibling)
		}
	
		if (node && !node.splitText)
			for (var attributes = node.attributes, i = attributes.length - 1; i >= 0; --i) {
				var name = attributes[i].name
	
				if (props[name] === undefined)
					node.removeAttribute(name)
			}
	
		return node
	}
	
	/**
	 * @param {Node} target
	 * @param {boolean}
	 */
	function isValidDOMNode (target) {
		return !!(target && target.ELEMENT_NODE)
	}
	
	/**
	 * @param {Event} event
	 * @return {boolean}
	 */
	function isValidDOMEvent (event) {
		return !!(event && event.BUBBLING_PHASE)
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 */
	function removeDOMNode (element, parent) {
		getDOMNode(parent).removeChild(getDOMNode(element))
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} sibling
	 * @param {Element} parent
	 */
	function insertDOMNode (element, sibling, parent) {
		getDOMNode(parent).insertBefore(getDOMNode(element), getDOMNode(sibling))
	}
	
	/**
	 * @param {Element} element
	 * @param {Element} parent
	 */
	function appendDOMNode (element, parent) {
		getDOMNode(parent).appendChild(getDOMNode(element))
	}
	
	/**
	 * @param {Element} element
	 * @return {Node}
	 */
	function createDOMElement (element) {
		if (element.xmlns)
			return document.createElementNS(element.xmlns, element.type)
	
		return document.createElement(element.type)
	}
	
	/**
	 * @param {Element} element
	 * @return {Node}
	 */
	function createDOMText (element) {
		return document.createTextNode(element.children)
	}
	
	/**
	 * @param {Element} element
	 * @return {Node}
	 */
	function createDOMEmpty (element) {
		return document.createTextNode('')
	}
	
	var exports = {
		version: version,
		render: render,
		hydrate: hydrate,
		Component: Component,
		PureComponent: PureComponent,
		Children: Children,
		findDOMNode: findDOMNode,
		unmountComponentAtNode: unmountComponentAtNode,
		cloneElement: cloneElement,
		isValidElement: isValidElement,
		createPortal: createPortal,
		createElement: createElement,
		h: window.h = createElement
	}
	
	if (typeof __require__ === 'function')
		(function () {
			try {
				__require__('./node')(exports, Element, mountComponentElement, getComponentChildren, invokeErrorBoundary, getElementDefinition)
			} catch (err) {
				/* istanbul ignore next */
				console.error(err+'\nSomething went wrong trying to import the server module.')
			}
		}())
	
	return exports
}

/* istanbul ignore next */
if (typeof exports === 'object' && typeof module === 'object' && module !== null) {
	if (false) {
		module.exports = factory(global, require)
	} else {
		module.exports = factory(global)
	}
} else if (true) {
	!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory(global)),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
} else {
	global.dio = factory(global)
}
})(/* istanbul ignore next */typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(70)(module)))

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(2);
var _isPlaceholder = __webpack_require__(0);


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


/***/ }),

/***/ 70:
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(1);
var _isPlaceholder = __webpack_require__(0);


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


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTemperature = undefined;

var _actions = __webpack_require__(10);

var _view = __webpack_require__(11);

var createTemperature = exports.createTemperature = function createTemperature(update) {
  return {
    model: function model() {
      return {
        precipitations: false,
        precipitation: null,
        date: "",
        value: 20,
        units: "C"
      };
    },

    view: (0, _view.createView)((0, _actions.createActions)(update))
  };
};

/***/ })

/******/ });