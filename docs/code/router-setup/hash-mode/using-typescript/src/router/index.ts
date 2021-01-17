/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouter5, { State } from "router5";
import { createRouter, Router, RouteMatcher, ConvertMatch } from "meiosis-router-setup";
import * as queryString from "query-string";
import { router5Config, Route } from "router-setup-common/src/router";

type Match = State | null;

const router5 = createRouter5(router5Config, { queryParamsMode: "loose" });
const routeMatcher: RouteMatcher<Match> = router5.matchPath;

const convertMatch: ConvertMatch<Match> = (match: Match) =>
  match ? { page: match.name, params: match.params } : { page: Route.Home, params: {} };

export const router: Router = createRouter({
  routeMatcher,
  convertMatch,
  toUrl: router5.buildPath,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
