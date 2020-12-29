// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import Mapper from "url-mapper";
import { createRouter } from "meiosis-router-setup";
import queryString from "query-string";
import { routeConfig } from "router-setup-common/src/router";

const urlMapper = Mapper();
const routeMatcher = path => urlMapper.map(path, routeConfig);
const convertMatchToRoute = ({ match, values, queryParams }) => ({
  page: match,
  params: values,
  queryParams
});

export const router = createRouter({
  routeMatcher,
  convertMatchToRoute,
  routeConfig,
  rootPath: "/code/router-setup/history-mode/generic-router/build-with-lib",
  queryString
});

/*
See https://meiosis.js.org/router for details.
*/
