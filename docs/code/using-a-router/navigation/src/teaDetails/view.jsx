import React from "react";

export const TeaDetails = ({ state, actions, routeIndex }) => (
  <div>
    <div>{state.tea}</div>
    <a href="javascript://"
      onClick={() => actions.navigateToParent(state.routeCurrent, routeIndex)}
    >Back to list</a>
  </div>
);
