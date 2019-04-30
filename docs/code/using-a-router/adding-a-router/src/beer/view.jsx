import React from "react";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages,
  Beverage
};

export const Beer = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];

  return (
    <div>
      <div>Beer Page</div>
      <Component state={state} actions={actions} routing={routing.next()} beveragesId="beers" />
    </div>
  );
};
