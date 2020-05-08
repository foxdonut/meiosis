import { Route, allRoutes } from "../router";
import { teaMap } from "./data";

export const service = state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.tea) {
        return { tea: undefined };
      }
    }),
    TeaDetails: ({ id }) => {
      if (!state.tea || !state.tea[id]) {
        return { tea: () => ({ [id]: teaMap[id].description }) };
      }
    }
  })(state.route);
