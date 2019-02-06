import React from "react";

export const Settings = ({ actions }) => (
  <div>
    <div>Settings Page</div>
    <button className="btn btn-danger" onClick={actions.logout}>Logout</button>
  </div>
);
