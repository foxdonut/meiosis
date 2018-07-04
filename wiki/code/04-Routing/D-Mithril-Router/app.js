/* global
m, href, BeerDetailsPage, BeerPage, CoffeeDetailsPage, CoffeePage, HomePage,
createBeer, createBeerDetails, createCoffee, createHome, createNavigator,
createNotFound, tabMap
*/

// eslint-disable-next-line no-unused-vars
const createApp = update => {
  const navigator = createNavigator(update);

  const coffeeComponent = createCoffee(navigator)(update);

  // Register the pages, with the key (page id) the corresponding component,
  // and the route.
  navigator.register([
    { key: HomePage, component: createHome(navigator)(update),
      route: "/" },

    { key: CoffeePage, component: coffeeComponent,
      route: "/coffee" },

    { key: CoffeeDetailsPage, component: coffeeComponent,
      route: "/coffee/:id" },

    { key: BeerPage, component: createBeer(navigator)(update),
      route: "/beer" },

    { key: BeerDetailsPage, component: createBeerDetails(navigator)(update),
      route: "/beer/:id" }
  ], createNotFound(navigator)(update));
  // ^^ Indicate the component to use for when the page is not found.

  return {
    navigator,
    view: vnode => {
      const model = vnode.attrs.model;
      // Get the component and tab for the current page.
      const Component = navigator.getComponent(model.pageId);
      const currentTab = tabMap[model.pageId] || model.pageId;
      const isActive = tab => tab === currentTab ? ".active" : "";

      return (
        m("div",
          m("nav.navbar.navbar-default",
            m("ul.nav.navbar-nav",
              m("li" + isActive(HomePage),
                m("a", href(navigator.getUrl(HomePage)), "Home")
              ),
              m("li" + isActive(CoffeePage),
                m("a", href(navigator.getUrl(CoffeePage)), "Coffee")
              ),
              m("li" + isActive(BeerPage),
                m("a", href(navigator.getUrl(BeerPage)), "Beer")
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigator.navigateTo(HomePage) },
                  "Home"
                )
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigator.navigateTo(CoffeePage) },
                  "Coffee"
                )
              ),
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigator.navigateTo(BeerPage) },
                  "Beer"
                )
              )
            )
          ),
          m(Component, { model }),
          // Show or hide the Please Wait modal. See public/css/style.css
          m("div", { style: { visibility: model.pleaseWait ? "visible" : "hidden" } },
            m("div.modal",
              m("div.box",
                m("p", "Loading, please wait...")
              )
            )
          )
        )
      );
    }
  };
};