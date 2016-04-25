interface Listener {
  (data: any): any;
}

interface Emitter {
  (data: any): any;
}

interface Wire {
  emit: Emitter;
  listen(listener: Listener): any;
}

interface WireCreator {
  (wireName?: string): Wire;
}

const defaultWire: WireCreator = (function() {
  let wires = {};
  let nextWireId = 1;

  const createWire = function(): Wire {
    let listener: Listener = null;
    const listen = (lstnr: Listener) => listener = lstnr;
    const emit = (data: any) => listener(data);

    return { emit, listen };
  };

  return function(wireName: string) {
    let name = wireName;
    if (!name) {
      name = "wire_" + nextWireId;
      nextWireId++;
    }
    let theWire: Wire = wires[name];
    if (!theWire) {
      theWire = createWire();
      wires[name] = theWire;
    }
    return theWire;
  };
})();

export { Emitter, Listener, Wire, WireCreator, defaultWire };
