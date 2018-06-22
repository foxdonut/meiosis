/* global m, O, href, HomePage, CoffeePage, BeerDetailsPage */

/* 404 Not Found Page */

// eslint-disable-next-line no-unused-vars
const createNotFound = navigator => _update => ({
  view: _vnode => m("div",
    m("div", "Not Found Page"),
    m("div", "Sorry, we could not find what you were looking 4...04"),
    m("div",
      m("a", href(navigator.getUrl(HomePage)), "Home Page")
    )
  )
});

/* Home Page */

// eslint-disable-next-line no-unused-vars
const createHome = _navigator => _update => ({
  view: _vnode => m("div", "Home Page")
});

/* Coffee Page */

const coffees = [
  { id: "c1", description: "Coffee 1" },
  { id: "c2", description: "Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const loadCoffees = () => new Promise(resolve =>
  setTimeout(() => resolve(coffees), 1));

const loadCoffee = params => new Promise(resolve =>
  setTimeout(() => resolve(coffeeMap[params.id]||"")), 1);

// eslint-disable-next-line no-unused-vars
const createCoffee = navigator => _update => ({
  navigating: (params, navigate) =>
    loadCoffees().then(coffees => {
      if (params && params.id) {
        loadCoffee(params).then(coffee => {
          navigate({ coffees, coffee: coffee.description });
        });
      }
      else {
        navigate({ coffees, coffee: O });
      }
    }),
  view: vnode => {
    const model = vnode.attrs.model;
    return m("div",
      m("p", "Coffee Page"),
      model.coffees.map(coffee => m("span", { key: coffee.id },
        m("a", href(
          navigator.getUrl(CoffeePage) + "?" + m.buildQueryString({ id: coffee.id })
        ), coffee.id),
        " "
      )),
      model.coffee
    );
  }
});

/* Beer Page */

const beerList = [
  { id: "b1", title: "Beer 1" },
  { id: "b2", title: "Beer 2" }
];

const loadBeer = () => new Promise(resolve =>
  setTimeout(() => resolve(beerList), 1));

// eslint-disable-next-line no-unused-vars
const createBeer = navigator => _update => ({
  navigating: (_params, navigate) =>
    loadBeer().then(beerList => navigate({ beerList })),
  view: vnode =>
    m("div",
      m("p", "Beer Page"),
      m("ul",
        vnode.attrs.model.beerList.map(beer =>
          m("li", { key: beer.id },
            m("a", href(navigator.getUrl(BeerDetailsPage, { id: beer.id })),
              beer.title),
            " ",
            m("button.btn.btn-default.btn-xs",
              { onclick: _evt =>
                m.route.set(navigator.getUrl(BeerDetailsPage, { id: beer.id }))
              },
              beer.title
            )
          )
        )
      )
    )
});

// eslint-disable-next-line no-unused-vars
const createBeerDetails = _navigator =>  update => ({
  navigating: (params, navigate) => navigate({ pageId: BeerDetailsPage, params }),
  view: vnode => m("p", "Details of beer ", vnode.attrs.model.params.id)
});
