/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouter5 from "router5";
import { createRouter, Router, RouteMatcher, ConvertMatchToRoute } from "meiosis-router-setup";
import * as queryString from "query-string";
import { router5Config } from "router-setup-common/src/router";

const router5 = createRouter5(router5Config, { queryParamsMode: "loose" });

// const routeMatcher: RouteMatcher = router5.matchPath;
const routeMatcher: RouteMatcher = url => {
  const result = router5.matchPath(url);
  console.log("result:", JSON.stringify(result));
  return result;
};
const convertMatchToRoute: ConvertMatchToRoute = ({ name, params, queryParams }) => ({
  page: name,
  params,
  queryParams
});

export const router: Router = createRouter({
  routeMatcher,
  convertMatchToRoute,
  toUrl: router5.buildPath,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
