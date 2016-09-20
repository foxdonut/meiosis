"use strict";
var wire_1 = require("./wire");
var REFUSE_PROPOSAL = {};
exports.REFUSE_PROPOSAL = REFUSE_PROPOSAL;
var nextId = 1;
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
    var createComponent = function (config) {
        if (!config || (!config.actions &&
            !config.nextAction &&
            !config.initialModel &&
            !config.ready &&
            !config.receive &&
            !config.view &&
            !config.postRender &&
            !config.setup)) {
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
        var setup = config.setup;
        if (setup) {
            setup(actions);
        }
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
    };
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
            var result = render(model, rootComponent, propose);
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
            devtool.setup(createComponent, renderRoot);
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