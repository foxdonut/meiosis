import { contains, fold } from "static-tagged-union";

import { Route } from "../routes";
import { Tpipe } from "../util";

export const brewer = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Brewer()),
      fold({
        Y: ({ id }) => {
          if (!state.brewer) {
            update({ brewer: `Brewer of beverage ${id}` });
          }
        },
        N: () => {
          if (state.brewer) {
            update({ brewer: null });
          }
        },
      })
    )
};
