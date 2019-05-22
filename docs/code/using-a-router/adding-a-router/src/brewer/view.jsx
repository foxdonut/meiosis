import React from "react";

import { router } from "../router";

export const Brewer = ({ state, routing }) => {
  const id = routing.localSegment.params.id;

  return (
    <div>
      <div>{state.brewer[id]}</div>
      <div>
        <a href={router.toPath(routing.parentRoute())}>Close</a>
      </div>
    </div>
  );
};
