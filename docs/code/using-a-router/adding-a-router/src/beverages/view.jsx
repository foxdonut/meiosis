import React from "react";

import { Route } from "routing-common/src/routes";
import { router } from "../router";

export const Beverages = ({ state, routing, beveragesId }) =>
  (state[beveragesId] && (
    <div className="row">
      <div className="col-md-6">
        {state[beveragesId].map(beverage => (
          <div key={beverage.id}>
            <a href={router.toPath(routing.siblingRoute(Route.Beverage({ id: beverage.id })))}>
              {beverage.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )) ||
  null;
