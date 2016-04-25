interface Wire {
  send(data: any): void;
  receive(data: any): void;
}

interface WireCreator {
  (wireName?: string): Wire;
}

const defaultWire: WireCreator = (function() {
  let wires = {};
  let nextWireId = 1;

  const createWire = function(): Wire {
    let receiver = null;
    const receive = rcv => receiver = rcv;
    const send = data => receiver(data);

    return { send, receive };
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

export { Wire, defaultWire };
