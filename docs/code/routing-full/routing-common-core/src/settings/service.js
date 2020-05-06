import { Route } from "../routes";

export const service = state => {
  if (state.routeTransition.arrive.Settings && !state.user) {
    const route = [
      Route.Login({
        message: "Please login.",
        returnTo: Route.Settings()
      })
    ];
    return {
      nextRoute: route,
      route,
      routeTransition: { arrive: () => ({ Login: Route.Login() }), leave: () => ({}) }
    };
  }
};
