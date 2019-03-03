import React from "react";
import { fold } from "static-tagged-union";

import { Route } from "routing-common/src/root";
import { Brewer } from "../brewer";

const componentMap = fold({
  Brewer: () => Brewer
});

export const Beverage = ({ state, actions, route }) => {
  const Component = componentMap(route.child);
  const id = route.local.value.id;

  return (
    <div>
      <div>{state.beverage}</div>
      <div>
        <a href="javascript://"
          onClick={
            () => actions.navigateToChild(route, [Route.Brewer({ id })])
          }>Brewer</a>
      </div>
      {Component && <Component state={state} actions={actions} />}
      <div>
        <a href="javascript://"
          onClick={
            () => actions.navigateToSibling(route, [Route.Beverages()])
          }
        >Back to list</a>
      </div>
    </div>
  );
};
