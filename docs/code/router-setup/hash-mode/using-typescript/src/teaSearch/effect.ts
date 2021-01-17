import { EffectConstructor } from "../app/types";
import { searchTeas } from "router-setup-common/src/teaSearch/data";
import { Route } from "router-setup-common/src/router";

export const Effect: EffectConstructor = update => state => {
  if (state.route.page === Route.TeaSearch) {
    if (!state.searchTeas) {
      // FIXME: update({ loading: true }, !state.loading)
      if (!state.loading) {
        update({ loading: true });
      } else {
        setTimeout(() => {
          update({ searchTeas, loading: false });
        }, 1000);
      }
    }
  } else if (state.searchTeas) {
    // FIXME: update({ searchTeas: undefined }, !state.searchTeas);
    update({ searchTeas: undefined });
  }
};
