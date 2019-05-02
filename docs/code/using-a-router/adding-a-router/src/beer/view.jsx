import React from "react";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages,
  Beverage
};

export const Beer = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];
  const type = routing.localSegment.params.type;

  return (
    <div>
      <div>Beer Page</div>
      {type ? <div>Type: {type}</div> : null}
      <Component state={state} actions={actions} routing={routing.next()} beveragesId="beers" />
    </div>
  );
};
