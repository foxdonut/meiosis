import { selectors } from "router-setup-common/src/selectors";
import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => {
      if (
        !state.user &&
        state.login &&
        (state.login.username || state.login.password) &&
        !confirm("You have unsaved data. Continue?")
      ) {
        update({ route: () => Route.of.Login() });
      } else if (state.login) {
        update({ login: undefined });
      }
    }),
    Login: () => {
      if (!state.login || state.login.username == null) {
        update({
          login: {
            username: "",
            password: ""
          }
        });
      }
    }
  })(selectors.page(state));
