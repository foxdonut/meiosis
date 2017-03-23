"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScan = function (streamLibrary) { return function (fn, acc, s) {
    var result = streamLibrary.combine(function (s) {
        acc = fn(acc, s());
        return acc;
    }, [s]);
    if (!result()) {
        result(acc);
    }
    return result;
}; };
function applyModelChange(model, modelChange) {
    return modelChange(model);
}
exports.applyModelChange = applyModelChange;
function isMeiosisTracerOn() {
    return window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
}
exports.isMeiosisTracerOn = isMeiosisTracerOn;
function trace(params) {
    if (!params.streamLibrary || !params.modelChanges || !params.streams) {
        throw new Error("Please specify streamLibrary, modelChanges, and streams.");
    }
    if (isMeiosisTracerOn()) {
        var copy_1 = params.copy || (function (model) { return JSON.parse(JSON.stringify(model)); });
        var bufferedValues_1 = [];
        var devtoolInitialized_1 = false;
        var sendValues_1 = params.streamLibrary.stream(true);
        var changes_1 = params.streamLibrary.stream(new Date());
        var lastChange_1 = changes_1();
        params.modelChanges.map(function () { return changes_1(new Date()); });
        var firstStream = params.streams[0];
        var lastStream = params.streams[params.streams.length - 1];
        window.addEventListener("message", function (evt) {
            if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
                sendValues_1(evt.data.sendValuesBack);
                params.streams[0](evt.data.model);
            }
            else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
                devtoolInitialized_1 = true;
                bufferedValues_1.forEach(function (values) { return window.postMessage({ type: "MEIOSIS_VALUES", values: values, update: true }, "*"); });
            }
        });
        lastStream.map(function () {
            var change = changes_1();
            var update = change !== lastChange_1;
            lastChange_1 = change;
            var values = params.streams.map(function (stream) {
                return ({ value: copy_1(stream()) });
            });
            if (sendValues_1() || update) {
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