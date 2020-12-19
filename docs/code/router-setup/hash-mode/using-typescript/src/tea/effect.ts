import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";
import { EffectConstructor } from "../app/types";
import { teas } from "router-setup-common/src/teaDetails/data";

export const Effect: EffectConstructor = update => state => {
  if (selectors.page(state) === Route.Tea || selectors.page(state) === Route.TeaDetails) {
    if (!state.teas) {
      if (!state.loading) {
        update({ loading: true });
      } else {
        setTimeout(() => {
          update({ teas, loading: false });
        }, 1000);
      }
    }
  } else if (state.teas) {
    update({ teas: undefined });
  }
};
