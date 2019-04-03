import { findRoute } from "../routes";
import { get } from "../util";

export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaDetails = {
  computed: state => {
    const route = findRoute(state.route, "TeaDetails");
    if (route) {
      const id = route.params.id;

      if (!get(state, ["tea", id])) {
        const description = teaMap[id].description;
        return { tea: { [id]: description } };
      }
    }
    else if (state.tea) {
      return { tea: null };
    }
  }
};
