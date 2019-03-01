import { fold } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Loaded } from "../root";
import { onChange } from "../util";

export const tea = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      state.routeCurrent.forEach(fold({
        Tea: () => {
          fold({
            N: () => {
              setTimeout(() => {
                update({ teas: Loaded.Y(teas) });
              }, 500);
            }
          })(state.teas);
        },
        _: () => {
          update({ teas: Loaded.N() });
        }
      }));
    });
  }
};
