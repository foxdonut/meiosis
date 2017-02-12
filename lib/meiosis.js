"use strict";
exports.createMergeAll = function (streamLibrary) { return function (streams) {
    var merged = streamLibrary.stream();
    streams.forEach(function (s) { return s.map(merged); });
    return merged;
}; };
exports.createScan = function (lib) { return function (fn, acc, s) {
    var result = lib.combine(function (s) {
        acc = fn(acc, s());
        return acc;
    }, [s]);
    if (!result()) {
        result(acc);
    }
    return result;
}; };
//# sourceMappingURL=meiosis.js.map