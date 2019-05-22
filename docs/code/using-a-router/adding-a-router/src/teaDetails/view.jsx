import React from "react";

import { router } from "../router";

export const TeaDetails = ({ state, routing }) => (
  <div>
    <div>{state.tea[routing.localSegment.params.id]}</div>
    <div>
      <a href={router.toPath(routing.parentRoute())}>Close</a>
    </div>
  </div>
);
