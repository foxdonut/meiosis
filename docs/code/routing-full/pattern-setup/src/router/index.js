import createRouteMatcher from "feather-route-matcher";

const createRouter = routeConfig => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const getRoute = createRouteMatcher(routeConfig);

  const initialRoute = getRoute(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(getRoute(getPath()));
  };

  const locationBarSync = path => {
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, getRoute, start, locationBarSync };
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
