/* global m, Meiosis, mergerino, stags, superouter */
const merge = mergerino;
const S = stags;
const { Y, N } = S.Either;
const K = x => () => x;

const BeverageState = S.tags("BeverageState", [
  "None",
  "Loading",
  "Loaded"
]);

// Flat page id (navigation)
/*
const PageId = S.tags("PageId", [
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
*/

// Top-level page
const Page = S.tags("Page", [
  "Home",
  "Login",
  "Settings",
  "Tea", // Tea page has Details: Y/N
  "Coffee", // Coffee page has BeveragePage
  "Beer" // Coffee page has BeveragePage
]);

const BeveragePage = S.tags("BeveragePage", [
  "List",
  "Details" // Details page has Brewer: Y/N
]);

const Route = superouter.type("Route", {
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

// Mapping of PageId -> Page (navigation)
// const pageMapping = PageId.fold({
// Mapping of Route -> Page (router)
const pageMapping = Route.fold({
  Home: K(Page.Home()),
  Login: K(Page.Login()),
  Settings: K(Page.Settings()),
  Tea: K(Page.Tea({ Details: N() })),
  TeaDetails: params => Page.Tea({ Details: Y(params) }),
  Coffee: K(
    Page.Coffee({ BeveragePage: BeveragePage.List() })
  ),
  CoffeeDetails: params =>
    Page.Coffee({
      BeveragePage: BeveragePage.Details(
        Object.assign({ Brewer: N() }, params)
      )
    }),
  CoffeeBrewer: params =>
    Page.Coffee({
      BeveragePage: BeveragePage.Details(
        Object.assign({ Brewer: Y(params) }, params)
      )
    }),
  Beer: K(Page.Beer({ BeveragePage: BeveragePage.List() })),
  BeerDetails: params =>
    Page.Beer({
      BeveragePage: BeveragePage.Details(
        Object.assign({ Brewer: N() }, params)
      )
    }),
  BeerBrewer: params =>
    Page.Beer({
      BeveragePage: BeveragePage.Details(
        Object.assign({ Brewer: Y(params) }, params)
      )
    })
});

const app = {
  initial: {
    route: Route.of.Home(),
    page: Page.Home(),
    routeText: "",
    teas: N(),
    beers: BeverageState.None(),
    coffees: BeverageState.Loaded({ coffees: [] })
  },

  Actions: update => ({
    updateRoute: evt =>
      update({
        routeText: evt.target.value
      }),
    send: routeText => {
      const route = Route.matchOr(
        K(Route.of.Home()),
        routeText
      );
      const page = pageMapping(route);
      update({
        route: K(route),
        page: K(page)
      });
    }
  }),

  services: [
    ({ state }) =>
      S.run(
        state.teas,
        Page.isTea(state.page)
          ? S.bifold(
              K({ state: { teas: Y(["Tea 1", "Tea 2"]) } }),
              K(null)
            )
          : S.bifold(K(null), K({ state: { teas: N() } }))
      )
  ]
};

const App = {
  view: ({ attrs: { state, actions } }) =>
    m(
      "",
      m(
        "",
        "Teas: ",
        S.run(
          state.teas,
          S.bifold(
            () => "None",
            teas => m("ul", teas.map(tea => m("li", tea)))
          )
        )
      ),
      m(
        "",
        "State: ",
        m("pre", JSON.stringify(state, null, 2))
      ),
      m(
        "",
        m(
          "span",
          "route: ",
          m("input", {
            type: "text",
            value: state.routeText,
            oninput: actions.updateRoute
          })
        ),
        m(
          "button.btn.btn-xs.btn-primary",
          { onclick: () => actions.send(state.routeText) },
          "Send"
        )
      )
    )
};

const { states, actions } = Meiosis.mergerino.setup({
  stream: m.stream,
  merge,
  app
});

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
