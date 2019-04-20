import React from "react";

import { nextRoute } from "routing-common/src/routes";
import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages,
  Beverage
};

export const Coffee = ({ state, actions, route }) => {
  const Component = componentMap[route.child.id];

  return (
    <div>
      <div>Coffee Page</div>
      <Component state={state} actions={actions} route={nextRoute(route)} beveragesId="coffees" />
    </div>
  );
};
