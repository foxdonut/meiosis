/*
Adapters =
  { render : html => void
  , wire : send, receive
  }
Config =
  { name : String
  , initialModel : model
  , model : (model, next) => model
  , actions : next => Object
  , view : ({model, actions}) => html
  , chain : (model, next) => <next action> void
  }

Feature =
  { view : props => html
  }
*/
import { merge } from "ramda"; // FIXME: adapter

let wires = {};
const createWire = () => {
  let receiver = null;
  const receive = rcv => receiver = rcv;
  const send = data => receiver(data);

  return { send, receive };
};
const defaultWire = name => {
  let theWire = wires[name];
  if (!theWire) {
    theWire = createWire();
    wires[name] = theWire;
  }
  return theWire;
};

const meiosis = adapters => {
  const wire = adapters.wire || defaultWire;
  const rootWire = wire("meiosis");
  let rootModel = {};

  const createFeature = config => {
    rootModel = merge(rootModel, config.initialModel);

    const actions = config.actions(wire(config.name).send);

    wire(config.name).receive(action => {
      const model = config.model(rootModel, action);
      rootWire.send(model);
      config.chain(model, action, actions);
    });

    return props => config.view({model: props.model, actions});
  };

  const run = root => {
    rootWire.receive(model => {
      rootModel = merge(rootModel, model);
      adapters.render(root({model: rootModel}));
    });

    rootWire.send(rootModel);
  };

  return { createFeature, run };
};

export { meiosis };
