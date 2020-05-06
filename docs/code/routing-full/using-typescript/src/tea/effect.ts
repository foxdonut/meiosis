import { teas } from "../teaDetails/data";

export const effect = (update): any => (state): any => {
  if (state.routeTransition.arrive.Tea) {
    setTimeout((): void => {
      update({ teas });
    }, 500);
  }
};
