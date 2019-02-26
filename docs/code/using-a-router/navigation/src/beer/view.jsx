import React from "react";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";
import { get, head } from "routing-common/src/util";

const componentMap = {
  Beverages,
  Beverage
};

export const Beer = ({ state, actions, routes }) => {
  const componentId = get(head(routes.routeChildren), ["case"]);
  const Component = componentMap[componentId];

  return (
    <div>
      <div>Beer Page</div>
      {
        Component &&
        <Component state={state} actions={actions} />
      }
    </div>
  );
};
