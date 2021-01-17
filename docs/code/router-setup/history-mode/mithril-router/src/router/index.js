// @ts-check
/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown below:
*/

import m from "mithril";
import { createMithrilRouter } from "meiosis-router-setup";
import { routeConfig } from "router-setup-common/src/router";

const rootPath = "/code/router-setup/history-mode/mithril-router/build";
export const router = createMithrilRouter({ m, routeConfig, rootPath });

/*
See https://meiosis.js.org/router for details.
*/
