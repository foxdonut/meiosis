import React, { Component } from "react";

import { CoffeeDetails } from "../coffeeDetails/view";
import { childRoutes, get, head } from "routing-common/src/util";

const componentMap = {
  CoffeeDetails
};

export class Coffee extends Component {
  render() {
    const { state, actions, routes } = this.props;
    const componentId = get(head(routes.routeChildren), ["case"]);
    const Component = componentMap[componentId];

    return (
      <div>
        <p>Coffee Page</p>
        <ul>
          {state.coffees && state.coffees.map(coffee =>
            <li key={coffee.id}>
              <a href="javascript://"
                onClick={() =>
                  actions.deepLink(routes.routeRelative, "CoffeeDetails", { id: coffee.id })
                }
              >{coffee.title}</a>
            </li>
          )}
        </ul>
        {Component && <Component state={state} actions={actions} routes={childRoutes(routes)}/>}
      </div>
    );
  }
}
