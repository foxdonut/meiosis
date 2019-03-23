import { fold } from "static-tagged-union";

export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaDetails = {
  service: (state, update) => (state.arriving) && (() =>
    state.route.forEach(fold({
      TeaDetails: ({ id }) => {
        const tea = teaMap[id].description;
        update({
          arriving: false,
          tea
        });
      }
    }))
  )
};
