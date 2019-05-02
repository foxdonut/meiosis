import { Router } from "./util";
import { Route, routeConfig } from "routing-common/src/routes";

export const router = Router({
  routeConfig,
  defaultRoute: [Route.Home()]
});
