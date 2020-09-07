/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { Route } from ".";
import { selectors } from "router-setup-common/src/selectors";

const routeMatcher = path => Route.matchOr(() => Route.of.NotFound({ any: null }), path);
const convertMatchToRoute = (match, queryParams) => ({ page: match, queryParams });

export const router = createRouter({
  routeMatcher,
  rootPath: "/code/router-setup/history-mode/superouter/build-with-lib",
  toUrl: Route.toURL,
  convertMatchToRoute,
  fromRoute: selectors.fromRoute,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
