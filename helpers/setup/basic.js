const { stream, scan } = Meiosis.simpleStream; // or flyd, mithril-stream

const update = stream();

// using Mergerino, could be function patches (x, f) => f(x), immer's produce, etc.
const accumulator = merge;

// a context has { state, previousState, patch }
const contexts =
  // scan to apply patches
  scan(
    (context, patch) => ({
      previousState: context.state,
      state: accumulator(context.state, patch),
      patch
    }),
    { state: app.initial, previousState: {} },
    update
  )
  // run services
  .map(context =>
    app.services.reduce((context, service) => Object.assign(context, {
      state: accumulator(context.state, service(context))
    }), context)
  );

// the states stream just extracts the state from the context
const states = contexts.map(context => context.state);

// give the states stream to actions for convenience
const actions = app.Actions(update, states);

// apply effects
contexts.map(context => {
  app.effects.map(effect => effect(Object.assign(context, { update, actions })))
});

