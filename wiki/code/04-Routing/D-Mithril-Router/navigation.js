// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  const navigateToMap = {};
  const routeMap = {};
  const routeHandlerMap = {};
  const routes = {};

  const getUrl = (id, _params = {}) => {
    const route = routeMap[id];
    //return route && "#!" + mapper.stringify(route, params);
    return route && "#!" + route;
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
            return component.navigating(params);
          }
          else {
            update(updateFn);
          }
        };
        navigateToMap[config.key] = handler;
        if (config.route) {
          routeMap[config.key] = config.route;
          routeHandlerMap[config.route] = handler;
          routes[config.route] = config.key;
        }
      });
    },
    getComponent: pageId => componentMap[pageId],
    navigateTo: (id, params) => {
      const target = navigateToMap[id];
      if (target) {
        return target(params);
      }
    },
    routes,
    getUrl
  };
};
