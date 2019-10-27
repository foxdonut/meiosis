window.Meiosis = {
  common: {
    setup: function({ stream, accumulator, combine, app }) {
      app = app || {};
      let { Initial, services, Actions } = app;
      services = services || [];
      const Oa = Object.assign;
      const singlePatch = patch =>
        Array.isArray(patch) ? combine(patch) : patch;

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
                  return Oa(result, { abort: true });
                }

                const serviceUpdate = service(result);

                if (serviceUpdate) {
                  if (serviceUpdate.next) {
                    result.next.push(serviceUpdate.next);
                    delete serviceUpdate.next;
                  }
                  // If a service returns a different patch, abort rest of
                  // services. We'll issue the patch again to run the services
                  // from the start.
                  if (serviceUpdate.patch) {
                    return Oa(result, serviceUpdate, {
                      abort: true
                    });
                  }
                  if (serviceUpdate.state) {
                    return Oa(result, serviceUpdate, {
                      state: accumulator(
                        result.state,
                        singlePatch(serviceUpdate.state)
                      )
                    });
                  }
                  return Oa(result, serviceUpdate);
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
                  state: accumulator(
                    context.previousState,
                    singlePatch(updatedContext.patch)
                  ),
                  patch: updatedContext.patch,
                  render: true,
                  next: []
                });
              }
              // If a service issued a null patch, cancel the original patch
              return Oa(updatedContext, {
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
                state: accumulator(
                  context.state,
                  singlePatch(patch)
                ),
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
  },
  mergerino: {
    setup: function({ stream, merge, app }) {
      return window.Meiosis.common.setup({
        stream,
        accumulator: merge,
        combine: patches => patches,
        app
      });
    }
  }
};
