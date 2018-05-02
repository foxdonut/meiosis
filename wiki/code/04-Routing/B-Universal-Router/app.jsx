/* global pages */

const createBeerDetails = update => ({
  view: model => (<p>Details of beer {model.params.id}</p>)
});

const createBeer = (update, navigation) => {
  const actions = {
    beerDetails: id => _evt => navigation.navigateToBeerDetails({ id }),
  };

  return {
    view: model => (
      <div>
        <p>Beer Page</p>
        <ul>
          {model.beerList.map(beer =>
            <li key={beer.id}>
              <a href={"#/beer/" + beer.id}>{beer.title}</a>
              {" "}
              <button className="btn btn-default btn-xs"
                onClick={actions.beerDetails(beer.id)}>
                {beer.title}
              </button>
            </li>
          )}
        </ul>
      </div>
    )
  };
};

const createCoffee = _update => ({
  view: model => (
    <div>
      <p>Coffee Page</p>
      {model.coffees.map(coffee => <span key={coffee.id}>
        <a href={"#/coffee/" + coffee.id}>{coffee.id}</a>
        {" "}
      </span>)}
      {model.coffee}
    </div>
  )
});

const createHome = _update => ({
  view: _model => (<div>Home Page</div>)
});

// eslint-disable-next-line no-unused-vars
const createApp = (update, navigation) => {
  const homeComponent = createHome(update);
  const coffeeComponent = createCoffee(update);
  const beerComponent = createBeer(update, navigation);
  const beerDetailsComponent = createBeerDetails(update);

  const pageMap = {
    [pages.home.id]: homeComponent,
    [pages.coffee.id]: coffeeComponent,
    [pages.beer.id]: beerComponent,
    [pages.beerDetails.id]: beerDetailsComponent
  };

  return {
    model: () => ({
      page: pages.home,
      params: {}
    }),
    view: model => {
      const currentPageId = pageMap[model.page.id] ? model.page.id : pages.home.id;
      const component = pageMap[currentPageId];
      const currentTab = model.page.tab;
      const isActive = tab => tab === currentTab ? "active" : "";

      return (
        <div>
          <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
              <li className={isActive(pages.home.tab)}>
                <a href="#/">Home</a>
              </li>
              <li className={isActive(pages.coffee.tab)}>
                <a href="#/coffee">Coffee</a>
              </li>
              <li className={isActive(pages.beer.tab)}>
                <a href="#/beer">Beer</a>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigation.navigateToHome()}>Home</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigation.navigateToCoffee()}>Coffee</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigation.navigateToBeer()}>Beer</button>
              </li>
            </ul>
          </nav>
          {component.view(model)}
        </div>
      );
    }
  };
};
