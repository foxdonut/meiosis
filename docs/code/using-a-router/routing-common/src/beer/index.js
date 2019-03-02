import { bifold, fold } from "static-tagged-union";

import { beers } from "../beverage";
import { Loaded, Route } from "../root";
import { Tpipe, contains, onChange } from "../util";

export const beer = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => Tpipe(
      state.routeCurrent,
      contains(Route.Beer()),
      bifold(
        () => {
          update({ beers: Loaded.N() });
        },
        () => fold({
          N: () => {
            update({
              pleaseWait: true,
              beverages: state.beverages || []
            });

            setTimeout(() => update({
              pleaseWait: false,
              beverages: beers,
              beers: Loaded.Y()
            }), 1000);
          }
        })(state.beers)
      )
    ));
  }
};
