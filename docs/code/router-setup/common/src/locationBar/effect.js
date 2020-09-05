import { selectors } from "../selectors";

export const Effect = router => state => {
  router.syncLocationBar(selectors.route(state));
};
