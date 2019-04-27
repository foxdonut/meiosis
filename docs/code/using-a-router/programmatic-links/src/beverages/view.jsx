import React from "react";

import { Route, siblingRoute } from "routing-common/src/routes";

export const Beverages = ({ state, router, route, beveragesId }) =>
  state[beveragesId] && (
    <ul>
      {state[beveragesId].map(beverage => (
        <li key={beverage.id}>
          <a href={router.toPath(siblingRoute(route, [Route.Beverage({ id: beverage.id })]))}>
            {beverage.title}
          </a>
        </li>
      ))}
    </ul>
  );
