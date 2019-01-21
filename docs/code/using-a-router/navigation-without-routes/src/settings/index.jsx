import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { T, fold } from "../util";
import { Navigation, RoutePage } from "../util/navigation";

export const settings = {
  service: ({ state, update, updateState }) => {
    T(state.navigateTo, Navigation.map(navigateTo =>
      T(navigateTo,fold({
        Settings: () => {
          if (state.user) {
            updateState({
              route: navigateTo,
              navigateTo: Navigation.N(),
            });
          }
          else {
            update({
              navigateTo: Navigation.Y(RoutePage.Login({ values: null })),
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
