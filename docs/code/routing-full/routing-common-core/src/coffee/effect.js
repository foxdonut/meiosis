import { coffees } from "../beverage/data";

export const effect = ({ state, update }) => {
  if (state.routeTransition.arrive.Coffee) {
    setTimeout(
      () =>
        update({
          pleaseWait: false,
          coffees
        }),
      1000
    );
  }
};
