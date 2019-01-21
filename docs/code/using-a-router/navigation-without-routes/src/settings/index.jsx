import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { T, fold } from "../util";
import { NavigateTo, RoutePage } from "../util/navigation";

export const settings = {
  service: ({ state, update, updateState }) => {
    T(state.navigateTo, NavigateTo.map(navigateTo =>
      T(navigateTo,fold({
        Settings: () => {
          if (state.user) {
            updateState({
              route: navigateTo,
              navigateTo: NavigateTo.N(),
            });
          }
          else {
            update({
              navigateTo: NavigateTo.Y(RoutePage.Login({ values: null })),
              login: PS({
                message: "Please login."
              })
            });
          }
        }
      }))
    ));
  }
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
