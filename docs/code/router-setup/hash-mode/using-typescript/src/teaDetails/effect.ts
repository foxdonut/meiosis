import { EffectConstructor } from "../app/types";
import { teaMap } from "router-setup-common/src/teaDetails/data";
import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";

export const Effect: EffectConstructor = update => state => {
  if (selectors.page(state) === Route.TeaDetails) {
    const id = selectors.params(state).id;
    if (!state.tea || !state.tea[id]) {
      update({ tea: () => ({ [id]: teaMap[id].description }) });
    }
  } else if (state.tea) {
    update({ tea: undefined });
  }
};
