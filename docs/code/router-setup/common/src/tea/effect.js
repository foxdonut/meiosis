import { Route } from "../router";
import { selectors } from "../selectors";
import { teas } from "../teaDetails/data";

export const Effect = update => state => {
  if (selectors.page(state) === Route.Tea || selectors.page(state) === Route.TeaDetails) {
    if (!state.teas) {
      if (!state.loading) {
        update({ loading: true });
      } else {
        setTimeout(() => {
          update({ teas, loading: false });
        }, 1000);
      }
    }
  } else if (state.teas) {
    update({ teas: undefined });
  }
};
