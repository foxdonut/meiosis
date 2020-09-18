import { Router } from "meiosis-router-setup";
import { State } from "../app/types";
import { selectors } from "router-setup-common/src/selectors";

export const Effect = (router: Router) => (state: State): void => {
  router.syncLocationBar(selectors.route(state));
};
