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

const meiosis = adapters => {
  const rootWire = adapters.wire("meiosis");
  let rootModel = {};

  const createFeature = config => {
    rootModel = merge(rootModel, config.initialModel);

    const actions = config.actions(adapters.wire(config.name).send);

    adapters.wire(config.name).receive(action => {
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
