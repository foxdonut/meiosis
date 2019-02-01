import React from "react";

export const home = {
  service: ({ state, update }) => {
    if (state.navigateTo.id === "Home") {
      // Navigating to Home
      update({
        route: state.navigateTo,
        navigateTo: {}
      });
    }
  }
};

export const Home = () => (<div>Home Page</div>);
