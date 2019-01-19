import React, { Component } from "react";

import { getNavigation } from "../util";

export const settings = {
  service: () => null
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
