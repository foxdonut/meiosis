import { teas } from "../teaDetails/data";

export const service = ({ state }): any => {
  if (state.routeTransition.arrive.Tea) {
    return {
      next: ({ update }): void => {
        setTimeout((): void => {
          update({ teas });
        }, 500);
      }
    };
  }
  if (state.routeTransition.leave.Tea) {
    return { state: { teas: null } };
  }
};
