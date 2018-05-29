/* global pages */

const createBeerDetails = (update, stateNavigator) => ({
  view: model => (<p>Details of beer {model.id}</p>)
});

const createBeer = (update, stateNavigator) => {
  const actions = {
    beerDetails: id => _evt => stateNavigator.navigate("beerDetails", { id }),
  };

  return {
    view: model => (
      <div>
        <p>Beer Page</p>
        <ul>
          {model.beerList.map(beer =>
            <li key={beer.id}>
              <a href={`#${stateNavigator.getNavigationLink("beerDetails", { id: beer.id })}`}>
                {beer.title}
              </a>
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

const createCoffee = (update, stateNavigator) => ({
  view: model => (
    <div>
      <p>Coffee Page</p>
      {model.coffees.map(coffee => <span key={coffee.id}>
        <a href={`#${stateNavigator.getNavigationLink("coffee", { id: coffee.id })}`}>
          {coffee.id}
        </a>
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
const createApp = (update, stateNavigator) => {
  return {
    view: model => {
      var state = stateNavigator.stateContext.state;
      if (!state) return null;
      const isActive = tab => tab === state.key ? "active" : "";
      return (
        <div>
          <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
              <li className={isActive("home")}>
                <a href="#/">Home</a>
              </li>
              <li className={isActive("coffee")}>
                <a href="#/coffee">Coffee</a>
              </li>
              <li className={isActive("beer")}>
                <a href="#/beer">Beer</a>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => stateNavigator.navigate("home")}>Home</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => stateNavigator.navigate("coffee")}>Coffee</button>
              </li>
              <li className="btn">
                <button className="btn btn-default"
                  onClick={_evt => stateNavigator.navigate("beer")}>Beer</button>
              </li>
            </ul>
          </nav>
          {state.component.view(model)}
        </div>
      );
    }
  };
};
