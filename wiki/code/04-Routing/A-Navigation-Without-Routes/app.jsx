/* global createBeer, createBeerDetails, createCoffee, createHome, tabMap,
   createNavigator, BeerPage, BeerDetailsPage, CoffeePage, HomePage, React
*/

// eslint-disable-next-line no-unused-vars
const createApp = update => {
  const navigator = createNavigator(update);

  navigator.register([
    { key: HomePage, component: createHome(navigator)(update) },
    { key: CoffeePage, component: createCoffee(navigator)(update) },
    { key: BeerPage, component: createBeer(navigator)(update) },
    { key: BeerDetailsPage, component: createBeerDetails(navigator)(update) }
  ]);

  return {
    navigator,
    view: model => {
      const component = navigator.getComponent(model.pageId);
      const currentTab = tabMap[model.pageId] || model.pageId;
      const isActive = tab => tab === currentTab ? "active" : "";

      return (
        <div>
          <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
              <li className={isActive(HomePage)}>
                <a href={navigator.blankHref}
                  onClick={() => navigator.navigateTo(HomePage)}
                >Home</a>
              </li>
              <li className={isActive(CoffeePage)}>
                <a href={navigator.blankHref}
                  onClick={() => navigator.navigateTo(CoffeePage)}
                >Coffee</a>
              </li>
              <li className={isActive(BeerPage)}>
                <a href={navigator.blankHref}
                  onClick={() => navigator.navigateTo(BeerPage)}
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
          {component.view(model)}
          <div style={{visibility: model.pleaseWait ? "visible" : "hidden"}}>
            <div className="modal">
              <div className="box">
                <p>Loading, please wait...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
};