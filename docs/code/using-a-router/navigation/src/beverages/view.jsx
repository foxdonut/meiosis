import React from "react";

import { Route } from "routing-common/src/root";

export const Beverages = ({ state, actions, routeIndex }) => (
  <ul>
    {state.beverages.map(beverage =>
      <li key={beverage.id}>
        <a href="javascript://"
          onClick={
            () => actions.navigateToSibling(
              state.routeCurrent, routeIndex, [Route.Beverage({ id: beverage.id })]
            )
          }
        >{beverage.title}</a>
      </li>
    )}
  </ul>
);
