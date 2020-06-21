export const selectors = {
  page: state => state.route.page,
  params: state => state.route.params,
  url: state => state.route.url,
  toRoute: ({ page, params, url }) => ({ page, params, url })
};
