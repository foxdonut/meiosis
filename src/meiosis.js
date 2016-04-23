/*
Adapters =
  { render : html => void
  , wire : send, receive
  }
Config =
  { initialModel : model
  , update : (model, action) => model
  , actions : next => Object
  , view : ({model, actions}) => html
  , chain : (model, action, actions) => <next action> void
  }

Feature =
  { view : props => html
  }
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

  let pipelines = [];

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

    const pipeline = config.pipeline;
    // FIXME: allow multiple functions in a component's pipeline
    if (pipeline) {
      if (Array === pipeline.constructor) {
        Array.prototype.push.apply(pipelines, pipeline);
      }
      else {
        pipelines.push(pipeline);
      }
    }

    componentWire.receive(action => {
      if (config.update) {
        const model = config.update(rootModel, action);
        pipelines.forEach(pipeline => rootModel = pipeline(rootModel, model));
        rootWire.send(rootModel);

        if (config.chain) {
          config.chain(model, action, actions);
        }
      }
    });

    return props => config.view(assoc("actions", actions, props)); // FIXME: remove ramda dep
  };

  const run = root => {
    if (pipelines.length === 0) {
      // FIXME: remove ramda dep
      pipelines.push(merge);
    }
    rootWire.receive(model => {
      adapters.render(root({model}));
    });

    rootWire.send(rootModel);
  };

  return { createComponent, run };
};

export { meiosis };
