import { createRouter } from "../util/router";

const routeMap = {
  Home: "/",
  Coffee: "/coffee",
  CoffeeDetails: "/coffee/:id",
  Beer: "/beer",
  BeerDetails: "/beer/:id"
};

export const routing = createRouter(routeMap, "#");
