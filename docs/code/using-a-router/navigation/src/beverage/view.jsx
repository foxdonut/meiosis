import React from "react";
import { fold } from "static-tagged-union";

import { Route } from "routing-common/src/root";
import { Brewer } from "../brewer";

const componentMap = fold({
  Brewer: () => Brewer
});

export const Beverage = ({ state, actions, routeIndex }) => {
  const Component = componentMap(state.routeCurrent[routeIndex + 1]);
  const id = state.routeCurrent[routeIndex].value.id;

  return (
    <div>
      <div>{state.beverage}</div>
      <div>
        <a href="javascript://"
          onClick={
            () => actions.navigateToChild(
              state.routeCurrent, [Route.Brewer({ id })]
            )
          }>Brewer</a>
      </div>
      {Component && <Component state={state} actions={actions} />}
      <div>
        <a href="javascript://"
          onClick={
            () => actions.navigateToSibling(
              state.routeCurrent, routeIndex, Route.Beverages()
            )
          }
        >Back to list</a>
      </div>
    </div>
  );
};
