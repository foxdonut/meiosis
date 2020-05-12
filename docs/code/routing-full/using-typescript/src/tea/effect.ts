import { teas } from "../teaDetails/data";

export const Effect = (update): any => (state): any => {
  if (state.routeTransition.arrive.Tea) {
    setTimeout((): void => {
      update({ teas });
    }, 500);
  }
};
