import { allRoutes } from "../routes";
import { path } from "../util";

export const onRouteChange = ({ state }) => ({
  [allRoutes]: () => (state.login ? { login: undefined } : null),
  Login: () =>
    !path(["login", "username"], state) ? { login: { username: "", password: "" } } : null
});
