/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import createRouter5 from "router5";
import {
  createProgrammaticRouter,
  ProgrammaticRouter,
  RouteMatcher,
  ConvertMatchToRoute
} from "meiosis-router-setup";
import * as queryString from "query-string";
import { router5Config } from "router-setup-common/src/router";

const router5 = createRouter5(router5Config);

const routeMatcher: RouteMatcher = router5.matchPath;
const convertMatchToRoute: ConvertMatchToRoute = ({ match, queryParams }) => ({
  page: match.name,
  params: match.params,
  queryParams
});

export const router: ProgrammaticRouter = createProgrammaticRouter({
  routeMatcher,
  convertMatchToRoute,
  toUrl: router5.buildPath,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
