import React from "react";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages,
  Beverage
};

export const Coffee = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];

  return (
    <div>
      <div>Coffee Page</div>
      <Component state={state} actions={actions} routing={routing.next()} beveragesId="coffees" />
    </div>
  );
};
