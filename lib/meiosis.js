"use strict";
var wire_1 = require("./wire");
var REFUSE_PROPOSAL = {};
exports.REFUSE_PROPOSAL = REFUSE_PROPOSAL;
var nextId = 1;
var copy = function (obj) { return JSON.parse(JSON.stringify(obj)); };
function init(adapters) {
    var allReceives = [];
    var allReadies = [];
    var allPostRenders = [];
    var allNextActions = [];
    var createRootWire = (adapters && adapters.rootWire) || wire_1.defaultWireCreator();
    var createComponentWire = (adapters && adapters.componentWire) || wire_1.defaultWireCreator();
    var rootWire = createRootWire("meiosis_" + (nextId++));
    var componentWire = createComponentWire();
    var propose = componentWire.emit;
    var rootModel = null;
    var initialModelCount = 0;
    function createComponent(config) {
        if (!config || (!config.actions &&
            !config.nextAction &&
            !config.initialModel &&
            !config.ready &&
            !config.receive &&
            !config.view &&
            !config.postRender)) {
            throw new Error("Please specify a config when calling createComponent.");
        }
        if (rootModel === null) {
            var startingModel = {};
            rootModel = startingModel;
        }
        var initialModel = config.initialModel;
        var initialModelError = false;
        if (typeof initialModel === "function") {
            rootModel = initialModel(rootModel);
            initialModelError = initialModelCount > 0;
        }
        else if (initialModel) {
            rootModel = initialModel;
            initialModelCount++;
            initialModelError = initialModelCount > 1;
        }
        if (initialModelError) {
            throw new Error("When more than one initialModel is used, they must all be functions.");
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
        return function (model) {
            return config.view ? config.view(model, actions) : undefined;
        };
    }
    ;
    var run = function (render, rootComponent) {
        componentWire.listen(function (proposal) {
            var accepted = true;
            for (var i = 0; i < allReceives.length; i++) {
                var receive = allReceives[i];
                var received = receive(rootModel, proposal);
                if (received === REFUSE_PROPOSAL) {
                    accepted = false;
                    break;
                }
                else {
                    rootModel = received;
                }
            }
            ;
            if (accepted) {
                rootWire.emit(rootModel);
                allNextActions.forEach(function (nextAction) { return nextAction(rootModel, proposal); });
            }
        });
        var renderRoot_ = function (model) {
            var result = render(model, rootComponent);
            allPostRenders.forEach(function (postRender) { return postRender(model); });
            return result;
        };
        renderRoot_.initialModel = rootModel;
        var renderRoot = renderRoot_;
        rootWire.listen(renderRoot);
        rootWire.emit(rootModel);
        allReadies.forEach(function (ready) { return ready(); });
        var devtool = window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"];
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
                    renderRoot(evt.data.model);
                }
                else if (evt.data.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
                    window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: initialModel_1 }, "*");
                    devtoolInitialized_1 = true;
                    for (var i = 0; i < bufferedReceives_1.length; i++) {
                        var _a = bufferedReceives_1[i], model = _a.model, proposal = _a.proposal;
                        window.postMessage({ type: "MEIOSIS_RECEIVE", model: model, proposal: proposal }, "*");
                    }
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
exports.init = init;
var instance = init();
var createComponent = instance.createComponent;
exports.createComponent = createComponent;
var run = instance.run;
exports.run = run;
//# sourceMappingURL=meiosis.js.map