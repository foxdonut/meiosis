import React, { Component } from "react";

import { NavigateTo, RoutePage, fold } from "../util";

export const settings = {
  service: ({ state, update }) => {
    NavigateTo.map(navigateTo =>
      fold({
        Settings: () => update({
          navigateTo: NavigateTo.Y(RoutePage.Login({ values: null }))
        })
      })(navigateTo)
    )(state.navigateTo);
  }
  /*
  onNavigate: {
    // validate
    SettingsPage: ({ state, navigation }) =>
      state.user
        ? navigation
        : Object.assign({ message: "Please login." }, getNavigation({ id: "LoginPage" }))
  }
  */
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
