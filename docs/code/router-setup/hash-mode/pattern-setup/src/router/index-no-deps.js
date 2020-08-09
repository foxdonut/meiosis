import { routeConfig } from "router-setup-common/src/router";
import { createRouter } from "../meiosis/router";

export const router = createRouter(routeConfig);

/*
Instead of meiosis/router.js,
you can also npm install meiosis-router-setup and use it as shown in index-lib.js.
*/
