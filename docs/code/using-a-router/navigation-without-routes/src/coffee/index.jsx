import React, { Component } from "react";

import { T, fold } from "../util";
import { Navigation } from "../util/navigation";

const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffee = {
  service: ({ state, updateState }) => {
    T(state.navigateTo, Navigation.map(navigateTo =>
      T(navigateTo, fold({
        Coffee: ({ id }) => {
          const coffee = id ? coffeeMap[id].description : null;

          setTimeout(() => updateState({
            route: navigateTo,
            navigateTo: Navigation.N(),
            coffees,
            coffee
          }), 500);
        }
      }))
    ));
  }
};

export class Coffee extends Component {
  render() {
    const { state, actions } = this.props;

    return (
      <div>
        <p>Coffee Page</p>
        <ul>
          {state.coffees.map(coffee =>
            <li key={coffee.id}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("CoffeePage", coffee.id)}
              >{coffee.title}</a>
            </li>
          )}
        </ul>
        {state.coffee}
      </div>
    );
  }
}
