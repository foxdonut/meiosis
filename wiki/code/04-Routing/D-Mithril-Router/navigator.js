/* global pathToRegexp */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  const routes = {};
  const toPath = {};

  return {
    register: configs => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;
        if (config.route) {
          routes[config.route] = config.key;
          toPath[config.key] = pathToRegexp.compile(config.route);
        }
      });
    },
    getComponent: pageId => componentMap[pageId],
    navigateTo: (pageId, params) => {
      const component = componentMap[pageId];
      if (component && component.navigating) {
        return component.navigating(params);
      }
      else {
        update(model => Object.assign(model, { pageId, params }));
      }
    },
    getUrl: (pageId, params = {}) => {
      const stringify = toPath[pageId];
      return stringify && stringify(params);
    },
    routes
  };
};
