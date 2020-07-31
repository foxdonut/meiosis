import { routeConfig } from "router-setup-common/src/router";
import { createRouter } from "../meiosis/router";

export { Route } from "router-setup-common/src/router";

export const router = createRouter(routeConfig);

/*
you can also npm install meiosis-router-setup and use it as shown below:

import createRouteMatcher from "feather-route-matcher";
import { createFeatherRouter } from "meiosis-router-setup";
export const router = createFeatherRouter({ createRouteMatcher, routeConfig, historyMode: true });

See https://meiosis.js.org/router for details.
*/
