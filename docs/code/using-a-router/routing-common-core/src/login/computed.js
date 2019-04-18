import O from "patchinko/constant";

import { findRoute } from "../routes";

export const computed = state => {
  if (findRoute(state.route, "Login")) {
    if (!state.login) {
      return {
        login: O({
          username: "",
          password: ""
        })
      };
    }
  } else if (state.login) {
    return { login: null };
  }
};
