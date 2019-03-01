import { fold } from "static-tagged-union";

import { coffees } from "../beverage";
import { onChange } from "../util";

export const coffee = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      state.routeCurrent.forEach(fold({
        Coffee: () => {
          update({
            pleaseWait: true,
            beverages: state.beverages || []
          });

          setTimeout(() => update({
            pleaseWait: false,
            beverages: coffees,
          }), 1000);
        }
      }));
    });
  }
};
