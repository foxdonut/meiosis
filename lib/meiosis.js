"use strict";
var flyd = require("flyd");
exports.combine = flyd.combine, exports.map = flyd.map, exports.merge = flyd.merge, exports.on = flyd.on, exports.scan = flyd.scan, exports.stream = flyd.stream;
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