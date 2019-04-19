import { contains, fold } from "static-tagged-union";

import { Route } from "../routes";
import { Tpipe, get } from "../util";

export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const computed = state =>
  Tpipe(
    state.route,
    contains(Route.TeaDetails()),
    fold({
      Y: ({ id }) => {
        if (!get(state, ["tea", id])) {
          const description = teaMap[id].description;
          return { tea: { [id]: description } };
        }
      },
      N: () => {
        if (state.tea) {
          return { tea: null };
        }
      }
    })
  );
