import { EffectConstructor } from "../app/types";
import { teaMap } from "router-setup-common/src/teaDetails/data";
import { Route } from "router-setup-common/src/router";

export const Effect: EffectConstructor = update => state => {
  if (state.route.page === Route.TeaDetails) {
    const id = state.route.params.id;
    if (!state.tea || !state.tea[id]) {
      update({ tea: () => ({ [id]: teaMap[id].description }) });
    }
  } else if (state.tea) {
    update({ tea: undefined });
  }
};
