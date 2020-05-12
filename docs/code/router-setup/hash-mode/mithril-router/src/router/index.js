import m from "mithril";

const createMithrilRouter = routeConfig => {
  const prefix = "#";
  m.route.prefix = prefix;

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

  const toPath = (id, params = {}) => {
    const path = prefix + pathLookup[id];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(params.queryParams)
    );
  };

  const getRoute = (page, params = {}) => ({
    page,
    params,
    url: toPath(page, params).substring(prefix.length)
  });

  const createMithrilRoutes = ({ App, navigateTo, states, actions }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: (params, url) => navigateTo({ page, params, url }),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  const locationBarSync = path => {
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const effect = state => {
    locationBarSync(state.route.url);
  };

  return {
    createMithrilRoutes,
    locationBarSync,
    getRoute,
    toPath,
    effect
  };
};

export const Route = {
  Home: "Home",
  Login: "Login",
  Settings: "Settings",
  Tea: "Tea",
  TeaDetails: "TeaDetails",
  TeaSearch: "TeaSearch"
};

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea": Route.Tea,
  "/tea/search": Route.TeaSearch,
  "/tea/:id": Route.TeaDetails
};

export const router = createMithrilRouter(routeConfig);

/* you can also npm install meiosis-router-setup and use it as shown below:
import { createMithrilRouter } from "meiosis-router-setup";
export const router = createMithrilRouter({ m, routeConfig });
*/
