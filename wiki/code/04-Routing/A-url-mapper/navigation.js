/* global urlMapper */

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

// eslint-disable-next-line no-unused-vars
const createNavigation = update => {
  const stateNavigator = new Navigation.StateNavigator([
    { key: 'home', route: '' },
    { key: 'coffee' },
    { key: 'beer' },
    { key: 'beerDetails', tab: 'beer' },
  ]);

  const { home, coffee, beer, beerDetails } = stateNavigator.states;
  home.component = createHome(update, stateNavigator);
  coffee.component = createCoffee(update, stateNavigator);
  beer.component = createBeer(update, stateNavigator);
  beerDetails.component = createBeerDetails(update, stateNavigator);

  beer.navigating = (data, url, navigate) => {
    services.loadBeer().then(beerList => {
      navigate({ beerList });
    });
  }

  coffee.navigating = (data, url, navigate) => {
    services.loadCoffees().then(coffees => {
      if (data.id) {
        services.loadCoffee(data).then(coffee => {
          navigate(Object.assign({ coffee: coffee.description }, { coffees }));
        });
      }
      else {
        navigate({ coffees });
      }
    });
  }

  stateNavigator.onNavigate((oldState, state, data, asyncData) => {
    var { data, asyncData, url } = stateNavigator.stateContext;
    update(model => Object.assign(model, data, asyncData, { url }))
  });

  stateNavigator.start();

  const contextSync = ({ url }) => {
    if (url !== undefined && stateNavigator.stateContext.url !== url) {
      var { state, data } = stateNavigator.parseLink(url);
      stateNavigator.stateContext.url = url;
      stateNavigator.stateContext.state = state;
      stateNavigator.stateContext.data = data;
      stateNavigator.historyManager.addHistory(url, false);
    }
  };

  return { stateNavigator, contextSync };
};
