import React from "react";

export const TeaDetails = ({ state, actions, routes }) => (
  <div>
    <div>{state.tea}</div>
    <a href="javascript://"
      onClick={() => actions.navigateToParent(routes.routeRelative)}
    >Back to list</a>
  </div>
);
