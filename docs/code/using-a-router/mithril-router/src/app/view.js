import m from "mithril";

import { Root } from "../root";

export const App = {
  view: ({ attrs: { state, update } }) => m(Root, { state, update })
};
