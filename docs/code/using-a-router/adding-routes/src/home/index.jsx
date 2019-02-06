import React from "react";
import { PS } from "patchinko/explicit";

import { onChange } from "../util";

export const home = {
  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Home") {
        // Navigating to Home
        update({
          route: PS({ next: state.route.request })
        });
      }
    });
  }
};

export const Home = ({ state }) => (
  <div>
    <div>Home Page</div>
    {state.user && <div>You are logged in as: {state.user}</div>}
  </div>
);
