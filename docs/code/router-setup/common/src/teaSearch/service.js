import { Route } from "router-setup-common/src/router";

export const Service = selectors => state => {
  if (selectors.page(state) === Route.TeaSearch) {
    if (!state.searchTeas) {
      return { loadSearchTeas: true };
    }
  } else if (state.searchTeas) {
    return { searchTeas: undefined };
  }
};
