import { Route } from "../router";
import { selectors } from "../state";

export const service = state => {
  if (selectors.page(state) === Route.Tea || selectors.page(state) === Route.TeaDetails) {
    if (!state.teas) {
      return { loadTeas: true };
    }
  } else if (state.teas) {
    return { teas: undefined };
  }
};
