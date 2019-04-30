import m from "mithril";
import { createRouter } from "meiosis-routing/router-helper";

export const Router = ({ routeConfig, defaultRoute }) => {
  const router = createRouter({ routeConfig, defaultRoute, prefix: "#!" });

  router.MithrilRoutes = ({ states, actions, App }) =>
    Object.entries(router.routeMap).reduce((result, [path, fn]) => {
      result[path] = {
        onmatch: value => actions.navigateTo(fn(value)),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  return router;
};
