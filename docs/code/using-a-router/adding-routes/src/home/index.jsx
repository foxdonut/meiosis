import React from "react";

import { dropRepeats, propPath } from "../util";

export const home = {
  service: (states, update) => {
    dropRepeats(propPath(["navigateTo"]))(states).map(state => {
      if (state.navigateTo.id === "Home") {
        // Navigating to Home
        update({
          route: state.navigateTo
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
