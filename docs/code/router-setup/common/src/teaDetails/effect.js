import { teaMap } from "./data";
import { Route } from "../router";
import { selectors } from "../selectors";

export const Effect = update => state => {
  if (selectors.page(state) === Route.TeaDetails) {
    const id = selectors.params(state).id;
    if (!state.tea || !state.tea[id]) {
      update({ tea: () => ({ [id]: teaMap[id].description }) });
    }
  } else if (state.tea) {
    update({ tea: undefined });
  }
};
