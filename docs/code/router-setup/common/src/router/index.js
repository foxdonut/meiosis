export const Route = {
  Home: "Home",
  Login: "Login",
  Settings: "Settings",
  Tea: "Tea",
  TeaDetails: "TeaDetails",
  TeaSearch: "TeaSearch",
  NotFound: "NotFound"
};

export const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea/search": Route.TeaSearch,
  "/tea": Route.Tea,
  "/tea/:id": Route.TeaDetails,
  "/:404...": Route.NotFound,
  "/*": Route.NotFound
};

export const router5Config = [
  { path: "/", name: Route.Home },
  { path: "/login", name: Route.Login },
  { path: "/settings", name: Route.Settings },
  { path: "/tea/search", name: Route.TeaSearch },
  { path: "/tea", name: Route.Tea },
  { path: "/tea/:id", name: Route.TeaDetails }
];
