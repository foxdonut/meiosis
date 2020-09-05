export const selectors = {
  route: state => state.route || {},
  page: state => selectors.route(state).page,
  params: state => selectors.route(state).params,
  url: state => selectors.route(state).url,
  toRoute: (page, params, options = {}) => ({ page, params, ...options }),
  teaType: state => state.teaType || selectors.params(state).type
};
