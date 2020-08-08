/*
import { routeConfig } from "router-setup-common/src/router";
import { createMithrilRouter } from "../meiosis/router";

export { Route } from "router-setup-common/src/router";

export const router = createMithrilRouter(routeConfig);
*/

/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import m from "mithril";
import { createMithrilRouter } from "meiosis-router-setup";
import { routeConfig } from "router-setup-common/src/router";
import { selectors } from "../state";

export { Route } from "router-setup-common/src/router";
export const router = createMithrilRouter({
  m,
  rootPath: "/code/router-setup/history-mode/mithril-router",
  routeConfig,
  fromRoute: selectors.fromRoute,
  toRoute: selectors.toRoute
});

/*
See https://meiosis.js.org/router for details.
*/
