import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { get } from "../util";
import { toPath } from "../util/router";

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
    const { state } = this.props;

    return (<div>
      <p>{state.beer}</p>
      <a href={toPath({ id: "Beer", values: { id: state.route.values.id, brewer: "brewer" } })}
      >Brewer</a>
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
  BeerDetails,
  Brewer
};

export const beer = {
  service: ({ state, update }) => {
    if (state.navigateTo.id === "Beer") {
      const id = get(state, ["navigateTo", "values", "id"]);
      const brewer = get(state, ["navigateTo", "values", "brewer"]);

      setTimeout(() => update({
        pleaseWait: false,
        beers,
        beer: get(beerMap, [id, "description"]),
        brewer: brewer && "Brewer of beer " + id,
        route: PS({
          values: PS({
            child: brewer ? "Brewer" : id ? "BeerDetails" : null
          })
        })
      }), 1000);

      return {
        pleaseWait: true,
        beers: state.beers || []
      };
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
              <a href={toPath({ id: "Beer", values: { id: beer.id } })}
              >{beer.title}</a>
            </li>
          )}
        </ul>
        {Component && <Component state={state} actions={actions}/>}
      </div>
    );
  }
}
