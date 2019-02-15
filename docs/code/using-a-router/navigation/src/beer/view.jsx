import React from "react";

import { BeerDetails } from "../beerDetails/view";
import { childRoutes, get, head } from "routing-common/src/util";

const componentMap = {
  BeerDetails
};

export const Beer = ({ state, actions, routes }) => {
  const componentId = get(head(routes.routeChildren), ["case"]);
  const Component = componentMap[componentId];

  return (
    <div>
      <p>Beer Page</p>
      <ul>
        {state.beers.map(beer =>
          <li key={beer.id}>
            <a href="javascript://"
              onClick={() => actions.deepLink(routes.routeRelative, "BeerDetails", { id: beer.id })}
            >{beer.title}</a>
          </li>
        )}
      </ul>
      {Component && <Component state={state} actions={actions} routes={childRoutes(routes)}/>}
    </div>
  );
};
