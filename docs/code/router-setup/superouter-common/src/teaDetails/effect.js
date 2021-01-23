import { teaMap } from "router-setup-common/src/teaDetails/data";
import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => null),
    TeaDetails: ({ id }) => {
      update({ tea: teaMap[id].description });
    }
  })(state.route.page);
