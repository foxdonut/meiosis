import { contains, fold } from "static-tagged-union";

import { Route } from "../routes";
import { Tpipe } from "../util";

export const accept = state =>
  Tpipe(
    state.route,
    contains(Route.Login()),
    fold({
      N: () => {
        if (
          !state.user &&
          state.login &&
          (state.login.username || state.login.password) &&
          !confirm("You have unsaved data. Continue?")
        ) {
          return { route: [Route.Login()] };
        }
      }
    })
  );
