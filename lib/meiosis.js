"use strict";
var flyd = require("flyd");
var getName = function (value) { return typeof value === "function" ? undefined : Object.keys(value)[0]; };
var getFn = function (value) {
    var name = getName(value);
    return name ? value[name] : value;
};
function newInstance() {
    var propose = flyd.stream();
    var run = function (params) {
        if (!params.initial || !params.scanner) {
            throw new Error("Please specify initial and scanner.");
        }
        var streams = {};
        var scanner = params.scanner;
        var name = getName(scanner);
        var fn = getFn(scanner);
        var lastStream = flyd.scan(fn, params.initial, propose);
        name && (streams[name] = lastStream);
        (params.mappers || []).forEach(function (mapper) {
            var name = getName(mapper);
            var fn = getFn(mapper);
            lastStream = flyd.map(fn, lastStream);
            name && (streams[name] = lastStream);
        });
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
exports.combine = flyd.combine, exports.map = flyd.map, exports.merge = flyd.merge, exports.on = flyd.on, exports.scan = flyd.scan;
//# sourceMappingURL=meiosis.js.map