import createRouteMatcher from "feather-route-matcher";
import * as queryString from "query-string";
import { createFeatherRouter } from "meiosis-routing/router-helper";

import { Route, routeConfig } from "../routes";

export const router = createFeatherRouter({
  createRouteMatcher,
  queryString,
  routeConfig,
  defaultRoute: [Route.Home()]
});
