import { teas } from "../teaDetails/data";

export const effect = update => state => {
  if (state.routeTransition.arrive.Tea) {
    setTimeout(() => {
      update({ teas });
    }, 500);
  }
};
