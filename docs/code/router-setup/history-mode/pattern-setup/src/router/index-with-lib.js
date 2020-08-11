/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouteMatcher from "feather-route-matcher";
import { createRouter } from "meiosis-router-setup";
import { routeConfig } from "router-setup-common/src/router";

const routeMatcher = createRouteMatcher(routeConfig);

export const router = createRouter({
  routeMatcher,
  rootPath: "/code/router-setup/history-mode/pattern-setup/build-with-lib"
});

/*
See https://meiosis.js.org/router for details.
*/
