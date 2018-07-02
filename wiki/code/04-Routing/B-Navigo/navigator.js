/* global compose, Navigo */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const router = new Navigo(null, true);

  // Map of page id -> component
  const componentMap = {};

  // Navigo routes
  const routes = {};

  // Component to use for invalid page ids
  let notFoundComponent = null;

  return {
    // configs have a key, a component, and a route.
    register: (configs, notFound) => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;

        // Function to update the model and set the page id and url
        const updateFunc = model =>
          Object.assign(model, { pageId: config.key, url: document.location.hash });

        routes[config.route] = {
          as: config.key,
          uses: params => {
            // If the component has a 'navigating' property, call it first, then compose
            // its update function with the one we defined above.
            if (component.navigating) {
              component.navigating(params, func => update(compose(func, updateFunc)));
            }
            // No 'navigating' property, so we only need to update the page id and url.
            else {
              update(updateFunc);
            }
          }
        };
      });
      if (notFound) {
        notFoundComponent = notFound;
        router.notFound(() =>
          update(model => Object.assign(model,
            { pageId: null, url: document.location.hash }))
        );
      }
    },
    getComponent: pageId => componentMap[pageId] || notFoundComponent,
    getUrl:  (id, params) => router.generate(id, params),
    navigateTo: (id, params) => router.navigate(router.generate(id, params)),
    start: () => router.on(routes).resolve()
  };
};
