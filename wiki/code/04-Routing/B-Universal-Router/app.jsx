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
                  onClick={evt => navigation.navigateToHome()}>Home</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={evt => navigation.navigateToCoffee()}>Coffee</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={evt => navigation.navigateToBeer()}>Beer</button>
              </li>
            </ul>
          </nav>
          {component.view(model)}
        </div>
      );
    }
  };
};
