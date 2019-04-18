import { contains, fold } from "static-tagged-union";

import { beverageMap } from "./data";
import { Route } from "../routes";
import { Tpipe, get } from "../util";

export const computed = state =>
  Tpipe(
    state.route,
    contains(Route.Beverage()),
    fold({
      Y: ({ id }) => {
        if (!get(state, ["beverage", id])) {
          const description = beverageMap[id].description;
          return { beverage: { [id]: description } };
        }
      },
      N: () => {
        if (state.beverage) {
          return { beverage: null };
        }
      }
    })
  );
