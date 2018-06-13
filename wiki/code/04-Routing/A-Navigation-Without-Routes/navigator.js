/* global compose */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  const navigateToMap = {};

  return {
    register: configs => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;
        navigateToMap[config.key] = params => {
          const updateFn = model => Object.assign(model, { pageId: config.key });
          if (component.navigating) {
            component.navigating(params, func => update(compose(func, updateFn)));
          }
          else {
            update(updateFn);
          }
        };
      });
    },
    getComponent: pageId => componentMap[pageId],
    navigateTo: (id, params) => {
      const target = navigateToMap[id];
      if (target) {
        target(params);
      }
    },
    blankHref: "javascript://"
  };
};
