/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import m from "mithril";
import { createMithrilRouter } from "meiosis-router-setup";
import { routeConfig } from "router-setup-common/src/router";
import { selectors } from "../state";

export const router = createMithrilRouter({
  m,
  rootPath: "/code/router-setup/history-mode/mithril-router/build-with-lib",
  routeConfig,
  fromRoute: selectors.fromRoute,
  toRoute: selectors.toRoute
});

/*
See https://meiosis.js.org/router for details.
*/
