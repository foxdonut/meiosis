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
  , chain : (update, actions) => <next action> void
  , receivers : [(model, update) => model]
  }

Component = model => view
*/
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

  const defaultMerge = (obj1, obj2) => Object.assign({}, obj1, obj2);
  const merge = adapters.merge || defaultMerge;

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
      const updateTr = config.transform ? config.transform(rootModel, update) : update;
      allReceivers.forEach(receiver => rootModel = receiver(rootModel, updateTr));
      rootWire.send(rootModel);

      if (config.chain) {
        config.chain(update, actions);
      }
    });

    return props => { props.actions = actions; return config.view(props); };
  };

  const run = root => {
    if (allReceivers.length === 0) {
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
