import { bifold, contains } from "static-tagged-union";

import { Route } from "../root";
import { Tpipe } from "../util";

export const brewer = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Brewer()),
      bifold(
        () => {
          if (state.brewer) {
            update({ brewer: null });
          }
        },
        ({ id }) => {
          if (!state.brewer) {
            update({ brewer: `Brewer of beverage ${id}` });
          }
        }
      )
    )
};
