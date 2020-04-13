import { Route } from "../router";

export const service = ({ state }) => {
  if (state.route.page === Route.Tea || state.route.page === Route.TeaDetails) {
    if (!state.teas) {
      return { loadTeas: true };
    }
  } else if (state.teas) {
    return { teas: undefined };
  }
};
