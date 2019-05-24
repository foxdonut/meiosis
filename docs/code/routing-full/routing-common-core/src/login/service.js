import { findRouteSegment } from "meiosis-routing/state";

export const service = ({ state, update }) => {
  if (findRouteSegment(state.route.arrive, "Login")) {
    update({
      login: {
        username: "",
        password: ""
      }
    });
  } else if (findRouteSegment(state.route.leave, "Login")) {
    update({ login: null });
  }
};
