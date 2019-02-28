import { foldCase } from "stags";

import { coffees } from "../beverage";
import { Route } from "../root";
import { onChange } from "../util";

export const coffee = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      foldCase(Route.Coffee({ child: null }))(
        null,
        () => {
          update({
            pleaseWait: true,
            beverages: state.beverages || []
          });

          setTimeout(() => update({
            pleaseWait: false,
            beverages: coffees,
          }), 1000);
        }
      )(state.routeCurrent);
    });
  }
};
