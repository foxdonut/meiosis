/*
Adapters =
  { render : html => void
  , pubsub : subscribe, broadcast
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
import { merge } from "ramda";

const meiosis = adapters => {
  const rootPubsub = adapters.pubsub("meiosis");
  let rootModel = {};

  const createFeature = config => {
    console.log("createFeature:", config.name);
    rootModel = merge(rootModel, config.initialModel);
    console.log("rootModel:", rootModel);

    const actions = config.actions(adapters.pubsub(config.name).broadcast);

    adapters.pubsub(config.name).subscribe(action => {
        console.log("action:", action);
      const model = config.model(rootModel, action);
      rootPubsub.broadcast(model);
      config.chain(model, action);
    });

    return props => config.view({model: props.model, actions});
  };

  const run = root => {
    rootPubsub.subscribe(model => {
        console.log("rootPubsub:", model);
      rootModel = merge(rootModel, model);
      adapters.render(root({model: rootModel}));
    });

    console.log("initial broadcast");
    rootPubsub.broadcast(rootModel);
  };

  return { createFeature, run };
};

export { meiosis };
