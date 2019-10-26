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
          // FIXME: run services on initial state
          const states = stream(initialState);

          const updateState = context => {
            const updatedContext = services.reduce(
              (result, service) => {
                if (result.abort) {
                  return result;
                }
                if (!result.patch) {
                  return merge(result, { abort: true });
                }

                const serviceUpdate = service(result);

                if (serviceUpdate) {
                  if (serviceUpdate.next) {
                    serviceUpdate.next = arr =>
                      arr.concat(serviceUpdate.next);
                  }
                  if (serviceUpdate.patch) {
                    return merge(result, serviceUpdate, {
                      abort: true
                    });
                  }
                  return merge(result, serviceUpdate);
                }
                return result;
              },
              context
            );

            if (updatedContext.abort) {
              if (updatedContext.patch) {
                return updateState({
                  previousState: context.previousState,
                  state: merge(
                    context.previousState,
                    updatedContext.patch
                  ),
                  patch: updatedContext.patch,
                  render: true,
                  next: []
                });
              }
              return merge(updatedContext, {
                render: false,
                next: []
              });
            }
            return updatedContext;
          };

          const contexts = stream.scan(
            (context, patch) =>
              updateState({
                previousState: context.state,
                state: merge(context.state, patch),
                patch,
                render: true,
                abort: false,
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
