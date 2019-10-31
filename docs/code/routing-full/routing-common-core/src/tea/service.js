import { teas } from "../teaDetails/data";

export const service = ({ state }) => {
  if (state.routeTransition.arrive.Tea) {
    return {
      next: ({ update }) =>
        setTimeout(() => {
          update({ teas });
        }, 500)
    };
  }
  if (state.routeTransition.leave.Tea) {
    return { state: { teas: null } };
  }
};
