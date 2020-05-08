import { teas } from "../teaDetails/data";

export const effect = update => state => {
  if (state.loadTeas) {
    setTimeout(() => {
      update({ teas, loadTeas: false });
    }, 1000);
  }
};
