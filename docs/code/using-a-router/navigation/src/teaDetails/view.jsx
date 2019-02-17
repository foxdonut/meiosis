import React from "react";

export const TeaDetails = ({ state, actions, routes }) => (
  <div>
    <p>{state.tea}</p>
    <a href="javascript://"
      onClick={() => actions.navigateToParent(routes.routeRelative)}
    >Back to list</a>
  </div>
);
