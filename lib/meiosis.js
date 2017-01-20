"use strict";
var flyd = require("flyd");
exports.combine = flyd.combine, exports.map = flyd.map, exports.merge = flyd.merge, exports.on = flyd.on, exports.scan = flyd.scan, exports.stream = flyd.stream;
var getName = function (value) { return typeof value === "function" ? undefined : Object.keys(value)[0]; };
var getFn = function (value) {
    var name = getName(value);
    return name ? value[name] : value;
};
function newInstance() {
    var propose = exports.stream();
    var run = function (params) {
        if (!params.initialModel || !params.scanner) {
            throw new Error("Please specify initialModel and scanner.");
        }
        var streams = {};
        var allStreams = [];
        var scanner = params.scanner;
        var scannerName = getName(scanner);
        var scannerFn = getFn(scanner);
        var lastStream = exports.scan(scannerFn, params.initialModel, propose);
        var scannerStream = lastStream;
        scannerName && (streams[scannerName] = lastStream);
        allStreams.push({ name: (scannerName || ""), stream: lastStream });
        (params.mappers || []).forEach(function (mapper) {
            var mapperName = getName(mapper);
            var mapperFn = getFn(mapper);
            lastStream = exports.map(mapperFn, lastStream);
            mapperName && (streams[mapperName] = lastStream);
            allStreams.push({ name: (mapperName || ""), stream: lastStream });
        });
        var render = exports.stream();
        if (params.nextAction) {
            var lastProposal_1 = propose();
            exports.on(function (value) {
                var proposal = propose();
                render(value);
                if (proposal !== lastProposal_1) {
                    params.nextAction(value, proposal);
                }
                lastProposal_1 = proposal;
            }, lastStream);
        }
        else {
            exports.on(render, lastStream);
        }
        streams["render"] = render;
        var devtool = !!window;
        if (devtool) {
            var copy_1 = params.copy || (function (model) { return JSON.parse(JSON.stringify(model)); });
            var bufferedValues_1 = [];
            var devtoolInitialized_1 = false;
            var lastProposal_2 = propose();
            var sendValues_1 = exports.stream(true);
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
                var proposal = propose();
                var update = proposal !== lastProposal_2;
                lastProposal_2 = proposal;
                var values = allStreams.map(function (namedStream) {
                    return ({ name: namedStream.name, value: copy_1(namedStream.stream()) });
                });
                values.unshift({ name: "proposal", value: proposal });
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
        propose: propose,
        run: run
    };
}
exports.newInstance = newInstance;
var instance = newInstance();
var propose = instance.propose;
exports.propose = propose;
var run = instance.run;
exports.run = run;
//# sourceMappingURL=meiosis.js.map