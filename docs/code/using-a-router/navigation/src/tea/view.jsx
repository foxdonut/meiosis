import React, { Component } from "react";

import { TeaDetails } from "../teaDetails/view";
import { childRoutes, get, head } from "routing-common/src/util";

const componentMap = {
  TeaDetails
};

export class Tea extends Component {
  render() {
    const { state, actions, routes } = this.props;
    const componentId = get(head(routes.routeChildren), ["case"]);
    const Component = componentMap[componentId];

    return (
      <div>
        <p>Tea Page</p>
        <ul>
          {state.teas && state.teas.map(tea =>
            <li key={tea.id}>
              <a href="javascript://"
                onClick={() =>
                  actions.navigateToChild(routes.routeRelative, "TeaDetails", { id: tea.id })
                }
              >{tea.title}</a>
            </li>
          )}
        </ul>
        {Component && <Component state={state} actions={actions} routes={childRoutes(routes)}/>}
      </div>
    );
  }
}
