import { coffees } from "../beverage/data";

export const Effect = update => state => {
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
