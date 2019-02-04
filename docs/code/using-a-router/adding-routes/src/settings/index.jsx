import React from "react";
import { P, PS } from "patchinko/explicit";

import { dropRepeats, propPath } from "../util";
import { navigateTo } from "../util/router";

export const settings = {
  actions: update => ({
    logout: () => update(P({ user: null }, navigateTo("Home")))
  }),
  service: (states, update) => {
    dropRepeats(propPath(["navigateTo"]))(states).map(state => {
      if (state.navigateTo.id === "Settings") {
        if (state.user) {
          update({ route: state.navigateTo });
        }
        else {
          update({
            navigateTo: { id: "Login" },
            login: PS({
              message: "Please login."
            })
          });
        }
      }
    });
  }
};

export const Settings = ({ actions }) => (
  <div>
    <div>Settings Page</div>
    <button className="btn btn-sm btn-danger" onClick={actions.logout}>Logout</button>
  </div>
);
