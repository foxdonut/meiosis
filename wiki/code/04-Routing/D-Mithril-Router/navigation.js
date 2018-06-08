/* global compose, urlMapper */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  const navigateToMap = {};
  const routeMap = {};
  const routeHandlerMap = {};
  const mapper = urlMapper({ query: true });

  const getUrl = (id, params = {}) => {
    const route = routeMap[id];
    return route && "#" + mapper.stringify(route, params);
  };

  return {
    register: configs => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;
        const handler = params => {
          const updateFn = model =>
            Object.assign(model, {
              pageId: config.key,
              url: getUrl(config.key, params),
              tab: config.tab || config.key
            });

          if (component.navigating) {
            component.navigating(params, func => update(compose(func, updateFn)));
          }
          else {
            update(updateFn);
          }
        };
        navigateToMap[config.key] = handler;
        if (config.route) {
          routeMap[config.key] = config.route;
          routeHandlerMap[config.route] = handler;
        }
      });
    },
    getComponent: pageId => componentMap[pageId],
    navigateTo: (id, params) => {
      const target = navigateToMap[id];
      if (target) {
        target(params);
      }
    },
    handleUrl: url => {
      const matchedRoute = mapper.map(url, routeHandlerMap);
      if (matchedRoute) {
        matchedRoute.match(matchedRoute.values);
      }
    },
    getUrl
  };
};
