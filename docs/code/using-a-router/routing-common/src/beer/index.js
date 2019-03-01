import { fold } from "static-tagged-union";

import { beers } from "../beverage";
import { onChange } from "../util";

export const beer = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      state.routeCurrent.forEach(fold({
        Beer: () => {
          update({
            pleaseWait: true,
            beverages: state.beverages || []
          });

          setTimeout(() => update({
            pleaseWait: false,
            beverages: beers,
          }), 1000);
        }
      }));
    });
  }
};
