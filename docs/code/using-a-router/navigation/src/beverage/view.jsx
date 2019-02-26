import React from "react";

import { Brewer } from "../brewer";
import { get, head, last } from "routing-common/src/util";

const componentMap = {
  Brewer
};

export const Beverage = ({ state, actions, routes }) => {
  const componentId = get(head(routes.routeChildren), ["case"]);
  const Component = componentMap[componentId];

  return (
    <div>
      <div>{state.beverage}</div>
      <div>
        <a href="javascript://"
          onClick={() => actions.navigateToChild(routes.routeRelative, "Brewer",
            { id: last(routes.routeRelative).value.id })}>Brewer</a>
      </div>
      {Component && <Component state={state} actions={actions} />}
      <div>
        <a href="javascript://"
          onClick={() => actions.navigateToSibling(routes.routeRelative, "Beverages")}
        >Back to list</a>
      </div>
    </div>
  );
};
