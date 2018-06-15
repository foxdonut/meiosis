/* global m, O, pathToRegexp, prefix */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  const routes = {};
  const toPath = {};
  let notFoundComponent = undefined;

  const getUrl = (pageId, params = {}) => {
    const stringify = toPath[pageId];
    return stringify && stringify(params);
  };

  return {
    register: (configs, notFound) => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;
        if (config.route) {
          routes[config.route] = config.key;
          toPath[config.key] = pathToRegexp.compile(config.route);
        }
      });
      notFoundComponent = notFound;
    },
    getComponent: pageId => componentMap[pageId] || notFoundComponent,
    onnavigate: (pageId, params, url) => {
      const Component = componentMap[pageId];
      const updateObj = { pageId, url: prefix + url };
      if (Component && Component.navigating) {
        return new Promise(resolve => {
          Component.navigating(params, obj => {
            update(O(updateObj, obj));
            resolve();
          });
        });
      }
      else {
        update(updateObj);
      }
    },
    navigateTo: (pageId, params) => {
      m.route.set(getUrl(pageId, params));
    },
    getUrl,
    routes
  };
};
