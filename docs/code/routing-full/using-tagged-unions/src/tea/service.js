import { cases, fold } from "static-tagged-union";
import { K, T } from "ducklings";

import { Data } from "../util";
import { Route } from "../routes";

export const service = ({ state, previousState }) =>
  T(state.route)(
    fold({
      ...cases(["Tea", "TeaDetails"])(() =>
        T(state.teas)(
          fold({
            None: () => [
              () => previousState,
              { route: previousState.route || Route.Home(), teas: Data.Loading() }
            ]
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
