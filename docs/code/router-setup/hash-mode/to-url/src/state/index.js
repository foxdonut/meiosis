export const selectors = {
  route: state => state.route,
  page: state => state.route.value,
  params: state => state.route.params,
  queryParams: state => state.route.queryParams,
  url: state => state.route.url,
  teaType: state => selectors.queryParams(state).type,
  toRoute: (page, params = {}, queryParams = {}, options = {}) => ({
    value: page,
    params,
    queryParams,
    ...options
  }),
  fromRoute: route => ({ page: route.value, params: route.params, queryParams: route.queryParams })
};
