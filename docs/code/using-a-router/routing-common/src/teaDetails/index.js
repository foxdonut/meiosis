import { contains, fold } from "static-tagged-union";

import { Route } from "../root";
import { Tpipe } from "../util";

export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaDetails = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.TeaDetails()),
      fold({
        Y: ({ id }) => {
          if (!state.tea[id]) {
            const description = teaMap[id].description;
            update({ tea: { [id]: description } });
          }
        },
        N: () => {
          if (Object.keys(state.tea).length > 0) { // FIXME
            update({ tea: {} });
          }
        },
      })
    )
};
