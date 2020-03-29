import { createRouteSegments } from "meiosis-router-setup";

export const Route = createRouteSegments([
  "Home",
  "Login",
  "Settings",
  "Tea",
  "TeaDetails",
  "Coffee",
  "Beer",
  "Beverages",
  "Beverage",
  "Brewer",
  "NotFound"
]);

const teaPath = "/tea";
const beerPath = "/beer?type&country";

export const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: teaPath,
  TeaDetails: teaPath + "/:id",
  Coffee: "/coffee",
  CoffeeBeverage: "/coffee/:id",
  CoffeeBrewer: "/coffee/:id/brewer",
  Beer: beerPath,
  BeerBeverage: `${beerPath}/:id`,
  BeerBrewer: `${beerPath}/:id/brewer`
};
