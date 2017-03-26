"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyModelChange(model, modelChange) {
    return modelChange(model);
}
exports.applyModelChange = applyModelChange;
var createEventsFor = function (eventStream, section, top, prefix) {
    return createEventFor(eventStream, section, top, top, prefix);
};
var createEventFor = function (eventStream, section, top, created, prefix) {
    Object.keys(section).forEach(function (key) {
        created[key] = {};
        if (section[key].length) {
            section[key].forEach(function (sectionKey) {
                var type = prefix + key + "." + sectionKey;
                var fn = function (data) { return eventStream({ type: type, data: data }); };
                fn.map = function (callback) { return eventStream.map(function (event) {
                    if (event.type === type) {
                        callback(event.data);
                    }
                }); };
                created[key][sectionKey] = fn;
                top[type] = fn;
            });
        }
        else {
            createEventFor(eventStream, section[key], top, created[key], prefix + key + ".");
        }
    });
    return created;
};
exports.createEvents = function (eventStream, events, connections) {
    var createdEvents = createEventsFor(eventStream, events, {}, "");
    if (connections) {
        Object.keys(connections).forEach(function (type) {
            return connections[type].forEach(function (listener) {
                return createdEvents[type].map(function (data) { return createdEvents[listener](data); });
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
    if (!params.modelChanges || !params.streams) {
        throw new Error("Please specify streamLibrary, modelChanges, and streams.");
    }
    if (isMeiosisTracerOn()) {
        var copy_1 = params.copy || (function (model) { return JSON.parse(JSON.stringify(model)); });
        var bufferedValues_1 = [];
        var devtoolInitialized_1 = false;
        var sendValues_1 = true;
        var changes_1 = new Date();
        var lastChange_1 = changes_1;
        params.modelChanges.map(function () { return changes_1 = new Date(); });
        var firstStream = params.streams[0];
        var lastStream = params.streams[params.streams.length - 1];
        window.addEventListener("message", function (evt) {
            if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
                sendValues_1 = evt.data.sendValuesBack;
                params.streams[0](evt.data.model);
            }
            else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
                devtoolInitialized_1 = true;
                bufferedValues_1.forEach(function (values) { return window.postMessage({ type: "MEIOSIS_VALUES", values: values, update: true }, "*"); });
            }
        });
        lastStream.map(function () {
            var change = changes_1;
            var update = change !== lastChange_1;
            lastChange_1 = change;
            var values = params.streams.map(function (stream) {
                return ({ value: copy_1(stream()) });
            });
            if (sendValues_1 || update) {
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