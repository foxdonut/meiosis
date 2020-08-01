export const selectors = {
  route: state => state.route,
  page: state => state.route.value,
  params: state => state.route.params,
  queryParams: state => state.route.queryParams,
  url: state => state.route.url,
  teaType: state => selectors.queryParams(state).type
};
