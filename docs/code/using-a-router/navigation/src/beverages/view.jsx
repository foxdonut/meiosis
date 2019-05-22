import React from "react";

import { Route } from "routing-common/src/routes";

export const Beverages = ({ state, actions, routing, beveragesId }) =>
  (state[beveragesId] && (
    <div className="row">
      <div className="col-md-6">
        {state[beveragesId].map(beverage => (
          <div key={beverage.id}>
            <a
              href="javascript://"
              onClick={() =>
                actions.navigateTo(routing.siblingRoute(Route.Beverage({ id: beverage.id })))
              }
            >
              {beverage.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )) ||
  null;
