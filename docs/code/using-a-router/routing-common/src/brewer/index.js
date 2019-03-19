import { fold, unless } from "static-tagged-union";

import { Arrived } from "../root";

export const brewer = {
  service: (state, update) => {
    unless(({ route }) =>
      route.forEach(fold({
        Brewer: ({ id }) => {
          update({
            routeCurrent: Arrived.Y({ route }),
            brewer: `Brewer of beverage ${id}`
          });
        }
      }))
    )(state.routeCurrent);
  }
};
