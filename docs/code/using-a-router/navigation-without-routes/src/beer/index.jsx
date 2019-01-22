import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { get } from "../util";

const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const beerMap = beers.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

class BeerDetails extends Component {
  render() {
    const { state, actions } = this.props;

    return (<div>
      <p>{state.beer}</p>
      <a href="javascript://"
        onClick={() => actions.navigateTo("BeerPage", state.beer.id)}>Brewer</a>
    </div>);
  }
}

class Brewer extends Component {
  render() {
    const { state } = this.props;

    return (
      <p>{state.brewer}</p>
    );
  }
}

const componentMap = {
  BeerDetailsPage: BeerDetails,
  BrewerPage: Brewer
};

export const beer = {
  service: ({ state, updateState }) => {
    if (get(state, ["navigateTo", "id"]) === "Beer") {
      updateState({
        pleaseWait: true,
        beers: state.beers || []
      });
      const id = get(state, ["navigateTo", "values", "id"]);
      setTimeout(() => updateState({
        pleaseWait: false,
        beers,
        beer: get(beerMap, [id, "description"]),
        route: PS({
          values: PS({
            child: id ? "BeerDetailsPage" : null
          })
        })
      }), 1000);
    }
  }
};

export class Beer extends Component {
  render() {
    const { state, actions } = this.props;
    const Component = componentMap[get(state, ["route", "values", "child"])];

    return (
      <div>
        <p>Beer Page</p>
        <ul>
          {state.beers.map(beer =>
            <li key={beer.id}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("BeerPage", beer.id)}
              >{beer.title}</a>
            </li>
          )}
        </ul>
        {Component && <Component state={state} actions={actions}/>}
      </div>
    );
  }
}
