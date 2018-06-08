/* global Navigation */

// eslint-disable-next-line no-unused-vars
const createNavigator = update => {
  const componentMap = {};
  let stateNavigator = null;

  return {
    register: configs => {
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
        const tab = state.tab || state.key;
        update(model => Object.assign(model, data, asyncData,
          { pageId: state.key, tab, url }));
      });
    },
    getComponent: pageId => componentMap[pageId],
    navigateTo: (id, params) => stateNavigator.navigate(id, params),
    getUrl: (id, params) => "#" + stateNavigator.getNavigationLink(id, params),
    start: () => stateNavigator.start()
  };
};
