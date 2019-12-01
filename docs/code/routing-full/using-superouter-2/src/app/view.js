import { Root } from "../root";

// export const App = ({ state, actions }) => Root({ state, actions });

// import { useState } from "preact/hooks";

import { useState } from "react";
import { h } from "seview/react";

let initialize = true;

export const App = ({ initial, states, actions }) => {
  const [state, setState] = useState(initial);

  if (initialize) {
    states.map(setState);
    initialize = false;
  }
  return h(Root({ state, actions }));
};
