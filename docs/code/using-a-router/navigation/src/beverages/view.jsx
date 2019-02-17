import React from "react";

export const Beverages = ({ state, actions, routes }) => (
  <ul>
    {state.beverages.map(beverage =>
      <li key={beverage.id}>
        <a href="javascript://"
          onClick={() => actions.navigateToSibling(routes.routeRelative,
            "Beverage", { id: beverage.id })}
        >{beverage.title}</a>
      </li>
    )}
  </ul>
);
