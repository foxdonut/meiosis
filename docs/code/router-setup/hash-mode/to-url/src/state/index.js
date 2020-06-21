export const selectors = {
  page: state => state.route.value,
  params: state => state.route.params,
  queryParams: state => state.route.params.queryParams,
  url: state => state.route.url,
  toRoute: ({ page, params, url }) => ({ value: page, params, url })
};
