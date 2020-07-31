import { teas } from "../teaDetails/data";

export const Effect = update => state => {
  if (state.loadTeas) {
    setTimeout(() => {
      update({ teas, loadTeas: false });
    }, 1000);
  }
};
