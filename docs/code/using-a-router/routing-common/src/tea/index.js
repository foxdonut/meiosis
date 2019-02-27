import { bifoldCase } from "stags";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { onChange } from "../util";

export const tea = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      bifoldCase(Route.Tea({ details: null }))(
        () => {
          update({ teas: Loaded.N() });
        },
        () => {
          Loaded.bifold(
            () => {
              setTimeout(() => {
                update({ teas: Loaded.Y(teas) });
              }, 500);
            },
            () => null
          )(state.teas);
        }
      )(state.routeCurrent);
    });
  }
};
