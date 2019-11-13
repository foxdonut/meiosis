import { type } from "superouter";

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
