import React from "react";

export const Brewer = ({ state, route }) => {
  const id = route.local.params.id;

  return <div>{state.brewer[id]}</div>;
};
