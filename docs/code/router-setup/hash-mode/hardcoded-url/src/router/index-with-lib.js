// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouteMatcher from "feather-route-matcher";
import { createHardcodedUrlRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

const routeMatcher = createRouteMatcher(routeConfig);
const convertMatchToRoute = ({ match, queryParams, url, options }) => ({
  page: match.value,
  params: match.params,
  queryParams,
  url,
  ...options
});

export const router = createHardcodedUrlRouter({
  routeMatcher,
  convertMatchToRoute,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
