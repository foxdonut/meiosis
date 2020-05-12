import createRouteMatcher from "feather-route-matcher";

const createRouter = routeConfig => {
  const prefix = window.location.pathname;

  const getPath = () => decodeURI(window.location.pathname).substring(prefix.length) || "/";

  const routeMatcher = createRouteMatcher(routeConfig);

  const initialRoute = routeMatcher(getPath());

  const getHref = path => {
    const url = prefix + path;

    return {
      href: url,
      onclick: evt => {
        evt.preventDefault();
        window.history.pushState({}, "", url);
        window.onpopstate();
      }
    };
  };

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url;

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const effect = state => {
    locationBarSync(state.route);
  };

  return { initialRoute, routeMatcher, getHref, start, locationBarSync, effect };
};

export const Route = {
  Home: "Home",
  Login: "Login",
  Settings: "Settings",
  Tea: "Tea",
  TeaDetails: "TeaDetails",
  TeaSearch: "TeaSearch",
  NotFound: "NotFound"
};

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea/search": Route.TeaSearch,
  "/tea": Route.Tea,
  "/tea/:id": Route.TeaDetails,
  "/*": Route.NotFound
};

export const router = createRouter(routeConfig);

/* you can also npm install meiosis-router-setup and use it as shown below:
import { createFeatherRouter } from "meiosis-router-setup";
export const router = createFeatherRouter({ createRouteMatcher, routeConfig, historyMode: true });
*/
