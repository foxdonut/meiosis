import { beers } from "../beverage/data";

export const effect = ({ state, update }) => {
  if (state.routeTransition.arrive.Beer) {
    setTimeout(
      () =>
        update({
          pleaseWait: false,
          beers
        }),
      1000
    );
  }
};
