import { Route } from "../router";

export const Service = selectors => state => {
  if (selectors.page(state) === Route.Tea || selectors.page(state) === Route.TeaDetails) {
    if (!state.teas) {
      return { loadTeas: true };
    }
  } else if (state.teas) {
    return { teas: undefined };
  }
};
