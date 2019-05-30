import React from "react";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages,
  Beverage
};

export const Beer = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];
  const { type, country } = routing.localSegment.params;

  return (
    <div>
      <div>Beer Page</div>

      {/* with query-string and ?type=lager */}
      {/* with urlon and ?$type$name=lager */}
      {/* or with qs and ?type[name]=lager */}
      {type ? <div>Type: {type}</div> : null}
      {country ? <div>Country: {country}</div> : null}

      <Component state={state} actions={actions} routing={routing.next()} beveragesId="beers" />
    </div>
  );
};
