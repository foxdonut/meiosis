/* global BeerDetailsPage, CoffeePage, HomePage, React */

/* 404 Not Found Page */

// eslint-disable-next-line no-unused-vars
const createNotFound = navigator => _update => ({
  view: _model => (<div>
    <div>Not Found Page</div>
    <div>Sorry, we could not find what you were looking 4...04</div>
    <div>
      <a href={navigator.getUrl(HomePage)}>Home Page</a>
    </div>
  </div>)
});

/* Home Page */

// eslint-disable-next-line no-unused-vars
const createHome = _navigator => _update => ({
  view: _model => (<div>Home Page</div>)
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
const createCoffee = navigator => update => ({
  navigating: (params, _url, navigate) => {
    if (params && params.id) {
      const coffee = coffeeMap[params.id];
      navigate({ coffees, coffee: coffee.description });
    }
    else {
      navigate({ coffees, coffee: null });
    }
  },
  view: model => (
    <div>
      <p>Coffee Page</p>
      <ul>
        {model.coffees.map(coffee =>
          <li key={coffee.id}>
            <a href={navigator.getUrl(CoffeePage, { id: coffee.id })}
            >{coffee.title}</a>
            {" "}
            <button className="btn btn-default btn-xs"
              onClick={() =>
                navigator.navigateTo(CoffeePage, { id: coffee.id })}>
              {coffee.title}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
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
  navigating: (_params, _url, navigate) => {
    update(model => Object.assign(model, { pleaseWait: true }));

    loadBeers().then(beers => {
      navigate({ pleaseWait: false, beers });
    });
  },
  view: model => (
    <div>
      <p>Beer Page</p>
      <ul>
        {model.beers.map(beer =>
          <li key={beer.id}>
            <a href={navigator.getUrl(BeerDetailsPage, { id: beer.id })}
            >{beer.title}</a>
            {" "}
            <button className="btn btn-default btn-xs"
              onClick={() =>
                navigator.navigateTo(BeerDetailsPage, { id: beer.id })}>
              {beer.title}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
});

/* Beer Details Page */

// eslint-disable-next-line no-unused-vars
const createBeerDetails = _navigator =>  _update => ({
  navigating: (params, _url, navigate) =>
    navigate({ beer: beerMap[params.id].description }),

  view: model => (<p>Details of beer {model.beerId}</p>)
});
