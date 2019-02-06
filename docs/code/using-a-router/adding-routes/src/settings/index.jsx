import React from "react";
import { PS } from "patchinko/explicit";

import { onChange } from "../util";
import { navigateTo } from "../util/router";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({ user: null }, navigateTo("Home")))
  }),
  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Settings") {
        if (state.user) {
          update({ route: PS({ next: state.route.request }) });
        }
        else {
          update(Object.assign({
            login: PS({
              message: "Please login."
            })
          }, navigateTo("Login")));
        }
      }
    });
  }
};

export const Settings = ({ actions }) => (
  <div>
    <div>Settings Page</div>
    <button className="btn btn-danger" onClick={actions.logout}>Logout</button>
  </div>
);
