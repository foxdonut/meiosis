import React from "react";

import { toPath } from "../util/router";

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const beer = {
  service: ({ state, update }) => {
    if (state.navigateTo.id === "Beer" ||
        state.navigateTo.id === "BeerDetails" ||
        state.navigateTo.id === "BeerBrewer")
    {
      const needToLoadBeers = !state.beers || state.beers.length === 0;
      const result = {};

      if (needToLoadBeers) {
        setTimeout(() => update({
          pleaseWait: false,
          beers,
        }), 1000);
      }

      result.pleaseWait = needToLoadBeers;
      result.beers = state.beers || [];

      if (state.navigateTo.id === "BeerDetails" ||
          state.navigateTo.id === "BeerBrewer")
      {
        const id = state.navigateTo.values.id;

        result.beer = beerMap[id].description;

        if (state.navigateTo.id === "BeerBrewer") {
          result.brewer = "Brewer of beer " + id;
        }
      }

      return result;
    }
  }
};

const BeerBrewer = ({ state }) => (
  <p>{state.brewer}</p>
);

const beerDetailsComponentMap = {
  BeerBrewer
};

const BeerDetails = ({ state, actions }) => {
  const Component = beerDetailsComponentMap[state.route.id];

  return (
    <div>
      <p>{state.beer}</p>
      {Component && <Component state={state} actions={actions}/> ||
        <a href={toPath({
          id: "BeerBrewer",
          values: { id: state.route.values.id }
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
  const Component = beerComponentMap[state.route.id];

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
