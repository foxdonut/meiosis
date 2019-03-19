import { fold, unless } from "static-tagged-union";

import { Arrived } from "../root";

export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaDetails = {
  service: (state, update) => {
    unless(({ route }) =>
      route.forEach(fold({
        TeaDetails: ({ id }) => {
          const tea = teaMap[id].description;
          update({
            routeCurrent: Arrived.Y({ route }),
            tea
          });
        }
      }))
    )(state.routeCurrent);
  }
};
