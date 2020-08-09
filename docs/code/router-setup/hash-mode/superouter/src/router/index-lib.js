import { createRouter } from "../meiosis/router";
import { type } from "superouter";

const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: "/tea",
  TeaDetails: "/tea/:id",
  TeaSearch: "/tea/search"
};

export const Route = type("Route", routeConfig);

export const routes = keys => fn =>
  keys.reduce((result, key) => Object.assign(result, { [key]: fn }), {});

export const allRoutes = routes(Object.keys(routeConfig));

export const router = createRouter(Route, Route.of.Home());
