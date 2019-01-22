import React, { Component } from "react";
import { PS } from "patchinko/explicit";

import { get } from "../util";

export const settings = {
  service: ({ state, update }) => {
    if (get(state, ["navigateTo", "id"]) === "Settings") {
      if (!state.user) {
        update({
          navigateTo: { id: "Login" },
          login: PS({
            message: "Please login."
          })
        });
      }
    }
  }
};

export class Settings extends Component {
  render() {
    return (<div>Settings Page</div>);
  }
}
