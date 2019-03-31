import React, { Component } from "react";

import { TeaDetails } from "../teaDetails";
import { Route, childRoute, nextRoute } from "routing-common/src/root";

export class Tea extends Component {
  render() {
    const { state, actions, route } = this.props;

    return (
      <div>
        <div>Tea Page</div>
        <ul>
          {
            state.teas
              ? state.teas.map(tea => (
                <li key={tea.id}>
                  <a href="javascript://"
                    onClick={() =>
                      actions.navigateTo(
                        childRoute(route, [ Route.TeaDetails({ id: tea.id }) ])
                      )
                    }
                  >{tea.title}</a>
                </li>
              ))
              : (<li>Loading...</li>)
          }
        </ul>
        {
          route.child.id === "TeaDetails" &&
            <TeaDetails state={state} actions={actions} route={nextRoute(route)} />
        }
      </div>
    );
  }
}
