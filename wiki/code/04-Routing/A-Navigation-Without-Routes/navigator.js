/* global compose */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  // Map of page id -> component
  const componentMap = {};

  // Map of page id -> navigateTo function
  const navigateToMap = {};

  // Component to use for invalid page ids
  let notFoundComponent = null;

  return {
    // configs have a key and a component.
    register: (configs, notFound) => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;

        // Create a navigateTo function
        navigateToMap[config.key] = params => {
          // Function to update the model and set the page id
          const updateFunc = model => Object.assign(model, { pageId: config.key });

          // If the component has a 'navigating' property, call it first, then compose
          // its update function with the one we defined above.
          if (component.navigating) {
            component.navigating(params, func => update(compose(func, updateFunc)));
          }
          // No 'navigating' property, so we only need to update the page id.
          else {
            update(updateFunc);
          }
        };
      });
      notFoundComponent = notFound;
    },
    getComponent: pageId => componentMap[pageId] || notFoundComponent,
    navigateTo: (id, params) => {
      const target = navigateToMap[id];
      if (target) {
        target(params);
      }
    },
    blankHref: "javascript://"
  };
};
