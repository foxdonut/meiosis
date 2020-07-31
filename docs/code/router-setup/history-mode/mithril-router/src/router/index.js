import { routeConfig } from "router-setup-common/src/router";
import { createMithrilRouter } from "../meiosis/router";

export { Route } from "router-setup-common/src/router";

export const router = createMithrilRouter(routeConfig);

/*
you can also npm install meiosis-router-setup and use it as shown below:

import m from "mithril";
import { createMithrilRouter } from "meiosis-router-setup";
export const router = createMithrilRouter({ m, routeConfig, historyMode: true });

See https://meiosis.js.org/router for details.
*/
