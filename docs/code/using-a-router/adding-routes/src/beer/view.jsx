import React from "react";

import { toPath } from "../util/router";

const BeerBrewer = ({ state }) => (
  <p>{state.brewer}</p>
);

const beerDetailsComponentMap = {
  BeerBrewer
};

const BeerDetails = ({ state, actions }) => {
  const Component = beerDetailsComponentMap[state.routeCurrent.id];

  return (
    <div>
      <p>{state.beer}</p>
      {Component && <Component state={state} actions={actions}/> ||
        <a href={toPath({
          id: "BeerBrewer",
          values: { id: state.routeCurrent.values.id }
        })}>Brewer</a>
      }
    </div>
  );
};

const beerComponentMap = {
  BeerDetails,
  BeerBrewer: BeerDetails
};

export const Beer = ({ state, actions }) => {
  const Component = beerComponentMap[state.routeCurrent.id];

  return (
    <div>
      <p>Beer Page</p>
      <ul>
        {state.beers.map(beer =>
          <li key={beer.id}>
            <a href={toPath({ id: "BeerDetails", values: { id: beer.id } })}
            >{beer.title}</a>
          </li>
        )}
      </ul>
      {Component && <Component state={state} actions={actions}/>}
    </div>
  );
};
