import { contains, fold } from "static-tagged-union";

import { Route } from "../routes";
import { Tpipe, get } from "../util";

export const brewer = {
  computed: state =>
    Tpipe(
      state.route,
      contains(Route.Brewer()),
      fold({
        Y: ({ id }) => {
          if (!get(state, ["brewer", id])) {
            return { brewer: { [id]: `Brewer of beverage ${id}` } };
          }
        },
        N: () => {
          if (state.brewer) {
            return { brewer: null };
          }
        },
      })
    )
};
