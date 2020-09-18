import { AppService } from "../app/types";
import { teaMap } from "router-setup-common/src/teaDetails/data";
import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";

export const service: AppService = state => {
  if (selectors.page(state) === Route.TeaDetails) {
    const id = selectors.params(state).id;
    if (!state.tea || !state.tea[id]) {
      return { tea: () => ({ [id]: teaMap[id].description }) };
    }
  } else if (state.tea) {
    return { tea: undefined };
  }
};
