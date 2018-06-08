/* global preventDefault */
/* global createBeer, createBeerDetails, createCoffee, createHome */
/* global createNavigator, BeerPage, BeerDetailsPage, CoffeePage, HomePage */

// eslint-disable-next-line no-unused-vars
const createApp = update => {
  const navigator = createNavigator(update);

  navigator.register([
    { key: HomePage, component: createHome(navigator)(update),
      route: "/" },

    { key: CoffeePage, component: createCoffee(navigator)(update),
      route: "/coffee/{id?}" },

    { key: BeerPage, component: createBeer(navigator)(update),
      route: "/beer" },

    { key: BeerDetailsPage, component: createBeerDetails(navigator)(update),
      route: "/beer/{id}", tab: BeerPage }
  ]);

  return {
    navigator,
    view: model => {
      const component = navigator.getComponent(model.pageId);
      const currentTab = model.tab;
      const isActive = tab => tab === currentTab ? "active" : "";

      return (
        <div>
          <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
              <li className={isActive(HomePage)}>
                <a href={navigator.getUrl(HomePage)}
                  onClick={preventDefault(() => navigator.navigateTo(HomePage))}
                >Home</a>
              </li>
              <li className={isActive(CoffeePage)}>
                <a href={navigator.getUrl(CoffeePage)}
                  onClick={preventDefault(() => navigator.navigateTo(CoffeePage))}
                >Coffee</a>
              </li>
              <li className={isActive(BeerPage)}>
                <a href={navigator.getUrl(BeerPage)}
                  onClick={preventDefault(() => navigator.navigateTo(BeerPage))}
                >Beer</a>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigator.navigateTo(HomePage)}>Home</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigator.navigateTo(CoffeePage)}>Coffee</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => navigator.navigateTo(BeerPage)}>Beer</button>
              </li>
            </ul>
          </nav>
          {component && component.view(model)}
        </div>
      );
    }
  };
};