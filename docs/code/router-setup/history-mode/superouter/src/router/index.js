// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import { createRouter, getQueryString } from "meiosis-router-setup";
import queryString from "query-string";
import { Route } from "superouter-common/src/router";

const routeMatcher = path => {
  const idx = path.indexOf("?");
  return Route.matchOr(
    () => Route.of.NotFound({ any: null }),
    idx >= 0 ? path.substring(0, idx) : path
  );
};
const convertMatch = match => ({ page: match, params: {} });

export const router = createRouter({
  routeMatcher,
  rootPath: "/code/router-setup/history-mode/superouter/build",
  toUrl: (page, params) => Route.toURL(page) + getQueryString(queryString, params),
  convertMatch,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
