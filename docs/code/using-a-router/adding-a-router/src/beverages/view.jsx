import React from "react";

import { Route } from "routing-common/src/routes";
import { router } from "../router";

export const Beverages = ({ state, routing, beveragesId }) =>
  (state[beveragesId] && (
    <ul>
      {state[beveragesId].map(beverage => (
        <li key={beverage.id}>
          <a href={router.toPath(routing.siblingRoute([Route.Beverage({ id: beverage.id })]))}>
            {beverage.title}
          </a>
        </li>
      ))}
    </ul>
  )) ||
  null;
