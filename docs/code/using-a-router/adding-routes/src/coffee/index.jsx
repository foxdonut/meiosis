import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { onChange } from "../util";
import { toPath } from "../util/router";

const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffee = {
  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Coffee") {
        setTimeout(() => update({
          route: PS({ next: state.route.request }),
          coffees
        }), 500);
      }
      else if (state.route.request.id === "CoffeeDetails") {
        const id = state.route.request.values.id;
        const coffee = coffeeMap[id].description;

        update({
          route: PS({ next: state.route.request }),
          coffee
        });
      }
    });
  }
};

export class Coffee extends Component {
  render() {
    const { state } = this.props;

    return (
      <div>
        <p>Coffee Page</p>
        <ul>
          {state.coffees && state.coffees.map(coffee =>
            <li key={coffee.id}>
              <a href={toPath({ id: "CoffeeDetails", values: { id: coffee.id } })}
              >{coffee.title}</a>
            </li>
          )}
        </ul>
        {state.coffee}
      </div>
    );
  }
}
