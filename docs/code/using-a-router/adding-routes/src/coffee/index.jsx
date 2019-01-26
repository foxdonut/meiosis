import React, { Component } from "react";

import { get } from "../util";
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
  service: ({ state, update }) => {
    if (state.navigateTo.id === "Coffee") {
      const id = get(state, ["navigateTo", "values", "id"]);
      const coffee = id ? coffeeMap[id].description : null;

      setTimeout(() => update({
        coffees,
        coffee
      }), 500);
    }
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
              <a href={toPath({ id: "Coffee", values: { id: coffee.id } })}
              >{coffee.title}</a>
            </li>
          )}
        </ul>
        {state.coffee}
      </div>
    );
  }
}
