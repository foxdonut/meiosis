/*
Adapters =
  { render : html => void
  , wire : send, receive
  }
Config =
  { initialModel : model
  , view : ({model, actions}) => html
  , actions : next => Object
  , transform : (model, update) => update
  , chain : (model, update, actions) => <next action> void
  , receivers : [(model, update) => model]
  }

Component = model => view
*/
import { assoc, merge } from "ramda"; // FIXME: adapter

const meiosis = adapters => {
  let wires = {};
  let nextWireId = 1;
  const createWire = () => {
    let receiver = null;
    const receive = rcv => receiver = rcv;
    const send = data => receiver(data);

    return { send, receive };
  };
  const defaultWire = wireName => {
    let name = wireName;
    if (!name) {
      name = "wire_" + nextWireId;
      nextWireId++;
    }
    let theWire = wires[name];
    if (!theWire) {
      theWire = createWire();
      wires[name] = theWire;
    }
    return theWire;
  };

  let allReceivers = [];

  const wire = adapters.wire || defaultWire;
  const rootWire = wire("meiosis");
  let rootModel = {};

  const createComponent = config => {
    if (!config || !config.view) {
      throw new Error("At a minimum, you need to specify a view to create a component.");
    }
    rootModel = merge(rootModel, config.initialModel || {});

    const componentWire = wire();
    const next = componentWire.send;
    const nextAction = {next};
    const actions = config.actions ? merge(nextAction, config.actions(next)) : nextAction;

    const receivers = config.receivers;
    if (receivers && Array === receivers.constructor) {
      Array.prototype.push.apply(allReceivers, receivers);
    }

    componentWire.receive(update => {
      if (config.transform) {
        const updateTr = config.transform(rootModel, update);
        allReceivers.forEach(receiver => rootModel = receiver(rootModel, updateTr));
        rootWire.send(rootModel);

        if (config.chain) {
          config.chain(updateTr, update, actions);
        }
      }
    });

    return props => config.view(assoc("actions", actions, props)); // FIXME: remove ramda dep
  };

  const run = root => {
    if (allReceivers.length === 0) {
      // FIXME: remove ramda dep
      allReceivers.push(merge);
    }
    const renderRoot = model => { adapters.render(root({ model })); };
    rootWire.receive(renderRoot);

    rootWire.send(rootModel);

    return renderRoot;
  };

  return { createComponent, run };
};

export { meiosis };
