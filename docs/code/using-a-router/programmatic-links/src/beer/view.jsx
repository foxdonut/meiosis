import React from "react";

import { nextRoute } from "routing-common/src/routes";
import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages,
  Beverage
};

export const Beer = ({ state, actions, router, route }) => {
  const Component = componentMap[route.child.id];

  return (
    <div>
      <div>Beer Page</div>
      <Component
        state={state}
        actions={actions}
        router={router}
        route={nextRoute(route)}
        beveragesId="beers"
      />
    </div>
  );
};
