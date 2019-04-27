import React from "react";

import { parentRoute } from "routing-common/src/routes";

export const TeaDetails = ({ state, router, route }) => (
  <div>
    <div>{state.tea[route.local.params.id]}</div>
    <a href={router.toPath(parentRoute(route))}>Back to list</a>
  </div>
);
