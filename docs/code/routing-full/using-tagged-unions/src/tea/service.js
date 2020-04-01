import { cases, fold } from "static-tagged-union";
import { K, T } from "ducklings";

import { Data } from "../util";

export const service = ({ state }) =>
  T(state.route)(
    fold({
      ...cases(["Tea", "TeaDetails"])(() =>
        T(state.teas)(
          fold({
            None: K({ teas: Data.Loading() })
          })
        )
      ),
      _: () =>
        T(state.teas)(
          fold({
            Loaded: K({ teas: Data.None(K({})) })
          })
        )
    })
  );
