import React, { Component } from "react";

import { getNavigation } from "../util";

export const settings = {
  navigation: {
    SettingsPage: {
      validate: ({ state }) =>
        state.user
          ? true
          : Object.assign({ message: "Please login." }, getNavigation("LoginPage"))
    }
  }
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
