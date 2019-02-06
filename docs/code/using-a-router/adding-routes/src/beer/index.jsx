import React from "react";
import { PS } from "patchinko/explicit";

import { onChange } from "../util";
import { toPath } from "../util/router";

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const beerService = (state, update) => {
  const needToLoadBeers = !state.beers || state.beers.length === 0;

  update({
    route: PS({ next: state.route.request }),
    pleaseWait: needToLoadBeers,
    beers: state.beers || []
  });

  if (needToLoadBeers) {
    setTimeout(() => update({
      pleaseWait: false,
      beers,
    }), 1000);
  }
};

const beerDetailsService = (state, update) => {
  const id = state.route.request.values.id;
  update({ beer: beerMap[id].description });
};

const beerBrewerService = (state, update) => {
  const id = state.route.request.values.id;
  update({ brewer: "Brewer of beer " + id });
};

const beerServices = {
  Beer: [ beerService ],
  BeerDetails : [ beerService, beerDetailsService ],
  BeerBrewer : [ beerService, beerDetailsService, beerBrewerService ]
};

export const beer = {
  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      const services = beerServices[state.route.request.id] || [];
      services.forEach(service => service(state, update));
    });
  }
};

const BeerBrewer = ({ state }) => (
  <p>{state.brewer}</p>
);

const beerDetailsComponentMap = {
  BeerBrewer
};

const BeerDetails = ({ state, actions }) => {
  const Component = beerDetailsComponentMap[state.route.current.id];

  return (
    <div>
      <p>{state.beer}</p>
      {Component && <Component state={state} actions={actions}/> ||
        <a href={toPath({
          id: "BeerBrewer",
          values: { id: state.route.current.values.id }
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
  const Component = beerComponentMap[state.route.current.id];

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
