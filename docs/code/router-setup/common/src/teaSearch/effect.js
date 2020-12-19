import { Route } from "../router";
import { selectors } from "../selectors";
import { searchTeas } from "./data";

export const Effect = update => state => {
  if (selectors.page(state) === Route.TeaSearch) {
    if (!state.searchTeas) {
      // FIXME: update({ loading: true }, !state.loading)
      if (!state.loading) {
        update({ loading: true });
      } else {
        setTimeout(() => {
          update({ searchTeas, loading: false });
        }, 1000);
      }
    }
  } else if (state.searchTeas) {
    // FIXME: update({ searchTeas: undefined }, !state.searchTeas);
    update({ searchTeas: undefined });
  }
};
