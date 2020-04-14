import m from "mithril";

const createMithrilRouter = routeConfig => {
  const prefix = "#";
  m.route.prefix = prefix;

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

  const toPath = (id, params = {}) => {
    const path = prefix + pathLookup[id];
    return [...path.matchAll(/(:[^/]*)/g)]
      .map(a => a[1])
      .reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
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

  return {
    createMithrilRoutes,
    initialRoute: { page: "Home", params: {}, url: "/" },
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
  TeaDetails: "TeaDetails"
};

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea": Route.Tea,
  "/tea/:id": Route.TeaDetails
};

export const router = createMithrilRouter(routeConfig);
