import { selectors } from "router-setup-common/src/selectors";
import { teaMap } from "router-setup-common/src/teaDetails/data";
import { Route, allRoutes } from "../router";

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
  })(selectors.page(state));
