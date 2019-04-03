import React from "react";

import { settings } from "routing-common/src/settings";

export const Settings = ({ update }) => (
  <div>
    <div>Settings Page</div>
    <button className="btn btn-danger"
      onClick={() => update(settings.actions.logout())}>Logout</button>
  </div>
);
