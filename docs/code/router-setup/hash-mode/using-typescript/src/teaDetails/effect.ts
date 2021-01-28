import { EffectConstructor } from "../app/types";
import { teaMap } from "./data";
import { Route } from "../router";

export const Effect: EffectConstructor = update => state => {
  if (state.route.page === Route.TeaDetails) {
    const id = state.route.params.id;
    update({ tea: teaMap[id].description });
  }
};
