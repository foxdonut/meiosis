import React from "react";

export const TeaDetails = ({ state, actions, route }) => (
  <div>
    <div>{state.tea}</div>
    <a href="javascript://"
      onClick={() => actions.navigateToParent(route)}
    >Back to list</a>
  </div>
);
