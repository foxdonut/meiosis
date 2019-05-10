import m from "mithril";
import { createMithrilRouter } from "meiosis-routing/router-helper";
import { Route, routeConfig } from "routing-common/src/routes";

export const router = createMithrilRouter({
  m,
  routeConfig,
  defaultRoute: [Route.Home()]
});
