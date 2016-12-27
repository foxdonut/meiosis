"use strict";
var flyd = require("flyd");
var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
var prop = function (property) { return function (value) { return value[property]; }; };
var identity = function (value) { return value; };
var getComponentFunctions = function (property) { return function (components) {
    return components.map(prop(property)).filter(identity);
}; };
function newInstance(params) {
    var propose = flyd.stream();
    var components = flyd.stream([]);
    var receives = flyd.map(getComponentFunctions("receive"), components);
    var receive = flyd.map(function (fns) { return function (model, proposal) {
        return fns.reduce(function (model, fn) { return fn(model, proposal); }, model);
    }; }, receives);
    var model = flyd.scan(function (model, proposal) {
        return receive()(model, proposal);
    }, params.initialModel, propose);
    var states = flyd.map(getComponentFunctions("state"), components);
    var stateFn = flyd.map(function (fns) { return function (model) {
        return fns.reduce(function (state, fn) { return fn(model, state); }, JSON.parse(JSON.stringify(model)));
    }; }, states);
    var state = flyd.combine(function (model, stateFn) { return stateFn()(model()); }, [model, stateFn]);
    var nexts = flyd.map(getComponentFunctions("nextAction"), components);
    var nextAction = flyd.map(function (fns) { return function (model, proposal) { return fns.forEach(function (fn) { return fn(model, proposal); }); }; }, nexts);
    flyd.on(function (model) { return propose() && nextAction()(model, propose()); }, model);
    return {
        propose: propose,
        components: components,
        model: model,
        stateFn: stateFn,
        state: state
    };
}
exports.newInstance = newInstance;
//# sourceMappingURL=meiosis.js.map