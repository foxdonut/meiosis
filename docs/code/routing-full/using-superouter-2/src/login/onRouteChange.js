import { path } from "../util";

export const onRouteChange = ({ state }) => [
  () => (state.login ? { login: undefined } : null),
  {
    Login: () =>
      !path(["login", "username"], state) ? { login: { username: "", password: "" } } : null
  }
];
