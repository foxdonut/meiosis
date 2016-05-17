interface Listener<U> {
  (update: U): void;
}

interface Emitter<U> {
  (update: U): void;
}

interface Wire<U> {
  emit: Emitter<U>;
  listen(listener: Listener<U>): any;
}

interface WireCreator<U> {
  (wireName?: string): Wire<U>;
}

function defaultWireCreator<U>(): WireCreator<U> {
  let wires = {};
  let nextWireId = 1;

  const createWire = function(): Wire<U> {
    let listener: Listener<U> = null;
    const listen = (lstnr: Listener<U>) => listener = lstnr;
    const emit = (update: U) => listener(update);

    return { emit, listen };
  };

  return function(wireName: string) {
    let name = wireName;

    if (!name) {
      name = "wire_" + nextWireId;
      nextWireId++;
    }

    let theWire: Wire<U> = wires[name];

    if (!theWire) {
      theWire = createWire();
      wires[name] = theWire;
    }

    return theWire;
  };
};

export { Emitter, Listener, Wire, WireCreator, defaultWireCreator };
