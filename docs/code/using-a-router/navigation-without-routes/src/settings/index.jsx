import React, { Component } from "react";

import { getNavigation } from "../util";

export const settings = {
  onNavigate: {
    SettingsPage: ({ state }) =>
      state.user
        ? true
        : Object.assign({ message: "Please login." }, getNavigation({ id: "LoginPage" }))
  }
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
