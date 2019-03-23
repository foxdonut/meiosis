import React from "react";
import { fold } from "static-tagged-union";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Beverages: () => Beverages,
  Beverage: () => Beverage
});

export const Coffee = ({ state, actions, route }) => {
  const child = route.params.child;
  const Component = componentMap(child);

  return (
    <div>
      <div>Coffee Page</div>
      <Component state={state} actions={actions} route={child} />
    </div>
  );
};
