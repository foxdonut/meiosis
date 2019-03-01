import { fold } from "static-tagged-union";

import { onChange } from "../util";

export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaDetails = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      state.routeCurrent.forEach(fold({
        TeaDetails: ({ id }) => {
          const tea = teaMap[id].description;
          update({ tea });
        }
      }));
    });
  }
};
