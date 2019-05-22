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
    <div className="row">
      <div className="col-md-6">
        <div>{state.beverage[id]}</div>
        <div>
          <a href={router.toPath(routing.siblingRoute(Route.Beverages()))}>Back to list</a>
        </div>
        {!Component && (
          <div>
            <a href={router.toPath(routing.childRoute(Route.Brewer()))}>Brewer</a>
          </div>
        )}
      </div>
      {Component && (
        <div className="col-md-6">
          <Component state={state} actions={actions} routing={routing.next()} />
        </div>
      )}
    </div>
  );
};
