import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { dropRepeats } from "../util";

export const settings = {
  service: (states, update) => {
    dropRepeats(states, ["navigateTo"]).map(state => {
      if (state.navigateTo.id === "Settings" && !state.user) {
        update({
          navigateTo: { id: "Login" },
          login: PS({
            message: "Please login."
          })
        });
      }
    });
  }
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
