import { router } from "../router";

export const service = ({ state, previousState }) => {
  if (state.route.page === "Settings" && !state.user) {
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
