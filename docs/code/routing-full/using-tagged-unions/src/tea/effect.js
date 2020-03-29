import { fold } from "static-tagged-union";
import { T } from "ducklings";

import { Data } from "../util";
import { Route } from "../routes";
import { teas } from "../teaDetails/data";

export const effect = ({ state, update }) =>
  T(state.teas)(
    fold({
      Loading: () => {
        setTimeout(() => {
          update({ route: Route.Tea(), teas: Data.Loaded({ teas }) });
        }, 500);
      }
    })
  );
