"use strict";
function defaultWireCreator() {
    var wires = {};
    var nextWireId = 1;
    var createWire = function () {
        var listener = null;
        var listen = function (lstnr) { return listener = lstnr; };
        var emit = function (update) { return listener(update); };
        return { emit: emit, listen: listen };
    };
    return function (wireName) {
        var name = wireName;
        if (!name) {
            name = "wire_" + nextWireId;
            nextWireId++;
        }
        var theWire = wires[name];
        if (!theWire) {
            theWire = createWire();
            wires[name] = theWire;
        }
        return theWire;
    };
}
exports.defaultWireCreator = defaultWireCreator;
;
//# sourceMappingURL=wire.js.map