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

      {/* with query-string and ?type=lager */}
      {/* type ? <div>Type: {type}</div> : null */}

      {/* with urlon and ?$type$name=lager */}
      {/* or with qs and ?type[name]=lager */}
      {type && type.name ? <div>Type: {type.name}</div> : null}

      <Component state={state} actions={actions} routing={routing.next()} beveragesId="beers" />
    </div>
  );
};
