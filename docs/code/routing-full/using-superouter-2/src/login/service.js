import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { path } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.login ? { login: undefined } : null)),
      Login: () =>
        !path(["login", "username"], state) ? { login: { username: "", password: "" } } : null
    })
  );
