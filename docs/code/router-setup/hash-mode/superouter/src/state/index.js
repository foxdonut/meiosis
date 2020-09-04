export const selectors = {
  route: state => state.route,
  page: state => selectors.route(state).page,
  params: state => selectors.route(state).params,
  teaType: state => selectors.params(state).type
};
