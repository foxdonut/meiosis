import React, { Component } from "react";

import { caseOf } from "routing-common/src/util";
import { toPath } from "../util/router";

export class Coffee extends Component {
  render() {
    const { state } = this.props;

    return (
      <div>
        <p>Coffee Page</p>
        <ul>
          {state.coffees && state.coffees.map(coffee =>
            <li key={coffee.id}>
              <a href={toPath(caseOf("CoffeeDetails", { id: coffee.id }))}
              >{coffee.title}</a>
            </li>
          )}
        </ul>
        {state.coffee}
      </div>
    );
  }
}
