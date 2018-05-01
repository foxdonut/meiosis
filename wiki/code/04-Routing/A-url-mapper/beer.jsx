// eslint-disable-next-line no-unused-vars
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
