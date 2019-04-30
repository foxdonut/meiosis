import React from "react";

export const Brewer = ({ state, routing }) => {
  const id = routing.localSegment.params.id;

  return <div>{state.brewer[id]}</div>;
};
