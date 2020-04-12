import m from "mithril";

import { Root } from "../root";

export const App = {
  view: ({ attrs: { state, actions } }) => m(Root, { state, actions })
};
