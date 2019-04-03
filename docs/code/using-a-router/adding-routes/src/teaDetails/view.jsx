import React from "react";

import { parentRoute } from "routing-common/src/routes";

export const TeaDetails = ({ state, update, route }) => (
  <div>
    <div>{state.tea[route.local.params.id]}</div>
    <a href="javascript://"
      onClick={() => update({ route: parentRoute(route) })}
    >Back to list</a>
  </div>
);
