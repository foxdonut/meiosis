/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouteMatcher from "feather-route-matcher";
import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

const routeMatcher = createRouteMatcher(routeConfig);
const convertMatchToRoute = (match, queryParams) => ({
  page: match.value,
  params: match.params,
  queryParams
});

export const router = createRouter({
  routeMatcher,
  convertMatchToRoute,
  routeConfig,
  rootPath: "/code/router-setup/history-mode/programmatic-url/build-with-lib",
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
