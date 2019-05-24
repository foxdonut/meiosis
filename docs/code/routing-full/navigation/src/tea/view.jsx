import React from "react";

import { TeaDetails } from "../teaDetails";
import { Route } from "routing-common/src/routes";

export const Tea = ({ state, actions, routing }) => (
  <div>
    <div>Tea Page</div>
    <div className="row">
      <div className="col-md-6">
        {state.teas ? (
          state.teas.map(tea => (
            <div key={tea.id}>
              <a
                href="javascript://"
                onClick={() =>
                  actions.navigateTo(routing.childRoute(Route.TeaDetails({ id: tea.id })))
                }
              >
                {tea.title}
              </a>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="col-md-6">
        {routing.childSegment.id === "TeaDetails" && (
          <TeaDetails state={state} actions={actions} routing={routing.next()} />
        )}
      </div>
    </div>
  </div>
);
