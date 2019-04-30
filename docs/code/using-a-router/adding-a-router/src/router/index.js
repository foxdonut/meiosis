import { Router } from "./util";
import { Route } from "routing-common/src/routes";

const beverageRoutes = {
  Beverages: "",
  Beverage: [
    "/:id",
    {
      Brewer: "/brewer"
    }
  ]
};

const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: [
    "/tea",
    {
      TeaDetails: "/:id"
    }
  ],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer", beverageRoutes]
};

export const router = Router({
  routeConfig,
  defaultRoute: [Route.Home()]
});
