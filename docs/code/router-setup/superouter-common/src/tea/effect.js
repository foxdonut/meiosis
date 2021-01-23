import { teas } from "router-setup-common/src/teaDetails/data";
import { Route, allRoutes, routes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => null),
    ...routes(["Tea", "TeaDetails"])(() => {
      setTimeout(() => {
        update({ teas });
      }, 1000);
    })
  })(state.route.page);
