import React, { Component } from "react";

import { TeaDetails } from "../teaDetails";
import { Loaded, Route, TeaDetailsPage } from "routing-common/src/root";

export class Tea extends Component {
  render() {
    const { state, actions } = this.props;
    const route = state.routeCurrent;

    return (
      <div>
        <div>Tea Page</div>
        <ul>
          {
            Loaded.bifold(
              () => <li>Loading...</li>,
              teas => teas.map(tea => (
                <li key={tea.id}>
                  <a href="javascript://"
                    onClick={() =>
                      actions.navigateTo(Route.Tea({ details: TeaDetailsPage.Y({ id: tea.id }) }))
                    }
                  >{tea.title}</a>
                </li>
              ))
            )(state.teas)
          }
        </ul>
        {
          TeaDetailsPage.bifold(
            () => null,
            () => <TeaDetails state={state} actions={actions} />
          )(route.value.details)
        }
      </div>
    );
  }
}
