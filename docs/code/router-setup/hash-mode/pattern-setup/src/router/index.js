import createRouteMatcher from "feather-route-matcher";

const createRouter = routeConfig => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const routeMatcher = createRouteMatcher(routeConfig);

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onhashchange = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url;

    if (getPath() !== path) {
      window.location.hash = prefix + path;
    }
  };

  return { initialRoute, routeMatcher, start, locationBarSync };
};

export const Route = {
  Home: "Home",
  Login: "Login",
  Settings: "Settings",
  Tea: "Tea",
  TeaDetails: "TeaDetails",
  NotFound: "NotFound"
};

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea": Route.Tea,
  "/tea/:id": Route.TeaDetails,
  "/*": Route.NotFound
};

export const router = createRouter(routeConfig);
