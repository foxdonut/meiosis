import { teaMap } from "./data";
import { findRoute } from "../routes";

export const computed = state => {
  const arrive = findRoute(state.route.arrive, "TeaDetails");
  if (arrive) {
    const id = arrive.params.id;
    const description = teaMap[id].description;
    return { tea: { [id]: description } };
  } else if (findRoute(state.route.leave, "TeaDetails")) {
    return { tea: null };
  }
};
