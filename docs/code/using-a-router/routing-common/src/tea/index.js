import { foldCase } from "stags";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { onChange } from "../util";

export const tea = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      foldCase(Route.Tea({ details: null }))(
        null,
        () => {
          setTimeout(() => {
            update({ teas: Loaded.Y(teas) });
          }, 500);
        }
      )(state.routeCurrent);
    });
  }
};
