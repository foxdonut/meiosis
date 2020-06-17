import { createMithrilRouter } from "../meiosis/router";

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

/*
you can also npm install meiosis-router-setup and use it as shown below:

import m from "mithril";
import { createMithrilRouter } from "meiosis-router-setup";
export const router = createMithrilRouter({ m, routeConfig });

See https://meiosis.js.org/router for details.
*/
