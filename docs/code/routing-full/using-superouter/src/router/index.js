import m from "mithril";
import { createMithrilRouter } from "meiosis-routing/router-helper";
import { routeConfig } from "routing-common/src/routes";

export const router = createMithrilRouter({
  m,
  routeConfig
});
