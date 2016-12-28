"use strict";
var flyd = require("flyd");
var objectPath = require("object-path");
var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
var prop = function (property) { return function (value) { return value[property]; }; };
var identity = function (value) { return value; };
function newInstance() {
    var propose = flyd.stream();
    var run = function (params) {
        if (!params.initialModel || !params.components) {
            throw new Error("Please specify initialModel and components.");
        }
        var getComponentFunctions = function (property, components) {
            return components.map(prop(property)).filter(identity);
        };
        var addAllComponents = function (components, list) {
            var children = list || [];
            children.forEach(function (child) {
                components.push(child);
                addAllComponents(components, child.components);
            });
        };
        var components = [];
        addAllComponents(components, params.components);
        var initialModels = getComponentFunctions("initialModel", components);
        var initialModel = initialModels.reduce(function (model, fn) { return fn(model); }, params.initialModel);
        var receives = getComponentFunctions("receive", components);
        var receive = function (model, proposal) {
            return receives.reduce(function (model, fn) { return fn(model, proposal); }, model);
        };
        var model = flyd.scan(receive, initialModel, propose);
        var states = getComponentFunctions("state", components);
        var stateFn = function (model) {
            return states.reduce(function (state, fn) { return fn(model, state); }, copy(model));
        };
        var state = flyd.map(stateFn, model);
        var nexts = getComponentFunctions("nextAction", components);
        var nextAction = function (model, proposal) { return nexts.forEach(function (fn) { return fn(model, proposal); }); };
        flyd.on(function (model) { return propose() && nextAction(model, propose()); }, model);
        return {
            model: model,
            stateFn: stateFn,
            state: state
        };
    };
    return {
        propose: propose,
        run: run
    };
}
exports.newInstance = newInstance;
function nestComponent(params) {
    var component = params.component;
    var path = params.path;
    var nested = {
        initialModel: component.initialModel,
        components: component.components,
        receive: component.receive && (function (model, proposal) {
            var subModel = objectPath.get(model, path);
            if (subModel) {
                component.receive(subModel, proposal);
            }
            return model;
        }),
        nextAction: component.nextAction && (function (model, proposal) {
            var subModel = objectPath.get(model, path);
            if (subModel) {
                component.nextAction(subModel, proposal);
            }
        }),
        state: component.state && (function (model, state) {
            var subModel = objectPath.get(model, path);
            var subState = objectPath.get(state, path);
            if (subModel && subState) {
                objectPath.set(state, path, component.state(subModel, subState));
            }
            return state;
        })
    };
    return nested;
}
exports.nestComponent = nestComponent;
function componentContainer(params) {
    var container = {
        initialModel: params.component.initialModel,
        components: params.component.components,
        receive: function (model, proposal) {
            params.component.receive && params.component.receive(model, proposal);
            params.getComponents(model).forEach(function (child) { return child.receive && child.receive(model, proposal); });
            return model;
        },
        state: function (model, state) {
            params.component.state && params.component.state(model, state);
            params.getComponents(model).forEach(function (child) { return child.state && child.state(model, state); });
            return state;
        },
        nextAction: function (model, proposal) {
            params.component.nextAction && params.component.nextAction(model, proposal);
            params.getComponents(model).forEach(function (child) { return child.nextAction && child.nextAction(model, proposal); });
        }
    };
    return container;
}
exports.componentContainer = componentContainer;
var instance = newInstance();
var propose = instance.propose;
exports.propose = propose;
var run = instance.run;
exports.run = run;
exports.combine = flyd.combine, exports.map = flyd.map, exports.merge = flyd.merge, exports.on = flyd.on, exports.scan = flyd.scan;
//# sourceMappingURL=meiosis.js.map