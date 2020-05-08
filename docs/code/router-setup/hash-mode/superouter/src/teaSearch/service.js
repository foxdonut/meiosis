import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.searchTeas) {
        return { searchTeas: undefined };
      }
    }),
    TeaSearch: () => {
      if (!state.searchTeas) {
        return { loadSearchTeas: true };
      }
    }
  })(state.route);
