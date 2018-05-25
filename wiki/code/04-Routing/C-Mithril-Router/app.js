/* global m, O, pathToRegexp */

const mlink = { oncreate: m.route.link, onupdate: m.route.link };

const addHref = pageObject => {
  pageObject.href = pathToRegexp.compile(pageObject.route);
  return pageObject;
};

const HomePage = addHref({
  tab: "Home",
  label: "Home",
  route: "/"
});

// eslint-disable-next-line no-unused-vars
const createHome = update => O({
  view: _vnode => m("div", "Home Page")
}, HomePage);

const coffees = [
  { id: "c1", description: "Coffee 1" },
  { id: "c2", description: "Coffee 2" }
];

const loadCoffees = () => new Promise(resolve =>
  setTimeout(() => resolve(coffees), 1)
);

const CoffeePage = addHref({
  tab: "Coffee",
  label: "Coffee",
  route: "/coffee/:id"
});

const coffeeView = model =>
  m("div",
    m("p", "Coffee Page"),
    model.coffees.map(
      coffee =>
        m("span", { key: coffee.id },
          m("a", O({ href: CoffeePage.href({ id: coffee.id }) }, mlink), coffee.id)
        )
    ),
    model.coffee
  );

// eslint-disable-next-line no-unused-vars
const createCoffee = update => O({
  navigateTo: params => loadCoffees().then(
    coffees => update({ coffees, coffee: "Coffee " + params.id })
  ),
  view: vnode => coffeeView(vnode.attrs.model)
}, CoffeePage);

const CoffeesPage = addHref({
  tab: "Coffee",
  label: "Coffee",
  route: "/coffee"
});

// eslint-disable-next-line no-unused-vars
const createCoffees = update => {
  return O({
    navigateTo: _params => loadCoffees().then(coffees => update({ coffees, coffee: O })),
    view: vnode => coffeeView(vnode.attrs.model)
  }, CoffeesPage);
};

// eslint-disable-next-line no-unused-vars
const Layout = {
  view: vnode => {
    const isActive = tab => tab === vnode.attrs.currentTab ? "active" : "";

    return (
      m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            [HomePage, CoffeesPage].map(Component =>
              m("li", { class: isActive(Component.tab) },
                m("a", O({ href: Component.href() }, mlink), Component.label)
              )
            )
          )
        ),
        vnode.children
      )
    );
  }
};
