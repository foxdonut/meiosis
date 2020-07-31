import { teaMap } from "./data";
import { Route } from "../router";

export const Service = selectors => state => {
  if (selectors.page(state) === Route.TeaDetails) {
    const id = selectors.params(state).id;
    if (!state.tea || !state.tea[id]) {
      return { tea: () => ({ [id]: teaMap[id].description }) };
    }
  } else if (state.tea) {
    return { tea: undefined };
  }
};
