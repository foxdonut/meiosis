/* global prefix, Navigation */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  // Map of page id -> component
  const componentMap = {};

  // Navigation
  let stateNavigator = undefined;

  // Component to use for invalid page ids
  let notFoundComponent = undefined;

  return {
    // configs have a key, a component, and a route.
    register: (configs, notFound) => {
      if (notFound) {
        configs.push({ key: "NotFoundPage", component: notFound, route: "{*x}",
          defaultTypes: { x: "stringarray" }, trackTypes: false });
      }
      stateNavigator = new Navigation.StateNavigator(configs);
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;
        if (component.navigating) {
          stateNavigator.states[config.key].navigating = component.navigating;
        }
      });
      stateNavigator.onNavigate(() => {
        const { data, asyncData, state, url } = stateNavigator.stateContext;
        update(model => Object.assign(model, data, asyncData,
          { pageId: state.key, url: prefix + url }));
      });
      notFoundComponent = notFound;
    },
    getComponent: pageId => componentMap[pageId] || notFoundComponent,
    getUrl: (id, params) => prefix + stateNavigator.getNavigationLink(id, params),
    navigateTo: (id, params) => stateNavigator.navigate(id, params),
    start: () => stateNavigator.start()
  };
};
