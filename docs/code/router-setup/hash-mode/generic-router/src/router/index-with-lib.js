/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

/* BEGIN using feather-route-matcher */
import createRouteMatcher from "feather-route-matcher";

const routeMatcher = createRouteMatcher(routeConfig);
/* END using feather-route-matcher */

/* BEGIN using page.js
import page from "page";

let lastMatch;

Object.keys(routeConfig).forEach(key => {
  page(key, ctx => {
    lastMatch = {
      value: routeConfig[key],
      params: ctx.params,
      queryParams: queryString.parse(ctx.querystring)
    };
  });
});

const routeMatcher = path => {
  page.show(path, null, true, false);
  return lastMatch;
};

page.configure({ popstate: false, click: false });
END using page.js */

const convertMatchToRoute = ({ match, queryParams }) => ({
  page: match.value,
  params: match.params,
  queryParams
});

export const router = createRouter({
  routeMatcher,
  convertMatchToRoute,
  routeConfig,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
