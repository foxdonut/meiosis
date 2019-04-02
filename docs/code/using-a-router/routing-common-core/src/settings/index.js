import { Route, navigateTo } from "../routes";
import { contains } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({
      user: null
    }, navigateTo([ Route.Home() ])))
  }),

  accept: state => {
    if (contains(state.route, "Settings")) {
      if (!state.user) {
        return (navigateTo(
          [ Route.Login({ message: "Please login.", returnTo: Route.Settings() }) ]
        ));
      }
    }
  }
};
