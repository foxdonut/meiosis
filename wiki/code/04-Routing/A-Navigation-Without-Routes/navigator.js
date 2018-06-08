/* global compose */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  const navigateToMap = {};

  const getUrl = (_id, _params) => {
    return "#";
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
      });
    },
    getComponent: pageId => componentMap[pageId],
    navigateTo: (id, params) => {
      const target = navigateToMap[id];
      if (target) {
        target(params);
      }
    },
    getUrl
  };
};
