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
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
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

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var jsx = exports.jsx = function jsx(propMap) {
  return function (h) {
    return function (type, props) {
      var args = [type, props];
      if (props) {
        Object.keys(propMap).forEach(function (fromProp) {
          if (props[fromProp]) {
            var toProp = propMap[fromProp];
            props[toProp] = props[fromProp];
            delete props[fromProp];
          }
        });
      }
      var rest = [];
      for (var i = 2; i < arguments.length; i++) {
        rest.push(arguments[i]);
      }
      args.push(rest);
      return h.apply(null, args);
    };
  };
};

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

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = h;
var i
var stack = []

function h(type, props) {
  var node
  var children = []

  for (i = arguments.length; i-- > 2; ) {
    stack.push(arguments[i])
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (i = node.length; i--; ) {
        stack.push(node[i])
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(typeof node === "number" ? (node = node + "") : node)
    }
  }

  return typeof type === "string"
    ? { type: type, props: props || {}, children: children }
    : type(props || {}, children)
}


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

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _setup = __webpack_require__(92);

(0, _setup.setupApp)();

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupApp = exports.setupRender = undefined;

var _picodom = __webpack_require__(93);

var _common = __webpack_require__(4);

var _jsx = __webpack_require__(16);

var jsxPicodom = (0, _jsx.jsx)({
  "onChange": "onchange",
  "onClick": "onclick",
  "onInput": "oninput"
});

var setupRender = exports.setupRender = function setupRender() {
  global.jsx = jsxPicodom(_picodom.h);
  var el = null;
  return function (view, element) {
    return (0, _picodom.patch)(el, el = view, element);
  };
};

var setupApp = exports.setupApp = function setupApp() {
  return (0, _common.setup)(setupRender());
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patch__ = __webpack_require__(94);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return __WEBPACK_IMPORTED_MODULE_1__patch__["a"]; });




/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = patch;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(36);


var callbacks = []

function patch(oldNode, node, container, cb) {
  var element = patchElement(
    container || (container = document.body),
    container.children[0],
    oldNode,
    node
  )

  while ((cb = callbacks.pop())) cb()

  return element
}

function merge(target, source) {
  var result = {}

  for (var i in target) {
    result[i] = target[i]
  }
  for (var i in source) {
    result[i] = source[i]
  }

  return result
}

function createElement(node, isSVG) {
  if (typeof node === "string") {
    var element = document.createTextNode(node)
  } else {
    var element = (isSVG = isSVG || node.type === "svg")
      ? document.createElementNS("http://www.w3.org/2000/svg", node.type)
      : document.createElement(node.type)

    if (node.props && node.props.oncreate) {
      callbacks.push(function() {
        node.props.oncreate(element)
      })
    }

    for (var i = 0; i < node.children.length; i++) {
      element.appendChild(createElement(node.children[i], isSVG))
    }

    for (var i in node.props) {
      setElementProp(element, i, node.props[i])
    }
  }
  return element
}

function setElementProp(element, name, value, oldValue) {
  if (name === "key") {
  } else if (name === "style") {
    for (var name in merge(oldValue, (value = value || {}))) {
      element.style[name] = value[name] || ""
    }
  } else {
    try {
      element[name] = value
    } catch (_) {}

    if (typeof value !== "function") {
      if (value) {
        element.setAttribute(name, value)
      } else {
        element.removeAttribute(name)
      }
    }
  }
}

function updateElement(element, oldProps, props) {
  for (var i in merge(oldProps, props)) {
    var value = props[i]
    var oldValue = i === "value" || i === "checked" ? element[i] : oldProps[i]

    if (value !== oldValue) {
      value !== oldValue && setElementProp(element, i, value, oldValue)
    }
  }

  if (props && props.onupdate) {
    callbacks.push(function() {
      props.onupdate(element, oldProps)
    })
  }
}

function removeElement(parent, element, props) {
  if (
    props &&
    props.onremove &&
    typeof (props = props.onremove(element)) === "function"
  ) {
    props(remove)
  } else {
    remove()
  }

  function remove() {
    parent.removeChild(element)
  }
}

function getKey(node) {
  if (node && node.props) {
    return node.props.key
  }
}

function patchElement(parent, element, oldNode, node, isSVG, nextSibling) {
  if (oldNode == null) {
    element = parent.insertBefore(createElement(node, isSVG), element)
  } else if (node.type != null && node.type === oldNode.type) {
    updateElement(element, oldNode.props, node.props)

    isSVG = isSVG || node.type === "svg"

    var len = node.children.length
    var oldLen = oldNode.children.length
    var oldKeyed = {}
    var oldElements = []
    var keyed = {}

    for (var i = 0; i < oldLen; i++) {
      var oldElement = (oldElements[i] = element.childNodes[i])
      var oldChild = oldNode.children[i]
      var oldKey = getKey(oldChild)

      if (null != oldKey) {
        oldKeyed[oldKey] = [oldElement, oldChild]
      }
    }

    var i = 0
    var j = 0

    while (j < len) {
      var oldElement = oldElements[i]
      var oldChild = oldNode.children[i]
      var newChild = node.children[j]

      var oldKey = getKey(oldChild)
      if (keyed[oldKey]) {
        i++
        continue
      }

      var newKey = getKey(newChild)

      var keyedNode = oldKeyed[newKey] || []

      if (null == newKey) {
        if (null == oldKey) {
          patchElement(element, oldElement, oldChild, newChild, isSVG)
          j++
        }
        i++
      } else {
        if (oldKey === newKey) {
          patchElement(element, keyedNode[0], keyedNode[1], newChild, isSVG)
          i++
        } else if (keyedNode[0]) {
          element.insertBefore(keyedNode[0], oldElement)
          patchElement(element, keyedNode[0], keyedNode[1], newChild, isSVG)
        } else {
          patchElement(element, oldElement, null, newChild, isSVG)
        }

        j++
        keyed[newKey] = newChild
      }
    }

    while (i < oldLen) {
      var oldChild = oldNode.children[i]
      var oldKey = getKey(oldChild)
      if (null == oldKey) {
        removeElement(element, oldElements[i], oldChild.props)
      }
      i++
    }

    for (var i in oldKeyed) {
      var keyedNode = oldKeyed[i]
      var reusableNode = keyedNode[1]
      if (!keyed[reusableNode.props.key]) {
        removeElement(element, keyedNode[0], reusableNode.props)
      }
    }
  } else if (element && node !== element.nodeValue) {
    if (typeof node === "string" && typeof oldNode === "string") {
      element.nodeValue = node
    } else {
      element = parent.insertBefore(
        createElement(node, isSVG),
        (nextSibling = element)
      )
      removeElement(parent, nextSibling, oldNode.props)
    }
  }
  return element
}


/***/ })

/******/ });