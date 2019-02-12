import React, { Component } from "react";

export class Coffee extends Component {
  render() {
    const { state, actions } = this.props;

    return (
      <div>
        <p>Coffee Page</p>
        <ul>
          {state.coffees && state.coffees.map(coffee =>
            <li key={coffee.id}>
              <a href="javascript://"
                onClick={() =>
                  actions.deepLink(state, "CoffeeDetails", { id: coffee.id })
                }
              >{coffee.title}</a>
            </li>
          )}
        </ul>
        {state.coffee}
      </div>
    );
  }
}
