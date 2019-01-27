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

const BeerDetails = ({ state }) => (
  <div>
    <p>{state.beer}</p>
    <a href={toPath({ id: "BeerBrewer", values: { id: state.route.values.id } })}
    >Brewer</a>
  </div>
);

const BeerBrewer = ({ state }) => (
  <p>{state.brewer}</p>
);

const componentMap = {
  BeerDetails,
  BeerBrewer
};

export const beer = {
  service: ({ state, update }) => {
    if (state.navigateTo.id === "Beer") {
      setTimeout(() => update({
        pleaseWait: false,
        beers,
      }), 1000);

      return {
        pleaseWait: true,
        beers: state.beers || []
      };
    }
    else if (state.navigateTo.id === "BeerDetails") {
      const id = state.navigateTo.values.id;

      return {
        beer: beerMap[id].description
      };
    }
    else if (state.navigateTo.id === "BeerBrewer") {
      const id = state.navigateTo.values.id;

      return {
        brewer: "Brewer of beer " + id
      };
    }
  }
};

export const Beer = ({ state, actions }) => {
  const Component = componentMap[state.route.id];

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
