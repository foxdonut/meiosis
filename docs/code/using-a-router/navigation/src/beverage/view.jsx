import React from "react";
import { fold } from "static-tagged-union";

import { Route, childRoute, siblingRoute } from "routing-common/src/root";
import { Brewer } from "../brewer";

const componentMap = fold({
  Brewer: () => Brewer
});

export const Beverage = ({ state, actions, route }) => {
  const child = route.params.child;
  const Component = componentMap(child);
  const id = route.params.id;

  return (
    <div>
      <div>{state.beverage}</div>
      <div>
        <a href="javascript://"
          onClick={
            () => actions.navigateTo(
              childRoute(state.route, route, Route.Brewer({ id }))
            )
          }>Brewer</a>
      </div>
      {Component && <Component state={state} actions={actions} route={child} />}
      <div>
        <a href="javascript://"
          onClick={
            () => actions.navigateTo(
              siblingRoute(state.route, route, Route.Beverages())
            )
          }
        >Back to list</a>
      </div>
    </div>
  );
};
