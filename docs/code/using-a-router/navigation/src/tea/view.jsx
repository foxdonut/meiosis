import React, { Component } from "react";
import { bifold, fold } from "static-tagged-union";

import { TeaDetails } from "../teaDetails";
import { Route, childRoute } from "routing-common/src/root";

export class Tea extends Component {
  render() {
    const { state, actions, route } = this.props;

    return (
      <div>
        <div>Tea Page</div>
        <ul>
          {
            bifold(
              () => <li>Loading...</li>,
              teas => teas.map(tea => (
                <li key={tea.id}>
                  <a href="javascript://"
                    onClick={() =>
                      actions.navigateToChild(route, [Route.TeaDetails({ id: tea.id })])
                    }
                  >{tea.title}</a>
                </li>
              ))
            )(state.teas)
          }
        </ul>
        {
          fold({
            TeaDetails: () => <TeaDetails state={state} actions={actions} route={childRoute(route)} />
          })(route.child)
        }
      </div>
    );
  }
}
