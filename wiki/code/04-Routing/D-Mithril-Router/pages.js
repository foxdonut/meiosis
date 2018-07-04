/* global m, O, href, BeerDetailsPage, CoffeeDetailsPage, HomePage */

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
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

// eslint-disable-next-line no-unused-vars
const createCoffee = navigator => _update => ({
  navigating: (params, navigate) => {
    if (params && params.id) {
      const coffee = coffeeMap[params.id];
      navigate({ coffees, coffee: coffee.description });
    }
    else {
      navigate({ coffees, coffee: O });
    }
  },
  view: vnode => {
    const model = vnode.attrs.model;
    return m("div",
      m("p", "Coffee Page"),
      m("ul",
        model.coffees.map(coffee =>
          m("li", { key: coffee.id },
            m("a", href(navigator.getUrl(CoffeeDetailsPage, { id: coffee.id })),
              coffee.title),
            " ",
            m("button.btn.btn-default.btn-xs", {
              onclick: () =>
                navigator.navigateTo(CoffeeDetailsPage, { id: coffee.id })
            }, coffee.title)
          )
        )
      ),
      model.coffee
    );
  }
});

/* Beer Page */

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const loadBeers = () => new Promise(resolve =>
  setTimeout(() => resolve(beers), 1000));

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

// eslint-disable-next-line no-unused-vars
const createBeer = navigator => update => ({
  navigating: (_params, navigate) => {
    update({ pleaseWait: true });

    loadBeers().then(beers => {
      navigate({ pleaseWait: false, beers });
    });
  },
  view: vnode =>
    m("div",
      m("p", "Beer Page"),
      m("ul",
        vnode.attrs.model.beers.map(beer =>
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

/* Beer Details Page */

// eslint-disable-next-line no-unused-vars
const createBeerDetails = _navigator =>  update => ({
  navigating: (params, navigate) =>
    navigate({ beer: beerMap[params.id].description }),

  view: vnode => m("p", vnode.attrs.model.beer)
});
