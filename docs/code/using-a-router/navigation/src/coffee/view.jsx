import React from "react";

import { Beverage } from "../beverage/view";
import { childRoutes, get, head } from "routing-common/src/util";

const componentMap = {
  Beverage
};

export const Coffee = ({ state, actions, routes }) => {
  const componentId = get(head(routes.routeChildren), ["case"]);
  const Component = componentMap[componentId];

  return (
    <div>
      <p>Coffee Page</p>
      <ul>
        {state.beverages.map(beverage =>
          <li key={beverage.id}>
            <a href="javascript://"
              onClick={() => actions.deepLink(routes.routeRelative,
                "Beverage", { id: beverage.id })}
            >{beverage.title}</a>
          </li>
        )}
      </ul>
      {Component && <Component state={state} actions={actions} routes={childRoutes(routes)}/>}
    </div>
  );
};
