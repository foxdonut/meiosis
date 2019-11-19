import React from "react";

export const Brewer = ({ state, actions, routing }) => {
  const id = routing.localSegment.params.id;

  return (
    <div>
      <div>{state.brewer[id]}</div>
      <div>
        <a href="#" onClick={() => actions.navigateTo(routing.parentRoute())}>
          Close
        </a>
      </div>
    </div>
  );
};
