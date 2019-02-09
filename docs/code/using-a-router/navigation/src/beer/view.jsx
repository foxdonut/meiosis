import React from "react";

const BeerBrewer = ({ state }) => (
  <p>{state.brewer}</p>
);

const beerDetailsComponentMap = {
  BeerBrewer
};

const BeerDetails = ({ state, actions }) => {
  const Component = beerDetailsComponentMap[state.routeCurrent.case];

  return (
    <div>
      <p>{state.beer}</p>
      {Component && <Component state={state} actions={actions}/> ||
        <a href="javascript://"
          onClick={() => actions.navigateTo("BeerBrewer", { id: state.routeCurrent.value.id })}
        >Brewer</a>
      }
    </div>
  );
};

const beerComponentMap = {
  BeerDetails,
  BeerBrewer: BeerDetails
};

export const Beer = ({ state, actions }) => {
  const Component = beerComponentMap[state.routeCurrent.case];

  return (
    <div>
      <p>Beer Page</p>
      <ul>
        {state.beers.map(beer =>
          <li key={beer.id}>
            <a href="javascript://"
              onClick={() => actions.navigateTo("BeerDetails", { id: beer.id })}
            >{beer.title}</a>
          </li>
        )}
      </ul>
      {Component && <Component state={state} actions={actions}/>}
    </div>
  );
};
