window.Meiosis = {
  mergerino: {
    setup: function({ stream, merge, app }) {
      app = app || {};
      let { Initial, services, Actions } = app;
      services = services || [];

      return Promise.resolve()
        .then(Initial)
        .then(initialState => {
          const update = stream();
          const actions = (Actions || (() => ({})))(update);
          const states = stream(initialState);

          const updateState = context => {
            const updatedContext = services.reduce(
              (result, service) =>
                merge(result, service(result)),
              context
            );

            if (updatedContext.merge) {
              updatedContext.state = merge(
                updatedContext.state,
                context.patch
              );
            }
            return updatedContext;
          };

          const contexts = stream.scan(
            (context, patch) =>
              updateState({
                state: context.state,
                patch,
                render: true,
                merge: true,
                next: []
              }),
            { state: initialState },
            update
          );

          contexts.map(context => {
            if (context.render) {
              states(context.state);
            }
            if (context.next) {
              context.next.forEach(service => {
                service({
                  state: context.state,
                  update,
                  patch: update(),
                  actions
                });
              });
            }
          });

          return { update, contexts, states, actions };
        });
    }
  }
};
