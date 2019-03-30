import { contains } from "../util";

export const brewer = {
  service: (state, update) => {
    const route = contains(state.route, "Brewer");

    if (route) {
      const id = route.params.id;

      if (!state.brewer) {
        update({ brewer: `Brewer of beverage ${id}` });
      }
    }
    else if (state.brewer) {
      update({ brewer: null });
    }
  }
};
