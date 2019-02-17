import React from "react";

import { Brewer } from "../brewer/view";
import { childRoutes, get, head, last } from "routing-common/src/util";

const componentMap = {
  Brewer
};

export const Beverage = ({ state, actions, routes }) => {
  const componentId = get(head(routes.routeChildren), ["case"]);
  const Component = componentMap[componentId];

  return (
    <div>
      <p>{state.beverage}</p>
      <a href="javascript://"
        onClick={
          () => actions.navigateToChild(routes.routeRelative, "Brewer",
            { id: last(routes.routeRelative).value.id }
          )
        }
      >Brewer</a>
      {Component && <Component state={state} actions={actions} routes={childRoutes(routes)}/>}
      <div>
        <a href="javascript://"
          onClick={() => actions.navigateToSibling(routes.routeRelative, "Beverages")}
        >Back to list</a>
      </div>
    </div>
  );
};
