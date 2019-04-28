import O from "patchinko/constant";
import { findRoute } from "meiosis-routing/state";

export const service = ({ state, update }) => {
  if (findRoute(state.route.arrive, "Login")) {
    update({
      login: O({
        username: "",
        password: ""
      })
    });
  } else if (findRoute(state.route.leave, "Login")) {
    update({ login: null });
  }
};
