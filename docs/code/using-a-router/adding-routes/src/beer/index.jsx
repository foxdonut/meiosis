import React from "react";

import { combineAll } from "../util";
import { toPath } from "../util/router";

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const beerService = ({ state, update }) => {
  const needToLoadBeers = !state.beers || state.beers.length === 0;

  if (needToLoadBeers) {
    setTimeout(() => update({
      pleaseWait: false,
      beers,
    }), 1000);
  }

  return {
    pleaseWait: needToLoadBeers,
    beers: state.beers || []
  };
};

const beerDetailsService = ({ state }) => {
  const id = state.navigateTo.values.id;
  return { beer: beerMap[id].description };
};

const beerBrewerService = ({ state }) => {
  const id = state.navigateTo.values.id;
  return { brewer: "Brewer of beer " + id };
};

const beerServices = {
  Beer: [ beerService ],
  BeerDetails : [ beerService, beerDetailsService ],
  BeerBrewer : [ beerService, beerDetailsService, beerBrewerService ]
};

export const beer = {
  service: ({ state, update }) => {
    const services = beerServices[state.navigateTo.id] || [];
    return combineAll(services.map(service => service({ state, update })));
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
