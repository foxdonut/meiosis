"use strict";
var merge_1 = require("./merge");
var wire_1 = require("./wire");
var REFUSE_UPDATE = {};
exports.REFUSE_UPDATE = REFUSE_UPDATE;
function init(adapters) {
    var allReceiveUpdates = [];
    var allReadies = [];
    var allPostRenders = [];
    var createRootWire = adapters.rootWire || wire_1.defaultWireCreator();
    var createComponentWire = adapters.componentWire || wire_1.defaultWireCreator();
    var rootWire = createRootWire("meiosis");
    var merge = adapters.merge || merge_1.defaultMerge;
    var rootModel = null;
    var createComponent = function (config) {
        if (!config || (!config.actions &&
            !config.nextUpdate &&
            !config.initialModel &&
            !config.ready &&
            !config.receiveUpdate &&
            !config.view)) {
            throw new Error("Please specify a config when calling createComponent.");
        }
        var initialModel = config.initialModel || {};
        rootModel = (rootModel === null) ? initialModel : merge(rootModel, initialModel);
        var componentWire = createComponentWire();
        var sendUpdate = componentWire.emit;
        var sendUpdateActions = { sendUpdate: sendUpdate };
        var actions = config.actions ? merge(sendUpdateActions, config.actions(sendUpdate)) : sendUpdateActions;
        var receiveUpdate = config.receiveUpdate;
        if (receiveUpdate) {
            allReceiveUpdates.push(receiveUpdate);
        }
        var ready = config.ready;
        if (ready) {
            allReadies.push(function () { return ready(actions); });
        }
        var postRender = config.postRender;
        if (postRender) {
            allPostRenders.push(postRender);
        }
        componentWire.listen(function (update) {
            var accepted = true;
            for (var i = 0; i < allReceiveUpdates.length; i++) {
                var receiveUpdate_1 = allReceiveUpdates[i];
                var receivedUpdate = receiveUpdate_1(rootModel, update);
                if (receivedUpdate === REFUSE_UPDATE) {
                    accepted = false;
                    break;
                }
                else {
                    rootModel = receivedUpdate;
                }
            }
            ;
            if (accepted) {
                rootWire.emit(rootModel);
                if (config.nextUpdate) {
                    config.nextUpdate(rootModel, update, actions);
                }
            }
        });
        return function (model) { return config.view(model, actions); };
    };
    var run = function (root) {
        if (allReceiveUpdates.length === 0) {
            allReceiveUpdates.push(merge);
        }
        var renderRoot = function (model) {
            var rootView = root(model);
            adapters.render(rootView);
            allPostRenders.forEach(function (postRender) { return postRender(rootView); });
        };
        rootWire.listen(renderRoot);
        rootWire.emit(rootModel);
        allReadies.forEach(function (ready) { return ready(); });
        return renderRoot;
    };
    var meiosisInstance = {
        createComponent: createComponent,
        run: run
    };
    return meiosisInstance;
}
exports.init = init;
;
//# sourceMappingURL=meiosis.js.map