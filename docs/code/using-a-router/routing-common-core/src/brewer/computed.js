import { findRoute } from "../routes";
import { get } from "../util";

export const computed = state => {
  const route = findRoute(state.route, "Brewer");

  if (route) {
    const id = route.params.id;

    if (!get(state, ["brewer", id])) {
      return { brewer: { [id]: `Brewer of beverage ${id}` } };
    }
  } else if (state.brewer) {
    return { brewer: null };
  }
};
