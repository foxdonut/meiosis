import React, { Component } from "react";

import { TeaDetails } from "../teaDetails";
import { Route } from "routing-common/src/routes";
import { router } from "../router";

export class Tea extends Component {
  render() {
    const { state, actions, routing } = this.props;

    return (
      <div>
        <div>Tea Page</div>
        <ul>
          {state.teas ? (
            state.teas.map(tea => (
              <li key={tea.id}>
                <a href={router.toPath(routing.childRoute([Route.TeaDetails({ id: tea.id })]))}>
                  {tea.title}
                </a>
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
        {routing.childSegment.id === "TeaDetails" && (
          <TeaDetails state={state} actions={actions} routing={routing.next()} />
        )}
      </div>
    );
  }
}
