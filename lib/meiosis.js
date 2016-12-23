"use strict";
var flyd = require("flyd");
var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
function newInstance(component) {
    var propose = flyd.stream();
    var model = flyd.scan(component.receive, component.initialModel, propose);
    return {
        model: model,
        propose: propose
    };
}
exports.newInstance = newInstance;
//# sourceMappingURL=meiosis.js.map