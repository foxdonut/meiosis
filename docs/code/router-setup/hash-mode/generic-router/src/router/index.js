import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

import createRouteMatcher from "feather-route-matcher";

const routeMatcher = createRouteMatcher(routeConfig);

const convertMatch = ({ value, params }) => ({ page: value, params });

export const router = createRouter({
  routeMatcher,
  convertMatch,
  routeConfig,
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
