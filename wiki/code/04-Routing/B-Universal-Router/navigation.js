/* global services */
const compose = (f1, f2) => x => f1(f2(x));

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
