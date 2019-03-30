import { contains } from "../util";

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
    const route = contains(state.route, "TeaDetails");
    if (route) {
      const id = route.params.id;

      if (!state.tea[id]) {
        const description = teaMap[id].description;
        update({ tea: { [id]: description } });
      }
    }
    else if (Object.keys(state.tea).length > 0) {
      update({ tea: {} });
    }
  }
};
