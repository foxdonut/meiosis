import { type } from "superouter";
import { otherwise } from "stags";

export const Route = type("Route", {
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
});

export const otherRoutes = otherwise([
  "Home",
  "Login",
  "Settings",
  "Tea",
  "TeaDetails",
  "Coffee",
  "CoffeeDetails",
  "CoffeeBrewer",
  "Beer",
  "BeerDetails",
  "BeerBrewer"
]);
