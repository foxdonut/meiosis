import { createRouter } from "../meiosis/router";

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

/*
you can also npm install meiosis-router-setup and use it as shown below:


import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import { createFeatherRouter } from "meiosis-router-setup";

export const router = createFeatherRouter({
  createRouteMatcher,
  queryString,
  routeConfig,
  historyMode: true
});

See https://meiosis.js.org/router for details.
*/
