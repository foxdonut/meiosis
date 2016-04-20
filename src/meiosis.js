/*
Adapters =
  { render : html => void
  , pubsub : subscribe, broadcast
  }
Config =
  { initialModel : model
  , model : (model, next) => model
  , actions : next => Object
  , view : ({model, actions}) => view
  , chain : ({model, actions}) => <next action>
  }

Feature =
  {
  }
*/

const meiosis = adapters => config => {
  let model = config.initialModel;
  const actions = config.actions(adapters.pubsub.broadcast);

  adapters.pubsub.subscribe(action => {
    model = config.model(model, action);
    config.view({model, actions});
    config.chain({model, actions});
  });

  config.view({model: config.initialModel, actions});
};

export { meiosis };
