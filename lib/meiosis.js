"use strict";
var wire_1 = require("./wire");
var nextId = 1;
var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
function newInstance() {
    var allInitialModels = [];
    var allStates = [];
    var allReceives = [];
    var allReadies = [];
    var allPostRenders = [];
    var allNextActions = [];
    var createRootWire = wire_1.defaultWireCreator();
    var createComponentWire = wire_1.defaultWireCreator();
    var rootWire = createRootWire("meiosis_" + (nextId++));
    var componentWire = createComponentWire();
    var propose = componentWire.emit;
    function createComponent(config) {
        if (!config || (!config.actions &&
            !config.nextAction &&
            !config.initialModel &&
            !config.ready &&
            !config.receive &&
            !config.state &&
            !config.view &&
            !config.postRender)) {
            throw new Error("Please specify a config when calling createComponent.");
        }
        var initialModel = config.initialModel;
        if (initialModel) {
            if (typeof initialModel !== "function") {
                throw new Error("initialModel in createComponent must be a function. You can pass the root initialModel object to the run function.");
            }
            allInitialModels.push(initialModel);
        }
        var state = config.state;
        if (state) {
            allStates.push(state);
        }
        var actions = config.actions ? config.actions(propose) : propose;
        var receive = config.receive;
        if (receive) {
            allReceives.push(receive);
        }
        var ready = config.ready;
        if (ready) {
            allReadies.push(function () { return ready(actions); });
        }
        var postRender = config.postRender;
        if (postRender) {
            allPostRenders.push(postRender);
        }
        var nextAction = config.nextAction;
        if (nextAction) {
            allNextActions.push(function (model, proposal) { return nextAction(model, proposal, actions); });
        }
        return function (state) {
            return config.view ? config.view(state, actions) : undefined;
        };
    }
    ;
    var run = function (runConfig) {
        var rootModel = runConfig.initialModel || {};
        allInitialModels.forEach(function (initialModel) { return rootModel = initialModel(rootModel); });
        var rootState = runConfig.state || (function (model) { return model; });
        allStates.forEach(function (stateFunction) {
            var prevState = rootState;
            rootState = function (model, state) { return stateFunction(model, prevState(model)); };
        });
        componentWire.listen(function (proposal) {
            for (var i = 0; i < allReceives.length; i++) {
                var receive = allReceives[i];
                var received = receive(rootModel, proposal);
                rootModel = received;
            }
            ;
            rootWire.emit(rootModel);
            allNextActions.forEach(function (nextAction) { return nextAction(rootModel, proposal); });
        });
        var renderRoot_ = function (state) {
            var result = runConfig.renderer(state, runConfig.rootComponent);
            allPostRenders.forEach(function (postRender) { return postRender(state); });
            return result;
        };
        renderRoot_.initialModel = rootModel;
        renderRoot_.state = rootState;
        var renderRoot = renderRoot_;
        rootWire.listen(function (model) { return renderRoot(rootState(model)); });
        rootWire.emit(rootModel);
        allReadies.forEach(function (ready) { return ready(); });
        var devtool = window && window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"];
        if (devtool) {
            var initialModel_1 = copy(rootModel);
            var bufferedReceives_1 = [];
            var devtoolInitialized_1 = false;
            createComponent({
                receive: function (model, proposal) {
                    if (devtoolInitialized_1) {
                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
                    }
                    else {
                        bufferedReceives_1.push({ model: copy(model), proposal: proposal });
                    }
                    return model;
                }
            });
            window.addEventListener("message", function (evt) {
                if (evt.data.type === "MEIOSIS_RENDER_ROOT") {
                    renderRoot(evt.data.state);
                }
                else if (evt.data.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
                    window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: initialModel_1 }, "*");
                    devtoolInitialized_1 = true;
                    for (var i = 0; i < bufferedReceives_1.length; i++) {
                        var _a = bufferedReceives_1[i], model = _a.model, proposal = _a.proposal;
                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
                    }
                }
                else if (evt.data.type === "MEIOSIS_REQUEST_STATE") {
                    var state = renderRoot.state(evt.data.model);
                    var ts = evt.data.ts;
                    window.postMessage({ type: "MEIOSIS_STATE", state: state, ts: ts }, "*");
                }
            });
        }
        return renderRoot;
    };
    return {
        createComponent: createComponent,
        run: run
    };
}
exports.newInstance = newInstance;
var instance = newInstance();
var createComponent = instance.createComponent;
exports.createComponent = createComponent;
var run = instance.run;
exports.run = run;
//# sourceMappingURL=meiosis.js.map