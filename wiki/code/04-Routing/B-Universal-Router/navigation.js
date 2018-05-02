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
  const wrap = action => ctx => {
    action(ctx.params);
    return true;
  };

  const routes = [
    { path: "", name: pages.home.id, action: wrap(navigation.navigateToHome) },
    { path: "/coffee/:id?", name: pages.coffee.id, action: wrap(navigation.navigateToCoffee) },
    { path: "/beer", children: [
      { path: "", name: pages.beer.id, action: wrap(navigation.navigateToBeer) },
      { path: "/:id", name: pages.beerDetails.id, action: wrap(navigation.navigateToBeerDetails) }
    ]}
  ];

  const router = new UniversalRouter(routes);

  const resolveRoute = () => {
    const route = document.location.hash.substring(1);
    router.resolve(route);
  };

  window.onpopstate = resolveRoute;

  const urlGenerator = generateUrls(router);

  const routeSync = model => {
    try {
      const route = urlGenerator(model.page.id, model.params || {});
      if (document.location.hash.substring(1) !== route) {
        window.history.pushState({}, "", "#" + route);
      }
    }
    catch (err) {
      // voluntarily ignore unmapped routes
    }
  };

  return { resolveRoute, routeSync };
};