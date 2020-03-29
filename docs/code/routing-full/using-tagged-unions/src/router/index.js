import { type as superouter } from "superouter";
import queryString from "query-string";
import { createSuperouter } from "meiosis-router-setup";

import { Route, routeConfig } from "../routes";

export const router = createSuperouter({
  superouter,
  queryString,
  routeConfig,
  defaultRoute: Route.Home()
});
