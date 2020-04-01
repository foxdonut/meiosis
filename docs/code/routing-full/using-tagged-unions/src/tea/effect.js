import { fold } from "static-tagged-union";
import { T } from "ducklings";

import { Data } from "../util";
import { teas } from "../teaDetails/data";

export const effect = ({ state, update }) =>
  T(state.teas)(
    fold({
      Loading: () => {
        setTimeout(() => {
          update({ teas: Data.Loaded({ teas }) });
        }, 250);
      }
    })
  );
