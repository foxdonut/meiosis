import { Route } from "../router";

export const service = state => {
  if (state.route.page === Route.TeaSearch) {
    if (!state.searchTeas) {
      return { loadSearchTeas: true };
    }
  } else if (state.searchTeas) {
    return { searchTeas: undefined };
  }
};
