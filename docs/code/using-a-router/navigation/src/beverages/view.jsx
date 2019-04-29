import React from "react";

import { Route } from "routing-common/src/routes";

export const Beverages = ({ state, actions, routing, beveragesId }) =>
  state[beveragesId] && (
    <ul>
      {state[beveragesId].map(beverage => (
        <li key={beverage.id}>
          <a
            href="javascript://"
            onClick={() =>
              actions.navigateTo(routing.siblingRoute([Route.Beverage({ id: beverage.id })]))
            }
          >
            {beverage.title}
          </a>
        </li>
      ))}
    </ul>
  );
