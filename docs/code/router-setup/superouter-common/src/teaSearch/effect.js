import { searchTeas } from "router-setup-common/src/teaSearch/data";
import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => null),
    TeaSearch: () => {
      setTimeout(() => {
        update({ searchTeas });
      }, 1000);
    }
  })(state.route.page);
