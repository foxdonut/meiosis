import { Route, findRoute } from "../routes";

export const settings = {
  actions: {
    logout: () => ({
      user: null,
      route: [ Route.Home() ]
    })
  },

  accept: state => {
    if (findRoute(state.route, "Settings") && !state.user) {
      return {
        route: [ Route.Login({ message: "Please login.", returnTo: Route.Settings() }) ]
      };
    }
  }
};
