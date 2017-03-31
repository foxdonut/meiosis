"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyUpdate(model, update) {
    return update(model);
}
exports.applyUpdate = applyUpdate;
var createEventsFor = function (eventStream, events, top) {
    createEventFor(eventStream, events, top, top, "");
    return top;
};
var createEventFor = function (eventStream, section, top, created, prefix) {
    Object.keys(section).forEach(function (key) {
        if (section[key].length) {
            var emit_1 = null;
            if (key === "emit") {
                emit_1 = true;
            }
            else if (key === "listen") {
                emit_1 = false;
            }
            else {
                throw new Error("key for events must be 'emit' or 'listen'.");
            }
            section[key].forEach(function (eventName) {
                var type = prefix + eventName;
                var fn = null;
                if (emit_1) {
                    fn = function (data) { return eventStream({ type: type, data: data }); };
                    fn.map = function (callback) { return eventStream.map(function (event) {
                        if (event.type === type) {
                            callback(event.data);
                        }
                    }); };
                }
                else {
                    fn = function (data) { return fn.callback && fn.callback(data); };
                    fn.map = function (callback) { return fn.callback = callback; };
                }
                created[eventName] = fn;
                top[type] = fn;
            });
        }
        else {
            created[key] = {};
            createEventFor(eventStream, section[key], top, created[key], prefix + key + ".");
        }
    });
    return created;
};
exports.createEvents = function (params) {
    var createdEvents = createEventsFor(params.eventStream, params.events, {});
    if (params.connect) {
        Object.keys(params.connect).forEach(function (type) {
            var types = [];
            var wildcard = "*.";
            if (type.indexOf(wildcard) === 0) {
                var suffix_1 = type.substring(wildcard.length);
                Object.keys(createdEvents).forEach(function (eventType) {
                    if (eventType.indexOf(suffix_1) >= 0) {
                        types.push(eventType);
                    }
                });
            }
            else {
                types.push(type);
            }
            var listeners = params.connect[type];
            var listenerArray = (typeof listeners === "string" ? [listeners] : listeners);
            listenerArray.forEach(function (listener) {
                var listenerEvents = [];
                if (listener.indexOf(wildcard) === 0) {
                    var suffix_2 = listener.substring(wildcard.length);
                    Object.keys(createdEvents).forEach(function (eventType) {
                        if (eventType.indexOf(suffix_2) >= 0) {
                            listenerEvents.push(eventType);
                        }
                    });
                }
                else {
                    listenerEvents.push(listener);
                }
                types.forEach(function (type) { return listenerEvents.forEach(function (listenerEvent) {
                    return createdEvents[type].map(function (data) { return createdEvents[listenerEvent](data); });
                }); });
            });
        });
    }
    return createdEvents;
};
function isMeiosisTracerOn() {
    return window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
}
exports.isMeiosisTracerOn = isMeiosisTracerOn;
function trace(params) {
    if (!params.update || !params.dataStreams) {
        throw new Error("Please specify update and dataStreams.");
    }
    if (isMeiosisTracerOn()) {
        var copy_1 = params.copy || (function (model) { return JSON.parse(JSON.stringify(model)); });
        var bufferedValues_1 = [];
        var bufferedStreamValues_1 = [];
        var devtoolInitialized_1 = false;
        var sendValues_1 = true;
        var liveChange_1 = new Date();
        var lastChange_1 = liveChange_1;
        params.update.map(function () { return liveChange_1 = new Date(); });
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
                params.dataStreams[0](evt.data.model);
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
            var update = liveChange_1 !== lastChange_1;
            lastChange_1 = liveChange_1;
            if (sendValues_1 || update) {
                var values = params.dataStreams.map(function (stream) {
                    return ({ value: copy_1(stream()) });
                });
                if (devtoolInitialized_1) {
                    window.postMessage({ type: "MEIOSIS_VALUES", values: values, update: update }, "*");
                }
                else {
                    bufferedValues_1.push(values);
                }
            }
        });
    }
}
exports.trace = trace;
;
//# sourceMappingURL=meiosis.js.map