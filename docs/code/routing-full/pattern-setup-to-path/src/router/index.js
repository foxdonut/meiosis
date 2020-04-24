import createRouteMatcher from "feather-route-matcher";

const createRouter = routeConfig => {
  const prefix = "#";

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

  const routeMatcher = createRouteMatcher(routeConfig);

  const getRoute = (page, params = {}) => ({
    page,
    params,
    url: toPath(page, params).substring(prefix.length)
  });

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url;

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, getRoute, start, locationBarSync, toPath };
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

export const router = createRouter(routeConfig);
