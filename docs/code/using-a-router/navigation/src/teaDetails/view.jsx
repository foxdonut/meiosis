import React from "react";

import { parentRoute } from "routing-common/src/routes";

export const TeaDetails = ({ state, actions, route }) => (
  <div>
    <div>{state.tea[route.local.params.id]}</div>
    <a href="javascript://" onClick={() => actions.navigateTo(parentRoute(route))}>
      Back to list
    </a>
  </div>
);
