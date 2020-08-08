export const selectors = {
  route: state => state.route,
  page: state => selectors.route(state).value,
  params: state => selectors.route(state).params,
  url: state => selectors.route(state).url,
  teaType: state => selectors.params(state).type
};
