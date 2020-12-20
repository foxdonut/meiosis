import { selectors } from "router-setup-common/src/selectors";
import { teaMap } from "router-setup-common/src/teaDetails/data";
import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.tea) {
        update({ tea: undefined });
      }
    }),
    TeaDetails: ({ id }) => {
      if (!state.tea || !state.tea[id]) {
        update({ tea: () => ({ [id]: teaMap[id].description }) });
      }
    }
  })(selectors.page(state));
