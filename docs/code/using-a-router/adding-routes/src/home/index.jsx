import React from "react";

import { dropRepeats } from "../util";

export const home = {
  service: (states, update) => {
    dropRepeats(states, ["navigateTo"]).map(state => {
      if (state.navigateTo.id === "Home") {
        // Navigating to Home
        update({
          route: state.navigateTo
        });
      }
    });
  }
};

export const Home = () => (<div>Home Page</div>);
