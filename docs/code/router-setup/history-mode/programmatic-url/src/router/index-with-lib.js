// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import Mapper from "url-mapper";
import { createProgrammaticRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

const urlMapper = Mapper();
const routeMatcher = path => urlMapper.map(path, routeConfig);
const convertMatchToRoute = (match, queryParams) => ({
  page: match.match,
  params: match.values,
  queryParams
});

export const router = createProgrammaticRouter({
  routeMatcher,
  convertMatchToRoute,
  routeConfig,
  rootPath: "/code/router-setup/history-mode/programmatic-url/build-with-lib",
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
