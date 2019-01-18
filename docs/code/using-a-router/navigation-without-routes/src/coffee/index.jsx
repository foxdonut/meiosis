import React, { Component } from "react";

import { get } from "../util";

const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffee = {
  onNavigate: {
    CoffeePage: ({ navigation }) => new Promise(resolve => {
      const coffeeId = get(navigation, ["route", "values", "id"]);
      const coffee = coffeeId ? coffeeMap[coffeeId].description : null;

      setTimeout(() => resolve({ coffees, coffee }), 500);
    })
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
