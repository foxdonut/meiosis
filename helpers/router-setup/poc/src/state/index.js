export const selectors = {
  route: state => state.route,
  page: state => state.route.value,
  params: state => state.route.params,
  url: state => state.route.url
};
