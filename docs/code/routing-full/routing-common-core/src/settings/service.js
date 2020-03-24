import { Route } from "../routes";

export const service = ({ state, previousState }) => {
  if (state.routeTransition.arrive.Settings && !state.user) {
    return {
      route: previousState.route || Route.Home(),
      routeTransition: { arrive: () => ({}), leave: () => ({}) },
      redirect: Route.Login({
        message: "Please login.",
        returnTo: Route.Settings()
      })
    };
  }
};
