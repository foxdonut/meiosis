import { foldCase } from "stags";

import { Route } from "../root";
import { onChange } from "../util";

export const home = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      foldCase(Route.Transition({ from: null, to: null }))(
        null,
        ({ to }) => foldCase(Route.Home())(
          null,
          () => update({ routeCurrent: to })
        )(to)
      )(state.routeCurrent);
    });
  }
};
