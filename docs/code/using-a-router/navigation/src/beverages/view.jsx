import React from "react";

import { Route } from "routing-common/src/root";

export const Beverages = ({ state, actions, route }) => (
  <ul>
    {state.beverages.map(beverage =>
      <li key={beverage.id}>
        <a href="javascript://"
          onClick={
            () => actions.navigateToSibling(
              route, [Route.Beverage({ id: beverage.id })]
            )
          }
        >{beverage.title}</a>
      </li>
    )}
  </ul>
);
