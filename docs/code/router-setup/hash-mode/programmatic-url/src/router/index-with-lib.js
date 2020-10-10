// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouteMatcher from "feather-route-matcher";
import { createProgrammaticRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

const routeMatcher = createRouteMatcher(routeConfig);
const convertMatchToRoute = (match, queryParams) => ({
  page: match.value,
  params: match.params,
  queryParams
});

export const router = createProgrammaticRouter({
  routeMatcher,
  convertMatchToRoute,
  routeConfig,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
