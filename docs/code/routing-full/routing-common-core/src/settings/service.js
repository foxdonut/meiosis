import { Route } from "../routes";

export const service = state => {
  if (state.routeTransition.arrive.Settings && !state.user) {
    return {
      route: [Route.Login()],
      routeTransition: { arrive: () => ({}), leave: () => ({}) },
      redirect: [
        Route.Login({
          message: "Please login.",
          returnTo: Route.Settings()
        })
      ]
    };
  }
};
