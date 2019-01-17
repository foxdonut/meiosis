import React, { Component } from "react";

import { getNavigation } from "../util";

export const settings = {
  validateNavigation: ({ state }) =>
    state.user ? true : getNavigation("LoginPage")
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
