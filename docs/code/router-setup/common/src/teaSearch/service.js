import { Route } from "../router";

export const Service = selectors => state => {
  if (selectors.page(state) === Route.TeaSearch) {
    if (!state.searchTeas) {
      return { loadSearchTeas: true };
    }
  } else if (state.searchTeas) {
    return { searchTeas: undefined };
  }
};
