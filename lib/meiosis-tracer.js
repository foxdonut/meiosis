(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["meiosisTracer"] = factory();
	else
		root["meiosisTracer"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autoId": () => (/* binding */ autoId),
/* harmony export */   "colsId": () => (/* binding */ colsId),
/* harmony export */   "hiddenStreamId": () => (/* binding */ hiddenStreamId),
/* harmony export */   "hideStreamId": () => (/* binding */ hideStreamId),
/* harmony export */   "hideTracerId": () => (/* binding */ hideTracerId),
/* harmony export */   "histId": () => (/* binding */ histId),
/* harmony export */   "modelId": () => (/* binding */ modelId),
/* harmony export */   "resetId": () => (/* binding */ resetId),
/* harmony export */   "rowsId": () => (/* binding */ rowsId),
/* harmony export */   "sendId": () => (/* binding */ sendId),
/* harmony export */   "settingsContainerId": () => (/* binding */ settingsContainerId),
/* harmony export */   "showStreamId": () => (/* binding */ showStreamId),
/* harmony export */   "showTracerId": () => (/* binding */ showTracerId),
/* harmony export */   "sliderId": () => (/* binding */ sliderId),
/* harmony export */   "sliderValueId": () => (/* binding */ sliderValueId),
/* harmony export */   "stepBackId": () => (/* binding */ stepBackId),
/* harmony export */   "stepForwardId": () => (/* binding */ stepForwardId),
/* harmony export */   "streamContainerId": () => (/* binding */ streamContainerId),
/* harmony export */   "streamId": () => (/* binding */ streamId)
/* harmony export */ });
var rowsId = 'tracerRows';
var colsId = 'tracerCols';
var streamContainerId = 'tracerStreamContainer';
var settingsContainerId = 'tracerSettingsContainer';
var hideTracerId = 'tracerHide';
var showTracerId = 'tracerShow';
var autoId = 'traceAutoSend';
var streamId = function streamId(index) {
  return 'tracerStreamBox_ ' + index;
};
var hiddenStreamId = function hiddenStreamId(index) {
  return 'tracerStreamBoxHidden_' + index;
};
var hideStreamId = function hideStreamId(index) {
  return 'tracerStreamHide_' + index;
};
var showStreamId = function showStreamId(index) {
  return 'tracerStreamShow_' + index;
};
var modelId = function modelId(index) {
  return 'tracerModel_' + index;
};
var sliderId = function sliderId(index) {
  return 'tracerSlider_' + index;
};
var stepBackId = function stepBackId(index) {
  return 'tracerStepBack_' + index;
};
var stepForwardId = function stepForwardId(index) {
  return 'tracerStepForward_' + index;
};
var sliderValueId = function sliderValueId(index) {
  return 'tracerSliderValue_' + index;
};
var sendId = function sendId(index) {
  return 'tracerSend_' + index;
};
var resetId = function resetId(index) {
  return 'tracerReset_' + index;
};
var histId = function histId(index) {
  return 'tracerAccumulateHistory_' + index;
};

/***/ }),

/***/ "./src/meiosis-tracer.js":
/*!*******************************!*\
  !*** ./src/meiosis-tracer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "meiosisTracer": () => (/* binding */ meiosisTracer)
/* harmony export */ });
/* harmony import */ var _trace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trace */ "./src/trace.js");
/* harmony import */ var _tracer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tracer */ "./src/tracer.js");


var meiosisTracer = function meiosisTracer(params) {
  if (params.streams != null) {
    (0,_trace__WEBPACK_IMPORTED_MODULE_0__.trace)(params);
  }
  if (params.selector != null) {
    return (0,_tracer__WEBPACK_IMPORTED_MODULE_1__.tracer)(params);
  }
};

/***/ }),

/***/ "./src/settingsView.js":
/*!*****************************!*\
  !*** ./src/settingsView.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeResizeChangeDirection": () => (/* binding */ initializeResizeChangeDirection),
/* harmony export */   "settingsView": () => (/* binding */ settingsView)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var settingsView = function settingsView(_ref) {
  var element = _ref.element,
    listeners = _ref.listeners,
    direction = _ref.direction,
    rows = _ref.rows,
    cols = _ref.cols,
    autoSend = _ref.autoSend;
  element.innerHTML = "\n    <div id='".concat(_constants__WEBPACK_IMPORTED_MODULE_0__.settingsContainerId, "'>\n      <label title='Align in a row'>\n        <input type='radio' name='direction' value='row'\n          ").concat(direction === 'row' ? 'checked' : '', " />\n        Row\n      </label>\n      <label title='Align in a column'>\n        <input type='radio' name='direction' value='column'\n          ").concat(direction === 'column' ? 'checked' : '', " />\n        Col\n      </label>\n      <label title='Toggle auto-send'>\n        <input id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.autoId, "' type='checkbox' ").concat(autoSend ? 'checked' : '', " />\n        Auto\n      </label>\n      <input title='Number of rows' id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.rowsId, "' type='text' size='2'\n        value='").concat(rows, "'/>\n      <span> &times; </span>\n      <input title='Number of columns' id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.colsId, "' type='text' size='2'\n        value='").concat(cols, "'/>\n      <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.hideTracerId, "'>Hide</button>\n      <span>v5.0.0</span>\n    </div>\n    <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.showTracerId, "' style='display:none'>Show</button>\n  ");
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.hideTracerId).addEventListener('click', function (_evt) {
    listeners.onHideTracer();
  });
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.showTracerId).addEventListener('click', function (_evt) {
    listeners.onShowTracer();
  });
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.rowsId).addEventListener('input', function (evt) {
    listeners.onRowsColsChange(parseInt(evt.target.value, 10), parseInt(document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.colsId).value, 10));
  });
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.colsId).addEventListener('input', function (evt) {
    listeners.onRowsColsChange(parseInt(document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.rowsId).value, 10), parseInt(evt.target.value, 10));
  });
  var radios = document.querySelectorAll('input[name=\'direction\']');
  for (var i = 0, t = radios.length; i < t; i++) {
    radios[i].addEventListener('change', function (evt) {
      if (evt.target.checked) {
        listeners.onDirectionChange(evt.target.value);
      }
    });
  }
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.autoId).addEventListener('change', function (evt) {
    listeners.onAutoChange(evt.target.checked);
  });
};
var initializeResizeChangeDirection = function initializeResizeChangeDirection(listeners, direction) {
  var directionAccordingToWindowSize = function directionAccordingToWindowSize() {
    var dir = window.innerWidth > window.innerHeight ? 'row' : 'column';
    var radios = document.querySelectorAll('input[name=\'direction\']');
    for (var i = 0, t = radios.length; i < t; i++) {
      radios[i].checked = radios[i].value === dir;
    }
    listeners.onDirectionChange(dir);
  };
  if (direction === 'auto') {
    window.addEventListener('resize', directionAccordingToWindowSize);
  }
  if (direction === 'row' || direction === 'column') {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "streamView": () => (/* binding */ streamView)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var streamView = function streamView(_ref) {
  var element = _ref.element,
    index = _ref.index,
    listeners = _ref.listeners,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    rows = _ref.rows,
    cols = _ref.cols,
    _ref$hist = _ref.hist,
    hist = _ref$hist === void 0 ? true : _ref$hist,
    _ref$hide = _ref.hide,
    hide = _ref$hide === void 0 ? false : _ref$hide;
  var streamBoxStyle = 'padding:8px;border:1px solid gray';
  element.innerHTML = "\n    <div id='".concat(_constants__WEBPACK_IMPORTED_MODULE_0__.streamId(index), "' style='").concat(streamBoxStyle, "'>\n      <div>\n        <span>").concat(label, "</span>\n        <label title='Toggle accumulate history'>\n          <input id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.histId(index), "' type='checkbox' ").concat(hist ? 'checked' : '', " />\n          Hist\n        </label>\n        <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.hideStreamId(index), "'>Hide</button>\n      </div>\n      <textarea id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.modelId(index), "' rows='").concat(rows, "' cols='").concat(cols, "'>\n      </textarea>\n      <div>\n        <input id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.sliderId(index), "' type='range' min='0' max='0' value='0'\n          style='width: 100%' />\n        <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.stepBackId(index), "'>&lt</button>\n        <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.stepForwardId(index), "'>&gt</button>\n        <span id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.sliderValueId(index), "'>-1</span>\n        <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.sendId(index), "'>Send</button>\n        <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.resetId(index), "'>Reset</button>\n      </div>\n    </div>\n    <div id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.hiddenStreamId(index), "' style='display:none'>\n      <span>").concat(label, " </span>\n      <button id='").concat(_constants__WEBPACK_IMPORTED_MODULE_0__.showStreamId(index), "'>Show</button>\n    </div>\n  ");
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.sliderId(index)).addEventListener('input', function (evt) {
    listeners.onSliderChange(parseInt(evt.target.value, 10));
  });
  var stepBack = document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.stepBackId(index));
  stepBack.addEventListener('click', function (_evt) {
    listeners.onStepBack();
  });
  stepBack.disabled = true;
  var stepForward = document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.stepForwardId(index));
  stepForward.addEventListener('click', function (_evt) {
    listeners.onStepForward();
  });
  stepForward.disabled = true;
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.sendId(index)).addEventListener('click', function (_evt) {
    listeners.onSend(document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.modelId(index)).value);
  });
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.resetId(index)).addEventListener('click', function (_evt) {
    listeners.onReset();
  });
  var hideStream = function hideStream(index) {
    document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.streamId(index)).style = 'display:none';
    document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.hiddenStreamId(index)).style = streamBoxStyle;
  };
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.hideStreamId(index)).addEventListener('click', function (_evt) {
    return hideStream(index);
  });
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.showStreamId(index)).addEventListener('click', function (_evt) {
    document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.hiddenStreamId(index)).style = 'display:none';
    document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.streamId(index)).style = streamBoxStyle;
  });
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.histId(index)).addEventListener('change', function (evt) {
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trace": () => (/* binding */ trace)
/* harmony export */ });
var isMeiosisTracerOn = function isMeiosisTracerOn() {
  return window && window['__MEIOSIS_TRACER_GLOBAL_HOOK__'];
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
var trace = function trace(_ref) {
  var _ref$streams = _ref.streams,
    streams = _ref$streams === void 0 ? [] : _ref$streams,
    _ref$stringify = _ref.stringify,
    stringify = _ref$stringify === void 0 ? function (obj) {
      return JSON.stringify(obj, null, 4);
    } : _ref$stringify,
    _ref$parse = _ref.parse,
    parse = _ref$parse === void 0 ? function (str) {
      return JSON.parse(str);
    } : _ref$parse,
    _ref$listen = _ref.listen,
    listen = _ref$listen === void 0 ? function (stream, fn) {
      return stream.map(fn);
    } : _ref$listen,
    _ref$emit = _ref.emit,
    emit = _ref$emit === void 0 ? function (stream, value) {
      return stream(value);
    } : _ref$emit;
  if (!isMeiosisTracerOn()) {
    return;
  }
  var bufferedStreamValues = [];
  var devtoolInitialized = false;
  var streamObjs = [];
  for (var i = 0, t = streams.length; i < t; i++) {
    var defaultLabel = 'Stream ' + i;
    if (streams[i].stream) {
      streams[i].label = streams[i].label || defaultLabel;
      streamObjs.push(streams[i]);
    } else {
      streamObjs.push({
        stream: streams[i],
        label: defaultLabel
      });
    }
  }
  streamObjs.forEach(function (_ref2, index) {
    var stream = _ref2.stream;
    listen(stream, function (value) {
      var data = {
        type: 'MEIOSIS_STREAM_VALUE',
        index: index,
        value: stringify(value)
      };
      if (devtoolInitialized) {
        window.postMessage(data, '*');
      } else {
        bufferedStreamValues.push(data);
      }
    });
  });
  window.addEventListener('message', function (evt) {
    if (evt.data.type === 'MEIOSIS_TRACER_INIT') {
      var streamOpts = [];
      streamObjs.forEach(function (streamObj) {
        var streamOpt = {};
        Object.keys(streamObj).forEach(function (key) {
          if (key !== 'stream') {
            streamOpt[key] = streamObj[key];
          }
        });
        streamOpts.push(streamOpt);
      });
      window.postMessage({
        type: 'MEIOSIS_STREAM_OPTIONS',
        value: streamOpts
      }, '*');
      devtoolInitialized = true;
      bufferedStreamValues.forEach(function (data) {
        return window.postMessage(data, '*');
      });
      bufferedStreamValues.length = 0;
    } else if (evt.data.type === 'MEIOSIS_TRIGGER_STREAM_VALUE') {
      var _evt$data = evt.data,
        index = _evt$data.index,
        value = _evt$data.value;
      emit(streamObjs[index].stream, parse(value));
    }
  });

  // Send ping in case tracer was already loaded and we missed the MEIOSIS_TRACER_INIT message.
  window.postMessage({
    type: 'MEIOSIS_PING'
  }, '*');
};

/***/ }),

/***/ "./src/tracer.js":
/*!***********************!*\
  !*** ./src/tracer.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tracer": () => (/* binding */ tracer)
/* harmony export */ });
/* harmony import */ var _streamView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./streamView */ "./src/streamView.js");
/* harmony import */ var _updateView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateView */ "./src/updateView.js");
/* harmony import */ var _settingsView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settingsView */ "./src/settingsView.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");




window['__MEIOSIS_TRACER_GLOBAL_HOOK__'] = true;
var states = [];
var accumulateHistory = [];
var tracer = function tracer(_ref) {
  var selector = _ref.selector,
    sendTracerInit = _ref.sendTracerInit,
    triggerStreamValue = _ref.triggerStreamValue,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'column' : _ref$direction,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? 15 : _ref$rows,
    _ref$cols = _ref.cols,
    cols = _ref$cols === void 0 ? 50 : _ref$cols,
    _ref$autoSend = _ref.autoSend,
    autoSend = _ref$autoSend === void 0 ? true : _ref$autoSend;
  var target = document.querySelector(selector);
  if (!target) {
    return;
  }
  target.classList.add("theme-".concat(theme));
  var containerStyle = null;
  if (sendTracerInit == null) {
    sendTracerInit = function sendTracerInit() {
      window.postMessage({
        type: 'MEIOSIS_TRACER_INIT'
      }, '*');
    };
  }
  if (triggerStreamValue == null) {
    triggerStreamValue = function triggerStreamValue(index, value) {
      window.postMessage({
        type: 'MEIOSIS_TRIGGER_STREAM_VALUE',
        index: index,
        value: value
      }, '*');
    };
  }
  var receiveStreamOptions = function receiveStreamOptions(streamOptions) {
    if (target.lastChild) {
      return;
    }
    var settingsListeners = {
      onHideTracer: function onHideTracer() {
        var container = document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.streamContainerId);
        containerStyle = container.style;
        container.style = 'display:none';
        document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.settingsContainerId).style = 'display:none';
        document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.showTracerId).style = '';
      },
      onShowTracer: function onShowTracer() {
        document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.streamContainerId).style = containerStyle;
        document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.settingsContainerId).style = '';
        document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.showTracerId).style = 'display:none';
      },
      onRowsColsChange: function onRowsColsChange(rows, cols) {
        for (var i = 0; i < streamOptions.length; i++) {
          var textarea = document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.modelId(i));
          textarea.rows = rows;
          textarea.cols = cols;
        }
      },
      onDirectionChange: function onDirectionChange(direction) {
        document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.streamContainerId).style = 'display:flex;flex-direction:' + direction;
      },
      onAutoChange: function onAutoChange(auto) {
        autoSend = auto;
      }
    };
    var settings = document.createElement('div');
    target.append(settings);
    (0,_settingsView__WEBPACK_IMPORTED_MODULE_2__.settingsView)({
      element: settings,
      listeners: settingsListeners,
      direction: direction,
      rows: rows,
      cols: cols,
      autoSend: autoSend
    });
    var container = document.createElement('div');
    container.id = _constants__WEBPACK_IMPORTED_MODULE_3__.streamContainerId;
    container.style = 'display:flex;flex-direction:column';
    target.append(container);
    var sendStreamValue = function sendStreamValue(index, model) {
      if (autoSend) {
        accumulateHistory[index] = false;
        document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.histId(index)).checked = false;
        triggerStreamValue(index, model);
      }
    };
    var _loop = function _loop(index) {
      var _streamOptions$index = streamOptions[index],
        label = _streamOptions$index.label,
        hist = _streamOptions$index.hist,
        hide = _streamOptions$index.hide;
      states.push({
        history: [],
        value: -1
      });
      accumulateHistory.push(hist === false ? false : true);
      var listeners = {
        onSliderChange: function onSliderChange(value) {
          var state = states[index];
          var model = state.history[value];
          state.value = value;
          (0,_updateView__WEBPACK_IMPORTED_MODULE_1__.updateView)({
            index: index,
            model: model,
            value: value
          });
          sendStreamValue(index, model);
        },
        onStepBack: function onStepBack() {
          var state = states[index];
          state.value = state.value - 1;
          var model = state.history[state.value];
          (0,_updateView__WEBPACK_IMPORTED_MODULE_1__.updateView)({
            index: index,
            model: model,
            value: state.value
          });
          sendStreamValue(index, model);
        },
        onStepForward: function onStepForward() {
          var state = states[index];
          state.value = state.value + 1;
          var model = state.history[state.value];
          (0,_updateView__WEBPACK_IMPORTED_MODULE_1__.updateView)({
            index: index,
            model: model,
            value: state.value
          });
          sendStreamValue(index, model);
        },
        onSend: function onSend(value) {
          triggerStreamValue(index, value);
        },
        onReset: function onReset() {
          var state = states[index];
          state.history.length = 0;
          state.value = -1;
          (0,_updateView__WEBPACK_IMPORTED_MODULE_1__.updateView)({
            index: index,
            model: '',
            value: state.value,
            max: state.value
          });
        },
        onHistChange: function onHistChange(index, hist) {
          accumulateHistory[index] = hist;
        }
      };
      var element = document.createElement('div');
      element.style = 'flex-grow:1';
      container.append(element);
      (0,_streamView__WEBPACK_IMPORTED_MODULE_0__.streamView)({
        element: element,
        index: index,
        listeners: listeners,
        label: label,
        rows: rows,
        cols: cols,
        hist: hist,
        hide: hide
      });
    };
    for (var index = 0; index < streamOptions.length; index++) {
      _loop(index);
    }
    (0,_settingsView__WEBPACK_IMPORTED_MODULE_2__.initializeResizeChangeDirection)(settingsListeners, direction);
  };
  var receiveStreamValue = function receiveStreamValue(index, model) {
    if (accumulateHistory[index]) {
      var state = states[index];
      if (state.history.length > 0) {
        state.history.length = state.value + 1;
      }
      state.history.push(model);
      state.value = state.history.length - 1;
      (0,_updateView__WEBPACK_IMPORTED_MODULE_1__.updateView)({
        index: index,
        model: model,
        value: state.value,
        max: state.history.length - 1
      });
    }
  };
  window.addEventListener('message', function (evt) {
    if (evt.data.type === 'MEIOSIS_STREAM_OPTIONS') {
      receiveStreamOptions(evt.data.value);
    } else if (evt.data.type === 'MEIOSIS_STREAM_VALUE') {
      receiveStreamValue(evt.data.index, evt.data.value);
    }
  });
  sendTracerInit();
  return {
    receiveStreamOptions: receiveStreamOptions,
    receiveStreamValue: receiveStreamValue
  };
};

/***/ }),

/***/ "./src/updateView.js":
/*!***************************!*\
  !*** ./src/updateView.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateView": () => (/* binding */ updateView)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var updateView = function updateView(_ref) {
  var index = _ref.index,
    model = _ref.model,
    value = _ref.value,
    max = _ref.max;
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.modelId(index)).value = model;
  if (max != null) {
    document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.sliderId(index)).max = max;
  }
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.sliderId(index)).value = value;
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.sliderValueId(index)).innerHTML = value;
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.stepBackId(index)).disabled = value <= 0;
  document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.stepForwardId(index)).disabled = value == document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_0__.sliderId(index)).max;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _meiosis_tracer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./meiosis-tracer */ "./src/meiosis-tracer.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_meiosis_tracer__WEBPACK_IMPORTED_MODULE_0__.meiosisTracer);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=meiosis-tracer.js.map