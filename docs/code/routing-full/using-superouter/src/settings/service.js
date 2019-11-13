import { Route } from "../routes";

export const service = ({ state }) => {
  if (state.routeTransition.arrive.Settings && !state.user) {
    return {
      patch: { route: Route.of.Login({ message: "Please login.", returnTo: Route.Settings() }) }
    };
  }
};
