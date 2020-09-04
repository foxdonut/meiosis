/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouteMatcher from "feather-route-matcher";
import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

const featherRouteMatcher = createRouteMatcher(routeConfig);
const routeMatcher = path => {
  const match = featherRouteMatcher(path);
  return { page: match.value, params: match.params };
};

export const router = createRouter({
  routeMatcher,
  routeConfig,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
