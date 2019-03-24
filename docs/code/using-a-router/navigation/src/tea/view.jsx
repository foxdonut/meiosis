import React, { Component } from "react";
import { fold } from "static-tagged-union";

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
            fold({
              N: () => <li>Loading...</li>,
              Y: teas => teas.map(tea => (
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
            })(state.teas)
          }
        </ul>
        {
          fold({
            TeaDetails: () => <TeaDetails state={state} actions={actions} route={nextRoute(route)} />
          })(route.child)
        }
      </div>
    );
  }
}
