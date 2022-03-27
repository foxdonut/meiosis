// @ts-check
import Mapper from "url-mapper";
import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

const urlMapper = Mapper();
const routeMatcher = path => urlMapper.map(path, routeConfig);
const convertMatch = ({ match, values }) => ({ page: match, params: values });

export const router = createRouter({
  routeMatcher,
  convertMatch,
  routeConfig,
  rootPath: "/code/router-setup/history-mode/generic-router/build",
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
