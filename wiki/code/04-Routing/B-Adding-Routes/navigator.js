/* global compose, prefix, urlMapper */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  const routeMap = {};
  const routeHandlerMap = {};
  const mapper = urlMapper({ query: true });
  let notFoundComponent = undefined;

  const getUrl = (id, params = {}) => {
    const route = routeMap[id];
    return route && prefix + mapper.stringify(route, params);
  };

  return {
    register: (configs, notFound) => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;
        if (config.route) {
          routeMap[config.key] = config.route;
          routeHandlerMap[config.route] = (params, url) => {
            const updateFn = model =>
              Object.assign(model, { pageId: config.key, url: prefix + url });

            if (component.navigating) {
              component.navigating(params, func => update(compose(func, updateFn)));
            }
            else {
              update(updateFn);
            }
          };
        }
      });
      notFoundComponent = notFound;
    },
    getComponent: pageId => componentMap[pageId] || notFoundComponent,
    navigateTo: (id, params) => {
      document.location.href = getUrl(id, params);
    },
    handleUrl: url => {
      url = url || "/";
      const matchedRoute = mapper.map(url, routeHandlerMap);
      if (matchedRoute) {
        matchedRoute.match(matchedRoute.values, url);
      }
      else {
        update(model => Object.assign(model, { pageId: undefined, url: prefix + url }));
      }
    },
    getUrl
  };
};
