interface Listener<P> {
  (proposal: P): void;
}

interface Emitter<P> {
  (proposal: P): void;
}

interface Wire<P> {
  emit: Emitter<P>;
  listen(listener: Listener<P>): any;
}

interface WireCreator<P> {
  (wireName?: string): Wire<P>;
}

function defaultWireCreator<P>(): WireCreator<P> {
  let wires = {};
  let nextWireId = 1;

  const createWire = function(): Wire<P> {
    let listener: Listener<P> = null;
    const listen = (lstnr: Listener<P>) => listener = lstnr;
    const emit = (proposal: P) => listener(proposal);

    return { emit, listen };
  };

  return function(wireName: string) {
    let name = wireName;

    if (!name) {
      name = "wire_" + nextWireId;
      nextWireId++;
    }

    let theWire: Wire<P> = wires[name];

    if (!theWire) {
      theWire = createWire();
      wires[name] = theWire;
    }

    return theWire;
  };
};

export { Emitter, Listener, Wire, WireCreator, defaultWireCreator };
