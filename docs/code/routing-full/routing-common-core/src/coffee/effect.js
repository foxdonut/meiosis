import { coffees } from "../beverage/data";

export const effect = update => state => {
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
