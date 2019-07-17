/* global MeiosisRouting */
const { routeTransition } = MeiosisRouting.state;

export const routeAccept = state => ({
  route: routeTransition(state.route)
});
