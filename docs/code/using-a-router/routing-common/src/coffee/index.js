import { bifold, contains, map, unless } from "static-tagged-union";

import { coffees } from "../beverage";
import { Loaded, Route } from "../root";
import { T, Tpipe } from "../util";

export const coffee = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Coffee()),
      bifold(
        () => T(state.coffees, map(() => update({ coffees: Loaded.N() }))),
        () => T(state.coffees, unless(
          () => {
            if (!state.pleaseWait) {
              update({ pleaseWait: true });
            }

            setTimeout(() => update({
              pleaseWait: false,
              beverages: coffees,
              coffees: Loaded.Y()
            }), 1000);
          }
        ))
      )
    )
};
