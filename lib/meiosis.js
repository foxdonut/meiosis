"use strict";
var flyd = require("flyd");
exports.combine = flyd.combine, exports.map = flyd.map, exports.merge = flyd.merge, exports.on = flyd.on, exports.scan = flyd.scan, exports.stream = flyd.stream;
exports.mergeAll = function (streams) {
    var merged = exports.stream();
    streams.forEach(function (s) { return exports.map(merged, s); });
    return merged;
};
var getName = function (value) { return typeof value === "function" ? undefined : Object.keys(value)[0]; };
var getFn = function (value) {
    var name = getName(value);
    return name ? value[name] : value;
};
function newInstance() {
    var run = function (params) {
        if (!params.initialModel || !params.modelChanges) {
            throw new Error("Please specify initialModel and modelChanges.");
        }
        var streams = {};
        var allStreams = [];
        var lastStream = exports.scan(function (model, modelChange) { return modelChange(model); }, params.initialModel, params.modelChanges);
        var scannerStream = lastStream;
        var scannerName = "modelChanges";
        streams[scannerName] = lastStream;
        allStreams.push({ name: scannerName, stream: lastStream });
        (params.mappers || []).forEach(function (mapper) {
            var mapperName = getName(mapper);
            var mapperFn = getFn(mapper);
            lastStream = exports.map(mapperFn, lastStream);
            mapperName && (streams[mapperName] = lastStream);
            allStreams.push({ name: (mapperName || ""), stream: lastStream });
        });
        var render = exports.stream();
        exports.on(render, lastStream);
        streams["render"] = render;
        var devtool = window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
        if (devtool) {
            var copy_1 = params.copy || (function (model) { return JSON.parse(JSON.stringify(model)); });
            var bufferedValues_1 = [];
            var devtoolInitialized_1 = false;
            var sendValues_1 = exports.stream(true);
            var changes_1 = exports.stream(new Date());
            var lastChange_1 = changes_1();
            exports.on(function () { return changes_1(new Date()); }, params.modelChanges);
            window.addEventListener("message", function (evt) {
                if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
                    sendValues_1(evt.data.sendValuesBack);
                    scannerStream(evt.data.model);
                }
                else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
                    devtoolInitialized_1 = true;
                    bufferedValues_1.forEach(function (values) { return window.postMessage({ type: "MEIOSIS_VALUES", values: values }, "*"); });
                }
            });
            exports.on(function () {
                var change = changes_1();
                var update = change !== lastChange_1;
                lastChange_1 = change;
                var values = allStreams.map(function (namedStream) {
                    return ({ name: namedStream.name, value: copy_1(namedStream.stream()) });
                });
                if (sendValues_1()) {
                    if (devtoolInitialized_1) {
                        window.postMessage({ type: "MEIOSIS_VALUES", values: values, update: update }, "*");
                    }
                    else {
                        bufferedValues_1.push(values);
                    }
                }
            }, lastStream);
        }
        return streams;
    };
    return {
        run: run
    };
}
exports.newInstance = newInstance;
var instance = newInstance();
var run = instance.run;
exports.run = run;
//# sourceMappingURL=meiosis.js.map