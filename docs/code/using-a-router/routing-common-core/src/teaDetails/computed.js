import { teaMap } from "./data";
import { findRoute } from "../routes";

export const computed = state => {
  const routeArrive = findRoute(state.routeArrive, "TeaDetails");
  if (routeArrive) {
    const id = routeArrive.params.id;
    const description = teaMap[id].description;
    return { tea: { [id]: description } };
  }
  else if (findRoute(state.routeLeave, "TeaDetails")) {
    return { tea: null };
  }
};
