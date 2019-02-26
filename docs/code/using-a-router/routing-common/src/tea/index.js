import { foldCase } from "stags";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { onChange } from "../util";

export const tea = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      foldCase(Route.Transition({ from: null, to: null }))(
        null,
        ({ to }) => foldCase(Route.Tea({ details: null }))(
          null,
          () => {
            Loaded.bifold(
              () => {
                setTimeout(() => {
                  update({
                    routeCurrent: to,
                    teas: Loaded.Y(teas)
                  });
                }, 500);
              },
              () => null
            )(state.teas);
          }
        )(to)
      )(state.routeCurrent);

      foldCase(Route.Transition({ from: null, to: null }))(
        null,
        ({ from }) => foldCase(Route.Tea({ details: null }))(
          null,
          () => {
            update({
              teas: Loaded.N()
            });
          }
        )(from)
      )(state.routeCurrent);
    });
  }
};
