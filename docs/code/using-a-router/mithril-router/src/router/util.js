import m from "mithril";
import { createRouter } from "meiosis-routing/router-helper";

export const Router = ({ routeConfig, defaultRoute }) => {
  const queryString = { stringify: m.buildQueryString };
  const router = createRouter({ queryString, routeConfig, defaultRoute, prefix: "#!" });

  router.MithrilRoutes = ({ states, actions, App }) =>
    Object.entries(router.routeMap).reduce((result, [path, fn]) => {
      result[path] = {
        onmatch: params => actions.navigateTo(fn(params)),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  return router;
};
