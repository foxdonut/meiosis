import { selectors } from "../selectors";

export const syncLocationBar = router => state => router.syncLocationBar(selectors.route(state));
