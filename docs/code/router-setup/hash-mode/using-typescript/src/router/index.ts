import createRouter5, { State } from "router5";
import { createRouter, Router, RouteMatcher, ConvertMatch } from "meiosis-router-setup";
import * as queryString from "query-string";

type Match = State | null;

export const Route = {
  Home: "Home",
  Login: "Login",
  Settings: "Settings",
  Tea: "Tea",
  TeaDetails: "TeaDetails",
  TeaSearch: "TeaSearch",
  NotFound: "NotFound"
};

const router5Config = [
  { path: "/", name: Route.Home },
  { path: "/login", name: Route.Login },
  { path: "/settings", name: Route.Settings },
  { path: "/tea/search?type", name: Route.TeaSearch },
  { path: "/tea", name: Route.Tea },
  { path: "/tea/:id", name: Route.TeaDetails }
];

const router5 = createRouter5(router5Config, { queryParamsMode: "loose" });
const routeMatcher: RouteMatcher<Match> = router5.matchPath;

const convertMatch: ConvertMatch<Match> = (match: Match) =>
  match ? { page: match.name, params: match.params } : { page: Route.Home, params: {} };

export const router: Router = createRouter({
  routeMatcher,
  convertMatch,
  toUrl: router5.buildPath,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
