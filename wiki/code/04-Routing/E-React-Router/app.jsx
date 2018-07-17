/* global createBeer, createBeerDetails, createCoffee, createHome, tabMap,
   createNotFound, createNavigator, BeerPage, BeerDetailsPage, CoffeePage,
   HomePage, React, ReactRouterDOM
*/

const { HashRouter, Link, Route, Switch } = ReactRouterDOM;

// eslint-disable-next-line no-unused-vars
const createApp = update => {
  const navigator = createNavigator();

  const routes = navigator.register([
    { key: HomePage, page: createHome(navigator)(update),
      path: "/", exact: true },

    { key: CoffeePage, page: createCoffee(navigator)(update),
      path: "/coffee/:id?" },

    { key: BeerPage, page: createBeer(navigator)(update),
      path: "/beer", exact: true },

    { key: BeerDetailsPage, page: createBeerDetails(navigator)(update),
      path: "/beer/:id" }
  ], createNotFound(navigator)(update));

  return class extends React.Component {
    render() {
      const model = this.props.model;
      const currentTab = tabMap[model.pageId] || model.pageId;
      const isActive = tab => tab === currentTab ? "active" : "";

      return (
        <HashRouter>
          <div>
            <nav className="navbar navbar-default">
              <ul className="nav navbar-nav">
                <li className={isActive(HomePage)}>
                  <Link to={navigator.getUrl(HomePage)}>Home</Link>
                </li>
                <li className={isActive(CoffeePage)}>
                  <Link to={navigator.getUrl(CoffeePage)}>Coffee</Link>
                </li>
                <li className={isActive(BeerPage)}>
                  <Link to={navigator.getUrl(BeerPage)}>Beer</Link>
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
            <Switch>
              {routes.map(route => {
                route.render = props => {
                  props.model = model;
                  return React.createElement(route.page, props);
                };
                return React.createElement(Route, route);
              })}
            </Switch>
          </div>
        </HashRouter>
      );
    }
  };
};