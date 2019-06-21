import * as React from "react";

export const Home = ({ state }) => (
  <div>
    <div>Home Page</div>
    {state.user && <div>You are logged in as: {state.user}</div>}
  </div>
);
