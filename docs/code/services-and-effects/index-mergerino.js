/* global m, mergerino */
const [stream, scan] = [m.stream, m.stream.scan];
const accumulator = mergerino;

const app = {
  initial: {},

  Actions: update => ({
    removeBox: i =>
      update({
        boxes: xs => xs.filter((x, j) => i != j)
      })
  }),

  services: [],

  effects: []
};

const update = stream();

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
      app.services.reduce(
        (context, service) =>
          Object.assign(context, {
            state: accumulator(
              context.state,
              service(context)
            )
          }),
        context
      )
    );

// the states stream just extracts the state from the context
const states = contexts.map(context => context.state);

const actions = app.Actions(update, states);

// apply effects
contexts.map(context => {
  app.effects.map(effect =>
    effect(Object.assign(context, { update, actions }))
  );
});

const App = {
  view: ({ attrs: { _state, _actions } }) =>
    m("div", "Hello")
};

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
