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
                // If there was a previous abort, skip rest of services
                if (result.abort) {
                  return result;
                }
                // If a service returned a null patch, skip rest of services
                if (!result.patch) {
                  return merge(result, { abort: true });
                }

                const serviceUpdate = service(result);

                if (serviceUpdate) {
                  if (serviceUpdate.next) {
                    const fn = serviceUpdate.next;
                    serviceUpdate.next = arr =>
                      arr.concat(fn);
                  }
                  // If a service returns a different patch, abort rest of
                  // services. We'll issue the patch again to run the services
                  // from the start.
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
              // If a service issued a different patch, re-run the services
              // with the new patch applied
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
              // If a service issued a null patch, cancel the original patch
              return merge(updatedContext, {
                render: false,
                next: []
              });
            }
            return updatedContext;
          };

          const contexts = stream.scan(
            (context, patch) =>
              // Patch is merged in to the state by default
              // Services have access to the previous state
              // and can cancel or alter the original patch.
              // State changes by services are available to the
              // next services in the list.
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
