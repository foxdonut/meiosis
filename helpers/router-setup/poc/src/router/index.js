import createRouteMatcher from "feather-route-matcher";
import { createRouter } from "meiosis-router-setup";

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

const routeMatcher = createRouteMatcher(routeConfig);

export const router = createRouter({
  routeMatcher,
  rootPath: "/my-server"
});
