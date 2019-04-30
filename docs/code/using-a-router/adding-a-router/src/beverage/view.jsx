import React from "react";

import { Route } from "routing-common/src/routes";
import { Brewer } from "../brewer";
import { router } from "../router";

const componentMap = {
  Brewer
};

export const Beverage = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];
  const id = routing.localSegment.params.id;

  return (
    <div>
      <div>{state.beverage[id]}</div>
      <div>
        <a href={router.toPath(routing.childRoute([Route.Brewer({ id })]))}>Brewer</a>
      </div>
      {Component && <Component state={state} actions={actions} routing={routing.next()} />}
      <div>
        <a href={router.toPath(routing.siblingRoute([Route.Beverages()]))}>Back to list</a>
      </div>
    </div>
  );
};
