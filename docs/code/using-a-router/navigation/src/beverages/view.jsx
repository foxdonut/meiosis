import React from "react";

import { Route, siblingRoute } from "routing-common/src/routes";

export const Beverages = ({ state, update, route, beveragesId }) =>
  state[beveragesId] && (
    <ul>
      {state[beveragesId].map(beverage =>
        <li key={beverage.id}>
          <a href="javascript://"
            onClick={
              () => update({
                route: siblingRoute(route, [ Route.Beverage({ id: beverage.id }) ])
              })
            }
          >{beverage.title}</a>
        </li>
      )}
    </ul>
  );
