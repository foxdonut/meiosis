import React from "react";

import { Route, TeaDetailsPage } from "routing-common/src/root";

export const TeaDetails = ({ state, actions }) => (
  <div>
    <div>{state.tea}</div>
    <a href="javascript://"
      onClick={() => actions.navigateTo(Route.Tea({ details: TeaDetailsPage.N() }))}
    >Back to list</a>
  </div>
);
