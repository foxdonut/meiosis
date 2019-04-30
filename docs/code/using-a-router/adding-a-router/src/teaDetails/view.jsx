import React from "react";

import { router } from "../router";

export const TeaDetails = ({ state, routing }) => (
  <div>
    <div>{state.tea[routing.localSegment.params.id]}</div>
    <a href={router.toPath(routing.parentRoute())}>Back to list</a>
  </div>
);
