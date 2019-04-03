import React from "react";

import { Route, childRoute, siblingRoute, nextRoute } from "routing-common/src/routes";
import { Brewer } from "../brewer";

const componentMap = {
  Brewer
};

export const Beverage = ({ state, update, route }) => {
  const Component = componentMap[route.child.id];
  const id = route.local.params.id;

  return (
    <div>
      <div>{state.beverage[id]}</div>
      <div>
        <a href="javascript://"
          onClick={
            () => update({
              route: childRoute(route, [ Route.Brewer({ id }) ])
            })
          }>Brewer</a>
      </div>
      {Component && <Component state={state} update={update} route={nextRoute(route)} />}
      <div>
        <a href="javascript://"
          onClick={
            () => update({
              route: siblingRoute(route, [ Route.Beverages() ])
            })
          }
        >Back to list</a>
      </div>
    </div>
  );
};
