import { createRouter } from "../meiosis/router";
import { Route } from ".";

export const router = createRouter(Route, Route.of.NotFound({ any: null }));
