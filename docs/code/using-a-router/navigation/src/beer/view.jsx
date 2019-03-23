import React from "react";
import { fold } from "static-tagged-union";

import { nextRoute } from "routing-common/src/root";
import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Beverages: () => Beverages,
  Beverage: () => Beverage
});

export const Beer = ({ state, actions, route }) => {
  const Component = componentMap(route.child);

  return (
    <div>
      <div>Beer Page</div>
      <Component state={state} actions={actions} route={nextRoute(route)} />
    </div>
  );
};
