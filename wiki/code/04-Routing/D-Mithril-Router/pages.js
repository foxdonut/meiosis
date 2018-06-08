/* global m, href, compose, CoffeePage, BeerPage, BeerDetailsPage */

/* Home Page */

// eslint-disable-next-line no-unused-vars
const createHome = _navigator => _update => ({
  view: _model => m("div", "Home Page")
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
const createCoffee = navigator => update => ({
  navigating: params =>
    loadCoffees().then(coffees => {
      const assignCoffees = model => Object.assign(model, {
        pageId: CoffeePage,
        params,
        coffees
      });

      if (params && params.id) {
        return loadCoffee(params).then(coffee => {
          update(compose(assignCoffees,
            model => Object.assign(model, { coffee: coffee.description })));
        });
      }
      else {
        update(assignCoffees);
      }
    }),
  view: model =>
    m("div",
      m("p", "Coffee Page"),
      model.coffees.map(coffee => m("span", { key: coffee.id },
        m("a", href(
          navigator.getUrl(CoffeePage) + "?" + m.buildQueryString({ id: coffee.id })
        ), coffee.id),
        " "
      )),
      model.coffee
    )
});

/* Beer Page */

const loadBeer = () => new Promise(resolve =>
  setTimeout(() => resolve(beerList), 1));

const beerList = [
  { id: "b1", title: "Beer 1" },
  { id: "b2", title: "Beer 2" }
];

// eslint-disable-next-line no-unused-vars
const createBeer = navigator => update => ({
  navigating: _params =>
    loadBeer().then(beerList => {
      update(model => Object.assign(model, { pageId: BeerPage, beerList }));
    }),
  view: model =>
    m("div",
      m("p", "Beer Page"),
      m("ul",
        model.beerList.map(beer =>
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
  navigating: params =>
    update(model => Object.assign(model, { pageId: BeerDetailsPage, params })),
  view: model => m("p", "Details of beer ", model.params.id)
});
