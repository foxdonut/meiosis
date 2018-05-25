/* global m, O */

const mlink = { oncreate: m.route.link, onupdate: m.route.link };

// eslint-disable-next-line no-unused-vars
const createHome = update => {
  const incr = () => update({ counter: O(value => value + 1)});

  return {
    tab: "Home",
    label: "Home",
    routes: ["/"],
    view: vnode => [
      m("div", "Home Page"),
      m("div", "Counter: ", vnode.attrs.model.counter),
      m("div", m("button", { onclick: incr }, "Increment"))
    ]
  };
};

const coffeeData = [
  { id: "c1", description: "Coffee 1" },
  { id: "c2", description: "Coffee 2" }
];

const loadCoffees = () => new Promise(resolve =>
  setTimeout(() => resolve(coffeeData), 1)
);

// eslint-disable-next-line no-unused-vars
const createCoffee = update => ({
  tab: "Coffee",
  label: "Coffee",
  routes: ["/coffee", "/coffee/:id"],
  navigateTo: params => loadCoffees().then(
    coffees => update({ coffees, coffee: params.id ? "Coffee " + params.id : O })
  ),
  view: vnode => {
    const model = vnode.attrs.model;
    return (
      m("div",
        m("p", "Coffee Page"),
        model.coffees.map(
          coffee =>
            m("span", { key: coffee.id },
              m("a", O({ href: "/coffee/" + coffee.id }, mlink), coffee.id)
            )
        ),
        model.coffee
      )
    );
  }
});

const beerData = [
  { id: "b1", title: "Beer 1" },
  { id: "b2", title: "Beer 2" }
];

const loadBeer = () => new Promise(resolve =>
  setTimeout(() => resolve(beerData), 1)
);

// eslint-disable-next-line no-unused-vars
const createBeer = update => ({
  tab: "Beer",
  label: "Beer",
  routes: ["/beer"],
  navigateTo: () => loadBeer().then(beerList => update({ beerList })),
  view: vnode =>
    m("div",
      m("p", "Beer Page"),
      m("ul",
        vnode.attrs.model.beerList.map(beer =>
          m("li", { key: beer.id },
            m("a", O({ href: "/beer/" + beer.id }, mlink), beer.title)
          )
        )
      )
    )
});

// eslint-disable-next-line no-unused-vars
const createBeerDetails = update => ({
  tab: "Beer",
  label: "Beer",
  routes: ["/beer/:id"],
  navigateTo: params => update({ beerId: params.id }),
  view: vnode => m("p", "Details of beer ", vnode.attrs.model.beerId)
});

// eslint-disable-next-line no-unused-vars
const createLayout = pages => ({
  view: vnode => {
    const isActive = tab => tab === vnode.attrs.currentTab ? "active" : "";

    return (
      m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            pages.map(Component =>
              m("li", { class: isActive(Component.tab) },
                m("a", O({ href: Component.routes[0] }, mlink), Component.label)
              )
            )
          )
        ),
        vnode.children
      )
    );
  }
});
