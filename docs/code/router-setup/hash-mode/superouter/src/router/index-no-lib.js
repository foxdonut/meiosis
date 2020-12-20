import { createRouter } from "../meiosis/router";
import { Route } from "superouter-common/src/router";

export const router = createRouter(Route, Route.of.NotFound({ any: null }));
