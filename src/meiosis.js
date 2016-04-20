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
import { merge } from "ramda"; // FIXME: adapter

const meiosis = adapters => {
  const unsubscribes = [];

  const rootPubsub = adapters.pubsub("meiosis");
  let rootModel = {};

  const createFeature = config => {
    console.log("createFeature:", config.name);
    rootModel = merge(rootModel, config.initialModel);
    console.log("rootModel:", rootModel);

    const actions = config.actions(adapters.pubsub(config.name).broadcast);

    const subscriber = action => {
      console.log("action:", action);
      const model = config.model(rootModel, action);
      rootPubsub.broadcast(model);
      config.chain(model, action);
    };
    adapters.pubsub(config.name).subscribe(subscriber);
    unsubscribes.push(() => adapters.pubsub(config.name).unsubscribe(subscriber));

    return props => config.view({model: props.model, actions});
  };

  const run = root => {
    const rootSubscriber = model => {
      console.log("rootPubsub:", model);
      rootModel = merge(rootModel, model);
      adapters.render(root({model: rootModel}));
    };
    rootPubsub.subscribe(rootSubscriber);
    unsubscribes.push(() => rootPubsub.unsubscribe(rootSubscriber));

    console.log("initial broadcast:", rootModel);
    rootPubsub.broadcast(rootModel);
  };

  const shutdown = () => {
    unsubscribes.forEach(unsubscribe => unsubscribe());
  };

  return { createFeature, run, shutdown };
};

export { meiosis };
