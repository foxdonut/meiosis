import React from "react";
import { fold } from "static-tagged-union";

import { Route, siblingRoute } from "routing-common/src/root";
import { T } from "routing-common/src/util";

export const Beverages = ({ state, actions, route, beveragesId }) =>
  T(state[beveragesId], fold({
    Y: beverages => (
      <ul>
        {beverages.map(beverage =>
          <li key={beverage.id}>
            <a href="javascript://"
              onClick={
                () => actions.navigateTo(
                  siblingRoute(route, [ Route.Beverage({ id: beverage.id }) ])
                )
              }
            >{beverage.title}</a>
          </li>
        )}
      </ul>
    )
  }));
