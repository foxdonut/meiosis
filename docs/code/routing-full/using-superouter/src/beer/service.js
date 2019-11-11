import { beers } from "../beverage/data";

export const service = ({ state }) => {
  if (state.routeTransition.arrive.Beer) {
    return {
      state: { pleaseWait: true },
      next: ({ update }) =>
        setTimeout(
          () =>
            update({
              pleaseWait: false,
              beers
            }),
          1000
        )
    };
  }
  if (state.routeTransition.leave.Beer) {
    return { state: { beers: null } };
  }
};
