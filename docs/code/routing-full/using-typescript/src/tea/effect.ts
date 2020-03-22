import { teas } from "../teaDetails/data";

export const effect = ({ state, update }): any => {
  if (state.routeTransition.arrive.Tea) {
    setTimeout((): void => {
      update({ teas });
    }, 500);
  }
};
