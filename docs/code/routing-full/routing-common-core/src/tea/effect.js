import { teas } from "../teaDetails/data";

export const service = ({ state, update }) => {
  if (state.routeTransition.arrive.Tea) {
    setTimeout(() => {
      update({ teas });
    }, 500);
  }
};
