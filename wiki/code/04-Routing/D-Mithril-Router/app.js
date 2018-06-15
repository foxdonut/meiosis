/* global m, href, createNotFound, createBeer, createBeerDetails, createCoffee,
   createHome, createNavigator, BeerPage, BeerDetailsPage, CoffeePage, HomePage,
   tabMap
*/

// eslint-disable-next-line no-unused-vars
const createApp = update => {
  const navigator = createNavigator(update);

  navigator.register([
    { key: HomePage, component: createHome(navigator)(update),
      route: "/" },

    { key: CoffeePage, component: createCoffee(navigator)(update),
      route: "/coffee" },

    { key: BeerPage, component: createBeer(navigator)(update),
      route: "/beer" },

    { key: BeerDetailsPage, component: createBeerDetails(navigator)(update),
      route: "/beer/:id" }
  ], createNotFound(navigator)(update));

  return {
    navigator,
    view: vnode => {
      const model = vnode.attrs.model;
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
          m(Component, { model })
        )
      );
    }
  };
};