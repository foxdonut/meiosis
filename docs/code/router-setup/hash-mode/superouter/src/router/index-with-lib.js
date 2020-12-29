// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { Route } from "superouter-common/src/router";

const routeMatcher = path => Route.matchOr(() => Route.of.NotFound({ any: null }), path);
const convertMatchToRoute = ({ queryParams, ...match }) => ({ page: match, queryParams });

export const router = createRouter({
  routeMatcher,
  toUrl: Route.toURL,
  convertMatchToRoute,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
