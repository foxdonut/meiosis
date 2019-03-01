import { bifold, fold } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { contains, onChange } from "../util";

export const tea = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      bifold(
        () => {
          update({ teas: Loaded.N() });
        },
        () => {
          fold({
            N: () => {
              setTimeout(() => {
                update({ teas: Loaded.Y(teas) });
              }, 500);
            }
          })(state.teas);
        }
      )(contains(Route.Tea())(state.routeCurrent));
    });
  }
};
