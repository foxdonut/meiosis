import O from "patchinko/constant";

import { findRoute } from "../routes";

export const computed = state => {
  if (findRoute(state.route.arrive, "Login")) {
    return {
      login: O({
        username: "",
        password: ""
      })
    };
  } else if (findRoute(state.route.leave, "Login")) {
    return { login: null };
  }
};
