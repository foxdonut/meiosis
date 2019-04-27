const beverageRoutes = {
  Beverages: "",
  Beverage: [
    "/:id",
    {
      Brewer: "/brewer"
    }
  ]
};

export const routeConfig = {
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
  Beer: ["/beer", beverageRoutes],
  Invalid: "/:404..."
};
