export const selectors = {
  route: state => state.route || {},
  page: state => selectors.route(state).page,
  params: state => selectors.route(state).params || {},
  queryParams: state => selectors.route(state).queryParams || {},
  url: state => selectors.route(state).url,
  toRoute: (page, params = {}, queryParams = {}) => ({ page, params, queryParams }),
  replaceRoute: (page, params = {}, queryParams = {}) => ({
    page,
    params,
    queryParams,
    replace: true
  }),
  teaType: state => state.teaType || selectors.queryParams(state).type
};