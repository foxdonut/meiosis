import { coffees } from "../beverage/data";

export const service = ({ state }) => {
  if (state.routeTransition.arrive.Coffee) {
    return {
      state: { pleaseWait: true },
      next: ({ update }) =>
        setTimeout(
          () =>
            update({
              pleaseWait: false,
              coffees
            }),
          1000
        )
    };
  }
  if (state.routeTransition.leave.Coffee) {
    return { state: { coffees: null } };
  }
};
