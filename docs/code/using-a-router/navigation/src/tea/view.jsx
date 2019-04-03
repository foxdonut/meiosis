import React, { Component } from "react";

import { TeaDetails } from "../teaDetails";
import { Route, childRoute, nextRoute } from "routing-common/src/routes";

export class Tea extends Component {
  render() {
    const { state, update, route } = this.props;

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
                      update({
                        route: childRoute(route, [ Route.TeaDetails({ id: tea.id }) ])
                      })
                    }
                  >{tea.title}</a>
                </li>
              ))
              : (<li>Loading...</li>)
          }
        </ul>
        {
          route.child.id === "TeaDetails" &&
            <TeaDetails state={state} update={update} route={nextRoute(route)} />
        }
      </div>
    );
  }
}
