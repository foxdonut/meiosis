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

  const toPath = (id, params = {}, queryParams = {}) => {
    const path = prefix + pathLookup[id];

    return (
      [...path.matchAll(/(:[^/]*)/g)]
        .map(a => a[1])
        .reduce(
          (result, pathParam) =>
            result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
          path
        ) + getQueryString(queryParams)
    );
  };

  const getRoute = (page, params = {}, queryParams = {}) => ({
    page,
    params,
    url: toPath(page, params, queryParams).substring(prefix.length)
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

  return {
    createMithrilRoutes,
    locationBarSync,
    getRoute,
    toPath
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
