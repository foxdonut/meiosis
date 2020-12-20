import { selectors } from "router-setup-common/src/selectors";
import { searchTeas } from "router-setup-common/src/teaSearch/data";
import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.searchTeas) {
        update({ searchTeas: undefined });
      }
    }),
    TeaSearch: () => {
      if (!state.searchTeas) {
        (state.loading &&
          setTimeout(() => {
            update({ searchTeas, loading: false });
          }, 1000)) ||
          update({ loading: true });
      }
    }
  })(selectors.page(state));
