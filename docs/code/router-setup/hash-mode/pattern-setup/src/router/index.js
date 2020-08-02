import { routeConfig } from "router-setup-common/src/router";
import { createRouter } from "../meiosis/router";

export { Route } from "router-setup-common/src/router";
export const router = createRouter(routeConfig);

/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:

import createRouteMatcher from "feather-route-matcher";
import { createRouter } from "meiosis-router-setup";
import { routeConfig } from "router-setup-common/src/router";

const routeMatcher = createRouteMatcher(routeConfig);

export { Route } from "router-setup-common/src/router";
export const router = createRouter({ routeMatcher });

See https://meiosis.js.org/router for details.
*/
