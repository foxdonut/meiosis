import React from "react";

import { Route, childRoute, siblingRoute, nextRoute } from "routing-common/src/routes";
import { Brewer } from "../brewer";

const componentMap = {
  Brewer
};

export const Beverage = ({ state, actions, router, route }) => {
  const Component = componentMap[route.child.id];
  const id = route.local.params.id;

  return (
    <div>
      <div>{state.beverage[id]}</div>
      <div>
        <a href={router.toPath(childRoute(route, [Route.Brewer({ id })]))}>Brewer</a>
      </div>
      {Component && (
        <Component state={state} actions={actions} router={router} route={nextRoute(route)} />
      )}
      <div>
        <a href={router.toPath(siblingRoute(route, [Route.Beverages()]))}>Back to list</a>
      </div>
    </div>
  );
};
