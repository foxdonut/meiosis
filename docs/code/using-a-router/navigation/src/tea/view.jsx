import React, { Component } from "react";
import { bifold, fold } from "static-tagged-union";

import { TeaDetails } from "../teaDetails";
import { Route } from "routing-common/src/root";

export class Tea extends Component {
  render() {
    const { state, actions, routeIndex } = this.props;

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
                      actions.navigateToChild(state.routeCurrent, [Route.TeaDetails({ id: tea.id })])
                    }
                  >{tea.title}</a>
                </li>
              ))
            )(state.teas)
          }
        </ul>
        {
          fold({
            TeaDetails: () => <TeaDetails state={state} actions={actions} routeIndex={routeIndex + 1} />
          })(state.routeCurrent[routeIndex + 1])
        }
      </div>
    );
  }
}
