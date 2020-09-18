import { EffectConstructor } from "../app/types";
import { teas } from "router-setup-common/src/teaDetails/data";

export const Effect: EffectConstructor = update => state => {
  if (state.loadTeas) {
    setTimeout(() => {
      update({ teas, loadTeas: false });
    }, 1000);
  }
};
