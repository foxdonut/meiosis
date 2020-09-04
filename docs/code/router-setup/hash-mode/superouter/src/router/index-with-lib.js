/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import { createRouter, getQueryString } from "meiosis-router-setup";
import queryString from "query-string";
import { Route } from ".";

const routeMatcher = path => {
  const match = Route.matchOr(() => Route.of.NotFound({ any: null }), path);
  return { page: match.case, params: match.value };
};
const toUrl = (route, params = {}) => Route.toURL(route) + getQueryString(queryString, params);

export const router = createRouter({
  routeMatcher,
  toUrl,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
