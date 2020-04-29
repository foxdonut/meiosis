import { Route, router } from "../router";

export const service = ({ state, previousState }) => {
  if (state.route.page === Route.Settings && !state.user) {
    return {
      route: previousState.route || router.getRoute(Route.Home),
      redirect: router.getRoute(Route.Login),
      login: {
        message: "Please login.",
        returnTo: router.getRoute(Route.Settings)
      }
    };
  }
};
