import m from "mithril";

import { Root } from "../root";

export const App = {
  view: ({ attrs: { state, update, actions } }) => m(Root, { state, update, actions })
};
