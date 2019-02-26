import React from "react";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";
import { get, head } from "routing-common/src/util";

const componentMap = {
  Beverages,
  Beverage
};

export const Coffee = ({ state, actions, routes }) => {
  const componentId = get(head(routes.routeChildren), ["case"]);
  const Component = componentMap[componentId];

  return (
    <div>
      <div>Coffee Page</div>
      {Component && <Component state={state} actions={actions} />}
    </div>
  );
};
