import { foldCase } from "stags";

import { beers } from "../beverage";
import { Route } from "../root";
import { onChange } from "../util";

export const beer = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      foldCase(Route.Beer({ child: null }))(
        null,
        () => {
          update({
            pleaseWait: true,
            beverages: state.beverages || []
          });

          setTimeout(() => update({
            pleaseWait: false,
            beverages: beers,
          }), 1000);
        }
      )(state.routeCurrent);
    });
  }
};
