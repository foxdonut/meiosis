/* global m, O */

const mlink = { oncreate: m.route.link, onupdate: m.route.link };

// eslint-disable-next-line no-unused-vars
const createHome = update => {
  const page = {
    id: "Home",
    tab: "Home",
    label: "Home"
  };
  const route = "/";

  return {
    href: () => route,
    navigateTo: _params => update({ page }),
    page,
    route,
    view: _vnode => m("div", "Home Page")
  };
};

const coffees = [
  { id: "c1", description: "Coffee 1" },
  { id: "c2", description: "Coffee 2" }
];

const loadCoffees = () => new Promise(resolve =>
  setTimeout(() => resolve(coffees), 1)
);

// eslint-disable-next-line no-unused-vars
const createCoffee = update => {
  const page = {
    id: "Coffee",
    tab: "Coffee",
    label: "Coffee"
  };
  const route = "/coffee";

  return {
    href: () => route,
    navigateTo: _params => loadCoffees().then(coffees => update({ page, coffees })),
    page,
    route,
    view: vnode => {
      const model = vnode.attrs.model;
      return (
        m("div",
          m("p", "Coffee Page"),
          model.coffees.map(
            coffee =>
              m("span", { key: coffee.id },
                m("a", { href: "#/coffee/" + coffee.id }, coffee.id),
                " ",
                model.coffee
              )
          )
        )
      );
    }
  };
};

/*
const Beer = {
  page: {
    id: "Beer",
    tab: "Beer"
  },
  view: _vnode => m("div", "Beer Page")
};
*/

const navigateTo = component => {
  const result = component.navigateTo();
  if (result && typeof result.then === "function") {
    result.then(() => m.redraw());
  }
};

// eslint-disable-next-line no-unused-vars
const createLayout = components => ({
  view: vnode => {
    const model = vnode.attrs.model;
    const currentTab = model.page.tab;
    const isActive = tab => tab === currentTab ? "active" : "";

    return (
      m("div",
        m("nav.navbar.navbar-default",
          m("ul.nav.navbar-nav",
            components.map(component =>
              m("li", { class: isActive(component.page.tab) },
                m("a", O({ href: component.href() }, mlink), component.page.label)
              )
            ),
            components.map(component =>
              m("li.btn",
                m("button.btn.btn-default",
                  { onclick: _evt => navigateTo(component) }, component.page.label)
              )
            )
          )
        ),
        vnode.children
      )
    );
  }
});

/*
const createBeerDetails = _update => ({
  view: model => m("p", "Details of beer ", model.params.id)
});

const createBeer = (update, navigation) => {
  const actions = {
    beerDetails: id => _evt => navigation.navigateToBeerDetails({ id }),
  };

  return {
    view: model =>
      m("div",
        m("p", "Beer Page"),
        m("ul",
          model.beerList.map(beer =>
            m("li", { key: beer.id },
              m("a", { href: "#/beer/" + beer.id }, beer.title),
              " ",
              m("button.btn.btn-default.btn-xs",
                { onclick: actions.beerDetails(beer.id) },
                beer.title
              )
            )
          )
        )
      )
  };
};
*/