const compose = (f1, f2) => x => f1(f2(x));

const coffees = [
  { id: "c1", description: "Coffee 1" },
  { id: "c2", description: "Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const beerList = [
  { id: "b1", title: "Beer 1" },
  { id: "b2", title: "Beer 2" }
];

// eslint-disable-next-line no-unused-vars
const services =  {
  loadCoffees: () => new Promise(resolve =>
    setTimeout(() => resolve(coffees), 1)
  ),
  loadCoffee: params => new Promise(resolve =>
    setTimeout(() => resolve(coffeeMap[params.id]||""))
  ),
  loadBeer: () => new Promise(resolve =>
    setTimeout(() => resolve(beerList), 1)
  )
};

const pages = {
  home: {
    id: "Home",
    tab: "Home"
  },
  coffee: {
    id: "Coffee",
    tab: "Coffee"
  },
  beer: {
    id: "Beer",
    tab: "Beer"
  },
  beerDetails: {
    id: "BeerDetails",
    tab: "Beer"
  }
};

// eslint-disable-next-line no-unused-vars
const createNavigation = update => {
  const navigate = (page, params = {}) =>
    model => Object.assign(model, { page, params });

  const navigateToCoffee = params => {
    services.loadCoffees().then(coffees => {
      const assignCoffees = model => Object.assign(model, { coffees });
      if (params && params.id) {
        services.loadCoffee(params).then(coffee => {
          const assignCoffee = compose(
            model => Object.assign(model, { coffee: coffee.description }), assignCoffees);
          update(compose(navigate(pages.coffee, params), assignCoffee));
        });
      }
      else {
        update(compose(navigate(pages.coffee, params), assignCoffees));
      }
    });
  };

  const navigateToBeer = () => {
    services.loadBeer().then(beerList => {
      update(compose(navigate(pages.beer), model => Object.assign(model, { beerList })));
    });
  };

  return {
    navigateToHome: params => update(navigate(pages.home, params)),
    navigateToCoffee,
    navigateToBeer,
    navigateToBeerDetails: params => update(navigate(pages.beerDetails, params))
  };
};

// eslint-disable-next-line no-unused-vars
const createRouter = navigation => {
  const mapper = urlMapper();

  const routes = {
    "/": { id: pages.home.id, action: navigation.navigateToHome },
    "/coffee/:id?": { id: pages.coffee.id, action: navigation.navigateToCoffee },
    "/beer": { id: pages.beer.id, action: navigation.navigateToBeer },
    "/beer/:id": { id: pages.beerDetails.id, action: navigation.navigateToBeerDetails }
  };

  const resolveRoute = () => {
    const route = document.location.hash.substring(1);
    const resolved = mapper.map(route, routes);
    if (resolved) {
      resolved.match.action(resolved.values);
    }
  };

  window.onpopstate = resolveRoute;

  const routeMap = Object.keys(routes).reduce((result, route) => {
    result[routes[route].id] = route;
    return result;
  }, {});

  const routeSync = model => {
    const segment = routeMap[model.page.id] || "/";
    const route = mapper.stringify(segment, model.params || {});
    if (document.location.hash.substring(1) !== route) {
      window.history.pushState({}, "", "#" + route);
    }
  };

  return { resolveRoute, routeSync };
};
