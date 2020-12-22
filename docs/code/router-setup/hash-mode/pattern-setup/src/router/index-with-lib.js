// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouteMatcher from "feather-route-matcher";
import { createHardcodedRouter } from "meiosis-router-setup";
import { routeConfig } from "router-setup-common/src/router";

const routeMatcher = createRouteMatcher(routeConfig);
const convertMatchToRoute = ({ match, url, options }) => ({
  page: match.value,
  params: match.params,
  url,
  ...options
});

export const router = createHardcodedRouter({
  routeMatcher,
  convertMatchToRoute
});

/*
See https://meiosis.js.org/router for details.
*/
