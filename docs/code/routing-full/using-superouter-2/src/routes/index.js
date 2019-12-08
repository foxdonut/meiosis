import { type } from "superouter";
import { otherwise } from "stags";

const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: "/tea",
  TeaDetails: "/tea/:id",
  Coffee: "/coffee",
  CoffeeDetails: "/coffee/:id",
  CoffeeBrewer: "/coffee/:id/brewer",
  Beer: "/beer",
  BeerDetails: "/beer/:id",
  BeerBrewer: "/beer/:id/brewer"
};

export const Route = type("Route", routeConfig);

export const otherRoutes = otherwise(Object.keys(routeConfig));

export const allRoutes = Object.keys(routeConfig).join(",");
