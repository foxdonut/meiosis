import { Route } from "router-setup-common/src/router";
import { EffectConstructor } from "../app/types";
import { teas } from "router-setup-common/src/teaDetails/data";

export const Effect: EffectConstructor = update => state => {
  if (state.route.page === Route.Tea || state.route.page === Route.TeaDetails) {
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
