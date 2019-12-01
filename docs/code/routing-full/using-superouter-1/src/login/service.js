import { assoc, dissoc, identity as I, mergeLeft, path } from "ramda";
import { run } from "stags";

import { Route, otherRoutes } from "../routes";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.login ? dissoc("login") : I)),
      Login: () =>
        !path(["login", "username"], state)
          ? assoc("login", mergeLeft({ username: "", password: "" }, state.login))
          : I
    })
  );
