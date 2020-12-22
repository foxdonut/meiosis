import { ProgrammaticRouter } from "meiosis-router-setup";
import { State } from "../app/types";
import { selectors } from "router-setup-common/src/selectors";

export const Effect = (router: ProgrammaticRouter) => (state: State): void => {
  router.syncLocationBar(selectors.route(state));
};
