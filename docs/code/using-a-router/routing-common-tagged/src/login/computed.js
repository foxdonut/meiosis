import O from "patchinko/constant";
import { contains, fold } from "static-tagged-union";

import { Route } from "../routes";
import { Tpipe } from "../util";

export const computed = state =>
  Tpipe(
    state.route,
    contains(Route.Login()),
    fold({
      Y: () => {
        if (!state.login) {
          return {
            login: O({
              username: "",
              password: ""
            })
          };
        }
      },
      N: () => {
        if (state.login) {
          return { login: null };
        }
      }
    })
  );
