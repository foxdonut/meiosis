import { EffectConstructor } from "../app/types";
import { searchTeas } from "router-setup-common/src/teaSearch/data";

export const Effect: EffectConstructor = update => state => {
  if (state.loadSearchTeas) {
    setTimeout(() => {
      update({ searchTeas, loadSearchTeas: false });
    }, 1000);
  }
};
