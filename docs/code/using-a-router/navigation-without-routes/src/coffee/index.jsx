import React, { Component } from "react";

const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

/*
const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});
*/

export const coffee = {
  onNavigateTo: () => new Promise(resolve =>
    setTimeout(() => resolve({ coffees }), 500)
  )
};

export class Coffee extends Component {
  render() {
    const { state } = this.props;

    return (
      <div>
        <p>Coffee Page</p>
        <ul>
          {state.coffees.map(coffee =>
            <li key={coffee.id}>
              <a href="#"
                onClick={() => null /*navigator.navigateTo(CoffeePage, { id: coffee.id })*/}
              >{coffee.title}</a>
              <button className="btn btn-default btn-xs"
                onClick={() => null /*
                navigator.navigateTo(CoffeePage, { id: coffee.id })*/}>
                {coffee.title}
              </button>
            </li>
          )}
        </ul>
        {state.coffee}
      </div>
    );
  }
}
