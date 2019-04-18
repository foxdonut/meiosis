import { Route, findRoute } from "../routes";

export const accept = state => {
  if (findRoute(state.route, "Settings") && !state.user) {
    return {
      route: [Route.Login({ message: "Please login.", returnTo: Route.Settings() })]
    };
  }
};
