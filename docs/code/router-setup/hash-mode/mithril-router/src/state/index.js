// FIXME: adjust other selectors
export const selectors = {
  route: state => state.route || {},
  page: state => selectors.route(state).page,
  params: state => selectors.route(state).params,
  url: state => selectors.route(state).url,
  teaType: state => selectors.params(state).type,
  toRoute: (page, params, options = {}) => ({ page, params, ...options }),
  fromRoute: route => ({ page: route.page, params: route.params })
};
