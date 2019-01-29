import React, { Component } from "react";
import { PS } from "patchinko/explicit";

export const settings = {
  service: ({ state, update }) => {
    if (state.navigateTo.id === "Settings" && !state.user) {
      update({
        navigateTo: { id: "Login" },
        login: PS({
          message: "Please login."
        })
      });

      return { route: state.route };
    }
  }
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
