import { bifold, fold } from "static-tagged-union";

import { coffees } from "../beverage";
import { Loaded, Route } from "../root";
import { Tpipe, contains, onChange } from "../util";

export const coffee = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => Tpipe(
      state.routeCurrent,
      contains(Route.Coffee()),
      bifold(
        () => {
          fold({
            Y: () => update({ coffees: Loaded.N() })
          })(state.coffees);
        },
        () => fold({
          N: () => {
            update({
              pleaseWait: true,
              beverages: state.beverages || []
            });

            setTimeout(() => update({
              pleaseWait: false,
              beverages: coffees,
              coffees: Loaded.Y()
            }), 1000);
          }
        })(state.coffees)
      )
    ));
  }
};
