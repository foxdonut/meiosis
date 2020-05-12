import { createRouter } from "../meiosis/router";
import { TaggedUnionChecked } from "static-tagged-union";

export const Route = TaggedUnionChecked("Route", [
  "Home",
  "Login",
  "Settings",
  "Tea",
  "TeaDetails",
  "TeaSearch"
]);

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea/search": Route.TeaSearch,
  "/tea": Route.Tea,
  "/tea/:id": Route.TeaDetails
};

export const router = createRouter(routeConfig);
