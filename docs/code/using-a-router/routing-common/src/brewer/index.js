import { fold } from "static-tagged-union";

import { routeList } from "../root";

export const brewer = {
  service: (state, update) => {
    if (state.arriving) {
      routeList(state.route).forEach(fold({
        Brewer: ({ id }) => {
          update({
            arriving: false,
            brewer: `Brewer of beverage ${id}`
          });
        }
      }));
    }
  }
};
