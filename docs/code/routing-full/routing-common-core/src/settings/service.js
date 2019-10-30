import { Route, navigateTo } from "../routes";

export const service = ({ state }) => {
  if (state.routeTransition.arrive.Settings && !state.user) {
    return {
      patch: navigateTo(Route.Login({ message: "Please login.", returnTo: Route.Settings() }))
    };
  }
};
