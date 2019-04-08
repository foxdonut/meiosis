import { findRoute } from "../routes";

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
    const routeArrive = findRoute(state.routeArrive, "TeaDetails");
    if (routeArrive) {
      const id = routeArrive.params.id;
      const description = teaMap[id].description;
      return { tea: { [id]: description } };
    }
    else if (findRoute(state.routeLeave, "TeaDetails")) {
      return { tea: null };
    }
  }
};
