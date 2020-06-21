import { Route } from "../router";
import { selectors } from "../state";

export const service = state => {
  if (selectors.page(state) === Route.TeaSearch) {
    if (!state.searchTeas) {
      return { loadSearchTeas: true };
    }
  } else if (state.searchTeas) {
    return { searchTeas: undefined };
  }
};
