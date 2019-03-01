import { fold } from "static-tagged-union";

import { onChange } from "../util";

export const brewer = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      state.routeCurrent.forEach(fold({
        Brewer: ({ id }) => {
          update({
            brewer: `Brewer of beverage ${id}`
          });
        }
      }));
    });
  }
};
