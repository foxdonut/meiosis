import { Route, router } from "../router";

export const service = ({ state, previousState }) => {
  if (state.route.page === Route.Settings && !state.user) {
    return {
      route: previousState.route || router.getRoute("/"),
      redirect: router.getRoute("/login"),
      login: {
        message: "Please login.",
        returnTo: router.getRoute("/settings")
      }
    };
  }
};
