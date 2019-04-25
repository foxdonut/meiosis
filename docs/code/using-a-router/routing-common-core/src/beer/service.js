import { beers } from "../beverage/data";
import { findRoute } from "../routes";

export const service = ({ state, update }) => {
  if (findRoute(state.route.arrive, "Beer")) {
    update({ pleaseWait: true });

    setTimeout(
      () =>
        update({
          pleaseWait: false,
          beers
        }),
      1000
    );
  } else if (findRoute(state.route.leave, "Beer")) {
    update({ beers: null });
  }
};
