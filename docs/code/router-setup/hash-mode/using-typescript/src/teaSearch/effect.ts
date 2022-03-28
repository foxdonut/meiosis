import { EffectConstructor } from "../app/types";
import { searchTeas } from "../teaSearch/data";
import { Route } from "../router";

export const Effect: EffectConstructor =
  (update) => (state) => {
    if (state.route.page === Route.TeaSearch) {
      setTimeout(() => {
        update({ searchTeas });
      }, 1000);
    }
  };
